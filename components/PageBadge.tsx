interface PageBadgeProps {
  badge: string;
}

const badgeStyles: Record<string, { bg: string; text: string }> = {
  new: { bg: 'bg-badge-green', text: 'text-badge-green-text' },
  beta: { bg: 'bg-badge-yellow', text: 'text-badge-yellow-text' },
  deprecated: { bg: 'bg-badge-red', text: 'text-badge-red-text' },
  experimental: { bg: 'bg-badge-purple', text: 'text-badge-purple-text' },
  updated: { bg: 'bg-badge-blue', text: 'text-badge-blue-text' },
};

function getBadgeStyle(badge: string): { bg: string; text: string } {
  const key = badge.toLowerCase().trim();
  
  for (const [pattern, style] of Object.entries(badgeStyles)) {
    if (key.includes(pattern)) {
      return style;
    }
  }

  return { bg: 'bg-badge-blue', text: 'text-badge-blue-text' };
}

export default function PageBadge({ badge }: PageBadgeProps) {
  if (!badge) return null;

  const style = getBadgeStyle(badge);

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
    >
      {badge}
    </span>
  );
}