import Pointage from "@/app/(dashboard)/Pointage/action";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import FAForm from "@/app/(dashboard)/Documents/Components/FicheAttachementForm";
import FATable from "@/app/(dashboard)/Documents/Components/FichAttachementList";
import FichesAtt from "@/app/(dashboard)/Documents/action";

export type propType = {
    data : any[]
}

export default  function Page() {

   return(
       <div className="flex flex-col relative text-center w-full ">
           <Tabs className='mt-5 ' defaultValue="Ajouter">
               <TabsList>
                   <TabsTrigger value="Ajouter">ajouter fiche d'attachement</TabsTrigger>
                   <TabsTrigger value="Liste">fiches d'attachement</TabsTrigger>

               </TabsList>
               <TabsContent value="Ajouter">
                   <FAForm/>
               </TabsContent>
               <TabsContent value="Liste">
                   <FichesAtt/>
               </TabsContent>

           </Tabs>

       </div>


   )
}




