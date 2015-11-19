import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <label htmlFor="email">Please enter your e-mail: </label>
        <input type="text" name="email" placeholder="test@test.com"/>
      </form>
    );
  }
}
