import React from 'react';
import Axios from 'axios';

import * as cloudinary from 'cloudinary';
import { Link } from 'react-router-dom';
const PDFJS = require('pdfjs-dist');
import ReactTooltip from 'react-tooltip';
import decodeToken from '../helper/decodeToken';

import SideNav from './SideNav'

import { postPfiForm } from '../Helpers/handleApiRequest';

export default class Dashboard extends React.Component {

  state = {
    errors: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      item_detail:'',
      materialType: 'Raw Material',
      url:'',
      quantity: '',
      percentage:'',
      unit:'',
      cost:'',
      hs_code:'',
      pfi_number:'',
      supplier_name:'',
      fileUrl: ''
    }
    cloudinary.config({
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      cloud_name: process.env.CLOUDINARY_NAME,
    });
  }

  componentDidMount() {
    const auth_token = localStorage.getItem('auth_token');
    const decodedToken = decodeToken({
      data: {
        auth_token
      }
    });

    if (decodedToken === 'unauthorised') {
      this.props.history.push('/');
    }
  }

  callbackAllDone = (fullText) => {
    console.log(fullText, ' fuuuuuullltext')
  }

  handleSubmitData = async (e) => {
    e.preventDefault();
    console.log(this.state, 'eee', e)
    const { item_detail, materialType, quantity, cost, hs_code, supplier_name, pfi_number, hscode_percentage, unit_cost, fileUrl }
      = this.state;

    const pfiForm = {
      item_detail,
      type: materialType,
      // url: fileUrl,
      url: 'fileUrl',
      quantity,
      cost,
      hs_code,
      supplier_name,
      pfi_number,
      hscode_percentage,
      unit_cost
    };

    const response = await postPfiForm(pfiForm);
    console.log(response, ' resssss')
  }

  callbackPageDone = (complete, total) => {
    console.log(complete, ' complete', total, ' total');
  }

  pdfToText = (data, callbackPageDone, callbackAllDone) => {
    let complete = 0;

    console.log( data  instanceof ArrayBuffer  || typeof data == 'string' );
    PDFJS.getDocument(data).then(function(pdf) {
      var div = document.getElementById('viewer');
      var total = pdf.numPages;
      callbackPageDone(0, total);
      var layers = {};
      
      for (let i = 1; i <= total; i++) {
        pdf.getPage(i).then(function(page) {
          var n = page.pageNumber;

          page.getTextContent().then(function(textContent) {
            if(null != textContent.bidiTexts) {
              var page_text = "";
              var last_block = null;
              for(var k = 0; k < textContent.bidiTexts.length; k++) {
                var block = textContent.bidiTexts[k];

                if (last_block != null && last_block.str[last_block.str.length-1] != ' ') {
                  if (block.x < last_block.x)
                    page_text += "\r\n"; 
                  else if (last_block.y != block.y && (last_block.str.match(/^(\s?[a-zA-Z])$|^(.+\s[a-zA-Z])$/) == null))
                    page_text += ' ';
                }

                page_text += block.str;
                last_block = block;
              }

              textContent != null && console.log("page " + n + " finished."); //" content: \n" + page_text);
              layers[n] =  page_text + "\n\n";
            }
            ++complete;
            callbackPageDone(complete, total);

            if (complete === total) {
              window.setTimeout(function() {
                var full_text = "";
                var num_pages = Object.keys(layers).length;

                for( var j = 1; j <= num_pages; j++) {
                  full_text += layers[j];
                }
                callbackAllDone(full_text);
              }, 1000);              
            }
          }); // end  of page.getTextContent().then
        }) // end of page.then
      } // of for
    });
  }

  handleFileUpload = (event) => {
    // this.pdfToText(event.target.files, this.callbackPageDone, this.callbackAllDone);
    let fileType = event.target.files[0].type.split('/').pop().toLowerCase();
    if (fileType !== 'pdf') {
      return this.setState({
        errors: {...this.state.errors, fileError: 'File type is not supported'}
      });
    }
    
    const reader = new FileReader();
    // reader.readAsArrayBuffer(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = (result) => {
      console.log(result, ' rree')
      // this.pdfToText(result.currentTarget.result, this.callbackPageDone, this.callbackAllDone);
      cloudinary.v2.uploader.upload(result.target.result, (error, response) => {
        if (!error) {
          console.log(response)
          this.setState({
            fileUrl: response.secure_url,
          });
          // this.handleCallback();
          return true;
        }

        // this.setState({
        //   message: error.message,
        //   showMessage: true,
        //   uploading: false,
        // });
        return false;
      });
    }
  }

  handleInputChange = () => {
    console.log('hhhh')
  }

  onChange =(name, e) => {
    if (name === 'percentage') {
      let cost = parseInt(this.state.cost, 10);
      let per = parseInt(this.state.percentage, 10) / 100;

      let hsCode = cost * per;

      this.setState({
        hs_code: hsCode,
      });
    } else if (name === 'cost') {
      let unitCost = parseInt(this.state.quantity, 10) / parseInt(this.state.cost, 10);
      console.log(this.state.quantity, ' uuuuu', typeof unitCost)

      this.setState({
        unit: unitCost,
      });
    }
  
    this.setState({ [name]: e.target.value });
  }

  getSelectValue = (e) => {
    console.log(e, ' eeee')
  }  

  render() {
    const { pathname } = this.props.location;

    return (
      <div className="dasboard__container">
        <ReactTooltip />
        <div className="side__nav">
          <Link to="/">
            <img height="50px" width="50px" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/1200px-Unilever.svg.png" />
          </Link>
          <hr />
          <div>
            <Link to="/dashboard" data-tip="Add Shipment"><i className="far fa-plus-square" style={pathname === '/dashboard' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
          </div>
          <hr />
          <div>
            <Link to="/analytics" data-tip="Analytics"><i className="fas fa-chart-line" style={pathname === '/analytics' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
          </div>
          <hr />
          <div>
            <Link to="/shipments" data-tip="View All Shipments"><i className="fas fa-shipping-fast" style={pathname === '/view-shipment' ? { color: 'blue' } : { color: 'grey'}}></i></Link>
          </div>
          <hr />
          <div>
            <a><i className="fa fa-bell" aria-hidden="true"></i></a>
          </div>
        </div>
        <div className="add__shipment__card">
          <h4 className="text-center">Add New Shipment</h4>
          <div className="add__shipment__form">
            <form className="upload__pfi__section__form row" onSubmit={this.handleSubmitData}>
              <div className="form-group custom-file col-sm-12">
                <input
                  type="file"
                  className="custom-file-input upload__pfi__section"
                  id="pfiFile"
                  onChange={this.handleFileUpload}
                />
                <label className="custom-file-label" htmlFor="customFile">Upload PFI</label>
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="pfiNumber">PFI Number</label>
                <input type="text" className="form-control" 
                  id="pfiNumber" 
                  name="pfi_number" 
                  value={this.state.pfi_number}
                  onChange= {(value) => this.onChange('pfi_number', value)}
                  required 
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="suplierName">Suplier Name</label>
                <input type="text" 
                  className="form-control" 
                  id="suplierName"
                  name="supplier_name" 
                  value={this.state.supplier_name}
                  onChange= {(value) => this.onChange('supplier_name', value)}
                  required 
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="pfiQuantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="pfiQuantity"
                  name="quantity" 
                  value={this.state.quantity}
                  min="1"
                  onChange= {(value) => this.onChange('quantity', value)}
                  required
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="pfiCost">Cost($)</label>
                <input
                  type="number"
                  className="form-control" 
                  id="pfiCost"
                  name="cost"
                  min="0"
                  value={this.state.cost}
                  onChange= {(value) => this.onChange('cost', value)}
                  required />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="hsCode">Percentage(%)</label>
                <input type="text" 
                  className="form-control" 
                  id="percentage" 
                  name="percentage" 
                  value={this.state.percentage}
                  // onChange={this.onChange}
                  onChange= {(value) => this.onChange('percentage', value)}
                  required 
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="hsCode">HS Code($)</label>
                <input type="number" 
                  className="form-control" 
                  id="hsCode"
                  name="hs_code" 
                  value={this.state.hs_code}
                  onChange= {(value) => this.onChange('hs_code', value)}
                  required 
                  disabled />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="materialType">Type</label>
                <select className="form-control"
                  name="materialType" 
                  value={this.state.materialType}
                  onChange= {(value) => this.onChange('materialType', value)}
                  id="materialType">
                  <option>Raw Material</option>
                  <option>Non-Raw Material</option>
                </select>
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="unitCode">Unit Cost($)</label>
                <input type="text"
                   className="form-control" 
                   id="unitCost"
                   name="unit" 
                   value={this.state.unit}
                   required 
                   disabled />
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="itemsDetails">Items Details</label>
                <input type="text" 
                  className="form-control" 
                  id="itemsDetails"
                  name="item_detail" 
                  value={this.state.item_detail}
                  onChange= {(value) => this.onChange('item_detail', value)}
                  required />
              </div>
              <button type="submit"
                className="btn btn-primary"
              >Save PFI</button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
