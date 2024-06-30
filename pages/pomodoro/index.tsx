import PomodoroWidget from "@/pages/pomodoro/PomodoroWidget";
import DotPattern from "@/components/magicui/dot-patterns";

export default function Pomodoro() {
    return (
        <div className={""}>
            <DotPattern width={16} height={16} x={0} y={0} cx={1} cy={1} cr={1}
                        className={"absolute z-[-10] inset-0 h-full w-full fill-neutral-400/40"}/>
            <PomodoroWidget/>
        </div>
    );
}