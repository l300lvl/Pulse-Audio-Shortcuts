const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Extension = imports.misc.extensionUtils.getCurrentExtension();

function getSettings(schema)
{
    const GioSSS = Gio.SettingsSchemaSource;

    let schemaDir = Extension.dir.get_child('schemas');
    let schemaSource;
    if (schemaDir.query_exists(null))
	schemaSource = GioSSS.new_from_directory(schemaDir.get_path(), GioSSS.get_default(), false);
    else
	schemaSource = GioSSS.get_default();
    
    let schemaObj = schemaSource.lookup(schema, true);
    if (! schemaObj)
	throw new Error('Schema ' + schema + ' could not be found for extension ' + Extension.metadata.uuid + '. Please check your installation.');
    
    return new Gio.Settings({settings_schema: schemaObj})
}

function isEnable(settings, index)
{
    let enableItems = settings.get_string('enable-items').split(";");

    for (let indexEnableItem in enableItems)
    {
	if (enableItems[indexEnableItem] == index)
	    return true;
    }

    return false;
}

function delEnable(settings, index)
{
    if (! isEnable(settings, index))
	return false;

    let enableItems = settings.get_string('enable-items').split(";");

    for (let indexEnableItem in enableItems)
    {
	if (enableItems[indexEnableItem] == index)
	    enableItems.splice(indexEnableItem, 1);
    }

    enableItems = settings.set_string('enable-items', enableItems.join(";"));

    return true;

}

function addEnable(settings, index)
{
    if (isEnable(settings, index))
	return false;

    let enableItems = settings.get_string('enable-items');

    if (enableItems.length > 0)
	enableItems += ";";

    enableItems += index.toString();

    settings.set_string('enable-items', enableItems);

    return true;
}

function getSettingItems(pathfile)
{
    let settingItems = new Array();

    let fileAppsList = GLib.file_get_contents(Extension.dir.get_path() + "/" + pathfile);
    let linesAppsList = ("" + fileAppsList[1]).split("\n");

    let i = 0;
    for (let index in linesAppsList)
    {
	if (linesAppsList[index] == "")
	    continue;
	
        let values = linesAppsList[index].split(";");
	
	settingItems[i] = new Array();
	settingItems[i]['description'] = values[0];
	settingItems[i]['desktop'] = values[1];
	settingItems[i++]['command'] = values[2];
    }

    return settingItems;
}
