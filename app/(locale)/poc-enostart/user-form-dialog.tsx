import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog"
import {Building2, Home, NotebookPen} from "lucide-react"

export default function Component({variant, buttonText, onSubmit}: {
    variant: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
    buttonText: string,
    onSubmit?: (data: any) => void
}) {
    const [userType, setUserType] = useState<'professionnel' | 'particulier' | null>(null)
    const [formeJuridique, setFormeJuridique] = useState<'SA-SAS-SARL' | 'Association' | 'Copropriété' | null>(null)

    const FormContent = () => (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <Label htmlFor="adresse">{"L'adresse de votre logement ou site"}</Label>
                <Input id="adresse" placeholder="ex : 14 avenue Félix Viallet, 38000 Grenoble"/>
                <p className="text-sm text-muted-foreground mt-1">{"Cherchez votre adresse parmi les résultats."}</p>
            </div>

            <div>
                <Label>Vous êtes un</Label>
                <RadioGroup className="grid grid-cols-2 gap-4 mt-2"
                            onValueChange={(value: any) => setUserType(value as 'professionnel' | 'particulier')}>
                    <Label
                        htmlFor="professionnel"
                        className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary ${
                            userType === 'professionnel' ? 'border-primary' : ''
                        }`}
                    >
                        <RadioGroupItem value="professionnel" id="professionnel" className="sr-only"/>
                        <Building2 className="mb-2 h-6 w-6"/>
                        <span>Je suis un Professionnel</span>
                    </Label>
                    <Label
                        htmlFor="particulier"
                        className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary ${
                            userType === 'particulier' ? 'border-primary' : ''
                        }`}
                    >
                        <RadioGroupItem value="particulier" id="particulier" className="sr-only"/>
                        <Home className="mb-2 h-6 w-6"/>
                        <span>Je suis un Particulier</span>
                    </Label>
                </RadioGroup>
            </div>

            {userType === 'professionnel' && (
                <Card>
                    <CardContent className="space-y-4 pt-4">
                        <div>
                            <Label htmlFor="denomination">Dénomination sociale</Label>
                            <Input id="denomination" placeholder="Entrez la dénomination sociale"/>
                        </div>
                        <div>
                            <Label htmlFor="forme-juridique">Forme juridique</Label>
                            <Select
                                onValueChange={(value) => setFormeJuridique(value as 'SA-SAS-SARL' | 'Association' | 'Copropriété')}>
                                <SelectTrigger id="forme-juridique">
                                    <SelectValue placeholder="Sélectionnez la forme juridique"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SA-SAS-SARL">SA-SAS-SARL</SelectItem>
                                    <SelectItem value="Association">Association</SelectItem>
                                    <SelectItem value="Copropriété">Copropriété</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {formeJuridique === 'SA-SAS-SARL' && (
                            <div>
                                <Label htmlFor="siren">Numéro SIREN</Label>
                                <Input id="siren" placeholder="9 chiffres" maxLength={9}/>
                            </div>
                        )}
                        {formeJuridique === 'Association' && (
                            <div>
                                <Label htmlFor="rna">Numéro RNA</Label>
                                <Input id="rna" placeholder="W + 9 chiffres" maxLength={10}/>
                            </div>
                        )}
                        {formeJuridique === 'Copropriété' && (
                            <div>
                                <Label htmlFor="identification">Numéro identification</Label>
                                <Input id="identification" placeholder="Entrez le numéro d'identification"/>
                            </div>
                        )}
                        <div>
                            <Label htmlFor="siege-social">Adresse siège social</Label>
                            <Input id="siege-social" placeholder="Entrez l'adresse du siège social"/>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="civilite">Civilité</Label>
                            <Select>
                                <SelectTrigger id="civilite">
                                    <SelectValue placeholder="Sélectionnez"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="monsieur">Monsieur</SelectItem>
                                    <SelectItem value="madame">Madame</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="nom">Nom</Label>
                            <Input id="nom" placeholder="Votre nom" defaultValue="Nom par défaut"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="prenom">Prénom</Label>
                            <Input id="prenom" placeholder="Votre prénom" defaultValue="Prénom par défaut"/>
                        </div>
                        <div>
                            <Label htmlFor="email">Adresse mail</Label>
                            <Input id="email" type="email" placeholder="votre@email.com"
                                   defaultValue="default@email.com"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="phone">Numéro de téléphone</Label>
                            <Input id="phone" placeholder="Votre numéro" defaultValue="0123456789"/>
                        </div>
                        {userType === 'particulier' && (
                            <>
                                <div>
                                    <Label htmlFor="date-naissance">Date de naissance</Label>
                                    <Input id="date-naissance" placeholder="jj/mm/aaaa"/>
                                </div>
                                <div>
                                    <Label htmlFor="adresse-personnelle">Adresse personnelle</Label>
                                    <Input id="adresse-personnelle" placeholder="Votre adresse personnelle"/>
                                </div>
                                <div>
                                    <Label htmlFor="lieu-naissance">Lieu de naissance</Label>
                                    <Input id="lieu-naissance" placeholder="Votre lieu de naissance"/>
                                </div>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Button className="w-full" type="submit">
                Je valide les informations
            </Button>
        </form>
    )

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={variant} size={'sm'}>
                    {buttonText}
                    <NotebookPen className={'size-4 ml-2'}/>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Dites nous en un peu plus sur vous !</h1>
                <FormContent/>
            </DialogContent>
        </Dialog>
    )
}
