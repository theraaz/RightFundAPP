/**
 *
 * CampaignUpdates
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Card,
  Button,
  Container,
  Spinner
} from 'react-bootstrap';

import './campaignUpdates.scss';

import { Link } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

import TinyMCE from 'react-tinymce';


const CampaignUpdates = ({ editCampaignData }) => {
  const [editorVal, setEditorVal] = useState('');
  const token = localStorage.getItem('token');
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleEditorChange = event => {
    setEditorVal(event.target.getContent());
    console.log(event.target.getContent())
  };

  const handleClickVariant = (variant, message) => {
    console.log(variant);
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };


  function addUpdates() {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      }, body: JSON.stringify({
        description: editorVal,
        campaignId: editCampaignData.id,
      }),
    };

    fetch(
      `${process.env.baseURL}/campaignStatus`,
      requestOptions,
    )
      .then(response => response.json())
      .then(user => {
        setLoading(false);
        if (user.statusCode == 200) {
          handleClickVariant('success', user.response.message);
          getAllPackages();
        } else {
          handleClickVariant('error', user.response.message);
        }
        console.log(user);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <div>
      <Card className="dataCard shadow mb-5 bg-white">
        <Card.Header style={{ background: 'transparent' }}>
          <Card.Title className="campaignHeader">
            <span style={{ marginTop: '8px' }}>{editCampaignData ? editCampaignData.title : ''}</span>

            <div className="campaignHeader1 d-flex flex-column flex-sm-row">
              <Link to="/">
                <Button className="campaignViewBtn">View Campaign</Button>{' '}
              </Link>

              <Link to={`/editCampaign/${editCampaignData ? editCampaignData.id : ''}`}>
                <Button className="campaignBtn">Edit Campaign</Button>{' '}
              </Link>
            </div>
          </Card.Title>
        </Card.Header>

        <Card.Body>
          <Container>
            <TinyMCE
              placeholder="Updates"
              className="editorTiny"

              config={{
                plugins: 'image code',
                toolbar: 'undo redo | link image | code',
                /* enable title field in the Image dialog*/
                image_title: true,
                /* enable automatic uploads of images represented by blob or data URIs*/
                automatic_uploads: true,
                /*
                  URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                  images_upload_url: 'postAcceptor.php',
                  here we add custom filepicker only to Image dialog
                */
                file_picker_types: 'image',
                /* and here's our custom image picker*/
                file_picker_callback: function (cb, value, meta) {
                  var input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');

                  /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                  */

                  input.onchange = function () {
                    var file = this.files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                      /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                      */
                      var id = 'blobid' + (new Date()).getTime();
                      var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                      var base64 = reader.result.split(',')[1];
                      var blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);

                      /* call the callback and populate the Title field with the file name */
                      cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                  };

                  input.click();
                },
              }}
              name="editorValue"
              onChange={handleEditorChange}
            />
            <div className="addUpdate">
              <Button className="updateBtn" onClick={addUpdates}>
                {loading == false && <div>Add Update</div>}
                {loading && <Spinner animation="border" size="sm" />}{' '}
              </Button>{' '}
            </div>
          </Container>

        </Card.Body>

      </Card>
    </div>
  );
}

CampaignUpdates.propTypes = {};

export default memo(CampaignUpdates);
