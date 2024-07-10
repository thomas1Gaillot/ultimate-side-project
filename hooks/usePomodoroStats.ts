import { useMemo } from "react";

/**
 * Custom hook to return the number of Pomodoro, Short Break, and Long Break sessions
 * @param tasks
 * @returns {numberOfPomodoro, numberOfShortBreak, numberOfLongBreak}
 **/

export const usePomodoroStats = (tasks: { duration: number }[]) => {
    const { numberOfPomodoro, numberOfShortBreak, numberOfLongBreak } = useMemo(() => {
        let pomodoros = 0;
        let shortBreaks = 0;
        let longBreaks = 0;

        tasks?.forEach((task) => {
            const pomodoroSessions = task.duration / (25 * 60);
            const breaks = pomodoroSessions < 4 ? pomodoroSessions : 3;
            const longBreaksCount = pomodoroSessions >= 4 ? 1 : 0;

            pomodoros += pomodoroSessions;
            shortBreaks += breaks;
            longBreaks += longBreaksCount;
        });

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
