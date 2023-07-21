import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

export const Form = styled.form`
  width: 100%;
  margin: 0;
  color: rgb(29, 28, 29);
  font-size: 15px;

  border: 1px solid rgb(29, 28, 29);
  border-radius: 4px;

  & > textarea {
    width: 100%;
    height: 44px;
    padding: 9px 10px !important;
    outline: none !important;
    border-radius: 4px !important;
    resize: none !important;
    line-height: 22px;
    border: none;
  }
`;

export const ToolBox = styled.div`
  display: flex;
  position: relative;
  height: 37px;
  background: rgb(248, 248, 248);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const SendButton = styled.button``;
