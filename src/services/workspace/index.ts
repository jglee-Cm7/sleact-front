import { UseMutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Channel, Workspace } from "@typings/db";
import workspaceApi, { addChannelRequest, addWorkspaceRequest, inviteMemberRequest } from "@services/workspace//workspaceApi";

// interface UseMutationOptionsType<T> extends UseMutationOptions<T, AxiosError, void, unknown> {}

export function useMyWorkspaces() {
  return useQuery({ queryKey: ["myWorkspaces"], queryFn: workspaceApi.getMyWorkspaces, staleTime: 10 * 60 * 1000 });
}

export function useWorkspaceChannels(workspace?: string) {
  return useQuery({ queryKey: [`workspaceChannels`, workspace], queryFn: workspaceApi.getWorkspaceChannels, staleTime: 10 * 60 * 1000, enabled: !!workspace });
}

export function useAddWorkspace(options?: UseMutationOptions<Workspace, AxiosError, addWorkspaceRequest, Workspace>) {
  return useMutation({ mutationFn: workspaceApi.addWorkspace, ...options });
}

export function useAddChannel(options?: UseMutationOptions<Channel, AxiosError, addChannelRequest, Channel>) {
  return useMutation({ mutationFn: workspaceApi.addChannel, ...options });
}

export function useInviteMember(options?: UseMutationOptions<any, AxiosError, inviteMemberRequest, any>) {
  return useMutation({ mutationFn: workspaceApi.inviteMember, ...options });
}
