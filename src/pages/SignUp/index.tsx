import React, { ChangeEvent, FormEventHandler, useCallback, useState } from "react";
import { Link } from "react-router-dom";

import useInput from "@hooks/useInput";
import { Body, Container, Error, Form, Header, LinkContainer, Success } from "@pages/SignUp/styles";
import { useSignUp } from "@services/auth";

import Label from "@components/Label";
import Button from "@components/Button";

function SignUp() {
  const signUpMutation = useSignUp();
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, , setPassword] = useInput("");
  const [passwordCheck, , setPasswordCheck] = useInput("");
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck, setPassword, setMismatchError],
  );
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password, setPasswordCheck, setMismatchError],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (mismatchError) return;

    if (email && nickname && !mismatchError) {
      setSignUpError("");
      setSignUpSuccess(false);
      signUpMutation.mutate(
        { email, nickname, password },
        {
          onSuccess: () => setSignUpSuccess(true),
          onError: (error) => {
            const errorMessage = (error?.response?.data ?? "이미 가입된 이메일입니다.") as string;
            setSignUpError(errorMessage);
          },
        },
      );
    }
  };

  return (
    <Container>
      <Header>
        <div className="left-col" />
        <div className="center-col">
          <h1>Sleact</h1>
        </div>
        <div className="right-col" />
      </Header>
      <Body>
        <Form onSubmit={onSubmit}>
          <Label title="이메일 주소" id="email" type="email" value={email} onChange={onChangeEmail} />
          <Label title="닉네임" id="nickname" type="text" value={nickname} onChange={onChangeNickname} />
          <Label title="비밀번호" id="password" type="password" value={password} onChange={onChangePassword} />
          <Label title="비밀번호 확인" id="password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} />
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!email && <Error>이메일을 입력해주세요.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다!. 로그인해주세요.</Success>}
          <Button type="submit">회원가입</Button>
        </Form>
        <LinkContainer>
          이미 회원이신가요?&nbsp;<Link to="/login">로그인 하러가기</Link>
        </LinkContainer>
      </Body>
    </Container>
  );
}

export default SignUp;
