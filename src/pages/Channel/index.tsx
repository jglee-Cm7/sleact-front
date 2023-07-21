import React, { ChangeEventHandler, FormEventHandler, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import { Container, Header } from "@pages/Channel/styles";

import ChatList from "@components/ChatList";
import ChatBox from "@components/ChatBox";

function Channel() {
  const { channel } = useParams<{ channel: string }>();
  const [chat, setChat] = useState("");

  const onChangeChat: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  const onSubmitForm: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <Header>{channel}</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
}

export default Channel;
