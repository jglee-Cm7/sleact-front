import React, { PropsWithChildren, memo, useCallback, useState } from "react";

import { Body, CollapseButton, Container, Header } from "@components/CollapseList/styles";

interface Props {
  title: string;
}

function CollapseList({ title, children }: PropsWithChildren<Props>) {
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapse((prev) => !prev);
  }, []);

  return (
    <Container>
      <Header>
        <CollapseButton collapse={collapse} onClick={toggleCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <h2>{title}</h2>
      </Header>
      {!collapse && <Body>{children}</Body>}
    </Container>
  );
}

export default memo(CollapseList);
