import {CheckIcon, HourglassIcon} from "lucide-react";

export enum PmoStatus {
    ChoisirUnPlan='ChoisirUnPlan',
    IdentifierLaPmo = 'IdentifierLaPmo',
    EditerLeBulletin = 'EditerLeBulletin',
    EnvoyerLeBulletin = 'EnvoyerLeBulletin',
    BulletinEnvoye = 'BulletinEnvoye',
    BulletinSigne = 'BulletinSigne',
    BulletinEnvoyeProducteur = 'BulletinEnvoyeProducteur',
    BulletinSigneParTous = 'BulletinSigneParTous',
    Ignore = 'Ignore',
}

const pmoStatus : {
    [key in PmoStatus]: {name: string, icon?: any}
} = {
    [PmoStatus.ChoisirUnPlan]: {name : 'Choisir un plan'},
    [PmoStatus.IdentifierLaPmo]: {name: 'Association à créer'},
    [PmoStatus.EditerLeBulletin]: {name: 'Bulletin à éditer'},
    [PmoStatus.EnvoyerLeBulletin]: {name: 'Bulletin à envoyer'},
    [PmoStatus.BulletinEnvoye]: {name: 'Bulletin envoyé', icon: HourglassIcon},
    [PmoStatus.BulletinSigne]: {name: 'Bulletin signé', icon: CheckIcon},
    [PmoStatus.BulletinEnvoyeProducteur]: {name: 'Bulletin envoyé au producteur', icon: HourglassIcon},
    [PmoStatus.BulletinSigneParTous]: {name: 'Bulletin signé par tous', icon: CheckIcon},
    [PmoStatus.Ignore]: {name: 'Ignoré', icon: CheckIcon},
};

const pmoMapper = (status: PmoStatus): {
    name: string;
    icon: any;
} => {
    return {
        name: pmoStatus[status].name,
        icon: pmoStatus[status].icon ?? null,
    };

}

export {pmoMapper}