
import Pointage, {EmployeePointage} from "@/app/(dashboard)/Pointage/action";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";

export type propType = {
    data : any[]
}

export default  function Page() {

   return(
       <div className="flex flex-col relative   text-center    w-full ">
           <Tabs className='mt-5  ' defaultValue="List">
               <TabsList>
                   <TabsTrigger className='' value="List">pointage d'aujourd'hui</TabsTrigger>
                   <TabsTrigger className='' value="ajoute">operation de pointage</TabsTrigger>
               </TabsList>
               <TabsContent value="List">
                   <Pointage/>
               </TabsContent>
               <TabsContent value="ajoute">
                   <EmployeePointage/>
               </TabsContent>

           </Tabs>

       </div>


   )
}




