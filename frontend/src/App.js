import React, {Component} from 'react';

// components
import SignUp from './components/Login/SignUp';
import SignIn from './components/Login/SignIn';
import HomePage from './components/App/HomePage';



class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isSignedUp: false,
      isSignedIn: false,
      isRegisterSelected: false,
    };
  }

  signUp = (status) => {
    if(status) {
      return this.setState({isSignedUp: true});
    }
    return this.setState({isSignedUp: false});
  };

  signIn = (status) => {
    if(status) {
      return this.setState({isSignedIn: true});
    }
    return this.setState({isSignedIn: false});
  };

  render() {
    return (
      <>       
        {
          (this.state.isSignedUp) || (this.state.isSignedIn) ? (<HomePage/>) : (
            <>
              {this.state.isRegisterSelected ? (<SignUp signUp = {this.signIn}/>) : (<SignIn setResetToken = {this.setResetToken} getEmail = {this.getEmail} getVerified = {this.getVerified} verify = {this.verify} resetPassword = {this.resetPassword} setEmail = {this.setEmail} signIn = {this.signIn}/>) }
            </>
          )
        }
      </>
    );
  }
}

export default App
