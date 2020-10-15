/**
 *
 * CampaignUpdates
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Card,
  Button,
  Container,
  Spinner
} from 'react-bootstrap';

import './campaignUpdates.scss';

import { SnackbarProvider, useSnackbar } from 'notistack';

import TinyMCE from 'react-tinymce';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { deleteCampaignsUpdates, getCampaignsUpdates, campaignStatusUpdate, campaignAddStatus } from '../../utils/crud/campaignStatus.crud';


const CampaignUpdates = ({ editCampaignData, ...props }) => {
  const [editorVal, setEditorVal] = useState('');
  const token = localStorage.getItem('token');
  const [loading, setLoading] = React.useState(false);
  const [editStatus, setEditStatus] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [allUpdateStatus, setAllUpdateStatus] = useState([]);
  const [title, setTitle] = useState('');
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [updateDataId, setUpdateDataId] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleEditorChange = event => {
    setEditorVal(event.target.getContent());
  };

  const handleClick = data => event => {
    setAnchorEl(event.currentTarget);

    setUpdateDataId(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleClickVariant = (variant, message) => {
    console.log(variant);
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    });
  };


  function getUpdates() {
    setLoadingSpinner(true);
    getCampaignsUpdates(props.match.params.id)
      .then(({ data, status }) => {
        if (status == 200) {
          setLoadingSpinner(false);
          setAllUpdateStatus(data.response.data.res);
        }
      })
      .catch(error => {
        setLoadingSpinner(false);
        console.log(error);
      });

  }

  useEffect(() => {

    getUpdates();

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    };

    fetch(`${process.env.baseURL}/campaignBasicDetails/${props.match.params.id}`, requestOptions)
      .then(response => response.json())
      .then(user => {
        console.log(user.response.data);
        setTitle(user.response.data.campaignTitle)

      })
      .catch(error => {
        console.log(error);
      });


  }, [

  ]);


  function addUpdates() {
    setLoading(true);
    if (editStatus) {
      campaignStatusUpdate(editorVal, updateDataId.id)
        .then(({ data, status }) => {
          console.log('edit campaign', status, data);
          if (status == 200) {
            setLoading(false);
            handleClickVariant('success', data.response.message);
            tinymce.activeEditor.setContent('');
            getUpdates();
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    }
    else {
      campaignAddStatus(props.match.params.id, editorVal)
        .then(({ data, status }) => {
          console.log('add campaign', status, data);
          if (status == 200) {
            setLoading(false);
            handleClickVariant('success', data.response.message);
            tinymce.activeEditor.setContent('');
            getUpdates();
          }
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    }


  }




  function edit(data) {
    handleClose();
    setEditStatus(true);
    tinymce.activeEditor.setContent(updateDataId.description);
  }

  function deleteupdateStatus() {
    handleClose();
    deleteCampaignsUpdates(updateDataId.id)
      .then(({ data, status }) => {
        console.log('del campaign', status, data);
        if (status == 200) {
          handleClickVariant('success', data.response.message);
          getUpdates();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <div>

      <Container>
        <TinyMCE
          placeholder="Updates"
          className="editorTiny"
          // content={updateData}
          config={{
            plugins: 'image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | link image | code',
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
          // value={updateData}
          onChange={handleEditorChange}
        />
        <div className="addUpdate">
          <Button className="updateBtn" onClick={addUpdates}>
            {loading == false && <div>Update Status</div>}
            {loading && <Spinner animation="border" size="sm" />}{' '}
          </Button>{' '}
        </div>
      </Container>

      {loadingSpinner && <Spinner style={{
        color: '#f15a24', position: 'relative',
        left: '50%'
      }} animation="border" size="lg" />}{' '}

      {
        allUpdateStatus.map(data => (
          <Timeline key={data.id}>
            <TimelineItem className='timelineItem'>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className='timelineContent'>
                <div className="timelineHeader">
                  <h3>{title}</h3>
                  <span>
                    {moment(data.updatedAt).fromNow()}
                    <span className="statusUpdatesIcon" onClick={handleClick(data)} >
                      <svg width="18px" height="18px" version="1.1" id="Layer_1" viewBox="0 0 512 512">
                        <g>
                          <g>
                            <g>
                              <path d="M256,192c-35.292,0-64,28.708-64,64s28.708,64,64,64s64-28.708,64-64S291.292,192,256,192z M256,298.667     c-23.521,0-42.667-19.135-42.667-42.667s19.146-42.667,42.667-42.667s42.667,19.135,42.667,42.667S279.521,298.667,256,298.667z" />
                              <path d="M256,384c-35.292,0-64,28.708-64,64c0,35.292,28.708,64,64,64s64-28.708,64-64C320,412.708,291.292,384,256,384z      M256,490.667c-23.521,0-42.667-19.135-42.667-42.667s19.146-42.667,42.667-42.667s42.667,19.135,42.667,42.667     S279.521,490.667,256,490.667z" />
                              <path d="M256,128c35.292,0,64-28.708,64-64S291.292,0,256,0s-64,28.708-64,64S220.708,128,256,128z M256,21.333     c23.521,0,42.667,19.135,42.667,42.667S279.521,106.667,256,106.667S213.333,87.531,213.333,64S232.479,21.333,256,21.333z" />
                            </g>
                          </g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                        <g>
                        </g>
                      </svg>
                    </span>

                  </span>
                </div>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <MenuItem onClick={() => edit(data)}>Edit</MenuItem>
                  <MenuItem onClick={deleteupdateStatus}>Delete</MenuItem>
                </Menu>
                <Card.Text
                  className="descriptionCampaignUpdates"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ))}

    </div>
  );
}

CampaignUpdates.propTypes = {};

export default withRouter(memo(CampaignUpdates));
