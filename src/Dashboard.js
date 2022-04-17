import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  budget,
  deleteSpenditure,
  displayError,
  logout,
} from './redux/appDataAction';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { budgetLimit, spenditure, token, error } = useSelector((state) => ({
    budgetLimit: state.appData.budget.budgetLimit,
    spenditure: state.appData.budget.spenditure,
    token: state.appData.token,
    error: state.appData.error,
  }));
  const [spendName, setSpendName] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetL, setBudgetL] = useState('');

  useEffect(() => {
    setBudgetL(budgetLimit);
  }, [budgetLimit]);

  const isOverBudgetLimit = () => {
    let spend = 0;
    const thisMonth = moment().format('M');

    if (spenditure && spenditure.length > 0) {
      spenditure.forEach((item) => {
        if (thisMonth === moment(item.date).format('M')) {
          spend += item.amount;
        }
      });
      return spend - budgetLimit;
    }
    return -1;
  };

  const getRowClassName = (date) => {
    const thisMonth = moment().format('M');
    if (thisMonth === moment(date).format('M')) {
      return isOverBudgetLimit() > 0
        ? 'backgroundColorRed'
        : 'backgroundColorGreen';
    }
    return null;
  };

  const handleAddData = async () => {
    if (!spendName) {
      return dispatch(displayError('Add Spenditure'));
    }
    if (!amount) {
      return dispatch(displayError('Add Amount'));
    }
    const now = moment().format();
    const newData = {
      spenditure: [
        ...spenditure,
        { name: spendName, amount: amount, date: now },
      ],
      budgetLimit: budgetLimit,
    };
    await dispatch(budget(newData, token));
    console.log('here');
  };

  const handleChangeBudgetLimit = () => {
    if (budgetL === budgetLimit) {
      return dispatch(displayError('Add new limit of budget'));
    }
    const newData = {
      spenditure,
      budgetLimit: budgetL,
    };
    dispatch(budget(newData, token));
  };

  const handleDelete = (idElem) => {
    dispatch(deleteSpenditure(idElem, token));
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <div className="headerDashboard">
        <button className="btn" onClick={handleLogOut}>
          Log out
        </button>
      </div>
      <section className="container">
        {error && <div className="alert alert-danger">{error}</div>}
        {isOverBudgetLimit() > 0 ? (
          <div className="alert alert-danger">
            Budget limit exceeded by {isOverBudgetLimit()}
          </div>
        ) : (
          <h2>Budget limit for this month: {budgetLimit}</h2>
        )}
        <table class="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Spenditure</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {spenditure &&
              spenditure.map((item) => {
                return (
                  <tr key={item._id} className={getRowClassName(item.date)}>
                    <td>{moment(item.date).format('DD/MM/YYYY')}</td>
                    <td>{item.name}</td>
                    <td>{item.amount} </td>
                    <td>
                      <button
                        class="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="space" />
        <div className="form">
          <h4>Add data:</h4>
          <div className="form-group">
            <input
              type="text"
              placeholder="Spenditure"
              name="spenditure"
              value={spendName}
              onChange={(e) => setSpendName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              name="amount"
            />
          </div>
          <button className="btn" onClick={handleAddData}>
            Add data
          </button>
        </div>
        <div className="space" />
        <div className="form">
          <h4>Budget limit:</h4>
          <div className="form-group">
            <input
              type="number"
              placeholder="Budget limit"
              value={budgetL}
              onChange={(e) => setBudgetL(e.target.value)}
              name="budgetL"
            />
          </div>
          <button className="btn" onClick={handleChangeBudgetLimit}>
            Change budget limit
          </button>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
