import React from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import style from "../../container/FormCheckout/FormCheckout.module.css";
import Aux from "../../hoc/Aux/Aux";
const BasicInfo = props => {
  return (
    <Aux>
      <p className={style.Content__Title}>Basic Info</p>
      <div className={style.Content__Underlined}></div>
      <TextField
        label="First Name"
        className={style.Content__Text}
        margin="normal"
        onChange={props.change("firstName")}
        defaultValue={props.value.firstName}
        helperText={
          props.error.firstName !== undefined && props.value.firstName === ""
            ? props.error.firstName
            : ""
        }
        error={
          props.error.firstName !== undefined && props.value.firstName === ""
            ? true
            : false
        }
        onBlur={props.empty("firstName")}
      />
      <TextField
        label="Last Name"
        className={style.Content__Text}
        margin="normal"
        onChange={props.change("lastName")}
        defaultValue={props.value.lastName}
        onBlur={props.empty("lastName")}
        helperText={
          props.error.lastName !== undefined && props.value.lastName === ""
            ? props.error.lastName
            : ""
        }
        error={
          props.error.lastName !== undefined && props.value.lastName === ""
            ? true
            : false
        }
      />
      <InputLabel id="diet-label" className={style.Content__Label}>
        Diet Restriction
      </InputLabel>
      <FormControl
        className={style.Content__Form}
        error={
          props.error.dietRestriction !== undefined &&
          props.value.dietRestriction === ""
            ? true
            : false
        }
      >
        <Select
          labelId="diet-label"
          id="diet-select"
          value={props.value.dietRestriction}
          className={style.Content__Select}
          onChange={props.change("dietRestriction")}
          onBlur={props.empty("dietRestriction")}
        >
          {props.dietList.map(diet => (
            <MenuItem value={diet} key={diet}>
              {diet}
            </MenuItem>
          ))}
        </Select>
        {props.error.dietRestriction !== undefined &&
        props.value.dietRestriction === "" ? (
          <FormHelperText>{props.error.dietRestriction}</FormHelperText>
        ) : null}
      </FormControl>
    </Aux>
  );
};
export default BasicInfo;
