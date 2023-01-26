import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {

    if (isAuthenticated) {
      navigate('/');
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line  
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '')
      setAlert('Please enter all fields', 'danger');
    else if (password !== password2)
      setAlert('Passwords do not match, please try again', 'danger');
    else {
      register({
        name,
        email,
        password
      });
    }
  };
  return (
    <div className="form-container" style={{ marginTop: '0' }}>
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
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
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} />
        </div>
        {/* prettier-ignore */}
        <input type="submit" value="Register" className="btn btn-primary btn-block" onClick={onSubmit} />
      </form>
    </div>
  );
};

export default Register;
