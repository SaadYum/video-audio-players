import styled from "styled-components";

export const AudioPlayerStyled = styled.div`
  background: #7e84a3;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  .fk-audio-player {
    width: 100%;
    height: auto;
    position: absolute;
    z-index: -1;
  }

  .fk-audio-overlay {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 1;
    .fk-loading-icon {
      width: 40px;
      height: 40px;
      stroke: #fff;
    }
    .fk-audio-time {
      position: absolute;
      top: 10px;
      width: 100%;
      font-family: Poppins;
      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.86;
      letter-spacing: normal;
      text-align: center;
      color: #fff;
    }

    .fk-audio-play-pause-action {
      cursor: pointer;
      .fk-play-icon,
      .fk-pause-icon {
        width: 40px;
        height: 40px;
      }
    }

    .fk-audio-control-actions {
      position: absolute;
      bottom: 0;
      padding: 10px;
      width: 100%;
      background-image: linear-gradient(
        to bottom,
        rgb(0 0 0 / 0%),
        rgb(0 0 0 / 50%)
      );
      display: flex;
      flex-direction: column;
      .fk-audio-title,
      .fk-audio-sub-text {
        font-family: Poppins;
        font-size: 14px;
        font-weight: 600;
        margin: 0;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.2;
        letter-spacing: normal;
        text-align: center;
        color: #fff;
      }
      .fk-audio-title {
        margin-bottom: 5px;
      }
      .fk-audio-sub-text {
        font-size: 11px;
        font-weight: 500;
      }
      .fk-audio-control {
        display: flex;
        width: 100%;
        grid-gap: 10px;
        align-items: center;
        .fk-audio-viewchange-icon {
          width: 15px;
          height: 15px;
          cursor: pointer;
          .fk-audio-expand-icon,
          .fk-audio-collapse-icon {
            width: 100%;
            height: 100%;
            fill: #fff;
          }
        }
        .fk-audio-seekbar {
          -webkit-appearance: none;
          width: 100%;
          height: 1.5px;
          background: #fff;
          opacity: 0.31;
          outline: none;
          opacity: 0.7;
          -webkit-transition: 0.2s;
          transition: opacity 0.2s;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }

          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #fff;
          }
          &::-moz-range-thumb {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #fff;
          }
        }
      }
    }
  }
`;
