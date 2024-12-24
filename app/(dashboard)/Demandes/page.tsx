import Pointage from "@/app/(dashboard)/Pointage/action";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import FAForm from "@/app/(dashboard)/Documents/Components/FicheAttachementForm";
import DemandForm from "@/app/(dashboard)/Demandes/Components/DemandForm";
import DemandTable from "@/app/(dashboard)/Demandes/Components/DemandList";
import FichDemand from "@/app/(dashboard)/Demandes/action";

export type propType = {
    data : any[]
}

export default  function Page() {

   return(
       <div className="flex flex-col relative text-center w-full ">
           <Tabs className='mt-5 ' defaultValue="Liste">
               <TabsList>
                   <TabsTrigger value="Liste">Listes de demands</TabsTrigger>
                   <TabsTrigger value="Ajouter">ajouter un demand</TabsTrigger>

               </TabsList>
               <TabsContent value="Liste">
                   <FichDemand/>
               </TabsContent>
               <TabsContent value="Ajouter">
                      <DemandForm/>
               </TabsContent>

           </Tabs>

       </div>


   )
}




