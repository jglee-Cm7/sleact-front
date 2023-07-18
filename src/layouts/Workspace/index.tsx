import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useMe } from "@services/auth";
import { Header, Body, Workspaces, Channels, WorkspaceName, MenuScroll, Chats } from "@layouts/Workspace/styles";

function Workspace() {
  const { data: me, isSuccess } = useMe();
  // const logoutMutation = useLogout();

  // const onLogout = useCallback(() => {
  //   logoutMutation.mutate({}, { onSuccess: () => refetchMe() });
  // }, [logoutMutation, refetchMe]);

  if (isSuccess && !me) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Header>
        <div className="sidebar">
          <span>left</span>
        </div>
        <div className="search">center</div>
        <div className="right">right</div>
      </Header>

      <Body>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu Scroll</MenuScroll>
        </Channels>
        <Chats>
          <Outlet />
        </Chats>
      </Body>
    </div>
  );
}

export default Workspace;
