function BlurPage({ children }: Children) {
	return (
		<div className="h-screen overflow-auto pt-24 p-4 relative">{children}</div>
	);
}
export default BlurPage;
