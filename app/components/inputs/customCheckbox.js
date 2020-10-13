import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const CustomCheckbox = withStyles({
    root: {
      color: '#f15a24',
      '&$checked': {
        color: '#f15a24',
      },
    },
    checked: {},
  })(props => <Checkbox color="default" {...props} />);

  export default CustomCheckbox;