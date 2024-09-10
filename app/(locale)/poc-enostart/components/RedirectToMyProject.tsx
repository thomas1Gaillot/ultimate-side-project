import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function RedirectToMyProject({text}: { text?: string }) {
    const router = useRouter()
    return <div>
        {text ?? 'Pas de nouveaux participants dans cette section.'}
        <Button
            className={'px-0 hover:scale-100'}
            onClick={() => router.push('/poc-enostart/my-project')}
            variant={'link'}>{"Réferrez vous à l'onglet 'Mon projet' pour suivre votre avancement"}</Button>
    </div>
}