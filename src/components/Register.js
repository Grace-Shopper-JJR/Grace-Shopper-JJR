import { Link } from "react-router-dom";
import { useState } from "react";
import { register } from "../api/index";

const Register = ({
  username,
  setUsername,
  password,
  setPassword,
  userToken,
  setUserToken,
  setLoggedIn,
  loggedIn,
  history,
}) => {
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const confirmPasswords = (event) => {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
    } else {
      fetchApi(event);
    }
  };

  const fetchApi = async (event) => {
    event.preventDefault();
    try {
      const data = await register(username, password);
      if (data.error) {
        alert("Error Registering User");
      } else {
        const token = data.token;
        localStorage.setItem(`Token`, token);
        setUserToken(token);
        setLoggedIn(true);
        setUsername(username);
        localStorage.setItem(`Username`, username);
        alert(`You are logged in as ${username}`);
        setPasswordConfirmation("");
        history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="form-style-8" onSubmit={confirmPasswords}>
        <h2>Register</h2>
        <input
          type="text"
          minLength="5"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <input
          type="password"
          minLength="7"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
        <div className="submitRegister">
          <button type="submit" className="submitBtn">
            Submit
          </button>
          <Link to="/Login" className="routeLinks">
            Already have an account? Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;