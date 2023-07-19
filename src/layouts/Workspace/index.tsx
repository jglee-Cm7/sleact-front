import React, { useCallback, useState } from "react";
import { Navigate, Outlet, useParams, Link } from "react-router-dom";
import gravatar from "gravatar";

import { useLogout, useMe } from "@services/auth";
import { Header, Body, Workspaces, Channels, WorkspaceName, MenuScroll, Chats, WorkspaceButton, ProfileImg, ProfileModal, LogoutButton, AddButton, WorkspaceModal } from "@layouts/Workspace/styles";
import { useWorkspaceChannels } from "@services/workspace";
import useMenu from "@hooks/useMenu";
import AddWorkspaceModal from "@layouts/Workspace/AddWorkspaceModal";
import AddChannelModal from "@layouts/Workspace/AddChannelModal";
import InvitationModal from "@layouts/Workspace/InvitationModal";

function Workspace() {
  const { workspace } = useParams<{ workspace: string }>();
  const { data: me, isSuccess, refetch: refetchMe } = useMe();
  const { data: channelData } = useWorkspaceChannels(workspace);
  const logoutMutation = useLogout();

  const [ProfileMenu, toggleProfileMenuFn] = useMenu();
  const [WorkspaceMenu, toggleWorkspaceMenuFn, , setShowWorkspaceMenu] = useMenu();

  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);
  const [showAddChannelModal, setShowAddChennlModal] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);

  const onLogout = useCallback(() => {
    logoutMutation.mutate({}, { onSuccess: () => refetchMe() });
  }, [logoutMutation, refetchMe]);

  const toggleAddWorkspaceModal = useCallback(() => {
    setShowAddWorkspaceModal((prev) => !prev);
  }, []);

  const toggleInvitationModal = useCallback(() => {
    setShowWorkspaceMenu(false);
    setShowInvitationModal((prev) => !prev);
  }, [setShowWorkspaceMenu]);

  const toggleAddChannelModal = useCallback(() => {
    setShowWorkspaceMenu(false);
    setShowAddChennlModal((prev) => !prev);
  }, [setShowWorkspaceMenu]);

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
            <span onClick={toggleProfileMenuFn} onKeyDown={toggleProfileMenuFn} role="button" tabIndex={0}>
              <ProfileImg src={gravatar.url(me?.email, { s: "28px", d: "retro" })} alt={me?.nickname} />
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
            <WorkspaceName onClick={toggleWorkspaceMenuFn}>{me?.Workspaces.find((ws) => ws.url === workspace)?.name}</WorkspaceName>
            <MenuScroll>{channelData?.map((channel) => <div key={channel.id}>{channel.name}</div>)}</MenuScroll>
          </Channels>
          <Chats>
            <Outlet />
          </Chats>
        </Body>

        {/* Menu */}
        <ProfileMenu style={{ top: 38, right: 16 }}>
          <ProfileModal>
            <img src={gravatar.url(me?.email, { s: "36px", d: "retro" })} alt={me?.nickname} />
            <div>
              <span id="profile-name">{me?.nickname}</span>
              <span id="profile-active">Active</span>
            </div>
          </ProfileModal>
          <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
        </ProfileMenu>

        <WorkspaceMenu style={{ top: 95, left: 80 }}>
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
        </WorkspaceMenu>

        {/* Modal */}
        <AddWorkspaceModal show={showAddWorkspaceModal} toggleModal={toggleAddWorkspaceModal} />
        <AddChannelModal show={showAddChannelModal} toggleModal={toggleAddChannelModal} />
        <InvitationModal show={showInvitationModal} toggleModal={toggleInvitationModal} />
      </div>
    )
  );
}

export default Workspace;
