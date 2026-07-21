import { Plugin, setIcon } from "obsidian";

export default class ToggleWindowModePlugin extends Plugin {
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
		const leftSplit = this.app.workspace.leftSplit;
		const isCompact = !win.isMaximized();

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

	private toggleSidebars(ribbonIconEl: HTMLElement) {
		const { leftSplit, rightSplit } = this.app.workspace;
		const isCollapsed = leftSplit.collapsed;

		if (isCollapsed) {
			leftSplit.expand();
			rightSplit.expand();
			setIcon(ribbonIconEl, "panel-left-close");
		} else {
			leftSplit.collapse();
			rightSplit.collapse();
			setIcon(ribbonIconEl, "panel-left-open");
		}
	}
}
