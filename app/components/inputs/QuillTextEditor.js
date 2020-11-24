import React from 'react';
import ReactQuill from 'react-quill';

const QuillTextEditor = ({
  value,
  onChangeEditor,
  inputImage = false,
  ...props
}) => {
  const toolbar = inputImage ? ['link', 'image'] : ['link'];
  const editorModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { align: null },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
      ],
      toolbar,
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    },
  };
  const editorFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'indent',
    'align',
    ...toolbar,
  ];
  return (
    <ReactQuill
      className="quill-editor"
      value={value}
      modules={editorModules}
      formats={editorFormats}
      onChange={onChangeEditor}
      {...props}
    />
  );
};

export default QuillTextEditor;
