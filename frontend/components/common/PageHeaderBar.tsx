type Props = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode; // right-aligned button
  className?: string;
};

export default function PageHeaderBar({ title, subtitle, action, className }: Props) {
  return (
    <div className={`p-4 mb-4 ${className ?? ''}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-3">{title}</h1>
          {subtitle ? <p className="body-sm text-neutral-600 mt-0.5">{subtitle}</p> : null}
        </div>
        {action ? <div className="shrink-0 self-start sm:self-auto">{action}</div> : null}
      </div>
    </div>
  );
}