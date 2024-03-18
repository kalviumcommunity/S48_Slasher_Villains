import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="App">
        <h1> <span className="highlight"> Slasher </span> Villains</h1>
        <p className='subheading'>Behind every great scream lies an even greater villain</p>
        <div className="buttons">
            <Link to="/Login" className="login">Log In</Link>
            <Link to="/Signup" className="signup">Sign Up</Link>
        </div>
    </div>
  );
}

export default Home;