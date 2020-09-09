import React from 'react';
import axios from 'axios';

const { Consumer, Provider } = React.createContext();



// HOC
function withAuth(WrappedComponent) {

  return function (props) {
    return (
      <Consumer>
        {(valueFromProvider) => (
          <WrappedComponent
            {...props}
            user={valueFromProvider.user}
            isLoggedIn={valueFromProvider.isLoggedIn}
            isLoading={valueFromProvider.isLoading}
            login={valueFromProvider.login}
            errorLogin={valueFromProvider.errorLogin}
            signup={valueFromProvider.signup}
            logout={valueFromProvider.logout}
            me={valueFromProvider.me}

          />
        )}
      </Consumer>
    )
  }
}

class AuthProvider extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
    errorLogin:null
  }

  componentDidMount() {
    // When app and AuthProvider load for the first time
    // make a call to the server '/me' and check if user is authenitcated
    this.me()
  }

  me = (cb) => {
    axios.get(process.env.REACT_APP_API_URL + '/auth/me', { withCredentials: true })
    .then((response) => {
      const user = response.data;
      this.setState({ isLoggedIn: true, isLoading: false, user }, ()=>{
        if(cb){
          cb()
        }
      });
    })
    .catch((err) => this.setState({ isLoggedIn: false, isLoading: false, user: null }), ()=>{
      if(cb){
        cb()
      }
    });
  }

  login = (username, password) => {
    axios.post(process.env.REACT_APP_API_URL + '/auth/login', { username, password }, { withCredentials: true })
      .then((response) => {
        console.log(response);
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) => {
        console.log(err);
        this.setState({errorLogin:"Usuario no encontrado"})
        setTimeout(() => {
          
          this.setState({errorLogin:null})
        }, 4000);
      });
  }
  signup = (username,email, password) => {
    axios.post(process.env.REACT_APP_API_URL + '/auth/signup', { username,email,password }, { withCredentials: true })
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) => {
        console.log(err);
       
      });
  }
  logout = () => {
    axios.get(process.env.REACT_APP_API_URL + '/auth/logout', { withCredentials: true })
      .then((response) => {
        this.setState({ isLoggedIn: false, isLoading: false, user: null });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { user, isLoggedIn, isLoading, errorLogin } = this.state;
    const { login, signup, logout, me } = this;

    return (
      <Provider value={{ user, isLoggedIn, isLoading, login, signup, logout, me, errorLogin }}>
        {this.props.children}
      </Provider>
    )
  }
}

export { withAuth, AuthProvider }