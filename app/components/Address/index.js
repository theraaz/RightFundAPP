/**
 *
 * Address
 *
 */

import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

function Address({ setFieldValue }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAAKtIYZReaNU9GhuI9aC_SRS2POhskIRg&libraries=places',
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const onChange = (event, newValue) => {
    // let map = new window.google.maps.Map(
    //   document.getElementById("map")
    // );
    // var service = new google.maps.places.PlacesService(document.createElement('div'));
    // service.getDetails(
    //   {
    //     placeId: value?.place_id
    //   },
    //   function(place, status) {
    //     console.log("place", place);
    //     if (
    //       status === window.google.maps.places.PlacesServiceStatus.OK
    //     ) {
    //       let address = {};
    //       for (const addr of place.address_components) {
    //         if (addr.types.includes("administrative_area_level_1")) {
    //           setFieldValue("state", addr.long_name);
    //         }
    //         if (addr.types.includes("administrative_area_level_2")) {
    //           setFieldValue("county", addr.long_name);
    //         }
    //         if (
    //           addr.types.includes("locality") ||
    //           addr.types.includes("postal_town")
    //         ) {
    //           setFieldValue("city", addr.long_name);
    //         }
    //         if (addr.types.includes("country")) {
    //           setFieldValue("country", addr.long_name);
    //         }
    //         if (addr.types.includes("postal_code")) {
    //           setFieldValue("postcode", addr.long_name);
    //         }
    //         if (addr.types.includes("street_number")) {
    //           setFieldValue("line1", addr.long_name);
    //         }
    //         if (addr.types.includes("route")) {
    //           setFieldValue(
    //             "line1",
    //             address.line1
    //               ? `${address.line1}, ${addr.long_name}`
    //               : addr.long_name
    //           );
    //         }
    //         if (addr.types.includes("neighborhood")) {
    //           setFieldValue("line2", addr.long_name);
    //         }
    //       }
    //     }
    //   }
    // );
    // setOptions(newValue ? [newValue, ...options] : options);
    // setValue(newValue);
  };
  return (
    <Autocomplete
      id="google-map-demo"
      style={{ width: 300 }}
      getOptionLabel={option =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={onChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Add a location"
          variant="outlined"
          fullWidth
        />
      )}
      renderOption={option => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

Address.propTypes = {};

export default memo(Address);
