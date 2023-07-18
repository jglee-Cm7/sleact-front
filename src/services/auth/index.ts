import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import authApi from "@services/auth/authApi";

interface UseMutationOptionsType<T> extends UseMutationOptions<T, AxiosError, T, T> {}

export function useSignUp(options?: UseMutationOptionsType<unknown>) {
  return useMutation({ mutationFn: authApi.signUp, ...options });
}

export function useMe() {
  return useQuery({ queryKey: ["me"], queryFn: authApi.getMe, staleTime: 10 * 60 * 1000 });
}

export function useLogIn(options?: UseMutationOptionsType<unknown>) {
  return useMutation({ mutationFn: authApi.logIn, ...options });
}
