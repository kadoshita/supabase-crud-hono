import createClient from 'openapi-fetch';
import type { paths } from './api.d';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiClient {
  private readonly GET: ReturnType<typeof createClient<paths>>['GET'];
  private readonly POST: ReturnType<typeof createClient<paths>>['POST'];
  private readonly DELETE: ReturnType<typeof createClient<paths>>['DELETE'];

  constructor(token: string) {
    const { GET, POST, DELETE } = createClient<paths>({
      baseUrl: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    this.GET = GET;
    this.POST = POST;
    this.DELETE = DELETE;
  }

  async getUsers() {
    const { data, error } = await this.GET('/api/v1/users');
    if (error) {
      throw new Error('getUsers failed', {
        cause: error,
      });
    }
    return data;
  }

  async getUser(id: string) {
    const { data, error } = await this.GET('/api/v1/users/{id}', {
      params: {
        path: {
          id,
        },
      },
    });
    if (error) {
      throw new Error('getUser failed', {
        cause: error,
      });
    }
    return data;
  }

  async createUser(
    params: paths['/api/v1/users']['post']['requestBody']['content']['application/json']
  ) {
    const { data, error } = await this.POST('/api/v1/users', {
      body: params,
    });
    if (error) {
      throw new Error('createUser failed', {
        cause: error,
      });
    }
    return data;
  }

  async deleteUser(id: string) {
    const { data, error } = await this.DELETE('/api/v1/users/{id}', {
      params: {
        path: {
          id,
        },
      },
    });
    if (error) {
      throw new Error('deleteUser failed', {
        cause: error,
      });
    }
    return data;
  }
}
