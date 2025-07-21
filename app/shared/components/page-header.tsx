interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {description && <p className="mt-2 text-muted">{description}</p>}
        </div>
        {children && (
          <div className="flex items-center space-x-3">{children}</div>
        )}
      </div>
    </div>
  );
}
