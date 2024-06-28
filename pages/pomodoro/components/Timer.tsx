import {useEffect, useState} from "react";

const Timer = ({isPlaying, resetTimer, setResetTimer}:{isPlaying : boolean, resetTimer : boolean, setResetTimer:(b:boolean)=>void}) => {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes in seconds

    useEffect(() => {
        if (secondsLeft > 0 && isPlaying) {
            const timerId = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timerId); // Cleanup interval on component unmount
        }
    }, [secondsLeft, isPlaying]);

    useEffect(() => {
        if(resetTimer){
            setSecondsLeft(25 * 60);
            setResetTimer(false);
        }
    }, [resetTimer, setResetTimer]);


    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className={"text-7xl font-bold text-gray-900"}>
            {formatTime(secondsLeft)}
        </div>
    );
};

export default Timer;