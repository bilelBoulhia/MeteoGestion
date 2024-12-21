'use client';

import { propType } from "@/app/(dashboard)/Pointage/page";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/api/actions";
import DataTable from 'react-data-table-component';
import { PointageType } from "@/utils/types/database";

const customStyles = {
    table: {
        style: {
            width: "100%",
            backgroundColor: 'transparent',
            borderTopLeftRadius: '1rem',
            color: 'white',
        },
    },
    rows: {
        style: {
            backgroundColor: '#F6F5F5',
            minHeight: '72px',
            textColor: 'white',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#789DBC',
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


const groupByMonth = (data: PointageType[]) => {
    const grouped: { [key: string]: PointageType[] } = {};
    data.forEach((row) => {
        const month = new Date(row.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!grouped[month]) {
            grouped[month] = [];
        }
        grouped[month].push(row);
    });

    return Object.entries(grouped)
        .map(([month, rows]) => ({
            month,
            rows,
        }))
        .sort((a, b) => {
            const dateA = new Date(a.month);
            const dateB = new Date(b.month);
            return dateB.getTime() - dateA.getTime();
        });
};


const columns = [
    {
        name: 'Month',
        selector: (row: { month: string }) => row.month,
        sortable: true,

    },
];

const expandableRow = (row: { rows: PointageType[] }) => (
    <div style={{  background: '#f5f5f5' }}>
        <DataTable
            columns={[
                { name: 'Date', selector: (row) => row.date.toString(), sortable: true },
                { name: 'ID Employee(details)', selector: (row) => row.employeId, sortable: true },
                { name: 'Debut Matinee', selector: (row) => row.debutMatinee || '', sortable: true },
                { name: 'Fin Matinee', selector: (row) => row.finMatinee || '', sortable: true },
                { name: 'Debut ApresMidi', selector: (row) => row.debutApresMidi || '', sortable: true },
                { name: 'Fin ApresMidi', selector: (row) => row.finApresMidi || '', sortable: true },
                { name: 'Heures Totales', selector: (row) => row.heuresTotales || '', sortable: true },
            ]}
            data={row.rows}
            noHeader
            customStyles={customStyles}
        />
    </div>
);

export default function PointageTable(props: propType) {
    const { data } = useQuery(
        ['pointage'],
        {
            queryFn: () => fetchData('Pointage/GetAllPointage'),
            initialData: props.data,
        }
    );

    // Group data by month
    const groupedData = groupByMonth(data);

    return (
        <div className="w-full h-full mt-5 p-0 m-0">
            <DataTable
                columns={columns}
                noTableHead

                data={groupedData}
                customStyles={customStyles}
                expandableRows
                expandableRowExpanded={(row) => row.rows.length > 0}
                expandableRowsComponent={({ data }) => expandableRow(data)}
            />
        </div>
    );
}
