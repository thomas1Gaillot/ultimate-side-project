import {BellIcon, CheckIcon, HourglassIcon} from "lucide-react";

export enum PmoStatus {
    IdentifierLaPmo = 'IdentifierLaPmo',
    EditerLeBulletin = 'EditerLeBulletin',
    EnvoyerLeBulletin = 'EnvoyerLeBulletin',
    BulletinEnvoye = 'BulletinEnvoye',
    BulletinSigne = 'BulletinSigne',
    Ignore = 'Ignore',
}

const pmoStatus = {
    [PmoStatus.IdentifierLaPmo]: {name: 'Association à créer', icon: BellIcon},
    [PmoStatus.EditerLeBulletin]: {name: 'Bulletin à éditer', icon: BellIcon},
    [PmoStatus.EnvoyerLeBulletin]: {name: 'Bulletin à envoyer', icon: BellIcon},
    [PmoStatus.BulletinEnvoye]: {name: 'Bulletin envoyé', icon: HourglassIcon},
    [PmoStatus.BulletinSigne]: {name: 'Bulletin signé', icon: CheckIcon},
    [PmoStatus.Ignore]: {name: 'Ignoré', icon: CheckIcon},
};

const pmoMapper = (status: PmoStatus) => {
    return {
        name: pmoStatus[status].name,
        icon: pmoStatus[status].icon,
    };

}

export {pmoMapper}