import { api } from "~/shared/api/base-client";

class AuthService {
  login(email: string, password: string) {
    return api.post("/auth/login", { email, password });
  }
}

export default new AuthService();
