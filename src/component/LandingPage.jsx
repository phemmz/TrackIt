import React,{Component} from 'react';
import logo from '../assert/unilever-logo.png';
import { Link } from 'react-router-dom'
import { LoginComponent } from './LoginComponent';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userAction'

// const logo = require('../assert/unilever-logo.png')
export class LandingPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
        this.onChange = this.onChange.bind(this);
        this.onhandleSubmit = this.onhandleSubmit.bind(this)
    }
    onChange =(e) => {
        this.setState({ [e.target.name]: e.target.value });
      }
    onhandleSubmit = () => {
        this.props.loginUser(this.state);
        if(true)
        window.location.href ='/dashboard'
    }
    render(){
        return(
        <div className="container">
            <div className="row landing">
            <div className="col-sm-12 col-md-6 center">
                <img className="center" height="200px" src={logo} />
            </div>
        <div className="col-sm-12 col-md-6">
            <div className="form-group">
            <label>Email address</label>
            <input type="email" 
                className="form-control"
                name="email"
                placeholder="Enter email"
                value={this.state.email} 
                onChange={this.onChange}
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
            />
        </div>
        <button type="submit" 
            className="btn btn-primary" 
            onClick={()=>this.onhandleSubmit()}>Login</button>
        </div>
    </div>
    </div>
    )
    }
  
}
export default connect(null, {loginUser})(LandingPage);
