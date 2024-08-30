import {BellIcon, CheckIcon, HourglassIcon} from "lucide-react";

export enum SalesStatus {
    ProposerUnPrix = 'ProposerUnPrix',
    PrixPropose = 'PrixPropose',
    AssocierLeContrat = 'AssocierLeContrat',
    EnvoyerLeContrat = 'EnvoyerLeContrat',
    ContratEnvoye = 'ContratEnvoye',
    ContratSigne = 'ContratSigne',
    Ignore = 'Ignore',
}
const salesStatus = {
    [SalesStatus.ProposerUnPrix]: { name: 'Prix à proposer', icon: BellIcon },
    [SalesStatus.PrixPropose]: { name: 'Prix proposé', icon: HourglassIcon },
    [SalesStatus.AssocierLeContrat]: { name: 'Contrat à associer', icon: BellIcon },
    [SalesStatus.EnvoyerLeContrat]: { name: 'Contrat à envoyer', icon: BellIcon },
    [SalesStatus.ContratEnvoye]: { name: 'Contrat envoyé', icon: HourglassIcon },
    [SalesStatus.ContratSigne]: { name: 'Contrat signé', icon: CheckIcon },
    [SalesStatus.Ignore]: { name: 'Ignoré', icon: CheckIcon },
};
const salesMapper = (status: SalesStatus) => {
    return {
        name: salesStatus[status].name,
        icon: salesStatus[status].icon,
    };
};

export {salesMapper}