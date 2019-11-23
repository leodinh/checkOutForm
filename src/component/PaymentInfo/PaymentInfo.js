import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Aux from "../../hoc/Aux/Aux";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../container/FormCheckout/FormCheckout.module.css";
const useStyles = makeStyles({
  paymentinfo_form: {
    display: "block",
    textAlign: "start",
    marginLeft: "30px",
    paddingLeft: "0px"
  },
  paymentinfo_checkbox: {
    paddingLeft: "0px"
  },
  paymentinfo_method: {
    marginTop: "20px",
    textAlign: "start",
    marginLeft: "30px"
  },
  paymentinfo_radio: {
    marginLeft: "30px"
  }
});
const PaymentInfo = props => {
  const classes = useStyles();
  return (
    <Aux>
      <p className={style.Content__Title}>Payment Info</p>
      <div className={style.Content__Underlined}></div>
      <FormLabel component="legend" className={classes.paymentinfo_method}>
        Payment method
      </FormLabel>
      <RadioGroup
        aria-label="payment"
        value={props.value.payment}
        onChange={props.change("payment")}
        className={classes.paymentinfo_radio}
      >
        <FormControlLabel value="Bitcoin" control={<Radio />} label="Bitcoin" />
        <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
        <FormControlLabel
          value="Credit Card"
          control={<Radio />}
          label="Credit Card"
        />
      </RadioGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.value.agreeTerm}
            onChange={props.change("agreeTerm")}
            className={classes.paymentinfo_checkbox}
          />
        }
        label="I agree to the Terms & Conditions"
        className={classes.paymentinfo_form}
      />
    </Aux>
  );
};
export default PaymentInfo;
