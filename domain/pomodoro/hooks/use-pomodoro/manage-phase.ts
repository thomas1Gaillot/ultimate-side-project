interface PhaseManagementOptions {
    type: string;
    setCurrentPhase: (phase: string) => void;
    setFormValue: (key: string, value: string) => void;
}

export const managePhase = ({ type, setCurrentPhase, setFormValue }: PhaseManagementOptions) => {
    setCurrentPhase(type);

    let taskValue = "";
    switch (type) {
        case 'work':
            taskValue = "new task";
            break;
        case 'break':
            taskValue = "5 min break";
            break;
        case 'longBreak':
            taskValue = "15 min break";
            break;
        default:
            taskValue = "";
    }

    setFormValue("task", taskValue);
};
