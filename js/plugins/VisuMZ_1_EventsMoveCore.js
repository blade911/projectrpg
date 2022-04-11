//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.36;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.36] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: Map Switches and Variables
 * ============================================================================
 * 
 * Similar to Self Switches and Self Variables, Map Switches and Map Variables
 * are switches and variables that retain data based on the map the player is
 * currently located in. In other words, they're self switches and variables
 * but for maps instead!
 * 
 * These features do not exist in RPG Maker MZ by default. Just like with the
 * Self Switches and Self Variables, you can turn regular Switches or Variables
 * into Map Switches and Map Variables using the following name tag:
 * 
 * ---
 * 
 * <Map>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Map Switch/Variable.
 * 
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Map> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that map.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Map Switch or Map Variable's
 * value, you can use the following script calls:
 * 
 *   ---
 * 
 *   Get Map Switch Values:
 * 
 *   getMapSwitchValue(mapID, switchID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Example: getMapSwitchValue(4, 20)
 * 
 *   ---
 * 
 *   Get Variable Switch Values:
 * 
 *   getMapVariableValue(mapID, variableID)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Example: getMapVariableValue(6, 9)
 * 
 *   ---
 * 
 *   Set Map Switch Values:
 * 
 *   setMapSwitchValue(mapID, switchID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'switchID' with the ID number of the switch to get data.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - Example: setMapSwitchValue(4, 20, true)
 *   - Example: setMapSwitchValue(6, 9, false)
 * 
 *   ---
 * 
 *   Set Map Variable Values:
 * 
 *   setMapVariableValue(mapID, variableID, value)
 *   - Replace 'mapID' with the map ID the switch is located on.
 *   - Replace 'variableID' with the ID number of the variable to get data.
 *   - Replace 'value' with the value you want to set the Map Variable to.
 *   - Example: setMapVariableValue(6, 9, 420)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * <Hide Player>
 * <Show Player>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player sprite. This is so you don't need to
 *   manually turn the setting on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - If the player sprite is hidden, so are the player's followers.
 * - If the player sprite is visible, the player's followers will still depend
 *   on their settings.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * <Hide Followers>
 * <Show Followers>
 * 
 * - Used for: Map Notetags
 * - Forcefully hides or shows the player's followers. This is so you don't
 *   need to manually turn them on/off each time you enter a specific map.
 * - These settings will take priority over the event commands.
 * - These notetags are mutually exclusive from each other.
 * 
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Custom Z: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number value to determine the event sprite's Z value
 *   relative to the tilemap.
 * - For reference from rmmz_core.js:
 *   - 0 : Lower tiles
 *   - 1 : Lower characters
 *   - 3 : Normal characters
 *   - 4 : Upper tiles
 *   - 5 : Upper characters
 *   - 6 : Airship shadow
 *   - 7 : Balloon
 *   - 8 : Animation
 *   - 9 : Destination
 * - You can use numbers below 0 and above 9.
 *   - Values under 0 go below the tilemap.
 *   - Values above 9 go above everything else on the tilemap.
 *   - These values do NOT go below or above other screen objects that are
 *     NOT attached to the tilemap layer such as parallaxes or weather or
 *     windows because that's simply not how z-axis work with sprite layers.
 * 
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Mirror Sprite>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - The event sprite's visual appearance is mirrored.
 * 
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Synch Distance Opacity: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity of the event based on the distance between it and its
 *   move synched target. Closer means more opaque. Further away means more
 *   transparent.
 * - Replace 'x' with a number representing the opacity change per pixel
 *   distance away. 'x' can use decimal values like 1.05 and 1.5.
 * 
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Jump To Home
 * - Causes the event to jump to its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Crash Move to Home
 * - Moves the unit towards their home position on the map.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 * 
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Home
 * - Causes the event to take one step towards its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Home
 * - Causes the event to take one step away from its home position.
 * - This only works on events, not player characters or followers.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * 
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Home
 * - Causes the event to turn towards its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Home
 * - Causes the event to turn away from its home position.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * Teleport to Home
 * - Instantly teleports an event to its home position on the map.
 * - This only works on events, not player characters or followers.
 * 
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Sprite Based?:
 *   - Use sprite-based labels instead of legacy-window version.
 *   - Legacy-window version will not be supported in future.
 *   - Sprite-based labels are more memory efficient and work better
 *     compatibility-wise.
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.36: March 17, 2022
 * * Bug Fixes!
 * ** "Turn To Home" movement command now properly faces the home position.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.35: March 3, 2022
 * * IMPORTANT! Compatibility Update!
 * ** Compatibility Update with RPG Maker MZ 1.4.4.
 * *** For some reason this update broke any saves made before 1.4.4 was
 *     updated and they cannot be loaded. The only way saves would load is if
 *     you made a safe after 1.4.4 was done. This should be fixed and saves
 *     made with 1.4.3 and before should now be working. Update made by Irina.
 * 
 * Version 1.34: February 17, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** Arisu has created new event notetag/comment tags:
 * *** <Custom Z: x>
 * **** Replace 'x' with a number value to determine the event sprite's Z value
 *      relative to the tilemap.
 * **** View the helpfile for more information.
 * *** <Mirror Sprite>
 * **** The event sprite's visual appearance is mirrored.
 * *** <Move Synch Distance Opacity: x>
 * **** Changes the opacity of the event based on the distance between it and
 *      its move synched target. Closer means more opaque. Further away means
 *      more transparent.
 * ** Irina has created a more memory efficient version of Event Labels.
 * *** Plugin Parameters > Event Label Settings > Sprite Based?
 * **** Use sprite-based labels instead of legacy-window version.
 * **** Legacy-window version will not be supported in future.
 * 
 * Version 1.33: February 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu!
 * *** <Hide Player>
 * *** <Show Player>
 * **** Map Notetag. Forcefully hides or shows the player sprite. This is so
 *      you don't need to manually turn the setting on/off each time you enter
 *      a specific map.
 * *** <Hide Followers>
 * *** <Show Followers>
 * **** Map Notetag. Forcefully hides or shows the player's followers. This is
 *      so you don't need to manually turn them on/off each time you enter a
 *      specific map.
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Self Variable changes from custom move routes should no longer cause
 *    crashes. Fix made by Arisu.
 * ** Self Switch custom move route toggles should now work properly. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Better shadow tracking algorithm to remove any shadow twitching.
 *    Update made by Yanfly.
 * 
 * Version 1.31: January 6, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.30: November 25, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Map Switches and Map Variables added by Arisu:
 * *** Map Switches are self-switches for maps. Instead of using <Self>, use
 *     <Map> in the Switch name to designate it as a Map Switch. The ON/OFF
 *     data for that Switch will vary depending on the map the player is
 *     currently on.
 * *** Map Variables are self-variables for maps. Instead of using <Self>, use
 *     <Map> in the Variable name to designate it as a Map Switch. The number
 *     data for that Variable will vary depending on the map the player is
 *     currently on.
 * *** Script Calls have been added for these features as well.
 * **** See help file for them.
 * 
 * Version 1.29: October 7, 2021
 * * Bug Fixes!
 * ** Same map event spawning should now work properly without the need to add
 *    the current map ID to the preloaded map array. Update made by Arisu.
 * 
 * Version 1.28: September 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New move route commands added by Arisu:
 * *** Jump to Home
 * *** Move to Home
 * *** Crash Move to Home
 * *** Step Toward Home
 * *** Step Away From Home
 * *** Turn to Home
 * *** Turn Away From Home
 * *** Teleport to Home
 * **** These only work on events. Their actions should be reflective of what
 *      their command names suggest.
 * 
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_AutoMove
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_CallEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_DashEnable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLabel
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventLocation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_EventTimer
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Follower
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_GlobalVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_MorphEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerIcon
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PlayerMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfSwitch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SelfVar
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_SpawnEvent
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param SpriteBased:eval
 * @text Sprite Based?
 * @type boolean
 * @on Sprite-Based
 * @off Legacy-Window
 * @desc Use sprite-based labels instead of legacy-window version.
 * Legacy-window version will not be supported in future.
 * @default true
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

function _0x5b26(){const _0x3f4dea=['isNearTheScreen','Dock','_forceShowPlayer','NoUAt','nFjvD','DOWN','stop','vikSe','SvnUI','processMoveSynch','mGjbb','checkAdvancedSwitchVariablePresent','Game_Event_findProperPageIndex','contentsOpacity','PostMorphJS','setupPlayerVisibilityOverrides','note','UPPER\x20RIGHT','All','_mirrorSprite','_saveEventLocation','updateOpacity','correctFacingDirection','setControlledFollowerID','AcTxq','wDWsW','moveForward','isOnRope','isAnyEventStarting','cqyti','Sprite_Character_initMembers','processMoveRouteStepTo','initMoveSpeed','Game_Player_isMapPassable','_cacheVisibility','SelfSwitches','xEEZa','processMoveRouteMoveTo','akcHX','zuPSR','roundX','_working','regionId','filter','loadCPC','BqWCr','Game_Temp_setDestination','VisuMZ_1_MessageCore','setupCopyEvent','_filename','directionOnLadderSpriteVS8dir','createShadows','getSelfTarget','isDiagonalDirection','Game_Vehicle_isMapPassable','filename','turnRight90','_shadowSprite','createIconSprite','useCarryPoseForIcons','TeNMI','isDashingAndMoving','processMoveRouteMoveToCharacter','FSeVR','resetFontSettings','TargetSwitchId','isPlaytest','isActive','defaultFontSize','_event','isEventTest','dzsnU','Game_Troop_meetsConditions','Game_Troop_meetsConditionsCPC','mjZrx','zoomScale','Game_SelfSwitches_setValue','turnLeft90','updateSelfMovement','square','createBitmap','pXNKB','eventsXyNt','_expireCommonEvent','_moveRouteIndex','getPosingCharacterIndex','isEventClickTriggered','Game_Follower_initialize','includes','restoreSavedEventPosition','isPassableByAnyDirection','needsUpdate','zVwPb','vnsDt','LOVE','meetsSwitchCondition','IfZPG','hasEventIcon','activationRegionList','findProperPageIndex','PlayerIconDelete','processMoveRouteTeleportTo','BoatSpeed','setupRegionRestrictions','bBADx','Game_CharacterBase_updatePattern','hideShadows','Game_Event_updateParallel','setChaseOff','UWrGu','bDsmt','isMovementSucceeded','Setting','metCPC','iconIndex','MapSwitches','isDashing','forceCarrying','horz\x20mirror','XmHRf','OffsetY','hasClickTrigger','updateTilt','_reflection','pause','processMoveRouteMoveRepeat','drawText','PgFZC','Game_Timer_onExpire','eventId','OperateValues','updatePattern','backY','Player','dashSpeedModifier','hVbzh','parameters','setPattern','UNTITLED','SEAJA','Game_Enemy_meetsSwitchCondition','isLabelVisible','FollowerSetTargetChase','ITEM','processMoveSynchApproach','parent','string','Sprite_Balloon_setup','_spawnPreserved','FollowerID','getEventIconData','call','XGzET','isDestinationValid','kKETY','forceDashing','sbtNG','_stepPattern','reverseDir','JGQyC','processMoveRoutePatternLock','getPosingCharacterDirection','round','PZVAo','SelfVariables','skBKB','_scene','Ship','cxtQU','Hidden','vert\x20mirror','PlayerMovementDiagonal','Name','isWorking','TlHtA','Game_Message_add','AllForbid','setBalloonPose','Game_Player_increaseSteps','processMoveSynchMirrorHorz','_trigger','isPreventSelfMovement','isAdvancedVariable','Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1','pGdHe','length','HEART','LcNsF','deltaY','charAt','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','meetsConditions','DxIDY','jump','anSdb','labelWindowRange','processMoveRouteHugWall','setCommonEvent','Boat','Letter','_commonEvents','qHrIh','PvupA','command357','vehicle','mapValue','DashModifier','isNormalPriority','initMembersEventsMoveCore','opacityDelta','sCWMe','opacitySpeed','fWNSz','fzIlU','Self\x20Switch\x20%1','CommonEventID','add','dEBHE','_lastPluginCommandInterpreter','front','HMPH','jmOec','isAdvancedSwitch','drawIcon','absDistance','isShadowVisible','shadowFilename','spriteId','despawnEventId','AllAllow','roundYWithDirection','EventIconChange','lQDRS','_visiblePlayerY','EventTemplates','updateEventIconSprite','_diagonalSupport','_seconds','VehicleAllow','setBackgroundType','setFrames','split','USXVz','_paused','follower','meetsCPC','568uLRFaB','roundXWithDirection','KAzzf','_randomHomeY','ARRAYEVAL','OFF','increaseSteps','isOnLadder','roundY','XRryy','Game_Message_setItemChoice','RIGHT','realMoveSpeed','hasMoveOnlyRegions','clearPageSettings','bitmap','CPCsMet','text','Game_CharacterBase_isDashing','version','SPIN\x20ACW','PlayerIconChange','CallEvent','canPass','%1%2','KyHcD','setItemChoice','drawing','zuHew','some','MapId','tileHeight','iconHeight','shadowY','WXycE','makeDeepCopy','variableValid','_forceHideFollower','_moveRoute','OGPcn','lCfda','clamp','HoTyk','_followerControlID','%1Dock','Window_NumberInput_processOk','isSelfSwitch','YPEwj','wCSGz','KSOwq','chaseCharacter','AAuMq','Passability','scale','DnfWE','kSSOU','labelWindowText','_spawnedEvents','checkValidEventerMap','Game_Player_isDashing','clearDashing','Game_Event_meetsConditionsCPC','Rope','deltaX','BlendMode','exit','checkActivationProximity','_labelWindows','uCByk','EventAutoMovement','pageIndex','updateShadow','XDYwz','setDiagonalDirection','isStopFollowerChasing','turnTowardPoint','muKVO','982536SIZlcE','pKGYt','checkExistingEntitiesAt','VJEKV','VisibleEventLabels','_eventLabelOffsetX','_target','adjustDir8MovementSpeed','_interpreter','zHNRY','mYWrn','cpMuk','player','processMoveSynchReverseMimic','Game_Event_meetsConditions','LtmCz','BTYuC','_selfEvent','Game_CharacterBase_characterIndex','cIbhL','USER-DEFINED\x202','TurnInPlaceDelay','Game_CharacterBase_initMembers','_vehicleType','EVAL','_eventPageIndex','bufferX','VariableGetSelfVariableID','TUgpA','gGNkm','KEonz','isCollidedWithPlayerCharacters','LEFT','processMoveRouteJumpForward','qnvHv','_encounterEffectDuration','ktFmJ','reaXe','VtQMV','isPlayerControlDisabled','createContents','mirror\x20vertical','MoveAllSynchTargets','_inputTime','replace','BalloonOffsetY','_regionRules','switch2Valid','update','KuutC','target','isAirshipPassable','Settings','NOTE','Label','isAutoBufferIcon','IconSet','fontFace','padding','_opacity','resume','BitmapSmoothing','updateParallel','removeMorph','forceMoveRoute','iconWidth','despawnRegions','NyxlG','_screenZoomScale','kWwSg','zddij','NSpGB','AdvancedVariables','onDatabaseLoaded','qEOLn','areFollowersForceHidden','contents','_lastMovedDirection','_eventIconSprite','AutoBalloon','processMoveSynchMimic','_visibleEventX','Visibility','jRRmv','processMoveRouteSelfVariable','activationProximityDistance','setPlayerControlDisable','WhaYn','updatePeriodicRefresh','_character','turnTowardCharacter','convertVariableValuesInScriptCall','firstSpawnedEvent','distance','TRUE','%1Allow','RegionOkTarget','tileWidth','getPosingCharacterPattern','_realY','WalkForbid','IconIndex','erase','MEqNh','setEventIconDataKey','OXEQE','UeevD','_characterName','isMoveOnlyRegionPassable','_randomHomeX','ConvertParams','abs','bind','autoEventIconBuffer','isSmartEventCollisionOn','findTargetSprite','_selfTargetItemChoice','Game_Map_refresh','refreshIfNeeded','CarryPose','VehicleDock','prototype','updatePatternEventsMoveCore','ADDITIVE','VS8','rotation','hhjNq','Game_Player_executeMove','vCxPl','isInVehicle','ncvzf','Step2EventId','Walk','eraseEvent','ARRAYJSON','standing','left','parse','OQaqz','_duration','prepareSpawnedEventAtTerrainTag','Game_Timer_start','isBoat','PlayerAllow','BufferX','EdZWS','updateBitmapSmoothing','ElxMa','resizeWindow','dnGWT','_pageIndex','_stopCount','switch2Id','posNt','MoveRouteIndex','MitqA','_moveOnlyRegions','character','deleteIconsOnEventsData','PosY','reverse','deleteSavedEventLocationKey','processMoveCommandEventsMoveCore','canStartLocalEvents','floor','UGuRx','regionList','SILENCE','setEventLabelsVisible','bJAKt','scrolledY','processMoveRouteStepFrom','list','processMoveSynchCustom','Game_Event_isCollidedWithPlayerCharacters','mirror\x20horz','reserveCommonEvent','Nxazp','_DisablePlayerControl','airship','_EventsMoveCoreSettings','mapId','createProxyWindow','CustomPageConditions','copy','Game_CharacterBase_update','updateEventsMoveCoreTagChanges','MapVariables','SWEAT','_forceCarrying','LOWER\x20RIGHT','moveAwayFromPoint','General','Collision','row','code','Airship','checkEventTriggerThere','WouCK','pageId','ShipSpeed','isBigCharacter','HcQYp','TiltVert','KMTgz','_PreservedEventMorphData','Spriteset_Map_createLowerLayer','getInputDirection','fontSize','convertSelfVariableValuesInScriptCall','_proxyWindow','USER-DEFINED\x204','_callEventMap','EnableDir8','wCWok','Game_Map_events','BIpcZ','MorphEventTo','processMoveRouteMoveUntilStop','EKwWz','_characterIndex','_eventScreenY','meetActivationRegionConditions','Scene_Load_onLoadSuccess','Drjsq','vGVPI','2218866gSgHpY','VisuMZ_0_CoreEngine','RegionOk','_eventSpawnData','iconSize','onCancel','Game_Vehicle_initMoveSpeed','_eventLabelOffsetY','bFane','Lfyqy','LIGHT\x20BULB','variableId','_data','clearStepPattern','iHgUc','isAirship','timer','Game_Player_getInputDirection','_moveSynch','BufferY','OTZTa','processMoveRouteBalloon','Game_Interpreter_PluginCommand','meetActivationProximityConditions','processMoveRouteStepToCharacter','wEXQp','Chase','onClickTrigger','PreMorphJS','getDirectionToPoint','_MapSpawnedEventData','parallelCommonEvents','LVDqS','isAllowCharacterTilt','_activationProximity','registerSelfEvent','updatePose','initFollowerController','switches','Nibal','CuqCI','UYkNe','EventTimerFramesGain','onOk','_activationProximityAutoTriggerBypass','Game_Map_setup','executeMoveDir8','isLandOk','zIHOJ','dir8','PreloadedMaps','1491285fjlpWo','spawnPreserved','Scene_Boot_onDatabaseLoaded','prepareSpawnedEventAtXY','clearCarrying','Self\x20Variable\x20%1','PostCopyJS','setupEventsMoveCoreCommentTags','startMapCommonEventOnTouch','lKehd','MTNCA','VariableId','VehicleForbid','biLHJ','lKcxv','push','Game_Timer_initialize','updateEventMirrorSprite','fittingHeight','jjnBz','width','checkEventsMoveCoreStringTags','onChange','ANGER','_eventMorphData','WalkAllow','setNumberInput','NUM','setAllowEventAutoMovement','EventTimerExpireClear','updateShadowChanges','registerCommand','updateMoveSynch','log','LEFT\x20TO\x20RIGHT','setPose','Game_CharacterBase_direction','QUESTION','SslOl','clearSpriteOffsets','updateMove','_EventIcons','getEventIconIndex','dKkzs','_forceHidePlayer','deltaYFrom','JriaH','Step1MapId','xzGXh','isSpriteVS8dir','_forceShowFollower','Game_System_initialize','awRPX','checkRegionEventTrigger','setupSpawnedEvents','_eventId','isTransparent','WefjK','characterPatternYVS8','_eventOverloadThreshold','Game_Player_checkEventTriggerHere','characterName','opacity','Value','posEventsMoveCore','Game_Map_update','Window_NumberInput_start','lXEBT','66MgVBXT','characterIndex','processMoveRouteJumpToCharacter','max','map','_eventErased','addChild','template','oGEIq','setValue','drawTextEx','format','Game_CharacterBase_pattern','ShowShadows','_selfTarget','blendMode','_saveEventLocations','getPlayerDiagonalSetting','_pattern','setLastPluginCommandInterpreter','hKITB','mDYGE','_erased','Map%1-Event%2','setDirection','timerText','BalloonOffsetX','VICTORY','variables','_eventCache','updateEventCustomZ','isPlayerForceShown','setOpacity','isSupportDiagonalMovement','Disable','Sprite_Character_setTileBitmap','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','deletePreservedMorphEventDataKey','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','setup','pAdSL','processMoveSynchAway','eventLabelsVisible','isPlayerForceHidden','POyjy','findDirectionTo','MUSIC\x20NOTE','pages','eYqNB','locate','oxwIs','iASTZ','lQoUx','isDashDisabled','USER-DEFINED\x205','Scene_Map_startEncounterEffect','lastSpawnedEventID','xMjmC','_needsRefresh','IMFar','htSpF','_frames','getControlledFollowerID','isTargetEventValidForLabelWindow','_CPCs','Window_EventItem_onOk','Map\x20%1\x20Switch\x20%2','create','frameCount','pBlkQ','ARRAYFUNC','switch1Valid','SLEEP','isSpawnedEvent','Game_Interpreter_executeCommand','TerrainTag','Game_Character_setMoveRoute','setupSaveEventLocations','CVRrj','advancedValue','_PlayerDiagonalSetting','clearEventCache','FollowerReset','processOk','selfValue','setupFollowerVisibilityOverrides','delay','SXwkl','Sprite_Balloon_updatePosition','Template','execute','checkCollisionKeywords','isShadowShrink','EventsMoveCore','LOWER\x20LEFT','Game_SelfSwitches_value','isEventRunning','Game_Map_parallelCommonEvents','huWyy','description','screenX','default','290CJIuRL','RemovePreserve','StopAutoMoveEvents','setMapValue','DRzjT','down','_dragonbones','MapID','getInputDir8','TjTDc','KNEEL','OoOsu','gfkuz','processMoveRouteFadeOut','eZHOE','fBGxD','events','clearSelfTarget','processMoveRouteFadeIn','YsFjg','turnAwayFromCharacter','vertical\x20mirror','ZIowb','SelfSwitchABCD','KwZMa','Game_Interpreter_character','_commonEventId','Map%1.json','hasStepAnime','EventIconDelete','Game_Map_event','OffsetX','FUNC','TargetVariableId','savePreservedMorphEventDataKey','nwDhS','LIGHT-BULB','_moveSpeed','ARRAYNUM','TiltRight','jETHr','ZiSBP','IconBlendMode','SpawnEventAtTerrainTag','splice','disable','fcmmN','Window_ScrollText_startMessage','SwitchGetSelfSwitchABCD','SPIN\x20COUNTERCLOCKWISE','setupDiagonalSupport','padZero','getLastPluginCommandInterpreter','TOGGLE','Icon','RIGHT\x20TO\x20LEFT','DefaultShadow','event','$callEventMap','lineHeight','_selfTargetNumberInput','EventTimerExpireEvent','HVLqO','JbiXK','Game_Character_processMoveCommand','_advancedSwitchVariable','trim','clear','EnableTurnInPlace','_moveAllowPlayerCollision','textSizeEx','Plugin\x20Parameters\x20>\x20Event\x20Template\x20Settings\x20>\x0a','UVolL','setupSpawn','aaKbS','return\x200','zmlTV','_eventOverload','_pose','BRXZY','Sprite_Character_characterPatternY','shadowX','moveSynchTarget','createSpawnedEvent','QyTZG','updateVS8BalloonOffsets','switchId','region','ZPUZl','isAllowEventAutoMovement','FollowerSetControl','setStopFollowerChasing','Step1EventId','backX','STRUCT','SpawnEventDespawnAtXY','_eventScreenX','hHfaw','startEncounterEffect','registerSelfTarget','isRegionForbidPass','Game_Event_updateSelfMovement','anchor','awAeE','boxWidth','Game_Switches_setValue','concat','_counter','_periodicRefreshTimer','HqnXS','%1DockRegionOnly','isMoving','PreSpawnJS','canPassDiagonally','_cpc','_speed','_addedHitbox','min','setupEventsMoveCoreNotetags','offsetX','setDashingEnabled','sDxcr','Game_CharacterBase_canPass','Window_EventItem_onCancel','pBSkY','MorphEventRemove','elRGW','removeTemporaryMapSpawnedEvents','cKTSg','getDirectionFromPoint','eventsXy','checkEventTriggerHere','OpacitySpeed','ithJX','ZZZ','type','isMapSwitch','offsetY','Game_Switches_value','characterPatternYBasic','processMoveRouteJumpTo','onLoadSuccess','remove','ORGmB','getMapSpawnedEventData','EventTimerResume','updateText','lastSpawnedEvent','Game_CharacterBase_screenY','_followerChaseOff','process_VisuMZ_EventsMoveCore_Switches_Variables','checkEventTriggerEventsMoveCore','Game_CharacterBase_opacity','moveTypeRandom','processMoveRouteSetIndex','Game_CharacterBase_moveStraight','isBattleTest','COLLAPSE','HURT','createSaveEventLocationData','moveTowardPoint','saveEventLocation','_spriteset','rrTLv','dBBvR','Game_Event_checkEventTriggerAuto','setupEventsMoveCoreEffects','despawnAtXY','command108','GetMoveSynchTarget','clearPose','custom','_customZ','14693XrOezv','isDashingEnabled','Game_CharacterBase_realMoveSpeed','bufferY','AirshipSpeed','checkSmartEventCollision','isValid','activationProximityType','PosX','bAGIQ','oKLfl','MOEvl','zTwfv','toLowerCase','name','FastForwardKey','EXCLAMATION','processMoveRouteSelfSwitch','684069fTQYxb','startCallEvent','EventLocationSave','_type','advancedFunc','Game_Event_start','addLoadListener','randomInt','approach','processMoveSynchMirrorVert','gFmeL','referEvent','blt','initialize','UGfRO','moveBackToRandomHome','Game_Event_setupPageSettings','deleteSavedEventLocation','height','outlineColor','uBVjq','SuccessSwitchId','onExpire','of\x20Preloaded\x20Maps.\x0a\x0a','getPose','Map\x20%1\x20Variable\x20%2','value','visible','Visible','_SavedEventLocations','nzJNW','SCREEN','MULTIPLY','IsSjv','return\x20%1','autosaveEventLocation','screenY','unlock','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','Game_Vehicle_isLandOk','EventLocationDelete','_alwaysUpdateMove','_waitMode','adqUr','initMembers','createShadow','50823KRqghN','EventLabelVisible','jvxSv','start','IconSize','_hidden','hasCPCs','RDlcr','right','_patternLocked','UyqWc','GZycI','fAxVX','_needsPeriodicRefresh','RycHS','Game_Event_initialize','EventId','Game_CharacterBase_hasStepAnime','Frames','IcrGM','DashingEnable','xHsSb','updatePosition','ANNOYED','_characterSprites','initEventsMoveCore','ZlYxb','slice','deleteIconsOnEventsDataKey','morphIntoTemplate','rHhSP','_clickTrigger','koXma','indexOf','morphInto','isTile','boat','setupSpawnTest','_cacheSystemVisible','SpawnEventDespawnTerrainTags','tqoKB','Allow','oJIji','_forceDashing','isSpawnHitboxCollisionOk','checkNeedForPeriodicRefresh','dOQpj','Toggle','TemplateName','isEventOverloaded','updateScale','10033uoZvwn','Game_Message_setNumberInput','characterPatternY','Step2MapId','lzksx','EventID','OLvZq','isJumping','rwSqJ','_poseDuration','trigger','Game_Player_checkEventTriggerThere','unlockEvent','setSelfValue','YodEE','FRUSTRATION','determineCommonEventsWithCPC','_spriteOffsetX','Game_Character_forceMoveRoute','KeEYV','setCharacterBitmap','processMoveRouteTeleportToCharacter','_eventCopyData','IkKAe','ship','pJsMu','isPosing','refresh','moveSynchType','Game_CharacterBase_screenX','PreCopyJS','_callEventData','mirror\x20horizontal','Game_Variables_setValue','_spriteOffsetY','IAdno','UPPER\x20LEFT','NORMAL','_tilemap','setTileBitmap','_text','away','QhlnP','isMapVariable','WCxwG','startMapCommonEventOnOKTarget','pRlBw','hasAdvancedSwitchVariable','setDestination','Region%1','COBWEB','Movement','PDMig','Game_CharacterBase_isTransparent','EventAllow','createCharacterShadow','gainFrames','processDrawIcon','Game_Follower_chaseCharacter','OeCpz','Game_CharacterBase_increaseSteps','setupPageSettings','qBsUx','setWaitMode','moveAwayFromCharacter','jKShO','Set\x20this\x20up\x20in\x20Events\x20&\x20Movement\x20Core\x27s\x0a','AmjPy','clearDestination','getPreservedMorphEventData','createSpawnedEventWithData','processMoveSynchRandom','_spawnData','Game_Map_unlockEvent','turnAwayFromPoint','adjustMoveSynchOpacityDelta','Window_Message_startMessage','VZAil','MUSIC','mainFontSize','pattern','Seconds','isRunning','changeSpeed','isVisible','switch1Id','processMoveRouteAnimation','isSaveEventLocations','_comments','_randomMoveWeight','Game_CharacterBase_moveDiagonally','vtyKY','Region','MessageCore','despawnTerrainTags','LineHeight','AdvancedSwitches','hasDragonbones','moveStraight','Minutes','constructor','initEventsMoveCoreEffects','LIGHT','yEaeO','executeMove','hdldV','VisuMZ_Setup_Preload_Map','windowPadding','chyRs','kWTtY','setupEvents','setImage','dKlaC','xfDaG','WLIUi','EventTimerPause','none','qWrAl','setEventIconData','moveDiagonally','_visiblePlayerX','lastMovedDirection','createLabelWindowForTarget','updateRoutineMove','PreloadMaps','CPC','IconBufferY','_eventIcon','plZtk','visibleRange','loadDataFile','DUvDf','Sprite_Character_setCharacterBitmap','inBattle','Game_Map_setupEvents','YwBTl','VisibleRange','cIlAi','RfHVt','itemPadding','You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a','canMove','isPassable','PlayerForbid','executeCommand','direction','processMoveCommand','Ayddf','_chaseOff','NUnri','random','page','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20remove\x20usage.','LIGHTBULB','bYobx','_labelWindow','%1:%2','_mapId','Game_Interpreter_updateWaitMode','status','Stop','usBll','SwitchId','SPIN\x20CLOCKWISE','spawnEventId','startMessage','StrictCollision','horizontal\x20mirror','despawnEverything','Speed','pos','startMapCommonEventOnOK','StopAutoMoveMessages','Enable','loadSystem','destinationY','EventTimerSpeed','deleteEventLocation','Game_Variables_value','setMoveSpeed','isRegionDockable','SpriteBased','_realX','Game_CharacterBase_setDirection','setPlayerDiagonalSetting','match','requestAnimation','Preserve','Game_Event_moveTypeRandom','dWIbH','PageId','checkEventTriggerAuto','_shadowGraphic','followers','prepareSpawnedEventAtRegion','isMapPassable','FSovd','isRegionAllowPass','Game_Map_isDashDisabled','isTriggerIn','createLabelWindows','Forbid','_shadowOpacity','isSaveEventLocation','Game_Event_locate','TiltLeft','setupMorphEvent','deltaXFrom','updateWaitMode','_visibleEventY','frontX','terrainTag','niNvq','setFrame','findDiagonalDirectionTo','pluginCommandCallEvent','IconBufferX','Game_Event_clearPageSettings','toUpperCase','FontSize'];_0x5b26=function(){return _0x3f4dea;};return _0x5b26();}const _0x116828=_0x4592;(function(_0x44cca5,_0x2aa679){const _0x3aabc6=_0x4592,_0x240b0a=_0x44cca5();while(!![]){try{const _0x7dd425=parseInt(_0x3aabc6(0x501))/0x1*(parseInt(_0x3aabc6(0x37b))/0x2)+-parseInt(_0x3aabc6(0x4a0))/0x3+-parseInt(_0x3aabc6(0x222))/0x4+parseInt(_0x3aabc6(0x337))/0x5+parseInt(_0x3aabc6(0x304))/0x6+parseInt(_0x3aabc6(0x48e))/0x7*(-parseInt(_0x3aabc6(0x1d5))/0x8)+-parseInt(_0x3aabc6(0x4ce))/0x9*(parseInt(_0x3aabc6(0x3e1))/0xa);if(_0x7dd425===_0x2aa679)break;else _0x240b0a['push'](_0x240b0a['shift']());}catch(_0x267b9c){_0x240b0a['push'](_0x240b0a['shift']());}}}(_0x5b26,0x33ee4));var label='EventsMoveCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x116828(0x608)](function(_0x3640b0){const _0x332dcb=_0x116828;return _0x3640b0[_0x332dcb(0x5a0)]&&_0x3640b0[_0x332dcb(0x3de)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x116828(0x256)]||{},VisuMZ[_0x116828(0x290)]=function(_0x2d2101,_0x17a5ff){const _0x3b0f93=_0x116828;for(const _0x108ebc in _0x17a5ff){if(_0x108ebc['match'](/(.*):(.*)/i)){if(_0x3b0f93(0x2ec)!==_0x3b0f93(0x2ec))_0x5cc59a=_0x2ed1f9[_0x3b0f93(0x1f8)](_0x2cb8c1),_0x46c001[_0x3b0f93(0x3d8)][_0x3b0f93(0x3c7)]['call'](this,_0x197a2e);else{const _0x40be78=String(RegExp['$1']),_0x5ef8bd=String(RegExp['$2'])[_0x3b0f93(0x5db)]()[_0x3b0f93(0x423)]();let _0xc511fc,_0x4a7e37,_0x23c8d1;switch(_0x5ef8bd){case _0x3b0f93(0x352):_0xc511fc=_0x17a5ff[_0x108ebc]!==''?Number(_0x17a5ff[_0x108ebc]):0x0;break;case _0x3b0f93(0x407):_0x4a7e37=_0x17a5ff[_0x108ebc]!==''?JSON[_0x3b0f93(0x2ab)](_0x17a5ff[_0x108ebc]):[],_0xc511fc=_0x4a7e37[_0x3b0f93(0x37f)](_0x2f6a8a=>Number(_0x2f6a8a));break;case _0x3b0f93(0x23a):_0xc511fc=_0x17a5ff[_0x108ebc]!==''?eval(_0x17a5ff[_0x108ebc]):null;break;case _0x3b0f93(0x1d9):_0x4a7e37=_0x17a5ff[_0x108ebc]!==''?JSON[_0x3b0f93(0x2ab)](_0x17a5ff[_0x108ebc]):[],_0xc511fc=_0x4a7e37[_0x3b0f93(0x37f)](_0x350184=>eval(_0x350184));break;case'JSON':_0xc511fc=_0x17a5ff[_0x108ebc]!==''?JSON[_0x3b0f93(0x2ab)](_0x17a5ff[_0x108ebc]):'';break;case _0x3b0f93(0x2a8):_0x4a7e37=_0x17a5ff[_0x108ebc]!==''?JSON[_0x3b0f93(0x2ab)](_0x17a5ff[_0x108ebc]):[],_0xc511fc=_0x4a7e37[_0x3b0f93(0x37f)](_0xa479c5=>JSON[_0x3b0f93(0x2ab)](_0xa479c5));break;case _0x3b0f93(0x401):_0xc511fc=_0x17a5ff[_0x108ebc]!==''?new Function(JSON['parse'](_0x17a5ff[_0x108ebc])):new Function(_0x3b0f93(0x42c));break;case _0x3b0f93(0x3c1):_0x4a7e37=_0x17a5ff[_0x108ebc]!==''?JSON[_0x3b0f93(0x2ab)](_0x17a5ff[_0x108ebc]):[],_0xc511fc=_0x4a7e37[_0x3b0f93(0x37f)](_0x260b00=>new Function(JSON[_0x3b0f93(0x2ab)](_0x260b00)));break;case'STR':_0xc511fc=_0x17a5ff[_0x108ebc]!==''?String(_0x17a5ff[_0x108ebc]):'';break;case'ARRAYSTR':_0x4a7e37=_0x17a5ff[_0x108ebc]!==''?JSON[_0x3b0f93(0x2ab)](_0x17a5ff[_0x108ebc]):[],_0xc511fc=_0x4a7e37['map'](_0x2934eb=>String(_0x2934eb));break;case _0x3b0f93(0x43f):_0x23c8d1=_0x17a5ff[_0x108ebc]!==''?JSON['parse'](_0x17a5ff[_0x108ebc]):{},_0x2d2101[_0x40be78]={},VisuMZ[_0x3b0f93(0x290)](_0x2d2101[_0x40be78],_0x23c8d1);continue;case'ARRAYSTRUCT':_0x4a7e37=_0x17a5ff[_0x108ebc]!==''?JSON[_0x3b0f93(0x2ab)](_0x17a5ff[_0x108ebc]):[],_0xc511fc=_0x4a7e37['map'](_0x3ebf7c=>VisuMZ[_0x3b0f93(0x290)]({},JSON['parse'](_0x3ebf7c)));break;default:continue;}_0x2d2101[_0x40be78]=_0xc511fc;}}}return _0x2d2101;},(_0x375293=>{const _0xcdd3f4=_0x116828,_0x3f238d=_0x375293['name'];for(const _0x5f4814 of dependencies){if('BMDQf'!==_0xcdd3f4(0x5e1)){if(!Imported[_0x5f4814]){if(_0xcdd3f4(0x2fa)!==_0xcdd3f4(0x572)){alert(_0xcdd3f4(0x19d)[_0xcdd3f4(0x386)](_0x3f238d,_0x5f4814)),SceneManager[_0xcdd3f4(0x216)]();break;}else this[_0xcdd3f4(0x375)]-=this[_0xcdd3f4(0x1b2)]();}}else{this[_0xcdd3f4(0x4db)]=!![];return;}}const _0x30f284=_0x375293[_0xcdd3f4(0x3de)];if(_0x30f284[_0xcdd3f4(0x5ba)](/\[Version[ ](.*?)\]/i)){const _0x5cb656=Number(RegExp['$1']);_0x5cb656!==VisuMZ[label][_0xcdd3f4(0x1e8)]&&(alert(_0xcdd3f4(0x3a1)[_0xcdd3f4(0x386)](_0x3f238d,_0x5cb656)),SceneManager['exit']());}if(_0x30f284['match'](/\[Tier[ ](\d+)\]/i)){if(_0xcdd3f4(0x439)===_0xcdd3f4(0x439)){const _0x2343c7=Number(RegExp['$1']);if(_0x2343c7<tier){if(_0xcdd3f4(0x619)===_0xcdd3f4(0x619))alert(_0xcdd3f4(0x39f)[_0xcdd3f4(0x386)](_0x3f238d,_0x2343c7,tier)),SceneManager[_0xcdd3f4(0x216)]();else{if(this['_moveOnlyRegions']===_0x5e51df)this[_0xcdd3f4(0x566)]();return this[_0xcdd3f4(0x2be)][_0xcdd3f4(0x198)]>0x0;}}else tier=Math['max'](_0x2343c7,tier);}else _0x2bd728[_0xcdd3f4(0x3d8)][_0xcdd3f4(0x5da)][_0xcdd3f4(0x176)](this),this[_0xcdd3f4(0x566)]();}VisuMZ[_0xcdd3f4(0x290)](VisuMZ[label][_0xcdd3f4(0x256)],_0x375293[_0xcdd3f4(0x167)]);})(pluginData),VisuMZ[_0x116828(0x161)]=function(_0x43e26c,_0x4239c7,_0x10cec9){switch(_0x10cec9){case'=':return _0x4239c7;break;case'+':return _0x43e26c+_0x4239c7;break;case'-':return _0x43e26c-_0x4239c7;break;case'*':return _0x43e26c*_0x4239c7;break;case'/':return _0x43e26c/_0x4239c7;break;case'%':return _0x43e26c%_0x4239c7;break;}return _0x43e26c;},PluginManager['registerCommand'](pluginData[_0x116828(0x49c)],'AutoMoveEvents',_0x184f47=>{const _0xdb6b89=_0x116828;VisuMZ[_0xdb6b89(0x290)](_0x184f47,_0x184f47);switch(_0x184f47[_0xdb6b89(0x376)]){case'Allow':$gameSystem['setAllowEventAutoMovement'](!![]);break;case _0xdb6b89(0x5a1):$gameSystem[_0xdb6b89(0x353)](![]);break;case'Toggle':$gameSystem[_0xdb6b89(0x353)](!$gameSystem[_0xdb6b89(0x43a)]());break;}}),PluginManager[_0x116828(0x356)](pluginData['name'],_0x116828(0x1eb),_0x1019f0=>{const _0x12a996=_0x116828;VisuMZ[_0x12a996(0x290)](_0x1019f0,_0x1019f0);const _0x415d4b=$gameTemp[_0x12a996(0x415)](),_0x44d2d5={'mapId':_0x1019f0[_0x12a996(0x1f3)],'eventId':_0x1019f0[_0x12a996(0x4de)]||_0x415d4b['eventId'](),'pageId':_0x1019f0[_0x12a996(0x5bf)]};if(_0x44d2d5['mapId']<=0x0)_0x44d2d5[_0x12a996(0x2d7)]=$gameMap?$gameMap[_0x12a996(0x2d7)]():0x1;$gameTemp[_0x12a996(0x415)]()[_0x12a996(0x5d8)](_0x44d2d5);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'DashEnableToggle',_0x49d485=>{const _0xcdf5d9=_0x116828;VisuMZ['ConvertParams'](_0x49d485,_0x49d485);switch(_0x49d485[_0xcdf5d9(0x376)]){case _0xcdf5d9(0x5ae):$gameSystem[_0xcdf5d9(0x459)](!![]);break;case _0xcdf5d9(0x39d):$gameSystem['setDashingEnabled'](![]);break;case'Toggle':$gameSystem['setDashingEnabled'](!$gameSystem[_0xcdf5d9(0x48f)]());break;}}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x1c6),_0x53e016=>{const _0xa6e226=_0x116828;VisuMZ[_0xa6e226(0x290)](_0x53e016,_0x53e016);const _0x553a71=$gameTemp[_0xa6e226(0x415)]();_0x53e016[_0xa6e226(0x1f3)]=_0x53e016[_0xa6e226(0x1f3)]||$gameMap[_0xa6e226(0x2d7)](),$gameSystem['setEventIconDataKey'](_0x53e016[_0xa6e226(0x1f3)],_0x53e016[_0xa6e226(0x4de)]||_0x553a71['eventId'](),_0x53e016['IconIndex'],_0x53e016[_0xa6e226(0x5d9)],_0x53e016[_0xa6e226(0x57f)],_0x53e016[_0xa6e226(0x40b)]);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x3fe),_0x3856ca=>{const _0x353ba7=_0x116828;VisuMZ[_0x353ba7(0x290)](_0x3856ca,_0x3856ca);const _0x26a87e=$gameTemp[_0x353ba7(0x415)]();_0x3856ca[_0x353ba7(0x1f3)]=_0x3856ca['MapId']||$gameMap['mapId'](),$gameSystem[_0x353ba7(0x4ea)](_0x3856ca['MapId'],_0x3856ca['EventId']||_0x26a87e[_0x353ba7(0x160)]());}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'EventLabelRefresh',_0x1eafcc=>{const _0x29b4af=_0x116828;if($gameMap)for(const _0x2953cf of $gameMap['events']()){_0x29b4af(0x20c)!==_0x29b4af(0x2ee)?_0x2953cf['refresh']():this['_forceCarrying']=!![];}}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x4cf),_0x36911b=>{const _0x321710=_0x116828;VisuMZ[_0x321710(0x290)](_0x36911b,_0x36911b);switch(_0x36911b[_0x321710(0x274)]){case _0x321710(0x4bc):$gameSystem[_0x321710(0x2ca)](!![]);break;case _0x321710(0x188):$gameSystem['setEventLabelsVisible'](![]);break;case _0x321710(0x4fd):$gameSystem[_0x321710(0x2ca)](!$gameSystem[_0x321710(0x3a5)]());break;}}),PluginManager[_0x116828(0x356)](pluginData['name'],_0x116828(0x4a2),_0x359aaa=>{const _0x3bed8e=_0x116828;VisuMZ[_0x3bed8e(0x290)](_0x359aaa,_0x359aaa);const _0x38cf4b=$gameTemp[_0x3bed8e(0x415)]();if(!$gameMap)return;const _0x41f63b=$gameMap[_0x3bed8e(0x41a)](_0x359aaa[_0x3bed8e(0x4de)]||_0x38cf4b[_0x3bed8e(0x160)]());if(_0x41f63b)_0x41f63b[_0x3bed8e(0x482)]();}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'EventLocationCreate',_0x2bee06=>{const _0x177f84=_0x116828;VisuMZ[_0x177f84(0x290)](_0x2bee06,_0x2bee06);const _0x3079f1=$gameTemp['getLastPluginCommandInterpreter'](),_0x4a5e8c=_0x2bee06['MapId']||$gameMap['mapId'](),_0x934663=_0x2bee06[_0x177f84(0x4de)]||_0x3079f1[_0x177f84(0x160)](),_0xf795c8=_0x2bee06['PosX']||0x0,_0x54d29e=_0x2bee06[_0x177f84(0x2c1)]||0x0,_0x35bd12=_0x2bee06['Direction']||0x2,_0x2a5b7e=((_0x2bee06[_0x177f84(0x5bf)]||0x1)-0x1)[_0x177f84(0x1fe)](0x0,0x13),_0x4bc347=_0x2bee06[_0x177f84(0x2bc)]||0x0;$gameSystem['createSaveEventLocationData'](_0x4a5e8c,_0x934663,_0xf795c8,_0x54d29e,_0x35bd12,_0x2a5b7e,_0x4bc347);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x4c8),_0x4ade85=>{const _0x36e95e=_0x116828;VisuMZ[_0x36e95e(0x290)](_0x4ade85,_0x4ade85);const _0x2e6767=$gameTemp[_0x36e95e(0x415)](),_0x81ad1=_0x4ade85['MapId']||$gameMap[_0x36e95e(0x2d7)](),_0x2cb360=_0x4ade85[_0x36e95e(0x4de)]||_0x2e6767['eventId']();$gameSystem['deleteSavedEventLocationKey'](_0x81ad1,_0x2cb360);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x41e),_0x7f93c3=>{const _0x2eb11b=_0x116828;VisuMZ[_0x2eb11b(0x290)](_0x7f93c3,_0x7f93c3);const _0x32a463=_0x7f93c3[_0x2eb11b(0x1b6)];$gameTimer['setCommonEvent'](_0x32a463);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x354),_0x33b641=>{const _0x3c0970=_0x116828;$gameTimer[_0x3c0970(0x1a4)](0x0);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x32e),_0x304602=>{const _0x4eb8be=_0x116828;if(!$gameTimer[_0x4eb8be(0x18c)]())return;VisuMZ[_0x4eb8be(0x290)](_0x304602,_0x304602);let _0x26ed3c=0x0;_0x26ed3c+=_0x304602['Frames'],_0x26ed3c+=_0x304602[_0x4eb8be(0x552)]*0x3c,_0x26ed3c+=_0x304602[_0x4eb8be(0x564)]*0x3c*0x3c,_0x26ed3c+=_0x304602['Hours']*0x3c*0x3c*0x3c,$gameTimer['gainFrames'](_0x26ed3c);}),PluginManager['registerCommand'](pluginData['name'],'EventTimerFramesSet',_0x95d743=>{const _0x465d80=_0x116828;if(!$gameTimer[_0x465d80(0x18c)]())return;VisuMZ['ConvertParams'](_0x95d743,_0x95d743);let _0x266b55=0x0;_0x266b55+=_0x95d743[_0x465d80(0x4e0)],_0x266b55+=_0x95d743['Seconds']*0x3c,_0x266b55+=_0x95d743[_0x465d80(0x564)]*0x3c*0x3c,_0x266b55+=_0x95d743['Hours']*0x3c*0x3c*0x3c,$gameTimer[_0x465d80(0x1cf)](_0x266b55);}),PluginManager[_0x116828(0x356)](pluginData['name'],_0x116828(0x574),_0x57b6de=>{const _0x456bab=_0x116828;if(!$gameTimer[_0x456bab(0x18c)]())return;$gameTimer[_0x456bab(0x15b)]();}),PluginManager[_0x116828(0x356)](pluginData['name'],_0x116828(0x472),_0x267423=>{const _0xacbef4=_0x116828;if(!$gameTimer[_0xacbef4(0x18c)]())return;$gameTimer[_0xacbef4(0x25e)]();}),PluginManager['registerCommand'](pluginData[_0x116828(0x49c)],_0x116828(0x5b1),_0x47c23b=>{const _0xc1dda4=_0x116828;VisuMZ[_0xc1dda4(0x290)](_0x47c23b,_0x47c23b);const _0xecad1f=_0x47c23b[_0xc1dda4(0x5aa)]||0x0;$gameTimer[_0xc1dda4(0x554)](_0xecad1f);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'FollowerSetGlobalChase',_0x300f0e=>{const _0x474a46=_0x116828;VisuMZ[_0x474a46(0x290)](_0x300f0e,_0x300f0e);const _0x2fbd71=!_0x300f0e[_0x474a46(0x31e)];$gameSystem['setStopFollowerChasing'](_0x2fbd71);}),PluginManager['registerCommand'](pluginData['name'],_0x116828(0x16d),_0x57f319=>{const _0x23804f=_0x116828;VisuMZ[_0x23804f(0x290)](_0x57f319,_0x57f319);const _0x23efbb=(_0x57f319[_0x23804f(0x174)]||0x0)-0x1,_0x287d2f=!_0x57f319['Chase'],_0x191f19=$gamePlayer[_0x23804f(0x5c2)]()[_0x23804f(0x1d3)](_0x23efbb);if(_0x191f19)_0x191f19['setChaseOff'](_0x287d2f);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x43b),_0x4a96c1=>{const _0x34a228=_0x116828;VisuMZ[_0x34a228(0x290)](_0x4a96c1,_0x4a96c1);const _0x552e5b=_0x4a96c1[_0x34a228(0x174)];$gameSystem['setControlledFollowerID'](_0x552e5b);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x3cd),_0x4098ff=>{const _0x2f9b73=_0x116828;VisuMZ[_0x2f9b73(0x290)](_0x4098ff,_0x4098ff),$gameSystem[_0x2f9b73(0x5f4)](0x0),$gameSystem[_0x2f9b73(0x43c)](![]);for(const _0x43a655 of $gamePlayer[_0x2f9b73(0x5c2)]()['_data']){if(_0x43a655)_0x43a655[_0x2f9b73(0x649)](![]);}}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x411),_0x58795f=>{const _0x571767=_0x116828;VisuMZ[_0x571767(0x290)](_0x58795f,_0x58795f);const _0x5ccf59=$gameTemp['getLastPluginCommandInterpreter']();_0x58795f[_0x571767(0x1f3)]=_0x58795f[_0x571767(0x1f3)]||$gameMap[_0x571767(0x2d7)]();const _0x277289=[_0x58795f[_0x571767(0x1f3)],_0x58795f[_0x571767(0x4de)]||_0x5ccf59[_0x571767(0x160)](),_0x58795f[_0x571767(0x1a6)]],_0x3a5a5f=_0x58795f['TargetSwitchId'],_0x1acc18=$gameSelfSwitches['value'](_0x277289)||![];$gameSwitches[_0x571767(0x384)](_0x3a5a5f,_0x1acc18);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'SwitchGetSelfSwitchID',_0x105f9d=>{const _0x39130c=_0x116828;VisuMZ['ConvertParams'](_0x105f9d,_0x105f9d);const _0x1a1dc5=$gameTemp[_0x39130c(0x415)]();_0x105f9d[_0x39130c(0x1f3)]=_0x105f9d[_0x39130c(0x1f3)]||$gameMap['mapId']();const _0x7220ec=[_0x105f9d[_0x39130c(0x1f3)],_0x105f9d[_0x39130c(0x4de)]||_0x1a1dc5[_0x39130c(0x160)](),_0x39130c(0x1b5)[_0x39130c(0x386)](_0x105f9d[_0x39130c(0x5a3)])],_0x4a2136=_0x105f9d[_0x39130c(0x61e)],_0x107967=$gameSelfSwitches['value'](_0x7220ec)||![];$gameSwitches['setValue'](_0x4a2136,_0x107967);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x23d),_0x566d5c=>{const _0x3733b7=_0x116828;VisuMZ['ConvertParams'](_0x566d5c,_0x566d5c);const _0x3ade0d=$gameTemp[_0x3733b7(0x415)]();_0x566d5c['MapId']=_0x566d5c[_0x3733b7(0x1f3)]||$gameMap['mapId']();const _0x140247=[_0x566d5c[_0x3733b7(0x1f3)],_0x566d5c[_0x3733b7(0x4de)]||_0x3ade0d[_0x3733b7(0x160)](),_0x3733b7(0x33c)['format'](_0x566d5c[_0x3733b7(0x342)])],_0x21b30d=_0x566d5c[_0x3733b7(0x402)],_0x5ed36b=$gameSelfSwitches[_0x3733b7(0x4ba)](_0x140247)||![];$gameVariables[_0x3733b7(0x384)](_0x21b30d,_0x5ed36b);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x2fb),_0x63a24e=>{const _0x37ebd5=_0x116828;VisuMZ[_0x37ebd5(0x290)](_0x63a24e,_0x63a24e);if(!$gameMap)return;const _0x3a2d9c=$gameTemp[_0x37ebd5(0x415)](),_0x2723ef=_0x63a24e['Step2Preserve'];_0x63a24e[_0x37ebd5(0x366)]=_0x63a24e[_0x37ebd5(0x366)]||$gameMap[_0x37ebd5(0x2d7)](),_0x63a24e[_0x37ebd5(0x504)]=_0x63a24e[_0x37ebd5(0x504)]||$gameMap['mapId'](),_0x63a24e['TemplateName']=_0x63a24e['TemplateName'][_0x37ebd5(0x5db)]()[_0x37ebd5(0x423)]();if(!_0x2723ef&&_0x63a24e[_0x37ebd5(0x366)]!==$gameMap[_0x37ebd5(0x2d7)]())return;if($gameMap[_0x37ebd5(0x2d7)]()===_0x63a24e[_0x37ebd5(0x366)]){if('iJEkH'!==_0x37ebd5(0x1d7)){const _0x275e87=$gameMap['event'](_0x63a24e[_0x37ebd5(0x43d)]||_0x3a2d9c[_0x37ebd5(0x160)]());if(!_0x275e87)return;if(_0x63a24e[_0x37ebd5(0x4fe)]!==_0x37ebd5(0x169))_0x275e87[_0x37ebd5(0x4eb)](_0x63a24e[_0x37ebd5(0x4fe)]);else{if('FLuLj'===_0x37ebd5(0x535)){const _0x395f13=_0x5e8d03[_0x37ebd5(0x48a)](this[_0x37ebd5(0x433)]());if(_0x395f13){const _0x1c0277=_0x192ada[_0x37ebd5(0x27f)](this[_0x37ebd5(0x5b7)],this[_0x37ebd5(0x285)],_0x395f13['_realX'],_0x395f13[_0x37ebd5(0x285)])-0x1,_0x33bea3=_0xa32a85[_0x37ebd5(0x456)](_0x50f8f9[_0x37ebd5(0x283)](),_0xf17c2b[_0x37ebd5(0x1f4)]()),_0x2e4299=this[_0x37ebd5(0x316)][_0x37ebd5(0x1b0)]||0x0;_0x2c6abc-=_0x24bfac['max'](0x0,_0x1c0277)*_0x33bea3*_0x2e4299;}}else _0x275e87['morphInto'](_0x63a24e[_0x37ebd5(0x504)],_0x63a24e[_0x37ebd5(0x2a5)]||_0x3a2d9c[_0x37ebd5(0x160)]());}}else this[_0x37ebd5(0x17c)]=_0xe452a(_0xdb6e3a['$1'])[_0x37ebd5(0x5db)]()[_0x37ebd5(0x423)]();}_0x2723ef&&('DWZzF'==='DWZzF'?$gameSystem[_0x37ebd5(0x403)](_0x63a24e[_0x37ebd5(0x366)],_0x63a24e[_0x37ebd5(0x43d)],_0x63a24e[_0x37ebd5(0x4fe)],_0x63a24e[_0x37ebd5(0x504)],_0x63a24e['Step2EventId']):this[_0x37ebd5(0x4ea)](_0x26b532['_mapId'],_0x53ec17[_0x37ebd5(0x36e)]));}),PluginManager['registerCommand'](pluginData[_0x116828(0x49c)],_0x116828(0x45e),_0x1857fc=>{const _0x69ba5a=_0x116828;VisuMZ[_0x69ba5a(0x290)](_0x1857fc,_0x1857fc);if(!$gameMap)return;const _0x45557d=$gameTemp[_0x69ba5a(0x415)]();_0x1857fc['MapId']=_0x1857fc['MapId']||$gameMap[_0x69ba5a(0x2d7)]();if($gameMap[_0x69ba5a(0x2d7)]()===_0x1857fc[_0x69ba5a(0x1f3)]){const _0x58b51d=$gameMap['event'](_0x1857fc[_0x69ba5a(0x4de)]||_0x45557d[_0x69ba5a(0x160)]());_0x58b51d['removeMorph']();}_0x1857fc[_0x69ba5a(0x3e2)]&&$gameSystem[_0x69ba5a(0x3a0)](_0x1857fc[_0x69ba5a(0x1f3)],_0x1857fc[_0x69ba5a(0x4de)]||_0x45557d[_0x69ba5a(0x160)]());}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'PlayerMovementChange',_0x53d236=>{const _0x558927=_0x116828;VisuMZ[_0x558927(0x290)](_0x53d236,_0x53d236),$gameSystem[_0x558927(0x278)](!_0x53d236[_0x558927(0x5ae)]);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x18a),_0x77781d=>{const _0x5bc312=_0x116828;VisuMZ['ConvertParams'](_0x77781d,_0x77781d),$gameSystem['setPlayerDiagonalSetting'](_0x77781d[_0x5bc312(0x64d)]);}),PluginManager[_0x116828(0x356)](pluginData['name'],_0x116828(0x1ea),_0x46ce83=>{const _0x1da986=_0x116828;VisuMZ['ConvertParams'](_0x46ce83,_0x46ce83),$gameSystem[_0x1da986(0x577)]($gamePlayer,_0x46ce83[_0x1da986(0x287)],_0x46ce83['IconBufferX'],_0x46ce83[_0x1da986(0x57f)],_0x46ce83[_0x1da986(0x40b)]);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x641),_0x2c2c09=>{const _0x316fb3=_0x116828;VisuMZ[_0x316fb3(0x290)](_0x2c2c09,_0x2c2c09),$gameSystem[_0x316fb3(0x2c0)]($gamePlayer);}),PluginManager[_0x116828(0x356)](pluginData['name'],_0x116828(0x3f8),_0x133fcb=>{const _0xcbbcc6=_0x116828;VisuMZ[_0xcbbcc6(0x290)](_0x133fcb,_0x133fcb);const _0x128118=$gameTemp[_0xcbbcc6(0x415)]();_0x133fcb['MapId']=_0x133fcb[_0xcbbcc6(0x1f3)]||$gameMap[_0xcbbcc6(0x2d7)]();const _0x3f0de1=[_0x133fcb[_0xcbbcc6(0x1f3)],_0x133fcb[_0xcbbcc6(0x4de)]||_0x128118[_0xcbbcc6(0x160)](),_0x133fcb[_0xcbbcc6(0x1a6)]];switch(_0x133fcb['Value']){case'ON':$gameSelfSwitches[_0xcbbcc6(0x384)](_0x3f0de1,!![]);break;case'OFF':$gameSelfSwitches[_0xcbbcc6(0x384)](_0x3f0de1,![]);break;case _0xcbbcc6(0x4fd):$gameSelfSwitches[_0xcbbcc6(0x384)](_0x3f0de1,!$gameSelfSwitches[_0xcbbcc6(0x4ba)](_0x3f0de1));break;}}),PluginManager[_0x116828(0x356)](pluginData['name'],'SelfSwitchID',_0xdcf591=>{const _0x581931=_0x116828;VisuMZ['ConvertParams'](_0xdcf591,_0xdcf591);const _0x4166ac=$gameTemp[_0x581931(0x415)]();_0xdcf591[_0x581931(0x1f3)]=_0xdcf591[_0x581931(0x1f3)]||$gameMap[_0x581931(0x2d7)]();const _0x1e3188=[_0xdcf591['MapId'],_0xdcf591['EventId']||_0x4166ac[_0x581931(0x160)](),'Self\x20Switch\x20%1'[_0x581931(0x386)](_0xdcf591[_0x581931(0x5a3)])];switch(_0xdcf591[_0x581931(0x376)]){case'ON':$gameSelfSwitches['setValue'](_0x1e3188,!![]);break;case _0x581931(0x1da):$gameSelfSwitches[_0x581931(0x384)](_0x1e3188,![]);break;case _0x581931(0x4fd):$gameSelfSwitches[_0x581931(0x384)](_0x1e3188,!$gameSelfSwitches[_0x581931(0x4ba)](_0x1e3188));break;}}),PluginManager['registerCommand'](pluginData[_0x116828(0x49c)],'SelfVariableID',_0x42bc19=>{const _0xd7ef68=_0x116828;VisuMZ[_0xd7ef68(0x290)](_0x42bc19,_0x42bc19);const _0x442d5c=$gameTemp['getLastPluginCommandInterpreter']();_0x42bc19[_0xd7ef68(0x1f3)]=_0x42bc19[_0xd7ef68(0x1f3)]||$gameMap[_0xd7ef68(0x2d7)]();const _0x2876ac=[_0x42bc19[_0xd7ef68(0x1f3)],_0x42bc19[_0xd7ef68(0x4de)]||_0x442d5c[_0xd7ef68(0x160)](),_0xd7ef68(0x33c)[_0xd7ef68(0x386)](_0x42bc19[_0xd7ef68(0x342)])],_0x3093ce=VisuMZ[_0xd7ef68(0x161)]($gameSelfSwitches[_0xd7ef68(0x4ba)](_0x2876ac),_0x42bc19[_0xd7ef68(0x376)],_0x42bc19['Operation']);$gameSelfSwitches[_0xd7ef68(0x384)](_0x2876ac,_0x3093ce);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'SpawnEventAtXY',_0x4c2a8a=>{const _0x5d89b8=_0x116828;VisuMZ[_0x5d89b8(0x290)](_0x4c2a8a,_0x4c2a8a);const _0x775a5b=$gameTemp[_0x5d89b8(0x415)](),_0x1e3f38={'template':_0x4c2a8a[_0x5d89b8(0x4fe)],'mapId':_0x4c2a8a['MapId']||$gameMap['mapId'](),'eventId':_0x4c2a8a[_0x5d89b8(0x4de)]||_0x775a5b[_0x5d89b8(0x160)](),'x':_0x4c2a8a[_0x5d89b8(0x496)],'y':_0x4c2a8a['PosY'],'spawnPreserved':_0x4c2a8a[_0x5d89b8(0x5bc)],'spawnEventId':$gameMap[_0x5d89b8(0x20e)][_0x5d89b8(0x198)]+0x3e8},_0x46f2e9=_0x4c2a8a[_0x5d89b8(0x4b5)]||0x0;if(!VisuMZ[_0x5d89b8(0x336)][_0x1e3f38['mapId']]&&_0x1e3f38['mapId']!==$gameMap[_0x5d89b8(0x2d7)]()){let _0x236241='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x5d89b8(0x386)](_0x1e3f38[_0x5d89b8(0x2d7)]);_0x236241+='of\x20Preloaded\x20Maps.\x0a\x0a',_0x236241+=_0x5d89b8(0x543),_0x236241+=_0x5d89b8(0x428),_0x236241+=_0x5d89b8(0x196)[_0x5d89b8(0x386)](_0x1e3f38[_0x5d89b8(0x2d7)]),alert(_0x236241);return;}const _0x15c66b=$gameMap[_0x5d89b8(0x33a)](_0x1e3f38,_0x4c2a8a['Collision'],_0x4c2a8a['Passability']);if(_0x46f2e9){if(_0x5d89b8(0x20b)!==_0x5d89b8(0x38f))$gameSwitches[_0x5d89b8(0x384)](_0x46f2e9,!!_0x15c66b);else{const _0xc11e55=_0x14add6[_0x5d89b8(0x546)](this);if(!_0xc11e55)return;const _0x55bfda=_0xc11e55[_0x5d89b8(0x382)][_0x5d89b8(0x5db)]()[_0x5d89b8(0x423)]();_0x55bfda!==_0x5d89b8(0x169)?this[_0x5d89b8(0x4eb)](_0x55bfda,!![]):this[_0x5d89b8(0x4f0)](_0xc11e55[_0x5d89b8(0x2d7)],_0xc11e55[_0x5d89b8(0x160)],!![]);}}}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'SpawnEventAtRegion',_0x598992=>{const _0x14b613=_0x116828;VisuMZ[_0x14b613(0x290)](_0x598992,_0x598992);const _0x41f34d=$gameTemp[_0x14b613(0x415)](),_0x5691d5={'template':_0x598992['TemplateName'],'mapId':_0x598992[_0x14b613(0x1f3)]||$gameMap[_0x14b613(0x2d7)](),'eventId':_0x598992[_0x14b613(0x4de)]||_0x41f34d['eventId'](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x598992[_0x14b613(0x5bc)],'spawnEventId':$gameMap['_spawnedEvents'][_0x14b613(0x198)]+0x3e8},_0x3a1f48=_0x598992[_0x14b613(0x4b5)]||0x0;if(!VisuMZ[_0x14b613(0x336)][_0x5691d5[_0x14b613(0x2d7)]]&&_0x5691d5[_0x14b613(0x2d7)]!==$gameMap['mapId']()){if(_0x14b613(0x390)===_0x14b613(0x390)){let _0x3b1077='You\x20do\x20not\x20have\x20Map\x20%1\x20added\x20to\x20the\x20list\x0a'[_0x14b613(0x386)](_0x5691d5[_0x14b613(0x2d7)]);_0x3b1077+=_0x14b613(0x4b7),_0x3b1077+=_0x14b613(0x543),_0x3b1077+=_0x14b613(0x428),_0x3b1077+=_0x14b613(0x196)[_0x14b613(0x386)](_0x5691d5[_0x14b613(0x2d7)]),alert(_0x3b1077);return;}else{const _0x55a885=_0x37aeed(_0x597e18['$1']),_0x3dd4dd=_0x18557e(_0x1890b6['$2']);return this['processMoveRouteStepTo'](_0x55a885,_0x3dd4dd);}}const _0x2650b4=$gameMap[_0x14b613(0x5c3)](_0x5691d5,_0x598992[_0x14b613(0x55d)],_0x598992[_0x14b613(0x2e3)],_0x598992[_0x14b613(0x209)]);_0x3a1f48&&(_0x14b613(0x269)!==_0x14b613(0x269)?this[_0x14b613(0x5c1)][_0x14b613(0x4bb)]=![]:$gameSwitches[_0x14b613(0x384)](_0x3a1f48,!!_0x2650b4));}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x40c),_0x25b679=>{const _0x16ca07=_0x116828;VisuMZ[_0x16ca07(0x290)](_0x25b679,_0x25b679);const _0x245fe3=$gameTemp[_0x16ca07(0x415)](),_0x2636eb={'template':_0x25b679[_0x16ca07(0x4fe)],'mapId':_0x25b679[_0x16ca07(0x1f3)]||$gameMap['mapId'](),'eventId':_0x25b679[_0x16ca07(0x4de)]||_0x245fe3[_0x16ca07(0x160)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x25b679[_0x16ca07(0x5bc)],'spawnEventId':$gameMap[_0x16ca07(0x20e)]['length']+0x3e8},_0x3e4d5b=_0x25b679[_0x16ca07(0x4b5)]||0x0;if(!VisuMZ[_0x16ca07(0x336)][_0x2636eb[_0x16ca07(0x2d7)]]&&_0x2636eb['mapId']!==$gameMap['mapId']()){if(_0x16ca07(0x581)===_0x16ca07(0x461))return this[_0x16ca07(0x31c)](_0x3d04a9);else{let _0x3fc62a=_0x16ca07(0x58d)['format'](_0x2636eb[_0x16ca07(0x2d7)]);_0x3fc62a+=_0x16ca07(0x4b7),_0x3fc62a+=_0x16ca07(0x543),_0x3fc62a+=_0x16ca07(0x428),_0x3fc62a+='Preloaded\x20Maps\x20and\x20add\x20in\x20Map\x20%1'[_0x16ca07(0x386)](_0x2636eb[_0x16ca07(0x2d7)]),alert(_0x3fc62a);return;}}const _0x1cdf72=$gameMap[_0x16ca07(0x2ae)](_0x2636eb,_0x25b679['TerrainTags'],_0x25b679[_0x16ca07(0x2e3)],_0x25b679['Passability']);_0x3e4d5b&&$gameSwitches[_0x16ca07(0x384)](_0x3e4d5b,!!_0x1cdf72);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'SpawnEventDespawnEventID',_0x240034=>{const _0x5a9355=_0x116828;VisuMZ[_0x5a9355(0x290)](_0x240034,_0x240034);const _0x527eac=$gameTemp[_0x5a9355(0x415)]();$gameMap[_0x5a9355(0x1c3)](_0x240034[_0x5a9355(0x506)]||_0x527eac[_0x5a9355(0x160)]());}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],_0x116828(0x440),_0x6ac557=>{const _0x757a4b=_0x116828;VisuMZ[_0x757a4b(0x290)](_0x6ac557,_0x6ac557);const _0x4a63d7=_0x6ac557[_0x757a4b(0x496)],_0xeb8933=_0x6ac557[_0x757a4b(0x2c1)];$gameMap[_0x757a4b(0x488)](_0x4a63d7,_0xeb8933);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'SpawnEventDespawnRegions',_0x40d111=>{const _0x3d38ec=_0x116828;VisuMZ[_0x3d38ec(0x290)](_0x40d111,_0x40d111),$gameMap[_0x3d38ec(0x264)](_0x40d111[_0x3d38ec(0x55d)]);}),PluginManager[_0x116828(0x356)](pluginData['name'],_0x116828(0x4f5),_0x374c95=>{const _0x1f2265=_0x116828;VisuMZ[_0x1f2265(0x290)](_0x374c95,_0x374c95),$gameMap['despawnTerrainTags'](_0x374c95['TerrainTags']);}),PluginManager[_0x116828(0x356)](pluginData[_0x116828(0x49c)],'SpawnEventDespawnEverything',_0x39e74b=>{const _0x5342ab=_0x116828;VisuMZ['ConvertParams'](_0x39e74b,_0x39e74b),$gameMap[_0x5342ab(0x5a9)]();}),VisuMZ['EventsMoveCore'][_0x116828(0x339)]=Scene_Boot[_0x116828(0x29b)]['onDatabaseLoaded'],Scene_Boot['prototype'][_0x116828(0x26b)]=function(){const _0x1e4841=_0x116828;VisuMZ['EventsMoveCore'][_0x1e4841(0x339)][_0x1e4841(0x176)](this),this[_0x1e4841(0x4c6)](),this[_0x1e4841(0x477)]();if(VisuMZ[_0x1e4841(0x3d8)][_0x1e4841(0x2d9)])VisuMZ[_0x1e4841(0x3d8)]['CustomPageConditions'][_0x1e4841(0x4ad)]();},VisuMZ[_0x116828(0x336)]=[],VisuMZ[_0x116828(0x1c9)]={},Scene_Boot['prototype'][_0x116828(0x4c6)]=function(){const _0xa870dc=_0x116828;if(DataManager['isBattleTest']()||DataManager[_0xa870dc(0x623)]())return;const _0x1a6efe=VisuMZ[_0xa870dc(0x3d8)]['Settings'][_0xa870dc(0x3d4)],_0x39ff63=_0x1a6efe[_0xa870dc(0x57d)][_0xa870dc(0x4e9)](0x0);for(const _0x39cc99 of _0x1a6efe['List']){_0x39cc99['Name']=_0x39cc99['Name'][_0xa870dc(0x5db)]()[_0xa870dc(0x423)](),VisuMZ[_0xa870dc(0x1c9)][_0x39cc99[_0xa870dc(0x18b)]]=_0x39cc99;if(!_0x39ff63['includes'](_0x39cc99[_0xa870dc(0x3e8)]))_0x39ff63[_0xa870dc(0x346)](_0x39cc99[_0xa870dc(0x3e8)]);}for(const _0x8fdf32 of _0x39ff63){if(VisuMZ[_0xa870dc(0x336)][_0x8fdf32])continue;const _0x2bc098=_0xa870dc(0x3fc)[_0xa870dc(0x386)](_0x8fdf32[_0xa870dc(0x414)](0x3)),_0x3455fd='$preloadedMap_%1'[_0xa870dc(0x386)](_0x8fdf32);DataManager[_0xa870dc(0x583)](_0x3455fd,_0x2bc098),setTimeout(this[_0xa870dc(0x56b)]['bind'](this,_0x8fdf32,_0x3455fd),0x64);}},Scene_Boot[_0x116828(0x29b)][_0x116828(0x56b)]=function(_0x5c4bec,_0x274e17){const _0x591bcf=_0x116828;if(window[_0x274e17])_0x591bcf(0x499)===_0x591bcf(0x370)?this[_0x591bcf(0x622)][_0x591bcf(0x20d)]()!==this[_0x591bcf(0x529)]&&(this['_text']=this[_0x591bcf(0x622)][_0x591bcf(0x20d)](),this[_0x591bcf(0x51c)]()):(VisuMZ['PreloadedMaps'][_0x5c4bec]=window[_0x274e17],window[_0x274e17]=undefined);else{if('CrzzF'!==_0x591bcf(0x32c))setTimeout(this[_0x591bcf(0x56b)][_0x591bcf(0x292)](this,_0x5c4bec,_0x274e17),0x64);else return this[_0x591bcf(0x3f3)](_0x62f6cd(_0x30374e['$1']));}},VisuMZ[_0x116828(0x561)]=[],VisuMZ[_0x116828(0x600)]=[],VisuMZ[_0x116828(0x152)]=[],VisuMZ[_0x116828(0x26a)]=[],VisuMZ[_0x116828(0x183)]=[],VisuMZ[_0x116828(0x2dd)]=[],Scene_Boot[_0x116828(0x29b)][_0x116828(0x477)]=function(){const _0x320506=_0x116828;for(let _0x978a83=0x1;_0x978a83<$dataSystem['switches'][_0x320506(0x198)];_0x978a83++){if(_0x320506(0x341)!=='MTNCA')this[_0x320506(0x5f7)]();else{if($dataSystem[_0x320506(0x32a)][_0x978a83]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x320506(0x561)][_0x320506(0x346)](_0x978a83);if($dataSystem[_0x320506(0x32a)][_0x978a83][_0x320506(0x5ba)](/<SELF>/i))VisuMZ[_0x320506(0x600)][_0x320506(0x346)](_0x978a83);if($dataSystem[_0x320506(0x32a)][_0x978a83]['match'](/<MAP>/i))VisuMZ[_0x320506(0x152)][_0x320506(0x346)](_0x978a83);}}for(let _0x87d649=0x1;_0x87d649<$dataSystem[_0x320506(0x397)][_0x320506(0x198)];_0x87d649++){if($dataSystem[_0x320506(0x397)][_0x87d649]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ['AdvancedVariables']['push'](_0x87d649);if($dataSystem[_0x320506(0x397)][_0x87d649][_0x320506(0x5ba)](/<SELF>/i))VisuMZ[_0x320506(0x183)][_0x320506(0x346)](_0x87d649);if($dataSystem[_0x320506(0x397)][_0x87d649]['match'](/<MAP>/i))VisuMZ[_0x320506(0x2dd)][_0x320506(0x346)](_0x87d649);}},VisuMZ[_0x116828(0x3d8)]['CustomPageConditions']={},VisuMZ[_0x116828(0x3d8)][_0x116828(0x2d9)][_0x116828(0x4ad)]=function(){const _0x1eb76f=_0x116828;this['_interpreter']=new Game_CPCInterpreter(),this[_0x1eb76f(0x511)]();},VisuMZ[_0x116828(0x3d8)]['CustomPageConditions'][_0x116828(0x511)]=function(){const _0x4f1453=_0x116828;this[_0x4f1453(0x1a7)]=[];for(const _0x29b449 of $dataCommonEvents){if(!_0x29b449)continue;VisuMZ[_0x4f1453(0x3d8)][_0x4f1453(0x2d9)][_0x4f1453(0x609)](_0x29b449);if(_0x29b449[_0x4f1453(0x57e)]['length']>0x0)this['_commonEvents'][_0x4f1453(0x346)](_0x29b449['id']);}},VisuMZ['EventsMoveCore'][_0x116828(0x2d9)][_0x116828(0x64e)]=function(_0xdf1f64,_0xb020a1){const _0x30661a=_0x116828;return this[_0x30661a(0x22a)][_0x30661a(0x3a2)](_0xdf1f64,_0xb020a1),this[_0x30661a(0x22a)][_0x30661a(0x3d5)](),this['_interpreter'][_0x30661a(0x453)];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x2d9)][_0x116828(0x609)]=function(_0x3afdf4){const _0x4d73f2=_0x116828;let _0x18f3b2=![];_0x3afdf4[_0x4d73f2(0x57e)]=[];for(const _0x1d80b8 of _0x3afdf4['list']){if([0x6c,0x198][_0x4d73f2(0x635)](_0x1d80b8[_0x4d73f2(0x2e5)])){if(_0x4d73f2(0x51a)!==_0x4d73f2(0x604)){const _0x2d30c4=_0x1d80b8[_0x4d73f2(0x167)][0x0];if(_0x2d30c4['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x4d73f2(0x204)!=='sYPmh'?_0x18f3b2=!![]:_0x419faf=_0x258117[_0x4d73f2(0x37e)](_0x412610,_0x7ffae9);else _0x2d30c4[_0x4d73f2(0x5ba)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x18f3b2=![]);}else this[_0x4d73f2(0x512)]=0x0,this['_spriteOffsetY']=0x0;}_0x18f3b2&&_0x3afdf4['CPC']['push'](_0x1d80b8);}},getSelfSwitchValue=function(_0x38c39c,_0x458083,_0x42a2ab){const _0x1da8df=_0x116828;let _0x585eab=[_0x38c39c,_0x458083,'Self\x20Switch\x20%1'[_0x1da8df(0x386)](_0x42a2ab)];if(typeof _0x42a2ab===_0x1da8df(0x171)){if('zuHew'===_0x1da8df(0x1f1))_0x585eab=[_0x38c39c,_0x458083,_0x42a2ab[_0x1da8df(0x5db)]()[_0x1da8df(0x423)]()];else{_0x39d54e['ConvertParams'](_0x3d42f0,_0x58d251);const _0x70c054=_0x5cdb26[_0x1da8df(0x415)](),_0x482d48={'mapId':_0x452de1[_0x1da8df(0x1f3)],'eventId':_0x523681[_0x1da8df(0x4de)]||_0x70c054[_0x1da8df(0x160)](),'pageId':_0x4a5426[_0x1da8df(0x5bf)]};if(_0x482d48[_0x1da8df(0x2d7)]<=0x0)_0x482d48[_0x1da8df(0x2d7)]=_0x25f564?_0x114311['mapId']():0x1;_0x414795[_0x1da8df(0x415)]()[_0x1da8df(0x5d8)](_0x482d48);}}return $gameSelfSwitches[_0x1da8df(0x4ba)](_0x585eab);},getMapSwitchValue=function(_0x37e22e,_0x59a3a1){let _0x15598c=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'['format'](_0x37e22e,_0x59a3a1)];return $gameSelfSwitches['value'](_0x15598c);},getMapVariableValue=function(_0xdcec67,_0x31917a){const _0x28ee6a=_0x116828;let _0x5b212c=[0x0,0x0,_0x28ee6a(0x4b9)[_0x28ee6a(0x386)](_0xdcec67,_0x31917a)];return $gameSelfSwitches[_0x28ee6a(0x4ba)](_0x5b212c);},getSelfVariableValue=function(_0x4feb4e,_0x1de78d,_0x1b13d1){const _0x3c5686=_0x116828,_0x8226ce=[_0x4feb4e,_0x1de78d,_0x3c5686(0x33c)[_0x3c5686(0x386)](_0x1b13d1)];return $gameSelfSwitches['value'](_0x8226ce);},setSelfSwitchValue=function(_0x5ea7d1,_0x24530f,_0x4f07bd,_0x42180a){const _0x443413=_0x116828;let _0x5a8d61=[_0x5ea7d1,_0x24530f,_0x443413(0x1b5)[_0x443413(0x386)](_0x4f07bd)];typeof _0x4f07bd==='string'&&(_0x5a8d61=[_0x5ea7d1,_0x24530f,_0x4f07bd[_0x443413(0x5db)]()[_0x443413(0x423)]()]),$gameSelfSwitches[_0x443413(0x384)](_0x5a8d61,_0x42180a);},setSelfVariableValue=function(_0xbf2872,_0x3a3b18,_0x3aaaea,_0x2e4ff3){const _0x432ef8=_0x116828,_0x1d2ba3=[_0xbf2872,_0x3a3b18,_0x432ef8(0x33c)[_0x432ef8(0x386)](_0x3aaaea)];$gameSelfSwitches['setValue'](_0x1d2ba3,_0x2e4ff3);},setMapSwitchValue=function(_0x2641da,_0xdad40,_0x273bbb){const _0x4e0d62=_0x116828;let _0x4ebb71=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x4e0d62(0x386)](_0x2641da,_0xdad40)];$gameSelfSwitches[_0x4e0d62(0x384)](_0x4ebb71,_0x273bbb);},setMapVariableValue=function(_0x4238a3,_0x3504ee,_0x3dc5a9){const _0x313531=_0x116828;let _0x24d158=[0x0,0x0,_0x313531(0x4b9)[_0x313531(0x386)](_0x4238a3,_0x3504ee)];$gameSelfSwitches[_0x313531(0x384)](_0x24d158,_0x3dc5a9);},DataManager[_0x116828(0x1bd)]=function(_0xace6b){const _0x2a0340=_0x116828;if(SceneManager[_0x2a0340(0x185)][_0x2a0340(0x565)]===Scene_Debug)return![];return VisuMZ[_0x2a0340(0x561)][_0x2a0340(0x635)](_0xace6b);},DataManager['isAdvancedVariable']=function(_0x3c9c9e){const _0x39bb93=_0x116828;if(SceneManager[_0x39bb93(0x185)][_0x39bb93(0x565)]===Scene_Debug)return![];return VisuMZ[_0x39bb93(0x26a)][_0x39bb93(0x635)](_0x3c9c9e);},DataManager[_0x116828(0x203)]=function(_0x4521e3){const _0x340004=_0x116828;if(SceneManager[_0x340004(0x185)]['constructor']===Scene_Debug)return![];return VisuMZ[_0x340004(0x600)][_0x340004(0x635)](_0x4521e3);},DataManager['isSelfVariable']=function(_0x1cc69d){const _0x45c92c=_0x116828;if(SceneManager['_scene'][_0x45c92c(0x565)]===Scene_Debug)return![];return VisuMZ[_0x45c92c(0x183)][_0x45c92c(0x635)](_0x1cc69d);},DataManager['isMapSwitch']=function(_0x2fcfa2){const _0x56b43e=_0x116828;if(BattleManager[_0x56b43e(0x47d)]())return![];return VisuMZ[_0x56b43e(0x152)][_0x56b43e(0x635)](_0x2fcfa2);},DataManager[_0x116828(0x52c)]=function(_0x14a9f3){const _0x35893f=_0x116828;if(BattleManager['isBattleTest']())return![];return VisuMZ[_0x35893f(0x2dd)]['includes'](_0x14a9f3);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x60b)]=Game_Temp[_0x116828(0x29b)][_0x116828(0x531)],Game_Temp[_0x116828(0x29b)]['setDestination']=function(_0x502f78,_0x4a7fbe){const _0x2d0b59=_0x116828;if(this[_0x2d0b59(0x633)](_0x502f78,_0x4a7fbe))return;VisuMZ[_0x2d0b59(0x3d8)]['Game_Temp_setDestination'][_0x2d0b59(0x176)](this,_0x502f78,_0x4a7fbe);},Game_Temp['prototype'][_0x116828(0x633)]=function(_0x1fe4d4,_0x1220e5){const _0x5d5d70=_0x116828,_0x246a79=$gameMap[_0x5d5d70(0x463)](_0x1fe4d4,_0x1220e5);for(const _0x5d9a12 of _0x246a79){if(_0x5d5d70(0x63d)!==_0x5d5d70(0x235)){if(_0x5d9a12&&_0x5d9a12['hasClickTrigger']()){if(_0x5d5d70(0x2cb)!==_0x5d5d70(0x2fd))return _0x5d9a12[_0x5d5d70(0x31f)](),!![];else{if(!this[_0x5d5d70(0x5c1)]['visible'])return![];return _0x266832[_0x5d5d70(0x29b)]['isShadowVisible'][_0x5d5d70(0x176)](this);}}}else{if(!_0x22e389['inBattle']()&&_0x471b02<0x0){let _0x14cac7=_0x37ae25[_0x5d5d70(0x3b9)]();if(_0x14cac7>0x0)return _0x98f94[_0x5d5d70(0x5c2)]()[_0x5d5d70(0x1d3)](_0x14cac7-0x1);}return _0x2ce0fa[_0x5d5d70(0x3d8)]['Game_Interpreter_character'][_0x5d5d70(0x176)](this,_0x5b12b4);}}return![];},Game_Temp['prototype'][_0x116828(0x38e)]=function(_0x5bcb12){const _0x1e6c43=_0x116828;this[_0x1e6c43(0x1b9)]=_0x5bcb12;},Game_Temp[_0x116828(0x29b)]['getLastPluginCommandInterpreter']=function(){const _0x11b55b=_0x116828;return this[_0x11b55b(0x1b9)];},Game_Temp[_0x116828(0x29b)][_0x116828(0x444)]=function(_0x2548e2){const _0x5dda6a=_0x116828;this[_0x5dda6a(0x389)]=_0x2548e2;},Game_Temp[_0x116828(0x29b)][_0x116828(0x3f2)]=function(){const _0x3489a8=_0x116828;this[_0x3489a8(0x389)]=undefined;},Game_Temp[_0x116828(0x29b)][_0x116828(0x611)]=function(){const _0x9743c5=_0x116828;return this[_0x9743c5(0x389)];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x36a)]=Game_System[_0x116828(0x29b)][_0x116828(0x4ad)],Game_System[_0x116828(0x29b)][_0x116828(0x4ad)]=function(){const _0x45fa6d=_0x116828;VisuMZ[_0x45fa6d(0x3d8)]['Game_System_initialize'][_0x45fa6d(0x176)](this),this[_0x45fa6d(0x4e7)](),this[_0x45fa6d(0x329)]();},Game_System[_0x116828(0x29b)][_0x116828(0x4e7)]=function(){const _0x1dd8d5=_0x116828;this[_0x1dd8d5(0x2d6)]={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this['_EventIcons']={},this[_0x1dd8d5(0x322)]=[],this[_0x1dd8d5(0x2ef)]={},this[_0x1dd8d5(0x4bd)]={},this[_0x1dd8d5(0x2d4)]=![],this[_0x1dd8d5(0x3cb)]=_0x1dd8d5(0x3e0);},Game_System[_0x116828(0x29b)][_0x116828(0x48f)]=function(){const _0x217b0d=_0x116828;if(this[_0x217b0d(0x2d6)]===undefined)this[_0x217b0d(0x4e7)]();if(this[_0x217b0d(0x2d6)][_0x217b0d(0x4e2)]===undefined)this[_0x217b0d(0x4e7)]();return this['_EventsMoveCoreSettings'][_0x217b0d(0x4e2)];},Game_System[_0x116828(0x29b)][_0x116828(0x459)]=function(_0x4f19ba){const _0x56e7b9=_0x116828;if(this['_EventsMoveCoreSettings']===undefined)this[_0x56e7b9(0x4e7)]();if(this['_EventsMoveCoreSettings']['DashingEnable']===undefined)this[_0x56e7b9(0x4e7)]();this['_EventsMoveCoreSettings'][_0x56e7b9(0x4e2)]=_0x4f19ba;},Game_System[_0x116828(0x29b)][_0x116828(0x43a)]=function(){const _0x4d9cbb=_0x116828;if(this[_0x4d9cbb(0x2d6)]===undefined)this['initEventsMoveCore']();if(this[_0x4d9cbb(0x2d6)]['EventAutoMovement']===undefined)this[_0x4d9cbb(0x4e7)]();return this[_0x4d9cbb(0x2d6)][_0x4d9cbb(0x21a)];},Game_System[_0x116828(0x29b)][_0x116828(0x353)]=function(_0x15f0dc){const _0x5311d4=_0x116828;if(this[_0x5311d4(0x2d6)]===undefined)this['initEventsMoveCore']();if(this[_0x5311d4(0x2d6)][_0x5311d4(0x21a)]===undefined)this[_0x5311d4(0x4e7)]();this[_0x5311d4(0x2d6)][_0x5311d4(0x21a)]=_0x15f0dc;},Game_System[_0x116828(0x29b)]['eventLabelsVisible']=function(){const _0x4b0b7d=_0x116828;if(this['_EventsMoveCoreSettings']===undefined)this[_0x4b0b7d(0x4e7)]();if(this['_EventsMoveCoreSettings'][_0x4b0b7d(0x226)]===undefined)this[_0x4b0b7d(0x4e7)]();return this[_0x4b0b7d(0x2d6)][_0x4b0b7d(0x226)];},Game_System['prototype'][_0x116828(0x2ca)]=function(_0x560604){const _0xe7fd68=_0x116828;if(this[_0xe7fd68(0x2d6)]===undefined)this[_0xe7fd68(0x4e7)]();if(this[_0xe7fd68(0x2d6)][_0xe7fd68(0x226)]===undefined)this[_0xe7fd68(0x4e7)]();this[_0xe7fd68(0x2d6)][_0xe7fd68(0x226)]=_0x560604;},Game_System['prototype']['isPlayerControlDisabled']=function(){const _0x4ef6ef=_0x116828;if(this['_DisablePlayerControl']===undefined){if(_0x4ef6ef(0x225)!==_0x4ef6ef(0x4b4))this['_DisablePlayerControl']=![];else return this['_forceShowPlayer']===_0x25a1bf&&this[_0x4ef6ef(0x5ec)](),this['_forceShowPlayer'];}return this[_0x4ef6ef(0x2d4)];},Game_System[_0x116828(0x29b)][_0x116828(0x278)]=function(_0x39a264){const _0x2a9b47=_0x116828;this[_0x2a9b47(0x2d4)]=_0x39a264;},Game_System[_0x116828(0x29b)][_0x116828(0x38c)]=function(){return this['_PlayerDiagonalSetting'];},Game_System[_0x116828(0x29b)][_0x116828(0x5b9)]=function(_0x58e4b7){const _0x487d5d=_0x116828;this[_0x487d5d(0x3cb)]=String(_0x58e4b7)[_0x487d5d(0x49b)]()[_0x487d5d(0x423)]();},Game_System[_0x116828(0x29b)][_0x116828(0x175)]=function(_0x5c0c5b){const _0x54c65e=_0x116828;if(this[_0x54c65e(0x360)]===undefined)this['initEventsMoveCore']();if(!_0x5c0c5b)return null;if(_0x5c0c5b===$gamePlayer)return this[_0x54c65e(0x360)][_0x54c65e(0x164)];else{const _0x408e43=VisuMZ[_0x54c65e(0x3d8)][_0x54c65e(0x256)],_0x4fab81=_0x54c65e(0x392)[_0x54c65e(0x386)](_0x5c0c5b['_mapId'],_0x5c0c5b['_eventId']);return this[_0x54c65e(0x360)][_0x4fab81]=this[_0x54c65e(0x360)][_0x4fab81]||{'iconIndex':0x0,'bufferX':_0x408e43['Icon']['BufferX'],'bufferY':_0x408e43[_0x54c65e(0x417)][_0x54c65e(0x317)],'blendMode':_0x408e43['Icon'][_0x54c65e(0x215)]},this['_EventIcons'][_0x4fab81];}},Game_System[_0x116828(0x29b)][_0x116828(0x577)]=function(_0x2aab27,_0x1e8f2,_0x563437,_0x1c7b1d,_0x400855){const _0x50ba70=_0x116828;if(this[_0x50ba70(0x360)]===undefined)this[_0x50ba70(0x4e7)]();const _0x140567=_0x2aab27===$gamePlayer?_0x50ba70(0x164):_0x50ba70(0x392)[_0x50ba70(0x386)](_0x2aab27[_0x50ba70(0x59e)],_0x2aab27[_0x50ba70(0x36e)]);this[_0x50ba70(0x360)][_0x140567]={'iconIndex':_0x1e8f2,'bufferX':_0x563437,'bufferY':_0x1c7b1d,'blendMode':_0x400855};},Game_System['prototype'][_0x116828(0x28a)]=function(_0x14f176,_0x2be615,_0x5937ea,_0x3ea6ae,_0x1e4261,_0x2584ea){const _0x2408df=_0x116828;if(this[_0x2408df(0x360)]===undefined)this['initEventsMoveCore']();const _0x491f59=_0x2408df(0x392)[_0x2408df(0x386)](_0x14f176,_0x2be615);this['_EventIcons'][_0x491f59]={'iconIndex':_0x5937ea,'bufferX':_0x3ea6ae,'bufferY':_0x1e4261,'blendMode':_0x2584ea};},Game_System[_0x116828(0x29b)][_0x116828(0x2c0)]=function(_0x389d46){const _0x12e454=_0x116828;if(this[_0x12e454(0x360)]===undefined)this[_0x12e454(0x4e7)]();if(!_0x389d46)return null;_0x389d46===$gamePlayer?delete this[_0x12e454(0x360)][_0x12e454(0x164)]:this[_0x12e454(0x4ea)](_0x389d46[_0x12e454(0x59e)],_0x389d46['_eventId']);},Game_System[_0x116828(0x29b)][_0x116828(0x4ea)]=function(_0x26cfe2,_0x23f0fa){const _0x311023=_0x116828;if(this[_0x311023(0x360)]===undefined)this[_0x311023(0x4e7)]();const _0x519dd7='Map%1-Event%2'[_0x311023(0x386)](_0x26cfe2,_0x23f0fa);delete this[_0x311023(0x360)][_0x519dd7];},Game_System['prototype']['getSavedEventLocation']=function(_0x3f7ecc){const _0x205a93=_0x116828;if(this[_0x205a93(0x4bd)]===undefined)this[_0x205a93(0x4e7)]();if(!_0x3f7ecc)return null;const _0x32201e=_0x205a93(0x392)[_0x205a93(0x386)](_0x3f7ecc[_0x205a93(0x59e)],_0x3f7ecc[_0x205a93(0x36e)]);return this['_SavedEventLocations'][_0x32201e];},Game_System[_0x116828(0x29b)][_0x116828(0x482)]=function(_0x90a9e1){const _0xdf6bba=_0x116828;if(this[_0xdf6bba(0x4bd)]===undefined)this['initEventsMoveCore']();if(!_0x90a9e1)return;const _0x48e9f7=_0xdf6bba(0x392)['format'](_0x90a9e1['_mapId'],_0x90a9e1[_0xdf6bba(0x36e)]);this[_0xdf6bba(0x4bd)][_0x48e9f7]={'direction':_0x90a9e1['direction'](),'x':Math[_0xdf6bba(0x181)](_0x90a9e1['x']),'y':Math['round'](_0x90a9e1['y']),'pageIndex':_0x90a9e1[_0xdf6bba(0x2b8)],'moveRouteIndex':_0x90a9e1[_0xdf6bba(0x631)]};},Game_System[_0x116828(0x29b)]['deleteSavedEventLocation']=function(_0x4df094){const _0xf8ac91=_0x116828;if(this[_0xf8ac91(0x4bd)]===undefined)this[_0xf8ac91(0x4e7)]();if(!_0x4df094)return;this[_0xf8ac91(0x2c3)](_0x4df094[_0xf8ac91(0x59e)],_0x4df094[_0xf8ac91(0x36e)]);},Game_System['prototype'][_0x116828(0x2c3)]=function(_0x5217af,_0x4d4a9b){const _0x1c549d=_0x116828;if(this['_SavedEventLocations']===undefined)this[_0x1c549d(0x4e7)]();const _0x37dd06=_0x1c549d(0x392)[_0x1c549d(0x386)](_0x5217af,_0x4d4a9b);delete this[_0x1c549d(0x4bd)][_0x37dd06];},Game_System['prototype'][_0x116828(0x480)]=function(_0x128bea,_0x504a2b,_0x4eb1b4,_0x22ad29,_0x1efc30,_0x46092d,_0x6dc8b2){const _0x378112=_0x116828;if(this[_0x378112(0x4bd)]===undefined)this[_0x378112(0x4e7)]();const _0x1296e2='Map%1-Event%2'[_0x378112(0x386)](_0x128bea,_0x504a2b);this[_0x378112(0x4bd)][_0x1296e2]={'direction':_0x1efc30,'x':Math[_0x378112(0x181)](_0x4eb1b4),'y':Math[_0x378112(0x181)](_0x22ad29),'pageIndex':_0x46092d,'moveRouteIndex':_0x6dc8b2};},Game_System[_0x116828(0x29b)][_0x116828(0x546)]=function(_0x2b62ba){const _0x331afa=_0x116828;if(this[_0x331afa(0x2ef)]===undefined)this['initEventsMoveCore']();if(!_0x2b62ba)return;const _0x164d68=_0x331afa(0x392)['format'](_0x2b62ba[_0x331afa(0x59e)],_0x2b62ba[_0x331afa(0x36e)]);return this['_PreservedEventMorphData'][_0x164d68];},Game_System[_0x116828(0x29b)][_0x116828(0x403)]=function(_0x148f3c,_0x317e2c,_0x6c0622,_0x22d6f0,_0x44ca82){const _0xb54d44=_0x116828;if(this[_0xb54d44(0x2ef)]===undefined)this[_0xb54d44(0x4e7)]();const _0x312c11=_0xb54d44(0x392)['format'](_0x148f3c,_0x317e2c);this[_0xb54d44(0x2ef)][_0x312c11]={'template':_0x6c0622,'mapId':_0x22d6f0,'eventId':_0x44ca82};},Game_System[_0x116828(0x29b)][_0x116828(0x3a0)]=function(_0x4a1922,_0x4f679d){const _0x5c7ce9=_0x116828;if(this['_PreservedEventMorphData']===undefined)this['initEventsMoveCore']();const _0x2ccfe2=_0x5c7ce9(0x392)[_0x5c7ce9(0x386)](_0x4a1922,_0x4f679d);delete this[_0x5c7ce9(0x2ef)][_0x2ccfe2];},Game_System[_0x116828(0x29b)]['getMapSpawnedEventData']=function(_0x3b8824){const _0x6a8a3a=_0x116828;if(this['_MapSpawnedEventData']===undefined)this[_0x6a8a3a(0x4e7)]();return this['_MapSpawnedEventData'][_0x3b8824]=this[_0x6a8a3a(0x322)][_0x3b8824]||[],this[_0x6a8a3a(0x322)][_0x3b8824];},Game_System[_0x116828(0x29b)][_0x116828(0x460)]=function(_0x18b421){const _0x55e205=_0x116828,_0xb9c81b=this['getMapSpawnedEventData'](_0x18b421);for(const _0x337d22 of _0xb9c81b){if(_0x55e205(0x404)!==_0x55e205(0x1d1)){if(!_0x337d22)continue;if(_0x337d22[_0x55e205(0x173)])continue;const _0x16f252=_0xb9c81b[_0x55e205(0x4ef)](_0x337d22);_0xb9c81b[_0x16f252]=null;}else{const _0x2edd4d=this[_0x55e205(0x28f)],_0xa9572f=this['_randomHomeY'];return this[_0x55e205(0x642)](_0x2edd4d,_0xa9572f);}}},Game_System[_0x116828(0x29b)][_0x116828(0x329)]=function(){const _0x14fbb1=_0x116828;this[_0x14fbb1(0x200)]=0x0,this[_0x14fbb1(0x476)]=![];},Game_System[_0x116828(0x29b)][_0x116828(0x3b9)]=function(){const _0x380ebf=_0x116828;if(this['_followerControlID']===undefined)this['initFollowerController']();return this[_0x380ebf(0x200)];},Game_System[_0x116828(0x29b)][_0x116828(0x5f4)]=function(_0x550077){const _0x577a17=_0x116828;if(this[_0x577a17(0x200)]===undefined)this['initFollowerController']();this[_0x577a17(0x200)]=_0x550077;;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x3fa)]=Game_Interpreter[_0x116828(0x29b)]['character'],Game_Interpreter['prototype'][_0x116828(0x2bf)]=function(_0x420b23){const _0x4277b2=_0x116828;if(!$gameParty[_0x4277b2(0x586)]()&&_0x420b23<0x0){let _0x340f45=$gameSystem[_0x4277b2(0x3b9)]();if(_0x340f45>0x0)return $gamePlayer[_0x4277b2(0x5c2)]()[_0x4277b2(0x1d3)](_0x340f45-0x1);}return VisuMZ['EventsMoveCore'][_0x4277b2(0x3fa)][_0x4277b2(0x176)](this,_0x420b23);},Game_System['prototype']['isStopFollowerChasing']=function(){const _0x1815d4=_0x116828;if(this['_followerChaseOff']===undefined)this[_0x1815d4(0x329)]();return this['_followerChaseOff'];},Game_System[_0x116828(0x29b)][_0x116828(0x43c)]=function(_0xdcd41b){const _0x1fa241=_0x116828;if(this[_0x1fa241(0x476)]===undefined)this[_0x1fa241(0x329)]();this[_0x1fa241(0x476)]=_0xdcd41b;;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x347)]=Game_Timer[_0x116828(0x29b)][_0x116828(0x4ad)],Game_Timer[_0x116828(0x29b)]['initialize']=function(){const _0x34a313=_0x116828;VisuMZ['EventsMoveCore']['Game_Timer_initialize'][_0x34a313(0x176)](this),this[_0x34a313(0x4e7)]();},Game_Timer[_0x116828(0x29b)][_0x116828(0x4e7)]=function(){const _0x2b73f8=_0x116828;this['_paused']=![],this['_speed']=-0x1,this[_0x2b73f8(0x630)]=0x0;},Game_Timer['prototype'][_0x116828(0x252)]=function(_0x1866b6){const _0x2134db=_0x116828;if(!_0x1866b6)return;if(!this['_working'])return;if(this[_0x2134db(0x1d2)])return;if(this[_0x2134db(0x3b8)]<=0x0)return;if(this[_0x2134db(0x454)]===undefined)this['initEventsMoveCore']();this[_0x2134db(0x3b8)]+=this[_0x2134db(0x454)],this[_0x2134db(0x3b8)]<=0x0&&this[_0x2134db(0x4b6)]();},VisuMZ['EventsMoveCore']['Game_Timer_start']=Game_Timer['prototype'][_0x116828(0x4d1)],Game_Timer[_0x116828(0x29b)][_0x116828(0x4d1)]=function(_0x3b911a){const _0x2e45c7=_0x116828;VisuMZ['EventsMoveCore'][_0x2e45c7(0x2af)][_0x2e45c7(0x176)](this,_0x3b911a);if(this[_0x2e45c7(0x1d2)]===undefined)this[_0x2e45c7(0x4e7)]();this[_0x2e45c7(0x1d2)]=![];},VisuMZ['EventsMoveCore']['Game_Timer_stop']=Game_Timer[_0x116828(0x29b)][_0x116828(0x5e3)],Game_Timer['prototype']['stop']=function(){const _0x2ea6b4=_0x116828;VisuMZ[_0x2ea6b4(0x3d8)]['Game_Timer_stop']['call'](this);if(this['_paused']===undefined)this[_0x2ea6b4(0x4e7)]();this['_paused']=![];},Game_Timer['prototype'][_0x116828(0x15b)]=function(){const _0xee11d0=_0x116828;if(this[_0xee11d0(0x3b8)]<=0x0)return;this[_0xee11d0(0x1d2)]=!![],this[_0xee11d0(0x606)]=!![];},Game_Timer[_0x116828(0x29b)][_0x116828(0x25e)]=function(){const _0x4eb55d=_0x116828;if(this[_0x4eb55d(0x3b8)]<=0x0)return;this[_0x4eb55d(0x1d2)]=![],this['_working']=!![];},Game_Timer['prototype'][_0x116828(0x539)]=function(_0xed3245){const _0x2a32b7=_0x116828;this[_0x2a32b7(0x3b8)]=this[_0x2a32b7(0x3b8)]||0x0,this[_0x2a32b7(0x3b8)]+=_0xed3245,this['_working']=!![],this[_0x2a32b7(0x3b8)]=Math['max'](0x1,this[_0x2a32b7(0x3b8)]);},Game_Timer[_0x116828(0x29b)][_0x116828(0x1cf)]=function(_0x5c104f){const _0x4d4173=_0x116828;this[_0x4d4173(0x3b8)]=this[_0x4d4173(0x3b8)]||0x0,this['_frames']=_0x5c104f,this['_working']=!![],this[_0x4d4173(0x3b8)]=Math['max'](0x1,this[_0x4d4173(0x3b8)]);},Game_Timer[_0x116828(0x29b)][_0x116828(0x554)]=function(_0xacc25f){const _0x5efac4=_0x116828;this[_0x5efac4(0x454)]=_0xacc25f,this[_0x5efac4(0x606)]=!![],_0xacc25f>0x0&&(this[_0x5efac4(0x3b8)]=Math['max'](this['_frames'],0x1));},Game_Timer[_0x116828(0x29b)][_0x116828(0x1a4)]=function(_0x475903){const _0x515ce3=_0x116828;if(this[_0x515ce3(0x630)]===undefined)this[_0x515ce3(0x4e7)]();this[_0x515ce3(0x630)]=_0x475903;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x15f)]=Game_Timer[_0x116828(0x29b)][_0x116828(0x4b6)],Game_Timer[_0x116828(0x29b)][_0x116828(0x4b6)]=function(){const _0x235236=_0x116828;if(this[_0x235236(0x630)]===undefined)this['initEventsMoveCore']();this['_expireCommonEvent']?$gameTemp[_0x235236(0x2d2)](this[_0x235236(0x630)]):VisuMZ[_0x235236(0x3d8)][_0x235236(0x15f)][_0x235236(0x176)](this);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x18e)]=Game_Message[_0x116828(0x29b)]['add'],Game_Message[_0x116828(0x29b)][_0x116828(0x1b7)]=function(_0x15bb76){const _0x634c2d=_0x116828;VisuMZ[_0x634c2d(0x3d8)][_0x634c2d(0x18e)]['call'](this,_0x15bb76),this[_0x634c2d(0x233)]=$gameTemp[_0x634c2d(0x611)]();},Game_Message[_0x116828(0x29b)][_0x116828(0x327)]=function(){const _0xac5c70=_0x116828;$gameTemp[_0xac5c70(0x444)](this[_0xac5c70(0x233)]);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x46b)]=Game_Switches[_0x116828(0x29b)][_0x116828(0x4ba)],Game_Switches[_0x116828(0x29b)][_0x116828(0x4ba)]=function(_0x332434){const _0x235d7c=_0x116828;if(DataManager[_0x235d7c(0x1bd)](_0x332434))return!!this[_0x235d7c(0x3ca)](_0x332434);else{if(DataManager[_0x235d7c(0x203)](_0x332434))return!!this[_0x235d7c(0x3cf)](_0x332434);else return DataManager[_0x235d7c(0x469)](_0x332434)?!!this[_0x235d7c(0x1ac)](_0x332434):VisuMZ[_0x235d7c(0x3d8)][_0x235d7c(0x46b)][_0x235d7c(0x176)](this,_0x332434);}},Game_Switches[_0x116828(0x4a4)]={},Game_Switches[_0x116828(0x29b)][_0x116828(0x3ca)]=function(_0x50e735){const _0x4d3e20=_0x116828;if(!Game_Switches['advancedFunc'][_0x50e735]){if(_0x4d3e20(0x26c)!==_0x4d3e20(0x26c))_0x3ac26c=this['findDiagonalDirectionTo'](_0x194294,_0x18d54d);else{$dataSystem[_0x4d3e20(0x32a)][_0x50e735][_0x4d3e20(0x5ba)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x32016a=_0x4d3e20(0x4c2)[_0x4d3e20(0x386)](String(RegExp['$1']));Game_Switches[_0x4d3e20(0x4a4)][_0x50e735]=new Function(_0x4d3e20(0x437),_0x32016a);}}const _0x329fdf=$gameTemp[_0x4d3e20(0x611)]()||this;return Game_Switches['advancedFunc'][_0x50e735][_0x4d3e20(0x176)](_0x329fdf,_0x50e735);},Game_Switches['prototype']['selfValue']=function(_0x5355bd){const _0x3e6ec1=_0x116828,_0x5b0a9c=$gameTemp[_0x3e6ec1(0x611)]()||this;if(_0x5b0a9c[_0x3e6ec1(0x565)]!==Game_Event)return VisuMZ['EventsMoveCore']['Game_Switches_value']['call'](this,_0x5355bd);else{if(_0x3e6ec1(0x275)===_0x3e6ec1(0x3af)){let _0xc78eac=[_0x5a441c,_0x470017,_0x3e6ec1(0x1b5)[_0x3e6ec1(0x386)](_0x4c0a74)];typeof _0x52cd2f==='string'&&(_0xc78eac=[_0xb19e5b,_0x4ba976,_0x340f00['toUpperCase']()['trim']()]),_0x167399[_0x3e6ec1(0x384)](_0xc78eac,_0x300164);}else{const _0x4e2332=[_0x5b0a9c[_0x3e6ec1(0x59e)],_0x5b0a9c[_0x3e6ec1(0x36e)],'Self\x20Switch\x20%1'[_0x3e6ec1(0x386)](_0x5355bd)];return $gameSelfSwitches[_0x3e6ec1(0x4ba)](_0x4e2332);}}},Game_Switches[_0x116828(0x29b)][_0x116828(0x1ac)]=function(_0xd251bf){const _0x4ee85d=_0x116828,_0x282edc=$gameMap?$gameMap[_0x4ee85d(0x2d7)]():0x0,_0x5bd889=[0x0,0x0,_0x4ee85d(0x3bd)[_0x4ee85d(0x386)](_0x282edc,_0xd251bf)];return $gameSelfSwitches[_0x4ee85d(0x4ba)](_0x5bd889);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x44a)]=Game_Switches['prototype'][_0x116828(0x384)],Game_Switches['prototype'][_0x116828(0x384)]=function(_0x364bee,_0x21e8e6){const _0x55d0c2=_0x116828;if(DataManager['isSelfSwitch'](_0x364bee))'hQQfr'===_0x55d0c2(0x223)?this[_0x55d0c2(0x3b8)]=_0x30702b[_0x55d0c2(0x37e)](this['_frames'],0x1):this[_0x55d0c2(0x50e)](_0x364bee,_0x21e8e6);else{if(DataManager['isMapSwitch'](_0x364bee))this[_0x55d0c2(0x3e4)](_0x364bee,_0x21e8e6);else{if(_0x55d0c2(0x627)!==_0x55d0c2(0x4d9))VisuMZ['EventsMoveCore'][_0x55d0c2(0x44a)][_0x55d0c2(0x176)](this,_0x364bee,_0x21e8e6);else{if(this[_0x55d0c2(0x360)]===_0x497f4b)this[_0x55d0c2(0x4e7)]();const _0x2645c4=_0x1deb3a===_0x3de423?'Player':'Map%1-Event%2'[_0x55d0c2(0x386)](_0xb8eaac[_0x55d0c2(0x59e)],_0xe8fa5d[_0x55d0c2(0x36e)]);this[_0x55d0c2(0x360)][_0x2645c4]={'iconIndex':_0x31d16c,'bufferX':_0x3d6455,'bufferY':_0x19e815,'blendMode':_0x27be59};}}}},Game_Switches[_0x116828(0x29b)][_0x116828(0x50e)]=function(_0x35aa04,_0x3d6686){const _0x5838f2=_0x116828,_0x5ac7d8=$gameTemp[_0x5838f2(0x611)]()||this;if(_0x5ac7d8[_0x5838f2(0x565)]!==Game_Event){if(_0x5838f2(0x41f)!==_0x5838f2(0x41f))return this[_0x5838f2(0x17f)](_0xdeeb0(_0x2edbba['$1']));else VisuMZ[_0x5838f2(0x3d8)][_0x5838f2(0x44a)]['call'](this,_0x35aa04,_0x3d6686);}else{if(_0x5838f2(0x568)!==_0x5838f2(0x568)){_0x54789e=_0x316cdc||0x0;const _0x218140={'code':0x1,'indent':null,'parameters':[]};_0x218140[_0x5838f2(0x2e5)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x5bb8e7],this[_0x5838f2(0x1fb)][_0x5838f2(0x2ce)][this[_0x5838f2(0x631)]][_0x5838f2(0x167)][0x0]='';while(_0x5da2a7--){this[_0x5838f2(0x1fb)][_0x5838f2(0x2ce)]['splice'](this[_0x5838f2(0x631)]+0x1,0x0,_0x218140);}}else{const _0x5b2aac=[_0x5ac7d8['_mapId'],_0x5ac7d8['_eventId'],_0x5838f2(0x1b5)['format'](_0x35aa04)];$gameSelfSwitches[_0x5838f2(0x384)](_0x5b2aac,_0x3d6686);}}},Game_Switches[_0x116828(0x29b)]['setMapValue']=function(_0x1334cb,_0x42894b){const _0x5a68a4=_0x116828,_0x770f52=$gameMap?$gameMap['mapId']():0x0,_0xe6db25=[0x0,0x0,_0x5a68a4(0x3bd)[_0x5a68a4(0x386)](_0x770f52,_0x1334cb)];return $gameSelfSwitches['setValue'](_0xe6db25,_0x42894b);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x5b3)]=Game_Variables[_0x116828(0x29b)][_0x116828(0x4ba)],Game_Variables[_0x116828(0x29b)][_0x116828(0x4ba)]=function(_0x5a1435){const _0x5483c3=_0x116828;if(DataManager['isAdvancedVariable'](_0x5a1435))return this['advancedValue'](_0x5a1435);else{if(DataManager['isSelfVariable'](_0x5a1435))return this[_0x5483c3(0x3cf)](_0x5a1435);else return DataManager[_0x5483c3(0x52c)](_0x5a1435)?this[_0x5483c3(0x1ac)](_0x5a1435):VisuMZ[_0x5483c3(0x3d8)][_0x5483c3(0x5b3)]['call'](this,_0x5a1435);}},Game_Variables['advancedFunc']={},Game_Variables[_0x116828(0x29b)]['advancedValue']=function(_0x5d8a52){const _0x461a50=_0x116828;if(!Game_Variables[_0x461a50(0x4a4)][_0x5d8a52]){$dataSystem[_0x461a50(0x397)][_0x5d8a52][_0x461a50(0x5ba)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x432a1a=_0x461a50(0x4c2)[_0x461a50(0x386)](String(RegExp['$1']));Game_Variables[_0x461a50(0x4a4)][_0x5d8a52]=new Function(_0x461a50(0x30f),_0x432a1a);}const _0x54d3a8=$gameTemp[_0x461a50(0x611)]()||this;return Game_Variables[_0x461a50(0x4a4)][_0x5d8a52]['call'](_0x54d3a8,_0x5d8a52);},Game_Variables['prototype']['selfValue']=function(_0x2ec499){const _0x37ebbd=_0x116828,_0xa12d7b=$gameTemp[_0x37ebbd(0x611)]()||this;if(_0xa12d7b[_0x37ebbd(0x565)]!==Game_Event)return VisuMZ['EventsMoveCore']['Game_Variables_value']['call'](this,_0x2ec499);else{const _0x5adb3f=[_0xa12d7b[_0x37ebbd(0x59e)],_0xa12d7b[_0x37ebbd(0x36e)],_0x37ebbd(0x33c)[_0x37ebbd(0x386)](_0x2ec499)];return $gameSelfSwitches[_0x37ebbd(0x4ba)](_0x5adb3f);}},Game_Variables[_0x116828(0x29b)]['mapValue']=function(_0x7441cb){const _0x1904ac=_0x116828,_0x5c02af=$gameMap?$gameMap[_0x1904ac(0x2d7)]():0x0,_0x2c17d2=[0x0,0x0,_0x1904ac(0x4b9)[_0x1904ac(0x386)](_0x5c02af,_0x7441cb)];return $gameSelfSwitches[_0x1904ac(0x4ba)](_0x2c17d2)||0x0;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x522)]=Game_Variables[_0x116828(0x29b)]['setValue'],Game_Variables['prototype']['setValue']=function(_0x33aa92,_0x5af37b){const _0x412e78=_0x116828;if(DataManager['isSelfVariable'](_0x33aa92))this['setSelfValue'](_0x33aa92,_0x5af37b);else DataManager[_0x412e78(0x52c)](_0x33aa92)?this['setMapValue'](_0x33aa92,_0x5af37b):_0x412e78(0x2b5)!==_0x412e78(0x4aa)?VisuMZ[_0x412e78(0x3d8)]['Game_Variables_setValue'][_0x412e78(0x176)](this,_0x33aa92,_0x5af37b):(_0x3df645[_0x412e78(0x616)]['_filename']=this[_0x412e78(0x1c1)](),_0x26c337['_shadowSprite']['bitmap']=_0x22b0ff[_0x412e78(0x5af)](_0x2304bf[_0x412e78(0x616)][_0x412e78(0x60e)]));},Game_Variables[_0x116828(0x29b)][_0x116828(0x50e)]=function(_0x4bb9c1,_0x196831){const _0x4d25d5=_0x116828,_0xeb972b=$gameTemp[_0x4d25d5(0x611)]()||this;if(_0xeb972b['constructor']!==Game_Event)VisuMZ[_0x4d25d5(0x3d8)][_0x4d25d5(0x522)][_0x4d25d5(0x176)](this,_0x4bb9c1,_0x196831);else{const _0x10c812=[_0xeb972b['_mapId'],_0xeb972b[_0x4d25d5(0x36e)],'Self\x20Variable\x20%1'[_0x4d25d5(0x386)](_0x4bb9c1)];$gameSelfSwitches[_0x4d25d5(0x384)](_0x10c812,_0x196831);}},Game_Variables[_0x116828(0x29b)]['setMapValue']=function(_0x515b6a,_0x670b2b){const _0x5daa0d=_0x116828,_0x23ac6a=$gameMap?$gameMap['mapId']():0x0,_0x2ee9ba=[0x0,0x0,_0x5daa0d(0x4b9)[_0x5daa0d(0x386)](_0x23ac6a,_0x515b6a)];$gameSelfSwitches['setValue'](_0x2ee9ba,_0x670b2b);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x3da)]=Game_SelfSwitches[_0x116828(0x29b)]['value'],Game_SelfSwitches['prototype'][_0x116828(0x4ba)]=function(_0xb12d4f){const _0x5c1397=_0x116828;if(_0xb12d4f[0x2][_0x5c1397(0x5ba)](/(?:SELF|MAP)/i)){if(_0x5c1397(0x240)==='XDPOj'){this[_0x5c1397(0x316)][_0x5c1397(0x314)]=this[_0x5c1397(0x316)]['timer']||0x0,this[_0x5c1397(0x316)]['timer']--;if(this[_0x5c1397(0x316)][_0x5c1397(0x314)]>0x0)return;this[_0x5c1397(0x316)][_0x5c1397(0x314)]=this[_0x5c1397(0x316)][_0x5c1397(0x3d1)],this[_0x5c1397(0x5e6)]();}else return this[_0x5c1397(0x3cf)](_0xb12d4f);}else{if(_0x5c1397(0x302)!==_0x5c1397(0x302)){const _0x4e1a09=this[_0x5c1397(0x175)]();if(!_0x4e1a09)return![];return _0x4e1a09[_0x5c1397(0x64f)]>0x0;}else{return VisuMZ[_0x5c1397(0x3d8)][_0x5c1397(0x3da)][_0x5c1397(0x176)](this,_0xb12d4f);;}}},Game_SelfSwitches['prototype'][_0x116828(0x3cf)]=function(_0x5aed7d){const _0x22534f=_0x116828;return _0x5aed7d[0x2][_0x22534f(0x5ba)](/VAR/i)?this[_0x22534f(0x310)][_0x5aed7d]||0x0:!!this[_0x22534f(0x310)][_0x5aed7d];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x629)]=Game_SelfSwitches[_0x116828(0x29b)][_0x116828(0x384)],Game_SelfSwitches[_0x116828(0x29b)]['setValue']=function(_0x291c12,_0x18114f){const _0x4b8ab1=_0x116828;if(_0x291c12[0x2][_0x4b8ab1(0x5ba)](/(?:SELF|MAP)/i))'UvVRi'===_0x4b8ab1(0x253)?(this[_0x4b8ab1(0x460)](_0x50c4cb),this[_0x4b8ab1(0x3cc)](),_0x4c1818['EventsMoveCore'][_0x4b8ab1(0x331)][_0x4b8ab1(0x176)](this,_0xb3a922),this['clearEventCache'](),this[_0x4b8ab1(0x413)](),this['setupRegionRestrictions'](),this[_0x4b8ab1(0x3c8)](),this[_0x4b8ab1(0x36d)](),this['setupPlayerVisibilityOverrides'](),this['setupFollowerVisibilityOverrides'](),this[_0x4b8ab1(0x3cc)]()):this[_0x4b8ab1(0x50e)](_0x291c12,_0x18114f);else{if(_0x4b8ab1(0x5f5)==='cqNKI'){_0x3b2d45[_0x4b8ab1(0x549)]=_0x4df94f;const _0x431ed9=new _0x2bf7ee(_0x525f86['mapId'],_0xb143ef[_0x4b8ab1(0x160)]);_0x5c74ef[_0x4b8ab1(0x549)]=_0x23a3e3,_0x431ed9['refresh']();let _0x226f60=_0x9557c7-_0x431ed9[_0x4b8ab1(0x455)]['left'],_0x4a223b=_0x1044e5+_0x431ed9[_0x4b8ab1(0x455)][_0x4b8ab1(0x2aa)],_0x26a176=_0xda47f4-_0x431ed9[_0x4b8ab1(0x455)]['up'],_0x40d834=_0x3c925c+_0x431ed9[_0x4b8ab1(0x455)]['down'];for(let _0x665b66=_0x226f60;_0x665b66<=_0x4a223b;_0x665b66++){for(let _0x5236a4=_0x26a176;_0x5236a4<=_0x40d834;_0x5236a4++){if(this['checkExistingEntitiesAt'](_0x665b66,_0x5236a4))return![];}}return!![];}else VisuMZ['EventsMoveCore'][_0x4b8ab1(0x629)][_0x4b8ab1(0x176)](this,_0x291c12,_0x18114f);}},Game_SelfSwitches[_0x116828(0x29b)][_0x116828(0x50e)]=function(_0x215d34,_0x19e5fe){const _0x70e11=_0x116828;this['_data'][_0x215d34]=_0x215d34[0x2][_0x70e11(0x5ba)](/VAR/i)?_0x19e5fe:!!_0x19e5fe,this[_0x70e11(0x34d)]();},VisuMZ[_0x116828(0x3d8)][_0x116828(0x16b)]=Game_Enemy[_0x116828(0x29b)][_0x116828(0x63c)],Game_Enemy[_0x116828(0x29b)][_0x116828(0x63c)]=function(_0x336d37){const _0x2ce23c=_0x116828;$gameTemp[_0x2ce23c(0x444)](this);const _0x370440=VisuMZ['EventsMoveCore'][_0x2ce23c(0x16b)]['call'](this,_0x336d37);return $gameTemp[_0x2ce23c(0x3f2)](),_0x370440;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x625)]=Game_Troop['prototype']['meetsConditions'],Game_Troop[_0x116828(0x29b)][_0x116828(0x19e)]=function(_0x586297){const _0x59a859=_0x116828;$gameTemp[_0x59a859(0x444)](this);const _0x3f520a=VisuMZ[_0x59a859(0x3d8)][_0x59a859(0x625)][_0x59a859(0x176)](this,_0x586297);return $gameTemp[_0x59a859(0x3f2)](),_0x3f520a;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x331)]=Game_Map[_0x116828(0x29b)][_0x116828(0x3a2)],Game_Map[_0x116828(0x29b)][_0x116828(0x3a2)]=function(_0x4799ab){const _0x4f43d6=_0x116828;this[_0x4f43d6(0x460)](_0x4799ab),this[_0x4f43d6(0x3cc)](),VisuMZ[_0x4f43d6(0x3d8)][_0x4f43d6(0x331)][_0x4f43d6(0x176)](this,_0x4799ab),this[_0x4f43d6(0x3cc)](),this[_0x4f43d6(0x413)](),this[_0x4f43d6(0x644)](),this[_0x4f43d6(0x3c8)](),this[_0x4f43d6(0x36d)](),this[_0x4f43d6(0x5ec)](),this[_0x4f43d6(0x3d0)](),this[_0x4f43d6(0x3cc)]();},VisuMZ[_0x116828(0x3d8)]['Game_Map_setupEvents']=Game_Map[_0x116828(0x29b)][_0x116828(0x56f)],Game_Map[_0x116828(0x29b)][_0x116828(0x56f)]=function(){const _0x44ba92=_0x116828;VisuMZ[_0x44ba92(0x3d8)][_0x44ba92(0x587)][_0x44ba92(0x176)](this),this[_0x44ba92(0x298)]();},Game_Map['_eventOverloadThreshold']=0xc8,Game_Map[_0x116828(0x29b)]['determineEventOverload']=function(){const _0x56e4f3=_0x116828,_0x4d7797=Game_Map[_0x56e4f3(0x372)];this[_0x56e4f3(0x42e)]=this['events']()[_0x56e4f3(0x198)]>_0x4d7797;if(this[_0x56e4f3(0x42e)]&&$gameTemp[_0x56e4f3(0x61f)]()){}},Game_Map[_0x116828(0x29b)][_0x116828(0x4ff)]=function(){const _0xd5919f=_0x116828;return this[_0xd5919f(0x42e)];},Game_Map['prototype'][_0x116828(0x3cc)]=function(){const _0x5cbb06=_0x116828;this[_0x5cbb06(0x398)]=undefined;},Game_Map[_0x116828(0x29b)]['setupDiagonalSupport']=function(){const _0x2020eb=_0x116828;this[_0x2020eb(0x1cb)]=VisuMZ['EventsMoveCore'][_0x2020eb(0x256)]['Movement'][_0x2020eb(0x2f7)];const _0x437f29=$dataMap['note']||'';if(_0x437f29[_0x2020eb(0x5ba)](/<DIAGONAL MOVEMENT: ON>/i)){if(_0x2020eb(0x603)!=='akcHX'){if(_0x3c5844[_0x2020eb(0x305)]&&this[_0x2020eb(0x294)]())return this[_0x2020eb(0x493)](_0x71eda1,_0x260acc);else{const _0x51ecf6=_0x368c7f[_0x2020eb(0x62f)](_0x4d97f0,_0x580490)[_0x2020eb(0x608)](_0x3b5119=>_0x3b5119!==this);return _0x51ecf6[_0x2020eb(0x198)]>0x0;}}else this[_0x2020eb(0x1cb)]=!![];}else _0x437f29[_0x2020eb(0x5ba)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0x2020eb(0x1cb)]=![]);},Game_Map[_0x116828(0x29b)]['isSupportDiagonalMovement']=function(){const _0x20c0ae=_0x116828,_0x3a4370=$gameSystem[_0x20c0ae(0x38c)]();if(_0x3a4370==='enable')return!![];if(_0x3a4370===_0x20c0ae(0x40e))return![];if(this[_0x20c0ae(0x1cb)]===undefined)this['setupDiagonalSupport']();return this['_diagonalSupport'];},Game_Map[_0x116828(0x29b)][_0x116828(0x1d6)]=function(_0x3ba086,_0x2a0b35){const _0x5c1412=_0x116828;if([0x1,0x4,0x7][_0x5c1412(0x635)](_0x2a0b35))_0x3ba086-=0x1;if([0x3,0x6,0x9][_0x5c1412(0x635)](_0x2a0b35))_0x3ba086+=0x1;return this[_0x5c1412(0x605)](_0x3ba086);},Game_Map[_0x116828(0x29b)][_0x116828(0x1c5)]=function(_0x22bee1,_0x15a0ea){const _0x5a4225=_0x116828;if([0x1,0x2,0x3][_0x5a4225(0x635)](_0x15a0ea))_0x22bee1+=0x1;if([0x7,0x8,0x9][_0x5a4225(0x635)](_0x15a0ea))_0x22bee1-=0x1;return this[_0x5a4225(0x1dd)](_0x22bee1);},Game_Map['prototype']['absDistance']=function(_0x2c648c,_0x229cbf,_0x254895,_0x1e6339){const _0x751b4c=_0x116828;return Math['max'](Math['abs'](this['deltaX'](_0x2c648c,_0x254895)),Math[_0x751b4c(0x291)](this['deltaY'](_0x229cbf,_0x1e6339)));},Game_Map[_0x116828(0x29b)][_0x116828(0x644)]=function(){const _0x443e54=_0x116828,_0x1ecd59=VisuMZ['EventsMoveCore'][_0x443e54(0x256)][_0x443e54(0x55d)],_0x39c1d0={},_0x324f6b=[_0x443e54(0x4f7),_0x443e54(0x5ca),_0x443e54(0x5de)],_0x53939e=[_0x443e54(0x5ef),_0x443e54(0x2a6),_0x443e54(0x164),'Event','Vehicle',_0x443e54(0x1a5),_0x443e54(0x186),_0x443e54(0x2e6)];for(const _0x536e4a of _0x324f6b){for(const _0x3f4d4c of _0x53939e){if(_0x443e54(0x182)===_0x443e54(0x44e)){if(_0x3ba7a6[_0x443e54(0x47d)]())return![];return _0x25831d[_0x443e54(0x2dd)]['includes'](_0xb7af80);}else{const _0x5c6d73='%1%2'[_0x443e54(0x386)](_0x3f4d4c,_0x536e4a);_0x1ecd59[_0x5c6d73]&&(_0x39c1d0[_0x5c6d73]=_0x1ecd59[_0x5c6d73]['slice'](0x0));}}}const _0x1c3ee0=$dataMap[_0x443e54(0x5ed)]||'',_0x3d4b50=_0x1c3ee0['match'](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x3d4b50)for(const _0x1a7a3f of _0x3d4b50){_0x1a7a3f[_0x443e54(0x5ba)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x615f59=String(RegExp['$1'])[_0x443e54(0x49b)]()[_0x443e54(0x423)](),_0x19896f=String(RegExp['$2'])['toLowerCase']()[_0x443e54(0x423)]();const _0x3e8a70=JSON['parse']('['+RegExp['$3'][_0x443e54(0x5ba)](/\d+/g)+']');_0x615f59=_0x615f59[_0x443e54(0x19c)](0x0)['toUpperCase']()+_0x615f59[_0x443e54(0x4e9)](0x1),_0x19896f=_0x19896f['charAt'](0x0)[_0x443e54(0x5db)]()+_0x19896f[_0x443e54(0x4e9)](0x1);const _0x1ef0df=_0x443e54(0x1ed)['format'](_0x615f59,_0x19896f);if(_0x39c1d0[_0x1ef0df])_0x39c1d0[_0x1ef0df]=_0x39c1d0[_0x1ef0df][_0x443e54(0x44b)](_0x3e8a70);}this['_regionRules']=_0x39c1d0;},Game_Map['prototype']['isRegionAllowPass']=function(_0xb31375,_0x1b6751,_0x2fbe0b,_0x31b594){const _0x2a1b53=_0x116828,_0x3c401f=this[_0x2a1b53(0x1d6)](_0xb31375,_0x2fbe0b),_0x1d7e3d=this[_0x2a1b53(0x1c5)](_0x1b6751,_0x2fbe0b),_0x2103d2=this['regionId'](_0x3c401f,_0x1d7e3d),_0x401bc2=this['_regionRules'];if(_0x401bc2[_0x2a1b53(0x1c4)]['includes'](_0x2103d2))return!![];else{if(_0x31b594===_0x2a1b53(0x22e))return _0x401bc2[_0x2a1b53(0x2b1)][_0x2a1b53(0x635)](_0x2103d2)||_0x401bc2[_0x2a1b53(0x350)]['includes'](_0x2103d2);else{if(_0x31b594==='event')return _0x401bc2[_0x2a1b53(0x537)]['includes'](_0x2103d2)||_0x401bc2[_0x2a1b53(0x350)][_0x2a1b53(0x635)](_0x2103d2);else{if(_0x401bc2[_0x2a1b53(0x1cd)]['includes'](_0x2103d2)){if('xMjmC'!==_0x2a1b53(0x3b4)){const _0x97597b=this['_characterIndex']+_0x18d5c5(_0x427a8a['$1']);return this[_0x2a1b53(0x47b)](_0x97597b);}else return!![];}else{if(_0x2a1b53(0x362)!=='pCNqd'){const _0xa0c503=_0x2a1b53(0x281)[_0x2a1b53(0x386)](_0x31b594[_0x2a1b53(0x19c)](0x0)[_0x2a1b53(0x5db)]()+_0x31b594[_0x2a1b53(0x4e9)](0x1));if(_0x401bc2[_0xa0c503])return _0x401bc2[_0xa0c503][_0x2a1b53(0x635)](_0x2103d2);}else return!![];}}}}return![];},Game_Map[_0x116828(0x29b)][_0x116828(0x445)]=function(_0x28bc29,_0x4717d2,_0x42d1ed,_0x1221b4){const _0x4246d5=_0x116828,_0x2c1922=this[_0x4246d5(0x1d6)](_0x28bc29,_0x42d1ed),_0x3fc820=this[_0x4246d5(0x1c5)](_0x4717d2,_0x42d1ed),_0x2a3a66=this[_0x4246d5(0x607)](_0x2c1922,_0x3fc820),_0x24dd5b=this[_0x4246d5(0x250)];if(_0x24dd5b[_0x4246d5(0x18f)][_0x4246d5(0x635)](_0x2a3a66))return!![];else{if(_0x1221b4==='player'){if(_0x4246d5(0x28b)!=='OXEQE'){this[_0x4246d5(0x478)](_0x5b0e29);if(_0x2632f8['includes'](0x0)&&this[_0x4246d5(0x52e)]()===_0x4246d5(0x2a9))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x572507[_0x4246d5(0x635)](0x1)||_0x4c2fe3[_0x4246d5(0x635)](0x2))&&this[_0x4246d5(0x33f)]();}else return _0x24dd5b[_0x4246d5(0x590)][_0x4246d5(0x635)](_0x2a3a66)||_0x24dd5b['WalkForbid']['includes'](_0x2a3a66);}else{if(_0x1221b4==='event')return _0x24dd5b['EventForbid'][_0x4246d5(0x635)](_0x2a3a66)||_0x24dd5b[_0x4246d5(0x286)][_0x4246d5(0x635)](_0x2a3a66);else{if(_0x24dd5b[_0x4246d5(0x343)]['includes'](_0x2a3a66))return!![];else{if(_0x4246d5(0x52f)!==_0x4246d5(0x244)){const _0x42c9d2='%1Forbid'[_0x4246d5(0x386)](_0x1221b4['charAt'](0x0)[_0x4246d5(0x5db)]()+_0x1221b4['slice'](0x1));if(_0x24dd5b[_0x42c9d2])return _0x24dd5b[_0x42c9d2][_0x4246d5(0x635)](_0x2a3a66);}else{if(this[_0x4246d5(0x633)](_0x13909f,_0x277b72))return;_0x30bbf2[_0x4246d5(0x3d8)][_0x4246d5(0x60b)][_0x4246d5(0x176)](this,_0x2f2d17,_0xff4f19);}}}}}return![];},Game_Map[_0x116828(0x29b)][_0x116828(0x5b5)]=function(_0x3903f1,_0x151899,_0x220605,_0x4ca821){const _0x14c256=_0x116828;_0x220605=_0x4ca821===_0x14c256(0x2d5)?0x5:_0x220605;const _0x344d1a=this[_0x14c256(0x1d6)](_0x3903f1,_0x220605),_0x3d8382=this[_0x14c256(0x1c5)](_0x151899,_0x220605),_0x5b07a9=this[_0x14c256(0x607)](_0x344d1a,_0x3d8382),_0x1a7bee=this[_0x14c256(0x250)];if(_0x1a7bee[_0x14c256(0x29a)]['includes'](_0x5b07a9)){if(_0x14c256(0x4d5)!==_0x14c256(0x345))return!![];else this[_0x14c256(0x3e4)](_0x474d7b,_0x233f43);}else{if(_0x14c256(0x498)===_0x14c256(0x3ef)){if(_0x4fabad)_0x41c945[_0x14c256(0x649)](![]);}else{const _0x1a6d19=_0x14c256(0x201)['format'](_0x4ca821[_0x14c256(0x19c)](0x0)[_0x14c256(0x5db)]()+_0x4ca821[_0x14c256(0x4e9)](0x1));if(_0x1a7bee[_0x1a6d19])return _0x1a7bee[_0x1a6d19][_0x14c256(0x635)](_0x5b07a9);}}return![];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x297)]=Game_Map[_0x116828(0x29b)][_0x116828(0x51c)],Game_Map[_0x116828(0x29b)][_0x116828(0x51c)]=function(){const _0x5ddd2d=_0x116828;VisuMZ[_0x5ddd2d(0x3d8)][_0x5ddd2d(0x297)][_0x5ddd2d(0x176)](this),this[_0x5ddd2d(0x4fb)]();},Game_Map[_0x116828(0x29b)][_0x116828(0x4fb)]=function(){const _0x17c831=_0x116828;this[_0x17c831(0x4db)]=![];if(this[_0x17c831(0x3f1)]()[_0x17c831(0x1f2)](_0x2d6b74=>_0x2d6b74[_0x17c831(0x530)]())){if(_0x17c831(0x5f6)!==_0x17c831(0x5f6))return _0x272dce[_0x17c831(0x3d8)]['Settings']['Label'][_0x17c831(0x5dc)];else{this[_0x17c831(0x4db)]=!![];return;}}if(this[_0x17c831(0x3f1)]()[_0x17c831(0x1f2)](_0x36445e=>_0x36445e[_0x17c831(0x4d4)]())){this['_needsPeriodicRefresh']=!![];return;}if(this['_commonEvents'][_0x17c831(0x1f2)](_0x4931fb=>_0x4931fb[_0x17c831(0x530)]())){if('AwoIo'!=='UJBiL'){this['_needsPeriodicRefresh']=!![];return;}else{_0x46f448['ConvertParams'](_0x211dfd,_0x3aa08a);const _0xc1ba0e=_0x1b1057['getLastPluginCommandInterpreter']();_0x124dc6[_0x17c831(0x1f3)]=_0xc2dac9[_0x17c831(0x1f3)]||_0x50ca95['mapId']();const _0x5d1046=[_0x5b78f6[_0x17c831(0x1f3)],_0x59c030[_0x17c831(0x4de)]||_0xc1ba0e[_0x17c831(0x160)](),'Self\x20Switch\x20%1'[_0x17c831(0x386)](_0x4f996a[_0x17c831(0x5a3)])],_0x450a98=_0x3e547f[_0x17c831(0x61e)],_0x200f20=_0x375ed9[_0x17c831(0x4ba)](_0x5d1046)||![];_0x12d17b[_0x17c831(0x384)](_0x450a98,_0x200f20);}}if(this[_0x17c831(0x1a7)][_0x17c831(0x1f2)](_0xbd97c5=>_0xbd97c5[_0x17c831(0x4d4)]())){if(_0x17c831(0x28c)===_0x17c831(0x28c)){this[_0x17c831(0x4db)]=!![];return;}else this[_0x17c831(0x5ac)](this['x'],this['y']);}},VisuMZ[_0x116828(0x3d8)][_0x116828(0x378)]=Game_Map['prototype'][_0x116828(0x252)],Game_Map[_0x116828(0x29b)][_0x116828(0x252)]=function(_0x14192d){const _0x562fcd=_0x116828;this[_0x562fcd(0x27a)](),VisuMZ[_0x562fcd(0x3d8)][_0x562fcd(0x378)][_0x562fcd(0x176)](this,_0x14192d);},Game_Map['prototype'][_0x116828(0x27a)]=function(){const _0x4fae4d=_0x116828;if(!this[_0x4fae4d(0x4db)])return;this[_0x4fae4d(0x44d)]=this[_0x4fae4d(0x44d)]||0x3c,this[_0x4fae4d(0x44d)]--;if(this[_0x4fae4d(0x44d)]<=0x0){if(_0x4fae4d(0x484)!==_0x4fae4d(0x3b7))this['requestRefresh'](),this['_periodicRefreshTimer']=0x3c;else for(const _0x5f2b85 of _0x3dd74d){if(_0x5f2b85[_0x4fae4d(0x5ba)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x28c8c3=_0x168e35(_0x5b8e02['$1'])['toLowerCase']()['trim'](),_0xd7ab8d=_0x155b1c(_0x66be6a['$2']);this[_0x4fae4d(0x455)][_0x28c8c3]=_0xd7ab8d;}}}},VisuMZ[_0x116828(0x3d8)][_0x116828(0x5c7)]=Game_Map['prototype'][_0x116828(0x3b0)],Game_Map[_0x116828(0x29b)][_0x116828(0x3b0)]=function(){const _0x3257f6=_0x116828;if(!$gameSystem['isDashingEnabled']())return!![];return VisuMZ['EventsMoveCore'][_0x3257f6(0x5c7)][_0x3257f6(0x176)](this);},Game_Map[_0x116828(0x29b)][_0x116828(0x3c8)]=function(){const _0x39e388=_0x116828;this[_0x39e388(0x38b)]=![];const _0x3e3645=$dataMap[_0x39e388(0x5ed)]||'';_0x3e3645[_0x39e388(0x5ba)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x39e388(0x38b)]=!![]);},Game_Map[_0x116828(0x29b)][_0x116828(0x558)]=function(){const _0x34cddd=_0x116828;if(this[_0x34cddd(0x38b)]===undefined)this[_0x34cddd(0x3c8)]();return this[_0x34cddd(0x38b)];},Game_Map['prototype'][_0x116828(0x460)]=function(_0x2e88c6){const _0x1cbc99=_0x116828;_0x2e88c6!==this[_0x1cbc99(0x2d7)]()&&$gamePlayer&&$gameSystem[_0x1cbc99(0x460)](this[_0x1cbc99(0x2d7)]());},Game_Map[_0x116828(0x29b)][_0x116828(0x36d)]=function(){const _0x266b16=_0x116828;this[_0x266b16(0x20e)]=$gameSystem[_0x266b16(0x471)](this[_0x266b16(0x2d7)]()),this[_0x266b16(0x3b5)]=!![];},VisuMZ['EventsMoveCore'][_0x116828(0x2f9)]=Game_Map[_0x116828(0x29b)][_0x116828(0x3f1)],Game_Map[_0x116828(0x29b)][_0x116828(0x3f1)]=function(){const _0x1aead4=_0x116828;if(this[_0x1aead4(0x398)])return this[_0x1aead4(0x398)];const _0x3d8308=VisuMZ[_0x1aead4(0x3d8)][_0x1aead4(0x2f9)][_0x1aead4(0x176)](this),_0x5dee7b=_0x3d8308[_0x1aead4(0x44b)](this[_0x1aead4(0x20e)]||[]);return this[_0x1aead4(0x398)]=_0x5dee7b[_0x1aead4(0x608)](_0x185510=>!!_0x185510),this[_0x1aead4(0x398)];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x3ff)]=Game_Map[_0x116828(0x29b)][_0x116828(0x41a)],Game_Map[_0x116828(0x29b)][_0x116828(0x41a)]=function(_0x9009f3){const _0x564dad=_0x116828;return _0x9009f3>=0x3e8?(_0x9009f3-=0x3e8,this[_0x564dad(0x20e)][_0x9009f3]):_0x564dad(0x19f)==='LzAAA'?_0xa3c19[_0x564dad(0x3d8)][_0x564dad(0x475)][_0x564dad(0x176)](this)+(this[_0x564dad(0x523)]||0x0):VisuMZ['EventsMoveCore'][_0x564dad(0x3ff)][_0x564dad(0x176)](this,_0x9009f3);},Game_Map[_0x116828(0x29b)][_0x116828(0x2a7)]=function(_0x24cd68){const _0x1639e0=_0x116828,_0x479b08=this[_0x1639e0(0x41a)](_0x24cd68);if(_0x479b08)_0x479b08[_0x1639e0(0x288)]();},Game_Map['prototype'][_0x116828(0x4f3)]=function(){const _0x2f6393=_0x116828,_0x2b370f={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this['_spawnedEvents'][_0x2f6393(0x198)]+0x3e8};this[_0x2f6393(0x547)](_0x2b370f);},Game_Map[_0x116828(0x29b)][_0x116828(0x224)]=function(_0x487ad7,_0x2d2352){const _0x326efd=_0x116828;if(this[_0x326efd(0x463)](_0x487ad7,_0x2d2352)[_0x326efd(0x198)]>0x0)return!![];if($gamePlayer['x']===_0x487ad7&&$gamePlayer['y']===_0x2d2352)return!![];if(this[_0x326efd(0x4f2)]()[_0x326efd(0x2bb)](_0x487ad7,_0x2d2352))return!![];if(this[_0x326efd(0x519)]()[_0x326efd(0x2bb)](_0x487ad7,_0x2d2352))return!![];return![];},Game_Map[_0x116828(0x29b)][_0x116828(0x4fa)]=function(_0x20020b,_0x1edd8c,_0x582d89){const _0x39eb5a=_0x116828;$gameTemp['_spawnData']=_0x20020b;const _0x3d78eb=new Game_Event(_0x20020b[_0x39eb5a(0x2d7)],_0x20020b[_0x39eb5a(0x160)]);$gameTemp[_0x39eb5a(0x549)]=undefined,_0x3d78eb[_0x39eb5a(0x51c)]();let _0x500792=_0x1edd8c-_0x3d78eb[_0x39eb5a(0x455)][_0x39eb5a(0x2aa)],_0x320a42=_0x1edd8c+_0x3d78eb[_0x39eb5a(0x455)]['left'],_0x18b919=_0x582d89-_0x3d78eb[_0x39eb5a(0x455)]['up'],_0x5aa8b8=_0x582d89+_0x3d78eb[_0x39eb5a(0x455)][_0x39eb5a(0x3e6)];for(let _0x4edcd1=_0x500792;_0x4edcd1<=_0x320a42;_0x4edcd1++){for(let _0x43e9f0=_0x18b919;_0x43e9f0<=_0x5aa8b8;_0x43e9f0++){if(this[_0x39eb5a(0x224)](_0x4edcd1,_0x43e9f0))return![];}}return!![];},Game_Map[_0x116828(0x29b)][_0x116828(0x547)]=function(_0x5349d5){const _0x588e6d=_0x116828;$gameTemp['_spawnData']=_0x5349d5;const _0x13c8ba=new Game_Event(_0x5349d5[_0x588e6d(0x2d7)],_0x5349d5[_0x588e6d(0x160)]);$gameTemp['_spawnData']=undefined,this['_spawnedEvents'][_0x588e6d(0x346)](_0x13c8ba),_0x13c8ba['setupSpawn'](_0x5349d5),this[_0x588e6d(0x3cc)]();},Game_Map[_0x116828(0x29b)]['prepareSpawnedEventAtXY']=function(_0x453c58,_0xad9839,_0x37908c){const _0xeb46d5=_0x116828,_0x3a1daf=_0x453c58['template'][_0xeb46d5(0x5db)]()['trim']();if(_0x3a1daf!==_0xeb46d5(0x169)){if(_0xeb46d5(0x312)!==_0xeb46d5(0x246)){const _0x47b0cc=VisuMZ['EventTemplates'][_0x3a1daf];if(_0x47b0cc){if(_0xeb46d5(0x36b)!==_0xeb46d5(0x30d))_0x453c58[_0xeb46d5(0x2d7)]=_0x47b0cc['MapID'],_0x453c58[_0xeb46d5(0x160)]=_0x47b0cc[_0xeb46d5(0x506)];else{this[_0xeb46d5(0x1cb)]=_0x58841f['EventsMoveCore'][_0xeb46d5(0x256)][_0xeb46d5(0x534)][_0xeb46d5(0x2f7)];const _0x479181=_0x2da5e6[_0xeb46d5(0x5ed)]||'';if(_0x479181[_0xeb46d5(0x5ba)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else _0x479181[_0xeb46d5(0x5ba)](/<DIAGONAL MOVEMENT: OFF>/i)&&(this[_0xeb46d5(0x1cb)]=![]);}}}else{if(!_0xc45a17&&_0x21ca69[_0xeb46d5(0x3db)]())return![];if(!_0x3f19cf&&_0x3efcc5['isAnyEventStarting']())return![];if([_0xeb46d5(0x575),'region'][_0xeb46d5(0x635)](this[_0xeb46d5(0x495)]()))return!![];return _0x3e2de7['meetActivationProximityConditions'](this);}}const _0x26f669=_0x453c58['x'],_0x1f0c6c=_0x453c58['y'];if(!this[_0xeb46d5(0x494)](_0x26f669,_0x1f0c6c))return![];if(_0xad9839){if(this[_0xeb46d5(0x224)](_0x26f669,_0x1f0c6c))return![];if(!this[_0xeb46d5(0x4fa)](_0x453c58,_0x26f669,_0x1f0c6c))return![];}if(_0x37908c){if(!this[_0xeb46d5(0x637)](_0x26f669,_0x1f0c6c))return![];}return this[_0xeb46d5(0x547)](_0x453c58),!![];},Game_Map[_0x116828(0x29b)]['prepareSpawnedEventAtRegion']=function(_0x282003,_0xaac8c,_0x3701aa,_0x2c1068){const _0x455b6a=_0x116828,_0x585505=[],_0x773ba4=this[_0x455b6a(0x34b)](),_0x55602c=this[_0x455b6a(0x4b2)]();for(let _0x220e18=0x0;_0x220e18<_0x773ba4;_0x220e18++){for(let _0x3345ee=0x0;_0x3345ee<_0x55602c;_0x3345ee++){if(!_0xaac8c[_0x455b6a(0x635)](this['regionId'](_0x220e18,_0x3345ee)))continue;if(!this[_0x455b6a(0x494)](_0x220e18,_0x3345ee))continue;if(_0x3701aa){if(_0x455b6a(0x23e)!==_0x455b6a(0x23e))this[_0x455b6a(0x4c9)]=!![];else{if(this[_0x455b6a(0x224)](_0x220e18,_0x3345ee))continue;if(!this[_0x455b6a(0x4fa)](_0x282003,_0x220e18,_0x3345ee))continue;}}if(_0x2c1068){if(_0x455b6a(0x49a)===_0x455b6a(0x49a)){if(!this[_0x455b6a(0x637)](_0x220e18,_0x3345ee))continue;}else return this['screenX']();}_0x585505[_0x455b6a(0x346)]([_0x220e18,_0x3345ee]);}}if(_0x585505['length']>0x0){const _0x325280=_0x585505[Math[_0x455b6a(0x4a7)](_0x585505[_0x455b6a(0x198)])];return _0x282003['x']=_0x325280[0x0],_0x282003['y']=_0x325280[0x1],this[_0x455b6a(0x547)](_0x282003),!![];}return![];},Game_Map[_0x116828(0x29b)][_0x116828(0x2ae)]=function(_0x2813af,_0x37551f,_0x105698,_0x2aad37){const _0x5f4e5f=_0x116828,_0x10d44f=[],_0x44616b=this[_0x5f4e5f(0x34b)](),_0x411aa3=this[_0x5f4e5f(0x4b2)]();for(let _0x12ee1e=0x0;_0x12ee1e<_0x44616b;_0x12ee1e++){for(let _0x541cb4=0x0;_0x541cb4<_0x411aa3;_0x541cb4++){if(!_0x37551f[_0x5f4e5f(0x635)](this['terrainTag'](_0x12ee1e,_0x541cb4)))continue;if(!this[_0x5f4e5f(0x494)](_0x12ee1e,_0x541cb4))continue;if(_0x105698){if(this[_0x5f4e5f(0x224)](_0x12ee1e,_0x541cb4))continue;if(!this['isSpawnHitboxCollisionOk'](_0x2813af,_0x12ee1e,_0x541cb4))continue;}if(_0x2aad37){if(_0x5f4e5f(0x1b1)===_0x5f4e5f(0x1b1)){if(!this[_0x5f4e5f(0x637)](_0x12ee1e,_0x541cb4))continue;}else{let _0x35b07e=_0x4b3c73[_0x5f4e5f(0x3b9)]();if(_0x35b07e>0x0)return _0xd1f541[_0x5f4e5f(0x5c2)]()['follower'](_0x35b07e-0x1);}}_0x10d44f['push']([_0x12ee1e,_0x541cb4]);}}if(_0x10d44f['length']>0x0){const _0x19e382=_0x10d44f[Math['randomInt'](_0x10d44f[_0x5f4e5f(0x198)])];return _0x2813af['x']=_0x19e382[0x0],_0x2813af['y']=_0x19e382[0x1],this[_0x5f4e5f(0x547)](_0x2813af),!![];}return![];},Game_Map[_0x116828(0x29b)][_0x116828(0x637)]=function(_0x434517,_0x27bf24){const _0x595c32=_0x116828;if(this[_0x595c32(0x58f)](_0x434517,_0x27bf24,0x2))return!![];if(this[_0x595c32(0x58f)](_0x434517,_0x27bf24,0x4))return!![];if(this[_0x595c32(0x58f)](_0x434517,_0x27bf24,0x6))return!![];if(this['isPassable'](_0x434517,_0x27bf24,0x8))return!![];return![];},Game_Map[_0x116828(0x29b)][_0x116828(0x1c3)]=function(_0x3528cd){const _0x4f206f=_0x116828;if(_0x3528cd<0x3e8)return;if(!this[_0x4f206f(0x20e)])return;const _0x558d1a=this[_0x4f206f(0x41a)](_0x3528cd);_0x558d1a[_0x4f206f(0x3ac)](-0x1,-0x1),_0x558d1a['erase'](),this[_0x4f206f(0x20e)][_0x3528cd-0x3e8]=null,this[_0x4f206f(0x3cc)]();},Game_Map[_0x116828(0x29b)][_0x116828(0x27e)]=function(){const _0x20163d=_0x116828;for(const _0x24bc97 of this['_spawnedEvents']){if(_0x20163d(0x645)!==_0x20163d(0x53c)){if(_0x24bc97)return _0x24bc97;}else this['startMapCommonEventOnTouch']();}return null;},Game_Map[_0x116828(0x29b)]['firstSpawnedEventID']=function(){const _0x214b21=_0x116828,_0x78e7b=this[_0x214b21(0x27e)]();return _0x78e7b?_0x78e7b[_0x214b21(0x36e)]:0x0;},Game_Map[_0x116828(0x29b)][_0x116828(0x474)]=function(){const _0x3cebd4=_0x116828,_0x33b394=this[_0x3cebd4(0x20e)][_0x3cebd4(0x4e9)](0x0)[_0x3cebd4(0x2c2)]();for(const _0x1be720 of _0x33b394){if(_0x1be720)return _0x1be720;}return null;},Game_Map['prototype'][_0x116828(0x3b3)]=function(){const _0x85136e=_0x116828,_0x37ca0b=this[_0x85136e(0x474)]();return _0x37ca0b?_0x37ca0b[_0x85136e(0x36e)]:0x0;},Game_Map['prototype'][_0x116828(0x488)]=function(_0x269756,_0x214568){const _0x43b81c=_0x116828,_0x1d7ee3=this[_0x43b81c(0x463)](_0x269756,_0x214568);for(const _0xa0e88e of _0x1d7ee3){if(!_0xa0e88e)continue;if(_0xa0e88e['isSpawnedEvent']())this[_0x43b81c(0x1c3)](_0xa0e88e[_0x43b81c(0x36e)]);}},Game_Map[_0x116828(0x29b)][_0x116828(0x264)]=function(_0x1a114a){const _0x5c4338=_0x116828;for(const _0x19fb1f of this[_0x5c4338(0x20e)]){if(!_0x19fb1f)continue;_0x1a114a[_0x5c4338(0x635)](_0x19fb1f[_0x5c4338(0x607)]())&&this[_0x5c4338(0x1c3)](_0x19fb1f[_0x5c4338(0x36e)]);}},Game_Map['prototype'][_0x116828(0x55f)]=function(_0x5143dd){const _0x575af3=_0x116828;for(const _0x552c55 of this[_0x575af3(0x20e)]){if(!_0x552c55)continue;if(_0x5143dd['includes'](_0x552c55[_0x575af3(0x5d4)]())){if(_0x575af3(0x318)!==_0x575af3(0x5e7))this[_0x575af3(0x1c3)](_0x552c55[_0x575af3(0x36e)]);else return!![];}}},Game_Map['prototype'][_0x116828(0x5a9)]=function(){const _0x54dda5=_0x116828;for(const _0x316474 of this[_0x54dda5(0x20e)]){if(_0x54dda5(0x56d)!==_0x54dda5(0x22c)){if(!_0x316474)continue;this[_0x54dda5(0x1c3)](_0x316474[_0x54dda5(0x36e)]);}else{if(!this[_0x54dda5(0x22a)])return;if(!this[_0x54dda5(0x36c)](!![]))return;if(!this[_0x54dda5(0x217)](!![]))return;_0x52bffd['EventsMoveCore'][_0x54dda5(0x648)][_0x54dda5(0x176)](this);}}},VisuMZ[_0x116828(0x3d8)]['Game_Map_unlockEvent']=Game_Map['prototype'][_0x116828(0x50d)],Game_Map[_0x116828(0x29b)][_0x116828(0x50d)]=function(_0x465002){const _0x1ddbb9=_0x116828;VisuMZ[_0x1ddbb9(0x3d8)][_0x1ddbb9(0x54a)][_0x1ddbb9(0x176)](this,_0x465002);if(_0x465002>=0x3e8){const _0x38e188=this[_0x1ddbb9(0x41a)](_0x465002);if(_0x38e188)_0x38e188[_0x1ddbb9(0x4c5)]();}},Game_Map[_0x116828(0x29b)]['setupPlayerVisibilityOverrides']=function(){const _0x475355=_0x116828;this['_forceShowPlayer']=![],this[_0x475355(0x363)]=![];if(!$dataMap)return;const _0x4091ea=$dataMap[_0x475355(0x5ed)]||'';if(_0x4091ea['match'](/<HIDE PLAYER>/i))this[_0x475355(0x5df)]=![],this[_0x475355(0x363)]=!![];else _0x4091ea[_0x475355(0x5ba)](/<SHOW PLAYER>/i)&&(this['_forceShowPlayer']=!![],this[_0x475355(0x363)]=![]);},Game_Map[_0x116828(0x29b)][_0x116828(0x39a)]=function(){const _0x26946d=_0x116828;return this[_0x26946d(0x5df)]===undefined&&this['setupPlayerVisibilityOverrides'](),this[_0x26946d(0x5df)];},Game_Map['prototype']['isPlayerForceHidden']=function(){const _0x4c5950=_0x116828;return this['_forceHidePlayer']===undefined&&this[_0x4c5950(0x5ec)](),this['_forceHidePlayer'];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x536)]=Game_CharacterBase['prototype']['isTransparent'],Game_CharacterBase['prototype'][_0x116828(0x36f)]=function(){const _0x371083=_0x116828;if(this===$gamePlayer){if('anZzp'===_0x371083(0x2e8))return this[_0x371083(0x211)]();else{if($gameMap[_0x371083(0x39a)]())return![];if($gameMap[_0x371083(0x3a6)]())return!![];}}return VisuMZ[_0x371083(0x3d8)][_0x371083(0x536)]['call'](this);},Game_Map[_0x116828(0x29b)][_0x116828(0x3d0)]=function(){const _0x2c9a1e=_0x116828;this['_forceShowFollower']=![],this[_0x2c9a1e(0x1fa)]=![];if(!$dataMap)return;const _0x3eed6a=$dataMap[_0x2c9a1e(0x5ed)]||'';if(_0x3eed6a[_0x2c9a1e(0x5ba)](/<HIDE FOLLOWERS>/i))this['_forceShowFollower']=![],this[_0x2c9a1e(0x1fa)]=!![];else{if(_0x3eed6a[_0x2c9a1e(0x5ba)](/<SHOW FOLLOWERS>/i)){if(_0x2c9a1e(0x279)!==_0x2c9a1e(0x279))return![];else this[_0x2c9a1e(0x369)]=!![],this['_forceHideFollower']=![];}}},Game_Map[_0x116828(0x29b)]['areFollowersForceShown']=function(){const _0x52ed6f=_0x116828;return this[_0x52ed6f(0x369)]===undefined&&this[_0x52ed6f(0x3d0)](),this['_forceShowFollower'];},Game_Map[_0x116828(0x29b)]['areFollowersForceHidden']=function(){const _0x3ace36=_0x116828;return this[_0x3ace36(0x1fa)]===undefined&&this[_0x3ace36(0x3d0)](),this[_0x3ace36(0x1fa)];},VisuMZ[_0x116828(0x3d8)]['Game_Followers_isVisible']=Game_Followers[_0x116828(0x29b)][_0x116828(0x555)],Game_Followers[_0x116828(0x29b)]['isVisible']=function(){const _0x252b94=_0x116828;if($gameMap['areFollowersForceShown']())return!![];if($gameMap[_0x252b94(0x26d)]())return![];return VisuMZ[_0x252b94(0x3d8)]['Game_Followers_isVisible'][_0x252b94(0x176)](this);},Game_CommonEvent['prototype']['hasAdvancedSwitchVariable']=function(){const _0x424450=_0x116828,_0x55e6a3=this['event']();return this['isActive']()&&_0x55e6a3[_0x424450(0x50b)]>=0x1&&DataManager[_0x424450(0x1bd)](_0x55e6a3[_0x424450(0x437)]);},Game_CommonEvent[_0x116828(0x29b)][_0x116828(0x4d4)]=function(){const _0x1c2cf5=_0x116828;return VisuMZ[_0x1c2cf5(0x3d8)][_0x1c2cf5(0x2d9)]['_commonEvents'][_0x1c2cf5(0x635)](this[_0x1c2cf5(0x3fb)]);},VisuMZ['EventsMoveCore']['Game_CommonEvent_isActive']=Game_CommonEvent['prototype'][_0x116828(0x620)],Game_CommonEvent[_0x116828(0x29b)][_0x116828(0x620)]=function(){const _0xdb09be=_0x116828;return VisuMZ[_0xdb09be(0x3d8)]['Game_CommonEvent_isActive'][_0xdb09be(0x176)](this)?!![]:VisuMZ['EventsMoveCore'][_0xdb09be(0x2d9)][_0xdb09be(0x64e)](this[_0xdb09be(0x41a)]()[_0xdb09be(0x57e)],this['_commonEventId']);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x3dc)]=Game_Map['prototype'][_0x116828(0x323)],Game_Map['prototype']['parallelCommonEvents']=function(){const _0x43d432=_0x116828,_0xfd2ff2=VisuMZ['EventsMoveCore']['Game_Map_parallelCommonEvents'][_0x43d432(0x176)](this),_0x33a52a=VisuMZ[_0x43d432(0x3d8)][_0x43d432(0x2d9)][_0x43d432(0x1a7)][_0x43d432(0x37f)](_0x33281d=>$dataCommonEvents[_0x33281d]);return _0xfd2ff2[_0x43d432(0x44b)](_0x33a52a)['filter']((_0x44d6da,_0x5d3c56,_0x24355b)=>_0x24355b[_0x43d432(0x4ef)](_0x44d6da)===_0x5d3c56);},VisuMZ['EventsMoveCore'][_0x116828(0x238)]=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x4cc)],Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x4cc)]=function(){const _0x504d53=_0x116828;VisuMZ['EventsMoveCore']['Game_CharacterBase_initMembers'][_0x504d53(0x176)](this),this['initEventsMoveCoreSettings']();},Game_CharacterBase[_0x116828(0x29b)]['initEventsMoveCoreSettings']=function(){const _0x3fd338=_0x116828;this[_0x3fd338(0x4d7)]=![],this['clearPose'](),this[_0x3fd338(0x211)](),this[_0x3fd338(0x35e)](),this['clearStepPattern']();},VisuMZ[_0x116828(0x3d8)][_0x116828(0x479)]=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x375)],Game_CharacterBase[_0x116828(0x29b)]['opacity']=function(){const _0x3197c3=_0x116828;let _0x24a5d1=VisuMZ[_0x3197c3(0x3d8)]['Game_CharacterBase_opacity'][_0x3197c3(0x176)](this);return _0x24a5d1=this['adjustMoveSynchOpacityDelta'](_0x24a5d1),_0x24a5d1;},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x54c)]=function(_0x5861ae){return _0x5861ae;},Game_CharacterBase[_0x116828(0x29b)]['isSpriteVS8dir']=function(){const _0x2744b0=_0x116828;if(this[_0x2744b0(0x565)]===Game_Player&&this[_0x2744b0(0x2a3)]()){if(_0x2744b0(0x497)==='bAGIQ')return this[_0x2744b0(0x1ab)]()[_0x2744b0(0x374)]()[_0x2744b0(0x5ba)](/\[VS8\]/i);else this[_0x2744b0(0x422)]=!![];}else{if(Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x2744b0(0x562)]()){if(_0x2744b0(0x4e1)!==_0x2744b0(0x265))return!![];else{if(!_0xd59e6c['advancedFunc'][_0x27b6e7]){_0x437c00[_0x2744b0(0x32a)][_0x310ca6][_0x2744b0(0x5ba)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4939b6=_0x2744b0(0x4c2)['format'](_0x24d112(_0x4df394['$1']));_0x54f855[_0x2744b0(0x4a4)][_0x15fa4e]=new _0x34f55d(_0x2744b0(0x437),_0x4939b6);}const _0xc731cf=_0x3ed0f9[_0x2744b0(0x611)]()||this;return _0x440a7b[_0x2744b0(0x4a4)][_0x4d61bc][_0x2744b0(0x176)](_0xc731cf,_0x508be9);}}else return this[_0x2744b0(0x374)]()['match'](/\[VS8\]/i);}},VisuMZ['EventsMoveCore'][_0x116828(0x35b)]=Game_CharacterBase[_0x116828(0x29b)]['direction'],Game_CharacterBase['prototype'][_0x116828(0x592)]=function(){const _0x276bd3=_0x116828;if(!$dataMap)return this['_direction']||0x2;if(this['isOnLadder']()&&!this['isJumping']()&&this[_0x276bd3(0x368)]())return this[_0x276bd3(0x60f)]();else{if(this[_0x276bd3(0x1dc)]()&&!this[_0x276bd3(0x508)]()){if(_0x276bd3(0x3ad)==='oxwIs')return 0x8;else _0x79428b[_0x276bd3(0x3d8)][_0x276bd3(0x2d9)]['loadCPC'](_0x52c745);}else{if(this[_0x276bd3(0x51b)]()&&this[_0x276bd3(0x368)]())return this[_0x276bd3(0x180)]();else{if(_0x276bd3(0x430)!=='VLjYY')return VisuMZ[_0x276bd3(0x3d8)]['Game_CharacterBase_direction']['call'](this);else this['_selfTarget']=_0x60b4e1;}}}},VisuMZ[_0x116828(0x3d8)][_0x116828(0x5b8)]=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x393)],Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x393)]=function(_0x2116ea){const _0xe88a95=_0x116828;if(!this[_0xe88a95(0x368)]())_0x2116ea=this['correctFacingDirection'](_0x2116ea);VisuMZ[_0xe88a95(0x3d8)][_0xe88a95(0x5b8)][_0xe88a95(0x176)](this,_0x2116ea);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x5f3)]=function(_0x13827b){const _0x106710=_0x116828;if(_0x13827b===0x1)return this['canPass'](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0x13827b===0x3)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0x13827b===0x7)return this[_0x106710(0x1ec)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0x13827b===0x9)return this['canPass'](this['_x'],this['_y'],0x6)?0x6:0x8;return _0x13827b;},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x612)]=function(_0x42e036){const _0x1f92e6=_0x116828;return[0x1,0x3,0x5,0x7,0x9][_0x1f92e6(0x635)](_0x42e036);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x57a)]=function(){const _0x5d3792=_0x116828;return this[_0x5d3792(0x26f)]||0x0;},VisuMZ['EventsMoveCore'][_0x116828(0x47c)]=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x563)],Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x563)]=function(_0xe957dc){const _0x1a7f2a=_0x116828;this[_0x1a7f2a(0x26f)]=_0xe957dc,VisuMZ['EventsMoveCore'][_0x1a7f2a(0x47c)]['call'](this,_0xe957dc);},Game_CharacterBase['prototype'][_0x116828(0x332)]=function(_0x17c9de){const _0x1ec7bc=_0x116828;if(!this[_0x1ec7bc(0x612)](_0x17c9de))return this[_0x1ec7bc(0x563)](_0x17c9de);let _0xbab8e4=0x0,_0x3e3b46=0x0;switch(_0x17c9de){case 0x1:_0xbab8e4=0x4,_0x3e3b46=0x2;break;case 0x3:_0xbab8e4=0x6,_0x3e3b46=0x2;break;case 0x7:_0xbab8e4=0x4,_0x3e3b46=0x8;break;case 0x9:_0xbab8e4=0x6,_0x3e3b46=0x8;break;}if(VisuMZ[_0x1ec7bc(0x3d8)]['Settings']['Movement'][_0x1ec7bc(0x5a7)]){if(!this['canPass'](this['_x'],this['_y'],_0xbab8e4)){if(_0x1ec7bc(0x1f7)===_0x1ec7bc(0x383)){if(!_0x2ae0ab[_0x1ec7bc(0x3d8)][_0x1ec7bc(0x256)]['Movement'][_0x1ec7bc(0x388)])return;for(const _0x5a3960 of this[_0x1ec7bc(0x4e6)]){this['createCharacterShadow'](_0x5a3960);}}else return this[_0x1ec7bc(0x563)](_0x3e3b46);}if(!this[_0x1ec7bc(0x1ec)](this['_x'],this['_y'],_0x3e3b46))return _0x1ec7bc(0x156)===_0x1ec7bc(0x50f)?_0x5c1567[_0x1ec7bc(0x3d8)][_0x1ec7bc(0x3ff)][_0x1ec7bc(0x176)](this,_0xc40d0b):this[_0x1ec7bc(0x563)](_0xbab8e4);if(!this[_0x1ec7bc(0x452)](this['_x'],this['_y'],_0xbab8e4,_0x3e3b46)){let _0x53e06d=VisuMZ['EventsMoveCore']['Settings'][_0x1ec7bc(0x534)]['FavorHorz']?_0xbab8e4:_0x3e3b46;return this[_0x1ec7bc(0x563)](_0x53e06d);}}this[_0x1ec7bc(0x26f)]=_0x17c9de,this[_0x1ec7bc(0x578)](_0xbab8e4,_0x3e3b46);},VisuMZ[_0x116828(0x3d8)]['Game_CharacterBase_realMoveSpeed']=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x1e1)],Game_CharacterBase[_0x116828(0x29b)]['realMoveSpeed']=function(){const _0xaf4d78=_0x116828;let _0x3f7030=this['_moveSpeed'];return this[_0xaf4d78(0x153)]()&&(_0x3f7030+=this[_0xaf4d78(0x165)]()),this[_0xaf4d78(0x229)](_0x3f7030);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x165)]=function(){const _0x2a1fa5=_0x116828,_0x3ceb5a=VisuMZ['EventsMoveCore']['Settings'][_0x2a1fa5(0x534)];if(_0x3ceb5a['DashModifier']!==undefined)return _0x3ceb5a[_0x2a1fa5(0x1ad)];else{if('jvxSv'!==_0x2a1fa5(0x4d0)){let _0x32bd0e=[0x0,0x0,_0x2a1fa5(0x3bd)[_0x2a1fa5(0x386)](_0x558e23,_0x32f70d)];_0x208f12['setValue'](_0x32bd0e,_0x1b4b6f);}else return VisuMZ[_0x2a1fa5(0x3d8)][_0x2a1fa5(0x490)][_0x2a1fa5(0x176)](this)-this['_moveSpeed'];}},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x229)]=function(_0xe0e172){const _0x300ae8=_0x116828,_0x2ed213=VisuMZ[_0x300ae8(0x3d8)][_0x300ae8(0x256)][_0x300ae8(0x534)];if(!_0x2ed213['SlowerSpeed'])return _0xe0e172;return[0x1,0x3,0x7,0x9][_0x300ae8(0x635)](this['_lastMovedDirection'])&&(_0xe0e172*=_0x2ed213['DiagonalSpeedMultiplier']||0.01),_0xe0e172;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x1e7)]=Game_CharacterBase[_0x116828(0x29b)]['isDashing'],Game_CharacterBase['prototype'][_0x116828(0x153)]=function(){const _0x2ae869=_0x116828;if(this[_0x2ae869(0x4f9)])return!![];return VisuMZ[_0x2ae869(0x3d8)]['Game_CharacterBase_isDashing']['call'](this);},Game_CharacterBase[_0x116828(0x29b)]['isDashingAndMoving']=function(){const _0x2da5cb=_0x116828;return this[_0x2da5cb(0x153)]()&&this['_stopCount']===0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern']=Game_CharacterBase[_0x116828(0x29b)]['pattern'],Game_CharacterBase['prototype'][_0x116828(0x551)]=function(){const _0x493a8b=_0x116828;if(this[_0x493a8b(0x51b)]()){if(_0x493a8b(0x52d)==='syQKX')this[_0x493a8b(0x616)]['z']=this['z']-0x1;else return this[_0x493a8b(0x284)]();}else return VisuMZ['EventsMoveCore']['Game_CharacterBase_pattern'][_0x493a8b(0x176)](this);},VisuMZ['EventsMoveCore'][_0x116828(0x53d)]=Game_CharacterBase['prototype']['increaseSteps'],Game_CharacterBase['prototype'][_0x116828(0x1db)]=function(){const _0x2a4049=_0x116828;VisuMZ['EventsMoveCore'][_0x2a4049(0x53d)][_0x2a4049(0x176)](this),this[_0x2a4049(0x48b)]();},VisuMZ[_0x116828(0x3d8)][_0x116828(0x234)]=Game_CharacterBase['prototype'][_0x116828(0x37c)],Game_CharacterBase['prototype']['characterIndex']=function(){const _0x54f4e4=_0x116828;if(this['isSpriteVS8dir']())return this['characterIndexVS8']();return VisuMZ[_0x54f4e4(0x3d8)][_0x54f4e4(0x234)]['call'](this);},Game_CharacterBase['prototype']['characterIndexVS8']=function(){const _0x3db32f=_0x116828,_0x267261=this['direction']();if(this[_0x3db32f(0x508)]()){if([0x2,0x4,0x6,0x8][_0x3db32f(0x635)](_0x267261))return 0x4;if([0x1,0x3,0x7,0x9][_0x3db32f(0x635)](_0x267261))return 0x5;}else{if(this[_0x3db32f(0x1dc)]())return'Owudp'===_0x3db32f(0x63a)?_0x442db7[_0x3db32f(0x39c)]()?this[_0x3db32f(0x3e9)]():_0x164efe['EventsMoveCore'][_0x3db32f(0x315)]['call'](this):0x6;else{if(this[_0x3db32f(0x51b)]()){if(_0x3db32f(0x1bc)==='Liovg'){if(this[_0x3db32f(0x3b8)]<=0x0)return;this['_paused']=![],this[_0x3db32f(0x606)]=!![];}else return this['getPosingCharacterIndex']();}else{if(this[_0x3db32f(0x2df)]){if(_0x3db32f(0x2c7)!==_0x3db32f(0x2c7)){const _0x21c185=['',_0x3db32f(0x3d9),'DOWN',_0x3db32f(0x2e0),_0x3db32f(0x242),'',_0x3db32f(0x1e0),_0x3db32f(0x525),'UP',_0x3db32f(0x5ee)],_0xeb40c1=_0x21c185[_0x3db32f(0x4ef)](_0x46782a['toUpperCase']()[_0x3db32f(0x423)]());if(_0xeb40c1<=0x0)return;if(_0x459e2b)_0x354b27[_0x3db32f(0x426)]=!![];if(this['canPass'](this['x'],this['y'],_0xeb40c1)){if(_0x1d490d)_0x574c77['_moveAllowPlayerCollision']=![];this[_0x3db32f(0x332)](_0xeb40c1),this[_0x3db32f(0x631)]-=0x1;}if(_0x36c37d)_0x5772e1[_0x3db32f(0x426)]=![];}else{if([0x2,0x4,0x6,0x8][_0x3db32f(0x635)](_0x267261))return 0x4;if([0x1,0x3,0x7,0x9][_0x3db32f(0x635)](_0x267261))return 0x5;}}else{if(this[_0x3db32f(0x63e)]()&&this['useCarryPoseForIcons']()){if([0x2,0x4,0x6,0x8][_0x3db32f(0x635)](_0x267261))return 0x4;if([0x1,0x3,0x7,0x9][_0x3db32f(0x635)](_0x267261))return 0x5;}else{if(this[_0x3db32f(0x61a)]()){if([0x2,0x4,0x6,0x8][_0x3db32f(0x635)](_0x267261))return 0x2;if([0x1,0x3,0x7,0x9][_0x3db32f(0x635)](_0x267261))return 0x3;}else{if('oGmvk'===_0x3db32f(0x588)){if(_0x7d535c)this[_0x3db32f(0x602)](_0x556eb1['x'],_0x35840f['y'],_0x2f5839);}else{if([0x2,0x4,0x6,0x8]['includes'](_0x267261))return 0x0;if([0x1,0x3,0x7,0x9][_0x3db32f(0x635)](_0x267261))return 0x1;}}}}}}}},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x618)]=function(){const _0x51db4d=_0x116828;return VisuMZ['EventsMoveCore'][_0x51db4d(0x256)]['VS8'][_0x51db4d(0x299)];},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x5f8)]=function(){const _0x30101c=_0x116828;return this['isOnLadder']()&&this['terrainTag']()===VisuMZ[_0x30101c(0x3d8)][_0x30101c(0x256)][_0x30101c(0x3c6)][_0x30101c(0x213)];},Game_CharacterBase[_0x116828(0x29b)]['directionOnLadderSpriteVS8dir']=function(){const _0x3112ce=_0x116828;if(this[_0x3112ce(0x5f8)]()){if(_0x3112ce(0x3c9)!=='CVRrj'){if(this[_0x3112ce(0x476)]===_0x5640cf)this[_0x3112ce(0x329)]();return this['_followerChaseOff'];}else return 0x4;}else{if(_0x3112ce(0x22b)===_0x3112ce(0x184)){if(!_0x17ea39[_0x3112ce(0x18c)]())return;_0x109d0b[_0x3112ce(0x15b)]();}else return 0x2;}},VisuMZ[_0x116828(0x3d8)][_0x116828(0x2db)]=Game_CharacterBase['prototype'][_0x116828(0x252)],Game_CharacterBase['prototype']['update']=function(){const _0x322c8f=_0x116828;VisuMZ[_0x322c8f(0x3d8)]['Game_CharacterBase_update'][_0x322c8f(0x176)](this),this['updatePose']();},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x328)]=function(){const _0x2543f6=_0x116828;this[_0x2543f6(0x50a)]=this['_poseDuration']||0x0;if(this[_0x2543f6(0x50a)]>0x0){this[_0x2543f6(0x50a)]--;if(this[_0x2543f6(0x50a)]<=0x0&&this[_0x2543f6(0x42f)]!==_0x2543f6(0x467))this[_0x2543f6(0x48b)]();}},VisuMZ[_0x116828(0x3d8)]['Game_CharacterBase_moveDiagonally']=Game_CharacterBase[_0x116828(0x29b)]['moveDiagonally'],Game_CharacterBase[_0x116828(0x29b)]['moveDiagonally']=function(_0x4ae3ab,_0x5df025){const _0xc81b54=_0x116828;VisuMZ['EventsMoveCore'][_0xc81b54(0x55b)][_0xc81b54(0x176)](this,_0x4ae3ab,_0x5df025);if(this[_0xc81b54(0x368)]())this[_0xc81b54(0x21e)](_0x4ae3ab,_0x5df025);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x21e)]=function(_0xad59ef,_0x288bc0){const _0x5913cc=_0x116828;if(_0xad59ef===0x4&&_0x288bc0===0x2)this['setDirection'](0x1);if(_0xad59ef===0x6&&_0x288bc0===0x2)this[_0x5913cc(0x393)](0x3);if(_0xad59ef===0x4&&_0x288bc0===0x8)this[_0x5913cc(0x393)](0x7);if(_0xad59ef===0x6&&_0x288bc0===0x8)this[_0x5913cc(0x393)](0x9);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x4df)]=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x3fd)],Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x3fd)]=function(){const _0x5230a0=_0x116828;if(this[_0x5230a0(0x51b)]()&&this[_0x5230a0(0x4b8)]()===_0x5230a0(0x467))return!![];return VisuMZ['EventsMoveCore'][_0x5230a0(0x4df)][_0x5230a0(0x176)](this);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x35a)]=function(_0x84bbce,_0x39f541){const _0x39eeb9=_0x116828;if(_0x84bbce[_0x39eeb9(0x5ba)](/Z/i))_0x84bbce='ZZZ';if(_0x84bbce[_0x39eeb9(0x5ba)](/SLEEP/i))_0x84bbce=_0x39eeb9(0x467);this[_0x39eeb9(0x368)]()&&(this[_0x39eeb9(0x42f)]=_0x84bbce['toUpperCase']()[_0x39eeb9(0x423)](),this[_0x39eeb9(0x50a)]=_0x39f541||Infinity);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x4b8)]=function(){const _0x41120c=_0x116828;if(this[_0x41120c(0x368)]()){if('DUvDf'!==_0x41120c(0x584))this['contentsOpacity']=0x0;else return(this[_0x41120c(0x42f)]||'')[_0x41120c(0x5db)]()[_0x41120c(0x423)]();}else{if(_0x41120c(0x3b6)!==_0x41120c(0x3b6))_0x174032['_shadowSprite']=new _0x118fbb(),_0x3c48a2['_shadowSprite'][_0x41120c(0x60e)]=_0x1e2858[_0x41120c(0x27b)][_0x41120c(0x1c1)](),_0x38ace1[_0x41120c(0x616)]['bitmap']=_0x4434ba[_0x41120c(0x5af)](_0x3ec5d5[_0x41120c(0x616)][_0x41120c(0x60e)]),_0x1a4716['_shadowSprite']['anchor']['x']=0.5,_0x1e1d1c[_0x41120c(0x616)]['anchor']['y']=0x1,_0x4e4eee['_shadowSprite']['z']=0x0,this[_0x41120c(0x527)]['addChild'](_0x7bc14a['_shadowSprite']);else return''['toUpperCase']()[_0x41120c(0x423)]();}},Game_CharacterBase['prototype']['setBalloonPose']=function(_0x128da7,_0x56a38b){const _0xf35b01=_0x116828;if(this[_0xf35b01(0x368)]()){if(_0xf35b01(0x45a)===_0xf35b01(0x45a)){const _0x33a181=['',_0xf35b01(0x49e),_0xf35b01(0x35c),_0xf35b01(0x3a9),'HEART','ANGER',_0xf35b01(0x2de),_0xf35b01(0x533),_0xf35b01(0x2c9),_0xf35b01(0x30e),_0xf35b01(0x467),'','','','',''][_0x128da7];this[_0xf35b01(0x35a)](_0x33a181,_0x56a38b);}else _0x289c63['EventsMoveCore'][_0xf35b01(0x2db)]['call'](this),this[_0xf35b01(0x328)]();}},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x48b)]=function(){const _0xf3b821=_0x116828;this[_0xf3b821(0x42f)]='',this['_poseDuration']=0x0;},Game_CharacterBase['prototype']['isPosing']=function(){const _0x12fbc7=_0x116828;return this[_0x12fbc7(0x368)]()&&!!this[_0x12fbc7(0x42f)];},Game_CharacterBase['prototype'][_0x116828(0x632)]=function(){const _0x2d3afc=_0x116828,_0x5e2ca2=this['_pose'][_0x2d3afc(0x5db)]();switch(this['_pose'][_0x2d3afc(0x5db)]()[_0x2d3afc(0x423)]()){case _0x2d3afc(0x16e):case _0x2d3afc(0x1bb):case _0x2d3afc(0x396):case'HURT':case'KNEEL':case _0x2d3afc(0x47e):return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x116828(0x29b)]['getPosingCharacterDirection']=function(){const _0x2bb60a=_0x116828;switch(this[_0x2bb60a(0x42f)][_0x2bb60a(0x5db)]()){case _0x2bb60a(0x49e):case _0x2bb60a(0x35c):case _0x2bb60a(0x3a9):case'!':case'?':return 0x2;break;case'HEART':case _0x2bb60a(0x34e):case _0x2bb60a(0x2de):return 0x4;break;case _0x2bb60a(0x16e):case _0x2bb60a(0x1bb):case _0x2bb60a(0x396):case'COBWEB':case'SILENCE':case _0x2bb60a(0x30e):return 0x6;break;case _0x2bb60a(0x47f):case'KNEEL':case _0x2bb60a(0x47e):case'ZZZ':case _0x2bb60a(0x3c3):return 0x8;break;default:return VisuMZ[_0x2bb60a(0x3d8)][_0x2bb60a(0x5b8)][_0x2bb60a(0x176)](this);break;}},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x284)]=function(){const _0x247eed=_0x116828;switch(this[_0x247eed(0x42f)][_0x247eed(0x5db)]()){case'ITEM':case _0x247eed(0x47f):case'EXCLAMATION':case'!':case _0x247eed(0x199):case _0x247eed(0x533):return 0x0;break;case _0x247eed(0x1bb):case _0x247eed(0x3eb):case _0x247eed(0x35c):case'?':case _0x247eed(0x34e):case _0x247eed(0x2c9):return 0x1;break;case _0x247eed(0x396):case _0x247eed(0x47e):case _0x247eed(0x3a9):case _0x247eed(0x2de):case _0x247eed(0x30e):return 0x2;break;default:return VisuMZ[_0x247eed(0x3d8)][_0x247eed(0x387)][_0x247eed(0x176)](this);break;}},Game_CharacterBase['prototype']['forceCarrying']=function(){const _0x55cac0=_0x116828;this[_0x55cac0(0x2df)]=!![];},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x33b)]=function(){const _0x54dcdb=_0x116828;this[_0x54dcdb(0x2df)]=![];},Game_CharacterBase['prototype']['forceDashing']=function(){const _0x54d3de=_0x116828;this[_0x54d3de(0x4f9)]=!![];},Game_CharacterBase[_0x116828(0x29b)]['clearDashing']=function(){const _0xd4aab0=_0x116828;this[_0xd4aab0(0x4f9)]=![];},Game_CharacterBase['prototype'][_0x116828(0x1c0)]=function(){const _0x3dde89=_0x116828;if(this[_0x3dde89(0x4f1)]())return![];if(this['_isObjectCharacter'])return![];if(this[_0x3dde89(0x28d)]==='')return![];if(this[_0x3dde89(0x565)]===Game_Vehicle)return![];if(this[_0x3dde89(0x36f)]())return![];return!![];},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x3d7)]=function(){const _0x100a30=_0x116828;if(this[_0x100a30(0x1dc)]())return!![];if(this[_0x100a30(0x565)]===Game_Player&&this[_0x100a30(0x2a3)]())return!![];return![];},Game_CharacterBase[_0x116828(0x29b)]['shadowFilename']=function(){const _0x11655a=_0x116828;return VisuMZ['EventsMoveCore']['Settings'][_0x11655a(0x534)][_0x11655a(0x419)];},Game_CharacterBase[_0x116828(0x29b)]['shadowX']=function(){const _0x233a74=_0x116828;return this[_0x233a74(0x3df)]();},Game_CharacterBase[_0x116828(0x29b)]['shadowY']=function(){const _0x14fbb0=_0x116828,_0x3b54ee=$gameMap['tileHeight']();return Math[_0x14fbb0(0x2c6)](this[_0x14fbb0(0x2cc)]()*_0x3b54ee+_0x3b54ee);},Game_Character[_0x116828(0x29b)]['findDiagonalDirectionTo']=function(_0x5867fc,_0x470009){const _0x3419f0=_0x116828,_0x5536af=this['searchLimit'](),_0x342b4b=$gameMap[_0x3419f0(0x34b)](),_0x207343=[],_0x2eb667=[],_0x45581e=[],_0x2d0050={};let _0x900925=_0x2d0050;if(this['x']===_0x5867fc&&this['y']===_0x470009)return 0x0;_0x2d0050[_0x3419f0(0x170)]=null,_0x2d0050['x']=this['x'],_0x2d0050['y']=this['y'],_0x2d0050['g']=0x0,_0x2d0050['f']=$gameMap['distance'](_0x2d0050['x'],_0x2d0050['y'],_0x5867fc,_0x470009),_0x207343[_0x3419f0(0x346)](_0x2d0050),_0x2eb667[_0x3419f0(0x346)](_0x2d0050['y']*_0x342b4b+_0x2d0050['x']);while(_0x207343[_0x3419f0(0x198)]>0x0){let _0x3ca776=0x0;for(let _0x53725a=0x0;_0x53725a<_0x207343[_0x3419f0(0x198)];_0x53725a++){_0x3419f0(0x247)!==_0x3419f0(0x248)?_0x207343[_0x53725a]['f']<_0x207343[_0x3ca776]['f']&&(_0x3ca776=_0x53725a):this[_0x3419f0(0x316)][_0x3419f0(0x468)]=_0x510d4f(_0xe9360b['$1'])['toLowerCase']()['trim']();}const _0x287093=_0x207343[_0x3ca776],_0x5a0af3=_0x287093['x'],_0x9450c0=_0x287093['y'],_0x926432=_0x9450c0*_0x342b4b+_0x5a0af3,_0x82844=_0x287093['g'];_0x207343[_0x3419f0(0x40d)](_0x3ca776,0x1),_0x2eb667[_0x3419f0(0x40d)](_0x2eb667['indexOf'](_0x926432),0x1),_0x45581e[_0x3419f0(0x346)](_0x926432);if(_0x287093['x']===_0x5867fc&&_0x287093['y']===_0x470009){_0x900925=_0x287093;break;}if(_0x82844>=_0x5536af)continue;const _0x2ab573=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0xe01765=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x221993=0x1;_0x221993<0xa;_0x221993++){if(_0x221993===0x5)continue;const _0x12fa9c=_0x221993,_0x449000=_0x2ab573[_0x221993],_0x1eb1ff=_0xe01765[_0x221993],_0xdfa432=$gameMap['roundXWithDirection'](_0x5a0af3,_0x12fa9c),_0x668e07=$gameMap['roundYWithDirection'](_0x9450c0,_0x12fa9c),_0x39101f=_0x668e07*_0x342b4b+_0xdfa432;if(_0x45581e['includes'](_0x39101f)){if(_0x3419f0(0x466)===_0x3419f0(0x3ae))_0x27497c[_0x3419f0(0x51c)]();else continue;}if(this[_0x3419f0(0x565)]===Game_Player&&VisuMZ[_0x3419f0(0x3d8)][_0x3419f0(0x256)]['Movement'][_0x3419f0(0x5a7)]){if(_0x3419f0(0x4f6)!==_0x3419f0(0x4f6))_0x3dd6e[_0x3419f0(0x3d8)][_0x3419f0(0x53d)]['call'](this),this[_0x3419f0(0x48b)]();else{if(!this[_0x3419f0(0x1ec)](_0x5a0af3,_0x9450c0,_0x449000))continue;if(!this[_0x3419f0(0x1ec)](_0x5a0af3,_0x9450c0,_0x1eb1ff))continue;}}if(!this[_0x3419f0(0x452)](_0x5a0af3,_0x9450c0,_0x449000,_0x1eb1ff))continue;const _0x4d5428=_0x82844+0x1,_0x4fbf84=_0x2eb667[_0x3419f0(0x4ef)](_0x39101f);if(_0x4fbf84<0x0||_0x4d5428<_0x207343[_0x4fbf84]['g']){let _0x5e5c7a={};_0x4fbf84>=0x0?_0x5e5c7a=_0x207343[_0x4fbf84]:(_0x207343[_0x3419f0(0x346)](_0x5e5c7a),_0x2eb667[_0x3419f0(0x346)](_0x39101f)),_0x5e5c7a[_0x3419f0(0x170)]=_0x287093,_0x5e5c7a['x']=_0xdfa432,_0x5e5c7a['y']=_0x668e07,_0x5e5c7a['g']=_0x4d5428,_0x5e5c7a['f']=_0x4d5428+$gameMap[_0x3419f0(0x27f)](_0xdfa432,_0x668e07,_0x5867fc,_0x470009),(!_0x900925||_0x5e5c7a['f']-_0x5e5c7a['g']<_0x900925['f']-_0x900925['g'])&&(_0x900925=_0x5e5c7a);}}}let _0x2f7839=_0x900925;while(_0x2f7839[_0x3419f0(0x170)]&&_0x2f7839['parent']!==_0x2d0050){_0x2f7839=_0x2f7839['parent'];}const _0x380945=$gameMap[_0x3419f0(0x214)](_0x2f7839['x'],_0x2d0050['x']),_0x58ef34=$gameMap[_0x3419f0(0x19b)](_0x2f7839['y'],_0x2d0050['y']);if(_0x380945<0x0&&_0x58ef34>0x0)return 0x1;if(_0x380945>0x0&&_0x58ef34>0x0)return 0x3;if(_0x380945<0x0&&_0x58ef34<0x0)return 0x7;if(_0x380945>0x0&&_0x58ef34<0x0)return 0x9;if(_0x58ef34>0x0)return 0x2;if(_0x380945<0x0)return 0x4;if(_0x380945>0x0)return 0x6;if(_0x58ef34<0x0)return 0x8;const _0x3b1294=this[_0x3419f0(0x5d0)](_0x5867fc),_0x22a7c2=this[_0x3419f0(0x364)](_0x470009);if(Math[_0x3419f0(0x291)](_0x3b1294)>Math[_0x3419f0(0x291)](_0x22a7c2))return _0x3b1294>0x0?0x4:0x6;else{if(_0x22a7c2!==0x0)return _0x22a7c2>0x0?0x8:0x2;}return 0x0;},VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass']=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x1ec)],Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x1ec)]=function(_0x4e4bbf,_0x40665d,_0x4ab366){const _0x3f25b4=_0x116828;if(this[_0x3f25b4(0x239)]==='airship'){if(_0x3f25b4(0x3a3)!=='pAdSL'){const _0x53a264=_0x41bfc5['distance'](this['x'],this['y'],this['_randomHomeX'],this['_randomHomeY']),_0x4f6d88=_0x53a264*(this[_0x3f25b4(0x55a)]||0x0);_0x1a976f[_0x3f25b4(0x597)]()>=_0x4f6d88?_0x3039db[_0x3f25b4(0x3d8)][_0x3f25b4(0x5bd)][_0x3f25b4(0x176)](this):this[_0x3f25b4(0x4af)]();}else return this[_0x3f25b4(0x1ab)]()[_0x3f25b4(0x255)](_0x4e4bbf,_0x40665d,_0x4ab366);}else return VisuMZ[_0x3f25b4(0x3d8)][_0x3f25b4(0x45b)]['call'](this,_0x4e4bbf,_0x40665d,_0x4ab366);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x35e)]=function(){const _0x6654af=_0x116828;this[_0x6654af(0x512)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x116828(0x3d8)]['Game_CharacterBase_screenX']=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x3df)],Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x3df)]=function(){const _0x173041=_0x116828;return VisuMZ[_0x173041(0x3d8)][_0x173041(0x51e)]['call'](this)+(this['_spriteOffsetX']||0x0);},VisuMZ[_0x116828(0x3d8)]['Game_CharacterBase_screenY']=Game_CharacterBase['prototype'][_0x116828(0x4c4)],Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x4c4)]=function(){const _0x4404bd=_0x116828;return VisuMZ[_0x4404bd(0x3d8)]['Game_CharacterBase_screenY']['call'](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x311)]=function(){const _0x5798cb=_0x116828;this[_0x5798cb(0x17c)]='';},VisuMZ[_0x116828(0x3d8)][_0x116828(0x646)]=Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x162)],Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x162)]=function(){const _0x116dff=_0x116828;if(this[_0x116dff(0x4d7)])return;if(this[_0x116dff(0x29c)]())return;VisuMZ['EventsMoveCore'][_0x116dff(0x646)][_0x116dff(0x176)](this);},Game_CharacterBase['prototype']['updatePatternEventsMoveCore']=function(){const _0x3f1578=_0x116828;if(!this['hasStepAnime']()&&this[_0x3f1578(0x2b9)]>0x0)return![];switch(String(this[_0x3f1578(0x17c)])[_0x3f1578(0x5db)]()[_0x3f1578(0x423)]()){case _0x3f1578(0x359):this[_0x3f1578(0x38d)]+=0x1;if(this[_0x3f1578(0x38d)]>0x2)this[_0x3f1578(0x168)](0x0);break;case _0x3f1578(0x418):this[_0x3f1578(0x38d)]-=0x1;if(this[_0x3f1578(0x38d)]<0x0)this['setPattern'](0x2);break;case _0x3f1578(0x5a4):case'SPIN\x20CW':this[_0x3f1578(0x615)]();break;case _0x3f1578(0x412):case'SPIN\x20CCW':case'SPIN\x20ANTICLOCKWISE':case _0x3f1578(0x1e9):this[_0x3f1578(0x62a)]();break;default:return![];}return!![];},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x175)]=function(){const _0x148578=_0x116828;return $gameSystem[_0x148578(0x175)](this);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x63e)]=function(){const _0x5e9568=_0x116828,_0x508dca=this[_0x5e9568(0x175)]();if(!_0x508dca)return![];return _0x508dca[_0x5e9568(0x64f)]>0x0;},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x5d3)]=function(){const _0x26950d=this['direction']();return $gameMap['roundXWithDirection'](this['x'],_0x26950d);},Game_CharacterBase[_0x116828(0x29b)]['frontY']=function(){const _0x1674fb=_0x116828,_0x83c2f3=this[_0x1674fb(0x592)]();return $gameMap['roundYWithDirection'](this['y'],_0x83c2f3);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x43e)]=function(){const _0x2b96da=_0x116828,_0x96e861=this[_0x2b96da(0x17d)](this[_0x2b96da(0x592)]());return $gameMap[_0x2b96da(0x1d6)](this['x'],_0x96e861);},Game_CharacterBase[_0x116828(0x29b)][_0x116828(0x163)]=function(){const _0x4b9e13=_0x116828,_0x29fb62=this[_0x4b9e13(0x17d)](this['direction']());return $gameMap[_0x4b9e13(0x1c5)](this['y'],_0x29fb62);},VisuMZ['EventsMoveCore'][_0x116828(0x3c7)]=Game_Character[_0x116828(0x29b)]['setMoveRoute'],Game_Character['prototype']['setMoveRoute']=function(_0x16124d){const _0x1f40ad=_0x116828;route=JsonEx['makeDeepCopy'](_0x16124d),VisuMZ[_0x1f40ad(0x3d8)]['Game_Character_setMoveRoute'][_0x1f40ad(0x176)](this,route);},VisuMZ['EventsMoveCore'][_0x116828(0x513)]=Game_Character[_0x116828(0x29b)]['forceMoveRoute'],Game_Character[_0x116828(0x29b)][_0x116828(0x262)]=function(_0x3a7abf){const _0x1e7c91=_0x116828;route=JsonEx[_0x1e7c91(0x1f8)](_0x3a7abf),VisuMZ[_0x1e7c91(0x3d8)][_0x1e7c91(0x513)][_0x1e7c91(0x176)](this,route);},VisuMZ[_0x116828(0x3d8)]['Game_Character_processMoveCommand']=Game_Character[_0x116828(0x29b)]['processMoveCommand'],Game_Character['prototype'][_0x116828(0x593)]=function(_0xc53b6a){const _0x3bfa75=_0x116828,_0x3deae0=Game_Character,_0x2823d9=_0xc53b6a['parameters'];if(_0xc53b6a[_0x3bfa75(0x2e5)]===_0x3deae0['ROUTE_SCRIPT']){if('dBBvR'!==_0x3bfa75(0x485)){this[_0x3bfa75(0x38b)]=![];const _0x406c42=_0x4a58ee[_0x3bfa75(0x5ed)]||'';_0x406c42['match'](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this[_0x3bfa75(0x38b)]=!![]);}else{let _0x2c4d90=_0xc53b6a[_0x3bfa75(0x167)][0x0];_0x2c4d90=this[_0x3bfa75(0x27d)](_0x2c4d90),_0x2c4d90=this[_0x3bfa75(0x2f3)](_0x2c4d90),this[_0x3bfa75(0x2c4)](_0xc53b6a,_0x2c4d90);}}else VisuMZ[_0x3bfa75(0x3d8)][_0x3bfa75(0x421)]['call'](this,_0xc53b6a);},Game_Character['prototype'][_0x116828(0x27d)]=function(_0x55fbd5){const _0x3d6acc=_0x116828,_0x2d04cf=/\$gameVariables\.value\((\d+)\)/gi,_0x1bc888=/\\V\[(\d+)\]/gi;while(_0x55fbd5['match'](_0x2d04cf)){if(_0x3d6acc(0x19a)===_0x3d6acc(0x197))return this[_0x3d6acc(0x5ff)];else _0x55fbd5=_0x55fbd5['replace'](_0x2d04cf,(_0x163841,_0x5b5777)=>$gameVariables['value'](parseInt(_0x5b5777)));}while(_0x55fbd5[_0x3d6acc(0x5ba)](_0x1bc888)){_0x55fbd5=_0x55fbd5[_0x3d6acc(0x24e)](_0x1bc888,(_0x167d0e,_0x36093d)=>$gameVariables[_0x3d6acc(0x4ba)](parseInt(_0x36093d)));}return _0x55fbd5;},Game_Character[_0x116828(0x29b)][_0x116828(0x2f3)]=function(_0x4b4c5e){const _0x338465=_0x116828,_0x5173a8=/\\SELFVAR\[(\d+)\]/gi;while(_0x4b4c5e[_0x338465(0x5ba)](_0x5173a8)){_0x4b4c5e=_0x4b4c5e[_0x338465(0x24e)](_0x5173a8,(_0xd5c276,_0xff37a9)=>getSelfVariableValue(this[_0x338465(0x59e)],this[_0x338465(0x36e)],parseInt(_0xff37a9)));}return _0x4b4c5e;},Game_Character[_0x116828(0x29b)][_0x116828(0x2c4)]=function(_0x1dcadb,_0x5d7d60){const _0x4489ec=_0x116828;if(_0x5d7d60[_0x4489ec(0x5ba)](/ANIMATION:[ ](\d+)/i))return this[_0x4489ec(0x557)](Number(RegExp['$1']));if(_0x5d7d60[_0x4489ec(0x5ba)](/BALLOON:[ ](.*)/i))return this['processMoveRouteBalloon'](String(RegExp['$1']));if(_0x5d7d60[_0x4489ec(0x5ba)](/FADE IN:[ ](\d+)/i)){if(_0x4489ec(0x2b7)!==_0x4489ec(0x2b7))_0x1d26bc[0x2]=_0x4489ec(0x1b5)[_0x4489ec(0x386)](_0x107602);else return this[_0x4489ec(0x3f3)](Number(RegExp['$1']));}if(_0x5d7d60[_0x4489ec(0x5ba)](/FADE OUT:[ ](\d+)/i))return this[_0x4489ec(0x3ee)](Number(RegExp['$1']));if(_0x5d7d60['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i))return this[_0x4489ec(0x154)]();if(_0x5d7d60['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i))return this['clearCarrying']();if(_0x5d7d60[_0x4489ec(0x5ba)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return _0x4489ec(0x324)!=='LVDqS'?this['processMoveRouteTeleportTo'](_0x459b6a(_0x237b3c['$1']),_0x639ec2(_0x1a0f8b['$2'])):this[_0x4489ec(0x17a)]();if(_0x5d7d60[_0x4489ec(0x5ba)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i)){if(_0x4489ec(0x61c)===_0x4489ec(0x32d))this[_0x4489ec(0x5c1)]['filename']=_0x434b2b(_0x1500ee['$1']);else return this['clearDashing']();}if(_0x5d7d60['match'](/HUG:[ ]LEFT/i)){if('sQYrC'===_0x4489ec(0x267))_0x508281[_0x4489ec(0x3d8)][_0x4489ec(0x629)]['call'](this,_0x24b0f0,_0x490ecf);else return this[_0x4489ec(0x1a3)](_0x4489ec(0x2aa));}if(_0x5d7d60[_0x4489ec(0x5ba)](/HUG:[ ]RIGHT/i))return _0x4489ec(0x409)==='jETHr'?this[_0x4489ec(0x1a3)](_0x4489ec(0x4d6)):this[_0x4489ec(0x5ff)];if(_0x5d7d60[_0x4489ec(0x5ba)](/INDEX:[ ](\d+)/i)){if(_0x4489ec(0x3ab)==='eYqNB')return this[_0x4489ec(0x47b)](Number(RegExp['$1']));else _0x3008c5[_0x4489ec(0x29b)][_0x4489ec(0x35f)][_0x4489ec(0x176)](this),this[_0x4489ec(0x4c3)]();}if(_0x5d7d60[_0x4489ec(0x5ba)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x1d17cf=this[_0x4489ec(0x2fe)]+Number(RegExp['$1']);return this[_0x4489ec(0x47b)](_0x1d17cf);}if(_0x5d7d60[_0x4489ec(0x5ba)](/JUMP FORWARD:[ ](\d+)/i))return this[_0x4489ec(0x243)](Number(RegExp['$1']));if(_0x5d7d60[_0x4489ec(0x5ba)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x4489ec(0x46d)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5d7d60['match'](/JUMP TO EVENT:[ ](\d+)/i)){if(_0x4489ec(0x5be)!==_0x4489ec(0x5be)){const _0x335466=_0x552d6d[_0x4489ec(0x185)][_0x4489ec(0x483)];if(_0x335466){const _0x4c9039=_0x335466[_0x4489ec(0x295)](this);_0x4c9039&&_0x4c9039[_0x4489ec(0x616)]&&_0x4c9039[_0x4489ec(0x616)][_0x4489ec(0x60e)]!==this[_0x4489ec(0x1c1)]()&&(_0x4c9039[_0x4489ec(0x616)][_0x4489ec(0x60e)]=this[_0x4489ec(0x1c1)](),_0x4c9039[_0x4489ec(0x616)]['bitmap']=_0x3e61c4[_0x4489ec(0x5af)](_0x4c9039['_shadowSprite'][_0x4489ec(0x60e)]));}}else{const _0x6d9fd6=$gameMap[_0x4489ec(0x41a)](Number(RegExp['$1']));return this[_0x4489ec(0x37d)](_0x6d9fd6);}}if(_0x5d7d60['match'](/JUMP TO PLAYER/i)){if('KeEYV'!==_0x4489ec(0x514))this[_0x4489ec(0x20e)]=_0x419a59[_0x4489ec(0x471)](this[_0x4489ec(0x2d7)]()),this[_0x4489ec(0x3b5)]=!![];else return this[_0x4489ec(0x37d)]($gamePlayer);}if(_0x5d7d60[_0x4489ec(0x5ba)](/JUMP TO HOME/i)&&this['eventId']){const _0x3fb777=this[_0x4489ec(0x28f)],_0x233a00=this['_randomHomeY'];return this[_0x4489ec(0x46d)](_0x3fb777,_0x233a00);}if(_0x5d7d60[_0x4489ec(0x5ba)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){if(_0x4489ec(0x21d)!==_0x4489ec(0x21d))this[_0x4489ec(0x422)]=!![];else{const _0x5bbf21=String(RegExp['$1']),_0x22c8b6=this['checkCollisionKeywords'](_0x5d7d60);return this[_0x4489ec(0x2fc)](_0x5bbf21,_0x22c8b6);}}if(_0x5d7d60[_0x4489ec(0x5ba)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){const _0x1a1a30=Number(RegExp['$1']),_0x50a5aa=Number(RegExp['$2']),_0x221ecb=this[_0x4489ec(0x3d6)](_0x5d7d60);return this[_0x4489ec(0x602)](_0x1a1a30,_0x50a5aa,_0x221ecb);}if(_0x5d7d60[_0x4489ec(0x5ba)](/MOVE TO EVENT:[ ](\d+)/i)){const _0x1147fa=$gameMap[_0x4489ec(0x41a)](Number(RegExp['$1'])),_0x3f84d4=this[_0x4489ec(0x3d6)](_0x5d7d60);return this[_0x4489ec(0x61b)](_0x1147fa,_0x3f84d4);}if(_0x5d7d60[_0x4489ec(0x5ba)](/MOVE TO PLAYER/i)){const _0x5ec3a6=this[_0x4489ec(0x3d6)](_0x5d7d60);return this[_0x4489ec(0x61b)]($gamePlayer,_0x5ec3a6);}if(_0x5d7d60['match'](/MOVE TO HOME/i)&&this[_0x4489ec(0x160)]){const _0x4d52a1=this['_randomHomeX'],_0x3de2b8=this['_randomHomeY'],_0x3703ef=this[_0x4489ec(0x3d6)](_0x5d7d60);return this[_0x4489ec(0x602)](_0x4d52a1,_0x3de2b8,_0x3703ef);}if(_0x5d7d60['match'](/MOVE LOWER LEFT:[ ](\d+)/i))return this[_0x4489ec(0x15c)](0x1,Number(RegExp['$1']));if(_0x5d7d60['match'](/MOVE DOWN:[ ](\d+)/i)){if(_0x4489ec(0x40f)===_0x4489ec(0x420))_0x502892[_0x4489ec(0x545)](),this[_0x4489ec(0x4d1)]();else return this[_0x4489ec(0x15c)](0x2,Number(RegExp['$1']));}if(_0x5d7d60[_0x4489ec(0x5ba)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x4489ec(0x15c)](0x3,Number(RegExp['$1']));if(_0x5d7d60['match'](/MOVE LEFT:[ ](\d+)/i)){if(_0x4489ec(0x3ec)===_0x4489ec(0x5fa))this[_0x4489ec(0x4ad)](...arguments);else return this[_0x4489ec(0x15c)](0x4,Number(RegExp['$1']));}if(_0x5d7d60['match'](/MOVE RIGHT:[ ](\d+)/i))return this[_0x4489ec(0x15c)](0x6,Number(RegExp['$1']));if(_0x5d7d60[_0x4489ec(0x5ba)](/MOVE UPPER LEFT:[ ](\d+)/i)){if('UiaTN'===_0x4489ec(0x30c))_0x28696f+=this[_0x4489ec(0x165)]();else return this[_0x4489ec(0x15c)](0x7,Number(RegExp['$1']));}if(_0x5d7d60['match'](/MOVE UP:[ ](\d+)/i))return this[_0x4489ec(0x15c)](0x8,Number(RegExp['$1']));if(_0x5d7d60[_0x4489ec(0x5ba)](/MOVE UPPER RIGHT:[ ](\d+)/i))return this[_0x4489ec(0x15c)](0x9,Number(RegExp['$1']));if(_0x5d7d60[_0x4489ec(0x5ba)](/OPACITY:[ ](\d+)([%％])/i)){if(_0x4489ec(0x34a)===_0x4489ec(0x34a)){const _0x890774=Math[_0x4489ec(0x181)](Number(RegExp['$1'])/0x64*0xff);return this['setOpacity'](_0x890774[_0x4489ec(0x1fe)](0x0,0xff));}else return!![];}if(_0x5d7d60['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if(_0x4489ec(0x3ea)!==_0x4489ec(0x1ff)){const _0x366f3c=this[_0x4489ec(0x25d)]+Math[_0x4489ec(0x181)](Number(RegExp['$1'])/0x64*0xff);return this[_0x4489ec(0x39b)](_0x366f3c[_0x4489ec(0x1fe)](0x0,0xff));}else this[_0x4489ec(0x380)]=![],this['_screenZoomScale']=_0x558ce7[_0x4489ec(0x628)](),this[_0x4489ec(0x441)]=this[_0x4489ec(0x622)][_0x4489ec(0x3df)](),this[_0x4489ec(0x2ff)]=this[_0x4489ec(0x622)]['screenY'](),this[_0x4489ec(0x227)]=this[_0x4489ec(0x622)]['_labelWindow'][_0x4489ec(0x458)],this[_0x4489ec(0x30b)]=this[_0x4489ec(0x622)][_0x4489ec(0x59c)][_0x4489ec(0x46a)],this[_0x4489ec(0x23b)]=this[_0x4489ec(0x622)][_0x4489ec(0x2b8)],this[_0x4489ec(0x5ff)]=this[_0x4489ec(0x16c)](),this[_0x4489ec(0x4f4)]=_0x1e1724[_0x4489ec(0x3a5)](),this['_visiblePlayerX']=_0x5bcda2['x'],this[_0x4489ec(0x1c8)]=_0x35e699['y'],this[_0x4489ec(0x273)]=this['_event']['x'],this['_visibleEventY']=this[_0x4489ec(0x622)]['y'];}if(_0x5d7d60[_0x4489ec(0x5ba)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0x48595e=this[_0x4489ec(0x25d)]+Number(RegExp['$1']);return this[_0x4489ec(0x39b)](_0x48595e[_0x4489ec(0x1fe)](0x0,0xff));}if(_0x5d7d60['match'](/PATTERN LOCK:[ ](\d+)/i))return this[_0x4489ec(0x17f)](Number(RegExp['$1']));if(_0x5d7d60[_0x4489ec(0x5ba)](/PATTERN UNLOCK/i))return this['_patternLocked']=![];if(_0x5d7d60[_0x4489ec(0x5ba)](/POSE:[ ](.*)/i)){if('RAoBn'===_0x4489ec(0x340))return this[_0x4489ec(0x3cf)](_0x3f558e);else{const _0x311cb4=String(RegExp['$1'])[_0x4489ec(0x5db)]()[_0x4489ec(0x423)]();return this['setPose'](_0x311cb4);}}if(_0x5d7d60[_0x4489ec(0x5ba)](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('qHtsg'==='jAVCy')this[_0x4489ec(0x159)]();else{const _0xb862e0=Number(RegExp['$1']),_0x2074ac=Number(RegExp['$2']);return this[_0x4489ec(0x5fc)](_0xb862e0,_0x2074ac);}}if(_0x5d7d60[_0x4489ec(0x5ba)](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x4a6305=$gameMap['event'](Number(RegExp['$1']));return this[_0x4489ec(0x31c)](_0x4a6305);}if(_0x5d7d60[_0x4489ec(0x5ba)](/STEP TOWARD PLAYER/i))return this[_0x4489ec(0x31c)]($gamePlayer);if(_0x5d7d60[_0x4489ec(0x5ba)](/STEP TOWARD HOME/i)&&this[_0x4489ec(0x160)]){const _0x43c4bb=this['_randomHomeX'],_0x4449d2=this[_0x4489ec(0x1d8)];return this[_0x4489ec(0x5fc)](_0x43c4bb,_0x4449d2);}if(_0x5d7d60[_0x4489ec(0x5ba)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return _0x4489ec(0x4e8)!==_0x4489ec(0x177)?this[_0x4489ec(0x2e1)](Number(RegExp['$1']),Number(RegExp['$2'])):(this[_0x4489ec(0x22a)]['setup'](_0xb3c27b,_0x37ddbc),this[_0x4489ec(0x22a)][_0x4489ec(0x3d5)](),this[_0x4489ec(0x22a)][_0x4489ec(0x453)]);if(_0x5d7d60[_0x4489ec(0x5ba)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){if(_0x4489ec(0x1a8)==='fCgUY')this['_selfTargetItemChoice']=_0x148cf2[_0x4489ec(0x611)](),_0x4de40b['EventsMoveCore']['Game_Message_setItemChoice']['call'](this,_0x19e755,_0x299e9c);else{const _0x35d7ca=$gameMap[_0x4489ec(0x41a)](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x35d7ca);}}if(_0x5d7d60['match'](/STEP AWAY FROM PLAYER/i)){if(_0x4489ec(0x1b3)!=='tKxuD')return this['moveAwayFromCharacter']($gamePlayer);else{let _0x2b3c0d=this[_0x4489ec(0x27b)][_0x4489ec(0x592)]();if(this['_character'][_0x4489ec(0x5f0)]){if(_0x2b3c0d===0x4)_0x2b3c0d=0x6;else _0x2b3c0d===0x6&&(_0x2b3c0d=0x4);}return(_0x2b3c0d-0x2)/0x2;}}if(_0x5d7d60[_0x4489ec(0x5ba)](/STEP AWAY FROM HOME/i)&&this[_0x4489ec(0x160)]){const _0x52fff6=this[_0x4489ec(0x28f)],_0x243e8b=this[_0x4489ec(0x1d8)];return this[_0x4489ec(0x2e1)](_0x52fff6,_0x243e8b);}if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x4489ec(0x289)===_0x4489ec(0x2a2))_0x5b2526=_0x295964(_0x22f2b3['$1'])['toLowerCase']()[_0x4489ec(0x423)](),this[_0x4489ec(0x326)][_0x4489ec(0x468)]=_0x5aa147,this[_0x4489ec(0x326)]['distance']=_0x3c9d1c(_0x2804e1['$2']);else return this[_0x4489ec(0x481)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x5d7d60['match'](/TURN TO EVENT:[ ](\d+)/i)){if(_0x4489ec(0x1ee)!==_0x4489ec(0x1ee))this[_0x4489ec(0x55a)]=0x0;else{const _0x509518=$gameMap[_0x4489ec(0x41a)](Number(RegExp['$1']));return this[_0x4489ec(0x27c)](_0x509518);}}if(_0x5d7d60['match'](/TURN TO PLAYER/i))return this['turnTowardCharacter']($gamePlayer);if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN TO HOME/i)&&this[_0x4489ec(0x160)]){if(_0x4489ec(0x3c0)===_0x4489ec(0x594)){let _0x301d8e={};_0x1f51bf>=0x0?_0x301d8e=_0x4b1b41[_0x271a6]:(_0x25241e[_0x4489ec(0x346)](_0x301d8e),_0x489149[_0x4489ec(0x346)](_0x13fea6)),_0x301d8e[_0x4489ec(0x170)]=_0x31900b,_0x301d8e['x']=_0xaf7482,_0x301d8e['y']=_0x421c6b,_0x301d8e['g']=_0xddea96,_0x301d8e['f']=_0x32e9c6+_0x516b2c[_0x4489ec(0x27f)](_0x54f60f,_0x50e4df,_0x12574b,_0x4807da),(!_0x231caa||_0x301d8e['f']-_0x301d8e['g']<_0x590547['f']-_0x55416f['g'])&&(_0x281e4f=_0x301d8e);}else{const _0x2decb2=this['_randomHomeX'],_0x2ec6c0=this[_0x4489ec(0x1d8)];return this[_0x4489ec(0x220)](_0x2decb2,_0x2ec6c0);}}if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this['turnAwayFromPoint'](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){if(_0x4489ec(0x442)!==_0x4489ec(0x442)){if(_0x1dbc2b)this[_0x4489ec(0x481)](_0x4a79eb['x'],_0x5e5a9a['y']);}else{const _0x248259=$gameMap[_0x4489ec(0x41a)](Number(RegExp['$1']));return this[_0x4489ec(0x3f5)](_0x248259);}}if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN AWAY FROM PLAYER/i))return this[_0x4489ec(0x3f5)]($gamePlayer);if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN AWAY FROM HOME/i)&&this[_0x4489ec(0x160)]){const _0x56dc26=this[_0x4489ec(0x28f)],_0x427e8a=this[_0x4489ec(0x1d8)];return this[_0x4489ec(0x54b)](_0x56dc26,_0x427e8a);}if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN LOWER LEFT/i))return this[_0x4489ec(0x393)](0x1);if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN LOWER RIGHT/i))return this[_0x4489ec(0x393)](0x3);if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN UPPER LEFT/i)){if(_0x4489ec(0x31d)==='TqxLj')this['initialize'](...arguments);else return this[_0x4489ec(0x393)](0x7);}if(_0x5d7d60[_0x4489ec(0x5ba)](/TURN UPPER RIGHT/i))return'lQDRS'===_0x4489ec(0x1c7)?this[_0x4489ec(0x393)](0x9):_0x8238ff>0x0?0x8:0x2;if(_0x5d7d60[_0x4489ec(0x5ba)](/Self Switch[ ](.*):[ ](.*)/i))return this['processMoveRouteSelfSwitch'](RegExp['$1'],RegExp['$2']);if(_0x5d7d60[_0x4489ec(0x5ba)](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x4489ec(0x276)](RegExp['$1'],RegExp['$2']);if(_0x5d7d60[_0x4489ec(0x5ba)](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('kWTtY'!==_0x4489ec(0x56e))this[_0x4489ec(0x228)][_0x4489ec(0x27b)][_0x4489ec(0x368)]()&&(this['x']+=_0xeb5049['EventsMoveCore']['Settings']['VS8']['BalloonOffsetX'],this['y']+=_0x4eef7e[_0x4489ec(0x3d8)][_0x4489ec(0x256)][_0x4489ec(0x29e)][_0x4489ec(0x24f)]);else return this[_0x4489ec(0x642)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x5d7d60['match'](/TELEPORT TO EVENT:[ ](\d+)/i)){if(_0x4489ec(0x4ae)===_0x4489ec(0x4ae)){const _0x32cb0c=$gameMap[_0x4489ec(0x41a)](Number(RegExp['$1']));return this['processMoveRouteTeleportToCharacter'](_0x32cb0c);}else this['_selfTarget']=_0x47ce86;}if(_0x5d7d60['match'](/TELEPORT TO PLAYER/i))return _0x4489ec(0x59b)===_0x4489ec(0x59b)?this[_0x4489ec(0x516)]($gamePlayer):_0x4da0bd[_0x4489ec(0x3d8)]['Game_Switches_value'][_0x4489ec(0x176)](this,_0x1ece07);if(_0x5d7d60[_0x4489ec(0x5ba)](/TELEPORT TO HOME/i)&&this[_0x4489ec(0x160)]){const _0x2c0d45=this[_0x4489ec(0x28f)],_0x34e0d9=this['_randomHomeY'];return this['processMoveRouteTeleportTo'](_0x2c0d45,_0x34e0d9);}try{if('mhiTj'!==_0x4489ec(0x303))VisuMZ['EventsMoveCore'][_0x4489ec(0x421)][_0x4489ec(0x176)](this,_0x1dcadb);else{const _0x1b23f0=_0xf8c11a[_0x4489ec(0x3d8)][_0x4489ec(0x3dc)][_0x4489ec(0x176)](this),_0x25c956=_0x38dda5[_0x4489ec(0x3d8)][_0x4489ec(0x2d9)][_0x4489ec(0x1a7)][_0x4489ec(0x37f)](_0x1b7cd1=>_0x5095fb[_0x1b7cd1]);return _0x1b23f0[_0x4489ec(0x44b)](_0x25c956)[_0x4489ec(0x608)]((_0x4cabaf,_0x186d63,_0x4ce6b0)=>_0x4ce6b0[_0x4489ec(0x4ef)](_0x4cabaf)===_0x186d63);}}catch(_0xa5e2ae){if(_0x4489ec(0x55c)!==_0x4489ec(0x334)){if($gameTemp[_0x4489ec(0x61f)]())console[_0x4489ec(0x358)](_0xa5e2ae);}else{if(this['_SavedEventLocations']===_0x4fd643)this['initEventsMoveCore']();if(!_0x27d92f)return null;const _0x66d29d='Map%1-Event%2'[_0x4489ec(0x386)](_0x2b0239[_0x4489ec(0x59e)],_0x557fd0[_0x4489ec(0x36e)]);return this[_0x4489ec(0x4bd)][_0x66d29d];}}},Game_Character[_0x116828(0x29b)][_0x116828(0x557)]=function(_0x4df1fa){const _0x4b4089=_0x116828;$gameTemp[_0x4b4089(0x5bb)]([this],_0x4df1fa);},Game_Character['prototype'][_0x116828(0x319)]=function(_0x3faad0){const _0xfa827d=_0x116828;let _0x570ac4=0x0;switch(_0x3faad0['toUpperCase']()[_0xfa827d(0x423)]()){case'!':case _0xfa827d(0x49e):_0x570ac4=0x1;break;case'?':case'QUESTION':_0x570ac4=0x2;break;case _0xfa827d(0x54f):case _0xfa827d(0x257):case'MUSIC\x20NOTE':case'MUSIC-NOTE':case'MUSICNOTE':_0x570ac4=0x3;break;case _0xfa827d(0x199):case _0xfa827d(0x63b):_0x570ac4=0x4;break;case'ANGER':_0x570ac4=0x5;break;case _0xfa827d(0x2de):_0x570ac4=0x6;break;case _0xfa827d(0x533):case _0xfa827d(0x4e5):case _0xfa827d(0x510):_0x570ac4=0x7;break;case _0xfa827d(0x2c9):case'...':_0x570ac4=0x8;break;case _0xfa827d(0x567):case'BULB':case _0xfa827d(0x30e):case _0xfa827d(0x405):case _0xfa827d(0x59a):_0x570ac4=0x9;break;case'Z':case'ZZ':case _0xfa827d(0x467):case'SLEEP':_0x570ac4=0xa;break;case'USER-DEFINED\x201':_0x570ac4=0xb;break;case _0xfa827d(0x236):_0x570ac4=0xc;break;case'USER-DEFINED\x203':_0x570ac4=0xd;break;case _0xfa827d(0x2f5):_0x570ac4=0xe;break;case _0xfa827d(0x3b1):_0x570ac4=0xf;break;}$gameTemp['requestBalloon'](this,_0x570ac4);},Game_Character[_0x116828(0x29b)][_0x116828(0x3f3)]=function(_0x2d097e){const _0x14e44c=_0x116828;_0x2d097e+=this[_0x14e44c(0x25d)],this['setOpacity'](_0x2d097e[_0x14e44c(0x1fe)](0x0,0xff));if(this[_0x14e44c(0x25d)]<0xff)this['_moveRouteIndex']--;},Game_Character['prototype']['processMoveRouteFadeOut']=function(_0x3917be){const _0x1b0d02=_0x116828;_0x3917be=this[_0x1b0d02(0x25d)]-_0x3917be,this[_0x1b0d02(0x39b)](_0x3917be[_0x1b0d02(0x1fe)](0x0,0xff));if(this[_0x1b0d02(0x25d)]>0x0)this[_0x1b0d02(0x631)]--;},Game_Character[_0x116828(0x29b)]['processMoveRouteHugWall']=function(_0x5c4aea){const _0xb23440=_0x116828,_0x24b604=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x252970=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0xff5ae8=this[_0xb23440(0x592)](),_0x262297=(_0x5c4aea===_0xb23440(0x2aa)?_0x24b604:_0x252970)[_0xff5ae8],_0x1c86a6=(_0x5c4aea===_0xb23440(0x2aa)?_0x252970:_0x24b604)[_0xff5ae8];if(this[_0xb23440(0x1ec)](this['x'],this['y'],_0x262297))_0x5c4aea===_0xb23440(0x2aa)?this['turnLeft90']():this[_0xb23440(0x615)]();else{if(!this[_0xb23440(0x1ec)](this['x'],this['y'],this[_0xb23440(0x592)]())){if(_0xb23440(0x1b8)==='cYzSw')this[_0xb23440(0x580)]['bufferY']=_0x58ae57(_0x5d6b9d['$1']);else{if(this[_0xb23440(0x1ec)](this['x'],this['y'],_0x1c86a6)){if(_0x5c4aea===_0xb23440(0x2aa))this[_0xb23440(0x615)]();else{if(_0xb23440(0x42b)===_0xb23440(0x42b))this[_0xb23440(0x62a)]();else return this[_0xb23440(0x243)](_0x548b19(_0x5dfffe['$1']));}}else this['turn180']();}}}if(this['canPass'](this['x'],this['y'],this['direction']())){if('NUnri'===_0xb23440(0x596))this['moveForward']();else{_0x486a0d[_0xb23440(0x290)](_0x404a72,_0x20cd14),_0x11aec9['setControlledFollowerID'](0x0),_0x488771[_0xb23440(0x43c)](![]);for(const _0x30af16 of _0x522fca[_0xb23440(0x5c2)]()[_0xb23440(0x310)]){if(_0x30af16)_0x30af16[_0xb23440(0x649)](![]);}}}},Game_Character[_0x116828(0x29b)][_0x116828(0x47b)]=function(_0x428532){const _0x145287=_0x116828;if(ImageManager[_0x145287(0x2eb)](this['_characterName']))return;_0x428532=_0x428532[_0x145287(0x1fe)](0x0,0x7),this[_0x145287(0x570)](this[_0x145287(0x28d)],_0x428532);},Game_Character[_0x116828(0x29b)][_0x116828(0x243)]=function(_0x59839d){const _0x137f5c=_0x116828;switch(this['direction']()){case 0x1:this[_0x137f5c(0x1a0)](-_0x59839d,_0x59839d);break;case 0x2:this[_0x137f5c(0x1a0)](0x0,_0x59839d);break;case 0x3:this[_0x137f5c(0x1a0)](_0x59839d,_0x59839d);break;case 0x4:this[_0x137f5c(0x1a0)](-_0x59839d,0x0);break;case 0x6:this[_0x137f5c(0x1a0)](_0x59839d,0x0);break;case 0x7:this[_0x137f5c(0x1a0)](-_0x59839d,-_0x59839d);break;case 0x8:this['jump'](0x0,-_0x59839d);break;case 0x9:this[_0x137f5c(0x1a0)](_0x59839d,-_0x59839d);break;}},Game_Character['prototype']['processMoveRouteJumpTo']=function(_0x39b292,_0x3fbcf7){const _0x558163=_0x116828,_0x351a64=Math[_0x558163(0x181)](_0x39b292-this['x']),_0x959cc=Math[_0x558163(0x181)](_0x3fbcf7-this['y']);this[_0x558163(0x1a0)](_0x351a64,_0x959cc);},Game_Character[_0x116828(0x29b)]['processMoveRouteJumpToCharacter']=function(_0x5a2306){const _0x492fd4=_0x116828;if(_0x5a2306)this[_0x492fd4(0x46d)](_0x5a2306['x'],_0x5a2306['y']);},Game_Character[_0x116828(0x29b)][_0x116828(0x5fc)]=function(_0x3a47a4,_0x57053c,_0x16e113){const _0x1aaa2a=_0x116828;let _0x38dd09=0x0;if(_0x16e113)$gameTemp['_moveAllowPlayerCollision']=!![];$gameMap['isSupportDiagonalMovement']()?_0x38dd09=this[_0x1aaa2a(0x5d7)](_0x3a47a4,_0x57053c):_0x38dd09=this[_0x1aaa2a(0x3a8)](_0x3a47a4,_0x57053c);if(_0x16e113)$gameTemp[_0x1aaa2a(0x426)]=![];this[_0x1aaa2a(0x332)](_0x38dd09),this['setMovementSuccess'](!![]);},Game_Character['prototype'][_0x116828(0x31c)]=function(_0x1aa1a8){const _0x161f20=_0x116828;if(_0x1aa1a8)this[_0x161f20(0x5fc)](_0x1aa1a8['x'],_0x1aa1a8['y']);},Game_Character['prototype'][_0x116828(0x2cd)]=function(_0x49b62d,_0x3aa36){const _0x286005=_0x116828,_0x193a9f=this[_0x286005(0x5d0)](_0x49b62d),_0x248260=this['deltaYFrom'](_0x3aa36);},Game_Character[_0x116828(0x29b)]['checkCollisionKeywords']=function(_0x4d2ad3){const _0x4d1a92=_0x116828;if(_0x4d2ad3[_0x4d1a92(0x5ba)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else{if(_0x4d2ad3[_0x4d1a92(0x5ba)](/(?:AVOID|EVADE|DODGE)/i))return![];else{if(_0x4d1a92(0x573)===_0x4d1a92(0x573))return![];else _0x7d983e!==this['mapId']()&&_0x428953&&_0x1a8691[_0x4d1a92(0x460)](this[_0x4d1a92(0x2d7)]());}}},VisuMZ['EventsMoveCore'][_0x116828(0x2d0)]=Game_Event[_0x116828(0x29b)]['isCollidedWithPlayerCharacters'],Game_Event[_0x116828(0x29b)][_0x116828(0x241)]=function(_0xfce3d8,_0x361136){const _0x299ccd=_0x116828;if($gameTemp[_0x299ccd(0x426)])return![];return VisuMZ[_0x299ccd(0x3d8)][_0x299ccd(0x2d0)][_0x299ccd(0x176)](this,_0xfce3d8,_0x361136);},Game_Character[_0x116828(0x29b)]['processMoveRouteMoveUntilStop']=function(_0x46cfad,_0x43cd61){const _0x202021=_0x116828,_0x3c6b65=['',_0x202021(0x3d9),_0x202021(0x5e2),'LOWER\x20RIGHT',_0x202021(0x242),'',_0x202021(0x1e0),_0x202021(0x525),'UP',_0x202021(0x5ee)],_0x4e8efb=_0x3c6b65[_0x202021(0x4ef)](_0x46cfad[_0x202021(0x5db)]()['trim']());if(_0x4e8efb<=0x0)return;if(_0x43cd61)$gameTemp[_0x202021(0x426)]=!![];if(this[_0x202021(0x1ec)](this['x'],this['y'],_0x4e8efb)){if(_0x202021(0x518)!==_0x202021(0x42d)){if(_0x43cd61)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x202021(0x332)](_0x4e8efb),this[_0x202021(0x631)]-=0x1;}else{if(!this['_event'])return![];if(!this['_event'][_0x202021(0x59c)])return![];if(this[_0x202021(0x23b)]!==this[_0x202021(0x622)]['_pageIndex'])return!![];if(this[_0x202021(0x622)][_0x202021(0x391)]&&!this['_eventErased'])return!![];if(this[_0x202021(0x622)][_0x202021(0x59c)][_0x202021(0x1e6)]==='')return![];if(this[_0x202021(0x266)]!==_0x22bfd4[_0x202021(0x628)]())return!![];if(this['_eventScreenX']!==this[_0x202021(0x622)][_0x202021(0x3df)]())return!![];if(this['_eventScreenY']!==this[_0x202021(0x622)][_0x202021(0x4c4)]())return!![];if(this[_0x202021(0x227)]!==this[_0x202021(0x622)][_0x202021(0x59c)][_0x202021(0x458)])return!![];if(this[_0x202021(0x30b)]!==this[_0x202021(0x622)][_0x202021(0x59c)][_0x202021(0x46a)])return!![];if(this['_visiblePlayerX']!==_0x3d6646['x'])return!![];if(this[_0x202021(0x1c8)]!==_0x3fa90c['y'])return!![];if(this[_0x202021(0x273)]!==this[_0x202021(0x622)]['x'])return!![];if(this[_0x202021(0x5d2)]!==this[_0x202021(0x622)]['y'])return!![];if(this[_0x202021(0x4f4)]!==_0x3d5dc7['eventLabelsVisible']())return!![];if(this[_0x202021(0x5ff)]&&this[_0x202021(0x5ea)]<0xff)return!![];if(!this[_0x202021(0x5ff)]&&this['contentsOpacity']>0x0)return!![];if(_0x553c55[_0x202021(0x185)]['_encounterEffectDuration']>0x0)return!![];return![];}}if(_0x43cd61)$gameTemp[_0x202021(0x426)]=![];},Game_Character[_0x116828(0x29b)][_0x116828(0x602)]=function(_0x273ac0,_0x4d6ae8,_0x20cb5e){const _0x29675e=_0x116828;this[_0x29675e(0x5fc)](_0x273ac0,_0x4d6ae8,_0x20cb5e);if(this['x']!==_0x273ac0||this['y']!==_0x4d6ae8)this[_0x29675e(0x631)]--;},Game_Character[_0x116828(0x29b)][_0x116828(0x61b)]=function(_0x4d5579,_0x27b427){const _0x2ba412=_0x116828;if(_0x4d5579)this[_0x2ba412(0x602)](_0x4d5579['x'],_0x4d5579['y'],_0x27b427);},Game_Character[_0x116828(0x29b)]['processMoveRouteMoveRepeat']=function(_0x5507fe,_0x1e6705){const _0x20890b=_0x116828;_0x1e6705=_0x1e6705||0x0;const _0x395671={'code':0x1,'indent':null,'parameters':[]};_0x395671[_0x20890b(0x2e5)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x5507fe],this[_0x20890b(0x1fb)]['list'][this[_0x20890b(0x631)]][_0x20890b(0x167)][0x0]='';while(_0x1e6705--){this[_0x20890b(0x1fb)][_0x20890b(0x2ce)][_0x20890b(0x40d)](this[_0x20890b(0x631)]+0x1,0x0,_0x395671);}},Game_Character['prototype'][_0x116828(0x17f)]=function(_0x26c98e){const _0xcc0692=_0x116828;this[_0xcc0692(0x4d7)]=!![],this[_0xcc0692(0x168)](_0x26c98e);},Game_Character['prototype'][_0x116828(0x49f)]=function(_0x2b9865,_0x3265a6){const _0x44d3d6=_0x116828;if(this===$gamePlayer)return;const _0x45f53f=[this[_0x44d3d6(0x59e)],this[_0x44d3d6(0x36e)],'A'];if(_0x2b9865[_0x44d3d6(0x5ba)](/\b[ABCD]\b/i))_0x45f53f[0x2]=String(_0x2b9865)['charAt'](0x0)[_0x44d3d6(0x5db)]()[_0x44d3d6(0x423)]();else{if('pBQWd'==='pBQWd')_0x45f53f[0x2]='Self\x20Switch\x20%1'[_0x44d3d6(0x386)](_0x2b9865);else{let _0x29ec8d=this[_0x44d3d6(0x406)];return this[_0x44d3d6(0x153)]()&&(_0x29ec8d+=this[_0x44d3d6(0x165)]()),this[_0x44d3d6(0x229)](_0x29ec8d);}}switch(_0x3265a6[_0x44d3d6(0x5db)]()[_0x44d3d6(0x423)]()){case'ON':case _0x44d3d6(0x280):$gameSelfSwitches[_0x44d3d6(0x384)](_0x45f53f,!![]);break;case _0x44d3d6(0x1da):case'FALSE':$gameSelfSwitches[_0x44d3d6(0x384)](_0x45f53f,![]);break;case _0x44d3d6(0x416):$gameSelfSwitches['setValue'](_0x45f53f,!$gameSelfSwitches[_0x44d3d6(0x4ba)](_0x45f53f));break;}},Game_Character[_0x116828(0x29b)]['processMoveRouteSelfVariable']=function(_0x3a1ce0,_0xb316e3){const _0x135c6b=_0x116828;if(this===$gamePlayer)return;const _0x390605=[this[_0x135c6b(0x59e)],this[_0x135c6b(0x36e)],_0x135c6b(0x33c)[_0x135c6b(0x386)](_0x3a1ce0)];$gameSelfSwitches['setValue'](_0x390605,Number(_0xb316e3));},Game_Character[_0x116828(0x29b)][_0x116828(0x642)]=function(_0x3d17fc,_0x24bc2b){this['locate'](_0x3d17fc,_0x24bc2b);},Game_Character[_0x116828(0x29b)][_0x116828(0x516)]=function(_0x4bcc01){const _0x43d3cd=_0x116828;if(_0x4bcc01)this[_0x43d3cd(0x642)](_0x4bcc01['x'],_0x4bcc01['y']);},Game_Character[_0x116828(0x29b)][_0x116828(0x615)]=function(){const _0x56541a=_0x116828;switch(this[_0x56541a(0x592)]()){case 0x1:this[_0x56541a(0x393)](0x7);break;case 0x2:this[_0x56541a(0x393)](0x4);break;case 0x3:this[_0x56541a(0x393)](0x1);break;case 0x4:this[_0x56541a(0x393)](0x8);break;case 0x6:this[_0x56541a(0x393)](0x2);break;case 0x7:this['setDirection'](0x9);break;case 0x8:this[_0x56541a(0x393)](0x6);break;case 0x9:this[_0x56541a(0x393)](0x3);break;}},Game_Character[_0x116828(0x29b)][_0x116828(0x62a)]=function(){const _0x2a289c=_0x116828;switch(this['direction']()){case 0x1:this['setDirection'](0x3);break;case 0x2:this['setDirection'](0x6);break;case 0x3:this[_0x2a289c(0x393)](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0x2a289c(0x393)](0x8);break;case 0x7:this[_0x2a289c(0x393)](0x1);break;case 0x8:this['setDirection'](0x4);break;case 0x9:this[_0x2a289c(0x393)](0x7);break;}},Game_Character[_0x116828(0x29b)][_0x116828(0x321)]=function(_0x5ef204,_0x240705,_0x4be5fa){const _0x3e4695=_0x116828,_0x12848b=this[_0x3e4695(0x5d0)](_0x5ef204),_0x5c670f=this[_0x3e4695(0x364)](_0x240705);if($gameMap['isSupportDiagonalMovement']()){if(_0x3e4695(0x4d8)!=='UyqWc')_0x5c153a[_0x3e4695(0x460)](this[_0x3e4695(0x2d7)]());else{if(_0x4be5fa||this[_0x3e4695(0x368)]()){if(_0x12848b>0x0&&_0x5c670f<0x0)return 0x1;if(_0x12848b<0x0&&_0x5c670f<0x0)return 0x3;if(_0x12848b>0x0&&_0x5c670f>0x0)return 0x7;if(_0x12848b<0x0&&_0x5c670f>0x0)return 0x9;}}}if(Math[_0x3e4695(0x291)](_0x12848b)>Math[_0x3e4695(0x291)](_0x5c670f))return _0x12848b>0x0?0x4:0x6;else{if(_0x5c670f!==0x0)return _0x5c670f>0x0?0x8:0x2;}return 0x0;},Game_Character[_0x116828(0x29b)]['getDirectionFromPoint']=function(_0x291483,_0x2140a9,_0x5d3aee){const _0x4ae334=_0x116828,_0x1b2cdd=this[_0x4ae334(0x5d0)](_0x291483),_0x646985=this[_0x4ae334(0x364)](_0x2140a9);if($gameMap['isSupportDiagonalMovement']()){if(_0x4ae334(0x3ed)!==_0x4ae334(0x3ed))this[_0x4ae334(0x616)]['x']=this[_0x4ae334(0x27b)][_0x4ae334(0x432)](),this['_shadowSprite']['y']=this['_character'][_0x4ae334(0x1f6)](),this[_0x4ae334(0x616)]['opacity']=this[_0x4ae334(0x375)],this[_0x4ae334(0x616)][_0x4ae334(0x4bb)]=this[_0x4ae334(0x27b)][_0x4ae334(0x1c0)](),this[_0x4ae334(0x616)][_0x4ae334(0x4d3)]=this['_hidden'],!this[_0x4ae334(0x27b)][_0x4ae334(0x3d7)]()?(this[_0x4ae334(0x616)][_0x4ae334(0x20a)]['x']=_0x1315bd[_0x4ae334(0x456)](0x1,this[_0x4ae334(0x616)][_0x4ae334(0x20a)]['x']+0.1),this[_0x4ae334(0x616)][_0x4ae334(0x20a)]['y']=_0x1bff16[_0x4ae334(0x456)](0x1,this['_shadowSprite'][_0x4ae334(0x20a)]['y']+0.1)):(this[_0x4ae334(0x616)][_0x4ae334(0x20a)]['x']=_0x53c555[_0x4ae334(0x37e)](0x0,this[_0x4ae334(0x616)][_0x4ae334(0x20a)]['x']-0.1),this[_0x4ae334(0x616)][_0x4ae334(0x20a)]['y']=_0x448bf2[_0x4ae334(0x37e)](0x0,this[_0x4ae334(0x616)][_0x4ae334(0x20a)]['y']-0.1));else{if(_0x5d3aee||this[_0x4ae334(0x368)]()){if(_0x4ae334(0x624)===_0x4ae334(0x624)){if(_0x1b2cdd>0x0&&_0x646985<0x0)return 0x9;if(_0x1b2cdd<0x0&&_0x646985<0x0)return 0x7;if(_0x1b2cdd>0x0&&_0x646985>0x0)return 0x3;if(_0x1b2cdd<0x0&&_0x646985>0x0)return 0x1;}else this[_0x4ae334(0x59c)][_0x4ae334(0x582)]=_0x33ee6e(_0x5a52b9['$1']);}}}if(Math[_0x4ae334(0x291)](_0x1b2cdd)>Math[_0x4ae334(0x291)](_0x646985)){if('ypTxc'!==_0x4ae334(0x601))return _0x1b2cdd>0x0?0x6:0x4;else{const _0x3761d6=_0x300181[_0x4ae334(0x2c6)](this[_0x4ae334(0x1cc)]/0x3c/0x3c),_0xe17698=_0x5e9110[_0x4ae334(0x2c6)](this[_0x4ae334(0x1cc)]/0x3c)%0x3c,_0x4d1c5c=this['_seconds']%0x3c;let _0x129180=_0xe17698['padZero'](0x2)+':'+_0x4d1c5c['padZero'](0x2);if(_0x3761d6>0x0)_0x129180=_0x4ae334(0x59d)['format'](_0x3761d6,_0x129180);return _0x129180;}}else{if(_0x646985!==0x0)return _0x646985>0x0?0x2:0x8;}return 0x0;},Game_Character[_0x116828(0x29b)]['moveTowardPoint']=function(_0x4dc4d3,_0x119e2b){const _0x260028=_0x116828,_0x5af97c=this[_0x260028(0x321)](_0x4dc4d3,_0x119e2b,!![]);if(_0x5af97c)this[_0x260028(0x332)](_0x5af97c);},Game_Character['prototype'][_0x116828(0x2e1)]=function(_0x4117bb,_0x39689b){const _0x16b8b2=_0x116828,_0x2c89ba=this[_0x16b8b2(0x462)](_0x4117bb,_0x39689b,!![]);if(_0x2c89ba)this[_0x16b8b2(0x332)](_0x2c89ba);},Game_Character[_0x116828(0x29b)][_0x116828(0x220)]=function(_0x4e5e70,_0x101bd4){const _0x24bedb=this['getDirectionToPoint'](_0x4e5e70,_0x101bd4,![]);if(_0x24bedb)this['setDirection'](_0x24bedb);},Game_Character[_0x116828(0x29b)]['turnAwayFromPoint']=function(_0x5a780f,_0x531189){const _0x1a6846=_0x116828,_0x51cc15=this[_0x1a6846(0x462)](_0x5a780f,_0x531189,![]);if(_0x51cc15)this[_0x1a6846(0x393)](_0x51cc15);},Game_Character[_0x116828(0x29b)]['moveTowardCharacter']=function(_0x8e3db7){const _0x5e84d4=_0x116828;if(_0x8e3db7)this[_0x5e84d4(0x481)](_0x8e3db7['x'],_0x8e3db7['y']);},Game_Character[_0x116828(0x29b)][_0x116828(0x541)]=function(_0x503dcc){const _0x1717cb=_0x116828;if(_0x503dcc)this[_0x1717cb(0x2e1)](_0x503dcc['x'],_0x503dcc['y']);},Game_Character[_0x116828(0x29b)][_0x116828(0x27c)]=function(_0x40fdd0){const _0xec609b=_0x116828;if(_0x40fdd0)this[_0xec609b(0x220)](_0x40fdd0['x'],_0x40fdd0['y']);},Game_Character[_0x116828(0x29b)][_0x116828(0x3f5)]=function(_0x51607a){if(_0x51607a)this['turnAwayFromPoint'](_0x51607a['x'],_0x51607a['y']);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x210)]=Game_Player[_0x116828(0x29b)]['isDashing'],Game_Player[_0x116828(0x29b)][_0x116828(0x153)]=function(){const _0x41994a=_0x116828;if(this[_0x41994a(0x4f9)])return!![];return VisuMZ[_0x41994a(0x3d8)][_0x41994a(0x210)][_0x41994a(0x176)](this);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x315)]=Game_Player[_0x116828(0x29b)][_0x116828(0x2f1)],Game_Player['prototype'][_0x116828(0x2f1)]=function(){const _0x257a7b=_0x116828;return $gameMap['isSupportDiagonalMovement']()?this[_0x257a7b(0x3e9)]():VisuMZ[_0x257a7b(0x3d8)][_0x257a7b(0x315)]['call'](this);},Game_Player['prototype']['getInputDir8']=function(){const _0x2a2aac=_0x116828;return Input[_0x2a2aac(0x335)];},Game_Player[_0x116828(0x29b)]['moveByInput']=function(){const _0x1850b3=_0x116828;if($gameSystem[_0x1850b3(0x249)]())return 0x0;if(!this[_0x1850b3(0x450)]()&&this[_0x1850b3(0x58e)]()){let _0xa0ab31=this[_0x1850b3(0x2f1)]();if(_0xa0ab31>0x0)$gameTemp['clearDestination']();else{if($gameTemp[_0x1850b3(0x178)]()){const _0x851a5b=$gameTemp['destinationX'](),_0x56d5de=$gameTemp[_0x1850b3(0x5b0)](),_0x5026e2=$gameMap['isSupportDiagonalMovement'](),_0x58b5ad=$gameMap[_0x1850b3(0x637)](_0x851a5b,_0x56d5de),_0x42ecb3=$gameMap[_0x1850b3(0x62f)](_0x851a5b,_0x56d5de)[_0x1850b3(0x198)]<=0x0;_0x5026e2&&_0x58b5ad&&_0x42ecb3?_0xa0ab31=this[_0x1850b3(0x5d7)](_0x851a5b,_0x56d5de):_0x1850b3(0x1de)===_0x1850b3(0x2d3)?(this[_0x1850b3(0x529)]=this[_0x1850b3(0x622)][_0x1850b3(0x20d)](),this[_0x1850b3(0x51c)]()):_0xa0ab31=this[_0x1850b3(0x3a8)](_0x851a5b,_0x56d5de);}}if(_0xa0ab31>0x0){if('kzDOV'!==_0x1850b3(0x3f9))this[_0x1850b3(0x24d)]=this[_0x1850b3(0x24d)]||0x0,this['isTurnInPlace']()?this['setDirection'](_0xa0ab31):this['executeMove'](_0xa0ab31),this[_0x1850b3(0x24d)]++;else{if(_0xec9466[_0x1850b3(0x2eb)](this['_characterName']))return;_0x2b3628=_0x4284d9[_0x1850b3(0x1fe)](0x0,0x7),this[_0x1850b3(0x570)](this[_0x1850b3(0x28d)],_0x1657f4);}}else this[_0x1850b3(0x24d)]=0x0;}},Game_Player[_0x116828(0x29b)]['isTurnInPlace']=function(){const _0x1f9953=_0x116828,_0xbf1ffc=VisuMZ['EventsMoveCore'][_0x1f9953(0x256)][_0x1f9953(0x534)];if(!_0xbf1ffc[_0x1f9953(0x425)])return![];if($gameTemp[_0x1f9953(0x178)]())return![];if(this[_0x1f9953(0x153)]()||this['isMoving']()||this['isOnLadder']())return![];return this[_0x1f9953(0x24d)]<_0xbf1ffc[_0x1f9953(0x237)];},VisuMZ['EventsMoveCore'][_0x116828(0x2a1)]=Game_Player[_0x116828(0x29b)][_0x116828(0x569)],Game_Player[_0x116828(0x29b)]['executeMove']=function(_0x3d6e1d){const _0x28f868=_0x116828;$gameMap[_0x28f868(0x39c)]()?this[_0x28f868(0x332)](_0x3d6e1d):VisuMZ[_0x28f868(0x3d8)][_0x28f868(0x2a1)][_0x28f868(0x176)](this,_0x3d6e1d);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x5fe)]=Game_Player[_0x116828(0x29b)][_0x116828(0x5c4)],Game_Player[_0x116828(0x29b)][_0x116828(0x5c4)]=function(_0x31966c,_0x4a6d02,_0xe5316b){const _0x1cf2b4=_0x116828;if($gameMap['isRegionAllowPass'](_0x31966c,_0x4a6d02,_0xe5316b,'player')){if(_0x1cf2b4(0x344)===_0x1cf2b4(0x344))return this['isInVehicle']()&&this['vehicle']()?this[_0x1cf2b4(0x1ab)]()['isMapPassable'](_0x31966c,_0x4a6d02,_0xe5316b):!![];else _0x2cf5d9[_0x1cf2b4(0x3d8)]['Game_Timer_onExpire']['call'](this);}if($gameMap['isRegionForbidPass'](_0x31966c,_0x4a6d02,_0xe5316b,_0x1cf2b4(0x22e)))return![];return VisuMZ['EventsMoveCore']['Game_Player_isMapPassable']['call'](this,_0x31966c,_0x4a6d02,_0xe5316b);},VisuMZ['EventsMoveCore'][_0x116828(0x373)]=Game_Player[_0x116828(0x29b)]['checkEventTriggerHere'],Game_Player['prototype'][_0x116828(0x464)]=function(_0x5e4ff2){const _0x26461b=_0x116828;VisuMZ[_0x26461b(0x3d8)][_0x26461b(0x373)][_0x26461b(0x176)](this,_0x5e4ff2);if(this[_0x26461b(0x2c5)]()){this[_0x26461b(0x478)](_0x5e4ff2);if(_0x5e4ff2[_0x26461b(0x635)](0x0)&&this[_0x26461b(0x52e)]()===_0x26461b(0x2a9))this[_0x26461b(0x5ac)](this['x'],this['y']);else(_0x5e4ff2[_0x26461b(0x635)](0x1)||_0x5e4ff2['includes'](0x2))&&this['startMapCommonEventOnTouch']();}},VisuMZ[_0x116828(0x3d8)][_0x116828(0x50c)]=Game_Player[_0x116828(0x29b)][_0x116828(0x2e7)],Game_Player[_0x116828(0x29b)][_0x116828(0x2e7)]=function(_0x1f0913){const _0x5b301d=_0x116828;VisuMZ[_0x5b301d(0x3d8)]['Game_Player_checkEventTriggerThere'][_0x5b301d(0x176)](this,_0x1f0913);if(this[_0x5b301d(0x2c5)]()&&_0x1f0913['includes'](0x0)&&this[_0x5b301d(0x52e)]()===_0x5b301d(0x1ba)){const _0x4b9065=this[_0x5b301d(0x592)](),_0x2bc52f=$gameMap[_0x5b301d(0x1d6)](this['x'],_0x4b9065),_0x39ba57=$gameMap[_0x5b301d(0x1c5)](this['y'],_0x4b9065);this[_0x5b301d(0x5ac)](_0x2bc52f,_0x39ba57);}},Game_Player[_0x116828(0x29b)]['checkEventTriggerEventsMoveCore']=function(_0x8acb1){const _0xa1a7fa=_0x116828;if($gameMap[_0xa1a7fa(0x3db)]())return;if($gameMap[_0xa1a7fa(0x5f9)]())return;const _0xd6fd26=$gameMap[_0xa1a7fa(0x3f1)]();for(const _0x499f70 of _0xd6fd26){if(!_0x499f70)continue;if(!_0x499f70[_0xa1a7fa(0x5c8)](_0x8acb1))continue;if(this[_0xa1a7fa(0x300)](_0x499f70))return _0x499f70['start']();if(this[_0xa1a7fa(0x31b)](_0x499f70))return _0x499f70[_0xa1a7fa(0x4d1)]();}},Game_Player[_0x116828(0x29b)]['meetActivationRegionConditions']=function(_0x167e76){const _0x461d83=_0x116828;if($gameMap[_0x461d83(0x3db)]())return![];if($gameMap[_0x461d83(0x5f9)]())return![];return _0x167e76[_0x461d83(0x63f)]()[_0x461d83(0x635)](this[_0x461d83(0x607)]());},Game_Player[_0x116828(0x29b)]['meetActivationProximityConditions']=function(_0x53484f){const _0x3a00fa=_0x116828;if($gameMap[_0x3a00fa(0x3db)]())return![];if($gameMap[_0x3a00fa(0x5f9)]())return![];if([_0x3a00fa(0x575),_0x3a00fa(0x438)][_0x3a00fa(0x635)](_0x53484f[_0x3a00fa(0x495)]()))return![];const _0x3d53ee=_0x53484f[_0x3a00fa(0x495)](),_0x204513=_0x53484f[_0x3a00fa(0x277)]();switch(_0x3d53ee){case'radius':const _0x19bda9=$gameMap[_0x3a00fa(0x27f)](this['x'],this['y'],_0x53484f['x'],_0x53484f['y']);return _0x53484f[_0x3a00fa(0x277)]()>=_0x19bda9;break;case _0x3a00fa(0x62c):return _0x204513>=Math[_0x3a00fa(0x291)](_0x53484f[_0x3a00fa(0x5d0)](this['x']))&&_0x204513>=Math[_0x3a00fa(0x291)](_0x53484f[_0x3a00fa(0x364)](this['y']));break;case _0x3a00fa(0x2e4):return _0x204513>=Math[_0x3a00fa(0x291)](_0x53484f['deltaYFrom'](this['y']));break;case'column':return _0x204513>=Math[_0x3a00fa(0x291)](_0x53484f[_0x3a00fa(0x5d0)](this['x']));break;case _0x3a00fa(0x3e0):return![];break;}},Game_Player[_0x116828(0x29b)]['startMapCommonEventOnOK']=function(_0x1e04a5,_0x2e7b6c){const _0x5b1d50=_0x116828;if($gameMap[_0x5b1d50(0x3db)]())return;if($gameMap[_0x5b1d50(0x5f9)]())return;let _0x1206bd=VisuMZ['EventsMoveCore'][_0x5b1d50(0x256)][_0x5b1d50(0x306)],_0x45f96b=$gameMap[_0x5b1d50(0x607)](_0x1e04a5,_0x2e7b6c);const _0x3a85ad=_0x5b1d50(0x532)[_0x5b1d50(0x386)](_0x45f96b);_0x1206bd[_0x3a85ad]&&$gameTemp['reserveCommonEvent'](_0x1206bd[_0x3a85ad]);},Game_Player[_0x116828(0x29b)]['startMapCommonEventOnOKTarget']=function(){const _0x2d28be=_0x116828;return VisuMZ[_0x2d28be(0x3d8)][_0x2d28be(0x256)][_0x2d28be(0x282)];},Game_Player['prototype'][_0x116828(0x33f)]=function(){const _0x45da6d=_0x116828;if($gameMap[_0x45da6d(0x3db)]())return;if($gameMap[_0x45da6d(0x5f9)]())return;let _0x28f734=VisuMZ[_0x45da6d(0x3d8)][_0x45da6d(0x256)]['RegionTouch'];const _0x22d124='Region%1'['format'](this['regionId']());_0x28f734[_0x22d124]&&$gameTemp['reserveCommonEvent'](_0x28f734[_0x22d124]);},VisuMZ['EventsMoveCore']['Game_Player_increaseSteps']=Game_Player[_0x116828(0x29b)][_0x116828(0x1db)],Game_Player[_0x116828(0x29b)][_0x116828(0x1db)]=function(){const _0x1ffb3e=_0x116828;VisuMZ[_0x1ffb3e(0x3d8)][_0x1ffb3e(0x191)][_0x1ffb3e(0x176)](this),VisuMZ[_0x1ffb3e(0x24c)](0x0);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x634)]=Game_Follower['prototype'][_0x116828(0x4ad)],Game_Follower[_0x116828(0x29b)][_0x116828(0x4ad)]=function(_0x267930){const _0x1f6657=_0x116828;VisuMZ['EventsMoveCore'][_0x1f6657(0x634)][_0x1f6657(0x176)](this,_0x267930),this[_0x1f6657(0x595)]=![];},Game_Follower[_0x116828(0x29b)][_0x116828(0x153)]=function(){return $gamePlayer['isDashing']();},Game_Follower['prototype'][_0x116828(0x61a)]=function(){const _0x2692d2=_0x116828;return $gamePlayer[_0x2692d2(0x61a)]();},Game_Follower[_0x116828(0x29b)][_0x116828(0x1e1)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower['prototype'][_0x116828(0x649)]=function(_0x250725){this['_chaseOff']=_0x250725;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x53b)]=Game_Follower['prototype']['chaseCharacter'],Game_Follower[_0x116828(0x29b)][_0x116828(0x207)]=function(_0x414755){const _0x28ed5d=_0x116828;if(this[_0x28ed5d(0x595)])return;if($gameSystem[_0x28ed5d(0x21f)]())return;VisuMZ[_0x28ed5d(0x3d8)][_0x28ed5d(0x53b)][_0x28ed5d(0x176)](this,_0x414755);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x613)]=Game_Vehicle[_0x116828(0x29b)]['isMapPassable'],Game_Vehicle['prototype']['isMapPassable']=function(_0x4457c4,_0x2d392c,_0x4a7ad6){const _0x3d1d31=_0x116828;if($gameMap[_0x3d1d31(0x5c6)](_0x4457c4,_0x2d392c,_0x4a7ad6,this[_0x3d1d31(0x4a3)]))return!![];if($gameMap['isRegionForbidPass'](_0x4457c4,_0x2d392c,_0x4a7ad6,this[_0x3d1d31(0x4a3)]))return![];return VisuMZ[_0x3d1d31(0x3d8)]['Game_Vehicle_isMapPassable'][_0x3d1d31(0x176)](this,_0x4457c4,_0x2d392c,_0x4a7ad6);},Game_Vehicle[_0x116828(0x29b)][_0x116828(0x255)]=function(_0x338b88,_0x1a2f6e,_0x5ab85d){const _0x51aec7=_0x116828;if($gameMap[_0x51aec7(0x5c6)](_0x338b88,_0x1a2f6e,_0x5ab85d,this[_0x51aec7(0x4a3)]))return!![];if($gameMap[_0x51aec7(0x445)](_0x338b88,_0x1a2f6e,_0x5ab85d,this['_type']))return![];return VisuMZ[_0x51aec7(0x3d8)][_0x51aec7(0x45b)][_0x51aec7(0x176)]($gamePlayer,_0x338b88,_0x1a2f6e,_0x5ab85d);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x4c7)]=Game_Vehicle[_0x116828(0x29b)]['isLandOk'],Game_Vehicle['prototype'][_0x116828(0x333)]=function(_0x1e1b6b,_0x1086b4,_0x94860b){const _0x2fe82c=_0x116828;if($gameMap[_0x2fe82c(0x5b5)](_0x1e1b6b,_0x1086b4,_0x94860b,this[_0x2fe82c(0x4a3)]))return!![];const _0x26df84=this[_0x2fe82c(0x4a3)][_0x2fe82c(0x19c)](0x0)[_0x2fe82c(0x5db)]()+this[_0x2fe82c(0x4a3)][_0x2fe82c(0x4e9)](0x1),_0x32a8ea=_0x2fe82c(0x44f)[_0x2fe82c(0x386)](_0x26df84);if(VisuMZ['EventsMoveCore'][_0x2fe82c(0x256)][_0x2fe82c(0x55d)][_0x32a8ea]){if(_0x2fe82c(0x4c1)!==_0x2fe82c(0x4c1)){const _0x754c3=_0x48de8b['round'](_0x7d7e19-this['x']),_0x1f7d65=_0x59eace['round'](_0x1e6bfe-this['y']);this['jump'](_0x754c3,_0x1f7d65);}else return![];}else return VisuMZ[_0x2fe82c(0x3d8)][_0x2fe82c(0x4c7)][_0x2fe82c(0x176)](this,_0x1e1b6b,_0x1086b4,_0x94860b);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x30a)]=Game_Vehicle[_0x116828(0x29b)][_0x116828(0x5fd)],Game_Vehicle[_0x116828(0x29b)][_0x116828(0x5fd)]=function(){const _0x34888b=_0x116828;VisuMZ[_0x34888b(0x3d8)][_0x34888b(0x30a)][_0x34888b(0x176)](this);const _0x464812=VisuMZ['EventsMoveCore'][_0x34888b(0x256)][_0x34888b(0x534)];if(this[_0x34888b(0x2b0)]()){if(_0x464812[_0x34888b(0x643)])this['setMoveSpeed'](_0x464812[_0x34888b(0x643)]);}else{if(this['isShip']()){if(_0x464812[_0x34888b(0x2ea)])this['setMoveSpeed'](_0x464812[_0x34888b(0x2ea)]);}else{if(this[_0x34888b(0x313)]()){if(_0x34888b(0x16a)!==_0x34888b(0x40a)){if(_0x464812[_0x34888b(0x492)])this[_0x34888b(0x5b4)](_0x464812[_0x34888b(0x492)]);}else return _0x3060a2[_0x34888b(0x29b)][_0x34888b(0x175)][_0x34888b(0x176)](this);}}}},VisuMZ[_0x116828(0x3d8)][_0x116828(0x4dd)]=Game_Event[_0x116828(0x29b)][_0x116828(0x4ad)],Game_Event[_0x116828(0x29b)][_0x116828(0x4ad)]=function(_0x70c22d,_0x153480){const _0xd30e3f=_0x116828;VisuMZ['EventsMoveCore']['Game_Event_initialize'][_0xd30e3f(0x176)](this,_0x70c22d,_0x153480),this['setupCopyEvent'](),this['setupMorphEvent'](),this[_0xd30e3f(0x636)]();},Game_Map['prototype'][_0x116828(0x4ab)]=function(_0x5444b5,_0x56fb84){const _0x37330c=_0x116828;if(_0x5444b5===$gameMap[_0x37330c(0x2d7)]()){if(_0x37330c(0x4da)===_0x37330c(0x166))this[_0x37330c(0x34f)]=_0x184507,this[_0x37330c(0x2b8)]=-0x2,this[_0x37330c(0x51c)]();else return $dataMap[_0x37330c(0x3f1)][_0x56fb84];}else return VisuMZ[_0x37330c(0x336)][_0x5444b5][_0x37330c(0x3f1)][_0x56fb84];},VisuMZ[_0x116828(0x3d8)]['Game_Event_event']=Game_Event['prototype'][_0x116828(0x41a)],Game_Event[_0x116828(0x29b)][_0x116828(0x41a)]=function(){const _0x155b35=_0x116828;if(this[_0x155b35(0x34f)]!==undefined){if(_0x155b35(0x3f7)==='ZIowb'){const _0x2f2a0d=this[_0x155b35(0x34f)][_0x155b35(0x2d7)],_0x40488e=this[_0x155b35(0x34f)][_0x155b35(0x160)];return $gameMap[_0x155b35(0x4ab)](_0x2f2a0d,_0x40488e);}else _0x238a11[_0x155b35(0x327)](),_0x4f960f['EventsMoveCore']['Window_ScrollText_startMessage'][_0x155b35(0x176)](this),_0xf9ab37['clearSelfTarget']();}if(this['_eventCopyData']!==undefined){const _0x4dc646=this[_0x155b35(0x517)][_0x155b35(0x2d7)],_0x4b3cf2=this[_0x155b35(0x517)]['eventId'];return $gameMap[_0x155b35(0x4ab)](_0x4dc646,_0x4b3cf2);}if(this[_0x155b35(0x307)]!==undefined){const _0x5c115a=this[_0x155b35(0x307)][_0x155b35(0x2d7)],_0x5882c6=this[_0x155b35(0x307)]['eventId'];return $gameMap[_0x155b35(0x4ab)](_0x5c115a,_0x5882c6);}if($gameTemp['_spawnData']!==undefined){if('ROchu'===_0x155b35(0x5c5)){const _0x16db00=[_0x5d3cf4[_0x155b35(0x59e)],_0x3e15a7['_eventId'],'Self\x20Switch\x20%1'['format'](_0x583c58)];_0x3449e4[_0x155b35(0x384)](_0x16db00,_0x276b63);}else{const _0xb68c2=$gameTemp['_spawnData']['mapId'],_0x51cd05=$gameTemp[_0x155b35(0x549)][_0x155b35(0x160)];return $gameMap[_0x155b35(0x4ab)](_0xb68c2,_0x51cd05);}}return VisuMZ[_0x155b35(0x3d8)]['Game_Event_event']['call'](this);},Game_Event[_0x116828(0x29b)][_0x116828(0x20f)]=function(_0x34fc5c,_0x669852){const _0x46d5e2=_0x116828;if(_0x34fc5c===0x0||_0x669852===0x0)return![];if(!VisuMZ[_0x46d5e2(0x336)][_0x34fc5c]&&_0x34fc5c!==$gameMap['mapId']()){if($gameTemp[_0x46d5e2(0x61f)]()){if('SXwkl'===_0x46d5e2(0x3d2))console[_0x46d5e2(0x358)](_0x46d5e2(0x599)[_0x46d5e2(0x386)](_0x34fc5c));else{if(_0x4f6276[_0x46d5e2(0x397)][_0x136766]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))_0x1df6dc[_0x46d5e2(0x26a)][_0x46d5e2(0x346)](_0x2c2f26);if(_0x40a9da[_0x46d5e2(0x397)][_0x486a64][_0x46d5e2(0x5ba)](/<SELF>/i))_0x1d7fa3[_0x46d5e2(0x183)][_0x46d5e2(0x346)](_0x4a0851);if(_0x470239[_0x46d5e2(0x397)][_0x41a85e][_0x46d5e2(0x5ba)](/<MAP>/i))_0x5568c9['MapVariables']['push'](_0x50a9b7);}}return![];}return!![];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x4a5)]=Game_Event[_0x116828(0x29b)]['start'],Game_Event[_0x116828(0x29b)][_0x116828(0x4d1)]=function(){const _0x23f9bb=_0x116828;VisuMZ[_0x23f9bb(0x3d8)][_0x23f9bb(0x4a5)][_0x23f9bb(0x176)](this),Imported[_0x23f9bb(0x60c)]&&Input['isPressed'](VisuMZ[_0x23f9bb(0x55e)][_0x23f9bb(0x256)][_0x23f9bb(0x2e2)][_0x23f9bb(0x49d)])&&Input[_0x23f9bb(0x424)]();},Game_Event[_0x116828(0x29b)][_0x116828(0x60d)]=function(){const _0x52bd06=_0x116828,_0x2f6603=this[_0x52bd06(0x41a)]()['note'];if(_0x2f6603==='')return;if(DataManager['isBattleTest']()||DataManager['isEventTest']())return;const _0x5158c9=VisuMZ[_0x52bd06(0x3d8)][_0x52bd06(0x256)][_0x52bd06(0x3d4)];let _0x3e4583=null,_0x3c6837=0x0,_0x36f4f4=0x0;if(_0x2f6603['match'](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i)){if(_0x52bd06(0x1b4)!=='hrtxW')_0x3c6837=Number(RegExp['$1']),_0x36f4f4=Number(RegExp['$2']);else return 0x2;}else{if(_0x2f6603['match'](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x3c6837=Number(RegExp['$1']),_0x36f4f4=Number(RegExp['$2']);else{if(_0x2f6603[_0x52bd06(0x5ba)](/<COPY EVENT:[ ](.*?)>/i)){const _0x281c28=String(RegExp['$1'])[_0x52bd06(0x5db)]()[_0x52bd06(0x423)]();_0x3e4583=VisuMZ[_0x52bd06(0x1c9)][_0x281c28];if(!_0x3e4583)return;_0x3c6837=_0x3e4583[_0x52bd06(0x3e8)],_0x36f4f4=_0x3e4583[_0x52bd06(0x506)];}}}if(!this['checkValidEventerMap'](_0x3c6837,_0x36f4f4))return;_0x5158c9[_0x52bd06(0x51f)][_0x52bd06(0x176)](this,_0x3c6837,_0x36f4f4,this);if(_0x3e4583)_0x3e4583[_0x52bd06(0x51f)][_0x52bd06(0x176)](this,_0x3c6837,_0x36f4f4,this);this[_0x52bd06(0x517)]={'mapId':_0x3c6837,'eventId':_0x36f4f4},this[_0x52bd06(0x2b8)]=-0x2,this[_0x52bd06(0x51c)](),_0x5158c9[_0x52bd06(0x33d)][_0x52bd06(0x176)](this,_0x3c6837,_0x36f4f4,this);if(_0x3e4583)_0x3e4583[_0x52bd06(0x33d)][_0x52bd06(0x176)](this,_0x3c6837,_0x36f4f4,this);$gameMap[_0x52bd06(0x3cc)]();},Game_Event['prototype'][_0x116828(0x5cf)]=function(){const _0x772d87=_0x116828,_0x3734f4=$gameSystem['getPreservedMorphEventData'](this);if(!_0x3734f4)return;const _0x361c3f=_0x3734f4[_0x772d87(0x382)][_0x772d87(0x5db)]()[_0x772d87(0x423)]();_0x361c3f!=='UNTITLED'?this[_0x772d87(0x4eb)](_0x361c3f,!![]):this[_0x772d87(0x4f0)](_0x3734f4['mapId'],_0x3734f4['eventId'],!![]);},Game_Event[_0x116828(0x29b)]['morphInto']=function(_0x1635b6,_0x3a0999,_0x406456){const _0x56e224=_0x116828;if(!this[_0x56e224(0x20f)](_0x1635b6,_0x3a0999))return;const _0x2555f8=VisuMZ[_0x56e224(0x3d8)][_0x56e224(0x256)][_0x56e224(0x3d4)];if(!_0x406456)_0x2555f8[_0x56e224(0x320)][_0x56e224(0x176)](this,_0x1635b6,_0x3a0999,this);this['_eventMorphData']={'mapId':_0x1635b6,'eventId':_0x3a0999},this[_0x56e224(0x2b8)]=-0x2,this[_0x56e224(0x51c)]();if(!_0x406456)_0x2555f8['PostMorphJS'][_0x56e224(0x176)](this,_0x1635b6,_0x3a0999,this);$gameMap[_0x56e224(0x3cc)]();},Game_Event[_0x116828(0x29b)]['morphIntoTemplate']=function(_0xdc014f,_0x28f703){const _0x426f46=_0x116828;_0xdc014f=_0xdc014f[_0x426f46(0x5db)]()[_0x426f46(0x423)]();const _0x3c2e97=VisuMZ[_0x426f46(0x1c9)][_0xdc014f];if(!_0x3c2e97)return;const _0xf2823c=_0x3c2e97[_0x426f46(0x3e8)],_0x28ac95=_0x3c2e97['EventID'];if(!this[_0x426f46(0x20f)](_0xf2823c,_0x28ac95))return;if(!_0x28f703)_0x3c2e97[_0x426f46(0x320)]['call'](this,_0xf2823c,_0x28ac95,this);this[_0x426f46(0x4f0)](_0xf2823c,_0x28ac95,_0x28f703);if(!_0x28f703)_0x3c2e97[_0x426f46(0x5eb)][_0x426f46(0x176)](this,_0xf2823c,_0x28ac95,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event[_0x116828(0x29b)][_0x116828(0x261)]=function(){const _0x682a9=_0x116828;this[_0x682a9(0x34f)]=undefined,this[_0x682a9(0x2b8)]=-0x2,this[_0x682a9(0x51c)]();},Game_Event[_0x116828(0x29b)][_0x116828(0x42a)]=function(_0x234c5f){const _0x202ddc=_0x116828,_0x126af2=VisuMZ[_0x202ddc(0x3d8)]['Settings'][_0x202ddc(0x3d4)],_0x46dba8=_0x234c5f[_0x202ddc(0x382)][_0x202ddc(0x5db)]()[_0x202ddc(0x423)](),_0x53ebd9=!['',_0x202ddc(0x169)]['includes'](_0x46dba8);let _0x2eecab=0x0,_0x355d87=0x0;if(_0x53ebd9){const _0x29265c=VisuMZ['EventTemplates'][_0x46dba8];if(!_0x29265c)return;_0x2eecab=_0x29265c[_0x202ddc(0x3e8)],_0x355d87=_0x29265c[_0x202ddc(0x506)];}else _0x2eecab=_0x234c5f[_0x202ddc(0x2d7)],_0x355d87=_0x234c5f[_0x202ddc(0x160)];if(!this['checkValidEventerMap'](_0x2eecab,_0x355d87))return;if(_0x53ebd9){const _0x29be93=VisuMZ[_0x202ddc(0x1c9)][_0x46dba8];_0x29be93[_0x202ddc(0x451)]['call'](this,_0x2eecab,_0x355d87,this);}_0x126af2[_0x202ddc(0x451)][_0x202ddc(0x176)](this,_0x2eecab,_0x355d87,this),this[_0x202ddc(0x307)]=_0x234c5f,this['_pageIndex']=-0x2,this[_0x202ddc(0x59e)]=$gameMap['mapId'](),this['_eventId']=_0x234c5f[_0x202ddc(0x5a5)],this['_spawnPreserved']=_0x234c5f[_0x202ddc(0x338)],this[_0x202ddc(0x3ac)](_0x234c5f['x'],_0x234c5f['y']),this['setDirection'](_0x234c5f[_0x202ddc(0x592)]),this[_0x202ddc(0x51c)]();if(_0x53ebd9){const _0x43f73d=VisuMZ[_0x202ddc(0x1c9)][_0x46dba8];if(!_0x43f73d)return;_0x43f73d['PostSpawnJS'][_0x202ddc(0x176)](this,_0x2eecab,_0x355d87,this);}_0x126af2['PostSpawnJS'][_0x202ddc(0x176)](this,_0x2eecab,_0x355d87,this);const _0x166299=SceneManager[_0x202ddc(0x185)];if(_0x166299&&_0x166299[_0x202ddc(0x483)])_0x166299[_0x202ddc(0x483)][_0x202ddc(0x434)](this);},Game_Event[_0x116828(0x29b)][_0x116828(0x3c4)]=function(){const _0x137f1f=_0x116828;return!!this[_0x137f1f(0x307)];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x5da)]=Game_Event[_0x116828(0x29b)][_0x116828(0x1e3)],Game_Event['prototype']['clearPageSettings']=function(){const _0x55a7fb=_0x116828;VisuMZ[_0x55a7fb(0x3d8)][_0x55a7fb(0x5da)][_0x55a7fb(0x176)](this),this[_0x55a7fb(0x566)]();},VisuMZ[_0x116828(0x3d8)][_0x116828(0x4b0)]=Game_Event[_0x116828(0x29b)][_0x116828(0x53e)],Game_Event['prototype'][_0x116828(0x53e)]=function(){const _0x37c85f=_0x116828;this['_activationProximityAutoTriggerBypass']=!![],VisuMZ[_0x37c85f(0x3d8)]['Game_Event_setupPageSettings'][_0x37c85f(0x176)](this),this[_0x37c85f(0x487)](),this[_0x37c85f(0x330)]=![];},Game_Event[_0x116828(0x29b)][_0x116828(0x487)]=function(){const _0x51c8aa=_0x116828;if(!this[_0x51c8aa(0x41a)]())return;this[_0x51c8aa(0x566)](),this['setupEventsMoveCoreNotetags'](),this[_0x51c8aa(0x33e)](),this[_0x51c8aa(0x2dc)]();},Game_Event['prototype'][_0x116828(0x457)]=function(){const _0x35a598=_0x116828,_0x393180=this['event']()[_0x35a598(0x5ed)];if(_0x393180==='')return;this[_0x35a598(0x34c)](_0x393180);},Game_Event['prototype'][_0x116828(0x33e)]=function(){const _0x388ff2=_0x116828;if(!this[_0x388ff2(0x598)]())return;const _0x318e7f=this[_0x388ff2(0x2ce)]();let _0x5b8095='';for(const _0x1b6ad0 of _0x318e7f){if(_0x388ff2(0x205)!=='wCSGz'){const _0x21b490=_0x439474[_0x388ff2(0x41a)](_0x2ce076[_0x388ff2(0x4de)]||_0x4a4818[_0x388ff2(0x160)]());_0x21b490[_0x388ff2(0x261)]();}else{if([0x6c,0x198][_0x388ff2(0x635)](_0x1b6ad0['code'])){if(_0x5b8095!=='')_0x5b8095+='\x0a';_0x5b8095+=_0x1b6ad0[_0x388ff2(0x167)][0x0];}}}this[_0x388ff2(0x34c)](_0x5b8095);},Game_Event[_0x116828(0x29b)][_0x116828(0x566)]=function(){const _0x2967b2=_0x116828,_0x4036df=VisuMZ[_0x2967b2(0x3d8)][_0x2967b2(0x256)];this[_0x2967b2(0x326)]={'type':'none','distance':0x0,'regionList':[]},this[_0x2967b2(0x4c9)]=![],this['_clickTrigger']=![],this[_0x2967b2(0x48d)]=![],this[_0x2967b2(0x455)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_eventIcon']=$gameSystem[_0x2967b2(0x175)](this),this[_0x2967b2(0x59c)]={'text':'','visibleRange':_0x4036df[_0x2967b2(0x258)][_0x2967b2(0x589)],'offsetX':_0x4036df[_0x2967b2(0x258)][_0x2967b2(0x400)],'offsetY':_0x4036df['Label'][_0x2967b2(0x157)]},this[_0x2967b2(0x5f0)]=![],this['_moveOnlyRegions']=[],this['_moveSynch']={'target':-0x1,'type':_0x2967b2(0x597),'delay':0x1,'opacityDelta':0x0},this[_0x2967b2(0x55a)]=_0x4036df[_0x2967b2(0x534)]['RandomMoveWeight']??0x0,this[_0x2967b2(0x5f1)]=![],this['_shadowGraphic']={'visible':!![],'filename':_0x4036df[_0x2967b2(0x534)][_0x2967b2(0x419)]},this[_0x2967b2(0x35e)](),this['clearStepPattern']();},Game_Event['prototype']['checkEventsMoveCoreStringTags']=function(_0xaf8a75){const _0x5ca07f=_0x116828;if(_0xaf8a75[_0x5ca07f(0x5ba)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('yFvfW'==='mPULG'){const _0x3d293c=this[_0x5ca07f(0x307)][_0x5ca07f(0x2d7)],_0x20cd6c=this['_eventSpawnData'][_0x5ca07f(0x160)];return _0x2fe1e0['referEvent'](_0x3d293c,_0x20cd6c);}else this[_0x5ca07f(0x326)]['regionList']=JSON[_0x5ca07f(0x2ab)]('['+RegExp['$1'][_0x5ca07f(0x5ba)](/\d+/g)+']'),this[_0x5ca07f(0x326)]['type']='region';}else _0xaf8a75[_0x5ca07f(0x5ba)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])[_0x5ca07f(0x49b)]()[_0x5ca07f(0x423)](),this['_activationProximity'][_0x5ca07f(0x468)]=type,this['_activationProximity'][_0x5ca07f(0x27f)]=Number(RegExp['$2']));_0xaf8a75[_0x5ca07f(0x5ba)](/<ALWAYS UPDATE MOVEMENT>/i)&&(this[_0x5ca07f(0x4c9)]=!![]);if(_0xaf8a75['match'](/<CLICK TRIGGER>/i)){if('VXBht'===_0x5ca07f(0x1a9)){this[_0x5ca07f(0x622)]=_0x33ddc5;const _0x5e8bdf=new _0x51a05c(0x0,0x0,_0x514513[_0x5ca07f(0x449)]/0x4,this['fittingHeight'](0x1));this[_0x5ca07f(0x4cc)](),_0x307872['prototype'][_0x5ca07f(0x4ad)][_0x5ca07f(0x176)](this,_0x5e8bdf),this[_0x5ca07f(0x5ea)]=0x0,this[_0x5ca07f(0x1ce)](0x2),this[_0x5ca07f(0x529)]='';}else this[_0x5ca07f(0x4ed)]=!![];}_0xaf8a75[_0x5ca07f(0x5ba)](/<CUSTOM Z:[ ](.*?)>/i)&&(this['_customZ']=Number(RegExp['$1'])||0x0);const _0x44e957=_0xaf8a75['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x44e957){if(_0x5ca07f(0x52b)===_0x5ca07f(0x509)){if(this[_0x5ca07f(0x194)]())return;_0x56265f[_0x5ca07f(0x3d8)][_0x5ca07f(0x446)][_0x5ca07f(0x176)](this),this['isMoving']()&&_0x4579a5[_0x5ca07f(0x24c)](this[_0x5ca07f(0x36e)]);}else for(const _0x34e42f of _0x44e957){if(_0x34e42f[_0x5ca07f(0x5ba)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x141b67=String(RegExp['$1'])[_0x5ca07f(0x49b)]()[_0x5ca07f(0x423)](),_0x594f92=Number(RegExp['$2']);this[_0x5ca07f(0x455)][_0x141b67]=_0x594f92;}}}if(_0xaf8a75[_0x5ca07f(0x5ba)](/<ICON:[ ](\d+)>/i)){if(_0x5ca07f(0x448)===_0x5ca07f(0x2f8)){const _0x286361=_0x3ead55[_0x5ca07f(0x1c9)][_0x1cd3ac];if(!_0x286361)return;_0x4c61be=_0x286361[_0x5ca07f(0x3e8)],_0x343f6c=_0x286361[_0x5ca07f(0x506)];}else this['_eventIcon']['iconIndex']=Number(RegExp['$1']);}_0xaf8a75[_0x5ca07f(0x5ba)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this['_eventIcon'][_0x5ca07f(0x23c)]=Number(RegExp['$1']));_0xaf8a75['match'](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(this[_0x5ca07f(0x580)]['bufferY']=Number(RegExp['$1']));_0xaf8a75['match'](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5ca07f(0x580)][_0x5ca07f(0x23c)]=Number(RegExp['$1']),this[_0x5ca07f(0x580)][_0x5ca07f(0x491)]=Number(RegExp['$2']));if(_0xaf8a75[_0x5ca07f(0x5ba)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0xceae8=String(RegExp['$1'])[_0x5ca07f(0x5db)]()['trim'](),_0x42936e=['NORMAL','ADDITIVE',_0x5ca07f(0x4c0),_0x5ca07f(0x4bf)];this[_0x5ca07f(0x580)]['blendMode']=_0x42936e[_0x5ca07f(0x4ef)](_0xceae8)[_0x5ca07f(0x1fe)](0x0,0x3);}_0xaf8a75[_0x5ca07f(0x5ba)](/<LABEL:[ ](.*?)>/i)&&(_0x5ca07f(0x17b)!==_0x5ca07f(0x17b)?this[_0x5ca07f(0x1cb)]=!![]:this['_labelWindow'][_0x5ca07f(0x1e6)]=String(RegExp['$1'])[_0x5ca07f(0x423)]());_0xaf8a75['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&(this['_labelWindow'][_0x5ca07f(0x1e6)]=String(RegExp['$1'])[_0x5ca07f(0x423)]());_0xaf8a75[_0x5ca07f(0x5ba)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)&&(this[_0x5ca07f(0x59c)][_0x5ca07f(0x458)]=Number(RegExp['$1']));_0xaf8a75['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)&&(_0x5ca07f(0x571)!==_0x5ca07f(0x231)?this[_0x5ca07f(0x59c)][_0x5ca07f(0x46a)]=Number(RegExp['$1']):_0x5a72b4[_0x5ca07f(0x3d8)][_0x5ca07f(0x44a)]['call'](this,_0x522497,_0x2f0396));if(_0xaf8a75[_0x5ca07f(0x5ba)](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x5ca07f(0x45d)!=='TyyrQ')this[_0x5ca07f(0x59c)][_0x5ca07f(0x458)]=Number(RegExp['$1']),this[_0x5ca07f(0x59c)][_0x5ca07f(0x46a)]=Number(RegExp['$2']);else{const _0x157b8c=_0x478de3[_0x5ca07f(0x5af)](_0x5ca07f(0x25a)),_0x126982=_0x429f90[_0x5ca07f(0x263)],_0x1c0ef3=_0x398902[_0x5ca07f(0x1f5)],_0x376e53=_0x200c8b%0x10*_0x126982,_0x37c8fc=_0x2e4d20[_0x5ca07f(0x2c6)](_0x3a19a1/0x10)*_0x1c0ef3,_0x4db7cf=_0x32c31e['min'](this[_0x5ca07f(0x308)]()),_0x81a29a=_0x4df7ba[_0x5ca07f(0x456)](this[_0x5ca07f(0x308)]());this[_0x5ca07f(0x26e)][_0x5ca07f(0x4ac)](_0x157b8c,_0x376e53,_0x37c8fc,_0x126982,_0x1c0ef3,_0x10f08e,_0x1340dc,_0x4db7cf,_0x81a29a);}}$gameTemp[_0x5ca07f(0x444)](this);for(;;){if('LrION'===_0x5ca07f(0x1fd)){if(_0x2778ec[_0x5ca07f(0x5ba)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x64c90a[_0x5ca07f(0x5ba)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];}else{if(this[_0x5ca07f(0x59c)][_0x5ca07f(0x1e6)][_0x5ca07f(0x5ba)](/\\V\[(\d+)\]/gi))_0x5ca07f(0x3e5)===_0x5ca07f(0x3e5)?this[_0x5ca07f(0x59c)][_0x5ca07f(0x1e6)]=this['_labelWindow'][_0x5ca07f(0x1e6)][_0x5ca07f(0x24e)](/\\V\[(\d+)\]/gi,(_0x2599e6,_0xc15daa)=>$gameVariables[_0x5ca07f(0x4ba)](parseInt(_0xc15daa))):this['executeMoveDir8'](_0x371b54);else{if(_0x5ca07f(0x17e)==='DBSCs')return _0x438dd3[_0x5ca07f(0x175)](this)?_0x3ba0ce[_0x5ca07f(0x29b)][_0x5ca07f(0x175)][_0x5ca07f(0x176)](this):{'iconIndex':0x0,'bufferX':_0x1bbdb7['Icon']['BufferX'],'bufferY':_0x225f49[_0x5ca07f(0x417)][_0x5ca07f(0x317)],'blendMode':_0x2eff29[_0x5ca07f(0x417)][_0x5ca07f(0x215)]};else break;}}}$gameTemp[_0x5ca07f(0x3f2)]();if(_0xaf8a75[_0x5ca07f(0x5ba)](/<LABEL RANGE:[ ](\d+)>/i)){if('VbQcA'!==_0x5ca07f(0x2b3))this[_0x5ca07f(0x59c)]['visibleRange']=Number(RegExp['$1']);else{if(this['_SavedEventLocations']===_0x539f61)this[_0x5ca07f(0x4e7)]();const _0x1d0b58=_0x5ca07f(0x392)['format'](_0x493789,_0x53727b);this['_SavedEventLocations'][_0x1d0b58]={'direction':_0x286ee6,'x':_0x54e928[_0x5ca07f(0x181)](_0x27199c),'y':_0xc15c0e['round'](_0x5aa80c),'pageIndex':_0x1492c5,'moveRouteIndex':_0x47e11e};}}_0xaf8a75[_0x5ca07f(0x5ba)](/<MIRROR SPRITE>/i)&&(this['_mirrorSprite']=!![]);if(_0xaf8a75[_0x5ca07f(0x5ba)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x1da50d=JSON[_0x5ca07f(0x2ab)]('['+RegExp['$1'][_0x5ca07f(0x5ba)](/\d+/g)+']');this[_0x5ca07f(0x2be)]=this[_0x5ca07f(0x2be)]['concat'](_0x1da50d),this[_0x5ca07f(0x2be)][_0x5ca07f(0x46f)](0x0);}if(_0xaf8a75[_0x5ca07f(0x5ba)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){const _0x2e9d5f=String(RegExp['$1']);if(_0x2e9d5f[_0x5ca07f(0x5ba)](/PLAYER/i))this[_0x5ca07f(0x316)]['target']=0x0;else{if(_0x2e9d5f[_0x5ca07f(0x5ba)](/EVENT[ ](\d+)/i)){if(_0x5ca07f(0x435)!==_0x5ca07f(0x35d))this['_moveSynch'][_0x5ca07f(0x254)]=Number(RegExp['$1']);else return this['processMoveRouteJumpTo'](_0x471058(_0xf6a2ab['$1']),_0x9757ec(_0x4e1a27['$2']));}}}if(_0xaf8a75[_0x5ca07f(0x5ba)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)){if('OXpsu'!==_0x5ca07f(0x53f))this[_0x5ca07f(0x316)][_0x5ca07f(0x468)]=String(RegExp['$1'])[_0x5ca07f(0x49b)]()[_0x5ca07f(0x423)]();else{if(_0x5b7223[_0x5ca07f(0x61f)]())_0x538d80[_0x5ca07f(0x358)](_0x28954b);}}_0xaf8a75['match'](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(_0x5ca07f(0x32b)==='Nibal'?this[_0x5ca07f(0x316)]['delay']=Number(RegExp['$1']):this['_diagonalSupport']=![]);_0xaf8a75[_0x5ca07f(0x5ba)](/<MOVE SYNCH DISTANCE OPACITY:[ ](.*?)>/i)&&(this[_0x5ca07f(0x316)][_0x5ca07f(0x1b0)]=Number(RegExp['$1']));if(_0xaf8a75[_0x5ca07f(0x5ba)](/<TRUE RANDOM MOVE>/i))this[_0x5ca07f(0x55a)]=0x0;else _0xaf8a75[_0x5ca07f(0x5ba)](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x5ca07f(0x55a)]=Number(RegExp['$1'])||0x0);if(_0xaf8a75[_0x5ca07f(0x5ba)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if('pPRaO'==='HVyUe')return this['turnTowardCharacter'](_0x55d745);else this['_saveEventLocation']=!![];}_0xaf8a75['match'](/<HIDE SHADOW>/i)&&(this[_0x5ca07f(0x5c1)][_0x5ca07f(0x4bb)]=![]);_0xaf8a75[_0x5ca07f(0x5ba)](/<SHADOW FILENAME:[ ](.*?)>/i)&&('Zvjad'!==_0x5ca07f(0x639)?this[_0x5ca07f(0x5c1)]['filename']=String(RegExp['$1']):_0x39167f[_0x5ca07f(0x3d8)]['Game_Switches_setValue'][_0x5ca07f(0x176)](this,_0x35cbf9,_0x2542a1));_0xaf8a75['match'](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x5ca07f(0x3f0)==='RLAoZ'?this[_0x5ca07f(0x59c)][_0x5ca07f(0x1e6)]=_0x43af0b(_0x41e060['$1'])[_0x5ca07f(0x423)]():this[_0x5ca07f(0x512)]=Number(RegExp['$1']));if(_0xaf8a75[_0x5ca07f(0x5ba)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)){if(_0x5ca07f(0x187)===_0x5ca07f(0x542)){this[_0x5ca07f(0x4db)]=!![];return;}else this[_0x5ca07f(0x523)]=Number(RegExp['$1']);}_0xaf8a75['match'](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x5ca07f(0x512)]=Number(RegExp['$1']),this[_0x5ca07f(0x523)]=Number(RegExp['$2'])),_0xaf8a75[_0x5ca07f(0x5ba)](/<STEP PATTERN:[ ](.*)>/i)&&(this[_0x5ca07f(0x17c)]=String(RegExp['$1'])[_0x5ca07f(0x5db)]()[_0x5ca07f(0x423)]());},Game_Event['prototype'][_0x116828(0x2dc)]=function(){const _0x1b56e3=_0x116828;this[_0x1b56e3(0x355)]();},Game_Event[_0x116828(0x29b)][_0x116828(0x5dd)]=function(){const _0x4acabe=_0x116828;if(this[_0x4acabe(0x4c9)])return!![];return Game_Character[_0x4acabe(0x29b)][_0x4acabe(0x5dd)][_0x4acabe(0x176)](this);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x446)]=Game_Event[_0x116828(0x29b)][_0x116828(0x62b)],Game_Event[_0x116828(0x29b)][_0x116828(0x62b)]=function(){const _0x2adf43=_0x116828;if(this[_0x2adf43(0x194)]())return;VisuMZ[_0x2adf43(0x3d8)][_0x2adf43(0x446)][_0x2adf43(0x176)](this),this[_0x2adf43(0x450)]()&&VisuMZ[_0x2adf43(0x24c)](this[_0x2adf43(0x36e)]);},Game_Event[_0x116828(0x29b)]['isPreventSelfMovement']=function(){const _0x5a09b6=_0x116828,_0x194b24=VisuMZ[_0x5a09b6(0x3d8)]['Settings'][_0x5a09b6(0x534)];if($gameMap['isEventRunning']()&&_0x194b24[_0x5a09b6(0x3e3)])return!![];if($gameMessage['isBusy']()&&_0x194b24[_0x5a09b6(0x5ad)])return!![];if(!$gameSystem[_0x5a09b6(0x43a)]())return!![];if(this[_0x5a09b6(0x433)]()>=0x0)return!![];return![];},Game_Event[_0x116828(0x29b)][_0x116828(0x355)]=function(){const _0x37c4e0=_0x116828,_0x28135b=SceneManager[_0x37c4e0(0x185)][_0x37c4e0(0x483)];if(_0x28135b){const _0x571c2c=_0x28135b[_0x37c4e0(0x295)](this);_0x571c2c&&_0x571c2c[_0x37c4e0(0x616)]&&_0x571c2c['_shadowSprite'][_0x37c4e0(0x60e)]!==this[_0x37c4e0(0x1c1)]()&&(_0x571c2c[_0x37c4e0(0x616)][_0x37c4e0(0x60e)]=this[_0x37c4e0(0x1c1)](),_0x571c2c[_0x37c4e0(0x616)][_0x37c4e0(0x1e4)]=ImageManager[_0x37c4e0(0x5af)](_0x571c2c['_shadowSprite'][_0x37c4e0(0x60e)]));}},Game_Event[_0x116828(0x29b)][_0x116828(0x1c1)]=function(){const _0xff7043=_0x116828;return this[_0xff7043(0x5c1)][_0xff7043(0x614)];},Game_Event[_0x116828(0x29b)][_0x116828(0x1c0)]=function(){const _0x47837f=_0x116828;if(!this[_0x47837f(0x5c1)]['visible'])return![];return Game_CharacterBase[_0x47837f(0x29b)][_0x47837f(0x1c0)][_0x47837f(0x176)](this);},Game_Event[_0x116828(0x29b)][_0x116828(0x20d)]=function(){const _0x3f0ee0=_0x116828;return this[_0x3f0ee0(0x59c)][_0x3f0ee0(0x1e6)];},Game_Event[_0x116828(0x29b)][_0x116828(0x1a2)]=function(){return this['_labelWindow']['visibleRange'];},Game_Event[_0x116828(0x29b)]['isMapPassable']=function(_0x3bea36,_0x408de8,_0x192ef6){const _0x263a9d=_0x116828;if(this[_0x263a9d(0x1e2)]())return this['isMoveOnlyRegionPassable'](_0x3bea36,_0x408de8,_0x192ef6);if($gameMap['isRegionAllowPass'](_0x3bea36,_0x408de8,_0x192ef6,'event'))return!![];if($gameMap[_0x263a9d(0x445)](_0x3bea36,_0x408de8,_0x192ef6,_0x263a9d(0x41a)))return![];return Game_Character[_0x263a9d(0x29b)]['isMapPassable'][_0x263a9d(0x176)](this,_0x3bea36,_0x408de8,_0x192ef6);},Game_Event['prototype'][_0x116828(0x1e2)]=function(){const _0x3149e7=_0x116828;if(this['_moveOnlyRegions']===undefined)this[_0x3149e7(0x566)]();return this[_0x3149e7(0x2be)][_0x3149e7(0x198)]>0x0;},Game_Event[_0x116828(0x29b)][_0x116828(0x28e)]=function(_0xbafa71,_0x1c86a4,_0x42aaa0){const _0x1a41b2=_0x116828,_0x209fe1=$gameMap[_0x1a41b2(0x1d6)](_0xbafa71,_0x42aaa0),_0x1ba690=$gameMap[_0x1a41b2(0x1c5)](_0x1c86a4,_0x42aaa0),_0x3935a9=$gameMap['regionId'](_0x209fe1,_0x1ba690);return this[_0x1a41b2(0x2be)][_0x1a41b2(0x635)](_0x3935a9);},VisuMZ[_0x116828(0x3d8)]['Game_Event_findProperPageIndex']=Game_Event[_0x116828(0x29b)][_0x116828(0x640)],Game_Event['prototype']['findProperPageIndex']=function(){const _0x3099ed=_0x116828;return this[_0x3099ed(0x422)]=![],this['_CPCs']=![],this[_0x3099ed(0x41a)]()?VisuMZ[_0x3099ed(0x3d8)][_0x3099ed(0x5e9)][_0x3099ed(0x176)](this):-0x1;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x230)]=Game_Event[_0x116828(0x29b)][_0x116828(0x19e)],Game_Event[_0x116828(0x29b)][_0x116828(0x19e)]=function(_0x18694a){const _0x3ac047=_0x116828;this['checkAdvancedSwitchVariablePresent'](_0x18694a),$gameTemp[_0x3ac047(0x444)](this);const _0x504dcc=VisuMZ['EventsMoveCore']['Game_Event_meetsConditions'][_0x3ac047(0x176)](this,_0x18694a);return $gameTemp[_0x3ac047(0x3f2)](),_0x504dcc;},Game_Event[_0x116828(0x29b)][_0x116828(0x530)]=function(){const _0x5b9ec0=_0x116828;return this[_0x5b9ec0(0x422)];},Game_Event['prototype'][_0x116828(0x5e8)]=function(_0x51f0d4){const _0x578455=_0x116828,_0x481dd6=_0x51f0d4['conditions'];if(_0x481dd6[_0x578455(0x3c2)]&&DataManager['isAdvancedSwitch'](_0x481dd6[_0x578455(0x556)]))this[_0x578455(0x422)]=!![];else{if(_0x481dd6[_0x578455(0x251)]&&DataManager[_0x578455(0x1bd)](_0x481dd6[_0x578455(0x2ba)]))'uCByk'===_0x578455(0x219)?this[_0x578455(0x422)]=!![]:(this[_0x578455(0x3b8)]=this['_frames']||0x0,this[_0x578455(0x3b8)]=_0x8d11e9,this['_working']=!![],this[_0x578455(0x3b8)]=_0x3495b8[_0x578455(0x37e)](0x1,this[_0x578455(0x3b8)]));else _0x481dd6[_0x578455(0x1f9)]&&DataManager[_0x578455(0x195)](_0x481dd6[_0x578455(0x30f)])&&(this[_0x578455(0x422)]=!![]);}},Game_Event[_0x116828(0x29b)][_0x116828(0x158)]=function(){const _0x21fd5e=_0x116828;if(this[_0x21fd5e(0x391)])return![];return this[_0x21fd5e(0x4ed)];},Game_Event['prototype']['onClickTrigger']=function(){$gameTemp['clearDestination'](),this['start']();},Game_Event[_0x116828(0x29b)][_0x116828(0x5ab)]=function(_0x35bcf4,_0x5eeff1){const _0x26c83b=_0x116828;return this[_0x26c83b(0x455)]?this[_0x26c83b(0x377)](_0x35bcf4,_0x5eeff1):Game_Character[_0x26c83b(0x29b)][_0x26c83b(0x5ab)][_0x26c83b(0x176)](this,_0x35bcf4,_0x5eeff1);},Game_Event[_0x116828(0x29b)]['posEventsMoveCore']=function(_0x124f44,_0x239fe9){const _0x342dfe=_0x116828;var _0x24716e=this['x']-this[_0x342dfe(0x455)][_0x342dfe(0x2aa)],_0x53dc6d=this['x']+this[_0x342dfe(0x455)]['right'],_0x5b14cc=this['y']-this[_0x342dfe(0x455)]['up'],_0x90b3be=this['y']+this['_addedHitbox'][_0x342dfe(0x3e6)];return _0x24716e<=_0x124f44&&_0x124f44<=_0x53dc6d&&_0x5b14cc<=_0x239fe9&&_0x239fe9<=_0x90b3be;},Game_Event[_0x116828(0x29b)]['canPass']=function(_0x28c4a0,_0xee0f5d,_0x552b4e){const _0x2f63ba=_0x116828;for(let _0x2e291a=-this[_0x2f63ba(0x455)][_0x2f63ba(0x2aa)];_0x2e291a<=this[_0x2f63ba(0x455)][_0x2f63ba(0x4d6)];_0x2e291a++){for(let _0x5c0f6a=-this[_0x2f63ba(0x455)]['up'];_0x5c0f6a<=this[_0x2f63ba(0x455)]['down'];_0x5c0f6a++){if(_0x2f63ba(0x45f)!==_0x2f63ba(0x1fc)){if(!Game_Character[_0x2f63ba(0x29b)][_0x2f63ba(0x1ec)]['call'](this,_0x28c4a0+_0x2e291a,_0xee0f5d+_0x5c0f6a,_0x552b4e))return _0x2f63ba(0x64b)===_0x2f63ba(0x64b)?![]:!![];}else this[_0x2f63ba(0x3d0)]();}}return!![];},Game_Event['prototype']['isCollidedWithEvents']=function(_0x2c5c76,_0x5739be){const _0xb0bc32=_0x116828;if(Imported['VisuMZ_0_CoreEngine']&&this['isSmartEventCollisionOn']())return _0xb0bc32(0x62e)===_0xb0bc32(0x62e)?this[_0xb0bc32(0x493)](_0x2c5c76,_0x5739be):_0xc0218c[_0xb0bc32(0x3d8)][_0xb0bc32(0x5b3)]['call'](this,_0x3d6caa);else{if(_0xb0bc32(0x365)!==_0xb0bc32(0x429)){const _0x92bc67=$gameMap['eventsXyNt'](_0x2c5c76,_0x5739be)['filter'](_0x317932=>_0x317932!==this);return _0x92bc67[_0xb0bc32(0x198)]>0x0;}else return 0x0;}},Game_Event[_0x116828(0x29b)][_0x116828(0x493)]=function(_0x2eac25,_0x146ca7){const _0x568cf3=_0x116828;if(!this[_0x568cf3(0x1ae)]()){if(_0x568cf3(0x179)==='aKoPj'){if(this[_0x568cf3(0x398)])return this[_0x568cf3(0x398)];const _0x573eef=_0x237141[_0x568cf3(0x3d8)][_0x568cf3(0x2f9)][_0x568cf3(0x176)](this),_0x2e4a91=_0x573eef[_0x568cf3(0x44b)](this[_0x568cf3(0x20e)]||[]);return this[_0x568cf3(0x398)]=_0x2e4a91['filter'](_0x28602e=>!!_0x28602e),this['_eventCache'];}else return![];}else{const _0x9bd9ae=$gameMap[_0x568cf3(0x62f)](_0x2eac25,_0x146ca7)[_0x568cf3(0x608)](_0x1141f2=>_0x1141f2!==this&&_0x1141f2['isNormalPriority']());return _0x9bd9ae[_0x568cf3(0x198)]>0x0;}},Game_Event[_0x116828(0x29b)]['activationProximityType']=function(){const _0x43e3ae=_0x116828;return this[_0x43e3ae(0x326)][_0x43e3ae(0x468)]||_0x43e3ae(0x575);},Game_Event[_0x116828(0x29b)][_0x116828(0x277)]=function(){const _0x1a086b=_0x116828;return this['_activationProximity'][_0x1a086b(0x27f)]||0x0;},Game_Event[_0x116828(0x29b)][_0x116828(0x63f)]=function(){const _0x47c0c8=_0x116828;return this[_0x47c0c8(0x326)][_0x47c0c8(0x2c8)]||[];},Game_Event[_0x116828(0x29b)][_0x116828(0x1db)]=function(){const _0x2d05d8=_0x116828;Game_Character[_0x2d05d8(0x29b)]['increaseSteps'][_0x2d05d8(0x176)](this);if(['none',_0x2d05d8(0x438)][_0x2d05d8(0x635)](this[_0x2d05d8(0x495)]()))return;$gamePlayer[_0x2d05d8(0x478)]([0x2]);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x486)]=Game_Event[_0x116828(0x29b)][_0x116828(0x5c0)],Game_Event['prototype']['checkEventTriggerAuto']=function(){const _0x1eee76=_0x116828;if(this[_0x1eee76(0x193)]!==0x3)return;if(this[_0x1eee76(0x330)])return;if(!this[_0x1eee76(0x36c)](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ['EventsMoveCore'][_0x1eee76(0x486)][_0x1eee76(0x176)](this);},VisuMZ['EventsMoveCore'][_0x116828(0x648)]=Game_Event[_0x116828(0x29b)][_0x116828(0x260)],Game_Event[_0x116828(0x29b)][_0x116828(0x260)]=function(){const _0x4ed411=_0x116828;if(!this[_0x4ed411(0x22a)])return;if(!this[_0x4ed411(0x36c)](!![]))return;if(!this[_0x4ed411(0x217)](!![]))return;VisuMZ[_0x4ed411(0x3d8)][_0x4ed411(0x648)]['call'](this);},Game_Event[_0x116828(0x29b)][_0x116828(0x36c)]=function(_0x115c02){const _0x42bd39=_0x116828;if(!_0x115c02&&$gameMap['isEventRunning']())return![];if(!_0x115c02&&$gameMap[_0x42bd39(0x5f9)]())return![];if(this[_0x42bd39(0x63f)]()<=0x0)return!![];return $gamePlayer[_0x42bd39(0x300)](this);},Game_Event['prototype']['checkActivationProximity']=function(_0x16b23f){const _0x254b97=_0x116828;if(!_0x16b23f&&$gameMap[_0x254b97(0x3db)]())return![];if(!_0x16b23f&&$gameMap[_0x254b97(0x5f9)]())return![];if([_0x254b97(0x575),_0x254b97(0x438)][_0x254b97(0x635)](this['activationProximityType']()))return!![];return $gamePlayer[_0x254b97(0x31b)](this);},VisuMZ['MoveAllSynchTargets']=function(_0x1d6b65){const _0xadcb2f=_0x116828;for(const _0x109b2a of $gameMap['events']()){if(_0xadcb2f(0x23f)===_0xadcb2f(0x23f)){if(!_0x109b2a)continue;_0x109b2a[_0xadcb2f(0x433)]()===_0x1d6b65&&_0x109b2a[_0xadcb2f(0x357)]();}else return this[_0xadcb2f(0x363)]===_0x407e53&&this['setupPlayerVisibilityOverrides'](),this[_0xadcb2f(0x363)];}},VisuMZ[_0x116828(0x48a)]=function(_0x4c64be){if(_0x4c64be===0x0)return $gamePlayer;return $gameMap['event'](_0x4c64be);},Game_Event[_0x116828(0x29b)][_0x116828(0x433)]=function(){const _0xf1ec36=_0x116828;return this['_moveSynch'][_0xf1ec36(0x254)];},Game_Event[_0x116828(0x29b)][_0x116828(0x51d)]=function(){const _0x5bbd2e=_0x116828;return this[_0x5bbd2e(0x316)][_0x5bbd2e(0x468)];},Game_Event['prototype']['realMoveSpeed']=function(){const _0x17029d=_0x116828;if(this[_0x17029d(0x433)]()>=0x0){if(_0x17029d(0x544)!==_0x17029d(0x5e5)){const _0x30dc11=VisuMZ['GetMoveSynchTarget'](this[_0x17029d(0x433)]());if(_0x30dc11)return _0x30dc11['realMoveSpeed']();}else return this[_0x17029d(0x3ca)](_0xe06521);}return Game_Character[_0x17029d(0x29b)]['realMoveSpeed'][_0x17029d(0x176)](this);},Game_Event[_0x116828(0x29b)][_0x116828(0x357)]=function(){const _0x40c21d=_0x116828;this['_moveSynch']['timer']=this[_0x40c21d(0x316)][_0x40c21d(0x314)]||0x0,this[_0x40c21d(0x316)][_0x40c21d(0x314)]--;if(this[_0x40c21d(0x316)][_0x40c21d(0x314)]>0x0)return;this[_0x40c21d(0x316)][_0x40c21d(0x314)]=this[_0x40c21d(0x316)][_0x40c21d(0x3d1)],this['processMoveSynch']();},Game_Event[_0x116828(0x29b)][_0x116828(0x54c)]=function(_0x52caff){const _0xbcaaa2=_0x116828;if(this[_0xbcaaa2(0x433)]()>=0x0){const _0x413c35=VisuMZ['GetMoveSynchTarget'](this[_0xbcaaa2(0x433)]());if(_0x413c35){const _0x41caea=$gameMap[_0xbcaaa2(0x27f)](this['_realX'],this[_0xbcaaa2(0x285)],_0x413c35[_0xbcaaa2(0x5b7)],_0x413c35['_realY'])-0x1,_0x354d1c=Math['min']($gameMap[_0xbcaaa2(0x283)](),$gameMap[_0xbcaaa2(0x1f4)]()),_0x356fdb=this['_moveSynch']['opacityDelta']||0x0;_0x52caff-=Math['max'](0x0,_0x41caea)*_0x354d1c*_0x356fdb;}}return _0x52caff;},Game_Event['prototype']['processMoveSynch']=function(){const _0x1abc4d=_0x116828;switch(this[_0x1abc4d(0x51d)]()){case'random':this[_0x1abc4d(0x548)]();break;case _0x1abc4d(0x4a8):this[_0x1abc4d(0x16f)]();break;case _0x1abc4d(0x52a):this[_0x1abc4d(0x3a4)]();break;case _0x1abc4d(0x48c):this[_0x1abc4d(0x2cf)]();break;case'mimic':case _0x1abc4d(0x2da):this['processMoveSynchMimic']();break;case'reverse\x20mimic':case'reverse\x20copy':this[_0x1abc4d(0x22f)]();break;case _0x1abc4d(0x521):case _0x1abc4d(0x5a8):case _0x1abc4d(0x2d1):case _0x1abc4d(0x155):this[_0x1abc4d(0x192)]();break;case _0x1abc4d(0x24b):case _0x1abc4d(0x3f6):case'mirror\x20vert':case _0x1abc4d(0x189):this['processMoveSynchMirrorVert']();break;default:this['processMoveSynchRandom']();break;}this[_0x1abc4d(0x252)]();},Game_Event[_0x116828(0x29b)][_0x116828(0x548)]=function(){const _0x13106d=_0x116828,_0x5ae8ea=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x5ae8ea[_0x13106d(0x346)](0x1,0x3,0x7,0x9);const _0x2da456=[];for(const _0x421cb6 of _0x5ae8ea){if(_0x13106d(0x576)!=='NmLdC'){if(this[_0x13106d(0x1ec)](this['x'],this['y'],_0x421cb6))_0x2da456[_0x13106d(0x346)](_0x421cb6);}else _0x56b2fa['EventsMoveCore']['Game_Character_processMoveCommand'][_0x13106d(0x176)](this,_0x3de40f);}if(_0x2da456[_0x13106d(0x198)]>0x0){if(_0x13106d(0x22d)!==_0x13106d(0x4f8)){const _0x258197=_0x2da456[Math['randomInt'](_0x2da456['length'])];this[_0x13106d(0x332)](_0x258197);}else return this[_0x13106d(0x3cf)](_0x1ceeca);}},Game_Event[_0x116828(0x29b)][_0x116828(0x16f)]=function(){const _0xd91634=_0x116828,_0x5b0572=VisuMZ[_0xd91634(0x48a)](this[_0xd91634(0x433)]());this['moveTowardCharacter'](_0x5b0572);},Game_Event[_0x116828(0x29b)][_0x116828(0x3a4)]=function(){const _0x19dca5=_0x116828,_0x174ca9=VisuMZ[_0x19dca5(0x48a)](this['moveSynchTarget']());this[_0x19dca5(0x541)](_0x174ca9);},Game_Event[_0x116828(0x29b)][_0x116828(0x2cf)]=function(){const _0x1e08ad=_0x116828;this[_0x1e08ad(0x57c)]();},Game_Event[_0x116828(0x29b)][_0x116828(0x272)]=function(){const _0x3982a3=_0x116828,_0x283f2e=VisuMZ[_0x3982a3(0x48a)](this[_0x3982a3(0x433)]());this[_0x3982a3(0x332)](_0x283f2e['lastMovedDirection']());},Game_Event[_0x116828(0x29b)][_0x116828(0x22f)]=function(){const _0x27a3a2=_0x116828,_0x194b92=VisuMZ[_0x27a3a2(0x48a)](this[_0x27a3a2(0x433)]());this[_0x27a3a2(0x332)](this['reverseDir'](_0x194b92['lastMovedDirection']()));},Game_Event[_0x116828(0x29b)][_0x116828(0x192)]=function(){const _0x204ab2=_0x116828,_0x5ad7e7=VisuMZ['GetMoveSynchTarget'](this['moveSynchTarget']()),_0x14d3ed=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x5ad7e7[_0x204ab2(0x57a)]()];this[_0x204ab2(0x332)](_0x14d3ed);},Game_Event[_0x116828(0x29b)][_0x116828(0x4a9)]=function(){const _0x433aae=_0x116828,_0x480b07=VisuMZ[_0x433aae(0x48a)](this[_0x433aae(0x433)]()),_0x3dbff4=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x480b07[_0x433aae(0x57a)]()];this[_0x433aae(0x332)](_0x3dbff4);},Game_Event['prototype'][_0x116828(0x636)]=function(){const _0x29e3bb=_0x116828,_0x3fa1d=$gameSystem['getSavedEventLocation'](this);if(!_0x3fa1d)return;this[_0x29e3bb(0x3ac)](_0x3fa1d['x'],_0x3fa1d['y']),this[_0x29e3bb(0x393)](_0x3fa1d[_0x29e3bb(0x592)]),this['_pageIndex']===_0x3fa1d[_0x29e3bb(0x21b)]&&(this[_0x29e3bb(0x631)]=_0x3fa1d['moveRouteIndex']);},Game_Event[_0x116828(0x29b)][_0x116828(0x35f)]=function(){const _0x4ff8d7=_0x116828;Game_Character['prototype'][_0x4ff8d7(0x35f)][_0x4ff8d7(0x176)](this),this[_0x4ff8d7(0x4c3)]();},Game_Event['prototype']['isSaveEventLocation']=function(){const _0xb3f4c8=_0x116828;if($gameMap[_0xb3f4c8(0x558)]())return!![];return this[_0xb3f4c8(0x5f1)];},Game_Event['prototype']['autosaveEventLocation']=function(){const _0x3327c7=_0x116828;if(!this[_0x3327c7(0x5cc)]())return;this[_0x3327c7(0x482)]();},Game_Event[_0x116828(0x29b)][_0x116828(0x482)]=function(){$gameSystem['saveEventLocation'](this);},Game_Event[_0x116828(0x29b)][_0x116828(0x5b2)]=function(){const _0x358b0d=_0x116828;$gameSystem[_0x358b0d(0x4b1)](this);},Game_Event[_0x116828(0x29b)][_0x116828(0x175)]=function(){const _0x525e6a=_0x116828;return $gameSystem['getEventIconData'](this)?Game_Character[_0x525e6a(0x29b)][_0x525e6a(0x175)][_0x525e6a(0x176)](this):{'iconIndex':0x0,'bufferX':settings[_0x525e6a(0x417)][_0x525e6a(0x2b2)],'bufferY':settings[_0x525e6a(0x417)][_0x525e6a(0x317)],'blendMode':settings['Icon'][_0x525e6a(0x215)]};},Game_Event['prototype'][_0x116828(0x4d4)]=function(){const _0x46a299=_0x116828;return this[_0x46a299(0x3bb)];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x212)]=Game_Event[_0x116828(0x29b)][_0x116828(0x19e)],Game_Event['prototype'][_0x116828(0x19e)]=function(_0x97202d){const _0x210293=_0x116828,_0x515cc2=VisuMZ[_0x210293(0x3d8)][_0x210293(0x212)][_0x210293(0x176)](this,_0x97202d);if(!_0x515cc2)return![];return this[_0x210293(0x1d4)](_0x97202d);},Game_Event['prototype'][_0x116828(0x1d4)]=function(_0x1a42a2){const _0x5bb472=_0x116828;VisuMZ['EventsMoveCore'][_0x5bb472(0x2d9)][_0x5bb472(0x609)](_0x1a42a2),this[_0x5bb472(0x3bb)]=_0x1a42a2['CPC'][_0x5bb472(0x198)]>0x0;if(_0x1a42a2[_0x5bb472(0x57e)]===undefined){if(_0x5bb472(0x1a1)!==_0x5bb472(0x1a1)){if([0x6c,0x198][_0x5bb472(0x635)](_0x6e800b['code'])){if(_0x1585ba!=='')_0x4fd0e3+='\x0a';_0x44b4d6+=_0x166bab[_0x5bb472(0x167)][0x0];}}else VisuMZ[_0x5bb472(0x3d8)][_0x5bb472(0x2d9)][_0x5bb472(0x609)](_0x1a42a2);}if(_0x1a42a2[_0x5bb472(0x57e)][_0x5bb472(0x198)]>0x0)return $gameMap['event'](this[_0x5bb472(0x36e)])&&VisuMZ['EventsMoveCore'][_0x5bb472(0x2d9)][_0x5bb472(0x64e)](_0x1a42a2[_0x5bb472(0x57e)],this[_0x5bb472(0x36e)]);return!![];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x626)]=Game_Troop[_0x116828(0x29b)]['meetsConditions'],Game_Troop[_0x116828(0x29b)][_0x116828(0x19e)]=function(_0x43c8f7){const _0x1e1c2d=_0x116828;var _0x7a6b0b=VisuMZ['EventsMoveCore'][_0x1e1c2d(0x626)]['call'](this,_0x43c8f7);return _0x7a6b0b&&this[_0x1e1c2d(0x1e5)](_0x43c8f7);},Game_Troop[_0x116828(0x29b)]['CPCsMet']=function(_0x5473d1){const _0x51ce36=_0x116828;_0x5473d1[_0x51ce36(0x57e)]===undefined&&VisuMZ[_0x51ce36(0x3d8)][_0x51ce36(0x2d9)][_0x51ce36(0x609)](_0x5473d1);if(_0x5473d1[_0x51ce36(0x57e)][_0x51ce36(0x198)]>0x0){if(_0x51ce36(0x56a)!=='WIjeI')return VisuMZ[_0x51ce36(0x3d8)]['CustomPageConditions']['metCPC'](_0x5473d1[_0x51ce36(0x57e)],0x0);else{if(!this[_0x51ce36(0x3ba)](_0x5b570b))return;let _0x4ba5c5;const _0x44194e=_0x5cba6d[_0x51ce36(0x3d8)][_0x51ce36(0x256)][_0x51ce36(0x258)]['SpriteBased']??!![];_0x4ba5c5=_0x44194e?new _0x114d54(_0x2f6995):new _0x4c28e3(_0x13d92d),_0x4ba5c5['z']=0x8,_0x4ba5c5[_0x51ce36(0x1c2)]=_0x319fb6['_counter']++,this[_0x51ce36(0x527)][_0x51ce36(0x381)](_0x4ba5c5),this['_labelWindows'][_0x51ce36(0x346)](_0x4ba5c5);}}return!![];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x5cd)]=Game_Event[_0x116828(0x29b)][_0x116828(0x3ac)],Game_Event[_0x116828(0x29b)][_0x116828(0x3ac)]=function(_0x285512,_0x185660){const _0x2cbd72=_0x116828;VisuMZ[_0x2cbd72(0x3d8)][_0x2cbd72(0x5cd)]['call'](this,_0x285512,_0x185660),this[_0x2cbd72(0x28f)]=_0x285512,this['_randomHomeY']=_0x185660;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x5bd)]=Game_Event['prototype'][_0x116828(0x47a)],Game_Event[_0x116828(0x29b)]['moveTypeRandom']=function(){const _0x564c54=_0x116828,_0x338081=$gameMap[_0x564c54(0x27f)](this['x'],this['y'],this['_randomHomeX'],this[_0x564c54(0x1d8)]),_0xdbec2d=_0x338081*(this[_0x564c54(0x55a)]||0x0);Math[_0x564c54(0x597)]()>=_0xdbec2d?VisuMZ['EventsMoveCore']['Game_Event_moveTypeRandom'][_0x564c54(0x176)](this):this[_0x564c54(0x4af)]();},Game_Event[_0x116828(0x29b)][_0x116828(0x4af)]=function(){const _0x19e839=_0x116828,_0x167163=this[_0x19e839(0x5d0)](this[_0x19e839(0x28f)]),_0x3a7c2f=this[_0x19e839(0x364)](this[_0x19e839(0x1d8)]);if(Math[_0x19e839(0x291)](_0x167163)>Math[_0x19e839(0x291)](_0x3a7c2f)){if(_0x19e839(0x507)==='OLvZq'){this[_0x19e839(0x563)](_0x167163>0x0?0x4:0x6);if(!this[_0x19e839(0x64c)]()&&_0x3a7c2f!==0x0){if(_0x19e839(0x232)!==_0x19e839(0x2ac))this['moveStraight'](_0x3a7c2f>0x0?0x8:0x2);else return this[_0x19e839(0x15c)](0x6,_0x5f580b(_0x5849a8['$1']));}}else{_0x869b31[_0x19e839(0x3d8)]['Game_Player_checkEventTriggerHere'][_0x19e839(0x176)](this,_0x4d15af);if(this[_0x19e839(0x2c5)]()){this[_0x19e839(0x478)](_0x5df1e0);if(_0x57be10[_0x19e839(0x635)](0x0)&&this[_0x19e839(0x52e)]()===_0x19e839(0x2a9))this['startMapCommonEventOnOK'](this['x'],this['y']);else(_0x34a113['includes'](0x1)||_0x281372[_0x19e839(0x635)](0x2))&&this['startMapCommonEventOnTouch']();}}}else{if(_0x3a7c2f!==0x0){if(_0x19e839(0x4dc)===_0x19e839(0x4dc)){this[_0x19e839(0x563)](_0x3a7c2f>0x0?0x8:0x2);if(!this[_0x19e839(0x64c)]()&&_0x167163!==0x0){if(_0x19e839(0x367)!==_0x19e839(0x367)){if(this[_0x19e839(0x3e7)])return![];return this['_character'][_0x19e839(0x61a)]()&&!this['_character'][_0x19e839(0x1dc)]()&&!this[_0x19e839(0x27b)][_0x19e839(0x51b)]()&&this[_0x19e839(0x361)]()===0x0;}else this[_0x19e839(0x563)](_0x167163>0x0?0x4:0x6);}}else{if(_0x6738ad[_0x19e839(0x5ba)](/Z/i))_0x5cee4d='ZZZ';if(_0x482a1c[_0x19e839(0x5ba)](/SLEEP/i))_0x4dc402=_0x19e839(0x467);this[_0x19e839(0x368)]()&&(this['_pose']=_0x3f4e1e[_0x19e839(0x5db)]()[_0x19e839(0x423)](),this[_0x19e839(0x50a)]=_0x2633aa||_0x5e2531);}}}},VisuMZ[_0x116828(0x3d8)][_0x116828(0x59f)]=Game_Interpreter[_0x116828(0x29b)]['updateWaitMode'],Game_Interpreter[_0x116828(0x29b)][_0x116828(0x5d1)]=function(){const _0x4c9524=_0x116828;if(this['_waitMode']===_0x4c9524(0x1eb)){if(window[this[_0x4c9524(0x2f6)]])_0x4c9524(0x505)===_0x4c9524(0x505)?(this[_0x4c9524(0x4ca)]='',this[_0x4c9524(0x4a1)]()):this[_0x4c9524(0x4f9)]=!![];else{if(_0x4c9524(0x37a)!==_0x4c9524(0x470))return!![];else{_0x1abd7b[_0x4c9524(0x290)](_0x160f0a,_0xd9c5ea);const _0x3d8d50=_0x3caaa4[_0x4c9524(0x415)]();_0x56e8a4[_0x4c9524(0x1f3)]=_0x797e91[_0x4c9524(0x1f3)]||_0x123c9f[_0x4c9524(0x2d7)]();const _0x15e73e=[_0x447f25['MapId'],_0x2feaee['EventId']||_0x3d8d50[_0x4c9524(0x160)](),_0x4e86f4[_0x4c9524(0x1a6)]],_0x6b838=_0x18495c[_0x4c9524(0x61e)],_0x4e6afa=_0x300852[_0x4c9524(0x4ba)](_0x15e73e)||![];_0x263384['setValue'](_0x6b838,_0x4e6afa);}}}else return VisuMZ[_0x4c9524(0x3d8)][_0x4c9524(0x59f)][_0x4c9524(0x176)](this);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x3c5)]=Game_Interpreter[_0x116828(0x29b)]['executeCommand'],Game_Interpreter[_0x116828(0x29b)][_0x116828(0x591)]=function(){const _0x357381=_0x116828,_0x3fb2d1=$gameMap&&this[_0x357381(0x36e)]?$gameMap[_0x357381(0x41a)](this['_eventId']):null;$gameTemp[_0x357381(0x444)](_0x3fb2d1);const _0x177dd6=VisuMZ['EventsMoveCore'][_0x357381(0x3c5)][_0x357381(0x176)](this);return $gameTemp['clearSelfTarget'](),_0x177dd6;},VisuMZ['EventsMoveCore']['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x116828(0x1aa)],Game_Interpreter[_0x116828(0x29b)]['command357']=function(_0x552911){const _0x4e4cc3=_0x116828;return $gameTemp[_0x4e4cc3(0x38e)](this),VisuMZ[_0x4e4cc3(0x3d8)][_0x4e4cc3(0x31a)][_0x4e4cc3(0x176)](this,_0x552911);},Game_Interpreter['prototype'][_0x116828(0x5d8)]=function(_0x129cd7){const _0x26aa87=_0x116828;this[_0x26aa87(0x520)]=_0x129cd7;const _0x13c67d=_0x26aa87(0x3fc)['format'](_0x129cd7[_0x26aa87(0x2d7)]['padZero'](0x3));this[_0x26aa87(0x2f6)]=_0x26aa87(0x41b)+Graphics[_0x26aa87(0x3bf)]+'_'+this[_0x26aa87(0x160)](),DataManager[_0x26aa87(0x583)](this[_0x26aa87(0x2f6)],_0x13c67d),window[this[_0x26aa87(0x2f6)]]?this[_0x26aa87(0x4a1)]():this[_0x26aa87(0x540)](_0x26aa87(0x1eb));},Game_Interpreter[_0x116828(0x29b)][_0x116828(0x4a1)]=function(){const _0x11aaec=_0x116828,_0x52182e=this[_0x11aaec(0x520)],_0x527290=window[this[_0x11aaec(0x2f6)]],_0x4ed4c5=_0x527290[_0x11aaec(0x3f1)][_0x52182e[_0x11aaec(0x160)]];if(_0x4ed4c5&&_0x4ed4c5[_0x11aaec(0x3aa)][_0x52182e['pageId']-0x1]){const _0x3b1bca=_0x4ed4c5[_0x11aaec(0x3aa)][_0x52182e[_0x11aaec(0x2e9)]-0x1]['list'];this['setupChild'](_0x3b1bca,this[_0x11aaec(0x160)]());}window[this[_0x11aaec(0x2f6)]]=undefined,this[_0x11aaec(0x2f6)]=undefined,this['_callEventData']=undefined;};function Game_CPCInterpreter(){this['initialize']['apply'](this,arguments);};Game_CPCInterpreter[_0x116828(0x29b)]=Object[_0x116828(0x3be)](Game_Interpreter['prototype']),Game_CPCInterpreter[_0x116828(0x29b)]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x116828(0x29b)][_0x116828(0x424)]=function(){const _0x3e030f=_0x116828;Game_Interpreter[_0x3e030f(0x29b)][_0x3e030f(0x424)][_0x3e030f(0x176)](this),this['_cpc']=![];},Game_CPCInterpreter['prototype'][_0x116828(0x3d5)]=function(){const _0x54bc0b=_0x116828;while(this[_0x54bc0b(0x553)]()){_0x54bc0b(0x5e4)==='tlnpN'?this['opacity']+=this[_0x54bc0b(0x1b2)]():this[_0x54bc0b(0x591)]();}},Game_CPCInterpreter[_0x116828(0x29b)][_0x116828(0x489)]=function(_0x38fd4e){const _0x269bdb=_0x116828;Game_Interpreter[_0x269bdb(0x29b)][_0x269bdb(0x489)][_0x269bdb(0x176)](this,_0x38fd4e);if(this[_0x269bdb(0x559)]['some'](_0x63648d=>_0x63648d[_0x269bdb(0x5ba)](/<(?:CONDITION|CONDITIONS) MET>/i))){if(_0x269bdb(0x221)!==_0x269bdb(0x3f4))this['_cpc']=!![];else return this[_0x269bdb(0x54b)](_0x2b09e6(_0x4b39cc['$1']),_0x5649f0(_0x19ed4f['$2']));}return!![];},VisuMZ['EventsMoveCore'][_0x116828(0x3b2)]=Scene_Map[_0x116828(0x29b)][_0x116828(0x443)],Scene_Map[_0x116828(0x29b)][_0x116828(0x443)]=function(){const _0x5b76aa=_0x116828;VisuMZ[_0x5b76aa(0x3d8)][_0x5b76aa(0x3b2)][_0x5b76aa(0x176)](this),this[_0x5b76aa(0x483)][_0x5b76aa(0x647)]();},VisuMZ[_0x116828(0x3d8)][_0x116828(0x301)]=Scene_Load[_0x116828(0x29b)][_0x116828(0x46e)],Scene_Load[_0x116828(0x29b)][_0x116828(0x46e)]=function(){const _0x5137b6=_0x116828;if($gameMap)$gameMap[_0x5137b6(0x3cc)]();VisuMZ[_0x5137b6(0x3d8)][_0x5137b6(0x301)][_0x5137b6(0x176)](this);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x5fb)]=Sprite_Character['prototype'][_0x116828(0x4cc)],Sprite_Character[_0x116828(0x29b)]['initMembers']=function(){const _0x39c2ed=_0x116828;VisuMZ[_0x39c2ed(0x3d8)][_0x39c2ed(0x5fb)]['call'](this),this[_0x39c2ed(0x1af)](),this[_0x39c2ed(0x617)]();},Sprite_Character['prototype']['initMembersEventsMoveCore']=function(){const _0x528c7b=_0x116828;this[_0x528c7b(0x5cb)]=0xff;},Sprite_Character[_0x116828(0x29b)][_0x116828(0x617)]=function(){const _0x113f09=_0x116828;this[_0x113f09(0x270)]=new Sprite(),this[_0x113f09(0x270)]['bitmap']=ImageManager[_0x113f09(0x5af)](_0x113f09(0x25a)),this[_0x113f09(0x270)][_0x113f09(0x1e4)]['smooth']=![],this[_0x113f09(0x270)]['setFrame'](0x0,0x0,0x0,0x0),this['_eventIconSprite'][_0x113f09(0x447)]['x']=0.5,this[_0x113f09(0x270)]['anchor']['y']=0x1,this[_0x113f09(0x381)](this[_0x113f09(0x270)]);},Sprite_Character[_0x116828(0x29b)][_0x116828(0x368)]=function(){const _0x55984f=_0x116828;return this[_0x55984f(0x28d)]&&this[_0x55984f(0x28d)][_0x55984f(0x5ba)](/\[VS8\]/i);},Sprite_Character[_0x116828(0x29b)][_0x116828(0x259)]=function(){const _0xa41302=_0x116828;return this['isSpriteVS8dir']()&&VisuMZ[_0xa41302(0x3d8)][_0xa41302(0x256)][_0xa41302(0x29e)]['AutoBuffer'];},VisuMZ['EventsMoveCore']['Sprite_Character_update']=Sprite_Character[_0x116828(0x29b)][_0x116828(0x252)],Sprite_Character[_0x116828(0x29b)][_0x116828(0x252)]=function(){const _0x1a9ab8=_0x116828;VisuMZ[_0x1a9ab8(0x3d8)]['Sprite_Character_update'][_0x1a9ab8(0x176)](this);if(VisuMZ[_0x1a9ab8(0x3d8)][_0x1a9ab8(0x256)][_0x1a9ab8(0x534)]['EnableDashTilt']){if(_0x1a9ab8(0x206)===_0x1a9ab8(0x206))this[_0x1a9ab8(0x159)]();else{const _0x5f3274=_0x2b9b2c[_0x1a9ab8(0x41a)](_0x5a1e6e(_0x198a4a['$1']));return this[_0x1a9ab8(0x3f5)](_0x5f3274);}}if(this[_0x1a9ab8(0x616)]){if('tBBBP'==='tBBBP')this['updateShadow']();else{_0x5e43c8=_0x42c1cb===_0x1a9ab8(0x2d5)?0x5:_0x43aa9a;const _0x21b3b0=this[_0x1a9ab8(0x1d6)](_0x57a6de,_0x1576c0),_0x276783=this[_0x1a9ab8(0x1c5)](_0x437ed3,_0x67f52c),_0x21af17=this['regionId'](_0x21b3b0,_0x276783),_0x5ac5e2=this[_0x1a9ab8(0x250)];if(_0x5ac5e2[_0x1a9ab8(0x29a)]['includes'](_0x21af17))return!![];else{const _0x21dfdf=_0x1a9ab8(0x201)[_0x1a9ab8(0x386)](_0x5c36a9[_0x1a9ab8(0x19c)](0x0)['toUpperCase']()+_0x27d907[_0x1a9ab8(0x4e9)](0x1));if(_0x5ac5e2[_0x21dfdf])return _0x5ac5e2[_0x21dfdf][_0x1a9ab8(0x635)](_0x21af17);}return![];}}if(this[_0x1a9ab8(0x270)]){if(_0x1a9ab8(0x4fc)===_0x1a9ab8(0x58b)){const _0x4ac235=_0x1a2972(_0x502a04['$1'])['toUpperCase']()[_0x1a9ab8(0x423)](),_0x18066f=[_0x1a9ab8(0x526),_0x1a9ab8(0x29d),'MULTIPLY',_0x1a9ab8(0x4bf)];this[_0x1a9ab8(0x580)][_0x1a9ab8(0x38a)]=_0x18066f[_0x1a9ab8(0x4ef)](_0x4ac235)[_0x1a9ab8(0x1fe)](0x0,0x3);}else this['updateEventIconSprite']();}this[_0x1a9ab8(0x399)](),this['updateEventMirrorSprite']();},VisuMZ[_0x116828(0x3d8)][_0x116828(0x39e)]=Sprite_Character[_0x116828(0x29b)][_0x116828(0x528)],Sprite_Character[_0x116828(0x29b)]['setTileBitmap']=function(){const _0x7d9dcd=_0x116828;VisuMZ[_0x7d9dcd(0x3d8)][_0x7d9dcd(0x39e)][_0x7d9dcd(0x176)](this),this['bitmap'][_0x7d9dcd(0x4a6)](this[_0x7d9dcd(0x2b4)]['bind'](this));},VisuMZ[_0x116828(0x3d8)]['Sprite_Character_setCharacterBitmap']=Sprite_Character[_0x116828(0x29b)][_0x116828(0x515)],Sprite_Character[_0x116828(0x29b)][_0x116828(0x515)]=function(){const _0x5b6942=_0x116828;VisuMZ[_0x5b6942(0x3d8)][_0x5b6942(0x585)][_0x5b6942(0x176)](this),this[_0x5b6942(0x1e4)][_0x5b6942(0x4a6)](this[_0x5b6942(0x2b4)][_0x5b6942(0x292)](this));},Sprite_Character[_0x116828(0x29b)][_0x116828(0x2b4)]=function(){const _0xadc0d0=_0x116828;if(!this[_0xadc0d0(0x1e4)])return;this[_0xadc0d0(0x1e4)]['smooth']=!!VisuMZ[_0xadc0d0(0x3d8)][_0xadc0d0(0x256)][_0xadc0d0(0x534)][_0xadc0d0(0x25f)];},VisuMZ['EventsMoveCore'][_0x116828(0x431)]=Sprite_Character[_0x116828(0x29b)][_0x116828(0x503)],Sprite_Character[_0x116828(0x29b)][_0x116828(0x503)]=function(){const _0x677e6a=_0x116828;if(this['isSpriteVS8dir']())return this[_0x677e6a(0x371)]();else{if(_0x677e6a(0x4cb)!==_0x677e6a(0x4cb)){const _0xf305df=_0xd1a8e7[_0x677e6a(0x41a)](_0x4f5f6c['Step1EventId']||_0x576f39[_0x677e6a(0x160)]());if(!_0xf305df)return;_0x29b00f[_0x677e6a(0x4fe)]!=='UNTITLED'?_0xf305df[_0x677e6a(0x4eb)](_0x48b038[_0x677e6a(0x4fe)]):_0xf305df[_0x677e6a(0x4f0)](_0x4116c2[_0x677e6a(0x504)],_0x3565ad['Step2EventId']||_0x1a01d3[_0x677e6a(0x160)]());}else return this[_0x677e6a(0x46c)]();}},Sprite_Character['prototype'][_0x116828(0x371)]=function(){const _0xd9a1d8=_0x116828,_0x538bd8=this[_0xd9a1d8(0x27b)]['direction']();let _0x4585c5=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];if(this[_0xd9a1d8(0x27b)]['_mirrorSprite']){if(_0xd9a1d8(0x58a)===_0xd9a1d8(0x15e))return _0xa2e314>0x0?0x6:0x4;else _0x4585c5=[0x2,0x4,0x2,0x2,0x6,0x2,0x4,0x8,0x8,0x6];}return(_0x4585c5[_0x538bd8]-0x2)/0x2;},Sprite_Character[_0x116828(0x29b)]['characterPatternYBasic']=function(){const _0x258294=_0x116828;let _0x2d4ad3=this[_0x258294(0x27b)][_0x258294(0x592)]();if(this[_0x258294(0x27b)][_0x258294(0x5f0)]){if(_0x258294(0x54e)!=='VZAil')_0x1f2fb2['x']=_0x277198?_0x5bc8dd[_0x258294(0x23c)]:0x0,_0x4fd968['y']=_0x3c8d82?-this[_0x258294(0x4b2)]+_0x203b6d[_0x258294(0x491)]:0x0;else{if(_0x2d4ad3===0x4)_0x2d4ad3=0x6;else _0x2d4ad3===0x6&&(_0x2d4ad3=0x4);}}return(_0x2d4ad3-0x2)/0x2;},Sprite_Character[_0x116828(0x29b)]['updateTilt']=function(){const _0x4593ea=_0x116828;this['rotation']=0x0;if(this[_0x4593ea(0x325)]()){if('zddij'===_0x4593ea(0x268)){const _0x3be732=VisuMZ[_0x4593ea(0x3d8)][_0x4593ea(0x256)][_0x4593ea(0x534)],_0x72307=this[_0x4593ea(0x27b)][_0x4593ea(0x592)]();let _0x4c2719=0x0;if([0x1,0x4,0x7][_0x4593ea(0x635)](_0x72307))_0x4c2719=_0x3be732[_0x4593ea(0x5ce)];if([0x3,0x6,0x9][_0x4593ea(0x635)](_0x72307))_0x4c2719=_0x3be732[_0x4593ea(0x408)];[0x2,0x8]['includes'](_0x72307)&&(_0x4c2719=[-_0x3be732[_0x4593ea(0x2ed)],0x0,_0x3be732['TiltVert']][this[_0x4593ea(0x27b)]['pattern']()]);if(this[_0x4593ea(0x15a)])_0x4c2719*=-0x1;this[_0x4593ea(0x29f)]=_0x4c2719;}else{const _0x179e50=this['deltaXFrom'](_0x3647c5),_0x52971e=this[_0x4593ea(0x364)](_0x53bd86);}}},Sprite_Character['prototype']['isAllowCharacterTilt']=function(){const _0x13f641=_0x116828;if(this['_dragonbones'])return![];return this[_0x13f641(0x27b)][_0x13f641(0x61a)]()&&!this['_character'][_0x13f641(0x1dc)]()&&!this[_0x13f641(0x27b)][_0x13f641(0x51b)]()&&this[_0x13f641(0x361)]()===0x0;},Sprite_Character[_0x116828(0x29b)][_0x116828(0x21c)]=function(){const _0x1115b2=_0x116828;this[_0x1115b2(0x616)]['x']=this[_0x1115b2(0x27b)]['shadowX'](),this[_0x1115b2(0x616)]['y']=this['_character'][_0x1115b2(0x1f6)](),this[_0x1115b2(0x616)][_0x1115b2(0x375)]=this['opacity'],this[_0x1115b2(0x616)][_0x1115b2(0x4bb)]=this[_0x1115b2(0x27b)]['isShadowVisible'](),this[_0x1115b2(0x616)][_0x1115b2(0x4d3)]=this[_0x1115b2(0x4d3)],!this[_0x1115b2(0x27b)][_0x1115b2(0x3d7)]()?(this[_0x1115b2(0x616)][_0x1115b2(0x20a)]['x']=Math[_0x1115b2(0x456)](0x1,this[_0x1115b2(0x616)][_0x1115b2(0x20a)]['x']+0.1),this[_0x1115b2(0x616)]['scale']['y']=Math['min'](0x1,this[_0x1115b2(0x616)][_0x1115b2(0x20a)]['y']+0.1)):(this[_0x1115b2(0x616)][_0x1115b2(0x20a)]['x']=Math['max'](0x0,this[_0x1115b2(0x616)]['scale']['x']-0.1),this['_shadowSprite'][_0x1115b2(0x20a)]['y']=Math[_0x1115b2(0x37e)](0x0,this[_0x1115b2(0x616)][_0x1115b2(0x20a)]['y']-0.1));},Sprite_Character[_0x116828(0x29b)][_0x116828(0x1ca)]=function(){const _0x1a767b=_0x116828,_0x3c736b=this[_0x1a767b(0x270)],_0x376a56=this['getEventIconIndex']();if(_0x376a56<=0x0)return _0x1a767b(0x2bd)!==_0x1a767b(0x2bd)?![]:_0x3c736b['setFrame'](0x0,0x0,0x0,0x0);else{if(_0x1a767b(0x2a4)===_0x1a767b(0x5d5)){const _0x500caf=_0x940fc1[_0x1a767b(0x263)],_0x3a3e2e=_0x456736[_0x1a767b(0x1f5)],_0x12ac9c=_0x5bf2d5%0x10*_0x500caf,_0x3ddec5=_0x2d226e[_0x1a767b(0x2c6)](_0x20b6c8/0x10)*_0x3a3e2e;_0x7e24d9[_0x1a767b(0x5d6)](_0x12ac9c,_0x3ddec5,_0x500caf,_0x3a3e2e),this['visible']=!![];}else{const _0x2f145c=ImageManager['iconWidth'],_0x5218a6=ImageManager[_0x1a767b(0x1f5)],_0x1251e4=_0x376a56%0x10*_0x2f145c,_0x237661=Math[_0x1a767b(0x2c6)](_0x376a56/0x10)*_0x5218a6;_0x3c736b[_0x1a767b(0x5d6)](_0x1251e4,_0x237661,_0x2f145c,_0x5218a6),this[_0x1a767b(0x4bb)]=!![];}}const _0x5ca51d=this[_0x1a767b(0x27b)][_0x1a767b(0x175)]();if(this[_0x1a767b(0x259)]())this[_0x1a767b(0x293)](_0x3c736b);else{if(_0x1a767b(0x64a)!=='EIoDu')_0x3c736b['x']=_0x5ca51d?_0x5ca51d[_0x1a767b(0x23c)]:0x0,_0x3c736b['y']=_0x5ca51d?-this['height']+_0x5ca51d[_0x1a767b(0x491)]:0x0;else return this[_0x1a767b(0x541)](_0x4dfb35);}_0x3c736b[_0x1a767b(0x38a)]=_0x5ca51d?_0x5ca51d[_0x1a767b(0x38a)]:0x0,this['removeChild'](_0x3c736b),this[_0x1a767b(0x381)](_0x3c736b),_0x3c736b[_0x1a767b(0x29f)]=-this[_0x1a767b(0x29f)];},Sprite_Character[_0x116828(0x29b)][_0x116828(0x399)]=function(){const _0x83a20a=_0x116828;if(!this[_0x83a20a(0x27b)])return;if(this[_0x83a20a(0x27b)]['_customZ']===undefined)return;if(this[_0x83a20a(0x27b)]['_customZ']===![])return;this['z']=this[_0x83a20a(0x27b)][_0x83a20a(0x48d)],this['z']<0x0?this['_shadowSprite']['z']=this['z']-0x1:this['_shadowSprite']['z']=0x0;},Sprite_Character[_0x116828(0x29b)][_0x116828(0x348)]=function(){const _0x3b3152=_0x116828;if(!this[_0x3b3152(0x27b)])return;let _0x4afbe2=!!this['_character'][_0x3b3152(0x5f0)];this[_0x3b3152(0x20a)]['x']=Math[_0x3b3152(0x291)](this['scale']['x'])*(_0x4afbe2?-0x1:0x1);},Sprite_Character[_0x116828(0x29b)][_0x116828(0x293)]=function(_0x1fe4ec){const _0x16287f=_0x116828;_0x1fe4ec['x']=0x0,_0x1fe4ec['y']=-this[_0x16287f(0x4b2)]+this[_0x16287f(0x4b2)]*0x2/0x5;if(this['_character'][_0x16287f(0x551)]()!==0x1){if(_0x16287f(0x524)!==_0x16287f(0x524)){if(!this[_0x16287f(0x2f4)])return;this['resizeWindow'](),this[_0x16287f(0x15d)]();}else _0x1fe4ec['y']+=0x1;}},Sprite_Character[_0x116828(0x29b)][_0x116828(0x361)]=function(){const _0x2e21fe=_0x116828;if(!this[_0x2e21fe(0x27b)])return 0x0;if(this['_character']['_erased'])return 0x0;const _0x2e0531=this['_character'][_0x2e21fe(0x175)]();return _0x2e0531?_0x2e0531[_0x2e21fe(0x64f)]||0x0:0x0;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x172)]=Sprite_Balloon[_0x116828(0x29b)][_0x116828(0x3a2)],Sprite_Balloon[_0x116828(0x29b)][_0x116828(0x3a2)]=function(_0x8a6c4,_0x4f8bb9){const _0x50f9ff=_0x116828;VisuMZ[_0x50f9ff(0x3d8)][_0x50f9ff(0x172)][_0x50f9ff(0x176)](this,_0x8a6c4,_0x4f8bb9);if(VisuMZ[_0x50f9ff(0x3d8)]['Settings'][_0x50f9ff(0x29e)][_0x50f9ff(0x271)]){if(_0x50f9ff(0x2a0)!=='hhjNq')return this[_0x50f9ff(0x3bb)];else this[_0x50f9ff(0x228)][_0x50f9ff(0x27b)][_0x50f9ff(0x190)](_0x4f8bb9,this[_0x50f9ff(0x2ad)]);}},VisuMZ[_0x116828(0x3d8)]['Sprite_Balloon_updatePosition']=Sprite_Balloon[_0x116828(0x29b)]['updatePosition'],Sprite_Balloon[_0x116828(0x29b)][_0x116828(0x4e4)]=function(){const _0xac8446=_0x116828;VisuMZ[_0xac8446(0x3d8)][_0xac8446(0x3d3)][_0xac8446(0x176)](this),this['updateVS8BalloonOffsets']();},Sprite_Balloon[_0x116828(0x29b)][_0x116828(0x436)]=function(){const _0x438d71=_0x116828;if(this['_target'][_0x438d71(0x27b)][_0x438d71(0x368)]()){if(_0x438d71(0x4be)==='nzJNW')this['x']+=VisuMZ['EventsMoveCore'][_0x438d71(0x256)]['VS8'][_0x438d71(0x395)],this['y']+=VisuMZ[_0x438d71(0x3d8)]['Settings'][_0x438d71(0x29e)][_0x438d71(0x24f)];else{if(!this[_0x438d71(0x20f)](_0x353586,_0x82b08c))return;const _0x36bb2f=_0x1c0b6e[_0x438d71(0x3d8)][_0x438d71(0x256)][_0x438d71(0x3d4)];if(!_0x66288d)_0x36bb2f['PreMorphJS']['call'](this,_0x45a731,_0x390991,this);this[_0x438d71(0x34f)]={'mapId':_0x5c82a6,'eventId':_0x563fc8},this[_0x438d71(0x2b8)]=-0x2,this[_0x438d71(0x51c)]();if(!_0x102556)_0x36bb2f[_0x438d71(0x5eb)][_0x438d71(0x176)](this,_0x5d52f1,_0x1e6777,this);_0x1a674f['clearEventCache']();}}},Sprite_Timer[_0x116828(0x29b)][_0x116828(0x62d)]=function(){const _0x4019f8=_0x116828;this['bitmap']=new Bitmap(Math[_0x4019f8(0x181)](Graphics[_0x4019f8(0x449)]/0x2),0x30),this[_0x4019f8(0x1e4)][_0x4019f8(0x25b)]=this[_0x4019f8(0x25b)](),this['bitmap'][_0x4019f8(0x2f2)]=this[_0x4019f8(0x2f2)](),this[_0x4019f8(0x1e4)][_0x4019f8(0x4b3)]=ColorManager[_0x4019f8(0x4b3)]();},Sprite_Timer[_0x116828(0x29b)][_0x116828(0x394)]=function(){const _0x4ffd2d=_0x116828,_0x1caa5c=Math[_0x4ffd2d(0x2c6)](this[_0x4ffd2d(0x1cc)]/0x3c/0x3c),_0x300702=Math[_0x4ffd2d(0x2c6)](this[_0x4ffd2d(0x1cc)]/0x3c)%0x3c,_0x3caf73=this[_0x4ffd2d(0x1cc)]%0x3c;let _0x48945e=_0x300702[_0x4ffd2d(0x414)](0x2)+':'+_0x3caf73[_0x4ffd2d(0x414)](0x2);if(_0x1caa5c>0x0)_0x48945e=_0x4ffd2d(0x59d)['format'](_0x1caa5c,_0x48945e);return _0x48945e;};function Sprite_EventLabel(){const _0x5c49ac=_0x116828;this[_0x5c49ac(0x4ad)](...arguments);}Sprite_EventLabel[_0x116828(0x29b)]=Object['create'](Sprite['prototype']),Sprite_EventLabel[_0x116828(0x29b)]['constructor']=Sprite_EventLabel,Sprite_EventLabel['prototype'][_0x116828(0x4ad)]=function(_0x369d7f){const _0xc025ce=_0x116828;this['_event']=_0x369d7f,Sprite['prototype'][_0xc025ce(0x4ad)][_0xc025ce(0x176)](this),this[_0xc025ce(0x4cc)](),this[_0xc025ce(0x2d8)]();},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x4cc)]=function(){const _0x44531c=_0x116828;this['anchor']['x']=0.5,this[_0x44531c(0x447)]['y']=0x1;},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x2d8)]=function(){const _0x25c291=_0x116828,_0x3d99ad=new Rectangle(0x0,0x0,0x1,0x1);this[_0x25c291(0x2f4)]=new Window_Base(_0x3d99ad),this[_0x25c291(0x2f4)][_0x25c291(0x25c)]=0x0;},Sprite_EventLabel['prototype'][_0x116828(0x252)]=function(){const _0x1266df=_0x116828;Sprite[_0x1266df(0x29b)]['update']['call'](this),this[_0x1266df(0x473)](),this[_0x1266df(0x500)](),this[_0x1266df(0x4e4)](),this[_0x1266df(0x5f2)]();},Sprite_EventLabel['prototype'][_0x116828(0x473)]=function(){const _0x1f4725=_0x116828;this[_0x1f4725(0x622)][_0x1f4725(0x20d)]()!==this[_0x1f4725(0x529)]&&(this[_0x1f4725(0x529)]=this['_event'][_0x1f4725(0x20d)](),this[_0x1f4725(0x51c)]());},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x51c)]=function(){const _0x1e9aed=_0x116828;if(!this['_proxyWindow'])return;this[_0x1e9aed(0x2b6)](),this['drawText']();},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x2b6)]=function(){const _0x956966=_0x116828,_0x29e9b2=this['_proxyWindow'][_0x956966(0x427)](this['_text']),_0x18c581=this[_0x956966(0x2f4)][_0x956966(0x58c)](),_0x5dcdc7=_0x29e9b2['width']+_0x18c581*0x2,_0x4bc214=_0x29e9b2['height'];this[_0x956966(0x2f4)]['move'](0x0,0x0,_0x5dcdc7,_0x4bc214),this['_proxyWindow'][_0x956966(0x24a)](),this[_0x956966(0x1e4)]=this['_proxyWindow']['contents'];},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x15d)]=function(){const _0x16aa5a=_0x116828,_0x51b8e7=this[_0x16aa5a(0x2f4)][_0x16aa5a(0x58c)]();this[_0x16aa5a(0x2f4)]['drawTextEx'](this[_0x16aa5a(0x529)],_0x51b8e7,0x0);},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x500)]=function(){const _0x25e6b7=_0x116828,_0x2606ba=VisuMZ[_0x25e6b7(0x3d8)]['Settings'][_0x25e6b7(0x258)]['FontSize'],_0x5a1739=$gameSystem[_0x25e6b7(0x550)]()||0x1;this[_0x25e6b7(0x20a)]['x']=this[_0x25e6b7(0x20a)]['y']=_0x2606ba/_0x5a1739;},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x4e4)]=function(){const _0x525957=_0x116828;if(!SceneManager['_scene'])return;if(!SceneManager[_0x525957(0x185)][_0x525957(0x483)])return;const _0xa0310a=SceneManager[_0x525957(0x185)][_0x525957(0x483)][_0x525957(0x295)](this[_0x525957(0x622)]);if(!_0xa0310a)return;this['x']=this[_0x525957(0x622)][_0x525957(0x3df)](),this['x']+=this[_0x525957(0x622)][_0x525957(0x59c)][_0x525957(0x458)],this['y']=this[_0x525957(0x622)][_0x525957(0x4c4)]()-_0xa0310a['height'],this['y']+=$gameSystem[_0x525957(0x56c)]()*-0.5,this['y']+=this[_0x525957(0x622)][_0x525957(0x59c)][_0x525957(0x46a)];},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x5f2)]=function(){const _0x23611b=_0x116828;if(this['isLabelVisible']()){if('NoUAt'!==_0x23611b(0x5e0))return 0x8;else this['opacity']+=this[_0x23611b(0x1b2)]();}else{if(SceneManager[_0x23611b(0x185)][_0x23611b(0x245)]>0x0){if('KfyNE'===_0x23611b(0x3a7))return this['_addedHitbox']?this[_0x23611b(0x377)](_0x1b1fad,_0x3a31e4):_0x1f640f[_0x23611b(0x29b)]['pos'][_0x23611b(0x176)](this,_0x1ffcac,_0x1f4152);else this[_0x23611b(0x375)]=0x0;}else{if(_0x23611b(0x3dd)===_0x23611b(0x3dd))this[_0x23611b(0x375)]-=this['opacitySpeed']();else{const _0x5d5fa5=_0x78294a?_0x18d2ec[_0x23611b(0x2d7)]():0x0,_0x4ed4cd=[0x0,0x0,'Map\x20%1\x20Switch\x20%2'[_0x23611b(0x386)](_0x5d5fa5,_0x103044)];return _0x19e03f[_0x23611b(0x4ba)](_0x4ed4cd);}}}},Sprite_EventLabel[_0x116828(0x29b)]['isLabelVisible']=function(){const _0x2057d7=_0x116828;if(!$gameSystem[_0x2057d7(0x3a5)]())return![];if(this[_0x2057d7(0x622)]?.[_0x2057d7(0x391)])return![];if(SceneManager[_0x2057d7(0x185)][_0x2057d7(0x245)]>0x0)return![];const _0x37c86d=$gamePlayer['x'],_0x10caaa=$gamePlayer['y'],_0x4a57d5=this[_0x2057d7(0x622)]['x'],_0xca11ca=this[_0x2057d7(0x622)]['y'];if(this[_0x2057d7(0x579)]===_0x37c86d&&this[_0x2057d7(0x1c8)]===_0x10caaa&&this['_visibleEventX']===_0x4a57d5&&this['_visibleEventY']===_0xca11ca)return this[_0x2057d7(0x5ff)];this[_0x2057d7(0x579)]=$gamePlayer['x'],this[_0x2057d7(0x1c8)]=$gamePlayer['y'],this[_0x2057d7(0x273)]=this['_event']['x'],this[_0x2057d7(0x5d2)]=this[_0x2057d7(0x622)]['y'];if($gameMap[_0x2057d7(0x1bf)](_0x37c86d,_0x10caaa,_0x4a57d5,_0xca11ca)>this[_0x2057d7(0x622)][_0x2057d7(0x1a2)]())return this[_0x2057d7(0x5ff)]=![],![];return this[_0x2057d7(0x5ff)]=!![],!![];},Sprite_EventLabel[_0x116828(0x29b)][_0x116828(0x1b2)]=function(){const _0x25776a=_0x116828;return VisuMZ[_0x25776a(0x3d8)]['Settings'][_0x25776a(0x258)][_0x25776a(0x465)];},VisuMZ[_0x116828(0x3d8)][_0x116828(0x2f0)]=Spriteset_Map[_0x116828(0x29b)]['createLowerLayer'],Spriteset_Map[_0x116828(0x29b)]['createLowerLayer']=function(){const _0x3228d1=_0x116828;VisuMZ[_0x3228d1(0x3d8)][_0x3228d1(0x2f0)][_0x3228d1(0x176)](this),this[_0x3228d1(0x5c9)]();},VisuMZ['EventsMoveCore']['Spriteset_Map_createShadow']=Spriteset_Map[_0x116828(0x29b)][_0x116828(0x4cd)],Spriteset_Map[_0x116828(0x29b)]['createShadow']=function(){const _0x1a2527=_0x116828;VisuMZ[_0x1a2527(0x3d8)]['Spriteset_Map_createShadow'][_0x1a2527(0x176)](this),this[_0x1a2527(0x610)]();},Spriteset_Map[_0x116828(0x29b)][_0x116828(0x610)]=function(){const _0x1ab00d=_0x116828;if(!VisuMZ[_0x1ab00d(0x3d8)][_0x1ab00d(0x256)][_0x1ab00d(0x534)][_0x1ab00d(0x388)])return;for(const _0x2e4056 of this[_0x1ab00d(0x4e6)]){this[_0x1ab00d(0x538)](_0x2e4056);}},Spriteset_Map[_0x116828(0x29b)]['createCharacterShadow']=function(_0x4edb7a){const _0x36ddaf=_0x116828;_0x4edb7a[_0x36ddaf(0x616)]=new Sprite(),_0x4edb7a[_0x36ddaf(0x616)]['_filename']=_0x4edb7a[_0x36ddaf(0x27b)][_0x36ddaf(0x1c1)](),_0x4edb7a[_0x36ddaf(0x616)][_0x36ddaf(0x1e4)]=ImageManager[_0x36ddaf(0x5af)](_0x4edb7a[_0x36ddaf(0x616)][_0x36ddaf(0x60e)]),_0x4edb7a[_0x36ddaf(0x616)][_0x36ddaf(0x447)]['x']=0.5,_0x4edb7a[_0x36ddaf(0x616)][_0x36ddaf(0x447)]['y']=0x1,_0x4edb7a['_shadowSprite']['z']=0x0,this['_tilemap']['addChild'](_0x4edb7a[_0x36ddaf(0x616)]);},Spriteset_Map[_0x116828(0x29b)][_0x116828(0x647)]=function(){const _0x1936fd=_0x116828;if(!VisuMZ[_0x1936fd(0x3d8)][_0x1936fd(0x256)][_0x1936fd(0x534)][_0x1936fd(0x388)])return;for(const _0x4ea301 of this[_0x1936fd(0x4e6)]){this['_tilemap']['removeChild'](_0x4ea301[_0x1936fd(0x616)]);}},Spriteset_Map[_0x116828(0x29b)][_0x116828(0x5c9)]=function(){const _0x4dc01d=_0x116828;this['_labelWindows']=[];for(const _0xf8fc05 of $gameMap['events']()){this[_0x4dc01d(0x57b)](_0xf8fc05);}},Spriteset_Map[_0x116828(0x29b)][_0x116828(0x57b)]=function(_0x1f5f83){const _0x336691=_0x116828;if(!this[_0x336691(0x3ba)](_0x1f5f83))return;let _0x275fb6;const _0x5b8050=VisuMZ['EventsMoveCore'][_0x336691(0x256)][_0x336691(0x258)][_0x336691(0x5b6)]??!![];_0x275fb6=_0x5b8050?new Sprite_EventLabel(_0x1f5f83):new Window_EventLabel(_0x1f5f83),_0x275fb6['z']=0x8,_0x275fb6[_0x336691(0x1c2)]=Sprite[_0x336691(0x44c)]++,this[_0x336691(0x527)][_0x336691(0x381)](_0x275fb6),this[_0x336691(0x218)][_0x336691(0x346)](_0x275fb6);},Spriteset_Map[_0x116828(0x29b)][_0x116828(0x3ba)]=function(_0x23dc16){const _0x12ea9d=_0x116828,_0xcf1a3e=_0x23dc16[_0x12ea9d(0x41a)]();if(_0xcf1a3e[_0x12ea9d(0x5ed)]['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0xcf1a3e[_0x12ea9d(0x5ed)][_0x12ea9d(0x5ba)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x41df0f of _0xcf1a3e['pages']){if(_0x12ea9d(0x4e3)===_0x12ea9d(0x4ec))return this[_0x12ea9d(0x326)]['regionList']||[];else{let _0x3e7ec3='';for(const _0x1f1a8b of _0x41df0f[_0x12ea9d(0x2ce)]){if([0x6c,0x198][_0x12ea9d(0x635)](_0x1f1a8b[_0x12ea9d(0x2e5)])){if(_0x12ea9d(0x18d)==='TlHtA')_0x3e7ec3+=_0x1f1a8b[_0x12ea9d(0x167)][0x0];else return this[_0x12ea9d(0x2d4)]===_0x39bd67&&(this[_0x12ea9d(0x2d4)]=![]),this[_0x12ea9d(0x2d4)];}}if(_0x3e7ec3['match'](/<LABEL:[ ](.*?)>/i))return!![];if(_0x3e7ec3['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];}}return![];},Spriteset_Map[_0x116828(0x29b)][_0x116828(0x434)]=function(_0x25c76e){const _0x546dc6=_0x116828;this[_0x546dc6(0x4e6)]=this[_0x546dc6(0x4e6)]||[];const _0x5793a4=new Sprite_Character(_0x25c76e);this[_0x546dc6(0x4e6)][_0x546dc6(0x346)](_0x5793a4),this['_tilemap']['addChild'](_0x5793a4),this[_0x546dc6(0x538)](_0x5793a4),this['createLabelWindowForTarget'](_0x25c76e),_0x5793a4[_0x546dc6(0x252)]();},VisuMZ[_0x116828(0x3d8)][_0x116828(0x502)]=Game_Message[_0x116828(0x29b)][_0x116828(0x351)],Game_Message[_0x116828(0x29b)][_0x116828(0x351)]=function(_0x3b181a,_0x20c287){const _0x53f892=_0x116828;this['_selfTargetNumberInput']=$gameTemp[_0x53f892(0x611)](),VisuMZ['EventsMoveCore'][_0x53f892(0x502)]['call'](this,_0x3b181a,_0x20c287);},VisuMZ['EventsMoveCore']['Window_NumberInput_start']=Window_NumberInput[_0x116828(0x29b)]['start'],Window_NumberInput[_0x116828(0x29b)][_0x116828(0x4d1)]=function(){const _0x232987=_0x116828;$gameTemp[_0x232987(0x444)]($gameMessage[_0x232987(0x41d)]),VisuMZ[_0x232987(0x3d8)][_0x232987(0x379)][_0x232987(0x176)](this),$gameTemp[_0x232987(0x3f2)]();},VisuMZ[_0x116828(0x3d8)]['Window_NumberInput_processOk']=Window_NumberInput['prototype'][_0x116828(0x3ce)],Window_NumberInput[_0x116828(0x29b)][_0x116828(0x3ce)]=function(){const _0xd61c10=_0x116828;$gameTemp[_0xd61c10(0x444)]($gameMessage[_0xd61c10(0x41d)]),VisuMZ[_0xd61c10(0x3d8)][_0xd61c10(0x202)][_0xd61c10(0x176)](this),$gameTemp[_0xd61c10(0x3f2)](),$gameMessage['_selfTargetNumberInput']=undefined;},VisuMZ[_0x116828(0x3d8)]['Game_Message_setItemChoice']=Game_Message['prototype'][_0x116828(0x1ef)],Game_Message[_0x116828(0x29b)][_0x116828(0x1ef)]=function(_0x1eac0f,_0x3322b7){const _0x88bec8=_0x116828;this[_0x88bec8(0x296)]=$gameTemp[_0x88bec8(0x611)](),VisuMZ[_0x88bec8(0x3d8)][_0x88bec8(0x1df)][_0x88bec8(0x176)](this,_0x1eac0f,_0x3322b7);},VisuMZ[_0x116828(0x3d8)][_0x116828(0x3bc)]=Window_EventItem[_0x116828(0x29b)][_0x116828(0x32f)],Window_EventItem[_0x116828(0x29b)][_0x116828(0x32f)]=function(){const _0x217bd7=_0x116828;$gameTemp[_0x217bd7(0x444)]($gameMessage['_selfTargetItemChoice']),VisuMZ['EventsMoveCore'][_0x217bd7(0x3bc)][_0x217bd7(0x176)](this),$gameTemp[_0x217bd7(0x3f2)](),$gameMessage[_0x217bd7(0x296)]=undefined;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x45c)]=Window_EventItem[_0x116828(0x29b)]['onCancel'],Window_EventItem[_0x116828(0x29b)][_0x116828(0x309)]=function(){const _0x1dfb66=_0x116828;$gameTemp['registerSelfTarget']($gameMessage[_0x1dfb66(0x296)]),VisuMZ['EventsMoveCore'][_0x1dfb66(0x45c)][_0x1dfb66(0x176)](this),$gameTemp['clearSelfTarget'](),$gameMessage[_0x1dfb66(0x296)]=undefined;},VisuMZ[_0x116828(0x3d8)][_0x116828(0x54d)]=Window_Message['prototype'][_0x116828(0x5a6)],Window_Message[_0x116828(0x29b)][_0x116828(0x5a6)]=function(){const _0x68e04=_0x116828;$gameMessage[_0x68e04(0x327)](),VisuMZ[_0x68e04(0x3d8)][_0x68e04(0x54d)]['call'](this),$gameTemp[_0x68e04(0x3f2)]();},VisuMZ[_0x116828(0x3d8)][_0x116828(0x410)]=Window_ScrollText[_0x116828(0x29b)][_0x116828(0x5a6)],Window_ScrollText[_0x116828(0x29b)][_0x116828(0x5a6)]=function(){const _0x406693=_0x116828;$gameMessage['registerSelfEvent'](),VisuMZ['EventsMoveCore'][_0x406693(0x410)][_0x406693(0x176)](this),$gameTemp['clearSelfTarget']();};function Window_EventLabel(){const _0x508041=_0x116828;this[_0x508041(0x4ad)](...arguments);}function _0x4592(_0x5656bf,_0x7093a8){const _0x5b2603=_0x5b26();return _0x4592=function(_0x4592a4,_0x47ecc9){_0x4592a4=_0x4592a4-0x152;let _0x45363c=_0x5b2603[_0x4592a4];return _0x45363c;},_0x4592(_0x5656bf,_0x7093a8);}Window_EventLabel[_0x116828(0x29b)]=Object['create'](Window_Base[_0x116828(0x29b)]),Window_EventLabel[_0x116828(0x29b)][_0x116828(0x565)]=Window_EventLabel,Window_EventLabel[_0x116828(0x29b)][_0x116828(0x4ad)]=function(_0x4e7ac0){const _0x520162=_0x116828;this[_0x520162(0x622)]=_0x4e7ac0;const _0x3c45e1=new Rectangle(0x0,0x0,Graphics[_0x520162(0x449)]/0x4,this[_0x520162(0x349)](0x1));this[_0x520162(0x4cc)](),Window_Base['prototype'][_0x520162(0x4ad)][_0x520162(0x176)](this,_0x3c45e1),this[_0x520162(0x5ea)]=0x0,this[_0x520162(0x1ce)](0x2),this['_text']='';},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x4cc)]=function(){const _0x377246=_0x116828;this[_0x377246(0x380)]=![],this[_0x377246(0x266)]=$gameScreen['zoomScale'](),this[_0x377246(0x441)]=this[_0x377246(0x622)]['screenX'](),this[_0x377246(0x2ff)]=this[_0x377246(0x622)]['screenY'](),this[_0x377246(0x227)]=this[_0x377246(0x622)]['_labelWindow'][_0x377246(0x458)],this['_eventLabelOffsetY']=this[_0x377246(0x622)]['_labelWindow'][_0x377246(0x46a)],this[_0x377246(0x23b)]=this[_0x377246(0x622)][_0x377246(0x2b8)],this['_cacheVisibility']=this[_0x377246(0x16c)](),this['_cacheSystemVisible']=$gameSystem['eventLabelsVisible'](),this[_0x377246(0x579)]=$gamePlayer['x'],this[_0x377246(0x1c8)]=$gamePlayer['y'],this[_0x377246(0x273)]=this['_event']['x'],this['_visibleEventY']=this[_0x377246(0x622)]['y'];},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x252)]=function(){const _0x5c4242=_0x116828;Window_Base[_0x5c4242(0x29b)][_0x5c4242(0x252)]['call'](this);if(!this['needsUpdate']())return;this[_0x5c4242(0x473)](),this[_0x5c4242(0x500)](),this[_0x5c4242(0x4e4)](),this['updateOpacity']();},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x638)]=function(){const _0x2e7bce=_0x116828;if(!this[_0x2e7bce(0x622)])return![];if(!this[_0x2e7bce(0x622)][_0x2e7bce(0x59c)])return![];if(this[_0x2e7bce(0x23b)]!==this[_0x2e7bce(0x622)][_0x2e7bce(0x2b8)])return!![];if(this[_0x2e7bce(0x622)]['_erased']&&!this['_eventErased'])return!![];if(this['_event'][_0x2e7bce(0x59c)][_0x2e7bce(0x1e6)]==='')return![];if(this[_0x2e7bce(0x266)]!==$gameScreen[_0x2e7bce(0x628)]())return!![];if(this[_0x2e7bce(0x441)]!==this[_0x2e7bce(0x622)][_0x2e7bce(0x3df)]())return!![];if(this[_0x2e7bce(0x2ff)]!==this[_0x2e7bce(0x622)][_0x2e7bce(0x4c4)]())return!![];if(this['_eventLabelOffsetX']!==this[_0x2e7bce(0x622)]['_labelWindow'][_0x2e7bce(0x458)])return!![];if(this[_0x2e7bce(0x30b)]!==this[_0x2e7bce(0x622)]['_labelWindow'][_0x2e7bce(0x46a)])return!![];if(this[_0x2e7bce(0x579)]!==$gamePlayer['x'])return!![];if(this[_0x2e7bce(0x1c8)]!==$gamePlayer['y'])return!![];if(this[_0x2e7bce(0x273)]!==this[_0x2e7bce(0x622)]['x'])return!![];if(this['_visibleEventY']!==this['_event']['y'])return!![];if(this['_cacheSystemVisible']!==$gameSystem[_0x2e7bce(0x3a5)]())return!![];if(this[_0x2e7bce(0x5ff)]&&this['contentsOpacity']<0xff)return!![];if(!this['_cacheVisibility']&&this[_0x2e7bce(0x5ea)]>0x0)return!![];if(SceneManager[_0x2e7bce(0x185)]['_encounterEffectDuration']>0x0)return!![];return![];},Window_EventLabel['prototype'][_0x116828(0x473)]=function(){const _0x2f1e62=_0x116828;this[_0x2f1e62(0x622)][_0x2f1e62(0x20d)]()!==this[_0x2f1e62(0x529)]&&(this[_0x2f1e62(0x529)]=this[_0x2f1e62(0x622)]['labelWindowText'](),this[_0x2f1e62(0x51c)]());},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x500)]=function(){const _0x20bf16=_0x116828;this[_0x20bf16(0x20a)]['x']=0x1/$gameScreen[_0x20bf16(0x628)](),this[_0x20bf16(0x20a)]['y']=0x1/$gameScreen[_0x20bf16(0x628)](),this['_screenZoomScale']=$gameScreen[_0x20bf16(0x628)]();},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x4e4)]=function(){const _0x70304d=_0x116828;if(!SceneManager[_0x70304d(0x185)])return;if(!SceneManager[_0x70304d(0x185)][_0x70304d(0x483)])return;const _0x20815b=SceneManager['_scene']['_spriteset'][_0x70304d(0x295)](this[_0x70304d(0x622)]);if(!_0x20815b)return;this['x']=Math[_0x70304d(0x181)](this[_0x70304d(0x622)][_0x70304d(0x3df)]()-Math[_0x70304d(0x2c6)](this['width']*this[_0x70304d(0x20a)]['x']/0x2)),this['x']+=this[_0x70304d(0x622)]['_labelWindow'][_0x70304d(0x458)],this['y']=this[_0x70304d(0x622)]['screenY']()-_0x20815b[_0x70304d(0x4b2)],this['y']+=Math['round']($gameSystem[_0x70304d(0x56c)]()*0.5),this['y']-=Math['round'](this[_0x70304d(0x4b2)]*this[_0x70304d(0x20a)]['y']),this['y']+=this[_0x70304d(0x622)]['_labelWindow']['offsetY'],this[_0x70304d(0x380)]=this['_event'][_0x70304d(0x391)],this[_0x70304d(0x441)]=this[_0x70304d(0x622)]['screenX'](),this['_eventScreenY']=this[_0x70304d(0x622)][_0x70304d(0x4c4)](),this[_0x70304d(0x227)]=this['_event']['_labelWindow'][_0x70304d(0x458)],this['_eventLabelOffsetY']=this[_0x70304d(0x622)][_0x70304d(0x59c)][_0x70304d(0x46a)],this[_0x70304d(0x23b)]=this[_0x70304d(0x622)]['_pageIndex'],this['_eventErased']&&(_0x70304d(0x208)!==_0x70304d(0x208)?_0x48b840[0x2]=_0x5bce5e(_0x43b81a)[_0x70304d(0x19c)](0x0)[_0x70304d(0x5db)]()[_0x70304d(0x423)]():this[_0x70304d(0x5ea)]=0x0);},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x5f2)]=function(){const _0x25ec87=_0x116828;if(this[_0x25ec87(0x16c)]())this[_0x25ec87(0x5ea)]+=this[_0x25ec87(0x1b2)]();else SceneManager['_scene'][_0x25ec87(0x245)]>0x0?this[_0x25ec87(0x5ea)]=0x0:_0x25ec87(0x60a)!==_0x25ec87(0x5a2)?this[_0x25ec87(0x5ea)]-=this[_0x25ec87(0x1b2)]():_0x3b9bee=_0x1f413f['replace'](_0x42a34a,(_0x44a637,_0x33822c)=>_0x573744[_0x25ec87(0x4ba)](_0x488aab(_0x33822c)));},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x16c)]=function(){const _0x429bf9=_0x116828;if(!$gameSystem[_0x429bf9(0x3a5)]())return![];if(this[_0x429bf9(0x622)]?.['_erased'])return![];if(SceneManager[_0x429bf9(0x185)][_0x429bf9(0x245)]>0x0)return![];const _0xbcf63=$gamePlayer['x'],_0x19c186=$gamePlayer['y'],_0x3ef7f6=this[_0x429bf9(0x622)]['x'],_0x217b68=this[_0x429bf9(0x622)]['y'];if(this[_0x429bf9(0x579)]===_0xbcf63&&this[_0x429bf9(0x1c8)]===_0x19c186&&this[_0x429bf9(0x273)]===_0x3ef7f6&&this[_0x429bf9(0x5d2)]===_0x217b68)return this[_0x429bf9(0x5ff)];this[_0x429bf9(0x579)]=$gamePlayer['x'],this[_0x429bf9(0x1c8)]=$gamePlayer['y'],this['_visibleEventX']=this[_0x429bf9(0x622)]['x'],this[_0x429bf9(0x5d2)]=this[_0x429bf9(0x622)]['y'];if($gameMap[_0x429bf9(0x1bf)](_0xbcf63,_0x19c186,_0x3ef7f6,_0x217b68)>this[_0x429bf9(0x622)][_0x429bf9(0x1a2)]())return this[_0x429bf9(0x5ff)]=![],![];return this[_0x429bf9(0x5ff)]=!![],!![];},Window_EventLabel['prototype']['opacitySpeed']=function(){const _0x110b5f=_0x116828;return VisuMZ[_0x110b5f(0x3d8)][_0x110b5f(0x256)][_0x110b5f(0x258)][_0x110b5f(0x465)];},Window_EventLabel['prototype'][_0x116828(0x2b6)]=function(){const _0x4b1cdc=_0x116828,_0xe13571=this[_0x4b1cdc(0x427)](this['_text']);this[_0x4b1cdc(0x34b)]=_0xe13571[_0x4b1cdc(0x34b)]+($gameSystem[_0x4b1cdc(0x56c)]()+this['itemPadding']())*0x2,this[_0x4b1cdc(0x4b2)]=Math[_0x4b1cdc(0x37e)](this[_0x4b1cdc(0x41c)](),_0xe13571[_0x4b1cdc(0x4b2)])+$gameSystem[_0x4b1cdc(0x56c)]()*0x2,this[_0x4b1cdc(0x24a)]();},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x41c)]=function(){const _0x4038ea=_0x116828;return VisuMZ[_0x4038ea(0x3d8)]['Settings']['Label'][_0x4038ea(0x560)];},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x61d)]=function(){const _0x293a1a=_0x116828;Window_Base['prototype'][_0x293a1a(0x61d)][_0x293a1a(0x176)](this),this[_0x293a1a(0x26e)][_0x293a1a(0x2f2)]=this[_0x293a1a(0x621)]();},Window_EventLabel['prototype'][_0x116828(0x621)]=function(){const _0x32288d=_0x116828;return VisuMZ['EventsMoveCore'][_0x32288d(0x256)][_0x32288d(0x258)][_0x32288d(0x5dc)];},Window_EventLabel['prototype'][_0x116828(0x51c)]=function(){const _0x16f1b3=_0x116828;this[_0x16f1b3(0x2b6)](),this[_0x16f1b3(0x26e)][_0x16f1b3(0x424)]();const _0x2d3e36=this[_0x16f1b3(0x529)][_0x16f1b3(0x1d0)](/[\r\n]+/);let _0x1dae40=0x0;for(const _0x152366 of _0x2d3e36){if('YZuLF'===_0x16f1b3(0x4ee))return!![];else{const _0x16dda7=this[_0x16f1b3(0x427)](_0x152366),_0x4c4ed1=Math[_0x16f1b3(0x2c6)]((this['innerWidth']-_0x16dda7['width'])/0x2);this[_0x16f1b3(0x385)](_0x152366,_0x4c4ed1,_0x1dae40),_0x1dae40+=_0x16dda7[_0x16f1b3(0x4b2)];}}},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x53a)]=function(_0x58fe23,_0x411420){const _0xc22cd8=_0x116828;_0x411420[_0xc22cd8(0x1f0)]&&this[_0xc22cd8(0x1be)](_0x58fe23,_0x411420['x']+0x2,_0x411420['y']),_0x411420['x']+=Math[_0xc22cd8(0x456)](this[_0xc22cd8(0x308)](),ImageManager[_0xc22cd8(0x263)])+0x4;},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x1be)]=function(_0x155d96,_0x1f77d5,_0xf6209b){const _0x4e2987=_0x116828,_0x4d62a0=ImageManager[_0x4e2987(0x5af)](_0x4e2987(0x25a)),_0x1f958b=ImageManager[_0x4e2987(0x263)],_0x14acaa=ImageManager[_0x4e2987(0x1f5)],_0x23de1b=_0x155d96%0x10*_0x1f958b,_0x378cfa=Math[_0x4e2987(0x2c6)](_0x155d96/0x10)*_0x14acaa,_0x50a8a9=Math['min'](this[_0x4e2987(0x308)]()),_0x2427e0=Math['min'](this[_0x4e2987(0x308)]());this['contents']['blt'](_0x4d62a0,_0x23de1b,_0x378cfa,_0x1f958b,_0x14acaa,_0x1f77d5,_0xf6209b,_0x50a8a9,_0x2427e0);},Window_EventLabel[_0x116828(0x29b)][_0x116828(0x308)]=function(){const _0x1786ed=_0x116828;return VisuMZ[_0x1786ed(0x3d8)][_0x1786ed(0x256)][_0x1786ed(0x258)][_0x1786ed(0x4d2)];};