// AddEntity.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AddEntity.css';

function AddEntity() {
  const [formData, setFormData] = useState({
    name: '',
    movies: [],
    description: '',
    weapons: [],
    modus_operandi: '',
    motivation_background: '',
    kill_count: 0,
    weakness: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3005/slashervillains', formData)
      .then((response) => {
        console.log('Entity added successfully:', response.data);
        // Optionally, you can redirect or update the entity list
      })
      .catch((err) => {
        console.error('Error adding entity:', err);
      });
  };

  return (
    <div className="add-entity">
      <h2>Add New Entity</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="movies" value={formData.movies} onChange={handleChange} placeholder="Movies" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="text" name="weapons" value={formData.weapons} onChange={handleChange} placeholder="Weapons" required />
        <input type="text" name="modus_operandi" value={formData.modus_operandi} onChange={handleChange} placeholder="Modus Operandi" required />
        <textarea name="motivation_background" value={formData.motivation_background} onChange={handleChange} placeholder="Motivation Background" required />
        <input type="number" name="kill_count" value={formData.kill_count} onChange={handleChange} placeholder="Kill Count" required />
        <input type="text" name="weakness" value={formData.weakness} onChange={handleChange} placeholder="Weakness" required />
        <button type="submit">Add Entity</button>
      </form>
    </div>
  );
}

export default AddEntity;
