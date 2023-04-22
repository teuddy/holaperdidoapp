import { useRouter } from "next/router";
import React from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import useSocket from "../hooks/useSocket";
import { Track } from "../interfaces/Track";
import { RootState } from "../store";
import useRoomMusic from "../hooks/useRoomMusic";

const MusicPickerListTile = ({ track }: { track: Track }) => {
  const { socket } = useSocket();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { changeTrack } = useRoomMusic();

  const handlePlayClick = () => {
    socket?.emit("send_play_track", {
      user: currentUser,
      rid: router.query.rid,
      track: track,
    });
  };

  return (
    <button
      onClick={handlePlayClick}
      className="w-full h-20 my-1 p-1 border border-indigo-300/30 border-x-0 border-t-0 flex items-center justify-start overflow-hidden"
    >
      <div className="group h-full w-[6rem] rounded overflow-hidden flex items-center relative">
        <img src={track.thumbnail} alt="thumbnail" className="w-full h-full" />

        <IoPlayCircleOutline className="p-3 text-4xl absolute opacity-0 group-hover:opacity-100 duration-300 h-full w-full bg-black/50 flex justify-center items-center text-white" />
      </div>
      <span className="mx-2" />
      <div className="w-full whitespace-nowrap">
        <h1 className="sm:w-[16rem] w-[12rem] text-left text-gray-200 overflow-hidden text-ellipsis font-medium">
          {track.name}
        </h1>
        <span className="my-1" />
        <p className="sm:w-[16rem] w-[12rem] text-left text-sm overflow-hidden text-ellipsis h-4">
          <span className="mr-2">{track.channel}</span>
        </p>
      </div>
    </button>
  );
};

export default MusicPickerListTile;
