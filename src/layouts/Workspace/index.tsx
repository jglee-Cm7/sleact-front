import React, { FormEventHandler, MouseEventHandler, UIEventHandler, useCallback, useState } from "react";
import { Navigate, Outlet, useParams, Link } from "react-router-dom";
import gravatar from "gravatar";

import { useLogout, useMe } from "@services/auth";
import { Header, Body, Workspaces, Channels, WorkspaceName, MenuScroll, Chats, WorkspaceButton, ProfileImg, ProfileModal, LogoutButton, AddButton, WorkspaceModal } from "@layouts/Workspace/styles";
import useInput from "@hooks/useInput";
import { useAddChannel, useAddWorkspace, useInviteMember, useWorkspaceChannels } from "@services/workspace";

import Menu from "@components/Menu";
import Modal from "@components/Modal";
import Label from "@components/Label";
import Button from "@components/Button";

function Workspace() {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: me, isSuccess, refetch: refetchMe } = useMe();
  const { data: channelData, refetch: refetchChannelData } = useWorkspaceChannels(workspace);
  const logoutMutation = useLogout();
  const addWorkspaceMutation = useAddWorkspace();
  const addChannelMutation = useAddChannel();
  const intiveMemberMutation = useInviteMember();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);
  const [showAddChannelModal, setShowAddChennlModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);

  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput("");
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput("");
  const [newMember, onChangeNewMember, setNewMember] = useInput("");
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput("");

  const onLogout = useCallback(() => {
    logoutMutation.mutate({}, { onSuccess: () => refetchMe() });
  }, [logoutMutation, refetchMe]);

  const toggleProfileMenu: UIEventHandler<HTMLSpanElement> = useCallback((e) => {
    e.stopPropagation();
    setShowProfileMenu((prev) => !prev);
  }, []);

  const toggleWorkspaceMenu: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.stopPropagation();
    setShowWorkspaceMenu((prev) => !prev);
  }, []);

  const toggleAddWorkspaceModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setNewWorkspace("");
    setNewUrl("");
    setShowAddWorkspaceModal((prev) => !prev);
  }, [setNewUrl, setNewWorkspace]);

  const toggleInvitationModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowWorkspaceMenu(false);
    setNewMember("");
    setShowInvitationModal((prev) => !prev);
  }, [setNewMember]);

  const toggleAddChannelModal: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowWorkspaceMenu(false);
    setNewChannel("");
    setShowAddChennlModal((prev) => !prev);
  }, [setNewChannel]);

  const onAddWorkspace: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!newWorkspace.trim() || !newUrl.trim()) return;
      addWorkspaceMutation.mutate(
        { workspace: newWorkspace, url: newUrl },
        {
          onSuccess: () => {
            setShowAddWorkspaceModal(false);
            setNewWorkspace("");
            setNewUrl("");
            refetchMe();
          },
        },
      );
    },
    [newWorkspace, newUrl, addWorkspaceMutation, setNewWorkspace, setNewUrl, refetchMe],
  );

  const onInviteMember: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember.trim()) return;
      if (!workspace) return;
      intiveMemberMutation.mutate(
        { workspace, email: newMember },
        {
          onSuccess: () => {
            setShowInvitationModal(false);
            setNewMember("");
          },
        },
      );
    },
    [intiveMemberMutation, newMember, setNewMember, workspace],
  );

  const onAddChannel: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!newChannel.trim()) return;
      if (!workspace) return;
      addChannelMutation.mutate(
        { workspace, channel: newChannel },
        {
          onSuccess: () => {
            setShowAddChennlModal(false);
            setNewChannel("");
            refetchChannelData();
          },
        },
      );
    },
    [addChannelMutation, newChannel, refetchChannelData, setNewChannel, workspace],
  );

  if (isSuccess && !me) {
    return <Navigate to="/login" />;
  }

  return (
    me && (
      <div>
        <Header>
          <div className="sidebar">
            <span>left</span>
          </div>
          <div className="search">center</div>
          <div className="right">
            <span onClick={toggleProfileMenu} onKeyDown={toggleProfileMenu} role="button" tabIndex={0}>
              <ProfileImg src={gravatar.url(me?.email, { s: "28px", d: "retro" })} alt={me?.nickname} />
              <Menu show={showProfileMenu} style={{ top: 38, right: 16 }} onCloseModal={toggleProfileMenu}>
                <ProfileModal>
                  <img src={gravatar.url(me?.email, { s: "36px", d: "retro" })} alt={me?.nickname} />
                  <div>
                    <span id="profile-name">{me?.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
              </Menu>
            </span>
          </div>
        </Header>

        <Body>
          <Workspaces>
            {me.Workspaces.map((ws) => (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            ))}
            <AddButton onClick={toggleAddWorkspaceModal}>+</AddButton>
          </Workspaces>
          <Channels>
            <WorkspaceName onClick={toggleWorkspaceMenu}>{workspace}</WorkspaceName>
            <MenuScroll>
              <Menu show={showWorkspaceMenu} onCloseModal={toggleWorkspaceMenu} style={{ top: 95, left: 80 }}>
                <WorkspaceModal>
                  <h2>{me?.Workspaces.find((ws) => ws.url === workspace)?.name}</h2>
                  <button type="button" onClick={toggleInvitationModal}>
                    워크스페이스에 사용자 초대
                  </button>
                  <button type="button" onClick={toggleAddChannelModal}>
                    채널 만들기
                  </button>
                  <button type="button" onClick={onLogout}>
                    로그아웃
                  </button>
                </WorkspaceModal>
              </Menu>
              {channelData?.map((channel) => <div key={channel.id}>{channel.name}</div>)}
            </MenuScroll>
          </Channels>
          <Chats>
            <Outlet />
          </Chats>
        </Body>

        <Modal show={showAddWorkspaceModal} onCloseModal={toggleAddWorkspaceModal}>
          <form onSubmit={onAddWorkspace}>
            <Label title="워크스페이스 이름" id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
            <Label title="워크스페이스 url" id="workspace-url" value={newUrl} onChange={onChangeNewUrl} />
            <Button type="submit">생성하기</Button>
          </form>
        </Modal>

        <Modal show={showInvitationModal} onCloseModal={toggleInvitationModal}>
          <form onSubmit={onInviteMember}>
            <Label title="채널 멤버 초대" id="member" type="email" value={newMember} onChange={onChangeNewMember} />
            <Button type="submit">초대하기</Button>
          </form>
        </Modal>

        <Modal show={showAddChannelModal} onCloseModal={toggleAddChannelModal}>
          <form onSubmit={onAddChannel}>
            <Label title="채널" id="channel" value={newChannel} onChange={onChangeNewChannel} />
            <Button type="submit">생성하기</Button>
          </form>
        </Modal>
      </div>
    )
  );
}

export default Workspace;
