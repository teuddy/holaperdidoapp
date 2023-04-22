import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEventHandler, useState } from "react";
import ChooseAvatar from "../components/ChooseAvatar";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import BigButton from "../components/BigButton";
import { FaLongArrowAltRight } from "react-icons/fa";
import useToast from "../hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { createUser, setUser } from "../store/userSlice";
import { useRouter } from "next/router";
import { RootState } from "../store";
import useGenerateUniqueRandomString from "../hooks/useGenerateUniqueRandomString";

const Home: NextPage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [name, setName] = useState<string>(currentUser?.name || "");
  const handleNameInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };
  const { successToast, errorToast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const generateUID = useGenerateUniqueRandomString();

  const handleGoToChat = () => {
    if (avatarUrl != "" && name != "") {
      if (currentUser) {
        dispatch(setUser({ name, avatarUrl }));
        successToast("Identity changed successfully");
      } else {
        {
          dispatch(createUser({ uid: generateUID(), name, avatarUrl }));
          successToast("Identity created successfully");
        }
      }
      router.push("/");
    } else {
      errorToast("Name should not be empty.");
    }
  };

  return (
    <div className="bg-[#0F172A] w-full h-full min-h-full overflow-y-auto p-4 flex flex-col justify-start items-center">
      <Head>
        <title>HolaPerdido</title>
      </Head>
      <h1 className="text-2xl font-bold mb-8">CHOOSE YOUR IDENTITY</h1>
      <div className="w-full max-w-xl px-4 py-3 text-center sm:text-left">
        <label className="font-medium">Choose an avatar</label>
        <ChooseAvatar
          previousAvatar={currentUser?.avatarUrl}
          setAvatar={setAvatarUrl}
          sprites="miniavs"
        />
      </div>
      <div className="w-full max-w-xl px-4 py-3 mb-6">
        <label className="font-medium">Choose a name</label>
        <div className="mt-2 w-full relative flex justify-start items-center">
          <input
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={handleNameInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGoToChat();
            }}
            className="peer pl-9 bg-transparent appearance-none text-xl outline-none outline-1 autofill:bg-none focus:outline-2 border-none focus:outline-indigo-500 outline-gray-300/30 w-full px-2 h-12 rounded-md duration-100"
            placeholder="John Doe"
          />
          <IoPersonOutline className="absolute text-xl mx-2 peer-focus:hidden duration-100" />
          <IoPerson className="hidden absolute text-xl mx-2 peer-focus:flex peer-focus:text-indigo-500 duration-100" />
        </div>
      </div>
      <BigButton onClick={handleGoToChat}>
        GO TO CHAT <FaLongArrowAltRight className="ml-2" />
      </BigButton>
    </div>
  );
};

export default Home;
