import axios from "axios"
import { server_url } from "../constants/server.constant";

// GET
export const GETALLPRODUCTS = async (query) => {
  try {

    // params conversion
    let paramsString = ''
    if (query.limit) {
      paramsString += `limit=${query.limit}&`;
    }
    if (query.page) {
      paramsString += `page=${query.page}&`;
    }
    if (query.name) {
      paramsString += `name=${query.name}&`;
    }
    if (query.category) {
      paramsString += `categoryId=${query.category}`;
    }

    const products = await axios({
      method: 'GET',
      url: `${server_url}/v2/products?${paramsString}`,
      headers: buildHeaders(),
    });
    return products.data.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const GETPRODUCT = async (id) => {
  try {
    const products = await axios({
      method: 'GET',
      url: `${server_url}/v2/products/${id}`,
      headers: buildHeaders(),
    });
    return products.data.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const GETALLCATEGORIES = async () => {
  try {
    const categories = await axios({
      method: 'GET',
      url: `${server_url}/v2/categories`,
      headers: buildHeaders(),
    });
    return categories.data.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const GETALLTAGS = async () => {
  try {
    const tags = await axios({
      method: 'GET',
      url: `${server_url}/v2/tags`,
      headers: buildHeaders(),
    });
    return tags.data.data;
  } catch (error) {
    throw error.response.data;
  }
}




// POST

export const CREATEPRODUCT = async (payload) => {
  try {
    const tags = await axios({
      method: 'POST',
      url: `${server_url}/v2/products`,
      headers: buildHeaders(),
      data: payload,
    });
    return tags.data.message;
  } catch (error) {
    throw error.response.data;
  }
}


// PUT
export const EDITPRODUCT = async (id, payload) => {
  try {
    const tags = await axios({
      method: 'PUT',
      url: `${server_url}/v2/products/${id}`,
      data: payload,
      headers: buildHeaders(),
    });
    return tags.data.message;
  } catch (error) {
    throw error.response.data;
  }
}





// DELETE
export const DELETEPRODUCT = async (id) => {
  try {
    const tags = await axios({
      method: 'DELETE',
      url: `${server_url}/v2/products/${id}`,
      headers: buildHeaders(),
    });
    return tags.data.message;
  } catch (error) {
    throw error.response.data;
  }
}

// check token
const buildHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) return { path: '/' };
  return {
    authorization: token,
  }
}