'use server'
import FATable from "@/app/(dashboard)/Documents/Components/FichAttachementList";
import axios from "axios";
import {baseapi} from "@/app/constants";


export default async  function FichesAtt(){
    const res = await axios.get(`${baseapi}/api/Document/GetAllEmployeFA`);
    const data = res.data;

    return <FATable  data={data}/>;

}

