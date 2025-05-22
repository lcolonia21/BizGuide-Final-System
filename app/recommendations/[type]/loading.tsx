import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BusinessTypeLoading() {
  return (
    <div className="container px-4 md:px-6 py-10 mx-auto">
      <Link href="/recommendations" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recommendations
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-6" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-28" />
              </div>
            ))}
          </div>

          <Skeleton className="h-32 w-full mb-8" />

          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-start">
                  <Skeleton className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-10 w-28" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
} 