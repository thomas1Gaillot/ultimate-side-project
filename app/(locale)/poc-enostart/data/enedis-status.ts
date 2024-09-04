import {CheckIcon, HourglassIcon} from "lucide-react";


export enum EnedisStatus {
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
    [EnedisStatus.IdentifierLaPmo]: {name: 'Association à créer (1/5)'},
    [EnedisStatus.EditerLAccord]: {name: "Accord à éditer (2/5)"},
    [EnedisStatus.EnvoyerLAccord]: {name: "Accord à envoyer (3/5)"},
    [EnedisStatus.AccordEnvoye]: {name: "Accord envoyé (4/5)", icon: HourglassIcon},
    [EnedisStatus.AccordSigne]: {name: "Accord signé (5/5)", icon: CheckIcon},
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