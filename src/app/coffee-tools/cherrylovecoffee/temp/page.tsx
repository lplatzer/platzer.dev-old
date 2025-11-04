'use client';

import {cherrylovecoffee} from "@/app/utils/cherrylovecoffee";
import Image from "next/image";
import roasterLogo from "../../../../../public/next.svg"
import {Button} from "@headlessui/react";
import * as React from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import CuppingScoring from "@/components/cupping-scoring";


export default function CherryLoveCoffee() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [hideContents, setHideContents] = React.useState(true);
    return (
        <div>
            <div className="text-center">
                <h2 className="mt-2 max-w-lg text-2xl font-semibold tracking-tight text-balance text-gray-950">
                    {cherrylovecoffee[0].juli.name} Coffee Box
                </h2>
                <h2 className="text-2xl">
                    Welcome, cherry lovers!
                </h2>
                <p className="font-bold">
                    It&apos;s a great mail day!
                </p>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                    {cherrylovecoffee[0].juli.desc}
                    <br/>
                    <br/>
                    Ready to get started?
                </p>
                <p className="text-xl">
                    A few tips if this is your first cherry love box:
                </p>
                <p className="">
                    Follow along the pages in order.
                    <br/>
                    <br/>
                    The coffee information is toward back of this booklet, so if you prefer a completely blind tasting experience, wait to read about them until instructed to do so for the match game!
                    <br/>
                    Trust your gut, and have fun with it!
                    <br/>
                    <br/>
                    Happy tasting! xoxo, Carly
                </p>
            </div>
            <div>
                <h2>
                    Get to know your coffees
                </h2>
            </div>
            <div>
                <h2>
                    Tasting the coffees
                </h2>

            </div>
            <CuppingScoring title="Coffee 1" />
            {/*TODO: render page dynamically based on coffee box month*/}
            {/*TODO: map over each of the coffees to render info about them*/}
            <Button onClick={() => setModalOpen(true)} type="button" className="bg-blue-400 rounded-md hover:bg-blue-500 p-2">
                Show coffee information
            </Button>
            <Dialog open={modalOpen} onClose={setModalOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div
                                        className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600"/>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            You are about to reveal the information about the coffees
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to show the information about them? You should have tasted
                                                all the coffees blind before looking at the information about them.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => { setModalOpen(false); setHideContents(false)}}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Show
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setModalOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
            <div className="grid grid-rows-4 grid-cols-2">
                {cherrylovecoffee[0].juli.coffees.map(coffeeBox => (
                    <div key={coffeeBox.name} className="mt-6 m-3 border border-2 shadow-md rounded-lg ">
                        <div className={`grid grid-cols-2 m-6 data-state=true ${ hideContents === true ? 'blur-lg' : ''}`}>
                            <div className="border-2 p-4">
                                <div>
                                    <span className=" font-bold">Harvest: </span>
                                    <span>{coffeeBox.harvest}</span>
                                </div>
                                <div>
                                    <span className=" font-bold">Country: </span>
                                    <span>{coffeeBox.country}</span>
                                </div>
                                <div>
                                    <span className=" font-bold">Region: </span>
                                    <span>{coffeeBox.region}</span>
                                </div>
                                <div>
                                    <span className=" font-bold">Variety: </span>
                                    <span>{coffeeBox.variety.join(", ")}</span>
                                </div>
                                <div>
                                    <span className=" font-bold">Process: </span>
                                    <span>{coffeeBox.process}</span>
                                </div>
                            </div>
                            <div className="m-6 self-center">
                                <Image src={roasterLogo} alt="roaster logo image" width={200} height={200}/>
                            </div>
                        </div>
                        <div className={`m-6 text-justify ${ hideContents === true ? 'blur-lg' : ''}`}>
                            <div>
                                <span className="font-bold ">Roaster&apos;s tasting notes: </span>
                            <span>{coffeeBox.roaster_tasting_notes.join(", ")}</span>
                        </div>
                        <div>
                            <span className="font-bold">Roaster: </span>
                            <span>{coffeeBox.roaster}</span>
                        </div>
                        <div>
                            <span className="font-bold">Notes from {coffeeBox.roaster_info_title}: </span>
                            <span>{coffeeBox.roaster_coffee_info}</span>
                        </div>
                        <div>
                            <span className="font-bold">Carly&apos;s taste notes: </span>
                            <span>{coffeeBox.carly_taste_notes.join(", ")}</span>
                        </div>
                        <div>
                            <span className="font-bold">Carly&apos;s notes: </span>
                            <span>{coffeeBox.carly_coffee_info}</span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}