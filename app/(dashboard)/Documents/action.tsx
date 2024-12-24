'use server'

import {fetchData} from "@/app/api/actions";

import EmployeeTable from "@/app/(dashboard)/ServicePersonnal/Components/EmployeeList";


export default async  function Employee(){
    const data = await fetchData('Employe/GetAllEmployes');

    if(data === null) return null;
    return <EmployeeTable  data={data}/>;

}

