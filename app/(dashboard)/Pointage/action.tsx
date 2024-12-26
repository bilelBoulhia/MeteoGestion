'use server'

import {fetchData} from "@/app/api/actions";
import PointageTable from "@/app/(dashboard)/Pointage/Components/PointageTable";

import EmployeePointageTable from "@/app/(dashboard)/Pointage/Components/EmployeePointageTable";


export default async  function Pointage(){
    const data = await fetchData('Pointage/GetAllPointage');

    if(data === null) return null;
    return <PointageTable  data={data}/>;

}

export  async  function EmployeePointage(){
    const data = await fetchData('Employe/GetAllEmployes');
    const pData = await fetchData('Pointage/GetAllPointageToday');

    if(data === null) return null;
    return <EmployeePointageTable pData={pData} data={data}/>;

}

