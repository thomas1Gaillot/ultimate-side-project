"use client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useToast} from "@/components/hooks/use-toast";
import {IconBatteryEco, IconBuildingWindTurbine, IconRipple, IconSolarPanel} from "@tabler/icons-react";
import {cn} from "@/lib/utils";
import PaymentToggleButtons from "@/components/[locale]/form-made-with-zod/payment-toggle-buttons";
import {Separator} from "@/components/ui/separator";
import OperationalToggleButtons from "@/components/[locale]/form-made-with-zod/operational-toggle-buttons";
import Link from "next/link";
import {badgeVariants} from "@/components/ui/badge";
import {ArrowLeftIcon, BellIcon, InfoIcon, ZapIcon} from "lucide-react";
import {Highlight} from "@/components/acernityui/hero-highlight";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

const productionTypes = ["Wind", "Solar", "Hydro", "Other"] as const;
const segmentTypes = ["C1", "C2", "C3", "C4", "C5"] as const;
export default function FormMadeWithZod() {
    const [isClient, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])
    return (
        <div className="container py-24 lg:py-32">
            {/* Announcement Banner */}
            <div className="flex flex-col items-center gap-8 justify-center">
                <MadeWithZodBadges/>
                {isClient && <ProfileForm/>}
            </div>
        </div>
    );
}

const formSchema = z.object({
    username: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    annualProduction: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
    minPrice: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
    maxPrice: z.preprocess((val) => Number(val), z.number().min(0)).optional(),
    isPriceFree: z.boolean(),
    segmentType: z.enum(segmentTypes, {message: 'Segment is required.'}),
    productionType: z.enum(productionTypes),
    isOperational: z.boolean(),
});

