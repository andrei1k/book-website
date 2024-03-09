import { HttpService } from "./HttpService";
import { User, userInfoService } from "./userInfoService";

export class HttpError extends Error {}
export class AuthorizationError extends HttpError {};

interface LoginData {
  email: string,
  password: string
}

interface LoginResponse {
  user: User,
  token: string
}

class AuthService {
  constructor(private http = new HttpService()) {}

  async login(loginData: LoginData) {
    const result = await this.http.post<LoginResponse>('/auth/login', { body: loginData})
    userInfoService.save(result.token)
  }

  logout() {
      userInfoService.clear()
  }
}

export const authService = new AuthService();
