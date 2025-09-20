export default function About(props: { className?: string }) {
	const { className } = props;
	return (
		<div className={`p-4 ${className}`}>
			{/* talk about your experience and your project here and hover over it will create tool guide showing img of it */}
			<p className="text-sm leading-7">
				Hello World! I&apos;m <u>Ruchiket</u>, I have written my first
				line of code when I was 16. I&apos;m a passionate full stack
				developer and designer. I love the thrill of crafting new things
				and constantly exploring to satisfy my curiosity. With a strong
				background in both development and design, I bring a unique
				blend of technical expertise and creative problem-solving to
				every project I undertake. Whether it&apos;s coding elegant
				software solutions or designing captivating user interfaces,
				I&apos;m always driven by my passion for innovation.
				<br />
				<br />
				Let&apos;s connect and collaborate!
			</p>
		</div>
	);
}
