import React, { useState } from 'react';
import axios from 'axios';
import Landing from './Landing'; // Import your Landing component
import './AddEntity.css'; // Import your CSS file for styling

function AddEntity() {
  const [formData, setFormData] = useState({
    name: '',
    movies: '',
    motivation_background: '',
    kill_count: ''
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
        console.log('Error adding entity:', err);
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
        <input type="text" name="motivation_background" value={formData.motivation_background} onChange={handleChange} placeholder="Motivation Background" required />
        <input type="text" name="kill_count" value={formData.kill_count} onChange={handleChange} placeholder="Kill Count" required />
        <button type="submit">Add Entity</button>
      </form>
    </div>
  );
}

export default AddEntity;
