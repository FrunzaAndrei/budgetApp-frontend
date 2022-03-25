import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, signUp } from './redux/appDataAction';

const Auth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('andrei.frunza@racketpal.co.uk');
  const [password, setPassword] = useState('12345');
  const { errorMsg } = useSelector((state) => ({
    errorMsg: state.appData.error,
  }));

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  const handleSignUp = () => {
    dispatch(signUp(email, password));
  };

  return (
    <Fragment>
      <section className="container">
        <h1>Authentication</h1>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form className="form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </div>
        </form>
        <div>
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <button className="btn" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </section>
    </Fragment>
  );
};

export default Auth;
