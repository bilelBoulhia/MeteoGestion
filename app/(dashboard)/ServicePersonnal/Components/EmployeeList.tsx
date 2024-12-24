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



const customStyles = {
    table: {
        style: {
            width: "100%",
            backgroundColor: 'transparent',
            overflow:'hidden',
            color: 'white',


        },
    },
    rows: {
        style: {
            backgroundColor: 'black',
            minHeight: '72px',
            padding: '2px',


        },
    },
    headRow: {
        style: {
            backgroundColor: 'black',
            borderTopLeftRadius:' 7px',
            borderTopRightRadius:' 7px',
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
            backgroundColor:'white'
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
