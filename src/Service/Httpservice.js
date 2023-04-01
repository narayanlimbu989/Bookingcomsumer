import axios from "axios";

const token = JSON.parse(localStorage.getItem("customer"))?.token;
export const base_url = "https://bookingapi-8rjt.onrender.com/hotels/api";
export const api = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
