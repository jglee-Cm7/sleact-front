import styled from "@emotion/styled";

export const Container = styled.div`
  flex: 1;
  align-items: center;
`;

export const Header = styled.header`
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 48px 0 32px 0;
  width: 100%;
  & > div {
    display: flex;
    justify-content: center;
  }
  & > div.left-col {
    justify-content: flex-start;
  }
  & > div.right-col {
    justify-content: flex-end;
  }
`;

export const Body = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  width: 100%;
  & > h1 {
    font-size: 48px;
    font-weight: 700;
    letter-spacing: -0.75px;
    max-width: 700px;
    text-align: center;
  }
`;

export const Form = styled.form`
  margin: 0 auto;
  width: 400px;
  max-width: 400px;
`;

export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`;

export const Success = styled.div`
  color: #2eb67d;
  margin: 8px 0 16px;
  font-weight: bold;
`;

export const LinkContainer = styled.div`
  font-size: 13px;
  color: rgba(var(--sk_foreground_max_solid, 97, 96, 97), 1);
  & > a {
    font-weight: 700;
    color: #1264a3;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;
