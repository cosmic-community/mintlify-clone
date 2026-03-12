export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg w-2/3 mb-4" />
        <div className="h-5 bg-gray-100 rounded w-1/2 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}