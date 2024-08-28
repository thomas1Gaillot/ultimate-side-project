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

export enum PmoStatus {
    IdentifierLaPmo = 'IdentifierLaPmo',
    EnvoyerLeBulletin = 'EnvoyerLeBulletin',
    BulletinEnvoye = 'BulletinEnvoye',
    BulletinSigne = 'BulletinSigne',
    Ignore = 'Ignore',
}
const pmoStatus = {
    [PmoStatus.IdentifierLaPmo]: { name: 'Créer mon association', icon: BellIcon },
    [PmoStatus.EnvoyerLeBulletin]: { name: 'Envoyer le bulletin', icon: BellIcon },
    [PmoStatus.BulletinEnvoye]: { name: 'Bulletin envoyé', icon: HourglassIcon },
    [PmoStatus.BulletinSigne]: { name: 'Bulletin signé', icon: CheckIcon },
    [PmoStatus.Ignore]: { name: 'Ignoré', icon: CheckIcon },
};

const pmoMapper = (status: PmoStatus) => {
    return {
        name: pmoStatus[status].name,
        icon: pmoStatus[status].icon,
    };

}
export enum EnedisStatus {
    EditerLAccord = 'EditerLAccord',
    EnvoyerLAccord = 'EnvoyerLAccord',
    AccordEnvoye = 'AccordEnvoye',
    AccordSigne = 'AccordSigne',
    Ignore = 'Ignore',
}
const enedisStatus = {
    [EnedisStatus.EditerLAccord]: { name: "Editer l'accord", icon: BellIcon },
    [EnedisStatus.EnvoyerLAccord]: { name: "Envoyer l'accord", icon: BellIcon },
    [EnedisStatus.AccordEnvoye]: { name: "Accord envoyé", icon: HourglassIcon },
    [EnedisStatus.AccordSigne]: { name: "Accord signé", icon: CheckIcon },
    [EnedisStatus.Ignore]: { name: 'Ignoré', icon: CheckIcon },
};

const enedisMapper = (status: EnedisStatus) => {
    return {
        name: enedisStatus[status].name,
        icon: enedisStatus[status].icon,
    };

}


export {salesMapper, pmoMapper, enedisMapper}