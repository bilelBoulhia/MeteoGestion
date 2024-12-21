'use server'

import {fetchData} from "@/app/api/actions";
import PointageTable from "@/app/(dashboard)/Pointage/Table";

export async  function Pointage(){
    const data = await fetchData('Pointage/GetAllPointage');

    if(data === null) return null;
    return <PointageTable  data={data}/>;

}