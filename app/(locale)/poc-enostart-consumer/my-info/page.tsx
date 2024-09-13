import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Eye, Edit } from "lucide-react"

export default function UserProfile() {
    return (
        <div className="container mx-auto p-6 space-y-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Profil Utilisateur</h1>

            {/* Informations personnelles */}
            <Card className="rounded-lg ">
                <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Adresse e-mail</Label>
                        <Input id="email" value="toto@enogrid.com" readOnly className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Numéro de téléphone</Label>
                        <Input id="phone" value="0123456789" readOnly className="rounded-md bg-gray-50" />
                    </div>
                </CardContent>
            </Card>

            {/* Mes documents */}
            <Card className="rounded-lg ">
                <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Mes documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Documents disponibles (2)</h3>
                        <ul className="space-y-2">
                            {["Statut PMO", "Règlement intérieur"].map((doc) => (
                                <li key={doc} className="flex items-center justify-between">
                                    <span className="flex items-center text-gray-600">
                                        <FileText className="mr-2" size={18} />
                                        {doc}
                                    </span>
                                    <div className="flex space-x-2">
                                        <Button variant="ghost" size="sm" className="hover:bg-gray-200">
                                            <Download size={18} />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="hover:bg-gray-200">
                                            <Eye size={18} />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Documents en attente (3)</h3>
                        <ul className="space-y-2">
                            {[
                                "Bulletin d'adhésion à l'association PMO",
                                "Accords de participation",
                                "Contrat de vente"
                            ].map((doc) => (
                                <li key={doc} className="flex items-center text-gray-600">
                                    <FileText className="mr-2" size={18} />
                                    {doc}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Mon logement */}
            <Card className="rounded-lg ">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center text-xl text-gray-800">
                        Mon logement
                        <Button variant="outline" size="sm" className="rounded-full border-gray-300">
                            <Edit className="mr-2" size={16} />
                            Modifier
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nom</Label>
                        <Input id="name" value="toto toto" readOnly className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">Adresse</Label>
                        <Input id="address" value="14 Avenue Félix Viallet 38000 Grenoble" readOnly className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="consumption" className="text-sm font-medium text-gray-700">Ma consommation annuelle</Label>
                        <Input id="consumption" value="14 500 kWh" readOnly className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="pdl" className="text-sm font-medium text-gray-700">Mon numéro de PDL</Label>
                        <Input id="pdl" value="209 801 510 951 09" readOnly className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="segment" className="text-sm font-medium text-gray-700">Mon segment</Label>
                        <Input id="segment" value="C5" readOnly className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="price" className="text-sm font-medium text-gray-700">{"Mon prix d'achat de l'électricité actuel"}</Label>
                        <Input id="price" value="TRV - 0.145 € HT / kWh" readOnly className="rounded-md bg-gray-50" />
                    </div>
                </CardContent>
            </Card>

            {/* Signataire */}
            <Card className="rounded-lg ">
                <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Signataire</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div className="col-span-2">
                        <RadioGroup defaultValue="particulier" className="flex space-x-6">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="particulier" id="particulier" className="rounded-full"/>
                                <Label htmlFor="particulier" className="text-gray-700">Particulier</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pro" id="pro" className="rounded-full"/>
                                <Label htmlFor="pro" className="text-gray-700">Pro</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <Select>
                            <SelectTrigger className="rounded-md bg-gray-50">
                                <SelectValue placeholder="Civilité" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="m">M.</SelectItem>
                                <SelectItem value="mme">Mme</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Nom</Label>
                        <Input id="lastName" className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Prénom</Label>
                        <Input id="firstName" className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="signatoryEmail" className="text-sm font-medium text-gray-700">Adresse mail</Label>
                        <Input id="signatoryEmail" type="email" className="rounded-md bg-gray-50" />
                    </div>
                    <div>
                        <Label htmlFor="signatoryPhone" className="text-sm font-medium text-gray-700">Numéro de téléphone</Label>
                        <Input id="signatoryPhone" type="tel" className="rounded-md bg-gray-50" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
