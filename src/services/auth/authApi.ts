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

const signUp = async (params: SignUpRequest) => {
  return await post("/users", params);
};

const logIn = async (params: LogInRequest) => {
  return await post("/users/login", params);
};

const logOut = async () => {
  return await post("/users/logout");
};

const getMe = async () => {
  return await get("/users");
};

export default {
  signUp,
  logIn,
  logOut,
  getMe,
};
