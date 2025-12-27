import { supabase } from './supabaseClient';

export interface Client {
  id: number;
  name: string;
  email: string;
  companyName?: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
  date: string;
}

const fallbackClients: Client[] = [
  {
    id: 1,
    name: 'Somchai Jaidee',
    email: 'somchai@example.com',
    companyName: 'Siam Tech Co., Ltd.',
    phone: '+66 81 234 5678',
    inquiryType: 'wholesale',
    subject: 'Request for bulk order pricing',
    message: 'We are looking to purchase 50 chairs for our new office.',
    date: '2023-10-25'
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    companyName: '',
    phone: '+1 555 123 4567',
    inquiryType: 'support',
    subject: 'Assembly instructions missing',
    message: 'I received my chair but cannot find the manual.',
    date: '2023-10-26'
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'john.smith@corporate.com',
    companyName: 'Global Corp',
    phone: '+44 20 7946 0123',
    inquiryType: 'general',
    subject: 'Showroom visit',
    message: 'Can I visit your showroom this weekend?',
    date: '2023-10-27'
  }
];

const STORAGE_KEY = 'clients_data';

function getLocalClients(): Client[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load from local storage', e);
  }
  return null;
}

function setLocalClients(clients: Client[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

export const fetchClients = async (): Promise<Client[]> => {
  // Try to get from local storage first
  const localData = getLocalClients();
  if (localData) return localData;

  // Return fallback data if no local data
  return fallbackClients;
};

export const deleteClient = async (id: number): Promise<void> => {
  const currentClients = await fetchClients();
  const updatedClients = currentClients.filter(c => c.id !== id);
  setLocalClients(updatedClients);
};

export const saveClient = async (client: Client): Promise<Client> => {
  const currentClients = await fetchClients();
  const index = currentClients.findIndex(c => c.id === client.id);
  
  if (index >= 0) {
    currentClients[index] = client;
    setLocalClients(currentClients);
  }
  
  return client;
};