function ProfileForm() {
    const {toast} = useToast();


    const router = useRouter()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            name: "",
            isPriceFree: false,
            isOperational: true,
            productionType: productionTypes[1],
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        toast({
            title: "Form has been sent",
            description: JSON.stringify(values),
        });
    }

    return (
        <Card className="w-full max-w-2xl shadow-none">
            <CardHeader>

                <CardTitle className="text-2xl flex flex-col-reverse gap-2 md:flex-row justify-between">
                    <Highlight >Your production site</Highlight>
                    <Button
                        onClick={() => router.push('/')}
                        className={"w-max mb-4 md:mb-0"}
                        variant={"outline"}><ArrowLeftIcon className={'pr-2'}/> Back to Home </Button>
                </CardTitle>
                <CardDescription>
                    Fill in the below information
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Your username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="toto_g" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Separator/>
                        <FormField
                            control={form.control}
                            name="productionType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Your production type</FormLabel>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {productionTypes.map((type) => (
                                            <ProductionCard
                                                key={type}
                                                type={type}
                                                icon={getIcon(type)}
                                                selected={field.value === type}
                                                onClick={() => field.onChange(type)}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>The production site</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Powerstation 150 kW" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="annualProduction"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Annual production in kWH per year (optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="7 500 kWh per year" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="segmentType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={"flex justify-between items-center gap-4 w-full"}>
                                        The segment
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button type={"button"} variant="ghost" size="icon" className="text-muted-foreground">
                                                    <InfoIcon className={'h-5 w-5'}/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align={'end'} >
                                                <div className="flex flex-col gap-3">
                                                    <p className="text-sm font-semibold text-gray-800">Segment type</p>
                                                    <p className="text-sm font-light text-gray-600">The segment type is
                                                        used to categorize your production site</p>
                                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                        <ZapIcon className="h-5 w-5"/>
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-semibold text-gray-800">C1</p>
                                                            <p className="text-xs font-light text-gray-600">{'Power < 36 kVA'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                        <ZapIcon className="h-5 w-5"/>
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-semibold text-gray-800">C2</p>
                                                            <p className="text-xs font-light text-gray-600">{'Power between 36 kVA and 250 kVA'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                        <ZapIcon className="h-5 w-5"/>
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-semibold text-gray-800">C3</p>
                                                            <p className="text-xs font-light text-gray-600">{'Power > 250 kVA '}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                        <ZapIcon className="h-5 w-5"/>
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-semibold text-gray-800">C4</p>
                                                            <p className="text-xs font-light text-gray-600">{'Power > 250 kVA '}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                        <ZapIcon className="h-5 w-5"/>
                                                        <div className="flex flex-col">
                                                            <p className="text-sm font-semibold text-gray-800">C5</p>
                                                            <p className="text-xs font-light text-gray-600">{'Power > 250 kVA '}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </FormLabel>
                                    <div className="grid grid-cols-5 gap-4">
                                        {segmentTypes.map((type) => (
                                            <SegmentCard
                                                key={type}
                                                type={type}
                                                selected={field.value === type}
                                                onClick={() => field.onChange(type)}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Separator/>
                        <CardTitle className="text-2xl">{"Pricing"}</CardTitle>
                        <FormField
                            control={form.control}
                            name="isPriceFree"
                            render={({field}) => (
                                <PaymentToggleButtons isFree={field.value} onChange={field.onChange}/>
                            )}
                        />
                        {form.watch('isPriceFree') ? (
                            <div className="mt-4">
                                <span className="block text-sm font-medium text-gray-800 dark:text-white">
                                    You are giving all your production to the consumers fo free !
                                </span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="minPrice"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Minimum price</FormLabel>
                                            <FormDescription>
                                                The minimum price must be given in cts per kWh
                                            </FormDescription>
                                            <FormControl>
                                                <Input placeholder="10 cents per kWh" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxPrice"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Maximum price</FormLabel>
                                            <FormDescription>
                                                The maximum price must be given in cts per kWh
                                            </FormDescription>
                                            <FormControl>
                                                <Input placeholder="15 cents per kWh" type="number" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        <Separator/>
                        <CardTitle className="text-2xl">{"Localisation"}</CardTitle>
                        <FormField
                            control={form.control}
                            name="isOperational"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <OperationalToggleButtons isOperational={field.value}
                                                                  onChange={field.onChange}/>
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <Button type="submit">Next step : Project informations</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

function ProductionCard({type, icon, selected, onClick}: {
    type: "Wind" | "Solar" | "Other" | "Hydro";
    icon: JSX.Element | null;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <Card onClick={onClick}
              className={cn("p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer",
                  selected ? "border-2 border-emerald-500" : "")}>
            <div className="flex items-center gap-4">
                {icon}
                <h3 className="text-sm font-semibold">{type}</h3>
            </div>
        </Card>
    );
}

function SegmentCard({type, selected, onClick}: {
    type: "C1" | "C2" | "C3" | "C4" | "C5";
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <Card onClick={onClick}
              className={cn("p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer",
                  selected ? "border-2 border-emerald-500" : "")}>
            <h3 className="text-sm font-semibold">{type}</h3>
        </Card>
    );

}

function getIcon(type: string) {
    switch (type) {
        case "Wind":
            return <IconBuildingWindTurbine suppressHydrationWarning={true} className={'w-6 h-6 '}/>;
        case "Solar":
            return <IconSolarPanel suppressHydrationWarning={true} className={'w-6 h-6 '}/>;
        case "Other":
            return <IconBatteryEco suppressHydrationWarning={true} className={'w-6 h-6 '}/>;
        case "Hydro":
            return <IconRipple suppressHydrationWarning={true} className={'w-6 h-6 '}/>;
        default:
            return null;
    }
}

function MadeWithZodBadges() {
    return (
        <div className={"flex items-center gap-2"}>
            <p className={' text-xs font-light text-gray-500'}>made with</p>
            <Link target={'_blank'} href={'https://zod.dev/'}
                  className={badgeVariants({variant: "outline"})}>zod</Link>
            <Link target={'_blank'} href={'https://ui.shadcn.com'}
                  className={badgeVariants({variant: "outline"})}>shadcn-ui</Link>
            <Link target={'_blank'} href={'https://react-hook-form.com/'}
                  className={badgeVariants({variant: "outline"})}>react-hook-form</Link>
        </div>
    );
}