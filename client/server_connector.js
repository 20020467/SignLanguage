import axios from 'axios'
import { API_HOST, API_TOKEN } from '@env'

// axios.CancelToken ?
export const Axios = axios.create({
  baseURL: `${API_HOST}`,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
  timeout: 1500,
  timeoutErrorMessage: "timeout"
})

export const useFetch = (resource) => {
  if (typeof resource != 'string' && resource in []) throw 'useFetch: Resource is not of either type string or undefined.'
  const destination = `/api/${resource}`

  switch (resource) {
    case 'sentence':
      return {
        getHistory:  (config) =>  Axios.get(`${destination}/all`, config),
        delete:  (id, config) =>  Axios.delete(`${destination}/${id}`, config),
        changeSaving:  (id, config) =>  Axios.get(`${destination}/like/${id}`, config),
        getSavedRecords: async (config) => await Axios.get(`${destination}/favour`, config),
      }

    case 'q&a':
      return Axios

    case 'auth':
      return Axios
  }

  return Axios
}