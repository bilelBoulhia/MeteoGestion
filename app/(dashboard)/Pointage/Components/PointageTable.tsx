'use client';

import { propType } from "@/app/(dashboard)/Pointage/page";
import DataTable from 'react-data-table-component';
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";


export const customStyles = {
    table: {
        style: {
            width: "100%",
            backgroundColor: 'transparent',
            overflow:'hidden',
            borderRadius: '7px',
            color: 'white',


        },
    },
    rows: {
        style: {
            backgroundColor: '#082f49',
            minHeight: '72px',
            padding: '2px',


        },
    },
    headRow: {
        style: {
            backgroundColor: 'white',

            padding: '5px',

            color: 'black',
        },
    },

    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            borderRadius:'0.5rem',
            margin:'5px',
            fontWeight: 'bold',

        },
    },
    cells: {
        style: {
            color: 'white',
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
};





const columns =
    [
        { name: 'Date', selector: (row:any) => new Date(row.date).toDateString(), sortable: true },
        { name: 'ID Employee(details)', selector: (row:any) => row.employeId, sortable: true },
        { name: 'Debut Matinee', selector: (row:any) => row.debutMatinee || '', sortable: true },
        { name: 'Fin Matinee', selector: (row:any) => row.finMatinee || '', sortable: true },
        { name: 'Debut ApresMidi', selector: (row:any) => row.debutApresMidi || '', sortable: true },
        { name: 'Fin ApresMidi', selector: (row:any) => row.finApresMidi || '', sortable: true },
        { name: 'Heures Totales', selector: (row:any) => row.heuresTotales || '', sortable: true },
    ];




export default function PointageTable(props: propType) {

    const [currentTime, setCurrentTime] = useState(new Date())


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <div className="w-full h-full   flex items-center justify-center flex-col mt-5  gap-[3rem] p-0 m-0">
            <Card className="w-full bg-sky-950 max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Pointage</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="text-center">
                            <p className="text-3xl font-semibold">
                                {currentTime.toLocaleTimeString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                {currentTime.toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <DataTable
                columns={columns}
                data={props.data}
                noHeader
                customStyles={customStyles}
            />
        </div>
    );
}
