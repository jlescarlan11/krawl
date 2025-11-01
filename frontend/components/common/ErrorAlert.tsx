import { LuCircleAlert } from "react-icons/lu";


export interface ErrorAlertProps {
  title: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorAlert({ title, message, onRetry, className = '' }: ErrorAlertProps) {
  return (
    <div
      role="alert"
      className={`bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 ${className}`}
    >
      <LuCircleAlert className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="heading-6 text-error">{title}</h4>
        <p className="body-sm text-red-700 mt-1">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="body-sm text-error underline hover:no-underline mt-2 focus-ring rounded"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

