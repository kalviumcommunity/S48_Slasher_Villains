import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Landing.css';

function Landing() {
  const [villains, setVillains] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    axios
      .get('https://s48-slasher-villains-4.onrender.com/slashervillains')
      .then((response) => setVillains(response.data))
      .catch((err) => console.log(err));

    axios
      .get('https://s48-slasher-villains-4.onrender.com/users')
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://s48-slasher-villains-4.onrender.com/slashervillains/${id}`)
      .then(() => {
        setVillains(villains.filter((villain) => villain._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    Cookies.remove('loginUsername');
    Cookies.remove('signupUsername');
    Cookies.remove('token');
    Cookies.remove('token1');

    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <h1> <span className="highlight"> Slasher</span> Villains</h1>
          <div className="buttons">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="logout">
                Logout
              </button>
            ) : null}
          </div>
        </nav>
        <p className="subheading">Behind every great scream lies an even greater villain</p>
        <select onChange={handleUserChange} value={selectedUser}>
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user._id} value={user.created_by}>
              {user.username}
            </option>
          ))}
        </select>
      </header>
      <div className="body">
        {
          villains.filter(item=>item.created_by===selectedUser).map((villain) => (
            <div className="mongo-data" key={villain._id}>
              <p className="name">Name: {villain.name} </p>
              <p>Movies: {villain.movies.join(', ')}</p>
              <p>Motivation Background: {villain.motivation_background} </p>
              <p>Kill Count: {villain.kill_count}</p>
              <div className="delete-update">
                {isLoggedIn  && (
                  <>
                    <button onClick={() => handleDelete(villain._id)} className="delete-btn">
                      Delete
                    </button>
                    <Link to={`/update-entity/${villain._id}`} className="update-button">
                      Update
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        {isLoggedIn && (
          <div className="add">
            <Link to="/add-entity" className="add-entity-btn">
              Add New Entity
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
