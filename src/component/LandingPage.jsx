import React,{Component} from 'react';

import toastr from 'toastr';

import logo from '../assert/unilever-logo.png';
import Axios from 'axios';
import { LoginComponent } from './LoginComponent';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userAction';
import decodeToken from '../helper/decodeToken';

class LandingPage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password:'',
      isLoggingIn: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onhandleSubmit = this.onhandleSubmit.bind(this);
  }

  componentDidMount() {
    const auth_token = localStorage.getItem('auth_token');

    const decodedToken = decodeToken({
      data: {
        auth_token
      }
    });

    if (decodedToken !== 'unauthorised') {
      this.props.history.push('/dashboard');
    }
  }

  onChange =(e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onhandleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isLoggingIn: true,
    });

    Axios.post('https://unilever-track-it.herokuapp.com/api/v1/login', this.state)
      .then((response) => {
        if (response.data.auth_token) {
          toastr.error('Login Successful', 'Success');
          localStorage.setItem('auth_token', response.data.auth_token);

          window.location.href ='/analytics';

          this.setState({
            isLoggingIn: false
          });
        }
      })
      .catch((error) => {
        toastr.error('Wrong Email or Password', 'Error');

        this.setState({
          isLoggingIn: false
        });

        return error;
      });
  }

  render() {
    const { isLoggingIn } = this.state;

    return (
      <div className="container">
        <div className="row landing">
          <div className="col-sm-12 col-md-6 center">
            <img className="center" height="200px" src={logo} />
          </div>
          <form onSubmit={this.onhandleSubmit} className="col-sm-12 col-md-6">
            <div className="form-group">
              <label>Email address</label>
              <input type="email" 
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={this.state.email} 
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" 
                name="password"
                className="form-control" 
                value={this.state.password} 
                onChange={this.onChange}
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoggingIn}
            >{isLoggingIn ? 'Logging In...' : 'Login'}</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, {loginUser})(LandingPage);
