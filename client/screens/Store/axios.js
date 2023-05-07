import axios from 'axios'
import { API_HOST, API_TOKEN } from '@env'

// axios.CancelToken ?
export const Axios = axios.create({
  baseURL: `${API_HOST}`,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
  timeout: 1500,
  timeoutErrorMessage: "The request is timeout"
})

export const useFetch = (resource) => {
  if (typeof resource != 'string') throw 'useFetch: Resource is not of type string.'
  const destination = `/api/${resource}`

  switch (resource) {
    case 'sentence':
      return {
        getHistory: async (config) => await Axios.get(`${destination}/all`, config),
        delete:  (id, config) =>  Axios.delete(`${destination}/${id}`, config),
        save: async (id, config) => await Axios.get(`${destination}/like/${id}`, config),
        getSavedRecords: async (config) => await Axios.get(`${destination}/favour`, config),
      }

    default: throw 'useFetch: unknown resource'
  }

  return Axios
}