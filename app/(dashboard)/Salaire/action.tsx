'use server'

import {fetchData} from "@/app/api/actions";

import EmployeeTable from "@/app/(dashboard)/ServicePersonnal/Components/EmployeeList";
import BillSailareList from "@/app/(dashboard)/Salaire/Components/BillSailareList";


export default async  function Bulletin(){
    const data = await fetchData('Salary/GetAllBulletinsByMonth?month=12&year=2024');


    if(data === null) return null;
    return <BillSailareList  data={data}/>;

}

