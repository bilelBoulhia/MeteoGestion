'use server'

import {fetchData} from "@/app/api/actions";


import FATable from "@/app/(dashboard)/Documents/Components/FichAttachementList";


export default async  function FichesAtt(){
    const data = await fetchData('Document/GetAllEmployeFA');


    return <FATable  data={data}/>;

}

