'use client';

import { propType } from "@/app/(dashboard)/Pointage/page";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/api/actions";
import DataTable from 'react-data-table-component';
import React, {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";


const customStyles = {
    table: {
        style: {
            width: "100%",
            backgroundColor: 'transparent',

            color: 'white',
        },
    },
    rows: {
        style: {
            backgroundColor: 'white',
            minHeight: '72px',
            textColor: 'white',
            margin:'5px',
            padding: '5px',
        },
    },
    headRow: {
        style: {
            backgroundColor: 'black',
            borderRadius:'10rem',
            margin:'5px',
            padding: '5px',
            color: 'white',
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    cells: {
        style: {
            backgroundColor: 'transparent',
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
    const { data } = useQuery(
        ['pointage'],
        {
            queryFn: () => fetchData('Pointage/GetAllPointageToday'),
            initialData: props.data,
        }
    );

    const [currentTime, setCurrentTime] = useState(new Date())
    const [responseMessage, setResponseMessage] = useState<string | null>(null)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <div className="w-full h-full flex items-center justify-center flex-col mt-5  gap-[3rem] p-0 m-0">
            <Card className="w-full max-w-md">
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
                data={data}
                noHeader
                customStyles={customStyles}
            />
        </div>
    );
}
