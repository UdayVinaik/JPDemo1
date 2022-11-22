import React, {Component} from 'react';
import Routes from './src/Navigation/Routes';

class App extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Routes/>
    )
  }
}

export default App;
