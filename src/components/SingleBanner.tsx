import { Link } from "react-router-dom";
import hexRgb from "hex-rgb";

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

export default function SingleBanner({
    title,
    description,
    link,
    linkTitle,
    color,
    datetime,
}: {
    title: string;
    description: string;
    link: string;
    linkTitle: string;
    color: string;
    showBanner: boolean;
    datetime: string;
}) {
    const rgbArr = hexRgb(color, { format: "array" });
    const r = rgbArr[0];
    const g = rgbArr[1];
    const b = rgbArr[2];

    // Get luminance of the color
    const luminance = getLuminance(r ?? 0, g ?? 0, b ?? 0);

    // Determine text color based on luminance
    const textColor = luminance > 0.5 ? "text-black" : "text-white";

    const newTime = new Date(datetime);
    const days = newTime.getDate();
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();
    const seconds = newTime.getSeconds();

    function calculateTimeRemaining(targetTime: string) {
        // Convert the targetTime to a Date object
        const targetDate = new Date(targetTime);
        const now = new Date();

        // Calculate the difference in milliseconds
        const difference = targetDate.getTime() - now.getTime();

        // If the target time is in the past, return 0 for all units
        if (difference < 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        // Convert milliseconds to days, hours, minutes, and seconds
        const totalSeconds = Math.floor(difference / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const days = Math.floor(totalHours / 24);

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    const timee = calculateTimeRemaining(datetime);
    console.log(datetime);
    console.log(timee);

    function isValidLink(link: string): boolean {
        // Regular expression to check if the link starts with http:// or https:// and ends with a domain extension
        const regex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return regex.test(link);
    }

    return (
        <div
            className={`banner-shadow border-[1px] bg-yellow-100 p-6 rounded-2xl flex flex-col gap-6 max-w-[800px] w-full ${textColor} justify-between items-center `}
            style={{ backgroundColor: color }}
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
