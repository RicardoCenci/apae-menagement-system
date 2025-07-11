import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Appointment } from "@/type";

interface CadastroAgendamentoPageProps {
	onAddAppointment: (appointment: Appointment) => void;
}

export function CadastroAgendamentoPage({ onAddAppointment }: CadastroAgendamentoPageProps) {
	const [patient, setPatient] = useState<string>("");
	const [professional, setProfessional] = useState<string>("");
	const [specialty, setSpecialty] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [notes, setNotes] = useState<string>("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!patient || !professional || !specialty || !date) {
			alert(
				"Por favor, preencha todos os campos obrigatórios (Paciente, Profissional, Especialidade, Data)."
			);
			return;
		}

		const newAppointment: Appointment = {
			id: `P${Date.now()}`,
			patient,
			professional,
			specialty,
			date,
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "pending",
			notes,
		};

		onAddAppointment(newAppointment);
		navigate("/agendamentos");
	};

	return (
		<div className="container mx-auto p-4 max-w-md bg-white shadow-md rounded-lg mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">
				Novo Agendamento
			</h2>
			<form onSubmit={handleSubmit}>
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={patient}
						onChange={(e) => setPatient(e.target.value)}
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={professional}
						onChange={(e) => setProfessional(e.target.value)}
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={specialty}
						onChange={(e) => setSpecialty(e.target.value)}
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
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
						rows={3}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
					></textarea>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Cadastrar Agendamento
					</button>
					<button
						type="button"
						onClick={() => navigate("/agendamentos")}
						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	);
}
