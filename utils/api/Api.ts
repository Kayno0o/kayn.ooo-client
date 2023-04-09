export default class Api<T = any> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get(endpoint = this.endpoint): Promise<T> {
    return this.customGet<T>(endpoint);
  }

  async customGet<U>(route = this.endpoint): Promise<U> {
    const token = localStorage.getItem('token');

    return new Promise((resolve, reject) => {
      fetch(process.env.NEXT_PUBLIC_API_URL + route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            reject(data);
          } else {
            resolve(data);
          }
        });
    });
  }

  async post(data: T, endpoint = this.endpoint): Promise<T> {
    return this.customPost<T, T>(data, endpoint);
  }

  async customPost<T, U>(data: T, route = this.endpoint): Promise<U> {
    console.log(process.env.NEXT_PUBLIC_API_URL, route);
    const token = localStorage.getItem('token');

    return new Promise((resolve, reject) => {
      fetch(process.env.NEXT_PUBLIC_API_URL + route, {
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            reject(data);
          } else {
            resolve(data);
          }
        });
    });
  }
}
