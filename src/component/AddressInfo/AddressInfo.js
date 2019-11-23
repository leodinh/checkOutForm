import React from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Aux from "../../hoc/Aux/Aux";
import style from "../../container/FormCheckout/FormCheckout.module.css";
const AddressInfo = props => {
  return (
    <Aux>
      <p className={style.Content__Title}>Address Info</p>
      <div className={style.Content__Underlined}></div>
      <TextField
        label="City"
        className={style.Content__Text}
        margin="normal"
        onChange={props.change("city")}
        defaultValue={props.value.city}
        helperText={
          props.error.city !== undefined && props.value.city === ""
            ? props.error.city
            : ""
        }
        error={
          props.error.city !== undefined && props.value.city === ""
            ? true
            : false
        }
        onBlur={props.empty("city")}
      />
      <InputLabel
        id="demo-simple-select-label"
        className={style.Content__Label}
      >
        Province
      </InputLabel>
      <FormControl
        className={style.Content__Form}
        error={
          props.error.province !== undefined && props.value.province
            ? true
            : false
        }
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value.province}
          className={style.Content__Select}
          onChange={props.change("province")}
        >
          {props.provinceList.map(province => (
            <MenuItem value={province} key={province}>
              {province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Aux>
  );
};
export default AddressInfo;
