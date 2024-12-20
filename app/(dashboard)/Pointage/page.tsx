'use client'


import {fetchData} from "@/app/api/actions";

import { useQuery } from '@tanstack/react-query'

type propType = {
    data : any[]
}

export default  function PointagePage(props:propType) {

    const { data } = useQuery(
        ['pointage'],
        {
            queryFn: () => fetchData('Pointage/GetPointageThisMonth'),
            initialData: props.data, // optional initial data
        }
    );





    return (

         <div>
               <pre>{JSON.stringify(data)}</pre>
         </div>
    );
}




