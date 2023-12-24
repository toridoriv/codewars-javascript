export class HttpClient {
  /** @param {string} baseUrl */
  constructor(baseUrl) {
    this.baseUrl = new URL(baseUrl);
    this.basePath = this.baseUrl.pathname.startsWith("/")
      ? this.baseUrl.pathname.substring(1)
      : this.baseUrl.pathname;
  }

  /**
   * @param {string}      endpoint
   * @param {RequestInit} options
   * @returns {Promise<Response>}
   */
  async fetch(endpoint, options = {}) {
    const url = new URL(this.basePath + endpoint, this.baseUrl);
    const response = await fetch(url, options);

    if (response.status >= 400) {
      throw new Error("There was an error.", {
        cause: {
          url,
          status: response.status,
          statusText: response.statusText,
          body: await response.text(),
          headers: response.headers,
        },
      });
    }

    return response;
  }

  /**
   * @template T
   * @param {string}      endpoint
   * @param {RequestInit} [options={}]
   * @returns {Promise<HttpResponse<T>>}
   */
  async getJson(endpoint, options = {}) {
    const response = await this.fetch(endpoint, { ...options, method: "GET" });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      // @ts-ignore: ¯\_(ツ)_/¯
      body: await response.json(),
    };
  }

  /**
   * @template T
   * @param {string}      endpoint
   * @param {RequestInit} [options={}]
   * @returns {Promise<HttpResponse<T>>}
   */
  async postJson(endpoint, options = {}) {
    const response = await this.fetch(endpoint, { ...options, method: "POST" });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      // @ts-ignore: ¯\_(ツ)_/¯
      body: await response.json(),
    };
  }

  /**
   * @param {string}      endpoint
   * @param {RequestInit} [options={}]
   * @returns {Promise<HttpResponse<string>>}
   */
  async get(endpoint, options = {}) {
    const response = await this.fetch(endpoint, { ...options, method: "GET" });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      body: await response.text(),
    };
  }

  fork() {
    return new HttpClient(this.baseUrl.href);
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  setParam(key, value) {
    this.baseUrl.searchParams.set(key, value);

    return this;
  }
}

/**
 * @template T
 * @typedef {Object} HttpResponse
 * @property {number}  status
 * @property {string}  statusText
 * @property {Headers} headers
 * @property {T}       body
 */
