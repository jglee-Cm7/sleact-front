import useInput from "@hooks/useInput";
import { Body, Button, Container, Error, Form, Header, Input, Label, LinkContainer, Success } from "@pages/SignUp/styles";
import { useSignUp } from "@services/auth";

import React, { ChangeEvent, FormEventHandler, useCallback, useState } from "react";
import { Link } from "react-router-dom";

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
    [passwordCheck],
  );
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(email, nickname, password, passwordCheck);
    if (mismatchError) return;

    setSignUpError("");
    setSignUpSuccess(false);
    signUpMutation.mutate(
      { email, nickname, password },
      {
        onSuccess: (res) => setSignUpSuccess(true),
        onError: (error) => {
          const errorMessage = (error?.response?.data ?? "이미 가입된 이메일입니다.") as string;
          setSignUpError(errorMessage);
        },
      },
    );
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
          <Label id="email-label">
            <span>이메일 주소</span>
            <div>
              <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
            </div>
          </Label>
          <Label id="nickname-label">
            <span>닉네임</span>
            <div>
              <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
            </div>
          </Label>
          <Label id="password-label">
            <span>비밀번호</span>
            <div>
              <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
            </div>
          </Label>
          <Label id="password-check-label">
            <span>비밀번호 확인</span>
            <div>
              <Input type="password" id="password-check" name="password-check" value={passwordCheck} onChange={onChangePasswordCheck} />
            </div>
          </Label>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!email && <Error>이메일을 입력해주세요.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
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
