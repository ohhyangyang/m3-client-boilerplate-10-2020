import React from 'react';
import authService from './../lib/auth-service';

const { Consumer, Provider } = React.createContext();


class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null,
    error:false
  }

  componentDidMount () {
    authService.me()
     .then((user) => this.setState({ isLoggedIn: true, user: user, isLoading: false }))
     .catch((err) => this.setState({ isLoggedIn: false, user: null, isLoading: false }));
  }

  signup = (username, password, email, artistType, instrument) => {

    authService.signup( username, password, email, artistType, instrument )
      .then((user) => this.setState({ isLoggedIn: true, user,error:false }) )
      .catch((err) => {
        console.log("err",err.response.data.message)
        this.setState({ isLoggedIn: false, user: null, error:err.response.data.message});
      })
  }

  login = (username, password) => {
    // console.log(username,password)
    authService.login( username, password )
      .then((user) => this.setState({ isLoggedIn: true, user }))
      .catch((err) => {
        console.log("err",err.response.data.message)
        this.setState({ isLoggedIn: false, user: null, error:err.response.data.message });
      })
  }

  logout = () => {
    authService.logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch((err) => console.log(err));
  }


  render() {
    const { isLoggedIn, isLoading, user, error } = this.state;
    const { signup, login, logout } = this;

    if (isLoading) return <p>Loading</p>;

    return(
      <Provider value={{ isLoggedIn, isLoading, user, signup, login, logout,error }}  >
        {this.props.children}
      </Provider>
    )
  }

}


// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  
  return class extends React.Component {
    render() {
      return(
        <Consumer>
          { (value) => {
            const { isLoggedIn, isLoading, user, signup, login, logout,error } = value;

            return (<WrappedComponent 
                      {...this.props}
                      isLoggedIn={isLoggedIn} 
                      isLoading={isLoading} 
                      user={user} 
                      signup={signup} 
                      login={login} 
                      logout={logout}
                      error={error}
                    />)

          } }
        </Consumer>
        )
    }
}
}


export { AuthProvider, withAuth }