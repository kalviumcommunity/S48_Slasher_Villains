import { useState } from 'react';
import axios from 'axios';
// import Landing from './Landing'; 
import './AddEntity.css'; 
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function AddEntity() {
  const [formData, setFormData] = useState({
    name: '',
    movies: '',
    motivation_background: '',
    kill_count: '',
    created_by: Cookies.get("loginUsername")
  });

  // const [entityAdded, setEntityAdded] = useState(false); // State for tracking form submission
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://s48-slasher-villains-4.onrender.com/slashervillains', formData)
      .then((response) => {
        console.log('Entity added successfully:', response.data);
        // setEntityAdded(true); // Set state to true for successful form submission
        navigate('/landing')
      })
      .catch((err) => {
        console.log('Error adding entity:', err);
      });
  };

  return (
    <div className="add-entity">
      <form onSubmit={handleSubmit}>
        <h2>Add New Entity</h2>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="movies" value={formData.movies} onChange={handleChange} placeholder="Movies" required />
        <input type="text" name="motivation_background" value={formData.motivation_background} onChange={handleChange} placeholder="Motivation Background" required />
        <input type="text" name="kill_count" value={formData.kill_count} onChange={handleChange} placeholder="Kill Count" required />
        <button type="submit">Add Entity</button>
      </form>
    </div>
  );
}

export default AddEntity;