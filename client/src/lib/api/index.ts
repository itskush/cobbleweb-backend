import axios from 'axios';
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

interface LoginData {
  email: string;
  password: string;  
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photos: [];
}

/**
 * Sends a POST request to register a user.
 * @param userData - An object containing the user's registration data.
 * @returns A Promise that resolves to the response data.
 * @throws If there is an error registering the user.
 */
export async function registerUser(userData: any): Promise<any> {
  try {
    const response = await apiClient.post<any>('/api/register', userData,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': '*/*',
      }
    });
    return response.data;
  } catch (error :any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error);
  }
}

/**
 * The `loginUser` function is an asynchronous function that sends a POST request to a login API endpoint with the provided user credentials.
 * It expects to receive a response containing a token.
 * 
 * @param credentials An object containing the user's email and password.
 * @returns The token received from the server.
 */
export async function loginUser(credentials: LoginData): Promise<any> {
  try {
    const response = await apiClient.post<any>('/api/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      }
    });
    if(!response.data.access_token) {
      throw new Error('Internal Server Error. Please try again later.');
    }
    return response.data;

  } catch (error : any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error);
    }
  }
}

/**
 * Retrieves the user profile data from an API endpoint.
 * @param token - The access token used for authentication.
 * @returns The user profile data retrieved from the API.
 */
export async function getUserProfile(token: any): Promise<User> {
  try {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await apiClient.get<User>('/api/users/me');
    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve user profile');
  }
}
