import React from "react";

const styles = {
  margin: "0 2% 2% 2%",
  width: "15%",
  border: "2px solid purple"
};

const Card = props => {
  return (
    <div style={styles}>
      <img src={props.img} alt={props.name} width="100%" height="80%" />
      <p style={{ textAlign: "center" }}>{props.name}</p>
    </div>
  );
};

export default Card;
