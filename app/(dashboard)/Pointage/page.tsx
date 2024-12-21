import {Pointage} from "@/app/(dashboard)/Pointage/action";

export type propType = {
    data : any[]
}

export default  function Page() {

   return(
       <div className='w-full h-full rounded-tl-2xl '>
           <div className='w-full h-full'>
               <h1 className='p-5'>tableu de pointage annual :</h1>
               <Pointage/>
           </div>

       </div>

   )
}




