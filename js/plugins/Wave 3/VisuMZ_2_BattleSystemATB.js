//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.17] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   Face Name:
 *   - This is the filename for the target face graphic.
 * 
 *   Face Index:
 *   - This is the index for the target face graphic.
 * 
 * ---
 *
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 * 
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
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
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 * 
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 * 
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 * 
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 * 
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 * 
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 * 
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
 * @default true
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
 * @param BattleSystemATB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"false","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default false
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Marker Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 1
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x22a58d=_0x1eba;(function(_0x5bb352,_0x532b2a){const _0xf3585d=_0x1eba,_0x4ea612=_0x5bb352();while(!![]){try{const _0x2706f1=-parseInt(_0xf3585d(0x1b9))/0x1+parseInt(_0xf3585d(0x13a))/0x2*(parseInt(_0xf3585d(0x121))/0x3)+-parseInt(_0xf3585d(0x2aa))/0x4+parseInt(_0xf3585d(0x2b5))/0x5+-parseInt(_0xf3585d(0x13f))/0x6+parseInt(_0xf3585d(0x1d5))/0x7+-parseInt(_0xf3585d(0x1d0))/0x8*(-parseInt(_0xf3585d(0x147))/0x9);if(_0x2706f1===_0x532b2a)break;else _0x4ea612['push'](_0x4ea612['shift']());}catch(_0x1375e4){_0x4ea612['push'](_0x4ea612['shift']());}}}(_0x45d4,0x3d5c3));var label=_0x22a58d(0x199),tier=tier||0x0,dependencies=[_0x22a58d(0x1c3)],pluginData=$plugins['filter'](function(_0x1558f4){const _0x324b4b=_0x22a58d;return _0x1558f4[_0x324b4b(0x1bb)]&&_0x1558f4['description'][_0x324b4b(0x165)]('['+label+']');})[0x0];VisuMZ[label][_0x22a58d(0x1b2)]=VisuMZ[label][_0x22a58d(0x1b2)]||{},VisuMZ['ConvertParams']=function(_0x3a4220,_0x3e32d5){const _0x31dc0b=_0x22a58d;for(const _0x2ccf54 in _0x3e32d5){if(_0x31dc0b(0x168)!==_0x31dc0b(0x168))_0x4b71ce[_0x31dc0b(0x199)][_0x31dc0b(0x258)][_0x31dc0b(0x21f)](this),this['applyGlobalBattleSystemATBEffects']();else{if(_0x2ccf54['match'](/(.*):(.*)/i)){if('uYVBL'===_0x31dc0b(0x18e))this[_0x31dc0b(0x21e)]>=this[_0x31dc0b(0x166)]()&&(this[_0x31dc0b(0x282)]=_0x31dc0b(0x146));else{const _0x5a5d48=String(RegExp['$1']),_0x119ddf=String(RegExp['$2'])['toUpperCase']()[_0x31dc0b(0x29d)]();let _0xc3d2e6,_0x344059,_0xccd987;switch(_0x119ddf){case _0x31dc0b(0x171):_0xc3d2e6=_0x3e32d5[_0x2ccf54]!==''?Number(_0x3e32d5[_0x2ccf54]):0x0;break;case _0x31dc0b(0xfb):_0x344059=_0x3e32d5[_0x2ccf54]!==''?JSON['parse'](_0x3e32d5[_0x2ccf54]):[],_0xc3d2e6=_0x344059[_0x31dc0b(0x124)](_0x25758c=>Number(_0x25758c));break;case _0x31dc0b(0x288):_0xc3d2e6=_0x3e32d5[_0x2ccf54]!==''?eval(_0x3e32d5[_0x2ccf54]):null;break;case'ARRAYEVAL':_0x344059=_0x3e32d5[_0x2ccf54]!==''?JSON[_0x31dc0b(0x1ed)](_0x3e32d5[_0x2ccf54]):[],_0xc3d2e6=_0x344059[_0x31dc0b(0x124)](_0x2dd9ee=>eval(_0x2dd9ee));break;case _0x31dc0b(0x111):_0xc3d2e6=_0x3e32d5[_0x2ccf54]!==''?JSON[_0x31dc0b(0x1ed)](_0x3e32d5[_0x2ccf54]):'';break;case'ARRAYJSON':_0x344059=_0x3e32d5[_0x2ccf54]!==''?JSON['parse'](_0x3e32d5[_0x2ccf54]):[],_0xc3d2e6=_0x344059[_0x31dc0b(0x124)](_0x11c032=>JSON[_0x31dc0b(0x1ed)](_0x11c032));break;case _0x31dc0b(0x1e5):_0xc3d2e6=_0x3e32d5[_0x2ccf54]!==''?new Function(JSON[_0x31dc0b(0x1ed)](_0x3e32d5[_0x2ccf54])):new Function('return\x200');break;case _0x31dc0b(0x140):_0x344059=_0x3e32d5[_0x2ccf54]!==''?JSON[_0x31dc0b(0x1ed)](_0x3e32d5[_0x2ccf54]):[],_0xc3d2e6=_0x344059[_0x31dc0b(0x124)](_0x3eeffa=>new Function(JSON[_0x31dc0b(0x1ed)](_0x3eeffa)));break;case _0x31dc0b(0xea):_0xc3d2e6=_0x3e32d5[_0x2ccf54]!==''?String(_0x3e32d5[_0x2ccf54]):'';break;case'ARRAYSTR':_0x344059=_0x3e32d5[_0x2ccf54]!==''?JSON[_0x31dc0b(0x1ed)](_0x3e32d5[_0x2ccf54]):[],_0xc3d2e6=_0x344059['map'](_0x107d95=>String(_0x107d95));break;case _0x31dc0b(0x107):_0xccd987=_0x3e32d5[_0x2ccf54]!==''?JSON[_0x31dc0b(0x1ed)](_0x3e32d5[_0x2ccf54]):{},_0xc3d2e6=VisuMZ[_0x31dc0b(0x298)]({},_0xccd987);break;case _0x31dc0b(0x266):_0x344059=_0x3e32d5[_0x2ccf54]!==''?JSON[_0x31dc0b(0x1ed)](_0x3e32d5[_0x2ccf54]):[],_0xc3d2e6=_0x344059[_0x31dc0b(0x124)](_0x34c5b0=>VisuMZ[_0x31dc0b(0x298)]({},JSON[_0x31dc0b(0x1ed)](_0x34c5b0)));break;default:continue;}_0x3a4220[_0x5a5d48]=_0xc3d2e6;}}}}return _0x3a4220;},(_0x17a67c=>{const _0x165c7e=_0x22a58d,_0x297733=_0x17a67c[_0x165c7e(0x1b1)];for(const _0x8f4b8f of dependencies){if(!Imported[_0x8f4b8f]){if('SBzSI'!==_0x165c7e(0x1a9)){alert(_0x165c7e(0x11c)['format'](_0x297733,_0x8f4b8f)),SceneManager[_0x165c7e(0x167)]();break;}else{let _0x2cf08c=_0x1d1e14['BattleSystemATB'][_0x165c7e(0x179)][_0x165c7e(0x21f)](this);const _0x3f0868=_0x443262[_0x165c7e(0x199)][_0x165c7e(0x1b2)];if(_0x3f0868[_0x165c7e(0x1fb)][_0x165c7e(0x209)]&&_0x3f0868['Options'][_0x165c7e(0x1cf)]&&_0x1ca955[_0x165c7e(0x148)]())_0x2cf08c++;return _0x2cf08c;}}}const _0x74efd7=_0x17a67c['description'];if(_0x74efd7[_0x165c7e(0x261)](/\[Version[ ](.*?)\]/i)){if(_0x165c7e(0x22c)===_0x165c7e(0x1ce))return _0x133a9e[_0x165c7e(0x148)]()?this[_0x165c7e(0x243)]():_0x35cff4[_0x165c7e(0x199)][_0x165c7e(0x12d)][_0x165c7e(0x21f)](this);else{const _0xee14d=Number(RegExp['$1']);if(_0xee14d!==VisuMZ[label][_0x165c7e(0x228)]){if('uxfGx'!==_0x165c7e(0x16b))alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x165c7e(0x115)](_0x297733,_0xee14d)),SceneManager[_0x165c7e(0x167)]();else return _0x54cda0[_0x165c7e(0x283)]()[this['_index']];}}}if(_0x74efd7[_0x165c7e(0x261)](/\[Tier[ ](\d+)\]/i)){const _0x27d5ad=Number(RegExp['$1']);_0x27d5ad<tier?(alert(_0x165c7e(0x123)[_0x165c7e(0x115)](_0x297733,_0x27d5ad,tier)),SceneManager[_0x165c7e(0x167)]()):tier=Math[_0x165c7e(0x189)](_0x27d5ad,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x165c7e(0x1b2)],_0x17a67c[_0x165c7e(0x1c2)]);})(pluginData),PluginManager[_0x22a58d(0x144)](pluginData[_0x22a58d(0x1b1)],'FieldGaugeActorIcon',_0x5b1828=>{const _0x45bb8a=_0x22a58d;VisuMZ['ConvertParams'](_0x5b1828,_0x5b1828);const _0x178dcd=_0x5b1828[_0x45bb8a(0x20c)],_0x24c156=_0x5b1828[_0x45bb8a(0x284)];for(const _0xdbd72a of _0x178dcd){if(_0x45bb8a(0x1a1)!==_0x45bb8a(0x136)){const _0x100da0=$gameActors[_0x45bb8a(0x138)](_0xdbd72a);if(!_0x100da0)continue;_0x100da0[_0x45bb8a(0x20e)]=_0x45bb8a(0x231),_0x100da0[_0x45bb8a(0x127)]=_0x24c156;}else return _0x41ecaf['x']-_0xea5fd4['x'];}}),PluginManager[_0x22a58d(0x144)](pluginData[_0x22a58d(0x1b1)],_0x22a58d(0x133),_0x28b57a=>{const _0x8bdf99=_0x22a58d;VisuMZ[_0x8bdf99(0x298)](_0x28b57a,_0x28b57a);const _0x5addc9=_0x28b57a['Actors'],_0x4ae113=_0x28b57a['FaceName'],_0x4d1aad=_0x28b57a[_0x8bdf99(0x142)];for(const _0x39d262 of _0x5addc9){const _0x2a3963=$gameActors[_0x8bdf99(0x138)](_0x39d262);if(!_0x2a3963)continue;_0x2a3963[_0x8bdf99(0x20e)]=_0x8bdf99(0x19f),_0x2a3963['_fieldAtbGaugeFaceName']=_0x4ae113,_0x2a3963[_0x8bdf99(0x1d9)]=_0x4d1aad;}}),PluginManager[_0x22a58d(0x144)](pluginData[_0x22a58d(0x1b1)],_0x22a58d(0x103),_0x45914d=>{const _0x500798=_0x22a58d;VisuMZ['ConvertParams'](_0x45914d,_0x45914d);const _0x4ccdd1=_0x45914d[_0x500798(0x20c)];for(const _0x181466 of _0x4ccdd1){const _0x2841d4=$gameActors[_0x500798(0x138)](_0x181466);if(!_0x2841d4)continue;_0x2841d4['clearFieldAtbGraphics']();}}),PluginManager['registerCommand'](pluginData[_0x22a58d(0x1b1)],_0x22a58d(0x1e7),_0x1bf45d=>{const _0x573f48=_0x22a58d;VisuMZ[_0x573f48(0x298)](_0x1bf45d,_0x1bf45d);const _0xfe8d3e=_0x1bf45d['Enemies'],_0x204c94=_0x1bf45d[_0x573f48(0x284)];for(const _0x21ebbc of _0xfe8d3e){const _0x4f646b=$gameTroop['members']()[_0x21ebbc];if(!_0x4f646b)continue;_0x4f646b[_0x573f48(0x20e)]=_0x573f48(0x231),_0x4f646b['_fieldAtbGaugeIconIndex']=_0x204c94;}}),PluginManager[_0x22a58d(0x144)](pluginData[_0x22a58d(0x1b1)],_0x22a58d(0x15c),_0xd9592e=>{const _0x102d5b=_0x22a58d;VisuMZ[_0x102d5b(0x298)](_0xd9592e,_0xd9592e);const _0x5956e4=_0xd9592e[_0x102d5b(0x25f)],_0x116cf9=_0xd9592e[_0x102d5b(0xd9)],_0x17f188=_0xd9592e[_0x102d5b(0x142)];for(const _0x81d126 of _0x5956e4){const _0x333b69=$gameTroop[_0x102d5b(0x283)]()[_0x81d126];if(!_0x333b69)continue;_0x333b69[_0x102d5b(0x20e)]=_0x102d5b(0x19f),_0x333b69[_0x102d5b(0x17a)]=_0x116cf9,_0x333b69['_fieldAtbGaugeFaceIndex']=_0x17f188;}}),PluginManager[_0x22a58d(0x144)](pluginData[_0x22a58d(0x1b1)],_0x22a58d(0x1c5),_0x4a0b11=>{const _0x3862df=_0x22a58d;VisuMZ[_0x3862df(0x298)](_0x4a0b11,_0x4a0b11);const _0x2611cb=_0x4a0b11[_0x3862df(0x25f)];for(const _0x4bc5dd of _0x2611cb){const _0x360e15=$gameTroop[_0x3862df(0x283)]()[_0x4bc5dd];if(!_0x360e15)continue;_0x360e15[_0x3862df(0x1b3)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x22a58d(0x1a0),_0x489dff=>{const _0x395e3f=_0x22a58d;VisuMZ[_0x395e3f(0x298)](_0x489dff,_0x489dff);const _0x23a062=_0x489dff[_0x395e3f(0xc4)];$gameSystem[_0x395e3f(0x152)](_0x23a062);}),VisuMZ['BattleSystemATB'][_0x22a58d(0x1bc)]=Scene_Boot[_0x22a58d(0x256)][_0x22a58d(0x183)],Scene_Boot[_0x22a58d(0x256)][_0x22a58d(0x183)]=function(){const _0x3f9463=_0x22a58d;this[_0x3f9463(0xfe)](),VisuMZ[_0x3f9463(0x199)][_0x3f9463(0x1bc)][_0x3f9463(0x21f)](this),this[_0x3f9463(0x276)]();},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x164)]={},Scene_Boot[_0x22a58d(0x256)][_0x22a58d(0xfe)]=function(){const _0x2b60db=_0x22a58d,_0x531ef3=VisuMZ[_0x2b60db(0x102)][_0x2b60db(0x164)],_0x1f1730='<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>',_0xd6167d=[_0x2b60db(0x143),_0x2b60db(0xde),_0x2b60db(0x289)];for(const _0x4a8153 of _0xd6167d){const _0x4758d9=_0x1f1730[_0x2b60db(0x115)](_0x4a8153[_0x2b60db(0x24f)]()[_0x2b60db(0x29d)](),_0x2b60db(0x2a9),_0x2b60db(0x252)),_0x35ca3e=new RegExp(_0x4758d9,'i');VisuMZ[_0x2b60db(0x199)][_0x2b60db(0x164)][_0x4a8153]=_0x35ca3e;}},Scene_Boot[_0x22a58d(0x256)][_0x22a58d(0x276)]=function(){const _0x33efdc=_0x22a58d;if(VisuMZ[_0x33efdc(0x28a)])return;const _0x26ff3a=$dataSkills['concat']($dataItems);for(const _0x5ddd34 of _0x26ff3a){if(_0x33efdc(0x1be)!==_0x33efdc(0x1be))_0x125778[_0x33efdc(0x256)][_0x33efdc(0x229)][_0x33efdc(0x21f)](this),this['updatePosition'](),this[_0x33efdc(0x198)](),this['updateVisibility']();else{if(!_0x5ddd34)continue;VisuMZ[_0x33efdc(0x199)][_0x33efdc(0x23f)](_0x5ddd34);}}},VisuMZ[_0x22a58d(0x199)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x22a58d(0xef)]=function(_0x139ec6){const _0x227937=_0x22a58d;VisuMZ[_0x227937(0x199)][_0x227937(0xef)][_0x227937(0x21f)](this,_0x139ec6),VisuMZ[_0x227937(0x199)][_0x227937(0x23f)](_0x139ec6);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x22f)]=VisuMZ[_0x22a58d(0x22f)],VisuMZ[_0x22a58d(0x22f)]=function(_0x4edafd){const _0xa95af7=_0x22a58d;VisuMZ[_0xa95af7(0x199)][_0xa95af7(0x22f)]['call'](this,_0x4edafd),VisuMZ['BattleSystemATB']['Parse_Notetags_CreateJS'](_0x4edafd);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x23f)]=function(_0x74dd77){const _0x4373cb=_0x22a58d,_0x425f89=['Charge',_0x4373cb(0xde),_0x4373cb(0x289)];for(const _0x2111d3 of _0x425f89){VisuMZ[_0x4373cb(0x199)][_0x4373cb(0x27d)](_0x74dd77,_0x2111d3);}},VisuMZ[_0x22a58d(0x199)]['JS']={},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x27d)]=function(_0x27b1e1,_0x44d393){const _0x2d86c2=_0x22a58d,_0x4b5835=_0x27b1e1[_0x2d86c2(0x29e)];if(_0x4b5835[_0x2d86c2(0x261)](VisuMZ[_0x2d86c2(0x199)][_0x2d86c2(0x164)][_0x44d393])){if('tvwdJ'!==_0x2d86c2(0x1dc))_0x7a485d=_0x3c6c06-0x1,_0x26e795=_0x30e40a-0x3-_0x51ba55,_0x27c7a4['gradientFillRect'](0x1,0x1,_0x5f2fd0,_0x1f0bd2-0x2,_0x3af1ef,_0x26b08d,![]),_0x3e37b7['gradientFillRect'](0x2+_0x4c2b5e,0x1,_0x5a1fb6,_0x152903-0x2,_0x3572c4,_0x2f9223,![]);else{const _0x37f9ce=String(RegExp['$1']),_0x4bbcbe='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2d86c2(0x115)](_0x37f9ce,_0x44d393),_0x2e20f7=VisuMZ[_0x2d86c2(0x199)]['createKeyJS'](_0x27b1e1,_0x44d393);VisuMZ[_0x2d86c2(0x199)]['JS'][_0x2e20f7]=new Function(_0x4bbcbe);}}},VisuMZ['BattleSystemATB'][_0x22a58d(0xcd)]=function(_0x2190b2,_0x29ea48){const _0x1e31fd=_0x22a58d;let _0x28c135='';if($dataActors[_0x1e31fd(0x165)](_0x2190b2))_0x28c135=_0x1e31fd(0x23e)[_0x1e31fd(0x115)](_0x2190b2['id'],_0x29ea48);if($dataClasses[_0x1e31fd(0x165)](_0x2190b2))_0x28c135=_0x1e31fd(0x217)[_0x1e31fd(0x115)](_0x2190b2['id'],_0x29ea48);if($dataSkills[_0x1e31fd(0x165)](_0x2190b2))_0x28c135=_0x1e31fd(0x116)[_0x1e31fd(0x115)](_0x2190b2['id'],_0x29ea48);if($dataItems[_0x1e31fd(0x165)](_0x2190b2))_0x28c135=_0x1e31fd(0x1c9)[_0x1e31fd(0x115)](_0x2190b2['id'],_0x29ea48);if($dataWeapons[_0x1e31fd(0x165)](_0x2190b2))_0x28c135=_0x1e31fd(0xc7)['format'](_0x2190b2['id'],_0x29ea48);if($dataArmors[_0x1e31fd(0x165)](_0x2190b2))_0x28c135=_0x1e31fd(0x227)[_0x1e31fd(0x115)](_0x2190b2['id'],_0x29ea48);if($dataEnemies[_0x1e31fd(0x165)](_0x2190b2))_0x28c135=_0x1e31fd(0x1a6)['format'](_0x2190b2['id'],_0x29ea48);if($dataStates[_0x1e31fd(0x165)](_0x2190b2))_0x28c135=_0x1e31fd(0x2df)[_0x1e31fd(0x115)](_0x2190b2['id'],_0x29ea48);return _0x28c135;},ConfigManager[_0x22a58d(0x22b)]=!![],VisuMZ[_0x22a58d(0x199)][_0x22a58d(0xdd)]=ConfigManager[_0x22a58d(0x195)],ConfigManager[_0x22a58d(0x195)]=function(){const _0x41ac9c=_0x22a58d,_0x3a0d7a=VisuMZ['BattleSystemATB'][_0x41ac9c(0xdd)][_0x41ac9c(0x21f)](this);return _0x3a0d7a[_0x41ac9c(0x22b)]=this['visualAtbGauge'],_0x3a0d7a;},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x2af)]=ConfigManager[_0x22a58d(0x114)],ConfigManager[_0x22a58d(0x114)]=function(_0xdf4104){const _0x134751=_0x22a58d;VisuMZ[_0x134751(0x199)]['ConfigManager_applyData'][_0x134751(0x21f)](this,_0xdf4104),_0x134751(0x22b)in _0xdf4104?this[_0x134751(0x22b)]=_0xdf4104['visualAtbGauge']:this['visualAtbGauge']=!![];},ImageManager[_0x22a58d(0xd8)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x22a58d(0x1cb)]=ImageManager[_0x22a58d(0x1cb)]||0x6,TextManager[_0x22a58d(0x22b)]=VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x1b2)]['Options'][_0x22a58d(0x120)],VisuMZ[_0x22a58d(0x199)]['ColorManager_loadWindowskin']=ColorManager[_0x22a58d(0x24c)],ColorManager[_0x22a58d(0x24c)]=function(){const _0x228d63=_0x22a58d;VisuMZ['BattleSystemATB'][_0x228d63(0x155)][_0x228d63(0x21f)](this),this[_0x228d63(0x213)][_0x228d63(0x257)](this[_0x228d63(0x1d8)]['bind'](this));},ColorManager['getColor']=function(_0x2ce151){const _0x10b029=_0x22a58d;return _0x2ce151=String(_0x2ce151),_0x2ce151[_0x10b029(0x261)](/#(.*)/i)?_0x10b029(0x27b)[_0x10b029(0x115)](String(RegExp['$1'])):this[_0x10b029(0x15a)](Number(_0x2ce151));},ColorManager['setupBattleSystemATBColors']=function(){const _0x4cb115=_0x22a58d,_0x459ad1=['default',_0x4cb115(0xe4),_0x4cb115(0x218),_0x4cb115(0x1f3),_0x4cb115(0x1b4),_0x4cb115(0xe1)],_0x37377a=VisuMZ[_0x4cb115(0x199)][_0x4cb115(0x1b2)][_0x4cb115(0x113)];this[_0x4cb115(0x15f)]={};for(const _0x21ce6e of _0x459ad1){for(let _0x550ae3=0x1;_0x550ae3<=0x2;_0x550ae3++){const _0x556477=_0x21ce6e+_0x550ae3;this[_0x4cb115(0x15f)][_0x556477]=this[_0x4cb115(0x223)](_0x37377a[_0x556477]);}}},ColorManager['atbColor']=function(_0xe2228){const _0x364704=_0x22a58d;if(this[_0x364704(0x15f)]===undefined)this[_0x364704(0x1d8)]();return this[_0x364704(0x15f)][_0xe2228]||_0x364704(0x13e);},SceneManager['isSceneBattle']=function(){const _0x5d88f5=_0x22a58d;return this['_scene']&&this[_0x5d88f5(0x1e2)][_0x5d88f5(0x19b)]===Scene_Battle;},BattleManager[_0x22a58d(0x148)]=function(){const _0x51d548=_0x22a58d;if(Imported[_0x51d548(0xca)]&&this[_0x51d548(0x2cf)]()){if(_0x51d548(0x101)!==_0x51d548(0x2b6))return![];else{const _0x5224e5=_0xcdd88[_0x51d548(0x1b2)],_0x19d59a=_0x5224e5['MarkerSize'];this['_graphicSprite'][_0x51d548(0x2a3)]=new _0x5adbe0(_0x19d59a,_0x19d59a);const _0x45e1b4=this[_0x51d548(0x134)]['bitmap'],_0x5188e8=this[_0x51d548(0x11b)][_0x51d548(0x261)](/\$/i),_0x212fd9=_0x5188e8?0x1:_0x501288[_0x51d548(0xd8)],_0x2004dc=_0x5188e8?0x1:_0x2c30fb['svActorVertCells'],_0x19c767=_0x2a066a[_0x51d548(0x19c)]/_0x212fd9,_0xab2c50=_0x49b33f[_0x51d548(0x287)]/_0x2004dc,_0x53810b=_0x406321['min'](0x1,_0x19d59a/_0x19c767,_0x19d59a/_0xab2c50),_0x1d0d36=_0x19c767*_0x53810b,_0x15cd97=_0xab2c50*_0x53810b,_0x4af418=_0x55da7a[_0x51d548(0x1fd)]((_0x19d59a-_0x1d0d36)/0x2),_0xadbf41=_0x247a3b[_0x51d548(0x1fd)]((_0x19d59a-_0x15cd97)/0x2);_0x45e1b4[_0x51d548(0x174)](_0x487fe5,0x0,0x0,_0x19c767,_0xab2c50,_0x4af418,_0xadbf41,_0x1d0d36,_0x15cd97);}}return this[_0x51d548(0x23c)]();},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x135)]=BattleManager[_0x22a58d(0x188)],BattleManager[_0x22a58d(0x188)]=function(){const _0x4fb6c1=_0x22a58d;if(!this[_0x4fb6c1(0x23c)]()){if(_0x4fb6c1(0x1ac)===_0x4fb6c1(0x110))this[_0x4fb6c1(0x268)](...arguments);else return![];}else return ConfigManager&&ConfigManager['atbActive']!==undefined?ConfigManager[_0x4fb6c1(0x259)]:VisuMZ[_0x4fb6c1(0x199)][_0x4fb6c1(0x135)][_0x4fb6c1(0x21f)](this);},VisuMZ['BattleSystemATB']['Game_System_initialize']=Game_System[_0x22a58d(0x256)]['initialize'],Game_System['prototype'][_0x22a58d(0x268)]=function(){const _0x3eab62=_0x22a58d;VisuMZ['BattleSystemATB']['Game_System_initialize'][_0x3eab62(0x21f)](this),this[_0x3eab62(0x10a)]();},Game_System['prototype'][_0x22a58d(0x10a)]=function(){this['_atbFieldGaugeVisible']=!![];},Game_System['prototype']['isBattleSystemATBFieldGaugeVisible']=function(){const _0x831287=_0x22a58d;if(this[_0x831287(0x190)]===undefined){if(_0x831287(0x17c)!==_0x831287(0x17c))return this[_0x831287(0x17a)]===_0x2ffbaf&&(this[_0x831287(0x17a)]=this[_0x831287(0x108)]()),this[_0x831287(0x17a)];else this[_0x831287(0x10a)]();}return this['_atbFieldGaugeVisible'];},Game_System[_0x22a58d(0x256)][_0x22a58d(0x152)]=function(_0x27c0c0){const _0x3f916d=_0x22a58d;if(this['_atbFieldGaugeVisible']===undefined){if(_0x3f916d(0x1c0)!==_0x3f916d(0x182))this['initBattleSystemATB']();else return this['_battler']['isAtbCastingState']()?_0x3d56d3[_0x3f916d(0x189)](this[_0x3f916d(0x14b)][_0x3f916d(0x166)](),0x1):_0x1ee0a7[_0x3f916d(0x199)]['Sprite_Gauge_currentMaxValue'][_0x3f916d(0x21f)](this);}this['_atbFieldGaugeVisible']=_0x27c0c0;},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x1db)]=Game_Action[_0x22a58d(0x256)]['applyItemUserEffect'],Game_Action[_0x22a58d(0x256)][_0x22a58d(0x10d)]=function(_0x49695b){const _0x4c8ed2=_0x22a58d;VisuMZ['BattleSystemATB'][_0x4c8ed2(0x1db)][_0x4c8ed2(0x21f)](this,_0x49695b),this[_0x4c8ed2(0x2b1)](_0x49695b);},Game_Action[_0x22a58d(0x256)][_0x22a58d(0x2b1)]=function(_0x2b3b37){const _0x30a3bc=_0x22a58d;if(!SceneManager[_0x30a3bc(0x2ae)]())return;if(!BattleManager['isATB']())return;if(this[_0x30a3bc(0x145)]())this['applyItemBattleSystemATBUserEffect'](_0x2b3b37);},Game_Action['prototype'][_0x22a58d(0x25b)]=function(_0x8b68c4){const _0x498cde=_0x22a58d,_0x3dc2d3=this[_0x498cde(0x145)]()[_0x498cde(0x29e)];if(_0x8b68c4[_0x498cde(0x2dc)]()){const _0x46e956=VisuMZ['BattleSystemATB'][_0x498cde(0xcd)](this['item'](),_0x498cde(0x143));if(VisuMZ[_0x498cde(0x199)]['JS'][_0x46e956]){if(_0x498cde(0x1c8)!==_0x498cde(0x1b0)){const _0x456730=VisuMZ['BattleSystemATB']['JS'][_0x46e956]['call'](this,this[_0x498cde(0x193)](),_0x8b68c4);_0x8b68c4[_0x498cde(0x162)](_0x456730);}else _0x54e102[_0x498cde(0x199)][_0x498cde(0x1b2)][_0x498cde(0x244)][_0x498cde(0x250)]&&this[_0x498cde(0x1e1)](),_0xae21a0[_0x498cde(0x199)]['Sprite_Enemy_createStateIconSprite'][_0x498cde(0x21f)](this);}_0x3dc2d3[_0x498cde(0x261)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&('kFDfC'!==_0x498cde(0x2cc)?this[_0x498cde(0x127)]=_0x58ac4a:_0x8b68c4[_0x498cde(0x162)](Number(RegExp['$1'])*0.01));if(_0x3dc2d3[_0x498cde(0x261)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x498cde(0x12b)===_0x498cde(0x106)){if(!_0x5bdeb1[_0x498cde(0x148)]())return;if(!_0x134388[_0x498cde(0x22b)])return;const _0x40a26b=_0x33856d[_0x498cde(0x199)][_0x498cde(0x1b2)][_0x498cde(0x244)],_0x7a9330=new _0x3e565a();_0x7a9330[_0x498cde(0x22a)]['x']=_0x40a26b['AnchorX'],_0x7a9330[_0x498cde(0x22a)]['y']=_0x40a26b[_0x498cde(0x27a)],_0x7a9330[_0x498cde(0x1ab)]['x']=_0x7a9330[_0x498cde(0x1ab)]['y']=_0x40a26b[_0x498cde(0x241)],this[_0x498cde(0x21c)]=_0x7a9330,this[_0x498cde(0x28d)](this['_atbGaugeSprite']);}else _0x8b68c4[_0x498cde(0x2b7)](Number(RegExp['$1'])*0.01);}}else{if(_0x8b68c4[_0x498cde(0x18a)]()){if(_0x498cde(0x20d)===_0x498cde(0x20d)){const _0x466d19=VisuMZ['BattleSystemATB']['createKeyJS'](this[_0x498cde(0x145)](),_0x498cde(0xde));if(VisuMZ[_0x498cde(0x199)]['JS'][_0x466d19]){if(_0x498cde(0x221)===_0x498cde(0x221)){const _0x2539fd=VisuMZ[_0x498cde(0x199)]['JS'][_0x466d19][_0x498cde(0x21f)](this,this[_0x498cde(0x193)](),_0x8b68c4);_0x8b68c4[_0x498cde(0x2c9)](_0x2539fd);}else{const _0x3b3660=_0x192bee['BattleCore'][_0x498cde(0x164)],_0x19e2b4=_0x498cde(0x232),_0x53d92a=[_0x498cde(0x143),_0x498cde(0xde),_0x498cde(0x289)];for(const _0x5be3e5 of _0x53d92a){const _0x559efe=_0x19e2b4[_0x498cde(0x115)](_0x5be3e5['toUpperCase']()[_0x498cde(0x29d)](),'(?:ATB|TPB)',_0x498cde(0x252)),_0x211091=new _0x33fd93(_0x559efe,'i');_0x5ac1e5['BattleSystemATB'][_0x498cde(0x164)][_0x5be3e5]=_0x211091;}}}if(_0x3dc2d3[_0x498cde(0x261)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x498cde(0x109)!=='WNnbV'){if(!_0x11a24e[_0x498cde(0x1b2)][_0x498cde(0x269)])return;const _0x5d3a20=_0x39ffb4['Settings'],_0x27f510=this['_unit']===_0xdf427f?_0x498cde(0x12f):_0x498cde(0x12e),_0xdb65c2='%1SystemBorder'[_0x498cde(0x115)](_0x27f510),_0x25c368=new _0x4597e3();_0x25c368['anchor']['x']=this['anchor']['x'],_0x25c368['anchor']['y']=this[_0x498cde(0x22a)]['y'];if(_0x5d3a20[_0xdb65c2])_0x25c368[_0x498cde(0x2a3)]=_0x5258b1[_0x498cde(0x1d6)](_0x5d3a20[_0xdb65c2]);else{let _0x3e3c24=_0x5d3a20[_0x498cde(0x21d)],_0x1b83c4=_0x5d3a20[_0x498cde(0x13b)];_0x25c368[_0x498cde(0x2a3)]=new _0x3e529b(_0x3e3c24,_0x3e3c24);const _0x386bb7=_0x498cde(0x13e),_0x5cc71c=_0x4120e8['getColor'](_0x5d3a20['%1BorderColor'['format'](_0x27f510)]);_0x25c368[_0x498cde(0x2a3)][_0x498cde(0x299)](0x0,0x0,_0x3e3c24,_0x3e3c24,_0x386bb7),_0x3e3c24-=0x2,_0x25c368[_0x498cde(0x2a3)][_0x498cde(0x299)](0x1,0x1,_0x3e3c24,_0x3e3c24,_0x5cc71c),_0x3e3c24-=_0x1b83c4*0x2,_0x25c368[_0x498cde(0x2a3)][_0x498cde(0x299)](0x1+_0x1b83c4,0x1+_0x1b83c4,_0x3e3c24,_0x3e3c24,_0x386bb7),_0x3e3c24-=0x2,_0x1b83c4+=0x1,_0x25c368[_0x498cde(0x2a3)][_0x498cde(0x23a)](0x1+_0x1b83c4,0x1+_0x1b83c4,_0x3e3c24,_0x3e3c24);}this[_0x498cde(0x208)]=_0x25c368,this[_0x498cde(0x28d)](this[_0x498cde(0x208)]);}else _0x8b68c4['setAtbCastTime'](Number(RegExp['$1'])*0.01);}_0x3dc2d3[_0x498cde(0x261)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x8b68c4[_0x498cde(0x236)](Number(RegExp['$1'])*0.01),_0x3dc2d3[_0x498cde(0x261)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x8b68c4[_0x498cde(0x25e)]();}else return _0x3cdb08[_0x498cde(0x1b2)][_0x498cde(0x2c6)];}}},VisuMZ[_0x22a58d(0x199)]['Game_Action_applyGlobal']=Game_Action[_0x22a58d(0x256)][_0x22a58d(0x2b2)],Game_Action[_0x22a58d(0x256)][_0x22a58d(0x2b2)]=function(){const _0x56fe8a=_0x22a58d;VisuMZ['BattleSystemATB'][_0x56fe8a(0x258)][_0x56fe8a(0x21f)](this),this['applyGlobalBattleSystemATBEffects']();},Game_Action[_0x22a58d(0x256)][_0x22a58d(0x2a6)]=function(){const _0x5257aa=_0x22a58d;if(!this[_0x5257aa(0x145)]())return;if(!BattleManager[_0x5257aa(0x148)]())return;const _0x361c31=this['item']()[_0x5257aa(0x29e)];let _0x10b377=0x0;this['_forcing']&&(_0x5257aa(0x1b6)==='FhFTB'?(_0x56b65f=_0x9a7b7d-0x1,_0x1641ab=_0x4fd822-0x3-_0x2987e0,_0xf2ba96['gradientFillRect'](0x1,0x1,_0x182af1-0x2,_0x1a5f96,_0x19ce8a,_0x42af74,!![]),_0x438b31['gradientFillRect'](0x1,0x2+_0x4ecba8,_0xa75993-0x2,_0x27edac,_0x9a7739,_0x29d7b8,!![])):_0x10b377=this[_0x5257aa(0x193)]()['_tpbChargeTime']);const _0x37547d=VisuMZ[_0x5257aa(0x199)][_0x5257aa(0xcd)](this[_0x5257aa(0x145)](),_0x5257aa(0x289));VisuMZ[_0x5257aa(0x199)]['JS'][_0x37547d]&&(_0x10b377+=VisuMZ[_0x5257aa(0x199)]['JS'][_0x37547d][_0x5257aa(0x21f)](this,this['subject'](),this[_0x5257aa(0x193)]()));let _0x3e6af2=this['item']()[_0x5257aa(0x274)]>0x0?this['item']()['speed']:0x0;if(this[_0x5257aa(0x10e)]())_0x3e6af2+=this[_0x5257aa(0x193)]()[_0x5257aa(0x263)]();_0x10b377+=(_0x3e6af2/0xfa0)[_0x5257aa(0x184)](0x0,0x1);this['item']()[_0x5257aa(0x29e)][_0x5257aa(0x261)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x10b377+=Number(RegExp['$1'])*0.01);const _0x1a96af=this[_0x5257aa(0x193)]()[_0x5257aa(0xf0)]()[_0x5257aa(0x15d)](this[_0x5257aa(0x193)]()[_0x5257aa(0x2d6)]()),_0x526a88=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x2937c1=_0x1a96af[_0x5257aa(0x124)](_0x38b422=>_0x38b422&&_0x38b422[_0x5257aa(0x29e)][_0x5257aa(0x261)](_0x526a88)?Number(RegExp['$1'])*0.01:0x0);_0x10b377=_0x2937c1[_0x5257aa(0x24a)]((_0x52f847,_0x5a8fd9)=>_0x52f847+_0x5a8fd9,_0x10b377),this[_0x5257aa(0x145)]()[_0x5257aa(0x29e)]['match'](/<(?:ATB|TPB) INSTANT>/i)&&(_0x10b377=0xa),this[_0x5257aa(0x193)]()[_0x5257aa(0x2ce)](_0x10b377);},Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x162)]=function(_0x4664c2){const _0x42f36d=_0x22a58d;this[_0x42f36d(0x154)]=_0x4664c2['clamp'](0x0,0x1);},Game_BattlerBase['prototype'][_0x22a58d(0x2b7)]=function(_0x23490a){const _0x2f4317=_0x22a58d;this[_0x2f4317(0x162)](this[_0x2f4317(0x154)]+_0x23490a);},Game_BattlerBase['prototype'][_0x22a58d(0x2c9)]=function(_0x2f3d2f){const _0x2a265a=_0x22a58d,_0x406889=this[_0x2a265a(0x166)]();this['_tpbCastTime']=(_0x406889*_0x2f3d2f)['clamp'](0x0,_0x406889);},Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x236)]=function(_0x4242ef){const _0x2105cf=_0x22a58d,_0x508c85=this[_0x2105cf(0x166)](),_0x4807d6=_0x508c85*_0x4242ef;this[_0x2105cf(0x21e)]=(this['_tpbCastTime']+_0x4807d6)[_0x2105cf(0x184)](0x0,_0x508c85);},VisuMZ['BattleSystemATB'][_0x22a58d(0xfa)]=Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x1fa)],Game_BattlerBase[_0x22a58d(0x256)]['die']=function(){const _0x1c2f25=_0x22a58d;VisuMZ[_0x1c2f25(0x199)][_0x1c2f25(0xfa)]['call'](this),BattleManager[_0x1c2f25(0x23c)]()&&this[_0x1c2f25(0x181)]();},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0xc8)]=Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x26e)],Game_BattlerBase[_0x22a58d(0x256)]['revive']=function(){const _0x60ec69=_0x22a58d;VisuMZ[_0x60ec69(0x199)][_0x60ec69(0xc8)][_0x60ec69(0x21f)](this),BattleManager[_0x60ec69(0x23c)]()&&this[_0x60ec69(0x181)]();},VisuMZ['BattleSystemATB'][_0x22a58d(0xcb)]=Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x2a7)],Game_Battler['prototype'][_0x22a58d(0x2a7)]=function(_0xf66db0){const _0x4c5c76=_0x22a58d;BattleManager[_0x4c5c76(0x148)]()?this[_0x4c5c76(0x139)](_0xf66db0):VisuMZ[_0x4c5c76(0x199)][_0x4c5c76(0xcb)][_0x4c5c76(0x21f)](this,_0xf66db0);},Game_Battler['prototype']['initTpbChargeTimeATB']=function(_0x3c0ec0){const _0x242b77=_0x22a58d,_0x3a10b9=VisuMZ[_0x242b77(0x199)]['Settings']['Mechanics'];let _0x529ded=this[_0x242b77(0x2d3)]()*eval(_0x3a10b9['InitialGaugeJS']);const _0x5d6089=this[_0x242b77(0xf0)]()[_0x242b77(0x15d)](this[_0x242b77(0x2d6)]()),_0xb66cf4=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x20fbaf=_0x5d6089[_0x242b77(0x124)](_0x29db13=>_0x29db13&&_0x29db13[_0x242b77(0x29e)][_0x242b77(0x261)](_0xb66cf4)?Number(RegExp['$1'])*0.01:0x0);_0x529ded=_0x20fbaf['reduce']((_0x5c8dc9,_0x387a89)=>_0x5c8dc9+_0x387a89,_0x529ded),this[_0x242b77(0x282)]=_0x242b77(0x1d1),this[_0x242b77(0x154)]=(_0x3c0ec0?0x1:_0x529ded)[_0x242b77(0x184)](0x0,0x1);if(this[_0x242b77(0x14a)]()){if(_0x242b77(0x13d)!==_0x242b77(0x13d)){const _0x9bed49=_0x3e1d0a[_0x242b77(0x115)](_0x5590cf['toUpperCase']()[_0x242b77(0x29d)](),_0x242b77(0x2a9),'(?:GAUGE|TIME|SPEED)'),_0x396bb5=new _0x22d946(_0x9bed49,'i');_0x5673cd[_0x242b77(0x199)][_0x242b77(0x164)][_0x18fbc1]=_0x396bb5;}else this[_0x242b77(0x154)]=0x0;}},Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x2dc)]=function(){const _0x3824fb=_0x22a58d;return this[_0x3824fb(0x282)]==='charging';},Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x18a)]=function(){const _0x2aa820=_0x22a58d;return this['_tpbState']==='casting'&&this[_0x2aa820(0x1f9)]()&&this[_0x2aa820(0x1f9)]()[_0x2aa820(0x145)]()&&this[_0x2aa820(0x1f9)]()[_0x2aa820(0x145)]()[_0x2aa820(0x274)]<0x0;},Game_BattlerBase['prototype']['getAtbCastTimeRate']=function(){const _0x692641=_0x22a58d;if(this[_0x692641(0x18a)]()){if('ZgmpB'===_0x692641(0x1a7)){const _0xabc43d=this[_0x692641(0xf4)]()[_0x692641(0x29e)];if(_0xabc43d[_0x692641(0x261)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x487bab(_0x1f3125['$1']);return _0x5d23d5[_0x692641(0x1b2)]['EnemyBattlerFaceName'];}else return this[_0x692641(0x21e)]/this[_0x692641(0x166)]();}else return 0x0;},Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x130)]=function(){return!this['canMove']();},Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x2ce)]=function(_0x12c8cb){this['_atbAfterSpeed']=_0x12c8cb;},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x2be)]=Game_Battler['prototype'][_0x22a58d(0x181)],Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x181)]=function(){const _0x5baa23=_0x22a58d;if(this[_0x5baa23(0x156)])return;VisuMZ[_0x5baa23(0x199)][_0x5baa23(0x2be)][_0x5baa23(0x21f)](this),this[_0x5baa23(0x154)]+=this[_0x5baa23(0x17f)]||0x0;},Game_Battler['prototype'][_0x22a58d(0x25e)]=function(){const _0xd3a906=_0x22a58d;if(!this['isAtbCastingState']())return;if(!this['currentAction']())return;if(!this[_0xd3a906(0x1f9)]()['item']())return;if(this[_0xd3a906(0x1f9)]()[_0xd3a906(0x145)]()[_0xd3a906(0x29e)]['match'](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this['clearActions'](),this[_0xd3a906(0x181)](),this[_0xd3a906(0x21e)]=0x0,this[_0xd3a906(0x248)]();},Game_Battler[_0x22a58d(0x256)]['onAtbInterrupt']=function(){const _0x56ba02=_0x22a58d,_0x3a4ffa=VisuMZ['BattleSystemATB'][_0x56ba02(0x1b2)]['Interrupt'];if(Imported['VisuMZ_0_CoreEngine']){const _0x3d53c6=_0x3a4ffa[_0x56ba02(0x1c4)],_0x16e494=_0x3a4ffa['InterruptMirror'],_0x3c92ba=_0x3a4ffa[_0x56ba02(0x29a)];$gameTemp[_0x56ba02(0x253)]([this],_0x3d53c6,_0x16e494,_0x3c92ba);}if(this[_0x56ba02(0xf2)]()&&_0x3a4ffa['InterruptText'][_0x56ba02(0x1c6)]>0x0){if(_0x56ba02(0x17b)==='YxulX'){const _0xeb93ee=_0x3a4ffa[_0x56ba02(0x28b)],_0x2d86c8={'textColor':ColorManager['getColor'](_0x3a4ffa[_0x56ba02(0x1ff)]),'flashColor':_0x3a4ffa[_0x56ba02(0x1bd)],'flashDuration':_0x3a4ffa['InterruptFlashDuration']};this['setupTextPopup'](_0xeb93ee,_0x2d86c8);}else{const _0x1af802=_0x45bf39[_0x56ba02(0x199)]['JS'][_0xe7d3d9][_0x56ba02(0x21f)](this,this[_0x56ba02(0x193)](),_0x2fc9cd);_0x1d1056[_0x56ba02(0x162)](_0x1af802);}}},VisuMZ[_0x22a58d(0x199)]['Game_Battler_startTpbCasting']=Game_Battler['prototype']['startTpbCasting'],Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x18f)]=function(){const _0xef6ff0=_0x22a58d;VisuMZ[_0xef6ff0(0x199)][_0xef6ff0(0x290)][_0xef6ff0(0x21f)](this);if(BattleManager[_0xef6ff0(0x148)]()){if(this[_0xef6ff0(0x21e)]>=this['tpbRequiredCastTime']()){if(_0xef6ff0(0x196)!==_0xef6ff0(0x2d5))this[_0xef6ff0(0x282)]=_0xef6ff0(0x146);else return _0x4aa52a[_0xef6ff0(0x199)][_0xef6ff0(0xd0)][_0xef6ff0(0x21f)](this);}}},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x230)]=Game_Unit[_0x22a58d(0x256)][_0x22a58d(0x132)],Game_Unit[_0x22a58d(0x256)]['updateTpb']=function(){const _0x10a246=_0x22a58d;if(BattleManager['isATB']()){if(_0x10a246(0x172)===_0x10a246(0x172)){if(BattleManager[_0x10a246(0x2c0)]()['some'](_0x1c642d=>_0x1c642d&&_0x1c642d[_0x10a246(0x212)]()&&_0x1c642d[_0x10a246(0x24e)]()&&_0x1c642d['_tpbState']===_0x10a246(0x146)))return;}else this[_0x10a246(0x1cd)]=_0x44d416[_0x10a246(0x189)](_0x4b69e1,this['opacity']-_0x51d714);}VisuMZ[_0x10a246(0x199)]['Game_Unit_updateTpb'][_0x10a246(0x21f)](this);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x205)]=Game_Battler[_0x22a58d(0x256)]['onRestrict'],Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x169)]=function(){const _0x27ac04=_0x22a58d;!VisuMZ['BattleSystemATB'][_0x27ac04(0x1b2)]['Mechanics'][_0x27ac04(0x131)]&&('Nljaj'!==_0x27ac04(0x104)?this[_0x27ac04(0x156)]=BattleManager[_0x27ac04(0x148)]():(this[_0x27ac04(0xf6)]=new _0x368364(),this[_0x27ac04(0x28d)](this['_gaugeSprite']),this[_0x27ac04(0x2a4)]())),VisuMZ['BattleSystemATB'][_0x27ac04(0x205)][_0x27ac04(0x21f)](this),this['_onRestrictBypassAtbReset']=undefined;},VisuMZ[_0x22a58d(0x199)]['Game_Battler_applyTpbPenalty']=Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x281)],Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x281)]=function(){const _0x951c70=_0x22a58d;if(BattleManager[_0x951c70(0x148)]()){if(_0x951c70(0x1ea)!==_0x951c70(0x1ea))return _0x505381(_0x1e28cb['$1']);else this[_0x951c70(0x206)]();}else VisuMZ[_0x951c70(0x199)][_0x951c70(0x105)]['call'](this);},Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x206)]=function(){const _0x3b412b=_0x22a58d;this[_0x3b412b(0x282)]='charging',this['_tpbChargeTime']+=VisuMZ[_0x3b412b(0x199)][_0x3b412b(0x1b2)][_0x3b412b(0x2b3)][_0x3b412b(0x2c8)]||0x0;},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x1fe)]=Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x2c1)],Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x2c1)]=function(){const _0x4622e2=_0x22a58d;return BattleManager[_0x4622e2(0x148)]()?_0x4622e2(0x1cc)!=='nYFQP'?_0x398a4a[_0x4622e2(0x199)][_0x4622e2(0x12d)][_0x4622e2(0x21f)](this):VisuMZ[_0x4622e2(0x199)][_0x4622e2(0x1b2)][_0x4622e2(0x2b3)][_0x4622e2(0x26d)][_0x4622e2(0x21f)](this,this):VisuMZ[_0x4622e2(0x199)]['Game_Battler_tpbSpeed'][_0x4622e2(0x21f)](this);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x2da)]=Game_Battler['prototype'][_0x22a58d(0xe8)],Game_Battler[_0x22a58d(0x256)]['tpbBaseSpeed']=function(){const _0x52f50b=_0x22a58d;if(BattleManager[_0x52f50b(0x148)]())return VisuMZ[_0x52f50b(0x199)][_0x52f50b(0x1b2)][_0x52f50b(0x2b3)][_0x52f50b(0x200)][_0x52f50b(0x21f)](this,this);else{if(_0x52f50b(0x1c7)===_0x52f50b(0x2bb))_0x2662ef[_0x52f50b(0x21b)](_0x328621+_0x4fdf00,_0x10b587+_0x1d99ef+_0x5caeec,_0x412b32,_0x190a8e),_0x19b33['y']+=_0x21c619,_0xf2dc88[_0x52f50b(0x22a)]['y']=0x0;else return VisuMZ['BattleSystemATB'][_0x52f50b(0x2da)]['call'](this);}},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0xd0)]=Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x2d3)],Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x2d3)]=function(){const _0x2c1f42=_0x22a58d;return BattleManager['isATB']()?VisuMZ[_0x2c1f42(0x199)][_0x2c1f42(0x1b2)][_0x2c1f42(0x2b3)][_0x2c1f42(0x2ad)][_0x2c1f42(0x21f)](this,this):VisuMZ[_0x2c1f42(0x199)][_0x2c1f42(0xd0)][_0x2c1f42(0x21f)](this);},VisuMZ[_0x22a58d(0x199)]['Game_Battler_tpbAcceleration']=Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x23b)],Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x23b)]=function(){const _0x2d83c5=_0x22a58d;return BattleManager[_0x2d83c5(0x148)]()?this['atbAcceleration']():VisuMZ[_0x2d83c5(0x199)]['Game_Battler_tpbAcceleration'][_0x2d83c5(0x21f)](this);},Game_Battler[_0x22a58d(0x256)]['atbAcceleration']=function(){const _0x3602a8=_0x22a58d;let _0x5b03fe=VisuMZ['BattleSystemATB'][_0x3602a8(0x1b2)][_0x3602a8(0x2b3)]['TpbAccelerationJS'][_0x3602a8(0x21f)](this,this);if(ConfigManager&&ConfigManager[_0x3602a8(0x275)]!==undefined){const _0x2569e=ConfigManager[_0x3602a8(0x275)]-0x3;if(_0x2569e>0x0)return'ksJEg'===_0x3602a8(0x2ac)?_0x26f27c[_0x3602a8(0x199)][_0x3602a8(0x194)][_0x3602a8(0x21f)](this):_0x5b03fe*(_0x2569e*0x2);else{if(_0x2569e<0x0){if(_0x3602a8(0x201)===_0x3602a8(0x25c))_0x45bd48[_0x3602a8(0x199)][_0x3602a8(0xc8)]['call'](this),_0x1b56f3[_0x3602a8(0x23c)]()&&this[_0x3602a8(0x181)]();else return _0x5b03fe*(0x1/(_0x2569e*-0x2));}}}return _0x5b03fe;},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x194)]=Game_Battler['prototype'][_0x22a58d(0x166)],Game_Battler[_0x22a58d(0x256)][_0x22a58d(0x166)]=function(){const _0x1e0479=_0x22a58d;return BattleManager[_0x1e0479(0x148)]()?VisuMZ[_0x1e0479(0x199)][_0x1e0479(0x1b2)][_0x1e0479(0x2b3)][_0x1e0479(0x126)][_0x1e0479(0x21f)](this,this):VisuMZ[_0x1e0479(0x199)][_0x1e0479(0x194)][_0x1e0479(0x21f)](this);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x179)]=Scene_Options[_0x22a58d(0x256)]['maxCommands'],Scene_Options[_0x22a58d(0x256)][_0x22a58d(0x1f2)]=function(){const _0x1ce6ec=_0x22a58d;let _0x569bb1=VisuMZ[_0x1ce6ec(0x199)][_0x1ce6ec(0x179)][_0x1ce6ec(0x21f)](this);const _0x3e5603=VisuMZ[_0x1ce6ec(0x199)][_0x1ce6ec(0x1b2)];if(_0x3e5603[_0x1ce6ec(0x1fb)][_0x1ce6ec(0x209)]&&_0x3e5603[_0x1ce6ec(0x1fb)]['AdjustRect']&&BattleManager[_0x1ce6ec(0x148)]())_0x569bb1++;return _0x569bb1;},Sprite_Battler[_0x22a58d(0x256)][_0x22a58d(0x1e1)]=function(){const _0x329390=_0x22a58d;if(!BattleManager[_0x329390(0x148)]())return;if(!ConfigManager[_0x329390(0x22b)])return;const _0x8f4857=VisuMZ['BattleSystemATB'][_0x329390(0x1b2)][_0x329390(0x244)],_0x710b4b=new Sprite_Gauge();_0x710b4b[_0x329390(0x22a)]['x']=_0x8f4857[_0x329390(0x128)],_0x710b4b[_0x329390(0x22a)]['y']=_0x8f4857[_0x329390(0x27a)],_0x710b4b[_0x329390(0x1ab)]['x']=_0x710b4b[_0x329390(0x1ab)]['y']=_0x8f4857['Scale'],this[_0x329390(0x21c)]=_0x710b4b,this[_0x329390(0x28d)](this[_0x329390(0x21c)]);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x178)]=Sprite_Battler[_0x22a58d(0x256)]['setBattler'],Sprite_Battler[_0x22a58d(0x256)][_0x22a58d(0x225)]=function(_0x1bac28){const _0x8cd7f0=_0x22a58d;VisuMZ[_0x8cd7f0(0x199)][_0x8cd7f0(0x178)]['call'](this,_0x1bac28),this[_0x8cd7f0(0x2de)](_0x1bac28),this['updateAtbGaugeSpriteVisibility']();},Sprite_Battler['prototype'][_0x22a58d(0x2de)]=function(_0x2c8346){const _0x454909=_0x22a58d;if(!_0x2c8346)return;if(!this[_0x454909(0x21c)])return;if(_0x2c8346['isActor']()){}else{if(_0x2c8346[_0x454909(0x137)]()){if(this[_0x454909(0x19b)]===Sprite_Enemy&&_0x2c8346[_0x454909(0x272)]())return;if(this[_0x454909(0x19b)]===Sprite_SvEnemy&&!_0x2c8346[_0x454909(0x272)]())return;}}this['_atbGaugeSprite'][_0x454909(0x1b5)](_0x2c8346,_0x454909(0x16f));},Sprite_Battler[_0x22a58d(0x256)][_0x22a58d(0xe5)]=function(){const _0x2b119a=_0x22a58d;if(!this[_0x2b119a(0x21c)])return;const _0x2b3de4=this[_0x2b119a(0x14b)]&&this[_0x2b119a(0x14b)][_0x2b119a(0x24e)]()&&!this[_0x2b119a(0x14b)][_0x2b119a(0x24b)]();this[_0x2b119a(0x21c)][_0x2b119a(0x2d0)]=_0x2b3de4,this[_0x2b119a(0x1b8)]&&this[_0x2b119a(0x1b8)]['_atbGaugeSprite']&&(this['_svBattlerSprite'][_0x2b119a(0x21c)][_0x2b119a(0x2d0)]=_0x2b3de4);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x26a)]=Sprite_Battler[_0x22a58d(0x256)][_0x22a58d(0xda)],Sprite_Battler[_0x22a58d(0x256)][_0x22a58d(0xda)]=function(){const _0x1f31d2=_0x22a58d;VisuMZ[_0x1f31d2(0x199)]['Sprite_Battler_updateMain'][_0x1f31d2(0x21f)](this),this[_0x1f31d2(0x1d4)]();},Sprite_Battler[_0x22a58d(0x256)][_0x22a58d(0x1d4)]=function(){const _0x2efff8=_0x22a58d;if(!this['_battler'])return;if(!this[_0x2efff8(0x21c)])return;const _0x326ce5=VisuMZ[_0x2efff8(0x199)][_0x2efff8(0x1b2)][_0x2efff8(0x244)],_0x2d7608=this[_0x2efff8(0x21c)];let _0x468ff5=_0x326ce5['OffsetX'];this['_battler']['battleUIOffsetX']&&(_0x468ff5+=this[_0x2efff8(0x14b)][_0x2efff8(0xd4)]());let _0x204ce7=_0x326ce5['OffsetY'];this[_0x2efff8(0x14b)][_0x2efff8(0x186)]&&(_0x2efff8(0x234)===_0x2efff8(0x234)?_0x204ce7+=this[_0x2efff8(0x14b)][_0x2efff8(0x186)]():(this[_0x2efff8(0x20a)](),this['createGaugeSprite'](),this[_0x2efff8(0x191)]())),_0x2d7608['x']=_0x468ff5,_0x2d7608['y']=-this[_0x2efff8(0x287)]+_0x204ce7,this['_battler'][_0x2efff8(0x137)]()&&('hVFMv'===_0x2efff8(0x163)?(_0x311aac[_0x2efff8(0x199)][_0x2efff8(0x1d2)][_0x2efff8(0x21f)](this),!this[_0x2efff8(0x14b)]&&this[_0x2efff8(0x21c)]&&(this['_atbGaugeSprite'][_0x2efff8(0x2d0)]=![],this['_svBattlerSprite']&&(this[_0x2efff8(0x1b8)][_0x2efff8(0x21c)][_0x2efff8(0x2d0)]=![]))):this[_0x2efff8(0x14b)][_0x2efff8(0xf4)]()[_0x2efff8(0x29e)][_0x2efff8(0x261)](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0x2d7608['visible']=![])),this[_0x2efff8(0x2a0)]()&&(_0x2d7608['y']+=_0x2d7608[_0x2efff8(0x1a4)]()*_0x326ce5['Scale']-0x1),this[_0x2efff8(0x1ab)]['x']<0x0&&(_0x2d7608[_0x2efff8(0x1ab)]['x']=-Math[_0x2efff8(0x180)](_0x2d7608[_0x2efff8(0x1ab)]['x']));},Sprite_Battler[_0x22a58d(0x256)]['checkAggroControlSystemOffsetYAdjustment']=function(){const _0x8e1e96=_0x22a58d;if(!Imported['VisuMZ_2_AggroControlSystem'])return![];if(this[_0x8e1e96(0x14b)]&&this[_0x8e1e96(0x14b)][_0x8e1e96(0x137)]())return![];const _0x1fe107=VisuMZ[_0x8e1e96(0x2d7)]['Settings'][_0x8e1e96(0x2b9)];if(!_0x1fe107[_0x8e1e96(0xc3)])return![];if(!ConfigManager[_0x8e1e96(0x10f)])return![];const _0x1bc1af=VisuMZ[_0x8e1e96(0x199)][_0x8e1e96(0x1b2)][_0x8e1e96(0x244)];return _0x1fe107['Scale']===_0x1bc1af['Scale']&&_0x1fe107[_0x8e1e96(0x128)]===_0x1bc1af['AnchorX']&&_0x1fe107[_0x8e1e96(0x27a)]===_0x1bc1af['AnchorY']&&_0x1fe107[_0x8e1e96(0x1e6)]===_0x1bc1af[_0x8e1e96(0x1e6)]&&_0x1fe107['OffsetY']===_0x1bc1af['OffsetY']&&!![];},VisuMZ[_0x22a58d(0x199)]['Sprite_Battler_update']=Sprite_Battler[_0x22a58d(0x256)][_0x22a58d(0x229)],Sprite_Battler[_0x22a58d(0x256)]['update']=function(){const _0x542d49=_0x22a58d;VisuMZ['BattleSystemATB'][_0x542d49(0x1d2)][_0x542d49(0x21f)](this);if(!this[_0x542d49(0x14b)]&&this[_0x542d49(0x21c)]){this[_0x542d49(0x21c)][_0x542d49(0x2d0)]=![];if(this[_0x542d49(0x1b8)]){if(_0x542d49(0xf5)!==_0x542d49(0x202))this[_0x542d49(0x1b8)][_0x542d49(0x21c)][_0x542d49(0x2d0)]=![];else return _0x542d49(0x231);}}},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x204)]=Sprite_Actor[_0x22a58d(0x256)][_0x22a58d(0x2c2)],Sprite_Actor[_0x22a58d(0x256)]['createStateSprite']=function(){const _0x1c2d5b=_0x22a58d;VisuMZ[_0x1c2d5b(0x199)]['Sprite_Actor_createStateSprite'][_0x1c2d5b(0x21f)](this),VisuMZ[_0x1c2d5b(0x199)][_0x1c2d5b(0x1b2)][_0x1c2d5b(0x244)][_0x1c2d5b(0xf7)]&&this['createAtbGaugeSprite']();},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x215)]=Sprite_Enemy[_0x22a58d(0x256)][_0x22a58d(0x2d1)],Sprite_Enemy[_0x22a58d(0x256)][_0x22a58d(0x2d1)]=function(){const _0x5b2606=_0x22a58d;if(VisuMZ['BattleSystemATB'][_0x5b2606(0x1b2)]['Gauge'][_0x5b2606(0x250)]){if(_0x5b2606(0x14d)===_0x5b2606(0x16d)){const _0x1d1af7=this['battler']();if(!_0x1d1af7)return;const _0x37f5ac=_0x35c2a8[_0x5b2606(0x1b2)],_0x3b2ee0=this[_0x5b2606(0x294)](),_0x3bf9ce=this['targetPositionOnGauge'](),_0x31b84d=_0x2844e3?_0x323f7c:_0x37f5ac['MarkerSpeed'];if(_0x3b2ee0&&this['x']!==_0x3bf9ce){if(this['x']>_0x3bf9ce)this['x']=_0x4966fa['max'](_0x3bf9ce,this['x']-_0x31b84d);if(this['x']<_0x3bf9ce)this['x']=_0x5c8cd0[_0x5b2606(0x11e)](_0x3bf9ce,this['x']+_0x31b84d);}else{if(!_0x3b2ee0&&this['x']!==_0x3bf9ce){if(this['y']>_0x3bf9ce)this['y']=_0x5829ee[_0x5b2606(0x189)](_0x3bf9ce,this['y']-_0x31b84d);if(this['y']<_0x3bf9ce)this['y']=_0x257e5a[_0x5b2606(0x11e)](_0x3bf9ce,this['y']+_0x31b84d);}}}else this['createAtbGaugeSprite']();}VisuMZ['BattleSystemATB'][_0x5b2606(0x215)][_0x5b2606(0x21f)](this);},VisuMZ[_0x22a58d(0x199)]['Sprite_Enemy_startEffect']=Sprite_Enemy[_0x22a58d(0x256)][_0x22a58d(0x18c)],Sprite_Enemy[_0x22a58d(0x256)][_0x22a58d(0x18c)]=function(_0x1e26fb){const _0x5743f2=_0x22a58d;VisuMZ[_0x5743f2(0x199)][_0x5743f2(0x29b)][_0x5743f2(0x21f)](this,_0x1e26fb),(_0x1e26fb===_0x5743f2(0x177)||'disappear')&&(_0x5743f2(0x2b0)!==_0x5743f2(0x11a)?this['updateAtbGaugeSpriteVisibility']():_0x22d12b=_0xcebd66*_0x3e0d7c);},VisuMZ[_0x22a58d(0x199)]['Game_BattlerBase_appear']=Game_BattlerBase[_0x22a58d(0x256)]['appear'],Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x177)]=function(){const _0x3d6d28=_0x22a58d;VisuMZ[_0x3d6d28(0x199)]['Game_BattlerBase_appear'][_0x3d6d28(0x21f)](this),this['isEnemy']()&&BattleManager[_0x3d6d28(0x148)]()&&this['battler']()&&(this[_0x3d6d28(0xf2)]()[_0x3d6d28(0x2a2)]=!![],this[_0x3d6d28(0xf2)]()[_0x3d6d28(0xe5)]());},VisuMZ['BattleSystemATB'][_0x22a58d(0x2ba)]=Sprite_Gauge[_0x22a58d(0x256)][_0x22a58d(0x2c4)],Sprite_Gauge['prototype'][_0x22a58d(0x2c4)]=function(){const _0x56b624=_0x22a58d;if(this['_statusType']==='time')return this[_0x56b624(0x175)](0x1);return VisuMZ['BattleSystemATB'][_0x56b624(0x2ba)][_0x56b624(0x21f)](this);},VisuMZ['BattleSystemATB']['Sprite_Gauge_gaugeColor2']=Sprite_Gauge['prototype']['gaugeColor2'],Sprite_Gauge['prototype'][_0x22a58d(0x1e9)]=function(){const _0x2f635a=_0x22a58d;if(this[_0x2f635a(0x1ca)]===_0x2f635a(0x16f))return this[_0x2f635a(0x175)](0x2);return VisuMZ[_0x2f635a(0x199)][_0x2f635a(0x21a)][_0x2f635a(0x21f)](this);},Sprite_Gauge[_0x22a58d(0x256)][_0x22a58d(0x175)]=function(_0x578f06){const _0x221f9b=_0x22a58d;if(!this[_0x221f9b(0x14b)])return ColorManager[_0x221f9b(0x293)](_0x221f9b(0x2a8)['format'](_0x578f06));if(this['_battler'][_0x221f9b(0x130)]())return ColorManager[_0x221f9b(0x293)](_0x221f9b(0x220)[_0x221f9b(0x115)](_0x578f06));if(this[_0x221f9b(0x14b)][_0x221f9b(0x18a)]())return ColorManager['atbColor'](_0x221f9b(0x129)['format'](_0x578f06));if(this['gaugeRate']()>=0x1)return ColorManager[_0x221f9b(0x293)](_0x221f9b(0x18d)[_0x221f9b(0x115)](_0x578f06));const _0x2c99a8=VisuMZ[_0x221f9b(0x199)][_0x221f9b(0x1b2)][_0x221f9b(0x244)],_0x9000bc=this[_0x221f9b(0x14b)][_0x221f9b(0xcf)](0x6)*this[_0x221f9b(0x14b)][_0x221f9b(0x11f)](0x6);if(_0x9000bc<=_0x2c99a8[_0x221f9b(0x2db)])return ColorManager[_0x221f9b(0x293)](_0x221f9b(0xe2)[_0x221f9b(0x115)](_0x578f06));if(_0x9000bc>=_0x2c99a8[_0x221f9b(0x28c)])return ColorManager[_0x221f9b(0x293)](_0x221f9b(0x100)[_0x221f9b(0x115)](_0x578f06));return ColorManager['atbColor']('default%1'[_0x221f9b(0x115)](_0x578f06));},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x251)]=Sprite_Gauge[_0x22a58d(0x256)]['currentValue'],Sprite_Gauge[_0x22a58d(0x256)][_0x22a58d(0x265)]=function(){const _0x2dda54=_0x22a58d;if(this[_0x2dda54(0x14b)]&&this[_0x2dda54(0x1ca)]==='time')return this['atbCurrentValue']();return VisuMZ['BattleSystemATB'][_0x2dda54(0x251)][_0x2dda54(0x21f)](this);},Sprite_Gauge['prototype'][_0x22a58d(0xf1)]=function(){const _0x431498=_0x22a58d;return this[_0x431498(0x14b)][_0x431498(0x18a)]()?Math['max'](this[_0x431498(0x14b)]['_tpbCastTime'],0x0):VisuMZ[_0x431498(0x199)][_0x431498(0x251)][_0x431498(0x21f)](this);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x242)]=Sprite_Gauge[_0x22a58d(0x256)]['currentMaxValue'],Sprite_Gauge[_0x22a58d(0x256)]['currentMaxValue']=function(){const _0x2dff6f=_0x22a58d;if(this[_0x2dff6f(0x14b)]&&this[_0x2dff6f(0x1ca)]===_0x2dff6f(0x16f))return this['atbCurrentMaxValue']();return VisuMZ['BattleSystemATB']['Sprite_Gauge_currentMaxValue'][_0x2dff6f(0x21f)](this);},Sprite_Gauge[_0x22a58d(0x256)][_0x22a58d(0x246)]=function(){const _0x138a7b=_0x22a58d;return this['_battler'][_0x138a7b(0x18a)]()?Math[_0x138a7b(0x189)](this['_battler']['tpbRequiredCastTime'](),0x1):VisuMZ['BattleSystemATB'][_0x138a7b(0x242)]['call'](this);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x20f)]=Window_Help[_0x22a58d(0x256)][_0x22a58d(0x197)],Window_Help['prototype'][_0x22a58d(0x197)]=function(_0x185f38){const _0x232f23=_0x22a58d;BattleManager[_0x232f23(0x148)]()&&_0x185f38&&_0x185f38[_0x232f23(0x29e)]&&_0x185f38['note'][_0x232f23(0x261)](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)?this[_0x232f23(0x219)](String(RegExp['$1'])):VisuMZ['BattleSystemATB'][_0x232f23(0x20f)][_0x232f23(0x21f)](this,_0x185f38);},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x1d7)]=Window_StatusBase['prototype']['placeGauge'],Window_StatusBase[_0x22a58d(0x256)][_0x22a58d(0x157)]=function(_0x4e715f,_0x2d98df,_0x80bc14,_0x37223c){const _0x19471e=_0x22a58d;if(!this[_0x19471e(0x1df)](_0x2d98df))return;VisuMZ[_0x19471e(0x199)]['Window_StatusBase_placeGauge']['call'](this,_0x4e715f,_0x2d98df,_0x80bc14,_0x37223c);},Window_StatusBase[_0x22a58d(0x256)][_0x22a58d(0x1df)]=function(_0xabef23){const _0x58734f=_0x22a58d;if(_0xabef23!=='time')return!![];if(!['Window_BattleStatus',_0x58734f(0x2d4)]['includes'](this['constructor']['name']))return![];if(!BattleManager['isATB']())return![];if(!ConfigManager[_0x58734f(0x22b)])return![];return VisuMZ[_0x58734f(0x199)][_0x58734f(0x1b2)][_0x58734f(0x244)][_0x58734f(0x16e)];},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0x1f8)]=Window_Options['prototype'][_0x22a58d(0x158)],Window_Options[_0x22a58d(0x256)][_0x22a58d(0x158)]=function(){const _0x732604=_0x22a58d;VisuMZ[_0x732604(0x199)][_0x732604(0x1f8)][_0x732604(0x21f)](this),this[_0x732604(0xdf)]();},Window_Options[_0x22a58d(0x256)]['addBattleSystemATBCommands']=function(){const _0x5c8589=_0x22a58d;if(!BattleManager[_0x5c8589(0x148)]())return;if(VisuMZ[_0x5c8589(0x199)][_0x5c8589(0x1b2)]['Options']['AddOption']){if(_0x5c8589(0x1f1)===_0x5c8589(0x1f1))this[_0x5c8589(0x267)]();else return _0x295f1e['y']-_0x568980['y'];}},Window_Options[_0x22a58d(0x256)][_0x22a58d(0x267)]=function(){const _0x2bc0ec=_0x22a58d,_0x3bf24a=TextManager[_0x2bc0ec(0x22b)],_0x1b40a5=_0x2bc0ec(0x22b);this[_0x2bc0ec(0x1a3)](_0x3bf24a,_0x1b40a5);},Game_BattlerBase[_0x22a58d(0x256)]['clearFieldAtbGraphics']=function(){const _0x4e1ed0=_0x22a58d;delete this['_fieldAtbGaugeGraphicType'],delete this[_0x4e1ed0(0x17a)],delete this['_fieldAtbGaugeFaceIndex'],delete this[_0x4e1ed0(0x127)];},Game_BattlerBase[_0x22a58d(0x256)]['fieldAtbGraphicType']=function(){const _0x2559fd=_0x22a58d;return this['_fieldAtbGaugeGraphicType']===undefined&&(this['_fieldAtbGaugeGraphicType']=this[_0x2559fd(0x170)]()),this[_0x2559fd(0x20e)];},Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x170)]=function(){const _0x2cd6e0=_0x22a58d;return Sprite_FieldGaugeATB[_0x2cd6e0(0x1b2)][_0x2cd6e0(0xd6)];},Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x2bd)]=function(){const _0x29a204=_0x22a58d;return this['_fieldAtbGaugeFaceName']===undefined&&(_0x29a204(0x1e3)!==_0x29a204(0x17d)?this['_fieldAtbGaugeFaceName']=this[_0x29a204(0x108)]():this[_0x29a204(0x1b8)][_0x29a204(0x21c)]['visible']=_0x3467ef),this[_0x29a204(0x17a)];},Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x108)]=function(){const _0x313eb3=_0x22a58d;return Sprite_FieldGaugeATB[_0x313eb3(0x1b2)][_0x313eb3(0x237)];},Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x295)]=function(){const _0x43f1b3=_0x22a58d;return this[_0x43f1b3(0x1d9)]===undefined&&(this[_0x43f1b3(0x1d9)]=this['createFieldAtbGraphicFaceIndex']()),this['_fieldAtbGaugeFaceIndex'];},Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0xed)]=function(){const _0x17484e=_0x22a58d;return Sprite_FieldGaugeATB['Settings'][_0x17484e(0x1a8)];},Game_BattlerBase['prototype'][_0x22a58d(0x273)]=function(){const _0xd7c04=_0x22a58d;return this[_0xd7c04(0x127)]===undefined&&(this['_fieldAtbGaugeIconIndex']=this['createFieldAtbGraphicIconIndex']()),this[_0xd7c04(0x127)];},Game_BattlerBase['prototype'][_0x22a58d(0x1ee)]=function(){const _0x4a4af8=_0x22a58d;return Sprite_FieldGaugeATB[_0x4a4af8(0x1b2)][_0x4a4af8(0x2c6)];},Game_BattlerBase[_0x22a58d(0x256)][_0x22a58d(0x27e)]=function(_0x39d6ab){this['_fieldAtbGaugeIconIndex']=_0x39d6ab;},Game_Actor[_0x22a58d(0x256)]['createFieldAtbGraphicType']=function(){const _0x374077=_0x22a58d,_0x3b0269=this[_0x374077(0x138)]()[_0x374077(0x29e)];if(_0x3b0269[_0x374077(0x261)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if('qawCC'!==_0x374077(0xee))return _0x374077(0x19f);else{const _0x558f9e=new _0x112e53();_0x558f9e[_0x374077(0x22a)]['x']=this[_0x374077(0x22a)]['x'],_0x558f9e[_0x374077(0x22a)]['y']=this[_0x374077(0x22a)]['y'],this['_graphicSprite']=_0x558f9e,this[_0x374077(0x28d)](this['_graphicSprite']),this[_0x374077(0x264)]();}}else{if(_0x3b0269[_0x374077(0x261)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'jfROx'===_0x374077(0x249)?_0x71ef22(_0x425776['$1']):_0x374077(0x231);}return Sprite_FieldGaugeATB['Settings']['ActorBattlerType'];},Game_Actor['prototype'][_0x22a58d(0x2bd)]=function(){const _0x27fa6d=_0x22a58d,_0x1feef4=this[_0x27fa6d(0x138)]()[_0x27fa6d(0x29e)];if(_0x1feef4[_0x27fa6d(0x261)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x27fa6d(0x173)]();},Game_Actor['prototype'][_0x22a58d(0x295)]=function(){const _0x3e7ba6=_0x22a58d,_0x2cea4c=this[_0x3e7ba6(0x138)]()['note'];if(_0x2cea4c[_0x3e7ba6(0x261)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x22a58d(0x256)][_0x22a58d(0x1ee)]=function(){const _0x4f6e68=_0x22a58d,_0x2511d0=this[_0x4f6e68(0x138)]()[_0x4f6e68(0x29e)];if(_0x2511d0['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB['Settings']['ActorBattlerIcon'];},Game_Enemy[_0x22a58d(0x256)]['createFieldAtbGraphicType']=function(){const _0x4bf1a8=_0x22a58d,_0x28b081=this[_0x4bf1a8(0xf4)]()[_0x4bf1a8(0x29e)];if(_0x28b081['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x4bf1a8(0x19f);else{if(_0x28b081['match'](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x4bf1a8(0x231);}return Sprite_FieldGaugeATB[_0x4bf1a8(0x1b2)][_0x4bf1a8(0xd6)];},Game_Enemy['prototype'][_0x22a58d(0x108)]=function(){const _0xccf8da=_0x22a58d,_0x28e252=this['enemy']()[_0xccf8da(0x29e)];if(_0x28e252[_0xccf8da(0x261)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Sprite_FieldGaugeATB[_0xccf8da(0x1b2)][_0xccf8da(0x237)];},Game_Enemy['prototype'][_0x22a58d(0xed)]=function(){const _0x9abefa=_0x22a58d,_0x589581=this['enemy']()[_0x9abefa(0x29e)];if(_0x589581['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Sprite_FieldGaugeATB['Settings'][_0x9abefa(0x1a8)];},Game_Enemy[_0x22a58d(0x256)][_0x22a58d(0x1ee)]=function(){const _0x4f8dad=_0x22a58d,_0xe0b056=this[_0x4f8dad(0xf4)]()[_0x4f8dad(0x29e)];if(_0xe0b056[_0x4f8dad(0x261)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB[_0x4f8dad(0x1b2)][_0x4f8dad(0x2c6)];},VisuMZ[_0x22a58d(0x199)][_0x22a58d(0xe3)]=Scene_Battle['prototype']['createAllWindows'],Scene_Battle[_0x22a58d(0x256)][_0x22a58d(0x238)]=function(){const _0x50f796=_0x22a58d;this[_0x50f796(0x117)](),VisuMZ[_0x50f796(0x199)][_0x50f796(0xe3)]['call'](this),this[_0x50f796(0x210)]();},Scene_Battle['prototype'][_0x22a58d(0x117)]=function(){const _0x25c88b=_0x22a58d;if(!BattleManager[_0x25c88b(0x148)]())return;if(!Sprite_FieldGaugeATB[_0x25c88b(0x1b2)][_0x25c88b(0x161)])return;if(!ConfigManager[_0x25c88b(0x22b)])return;this[_0x25c88b(0x1fc)]=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x36b37f=this[_0x25c88b(0x122)](this[_0x25c88b(0x2cd)]);this['addChildAt'](this['_fieldGaugeATB_Container'],_0x36b37f);},Scene_Battle[_0x22a58d(0x256)]['createFieldGaugeSpriteATB']=function(){const _0x3fdfb1=_0x22a58d;if(!BattleManager[_0x3fdfb1(0x148)]())return;if(!Sprite_FieldGaugeATB[_0x3fdfb1(0x1b2)][_0x3fdfb1(0x161)])return;if(!ConfigManager[_0x3fdfb1(0x22b)])return;this[_0x3fdfb1(0x1bf)]=new Sprite_FieldGaugeATB(),this[_0x3fdfb1(0x1fc)][_0x3fdfb1(0x28d)](this['_fieldGaugeATB']);};function _0x1eba(_0x47c54c,_0x21cca0){const _0x45d43c=_0x45d4();return _0x1eba=function(_0x1ebaf7,_0x549fff){_0x1ebaf7=_0x1ebaf7-0xc0;let _0x3deeeb=_0x45d43c[_0x1ebaf7];return _0x3deeeb;},_0x1eba(_0x47c54c,_0x21cca0);}function Sprite_FieldGaugeATB(){const _0x27f3a9=_0x22a58d;this[_0x27f3a9(0x268)](...arguments);}Sprite_FieldGaugeATB[_0x22a58d(0x256)]=Object[_0x22a58d(0x29f)](Sprite[_0x22a58d(0x256)]),Sprite_FieldGaugeATB[_0x22a58d(0x256)]['constructor']=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x22a58d(0x1b2)]=JsonEx[_0x22a58d(0x1f6)](VisuMZ['BattleSystemATB']['Settings'][_0x22a58d(0x1a2)]),Sprite_FieldGaugeATB['prototype'][_0x22a58d(0x268)]=function(){const _0xa5211=_0x22a58d;Sprite[_0xa5211(0x256)][_0xa5211(0x268)][_0xa5211(0x21f)](this),this['initMembers'](),this['setHomeLocation'](),this[_0xa5211(0xfc)]();},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x280)]=function(){const _0x3cc626=_0x22a58d;this[_0x3cc626(0x22a)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x294)]=function(){const _0x435f00=_0x22a58d;if(this[_0x435f00(0x271)]!==undefined)return this['_horz'];const _0x5c394f=Sprite_FieldGaugeATB[_0x435f00(0x1b2)]['DisplayPosition'];return this[_0x435f00(0x271)]=[_0x435f00(0x260),_0x435f00(0x226)][_0x435f00(0x165)](_0x5c394f),this[_0x435f00(0x271)];},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x1ba)]=function(){const _0x44e8c2=_0x22a58d,_0x414e6c=Sprite_FieldGaugeATB[_0x44e8c2(0x1b2)]['DisplayPosition']['toLowerCase']()['trim'](),_0x4422f5=Window_Base[_0x44e8c2(0x256)][_0x44e8c2(0x292)](),_0x3c87da=SceneManager[_0x44e8c2(0x1e2)][_0x44e8c2(0x27f)][_0x44e8c2(0x287)]+Math['round'](_0x4422f5*0.5);this['_homeX']=0x0,this[_0x44e8c2(0x222)]=0x0;switch(_0x414e6c){case _0x44e8c2(0x260):this[_0x44e8c2(0xf9)]=Math[_0x44e8c2(0x1fd)](Graphics[_0x44e8c2(0x15e)]*0.5),this[_0x44e8c2(0x222)]=0x60;break;case _0x44e8c2(0x226):this['_homeX']=Math['round'](Graphics['boxWidth']*0.5),this[_0x44e8c2(0x222)]=Graphics[_0x44e8c2(0x1e4)]-_0x3c87da;break;case _0x44e8c2(0x1eb):this[_0x44e8c2(0xf9)]=0x50,this[_0x44e8c2(0x222)]=Math[_0x44e8c2(0x1fd)]((Graphics[_0x44e8c2(0x1e4)]-_0x3c87da)/0x2);break;case _0x44e8c2(0x26b):this[_0x44e8c2(0xf9)]=Graphics[_0x44e8c2(0x15e)]-0x50,this[_0x44e8c2(0x222)]=Math[_0x44e8c2(0x1fd)]((Graphics[_0x44e8c2(0x1e4)]-_0x3c87da)/0x2);break;}this[_0x44e8c2(0xf9)]+=Sprite_FieldGaugeATB['Settings'][_0x44e8c2(0x2a1)]||0x0,this[_0x44e8c2(0x222)]+=Sprite_FieldGaugeATB[_0x44e8c2(0x1b2)][_0x44e8c2(0x1c1)]||0x0,this['x']=this[_0x44e8c2(0xf9)],this['y']=this[_0x44e8c2(0x222)];},Sprite_FieldGaugeATB[_0x22a58d(0x256)]['createChildren']=function(){const _0x5a9db0=_0x22a58d;this[_0x5a9db0(0x20a)](),this[_0x5a9db0(0x2cb)](),this[_0x5a9db0(0x191)]();},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x20a)]=function(){const _0x2277a3=_0x22a58d;this['_skinSprite']=new Sprite(),this[_0x2277a3(0x16a)]['anchor']['x']=0.5,this['_skinSprite'][_0x2277a3(0x22a)]['y']=0.5,this[_0x2277a3(0x28d)](this[_0x2277a3(0x16a)]);const _0x4681b3=Sprite_FieldGaugeATB[_0x2277a3(0x1b2)][_0x2277a3(0x279)];if(_0x4681b3)this[_0x2277a3(0x16a)]['bitmap']=ImageManager[_0x2277a3(0x1d6)](_0x4681b3);},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x2cb)]=function(){const _0x4b597f=_0x22a58d;this[_0x4b597f(0xf6)]=new Sprite(),this[_0x4b597f(0x28d)](this['_gaugeSprite']),this[_0x4b597f(0x2a4)]();},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x2a4)]=function(){const _0x35885c=_0x22a58d,_0x3f7631=Sprite_FieldGaugeATB['Settings'],_0x3cb1a9=this['isGaugeHorizontal'](),_0x36488c=_0x3cb1a9?_0x3f7631['GaugeLengthHorz']:_0x3f7631[_0x35885c(0x235)],_0x40fc9c=_0x3cb1a9?_0x3f7631[_0x35885c(0x235)]:_0x3f7631[_0x35885c(0x125)];this[_0x35885c(0xf6)][_0x35885c(0x2a3)]=new Bitmap(_0x36488c,_0x40fc9c),this[_0x35885c(0xe6)](),this[_0x35885c(0xf6)]['x']=Math[_0x35885c(0x19d)](_0x36488c/-0x2),this[_0x35885c(0xf6)]['y']=Math[_0x35885c(0x19d)](_0x40fc9c/-0x2);},Sprite_FieldGaugeATB[_0x22a58d(0x256)]['drawGaugeBitmap']=function(){const _0x1de3c7=_0x22a58d;if(!Sprite_FieldGaugeATB['Settings'][_0x1de3c7(0xe9)])return;const _0x111828=Sprite_FieldGaugeATB[_0x1de3c7(0x1b2)],_0x25e8d6=this[_0x1de3c7(0xf6)][_0x1de3c7(0x2a3)],_0x557e81=_0x25e8d6['width'],_0x40261c=_0x25e8d6[_0x1de3c7(0x287)],_0x73641a=ColorManager[_0x1de3c7(0xd2)](),_0x271088=ColorManager[_0x1de3c7(0x19e)](),_0x4a0aa4=ColorManager[_0x1de3c7(0x1ae)](),_0x2d9ce4=ColorManager['atbColor'](_0x1de3c7(0x18b)),_0x11925f=ColorManager[_0x1de3c7(0x293)]('cast2'),_0x4abb7d=this[_0x1de3c7(0x294)](),_0x1bad78=_0x111828[_0x1de3c7(0x2bf)],_0x559b10=_0x111828[_0x1de3c7(0x15b)][_0x1de3c7(0x184)](0x0,0x1),_0x1c6b26=Math[_0x1de3c7(0x19d)](((_0x4abb7d?_0x557e81:_0x40261c)-0x2)*_0x559b10);_0x25e8d6[_0x1de3c7(0x299)](0x0,0x0,_0x557e81,_0x40261c,_0x73641a);let _0x548bca=0x0,_0x68a070=0x0,_0x4c2828=0x0,_0x3bfbbc=0x0;if(_0x4abb7d&&_0x1bad78)_0x548bca=_0x1c6b26-0x1,_0x4c2828=_0x557e81-0x3-_0x548bca,_0x25e8d6[_0x1de3c7(0xff)](0x1,0x1,_0x548bca,_0x40261c-0x2,_0x271088,_0x4a0aa4,![]),_0x25e8d6[_0x1de3c7(0xff)](0x2+_0x548bca,0x1,_0x4c2828,_0x40261c-0x2,_0x2d9ce4,_0x11925f,![]);else{if(_0x4abb7d&&!_0x1bad78)_0x548bca=_0x1c6b26-0x1,_0x4c2828=_0x557e81-0x3-_0x548bca,_0x25e8d6[_0x1de3c7(0xff)](0x2+_0x4c2828,0x1,_0x548bca,_0x40261c-0x2,_0x271088,_0x4a0aa4,![]),_0x25e8d6[_0x1de3c7(0xff)](0x1,0x1,_0x4c2828,_0x40261c-0x2,_0x2d9ce4,_0x11925f,![]);else{if(!_0x4abb7d&&_0x1bad78)_0x68a070=_0x1c6b26-0x1,_0x3bfbbc=_0x40261c-0x3-_0x68a070,_0x25e8d6[_0x1de3c7(0xff)](0x1,0x1,_0x557e81-0x2,_0x68a070,_0x271088,_0x4a0aa4,!![]),_0x25e8d6['gradientFillRect'](0x1,0x2+_0x68a070,_0x557e81-0x2,_0x3bfbbc,_0x2d9ce4,_0x11925f,!![]);else!_0x4abb7d&&!_0x1bad78&&(_0x68a070=_0x1c6b26-0x1,_0x3bfbbc=_0x40261c-0x3-_0x68a070,_0x25e8d6[_0x1de3c7(0xff)](0x1,0x2+_0x3bfbbc,_0x557e81-0x2,_0x68a070,_0x271088,_0x4a0aa4,!![]),_0x25e8d6[_0x1de3c7(0xff)](0x1,0x1,_0x557e81-0x2,_0x3bfbbc,_0x2d9ce4,_0x11925f,!![]));}}},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x191)]=function(){const _0x3a855a=_0x22a58d;this[_0x3a855a(0x176)]&&this[_0x3a855a(0xf6)][_0x3a855a(0x278)](this[_0x3a855a(0x176)]),this['_battlerContainer']=new Sprite(),this[_0x3a855a(0xf6)][_0x3a855a(0x28d)](this[_0x3a855a(0x176)]),this['createBattlerSprites']();},Sprite_FieldGaugeATB['prototype']['createBattlerSprites']=function(){const _0x4a545f=_0x22a58d;this[_0x4a545f(0xeb)](),this['createActorSprites']();},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0xeb)]=function(){const _0x3c66df=_0x22a58d,_0x3acc39=$gameTroop[_0x3c66df(0x283)](),_0x389576=_0x3acc39['length'];for(let _0x4796d9=0x0;_0x4796d9<_0x389576;_0x4796d9++){'wBOvZ'!==_0x3c66df(0x2c5)?(this['x']=this[_0x3c66df(0xf9)],this['y']=this[_0x3c66df(0x222)]):this[_0x3c66df(0x149)](_0x4796d9,$gameTroop);}},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x239)]=function(){const _0x41e1f4=_0x22a58d,_0x473723=$gameParty[_0x41e1f4(0x1b7)]();for(let _0x3997a1=0x0;_0x3997a1<_0x473723;_0x3997a1++){this[_0x41e1f4(0x149)](_0x3997a1,$gameParty);}},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x149)]=function(_0x3cca73,_0x12b486){const _0x130002=_0x22a58d,_0x416cc3=new Sprite_FieldMarkerATB(_0x3cca73,_0x12b486,this['_gaugeSprite']);this[_0x130002(0x176)]['addChild'](_0x416cc3);},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x229)]=function(){const _0x293558=_0x22a58d;Sprite[_0x293558(0x256)][_0x293558(0x229)][_0x293558(0x21f)](this),this[_0x293558(0xfd)](),this[_0x293558(0x198)](),this[_0x293558(0x25a)]();},Sprite_FieldGaugeATB['prototype']['updatePosition']=function(){const _0x327ccd=_0x22a58d,_0x53ab91=Sprite_FieldGaugeATB[_0x327ccd(0x1b2)];if(_0x53ab91['DisplayPosition']!==_0x327ccd(0x260))return;if(!_0x53ab91[_0x327ccd(0x1d3)])return;const _0x3743a4=SceneManager[_0x327ccd(0x1e2)][_0x327ccd(0xd5)];if(!_0x3743a4)return;if(_0x3743a4[_0x327ccd(0x2d0)]){if(_0x327ccd(0x19a)===_0x327ccd(0x19a))this['x']=this['_homeX']+(_0x53ab91[_0x327ccd(0x254)]||0x0),this['y']=this['_homeY']+(_0x53ab91[_0x327ccd(0x2a5)]||0x0);else return _0x482d85=_0x5c009b(_0x5d7638),_0x117be8[_0x327ccd(0x261)](/#(.*)/i)?'#%1'['format'](_0xee61cf(_0x371655['$1'])):this['textColor'](_0xaf9462(_0x59ec22));}else{if(_0x327ccd(0xc9)===_0x327ccd(0xc9))this['x']=this[_0x327ccd(0xf9)],this['y']=this[_0x327ccd(0x222)];else{const _0x553f64=['default',_0x327ccd(0xe4),_0x327ccd(0x218),_0x327ccd(0x1f3),_0x327ccd(0x1b4),_0x327ccd(0xe1)],_0x2ad560=_0x399ce8[_0x327ccd(0x199)]['Settings']['Color'];this[_0x327ccd(0x15f)]={};for(const _0xe79774 of _0x553f64){for(let _0x23968c=0x1;_0x23968c<=0x2;_0x23968c++){const _0x44a76d=_0xe79774+_0x23968c;this[_0x327ccd(0x15f)][_0x44a76d]=this[_0x327ccd(0x223)](_0x2ad560[_0x44a76d]);}}}}const _0x40413f=SceneManager['_scene'][_0x327ccd(0x2cd)];this['x']+=_0x40413f['x'],this['y']+=_0x40413f['y'];},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x198)]=function(){const _0x3e5fa5=_0x22a58d;if(!this[_0x3e5fa5(0x176)])return;const _0x4935d5=this[_0x3e5fa5(0x176)][_0x3e5fa5(0x187)];if(!_0x4935d5)return;_0x4935d5['sort'](this[_0x3e5fa5(0x1ec)][_0x3e5fa5(0x29c)](this));},Sprite_FieldGaugeATB[_0x22a58d(0x256)][_0x22a58d(0x1ec)]=function(_0x3ccce6,_0x558cb7){const _0x3331a8=_0x22a58d,_0x16bc8a=this[_0x3331a8(0x294)](),_0x21ba52=Sprite_FieldGaugeATB['Settings'][_0x3331a8(0x2bf)];if(_0x16bc8a&&_0x21ba52){if('qAtGj'==='qAtGj')return _0x3ccce6['x']-_0x558cb7['x'];else this[_0x3331a8(0x206)]();}else{if(_0x16bc8a&&!_0x21ba52){if(_0x3331a8(0xe7)===_0x3331a8(0xe7))return _0x558cb7['x']-_0x3ccce6['x'];else!_0x456674['BattleSystemATB'][_0x3331a8(0x1b2)][_0x3331a8(0x2b3)][_0x3331a8(0x131)]&&(this['_onRestrictBypassAtbReset']=_0x16bcad[_0x3331a8(0x148)]()),_0x23d598['BattleSystemATB'][_0x3331a8(0x205)][_0x3331a8(0x21f)](this),this[_0x3331a8(0x156)]=_0x583808;}else{if(!_0x16bc8a&&_0x21ba52)return _0x3ccce6['y']-_0x558cb7['y'];else{if(!_0x16bc8a&&!_0x21ba52)return _0x558cb7['y']-_0x3ccce6['y'];}}}},Sprite_FieldGaugeATB['prototype'][_0x22a58d(0x25a)]=function(){const _0x2059b8=_0x22a58d;this[_0x2059b8(0x2d0)]=$gameSystem[_0x2059b8(0x26f)]();};function Sprite_FieldMarkerATB(){this['initialize'](...arguments);}function _0x45d4(){const _0x2eb285=['Game_Battler_onRestrict','applyATBPenalty','VMIRK','_backgroundSprite','AddOption','createFieldGaugeSkin','fieldAtbGraphicType','Actors','JUXBL','_fieldAtbGaugeGraphicType','Window_Help_setItem','createFieldGaugeSpriteATB','isActor','isAlive','_windowskin','updateLetter','Sprite_Enemy_createStateIconSprite','_graphicEnemy','Class-%1-%2','cast','setText','Sprite_Gauge_gaugeColor2','setFrame','_atbGaugeSprite','MarkerSize','_tpbCastTime','call','stop%1','FGBnP','_homeY','getColor','YvmGr','setBattler','bottom','Armor-%1-%2','version','update','anchor','visualAtbGauge','KWPSf','changeFaceGraphicBitmap','_letterSprite','ParseItemNotetags','Game_Unit_updateTpb','icon','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','_graphicFaceName','xXsja','GaugeThick','changeAtbCastTime','EnemyBattlerFaceName','createAllWindows','createActorSprites','clearRect','tpbAcceleration','isTpb','MarkerArrowWindowSkin','Actor-%1-%2','Parse_Notetags_CreateJS','floor','Scale','Sprite_Gauge_currentMaxValue','atbAcceleration','Gauge','IconSet','atbCurrentMaxValue','_letter','onAtbInterrupt','YwEFp','reduce','isHidden','loadWindowskin','setHue','isAppeared','toUpperCase','ShowEnemyGauge','Sprite_Gauge_currentValue','(?:GAUGE|TIME|SPEED)','requestFauxAnimation','RepositionTopHelpX','InterruptFlashDuration','prototype','addLoadListener','Game_Action_applyGlobal','atbActive','updateVisibility','applyItemBattleSystemATBUserEffect','IibOo','_arrowSprite','atbInterrupt','Enemies','top','match','drawText','attackSpeed','processUpdateGraphic','currentValue','ARRAYSTRUCT','addBattleSystemATBShowGaugeCommand','initialize','ShowMarkerBorder','Sprite_Battler_updateMain','right','%1BgColor1','TpbSpeedCalcJS','revive','isBattleSystemATBFieldGaugeVisible','updateSelectionEffect','_horz','hasSvBattler','fieldAtbGraphicIconIndex','speed','atbSpeed','process_VisuMZ_BattleSystemATB_JS_Notetags','iconWidth','removeChild','GaugeSystemSkin','AnchorY','#%1','battlerHue','createJS','setAtbGraphicIconIndex','_statusWindow','initMembers','applyTpbPenalty','_tpbState','members','IconIndex','changeIconGraphicBitmap','DisplayPosition','height','EVAL','After','ParseAllNotetags','InterruptText','FastRate','addChild','EnemyBattlerDrawLetter','wDXXc','Game_Battler_startTpbCasting','SvxqE','lineHeight','atbColor','isGaugeHorizontal','fieldAtbGraphicFaceIndex','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','fontFace','ConvertParams','fillRect','InterruptMute','Sprite_Enemy_startEffect','bind','trim','note','create','checkAggroControlSystemOffsetYAdjustment','DisplayOffsetX','_fnord','bitmap','createGaugeBitmap','RepositionTopHelpY','applyGlobalBattleSystemATBEffects','initTpbChargeTime','default%1','(?:ATB|TPB)','121816lVSYwz','loadFace','mCgtt','BattlerRelativeSpeedJS','isSceneBattle','ConfigManager_applyData','Poksr','applyBattleSystemATBUserEffect','applyGlobal','Mechanics','faceWidth','239345HbLGna','xUcAQ','changeAtbChargeTime','%1SystemBorder','Aggro','Sprite_Gauge_gaugeColor1','jQjiV','GiqNf','fieldAtbGraphicFaceName','Game_Battler_clearTpbChargeTime','GaugeDirection','allBattleMembers','tpbSpeed','createStateSprite','tpbChargeTime','gaugeColor1','wBOvZ','EnemyBattlerIcon','%1BorderColor','EscapeFailPenalty','setAtbCastTime','VQPbG','createGaugeSprite','kFDfC','_windowLayer','setAtbAfterSpeed','isCTB','visible','createStateIconSprite','changeSvActorGraphicBitmap','tpbRelativeSpeed','Window_SideviewUiBattleStatus','SALRZ','skills','AggroControlSystem','_graphicFaceIndex','xmMSb','Game_Battler_tpbBaseSpeed','SlowRate','isAtbChargingState','isSideView','setupAtbGaugeSprite','State-%1-%2','getStateTooltipBattler','_graphicType','ShowMarkerArrow','VisibleGauge','Visible','updatePositionOffset','createLetterSprite','Weapon-%1-%2','Game_BattlerBase_revive','QdZol','VisuMZ_2_BattleSystemCTB','Game_Battler_initTpbChargeTime','isDead','createKeyJS','CVWoA','paramRate','Game_Battler_tpbRelativeSpeed','svBattlerName','gaugeBackColor','_unit','battleUIOffsetX','_helpWindow','EnemyBattlerType','updateOpacity','svActorHorzCells','FaceName','updateMain','pQhqr','TpbAccelerationJS','ConfigManager_makeData','Cast','addBattleSystemATBCommands','faceHeight','stop','slow%1','Scene_Battle_createAllWindows','full','updateAtbGaugeSpriteVisibility','drawGaugeBitmap','Xncch','tpbBaseSpeed','DrawGauge','STR','createEnemySprites','createGraphicSprite','createFieldAtbGraphicFaceIndex','UWcRT','ParseSkillNotetags','traitObjects','atbCurrentValue','battler','EnemyBattlerFontSize','enemy','clGOx','_gaugeSprite','ShowActorGauge','DAUHd','_homeX','Game_BattlerBase_die','ARRAYNUM','createChildren','updatePosition','process_VisuMZ_BattleSystemATB_CreateRegExp','gradientFillRect','fast%1','xzsdG','BattleCore','FieldGaugeClearActorGraphic','hAQUp','Game_Battler_applyTpbPenalty','DXBRT','STRUCT','createFieldAtbGraphicFaceName','WNnbV','initBattleSystemATB','iconHeight','_graphicIconIndex','applyItemUserEffect','isAttack','aggroGauge','GjQjl','JSON','loadSvActor','Color','applyData','format','Skill-%1-%2','createFieldGaugeContainerATB','kobKv','_graphicHue','VQFWL','_graphicSv','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_plural','min','paramBuffRate','Name','500817NzUsEW','getChildIndex','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','map','GaugeLengthVert','TpbCastTimeJS','_fieldAtbGaugeIconIndex','AnchorX','cast%1','changeEnemyGraphicBitmap','LEEgb','NTuRa','Game_Battler_tpbAcceleration','Enemy','Actor','atbStopped','StunsResetGauge','updateTpb','FieldGaugeActorFace','_graphicSprite','BattleManager_isActiveTpb','coQlJ','isEnemy','actor','initTpbChargeTimeATB','2RSnqDi','BorderThickness','zYSJZ','Jpnlc','#000000','289464noIwuO','ARRAYFUNC','setupArrowSprite','FaceIndex','Charge','registerCommand','item','ready','243YTrKob','isATB','createBattlerSprite','isRestricted','_battler','getAtbCastTimeRate','YToeY','ynqAN','clear','targetPositionOnGauge','updatePositionOnGauge','setBattleSystemATBFieldGaugeVisible','battlerName','_tpbChargeTime','ColorManager_loadWindowskin','_onRestrictBypassAtbReset','placeGauge','addGeneralOptions','EnemyBattlerFontFace','textColor','GaugeSplit','FieldGaugeEnemyFace','concat','boxWidth','_atbColors','loadEnemy','UseFieldGauge','setAtbChargeTime','xXflH','RegExp','includes','tpbRequiredCastTime','exit','lOgvp','onRestrict','_skinSprite','mLUbT','svactor','ySnjj','ShowStatusGauge','time','createFieldAtbGraphicType','NUM','tCwBI','faceName','blt','atbGaugeColor','_battlerContainer','appear','Sprite_Battler_setBattler','Scene_Options_maxCommands','_fieldAtbGaugeFaceName','YxulX','FKsoI','lhSUe','_index','_atbAfterSpeed','abs','clearTpbChargeTime','CtUYm','onDatabaseLoaded','clamp','mainSprite','battleUIOffsetY','children','isActiveTpb','max','isAtbCastingState','cast1','startEffect','full%1','iRzeP','startTpbCasting','_atbFieldGaugeVisible','createBattlerContainer','LHapy','subject','Game_Battler_tpbRequiredCastTime','makeData','tpsoR','setItem','updateBattleContainerOrder','BattleSystemATB','YHnjx','constructor','width','ceil','ctGaugeColor1','face','SystemFieldGaugeVisibility','SfIFq','FieldGauge','addCommand','gaugeHeight','OZeMz','Enemy-%1-%2','CUHGW','EnemyBattlerFaceIndex','OwDUH','MarkerSpeed','scale','DzHPb','updateGraphicHue','ctGaugeColor2','InitialGaugeJS','Kishl','name','Settings','clearFieldAtbGraphics','slow','setup','vXkXA','maxBattleMembers','_svBattlerSprite','360011FjTXRB','setHomeLocation','status','Scene_Boot_onDatabaseLoaded','InterruptFlashColor','yTDpa','_fieldGaugeATB','UyyoC','DisplayOffsetY','parameters','VisuMZ_1_BattleCore','InterruptAnimationID','FieldGaugeClearEnemyGraphic','length','sTmQs','RrXZL','Item-%1-%2','_statusType','svActorVertCells','nYFQP','opacity','Icpry','AdjustRect','35416fwgetA','charging','Sprite_Battler_update','RepositionTopForHelp','updateAtbGaugeSpritePosition','2489921bEZGwm','loadSystem','Window_StatusBase_placeGauge','setupBattleSystemATBColors','_fieldAtbGaugeFaceIndex','zPKIH','Game_Action_applyItemUserEffect','tvwdJ','%1Side','createBorderSprite','showVisualAtbGauge','battleMembers','createAtbGaugeSprite','_scene','GAYRL','boxHeight','FUNC','OffsetX','FieldGaugeEnemyIcon','_subject','gaugeColor2','EMUuW','left','compareBattlerSprites','parse','createFieldAtbGraphicIconIndex','targetOpacity','createBackgroundSprite','PKdwz','maxCommands','fast','updateGraphic','createArrowSprite','makeDeepCopy','OJkqG','Window_Options_addGeneralOptions','currentAction','die','Options','_fieldGaugeATB_Container','round','Game_Battler_tpbSpeed','InterruptTextColor','TpbBaseSpeedCalcJS','QQLxE','fOOiy','_blendColor','Sprite_Actor_createStateSprite'];_0x45d4=function(){return _0x2eb285;};return _0x45d4();}Sprite_FieldMarkerATB[_0x22a58d(0x256)]=Object[_0x22a58d(0x29f)](Sprite_Clickable[_0x22a58d(0x256)]),Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x19b)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x268)]=function(_0x56babb,_0x24298a,_0x1f551b){const _0x2d4850=_0x22a58d;this[_0x2d4850(0x17e)]=_0x56babb,this[_0x2d4850(0xd3)]=_0x24298a,this[_0x2d4850(0xf6)]=_0x1f551b,Sprite_Clickable[_0x2d4850(0x256)][_0x2d4850(0x268)]['call'](this),this[_0x2d4850(0x280)](),this[_0x2d4850(0xfc)](),this[_0x2d4850(0x1cd)]=this[_0x2d4850(0x1ef)]();},Sprite_FieldMarkerATB['prototype']['initMembers']=function(){const _0x10f247=_0x22a58d;this[_0x10f247(0x22a)]['x']=0.5,this[_0x10f247(0x22a)]['y']=0.5;},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0xfc)]=function(){const _0xfa3493=_0x22a58d;this[_0xfa3493(0x1f0)](),this[_0xfa3493(0xec)](),this[_0xfa3493(0x1de)](),this[_0xfa3493(0xc6)](),this[_0xfa3493(0x1f5)](),this['updatePositionOnGauge'](!![]);},Sprite_FieldMarkerATB['prototype'][_0x22a58d(0x1f0)]=function(){const _0x5960fd=_0x22a58d;if(!Sprite_FieldGaugeATB[_0x5960fd(0x1b2)]['ShowMarkerBg'])return;const _0x3ccabc=Sprite_FieldGaugeATB[_0x5960fd(0x1b2)],_0x526b75=this[_0x5960fd(0xd3)]===$gameParty?'Actor':_0x5960fd(0x12e),_0x47d212='%1SystemBg'[_0x5960fd(0x115)](_0x526b75),_0x4d9a3b=new Sprite();_0x4d9a3b[_0x5960fd(0x22a)]['x']=this[_0x5960fd(0x22a)]['x'],_0x4d9a3b['anchor']['y']=this[_0x5960fd(0x22a)]['y'];if(_0x3ccabc[_0x47d212])_0x4d9a3b[_0x5960fd(0x2a3)]=ImageManager[_0x5960fd(0x1d6)](_0x3ccabc[_0x47d212]);else{if(_0x5960fd(0xce)==='cvFbP')return _0xaf7679[_0x5960fd(0x189)](this[_0x5960fd(0x14b)][_0x5960fd(0x21e)],0x0);else{const _0x1f4f84=_0x3ccabc[_0x5960fd(0x21d)];_0x4d9a3b[_0x5960fd(0x2a3)]=new Bitmap(_0x1f4f84,_0x1f4f84);const _0x9a812c=ColorManager[_0x5960fd(0x223)](_0x3ccabc[_0x5960fd(0x26c)[_0x5960fd(0x115)](_0x526b75)]),_0x347630=ColorManager[_0x5960fd(0x223)](_0x3ccabc['%1BgColor2'[_0x5960fd(0x115)](_0x526b75)]);_0x4d9a3b[_0x5960fd(0x2a3)][_0x5960fd(0xff)](0x0,0x0,_0x1f4f84,_0x1f4f84,_0x9a812c,_0x347630,!![]);}}this[_0x5960fd(0x208)]=_0x4d9a3b,this[_0x5960fd(0x28d)](this[_0x5960fd(0x208)]),this['width']=this[_0x5960fd(0x208)][_0x5960fd(0x19c)],this[_0x5960fd(0x287)]=this['_backgroundSprite'][_0x5960fd(0x287)];},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0xec)]=function(){const _0x11625c=_0x22a58d,_0x262ebb=new Sprite();_0x262ebb[_0x11625c(0x22a)]['x']=this['anchor']['x'],_0x262ebb[_0x11625c(0x22a)]['y']=this[_0x11625c(0x22a)]['y'],this[_0x11625c(0x134)]=_0x262ebb,this[_0x11625c(0x28d)](this[_0x11625c(0x134)]),this['processUpdateGraphic']();},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x1de)]=function(){const _0x23f1bb=_0x22a58d;if(!Sprite_FieldGaugeATB[_0x23f1bb(0x1b2)][_0x23f1bb(0x269)])return;const _0x14c5f3=Sprite_FieldGaugeATB[_0x23f1bb(0x1b2)],_0x5b7130=this[_0x23f1bb(0xd3)]===$gameParty?'Actor':_0x23f1bb(0x12e),_0x5bd213=_0x23f1bb(0x2b8)[_0x23f1bb(0x115)](_0x5b7130),_0x3409ae=new Sprite();_0x3409ae[_0x23f1bb(0x22a)]['x']=this[_0x23f1bb(0x22a)]['x'],_0x3409ae[_0x23f1bb(0x22a)]['y']=this[_0x23f1bb(0x22a)]['y'];if(_0x14c5f3[_0x5bd213])_0x3409ae[_0x23f1bb(0x2a3)]=ImageManager[_0x23f1bb(0x1d6)](_0x14c5f3[_0x5bd213]);else{let _0x9e98a1=_0x14c5f3[_0x23f1bb(0x21d)],_0x5af979=_0x14c5f3[_0x23f1bb(0x13b)];_0x3409ae[_0x23f1bb(0x2a3)]=new Bitmap(_0x9e98a1,_0x9e98a1);const _0x2d5a4d=_0x23f1bb(0x13e),_0x251ffd=ColorManager[_0x23f1bb(0x223)](_0x14c5f3[_0x23f1bb(0x2c7)[_0x23f1bb(0x115)](_0x5b7130)]);_0x3409ae[_0x23f1bb(0x2a3)][_0x23f1bb(0x299)](0x0,0x0,_0x9e98a1,_0x9e98a1,_0x2d5a4d),_0x9e98a1-=0x2,_0x3409ae[_0x23f1bb(0x2a3)]['fillRect'](0x1,0x1,_0x9e98a1,_0x9e98a1,_0x251ffd),_0x9e98a1-=_0x5af979*0x2,_0x3409ae[_0x23f1bb(0x2a3)][_0x23f1bb(0x299)](0x1+_0x5af979,0x1+_0x5af979,_0x9e98a1,_0x9e98a1,_0x2d5a4d),_0x9e98a1-=0x2,_0x5af979+=0x1,_0x3409ae[_0x23f1bb(0x2a3)]['clearRect'](0x1+_0x5af979,0x1+_0x5af979,_0x9e98a1,_0x9e98a1);}this[_0x23f1bb(0x208)]=_0x3409ae,this[_0x23f1bb(0x28d)](this[_0x23f1bb(0x208)]);},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0xc6)]=function(){const _0x20d4a3=_0x22a58d,_0x17606e=Sprite_FieldGaugeATB[_0x20d4a3(0x1b2)];if(!_0x17606e[_0x20d4a3(0x28e)])return;if(this['_unit']===$gameParty)return;const _0x20ca26=_0x17606e['MarkerSize'],_0x59e2b9=new Sprite();_0x59e2b9[_0x20d4a3(0x22a)]['x']=this[_0x20d4a3(0x22a)]['x'],_0x59e2b9['anchor']['y']=this[_0x20d4a3(0x22a)]['y'],_0x59e2b9[_0x20d4a3(0x2a3)]=new Bitmap(_0x20ca26,_0x20ca26),this[_0x20d4a3(0x22e)]=_0x59e2b9,this[_0x20d4a3(0x28d)](this[_0x20d4a3(0x22e)]);},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x1f5)]=function(){const _0xc732bf=_0x22a58d,_0x3c4269=Sprite_FieldGaugeATB[_0xc732bf(0x1b2)];if(!_0x3c4269[_0xc732bf(0xc2)])return;const _0x5de6e0=new Sprite();_0x5de6e0['anchor']['x']=this[_0xc732bf(0x22a)]['x'],_0x5de6e0[_0xc732bf(0x22a)]['y']=this[_0xc732bf(0x22a)]['y'],this[_0xc732bf(0x141)](_0x5de6e0),this[_0xc732bf(0x25d)]=_0x5de6e0,this['addChild'](this['_arrowSprite']);},Sprite_FieldMarkerATB['prototype']['setupArrowSprite']=function(_0x5b3767){const _0x11eec6=_0x22a58d,_0x3abcce=Sprite_FieldGaugeATB[_0x11eec6(0x1b2)],_0x59c9b2=_0x3abcce[_0x11eec6(0x21d)],_0x3aeefa=Math[_0x11eec6(0x1fd)](_0x59c9b2/0x2),_0xf35f3=this[_0x11eec6(0x294)](),_0x381343=this[_0x11eec6(0xd3)]===$gameParty?_0x11eec6(0x12f):_0x11eec6(0x12e),_0x2c3b04=_0x3abcce[_0x11eec6(0x1dd)[_0x11eec6(0x115)](_0x381343)];_0x5b3767[_0x11eec6(0x2a3)]=ImageManager[_0x11eec6(0x1d6)](_0x3abcce[_0x11eec6(0x23d)]);const _0x3f5084=0x18,_0x283922=_0x3f5084/0x2,_0xe9b113=0x60+_0x3f5084,_0x59c91e=0x0+_0x3f5084;if(_0xf35f3&&_0x2c3b04){if('SvxqE'!==_0x11eec6(0x291)){if(!this[_0x11eec6(0x21c)])return;const _0x1c5ad2=this[_0x11eec6(0x14b)]&&this[_0x11eec6(0x14b)]['isAppeared']()&&!this[_0x11eec6(0x14b)]['isHidden']();this[_0x11eec6(0x21c)][_0x11eec6(0x2d0)]=_0x1c5ad2,this[_0x11eec6(0x1b8)]&&this[_0x11eec6(0x1b8)][_0x11eec6(0x21c)]&&(this[_0x11eec6(0x1b8)][_0x11eec6(0x21c)][_0x11eec6(0x2d0)]=_0x1c5ad2);}else _0x5b3767['setFrame'](_0xe9b113+_0x283922,_0x59c91e+_0x283922+_0x3f5084,_0x3f5084,_0x283922),_0x5b3767['y']+=_0x3aeefa,_0x5b3767[_0x11eec6(0x22a)]['y']=0x0;}else{if(_0xf35f3&&!_0x2c3b04){if('xPTwd'===_0x11eec6(0x207)){if(_0x1cca60!==_0x11eec6(0x16f))return!![];if(!['Window_BattleStatus',_0x11eec6(0x2d4)]['includes'](this[_0x11eec6(0x19b)][_0x11eec6(0x1b1)]))return![];if(!_0xb8b429[_0x11eec6(0x148)]())return![];if(!_0x1b0a9d[_0x11eec6(0x22b)])return![];return _0x3b7a4b[_0x11eec6(0x199)][_0x11eec6(0x1b2)]['Gauge']['ShowStatusGauge'];}else _0x5b3767[_0x11eec6(0x21b)](_0xe9b113+_0x283922,_0x59c91e,_0x3f5084,_0x283922),_0x5b3767['y']-=_0x3aeefa,_0x5b3767[_0x11eec6(0x22a)]['y']=0x1;}else{if(!_0xf35f3&&_0x2c3b04)_0x5b3767[_0x11eec6(0x21b)](_0xe9b113,_0x59c91e+_0x283922,_0x283922,_0x3f5084),_0x5b3767['x']-=Math[_0x11eec6(0x19d)](_0x3aeefa*1.75),_0x5b3767['anchor']['x']=0x0;else{if(!_0xf35f3&&!_0x2c3b04){if(_0x11eec6(0x2d9)!==_0x11eec6(0x192))_0x5b3767['setFrame'](_0xe9b113+_0x3f5084+_0x283922,_0x59c91e+_0x283922,_0x283922,_0x3f5084),_0x5b3767['x']+=Math[_0x11eec6(0x19d)](_0x3aeefa*1.75),_0x5b3767[_0x11eec6(0x22a)]['x']=0x1;else{if(this['_atbColors']===_0xe555ba)this[_0x11eec6(0x1d8)]();return this[_0x11eec6(0x15f)][_0x5c2d60]||'#000000';}}}}}},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0xf2)]=function(){const _0x1e2c15=_0x22a58d;if(this[_0x1e2c15(0xd3)]===$gameParty)return $gameParty[_0x1e2c15(0x1e0)]()[this[_0x1e2c15(0x17e)]];else{if('tVMjS'!==_0x1e2c15(0xf8))return $gameTroop[_0x1e2c15(0x283)]()[this['_index']];else{const _0x2d6908=_0x57f95f[_0x1e2c15(0x1b2)],_0x39bec5=this[_0x1e2c15(0x294)](),_0x46f6b6=this[_0x1e2c15(0xd3)]===_0x5be0f9?_0x1e2c15(0x12f):_0x1e2c15(0x12e),_0x343aed=_0x2d6908['MarkerOffset'],_0x23d19c=_0x2d6908['%1Side'[_0x1e2c15(0x115)](_0x46f6b6)];_0x39bec5?(this['y']=_0x2d6908[_0x1e2c15(0x235)]/0x2,this['y']+=_0x23d19c?-_0x343aed:_0x343aed):(this['x']=_0x2d6908['GaugeThick']/0x2,this['x']+=_0x23d19c?_0x343aed:-_0x343aed);}}},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x229)]=function(){const _0x5ef981=_0x22a58d;Sprite_Clickable[_0x5ef981(0x256)]['update'][_0x5ef981(0x21f)](this),this[_0x5ef981(0xd7)](),this['updatePositionOffset'](),this[_0x5ef981(0x151)](),this[_0x5ef981(0x1f4)](),this[_0x5ef981(0x1ad)](),this[_0x5ef981(0x214)](),this[_0x5ef981(0x270)]();},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0xd7)]=function(){const _0x464b23=_0x22a58d,_0x414ad6=this[_0x464b23(0x1ef)](),_0x19d4bd=Sprite_FieldGaugeATB[_0x464b23(0x1b2)]['OpacityRate'];if(this['opacity']>_0x414ad6)this[_0x464b23(0x1cd)]=Math[_0x464b23(0x189)](_0x414ad6,this[_0x464b23(0x1cd)]-_0x19d4bd);else this[_0x464b23(0x1cd)]<_0x414ad6&&(_0x464b23(0xdb)!==_0x464b23(0xdb)?this[_0x464b23(0x20e)]=this[_0x464b23(0x170)]():this[_0x464b23(0x1cd)]=Math[_0x464b23(0x11e)](_0x414ad6,this['opacity']+_0x19d4bd));},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x1ef)]=function(){const _0x28ab30=_0x22a58d,_0x31bfef=this[_0x28ab30(0xf2)]();if(!_0x31bfef)return 0x0;if(_0x31bfef[_0x28ab30(0x24b)]())return 0x0;if(_0x31bfef[_0x28ab30(0xcc)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x22a58d(0x256)]['isGaugeHorizontal']=function(){const _0x3f55d9=_0x22a58d;if(this[_0x3f55d9(0x271)]!==undefined)return this[_0x3f55d9(0x271)];const _0x39e151=Sprite_FieldGaugeATB[_0x3f55d9(0x1b2)][_0x3f55d9(0x286)];return this[_0x3f55d9(0x271)]=['top',_0x3f55d9(0x226)]['includes'](_0x39e151),this['_horz'];},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0xc5)]=function(){const _0x49cd59=_0x22a58d,_0x34e75a=Sprite_FieldGaugeATB[_0x49cd59(0x1b2)],_0x4d417d=this['isGaugeHorizontal'](),_0x2c296b=this[_0x49cd59(0xd3)]===$gameParty?'Actor':_0x49cd59(0x12e),_0x57d834=_0x34e75a['MarkerOffset'],_0x311e49=_0x34e75a['%1Side'[_0x49cd59(0x115)](_0x2c296b)];_0x4d417d?(this['y']=_0x34e75a[_0x49cd59(0x235)]/0x2,this['y']+=_0x311e49?-_0x57d834:_0x57d834):(this['x']=_0x34e75a[_0x49cd59(0x235)]/0x2,this['x']+=_0x311e49?_0x57d834:-_0x57d834);},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x151)]=function(_0x5ca631){const _0x4761f6=_0x22a58d,_0x5d5c00=this[_0x4761f6(0xf2)]();if(!_0x5d5c00)return;const _0x1cd6dc=Sprite_FieldGaugeATB[_0x4761f6(0x1b2)],_0x2f886c=this['isGaugeHorizontal'](),_0x207f17=this[_0x4761f6(0x150)](),_0x50bcdc=_0x5ca631?Infinity:_0x1cd6dc[_0x4761f6(0x1aa)];if(_0x2f886c&&this['x']!==_0x207f17){if(_0x4761f6(0x1f7)!==_0x4761f6(0x1f7))this[_0x4761f6(0xc1)]=_0x4761f6(0xf4);else{if(this['x']>_0x207f17)this['x']=Math[_0x4761f6(0x189)](_0x207f17,this['x']-_0x50bcdc);if(this['x']<_0x207f17)this['x']=Math['min'](_0x207f17,this['x']+_0x50bcdc);}}else{if(!_0x2f886c&&this['x']!==_0x207f17){if(_0x4761f6(0x28f)===_0x4761f6(0x14e)){_0x5a3334['ConvertParams'](_0x109002,_0x18011e);const _0x4376a6=_0x2e7d6b['Visible'];_0x53b0c8[_0x4761f6(0x152)](_0x4376a6);}else{if(this['y']>_0x207f17)this['y']=Math[_0x4761f6(0x189)](_0x207f17,this['y']-_0x50bcdc);if(this['y']<_0x207f17)this['y']=Math[_0x4761f6(0x11e)](_0x207f17,this['y']+_0x50bcdc);}}}},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x150)]=function(){const _0x31b8bc=_0x22a58d,_0x12d69c=Sprite_FieldGaugeATB[_0x31b8bc(0x1b2)],_0x556f8b=this[_0x31b8bc(0xf2)](),_0x51a949=this[_0x31b8bc(0x294)](),_0x3a4488=this[_0x31b8bc(0xf6)][_0x31b8bc(0x2a3)][_0x31b8bc(0x19c)],_0xb9bdc1=this[_0x31b8bc(0xf6)]['bitmap']['height'],_0x13d2ca=_0x12d69c[_0x31b8bc(0x15b)]['clamp'](0x0,0x1),_0x2e5fcb=_0x12d69c[_0x31b8bc(0x2bf)];let _0x49c9ff=_0x556f8b[_0x31b8bc(0x2c3)]()*_0x13d2ca;_0x49c9ff+=(0x1-_0x13d2ca)*_0x556f8b[_0x31b8bc(0x14c)]();if(_0x556f8b===BattleManager[_0x31b8bc(0x1e8)])_0x49c9ff=0x1;if(!_0x2e5fcb)_0x49c9ff=0x1-_0x49c9ff;let _0x3c43ca=0x0;if(_0x51a949)_0x3c43ca=_0x49c9ff*_0x3a4488;else!_0x51a949&&(_0x3c43ca=_0x49c9ff*_0xb9bdc1);return Math['round'](_0x3c43ca);},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x1f4)]=function(){const _0x2b12f2=_0x22a58d,_0x523e7f=this[_0x2b12f2(0xf2)]();if(!_0x523e7f)return;const _0x3194bc=Sprite_FieldGaugeATB[_0x2b12f2(0x1b2)],_0x4d77a9=this['_unit']===$gameParty?_0x2b12f2(0x12f):_0x2b12f2(0x12e);let _0x44e566=_0x523e7f[_0x2b12f2(0x20b)]();if(_0x523e7f[_0x2b12f2(0x211)]()&&_0x44e566==='enemy')_0x44e566='face';else{if(_0x523e7f[_0x2b12f2(0x137)]()&&_0x44e566===_0x2b12f2(0x16c)){if(_0x2b12f2(0x12c)===_0x2b12f2(0x12c))_0x44e566=_0x2b12f2(0xf4);else{const _0x40dbe5=_0x2b6052[_0x2b12f2(0x28b)],_0x2076c1={'textColor':_0xac1ff0[_0x2b12f2(0x223)](_0x1316d4['InterruptTextColor']),'flashColor':_0x39b5aa['InterruptFlashColor'],'flashDuration':_0x2c2d9c[_0x2b12f2(0x255)]};this['setupTextPopup'](_0x40dbe5,_0x2076c1);}}}if(this[_0x2b12f2(0xc1)]!==_0x44e566){if(_0x2b12f2(0x2ca)==='IEAaz'){let _0x51e9a6=_0x43e7b2[_0x2b12f2(0x199)][_0x2b12f2(0x1b2)][_0x2b12f2(0x2b3)][_0x2b12f2(0xdc)][_0x2b12f2(0x21f)](this,this);if(_0x30f078&&_0x3ace18[_0x2b12f2(0x275)]!==_0x32d787){const _0x35b877=_0x48458b[_0x2b12f2(0x275)]-0x3;if(_0x35b877>0x0)return _0x51e9a6*(_0x35b877*0x2);else{if(_0x35b877<0x0)return _0x51e9a6*(0x1/(_0x35b877*-0x2));}}return _0x51e9a6;}else return this[_0x2b12f2(0x264)]();}switch(this[_0x2b12f2(0xc1)]){case'face':if(this[_0x2b12f2(0x233)]!==_0x523e7f['fieldAtbGraphicFaceName']())return this[_0x2b12f2(0x264)]();if(this[_0x2b12f2(0x2d8)]!==_0x523e7f[_0x2b12f2(0x295)]())return this[_0x2b12f2(0x264)]();break;case _0x2b12f2(0x231):if(this[_0x2b12f2(0x10c)]!==_0x523e7f[_0x2b12f2(0x273)]())return this[_0x2b12f2(0x264)]();break;case _0x2b12f2(0xf4):if(_0x523e7f[_0x2b12f2(0x272)]()){if(_0x2b12f2(0x224)!==_0x2b12f2(0x1a5)){if(this[_0x2b12f2(0x11b)]!==_0x523e7f['svBattlerName']())return this[_0x2b12f2(0x264)]();}else{const _0x1dd70f=_0x8f53c(_0x1538b2['$1']),_0x42cb46=_0x2b12f2(0x296)['format'](_0x1dd70f,_0x1c998d),_0x17ce5f=_0x3f5280[_0x2b12f2(0x199)][_0x2b12f2(0xcd)](_0x226f0b,_0x3bdba4);_0x3714e3[_0x2b12f2(0x199)]['JS'][_0x17ce5f]=new _0x4561cc(_0x42cb46);}}else{if(this['_graphicEnemy']!==_0x523e7f['battlerName']())return this[_0x2b12f2(0x264)]();}break;case _0x2b12f2(0x16c):if(_0x523e7f[_0x2b12f2(0x211)]()){if(this[_0x2b12f2(0x11b)]!==_0x523e7f[_0x2b12f2(0x153)]())return this[_0x2b12f2(0x264)]();}else{if(this[_0x2b12f2(0x216)]!==_0x523e7f['battlerName']()){if(_0x2b12f2(0x1da)!=='IxATd')return this[_0x2b12f2(0x264)]();else{const _0x194978=_0x24cda6[_0x2b12f2(0x199)][_0x2b12f2(0x1b2)][_0x2b12f2(0x2b3)];let _0x28a623=this[_0x2b12f2(0x2d3)]()*_0x4030ea(_0x194978[_0x2b12f2(0x1af)]);const _0x409c83=this[_0x2b12f2(0xf0)]()['concat'](this[_0x2b12f2(0x2d6)]()),_0x373be0=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x4760e2=_0x409c83['map'](_0x45e22a=>_0x45e22a&&_0x45e22a[_0x2b12f2(0x29e)][_0x2b12f2(0x261)](_0x373be0)?_0x13bf71(_0x4d3674['$1'])*0.01:0x0);_0x28a623=_0x4760e2[_0x2b12f2(0x24a)]((_0x2dacb9,_0x6401eb)=>_0x2dacb9+_0x6401eb,_0x28a623),this[_0x2b12f2(0x282)]='charging',this['_tpbChargeTime']=(_0x53cdba?0x1:_0x28a623)[_0x2b12f2(0x184)](0x0,0x1),this['isRestricted']()&&(this[_0x2b12f2(0x154)]=0x0);}}}break;}},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x264)]=function(){const _0x274988=_0x22a58d,_0x708201=this[_0x274988(0xf2)]();if(!_0x708201)return;this[_0x274988(0xc1)]=_0x708201[_0x274988(0x20b)]();if(_0x708201[_0x274988(0x211)]()&&this[_0x274988(0xc1)]===_0x274988(0xf4)){if('THHRw'!==_0x274988(0x2bc))this[_0x274988(0xc1)]=_0x274988(0x19f);else{const _0x1858e7=this[_0x274988(0x166)]();this['_tpbCastTime']=(_0x1858e7*_0x32d0ab)['clamp'](0x0,_0x1858e7);}}else _0x708201['isEnemy']()&&this[_0x274988(0xc1)]===_0x274988(0x16c)&&(_0x274988(0x118)!==_0x274988(0x13c)?this[_0x274988(0xc1)]=_0x274988(0xf4):_0x2564af[_0x274988(0x199)][_0x274988(0xcb)][_0x274988(0x21f)](this,_0x2cbd7b));let _0x4a13b3;switch(this[_0x274988(0xc1)]){case _0x274988(0x19f):this[_0x274988(0x233)]=_0x708201[_0x274988(0x2bd)](),this['_graphicFaceIndex']=_0x708201[_0x274988(0x295)](),_0x4a13b3=ImageManager[_0x274988(0x2ab)](this[_0x274988(0x233)]),_0x4a13b3[_0x274988(0x257)](this[_0x274988(0x22d)][_0x274988(0x29c)](this,_0x4a13b3));break;case _0x274988(0x231):this[_0x274988(0x10c)]=_0x708201['fieldAtbGraphicIconIndex'](),_0x4a13b3=ImageManager[_0x274988(0x1d6)](_0x274988(0x245)),_0x4a13b3[_0x274988(0x257)](this[_0x274988(0x285)]['bind'](this,_0x4a13b3));break;case _0x274988(0xf4):if(_0x708201[_0x274988(0x272)]())this[_0x274988(0x11b)]=_0x708201[_0x274988(0xd1)](),_0x4a13b3=ImageManager[_0x274988(0x112)](this[_0x274988(0x11b)]),_0x4a13b3[_0x274988(0x257)](this[_0x274988(0x2d2)]['bind'](this,_0x4a13b3));else $gameSystem[_0x274988(0x2dd)]()?(this[_0x274988(0x216)]=_0x708201[_0x274988(0x153)](),_0x4a13b3=ImageManager['loadSvEnemy'](this[_0x274988(0x216)]),_0x4a13b3[_0x274988(0x257)](this[_0x274988(0x12a)][_0x274988(0x29c)](this,_0x4a13b3))):(this['_graphicEnemy']=_0x708201['battlerName'](),_0x4a13b3=ImageManager[_0x274988(0x160)](this[_0x274988(0x216)]),_0x4a13b3['addLoadListener'](this[_0x274988(0x12a)][_0x274988(0x29c)](this,_0x4a13b3)));break;case _0x274988(0x16c):this[_0x274988(0x11b)]=_0x708201[_0x274988(0x153)](),_0x4a13b3=ImageManager[_0x274988(0x112)](this[_0x274988(0x11b)]),_0x4a13b3[_0x274988(0x257)](this[_0x274988(0x2d2)][_0x274988(0x29c)](this,_0x4a13b3));break;}},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x22d)]=function(_0x577970){const _0x5275f0=_0x22a58d,_0x27711a=Sprite_FieldGaugeATB['Settings'],_0x428058=_0x27711a['MarkerSize'],_0x575673=this[_0x5275f0(0x2d8)];this[_0x5275f0(0x134)][_0x5275f0(0x2a3)]=new Bitmap(_0x428058,_0x428058);const _0x4a17c4=this[_0x5275f0(0x134)][_0x5275f0(0x2a3)],_0x43c3ce=ImageManager[_0x5275f0(0x2b4)],_0x385719=ImageManager[_0x5275f0(0xe0)],_0x13cbcc=ImageManager['faceWidth'],_0x2eb368=ImageManager[_0x5275f0(0xe0)],_0x4b7986=_0x575673%0x4*_0x43c3ce+(_0x43c3ce-_0x13cbcc)/0x2,_0x4e0fe9=Math[_0x5275f0(0x240)](_0x575673/0x4)*_0x385719+(_0x385719-_0x2eb368)/0x2;_0x4a17c4['blt'](_0x577970,_0x4b7986,_0x4e0fe9,_0x13cbcc,_0x2eb368,0x0,0x0,_0x428058,_0x428058);},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x285)]=function(_0x37eb62){const _0x1b6a9c=_0x22a58d,_0x16ca28=Sprite_FieldGaugeATB[_0x1b6a9c(0x1b2)],_0xe78c9a=_0x16ca28['MarkerSize'],_0x25b427=this[_0x1b6a9c(0x10c)];this[_0x1b6a9c(0x134)][_0x1b6a9c(0x2a3)]=new Bitmap(_0xe78c9a,_0xe78c9a);const _0x43e17e=this[_0x1b6a9c(0x134)]['bitmap'],_0x595b92=ImageManager[_0x1b6a9c(0x277)],_0x1611a2=ImageManager[_0x1b6a9c(0x10b)],_0x4e8777=_0x25b427%0x10*_0x595b92,_0x3b2651=Math['floor'](_0x25b427/0x10)*_0x1611a2;_0x43e17e['blt'](_0x37eb62,_0x4e8777,_0x3b2651,_0x595b92,_0x1611a2,0x0,0x0,_0xe78c9a,_0xe78c9a);},Sprite_FieldMarkerATB[_0x22a58d(0x256)]['changeSvActorGraphicBitmap']=function(_0x3b1684){const _0x5a6a92=_0x22a58d,_0x3c7a43=Sprite_FieldGaugeATB[_0x5a6a92(0x1b2)],_0x1a8718=_0x3c7a43['MarkerSize'];this['_graphicSprite'][_0x5a6a92(0x2a3)]=new Bitmap(_0x1a8718,_0x1a8718);const _0x7996ae=this['_graphicSprite']['bitmap'],_0x2cf273=this[_0x5a6a92(0x11b)][_0x5a6a92(0x261)](/\$/i),_0x1cf2e3=_0x2cf273?0x1:ImageManager['svActorHorzCells'],_0x41e11b=_0x2cf273?0x1:ImageManager['svActorVertCells'],_0x921921=_0x3b1684[_0x5a6a92(0x19c)]/_0x1cf2e3,_0x121068=_0x3b1684[_0x5a6a92(0x287)]/_0x41e11b,_0x50ee6d=Math['min'](0x1,_0x1a8718/_0x921921,_0x1a8718/_0x121068),_0x15bd78=_0x921921*_0x50ee6d,_0x27cc88=_0x121068*_0x50ee6d,_0x447e5a=Math[_0x5a6a92(0x1fd)]((_0x1a8718-_0x15bd78)/0x2),_0x525fb5=Math[_0x5a6a92(0x1fd)]((_0x1a8718-_0x27cc88)/0x2);_0x7996ae[_0x5a6a92(0x174)](_0x3b1684,0x0,0x0,_0x921921,_0x121068,_0x447e5a,_0x525fb5,_0x15bd78,_0x27cc88);},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x12a)]=function(_0x21ab58){const _0x2254f5=_0x22a58d,_0x1c895c=Sprite_FieldGaugeATB[_0x2254f5(0x1b2)],_0x56c663=_0x1c895c[_0x2254f5(0x21d)];this[_0x2254f5(0x134)][_0x2254f5(0x2a3)]=new Bitmap(_0x56c663,_0x56c663);const _0x38970b=this[_0x2254f5(0x134)][_0x2254f5(0x2a3)],_0x377bbd=Math['min'](0x1,_0x56c663/_0x21ab58[_0x2254f5(0x19c)],_0x56c663/_0x21ab58[_0x2254f5(0x287)]),_0x26f707=_0x21ab58[_0x2254f5(0x19c)]*_0x377bbd,_0x32b5ea=_0x21ab58[_0x2254f5(0x287)]*_0x377bbd,_0x5b862d=Math[_0x2254f5(0x1fd)]((_0x56c663-_0x26f707)/0x2),_0x5bd08a=Math[_0x2254f5(0x1fd)]((_0x56c663-_0x32b5ea)/0x2);_0x38970b['blt'](_0x21ab58,0x0,0x0,_0x21ab58['width'],_0x21ab58[_0x2254f5(0x287)],_0x5b862d,_0x5bd08a,_0x26f707,_0x32b5ea);},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x1ad)]=function(){const _0x502324=_0x22a58d,_0x57cdb2=this[_0x502324(0xf2)]();if(!_0x57cdb2)return;if(!_0x57cdb2[_0x502324(0x137)]())return;if(this[_0x502324(0x119)]===_0x57cdb2[_0x502324(0x27c)]())return;this[_0x502324(0x119)]=_0x57cdb2[_0x502324(0x27c)]();if(_0x57cdb2[_0x502324(0x272)]())this[_0x502324(0x119)]=0x0;this['_graphicSprite'][_0x502324(0x24d)](this[_0x502324(0x119)]);},Sprite_FieldMarkerATB['prototype']['updateLetter']=function(){const _0x329822=_0x22a58d;if(!this[_0x329822(0x22e)])return;const _0x58c497=this['battler']();if(!_0x58c497)return;if(this[_0x329822(0x247)]===_0x58c497[_0x329822(0x247)]&&this[_0x329822(0x11d)]===_0x58c497['_plural'])return;this[_0x329822(0x247)]=_0x58c497['_letter'],this[_0x329822(0x11d)]=_0x58c497[_0x329822(0x11d)];const _0xe637=Sprite_FieldGaugeATB[_0x329822(0x1b2)],_0x3f89cc=_0xe637[_0x329822(0x21d)],_0x2a4a04=Math[_0x329822(0x240)](_0x3f89cc/0x2),_0x15aff2=this[_0x329822(0x22e)]['bitmap'];_0x15aff2[_0x329822(0x14f)]();if(!this[_0x329822(0x11d)])return;_0x15aff2[_0x329822(0x297)]=_0xe637[_0x329822(0x159)]||$gameSystem['mainFontFace'](),_0x15aff2['fontSize']=_0xe637[_0x329822(0xf3)]||0x10,_0x15aff2[_0x329822(0x262)](this[_0x329822(0x247)],0x2,_0x2a4a04,_0x3f89cc-0x4,_0x2a4a04-0x2,_0x329822(0x26b));},Sprite_FieldMarkerATB[_0x22a58d(0x256)][_0x22a58d(0x270)]=function(){const _0x135655=_0x22a58d,_0x341c05=this[_0x135655(0xf2)]();if(!_0x341c05)return;const _0x2b2c29=_0x341c05[_0x135655(0xf2)]();if(!_0x2b2c29)return;const _0x4e7e37=_0x2b2c29[_0x135655(0x185)]();if(!_0x4e7e37)return;this['setBlendColor'](_0x4e7e37[_0x135655(0x203)]);},Sprite_FieldMarkerATB['prototype'][_0x22a58d(0xc0)]=function(){const _0x19600e=_0x22a58d;return this[_0x19600e(0xf2)]();};