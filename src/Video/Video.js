import React, { useRef, useEffect, useState } from "react";
import useIsMobile from "../isUseMobile/useMobile";

const VideoPlayer = () => {
  const isMobile = useIsMobile();
  const videoSrc = isMobile
    ? "/Css/Res-MyFinder.mp4"
    : "/Css/Background MyFinder 1-2.mp4";

  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit") === null;

    if (videoRef.current) {
      if (isFirstVisit) {
        videoRef.current.muted = false;
        setIsMuted(false);
        localStorage.setItem("isFirstVisit", "false");
      } else {
        videoRef.current.muted = true;
      }

      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
        if (isFirstVisit) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }

    const handleContainerClick = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play();
      }
    };

    const videoContainer = document.querySelector(".video-container");
    if (videoContainer) {
      videoContainer.addEventListener("click", handleContainerClick);
    }

    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener("click", handleContainerClick);
      }
    };
  }, []);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="responsive-video"
      />
    </div>
  );
};

export default VideoPlayer;
