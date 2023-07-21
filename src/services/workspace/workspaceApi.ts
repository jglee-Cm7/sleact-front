import { Channel, User, Workspace } from "@typings/db";
import { get, post } from "@services/index";

interface workspaceRequest {
  workspace: string;
}

export interface addWorkspaceRequest extends workspaceRequest {
  url: string;
}

export interface addChannelRequest extends workspaceRequest {
  channel: string;
}

export interface inviteMemberRequest extends workspaceRequest {
  email: string;
}

const getMyWorkspaces = () => {
  return get("/workspaces") as Promise<Workspace[]>;
};

const addWorkspace = (params: addWorkspaceRequest) => {
  return post("/workspaces", params) as Promise<Workspace>;
};

const getWorkspaceChannels = ({ queryKey }: { queryKey: [string, string | undefined] }) => {
  const [, workspace] = queryKey;
  return get(`/workspaces/${workspace}/channels`) as Promise<Channel[]>;
};

const addChannel = (params: addChannelRequest) => {
  const { workspace, channel } = params;
  return post(`/workspaces/${workspace}/channels`, { name: channel }) as Promise<Channel>;
};

const getWorkspaceMembers = ({ queryKey }: { queryKey: [string, string | undefined] }) => {
  const [, workspace] = queryKey;
  return get(`/workspaces/${workspace}/members`) as Promise<User[]>;
};

const getWorkspaceMember = ({ queryKey }: { queryKey: [string, string | undefined, string | undefined] }) => {
  const [, workspace, id] = queryKey;
  return get(`/workspaces/${workspace}/users/${id}`) as Promise<User>;
};

const inviteMember = (params: inviteMemberRequest) => {
  const { workspace, email } = params;
  return post(`/workspaces/${workspace}/members`, { email });
};

const getWorkspaceUser = (workspace: string, id: number) => {
  return get(`/workspaces/${workspace}/users/${id}`) as Promise<User>;
};

export default { getMyWorkspaces, getWorkspaceChannels, addWorkspace, addChannel, getWorkspaceMembers, getWorkspaceMember, inviteMember, getWorkspaceUser };
