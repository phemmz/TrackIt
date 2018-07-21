import React from 'react';
const PDFJS = require('pdfjs-dist');

export default class Dashboard extends React.Component {

  callbackAllDone = (fullText) => {
    console.log(fullText, ' fuuuuuullltext')
  }

  callbackPageDone = (complete, total) => {
    console.log(complete, ' complete', total, ' total');
  }

  pdfToText = (data, callbackPageDone, callbackAllDone) => {
    let complete = 0;

    console.log( data  instanceof ArrayBuffer  || typeof data == 'string' );
    PDFJS.getDocument("./BOHYUNGPARK.pdf").then(function(pdf) {
      var div = document.getElementById('viewer');
      var total = pdf.numPages;
      callbackPageDone(0, total);
      var layers = {};
      
      for (i = 1; i <= total; i++) {
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
    console.log(event.target.files, ' fffiifle')
    this.pdfToText(event.target.files, this.callbackPageDone, this.callbackAllDone);
  }

  handleInputChange = () => {
    console.log('hhhh')
  }
  render() {
    return (
      <div className="dasboard__container">
        <div className="side__nav">
          <a>Logo</a>
          <a>Add Shipment</a>
          <a>View All Shipments</a>
          <a><i className="fa fa-bell" aria-hidden="true"></i></a>
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
                />
                <label className="custom-file-label" htmlFor="customFile">Upload PFI</label>
              </div>
              <div className="form-group">
                <label htmlFor="pfiQuantity">Quantity</label>
                <input
                  type="password"
                  className="form-control"
                  id="pfiQuantity"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pfiCost">Cost</label>
                <input type="password" className="form-control" id="pfiCost" />
              </div>
              <div className="form-group">
                <label htmlFor="hsCode">HS Code</label>
                <input type="password" className="form-control" id="hsCode" />
              </div>
              <div className="form-group">
                <label htmlFor="itemsDetails">Items Details</label>
                <input type="password" className="form-control" id="itemsDetails" />
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
