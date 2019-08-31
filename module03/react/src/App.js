import React from "react"; // this is important because we will use JSX syntax

// importing CSS
import "./App.css";

// importing img
import profile from "./assets/2.png";

function App() {
  return <img src={profile}></img>;
}

export default App;
