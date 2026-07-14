import { App, Plugin, PluginSettingTab, Setting } from "obsidian";

interface ToggleWindowModePluginSettings {
	// Add plugin settings here as they're needed.
}

const DEFAULT_SETTINGS: ToggleWindowModePluginSettings = {};

export default class ToggleWindowModePlugin extends Plugin {
	settings: ToggleWindowModePluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ToggleWindowModePluginSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ToggleWindowModePluginSettingTab extends PluginSettingTab {
	plugin: ToggleWindowModePlugin;

	constructor(app: App, plugin: ToggleWindowModePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		new Setting(containerEl).setName("Toggle Window Mode").setHeading();
	}
}
