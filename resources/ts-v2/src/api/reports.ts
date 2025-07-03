
/**
 * Dummy persistence using localStorage
 */

const STORAGE_KEY = 'reports_store';

const getStore = (): Record<string, any>[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveStore = (data: Record<string, any>[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const persistIncomingReports = async (reports: Record<string, any>[]) => {
  await new Promise((res) => setTimeout(res, 300)); // simulate latency
  const current = getStore();
  const updated = [...current, ...reports];
  saveStore(updated);
  return updated;
};

export const fetchReports = async (): Promise<Record<string, any>[]> => {
  await new Promise((res) => setTimeout(res, 300));
  return getStore();
};
