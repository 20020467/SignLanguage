import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { API_HOST } from '@env'

// const API_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuYW1uZyIsImlhdCI6MTY4MzcwMTM0MywiZXhwIjoxNjgzNzg3NzQzfQ.jB67tVp3ibOHAvkEXHnM3sOi9Iso0ZH2hdBI09QhX133c3IRG_bmbli7OQt8_z3qGQir_fi67-ELcszD9e0oiQ'
// "http://signlanguage:8080"

const Axios = axios.create({
  baseURL: `http://192.168.0.101:8080`,
  // baseURL: `${API_HOST}`,
  // headers: { Authorization: `Bearer ${API_TOKEN}` },
  timeout: 10000,
  timeoutErrorMessage: "timeout"
})

function getResource(resource: Resources) {
  switch (resource) {
    case Resources.Auth: return '/api/auth'
    case Resources.Sentence: return '/api/sentence'
    case Resources.QA: return '/api'
    default: return '/api'
  }
}


// May need to refactor to manage functions by resources more effectively (centralizing)

export enum Resources {
  Auth,
  Sentence,
  QA,
}

/**
 * Returns a set of functions corresponding to the passed resource type,
 * or returns an Axios instance by default.
 * May be replaced by using resource's objects which contain request functions.
 */
export const useFetch = (resource: number): object | AxiosInstance => {
  if (typeof resource != 'number' || !(resource in Resources)) throw 'useFetch: resource is not valid.'
  // if (typeof resource != 'number' || !(Object.values(Resources).includes(resource))) throw 'useFetch: resource is not valid.'

  switch (resource) {
    case Resources.Auth:
      return auth

    case Resources.Sentence:
      return record

    case Resources.QA:
      return Axios
  }

  return Axios
}

/******/

// Authentication & user information 

type TLoginData = { username: string, password: string }

// const login = (data: TLoginData, config: AxiosRequestConfig<TLoginData>): Promise<AxiosResponse<TLoginResponseData, TLoginData>> => (
//   Axios.post<TLoginResponseData>(`${getResource(Resources.Auth)}/login`, data, config)
// )

type TRegisterData = { username: string; email: string; phone: string; password: string; rePassword: string }

// const register = (data: TRegisterData, config: AxiosRequestConfig) => (
//   Axios.post(`${getResource(Resources.Auth)}/register`, data, config)
// )

type TChangePasswordData = { oldPassword: string, newPassword: string, rePassword: string }

// const changePassword = (data: TChangePasswordData, config: AxiosRequestConfig) => (
//   Axios.put(`${getResource(Resources.Auth)}/change-password`, data, config)
// )

// const getUserInfo = (config: AxiosRequestConfig) => (
//   Axios.get<TUserInfoResponseData>(`${getResource(Resources.Sentence)}`, config)
// )

// Main operations: text translation & persisting translated records

// const getHistory = (config: AxiosRequestConfig) => (
//   Axios.get(`${getResource(Resources.Sentence)}/all`, config)
// )

// const addRecord = (config: AxiosRequestConfig) => (
//   Axios.get<TAddRecordResponseData>(`${getResource(Resources.Sentence)}`, config)
// )

// const deleteRecord = (id: number, config: AxiosRequestConfig) => (
//   Axios.delete(`${getResource(Resources.Sentence)}/${id}`, config)
// )

// const getSavedRecords = (config: AxiosRequestConfig) => (
//   Axios.get(`${getResource(Resources.Sentence)}/favour`, config)
// )

// const changeSaving = (id: number, config: AxiosRequestConfig) => (
//   Axios.get(`${getResource(Resources.Sentence)}/like/${id}`, config)
// )

/********/

export const auth = {
  login: (data: TLoginData, token: string, config: AxiosRequestConfig<TLoginData>) => (
    Axios.post<TLoginResponseData>(`${getResource(Resources.Auth)}/login`, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
  register: (data: TRegisterData, token: string, config: AxiosRequestConfig) => (
    Axios.post(`${getResource(Resources.Auth)}/register`, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
  changePassword: (data: TChangePasswordData, token: string, config: AxiosRequestConfig) => (
    Axios.put(`${getResource(Resources.Auth)}/change-password`, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
  getUserInfo: (token: string, config: AxiosRequestConfig) => (
    Axios.get<TUserInfoResponseData>(`${getResource(Resources.Sentence)}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
}

export const record = {
  getHistory: (token: string, config: AxiosRequestConfig) => (
    Axios.get(`${getResource(Resources.Sentence)}/all`, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
  addRecord: (data: string, token: string, config: AxiosRequestConfig) => (
    Axios.post<TAddRecordResponseData>(`${getResource(Resources.Sentence)}`,
      { content: data },
      {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    )
  ),
  delete: (id: number, token: string, config: AxiosRequestConfig) => (
    Axios.delete(`${getResource(Resources.Sentence)}/${id}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
  getSavedRecords: (token: string, config: AxiosRequestConfig) => (
    Axios.get(`${getResource(Resources.Sentence)}/favour`, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
  changeSaving: (id: number, token: string, config: AxiosRequestConfig) => (
    Axios.get(`${getResource(Resources.Sentence)}/like/${id}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
}

/********/

// Response data types

type TAuthorizedResponse = {
  status: string,
  message: string,
  // [k: string]: any,
  // data: object,
}

type TLoginResponseData = TAuthorizedResponse & {
  data: {
    data: {
      "id": number,
      "username": string,
      "authorities": [
        {
          "authority": string
        }
      ],
      "enabled": boolean,
      "accountNonExpired": boolean,
      "accountNonLocked": boolean,
      "credentialsNonExpired": boolean
    },
    token: string
  }
}

type TAddRecordResponseData = TAuthorizedResponse & {
  data: {
    id: number,
    content: string,
    viewTime: string,
    favor: boolean,
  }
}

type TUserInfoResponseData = TAuthorizedResponse & {
  data: {
    "id": number,
    "username": string,
    "password": string,
    "email": string,
    "phone": string,
  }
}

