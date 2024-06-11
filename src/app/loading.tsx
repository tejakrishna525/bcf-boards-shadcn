import SkeletonCard from "@/components/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading(){
   return( 
   <main>
    <Skeleton>

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
    {"abcde".split('').map(i=>(<SkeletonCard key={i} />))}
    loading
   </div>
    </Skeleton>
   </main>
   )

}