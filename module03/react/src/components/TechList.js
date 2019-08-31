import React, { Component } from "react";

/**
 * First manner of creating a new component:
 * FUNCTION FORMAT
 *
 * function TechList() {
 *  return <h2>Component created!</h2>
 * }
 */

/**
 * CLASS FORMAT:
 * Each Component class MUST have render() method returning the HTML
 */

class TechList extends Component {
  // we can create special variables called state
  state = {
    techs: ["Node.js", "ReactJS", "React Native"]
  };

  render() {
    return (
      <ul>
        <li>NodeJS</li>
        <li>ReactJS</li>
        <li>React Native</li>
      </ul>
    );
  }
}

export default TechList;
