'use server'

import {fetchData} from "@/app/api/actions";


import FATable from "@/app/(dashboard)/Documents/Components/FichAttachementList";
import DemandTable from "@/app/(dashboard)/Demandes/Components/DemandList";


export default async  function FichDemand(){
    const data = await fetchData('Document/GetAllEmployeDemands');


    return <DemandTable  data={data}/>;

}

