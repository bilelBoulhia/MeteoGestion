'use server'



import BillSailareList from "@/app/(dashboard)/Salaire/Components/BillSailareList";
import axios from "axios";
import {baseapi} from "@/app/constants";


export default async  function Bulletin(){
    const response = await axios.get(`${baseapi}/api/Salary/GetAllBulletinsByMonth?month=12&year=2024`);
    const data = response.data;

    return <BillSailareList  data={data}/>;

}

