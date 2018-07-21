import React from 'react';

import * as cloudinary from 'cloudinary';
const PDFJS = require('pdfjs-dist');
import ReactTooltip from 'react-tooltip'

export default class Dashboard extends React.Component {

  state = {
    errors: {},
  };

  constructor(props) {
    super(props);
    cloudinary.config({
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      cloud_name: process.env.CLOUDINARY_NAME,
    });
  }

  callbackAllDone = (fullText) => {
    console.log(fullText, ' fuuuuuullltext')
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
          // this.setState({
          //   filePublicId: response.public_id,
          //   fileUrl: response.secure_url,
          //   showFile: true,
          //   uploading: false,
          // });
          // this.handleCallback();
          return true;
        }

        this.setState({
          message: error.message,
          showMessage: true,
          uploading: false,
        });
        return false;
      });
    }
  }

  handleInputChange = () => {
    console.log('hhhh')
  }
  render() {
    const { pathname } = this.props.location;

    return (
      <div className="dasboard__container">
        <ReactTooltip />
        <div className="side__nav">
          <a>
            <img height="50px" width="50px" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/1200px-Unilever.svg.png" />
          </a>
          <hr />
          <div>
            <a data-tip="Add Shipment"><i className="far fa-plus-square" style={pathname === '/dashboard' ? { color: 'blue' } : { color: 'grey'}}></i></a>
          </div>
          <hr />
          <div>
            <a data-tip="View All Shipments"><i className="fas fa-shipping-fast" style={pathname === '/view-shipment' ? { color: 'blue' } : { color: 'grey'}}></i></a>
          </div>
          <hr />
          <div>
            <a><i className="fa fa-bell" aria-hidden="true"></i></a>
          </div>
        </div>
        <div className="add__shipment__card">
          <h4 className="text-center">Add New Shipment</h4>
          <div className="add__shipment__form">
            <form className="upload__pfi__section__form">
              <div className="form-group custom-file">
                <input
                  type="file"
                  className="custom-file-input upload__pfi__section"
                  id="pfiFile"
                  onChange={this.handleFileUpload}
                  required
                />
                <label className="custom-file-label" htmlFor="customFile">Upload PFI</label>
              </div>
              <div className="form-group">
                <label htmlFor="pfiQuantity">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="pfiQuantity"
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pfiCost">Cost</label>
                <input type="text" className="form-control" id="pfiCost" required />
              </div>
              <div className="form-group">
                <label htmlFor="hsCode">HS Code</label>
                <input type="text" className="form-control" id="hsCode" required />
              </div>
              <div className="form-group">
                <label htmlFor="itemsDetails">Items Details</label>
                <input type="text" className="form-control" id="itemsDetails" required />
              </div>
              <div className="form-group">
                <label htmlFor="materialType">Type</label>
                <select className="form-control" id="materialType">
                  <option>Raw Material</option>
                  <option>Non-Raw Material</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Save PFI</button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    );
  }
}
