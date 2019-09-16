import React, { useState } from 'react';

function App() {
  // in older version we should transform this funtion into a class
  // but now we can do it using consts.

  /**
   * useState() returns a list of array, that's why we are working with desustructuring
   * - the first array return the state itself, which is our list of technologies
   * - the secound is the function which update the content of the state  (tech)
   * - every information we store in useState([here]) will be the initial values of state
   */
  const [tech, setTech] = useState(['ReactJS', 'React Native']);
  const [newTech, setNewTech] = useState('');

  /**
   * Before, we had this.setState in order to update the information in state
   * Now, we might use the specific function of the specific state.
   */
  function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech(''); // cleaning input
  }
  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </>
  );
}

export default App;
