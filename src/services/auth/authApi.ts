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

const signUp = (params: SignUpRequest) => {
  return post("/users", params);
};

const logIn = (params: LogInRequest) => {
  return post("/users/login", params);
};

const logOut = () => {
  return post("/users/logout");
};

const getMe = () => {
  return get("/users");
};

export default {
  signUp,
  logIn,
  logOut,
  getMe,
};
