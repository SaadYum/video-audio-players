import React, { useRef, useEffect, useReducer } from "react";

import { LoadingIcon, PauseIcon, PlayIcon } from "../icons";
import { calculateTime } from "../utils";
import { AudioPlayerStyled } from "./style";
import { AudioPlayerProps } from "../types";
import { Seekbar } from "../Seekbar";
import { Visualizer } from "../Visualizer/Visualizer";

const initialState = {
  canPlay: false,
  isWaiting: true,
  isPlaying: false,
  currentTime: 0,
  currentDuration: 0,
};

const reducer = (state, newState) => {
  return { ...state, ...newState };
};

export const AudioPlayer = ({
  url,
  duration = 0,
  autoPlay = false,
  placeholders = {},
}: AudioPlayerProps) => {
  // state
  const [
    { canPlay, isWaiting, isPlaying, currentTime, currentDuration },
    dispatch,
  ] = useReducer(reducer, {
    ...(duration
      ? { ...initialState, currentDuration: duration }
      : initialState),
  });

  // references
  const playerRef: any = useRef<any>({ current: null });

  const { subText = "", title = "" } = placeholders;

  useEffect(() => {
    if (playerRef?.current) {
      playerRef.current.addEventListener("canplay", handleCanPlay);
      playerRef.current.addEventListener("waiting", handleWaiting);
      playerRef.current.addEventListener("playing", handlePlaying);
      playerRef.current.addEventListener("timeupdate", handleTimeUpdate);
      playerRef.current.addEventListener("ended", handleEnd);
    }
    return () => {
      if (playerRef?.current) {
        playerRef.current.removeEventListener("canplay", handleCanPlay);
        playerRef.current.removeEventListener("waiting", handleWaiting);
        playerRef.current.removeEventListener("playing", handlePlaying);
        playerRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        playerRef.current.removeEventListener("ended", handleEnd);
      }
    };
    // eslint-disable-next-line
  }, [playerRef?.current]);

  const handleCanPlay = () => {
    if (playerRef.current && !currentDuration) {
      dispatch({ duration: playerRef.current.duration || 0 });
    }
    dispatch({ canPlay: true, isWaiting: false });
  };

  const handleTimeUpdate = () => {
    if (playerRef.current) {
      dispatch({
        currentTime: playerRef.current.currentTime || 0,
        currentDuration: currentDuration || playerRef.current.duration,
      });
    }
  };

  const handleWaiting = () => dispatch({ canPlay: false, isWaiting: true });
  const handlePlaying = () => dispatch({ canPlay: true, isWaiting: false });
  const handleEnd = () => dispatch({ isPlaying: false, currentTime: 0 });

  const handleSeek = (newTimeStamp) => {
    const player = playerRef.current;
    if (player) {
      player.currentTime = newTimeStamp;
      dispatch({ currentTime: newTimeStamp });
    }
  };

  const handlePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
        return dispatch({ isPlaying: false });
      }
      if (!isPlaying) {
        playerRef.current.play();
        return dispatch({ isPlaying: true });
      }
    }
  };

  return (
    <AudioPlayerStyled className="fk-audio-player-container">
      <audio
        className="fk-audio-player"
        ref={playerRef}
        src={url}
        preload="metadata"
        autoPlay={autoPlay}
        crossOrigin="anonymous"
      ></audio>
      <Visualizer audioRef={playerRef} isPlaying={isPlaying} />
      <div className="fk-audio-overlay">
        {/* clock */}
        <div className="fk-audio-time">
          {calculateTime(currentTime)} /{" "}
          {currentDuration &&
            !isNaN(currentDuration) &&
            calculateTime(currentDuration)}
        </div>

        <div className="fk-audio-play-pause-action" onClick={handlePlay}>
          {isWaiting && isPlaying ? (
            <LoadingIcon />
          ) : isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </div>

        <div className="fk-audio-control-actions">
          <p className="fk-audio-sub-text">{subText}</p>
          <p className="fk-audio-title">{title}</p>

          <div className="fk-audio-control">
            <Seekbar
              timeStamp={currentTime}
              duration={currentDuration}
              onSeek={canPlay ? handleSeek : (_) => null}
            />
          </div>
        </div>
      </div>
    </AudioPlayerStyled>
  );
};
