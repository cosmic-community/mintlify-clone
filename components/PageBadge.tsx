// Changed: Import getMetafieldValue to safely handle {key, value} objects passed as badge
import { getMetafieldValue } from '@/lib/cosmic';

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
  // Changed: Use getMetafieldValue to safely extract string from potential {key,value} object
  const badgeText = getMetafieldValue(badge);
  if (!badgeText) return null;

  const style = getBadgeStyle(badgeText);

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
    >
      {badgeText}
    </span>
  );
}