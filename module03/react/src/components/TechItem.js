import React from "react";

/**
 * This component we are creating as a function because
 * we will not use states
 *
 * Every component receives a param called props:
 * function TechItem(props){}
 *
 * Within this property are stored the properties passed from parent component
 *
 * function TechItem(props){
 *  const technology = props.tech;
 * }
 *
 * But we can use destructuring:
 *
 * function TechItem({ tech, onDelete }){
 *  const technology = tech;
 * }
 */
function TechItem({ tech, onDelete }) {
  return (
    <li>
      {tech}
      <button onClick={onDelete} type="button">
        Remover
      </button>
    </li>
  );
}

export default TechItem;
