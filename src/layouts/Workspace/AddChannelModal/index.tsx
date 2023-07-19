import React, { FormEventHandler, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import useInput from "@hooks/useInput";
import { useAddChannel } from "@services/workspace";

import Button from "@components/Button";
import Label from "@components/Label";
import Modal from "@components/Modal";

interface Props {
  show: boolean;
  toggleModal: () => void;
}

function AddChannelModal({ show, toggleModal }: Props) {
  const queryClient = useQueryClient();
  const { workspace } = useParams<{ workspace: string }>();
  const addChannelMutation = useAddChannel();
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput("");

  const onCloseModal = useCallback(() => {
    setNewChannel("");
    toggleModal();
  }, [setNewChannel, toggleModal]);

  const onAddChannel: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!newChannel.trim()) return;
      if (!workspace) return;
      addChannelMutation.mutate(
        { workspace, channel: newChannel },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaceChannels", workspace], exact: true });
            onCloseModal();
          },
        },
      );
    },
    [newChannel, workspace, addChannelMutation, queryClient, onCloseModal],
  );
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onAddChannel}>
        <Label title="채널" id="channel" value={newChannel} onChange={onChangeNewChannel} />
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
}

export default AddChannelModal;
