export const formatCpf = (cpf: string): string => {
	if (!cpf) return "";
	const cleaned = cpf.replace(/\D/g, "");
	if (cleaned.length === 11) {
		return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
	}
	return cpf;
};
