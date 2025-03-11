import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENCORE_API_URL,
})

export interface Monitor {
    id: string;
    url: string;
    name: string;
    status: string;
    lastChecked: string;
}

export const getStatus = async (): Promise<Monitor[]> => {
    const response = await api.get('/status');
    return response.data;
};

export const createPing = async(data: { url: string; name: string}): Promise<Monitor> => {
    const response = await api.post('/ping', data);
    return response.data;
};
export const checkMonitor = async (id: string): Promise<void> => {
    await api.delete('/check/${id}');
}
