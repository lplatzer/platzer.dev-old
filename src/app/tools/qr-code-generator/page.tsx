'use client';

import * as React from "react";
import {QRCodeSVG} from "qrcode.react";
import {ChevronUpDownIcon, CheckIcon} from "@heroicons/react/16/solid";

import {Button, Field, Input, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions} from "@headlessui/react";


interface FormData {
    wifiName: string;
    wifiPassword: string;
    wifiEncryption: string;
    wifiIsHidden: boolean;
}

const wifiEncryption = [
    {
        encryption: 'WPA'
    },
    {
        encryption: 'WEP',
    },
    {
        encryption: 'None',
    }
];

export default function QrCodeGenerator() {
    const [formData, setFormData] = React.useState<FormData>({ wifiName: '', wifiPassword: '', wifiEncryption: '', wifiIsHidden: false });
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [wifiData, setWifiData] = React.useState('');
    const [selected, setSelected] = React.useState(wifiEncryption[2]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        // @ts-expect-error: not sure how to type this correctly
        const { name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value}));
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        setIsSubmitted(true);
        setWifiData(`WIFI:T:${formData.wifiEncryption};S:${formData.wifiName};P:${formData.wifiPassword};H:${formData.wifiIsHidden};;`);
        console.log(wifiData);
    }
    return(
        <>
            <h2 className="text-2xl py-4">QR Code Generator</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8">
                    <div className="col-span-full">
                        <Field>
                            <Label htmlFor="wifiName" className="block text-sm/6 font-medium text-gray-900">
                                SSID
                            </Label>
                            <Input
                                type="text"
                                id="wifiName"
                                placeholder="SSID"
                                name="wifiName"
                                value={formData.wifiName}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                    </div><div className="col-span-full">
                        <Field>
                            <Label htmlFor="wifiName" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </Label>
                            <Input
                                type="text"
                                id="wifiPassword"
                                placeholder="Password"
                                name="wifiPassword"
                                value={formData.wifiPassword}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400  items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                    </div>
                    <div>
                        {/*TODO: fix full size of button and Select menu being shown over tool menu*/}
                        <Listbox value={selected} onChange={setSelected}>
                            <Label className="block text-sm/6 font-medium text-gray-900">Wifi Encryption</Label>
                            <div className="relative mt-2">
                                <ListboxButton
                                    className="grid cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                        <span className="block truncate">{selected.encryption}</span>
                                    </span>
                                    <ChevronUpDownIcon
                                        aria-hidden="true"
                                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                    />
                                </ListboxButton>
                                <ListboxOptions
                                    transition
                                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-closed:data-leave:opacity-0 data-leave:transition data-leave:duration-100 data-leave:ease-in sm:text-sm"
                                >
                                    {wifiEncryption.map((encryption) => (
                                        <ListboxOption
                                            key={encryption.encryption}
                                            value={encryption}
                                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                                        >
                                            <div className="flex items-center">
                                                <span
                                                    className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                                    {encryption.encryption}
                                                </span>
                                            </div>
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-focus:text-white">
                                                <CheckIcon aria-hidden="true" className="size-5"/>
                                            </span>
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </div>
                        </Listbox>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex h-6 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                                <input
                                    id="wifiIsHidden"
                                    name="wifiIsHidden"
                                    type="checkbox"
                                    aria-describedby="hidden wifi ssid"
                                    checked={formData.wifiIsHidden}
                                    onChange={handleChange}
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                            </div>
                        </div>
                        <div className="text-sm/6">
                            <label htmlFor="comments" className="font-medium text-gray-900">
                                Hidden SSID
                            </label>
                            <p id="comments-description" className="text-gray-500">
                                Whether the Wifi SSID is hidden or not
                            </p>
                        </div>
                    </div>
                    <Button type="submit" className="bg-blue-400 rounded-md hover:bg-blue-500 p-2">
                        Submit
                    </Button>
                </div>
            </form>
            <div className="items-center mt-10">
                {isSubmitted && <QRCodeSVG value={wifiData} size={256} level="H" className="self-center"/>}
            </div>
        </>
    )
}