import React, { FormEventHandler, useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import useInput from "@hooks/useInput";
import { Container, Header, SignUpInfo, Body, Form, Error } from "@pages/LogIn/styles";
import { useLogIn, useMe } from "@services/auth";

import Label from "@components/Label";
import Button from "@components/Button";

function Login() {
  const { data: me, isSuccess, refetch: refetchMe } = useMe();
  const logInMutation = useLogIn();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [logInError, setLogInError] = useState("");

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      logInMutation.mutate(
        { email, password },
        {
          onSuccess: () => refetchMe(),
          onError: (error) => setLogInError((error?.response?.data ?? "로그인에 오류가 발생했습니다.") as string),
        },
      );
    },
    [email, password, logInMutation, refetchMe],
  );

  if (isSuccess && me) {
    // 유저가 가입한 워크스페이스의 일반 채널로 이동.
    // 가입한 워크스페이스가 없을 경우 처리해줘야한다.
    return <Navigate to="/workspace/sleact/channel/일반" replace />;
  }

  if (me === undefined) {
    return <div>로딩중...</div>;
  }

  return (
    <Container>
      <Header>
        <div className="left-col" />
        <div className="center-col">
          <h1>Sleact</h1>
        </div>
        <div className="right-col">
          <SignUpInfo>
            Sleact을 처음 사용하시나요?
            <br />
            <Link to="/signup">계정 생성</Link>
          </SignUpInfo>
        </div>
      </Header>
      <Body>
        <h1>이메일로 로그인해 보세요.</h1>
        <Form onSubmit={onSubmit}>
          <Label title="이메일 주소" id="email" type="email" value={email} onChange={onChangeEmail} />
          <Label title="비밀번호" id="password" type="password" value={password} onChange={onChangePassword} />
          {logInError && <Error>{`${logInError}`}</Error>}
          <Button type="submit">로그인</Button>
        </Form>
      </Body>
    </Container>
  );
}

export default Login;
