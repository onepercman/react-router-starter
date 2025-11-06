export interface StatItem {
	label: string
	value: string
	change: string
	changeType: "positive" | "negative"
}

export interface ActivityItem {
	id: number
	action: string
	user: string
	time: string
}
