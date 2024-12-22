import {Pointage} from "@/app/(dashboard)/Pointage/action";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import {PointageForm} from "@/app/(dashboard)/Pointage/action";

export type propType = {
    data : any[]
}

export default  function Page() {

   return(
       <div className="flex flex-col relative   text-center overflow-scroll   w-full ">
           <Tabs className='mt-5 ' defaultValue="Marque">
               <TabsList>
                   <TabsTrigger value="Marque">Marque pointage</TabsTrigger>
                   <TabsTrigger value="List">List de pointage</TabsTrigger>

               </TabsList>
               <TabsContent value="List">
                   <Pointage/>
               </TabsContent>
               <TabsContent value="Marque" className='overflow-scroll'>
                   <PointageForm/>
               </TabsContent>
           </Tabs>

       </div>


   )
}




