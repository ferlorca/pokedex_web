import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import RenderAutocomplete from './renderAutocomplete';
import { CircularProgress } from '@material-ui/core';

export const typesElements = {
  INPUT: "INPUT",
  INPUT_BASE: "INPUT_BASE",
  INPUT_NAKED: "INPUT_NAKED",
  TEXT_AREA: "TEXT_AREA",
  CHECKBOX: "CHECKBOX",
  SWITCH: "SWITCH",
  AUTOCOMPLETE: "AUTOCOMPLETE",
}

function FormField({ formdata, change, inputStyle ,className=null}) { 
  const showError = () => {
    let errorMessage = null;
    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <FormHelperText style={{ textAlign: "center" }}>  {formdata.validationMessage}</FormHelperText>
      )
    }
    return errorMessage;
  }

  const renderTemplate = () => {
    let formTemplate = null;
    switch (formdata.element) {
      case (typesElements.INPUT):
        formTemplate = (
          <FormControl margin="normal" component="fieldset" fullWidth error={!formdata.valid && formdata.touched}>
            <TextField
              label={formdata.label}
              variant="outlined" 
              autoFocus={false}
              {...formdata.config}
              inputProps={{
                readOnly: formdata.config.disabled,
              }}
              name={formdata.config.name}
              value={formdata.value}              
              onBlur={(event) => change({ event, id: formdata.config.id, blur: true })}
              onChange={(event) => change({ event, id: formdata.config.id, blur: false })}
            />
            {showError()}
          </FormControl>
        )
        break; 
      case (typesElements.AUTOCOMPLETE):
        formTemplate = (
          <FormControl margin="normal" component="fieldset" fullWidth error={!formdata.valid && formdata.touched}>
            <Autocomplete
              className = {className ?? ""} 
              {...formdata.config}
              options={formdata.childElements}
              getOptionLabel={(option) => option.name?? ""}
              getOptionSelected={(option) => option.id === formdata.value.id}
              value={formdata.value}
              onChange={(event, value) => change({ value, id: formdata.config.id, blur: true })}
              renderOption={(option) => (<RenderAutocomplete {...option} />)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={formdata.label}
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {formdata.config.disabled ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            {showError()}
          </FormControl>
        )
        break;
        case (typesElements.AUTOCOMPLETE_MULTIPLE):
          formTemplate = (
            <FormControl margin="normal" component="fieldset" fullWidth error={!formdata.valid && formdata.touched}>
              <Autocomplete
                multiple
                {...formdata.config}                
                options={formdata.childElements}
                getOptionLabel={(option) => option.name}
                value={formdata.value}
                onChange={(event, value) => change({ value, id: formdata.config.id, blur: true })}  
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"                 
                    placeholder={formdata.label}
                  />
                )}
              />
              {showError()}
            </FormControl>
          )
          break;
      case typesElements.CHECKBOX:
        formTemplate = (
          <FormControl component="fieldset" fullWidth error={!formdata.valid && formdata.touched}>
            {formdata.title ?
              <FormLabel component="legend">{formdata.title}</FormLabel>
              : null
            }
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={formdata.value} onChange={(event) => change({ value: event.target.checked, id: formdata.config.id, blur: true })}
                  {...formdata.config}
                />}
                label={formdata.label}
              />
            </FormGroup>
            {formdata.helperText ?
              <FormHelperText>formdata.helperText</FormHelperText>
              : null
            }
          </FormControl>)
        break;
      case typesElements.SWITCH:
        formTemplate = (
          <FormControl component="fieldset" fullWidth error={!formdata.valid && formdata.touched}>
            {formdata.title ?
              <FormLabel component="legend">{formdata.title}</FormLabel>
              : null
            }
            <FormControlLabel
              control={
                <Switch
                  checked={formdata.value}
                  onChange={(event) => change({ value: event.target.checked, id: formdata.config.id, blur: true })}
                  {...formdata.config}
                />}
              label={formdata.label}
            />
          </FormControl>)
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  }

  return (
    <React.Fragment>
      {renderTemplate()}
    </React.Fragment>
  )
}

export default FormField
