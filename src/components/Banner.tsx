import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import Countdown from "react-countdown";
import { setShowBanner, setShowMenu } from "../features/banner/bannerSlice";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Calculate luminance of a color
function getLuminance(r: number, g: number, b: number) {
    // Convert RGB to sRGB
    const [rNorm, gNorm, bNorm] = [r, g, b].map((c) => {
        const normalized = c / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });

    // Calculate luminance
    return 0.2126 * rNorm + 0.7152 * gNorm + 0.0722 * bNorm;
}

export default function Banner() {
    const dispatch = useDispatch();
    const { title, description, link, linkTitle, color, showBanner, datetime } =
        useSelector((state: RootState) => state.banner);

    // Get luminance of the color
    const luminance = getLuminance(
        color.rgb?.r ?? 0,
        color.rgb?.g ?? 0,
        color.rgb?.b ?? 0
    );

    // Determine text color based on luminance
    const textColor = luminance > 0.5 ? "text-black" : "text-white";

    const newTime = new Date(datetime).getTime();

    function isValidLink(link: string): boolean {
        // Regular expression to check if the link starts with http:// or https:// and ends with a domain extension
        const regex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return regex.test(link);
    }

    const renderer = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
    }: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        completed: boolean;
    }) => {
        if (!completed) {
            return (
                <div
                    className={`banner-shadow border-[1px] absolute left-1/2 -translate-x-1/2 translate-y-[300px] bg-yellow-100 p-6 rounded-2xl flex flex-col gap-6 max-w-[800px] w-full ${textColor} justify-between items-center `}
                    style={{ backgroundColor: color.hex }}
                >
                    <div className="flex flex-col gap-4 break-all">
                        <div className="flex gap-2">
                            <span className="text-4xl font-bold break-words">
                                {title}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <span className="break-all">{description}</span>
                        </div>
                    </div>
                    {/* Timer */}
                    <div className="flex gap-2 items-center">
                        <TimeContainer name="Days" time={days} />
                        <span className="text-3xl font-bold">:</span>
                        <TimeContainer name="Hours" time={hours} />
                        <span className="text-3xl font-bold">:</span>
                        <TimeContainer name="Mins" time={minutes} />
                        <span className="text-3xl font-bold">:</span>
                        <TimeContainer name="Secs" time={seconds} />
                    </div>
                    <div className="flex gap-2">
                        {isValidLink(link) && linkTitle ? (
                            <Link
                                to={link}
                                target="_blank"
                                className="font-bold text-xl rounded-full px-4 py-2 bg-white text-black"
                            >
                                {linkTitle}
                            </Link>
                        ) : (
                            <span>{link}</span>
                        )}
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            duration: 0.3,
                            delay: 0.15,
                            damping: 15,
                        }}
                    >
                        <Countdown
                            date={newTime}
                            renderer={renderer}
                            onComplete={() => {
                                dispatch(setShowBanner(false));
                                dispatch(setShowMenu(true));
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function TimeContainer({ name, time }: { name: string; time: number }) {
    return (
        <div className="flex flex-col gap-2 items-center bg-black rounded-xl text-white p-4">
            <span className="uppercase text-xs">{name}</span>
            <span className="text-2xl font-bold">
                {time <= 9 && "0"}
                {time}
            </span>
        </div>
    );
}
