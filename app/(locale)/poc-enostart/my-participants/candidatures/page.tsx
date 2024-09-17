'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {CheckIcon, MoreHorizontalIcon, MoreVerticalIcon, UserIcon, XIcon} from "lucide-react";
import useParticipants from "@/app/(locale)/poc-enostart/data-refactored/participant/use-participants";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"; // Assuming Checkbox is available in shadcn

export default function Page() {
    const {candidatures, accept, acceptAll, reject} = useParticipants();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    // Toggle selection for a specific participant
    const toggleSelect = (id: string) => {
        setSelectedIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    // Toggle select all
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]); // Deselect all
        } else {
            const allIds = candidatures.map((participant) => participant.id.toString());
            setSelectedIds(allIds); // Select all
        }
        setSelectAll(!selectAll);
    };

    // Pre-integrate all selected participants
    const preIntegrateAll = () => {
        acceptAll(selectedIds.map((id) => Number(id)));
    };

    return (
        <div className={"px-4"}>
            <BannerToMyPerimeter/>
            <div className={" rounded-lg border"}>
                <div className="flex justify-between items-center p-4">
                    <TypographyH4>Candidatures</TypographyH4>
                    <Button
                        variant={'outline'}
                        onClick={preIntegrateAll}
                        disabled={selectedIds.length === 0}
                    >
                        Pré-intégrer ({selectedIds.length})
                        <CheckIcon className={'size-4 ml-1'}/>
                    </Button>
                </div>
                <Separator/>
                <Table className={' p-4'}>
                    <TableHeader  className={"bg-gray-50"}>
                        <TableRow>
                            <TableHead>
                                <Checkbox
                                    checked={selectAll}
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Select All"
                                    className={"ml-2"}
                                />
                            </TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Adresse</TableHead>
                            <TableHead>Périmètre</TableHead>
                            <TableHead>Consommation</TableHead>
                            <TableHead>Segment</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {candidatures.map((participant) => (
                            <TableRow key={participant.id}>
                                <TableCell>
                                    <Checkbox
                                        className={"ml-2"}
                                        checked={selectedIds.includes(participant.id.toString())}
                                        onCheckedChange={() => toggleSelect(participant.id.toString())}
                                        aria-label={`Select ${participant.name}`}
                                    />
                                </TableCell>
                                <TableCell>{participant.name}</TableCell>
                                <TableCell className="text-xs text-gray-600 max-w-[200px]">
                                    {participant.address}
                                </TableCell>
                                <TableCell>{participant.perimeter}</TableCell>
                                <TableCell>{participant.consumption}</TableCell>
                                <TableCell>{participant.segment}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => accept(participant.id)}
                                        size={'sm'}
                                        className={'text-xs text-gray-700 rounded-r-none'}
                                        variant={'outline'}
                                    >
                                        <CheckIcon className={'size-4'}/>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className={"rounded-l-none text-gray-500"} size="sm">
                                                <MoreHorizontalIcon className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => reject(participant.id)}>
                                                <XIcon className="mr-2 h-4 w-4" />
                                                <span>Refuser</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {candidatures.length === 0 && <EmptyUserTable/>}
            </div>
        </div>
    );
}

function BannerToMyPerimeter() {
    const router = useRouter()
    return (
        <div className={" mt-4 mb-4 rounded-lg bg-gray-50 p-4 flex items-center justify-between"}>
            <div className={"flex flex-col text-sm  text-gray-500"}>
                <span className={"font-semibold mr-2 text-primary"}>{"Vérifiez le périmètre ! "}</span>
                <span className={"text-wrap text-xs"}>
                    {"Pensez à vérifier que tous vos candidats sont à l'intérieur de votre périmètre."}
                </span>
            </div>


            <Button size={'sm'} variant={'outline'}
                    onClick={() => router.push('/poc-enostart/my-perimeter')}
            >Vérifier le périmètre</Button>
        </div>
    )
}

function EmptyUserTable() {
    return <div className="max-w-sm w-full min-h-[400px] flex flex-col justify-center mx-auto px-6 py-4">
        <div className="flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
            <UserIcon className={"size-6"}/>
        </div>

        <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
            Pas de nouvelles candidatures
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            {"Les prochaines candidatures arriveront dans ce tableau. Vous serez notifié."}
        </p>
    </div>
}