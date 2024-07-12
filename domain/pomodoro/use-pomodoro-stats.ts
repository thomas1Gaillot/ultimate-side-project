import { useMemo } from "react";

/**
 * Custom hook to return the number of Pomodoro, Short Break, and Long Break sessions
 * @param tasks
 * @returns {numberOfPomodoro, numberOfShortBreak, numberOfLongBreak}
 **/

export const usePomodoroStats = (tasks: { duration: number }[]) => {
    const { numberOfPomodoro, numberOfShortBreak, numberOfLongBreak } = useMemo(() => {
        let pomodoros = 0;


        tasks?.forEach((task) => {
            const pomodoroSessions = task.duration / (25 * 60);
            pomodoros += pomodoroSessions;
        });

        const shortBreaks = Math.floor(pomodoros)
        const longBreaks = Math.floor(pomodoros / 4);

        return {
            numberOfPomodoro: Math.floor(pomodoros),
            numberOfShortBreak: Math.floor(shortBreaks),
            numberOfLongBreak: Math.floor(longBreaks),
        };
    }, [tasks]);

    return {
        numberOfPomodoro,
        numberOfShortBreak,
        numberOfLongBreak,
    };
};
