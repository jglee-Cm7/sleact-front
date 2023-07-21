import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 1;
  height: calc(100vh - 38px);
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;

  box-shadow: 0 1px 0 rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  padding: 20px 16px 20px 20px;
  font-weight: bold;

  & > span {
    margin-left: 5px;
  }
`;
