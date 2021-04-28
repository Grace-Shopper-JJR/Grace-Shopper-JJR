import { Link } from "react-router-dom";
import { login } from "../api/index";
import { getMyCart } from "../api/index";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  loggedIn,
  userToken,
  setUserToken,
  setLoggedIn,
  history,
}) => {
  const fetchApi = async (event) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      if (data.error) {
        alert("Incorrect Credentials");
      } else {
        const token = data.token;
        localStorage.setItem(`Token`, token);
        setUserToken(token);
        setLoggedIn(true);
        setUsername(username);
        localStorage.setItem(`Username`, username);
        alert(`You are logged in as ${username}`);
        try {
          Promise.all([getMyRoutines(token, username)]).then(([data]) => {
            setMyRoutines(data);
          });
        } catch (error) {
          console.error(error);
        }
        history.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form className="form-style-8" onSubmit={fetchApi}>
          <h2>Login</h2>
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
          <div className='submitRegister'>
          <button type="submit" className="submitBtn">Submit</button>
          <Link to="/Register" className="routeLinks">
            Dont have an account? Register here
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;