import React, { Component } from 'react';
import './employees.css';

class Employees extends Component {
  state = {
    employees: [],
    sorting: 'age',
    display: 'none',
  };

  async componentDidMount() {
    await this.refreshData();

    this.interval = setInterval(() => this.wrapperInterval(), 10000);
  }

  componentDidUpdate(prevProps, prevState) {
    const { employees } = this.state;

    if (prevState.employees.length > 0) {
      if (prevState.employees[0].id !== employees[0].id) {
        this.setState({ updated: true });

        this.notif.classList.add('display-flex');
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick = (event) => {
    event.currentTarget.classList.toggle('active');
    event.currentTarget.children[0].classList.toggle('display-flex');
  };

  sortByAge = (employees) => {
    return employees.sort((a, b) => a.employee_age - b.employee_age);
  };

  sortBySalary = (employees) => {
    return employees.sort((a, b) => a.employee_salary - b.employee_salary);
  };

  changeSort = () => {
    const { sorting } = this.state;
    const newSorting = sorting === 'age' ? 'salary' : 'age';
    console.log('Sorting: ', newSorting);

    this.setState({ sorting: newSorting });
  };

  wrapperInterval() {
    this.changeSort();
    this.refreshData();
  }

  async refreshData() {
    const dummyUrlAPI = 'http://dummy.restapiexample.com/api/v1/employees';
    const { sorting } = this.state;

    try {
      const res = await fetch(dummyUrlAPI);
      const employees = await res.json();
      let sortedData;
      if (sorting === 'age') {
        sortedData = this.sortByAge(employees.data);
      } else {
        sortedData = this.sortBySalary(employees.data);
      }
      this.setState({
        employees: sortedData.slice(0, 10),
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
      <div>
        <div className="notification" ref={(notif) => (this.notif = notif)}>
          Updated employees!
        </div>
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
      </div>
    );
  }
}

export default Employees;
