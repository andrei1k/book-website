import jwtDecode from "jwt-decode";

export type User = { id: number, username: string }

type AuthHandler = ( user: User | null ) => void;

class UserInfoService {

  private handler: AuthHandler | null = null;

  setHandler(handler: AuthHandler | null) {
      this.handler = handler;
  }

  async save(token: string) {
    const user = jwtDecode<User>(token);

    this.handler?.(user);

    window.localStorage.setItem('token', token);
  }

  clear() {
    this.handler?.(null);
    window.localStorage.removeItem('token');
  }

  get token() {
    return window.localStorage.getItem('token') ?? undefined;
  }

  getSavedUserInfo() {
    const token = this.token;
    return token ? jwtDecode<User>(token) : null;
  }
}

export const userInfoService = new UserInfoService();