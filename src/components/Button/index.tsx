import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { CustomButton } from "@components/Button/style";

function Button({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return <CustomButton {...props}>{children}</CustomButton>;
}

export default Button;
