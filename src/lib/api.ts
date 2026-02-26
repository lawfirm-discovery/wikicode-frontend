const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  category: 'web' | 'mobile' | 'desktop' | 'api';
  contributorCount: number;
  revenue: number;
  techStack: string[];
  license: string;
  readme?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  name: string;
  description?: string;
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contributor {
  id: string;
  user: User;
  contribution: number;
  role: string;
  joinedAt: string;
}

class ApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') || undefined : undefined;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getMe(): Promise<User> {
    return this.request('/api/auth/me');
  }

  // Project endpoints
  async getProjects(category?: string, search?: string): Promise<Project[]> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    return this.request(`/api/projects?${params}`);
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return this.request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async getProject(id: string): Promise<Project> {
    return this.request(`/api/projects/${id}`);
  }

  async getBranches(projectId: string): Promise<Branch[]> {
    return this.request(`/api/projects/${projectId}/branches`);
  }

  async createBranch(projectId: string, name: string, description?: string): Promise<Branch> {
    return this.request(`/api/projects/${projectId}/branches`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    });
  }

  // AI endpoints
  async generateCode(prompt: string): Promise<{ code: string; explanation: string }> {
    return this.request('/api/ai/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
    });
  }

  async modifyCode(code: string, instruction: string): Promise<{ code: string; explanation: string }> {
    return this.request('/api/ai/modify', {
      method: 'POST',
      body: JSON.stringify({ code, instruction }),
    });
  }

  // Sandbox endpoints
  async createSandbox(projectId: string, branchId: string): Promise<{ sandboxId: string }> {
    return this.request('/api/sandbox/create', {
      method: 'POST',
      body: JSON.stringify({ projectId, branchId }),
    });
  }

  async getSandboxStatus(sandboxId: string): Promise<{ status: 'creating' | 'ready' | 'error' }> {
    return this.request(`/api/sandbox/${sandboxId}/status`);
  }

  async getPreviewUrl(sandboxId: string): Promise<{ url: string }> {
    return this.request(`/api/sandbox/${sandboxId}/preview`);
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = undefined;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}

export const apiClient = new ApiClient();