import { User } from "@typings/db";
import { get, post } from "@services/index";

interface LogInRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

const logIn = (params: LogInRequest) => {
  return post("/users/login", params);
};

const logOut = () => {
  return post("/users/logout");
};

const signUp = (params: SignUpRequest) => {
  return post("/users", params);
};

const getMe = () => {
  return get("/users") as Promise<User | false>;
};

export default {
  signUp,
  logIn,
  logOut,
  getMe,
};
