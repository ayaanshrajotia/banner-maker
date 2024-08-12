import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTime } from "../features/banner/bannerSlice";

export default function Timer() {
    const [time, setT] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const dispatch = useDispatch();

    if (time.seconds >= 60) {
        setT({
            ...time,
            seconds: 0,
        });
    }

    if (time.minutes >= 60) {
        setT({
            ...time,
            minutes: 0,
        });
    }

    if (time.hours >= 24) {
        setT({
            ...time,
            hours: 0,
        });
    }

    if (time.minutes < 0) {
        setT({
            ...time,
            minutes: 59,
        });
    }

    if (time.hours < 0) {
        setT({
            ...time,
            hours: 23,
        });
    }

    if (time.seconds < 0) {
        setT({
            ...time,
            seconds: 59,
        });
    }

    useEffect(() => {
        dispatch(setTime(time));
    }, [time, dispatch]);

    return (
        <div className="flex items-center gap-2 self-stretch">
            <div className="bg-[#fafafa] h-full rounded-xl p-3 flex flex-col items-center">
                <ChevronUpIcon
                    className="w-8 h-8 cursor-pointer text-[#9d9d9d]"
                    onClick={() =>
                        setT({
                            ...time,
                            hours: time.hours + 1,
                        })
                    }
                />
                <span className="text-4xl font-bold">
                    {time.hours < 10 && "0"}
                    {time.hours}
                </span>
                <ChevronDownIcon
                    className="w-8 h-8 cursor-pointer text-[#9d9d9d]"
                    onClick={() =>
                        setT({
                            ...time,
                            hours: time.hours - 1,
                        })
                    }
                />
                <span className="uppercase text-xs text-[#9d9d9d] font-semibold">
                    hour
                </span>
            </div>
            <span className="text-3xl">:</span>
            <div className="bg-[#fafafa] h-full rounded-xl p-3 flex flex-col items-center">
                <ChevronUpIcon
                    className="w-8 h-8 cursor-pointer text-[#9d9d9d]"
                    onClick={() =>
                        setT({
                            ...time,
                            minutes: time.minutes + 1,
                        })
                    }
                />
                <span className="text-4xl font-bold">
                    {time.minutes < 10 && "0"}
                    {time.minutes}
                </span>
                <ChevronDownIcon
                    className="w-8 h-8 cursor-pointer text-[#9d9d9d]"
                    onClick={() =>
                        setT({
                            ...time,
                            minutes: time.minutes - 1,
                        })
                    }
                />
                <span className="uppercase text-xs text-[#9d9d9d] font-semibold">
                    min
                </span>
            </div>
            <span className="text-3xl">:</span>
            <div className="bg-[#fafafa] h-full rounded-xl p-3 flex flex-col items-center">
                <ChevronUpIcon
                    className="w-8 h-8 cursor-pointer text-[#9d9d9d]"
                    onClick={() =>
                        setT({
                            ...time,
                            seconds: time.seconds + 1,
                        })
                    }
                />
                <span className="text-4xl font-bold">
                    {" "}
                    {time.seconds < 10 && "0"}
                    {time.seconds}
                </span>
                <ChevronDownIcon
                    className="w-8 h-8 cursor-pointer text-[#9d9d9d]"
                    onClick={() =>
                        setT({
                            ...time,
                            seconds:
                                time.seconds > 0
                                    ? time.seconds - 1
                                    : time.seconds,
                        })
                    }
                />
                <span className="uppercase text-xs text-[#9d9d9d] font-semibold">
                    sec
                </span>
            </div>
        </div>
    );
}
