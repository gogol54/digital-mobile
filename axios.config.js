import axios from "axios"

const BASE_URL = process.env.API_PUBLIC_ENDPOINT

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})