// the site's only javascript: `run` is inlined as source text and called in the browser with the
// element this script sits in, so it can't use imports or variables from outside its own body
export const ClientScript = <T extends HTMLElement>({ run }: { run: (element: T) => void }) => (
	<script>{`(${run})(document.currentScript.parentElement)`}</script>
);
