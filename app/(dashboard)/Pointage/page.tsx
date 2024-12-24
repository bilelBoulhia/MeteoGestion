import Pointage from "@/app/(dashboard)/Pointage/action";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";

export type propType = {
    data : any[]
}

export default  function Page() {

   return(
       <div className="flex flex-col relative   text-center overflow-scroll   w-full ">
           <Tabs className='mt-5 ' defaultValue="List">
               <TabsList>
                   <TabsTrigger value="List">List de pointage</TabsTrigger>
               </TabsList>
               <TabsContent value="List">
                   <Pointage/>
               </TabsContent>

           </Tabs>

       </div>


   )
}




