import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

function get<T>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
): Promise<AxiosResponse<T>> {
  return new Promise((success, fail) => {
    axios
      .get(url, config)
      .then((result) => {
        if (result.status == 200) success(result);
        else {
          fail(result);
        }
      })
      .catch((result) => {
        fail(result);
      });
  });
}

function post<T, P>(
  url: string,
  data: T,
  config?: AxiosRequestConfig<any> | undefined
): Promise<AxiosResponse<P>> {
  return new Promise((success, fail) => {
    axios
      .post(url, data, config)
      .then((result) => {
        success(result);
      })
      .catch((result) => {
        fail(result);
      });
  });
}

export { get as get, post as post };
