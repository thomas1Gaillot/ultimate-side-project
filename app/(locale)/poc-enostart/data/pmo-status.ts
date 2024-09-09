import {CheckIcon, HourglassIcon} from "lucide-react";

export enum PmoStatus {
    ChoisirUnPlan='ChoisirUnPlan',
    IdentifierLaPmo = 'IdentifierLaPmo',
    EditerLeBulletin = 'EditerLeBulletin',
    EnvoyerLeBulletin = 'EnvoyerLeBulletin',
    BulletinEnvoye = 'BulletinEnvoye',
    BulletinSigne = 'BulletinSigne',
    Ignore = 'Ignore',
}

const pmoStatus : {
    [key in PmoStatus]: {name: string, icon?: any}
} = {
    [PmoStatus.ChoisirUnPlan]: {name : 'Choisir un plan'},
    [PmoStatus.IdentifierLaPmo]: {name: 'Association à créer (1/5)'},
    [PmoStatus.EditerLeBulletin]: {name: 'Bulletin à éditer (2/5)'},
    [PmoStatus.EnvoyerLeBulletin]: {name: 'Bulletin à envoyer (3/5)'},
    [PmoStatus.BulletinEnvoye]: {name: 'Bulletin envoyé (4/5)', icon: HourglassIcon},
    [PmoStatus.BulletinSigne]: {name: 'Bulletin signé (5/5)', icon: CheckIcon},
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