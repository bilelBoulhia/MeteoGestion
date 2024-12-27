'use server'


import PointageTable from "@/app/(dashboard)/Pointage/Components/PointageTable";

import EmployeePointageTable from "@/app/(dashboard)/Pointage/Components/EmployeePointageTable";
import axios from "axios";
import {baseapi} from "@/app/constants";


export default async  function Pointage(){
    const response = await axios.get(`${baseapi}/api/Pointage/GetAllPointageToday`);
    const data = response.data;


    return <PointageTable  data={data}/>;

}

export  async  function EmployeePointage(){
    const response = await axios.get(`${baseapi}/api/Employe/GetAllEmployes`);
    const presponse = await axios.get(`${baseapi}/api/Pointage/GetAllPointageToday`);

    const data = response.data;
    const pData = presponse.data;

    return <EmployeePointageTable pData={pData} data={data}/>;

}

