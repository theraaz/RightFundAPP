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
import {
  Row,
  Col,
  Form
} from 'react-bootstrap/';

import './address.scss';
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

function Address({ setFieldValue, values, errors }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.googleLocationProviderKey}`,
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

  function reset() {

    setFieldValue("state", '');


    setFieldValue("county", '');


    setFieldValue("city", '');

    setFieldValue("country", '');

    setFieldValue("postcode", '');





    setFieldValue("line1", '');


    setFieldValue("line2", '');

  }
  const onChange = (event, newValue) => {
    console.log(newValue)
    reset();
    let map = new window.google.maps.Map(
      document.getElementById("map")
    );
    var service = new google.maps.places.PlacesService(map);
    service.getDetails(
      {
        placeId: newValue && newValue.place_id
      },
      function (place, status) {
        console.log("place", place);
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK
        ) {
          let address = {};
          for (const addr of place.address_components) {
            if (addr.types.includes("administrative_area_level_1")) {
              setFieldValue("state", addr.long_name);
            }
            if (addr.types.includes("administrative_area_level_2")) {
              setFieldValue("county", addr.long_name);
            }
            if (
              addr.types.includes("locality") ||
              addr.types.includes("postal_town")
            ) {
              setFieldValue("city", addr.long_name);
            }
            if (addr.types.includes("country")) {
              setFieldValue("country", addr.long_name);
            }
            if (addr.types.includes("postal_code")) {
              setFieldValue("postcode", addr.long_name);
            }
            if (addr.types.includes("street_number")) {
              setFieldValue("line1", addr.long_name);
            }
            if (addr.types.includes("premise")) {
              setFieldValue("line1", addr.long_name);
            }
            if (addr.types.includes("route")) {
              setFieldValue(
                "line1",
                address.line1
                  ? `${address.line1}, ${addr.long_name}`
                  : addr.long_name
              );
            }
            if (addr.types.includes("neighborhood")) {
              setFieldValue("line2", addr.long_name);
            }
          }
        }
      }
    );
    setOptions(newValue ? [newValue, ...options] : options);
    setValue(newValue);
  };
  return (
    <>
     
      <Autocomplete
        id="google-map-demo"
        className='googleAddress'
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
            placeholder='Add a location'
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
      <Row>
        <Col xs={12} sm={4}>
          <Form.Group controlId="line1" bssize="large">
            <Form.Control
              type="text"
              isInvalid={errors.line1}
              value={values.line1}
              name="line1"
              placeholder="Line 1"
              className="controlForm"
              onChange={event => setFieldValue('line1', event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={4}>
          <Form.Group controlId="line2" bssize="large">
            <Form.Control
              type="text"
              isInvalid={errors.line2}
              value={values.line2}
              name="line2"
              placeholder="Line 2"
              className="controlForm"
              onChange={event => setFieldValue('line2', event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={4}>
          <Form.Group controlId="city" bssize="large">
            <Form.Control
              type="text"
              isInvalid={errors.city}
              value={values.city}
              name="city"
              placeholder="City"
              className="controlForm"
              onChange={event => setFieldValue('city', event.target.value)}
            />
          </Form.Group>
        </Col>

      </Row>

      <Row>
        <Col xs={12} sm={6}>
          <Form.Group controlId="state" bssize="large">
            <Form.Control
              type="text"
              isInvalid={errors.state}
              value={values.state}
              name="state"
              placeholder="State"
              className="controlForm"
              onChange={event => setFieldValue('state', event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group controlId="country" bssize="large">
            <Form.Control
              type="text"
              isInvalid={errors.country}
              value={values.country}
              name="country"
              placeholder="Country"
              className="controlForm"
              onChange={event => setFieldValue('country', event.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

Address.propTypes = {};

export default memo(Address);
