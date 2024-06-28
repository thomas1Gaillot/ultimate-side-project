import {TypographyBlockquote} from "@/components/ui/typography";
import {PauseIcon, PlayIcon, Undo2} from "lucide-react";
import Image from "next/image";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import Timer from "@/pages/pomodoro/components/Timer";
import PomodoroStats from "@/pages/pomodoro/components/PomodoroStats";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/hooks/use-toast";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

const FormSchema = z.object({
    task: z.string().min(2, {
        message: "Task is required.",
    }),
})


export default function Pomodoro() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [numberOfPomodoro, setNumberOfPomodoro] = useState(0)
    const [numberOfShortBreak, setNumberOfShortBreak] = useState(0)
    const [numberOfLongBreak, setNumberOfLongBreak] = useState(0)
    const [resetTimer, setResetTimer] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            task: "",
        },
    })

    function onSubmit() {
        setIsPlaying(prev => !prev)
    }


    const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setResetTimer(true); // Change the reset key to trigger the timer reset
        setIsPlaying(false);
    };

    return (
        <div className={"w-full h-full flex flex-col items-center justify-center"}>
            <Card className={'p-4 py-2 flex flex-col gap-4'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
                        <FormField
                            control={form.control}
                            name="task"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className={"flex items-center gap-2"}>
                                            <Image src={'/tomato.svg'} alt={'tomato'} width={50} height={50}
                                                   className={'h-5 w-5 '}/>
                                            <Input className={"border-none bg-gray-50 "} placeholder="Add a task"  {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Timer isPlaying={isPlaying} resetTimer={resetTimer} setResetTimer={setResetTimer}/>
                        <div className={"flex w-full justify-between items-center gap-4 md:gap-16"}>
                            <PomodoroStats pomodoro={numberOfPomodoro} shortBreak={numberOfShortBreak}
                                           longBreak={numberOfLongBreak}/>
                            <div className={"flex gap-2 items-center "}>
                                <Button onClick={() => submit} variant={'default'} className={'px-6'}>
                                    {isPlaying ? <PauseIcon size={24} className={"cursor-pointer text-gray-50 "}/>
                                        : <PlayIcon size={24} className={"cursor-pointer text-gray-50 "}/>}
                                </Button>
                                <Button  onClick={reset} variant={'secondary'} className={'px-2'}>
                                    <Undo2 size={24} className={"cursor-pointer text-gray-700 "}/>
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>

            </Card>
        </div>
    );
}