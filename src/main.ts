import { Plugin, setIcon } from "obsidian";

export default class ToggleWindowModePlugin extends Plugin {
	onload() {
		const ribbonIconEl = this.addRibbonIcon(
			"shrink",
			"Toggle window mode",
			() => this.toggleWindowMode(ribbonIconEl)
		);
	}

	onunload() {}

	private toggleWindowMode(ribbonIconEl: HTMLElement) {
		const win = require("electron").remote.getCurrentWindow();
		const leftSplit = this.app.workspace.leftSplit;
		const isCompact = leftSplit.collapsed;

		if (isCompact) {
			leftSplit.expand();
			win.maximize();
			setIcon(ribbonIconEl, "shrink");
		} else {
			leftSplit.collapse();
			win.unmaximize();
			setIcon(ribbonIconEl, "expand");
		}
	}
}
