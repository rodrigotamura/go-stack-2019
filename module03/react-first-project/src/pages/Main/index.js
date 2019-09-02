import React from "react";
import { Title } from "./styles";

export default function Repository() {
  return (
    <Title
      error // it will apply another style, look at ./styles.js
    >
      Main
      <small>A tiny text</small>
    </Title>
  );
}
