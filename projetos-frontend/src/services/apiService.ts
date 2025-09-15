import axios from 'axios';
import type { Owner, CreateOwnerDto, UpdateOwnerDto } from '../types/owner';
import type { Projetos, CreateProjetosDto, UpdateProjetosDto } from '../types/projetos';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para log de requests (desenvolvimento)
api.interceptors.request.use((config) => {
  console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const ownerService = {
  // GET /owner
  getAll: async (): Promise<Owner[]> => {
    const response = await api.get<Owner[]>('/owner');
    return response.data;
  },

  // GET /owner/:id
  getById: async (id: string): Promise<Owner> => {
    const response = await api.get<Owner>(`/owner/${id}`);
    return response.data;
  },

  // POST /owner
  create: async (data: CreateOwnerDto): Promise<Owner> => {
    const response = await api.post<Owner>('/owner', data);
    return response.data;
  },

  // PATCH /owner/:id
  update: async (id: string, data: UpdateOwnerDto): Promise<Owner> => {
    const response = await api.patch<Owner>(`/owner/${id}`, data);
    return response.data;
  },

  // DELETE /owner/:id
  delete: async (id: string): Promise<void> => {
    await api.delete(`/owner/${id}`);
  },
};

export const projetosService = {
  // GET /projetos
  getAll: async (): Promise<Projetos[]> => {
    const response = await api.get<Projetos[]>('/projetos');
    return response.data;
  },

  // GET /projetos/:id
  getById: async (id: string): Promise<Projetos> => {
    const response = await api.get<Projetos>(`/projetos/${id}`);
    return response.data;
  },

  // POST /projetos
  create: async (data: CreateProjetosDto): Promise<Projetos> => {
    const response = await api.post<Projetos>('/projetos', data);
    return response.data;
  },

  // PATCH /projetos/:id
  update: async (id: string, data: UpdateProjetosDto): Promise<Projetos> => {
    const response = await api.patch<Projetos>(`/projetos/${id}`, data);
    return response.data;
  },

  // DELETE /projetos/:id
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projetos/${id}`);
  },
};

export default api;