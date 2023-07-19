import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

import { Input, InputLabel } from "@components/Label/styles";

interface Props {
  id: string;
  title: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

function Label({ id, title, type, value, onChange }: Props) {
  return (
    <InputLabel id={`${id}-label`}>
      <span>{title}</span>
      <Input id={id} type={type} name={id} value={value} onChange={onChange} />
    </InputLabel>
  );
}

export default Label;
