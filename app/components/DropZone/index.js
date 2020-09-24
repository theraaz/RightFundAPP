/**
 *
 * DropZone
 *
 */

import React, { memo, useRef, useState, useEffect } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './Dropzone.scss';

const DropZone = ({ selectedFiles, setSelectedFiles }) => {
  const fileInputRef = useRef();
  const modalImageRef = useRef();
  const modalRef = useRef();
  const progressRef = useRef();
  const uploadRef = useRef();
  const uploadModalRef = useRef();
  const [imageFile, setImageFile] = useState();
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const preventDefault = e => {
    e.preventDefault();
    // e.stopPropagation();
  };

  const dragOver = e => {
    preventDefault(e);
  };

  const dragEnter = e => {
    preventDefault(e);
  };

  const dragLeave = e => {
    preventDefault(e);
  };

  const fileDrop = e => {
    preventDefault(e);
    const { files } = e.dataTransfer;
    if (files.length) {
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFiles = files => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles(prevArray => [...prevArray, files[i]]);
        openImageModal(files[0]);
        setImageFile(files[0]);
      } else {
        files[i].invalid = true;
        setSelectedFiles(prevArray => [...prevArray, files[i]]);
        setErrorMessage('File type not permitted');
        setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
      }
    }
  };

  const validateFile = file => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }

    return true;
  };

  const fileSize = size => {
    if (size === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return `${parseFloat((size / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const fileType = fileName =>
    fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
    fileName;

  const removeFile = name => {
    const index = validFiles.findIndex(e => e.name === name);
    const index2 = selectedFiles.findIndex(e => e.name === name);
    const index3 = unsupportedFiles.findIndex(e => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
    // closeModal()
  };

  const openImageModal = file => {
    const reader = new FileReader();
    modalRef.current.style.display = 'block';
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    };
  };

  const closeModal = () => {
    modalRef.current.style.display = 'none';
    modalImageRef.current.style.backgroundImage = 'none';
    console.log(imageFile);
    removeFile(imageFile.name);
  };

  const uploadFiles = async () => {
    uploadModalRef.current.style.display = 'block';
    uploadRef.current.innerHTML = 'File(s) Uploading...';
    for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData();
      formData.append('image', validFiles[i]);
      formData.append('key', '');

      axios
        .post('https://api.imgbb.com/1/upload', formData, {
          onUploadProgress: progressEvent => {
            const uploadPercentage = Math.floor(
              (progressEvent.loaded / progressEvent.total) * 100,
            );
            progressRef.current.innerHTML = `${uploadPercentage}%`;
            progressRef.current.style.width = `${uploadPercentage}%`;

            if (uploadPercentage === 100) {
              uploadRef.current.innerHTML = 'File(s) Uploaded';
              validFiles.length = 0;
              setValidFiles([...validFiles]);
              setSelectedFiles([...validFiles]);
              setUnsupportedFiles([...validFiles]);
            }
          },
        })
        .catch(() => {
          uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
          progressRef.current.style.backgroundColor = 'red';
        });
    }
  };

  const closeUploadModal = () => {
    uploadModalRef.current.style.display = 'none';
  };

  return (
    <>
      <div>
        {/* {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload Files</button> : ''} */}
        {unsupportedFiles.length ? (
          <p>Please remove all unsupported files.</p>
        ) : (
          ''
        )}
        <div
          className="drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className="drop-message">
            <div className="upload-icon">
              <svg
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path d="M492,327c11.046,0,20-8.954,20-20V177c0-44.112-35.888-80-80-80h-30.361c-8.565,0-16.174-5.447-18.934-13.556l-6.051-17.777C368.374,41.343,345.548,25,319.854,25H192.083c-25.196,0-47.875,15.923-56.432,39.621l-6.923,19.172C125.875,91.692,118.316,97,109.917,97H80c-44.112,0-80,35.888-80,80v230c0,44.112,35.888,80,80,80h352c44.112,0,80-35.888,80-80c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20c0,22.056-17.944,40-40,40H80c-22.056,0-40-17.944-40-40V177c0-22.056,17.944-40,40-40h29.917c25.196,0,47.875-15.923,56.432-39.621l6.923-19.172C176.125,70.308,183.684,65,192.083,65h127.771c8.565,0,16.173,5.448,18.934,13.556l6.051,17.777c8.279,24.324,31.105,40.667,56.8,40.667H432c22.056,0,40,17.944,40,40v130C472,318.046,480.954,327,492,327z" />
                  </g>
                </g>
                <g>
                  <g>
                    <path d="M257,157c-68.925,0-125,56.075-125,125s56.075,125,125,125s125-56.075,125-125S325.925,157,257,157z M257,367c-46.869,0-85-38.131-85-85s38.131-85,85-85s85,38.131,85,85C342,328.869,303.869,367,257,367z" />
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
            Choose an image from your computer.
          </div>
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
          />
        </div>
        <div className="file-display-container">
          {validFiles.map((data, i) => (
            <div className="file-status-bar" key={i}>
              <div
                onClick={
                  !data.invalid
                    ? () => openImageModal(data)
                    : () => removeFile(data.name)
                }
              >
                {/* <div className="file-type-logo"></div>
                  <div className="file-type">{fileType(data.name)}</div>
                  <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                  <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>} */}
              </div>
              {/* <div className="file-remove" onClick={() => removeFile(data.name)}>X</div> */}
            </div>
          ))}
        </div>
      </div>
      <div className="modal" ref={modalRef}>
        <div className="overlay" />
        <span className="close" onClick={() => closeModal()}>
          <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 496 496">
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
        </span>
        <div className="modal-image" ref={modalImageRef} />
      </div>

      <div className="upload-modal" ref={uploadModalRef}>
        <div className="overlay" />
        <div className="close" onClick={() => closeUploadModal()}>
          <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 496 496">
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
        <div className="progress-container">
          <span ref={uploadRef} />
          <div className="progress">
            <div className="progress-bar" ref={progressRef} />
          </div>
        </div>
      </div>
    </>
  );
};

DropZone.propTypes = {};

export default memo(DropZone);
