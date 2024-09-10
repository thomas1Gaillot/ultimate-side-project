'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {CheckIcon, XIcon} from "lucide-react";
import {useParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {useRouter} from "next/navigation"; // Assuming Checkbox is available in shadcn

export default function Page() {
    const {candidatures, accept, reject} = useParticipants();
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
        selectedIds.forEach((id) => accept(Number(id)));
    };

    return (
        <div className={"px-4"}>
            <div className="flex justify-between items-center mb-4">
                <TypographyH4>Candidatures</TypographyH4>
                <Button
                    onClick={preIntegrateAll}
                    size={'sm'}
                    variant={'secondary'}
                    disabled={selectedIds.length === 0}
                >
                    Pré-intégrer les sélectionnés
                    <CheckIcon className={'size-4 ml-1'} />
                </Button>
            </div>
            <BannerToMyPerimeter/>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                checked={selectAll}
                                onCheckedChange={toggleSelectAll}
                                aria-label="Select All"
                            />
                        </TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Périmètre</TableHead>
                        <TableHead>Consommation</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {candidatures.map((participant) => (
                        <TableRow key={participant.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedIds.includes(participant.id.toString())}
                                    onCheckedChange={() => toggleSelect(participant.id.toString())}
                                    aria-label={`Select ${participant.name}`}
                                />
                            </TableCell>
                            <TableCell>{participant.name}</TableCell>
                            <TableCell>{participant.perimeter}</TableCell>
                            <TableCell>{participant.consumption}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => accept(participant.id)}
                                    size={'sm'}
                                    className={'text-xs text-gray-700'}
                                    variant={'link'}
                                >
                                    Pré-intégrer
                                    <CheckIcon className={'size-4 ml-1'} />
                                </Button>
                                <Button
                                    onClick={() => reject(participant.id)}
                                    size={'sm'}
                                    className={'text-red-500 text-xs'}
                                    variant={'link'}
                                >
                                    Refuser
                                    <XIcon className={'size-4 ml-1'} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function BannerToMyPerimeter() {
    const router = useRouter()
    return (
        <div className={" mt-4 mb-4 rounded-lg bg-gray-50 p-4 flex items-center justify-between"}>
            <div className={"flex text-sm  flex-wrap text-gray-500"}>
                <span className={"font-semibold mr-2"}>{"Vérifiez le périmètre ! "}</span>
                <span className={"text-wrap"}> {"Vérifiez que tous vos candidats sont à l'intérieur de votre périmètre."}</span>
            </div>


            <Button size={'sm'} variant={'outline'}
                    onClick={() => router.push('/poc-enostart/my-perimeter')}
            >Vérifier le périmètre</Button>
        </div>
    )
}