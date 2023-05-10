import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { API_HOST } from '@env'
// axios.CancelToken ?

const API_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuYW1uZyIsImlhdCI6MTY4MzcwMTM0MywiZXhwIjoxNjgzNzg3NzQzfQ.jB67tVp3ibOHAvkEXHnM3sOi9Iso0ZH2hdBI09QhX133c3IRG_bmbli7OQt8_z3qGQir_fi67-ELcszD9e0oiQ'

const Axios = axios.create({
  baseURL: `${API_HOST}`,
  headers: { Authorization: `Bearer ${API_TOKEN}` },
  timeout: 10000,
  timeoutErrorMessage: "timeout"
})

function getResource(resource) {
  switch (resource) {
    case Resources.Auth: return '/api/auth'
    case Resources.Sentence: return '/api/sentence'
    case Resources.QA: return '/api'
    default: return '/api'
  }
}

/** May need to refactor to manage functions by resources more effectively (centralizing) */

/** Authentication & user information */

/**
 * @param {{username: string, password: string}} data
 * @param {AxiosRequestConfig} config
 * @returns {Promise<AxiosResponse<any,any>>}
 */
const login = (data, config) => Axios.post(`${getResource(Resources.Auth)}/login`, data, config)

/**
 * @param {{username: string, email: string, phone: string, password: string, rePassword: string}} data
 * @param {AxiosRequestConfig} config
 * @returns {Promise<AxiosResponse<any,any>>}
 */
const register = (data, config) => Axios.post(`${getResource(Resources.Auth)}/register`, data, config)

/**
 * @param {{oldPassword: string, newPassword: string, rePassword: string}} data 
 * @param {AxiosRequestConfig} config 
 * @returns {Promise<AxiosResponse<any,any>>}
 */
const changePassword = (data, config) => Axios.put(`${getResource(Resources.Auth)}/change-password`, data, config)


/** Main operations: text translation & persisting translated records */

/**
 * @param {AxiosRequestConfig} config
 * @returns {Promise<AxiosResponse<any,any>>}
 */
const getHistory = (config) => Axios.get(`${getResource(Resources.Sentence)}/all`, config)

/**
 * @param {number} id
 * @param {AxiosRequestConfig} config
 * @returns {Promise<AxiosResponse<any,any>>}
 */
const deleteRecord = (id, config) => Axios.delete(`${getResource(Resources.Sentence)}/${id}`, config)

/**
 * @param {number} id
 * @param {AxiosRequestConfig} config
 * @returns {Promise<AxiosResponse<any,any>>}
 */
const changeSaving = (id, config) => Axios.get(`${getResource(Resources.Sentence)}/like/${id}`, config)

/**
 * @param {AxiosRequestConfig} config 
 * @returns {Promise<AxiosResponse<any,any>>}
 */
const getSavedRecords = (config) => Axios.get(`${getResource(Resources.Sentence)}/favour`, config)

/******/

export const Resources = {
  Auth: 0,
  Sentence: 1,
  QA: 2,
}

/**
 * Returns a set of functions to send corresponding requests based on passed resource type,
 * or returns an Axios instance by default.
 * @param {number} resource 
 * @returns {object | AxiosInstance}
 */
export const useFetch = (resource) => {
  if (typeof resource != 'number' || !Object.values(Resources).includes(resource)) throw 'useFetch: resource is not valid.'

  switch (resource) {
    case Resources.Auth:
      return {
        login, register, changePassword
      }

    case Resources.Sentence:
      return {
        getHistory, delete: deleteRecord, changeSaving, getSavedRecords
      }

    case Resources.QA:
      return Axios
  }

  return Axios
}