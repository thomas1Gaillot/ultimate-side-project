import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";

const Timer = ({secondsLeft}: { secondsLeft: number }) => {
    return (
        <div className={"text-7xl font-bold text-gray-900"}>
            {formatSecondsToMmss(secondsLeft)}
        </div>
    );
};

export default Timer;