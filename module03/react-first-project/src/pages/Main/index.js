import React from "react";
import { FaGitAlt, FaPlus } from "react-icons/fa";
// In this case we are importing FontAwesome (react-icons/fa)
// react-icons/<icon-package-desired>
// And inside {} we put the name of desired icon

import { Container, Form, SubmitButton } from "./styles";

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGitAlt />
        Repositories
      </h1>

      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Add repository" />
        {/* We are creating a new styled component for SubmitButton because we will apply some self behaviors */}
        {/* Whe a user press this button in order to find a repository, this button will be disabled while requesting */}
        <SubmitButton type="text">
          <FaPlus color="#FFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
