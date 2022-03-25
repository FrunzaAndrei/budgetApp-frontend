import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';

const Dashboard = () => {
  const { budgetLimit, spenditure } = useSelector((state) => ({
    budgetLimit: state.appData.budget.budgetLimit,
    spenditure: state.appData.budget.spenditure,
  }));
  const [spendName, setSpendName] = useState('');
  const [amount, setAmount] = useState('');

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

  const handleAddData = () => {};

  return (
    <Fragment>
      <section className="container">
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
                console.log(item);
                return (
                  <tr key={item._id} className={getRowClassName(item.date)}>
                    <td>{moment(item.date).format('DD/MM/YYYY')}</td>
                    <td>{item.name}</td>
                    <td>{item.amount} </td>
                    <td>
                      <button class="btn btn-danger">X</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="space" />
        <h3>Add data:</h3>
        <form className="form">
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
            {' '}
            Add data
          </button>
        </form>
      </section>
    </Fragment>
  );
};

export default Dashboard;
