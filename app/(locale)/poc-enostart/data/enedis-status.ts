import {CheckIcon, HourglassIcon} from "lucide-react";


export enum EnedisStatus {
    ChoisirUnPlan='ChoisirUnPlan',
    IdentifierLaPmo = 'IdentifierLaPmo',
    EditerLAccord = 'EditerLAccord',
    EnvoyerLAccord = 'EnvoyerLAccord',
    AccordEnvoye = 'AccordEnvoye',
    AccordSigne = 'AccordSigne',
    Ignore = 'Ignore',
}

const enedisStatus : {
    [key in EnedisStatus]: {name: string, icon?: any}

} = {
    [EnedisStatus.ChoisirUnPlan]:{name : 'Choisir un plan'},
    [EnedisStatus.IdentifierLaPmo]: {name: 'Association à créer'},
    [EnedisStatus.EditerLAccord]: {name: "Accord à éditer"},
    [EnedisStatus.EnvoyerLAccord]: {name: "Accord à envoyer"},
    [EnedisStatus.AccordEnvoye]: {name: "Accord envoyé", icon: HourglassIcon},
    [EnedisStatus.AccordSigne]: {name: "Accord signé", icon: CheckIcon},
    [EnedisStatus.Ignore]: {name: 'Ignoré', icon: CheckIcon},
};

const enedisMapper = (status: EnedisStatus) : {
    name: string
    icon: any
} => {
    return {
        name: enedisStatus[status].name,
        icon: enedisStatus[status].icon ?? null,
    };

}


export {enedisMapper}