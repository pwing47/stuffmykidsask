// import { Card, CardContent, CardHeader } from "@/components/ui/Card"

export function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 bg-white">

          
          <div className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse flex-1 max-w-md" />
              </div>
              <div className="text-right space-y-1">
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          <div className="pt-0 space-y-8">
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
