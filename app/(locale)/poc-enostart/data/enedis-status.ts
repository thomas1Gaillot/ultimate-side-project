import {BellIcon, CheckIcon, HourglassIcon} from "lucide-react";




export enum EnedisStatus {
    IdentifierLaPmo = 'IdentifierLaPmo',
    EditerLAccord = 'EditerLAccord',
    EnvoyerLAccord = 'EnvoyerLAccord',
    AccordEnvoye = 'AccordEnvoye',
    AccordSigne = 'AccordSigne',
    Ignore = 'Ignore',
}
const enedisStatus = {
    [EnedisStatus.IdentifierLaPmo]: { name: 'Association à créer', icon: BellIcon },
    [EnedisStatus.EditerLAccord]: { name: "Accord à éditer", icon: BellIcon },
    [EnedisStatus.EnvoyerLAccord]: { name: "Accord à envoyer", icon: BellIcon },
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


export {enedisMapper}