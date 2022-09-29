import React from "react";

import { SeekbarTypes } from "../types";
import { SeekbarStyled } from "./style";

export const Seekbar = ({ timeStamp, duration, onSeek }: SeekbarTypes) => {
  const value = (timeStamp / duration) * 100;

  const handleSeek = (e) => {
    const { left = 0, width = 1 } = e.target.getBoundingClientRect();
    const x = e.pageX - left;
    const clickedValue = (x * e.target.max) / width;
    const newTimestamp = (clickedValue / 100) * duration;
    onSeek(newTimestamp);
    e.stopPropagation();
  };

  return (
    <SeekbarStyled
      id="seek-bar"
      value={`${value}`}
      max="100"
      className="fk-seek-bar"
      onClick={handleSeek}
    >
      {value}%
    </SeekbarStyled>
  );
};
