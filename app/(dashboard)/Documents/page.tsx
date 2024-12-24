import Pointage from "@/app/(dashboard)/Pointage/action";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import FAForm from "@/app/(dashboard)/Documents/Components/FicheAttachementForm";

export type propType = {
    data : any[]
}

export default  function Page() {

   return(
       <div className="flex flex-col relative   text-center overflow-scroll   w-full ">
           <Tabs className='mt-5 ' defaultValue="Ajouter">
               <TabsList>
                   <TabsTrigger value="Ajouter">ajouter fiche d'attachement</TabsTrigger>
                   <TabsTrigger value="Liste">fiches d'attachement</TabsTrigger>
                   <TabsTrigger value="ListeA">Letteres d'accompagnee</TabsTrigger>
               </TabsList>
               <TabsContent value="Ajouter">
                   <FAForm/>
               </TabsContent>

           </Tabs>

       </div>


   )
}




