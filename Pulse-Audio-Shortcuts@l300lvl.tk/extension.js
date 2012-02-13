
const DBus = imports.dbus;
const Lang = imports.lang;
const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const GnomeSession = imports.misc.gnomeSession;
const VolumeMenu = imports.ui.status.volume;

// CHANGE THE LINES 'const SEPERATOR, const VOLUME...' etc ONLY, to true or false!!!
//options are true to show and false to not show, you must already have installed the programs for this to run them
//try: sudo apt install pavucontrol paprefs pavumeter pulseaudio-equalizer paman
const SEPERATOR = true;   //Shows a shiny seperator before the shortcuts
const VOLUME = true;   //Runs PA Volume Control PA=Pulse Audio
const PREFS = true;   //Runs PA Preferences
const VUMETER = true;   //Runs PA VU Meter
const EQUALIZER = true;   //Runs the PA 'System-Wide' Equalizer.
const MANAGER = true;   //Starts the PA Manager, which can be used to restart pulse audio.
//DONT DO NOT touch anything below this line

let pulseMenu;

function init() {
        pulseMenu = Main.panel._statusArea.volume;
}

function enable() {
        let paSeperator = SEPERATOR;
        let paVolume = VOLUME;
        let paPrefs = PREFS;
        let paVumeter = VUMETER;
        let paEqualizer = EQUALIZER;
        let paManager = MANAGER;
        let nItems = pulseMenu.menu.numMenuItems;

                    if (paSeperator == true) {
        itemSeparator = new PopupMenu.PopupSeparatorMenuItem();
        pulseMenu.menu.addMenuItem(itemSeparator, nItems - 3);
                    }
                    if (paVolume == true) {
        paVolume2 = pulseMenu.menu.addSettingsAction(_("PulseAudio Volume Control"), 'pavucontrol.desktop', 0);
        pulseMenu.menu.addMenuItem(paVolume2, nItems - 2);
                    }
                    if (paPrefs == true) {
        paPrefs2 = pulseMenu.menu.addSettingsAction(_("PulseAudio Preferences"), 'paprefs.desktop', 0);
        pulseMenu.menu.addMenuItem(paPrefs2, nItems - 2);
                    }
                    if (paVumeter == true) {
        paVumeter2 = pulseMenu.menu.addSettingsAction(_("PulseAudio Volume Meter"), 'pavumeter.desktop', 0);
        pulseMenu.menu.addMenuItem(paVumeter2, nItems - 2);
                    }
                    if (paEqualizer == true) {
        paEqualizer2 = pulseMenu.menu.addSettingsAction(_("PulseAudio Equalizer"), 'pulseaudio-equalizer.desktop', 0);
        pulseMenu.menu.addMenuItem(paEqualizer2, nItems - 2);
                    }
                    if (paManager == true) {
        paManager2 = pulseMenu.menu.addSettingsAction(_("PulseAudio Manager"), 'paman.desktop', 0);
        pulseMenu.menu.addMenuItem(paManager2, nItems - 2);
                    }
}

function disable() {
        let paSeperator = SEPERATOR;
        let paVolume = VOLUME;
        let paPrefs = PREFS;
        let paVumeter = VUMETER;
        let paEqualizer = EQUALIZER;
        let paManager = MANAGER;

                    if (paSeperator == true) {
        itemSeparator.destroy();
                    }
                    if (paVolume == true) {
        paVolume2.destroy();
                    }
                    if (paPrefs == true) {
        paPrefs2.destroy();
                    }
                    if (paVumeter == true) {
        paVumeter2.destroy();
                    }
                    if (paEqualizer == true) {
        paEqualizer2.destroy();
                    }
                    if (paManager == true) {
        paManager2.destroy();
                    }
}
