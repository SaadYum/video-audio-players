import React, { useEffect, useReducer, useRef } from "react";
import { PauseIcon, PlayIcon, ExpandIcon, LoadingIcon } from "../icons";
import { calculateTime } from "../utils";
import { VideoPlayerStyled } from "./style";

import { VideoPlayerProps } from "../types";
import { Seekbar } from "../Seekbar";

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

export const VideoPlayer = ({
  url,
  duration = 0,
  autoPlay = false,
  thumbUrl,
  placeholders = {},
}: VideoPlayerProps) => {
  // state
  const [
    { canPlay, isWaiting, isPlaying, currentTime, currentDuration },
    dispatch,
  ] = useReducer(reducer, {
    ...(duration
      ? { ...initialState, currentDuration: duration }
      : initialState),
  });
  const { subText = "", title = "" } = placeholders;
  // references
  const playerRef: any = useRef<any>({ current: null });

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

  const handleExpand = () => {
    if (playerRef?.current?.requestFullscreen) {
      playerRef.current.requestFullscreen();
    }
  };

  return (
    <VideoPlayerStyled
      className="fk-video-player-container"
      isPlaying={isPlaying}
    >
      <video
        className="fk-video-player"
        ref={playerRef}
        playsInline
        poster={thumbUrl}
        autoPlay={autoPlay}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support HTML video.
      </video>
      <div className="fk-video-overlay" onClick={handlePlay}>
        {/* clock */}
        <div className="fk-video-time">
          {calculateTime(currentTime)} /
          {currentDuration &&
            !isNaN(currentDuration) &&
            calculateTime(currentDuration)}
        </div>

        <div className="fk-video-play-pause-action">
          {isWaiting && isPlaying ? (
            <LoadingIcon />
          ) : isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </div>

        <div className="fk-video-control-actions">
          <p className="fk-video-sub-text">{subText}</p>
          <p className="fk-video-title">{title}</p>
          <div className="fk-video-control">
            {/* progress bar */}
            <Seekbar
              timeStamp={currentTime}
              duration={currentDuration}
              onSeek={canPlay ? handleSeek : (_) => null}
            />
            <div className="fk-video-viewchange-icon" onClick={handleExpand}>
              <ExpandIcon />
            </div>
          </div>
        </div>
      </div>
    </VideoPlayerStyled>
  );
};
