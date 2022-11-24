import { SignInData } from 'src/types';
import { axiosClient } from './axiosClient';

export class AuthService {
  static signIn(data: SignInData) {
    return axiosClient.post('/auth/sign-in', data);
  }
}
