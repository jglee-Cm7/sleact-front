import React, { ChangeEvent, FormEventHandler, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useInput from "@hooks/useInput";
import { Container, Header, SignUpInfo, Body, Form, Label, Input, Button, Error } from "@pages/LogIn/styles";
import { useLogIn, useMe } from "@services/auth";

function Login() {
  const { data: me, isError, refetch: refetchMe } = useMe();
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
          onSuccess: (res) => refetchMe(),
          onError: (error) => setLogInError((error?.response?.data ?? "로그인에 오류가 발생했습니다.") as string),
        },
      );
    },
    [email, password],
  );

  console.log(isError, me);
  if (!isError && me) {
    console.log("go workspace page!");
    console.log(me);
  }
  return (
    <Container>
      <Header>
        <div className="left-col"></div>
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
          <Label id="email-label">
            <span>이메일 주소</span>
            <div>
              <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
            </div>
          </Label>
          <Label id="password-label">
            <span>비밀번호</span>
            <div>
              <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
            </div>
          </Label>
          {logInError && <Error>{`${logInError}`}</Error>}
          <Button type="submit">로그인</Button>
        </Form>
      </Body>
    </Container>
  );
}

export default Login;
