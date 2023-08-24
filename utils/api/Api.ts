import process from 'process'
import type { Identifiable } from '../../types'

export default class Api<T extends Identifiable> {
  endpoint: string
  pluralEndpoint: string

  constructor(endpoint: string, pluralEndpoint?: string) {
    this.endpoint = endpoint
    this.pluralEndpoint = pluralEndpoint || `${endpoint}s`
  }

  async find(endpoint = this.endpoint): Promise<T> {
    return this.customGet<T>(endpoint)
  }

  async findAll(): Promise<Array<T>> {
    return this.customGet<Array<T>>(this.pluralEndpoint)
  }

  async create(data: T, endpoint = this.endpoint): Promise<T> {
    return this.customPost<T, T>(data, endpoint)
  }

  async update(data: T, endpoint = this.endpoint): Promise<T> {
    return this.customPut<T, T>(data, endpoint)
  }

  async customGet<U>(route = this.endpoint): Promise<U> {
    const token = localStorage.getItem('token')

    return new Promise((resolve, reject) => {
      fetch(process.env.NEXT_PUBLIC_API_URL + route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then((data) => {
          if (data.error)
            reject(data)
          else
            resolve(data)
        })
        .catch(reject)
    })
  }

  async customPost<T, U>(data: T, route = this.endpoint): Promise<U> {
    const token = localStorage.getItem('token')

    return new Promise((resolve, reject) => {
      fetch(process.env.NEXT_PUBLIC_API_URL + route, {
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then(res => res.json())
        .then((data) => {
          if (data.error)
            reject(data)
          else
            resolve(data)
        })
        .catch(reject)
    })
  }

  async customPut<T, U>(data: T, route = this.endpoint): Promise<U> {
    const token = localStorage.getItem('token')

    return new Promise((resolve, reject) => {
      fetch(process.env.NEXT_PUBLIC_API_URL + route, {
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      })
        .then(res => res.json())
        .then((data) => {
          if (data.error)
            reject(data)
          else
            resolve(data)
        })
        .catch(reject)
    })
  }
}
