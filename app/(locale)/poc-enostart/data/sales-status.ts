import {CheckIcon, HourglassIcon, LucideProps} from "lucide-react";
import {ForwardRefExoticComponent, RefAttributes} from "react";

export enum SalesStatus {
    ChoisirUnPlan = 'ChoisirUnPlan',
    ProposerUnPrix = 'ProposerUnPrix',
    PrixPropose = 'PrixPropose',
    AssocierLeContrat = 'AssocierLeContrat',
    EnvoyerLeContrat = 'EnvoyerLeContrat',
    ContratEnvoye = 'ContratEnvoye',
    ContratSigne = 'ContratSigne',
    Ignore = 'Ignore',
}

const salesStatus: {
    [key in SalesStatus]: {
        name: string,
        icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    }
} = {
    [SalesStatus.ChoisirUnPlan]: {name: 'Choisir un plan'},
    [SalesStatus.ProposerUnPrix]: {name: ' Prix à proposer '},
    [SalesStatus.PrixPropose]: {name: 'Prix proposé', icon: HourglassIcon},
    [SalesStatus.AssocierLeContrat]: {name: 'Contrat à associer'},
    [SalesStatus.EnvoyerLeContrat]: {name: 'Contrat à envoyer'},
    [SalesStatus.ContratEnvoye]: {name: 'Contrat envoyé', icon: HourglassIcon},
    [SalesStatus.ContratSigne]: {name: 'Contrat signé', icon: CheckIcon},
    [SalesStatus.Ignore]: {name: 'Ignoré', icon: CheckIcon},
};
const salesMapper = (status: SalesStatus): {
    name: string;
    icon: any;

} => {
    return {
        name: salesStatus[status].name,
        icon: salesStatus[status].icon ?? null,
    };
};

export {salesMapper}