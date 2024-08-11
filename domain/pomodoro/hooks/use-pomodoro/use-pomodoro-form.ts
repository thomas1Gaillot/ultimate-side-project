import {useForm, UseFormReturn} from "react-hook-form";
import {CreateTask, createTaskSchema} from "@/domain/pomodoro/entities/Task";
import {zodResolver} from "@hookform/resolvers/zod";

function usePomodoroForm(){
    const form: UseFormReturn<CreateTask> = useForm<CreateTask>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            task: ""
        },
    });
    return form
}

export default usePomodoroForm;
