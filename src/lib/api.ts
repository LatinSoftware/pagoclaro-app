import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      adapter: "fetch", // Use fetch to prevent Node url.parse deprecation warning
      headers: {
        "Content-Type": "application/json",
      },
    });

    // We'll handle tokens dynamically since this might run on server or client
    this.instance.interceptors.request.use(async (config) => {
      let token: string | undefined;

      // Check if we are on server or client
      if (typeof window === "undefined") {
        // Server side
        const { createClient } = await import("@/lib/supabase/server");
        const supabase = await createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        token = session?.access_token;
      } else {
        // Client side
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        token = session?.access_token;
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<TResponse, TRequest>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.instance.post<TResponse>(url, data, config);
    return response.data;
  }

  async patch<TResponse, TRequest>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.instance.patch<TResponse>(url, data, config);
    return response.data;
  }

  async delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const response = await this.instance.delete<TResponse>(url, config);
    return response.data;
  }
}

export const api = new ApiService();
