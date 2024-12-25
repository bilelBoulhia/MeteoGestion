'use client';
import { propType } from "@/app/(dashboard)/Pointage/page";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "@/app/api/actions";
import DataTable from 'react-data-table-component';
import React, { useState } from "react";
import { customStyles } from "@/app/(dashboard)/Pointage/Components/PointageTable";
import ToggleAction from "@/components/ui/Toggle";
import axios from "axios";
import Toast from "@/components/ui/toast";

function checkIfExists(row: any, alreadyPointedToday: any[]) {
    if (!Array.isArray(alreadyPointedToday)) return false;
    return alreadyPointedToday.some(pointage => pointage.employeId === row.nss);
}
interface EmployeePointageTableProps extends propType {
    pData: any[];
}
export default function EmployeePointageTable(props: EmployeePointageTableProps) {
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (employeeID: string) => {
            const response = await axios.post(
                'http://localhost:5007/api/Pointage/PostPointage',
                JSON.stringify(employeeID),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            return response.data;
        },
        onSuccess: (data) => {
            setResponseMessage(data.message || 'Pointage successful!');

            queryClient.invalidateQueries(['alreadyPointed']);
        },
        onError: (error: any) => {
            setResponseMessage(error.response?.data?.message || 'Pointage failed. Please try again.');
        },
    });

    const { data: employeeData, isLoading: isLoadingEmployees } = useQuery(
        ['emp'],
        {
            queryFn: () => fetchData('Employe/GetAllEmployes'),
            initialData: props.data,
        }
    );

    const { data: alreadyPointedToday, isLoading: isLoadingPointage } = useQuery(
        ['alreadyPointed'],
        {
            queryFn: () => fetchData('Pointage/GetAllPointageToday'),
            initialData: props.pData,
        }
    );

    const columns = [
        { name: 'nss', selector: (row: any) => row.nss, sortable: true },
        { name: ' Nom', selector: (row: any) => row.nom, sortable: true },
        { name: 'Prenom', selector: (row: any) => row.prenom, sortable: true },
        { name: 'Grade', selector: (row: any) => row.grade, sortable: true },
        { name: 'NombreEnfants', selector: (row: any) => row.nombreEnfants, sortable: true },
        { name: 'Section', selector: (row: any) => row.section, sortable: true },
        { name: 'DateRecrutement', selector: (row: any) => new Date(row.dateRecrutement).toDateString(), sortable: true },
        {
            name: '',
            cell: (row: any) => (
                <div className="flex gap-2">
                    <ToggleAction
                        WillbeDisabled={isLoadingPointage ? true : checkIfExists(row, alreadyPointedToday)}
                        onToggle={async () => mutation.mutate(row.nss)}
                    />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center flex-col mt-[5rem] p-0 m-0">
            <DataTable
                columns={columns}
                data={employeeData}
                noHeader
                customStyles={customStyles}
                progressPending={isLoadingEmployees || isLoadingPointage}
            />
            {responseMessage && (
                <Toast message={responseMessage} show={true} />
            )}
        </div>
    );
}