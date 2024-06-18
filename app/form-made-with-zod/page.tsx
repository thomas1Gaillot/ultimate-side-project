"use client"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useToast} from "@/components/ui/use-toast";
import {IconBatteryEco, IconBuildingWindTurbine, IconRipple, IconSolarPanel} from "@tabler/icons-react";
import {useState} from "react";
import {cn} from "@/lib/utils";

const productionTypes = ["Wind", "Solar", "Other", "Hydro"] as const;

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
    minPrice: z.preprocess((val) => Number(val), z.number().min(0)),
    maxPrice: z.preprocess((val) => Number(val), z.number().min(0)),
    productionType: z.enum(productionTypes),
})

function ProfileForm() {
    const {toast} = useToast()
    const [selectedProductionType, setSelectedProductionType] = useState<null | string>(null);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            name: "",
            minPrice: 0,
            maxPrice: 100,
            productionType: productionTypes[0],
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        toast({
            title: "Form has been sent",
            description: JSON.stringify(values),
        })
        console.log(values)
    }

    function handleCardClick(type: "Wind" | "Solar" | "Other" | "Hydro") {
        setSelectedProductionType(type);
        form.setValue("productionType", type);
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl">Let's build your project</CardTitle>
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
                                            <Input placeholder="10" type="number" {...field} />
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
                                            <Input placeholder="18" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormItem>
                            <FormLabel>Your production type</FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {productionTypes.map((type) => (
                                    <ProductionCard
                                        key={type}
                                        type={type}
                                        icon={getIcon(type)}
                                        selected={selectedProductionType === type}
                                        onClick={() => handleCardClick(type)}
                                    />
                                ))}
                            </div>
                        </FormItem>
                        <Button type="submit">Submit and continue</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}


function ProductionCard({type, icon, selected, onClick}: {
    type: "Wind" | "Solar" | "Other" | "Hydro";
    icon: JSX.Element | null;
    selected: boolean;
    onClick: () => void
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

function getIcon(type: string) {
    switch (type) {
        case "Wind":
            return <IconBuildingWindTurbine className={'w-6 h-6 '}/>;
        case "Solar":
            return <IconSolarPanel className={'w-6 h-6 '}/>;
        case "Other":
            return <IconBatteryEco className={'w-6 h-6 '}/>;
        case "Hydro":
            return <IconRipple className={'w-6 h-6 '}/>;
        default:
            return null;
    }
}
