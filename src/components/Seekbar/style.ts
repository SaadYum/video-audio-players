import styled from "styled-components";

export const SeekbarStyled = styled.progress`
  width: 100%;
  height: 2px;
  cursor: pointer;
  background-color: rgb(245 245 245 / 50%);
  border-radius: 5px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.11);

  &::-webkit-progress-bar {
    background-color: rgb(245 245 245 / 50%);
    border-radius: 5px;
  }

  &::-webkit-progress-value {
    background-color: rgb(245 245 245 / 100%);
    border-radius: 5px;
  }

  &::-moz-progress-bar {
    background-color: rgb(245 245 245 / 100%);
    border-radius: 5px;
  }
`;
