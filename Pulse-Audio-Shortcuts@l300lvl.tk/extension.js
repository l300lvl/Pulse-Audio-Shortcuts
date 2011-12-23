/* find and read the sections starting BELOW "function enable()" */
const DBus = imports.dbus;
const Lang = imports.lang;
const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const GnomeSession = imports.misc.gnomeSession;
const VolumeMenu = imports.ui.status.volume;

let pulseMenu = Main.panel._statusArea.volume;

function pulseaMenu() {
	this._init();
}
pulseaMenu.prototype = {
	_init: function() {
//    pulseMenu._itemSeparator = new PopupMenu.PopupSeparatorMenuItem();
//    pulseMenu.menu.addMenuItem(pulseMenu._itemSeparator);
//    pulseMenu._paVolume = pulseMenu.menu.addSettingsAction(_("PulseAudio Volume Control"), 'pavucontrol.desktop');
//    pulseMenu.menu.addMenuItem(pulseMenu._paVolume);
//    pulseMenu._paPrefs = pulseMenu.menu.addSettingsAction(_("PulseAudio Preferences"), 'paprefs.desktop');
//    pulseMenu.menu.addMenuItem(pulseMenu._paPrefs);
//    pulseMenu._paPrefs = pulseMenu.menu.addSettingsAction(_("PulseAudio Preferences"), 'paprefs.desktop');
	}
}

function init() {
}

function enable() {

/* The next 2 lines ADD the seperator, to remove it just comment these out, but remember you must also comment out the disable function below */
    pulseMenu._itemSeparator = new PopupMenu.PopupSeparatorMenuItem();
    pulseMenu.menu.addMenuItem(pulseMenu._itemSeparator);
/* These below are the actual shortcuts, they only have one line each that needs to be commented out, or uncommented, along with their respective
lines in the disable function at the bottom. */
    pulseMenu._paVolume = pulseMenu.menu.addSettingsAction(_("PulseAudio Volume Control"), 'pavucontrol.desktop');
    pulseMenu._paPrefs = pulseMenu.menu.addSettingsAction(_("PulseAudio Preferences"), 'paprefs.desktop');
//    pulseMenu._paVumeter = pulseMenu.menu.addSettingsAction(_("PulseAudio Volume Meter"), 'pavumeter.desktop');
//    pulseMenu._paEqualizer = pulseMenu.menu.addSettingsAction(_("PulseAudio Equalizer"), 'pulseaudio-equalizer.desktop');
//    pulseMenu._paManager = pulseMenu.menu.addSettingsAction(_("PulseAudio Manager"), 'paman.desktop');
//      pulseMenu=new pulseaMenu();
}

function disable() {
// notice to disable the seperator their is only ONE line, to enable it there are 2.
    pulseMenu._itemSeparator.destroy();
    pulseMenu._paVolume.destroy();
    pulseMenu._paPrefs.destroy();
//    pulseMenu._paVumeter.destroy();
//    pulseMenu._paEqualizer.destroy();
//    pulseMenu._paManager.destroy();
//      pulseMenu._destroy();
}
