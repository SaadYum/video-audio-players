import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AudioPlayer } from "./components/AudioPlayer";
import { VideoPlayer } from "./components";

function App() {
  const videoURL =
    "https://storage.googleapis.com/devcmsxcontent/fankave-test-topic-001/videos/6981211525805527040-original.mp4";
  const thumb =
    "https://storage.googleapis.com/devcmsxcontent/fankave-test-topic-001/images/6981211525805527040.png";
  const videoDuration = 12;
  const audioURL =
    "https://storage.googleapis.com/devcmsxcontent/fankave-test-topic-001/audios/6978745537046532119.m4a";
  const audioDuration = 17;

  return (
    <div className="App">
      <div style={{ width: "20rem", height: "20rem" }}>
        <AudioPlayer
          key={`key-1`}
          placeholders={{
            title: "audio test",
          }}
          url={audioURL}
          duration={audioDuration}
        />
      </div>
      <div style={{ width: "20rem", height: "20rem" }}>
        <VideoPlayer
          key={`key-2`}
          url={videoURL}
          thumbUrl={thumb}
          placeholders={{
            title: "video test",
          }}
          duration={videoDuration}
        />
      </div>
    </div>
  );
}

export default App;
