
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";

import BulletinSalaireForm from "@/app/(dashboard)/Salaire/Components/BulletinSalaireForm";

import Bulletin from "@/app/(dashboard)/Salaire/action";



export default  function Page() {

    return(
        <div className="flex flex-col relative   text-center   w-full ">
            <Tabs className='mt-5' defaultValue="ajouter">
                <TabsList>
                    <TabsTrigger value="List">List des bulletin salaire</TabsTrigger>
                    <TabsTrigger value="ajouter">ajouter Bulletin salaire</TabsTrigger>

                </TabsList>
                <TabsContent value="List">
                    <Bulletin/>
                </TabsContent>
                <TabsContent value="ajouter">
                    <BulletinSalaireForm/>
                </TabsContent>

            </Tabs>

        </div>


    )
}




