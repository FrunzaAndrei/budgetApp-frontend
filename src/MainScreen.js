import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './Auth';
import Dashboard from './Dashboard';
import { budget } from './redux/appDataAction';

const MainScreen = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => ({
    token: state.appData.token,
  }));

  useEffect(() => {
    if (token) {
      dispatch(budget({}, token));
    }
  }, [token]);

  return <Fragment>{token ? <Dashboard /> : <Auth />}</Fragment>;
};

export default MainScreen;
