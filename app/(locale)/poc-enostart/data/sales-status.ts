import {BellIcon, CheckIcon, HourglassIcon} from "lucide-react";

export enum SalesStatus {
    ProposerUnPrix = 'ProposerUnPrix',
    PrixPropose = 'PrixPropose',
    EditerLeContrat = 'EditerLeContrat',
    EnvoyerLeContrat = 'EnvoyerLeContrat',
    ContratEnvoye = 'ContratEnvoye',
    ContratSigne = 'ContratSigne',
    Ignore = 'Ignore',
}
const salesStatus = {
    [SalesStatus.ProposerUnPrix]: { name: 'Proposer un prix', icon: BellIcon },
    [SalesStatus.PrixPropose]: { name: 'Prix proposé', icon: HourglassIcon },
    [SalesStatus.EditerLeContrat]: { name: 'Editer le contrat', icon: BellIcon },
    [SalesStatus.EnvoyerLeContrat]: { name: 'Envoyer le contrat', icon: BellIcon },
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