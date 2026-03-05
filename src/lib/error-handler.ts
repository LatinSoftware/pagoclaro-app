import axios from "axios";

interface ErrorMessage {
  error: string;
  statusCode: number;
}
interface ApiError extends ErrorMessage {
  success: false;
}

/**
 * Extracts a user-friendly error message from an error object,
 * specifically handling Axios errors from the backend.
 */
export function getErrorMessage(error: unknown): ErrorMessage {
  if (axios.isAxiosError(error)) {
    // Check if the backend provided a specific message
    const backendMessage = error.response?.data?.message;
    if (backendMessage) {
      return {
        error: backendMessage,
        statusCode: error.response?.status || 400,
      };
    }

    // Check for common HTTP status codes
    if (error.response?.status === 401)
      return {
        error: "Session expired. Please login again.",
        statusCode: 401,
      };
    if (error.response?.status === 403)
      return {
        error: "You don't have permission to perform this action.",
        statusCode: 403,
      };
    if (error.response?.status === 404)
      return {
        error: "The requested resource was not found.",
        statusCode: 404,
      };
    if (error.response?.status === 500)
      return {
        error: "Global server error. Please try again later.",
        statusCode: 500,
      };
    if (error.response?.status === 404)
      return {
        error: "The requested resource was not found.",
        statusCode: 404,
      };

    return {
      error: error.message || "An unexpected network error occurred.",
      statusCode: error.response?.status || 500,
    };
  }

  if (error instanceof Error) {
    return {
      error: error.message,
      statusCode: 500,
    };
  }

  return {
    error: "An unexpected error occurred. Please try again.",
    statusCode: 500,
  };
}

export function handleApiError(error: unknown, context?: string): ApiError {
  if (context) {
    console.error(`Error in ${context}:`, error);
  } else {
    console.error("API Error:", error);
  }

  const errMessage = getErrorMessage(error);

  return {
    success: false,
    error: errMessage.error,
    statusCode: errMessage.statusCode,
  };
}
