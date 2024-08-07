"use client"

import * as React from "react"
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons"
import {PopoverProps} from "@radix-ui/react-popover"

import {cn} from "@/lib/utils"


import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Article, presetArticles} from "@/domain/article/Article";

interface PresetSelectorProps extends PopoverProps {
    selectedPreset?: Article ;
    setSelectedPreset: (p: Article) => void;
}

export function PresetSelector({selectedPreset, setSelectedPreset, ...props}: PresetSelectorProps) {
    const [open, setOpen] = React.useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label="Load a preset..."
                    aria-expanded={open}
                    className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
                >
                    {selectedPreset ? selectedPreset.name : "Load a preset..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search article..."/>
                    <CommandList>
                        <CommandEmpty>No article found.</CommandEmpty>
                        <CommandGroup heading="Examples">
                            {presetArticles.map((preset) => (
                                <CommandItem
                                    key={preset.id}
                                    onSelect={() => {
                                        setSelectedPreset(preset)
                                        setOpen(false)
                                    }}
                                >
                                    {preset.name}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedPreset?.id === preset.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}