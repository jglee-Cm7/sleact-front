import React, { KeyboardEventHandler, useCallback, useEffect, useRef } from "react";
import autosize from "autosize";

import { Container, Form, SendButton, ToolBox } from "@components/ChatBox/styles";

interface Props {
  chat: string;
  onChangeChat: (e: any) => void;
  onSubmitForm: (e: any) => void;
}

function ChatBox({ chat, onChangeChat, onSubmitForm }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onKeyDownForm: KeyboardEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        onSubmitForm(e);
      }
    },
    [onSubmitForm],
  );

  useEffect(() => {
    if (textareaRef.current) autosize(textareaRef.current);
  }, []);
  return (
    <Container>
      <Form onSubmit={onSubmitForm} onKeyDown={onKeyDownForm}>
        <textarea ref={textareaRef} value={chat} onChange={onChangeChat} />

        <ToolBox>
          <SendButton
            className={`c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send${
              chat?.trim() ? "" : " c-texty_input__button--disabled"
            }`}
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!chat?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </ToolBox>
      </Form>
    </Container>
  );
}

export default ChatBox;
