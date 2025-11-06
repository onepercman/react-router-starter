interface PageHeaderProps {
	title: string
	description?: string
	children?: React.ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
	return (
		<div className="mb-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-3xl text-fg">{title}</h1>
					{description && <p className="mt-2 text-muted-fg">{description}</p>}
				</div>
				{children && (
					<div className="flex items-center space-x-3">{children}</div>
				)}
			</div>
		</div>
	)
}
