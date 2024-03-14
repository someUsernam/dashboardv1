import clsx from "clsx";

interface TagComponentProps {
	title: string;
	colorName: string;
	setSelectedColor?: (color: string) => void;
	selectedColor?: string;
}

const colorClasses: Record<string, string> = {
	BLUE: "bg-blue-400/10 text-blue-400 ",
	ORANGE: "bg-yellow-500/10 text-yellow-500 ",
	ROSE: "bg-rose-500/10 text-rose-500 ",
	GREEN: "bg-emerald-400/10 text-emerald-400 ",
	PURPLE: "bg-purple-400/10 text-purple-400 ",
} as const;

const borderClasses: Record<string, string> = {
	BLUE: "border border-blue-400",
	ORANGE: "border border-yellow-500",
	ROSE: "border border-rose-500",
	GREEN: "border border-emerald-400",
	PURPLE: "border border-purple-400",
};

function CustomTag({
	colorName,
	title,
	selectedColor,
	setSelectedColor,
}: TagComponentProps) {
	const colorClass = colorClasses[colorName];
	const borderClass = borderClasses[colorName];
	const ringClass = selectedColor === colorName ? "ring-2 ring-primary" : "";

	return (
		<div
			className={clsx(
				"p-2 rounded-sm flex-shrink-0 text-xs cursor-pointer",
				colorClass,
				borderClass,
				ringClass,
			)}
			onClick={() => {
				setSelectedColor?.(colorName);
			}}
			onKeyDown={(e) => {}}
		>
			{title}
		</div>
	);
}

export { CustomTag };
