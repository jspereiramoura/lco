import axios from "axios";
import { buildStorage, setupCache } from "axios-cache-interceptor";
import { INDEXED_DB_STORAGE_KEYS } from "../../utils/consts";
import { minutesToMilliseconds } from "../../utils/functions";
import { createLocalForageStorage } from "./createLocalForageStorage";

const axiosInstance = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

const apiClient = setupCache(axiosInstance, {
  storage: buildStorage(
    createLocalForageStorage(INDEXED_DB_STORAGE_KEYS.API_CACHE)
  ),
  ttl: minutesToMilliseconds(5),
  override: true
});

export default apiClient;
