import axios, { AxiosError, AxiosResponse, AxiosInstance } from "axios";

const baseURL = process.env.HOST;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface CustomResponse<T> {
  ok: boolean;
  data?: T;
  error?: {
    message: string;
    status?: number;
  };
}

export default async function requestHandler<T>(
  requestFunction: () => Promise<AxiosResponse<ApiResponse<T>>>
): Promise<CustomResponse<T>> {
  try {
    const response = await requestFunction();
    if (response.status >= 200 || response.status <= 300) {
      return { ok: true, data: response.data };
    }
    return {
      ok: false,
      error: { message: response.data.message || "", status: response.status },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<unknown>>;
      return {
        ok: false,
        error: {
          message:
            axiosError.response?.data.message ||
            "An unexpected API error occurred",
          status: axiosError.response?.status,
        },
      };
    }

    return {
      ok: false,
      error: {
        message: "An unexpected error occurred",
        status: 500,
      },
    };
  }
}

export { axiosInstance };
