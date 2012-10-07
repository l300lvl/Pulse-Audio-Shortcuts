const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Lib = Extension.imports.lib;

function init()
{

}

function changeEnable(object, pspec, settings, index)
{
    if (object.active)
	Lib.addEnable(settings, index);
    else
	Lib.delEnable(settings, index);
}

function changeMenu(object, settings, text)
{
    settings.set_string('label-menu', text.get_text());
}

function buildPrefsWidget()
{
    let settings = Lib.getSettings('org.gnome.shell.extensions.PulseAudioShortcuts');

    let frame = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL, border_width: 10 });
//    let label = new Gtk.Label({ label: "<b>Settings</b>", use_markup: true, xalign: 0 });
    let vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL,
                             margin_left: 20 });


    let hboxMenu = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL});
    let labelMenu = new Gtk.Label({label: "Menu Label", xalign: 0});
    let valueMenu = new Gtk.Entry({ hexpand: true });
    valueMenu.set_text(settings.get_string('label-menu'));
    let buttonMenu = new Gtk.Button({ label: "Apply" });
    buttonMenu.connect("clicked", Lang.bind(buttonMenu, changeMenu, settings, valueMenu));

    hboxMenu.pack_start(labelMenu, true, true, 0);
    hboxMenu.add(valueMenu);
    hboxMenu.add(buttonMenu);
    vbox.add(hboxMenu);


    let settingItems = Lib.getSettingItems('apps.list');

    for (let indexSettingItem in settingItems)
    {
	let settingItem = settingItems[indexSettingItem];

	let hboxEnable = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL});
	let labelEnable = new Gtk.Label({label: settingItem['description'], xalign: 0});
	let valueEnable = new Gtk.Switch({active: Lib.isEnable(settings, indexSettingItem)});
	valueEnable.connect('notify::active', Lang.bind(valueEnable, changeEnable, settings, indexSettingItem));

	hboxEnable.pack_start(labelEnable, true, true, 0);
	hboxEnable.add(valueEnable);
	vbox.add(hboxEnable);
    }

//    frame.add(label);
    frame.add(vbox);
    frame.show_all();

    return frame;
}
