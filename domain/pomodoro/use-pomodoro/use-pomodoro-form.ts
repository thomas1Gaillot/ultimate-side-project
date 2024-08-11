import {CreateTask, createTaskSchema} from "@/domain/pomodoro/Task";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const usePomodoroForm = (defaultValues: CreateTask, setFormValues: (values: any) => void) => {
    const form = useForm<CreateTask>({
        resolver: zodResolver(createTaskSchema),
        defaultValues,
    });

    form.watch((values) => {
        if (values.task) {
            setFormValues({ task: values.task });
        }
    });

    return form;
};

export default usePomodoroForm;
