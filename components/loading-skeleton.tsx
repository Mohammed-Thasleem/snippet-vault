import { colorValues } from '@/lib/design-tokens';

export function SkeletonCard() {
  return (
    <div className="border rounded-xl overflow-hidden p-6 animate-pulse" style={{ backgroundColor: colorValues.surface.base, borderColor: colorValues.border.subtle }}>
      <div className="h-6 rounded-lg w-3/4 mb-3" style={{ backgroundColor: colorValues.surface.elevated }}></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 rounded-lg w-20" style={{ backgroundColor: colorValues.surface.elevated }}></div>
        <div className="h-6 rounded-lg w-24" style={{ backgroundColor: colorValues.surface.elevated }}></div>
      </div>
      <div className="border rounded-lg p-3 mb-4" style={{ backgroundColor: colorValues.background.primary, borderColor: colorValues.border.subtle }}>
        <div className="space-y-2">
          <div className="h-3 rounded w-full" style={{ backgroundColor: colorValues.surface.elevated }}></div>
          <div className="h-3 rounded w-5/6" style={{ backgroundColor: colorValues.surface.elevated }}></div>
          <div className="h-3 rounded w-4/6" style={{ backgroundColor: colorValues.surface.elevated }}></div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 rounded-full w-16" style={{ backgroundColor: colorValues.surface.elevated }}></div>
        <div className="h-6 rounded-full w-20" style={{ backgroundColor: colorValues.surface.elevated }}></div>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
