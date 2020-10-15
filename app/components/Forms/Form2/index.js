/**
 *
 * Form2
 *
 */

import React, { memo } from 'react';
import TinyMCE from 'react-tinymce';
import { Button, Form, Col, Spinner } from 'react-bootstrap';
import { H5, H4 } from '../form.styles';

import DropZone from '../../DropZone/index';
import './form2.scss';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CustomCheckbox = withStyles({
  root: {
    color: '#f15a24',
    '&$checked': {
      color: '#f15a24',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Form2 = ({
  setFieldValue,
  values,
  errors,
  selectedFiles,
  setSelectedFiles,
  setActiveLink,
  loading,
}) => {
  const [btnSelected, setBtnSelected] = React.useState(false);
  const [youtubeId, setYoutubeId] = React.useState('');
  const handleEditorChange = event => {
    setFieldValue('editorValue', event.target.getContent());
  };

  const handleImage = event => {
    setFieldValue('base64', null);
  };

  const setVideo = event => {
    setFieldValue('video', event.target.value);

  }


  function getVideoId(video) {
    let id = '';
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = video ? video.match(regExp) : '';

    if (match && match[2].length == 11) {
      console.log(match[2])
      id = match[2];
      // setYoutubeId(match[2]);
    }
    return id;
  }

  return (
    <div>
      <div className="main-form1">
        <div className="main-heading">
          <H4>Tell your story</H4>
          <p className="headingPara">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam{' '}
          </p>
        </div>

        <div className="mainForm">
          <TinyMCE
            placeholder="content here"
            className="editorTiny"
            content={values.editorValue}
            config={{
              plugins: 'autolink link image lists print preview',
              toolbar:
                'undo redo | bold italic | alignleft aligncenter alignright | media image link',
            }}
            name="editorValue"
            value={values.editorValue}
            onChange={handleEditorChange}
          />

          <Form.Group controlId="zakatEligible" className="formGroupMain">
            <div>
              <H5>Zakat Eligible</H5>
            </div>
            <Form.Row>
              <Col>



                <FormControlLabel
                  control={<CustomCheckbox

                    value={values.zakatEligible}
                    checked={values.zakatEligible}
                    onChange={e =>
                      setFieldValue('zakatEligible', e.target.checked)} />}
                  label="Yes, this campaign is zakat eligible."
                />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group style={{ marginTop: '10px' }} className="formGroupMain">
            <div>
              <H5>Gift Aid</H5>
            </div>

            <Form.Row>
              <Col>
                <div className="toggle-custom">
                  <Button
                    style={{ width: '41%' }}
                    className={`${btnSelected
                      ? 'toggle-unselectedBtn'
                      : 'toggle-selectedBtn'
                      } `}
                    onClick={() => setBtnSelected(false)}
                  >
                    {' '}
                    None
                  </Button>
                  <Button
                    style={{ width: '50%' }}
                    className={`${btnSelected
                      ? 'toggle-selectedBtn'
                      : 'toggle-unselectedBtn'
                      }`}
                    onClick={() => setBtnSelected(true)}
                  >
                    {' '}
                    UK Gift Aid
                  </Button>
                </div>


              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Control
            type="text"
            isInvalid={errors.video}
            value={values.video}
            name="video"
            placeholder="Video Link (Youtube only)"
            className="controlForm"
            onChange={setVideo}
          />
          {values.video != '' ?
            <iframe width="100%" style={{ marginTop: '10px' }} height="315" src={`//www.youtube.com/embed/${getVideoId(values.video)}`} frameborder="0" allowfullscreen></iframe>
            : ''}

          <Form.Group>

          </Form.Group>
          <Form.Group>
            <div style={{ position: 'relative' }}>
              {values.base64 ? (
                <div className="base64ImageHandling">
                  <img className="base64Img" src={values.base64} />
                  <svg
                    version="1.1"
                    className="closeIcon"
                    onClick={handleImage}
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 496 496"
                  >
                    <g>
                      <g>
                        <g>
                          <path d="M248,0C111.033,0,0,111.033,0,248s111.033,248,248,248s248-111.033,248-248C495.841,111.099,384.901,0.159,248,0z M248,480C119.87,480,16,376.13,16,248S119.87,16,248,16s232,103.87,232,232C479.859,376.072,376.072,479.859,248,480z" />
                          <path d="M361.136,134.864c-3.124-3.123-8.188-3.123-11.312,0L248,236.688L146.176,134.864c-3.069-3.178-8.134-3.266-11.312-0.197c-3.178,3.069-3.266,8.134-0.197,11.312c0.064,0.067,0.13,0.132,0.197,0.197L236.688,248L134.864,349.824c-3.178,3.07-3.266,8.134-0.196,11.312c3.07,3.178,8.134,3.266,11.312,0.196c0.067-0.064,0.132-0.13,0.196-0.196L248,259.312l101.824,101.824c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116L259.312,248l101.824-101.824C364.259,143.052,364.259,137.988,361.136,134.864z" />
                        </g>
                      </g>
                    </g>
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                    <g />
                  </svg>
                </div>
              ) : (
                  <DropZone
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                  />
                )}
            </div>
          </Form.Group>

          <div
            style={{ margin: '5px 0px 20px auto' }}
          >
            <div className="campaignBtnsForm2">
              <Button
                className="editCampaignBtn"
                onClick={() => setActiveLink(0)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="viewCampaignBtn"
                onClick={() => console.log(selectedFiles)}
              >
                {' '}
                {loading == false && <div> Save and Continue</div>}
                {loading && <Spinner animation="border" size="sm" />}{' '}
              </Button>
            </div>
          </div>

          {/* <button onClick={doStuffWhenFileChanges} >Hello</button> */}
        </div>
      </div>
    </div >
  );
};

Form2.propTypes = {};

export default memo(Form2);
