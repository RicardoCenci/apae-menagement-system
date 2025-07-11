import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatCpf } from "@/utils/format";
import { formatDateToBrazilian } from "@/utils/date";
import type { Patient, Professional, Companion } from "@/type";

interface DetalhesCadastroPageProps {
	patients: Patient[];
	professionals: Professional[];
	companions: Companion[];
	onUpdatePatient: (id: string, patient: Patient) => void;
	onUpdateProfessional: (id: string, professional: Professional) => void;
	onUpdateCompanion: (id: string, companion: Companion) => void;
}

export function DetalhesCadastroPage({
	patients,
	professionals,
	companions,
	onUpdatePatient,
	onUpdateProfessional,
	onUpdateCompanion,
}: DetalhesCadastroPageProps) {
	const params = useParams(); // Pega o ID (ex: PAC001, PROF001, ACOM001)

	const { id } = params as { id: string };
	const navigate = useNavigate();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [currentData, setCurrentData] = useState<Patient | Professional | Companion | null>(null);
	const [dataType, setDataType] = useState<'patient' | 'professional' | 'companion' | null>(null);

	useEffect(() => {
		let foundItem: Patient | Professional | Companion | null = null;
		let type: 'patient' | 'professional' | 'companion' | null = null;

		if (id.startsWith("PAC")) {
			foundItem = patients.find((p) => p.id === id);
			type = "patient";
		} else if (id.startsWith("PROF")) {
			foundItem = professionals.find((p) => p.id === id);
			type = "professional";
		} else if (id.startsWith("ACOM")) {
			foundItem = companions.find((c) => c.id === id);
			type = "companion";
		}

		if (foundItem) {
			setCurrentData({ ...foundItem });
			setDataType(type);
		} else {
			navigate("/cadastros");
			alert("Cadastro não encontrado!");
		}
	}, [id, patients, professionals, companions, navigate]); // Re-executa se o ID ou as listas mudarem

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		if (!currentData) return;

		let success = false;
		switch (dataType) {
			case "patient":
				const patientData = currentData as Patient;
				if (!patientData.name || !patientData.cpf || !patientData.dob) {
					alert("Nome, CPF e Data de Nascimento são obrigatórios.");
					return;
				}
				onUpdatePatient(patientData.id, patientData);
				success = true;
				break;
			case "professional":
				const professionalData = currentData as Professional;
				if (
					!professionalData.name ||
					!professionalData.cpf ||
					!professionalData.dob ||
					!professionalData.specialty
				) {
					alert(
						"Nome, CPF, Data de Nascimento e Especialidade são obrigatórios."
					);
					return;
				}
				onUpdateProfessional(professionalData.id, professionalData);
				success = true;
				break;
			case "companion":
				const companionData = currentData as Companion;
				if (!companionData.name || !companionData.cpf) {
					alert("Nome e CPF são obrigatórios.");
					return;
				}
				onUpdateCompanion(companionData.id, companionData);
				success = true;
				break;
			default:
				break;
		}

		if (success) {
			alert("Cadastro atualizado com sucesso!");
			setIsEditing(false); // Volta para o modo de visualização
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCurrentData((prevData) => ({
			...prevData,
			[name]: value === "" && name.includes("Id") ? null : value, // Trata campo de acompanhante vazio
		}));
	};

	if (!currentData) {
		return (
			<div className="container mx-auto p-4 mt-8 text-center text-gray-700">
				Carregando detalhes do cadastro...
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4 max-w-md bg-white shadow-md rounded-lg mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">
				{isEditing
					? `Editar ${
							dataType === "patient"
								? "Paciente"
								: dataType === "professional"
								? "Profissional"
								: "Acompanhante"
					  }`
					: `Detalhes do ${
							dataType === "patient"
								? "Paciente"
								: dataType === "professional"
								? "Profissional"
								: "Acompanhante"
					  }`}
			</h2>

			{isEditing ? (
				<form onSubmit={handleSave}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Nome:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="cpf"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							CPF:
						</label>
						<input
							type="text"
							id="cpf"
							name="cpf"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={currentData.cpf}
							onChange={handleChange}
							required
						/>
					</div>

					{dataType !== "companion" && ( // Campos apenas para Paciente e Profissional
						<>
							<div className="mb-4">
								<label
									htmlFor="dob"
									className="block text-gray-700 text-sm font-bold mb-2"
								>
									Data de Nascimento:
								</label>
								<input
									type="date"
									id="dob"
									name="dob"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									value={currentData.dob}
									onChange={handleChange}
									required
								/>
							</div>
						</>
					)}

					{dataType === "patient" && ( // Campo específico para Paciente
						<div className="mb-6">
							<label
								htmlFor="companionId"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Vincular Acompanhante (Opcional):
							</label>
							<select
								id="companionId"
								name="companionId"
								className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								value={currentData.companionId || ""}
								onChange={handleChange}
							>
								<option value="">
									-- Selecione um acompanhante --
								</option>
								{companions.map((comp) => (
									<option key={comp.id} value={comp.id}>
										{comp.name}
									</option>
								))}
							</select>
						</div>
					)}

					{dataType === "professional" && ( // Campo específico para Profissional
						<>
							<div className="mb-4">
								<label
									htmlFor="crm"
									className="block text-gray-700 text-sm font-bold mb-2"
								>
									CRM (Opcional):
								</label>
								<input
									type="text"
									id="crm"
									name="crm"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									value={currentData.crm || ""}
									onChange={handleChange}
								/>
							</div>
							<div className="mb-6">
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
									value={currentData.specialty}
									onChange={handleChange}
									required
								/>
							</div>
						</>
					)}

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
							<span className="font-semibold">ID:</span>{" "}
							{currentData.id}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">Nome:</span>{" "}
							{currentData.name}
						</p>
					</div>
					<div className="mb-2">
						<p>
							<span className="font-semibold">CPF:</span>{" "}
							{formatCpf(currentData.cpf)}
						</p>
					</div>

					{dataType !== "companion" && (
						<div className="mb-2">
							<p>
								<span className="font-semibold">
									Data de Nascimento:
								</span>{" "}
								{formatDateToBrazilian(currentData.dob)}
							</p>
						</div>
					)}

					{dataType === "patient" && (
						<div className="mb-2">
							<p>
								<span className="font-semibold">
									Acompanhante:
								</span>{" "}
								{currentData.companionId
									? companions.find(
											(c) =>
												c.id === currentData.companionId
									  )?.name || "N/A"
									: "N/A"}
							</p>
						</div>
					)}

					{dataType === "professional" && (
						<>
							<div className="mb-2">
								<p>
									<span className="font-semibold">CRM:</span>{" "}
									{currentData.crm || "N/A"}
								</p>
							</div>
							<div className="mb-2">
								<p>
									<span className="font-semibold">
										Especialidade:
									</span>{" "}
									{currentData.specialty}
								</p>
							</div>
						</>
					)}

					<div className="flex items-center justify-between mt-4">
						<button
							onClick={() => setIsEditing(true)}
							className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Editar
						</button>
						<button
							onClick={() => navigate("/cadastros")}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Voltar para Cadastros
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
