'use server'



import EmployeeTable from "@/app/(dashboard)/ServicePersonnal/Components/EmployeeList";
import axios from "axios";
import {baseapi} from "@/app/constants";


export default async  function Employee(){
    const res = await axios.get(`${baseapi}/api/Employe/GetAllEmployes`);
    const data =res.data;

    return <EmployeeTable  data={data}/>;

}

