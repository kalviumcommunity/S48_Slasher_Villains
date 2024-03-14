import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import Landing from './Landing'; 
import './UpdateEntity.css';
import { useNavigate } from 'react-router-dom';

function UpdateEntity() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    movies: '',
    motivation_background: '',
    kill_count: ''
  });

  // const [updateSuccess, setUpdateSuccess] = useState(false); // State for tracking update success
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3005/slashervillains/${id}`)
      .then((response) => {
        const { name, movies, motivation_background, kill_count } = response.data;
        setFormData({ name, movies: movies.join(', '), motivation_background, kill_count });
      })
      .catch((err) => console.log(err));
  }, [id]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3005/slashervillains/${id}`, formData)
      .then((response) => {
        console.log('Entity updated successfully:', response.data);
        // setUpdateSuccess(true); // Set state to true for successful update
        navigate('/')
        
      })
      .catch((err) => {
        console.error('Error updating entity:', err);
      });
  };  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Conditionally render the Landing component if updateSuccess is true
  // if (updateSuccess) {
  //   return <Landing />;
  // }

  return (
    <div className="update-entity">
      <h2>Update Entity</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="movies" value={formData.movies} onChange={handleChange} placeholder="Movies (comma-separated)" required />
        <input type="text" name="motivation_background" value={formData.motivation_background} onChange={handleChange} placeholder="Motivation Background" required />
        <input type="text" name="kill_count" value={formData.kill_count} onChange={handleChange} placeholder="Kill Count" required />
        <button type="submit">Update Entity</button>
      </form>
    </div>
  );
}

export default UpdateEntity;