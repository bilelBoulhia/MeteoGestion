'use client';

import { propType } from "@/app/(dashboard)/Pointage/page";
import { useQuery } from "@tanstack/react-query";

import DataTable from 'react-data-table-component';
import React, { useState } from "react";
import {MonthYearPicker} from "@/components/ui/components_month-year-picker";
import {customStyles} from "@/app/(dashboard)/Pointage/Components/PointageTable";



export default function BillSailareList(props: propType) {
    const [selectedMonth, setSelectedMonth] = useState("12");
    const [selectedYear, setSelectedYear] = useState("2024");

    const handleMonthYearChange = (month: string, year: string) => {
        setSelectedMonth(month);
        setSelectedYear(year);
    };

    const columns = [
        {
            name: 'Bulletin ID',
            selector: (row: any) => row.bulletinDeSalaireID,
            sortable: true
        },
        {
            name: 'Nom et Prenom',
            selector: (row: any) => row.ficheAttachemnt.nomEtPrenom,
            sortable: true
        },
        {
            name: 'Employee ID',
            selector: (row: any) => row.ficheAttachemnt.employeeID,
            sortable: true
        },
        {
            name: 'Jours Travaillés',
            selector: (row: any) => row.ficheAttachemnt.jourTravaillee,
            sortable: true
        },
        {
            name: 'Allocation Familiale',
            selector: (row: any) => row.ficheAttachemnt.allocationFamiliale,
            sortable: true
        },
        {
            name: 'Remboursement',
            selector: (row: any) => row.ficheAttachemnt.remboursement,
            sortable: true
        },
        {
            name: 'PRI',
            selector: (row: any) => row.ficheAttachemnt.pri,
            sortable: true
        },
        {
            name: 'PRC',
            selector: (row: any) => row.ficheAttachemnt.prc,
            sortable: true
        },
        {
            name: 'Salaire',
            selector: (row: any) => row.salaire,
            sortable: true
        },
        {
            name: 'Date',
            selector: (row: any) => `${row.month}/${row.year}`,
            sortable: true
        },
    ];

    const { data } = useQuery(
        ['bulletins', selectedMonth, selectedYear],
        {
            initialData: props.data,
        }
    );

    return (
        <>
            <div className="pt-4 items-center justify-center flex w-full">
                <MonthYearPicker onChange={handleMonthYearChange}/>
            </div>
            <div className="w-full h-full flex items-center justify-center flex-col mt-5 p-0 m-0">
                <DataTable
                    columns={columns}
                    data={data}
                    noHeader
                    customStyles={customStyles}
                />
            </div>
        </>
    );
}