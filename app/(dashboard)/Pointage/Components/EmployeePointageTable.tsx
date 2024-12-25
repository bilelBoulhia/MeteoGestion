'use client';

import { propType } from "@/app/(dashboard)/Pointage/page";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import {DeleteData, fetchData} from "@/app/api/actions";
import DataTable from 'react-data-table-component';
import React from "react";

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {customStyles} from "@/app/(dashboard)/Pointage/Components/PointageTable";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/Card";






const handleDelete = async (nss: string,Q:QueryClient) => {

    try {
        await DeleteData('Employe/DeleteEmploye/',nss);
        await Q.invalidateQueries(['emp']);
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
};






export default function EmployeeTable(props: propType) {
    const queryClient = useQueryClient();
    const columns =
        [
            { name: 'nss', selector: (row:any) => row.nss, sortable: true },
            { name: ' Nom', selector: (row:any) => row.nom, sortable: true },
            { name: 'Prenom', selector: (row:any) => row.prenom , sortable: true },
            { name: 'Grade', selector: (row:any) => row.grade , sortable: true },
            { name: 'NombreEnfants', selector: (row:any) => row.nombreEnfants , sortable: true },
            { name: 'Section', selector: (row:any) => row.section, sortable: true },
            { name: 'DateRecrutement', selector: (row:any) => new Date(row.dateRecrutement).toDateString() , sortable: true },
            {
                name: '',
                cell: (row: any) => (
                    <div className="flex gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <TrashIcon className='h-4 w-auto'/>
                            </AlertDialogTrigger>
                            <AlertDialogContent className='rounded-2xl bg-white  '>
                                <AlertDialogHeader className='bg-white rounded-2xl '>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className='rounded-xl '>Cancel</AlertDialogCancel>
                                    <AlertDialogAction  onClick={() => handleDelete(row.nss,queryClient)}  className='rounded-xl bg-blue-400 text-white hover:bg-blue-800 '>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>


                    </div>
                ),
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },

        ];

    const { data } = useQuery(
        ['emp'],
        {
            queryFn: () => fetchData('Employe/GetAllEmployes'),
            initialData: props.data,
        }
    );





    return (
        <div className="w-full h-full flex items-center  justify-center flex-col mt-[5rem] p-0 m-0">

            <DataTable
                columns={columns}
                data={data}
                noHeader
                customStyles={customStyles}
            />
        </div>
    );
}
