import {Phase, PhaseEnum} from "@/domain/pomodoro/entities/Timer";

interface PhaseManagementOptions {
    type: Phase;
    setCurrentPhase: (phase: Phase) => void;
    setFormValue: (key: any, value: string) => void;
}

export const managePhase = ({ type, setCurrentPhase, setFormValue }: PhaseManagementOptions) => {
    setCurrentPhase(type);
    let taskValue = "";
    switch (type) {
        case PhaseEnum.enum.work:
            taskValue = "";
            break;
        case PhaseEnum.enum.break:
            taskValue = "5 min break";
            break;
        case PhaseEnum.enum.longBreak:
            taskValue = "15 min break";
            break;
        default:
            taskValue = "";
    }

    setFormValue("task", taskValue);
};
