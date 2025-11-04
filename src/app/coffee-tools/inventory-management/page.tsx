"use client";

import * as React from 'react';
import {AgGridReact} from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import {cherrylovecoffee} from "@/app/utils/cherrylovecoffee";
import {AviaryCoffeeData, ElbgoldCoffeeData} from "@/app/utils/coffeeData";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {CoffeeData} from "@/app/utils/defaults";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function InventoryManagement() {
    console.log(CoffeeData());
    const router = useRouter();
    const [elbgoldRowData, setElbgoldRowData] = React.useState(ElbgoldCoffeeData);
    const [elbgoldColDefs, setElbgoldColDefs] = React.useState([
        {
            field: "name",
        },
        {
            field: "origin.country",
        },
        {
            field: "origin.detail",
        },
        {
            field: "producer",
        },
        {
            field: "roaster",
        },
        {
            field: "variety",
        }
    /*

            renderCell: (params) => (
            <Link href={`/coffee-recipes/elbgold/${params.value.split(":").pop().replace(' ', '-').toLowerCase()}`}>{params.value}</Link>
        )
     */
    ]);

    const [aviaryRowData, setAviaryRowData] = React.useState(AviaryCoffeeData);
    const [aviaryColDefs, setAviaryColDefs] = React.useState([
        {
            field: "name",
        },
        {
            field: "origin.country",
        },
        {
            field: "origin.detail",
        },
        {
            field: "producer",
        },
        {
            field: "roaster",
        },
        {
            field: "variety",
        }
    /*

            renderCell: (params) => (
            <Link href={`/coffee-recipes/elbgold/${params.value.split(":").pop().replace(' ', '-').toLowerCase()}`}>{params.value}</Link>
        )
     */
    ]);
    return(
        <div>
            <h3 className="text-base/7 font-semibold text-gray-900">
                Elbgold Coffees (Last Updated: Dec 2023)
            </h3>
            <div className="h-100 z-20">
                <AgGridReact
                    rowData={elbgoldRowData}
                    columnDefs={elbgoldColDefs}
                    onRowClicked={(e) => router.push(`/coffee-tools/inventory-management/elbgold-${e.data.name.toLowerCase().replace(' ', '-')}`)}
                    suppressCellFocus
                />
            </div>
            <h3 className="text-base/7 font-semibold text-gray-900">
                Aviary Coffees (Last Updated: February 2025)
            </h3>
            <div className="h-100">
                <AgGridReact
                    rowData={aviaryRowData}
                    columnDefs={aviaryColDefs}
                    onRowClicked={(e) => router.push(`/coffee-tools/inventory-management/aviary-${e.data.name.toLowerCase().replace(' ', '-')}`)}
                    suppressCellFocus
                />
            </div>
        </div>
    )
}