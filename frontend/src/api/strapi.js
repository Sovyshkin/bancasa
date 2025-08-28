/* eslint-disable */
import axios from "axios";

const baseURL = process.env.VUE_APP_STRAPI_URL || "http://38.180.141.64/api";

const strapi = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setStrapiToken(token) {
  if (token) {
    strapi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete strapi.defaults.headers.common["Authorization"];
  }
}

export async function fetchCollection(collection, params = {}) {
  const response = await strapi.get(`${collection}`, { params });
  return response.data;
}

export async function fetchSingle(contentType, id, params = {}) {
  const response = await strapi.get(`${contentType}/${id}`, { params });
  return response.data;
}

export async function fetchComponents(params = {}) {
  // const response = await strapi.get('home-page?populate=*');
  return response.data;
}


export default strapi;


