import React from "react";
import { render } from "react-dom";

/*
render(
  <h1>Hello World</h1>, // render this code...
  document.getElementById("app") // ... inde this element at my index.html
);
*/

import App from "./App";

render(<App />, document.getElementById("app"));
