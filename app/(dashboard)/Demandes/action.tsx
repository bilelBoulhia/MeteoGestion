'use server'




import DemandTable from "@/app/(dashboard)/Demandes/Components/DemandList";
import axios from "axios";
import {baseapi} from "@/app/constants";


export default async  function FichDemand(){
    const rest = await axios.get(`${baseapi}/api/Document/GetAllEmployeDemands`);
    const data = await rest.data;

    return <DemandTable  data={data}/>;

}

