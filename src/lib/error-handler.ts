import axios from "axios";

/**
 * Extracts a user-friendly error message from an error object,
 * specifically handling Axios errors from the backend.
 */
export function getErrorMessage(error: unknown): string {
  console.error("Error detected:", error);

  if (axios.isAxiosError(error)) {
    // Check if the backend provided a specific message
    const backendMessage = error.response?.data?.message;
    if (backendMessage) return backendMessage;

    // Check for common HTTP status codes
    if (error.response?.status === 401)
      return "Session expired. Please login again.";
    if (error.response?.status === 403)
      return "You don't have permission to perform this action.";
    if (error.response?.status === 404)
      return "The requested resource was not found.";
    if (error.response?.status === 500)
      return "Global server error. Please try again later.";

    return error.message || "An unexpected network error occurred.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again.";
}
