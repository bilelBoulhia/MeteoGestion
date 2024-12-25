
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/Tabs";
import EmployeeForm from "@/app/(dashboard)/ServicePersonnal/Components/EmployeeForm";
import Employee from "@/app/(dashboard)/ServicePersonnal/action";
import GrilleSalaireForm from "@/app/(dashboard)/ServicePersonnal/Components/GrilleSalaireForm";



export default  function Page() {

    return(
        <div className="flex flex-col relative    text-center   w-full ">
            <Tabs className='mt-5' defaultValue="ajouter">
                <TabsList>
                    <TabsTrigger value="ajouter">ajouter employee</TabsTrigger>
                    <TabsTrigger value="List">List des employees</TabsTrigger>
                    <TabsTrigger value="grille">ajouter grille de salaire</TabsTrigger>
                </TabsList>
                <TabsContent  value="List">
                    <Employee/>
                </TabsContent>
                <TabsContent value="grille">
                    <GrilleSalaireForm/>
                </TabsContent>
                <TabsContent value="ajouter">
                    <EmployeeForm/>
                </TabsContent>

            </Tabs>

        </div>


    )
}




