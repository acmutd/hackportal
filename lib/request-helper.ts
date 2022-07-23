import { ConsoleSqlOutlined } from '@ant-design/icons';

/**
 *
 * A utility class created to make the process of making request to backend easier and also to enforce type-checking
 * Function designs are inspired by axios
 *
 */
export class RequestHelper {
  /**
   *
   * Will make a POST request to provided url with provided config and provided body
   *
   * @param url url to which the request will be made to
   * @param config config that can be added into request. Usually used to add information to the headers
   * @param body request body
   * @returns response data
   *
   */
  static async post<ReqBody, ResBody>(
    url: string,
    config: RequestInit,
    body?: ReqBody,
  ): Promise<ResponseData<ResBody>> {
    const temp = await fetch(url, {
      ...config,
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
    });
    const data = await temp.json();
    return {
      status: temp.status,
      data,
    };
  }

  /**
   *
   * Will make a GET request to provided url with provided config and provided body
   *
   * @param url url to which the request will be made to
   * @param config config that can be added into request. Usually used to add information to the headers
   * @returns response data
   *
   */
  static async get<ResBody>(url: string, config: RequestInit): Promise<ResponseData<ResBody>> {
    const temp = await fetch(url, {
      ...config,
      method: 'GET',
      mode: 'cors',
    });
    const data = await temp.json();
    return {
      status: temp.status,
      data,
    };
  }

  /**
   *
   * Will make a DELETE request to provided url with provided config and provided body
   *
   * @param url url to which the request will be made to
   * @param config config that can be added into request. Usually used to add information to the headers
   * @param body request body
   * @returns response data
   *
   */
  static async delete<ReqBody, ResBody>(
    url: string,
    config: RequestInit,
    body?: ReqBody,
  ): Promise<ResponseData<ResBody>> {
    const temp = await fetch(url, {
      ...config,
      method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(body),
    });
    const data = await temp.json();
    return {
      status: temp.status,
      data,
    };
  }
}

/**
 *
 * Represent response data object
 *
 */
interface ResponseData<T> {
  /**
   * status code of request
   */
  status: number;

  /**
   *
   * Data returned by response
   */
  data: T;
}
