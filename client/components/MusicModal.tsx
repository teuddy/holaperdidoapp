import React from "react";
import MusicPicker from "./MusicPicker";
import MusicPlayer from "./MusicPlayer";

const MusicModal = ({
  musicModalOpen,
  setMusicModalOpen,
}: {
  musicModalOpen: boolean;
  setMusicModalOpen: (value: boolean) => void;
}) => {
  const dismissMusicModal = () => {
    setMusicModalOpen(false);
  };
  return (
    <>
      <div
        className={`${
          musicModalOpen ? "z-20" : "z-[-20] opacity-0"
        } absolute w-full h-full bg-black/10 backdrop-blur-sm top-0 left-0 duration-300 transition-all`}
        onClick={dismissMusicModal}
      />
      <div
        className={`${
          musicModalOpen ? "" : "z-[-20] opacity-0"
        } absolute w-full h-full top-0 left-0 duration-300 transition-all flex justify-center items-center p-4`}
      >
        <div
          className={`z-40 border relative border-indigo-300/30 bg-indigo-500/40 rounded-lg duration-300 transition-all ease-in-out w-full max-w-[20rem] sm:max-w-sm overflow-hidden ${
            musicModalOpen
              ? ""
              : "translate-x-[10rem] translate-y-[10rem] scale-0"
          }`}
        >
          <MusicPicker setMusicModalOpen={setMusicModalOpen} />
          <MusicPlayer />
        </div>
      </div>
    </>
  );
};

export default MusicModal;
