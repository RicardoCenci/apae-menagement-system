import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateToBrazilian } from "@/utils/date";
import type { Appointment } from "@/type";

interface DetalhesAgendamentoPageProps {
	appointments: Appointment[];
	onUpdateAppointment: (id: string, appointment: Appointment) => void;
}

export function DetalhesAgendamentoPage({ appointments, onUpdateAppointment }: DetalhesAgendamentoPageProps) {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [currentAppointmentData, setCurrentAppointmentData] =
		useState<Appointment | null>(null);

	useEffect(() => {
		const foundAppointment = appointments.find((app) => app.id === id);
		if (foundAppointment) {
			setCurrentAppointmentData({ ...foundAppointment }); // Copia para o estado de edição
		} else {
			navigate("/agendamentos"); // Volta para a tela de agendamentos se não encontrar
			alert("Agendamento não encontrado!");
		}
	}, [id, appointments, navigate]); // Re-executa se o ID ou a lista de agendamentos mudar

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		if (!currentAppointmentData) return;

		if (
			!currentAppointmentData.patient ||
			!currentAppointmentData.professional ||
			!currentAppointmentData.specialty ||
			!currentAppointmentData.date
		) {
			alert(
				"Por favor, preencha todos os campos obrigatórios (Paciente, Profissional, Especialidade, Data)."
			);
			return;
		}

		onUpdateAppointment(currentAppointmentData.id, currentAppointmentData);
		alert("Agendamento atualizado com sucesso!");
		setIsEditing(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setCurrentAppointmentData((prevData) => {
			if (!prevData) return null;
			return {
				...prevData,
				[name]: name === 'justifiedAbsences' || name === 'unjustifiedAbsences' 
					? parseInt(value) || 0 
					: value,
			};
		});
	};

	// Funções para lidar com as faltas (pode editar aqui ou manter no ControleAgendamentos)
	// Para simplificar, vou manter apenas os campos de input, assumindo que a edição é manual aqui.
	// Se quiser a interatividade do clique, precisaria de um controle separado para essa tela ou ajustar o handleClickStatus.

	if (!currentAppointmentData) {
		return (
			<div className="container mx-auto p-4 mt-8 text-center text-gray-700">
				Carregando detalhes do agendamento...
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 max-w-md bg-white shadow-md rounded-lg mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">
				{isEditing ? "Editar Agendamento" : "Detalhes do Agendamento"}
			</h2>

			{isEditing ? (
				<form onSubmit={handleSave}>
					<div className="mb-4">
						<label
							htmlFor="patient"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Paciente:
						</label>
						<input
							type="text"
							id="patient"
							name="patient"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentAppointmentData.patient}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="professional"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Profissional:
						</label>
						<input
							type="text"
							id="professional"
							name="professional"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentAppointmentData.professional}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="specialty"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Especialidade:
						</label>
						<input
							type="text"
							id="specialty"
							name="specialty"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentAppointmentData.specialty}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="date"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Data:
						</label>
						<input
							type="date"
							id="date"
							name="date"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentAppointmentData.date}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="justifiedAbsences"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Faltas Justificadas:
						</label>
						<input
							type="number"
							id="justifiedAbsences"
							name="justifiedAbsences"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentAppointmentData.justifiedAbsences}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="unjustifiedAbsences"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Faltas Não Justificadas:
						</label>
						<input
							type="number"
							id="unjustifiedAbsences"
							name="unjustifiedAbsences"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentAppointmentData.unjustifiedAbsences}
							onChange={handleChange}
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="notes"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Observação:
						</label>
						<textarea
							id="notes"
							name="notes"
							rows={3}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentAppointmentData.notes || ""}
							onChange={handleChange}
						></textarea>
					</div>
					<div className="flex items-center justify-between">
						<button
							type="submit"
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Salvar Alterações
						</button>
						<button
							type="button"
							onClick={() => {
								setIsEditing(false);
							}}
							className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Cancelar
						</button>
					</div>
				</form>
			) : (
				// Modo de Visualização
				<div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">
								ID do Paciente:
							</span>{" "}
							{currentAppointmentData.id}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">Paciente:</span>{" "}
							{currentAppointmentData.patient}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">Profissional:</span>{" "}
							{currentAppointmentData.professional}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">
								Especialidade:
							</span>{" "}
							{currentAppointmentData.specialty}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">Data:</span>{" "}
							{formatDateToBrazilian(currentAppointmentData.date)}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">
								Faltas Justificadas:
							</span>{" "}
							{currentAppointmentData.justifiedAbsences}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">
								Faltas Não Justificadas:
							</span>{" "}
							{currentAppointmentData.unjustifiedAbsences}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">Status:</span>{" "}
							{currentAppointmentData.status === "confirmed"
								? "Confirmado"
								: currentAppointmentData.status === "absent"
								? "Ausente"
								: "Pendente"}
						</p>
					</div>
					<div className="mb-4 p-3 bg-gray-100 rounded">
						<p className="font-semibold">Observação:</p>
						<p className="text-gray-700 italic">
							{currentAppointmentData.notes ||
								"Nenhuma observação."}
						</p>
					</div>
					<div className="flex items-center justify-between mt-4">
						<button
							onClick={() => setIsEditing(true)}
							className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Editar
						</button>
						<button
							onClick={() => navigate("/agendamentos")}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Voltar para Agendamentos
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
