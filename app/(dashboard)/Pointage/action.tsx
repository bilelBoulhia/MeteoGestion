import {fetchData} from "@/app/api/actions";
import PointagePage from "@/app/(dashboard)/Pointage/page";

async  function getPointageAction(){
    const data = await fetchData('Pointage/GetPointageThisMonth');

    return <PointagePage  posts={data}/>;

}