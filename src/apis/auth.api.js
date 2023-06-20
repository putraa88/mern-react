import axios from "axios";
import { server_url } from "../constants/server.constant";

// Login
export const LOGIN = async ({ email, password }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${server_url}/v2/auth/login`,
      data: {
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Register
export const REGISTER = async ({ name, email, password }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${server_url}/v2/auth/register`,
      data: {
        name,
        email,
        password
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}