import React,{Component} from 'react';
import logo from '../assert/unilever-logo.png';
import { Link } from 'react-router-dom'
import { LoginComponent } from './LoginComponent';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userAction'

// const logo = require('../assert/unilever-logo.png')
export const LandingPage = () => (
  <div className="container">
    <div className="row landing">
      <div className="col-sm-12 col-md-6 center">
        <img className="center" height="200px" src={logo} />
      </div>

      <div className="col-sm-12 col-md-6">
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"  placeholder="Enter email"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
    </div>
  </div>
);
