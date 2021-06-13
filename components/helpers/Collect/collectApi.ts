import axios from 'axios';

export type Reponse<T> = {
  error: number;
  message: string;
  data: T;
}

export type GetFormSystemAccessTokenApiResponse = {
  accessToken: string;
}

export const getFormSystemAccessTokenApi = (baseURL: string, accessToken: string) => {
  const url = '/api/v1/formSystem/sessions';
  const instance = axios.create({
    baseURL,
    headers: { 'AccessToken': accessToken }
  });
  return instance.get<Reponse<GetFormSystemAccessTokenApiResponse>>(url);
}