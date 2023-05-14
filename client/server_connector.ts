import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError, HttpStatusCode } from 'axios'
import { API_HOST } from '@env'
import { ToastAndroid } from 'react-native'

// const API_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuYW1uZyIsImlhdCI6MTY4MzcwMTM0MywiZXhwIjoxNjgzNzg3NzQzfQ.jB67tVp3ibOHAvkEXHnM3sOi9Iso0ZH2hdBI09QhX133c3IRG_bmbli7OQt8_z3qGQir_fi67-ELcszD9e0oiQ'
// Create axios instance 
const Axios = axios.create({
  baseURL: `${API_HOST}`,
  // headers: { Authorization: `Bearer ${API_TOKEN}` },
  timeout: 10000,
  timeoutErrorMessage: "timeout"
})

enum Resources {
  Auth,
  Sentence,
  QA,
}

export enum ErrorTypes {
  TOKEN_NOT_FOUND, // "token not found, required to login"
  TOKEN_EXPIRED, // "token has expired, required to login"
  INVALID_TOKEN, // "invalid token, required to login"
}

type RequestErrors = {
  type: ErrorTypes,
  message: string,
}


/********/

// consider making objects like auth, record become IIFE to set & get their own resource base path

// Authentication & user information

export const auth = (() => {
  const path = getResource(Resources.Auth)

  return {
    login: async (data: TLoginData, token: string, config: AxiosRequestConfig<TLoginData>) => makeRequest(
      Axios.post<TLoginResponseData>(`${path}/login`, data, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    ),
    register: async (data: TRegisterData, token: string, config: AxiosRequestConfig) => makeRequest(
      Axios.post(`${path}/register`, data, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    ),
    changePassword: async (data: TChangePasswordData, token: string, config: AxiosRequestConfig) => makeRequest(
      Axios.put(`${path}/change-password`, data, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    ),
    changeInfo: async (data: TChangeInfoData, token: string, config: AxiosRequestConfig) => makeRequest(
      Axios.put(`${path}/update`, data, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    ),
    getUserInfo: async (token: string, config: AxiosRequestConfig) => makeRequest(
      Axios.get<TUserInfoResponseData>(`${path}`, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    ),
  }
})()

// Main operations: text translation & persisting translated records
export const record = (() => {
  const path = getResource(Resources.Sentence)

  return {
    getHistory: async (token: string, config: AxiosRequestConfig) => makeRequest(
      Axios.get<THistoryListData>(`${path}/all`, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    ),
    addRecord: async (data: string, token: string, config: AxiosRequestConfig) => makeRequest(
      Axios.post<TAddRecordResponseData>(`${path}`, { content: data },
        {
          ...config,
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
    ),
    delete: async (id: number, token: string, config: AxiosRequestConfig) => makeRequest(
      Axios.delete(`${path}/${id}`, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    ),
    getSavedRecords: async (token: string, config: AxiosRequestConfig) => makeRequest(
      Axios.get(`${path}/favour`, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    ),
    changeSaving: async (id: number, token: string, config: AxiosRequestConfig) => {
      // await syntax is not mandatory
      return makeRequest(Axios.get(`${path}/like/${id}`, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`
        },
      }))
    },
  }
})()

/**
 * This function is responsible for filtering network error from making request, then forwarding
 * (maybe the same) response or error to functions that call it.
 * Consider marking user functions as 'async' and using 'await' before calling this ???
 */
const makeRequest = async (request: Promise<AxiosResponse>) => {
  let response: AxiosResponse | any

  try {
    response = await request // works
    console.log(response.status)
    return response
    // 4xx, 5xx errors will be thrown and handled here or in .catch above
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) { // not receive any response - network error
        ToastAndroid.show("Lỗi kết nối, vui lòng kiểm tra mạng và thử lại", ToastAndroid.SHORT)
      } else if (error.response.status == HttpStatusCode.NotFound) {
        ToastAndroid.show("Dịch vụ tạm thời chưa khả dụng, vui lòng thử lại sau", ToastAndroid.SHORT)
      } else {
        console.log(error.response.status)
        throw error
      }
    }
  }
}

/********/
/** 
 * New resource classes, which are similar to resource objs in version 1 except this is passed 
 * with user token only once in component (if token hasn't yet change).
 * (next update)
 * 1. create a common errors enum like token related errors and return in redeclared async functions
 * 2. may redeclare API based functions to async functions
 * 3. convert resource objects to classes with a param is user token, initialized and updated with:
 *    (1) useMemo(func, [token]) or (2) useRef and useEffect(func, [token]).
 * 4. API consumers will only call to the classes once with token passed before using it to send reqs directly, 
 * helps reduce passing token multiple times.
 */
/********/

export class auth_2 {
  private token: string
  private path: string = getResource(Resources.Auth)

  constructor(token: string) {
    // const validationResult = validateTokenBeforeRequest(token)
    // if (validationResult instanceof Reques)
    this.token = token
  }

  login(data: TLoginData, config: AxiosRequestConfig<TLoginData>) {
    return makeRequest(Axios.post<TLoginResponseData>(`${this.path}/login`, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }

  register(data: TRegisterData, config: AxiosRequestConfig) {
    return makeRequest(Axios.post(`${this.path}/register`, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }

  changePassword(data: TChangePasswordData, config: AxiosRequestConfig) {
    return makeRequest(Axios.put(`${this.path}/change-password`, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }

  changeInfo(data: TChangeInfoData, config: AxiosRequestConfig) {
    return makeRequest(Axios.put(`${this.path}/update`, data, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }

  getUserInfo(config: AxiosRequestConfig) {
    return makeRequest(Axios.get<TUserInfoResponseData>(`${this.path}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }
}

export class record_2 {
  private token: string
  private path: string = getResource(Resources.Sentence)

  constructor(token: string) {
    this.token = token
  }

  public async getHistory(config: AxiosRequestConfig) {
    return await makeRequest(Axios.get<THistoryListData>(`${this.path}/all`, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }

  async addRecord(data: string, config: AxiosRequestConfig) {
    return await makeRequest(Axios.post<TAddRecordResponseData>(`${this.path}`, { content: data }, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }

  async delete(id: number, config: AxiosRequestConfig) {
    return await makeRequest(Axios.delete(`${this.path}/${id}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }

  async getSavedRecords(config: AxiosRequestConfig) {
    return await makeRequest(Axios.get(`${this.path}/favour`, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }

  async changeSaving(id: number, config: AxiosRequestConfig) {
    // await syntax is not mandatory
    return await makeRequest(Axios.get(`${this.path}/like/${id}`, {
      ...config,
      headers: {
        Authorization: `Bearer ${this.token}`
      },
    }))
  }
}

// function validateTokenBeforeRequest(token: string): true | RequestErrors {
//   if (typeof token == 'undefined') return {
//     type: ErrorTypes.TOKEN_NOT_FOUND,
//     message: "token not found, required to login"
//   }

//   if (typeof token != 'string' || token.length == 0) return {
//     type: ErrorTypes.INVALID_TOKEN,
//     message: "invalid token, required to login"
//   }

//   return true
// }

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


function getResource(resource: Resources) {
  switch (resource) {
    case Resources.Auth: return '/api/auth'
    case Resources.Sentence: return '/api/sentence'
    case Resources.QA: return '/api'
    default: return '/api'
  }
}

/**
 * Returns a set of functions corresponding to the passed resource type,
 * or returns an Axios instance by default.
 * May be replaced by using resources's objects which contain all related request functions.
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