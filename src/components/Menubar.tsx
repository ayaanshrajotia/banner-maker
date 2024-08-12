import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createBannerApi,
    setBannerColor,
    setDateTime,
    setDetails,
    setShowBanner,
    setShowMenu,
} from "../features/banner/bannerSlice";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { AppDispatch, RootState } from "../app/store";
import { motion } from "framer-motion";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import DateTimePicker from "react-datetime-picker";
import toast from "react-hot-toast";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Menubar() {
    const { showMenu, datetime } = useSelector(
        (state: RootState) => state.banner
    );
    const [bannerDetails, setBannerDetails] = useState({
        title: "asdfasdf",
        description: "asdfadsf",
        linkTitle: "asdfasdf",
        link: "http://www.google.com",
    });
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const [isEmojiPicker, setIsEmojiPicker] = useState(false);
    const [isColorPicker, setIsColorPicker] = useState(false);
    const [color, setColor] = useColor("#6cdaed");
    const [date, setDate] = useState<Value>(new Date());

    useEffect(() => {
        dispatch(setDetails(bannerDetails));
    }, [bannerDetails]);

    useEffect(() => {
        dispatch(setDateTime(date?.toString()));
    }, [date]);

    function isValidLink(link: string): boolean {
        // Regular expression to check if the link starts with http:// or https:// and ends with a domain extension
        const regex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return regex.test(link);
    }

    const handlePreview = async () => {
        if (!bannerDetails.title || !bannerDetails.description) {
            toast.error("Title and Description are required");
            return;
        }
        if (!bannerDetails.linkTitle || !bannerDetails.link) {
            toast.error("Link Title and Link are required");
            return;
        }
        if (!isValidLink(bannerDetails.link)) {
            toast.error("Invalid Link");
            return;
        }

        if (datetime <= new Date().toString()) {
            toast.error("Invalid Date");
            return;
        }

        await dispatch(
            createBannerApi({
                title: bannerDetails.title,
                description: bannerDetails.description,
                linkTitle: bannerDetails.linkTitle,
                link: bannerDetails.link,
                expirationTime: datetime,
                color: color.hex,
                showBanner: true,
            })
        );

        dispatch(setShowBanner(true));
        dispatch(setShowMenu(false));
    };

    return (
        <>
            <motion.div
                animate={{
                    y: !showMenu ? 0 : 400,
                    opacity: !showMenu ? 1 : 0,
                    x: "-50%",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-[60px] cursor-pointer"
                onClick={() => {
                    dispatch(setShowMenu(true));
                    dispatch(setShowBanner(false));
                }}
            >
                <ArrowUpCircleIcon className="h-12 w-12" />
            </motion.div>
            <motion.div
                animate={{
                    y: showMenu ? 0 : 400,
                    opacity: showMenu ? 1 : 0,
                    x: "-50%",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="absolute left-1/2 -translate-x-1/2 bg-white menubar-shadow rounded-xl bottom-[60px] w-fit"
            >
                {/* Menu Bar */}
                <div className="relative flex flex-col p-5 items-center gap-4">
                    {/* Color Picker */}
                    {isColorPicker && (
                        <div className="absolute bottom-0 right-[300px] z-[1000]">
                            <ColorPicker
                                color={color}
                                onChange={(col) => {
                                    setColor(col);
                                    dispatch(setBannerColor({ color: col }));
                                }}
                            />
                        </div>
                    )}
                    {/* Emoji Picker */}
                    <EmojiPicker
                        open={isEmojiPicker}
                        width={400}
                        height={400}
                        // theme={theme as Theme}
                        className="absolute z-[1000]"
                        style={{
                            position: "absolute",
                            bottom: "0px",
                            right: "80px",
                        }}
                        onEmojiClick={(e) => {
                            const curPosition =
                                inputRef.current?.selectionStart;
                            if (
                                curPosition === undefined ||
                                curPosition == null
                            )
                                return;
                            const text = bannerDetails.description;
                            const newText =
                                text.slice(0, curPosition) +
                                e.emoji +
                                text.slice(curPosition);
                            setBannerDetails({
                                ...bannerDetails,
                                description: newText,
                            });
                            setIsEmojiPicker(false);
                        }}
                    />
                    <div className="flex gap-4 max-[1200px]:flex-col">
                        {/* Banner Details */}
                        <div className="flex  flex-col gap-4 items-center w-[600px]">
                            {/* Banner Title */}
                            <input
                                type="text"
                                placeholder="Link Title"
                                className="bg-[#fafafa] py-2.5 px-4 rounded-xl outline-none w-full border-[1px] focus:border-yellow-300"
                                value={bannerDetails.title}
                                onChange={(e) => {
                                    setBannerDetails({
                                        ...bannerDetails,
                                        title: e.target.value,
                                    });
                                }}
                            />
                            {/* Banner Description*/}
                            <textarea
                                ref={inputRef}
                                placeholder="Banner Description"
                                className="bg-[#fafafa] py-2.5 px-4 rounded-xl outline-none border-[1px] resize-none w-full h-full focus:border-yellow-300"
                                value={bannerDetails.description}
                                onChange={(e) => {
                                    setBannerDetails({
                                        ...bannerDetails,
                                        description: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        {/* Banner Link */}
                        <div className="flex flex-col gap-4 w-[550px] rounded-xl max-[1200px]:w-full">
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Link Title"
                                    className="outline-none py-2.5 px-4 rounded-xl bg-[#fafafa] border-[1px] focus:border-yellow-300"
                                    value={bannerDetails.linkTitle}
                                    onChange={(e) => {
                                        setBannerDetails({
                                            ...bannerDetails,
                                            linkTitle: e.target.value,
                                        });
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Banner Link"
                                    className="py-2.5 px-4 rounded-xl outline-none border-[1px] bg-[#fafafa]  focus:border-yellow-300"
                                    value={bannerDetails.link}
                                    onChange={(e) => {
                                        setBannerDetails({
                                            ...bannerDetails,
                                            link: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex gap-4 w-full">
                                <div className="flex gap-4 justify-between flex-grow items-center bg-[#fafafa] p-2 pl-4 rounded-xl border-[1px]">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="bg-red-100 w-6 h-6 rounded-full cursor-pointer border-[1px]"
                                            style={{
                                                backgroundColor: color.hex,
                                            }}
                                            onClick={() =>
                                                setIsColorPicker(
                                                    (prev) => !prev
                                                )
                                            }
                                        ></div>
                                        <FaceSmileIcon
                                            className="w-6 h-6 cursor-pointer stroke-[#565759] dark:stroke-college-dark-white-2"
                                            onClick={() =>
                                                setIsEmojiPicker(
                                                    (prev) => !prev
                                                )
                                            }
                                        />
                                    </div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="sr-only peer"
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                {/* <Timer /> */}
                                <DateTimePicker
                                    onChange={setDate}
                                    value={date}
                                    className={
                                        "bg-[#fafafa] rounded-xl border-[1px] px-2.5"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {/* Preview Button */}
                    <button
                        className="bg-[#51DE7C] text-white uppercase font-semibold px-3 rounded-xl cursor-pointer w-full h-10"
                        onClick={handlePreview}
                    >
                        Preview
                    </button>
                </div>
            </motion.div>
        </>
    );
}
