import React, { forwardRef, useState, useImperativeHandle } from "react";

interface TogglableProps {
  buttonLabel: string;
  children: JSX.Element;
}
export interface TogglableHandler {
  toggleVisibility: () => void;
}
const Togglable = forwardRef<TogglableHandler, TogglableProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
