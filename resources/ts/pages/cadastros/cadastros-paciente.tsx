import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CadastroPacientePage({ onAddPatient, companions }) {
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [dob, setDob] = useState(""); // Date of Birth - AAAA-MM-DD
	const [companionId, setCompanionId] = useState(""); // Para vincular acompanhante
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !cpf || !dob) {
			alert("Por favor, preencha todos os campos obrigatórios.");
			return;
		}

		onAddPatient({ name, cpf, dob, companionId: companionId || null });
		alert("Paciente cadastrado com sucesso!");
		navigate("/cadastros"); // Volta para a tela principal de cadastros
	};

	return (
		<div className="container mx-auto p-4 max-w-md bg-white shadow-md rounded-lg mt-8">
			<h2 className="text-2xl font-bold mb-4 text-gray-800">
				Cadastrar Novo Paciente
			</h2>
			<form onSubmit={handleSubmit}>
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={name}
						onChange={(e) => setName(e.target.value)}
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={cpf}
						onChange={(e) => setCpf(e.target.value)}
						required
					/>
				</div>
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
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="companion"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Vincular Acompanhante (Opcional):
					</label>
					<select
						id="companion"
						className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={companionId}
						onChange={(e) => setCompanionId(e.target.value)}
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
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Cadastrar
					</button>
					<button
						type="button"
						onClick={() => navigate("/cadastros")}
						className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	);
}
