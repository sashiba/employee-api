import React, { Component } from 'react';
import './employees.css';

class Employees extends Component {
  state = {
    employees: [],
  };

  async componentDidMount() {
    await this.refreshData();
    this.interval = setInterval(() => this.refreshData(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick = (event) => {
    event.currentTarget.classList.toggle('active');
    event.currentTarget.children[0].classList.toggle('employee-expanded-display');
  };

  async refreshData() {
    const dummyUrlAPI = 'http://dummy.restapiexample.com/api/v1/employees';

    try {
      const res = await fetch(dummyUrlAPI);
      const employees = await res.json();
      this.setState({
        employees: employees.data.slice(0, 10),
      });
    } catch (err) {
      console.log('error: ', err);
    }
  }

  renderEmployee = (key, name, salary, age) => {
    return (
      <div key={key} onClick={this.handleClick} className="employee">
        {name}
        <div className="employee-expanded">
          Salary:
          {salary}
          {'\n'}
          Age:
          {age}
        </div>
      </div>
    );
  };

  render() {
    const { employees } = this.state;

    return (
      <div className="container-employees">
        {employees.length &&
          employees.map((employee) =>
            this.renderEmployee(
              employee.id,
              employee.employee_name,
              employee.employee_salary,
              employee.employee_age
            )
          )}
      </div>
    );
  }
}

export default Employees;
