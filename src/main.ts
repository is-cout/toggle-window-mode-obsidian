import { Plugin, setIcon } from "obsidian";

export default class ToggleWindowModePlugin extends Plugin {
	private isWindowCompact = false;
	private areSidebarsOpen = true;

	onload() {
		const ribbonIconEl = this.addRibbonIcon(
			"shrink",
			"Toggle window mode",
			() => this.toggleWindowMode(ribbonIconEl)
		);

		const sidebarsRibbonIconEl = this.addRibbonIcon(
			"panel-left-close",
			"Toggle both sidebars",
			() => this.toggleSidebars(sidebarsRibbonIconEl)
		);
	}

	onunload() {}

	private toggleWindowMode(ribbonIconEl: HTMLElement) {
		const win = require("electron").remote.getCurrentWindow();
		const { leftSplit, rightSplit } = this.app.workspace;

		this.isWindowCompact = !this.isWindowCompact;

		if (this.isWindowCompact) {
			leftSplit.collapse();
			rightSplit.expand();
			win.unmaximize();
			setIcon(ribbonIconEl, "expand");
		} else {
			leftSplit.expand();
			win.maximize();
			setIcon(ribbonIconEl, "shrink");
		}
	}

	private toggleSidebars(ribbonIconEl: HTMLElement) {
		const { leftSplit, rightSplit } = this.app.workspace;

		this.areSidebarsOpen = !this.areSidebarsOpen;

		if (this.areSidebarsOpen) {
			if (leftSplit.collapsed) leftSplit.expand();
			if (rightSplit.collapsed) rightSplit.expand();
			setIcon(ribbonIconEl, "panel-left-close");
		} else {
			if (!leftSplit.collapsed) leftSplit.collapse();
			if (!rightSplit.collapsed) rightSplit.collapse();
			setIcon(ribbonIconEl, "panel-left-open");
		}
	}
}
