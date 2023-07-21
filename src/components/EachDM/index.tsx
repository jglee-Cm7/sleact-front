import React, { memo } from "react";
import { NavLink, useParams } from "react-router-dom";

import { User } from "@typings/db";

interface Props {
  member: User;
  isOnline?: boolean;
  isMe?: boolean;
}

function EachDM({ member, isOnline = false, isMe = false }: Props) {
  const { workspace } = useParams();
  return (
    <NavLink key={member.id} to={`/workspace/${workspace}/dm/${member.id}`}>
      <i
        className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
          isOnline || isMe ? "c-presence--active c-icon--presence-online" : "c-icon--presence-offline"
        }`}
        aria-hidden="true"
        data-qa="presence_indicator"
        data-qa-presence-self="false"
        data-qa-presence-active="false"
        data-qa-presence-dnd="false"
      />
      <span>{member.nickname}</span>
      {isMe && <span> (나)</span>}
    </NavLink>
  );
}

export default memo(EachDM);
