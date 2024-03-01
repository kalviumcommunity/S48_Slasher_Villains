import React, { useState } from 'react';
import axios from 'axios';
import Landing from './Landing'; // Import your Landing component
import './AddEntity.css'; // Import your CSS file for styling

function AddEntity() {
  const [formData, setFormData] = useState({
    name: '',
    movies: '',
    description: '',
    weapons: '',
    modus_operandi: '',
    motivation_background: '',
    kill_count: '',
    weakness: ''
  });

  const [entityAdded, setEntityAdded] = useState(false); // State for tracking form submission

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3005/slashervillains', formData)
      .then((response) => {
        console.log('Entity added successfully:', response.data);
        setEntityAdded(true); // Set state to true for successful form submission
      })
      .catch((err) => {
        console.error('Error adding entity:', err);
      });
  };

  // Conditionally render the Landing component if entityAdded is true
  if (entityAdded) {
    return <Landing />;
  }

  return (
    <div className="add-entity">
      <form onSubmit={handleSubmit}>
        <h2>Add New Entity</h2>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="movies" value={formData.movies} onChange={handleChange} placeholder="Movies (comma-separated)" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="weapons" value={formData.weapons} onChange={handleChange} placeholder="Weapons (comma-separated)" required />
        <input type="text" name="modus_operandi" value={formData.modus_operandi} onChange={handleChange} placeholder="Modus Operandi" required />
        <input type="text" name="motivation_background" value={formData.motivation_background} onChange={handleChange} placeholder="Motivation Background" required />
        <input type="number" name="kill_count" value={formData.kill_count} onChange={handleChange} placeholder="Kill Count" required />
        <input type="text" name="weakness" value={formData.weakness} onChange={handleChange} placeholder="Weakness" required />
        <button type="submit">Add Entity</button>
      </form>
    </div>
  );
}

export default AddEntity;
