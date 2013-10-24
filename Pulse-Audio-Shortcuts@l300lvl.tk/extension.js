const St = imports.gi.St;
const Config = imports.misc.config;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Lib = Extension.imports.lib;

let volumeMenu;

function PulseAudioShortcuts(extensionMeta) {
    this.init(extensionMeta);
}

PulseAudioShortcuts.prototype =
{
    pulseShortcutsMenu: null,
    paprefsMenu: null,
    pavumeterMenu: null,
    paequalizerMenu: null,
    pamanMenu: null,
    qpaeqMenu: null,
    settingItems: null,

    settings: null,

    init: function(extensionMeta)
    {

    },

    launch: function(object, pspec, settingItem)
    {
	if (settingItem['desktop'] != null)
	{
	    let app = Shell.AppSystem.get_default().lookup_app(settingItem['desktop']);

	    if (app != null)
	    {
		app.activate();
		return;
	    }
	}

	if (settingItem['command'] != null)
	    Util.spawn([settingItem['command']]);
    },

    onParamChanged: function()
    {
	this.disable();
	this.enable();
    },
    
    enable: function()
    {
	this.settings = Lib.getSettings('org.gnome.shell.extensions.PulseAudioShortcuts');

	this.settingItems = Lib.getSettingItems("apps.list");

	this.pulseShortcutsMenu = new PopupMenu.PopupSubMenuMenuItem(this.settings.get_string('label-menu'));    

	let emptyMenu = true;

	let i = 4;
	for (let indexSettingItem in this.settingItems)
	{
	    if (Lib.isEnable(this.settings, indexSettingItem))
	    {
		let menuItem = new PopupMenu.PopupMenuItem(this.settingItems[indexSettingItem]['description'], 0);
		menuItem.connect('activate', Lang.bind(this, this.launch, this.settingItems[indexSettingItem]));
		this.pulseShortcutsMenu.menu.addMenuItem(menuItem, i++);

		emptyMenu = false;
	    }
	}

	if (emptyMenu == false)
	{
//	    let volumeMenu = Main.panel.statusArea.volume;

	    let index = 4;
	    let menuItems = volumeMenu.menu._getMenuItems();
	    for (let i = 0; i < menuItems.length; i++)
	    {    
		if (menuItems[i] == volumeMenu._inputSlider)
		{
		    index = i - 1;
		    break;
		}
	    }

	    volumeMenu.menu.addMenuItem(this.pulseShortcutsMenu, index);
	}

	this.settings.connect("changed::label-menu", Lang.bind(this, this.onParamChanged));
	this.settings.connect("changed::enable-items", Lang.bind(this, this.onParamChanged));
    },

    disable: function()
    {
	this.pulseShortcutsMenu.destroy();
    }
}

let age;

function init(extensionMeta) {
    let current_version = Config.PACKAGE_VERSION.split('.');
    if (current_version.length != 3 || current_version[0] != 3) throw new Error("Strange version number (extension.js:35).");
    
    switch (current_version[1]) {
        case"2": global.log("Warning of extension [" + metadata.uuid + "]:\n              Old development release detected (" + Config.PACKAGE_VERSION + "). You should upgrade!\n");   //eak
        case"3":  ;
        case"4": age = "old";
            break;
        case"5": global.log("Warning of extension [" + metadata.uuid + "]:\n              Development release detected (" + Config.PACKAGE_VERSION + "). Loading as a 3.6 release.\n"); //eak
        case"6": age = "new";
            break;
        case"8": age = "new2";
            break;
        case"10": age = "new3";
            break;
        default: throw new Error("Strange version number (extension.js:45).");
    }

    if (age=="old") volumeMenu = Main.panel._statusArea.volume;
    else if (age=="new") volumeMenu = Main.panel.statusArea.volume;
    else if (age=="new2") volumeMenu = Main.panel.statusArea.volume;
    else            volumeMenu = Main.panel.statusArea.aggregateMenu

    return new PulseAudioShortcuts(extensionMeta);
}
