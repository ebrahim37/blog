export const Meta = ({ title, description }: { title: string, description?: string }) => (
	<>
		<title>{`${title} | ebra.dev`}</title>
		{description && <meta name='description' content={description} />}
	</>
);
