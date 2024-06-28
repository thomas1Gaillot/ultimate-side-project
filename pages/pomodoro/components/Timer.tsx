import {useEffect, useState} from "react";

const Timer = ({}) => {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minutes in seconds

    useEffect(() => {
        if (secondsLeft > 0) {
            const timerId = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timerId); // Cleanup interval on component unmount
        }
    }, [secondsLeft]);

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