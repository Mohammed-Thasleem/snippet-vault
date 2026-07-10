import { type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { colorValues } from '@/lib/design-tokens';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div
        className="w-16 h-16 rounded-full border flex items-center justify-center mb-4"
        style={{
          backgroundColor: colorValues.surface.base,
          borderColor: colorValues.border.subtle,
        }}
      >
        <Icon className="w-8 h-8" style={{ color: colorValues.text.tertiary }} />
      </div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: colorValues.text.primary }}>{title}</h3>
      <p className="text-sm text-center max-w-md mb-6" style={{ color: colorValues.text.secondary }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="text-white"
          style={{ backgroundColor: colorValues.accent.primary }}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
