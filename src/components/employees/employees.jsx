import React, { Component } from 'react';
import './employees.css';

class Employees extends Component {
  state = {
    employees: [],
  };

  async componentDidMount() {
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

  handleClick = (event) => {
    event.currentTarget.classList.toggle('active');
    event.currentTarget.children[0].classList.toggle('employee-expanded-display');
  };

  renderEmployee = (key, name, salary, age) => {
    return (
      <div key={key} onClick={this.handleClick} className="employee">
        {name}
        <div className="employee-expanded">
          Salary: {salary}
          {'\n'}
          Age: {age}
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
