// components/StackWidget.tsx

import React from 'react';
import {ExternalLink} from "lucide-react";
import {Button} from "@/components/ui/button";
import {techStack} from "@/data/stack";

const StackWidget: React.FC = () => {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-8 my-8"}>
            {techStack.map((tech, index) => (
                <Button
                    variant={'ghost'}
                    key={index}
                    className="group relative h-min flex flex-col items-start p-4 hover:bg-gray-100 rounded-lg"
                    onClick={() => window.open(tech.link, '_blank')}
                >
                    <img src={tech.logo} alt={tech.name} className="w-12 h-12 mb-2 "/>
                    <div className="text-start">
                        <h4 className=" leading-8 font-medium">{tech.name}</h4>
                        <p className="text-gray-600 font-normal text-wrap">{tech.shortDescription}</p>
                    </div>
                    <ExternalLink className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 w-5 h-5 text-gray-800"/>
                </Button>
            ))}
        </div>
    );
};

export default StackWidget;