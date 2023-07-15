import React, { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import { Container, Header, SignUpInfo, Body, Form, Label, Input, Button } from "@pages/LogIn/styles";

function Login() {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
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
              <Input type="email" id="email" name="email" />
            </div>
          </Label>
          <Label id="password-label">
            <span>비밀번호</span>
            <div>
              <Input type="password" id="password" name="password" />
            </div>
          </Label>
          <Button type="submit">로그인</Button>
        </Form>
      </Body>
    </Container>
  );
}

export default Login;
