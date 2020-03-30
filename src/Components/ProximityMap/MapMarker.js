import React, { useState } from "react";

const MapMarker = props => {
  const [click, setClick] = useState(false);
  return (
    <>
      <p
        onClick={() => setClick(!click)}
        id={Math.floor(Math.random() * 100000)}
        style={{ color: "red", fontSize: "2rem" }}
      >
        &#8226;
      </p>
      {click && <p>{props.msg}</p>}
    </>
  );
};

export default MapMarker;
