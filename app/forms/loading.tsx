export default function FormsLoading() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 w-20 bg-gray-200 rounded-lg" />
            ))}
          </div>

          <div className="space-y-3">
            <div className="h-10 bg-gray-200 rounded" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}