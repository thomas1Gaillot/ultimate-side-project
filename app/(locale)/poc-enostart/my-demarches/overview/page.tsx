'use client'

import {ServiceCard} from "./components/ServiceCard"

export default function OverviewDemarches() {
    return <>
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-3xl font-bold tracking-tight mb-4">
                    Mes démarches et prestations
                </h1>
                <p className="text-muted-foreground">
                    Découvrez nos services pour vous accompagner dans vos projets énergétiques
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <ServiceCard
                    title="Mon participant intègre ma PMO"
                    description="Intégrez vos participants à votre PMO en toute simplicité"
                    steps={[
                        "Publication de votre projet",
                        "Aide à la création de votre association PMO",
                        "Edition des bulletins d'adhésion",
                        "Signature des bulletins d'adhésion",
                        "Intégration à votre association PMO"
                    ]}
                    basePrice={15}
                    bulkPrice={240}
                    bulkQuantity={20}
                    modalId="pmo-modal"
                    pricingDescription=" / participant intégré à la PMO"
                />

                <ServiceCard
                    title="Mon participant signe un contrat de vente"
                    description="Facilitez la signature des contrats de vente avec vos participants"
                    steps={[
                        "Publication de votre projet",
                        "Aide à la création d'un prix de vente",
                        "Négociation avec le participant",
                        "Aide à l'édition du contrat de vente",
                        "Signature du contrat de vente",
                        "Finalisation du contrat"
                    ]}
                    basePrice={15}
                    bulkPrice={240}
                    bulkQuantity={20}
                    modalId="vente-modal"
                    pricingDescription=" / contrat signé avec le participant"
                />

                <ServiceCard
                    title="Je signe la convention d'ACC d'Enedis"
                    description="Simplifiez la signature de votre convention ACC avec Enedis"
                    steps={[
                        "Publication de votre projet",
                        "Aide à l'édition des accords de participation",
                        "Signature des accords de participation",
                        "Edition de la déclaration de mise en œuvre",
                        "Edition de la convention d'ACC",
                        "Signature de la convention d'ACC"
                    ]}
                    basePrice={15}
                    bulkPrice={240}
                    bulkQuantity={20}
                    modalId="acc-modal"
                    pricingDescription=" / consommateur intégré à la convention d'ACC"
                />
            </div>
        </div>
    </>
}


