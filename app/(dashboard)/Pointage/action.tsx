'use server'

import {fetchData} from "@/app/api/actions";
import PointageTable from "@/app/(dashboard)/Pointage/PointageTable";
import PointageFormView from "@/app/(dashboard)/Pointage/PointageForm";

export async  function Pointage(){
    const data = await fetchData('Pointage/GetAllPointage');

    if(data === null) return null;
    return <PointageTable  data={data}/>;

}

export async  function PointageForm(){
    const data = await fetchData('Employe/GetAllEmployes');

    if(data === null) return null;
    return <PointageFormView  data={data}/>;

}