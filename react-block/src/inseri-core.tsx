import domReady from "@wordpress/dom-ready";

export const main = {
	foo: 43,
	bar: (a: any) => "meow " + a
}

domReady(() => {
	// @ts-ignore
	window.InseriCore = main
});
