export default function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-[2rem] border border-white/20 bg-white/60 p-4 dark:bg-white/5">
          <div className="skeleton h-56 rounded-[1.5rem]" />
          <div className="skeleton mt-5 h-5 w-3/4 rounded" />
          <div className="skeleton mt-3 h-4 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );
}
