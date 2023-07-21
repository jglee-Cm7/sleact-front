import React, { FormEventHandler, useCallback } from "react";
import { useParams } from "react-router-dom";

import useInput from "@hooks/useInput";
import { useInviteMember } from "@services/workspace";

import Button from "@components/Button";
import Label from "@components/Label";
import Modal from "@components/Modal";

interface Props {
  show: boolean;
  toggleModal: () => void;
}

function InvitationModal({ show, toggleModal }: Props) {
  const { workspace } = useParams<{ workspace: string }>();
  const intiveMemberMutation = useInviteMember();
  const [newMember, onChangeNewMember, setNewMember] = useInput("");

  const onCloseModal = useCallback(() => {
    setNewMember("");
    toggleModal();
  }, [setNewMember, toggleModal]);

  const onInviteMember: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember.trim()) return;
      if (!workspace) return;
      intiveMemberMutation.mutate(
        { workspace, email: newMember },
        {
          onSuccess: () => {
            onCloseModal();
          },
        },
      );
    },
    [intiveMemberMutation, newMember, onCloseModal, workspace],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label title="채널 멤버 초대" id="member" type="email" value={newMember} onChange={onChangeNewMember} />
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
}

export default InvitationModal;
