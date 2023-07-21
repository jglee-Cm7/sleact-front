import React, { ChangeEventHandler, FormEventHandler, useCallback, useState } from "react";
import gravatar from "gravatar";
import { useParams } from "react-router-dom";

import { Container, Header } from "@pages/DirectMessage/styles";
import { useMe } from "@services/auth";
import { useWorkspaceMember } from "@services/workspace";

import ChatList from "@components/ChatList";
import ChatBox from "@components/ChatBox";

function DirectMessage() {
  const { workspace, id } = useParams();
  const { data: user } = useWorkspaceMember(workspace, id);
  const { data: me } = useMe();

  const [chat, setChat] = useState("");

  const onChangeChat: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  const onSubmitForm: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    user &&
    me && (
      <Container>
        <Header>
          <img src={gravatar.url(user?.email, { s: "24px", d: "retro" })} alt={user?.nickname} />
          <span>{user?.nickname}</span>
        </Header>
        <ChatList />
        <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
      </Container>
    )
  );
}

export default DirectMessage;
