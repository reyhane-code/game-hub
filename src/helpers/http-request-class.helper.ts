// import type { getTokensType, setTokensType } from "@/types/tokens.type";

interface setTokensType {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  key: string;
}

interface getTokensType {
  accessToken: string;
  refreshToken: string;
}

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import {
  interceptorRequest,
  interceptorResponse,
  interceptorResponseError,
} from "./axios-interceptor.helper";

export class HttpRequest {
  private static instance: AxiosInstance;

  private static getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: "localhost:3500/api/v1",
        timeout: 3000,
      });

      this.instance.interceptors.request.use(interceptorRequest);
      this.instance.interceptors.response.use(
        interceptorResponse,
        interceptorResponseError
      );
    }
    return this.instance;
  }

  public static set setTokens(items: setTokensType) {
    const { accessToken, refreshToken } = items.data;
    localStorage.setItem(
      items.key,
      JSON.stringify({ accessToken, refreshToken })
    );
  }

  public static get getTokens(): getTokensType | undefined {
    const tokens = localStorage.getItem("tokens");
    return tokens ? JSON.parse(tokens) : undefined;
  }

  public static async get(
    url: string,
    axiosConfig?: AxiosRequestConfig | undefined
  ) {
    return this.getInstance().get(url, axiosConfig);
  }

  public static async post(
    url: string,
    data: Record<string, unknown>,
    axiosConfig?: AxiosRequestConfig | undefined
  ) {
    return this.getInstance().post(url, data, axiosConfig);
  }
  public static async patch(
    url: string,
    data: Record<string, unknown>,
    axiosConfig?: AxiosRequestConfig | undefined
  ) {
    return this.getInstance().patch(url, data, axiosConfig);
  }
  public static async delete(
    url: string,
    axiosConfig?: AxiosRequestConfig | undefined
  ) {
    return this.getInstance().delete(url, axiosConfig);
  }
}
