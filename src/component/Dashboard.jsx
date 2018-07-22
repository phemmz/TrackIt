import React from 'react';
import * as cloudinary from 'cloudinary';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import toastr from 'toastr';

import decodeToken from '../helper/decodeToken';
import { postPfiForm } from '../Helpers/handleApiRequest';
const PDFJS = require('pdfjs-dist');




export default class Dashboard extends React.Component {

  state = {
    errors: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      item_detail: '',
      materialType: 'Raw Material',
      url: '',
      quantity: '',
      percentage: '',
      unit: '',
      cost: '',
      hs_code: '',
      pfi_number: '',
      supplier_name: '',
      fileUrl: '',
      isLoading: false
    };

    cloudinary.config({
      api_key: process.env.REACT_APP_CLOUDINARY_KEY,
      api_secret: process.env.REACT_APP_CLOUDINARY_SECRET,
      cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
    });
    this.onsignout = this.onsignout.bind(this)
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

  onsignout(event) {
    event.preventDefault()
    localStorage.removeItem('auth_token');
    this.props.history.push('/')
  }

  callbackAllDone = (fullText) => {
  }

  handleSubmitData = async (e) => {
    e.preventDefault();

    const { item_detail, materialType, quantity, cost,
      hs_code, supplier_name, pfi_number, hscode_percentage, unit, fileUrl
    } = this.state;

    const pfiForm = {
      item_detail,
      type: materialType,
      url: fileUrl,
      quantity: parseInt(quantity, 10),
      cost: parseInt(cost, 10),
      hs_code: parseInt(hs_code, 10),
      supplier_name,
      pfi_number: parseInt(pfi_number, 10),
      hscode_percentage: parseInt(hs_code, 10),
      unit_cost: 5
    };

    this.setState({
      isLoading: true,
    });
    const response = await postPfiForm(pfiForm);

    if (response.status === 'success') {
      toastr.success('Shipment Added!');
      this.setState({
        item_detail: '',
        url: '',
        quantity: '',
        percentage: '',
        unit: '',
        cost: '',
        hs_code: '',
        pfi_number: '',
        supplier_name: '',
        fileUrl: '',
        isLoading: false,
      });
    } else {
      toastr.error(response.message, 'Error');
      this.setState({
        isLoading: false
      });
    }
  }

  callbackPageDone = (complete, total) => {
  }

  pdfToText = (data, callbackPageDone, callbackAllDone) => {
    let complete = 0;

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
          });
        });
      }
    });
  }

  handleFileUpload = (event) => {
    let fileType = event.target.files[0].type.split('/').pop().toLowerCase();
    if (fileType !== 'pdf') {
      return this.setState({
        errors: {...this.state.errors, fileError: 'File type is not supported'}
      });
    }
    
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = (result) => {
      cloudinary.v2.uploader.upload(result.target.result, (error, response) => {
        if (!error) {
          this.setState({
            fileUrl: response.secure_url,
          });

          return true;
        }

        return false;
      });
    }
  }

  handleInputChange = () => {
  }

  onChange =(name, e) => {
    const { cost, percentage, quantity } = this.state;

    if (cost && percentage) {
      let parsedCost = parseInt(this.state.cost, 10);
      let parsedPercentage = parseInt(this.state.percentage, 10) / 100;

      let hsCode = parsedCost * parsedPercentage;

      this.setState({
        hs_code: hsCode,
      });
    }

    if (quantity && cost) {
      let unitCost = parseInt(this.state.quantity, 10) / parseInt(this.state.cost, 10);

      this.setState({
        unit: unitCost,
      });
    }
  
    this.setState({ [name]: e.target.value });
  }

  getSelectValue = (e) => {
  }  

  render() {
    const { pathname } = this.props.location;
    const { isLoading } = this.state;

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
            <a><i className="fa fa-bell" aria-hidden="true"></i><div style={{ position: 'relative', top: '-30px', left: '30px', background: 'red', width: '20px', height: '20px', borderRadius: '10px' }}>2</div></a>
          </div>
          <hr />
          <div>
            <div onClick={this.onsignout} data-tip="Log Out"><i className="fas fa-sign-out-alt" style={pathname === '/view-shipment' ? { color: 'blue' } : { color: 'grey'}}></i></div>
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
                <input type="number" className="form-control" 
                  id="pfiNumber" 
                  name="pfi_number"
                  min="0" 
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
                  required
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="hsCode">Percentage(%)</label>
                <input
                  type="text" 
                  className="form-control" 
                  id="percentage" 
                  name="percentage" 
                  value={this.state.percentage}
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
                  disabled
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="materialType">Type</label>
                <select className="form-control"
                  name="materialType" 
                  value={this.state.materialType}
                  onChange= {(value) => this.onChange('materialType', value)}
                  id="materialType"
                >
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
                  required
                />
              </div>
              <button type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >{isLoading ? 'Saving...' : 'Save PFI'}</button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
