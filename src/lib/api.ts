import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      adapter: "fetch", // Use fetch to prevent Node url.parse deprecation warning
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

  private isFormDataPayload(value: unknown): value is FormData {
    return typeof FormData !== "undefined" && value instanceof FormData;
  }

  private cloneFormData(source: FormData) {
    const clonedFormData = new FormData();

    source.forEach((value, key) => {
      clonedFormData.append(key, value);
    });

    return clonedFormData;
  }

  async post<TResponse, TRequest>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    const isMultipartRequest = this.isFormDataPayload(data);
    const requestData = isMultipartRequest
      ? this.cloneFormData(data)
      : data;
    const headers = AxiosHeaders.from(
      config?.headers as AxiosHeaders | Record<string, string> | undefined,
    );

    if (isMultipartRequest) {
      headers.delete("Content-Type");
      headers.delete("content-type");
    }

    const response = await this.instance.post<TResponse>(url, requestData, {
      ...config,
      headers,
      ...(isMultipartRequest ? { adapter: ["xhr", "http"] } : {}),
    });
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
