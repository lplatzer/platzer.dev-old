"use client";
import Link from "next/link";
import {Field, Input, Label} from "@headlessui/react";
import * as React from "react";
// TODO: Export types into types folder
type intermediateVariableType= {
    /*
    *  The name of the intermediate variable
    * */
    name: string;
    /*
    * The value of the intermediate variable
    * */
    value: number;
    /*
    * The unit type of the intermediate variable, if applicable

    * */
    unit: string;
}
export default function WaterCrafter() {
    const [tapWater, setTapWater] = React.useState({
        gh: '',
        kh: '',
        mgCa: '',
        So4Neg: 0,
        NaPos: '',
        Mg2Pos: '',
        Ca2Pos: '',
    });
    const [targetBrewWater, setTargetBrewWater] = React.useState({
        gh: '',
        kh: '',
        mgCa: '',
        So4Neg: undefined,
        NaPos: '',
        MgCa: undefined,
        Mg2Pos: '',
        Ca2Pos: '',
    });
    const [targetConcentrate, setTargetConcentrate] = React.useState({
        volume: 0,
        dose: 0,
    });
    const [resultingRecipe, setResultingRecipe] = React.useState({
        epsomSalt: '',
        CaCl2: '',
        MgCl26H2O: '',
        NaHCO3: '',
        KHCO3: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        // @ts-expect-error: not sure how to type this correctly
        const { gh, value, type, checked} = e.target;
        setTapWater(prev => ({
            ...prev,
            [gh]: value}));
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        setIsSubmitted(true);
        setWifiData(`WIFI:T:${formData.wifiEncryption};S:${formData.wifiName};P:${formData.wifiPassword};H:${formData.wifiIsHidden};;`);
        console.log(wifiData);
    }
    function calculateIntermediateVariables() {
        const vc_vb = {
            value: targetConcentrate.dose/1000,
            unit: null,
        };
        const vt_vc = {
            value: 1/vc_vb.value-1,
            unit: null,
        };
        const tap_ca = {
            value: 0,
            unit: 'mg',
        };
        const tap_mg = {
            value: 0,
            unit: 'mg',
        };

        const c_Epsom = {
            value: molecularData.epsomSalt.molar_weight/molecularData.sulfates.molar_weight*(targetBrewWater.So4Neg/vc_vb.value-vt_vc.value*tapWater.So4Neg),
            unit:'mg/L',
        }
        const c_CaCl2 = {
            value: molecularData.calciumChloride.molar_weight/(1+targetBrewWater.MgCa)*((targetBrewWater.gh/vc_vb.value-vt_vc.value*tapWater.gh)/molecularData.calciumCarbonate.molar_weight-targetBrewWater.MgCa*vt_vc.value*tap_ca.value/molecularData.calcium.molar_weight+vt_vc.value*tap_mg.value/molecularData.magnesium.molar_weight),
            unit:'mg/L'
        }
        const intermediateVariable: intermediateVariableType[] = [
            {
                name: 'VC_VB',

            },
            {
                name: 'VT_VC',

            },
            {
                name: "",
            }
        ]
    }
    return(
        <div>
            <h2>Water for Coffee Crafter</h2>
            <p>This is a web based version of Jonathan Gagne's Water for Coffee Crafter Excel sheet as explained in his blog post, which can be found <Link className="text-blue-700" href="https://coffeeadastra.com/2019/08/23/a-tool-and-videos-for-crafting-custom-brew-water/">here.</Link></p>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3>Tap/Source water</h3>
                        <Field>
                            <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                                GH
                            </Label>
                            <Input
                                type="text"
                                id="tapWaterGh"
                                placeholder="Tap Water GH"
                                name="tapWaterGh"
                                value={tapWater.gh}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                                KH
                            </Label>
                            <Input
                                type="text"
                                id="tapWaterKh"
                                placeholder="Tap Water KH"
                                name="tapWaterKh"
                                value={tapWater.kh}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                                MG/Ca
                            </Label>
                            <Input
                                type="text"
                                id="tapWaterMgCa"
                                placeholder="Tap Water Mg/Ca"
                                name="tapWaterMgCa"
                                value={tapWater.mgCa}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                                [SO4-]
                            </Label>
                            <Input
                                type="text"
                                id="tapWaterSo4neg"
                                placeholder="Tap Water SO4-"
                                name="tapWaterSo4neg"
                                value={tapWater.So4Neg}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                                [Na+]
                            </Label>
                            <Input
                                type="text"
                                id="tapWaterNaPos"
                                placeholder="Tap Water [Na+]"
                                name="tapWaterNaPos"
                                value={tapWater.NaPos}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                                [Mg2+]
                            </Label>
                            <Input
                                type="text"
                                id="tapWatermg2pos"
                                placeholder="Tap Water [Mg2+]"
                                name="tapWatermg2pos"
                                value={tapWater.Mg2Pos}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                                [Ca2+]
                            </Label>
                            <Input
                                type="text"
                                id="tapWaterca2pos"
                                placeholder="Tap Water [Ca2+]"
                                name="tapWaterca2pos"
                                value={tapWater.Ca2Pos}
                                onChange={handleChange}
                                className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </Field>
                    </div>
                    <div>
                    <h3>Target Brew Water</h3>
                    <Field>
                        <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                            GH
                        </Label>
                        <Input
                            type="text"
                            id="targetBrewWaterGh"
                            placeholder="Target Brew Water GH"
                            name="targetBrewWaterGh"
                            value={targetBrewWater.gh}
                            onChange={handleChange}
                            className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                            KH
                        </Label>
                        <Input
                            type="text"
                            id="targetBrewWaterKh"
                            placeholder="Target Brew Water KH"
                            name="targetBrewWaterKh"
                            value={targetBrewWater.kh}
                            onChange={handleChange}
                            className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                            MG/Ca
                        </Label>
                        <Input
                            type="text"
                            id="targetBrewWaterMgCa"
                            placeholder="Target Brew Water Mg/Ca"
                            name="targetBrewWaterMgCa"
                            value={targetBrewWater.mgCa}
                            onChange={handleChange}
                            className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                            [SO4-]
                        </Label>
                        <Input
                            type="text"
                            id="targetBrewWaterSo4neg"
                            placeholder="Target Brew Water SO4-"
                            name="targetBrewWaterSo4neg"
                            value={targetBrewWater.So4Neg}
                            onChange={handleChange}
                            className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                            [Na+]
                        </Label>
                        <Input
                            type="text"
                            id="targetBrewWaterNaPos"
                            placeholder="Target Brew Water [Na+]"
                            name="targetBrTarget BrewewWaterNaPos"
                            value={targetBrewWater.NaPos}
                            onChange={handleChange}
                            className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                            [Mg2+]
                        </Label>
                        <Input
                            type="text"
                            id="targetBrewWatermg2pos"
                            placeholder="Target Brew Water [Mg2+]"
                            name="targetBrewWatermg2pos"
                            value={targetBrewWater.Mg2Pos}
                            onChange={handleChange}
                            className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="GH" className="block text-sm/6 font-medium text-gray-900">
                            [Ca2+]
                        </Label>
                        <Input
                            type="text"
                            id="targetBrewWaterca2pos"
                            placeholder="Target Brew Water [Ca2+]"
                            name="targetBrewWaterca2pos"
                            value={targetBrewWater.Ca2Pos}
                            onChange={handleChange}
                            className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        />
                    </Field>
                    </div>
                </form>
            </div>

            <h3>Target concentrate</h3>
            <div>
                <Field>
                    <Label htmlFor="targetRecipeVolume" className="block text-sm/6 font-medium text-gray-900">
                        Volume
                    </Label>
                    <Input
                        type="text"
                        id="targetRecipeVolume"
                        placeholder="Target Volume"
                        name="targetRecipeVolume"
                        value={targetConcentrate.volume}
                        onChange={handleChange}
                        className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                </Field>
                <Field>
                    <Label htmlFor="targetRecipeDose" className="block text-sm/6 font-medium text-gray-900">
                        Volume
                    </Label>
                    <Input
                        type="text"
                        id="targetRecipeDose"
                        placeholder="Dose"
                        name="targetRecipeDose"
                        value={targetConcentrate.dose}
                        onChange={handleChange}
                        className="block min-w-0 grow py-1.5 pl-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 items-center p-1.5 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                </Field>
            </div>
            <h3>Resulting recipe</h3>
        </div>
    )
}