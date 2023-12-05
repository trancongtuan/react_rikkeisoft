import axios from "axios";

const apiTypiCode = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 15000,
});

export const api = apiTypiCode;
