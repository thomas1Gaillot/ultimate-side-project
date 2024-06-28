import {useEffect} from "react";
import {formatTime} from "@/pages/pomodoro/lib/formatTime";

const Timer = ({secondsLeft, setSecondsLeft, resetTimer, setResetTimer}: {
    resetTimer: boolean, setResetTimer: (b: boolean) => void,
    secondsLeft: number, setSecondsLeft: (s: number) => void
}) => {


    useEffect(() => {
        if (resetTimer) {
            setSecondsLeft(25 * 60);
            setResetTimer(false);
        }
    }, [resetTimer, setResetTimer]);


    return (
        <div className={"text-7xl font-bold text-gray-900"}>
            {formatTime(secondsLeft)}
        </div>
    );
};

export default Timer;