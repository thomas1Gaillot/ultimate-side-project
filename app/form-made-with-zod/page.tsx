"use client"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod"
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useToast} from "@/components/ui/use-toast";
import {IconBatteryEco, IconBuildingWindTurbine, IconRipple, IconSolarPanel} from "@tabler/icons-react";
import {cn} from "@/lib/utils";
import PaymentToggleButtons from "@/components/[locale]/form-made-with-zod/payment-toggle-buttons";
import {Separator} from "@/components/ui/separator";

const productionTypes = ["Wind", "Solar", "Hydro", "Other"] as const;
const segmentTypes = ["C1", "C2", "C3", "C4", "C5"] as const;
export default function FormMadeWithZod() {
    return (
        <div className="container py-24 lg:py-32">
            {/* Announcement Banner */}
            <div className="flex justify-center">

                <ProfileForm/>
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
    segmentType : z.enum(segmentTypes),
    productionType: z.enum(productionTypes),
});

function ProfileForm() {
    const {toast} = useToast();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            name: "",
            isPriceFree: false,
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
        console.log(values);
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl">{"First, create your production site"}</CardTitle>
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
                        <Controller
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
                        <Controller
                            control={form.control}
                            name="segmentType"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>The segment</FormLabel>
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
                        <Controller
                            control={form.control}
                            name="isPriceFree"
                            render={({field}) => (
                                <PaymentToggleButtons isFree={field.value} onChange={field.onChange}/>
                            )}
                        />
                        {form.watch('isPriceFree') ? (
                            <div className="mt-4">
                                <span className="block text-sm font-medium text-gray-800 dark:text-white">
                                    You are giving all your production to the consumers !
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
