'use client';

import { propType } from "@/app/(dashboard)/Pointage/page";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import {DeleteData, fetchData} from "@/app/api/actions";
import DataTable from 'react-data-table-component';
import React, {useEffect} from "react";

import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {TrashIcon} from "lucide-react";




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



const handleDelete = async (faid: string,Q:QueryClient) => {

    try {
        await DeleteData('Document/DeleteFicheAttachemnt',faid);
        await Q.invalidateQueries(['fiche']);
    } catch (error) {
        console.error('Error deleting FicheAttachemnt:', error);
    }
};






export default function FATable(props: propType) {
    const queryClient = useQueryClient();
    const columns =
        [
            { name: 'fich id', selector: (row:any) => row.faID, sortable: true },
            { name: 'nom et prenom', selector: (row:any) => row.nomEtPrenom, sortable: true },
            { name: 'employeeID', selector: (row:any) => row.employeeID , sortable: true },
            { name: 'jour Travaillee', selector: (row:any) => row.jourTravaillee , sortable: true },
            { name: 'remboursement', selector: (row:any) => row.remboursement , sortable: true },
            { name: 'pri', selector: (row:any) => row.pri, sortable: true },
            { name: 'prc', selector: (row:any) => row.prc , sortable: true },
            { name: 'year', selector: (row:any) => new Date(row.year).toDateString() , sortable: true },
            { name: 'month', selector: (row:any) => new Date(row.month).toDateString() , sortable: true },

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
                                    <AlertDialogTitle>Vous etes sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        tu est enterant de supprimer
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className='rounded-xl '>Cancel</AlertDialogCancel>
                                    <AlertDialogAction  onClick={() => handleDelete(row.faID,queryClient)}  className='rounded-xl bg-blue-400 text-white hover:bg-blue-800 '>Continue</AlertDialogAction>
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
        ['fiche'],
        {
            queryFn: () => fetchData('Document/GetAllEmployeFA'),
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
