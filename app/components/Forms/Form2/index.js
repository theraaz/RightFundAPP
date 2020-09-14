/**
 *
 * Form2
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { H5, H4 } from '../form.styles';
import TinyMCE from 'react-tinymce';
import { Button, Form, Col, Spinner } from 'react-bootstrap';

import DropZone from '../../DropZone/index';
import './form2.scss'

function Form2() {
  const [zakatEligible, setZakatEligible] = React.useState('');
  const [btnSelected, setBtnSelected] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');


  const handleEditorChange = (event) => {
    console.log(event.target.getContent());
  }


  const doStuffWhenFileChanges = (event) => {
    event.preventDefault();
    console.log(tinyMCE, event);
    tinyMCE.context.execCommand('mceInsertContent', false, "Hello");
  }


  return (
    <div>
      <div className='main-form1'>
        <div className='main-heading'>
          <H4>
            Tell your story
      </H4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam  </p>
        </div>

        <div className="mainForm">
          <TinyMCE
            content="<p>This is the initial content of the editor</p>"
            config={{
              plugins: 'autolink link image lists print preview',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | media image link'
            }}
            onChange={handleEditorChange}
          />

          <Form>
            <Form.Group controlId="zakatEligible" className='formGroupMain'>
              <div>
                <H5>Zakat Eligible</H5>
              </div>
              <Form.Row><Col><Form.Check type="checkbox"
                className="remberMeLabel"
                label="Yes, this campaign is zakat eligible."
                onChange={e => setZakatEligible(e.target.checked)} /></Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="zakatEligible" className='formGroupMain'>
              <div>
                <H5>Gift Aid</H5>
              </div>


              <Form.Row>
                <Col>
                  <div className='toggle-custom'>
                    <Button style={{ width: '41%' }} className={`${btnSelected ? 'toggle-unselectedBtn' : 'toggle-selectedBtn'} `} onClick={() => setBtnSelected(false)} > None</Button>
                    <Button style={{ width: '50%' }} className={`${btnSelected ? 'toggle-selectedBtn' : 'toggle-unselectedBtn'}`} onClick={() => setBtnSelected(true)}> UK Gift Aid</Button>
                  </div>
                  {/* <label class="switch"><input type="checkbox" id="togBtn" /><div class="slider round"></div></label> */}
                </Col>
              </Form.Row>
            </Form.Group>
            <Form.Group>
              <div>

                <DropZone />
                {/* <div className="drop-container"
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={fileDrop}
                >
                  <div className="drop-message">
                    <div className="upload-icon"></div>
                      Drag & Drop files here or click to upload
                  </div>
                </div>


                <div className="file-display-container">
                  <div className="file-status-bar">
                    <div>
                      <div className="file-type-logo"></div>
                      <div className="file-type">png</div>
                      <span className="file-name">test-file.png</span>
                      <span className="file-size">(20.5 KB)</span> {<span className='file-error-message'>(File type not permitted)</span>}
                    </div>
                    <div className="file-remove">X</div>
                  </div>
                </div> */}

                <div style={{ textAlign: '-webkit-right', marginTop: '10px' }}>
                  <div className='campaignBtns'>

                    <Button className="editCampaignBtn" >Back</Button>
                    <Button type="submit" className="viewCampaignBtn" >Save and Continue</Button>
                  </div>
                </div>
              </div>
            </Form.Group>
          </Form>





          {/* <button onClick={doStuffWhenFileChanges} >Hello</button> */}
        </div>
      </div>
    </div >
  );
}

Form2.propTypes = {};

export default memo(Form2);
