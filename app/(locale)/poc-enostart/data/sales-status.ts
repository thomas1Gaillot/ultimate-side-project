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
    [SalesStatus.ProposerUnPrix]: {name: ' Prix à proposer (1/6)'},
    [SalesStatus.PrixPropose]: {name: 'Prix proposé (2/6)', icon: HourglassIcon},
    [SalesStatus.AssocierLeContrat]: {name: 'Contrat à associer (3/6)'},
    [SalesStatus.EnvoyerLeContrat]: {name: 'Contrat à envoyer (4/6)'},
    [SalesStatus.ContratEnvoye]: {name: 'Contrat envoyé (5/6)', icon: HourglassIcon},
    [SalesStatus.ContratSigne]: {name: 'Contrat signé (6/6)', icon: CheckIcon},
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