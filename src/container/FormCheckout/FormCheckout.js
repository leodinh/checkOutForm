import React, { useState, useEffect } from "react";
import BasicInfo from "../../component/BasicInfo/BasicInfo";
import AddressInfo from "../../component/AddressInfo/AddressInfo";
import PaymentInfo from "../../component/PaymentInfo/PaymentInfo";
import NetworkMessage from "../../component/NetworkMessage/NetworkMessage";
import styles from "./FormCheckout.module.css";
import { databaseRef } from "../../firebase/FireBaseRef";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import useNetworkStatusEffect from "../../hooks/useNetworkStatusEffect";
function FormCheckout() {
  const [step, setStep] = useState(1);
  const [dietList, setDietList] = useState([
    "None",
    "Vegan",
    "Vegetarian",
    "Halal/Kosher"
  ]);
  const [provinceList, setProvinceList] = useState([
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan"
  ]);
  const [errorStatus, setErrorStatus] = useState({});
  const { isOnline } = useNetworkStatusEffect();
  const [loadingStatus, setLoadingStatus] = useState("Submit");
  const [infor, setInfor] = useState(
    localStorage.getItem("infor")
      ? JSON.parse(localStorage.getItem("infor"))
      : {
          firstName: "",
          lastName: "",
          dietRestriction: "",
          city: "",
          province: "",
          payment: "",
          agreeTerm: false
        }
  );
  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };
  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };
  const handleInforChange = input => e => {
    const updatedInfo = { ...infor };
    input === "agreeTerm"
      ? (updatedInfo[input] = e.target.checked)
      : (updatedInfo[input] = e.target.value);
    setInfor(updatedInfo);
  };
  const checkEmpty = input => e => {
    const currentInfor = { ...infor };
    let errors = { ...errorStatus };
    if (currentInfor[input] === "") {
      errors[input] = "Please enter " + input;
    } else if (
      errors[input] !== undefined &&
      currentInfor[input] !== undefined
    ) {
      errors = Object.keys(errors).reduce((object, key) => {
        if (key !== input) {
          object[key] = errors[key];
        }
        return object;
      }, {});
    }
    setErrorStatus(errors);
  };
  const submitForm = async () => {
    const data = { ...infor };
    databaseRef
      .push(data)
      .then(
        result =>
          new Promise(resolve => {
            setLoadingStatus("Saving....");
            resolve("Saved");
          })
      )
      .then(result => {
        setTimeout(() => {
          setLoadingStatus(result);
          localStorage.removeItem("infor");
        }, 3000);
      });
  };
  useEffect(() => {
    const currentInfor = { ...infor };
    localStorage.setItem("infor", JSON.stringify(currentInfor));
  }, [infor]);
  const {
    firstName,
    lastName,
    dietRestriction,
    city,
    province,
    payment,
    agreeTerm
  } = infor;
  const basicInfoValue = { firstName, lastName, dietRestriction };
  const addressInfoValue = { city, province };
  const paymentInfoValue = { payment, agreeTerm };
  const inValidFirstStep =
    step === 1 &&
    (firstName === "" || lastName === "" || dietRestriction === "");
  const inValidSecondStep = step === 2 && (city === "" || province === "");
  let formContent = null;
  let nextBtnStyle = [styles.Button, styles.Float_right];
  let prevBtnStyle = [styles.Button, styles.Float_left];
  switch (step) {
    case 1:
      formContent = (
        <BasicInfo
          change={handleInforChange}
          dietList={dietList}
          value={basicInfoValue}
          empty={checkEmpty}
          error={errorStatus}
        />
      );
      break;
    case 2:
      formContent = (
        <AddressInfo
          change={handleInforChange}
          provinceList={provinceList}
          value={addressInfoValue}
          empty={checkEmpty}
          error={errorStatus}
        />
      );
      break;
    case 3:
      formContent = (
        <PaymentInfo
          isOnline={isOnline}
          change={handleInforChange}
          value={paymentInfoValue}
        />
      );
      break;
    default:
      formContent = null;
      break;
  }
  return (
    <form className={styles.Form}>
      <p className={styles.Form__Title}>Checkout</p>
      <div className={styles.Form__Content}>{formContent}</div>

      <NetworkMessage isOnline={isOnline} />
      {step < 3 && (
        <IconButton
          color="primary"
          aria-label="Next"
          className={nextBtnStyle.join(" ")}
          disabled={inValidFirstStep || inValidSecondStep ? true : false}
          onClick={nextStep}
        >
          <NavigateNextIcon />
        </IconButton>
      )}
      {step === 3 && (
        <Button
          variant="contained"
          color="primary"
          disabled={payment === "" || agreeTerm === false || isOnline === false}
          className={styles.Button}
          onClick={submitForm}
        >
          {loadingStatus}
        </Button>
      )}
      {step > 1 && (
        <IconButton
          color="primary"
          aria-label="Previous"
          className={prevBtnStyle.join(" ")}
          onClick={prevStep}
        >
          <NavigateBeforeIcon />
        </IconButton>
      )}
      <div className={styles.Clear}></div>
    </form>
  );
}
export default FormCheckout;
