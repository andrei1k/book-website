import { config } from "../config";
import { userInfoService } from "./userInfoService";

export class HttpError extends Error {}
export class AuthorizationError extends HttpError {}
export class BadRequestError extends HttpError {}
export class ValidationError extends BadRequestError {
  constructor(
    public fieldErrors: Record<string, string[]>,
    public formErrors: string[]
  ) {
    super();
  }
}

interface RequestOptions {
  body?: Record<string, any>;
}

function wait() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 500);
  });
}

export class HttpService {
  async get<R = unknown>(path: string): Promise<R> {
    return this.request("GET", path);
  }

  async delete<R = unknown>(path: string): Promise<R> {
    return this.request("DELETE", path);
  }

  async post<R = unknown>(path: string, options: RequestOptions): Promise<R> {
    return this.request("POST", path, options);
  }

  async put<R = unknown>(path: string, options: RequestOptions): Promise<R> {
    return this.request("PUT", path, options);
  }

  async patch<R = unknown>(path: string, options: RequestOptions): Promise<R> {
    return this.request("PATCH", path, options);
  }

  private async request<R = unknown>(
    method: string,
    path: string,
    { body }: RequestOptions = {}
  ): Promise<R> {
    await wait();
    const baseUrl = config.serverBaseUrl.replace(/\/$/, "");
    const strippedPath = path.replace(/^\//, "");

    const url = `${baseUrl}/${strippedPath}`;

    const token = userInfoService.token

    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorText = await response.text();

        const errorBody = this.safeParseJson(errorText);

        if (errorBody.fieldErrors && errorBody.formErrors) {
          throw new ValidationError(
            errorBody.fieldErrors,
            errorBody.formErrors
          );
        }

        throw new BadRequestError();
      }

      if (response.status === 401) {
        userInfoService.clear();
        throw new AuthorizationError();
      }
      throw new HttpError();
    }

    return response.json();
  }

  private safeParseJson(text: string) {
    try {
      return JSON.parse(text);
    } catch (error: unknown) {
      throw new HttpError();
    }
  }
}
