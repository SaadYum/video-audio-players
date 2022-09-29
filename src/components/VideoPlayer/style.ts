import styled from "styled-components";
type Props = {
  isPlaying: boolean;
};
export const VideoPlayerStyled = styled.div<Props>`
  background: transparent;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: relative;
  .fk-video-player {
    width: 100%;
    height: auto;
    position: absolute;
    background-color: #000;
    z-index: -1;
  }

  .fk-video-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
    .fk-loading-icon {
      width: 40px;
      height: 40px;
      stroke: #fff;
    }
    .fk-video-time {
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

    .fk-video-play-pause-action {
      transition: 0.3s;
      opacity: ${(props) => (props.isPlaying ? 0 : 1)};
      cursor: pointer;
      .fk-play-icon,
      .fk-pause-icon {
        width: 40px;
        height: 40px;
      }
    }

    .fk-video-control-actions {
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
      .fk-video-title,
      .fk-video-sub-text {
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
      .fk-video-title {
        margin-bottom: 5px;
      }
      .fk-video-sub-text {
        font-size: 11px;
        font-weight: 500;
      }
      .fk-video-control {
        display: flex;
        width: 100%;
        grid-gap: 10px;
        align-items: center;
        transition: 0.3s;
        opacity: ${(props) => (props.isPlaying ? 0 : 1)};
        .fk-video-viewchange-icon {
          width: 15px;
          height: 15px;
          cursor: pointer;
          .fk-video-expand-icon,
          .fk-video-collapse-icon {
            width: 100%;
            height: 100%;
            fill: #fff;
          }
        }
        .fk-video-seekbar {
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

    &:hover {
      .fk-video-play-pause-action {
        opacity: 1;
      }
      .fk-video-control-actions {
        .fk-video-control {
          opacity: 1;
        }
      }
    }
  }
`;
