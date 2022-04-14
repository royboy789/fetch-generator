declare let ace: Ace;

interface Ace {
	edit: (HTMLElement, any) => Editor;
	setOptions: (any) => void;
}

interface Editor {
	setOptions: (any) => void;
	setValue: (any) => void;
}
