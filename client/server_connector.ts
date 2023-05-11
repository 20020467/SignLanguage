import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { API_HOST } from '@env'

// const API_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuYW1uZyIsImlhdCI6MTY4MzcwMTM0MywiZXhwIjoxNjgzNzg3NzQzfQ.jB67tVp3ibOHAvkEXHnM3sOi9Iso0ZH2hdBI09QhX133c3IRG_bmbli7OQt8_z3qGQir_fi67-ELcszD9e0oiQ'


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


/********/

// consider making objects like auth, record become IIFE to set & get their own resource base path

// Authentication & user information 

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
  changeInfo: (data: TChangeInfoData, token: string, config: AxiosRequestConfig) => (
    Axios.put(`${getResource(Resources.Auth)}/update`, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
  getUserInfo: (token: string, config: AxiosRequestConfig) => (
    Axios.get<TUserInfoResponseData>(`${getResource(Resources.Auth)}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
  ),
}

// Main operations: text translation & persisting translated records
export const record = {
  getHistory: (token: string, config: AxiosRequestConfig) => (
    Axios.get<THistoryListData>(`${getResource(Resources.Sentence)}/all`, {
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

// Request data types

type TLoginData = { username: string, password: string }

type TRegisterData = { username: string; email: string; phone: string; password: string; rePassword: string }

type TChangePasswordData = { oldPassword: string, newPassword: string, rePassword: string }

type TChangeInfoData = { username?: string, email?: string, phone?: string }

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

type TUserInfoResponseData = TAuthorizedResponse & {
  data: {
    "id": number,
    "username": string,
    "password": string,
    "email": string,
    "phone": string,
  }
}

type THistoryRecord = TAuthorizedResponse & {
  id: number,
  content: string,
  viewTime: string,
  favor: boolean,
}

type THistoryListData = TAuthorizedResponse & {
  data: Array<THistoryRecord>
}

type TAddRecordResponseData = TAuthorizedResponse & {
  data: THistoryRecord
}


// Create axios instance 
const Axios = axios.create({
  baseURL: `${API_HOST}`,
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
