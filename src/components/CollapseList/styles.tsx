import styled from "@emotion/styled";

export const Container = styled.div`
  margin-left: 10px;
  & a {
    color: inherit;
    text-decoration: none;
    height: 28px;
    display: flex;
    align-items: center;

    &.active {
      color: white;
    }
  }

  & .bold {
    color: white;
    font-weight: bold;
  }

  & .count {
    margin-left: auto;
    background: #cd2553;
    border-radius: 16px;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 9px;
    color: white;
    margin-right: 16px;
  }
`;

export const Header = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  & h2 {
    height: 36px;
    line-height: 36px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }
`;

export const Body = styled.div`
  margin-left: 26px;
  display: flex;
  flex-direction: column;
`;

export const CollapseButton = styled.button<{ collapse: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  width: 26px;
  height: 26px;
  color: white;
  cursor: pointer;

  ${({ collapse }) =>
    collapse &&
    `
    & i {
      transform: none;
    }
  `};
`;
