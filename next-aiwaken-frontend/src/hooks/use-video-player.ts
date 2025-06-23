import { TVideoAction, TVideoState } from "@/types/topic";
import { useReducer, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const initialState: TVideoState = {
  isPlaying: false,
  isMuted: false,
  progress: 0,
  isFullscreen: false,
  isBookmarked: false,
  showNotes: true,
};

function videoPlayerReducer(
  state: TVideoState,
  action: TVideoAction
): TVideoState {
  switch (action.type) {
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_MUTED":
      return { ...state, isMuted: action.payload };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_FULLSCREEN":
      return { ...state, isFullscreen: action.payload };
    case "SET_BOOKMARKED":
      return { ...state, isBookmarked: action.payload };
    case "SET_SHOWNOTES":
      return { ...state, showNotes: action.payload };
    default:
      return state;
  }
}

export const useVideoPlayer = () => {
  const [state, dispatch] = useReducer(videoPlayerReducer, initialState);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReactPlayer>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      dispatch({ type: "SET_FULLSCREEN", payload: true });
    } else {
      document.exitFullscreen();
      dispatch({ type: "SET_FULLSCREEN", payload: false });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      dispatch({
        type: "SET_FULLSCREEN",
        payload: !!document.fullscreenElement,
      });
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleProgress = (stateObj: { played: number }) => {
    dispatch({ type: "SET_PROGRESS", payload: stateObj.played * 100 });
  };

  return {
    ...state,
    setIsPlaying: (value: boolean) =>
      dispatch({ type: "SET_PLAYING", payload: value }),
    setIsMuted: (value: boolean) =>
      dispatch({ type: "SET_MUTED", payload: value }),
    setProgress: (value: number) =>
      dispatch({ type: "SET_PROGRESS", payload: value }),
    setIsFullscreen: (value: boolean) =>
      dispatch({ type: "SET_FULLSCREEN", payload: value }),
    setIsBookmarked: (value: boolean) =>
      dispatch({ type: "SET_BOOKMARKED", payload: value }),
    setShowNotes: (value: boolean) =>
      dispatch({ type: "SET_SHOWNOTES", payload: value }),
    playerContainerRef,
    playerRef,
    toggleFullscreen,
    handleProgress,
  };
};
