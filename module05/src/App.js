import React, { useState, useEffect } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  function handleAdd() {
    setTech([...tech, newTech]);
    setNewTech(''); // cleaning input
  }
  /**
   * Follow next example, the setted function will be executed only whe component is loaded
   * like componentDidMount
   * It's only to set empty array at the second parameter
   */

  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
    /*
    // removing, because we don't need it now.
    return () => {
      document.removeEventListener();
    }
    /*
  }, []);

  /**
   * useEffect(function, when_exec_function)
   * First parameter is the function
   * Second parameter is when it will be executed.
   * It is an array which will put specific variables that will be monitored.
   * In this example, if 'tech' variable is changed it will execute that function
   * Like componentDidUpdate
   * (it will also executed when component is loaded)
   */
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);
  
  /**
   * For componentwillAmount...
   * see return function within the first useEffect()
   * which will return a listener function
   */


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
