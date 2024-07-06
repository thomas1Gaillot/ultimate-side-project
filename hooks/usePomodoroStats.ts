import { useState } from "react";

export const usePomodoroStats = () => {
    const [numberOfPomodoro, setNumberOfPomodoro] = useState(0);
    const [numberOfShortBreak, setNumberOfShortBreak] = useState(0);
    const [numberOfLongBreak, setNumberOfLongBreak] = useState(0);

    const incrementPomodoro = () => setNumberOfPomodoro((prev) => prev + 1);
    const decrementPomodoro = () => setNumberOfPomodoro((prev) => prev - 1);
    const incrementShortBreak = () => setNumberOfShortBreak((prev) => prev + 1);
    const incrementLongBreak = () => setNumberOfLongBreak((prev) => prev + 1);

    return {
        numberOfPomodoro,
        numberOfShortBreak,
        numberOfLongBreak,
        incrementPomodoro,
        decrementPomodoro,
        incrementShortBreak,
        incrementLongBreak,
    };
};
