import React, { FormEventHandler, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import useInput from "@hooks/useInput";
import { useAddWorkspace } from "@services/workspace";

import Button from "@components/Button";
import Label from "@components/Label";
import Modal from "@components/Modal";

interface Props {
  show: boolean;
  toggleModal: () => void;
}

function AddWorkspaceModal({ show, toggleModal }: Props) {
  const queryClient = useQueryClient();
  const addWorkspaceMutation = useAddWorkspace();
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput("");
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput("");

  const onCloseModal = useCallback(() => {
    setNewWorkspace("");
    setNewUrl("");
    toggleModal();
  }, [setNewUrl, setNewWorkspace, toggleModal]);

  const onAddWorkspace: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!newWorkspace.trim() || !newUrl.trim()) return;
      addWorkspaceMutation.mutate(
        { workspace: newWorkspace, url: newUrl },
        {
          onSuccess: () => {
            onCloseModal();
            queryClient.invalidateQueries({ queryKey: ["me"], exact: true });
          },
        },
      );
    },
    [newWorkspace, newUrl, addWorkspaceMutation, onCloseModal, queryClient],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onAddWorkspace}>
        <Label title="워크스페이스 이름" id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
        <Label title="워크스페이스 url" id="workspace-url" value={newUrl} onChange={onChangeNewUrl} />
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
}

export default AddWorkspaceModal;
