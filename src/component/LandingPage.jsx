import React from 'react';
import logo from '../assert/unilever-logo.png';
import { Link } from 'react-router-dom'
import { LoginComponent } from './LoginComponet'
// const logo = require('../assert/unilever-logo.png')
export const LandingPage = () => (
    <div className="container">
    <div className="row ">
      <div className="col-sm col-md-3 offset-md-5 ">
      <div className="row justify-content-center">
      <div className="col-sm col-md-3 logo" >
      <img src={logo}/>
      </div>
       
      </div>
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


)