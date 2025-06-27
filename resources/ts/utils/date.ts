export function formatDate(date: Date) {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
}
