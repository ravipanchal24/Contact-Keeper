import React, { useState, useContext, useEffect } from "react";
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {

    if (isAuthenticated) {
      navigate('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line  
  }, [error, isAuthenticated]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      })
    }
  };
  return (
    <div className="form-container" style={{marginTop:'0'}}>
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        {/* prettier-ignore */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        {/* prettier-ignore */}
        <input type="submit" value="Login" className="btn btn-primary btn-block" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default Login;
