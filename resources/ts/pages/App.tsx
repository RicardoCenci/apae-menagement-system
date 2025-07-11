import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotFoundPage } from "@/pages/404";
import { LoginPage } from "@/pages/login";
import { MainLayout } from "@/components/layouts/MainLayout";
import { LogoutPage } from "@/pages/logout";
import { AuthProvider } from "@/context/AuthContext";
import { ListagemAgendamentosPage } from "@/pages/agendamentos";
import { CadastroAgendamentoPage } from "@/pages/agendamentos/new";
import { DetalhesAgendamentoPage } from "@/pages/agendamentos/detail";
import { CadastrosPages } from "@/pages/cadastros";
import { CadastroPacientePage } from "@/pages/cadastros/cadastros-paciente";
import { CadastroProfissionalPage } from "@/pages/cadastros/cadastro-profissional";
import { CadastroAcompanhantePage } from "@/pages/cadastros/cadastro-acompanhante";
import { DetalhesCadastroPage } from "@/pages/cadastros/detail";
import type { Appointment, Patient, Professional, Companion } from "@/type";

export function App() {
	const [appointments, setAppointments] = useState<Appointment[]>([
		{
			id: "P001",
			patient: "Alice Johnson",
			specialty: "Cardiology",
			professional: "Dr. Emily White",
			date: "2025-07-08",
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "pending",
			notes: "Primeira consulta.",
		},
		{
			id: "P002",
			patient: "Robert Smith",
			specialty: "Pediatrics",
			professional: "Dr. Michael Brown",
			date: "2025-07-08",
			justifiedAbsences: 0,
			unjustifiedAbsences: 1,
			status: "pending",
			notes: "",
		},
		{
			id: "P003",
			patient: "Maria Garcia",
			specialty: "Orthopedics",
			professional: "Dr. Sarah Lee",
			date: "2025-07-09",
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "confirmed",
			notes: "Paciente com recuperação completa.",
		},
		{
			id: "P004",
			patient: "David Rodriguez",
			specialty: "Dermatology",
			professional: "Dr. Alex Chen",
			date: "2025-07-09",
			justifiedAbsences: 2,
			unjustifiedAbsences: 0,
			status: "pending",
			notes: "Retorno para check-up.",
		},
		{
			id: "P005",
			patient: "Sophia Miller",
			specialty: "General Practice",
			professional: "Dr. Olivia Wilson",
			date: "2025-07-10",
			justifiedAbsences: 0,
			unjustifiedAbsences: 2,
			status: "pending",
			notes: "Observar novos sintomas.",
		},
		{
			id: "P006",
			patient: "James Davis",
			specialty: "Neurology",
			professional: "Dr. Daniel Martinez",
			date: "2025-07-10",
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "pending",
			notes: "",
		},
		{
			id: "P007",
			patient: "Isabella Taylor",
			specialty: "Cardiology",
			professional: "Dr. Emily White",
			date: "2025-07-11",
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "confirmed",
			notes: "Exames de rotina.",
		},
		{
			id: "P008",
			patient: "William Clark",
			specialty: "Pediatrics",
			professional: "Dr. Michael Brown",
			date: "2025-07-11",
			justifiedAbsences: 0,
			unjustifiedAbsences: 1,
			status: "pending",
			notes: "",
		},
		{
			id: "P009",
			patient: "Charlotte Lewis",
			specialty: "Orthopedics",
			professional: "Dr. Sarah Lee",
			date: "2025-07-12",
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "confirmed",
			notes: "Sessão de fisioterapia.",
		},
		{
			id: "P010",
			patient: "Joseph Hall",
			specialty: "Dermatology",
			professional: "Dr. Alex Chen",
			date: "2025-07-12",
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "confirmed",
			notes: "Tratamento de pele.",
		},
		{
			id: "P011",
			patient: "Mia King",
			specialty: "General Practice",
			professional: "Dr. Olivia Wilson",
			date: "2025-07-13",
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "pending",
			notes: "Primeiro check-up anual.",
		},
		{
			id: "P012",
			patient: "Daniel Green",
			specialty: "Neurology",
			professional: "Dr. Daniel Martinez",
			date: "2025-07-13",
			justifiedAbsences: 0,
			unjustifiedAbsences: 0,
			status: "confirmed",
			notes: "",
		},
	]);

	const [patients, setPatients] = useState<Patient[]>([
		{
			id: "PAC001",
			name: "Alice Johnson",
			cpf: "111.111.111-11",
			dob: "1990-05-15",
			companionId: null,
		},
		{
			id: "PAC002",
			name: "Robert Smith",
			cpf: "222.222.222-22",
			dob: "1985-11-20",
			companionId: "ACOM001",
		},
	]);
	const [professionals, setProfessionals] = useState<Professional[]>([
		{
			id: "PROF001",
			name: "Dr. Emily White",
			crm: "SP123456",
			cpf: "333.333.333-33",
			dob: "1978-03-10",
			specialty: "Cardiology",
		},
		{
			id: "PROF002",
			name: "Dr. Michael Brown",
			crm: null,
			cpf: "444.444.444-44",
			dob: "1982-07-25",
			specialty: "Pediatrics",
		},
	]);
	const [companions, setCompanions] = useState<Companion[]>([
		{ id: "ACOM001", name: "Maria Silva", cpf: "555.555.555-55" },
	]);

	const handleAddAppointment = (newAppointment: Appointment) => {
		setAppointments((prevAppointments) => [
			...prevAppointments,
			newAppointment,
		]);
	};
	const updateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
		setAppointments((prevAppointments) =>
			prevAppointments.map((appointment) =>
				appointment.id === id
					? { ...appointment, status: newStatus }
					: appointment
			)
		);
	};
	const handleDeleteAppointments = (idsToDelete: string[]) => {
		setAppointments((prevAppointments) =>
			prevAppointments.filter(
				(appointment) => !idsToDelete.includes(appointment.id)
			)
		);
	};
	const handleUpdateAppointment = (id: string, updatedAppointment: Appointment) => {
		setAppointments((prevAppointments) =>
			prevAppointments.map((appointment) =>
				appointment.id === id ? updatedAppointment : appointment
			)
		);
	};

	const handleAddPatient = (newPatient: Omit<Patient, 'id'>) => {
		setPatients((prevPatients) => [
			...prevPatients,
			{ ...newPatient, id: `PAC${Date.now()}` },
		]);
	};
	const handleDeletePatients = (idsToDelete: string[]) => {
		setPatients((prevPatients) =>
			prevPatients.filter((patient) => !idsToDelete.includes(patient.id))
		);
	};
	const handleUpdatePatient = (id: string, updatedPatient: Patient) => {
		setPatients((prevPatients) =>
			prevPatients.map((patient) =>
				patient.id === id ? updatedPatient : patient
			)
		);
	};

	const handleAddProfessional = (newProfessional: Omit<Professional, 'id'>) => {
		setProfessionals((prevProfessionals) => [
			...prevProfessionals,
			{ ...newProfessional, id: `PROF${Date.now()}` },
		]);
	};
	const handleDeleteProfessionals = (idsToDelete: string[]) => {
		setProfessionals((prevProfessionals) =>
			prevProfessionals.filter(
				(professional) => !idsToDelete.includes(professional.id)
			)
		);
	};
	const handleUpdateProfessional = (id: string, updatedProfessional: Professional) => {
		setProfessionals((prevProfessionals) =>
			prevProfessionals.map((professional) =>
				professional.id === id ? updatedProfessional : professional
			)
		);
	};

	const handleAddCompanion = (newCompanion: Omit<Companion, 'id'>) => {
		setCompanions((prevCompanions) => [
			...prevCompanions,
			{ ...newCompanion, id: `ACOM${Date.now()}` },
		]);
	};
	const handleDeleteCompanions = (idsToDelete: string[]) => {
		setCompanions((prevCompanions) =>
			prevCompanions.filter(
				(companion) => !idsToDelete.includes(companion.id)
			)
		);
	};
	const handleUpdateCompanion = (id: string, updatedCompanion: Companion) => {
		setCompanions((prevCompanions) =>
			prevCompanions.map((companion) =>
				companion.id === id ? updatedCompanion : companion
			)
		);
	};
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route
							path="/"
							element={<Navigate to="/agendamentos" replace />}
						/>
						<Route
							path="/agendamentos"
							element={
								<ListagemAgendamentosPage
									appointments={appointments}
									setAppointments={updateAppointmentStatus}
									onDeleteAppointments={
										handleDeleteAppointments
									}
								/>
							}
						/>

						<Route
							path="/agendamentos/new"
							element={
								<CadastroAgendamentoPage
									onAddAppointment={handleAddAppointment}
								/>
							}
						/>

						<Route
							path="/agendamentos/:id"
							element={
								<DetalhesAgendamentoPage
									appointments={appointments}
									onUpdateAppointment={
										handleUpdateAppointment
									}
								/>
							}
						/>

						<Route
							path="/cadastros"
							element={
								<CadastrosPages
									patients={patients}
									professionals={professionals}
									companions={companions}
									onDeletePatients={handleDeletePatients}
									onDeleteProfessionals={
										handleDeleteProfessionals
									}
									onDeleteCompanions={handleDeleteCompanions}
								/>
							}
						/>
						<Route
							path="/cadastros/paciente"
							element={
								<CadastroPacientePage
									onAddPatient={handleAddPatient}
									companions={companions}
								/>
							}
						/>
						<Route
							path="/cadastros/profissional"
							element={
								<CadastroProfissionalPage
									onAddProfessional={handleAddProfessional}
								/>
							}
						/>
						<Route
							path="/cadastros/acompanhante"
							element={
								<CadastroAcompanhantePage
									onAddCompanion={handleAddCompanion}
								/>
							}
						/>

						<Route
							path="/cadastros/detalhes/:id"
							element={
								<DetalhesCadastroPage
									patients={patients}
									professionals={professionals}
									companions={companions}
									onUpdatePatient={handleUpdatePatient}
									onUpdateProfessional={
										handleUpdateProfessional
									}
									onUpdateCompanion={handleUpdateCompanion}
								/>
							}
						/>
					</Route>

					<Route path="login" element={<LoginPage />} />
					<Route path="logout" element={<LogoutPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}
