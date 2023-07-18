import styled from "@emotion/styled";

export const Header = styled.header`
  background-color: #350d36;
  display: flex;
  flex: 1;
  height: 44px;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  align-items: center;
  color: white;
  & > div.sidebar {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    max-width: 220px;
    padding-left: 16px;
    padding-right: 20px;
  }
  & > div.search {
    display: flex;
    flex: 2;
    justify-content: center;
  }
  & > div.right {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    max-width: 220px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
`;

export const Workspaces = styled.div`
  width: 65px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #3f0e40;
  border-top: 1px solid rgb(82, 38, 83);
  border-right: 1px solid rgb(82, 38, 83);
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
`;

export const WorkspaceName = styled.button`
  height: 64px;
  line-height: 64px;
  border: none;
  border-top: 1px solid rgb(82, 38, 83);
  border-bottom: 1px solid rgb(82, 38, 83);

  text-align: left;
  font-weight: 900;
  font-size: 24px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  padding: 0 16px;
  margin: 0;

  background-color: transparent;
  color: white;
  cursor: pointer;
`;

export const Channels = styled.div`
  width: 260px;
  display: inline-flex;
  flex-direction: column;
  background: #3f0e40;
  color: rgb(188, 171, 188);
  vertical-align: top;
`;

export const MenuScroll = styled.div`
  height: calc(100vh - 102px);
  overflow-y: auto;
`;

export const Chats = styled.div`
  display: flex;
  flex: 1;
`;
