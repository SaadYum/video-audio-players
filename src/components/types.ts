/// <reference types="react" />

export type FilterProps = any;

export type SeekbarTypes = {
  timeStamp: number;
  duration: number;
  onSeek: (timeStamp: number) => any;
};

export type PlaceHolders = {
  title?: string;
  subText?: string;
};

export type VideoPlayerProps = {
  url: string;
  autoPlay?: boolean;
  duration?: number;
  thumbUrl?: string;
  placeholders?: PlaceHolders;
};

export type AudioPlayerProps = {
  url: string;
  autoPlay?: boolean;
  duration?: number;
  placeholders?: PlaceHolders;
};

export declare const VideoPlayer: (props: VideoPlayerProps) => JSX.Element;

export declare const AudioPlayer: (props: AudioPlayerProps) => JSX.Element;
