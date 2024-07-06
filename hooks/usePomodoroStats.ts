import { useMemo } from "react";

export const usePomodoroStats = (tasks: { duration: number }[]) => {
    const { numberOfPomodoro, numberOfShortBreak, numberOfLongBreak } = useMemo(() => {
        let pomodoros = 0;
        let shortBreaks = 0;
        let longBreaks = 0;

        tasks?.forEach((task) => {
            const pomodoroSessions = Math.floor(task.duration / (25 * 60));
            const breaks = pomodoroSessions < 4 ? pomodoroSessions : 3;
            const longBreaksCount = pomodoroSessions >= 4 ? 1 : 0;

            pomodoros += pomodoroSessions;
            shortBreaks += breaks;
            longBreaks += longBreaksCount;
        });

        return {
            numberOfPomodoro: pomodoros,
            numberOfShortBreak: shortBreaks,
            numberOfLongBreak: longBreaks,
        };
    }, [tasks]);

    return {
        numberOfPomodoro,
        numberOfShortBreak,
        numberOfLongBreak,
    };
};
