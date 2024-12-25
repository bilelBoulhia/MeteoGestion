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
import {customStyles} from "@/app/(dashboard)/Pointage/Components/PointageTable";









const handleDelete = async (id: string,Q:QueryClient) => {

    try {
        await DeleteData('Document/DeleteLettreAccompagnee',id);
        await Q.invalidateQueries(['emp']);
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
};






export default function DemandTable(props: propType) {
    const queryClient = useQueryClient();
    const columns =
        [
            { name: 'demandeId', selector: (row:any) => row.demandeId, sortable: true },
            { name: 'employeId', selector: (row:any) => row.employeId, sortable: true },
            { name: 'type de Changement', selector: (row:any) => row.typeChangement , sortable: true },
            { name: 'raison', selector: (row:any) => row.raison , sortable: true },
            { name: 'commentaires', selector: (row:any) => row.commentaires , sortable: true },
            { name: 'status', selector: (row:any) => row.statut , sortable: true },
            {name: 'date de Demande', selector: (row: any) => new Date(row.dateDemande).toLocaleDateString(), sortable: true
            },
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
                                    <AlertDialogAction  onClick={() => handleDelete(row.demandeId,queryClient)}  className='rounded-xl bg-blue-400 text-white hover:bg-blue-800 '>Continue</AlertDialogAction>
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
        ['demand'],
        {
            queryFn: () => fetchData('Document/GetAllEmployeDemands'),
            initialData: props.data,
        }
    );






    return (
        <div className="w-full h-full flex items-center justify-center flex-col mt-5 p-0 m-0">
            <DataTable
                columns={columns}
                data={data}
                noHeader
                customStyles={customStyles}
            />
        </div>
    );
}
