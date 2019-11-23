import React from "react";
import Aux from "../../hoc/Aux/Aux";
import style from "./NetworkMessage.module.css";
const networkMessage = props => {
  return (
    <Aux>
      {!props.isOnline && (
        <div className={style.Message_Error}>
          "You are offline. Go online to save the data"
        </div>
      )}
    </Aux>
  );
};
export default networkMessage;
