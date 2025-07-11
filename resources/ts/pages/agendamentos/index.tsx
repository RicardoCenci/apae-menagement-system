import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ListagemAgendamentosPage({
	appointments,
	setAppointments,
	onDeleteAppointments,
}) {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [startDateFilter, setStartDateFilter] = useState("");
	const [endDateFilter, setEndDateFilter] = useState("");
	const [selectedAppointments, setSelectedAppointments] = useState([]);

	const formatDateToBrazilian = (dateString) => {
		if (!dateString) return "";
		const [year, month, day] = dateString.split("-");
		return `${day}/${month}/${year}`;
	};

	const filteredAppointments = appointments.filter((appointment) => {
		const matchesSearchTerm =
			appointment.patient
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
			appointment.professional
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			formatDateToBrazilian(appointment.date).includes(searchTerm);

		let matchesDateRange = true;
		if (startDateFilter && endDateFilter) {
			const appointmentDate = new Date(appointment.date);
			const startDate = new Date(startDateFilter);
			const endDate = new Date(endDateFilter);

			appointmentDate.setHours(0, 0, 0, 0);
			startDate.setHours(0, 0, 0, 0);
			endDate.setHours(0, 0, 0, 0);

			matchesDateRange =
				appointmentDate >= startDate && appointmentDate <= endDate;
		} else if (startDateFilter) {
			const appointmentDate = new Date(appointment.date);
			const startDate = new Date(startDateFilter);
			appointmentDate.setHours(0, 0, 0, 0);
			startDate.setHours(0, 0, 0, 0);
			matchesDateRange = appointmentDate >= startDate;
		} else if (endDateFilter) {
			const appointmentDate = new Date(appointment.date);
			const endDate = new Date(endDateFilter);
			appointmentDate.setHours(0, 0, 0, 0);
			endDate.setHours(0, 0, 0, 0);
			matchesDateRange = appointmentDate <= endDate;
		}

		return matchesSearchTerm && matchesDateRange;
	});

	const handleClickStatus = (id) => {
		const appointment = appointments.find((app) => app.id === id);
		if (appointment) {
			const newStatus =
				appointment.status === "confirmed" ? "pending" : "confirmed";
			setAppointments(id, newStatus);
		}
	};

	const handleDoubleClickStatus = (id) => {
		const appointment = appointments.find((app) => app.id === id);
		if (appointment) {
			const newStatus =
				appointment.status === "absent" ? "pending" : "absent";
			setAppointments(id, newStatus);
		}
	};

	const handleSelectAppointment = (id) => {
		setSelectedAppointments((prevSelected: any) => {
			if (prevSelected.includes(id)) {
				return prevSelected.filter((selectedId) => selectedId !== id);
			} else {
				return [...prevSelected, id];
			}
		});
	};

	const handleSelectAllAppointments = () => {
		if (
			selectedAppointments.length === filteredAppointments.length &&
			filteredAppointments.length > 0
		) {
			setSelectedAppointments([]);
		} else {
			setSelectedAppointments(filteredAppointments.map((app) => app.id));
		}
	};

	const handleDeleteSelected = () => {
		if (selectedAppointments.length === 0) {
			alert("Nenhum agendamento selecionado para exclusão.");
			return;
		}
		if (
			window.confirm(
				`Tem certeza que deseja excluir ${selectedAppointments.length} agendamento(s) selecionado(s)?`
			)
		) {
			onDeleteAppointments(selectedAppointments);
			setSelectedAppointments([]);
		}
	};

	return (
		<div className="w-full mx-auto p-4 min-h-screen">
			<h1 className="text-2xl font-bold mb-4">
				Controle de Agendamentos
			</h1>
			<div className="mb-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
				<input
					type="text"
					placeholder="Pesquisa por nome, ID, Profissional ou Data (DD/MM/AAAA)..."
					className="flex-grow p-2 border border-gray-300 rounded-md"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<label htmlFor="startDate" className="sr-only">
					Data Início
				</label>
				<input
					type="date"
					id="startDate"
					className="p-2 border border-gray-300 rounded-md"
					value={startDateFilter}
					onChange={(e) => setStartDateFilter(e.target.value)}
				/>

				<label htmlFor="endDate" className="sr-only">
					Data Fim
				</label>
				<input
					type="date"
					id="endDate"
					className="p-2 border border-gray-300 rounded-md"
					value={endDateFilter}
					onChange={(e) => setEndDateFilter(e.target.value)}
				/>

				{(startDateFilter || endDateFilter) && (
					<button
						className="bg-gray-400 text-white px-4 py-2 rounded-md"
						onClick={() => {
							setStartDateFilter("");
							setEndDateFilter("");
						}}
					>
						Limpar Data
					</button>
				)}

				{selectedAppointments.length > 0 && (
					<button
						className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
						onClick={handleDeleteSelected}
					>
						Excluir Selecionados ({selectedAppointments.length})
					</button>
				)}

				<button
					className="bg-green-500 text-white px-4 py-2 rounded-md"
					onClick={() => navigate("/agendamentos/new")}
				>
					+ Novo Agendamento
				</button>
				<button
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
					onClick={() => navigate("/cadastros")}
				>
					Cadastros
				</button>
			</div>
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								<input
									type="checkbox"
									className="h-4 w-4 text-blue-600 border-gray-300 rounded"
									onChange={handleSelectAllAppointments}
									checked={
										filteredAppointments.length > 0 &&
										selectedAppointments.length ===
											filteredAppointments.length
									}
									ref={(el) => {
										if (el)
											el.indeterminate =
												selectedAppointments.length >
													0 &&
												selectedAppointments.length <
													filteredAppointments.length;
									}}
								/>
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								ID do Paciente
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Paciente
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Especialidade
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Profissional
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Data
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Faltas Não Justificadas
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Faltas Justificadas
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Confirmação do Atendimento
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredAppointments.map((appointment) => (
							<tr
								key={appointment.id}
								className="hover:bg-gray-50"
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<input
										type="checkbox"
										className="h-4 w-4 text-blue-600 border-gray-300 rounded"
										checked={selectedAppointments.includes(
											appointment.id as never
										)}
										onChange={() =>
											handleSelectAppointment(
												appointment.id
											)
										}
										onClick={(e) => e.stopPropagation()}
									/>
								</td>
								<td
									className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
									onClick={() =>
										navigate(
											`/detalhes-agendamento/${appointment.id}`
										)
									}
								>
									{appointment.id}
								</td>
								<td
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
									onClick={() =>
										navigate(
											`/detalhes-agendamento/${appointment.id}`
										)
									}
								>
									{appointment.patient}
								</td>
								<td
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
									onClick={() =>
										navigate(
											`/detalhes-agendamento/${appointment.id}`
										)
									}
								>
									{appointment.specialty}
								</td>
								<td
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
									onClick={() =>
										navigate(
											`/detalhes-agendamento/${appointment.id}`
										)
									}
								>
									{appointment.professional}
								</td>
								<td
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
									onClick={() =>
										navigate(
											`/detalhes-agendamento/${appointment.id}`
										)
									}
								>
									{formatDateToBrazilian(appointment.date)}
								</td>
								<td
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
									onClick={() =>
										navigate(
											`/detalhes-agendamento/${appointment.id}`
										)
									}
								>
									{appointment.unjustifiedAbsences}
								</td>
								<td
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
									onClick={() =>
										navigate(
											`/detalhes-agendamento/${appointment.id}`
										)
									}
								>
									{appointment.justifiedAbsences}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									<div
										className={`relative flex items-center justify-center w-6 h-6 rounded-full cursor-pointer transition-all duration-200
                      ${appointment.status === "confirmed" ? "bg-blue-500" : ""}
                      ${appointment.status === "absent" ? "bg-red-500" : ""}
                      ${
							appointment.status === "pending"
								? "border-2 border-gray-400"
								: ""
						}
                    `}
										onClick={(e) => {
											e.stopPropagation();
											handleClickStatus(appointment.id);
										}}
										onDoubleClick={(e) => {
											e.stopPropagation();
											handleDoubleClickStatus(
												appointment.id
											);
										}}
									>
										{appointment.status === "confirmed" && (
											<svg
												className="h-4 w-4 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5 13l4 4L19 7"
												/>
											</svg>
										)}
										{appointment.status === "absent" && (
											<svg
												className="h-4 w-4 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="2"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
