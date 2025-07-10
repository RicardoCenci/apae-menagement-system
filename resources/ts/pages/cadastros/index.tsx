import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCpf } from "../../utils/format";
import { formatDateToBrazilian } from "../../utils/date";

export function CadastrosPages({
	patients,
	professionals,
	companions,
	onDeletePatients,
	onDeleteProfessionals,
	onDeleteCompanions,
}) {
	const navigate = useNavigate();
	const [activeList, setActiveList] = useState("patients"); // Padrão: pacientes

	const [selectedPatients, setSelectedPatients] = useState([]);
	const [selectedProfessionals, setSelectedProfessionals] = useState([]);
	const [selectedCompanions, setSelectedCompanions] = useState([]);

	// Funções de seleção (inalteradas)
	const handleSelectPatient = (id) => {
		setSelectedPatients((prevSelected: any) =>
			prevSelected.includes(id)
				? prevSelected.filter((sid) => sid !== id)
				: [...prevSelected, id]
		);
	};
	const handleSelectAllPatients = () => {
		if (
			selectedPatients.length === patients.length &&
			patients.length > 0
		) {
			setSelectedPatients([]);
		} else {
			setSelectedPatients(patients.map((p) => p.id));
		}
	};
	const handleDeleteSelectedPatients = () => {
		if (selectedPatients.length === 0) {
			alert("Nenhum paciente selecionado.");
			return;
		}
		if (
			window.confirm(
				`Tem certeza que deseja excluir ${selectedPatients.length} paciente(s) selecionado(s)?`
			)
		) {
			onDeletePatients(selectedPatients);
			setSelectedPatients([]);
		}
	};

	const handleSelectProfessional = (id) => {
		setSelectedProfessionals((prevSelected: any) =>
			prevSelected.includes(id)
				? prevSelected.filter((sid) => sid !== id)
				: [...prevSelected, id]
		);
	};
	const handleSelectAllProfessionals = () => {
		if (
			selectedProfessionals.length === professionals.length &&
			professionals.length > 0
		) {
			setSelectedProfessionals([]);
		} else {
			setSelectedProfessionals(professionals.map((p) => p.id));
		}
	};
	const handleDeleteSelectedProfessionals = () => {
		if (selectedProfessionals.length === 0) {
			alert("Nenhum profissional selecionado.");
			return;
		}
		if (
			window.confirm(
				`Tem certeza que deseja excluir ${selectedProfessionals.length} profissional(is) selecionado(s)?`
			)
		) {
			onDeleteProfessionals(selectedProfessionals);
			setSelectedProfessionals([]);
		}
	};

	const handleSelectCompanion = (id) => {
		setSelectedCompanions((prevSelected: any) =>
			prevSelected.includes(id)
				? prevSelected.filter((sid) => sid !== id)
				: [...prevSelected, id]
		);
	};
	const handleSelectAllCompanions = () => {
		if (
			selectedCompanions.length === companions.length &&
			companions.length > 0
		) {
			setSelectedCompanions([]);
		} else {
			setSelectedCompanions(companions.map((c) => c.id));
		}
	};
	const handleDeleteSelectedCompanions = () => {
		if (selectedCompanions.length === 0) {
			alert("Nenhum acompanhante selecionado.");
			return;
		}
		if (
			window.confirm(
				`Tem certeza que deseja excluir ${selectedCompanions.length} acompanhante(s) selecionado(s)?`
			)
		) {
			onDeleteCompanions(selectedCompanions);
			setSelectedCompanions([]);
		}
	};

	// Função para lidar com o clique na linha para ver detalhes/editar
	const handleRowClick = (id) => {
		navigate(`/cadastros/detalhes/${id}`);
	};

	return (
		<div className="w-full mx-auto p-4 min-h-screen">
			<h1 className="text-2xl font-bold mb-4">
				Gerenciamento de Cadastros
			</h1>

			<div className="mb-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
				<button
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
					onClick={() => navigate("/agendamentos")}
				>
					Ir para Agendamentos
				</button>
			</div>

			<div className="mb-4 flex flex-wrap gap-2">
				<button
					className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
					onClick={() => navigate("/cadastros/paciente")}
				>
					+ Cadastrar Novo Paciente
				</button>
				<button
					className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
					onClick={() => navigate("/cadastros/profissional")}
				>
					+ Cadastrar Novo Profissional
				</button>
				<button
					className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
					onClick={() => navigate("/cadastros/acompanhante")}
				>
					+ Cadastrar Novo Acompanhante
				</button>
			</div>

			<div className="mb-4 border-b border-gray-200">
				<nav className="-mb-px flex space-x-8" aria-label="Tabs">
					<button
						className={`py-2 px-4 border-b-2 font-medium text-sm ${
							activeList === "patients"
								? "border-indigo-500 text-indigo-600"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
						}`}
						onClick={() => setActiveList("patients")}
					>
						Pacientes
					</button>
					<button
						className={`py-2 px-4 border-b-2 font-medium text-sm ${
							activeList === "professionals"
								? "border-indigo-500 text-indigo-600"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
						}`}
						onClick={() => setActiveList("professionals")}
					>
						Profissionais
					</button>
					<button
						className={`py-2 px-4 border-b-2 font-medium text-sm ${
							activeList === "companions"
								? "border-indigo-500 text-indigo-600"
								: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
						}`}
						onClick={() => setActiveList("companions")}
					>
						Acompanhantes
					</button>
				</nav>
			</div>

			<div className="mb-4">
				{activeList === "patients" && selectedPatients.length > 0 && (
					<button
						className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
						onClick={handleDeleteSelectedPatients}
					>
						Excluir Pacientes Selecionados (
						{selectedPatients.length})
					</button>
				)}
				{activeList === "professionals" &&
					selectedProfessionals.length > 0 && (
						<button
							className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
							onClick={handleDeleteSelectedProfessionals}
						>
							Excluir Profissionais Selecionados (
							{selectedProfessionals.length})
						</button>
					)}
				{activeList === "companions" &&
					selectedCompanions.length > 0 && (
						<button
							className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
							onClick={handleDeleteSelectedCompanions}
						>
							Excluir Acompanhantes Selecionados (
							{selectedCompanions.length})
						</button>
					)}
			</div>

			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				{activeList === "patients" && (
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
										onChange={handleSelectAllPatients}
										checked={
											patients.length > 0 &&
											selectedPatients.length ===
												patients.length
										}
										ref={(el) => {
											if (el)
												el.indeterminate =
													selectedPatients.length >
														0 &&
													selectedPatients.length <
														patients.length;
										}}
									/>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									ID
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Nome
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									CPF
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Data Nasc.
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Acompanhante
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{patients.map((patient) => (
								<tr
									key={patient.id}
									className="hover:bg-gray-50"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<input
											type="checkbox"
											className="h-4 w-4 text-blue-600 border-gray-300 rounded"
											checked={selectedPatients.includes(
												patient.id as never
											)}
											onChange={() =>
												handleSelectPatient(patient.id)
											}
											onClick={(e) => e.stopPropagation()} // Previne clique na linha
										/>
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
										onClick={() =>
											handleRowClick(patient.id)
										}
									>
										{patient.id}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(patient.id)
										}
									>
										{patient.name}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(patient.id)
										}
									>
										{formatCpf(patient.cpf)}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(patient.id)
										}
									>
										{formatDateToBrazilian(patient.dob)}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(patient.id)
										}
									>
										{patient.companionId
											? companions.find(
													(c) =>
														c.id ===
														patient.companionId
											  )?.name || "N/A"
											: "N/A"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}

				{activeList === "professionals" && (
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
										onChange={handleSelectAllProfessionals}
										checked={
											professionals.length > 0 &&
											selectedProfessionals.length ===
												professionals.length
										}
										ref={(el) => {
											if (el)
												el.indeterminate =
													selectedProfessionals.length >
														0 &&
													selectedProfessionals.length <
														professionals.length;
										}}
									/>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									ID
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Nome
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									CRM
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									CPF
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Data Nasc.
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Especialidade
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{professionals.map((professional) => (
								<tr
									key={professional.id}
									className="hover:bg-gray-50"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<input
											type="checkbox"
											className="h-4 w-4 text-blue-600 border-gray-300 rounded"
											checked={selectedProfessionals.includes(
												professional.id as never
											)}
											onChange={() =>
												handleSelectProfessional(
													professional.id
												)
											}
											onClick={(e) => e.stopPropagation()}
										/>
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
										onClick={() =>
											handleRowClick(professional.id)
										}
									>
										{professional.id}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(professional.id)
										}
									>
										{professional.name}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(professional.id)
										}
									>
										{professional.crm || "N/A"}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(professional.id)
										}
									>
										{formatCpf(professional.cpf)}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(professional.id)
										}
									>
										{formatDateToBrazilian(
											professional.dob
										)}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(professional.id)
										}
									>
										{professional.specialty}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}

				{activeList === "companions" && (
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
										onChange={handleSelectAllCompanions}
										checked={
											companions.length > 0 &&
											selectedCompanions.length ===
												companions.length
										}
										ref={(el) => {
											if (el)
												el.indeterminate =
													selectedCompanions.length >
														0 &&
													selectedCompanions.length <
														companions.length;
										}}
									/>
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									ID
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Nome
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									CPF
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{companions.map((companion) => (
								<tr
									key={companion.id}
									className="hover:bg-gray-50"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<input
											type="checkbox"
											className="h-4 w-4 text-blue-600 border-gray-300 rounded"
											checked={selectedCompanions.includes(
												companion.id as never
											)}
											onChange={() =>
												handleSelectCompanion(
													companion.id
												)
											}
											onClick={(e) => e.stopPropagation()}
										/>
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
										onClick={() =>
											handleRowClick(companion.id)
										}
									>
										{companion.id}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(companion.id)
										}
									>
										{companion.name}
									</td>
									<td
										className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
										onClick={() =>
											handleRowClick(companion.id)
										}
									>
										{formatCpf(companion.cpf)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
