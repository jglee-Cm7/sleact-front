import { Body, Button, Container, Form, Header, Input, Label, LinkContainer } from "@pages/SignUp/styles";
import React, { FormEventHandler } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
              <Input type="email" id="email" name="email" />
            </div>
          </Label>
          <Label id="nickname-label">
            <span>이메일 주소</span>
            <div>
              <Input type="text" id="nickname" name="nickname" />
            </div>
          </Label>
          <Label id="password-label">
            <span>비밀번호</span>
            <div>
              <Input type="password" id="password" name="password" />
            </div>
          </Label>
          <Label id="password-check-label">
            <span>비밀번호 확인</span>
            <div>
              <Input type="password" id="password-check" name="password-check" />
            </div>
          </Label>
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
