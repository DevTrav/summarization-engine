import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENCORE_API_URL,
});

export interface Site {
    id: string;
    url: string;
}

interface SitesResponse {
    sites: Site[];
}

export interface AddSiteParams {
    url: string;
}

export const addSite = async (params: AddSiteParams): Promise<Site> => {
    try {
        const response = await api.post('/site', params);
        console.log('Add site response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Add site error:', error);
        throw error;
    }
};

export const listSites = async (): Promise<Site[]> => {
    try {
        const response = await api.get<SitesResponse>('/site');
        console.log('List sites raw response:', response.data);
        
        if (!response.data || !response.data.sites) {
            console.warn('No sites data in response');
            return [];
        }

        return response.data.sites;
    } catch (error) {
        console.error('List sites error:', error);
        throw error;
    }
};