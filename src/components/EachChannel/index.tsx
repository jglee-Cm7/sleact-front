import React from "react";
import { useParams, NavLink } from "react-router-dom";

import { Channel } from "@typings/db";

interface Props {
  channel: Channel;
}

function EachChannel({ channel }: Props) {
  const { workspace } = useParams();

  return (
    <NavLink key={channel.name} to={`/workspace/${workspace}/channel/${channel.name}`}>
      <span># {channel.name}</span>
    </NavLink>
  );
}

export default EachChannel;
