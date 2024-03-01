import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Landing.css'; // Import your CSS file here if needed

function Landing() {
  const [villains, setVillains] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/slashervillains")
      .then((response) => setVillains(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3005/slashervillains/${id}`)
      .then(() => {
        // Refresh the list of entities after deletion
        setVillains(villains.filter(villain => villain._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <h1>Slasher <span className="highlight">Villains</span></h1>
          <div className="buttons">
            <Link to="/Login" className="login">Log In</Link>
            <Link to="/Signup" className="signup">Sign Up</Link>
          </div>
        </nav>
        <p className='subheading'>Behind every great scream lies an even greater villain</p>
      </header>
      <div className="body">
        {villains &&
          villains.map((villain) => (
            <div className="mongo-data" key={villain._id}>
              <p className='name'>Name:  {villain.name} </p>
              <p>Movies:  {villain.movies.join(', ')}</p>
              <p>Description: {villain.description}</p>
              <p>Weapons: {villain.weapons.join(', ')}</p>
              <p>Modus Operandi:  {villain.modus_operandi} </p>
              <p>Motivation Background: {villain.motivation_background} </p>
              <p>Kill Count: {villain.kill_count}+ </p>
              <p>Weakness: {villain.weakness}</p>
              <div className="delete-update">
                <button onClick={() => handleDelete(villain._id)} className='delete-btn'>Delete</button>
                <Link to={`/update-entity/${villain._id}`} className="update-button">Update</Link>
              </div>
            </div>
          ))}
        <div className="add">
          <Link to="/add-entity" className="add-entity-btn">Add New Entity</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
