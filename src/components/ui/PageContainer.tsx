import type { ReactNode } from 'react';

/**
 * Reusable page shell used by the lab/exercise components
 * (FriendList, List, People). Centralises the repeated
 * `max-w-lg mx-auto p-6 space-y-4` layout.
 */
interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return <div className={`max-w-lg mx-auto p-6 space-y-4 ${className}`}>{children}</div>;
}
