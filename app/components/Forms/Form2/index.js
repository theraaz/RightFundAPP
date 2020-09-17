/**
 *
 * Form2
 *
 */

import React, { memo } from 'react';
import { H5, H4 } from '../form.styles';
import TinyMCE from 'react-tinymce';
import { Button, Form, Col, Spinner } from 'react-bootstrap';

import DropZone from '../../DropZone/index';
import './form2.scss';


const Form2 = ({ setFieldValue, values, errors, selectedFiles, setSelectedFiles, setActiveLink }) => {
  const [zakatEligible, setZakatEligible] = React.useState('');
  const [btnSelected, setBtnSelected] = React.useState(false);


  const handleEditorChange = (event) => {
    console.log(event.target.getContent());
    setFieldValue('editorValue', event.target.getContent())
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
            placeholder="content here"
            content={values.editorValue}
            config={{
              plugins: 'autolink link image lists print preview',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | media image link'
            }}
            name='editorValue'
            // value={editorValue}
            onChange={handleEditorChange}
          />


          <Form.Group controlId="zakatEligible" className='formGroupMain'>
            <div>
              <H5>Zakat Eligible</H5>
            </div>
            <Form.Row><Col><Form.Check type="checkbox"
              className="remberMeLabel"
              label="Yes, this campaign is zakat eligible."
              onChange={e => setFieldValue('zakatEligible', e.target.checked)} /></Col>
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

              <DropZone selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />


              <div style={{ textAlign: '-webkit-right', marginTop: '10px' }}>
                <div className='campaignBtns'>

                  <Button className="editCampaignBtn" onClick={() => setActiveLink(0)} >Back</Button>
                  <Button type="submit" className="viewCampaignBtn" onClick={() => console.log(selectedFiles)} >Save and Continue</Button>
                </div>
              </div>
            </div>
          </Form.Group>






          {/* <button onClick={doStuffWhenFileChanges} >Hello</button> */}
        </div>
      </div>
    </div >
  );
}

Form2.propTypes = {};

export default memo(Form2);
