"use client";

// import Link from "next/link";
// import { useSelectedLayoutSegment} from "next/navigation";
// import {coffeeToolItems, generalTools, items} from "@/app/utils/nav";
// import { VscGithubInverted } from "react-icons/vsc";
// import {Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverGroup, PopoverButton, PopoverPanel} from "@headlessui/react";
// import {ChevronDownIcon} from "@heroicons/react/16/solid";

import * as React from 'react';
import {
    CloseButton,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,

} from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import {navigation as newNav } from "@/app/utils/nav";
import Link from "next/link";
import {VscGithubInverted} from "react-icons/vsc";
import {ChevronDownIcon} from "@heroicons/react/16/solid";
import {usePathname} from "next/navigation";

export default function Navigation() {
    const [/*open*/, setOpen] = React.useState(false);
    const activeSegment = usePathname();
    console.log(activeSegment);
    return (
        <header className="relative bg-white">
            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                    <div className="flex h-16 items-center">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                        >
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6"/>
                        </button>

                        {/* Logo */}
                        {/*<div className="ml-4 flex lg:ml-0">*/}
                        {/*    <a href="/">*/}
                        {/*        <span className="sr-only">Your Company</span>*/}
                        {/*        <img*/}
                        {/*            alt=""*/}
                        {/*            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"*/}
                        {/*            className="h-8 w-auto"*/}
                        {/*        />*/}
                        {/*    </a>*/}
                        {/*</div>*/}

                        {/* Flyout menus */}
                        <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                {newNav.pages.map((page) => (
                                    //             {/*            className={`mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 ${activeSegment === item.activeSegment ? 'text-primary text- bg-gray-100' : ''}`}*/}

                                    <Link
                                        key={page.name}
                                        href={page.href}
                                        className={`flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 ${activeSegment === page.activeSegment ? 'text-primary border-b-2 border-transparent border-gray-300' : ''}`}
                                    >
                                        {page.name}
                                    </Link>
                                ))}
                                <Popover className="flex">
                                    <div className="relative flex">
                                        <PopoverButton
                                            className={`relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600 ${activeSegment.includes('/tools') ? 'text-primary border-b-2 border-transparent border-gray-300' : ''}`}>
                                            Tools
                                            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600" />
                                        </PopoverButton>
                                    </div>

                                    <PopoverPanel
                                        transition={true}
                                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                        <div aria-hidden="true"
                                             className="absolute inset-0 top-1/2 bg-white shadow"/>
                                        <div className="relative bg-white">
                                            <div className="mx-auto max-w-7xl">
                                                {/*todo: Refactor into .map function for types of tools.*/}
                                                <div className="grid grid-cols-2 grid-rows-2 pt-8">
                                                    <div className="">
                                                        <CloseButton as={Link} href="/coffee-tools" className="text-2xl"
                                                        >
                                                            Coffee Tools
                                                        </CloseButton>
                                                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-8">
                                                            <div className="col-start-1 grid grid-cols-2 gap-x-8">
                                                                {newNav.coffeeTools.map((tool) => (
                                                                    <div key={tool.name}
                                                                         className="group relative text-base sm:text-sm">
                                                                        <CloseButton as={Link} href={tool.href}
                                                                                     className="block font-medium text-gray-900">
                                                                                <span aria-hidden="true"
                                                                                      className="absolute inset-0 z-10"/>
                                                                            {tool.name}
                                                                        </CloseButton>
                                                                        <p aria-hidden="true" className="mt-1">
                                                                            {tool.description}
                                                                        </p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <CloseButton as={Link} href="/tools" className="text-2xl"
                                                        >
                                                            General Tools
                                                        </CloseButton>
                                                        <div
                                                            className="grid grid-cols-2 gap-x-8 gap-y-10 py-8">
                                                            {newNav.tools.map((tool) => (
                                                                <div key={tool.name}
                                                                     className="group relative text-base sm:text-sm px-4">
                                                                    <CloseButton as={Link} href={tool.href}
                                                                                 className="mt-6 block font-medium text-gray-900">
                                                                            <span aria-hidden="true"
                                                                                  className="absolute inset-0 z-10"/>
                                                                        {tool.name}
                                                                    </CloseButton>
                                                                    <p aria-hidden="true" className="mt-1">
                                                                        {tool.description}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </div>
                        </PopoverGroup>
                        <div className="ml-auto flex items-center">
                            {/*<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">*/}
                            {/*    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">*/}
                            {/*        Sign in*/}
                            {/*    </a>*/}
                            {/*    <span aria-hidden="true" className="h-6 w-px bg-gray-200" />*/}
                            {/*    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">*/}
                            {/*        Create account*/}
                            {/*    </a>*/}
                            {/*</div>*/}

                            {/* Search */}
                            {/*<div className="flex lg:ml-6">*/}
                            {/*    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">*/}
                            {/*        <span className="sr-only">Search</span>*/}
                            {/*        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />*/}
                            {/*    </a>*/}
                            {/*</div>*/}

                            {/* Socials */}
                            <div className="ml-4 flow-root lg:ml-6">
                                <a href="https://github.com/lplatzer" className="group -m-2 flex items-center p-2">
                                    <VscGithubInverted
                                        aria-hidden="true"
                                        className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
    // <header className="min-h-full">
    //     <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 ">
    //         <div className="border-b border-gray-200">
    //             <PopoverGroup
    //                 className="flex items-center text-sm/6 font-semibold text-gray-900 lg:self-stretch lg:ml-8">
    //                 <div className="flex h-full space-x-8">
    //                     <Popover className="flex">
        //                         <PopoverButton
        //                             className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
        //                             {items[2].title}
        //                             <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400"/>
        //                         </PopoverButton>
        //
        //                         <PopoverPanel
        //                             transition
        //                             className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        //                         >
        //                             <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow"/>
        //                             <div className="relative bg-white"></div>
        //                             <div className="mx-auto max-w-7xl px-8">
        //                                 <div className="grid col-start-2 grid-cols-2 ">
        //                                     <div>
        //                                         {coffeeToolItems.map((item) => (
        //                                             <div
        //                                                 key={item.title}
    //                                                 className="group relative flex items-center gap-x-6 rounmded-lg p-4 text-sm/6 hover:bg-gray-50"
    //                                             >
    //                                                 <div className="flex-auto">
    //                                                     <Link href={item.href}
    //                                                           className="block font-semibold text-gray-900">
    //                                                         {item.title}
    //                                                         <span className="absolute inset-0"/>
    //                                                     </Link>
    //                                                     <p className="mt-1 text-gray-600">{item.description}</p>
    //                                                 </div>
    //                                             </div>
    //                                         ))}
    //                                     </div>
    //                                     <div className="divide-x divide-gray-900/5">
    //                                         {generalTools.map((item) => (
    //                                             <Link
    //                                                 key={item.title}
    //                                                 href={item.href}
    //                                                 className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
    //                                             >
    //                                                 {item.title}
    //                                             </Link>
    //                                         ))}
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </PopoverPanel>
    //                     </Popover>
    //                 </div>
    //             </PopoverGroup>
    //             {/*Mobile menu styling*/}
    //             {/*<div className="spacey-y-2 py-6">*/}
    //             {/*    <Disclosure as="div" className="-mx-3">*/}
    //             {/*        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">*/}
    //             {/*            Tools*/}
    //             {/*            <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />*/}
    //             {/*        </DisclosureButton>*/}
    //             {/*        <DisclosurePanel className="mt-2 space-y-2">*/}
    //             {/*            {[...coffeeToolItems, ...generalTools].map((item) => (*/}
    //             {/*                <DisclosureButton*/}
    //             {/*                key={item.title}*/}
    //             {/*                as={Link}*/}
    //             {/*                href={item.href}*/}
    //             {/*                className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray:50"*/}
    //             {/*                >*/}
    //             {/*                    {item.title}*/}
    //             {/*                </DisclosureButton>*/}
    //             {/*            ))}*/}
    //             {/*        </DisclosurePanel>*/}
    //             {/*    </Disclosure>*/}
    //             {/*</div>*/}
    //             {/*<div className="flex lg:flex-1 border-b">*/}
    //             {/*    {items.map((item) => (*/}
    //             {/*        <Link*/}
    //             {/*            key={item.id}*/}
    //             {/*            href={item.href}*/}
    //             {/*            className={`mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 ${activeSegment === item.activeSegment ? 'text-primary text- bg-gray-100' : ''}`}*/}
    //             {/*        >*/}
    //             {/*            {item.title}*/}
    //             {/*        </Link>*/}
    //             {/*    ))}*/}
    //             {/*    <div className="right-40 absolute">*/}
    //             {/*        <a href="https://github.com/lplatzer" className="">*/}
    //             {/*            <VscGithubInverted size="25"/>*/}
    //             {/*        </a>*/}
    //             {/*    </div>*/}
    //             {/*</div>*/}
    //         </div>
    //     </nav>
    // </header>
}