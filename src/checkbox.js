import React, { useState } from "react";
function Checkbox(props) {
  const default_state = props.default_state === false ? false : true;
  const [checked, setChecked] = useState(default_state);
  const layer = props.layer;
  const changeVisibility = props.changeVisibility;
  const handleChange = () => {
    setChecked(!checked);
    changeVisibility(layer, !checked);
  };
  return (
    <input
      type='checkbox'
      checked={checked}
      onChange={handleChange}
      value={props.layer}></input>
  );
}
export { Checkbox };
