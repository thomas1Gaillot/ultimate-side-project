import {BentoGridThirdDemo} from "@/components/[locale]/bento-grid-third-demo";
import HeroSection from "@/components/[locale]/hero-section";
import StackInspiration from "@/components/[locale]/stack-inspiration";
export default function OldHomepage() {
    return (
        <>
            <div>
                <div className="container py-24 lg:py-32">
                    <HeroSection/>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 text-center py-24 gap-8">
                    <div className="space-y-2 space-x-2">
                        <h2 className="text-4xl text-gray-800 font-semibold tracking-tighter sm:text-5xl [@media(max-width:480px)]:text-[2rem]">
                            Copy. Paste.</h2>
                        <p className="max-w-[900px] text-gray-500  dark:text-gray-400">
                            {"Amazing copy-and-paste libraries that will make your life easier."}
                        </p>
                    </div>
                    <BentoGridThirdDemo/>
                </div>
                <div className="mt-10 relative max-w-5xl mx-auto">
                    <StackInspiration/>
                </div>
            </div>
        </>
    );
}