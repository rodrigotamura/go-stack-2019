import React, { Component } from "react";
import TechItem from "./TechItem";

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
    newTech: "",
    techs: []
  };

  /**
   * We will use local storage
   * Everytime that we change somethign of our state
   * this cycle mthod will be executed
   */
  componentDidUpdate(_, prevState) {
    // confirming if tech is changed
    if (prevState.techs !== this.state.tech) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  componentDidMount() {
    const techs = localStorage.getItem("techs");

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  /**
   * This method will store the typed tech into state.newTech
   */
  handleInputChange = e => {
    /**
     * We are using arrow functions instead traditional function
     * because in a traditiona function we cannot have access of
     * another properties or functions out of its scope.
     *  */
    // we need to store the specified value in our state.tech
    /**
     * If we simply declare
     * this.state.newTech = e,target.value
     * It will not work, because React has a concept called IMMUTABILITY
     * inside our state. This state is immutable, can not be mutted.
     *
     * If we need to create or change a state, the Component class offers
     * a functions that is called setState().
     */

    this.setState({ newTech: e.target.value });
  };

  /**
   * This method will push into techs array what is stored in newTech
   */

  handleSubmit = e => {
    e.preventDefault();

    // we cannot do this.state.techs.push(this.state.newTech);
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t === tech) });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech} // generating a unique item, because we are working with lists
              tech={tech} // working with properties, passing tech into this child component
              onDelete={() => this.handleDelete(tech)} // passing a property of our component that is a function
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
          // it is a GOOD PRACTICE to declare a value that
          // receives the same state variable that is handling
        ></input>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
