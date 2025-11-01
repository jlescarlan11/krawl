import { ReactNode } from 'react';

export interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 mx-auto text-neutral-400 mb-4 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="heading-5 text-neutral-700 mb-2">{title}</h3>
      <p className="body-base text-neutral-500 mb-6!">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

