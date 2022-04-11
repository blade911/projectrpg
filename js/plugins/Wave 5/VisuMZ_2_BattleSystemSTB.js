//=============================================================================
// VisuStella MZ - Battle System - STB - Standard Turn Battle
// VisuMZ_2_BattleSystemSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemSTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemSTB = VisuMZ.BattleSystemSTB || {};
VisuMZ.BattleSystemSTB.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.14] [BattleSystemSTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_STB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Standard Turn Battle (STB) system uses RPG Maker MZ's default non-TPB
 * battle system as a base. Action orders are determined by the battler's AGI
 * values and they go from highest to lowest. However, actions are not selected
 * at the start of the turn. Instead, as the turn progresses, actions are then
 * picked as each battler's turn comes up and is executed immediately.
 * 
 * Optional to the battle system but fine tuned to it is the Exploit System.
 * When landing an elemental weakness or critical hit against a foe, the
 * battler can gain bonuses as well as an extra turn while the foe will become
 * stunned or gain any desired state(s). When all enemies are exploited in a
 * single turn, a common event can also be played, too.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "stb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * An optional Exploit System that can be disabled if desired, but otherwise,
 *   fine tuned to make use of STB's highly compatible nature.
 * * Landing an elemental weakness or critical hit can allow the active battler
 *   to gain bonuses, ranging from states to extra actions to custom effects
 *   that can be added on through JavaScript plugin parameters.
 * * An exploited enemy can suffer from states and/or custom effects added
 *   through JavaScript plugin parameters.
 * * If all enemies are exploited, a common event can run to allow for a custom
 *   follow up action.
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
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
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 *
 * Action Speed
 * 
 * For skills and items, action speeds now behave differently now. Because
 * actions are now decided after a turn starts, positioning will no longer be
 * decided from the selected skill/item's action speed for the current turn.
 * 
 * Instead, the action speed used by a skill or item will determine the bonus
 * speed (or speed penalty if negative) for the following turn. Using a Guard
 * action with a +2000 Action Speed will raise the following turn's speed by
 * +2000, whereas what is originally a long charge time skill with -1000 speed
 * will decrease the following action's speed by -1000.
 * 
 * You can also customize how speed is calculated through JS Plugin Parameters
 * found in the Mechanics Settings.
 *
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Exploit System
 * 
 * This is an optional system. If you wish to turn it off, you can do so in the
 * plugin parameters.
 * 
 * There are two main ways that battlers can be exploited. One is by receiving
 * damage that strikes an elemental weakness. The other is by receiving damage
 * from a Critical Hit. Exploited battlers can receive penalty states. These
 * states can be adjusted in the plugin parameters. The default penalty state
 * is the Stunned state.
 * 
 * The battler doing the exploiting can receive bonuses instead. This is to
 * reward a power play. These bonuses can range from added states to receiving
 * an extra action and allowing the active battler to immediately attack again.
 * 
 * Each battler can only be exploited once per turn. This means if an enemy
 * would receive multiple attacks to its elemental weakness(es), the exploited
 * effect will only occur once per turn, meaning the penalty states won't stack
 * multiple times over. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * Each action can also exploit only once per use and against an unexploited
 * target. This means battlers cannot use the same elemental attacks against
 * the same foes over and over to stack up an infinite amount of turns. If the
 * player wants to gain more bonuses, the player would have to strike against
 * unexploited foes. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * When all members of a party/troop are exploited, a common event can be
 * triggered to run, allowing for potential follow up actions. How you wish to
 * make these common events is up to you.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 *
 * VisuMZ_4_BreakShields
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * ---
 * 
 * === General STB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <STB Help>
 *  description
 *  description
 * </STB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under STB.
 * - This is primarily used if the skill behaves differently in STB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to STB.
 *
 * ---
 * 
 * === STB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the STB Turn Order Display
 * 
 * ---
 *
 * <STB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <STB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <STB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <STB Instant>
 * <STB Instant Use>
 * <STB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Exploit-Related Notetags ===
 * 
 * ---
 *
 * <STB Exploited Gain State: id>
 * <STB Exploited Gain State: id, id, id>
 * 
 * <STB Exploited Gain State: name>
 * <STB Exploited Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy is exploited via elemental
 *   weaknesses or critical hits, apply the listed penalty state(s).
 * - Replace 'id' with a number representing the penalty state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple penalty states at once.
 * - Replace 'name' with the name of the penalty state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple penalty states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploited>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from being exploited via elemental
 *   weaknesses or critical hits.
 *
 * ---
 *
 * <STB Exploiter Gain State: id>
 * <STB Exploiter Gain State: id, id, id>
 * 
 * <STB Exploiter Gain State: name>
 * <STB Exploiter Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy exploits an opponent with
 *   an elemental weakness or critical hit, apply the listed bonus state(s).
 * - Replace 'id' with a number representing the bonus state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple bonus states at once.
 * - Replace 'name' with the name of the bonus state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple bonus states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploiter>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from exploiting any opponents via
 *   elemental weaknesses or critical hits.
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
 * Actor: Change STB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change STB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the STB Turn Order.
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
 * Actor: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the actor(s).
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
 * Enemy: Change STB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change STB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the STB Turn Order.
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
 * Enemy: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the enemy(ies).
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
 * System: STB Turn Order Visibility
 * - Determine the visibility of the STB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the STB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the STB Battle System.
 *
 * ---
 *
 * Speed
 * 
 *   JS: Finalized Speed:
 *   - Code used to calculate the finalized speed at the start of each turn.
 * 
 *   JS: Next Turn Speed:
 *   - Code used to calculate speed for a following turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploit System Settings
 * ============================================================================
 *
 * Here, you can adjust the main settings for the Exploit System, including
 * where you can turn it on/off. The Exploited and Exploiter settings are
 * extensions of the Exploit System and are better off with their own sections.
 *
 * ---
 *
 * Settings
 * 
 *   Enable System?:
 *   - Enable the exploit system? 
 *   - If disabled, ignore all the  mechanics regarding the Exploit System.
 * 
 *   Critical Hits:
 *   - Do critical hits exploit the opponent?
 * 
 *   Elemental Weakness:
 *   - Do elemental weaknesses exploit the opponent?
 * 
 *     Minimum Rate:
 *     - What's the minimum rate needed to count as an elemental weakness?
 * 
 *   Reset Each Turn:
 *   - Reset exploits at the end of each turn?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploited Effects Settings
 * ============================================================================
 *
 * These are effects for the exploited battlers (the receiving end). Change how
 * you want exploited battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a target is exploited.
 * 
 *   Full Exploit Events:
 *   vs Actors Event:
 *   vs Enemies Event:
 *   - If all actors/enemies have been fully exploited, run this common event.
 *   - Does not work with unlimited exploits.
 * 
 *   Unlimited Exploits:
 *   - Can battlers be exploited endlessly?
 * 
 *   JS: On Exploited:
 *   - Code used when the target has been exploited.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploiter Effects Settings
 * ============================================================================
 *
 * These are effects for the battlers doing the exploiting. Change how you want
 * exploiter battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a user exploits a foe.
 * 
 *   Extra Actions:
 *   - Successfully exploiting an enemy will grant the user this many
 *     extra actions.
 * 
 *   Multiple Exploits:
 *   - Can battlers exploit opponents multiple times with one action?
 * 
 *   JS: On Exploiting:
 *   - Code used when the user is exploiting a foe's weakness.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System STB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
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
 * Slot Sprites
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
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
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
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
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
 * Version 1.14: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: November 11, 2021
 * * Bug Fixes!
 * ** Critical hits for enemies with only one action per turn should now
 *    properly allow for the exploited effect to occur. Fix made by Olivia.
 * 
 * Version 1.12: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.11: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that altered the current action choice when enemies are using
 *    a skill that utilizes instants when there is only enough MP left for one
 *    of those actions. Fix made by Olivia.
 * 
 * Version 1.10: July 2, 2021
 * * Bug Fixes!
 * ** Dead battlers will no longer reappear in the turn order on subsequent
 *    turns. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** "Mechanics Settings" Plugin Parameters has been updated into
 *    "Speed Mechanics" with updated formulas that will now correlate any
 *    adjusted AGI changes made to battlers to alter the following turn
 *    properly. Update made by Olivia.
 * 
 * Version 1.09: March 26, 2021
 * * Bug Fixes!
 * ** Enemy exploit actions should now associate A.I. properly. Fix by Yanfly.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.08: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.06: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Bug Fixes!
 * ** Starting battle from a surprise attack will no longer skip turn 1. And
 *    starting battle without any inputtable actors will no longer skip turn 1.
 *    Fix made by Yanfly.
 * 
 * Version 1.04: December 18, 2020
 * * Feature Update!
 * ** Enemies can now benefit from <STB Instant> skills. Update made by Olivia.
 * ** Action End States updating are now handled by Skills and States Core
 *    v1.07+ for proper intended usage. Change from Battle System - STB v1.02
 *    is reverted here to prevent triggering the update twice.
 * 
 * Version 1.03: December 4, 2020
 * * Bug Fixes!
 * ** Select Next Command no longer returns undefined. Fix made by Olivia.
 * 
 * Version 1.02: November 22, 2020
 * * Bug Fixes!
 * ** Action End States now update at the end of each individual action.
 *    Fix made by Yanfly.
 * 
 * Version 1.01: November 15, 2020
 * * Bug Fixes!
 * ** Now compatible with Party Command Window Disable from the Battle Core.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: November 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorIcon
 * @text Actor: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the STB Turn Order.
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
 * @command StbTurnOrderActorFace
 * @text Actor: Change STB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearActorGraphic
 * @text Actor: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the actor(s).
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
 * @command StbTurnOrderEnemyIcon
 * @text Enemy: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the STB Turn Order.
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
 * @command StbTurnOrderEnemyFace
 * @text Enemy: Change STB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the STB Turn Order.
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
 * @command StbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the enemy(ies).
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
 * @command SystemTurnOrderVisibility
 * @text System: STB Turn Order Visibility
 * @desc Determine the visibility of the STB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the STB Turn Order Display.
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
 * @param BattleSystemSTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Speed:struct
 * @text Speed Mechanics
 * @type struct<Speed>
 * @desc Determines the mechanics of the STB Battle System.
 * @default {"Speed":"","InitialSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst agi = user.agi;\\n\\n// Create Base Speed\\nlet speed = agi;\\n\\n// Random Speed Check\\nif (user.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Add Saved Speed Modifiers from Previous Round\\nspeed += user.getSTBNextTurnSpeed();\\n\\n// Return Speed\\nreturn speed;\"","NextTurnSavedSpeedJS:func":"\"// Create Speed\\nconst action = this;\\nlet speed = 0;\\n\\n// Check Object\\nif (action.item()) {\\n    speed += action.item().speed;\\n}\\n\\n// Check Attack\\nif (action.isAttack()) {\\n    speed += action.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\""}
 *
 * @param Exploit:struct
 * @text Exploit System
 * @type struct<Exploit>
 * @desc Settings for the STB's Exploit System.
 * @default {"EnableExploit:eval":"true","ExploitCritical:eval":"true","ExploitEleWeakness:eval":"true","ExploitEleRate:num":"1.05","TurnResetExploits:eval":"true"}
 *
 * @param Exploited:struct
 * @text Exploited Effects
 * @parent Exploit:struct
 * @type struct<Exploited>
 * @desc Settings for targets being Exploited.
 * @default {"Mechanics":"","AddedStates:arraynum":"[\"13\"]","FullExploitEvents":"","vsActorsFullExploit:num":"0","vsEnemiesFullExploit:num":"0","UnlimitedExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst target = this;\\nconst user = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"0","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Exploiter:struct
 * @text Exploiter Effects
 * @parent Exploit:struct
 * @type struct<Exploiter>
 * @desc Settings for users doing the Exploiting.
 * @default {"Mechanics":"","AddedStates:arraynum":"[]","ExtraActions:num":"1","MultipleExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"ONE MORE!","TextColor:str":"0","FlashColor:eval":"[255, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System STB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Speed Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Speed:
 *
 * @param Speed
 *
 * @param InitialSpeedJS:func
 * @text JS: Finalized Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst user = this;\nconst agi = user.agi;\n\n// Create Base Speed\nlet speed = agi;\n\n// Random Speed Check\nif (user.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Add Saved Speed Modifiers from Previous Round\nspeed += user.getSTBNextTurnSpeed();\n\n// Return Speed\nreturn speed;"
 *
 * @param NextTurnSavedSpeedJS:func
 * @text JS: Next Turn Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate speed for a following turn.
 * @default "// Create Speed\nconst action = this;\nlet speed = 0;\n\n// Check Object\nif (action.item()) {\n    speed += action.item().speed;\n}\n\n// Check Attack\nif (action.isAttack()) {\n    speed += action.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Exploit System Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploit:
 *
 * @param EnableExploit:eval
 * @text Enable System?
 * @parent Exploit
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the exploit system? If disabled, ignore all the 
 * mechanics regarding the Exploit System.
 * @default true
 *
 * @param ExploitCritical:eval
 * @text Critical Hits
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do critical hits exploit the opponent?
 * @default true
 *
 * @param ExploitEleWeakness:eval
 * @text Elemental Weakness
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do elemental weaknesses exploit the opponent?
 * @default true
 *
 * @param ExploitEleRate:num
 * @text Minimum Rate
 * @parent ExploitEleWeakness:eval
 * @desc What's the minimum rate needed to count as an elemental weakness?
 * @default 1.05
 *
 * @param TurnResetExploits:eval
 * @text Reset Each Turn
 * @parent Exploit
 * @type boolean
 * @on Reset Exploits
 * @off Don't Reset
 * @desc Reset exploits at the end of each turn?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Exploited Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploited:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a target is exploited.
 * @default ["13"]
 * 
 * @param FullExploitEvents
 * @text Full Exploit Events
 * @parent Mechanics
 * 
 * @param vsActorsFullExploit:num
 * @text vs Actors Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all actors have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 * 
 * @param vsEnemiesFullExploit:num
 * @text vs Enemies Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all enemies have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 *
 * @param UnlimitedExploits:eval
 * @text Unlimited Exploits
 * @parent Mechanics
 * @type boolean
 * @on Unlimited
 * @off Once Per Turn
 * @desc Can battlers be exploited endlessly?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploited
 * @parent Mechanics
 * @type note
 * @desc Code used when the target has been exploited.
 * @default "// Declare Constants\nconst target = this;\nconst user = arguments[0];\nconst action = arguments[1];\n\n// Perform Actions\n"
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default 
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Exploiter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploiter:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a user exploits a foe.
 * @default []
 * 
 * @param ExtraActions:num
 * @text Extra Actions
 * @parent Mechanics
 * @type number
 * @desc Successfully exploiting an enemy will grant the user this many extra actions.
 * @default 1
 *
 * @param MultipleExploits:eval
 * @text Multiple Exploits
 * @parent Mechanics
 * @type boolean
 * @on Multiple
 * @off Once Per Action
 * @desc Can battlers exploit opponents multiple times with one action?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploiting
 * @parent Mechanics
 * @type note
 * @desc Code used when the user is exploiting a foe's weakness.
 * @default ""
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default ONE MORE!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 128, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
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
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
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
 * @text Slot Sprites
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
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
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
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
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
 * @default 19
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
 * @default 19
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
 */
//=============================================================================

const _0xefec4f=_0x8f9b;function _0x8f9b(_0x458aff,_0xa09450){const _0x584f9a=_0x584f();return _0x8f9b=function(_0x8f9b84,_0x5497dc){_0x8f9b84=_0x8f9b84-0x197;let _0x354e6e=_0x584f9a[_0x8f9b84];return _0x354e6e;},_0x8f9b(_0x458aff,_0xa09450);}function _0x584f(){const _0x3d26bf=['battlerName','changeIconGraphicBitmap','_containerHeight','%1BgColor1','SystemTurnOrderVisibility','spEbt','clearNextTurnSpeedSTB','xwOpX','_handlers','isSceneBattle','updateOpacity','FaceName','_stbExploited','match','_homeY','1508814SVxKRa','fillRect','_fadeTarget','performCollapse','Mute','clearSTBExploit','EnemyBattlerIcon','defaultPosition','_stbTurnOrderGraphicType','onTurnEnd','actor','faceIndex','27AeDWbD','25013329ORDWmU','battlerHue','ARRAYSTRUCT','filter','StbTurnOrderEnemyIcon','_plural','21FUKOWQ','%1SystemBg','name','setupTextPopup','cancel','padding','isEnemy','processTurn','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_surprise','AiVvQ','constructor','createBattlerRect','iconHeight','_partyCommandWindow','updateGraphicHue','makeSpeed','ShowMarkerBg','setText','AllowRandomSpeed','loadSystem','BattleManager_selectNextActor','SubjectDistance','stepForward','occvs','createInitialPositions','hide','createBattlerSprites','Game_Action_applyGlobal','BattleManager_finishActorInput','repositionLogWindowSTB','Enemies','update','addInnerChild','isActor','ARRAYSTR','MnIPB','_letterSprite','becomeSTBExploited','TurnOrderSTBGraphicFaceName','aliveMembers','FaceIndex','EnemyBattlerDrawLetter','HKfLk','gradientFillRect','Game_Action_clear','lvNsY','BorderThickness','_stbTurnOrderVisible','some','members','addLoadListener','selectNextActor','TurnOrderSTBGraphicIconIndex','updateSelectionEffect','nciDj','HGibf','createTurnOrderSTBGraphicIconIndex','WCnMd','UGrUN','commandCancelSTB','Exploit','TurnOrderSTBGraphicType','EnemyBattlerType','mHpcX','initMembersBattleSystemSTB','TPayE','RepositionTopForHelp','face','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isHorz','Game_Battler_performCollapse','faceWidth','_positionDuration','Game_BattlerBase_hide','_actorCommandWindow','isAlive','endActionSTB','sduEQ','updateGraphic','BattleManager_endAction','WqojY','performActionEnd','allowRandomSpeed','executeDamageSTB','sort','getBattleSystem','exit','critical','UnlimitedExploits','_stbTurnOrderIconIndex','Scene_Battle_createAllWindows','checkTargetPositions','hasSvBattler','clearRect','isSTB','startFade','round','traitObjects','%1SystemBorder','_targetHomeX','_graphicHue','startActorInput','_forcedBattlers','setup','LlpBr','speed','6304552qStNHi','map','top','displayExploitedEffects','fIYPs','isSTBExploited','FlashDuration','changeFaceGraphicBitmap','createBorderSprite','%1BgColor2','getColor','OOxzj','NUM','getStateTooltipBattler','isImmortal','createSTBTurnOrderWindow','StbTurnOrderEnemyFace','iXmXJ','cZeWH','MultipleExploits','%1\x20%2\x20%3','faceName','selectNextActorSTB','initMembers','close','canInput','endAction','trim','clearSTBNextTurnSpeed','_stbTurnOrderFaceIndex','ARRAYFUNC','changeSvActorGraphicBitmap','svActorVertCells','IconSet','LYjAY','Exploited','NextTurnSavedSpeedJS','updateSidePosition','_turnOrderContainer','createChildren','UrExd','UYnqe','updatePadding','startInputSTB','Settings','Scene_Battle_commandCancel','finishActorInput','updateHomePosition','Exploiter','coyhe','vQsbl','containerPosition','rFgvD','faceHeight','startActorCommandSelection','prototype','utRBY','windowRect','makeActionOrders','kdWHj','battler','getSTBNextTurnSpeed','updatePosition','isActiveTpb','_isBattleOver','ExploitEleWeakness','tgdCm','_actionBattlers','getNextSubject','createActorCommandWindow','Instant','addSTBNextTurnSpeed','Speed','stbCannotBeExploiter','_fullHeight','dfruN','DisplayPosition','_helpWindow','SqBUV','nVlgg','_phase','center','commandFight','Game_Battler_onBattleStart','_ogWindowLayerX','stbExploitedStates','isTurnBased','recalculateHome','applyGlobalBattleSystemSTB','return\x200','indexOf','length','checkOpacity','boxHeight','children','UpdateFrames','loadEnemy','Mirror','_stbTurnOrderFaceName','RegExp','_index','EnemyBattlerFaceName','CustomJS','updateLetter','TurnOrder','uPWAQ','VbWSo','GTvSE','battleSys','TurnResetExploits','isSideView','ExploitedStates','blt','processUpdateGraphic','createTurnOrderSTBGraphicFaceIndex','OrderDirection','ParseStateData','BattleManager_isActiveTpb','maxBattleMembers','format','visible','_stbTurnOrderWindow','fontSize','getStateIdWithName','Game_Actor_selectNextCommand','tnwjL','_targetHomeY','498aaMxSz','left','PopupText','lQPEg','bitmap','call','description','VsoEt','UDejG','push','commandCancel','anchor','_turnOrderInnerSprite','_isAppeared','Window_Help_setItem','bind','clearSTB','isAppeared','parameters','OhuWd','_homeX','Enemy','TcCXf','_subject','%1BorderColor','MaxVertSprites','subject','svactor','FlashColor','enemy','battleEnd','stbExploiterStates','_stateIDs','icon','Game_Action_executeDamage','_currentActor','stbCannotBeExploited','makeSTBSpeed','myQyO','createLetterSprite','_containerWidth','RepositionTopHelpY','suBVA','EnableExploit','FEqCy','floor','xjdty','4jnnnBr','_graphicEnemy','_scene','onBattleStart','jflLj','min','zjnfZ','valxj','initialize','right','calculateTargetPositions','BattleCore','note','containerWindow','initBattleSystemSTB','MKtfp','SpriteLength','svBattlerName','test','BattleManager_battleSys','MiIpX','_graphicSprite','ceil','remove','ScreenBuffer','_positionTargetY','_homeDuration','ShowMarkerBorder','_graphicFaceIndex','createTurnOrderSTBGraphicFaceName','requestFauxAnimation','compareBattlerSprites','ClXUp','RepositionTopHelpX','_isAlive','version','CenterHorz','updateBattleContainerOrder','eLTWj','setBattleSystemSTBTurnOrderVisible','_backgroundSprite','Scene_Battle_createActorCommandWindow','allBattleMembers','width','updateVisibility','bottom','JZbKl','isSTBExploitSystemEnabled','_inputting','clear','appear','2444WPIMsW','_windowLayer','WQZOZ','Game_System_initialize','_ogWindowLayerY','max','_fadeDuration','loadSvActor','TextColor','iconWidth','yeZcb','isTpb','loadSvEnemy','setSTBExploited','_statusWindow','_stbNextTurnSpeed','removeActor','_graphicIconIndex','pNVMS','_unit','ExtraActions','1184655IoVNBN','ExploitEleRate','Actor','status','selectNextCommand','performActionEndSTB','setSTBExploitedFlag','_positionTargetX','ARRAYNUM','EnemyBattlerFontFace','createTestBitmap','initHomePositions','XKQHU','areAllActorsExploited','_actions','parse','create','BattleManager_isTpb','Game_BattlerBase_initMembers','Game_Action_speed','BattleManager_makeActionOrders','performSTBExploiter','BattleSystemSTB','svActorHorzCells','setItem','HOuyc','updateTurnOrder','ActorBattlerIcon','canMove','height','_graphicSv','friendsUnit','drawText','removeActionBattlersSTB','EnemyBattlerFontSize','CannotBeExploiter','reserveCommonEvent','loadFace','split','addState','#000000','_logWindow','onBattleStartSTB','setHue','hasSTBExploited','BattleManager_processTurn','BtZlk','toUpperCase','yBKbH','_letter','_graphicFaceName','BattleManager_startInput','_fullWidth','setSTBNextTurnSpeed','Game_Battler_performActionEnd','checkPosition','createGraphicSprite','4012085HLJlIH','EVAL','StbTurnOrderClearActorGraphic','Game_Battler_onTurnEnd','AVkAN','changeEnemyGraphicBitmap','ldNRz','currentClass','StbTurnOrderActorIcon','updateTurnOrderSTB','opacity','bitmapWidth','createActorCommandWindowSTB','STB','createAllWindows','ZKYWZ','EnemyBattlerFaceIndex','bitmapHeight','VWMCW','StbTurnOrderClearEnemyGraphic','DisplayOffsetX','getChildIndex','RepositionLogWindow','_graphicType','Game_BattlerBase_appear','includes','aqVBW','BattleManager_isTurnBased','lqhsj','stbGainInstant','Visible','fontFace','vMwBR','_stbExploitAdvantageFlag','AddedStates','addChild','createTurnOrderSTBGraphicType','registerCommand','areAllEnemiesExploited','createBackgroundSprite','executeDamage','unshift','TurnOrderSTBGraphicFaceIndex','fWlEq','AnimationID','ConvertParams','Actors','mainFontFace','ActorBattlerType','HAdoi','qBSRI','FUNC','JSON','IconIndex','MaxHorzSprites','item','SpriteThin','kdHct','clearTurnOrderSTBGraphics','1577260bjkMdC','ExploiterStates'];_0x584f=function(){return _0x3d26bf;};return _0x584f();}(function(_0x3b7637,_0x1c11cd){const _0x2d2634=_0x8f9b,_0x14badd=_0x3b7637();while(!![]){try{const _0x5c9630=parseInt(_0x2d2634(0x2dc))/0x1*(parseInt(_0x2d2634(0x33e))/0x2)+parseInt(_0x2d2634(0x353))/0x3+parseInt(_0x2d2634(0x30b))/0x4*(-parseInt(_0x2d2634(0x38c))/0x5)+parseInt(_0x2d2634(0x1df))/0x6*(-parseInt(_0x2d2634(0x1f2))/0x7)+-parseInt(_0x2d2634(0x25d))/0x8+-parseInt(_0x2d2634(0x1eb))/0x9*(parseInt(_0x2d2634(0x1ce))/0xa)+parseInt(_0x2d2634(0x1ec))/0xb;if(_0x5c9630===_0x1c11cd)break;else _0x14badd['push'](_0x14badd['shift']());}catch(_0x24ed05){_0x14badd['push'](_0x14badd['shift']());}}}(_0x584f,0x7022d));var label='BattleSystemSTB',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xefec4f(0x1ef)](function(_0x4e59db){const _0x226bfc=_0xefec4f;return _0x4e59db[_0x226bfc(0x356)]&&_0x4e59db[_0x226bfc(0x2e2)][_0x226bfc(0x1ac)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0xefec4f(0x1c0)]=function(_0x3b736c,_0x116a9a){const _0x1bd05e=_0xefec4f;for(const _0x40e9ea in _0x116a9a){if('rqSWT'!==_0x1bd05e(0x2c6)){if(_0x40e9ea[_0x1bd05e(0x1dd)](/(.*):(.*)/i)){if('JZbKl'===_0x1bd05e(0x339)){const _0x544e0b=String(RegExp['$1']),_0xa76fa2=String(RegExp['$2'])[_0x1bd05e(0x382)]()[_0x1bd05e(0x278)]();let _0x331856,_0x35c78d,_0x17d97d;switch(_0xa76fa2){case _0x1bd05e(0x269):_0x331856=_0x116a9a[_0x40e9ea]!==''?Number(_0x116a9a[_0x40e9ea]):0x0;break;case _0x1bd05e(0x35b):_0x35c78d=_0x116a9a[_0x40e9ea]!==''?JSON['parse'](_0x116a9a[_0x40e9ea]):[],_0x331856=_0x35c78d[_0x1bd05e(0x25e)](_0x3605be=>Number(_0x3605be));break;case _0x1bd05e(0x38d):_0x331856=_0x116a9a[_0x40e9ea]!==''?eval(_0x116a9a[_0x40e9ea]):null;break;case'ARRAYEVAL':_0x35c78d=_0x116a9a[_0x40e9ea]!==''?JSON[_0x1bd05e(0x362)](_0x116a9a[_0x40e9ea]):[],_0x331856=_0x35c78d['map'](_0x2d01fa=>eval(_0x2d01fa));break;case _0x1bd05e(0x1c7):_0x331856=_0x116a9a[_0x40e9ea]!==''?JSON['parse'](_0x116a9a[_0x40e9ea]):'';break;case'ARRAYJSON':_0x35c78d=_0x116a9a[_0x40e9ea]!==''?JSON['parse'](_0x116a9a[_0x40e9ea]):[],_0x331856=_0x35c78d[_0x1bd05e(0x25e)](_0xe88d23=>JSON['parse'](_0xe88d23));break;case _0x1bd05e(0x1c6):_0x331856=_0x116a9a[_0x40e9ea]!==''?new Function(JSON[_0x1bd05e(0x362)](_0x116a9a[_0x40e9ea])):new Function(_0x1bd05e(0x2b6));break;case _0x1bd05e(0x27b):_0x35c78d=_0x116a9a[_0x40e9ea]!==''?JSON[_0x1bd05e(0x362)](_0x116a9a[_0x40e9ea]):[],_0x331856=_0x35c78d['map'](_0x2ceb17=>new Function(JSON['parse'](_0x2ceb17)));break;case'STR':_0x331856=_0x116a9a[_0x40e9ea]!==''?String(_0x116a9a[_0x40e9ea]):'';break;case _0x1bd05e(0x215):_0x35c78d=_0x116a9a[_0x40e9ea]!==''?JSON[_0x1bd05e(0x362)](_0x116a9a[_0x40e9ea]):[],_0x331856=_0x35c78d['map'](_0x356d9a=>String(_0x356d9a));break;case'STRUCT':_0x17d97d=_0x116a9a[_0x40e9ea]!==''?JSON[_0x1bd05e(0x362)](_0x116a9a[_0x40e9ea]):{},_0x331856=VisuMZ[_0x1bd05e(0x1c0)]({},_0x17d97d);break;case _0x1bd05e(0x1ee):_0x35c78d=_0x116a9a[_0x40e9ea]!==''?JSON[_0x1bd05e(0x362)](_0x116a9a[_0x40e9ea]):[],_0x331856=_0x35c78d['map'](_0x51e565=>VisuMZ[_0x1bd05e(0x1c0)]({},JSON[_0x1bd05e(0x362)](_0x51e565)));break;default:continue;}_0x3b736c[_0x544e0b]=_0x331856;}else{this[_0x1bd05e(0x2e0)]=new _0x355a09(0x48,0x24);const _0x5c40a3=this[_0x1bd05e(0x299)]()?this[_0x1bd05e(0x299)]()[_0x1bd05e(0x1f4)]():_0x1bd05e(0x271)[_0x1bd05e(0x2d4)](this[_0x1bd05e(0x351)],this[_0x1bd05e(0x2c1)]);this[_0x1bd05e(0x2e0)][_0x1bd05e(0x373)](_0x5c40a3,0x0,0x0,0x48,0x24,_0x1bd05e(0x2ae));}}}else{const _0x208a3e=_0x1cb2c6[_0x1bd05e(0x289)],_0x223952=[_0x1bd05e(0x25f),_0x1bd05e(0x338)][_0x1bd05e(0x1ac)](_0x208a3e[_0x1bd05e(0x2a9)]);return _0x223952;}}return _0x3b736c;},(_0x290285=>{const _0x542828=_0xefec4f,_0x43acc4=_0x290285[_0x542828(0x1f4)];for(const _0x551649 of dependencies){if(_0x542828(0x298)===_0x542828(0x298)){if(!Imported[_0x551649]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x542828(0x2d4)](_0x43acc4,_0x551649)),SceneManager[_0x542828(0x249)]();break;}}else this[_0x542828(0x1e7)]=this[_0x542828(0x1b7)]();}const _0x3ffaa4=_0x290285[_0x542828(0x2e2)];if(_0x3ffaa4[_0x542828(0x1dd)](/\[Version[ ](.*?)\]/i)){const _0x3079d3=Number(RegExp['$1']);_0x3079d3!==VisuMZ[label][_0x542828(0x32e)]&&(alert(_0x542828(0x1fa)[_0x542828(0x2d4)](_0x43acc4,_0x3079d3)),SceneManager[_0x542828(0x249)]());}if(_0x3ffaa4[_0x542828(0x1dd)](/\[Tier[ ](\d+)\]/i)){const _0x3a85f8=Number(RegExp['$1']);_0x3a85f8<tier?(alert(_0x542828(0x237)[_0x542828(0x2d4)](_0x43acc4,_0x3a85f8,tier)),SceneManager[_0x542828(0x249)]()):tier=Math['max'](_0x3a85f8,tier);}VisuMZ[_0x542828(0x1c0)](VisuMZ[label][_0x542828(0x289)],_0x290285[_0x542828(0x2ee)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0xefec4f(0x1f4)],_0xefec4f(0x19b),_0x4e4e4b=>{const _0x2140b7=_0xefec4f;VisuMZ[_0x2140b7(0x1c0)](_0x4e4e4b,_0x4e4e4b);const _0x46f2ce=_0x4e4e4b[_0x2140b7(0x1c1)],_0x558f27=_0x4e4e4b[_0x2140b7(0x1c8)];for(const _0x106560 of _0x46f2ce){if(_0x2140b7(0x2f2)===_0x2140b7(0x234))this[_0x2140b7(0x1aa)]=_0x2140b7(0x236);else{const _0x28f4ab=$gameActors['actor'](_0x106560);if(!_0x28f4ab)continue;_0x28f4ab['_stbTurnOrderGraphicType']='icon',_0x28f4ab[_0x2140b7(0x24c)]=_0x558f27;}}}),PluginManager[_0xefec4f(0x1b8)](pluginData[_0xefec4f(0x1f4)],'StbTurnOrderActorFace',_0x2e8577=>{const _0x4e9710=_0xefec4f;VisuMZ['ConvertParams'](_0x2e8577,_0x2e8577);const _0x39c907=_0x2e8577[_0x4e9710(0x1c1)],_0x1cff02=_0x2e8577[_0x4e9710(0x1db)],_0x4c3f6f=_0x2e8577['FaceIndex'];for(const _0x140bd0 of _0x39c907){if('KeizH'===_0x4e9710(0x350)){const _0x163b48=_0x441441['Settings'],_0x99f9c2=this[_0x4e9710(0x238)](),_0x493425=_0x163b48[_0x4e9710(0x2d0)],_0x41e887=_0x163b48[_0x4e9710(0x208)],_0x1eeedc=_0x3ddeae[_0x4e9710(0x30d)]['_stbTurnOrderWindow'];if(!_0x1eeedc)return;const _0x1f588d=this[_0x4e9710(0x290)]();this[_0x4e9710(0x23b)]=_0x163b48[_0x4e9710(0x2bc)],this[_0x4e9710(0x35a)]=_0x99f9c2?_0x163b48[_0x4e9710(0x1cb)]*_0x1f588d:0x0,this[_0x4e9710(0x324)]=_0x99f9c2?0x0:_0x163b48[_0x4e9710(0x1cb)]*_0x1f588d,_0x1f588d>0x0&&(this[_0x4e9710(0x35a)]+=_0x99f9c2?_0x41e887:0x0,this[_0x4e9710(0x324)]+=_0x99f9c2?0x0:_0x41e887),_0x493425?this['_positionTargetX']=_0x99f9c2?_0x1eeedc['width']-this[_0x4e9710(0x35a)]-_0x163b48[_0x4e9710(0x1cb)]:0x0:this[_0x4e9710(0x324)]=_0x99f9c2?0x0:_0x1eeedc[_0x4e9710(0x370)]-this[_0x4e9710(0x324)]-_0x163b48[_0x4e9710(0x1cb)];}else{const _0x7c67c6=$gameActors['actor'](_0x140bd0);if(!_0x7c67c6)continue;_0x7c67c6[_0x4e9710(0x1e7)]='face',_0x7c67c6[_0x4e9710(0x2bf)]=_0x1cff02,_0x7c67c6[_0x4e9710(0x27a)]=_0x4c3f6f;}}}),PluginManager[_0xefec4f(0x1b8)](pluginData[_0xefec4f(0x1f4)],_0xefec4f(0x38e),_0x532d6e=>{const _0x268c79=_0xefec4f;VisuMZ[_0x268c79(0x1c0)](_0x532d6e,_0x532d6e);const _0x474bd6=_0x532d6e[_0x268c79(0x1c1)];for(const _0x3f966a of _0x474bd6){const _0x50f2da=$gameActors[_0x268c79(0x1e9)](_0x3f966a);if(!_0x50f2da)continue;_0x50f2da['clearTurnOrderSTBGraphics']();}}),PluginManager[_0xefec4f(0x1b8)](pluginData[_0xefec4f(0x1f4)],_0xefec4f(0x1f0),_0x419b72=>{const _0xfad8fb=_0xefec4f;VisuMZ[_0xfad8fb(0x1c0)](_0x419b72,_0x419b72);const _0x53e48e=_0x419b72[_0xfad8fb(0x211)],_0x4cbbc2=_0x419b72[_0xfad8fb(0x1c8)];for(const _0x19bedc of _0x53e48e){if('UYnqe'!==_0xfad8fb(0x286))_0x2ccdfe[_0xfad8fb(0x369)]['Game_Battler_makeSpeed']['call'](this);else{const _0x131686=$gameTroop[_0xfad8fb(0x224)]()[_0x19bedc];if(!_0x131686)continue;_0x131686['_stbTurnOrderGraphicType']=_0xfad8fb(0x2fd),_0x131686[_0xfad8fb(0x24c)]=_0x4cbbc2;}}}),PluginManager[_0xefec4f(0x1b8)](pluginData['name'],_0xefec4f(0x26d),_0x47b53c=>{const _0x1cd308=_0xefec4f;VisuMZ[_0x1cd308(0x1c0)](_0x47b53c,_0x47b53c);const _0x257e74=_0x47b53c[_0x1cd308(0x211)],_0x1464ce=_0x47b53c[_0x1cd308(0x1db)],_0x85fba5=_0x47b53c[_0x1cd308(0x21b)];for(const _0x33ab13 of _0x257e74){if(_0x1cd308(0x36c)!==_0x1cd308(0x36c))this['initialize'](...arguments);else{const _0x5c7107=$gameTroop[_0x1cd308(0x224)]()[_0x33ab13];if(!_0x5c7107)continue;_0x5c7107[_0x1cd308(0x1e7)]=_0x1cd308(0x236),_0x5c7107['_stbTurnOrderFaceName']=_0x1464ce,_0x5c7107[_0x1cd308(0x27a)]=_0x85fba5;}}}),PluginManager[_0xefec4f(0x1b8)](pluginData['name'],_0xefec4f(0x1a6),_0xe00b44=>{const _0x4121f6=_0xefec4f;VisuMZ['ConvertParams'](_0xe00b44,_0xe00b44);const _0x1967a8=_0xe00b44['Enemies'];for(const _0x5c7ec1 of _0x1967a8){const _0x272537=$gameTroop[_0x4121f6(0x224)]()[_0x5c7ec1];if(!_0x272537)continue;_0x272537['clearTurnOrderSTBGraphics']();}}),PluginManager[_0xefec4f(0x1b8)](pluginData[_0xefec4f(0x1f4)],_0xefec4f(0x1d4),_0x162b2c=>{const _0x53b9f9=_0xefec4f;VisuMZ[_0x53b9f9(0x1c0)](_0x162b2c,_0x162b2c);const _0xe0ec86=_0x162b2c[_0x53b9f9(0x1b1)];$gameSystem[_0x53b9f9(0x332)](_0xe0ec86);}),VisuMZ[_0xefec4f(0x369)]['RegExp']={'Instant':/<STB (?:INSTANT|INSTANT CAST|Instant Use)>/i,'CannotBeExploited':/<STB CANNOT BE EXPLOITED>/i,'CannotBeExploiter':/<STB CANNOT BE EXPLOITER>/i,'ExploitedStates':/<STB EXPLOITED GAIN (?:STATE|STATES):[ ](.*)>/i,'ExploiterStates':/<STB EXPLOITER GAIN (?:STATE|STATES):[ ](.*)>/i},DataManager['getStateIdWithName']=function(_0x12f8c6){const _0x18d9c0=_0xefec4f;_0x12f8c6=_0x12f8c6[_0x18d9c0(0x382)]()[_0x18d9c0(0x278)](),this[_0x18d9c0(0x2fc)]=this[_0x18d9c0(0x2fc)]||{};if(this['_stateIDs'][_0x12f8c6])return this['_stateIDs'][_0x12f8c6];for(const _0x65ec32 of $dataStates){if(_0x18d9c0(0x308)===_0x18d9c0(0x1ad))_0x50ce6b['BattleSystemSTB'][_0x18d9c0(0x389)][_0x18d9c0(0x2e1)](this),_0x4a8bb1[_0x18d9c0(0x251)]()&&this[_0x18d9c0(0x358)]();else{if(!_0x65ec32)continue;this[_0x18d9c0(0x2fc)][_0x65ec32[_0x18d9c0(0x1f4)][_0x18d9c0(0x382)]()[_0x18d9c0(0x278)]()]=_0x65ec32['id'];}}return this[_0x18d9c0(0x2fc)][_0x12f8c6]||0x0;},ImageManager['svActorHorzCells']=ImageManager[_0xefec4f(0x36a)]||0x9,ImageManager[_0xefec4f(0x27d)]=ImageManager[_0xefec4f(0x27d)]||0x6,SceneManager[_0xefec4f(0x1d9)]=function(){const _0x187486=_0xefec4f;return this[_0x187486(0x30d)]&&this[_0x187486(0x30d)][_0x187486(0x1fd)]===Scene_Battle;},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x31e)]=BattleManager[_0xefec4f(0x2c9)],BattleManager['battleSys']=function(){const _0xf923c2=_0xefec4f;if(this['isSTB']())return'STB';return VisuMZ[_0xf923c2(0x369)][_0xf923c2(0x31e)][_0xf923c2(0x2e1)](this);},BattleManager['isSTB']=function(){const _0x11671a=_0xefec4f;return $gameSystem[_0x11671a(0x248)]()===_0x11671a(0x1a0);},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x364)]=BattleManager['isTpb'],BattleManager[_0xefec4f(0x349)]=function(){const _0x41583b=_0xefec4f;if(this['isSTB']())return![];return VisuMZ[_0x41583b(0x369)]['BattleManager_isTpb'][_0x41583b(0x2e1)](this);},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x2d2)]=BattleManager[_0xefec4f(0x29c)],BattleManager['isActiveTpb']=function(){const _0x4e6c3d=_0xefec4f;if(this['isSTB']())return![];return VisuMZ['BattleSystemSTB'][_0x4e6c3d(0x2d2)][_0x4e6c3d(0x2e1)](this);},VisuMZ['BattleSystemSTB'][_0xefec4f(0x1ae)]=BattleManager['isTurnBased'],BattleManager[_0xefec4f(0x2b3)]=function(){const _0x252ed2=_0xefec4f;if(this[_0x252ed2(0x251)]())return!![];return VisuMZ['BattleSystemSTB']['BattleManager_isTurnBased']['call'](this);},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x386)]=BattleManager['startInput'],BattleManager['startInput']=function(){const _0xcb3440=_0xefec4f;VisuMZ['BattleSystemSTB'][_0xcb3440(0x386)][_0xcb3440(0x2e1)](this);if(this[_0xcb3440(0x251)]()&&$gameParty[_0xcb3440(0x276)]()&&!this[_0xcb3440(0x1fb)])this[_0xcb3440(0x288)]();},BattleManager[_0xefec4f(0x288)]=function(){this['startTurn']();},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x380)]=BattleManager[_0xefec4f(0x1f9)],BattleManager[_0xefec4f(0x1f9)]=function(){const _0x4dd4c0=_0xefec4f;this[_0x4dd4c0(0x251)]()?'coyhe'!==_0x4dd4c0(0x28e)?(this[_0x4dd4c0(0x1dc)]===_0x23de41&&this[_0x4dd4c0(0x233)](),this[_0x4dd4c0(0x1dc)]=_0x5913d6):this['processTurnSTB']():VisuMZ[_0x4dd4c0(0x369)][_0x4dd4c0(0x380)]['call'](this);},BattleManager['processTurnSTB']=function(){const _0x1ad526=_0xefec4f,_0x35a0f7=this[_0x1ad526(0x2f3)];if(_0x35a0f7[_0x1ad526(0x214)]()&&_0x35a0f7[_0x1ad526(0x276)]()){const _0x2e5970=_0x35a0f7['currentAction']();if(!_0x2e5970)VisuMZ[_0x1ad526(0x369)][_0x1ad526(0x380)][_0x1ad526(0x2e1)](this);else _0x2e5970['_forceAction']?VisuMZ[_0x1ad526(0x369)][_0x1ad526(0x380)]['call'](this):_0x1ad526(0x383)!==_0x1ad526(0x383)?this[_0x1ad526(0x2a0)][_0x1ad526(0x1bc)](this[_0x1ad526(0x2f3)]):(this[_0x1ad526(0x2ff)]=_0x35a0f7,this[_0x1ad526(0x258)]());}else VisuMZ[_0x1ad526(0x369)]['BattleManager_processTurn'][_0x1ad526(0x2e1)](this);},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x20f)]=BattleManager[_0xefec4f(0x28b)],BattleManager[_0xefec4f(0x28b)]=function(){const _0x304748=_0xefec4f;if(this['isSTB']()){if(_0x304748(0x2ab)!=='syMFL')VisuMZ['BattleSystemSTB'][_0x304748(0x380)]['call'](this);else{const _0x228ea5=_0x54a4d8['AnimationID'],_0x5efb40=_0x4114fe[_0x304748(0x2be)],_0x2beb49=_0x28c24e[_0x304748(0x1e3)];_0x391a09[_0x304748(0x329)]([this],_0x228ea5,_0x5efb40,_0x2beb49);}}else VisuMZ[_0x304748(0x369)][_0x304748(0x20f)][_0x304748(0x2e1)](this);},VisuMZ[_0xefec4f(0x369)]['BattleManager_selectNextActor']=BattleManager[_0xefec4f(0x226)],BattleManager[_0xefec4f(0x226)]=function(){const _0x1858af=_0xefec4f;this['isSTB']()?this['selectNextActorSTB']():VisuMZ[_0x1858af(0x369)][_0x1858af(0x207)]['call'](this);},BattleManager[_0xefec4f(0x273)]=function(){const _0x1265c4=_0xefec4f;this[_0x1265c4(0x2ff)]=null,this[_0x1265c4(0x33b)]=![];},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x242)]=BattleManager[_0xefec4f(0x277)],BattleManager[_0xefec4f(0x277)]=function(){const _0x40d91b=_0xefec4f;VisuMZ[_0x40d91b(0x369)][_0x40d91b(0x242)]['call'](this),this[_0x40d91b(0x23f)]();},BattleManager[_0xefec4f(0x23f)]=function(){const _0x132b0a=_0xefec4f;if(!this[_0x132b0a(0x251)]())return;this[_0x132b0a(0x374)]();this[_0x132b0a(0x259)][_0x132b0a(0x2b8)]>0x0&&(this[_0x132b0a(0x2f3)]&&(!this[_0x132b0a(0x2a0)][_0x132b0a(0x1ac)](this[_0x132b0a(0x2f3)])&&this[_0x132b0a(0x2a0)]['unshift'](this[_0x132b0a(0x2f3)])),this[_0x132b0a(0x2f3)]=this[_0x132b0a(0x2a1)]());;},BattleManager[_0xefec4f(0x33a)]=function(){const _0x2204a3=_0xefec4f;return VisuMZ[_0x2204a3(0x369)][_0x2204a3(0x289)][_0x2204a3(0x22f)][_0x2204a3(0x307)];},BattleManager[_0xefec4f(0x360)]=function(){const _0x2fc48f=_0xefec4f,_0x4bce3a=$gameParty['aliveMembers']()['filter'](_0x2ecf6f=>_0x2ecf6f[_0x2fc48f(0x2ed)]()),_0x4785f9=_0x4bce3a[_0x2fc48f(0x1ef)](_0x14ee15=>_0x14ee15[_0x2fc48f(0x262)]());return _0x4bce3a[_0x2fc48f(0x2b8)]===_0x4785f9['length'];},BattleManager['areAllEnemiesExploited']=function(){const _0x3605ca=_0xefec4f,_0x4bbfa3=$gameTroop[_0x3605ca(0x21a)]()[_0x3605ca(0x1ef)](_0x208364=>_0x208364[_0x3605ca(0x2ed)]()),_0x541dd4=_0x4bbfa3['filter'](_0x274c8c=>_0x274c8c[_0x3605ca(0x262)]());return _0x4bbfa3[_0x3605ca(0x2b8)]===_0x541dd4['length'];},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x367)]=BattleManager['makeActionOrders'],BattleManager[_0xefec4f(0x297)]=function(){const _0x58320c=_0xefec4f;VisuMZ[_0x58320c(0x369)][_0x58320c(0x367)][_0x58320c(0x2e1)](this),this[_0x58320c(0x251)]()&&(this[_0x58320c(0x374)](),this[_0x58320c(0x19c)](),this[_0x58320c(0x1d6)]());},BattleManager['removeActionBattlersSTB']=function(){const _0x38bc59=_0xefec4f;if(!this[_0x38bc59(0x251)]())return;this['_actionBattlers']=this[_0x38bc59(0x2a0)]||[],this[_0x38bc59(0x2a0)]=this[_0x38bc59(0x2a0)]['filter'](_0x4cd346=>_0x4cd346&&_0x4cd346[_0x38bc59(0x2ed)]()&&_0x4cd346[_0x38bc59(0x23e)]()),this[_0x38bc59(0x19c)]();},BattleManager['updateTurnOrderSTB']=function(_0x3e02be){const _0x5175e1=_0xefec4f;if(!this[_0x5175e1(0x251)]())return;const _0x2e2050=SceneManager[_0x5175e1(0x30d)][_0x5175e1(0x2d6)];if(!_0x2e2050)return;_0x2e2050[_0x5175e1(0x36d)](_0x3e02be);},BattleManager[_0xefec4f(0x1d6)]=function(){const _0x5671b8=_0xefec4f;for(const _0x46851d of this[_0x5671b8(0x335)]()){if(!_0x46851d)continue;_0x46851d[_0x5671b8(0x388)](0x0);}},VisuMZ['BattleSystemSTB'][_0xefec4f(0x341)]=Game_System['prototype'][_0xefec4f(0x313)],Game_System[_0xefec4f(0x294)][_0xefec4f(0x313)]=function(){const _0x59fb00=_0xefec4f;VisuMZ[_0x59fb00(0x369)][_0x59fb00(0x341)]['call'](this),this['initBattleSystemSTB']();},Game_System[_0xefec4f(0x294)][_0xefec4f(0x319)]=function(){this['_stbTurnOrderVisible']=!![];},Game_System[_0xefec4f(0x294)]['isBattleSystemSTBTurnOrderVisible']=function(){const _0x2da307=_0xefec4f;if(this[_0x2da307(0x222)]===undefined){if(_0x2da307(0x2ef)===_0x2da307(0x2ef))this['initBattleSystemSTB']();else return this[_0x2da307(0x351)]?this[_0x2da307(0x351)][_0x2da307(0x224)]()[this[_0x2da307(0x2c1)]]:null;}return this[_0x2da307(0x222)];},Game_System[_0xefec4f(0x294)]['setBattleSystemSTBTurnOrderVisible']=function(_0x17f0a8){const _0x1fd22c=_0xefec4f;this['_stbTurnOrderVisible']===undefined&&this[_0x1fd22c(0x319)](),this[_0x1fd22c(0x222)]=_0x17f0a8;},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x366)]=Game_Action[_0xefec4f(0x294)][_0xefec4f(0x25c)],Game_Action[_0xefec4f(0x294)][_0xefec4f(0x25c)]=function(){const _0x145d2e=_0xefec4f;if(BattleManager[_0x145d2e(0x251)]()){if(_0x145d2e(0x31f)!==_0x145d2e(0x1a5))return 0x0;else this[_0x145d2e(0x22e)]();}else return VisuMZ[_0x145d2e(0x369)][_0x145d2e(0x366)][_0x145d2e(0x2e1)](this);},VisuMZ[_0xefec4f(0x369)]['Game_Action_applyGlobal']=Game_Action[_0xefec4f(0x294)]['applyGlobal'],Game_Action[_0xefec4f(0x294)]['applyGlobal']=function(){const _0x16176b=_0xefec4f;VisuMZ['BattleSystemSTB'][_0x16176b(0x20e)][_0x16176b(0x2e1)](this),this[_0x16176b(0x2b5)]();},Game_Action['prototype']['applyGlobalBattleSystemSTB']=function(){const _0x16c3f9=_0xefec4f;if(!SceneManager[_0x16c3f9(0x1d9)]())return;if(!BattleManager[_0x16c3f9(0x251)]())return;const _0x5132cb=this[_0x16c3f9(0x1ca)](),_0x5a6e60=VisuMZ['BattleSystemSTB'][_0x16c3f9(0x2c0)],_0x157efc=VisuMZ['BattleSystemSTB'][_0x16c3f9(0x289)][_0x16c3f9(0x2a5)];_0x5132cb&&_0x5132cb[_0x16c3f9(0x317)][_0x16c3f9(0x1dd)](_0x5a6e60[_0x16c3f9(0x2a3)])&&(_0x16c3f9(0x27f)!==_0x16c3f9(0x27f)?this['startFade'](0xff):this[_0x16c3f9(0x2f6)]()[_0x16c3f9(0x1b0)](0x1));const _0x45c64b=_0x157efc[_0x16c3f9(0x281)][_0x16c3f9(0x2e1)](this);this[_0x16c3f9(0x2f6)]()[_0x16c3f9(0x2a4)](_0x45c64b);},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x21f)]=Game_Action[_0xefec4f(0x294)][_0xefec4f(0x33c)],Game_Action[_0xefec4f(0x294)][_0xefec4f(0x33c)]=function(){const _0x2439bf=_0xefec4f;VisuMZ['BattleSystemSTB']['Game_Action_clear'][_0x2439bf(0x2e1)](this),this[_0x2439bf(0x2ec)]();},Game_Action[_0xefec4f(0x294)][_0xefec4f(0x2ec)]=function(){const _0xfd8e05=_0xefec4f;this[_0xfd8e05(0x1b4)]=![];},Game_Action[_0xefec4f(0x294)][_0xefec4f(0x37f)]=function(){const _0x308a3a=_0xefec4f;return this['_stbExploitAdvantageFlag']===undefined&&this[_0x308a3a(0x2ec)](),this['_stbExploitAdvantageFlag'];},Game_Action[_0xefec4f(0x294)][_0xefec4f(0x359)]=function(_0x372b72){const _0x309832=_0xefec4f;this[_0x309832(0x1b4)]===undefined&&this[_0x309832(0x2ec)](),this[_0x309832(0x1b4)]=_0x372b72;},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x2fe)]=Game_Action[_0xefec4f(0x294)][_0xefec4f(0x1bb)],Game_Action[_0xefec4f(0x294)]['executeDamage']=function(_0x8b6a76,_0x4bba86){const _0xbda742=_0xefec4f;VisuMZ[_0xbda742(0x369)]['Game_Action_executeDamage'][_0xbda742(0x2e1)](this,_0x8b6a76,_0x4bba86),this[_0xbda742(0x246)](_0x8b6a76);},Game_Action[_0xefec4f(0x294)]['executeDamageSTB']=function(_0x5c7cb1){const _0x77631=_0xefec4f;if(!SceneManager[_0x77631(0x1d9)]())return;if(!BattleManager[_0x77631(0x251)]())return;if(!BattleManager[_0x77631(0x33a)]())return;if(_0x5c7cb1[_0x77631(0x372)]()===this[_0x77631(0x2f6)]()[_0x77631(0x372)]())return;const _0x2b413c=VisuMZ[_0x77631(0x369)][_0x77631(0x289)][_0x77631(0x22f)],_0x5bbb68=_0x5c7cb1['result']();_0x2b413c['ExploitCritical']&&_0x5bbb68[_0x77631(0x24a)]&&(this[_0x77631(0x2f6)]()['performSTBExploiter'](_0x5c7cb1,this),_0x5c7cb1['becomeSTBExploited'](this[_0x77631(0x2f6)](),this));if(_0x2b413c[_0x77631(0x29e)]){if(_0x77631(0x22a)!==_0x77631(0x1c4)){const _0x48dabf=this['calcElementRate'](_0x5c7cb1);_0x48dabf>=_0x2b413c[_0x77631(0x354)]&&(this[_0x77631(0x2f6)]()[_0x77631(0x368)](_0x5c7cb1,this),_0x5c7cb1[_0x77631(0x218)](this['subject'](),this));}else this[_0x77631(0x256)]=this['_homeX']=_0x4f4b53['x'],this[_0x77631(0x2db)]=this[_0x77631(0x1de)]=_0x2dbbfd['y'],this[_0x77631(0x387)]=_0x1c706f[_0x77631(0x336)],this[_0x77631(0x2a7)]=_0x4f5879['height'],this[_0x77631(0x325)]=0x0;}},VisuMZ['BattleSystemSTB'][_0xefec4f(0x365)]=Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x274)],Game_BattlerBase[_0xefec4f(0x294)]['initMembers']=function(){const _0x301f38=_0xefec4f;VisuMZ[_0x301f38(0x369)][_0x301f38(0x365)][_0x301f38(0x2e1)](this),this['initMembersBattleSystemSTB']();},Game_BattlerBase[_0xefec4f(0x294)]['initMembersBattleSystemSTB']=function(){const _0x2df13b=_0xefec4f;this[_0x2df13b(0x279)](),this[_0x2df13b(0x1e4)]();},Game_BattlerBase[_0xefec4f(0x294)]['clearSTBNextTurnSpeed']=function(){const _0x24a47e=_0xefec4f;this[_0x24a47e(0x34d)]=0x0;},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x29a)]=function(){const _0x14efea=_0xefec4f;if(this['_stbNextTurnSpeed']===undefined){if(_0x14efea(0x26e)!==_0x14efea(0x26e)){const _0x596b0d=_0x21bd8c[_0x14efea(0x259)];if(_0x596b0d['length']>0x0&&_0x596b0d[0x0]!==this)return;const _0x19cee7=this[_0x14efea(0x299)]();if(_0x19cee7)_0x19cee7[_0x14efea(0x209)]();}else this[_0x14efea(0x233)]();}return this[_0x14efea(0x34d)];},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x388)]=function(_0x47d0fc){const _0x819e09=_0xefec4f;this['_stbNextTurnSpeed']===undefined&&this[_0x819e09(0x233)](),this[_0x819e09(0x34d)]=_0x47d0fc;},Game_BattlerBase['prototype']['addSTBNextTurnSpeed']=function(_0x24fd1b){const _0x2d88c2=_0xefec4f;this['_stbNextTurnSpeed']===undefined&&this[_0x2d88c2(0x233)](),_0x24fd1b+=this['getSTBNextTurnSpeed'](),this['setSTBNextTurnSpeed'](_0x24fd1b);},Game_BattlerBase[_0xefec4f(0x294)]['clearSTBExploit']=function(){const _0x4bffef=_0xefec4f;this[_0x4bffef(0x1dc)]=![];},Game_BattlerBase[_0xefec4f(0x294)]['isSTBExploited']=function(){const _0x45b132=_0xefec4f;return this[_0x45b132(0x1dc)]===undefined&&this['initMembersBattleSystemSTB'](),this[_0x45b132(0x1dc)];},Game_BattlerBase['prototype'][_0xefec4f(0x34b)]=function(_0x56ab97){const _0x5375ce=_0xefec4f;this[_0x5375ce(0x1dc)]===undefined&&this[_0x5375ce(0x233)](),this[_0x5375ce(0x1dc)]=_0x56ab97;},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x300)]=function(){const _0x449075=_0xefec4f,_0x1ed19f=VisuMZ[_0x449075(0x369)][_0x449075(0x2c0)]['CannotBeExploited'];return this[_0x449075(0x254)]()[_0x449075(0x223)](_0x1a9ac2=>_0x1a9ac2[_0x449075(0x317)][_0x449075(0x1dd)](_0x1ed19f));},Game_BattlerBase['prototype'][_0xefec4f(0x2a6)]=function(){const _0x5def24=_0xefec4f,_0x1fdee1=VisuMZ[_0x5def24(0x369)]['RegExp'][_0x5def24(0x376)];return this['traitObjects']()[_0x5def24(0x223)](_0x28db83=>_0x28db83[_0x5def24(0x317)][_0x5def24(0x1dd)](_0x1fdee1));},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x1cd)]=function(){const _0xff31fe=_0xefec4f;delete this[_0xff31fe(0x1e7)],delete this[_0xff31fe(0x2bf)],delete this[_0xff31fe(0x27a)],delete this[_0xff31fe(0x24c)];},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x230)]=function(){const _0x5bafc1=_0xefec4f;if(this[_0x5bafc1(0x1e7)]===undefined){if('ZHZSc'==='fpzXR'){if(!this[_0x5bafc1(0x217)])return;const _0x132a6d=this[_0x5bafc1(0x299)]();if(!_0x132a6d)return;if(this[_0x5bafc1(0x384)]===_0x132a6d[_0x5bafc1(0x384)]&&this[_0x5bafc1(0x1f1)]===_0x132a6d[_0x5bafc1(0x1f1)])return;this[_0x5bafc1(0x384)]=_0x132a6d[_0x5bafc1(0x384)],this[_0x5bafc1(0x1f1)]=_0x132a6d['_plural'];const _0xa4e948=_0x1edbfb['Settings'],_0x1c2495=this['isHorz'](),_0x53defa=this[_0x5bafc1(0x19e)](),_0x543977=this[_0x5bafc1(0x1a4)](),_0x2b8d16=this[_0x5bafc1(0x217)][_0x5bafc1(0x2e0)];_0x2b8d16[_0x5bafc1(0x33c)]();if(!this[_0x5bafc1(0x1f1)])return;_0x2b8d16['fontFace']=_0xa4e948['EnemyBattlerFontFace']||_0x573186[_0x5bafc1(0x1c2)](),_0x2b8d16[_0x5bafc1(0x2d7)]=_0xa4e948[_0x5bafc1(0x375)]||0x10,_0x1c2495?_0x2b8d16[_0x5bafc1(0x373)](this['_letter'][_0x5bafc1(0x278)](),0x0,_0x543977/0x2,_0x53defa,_0x543977/0x2,_0x5bafc1(0x2ae)):_0x2b8d16[_0x5bafc1(0x373)](this[_0x5bafc1(0x384)]['trim'](),0x0,0x2,_0x53defa-0x8,_0x543977-0x4,'right');}else this[_0x5bafc1(0x1e7)]=this['createTurnOrderSTBGraphicType']();}return this[_0x5bafc1(0x1e7)];},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x1b7)]=function(){const _0x4073b2=_0xefec4f;return Window_STB_TurnOrder[_0x4073b2(0x289)][_0x4073b2(0x231)];},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x219)]=function(){const _0x2aaf23=_0xefec4f;return this[_0x2aaf23(0x2bf)]===undefined&&(this[_0x2aaf23(0x2bf)]=this[_0x2aaf23(0x328)]()),this[_0x2aaf23(0x2bf)];},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x328)]=function(){const _0x4f37cd=_0xefec4f;return Window_STB_TurnOrder[_0x4f37cd(0x289)][_0x4f37cd(0x2c2)];},Game_BattlerBase['prototype']['TurnOrderSTBGraphicFaceIndex']=function(){const _0x3cdfd2=_0xefec4f;return this[_0x3cdfd2(0x27a)]===undefined&&(_0x3cdfd2(0x21d)!==_0x3cdfd2(0x35f)?this[_0x3cdfd2(0x27a)]=this[_0x3cdfd2(0x2cf)]():this['isSTB']()?this[_0x3cdfd2(0x273)]():_0x1af1cd[_0x3cdfd2(0x369)]['BattleManager_selectNextActor'][_0x3cdfd2(0x2e1)](this)),this[_0x3cdfd2(0x27a)];},Game_BattlerBase[_0xefec4f(0x294)]['createTurnOrderSTBGraphicFaceIndex']=function(){const _0x28ca87=_0xefec4f;return Window_STB_TurnOrder[_0x28ca87(0x289)][_0x28ca87(0x1a3)];},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x227)]=function(){const _0x2eee6f=_0xefec4f;if(this[_0x2eee6f(0x24c)]===undefined){if(_0x2eee6f(0x25b)==='LlpBr')this[_0x2eee6f(0x24c)]=this[_0x2eee6f(0x22b)]();else return this[_0x2eee6f(0x299)]();}return this['_stbTurnOrderIconIndex'];},Game_BattlerBase[_0xefec4f(0x294)][_0xefec4f(0x22b)]=function(){const _0x3c4c42=_0xefec4f;return Window_STB_TurnOrder[_0x3c4c42(0x289)][_0x3c4c42(0x1e5)];},Game_BattlerBase[_0xefec4f(0x294)]['setSTBGraphicIconIndex']=function(_0x22eec6){this['_stbTurnOrderIconIndex']=_0x22eec6;},VisuMZ['BattleSystemSTB'][_0xefec4f(0x23c)]=Game_BattlerBase['prototype'][_0xefec4f(0x20c)],Game_BattlerBase['prototype']['hide']=function(){const _0x5bf58c=_0xefec4f;VisuMZ[_0x5bf58c(0x369)][_0x5bf58c(0x23c)][_0x5bf58c(0x2e1)](this),BattleManager[_0x5bf58c(0x374)]();},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x1ab)]=Game_BattlerBase['prototype']['appear'],Game_BattlerBase['prototype'][_0xefec4f(0x33d)]=function(){const _0x17d3d8=_0xefec4f;VisuMZ[_0x17d3d8(0x369)][_0x17d3d8(0x1ab)][_0x17d3d8(0x2e1)](this),BattleManager['removeActionBattlersSTB']();},VisuMZ['BattleSystemSTB']['Game_Battler_performCollapse']=Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x1e2)],Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x1e2)]=function(){const _0x29f54a=_0xefec4f;VisuMZ[_0x29f54a(0x369)][_0x29f54a(0x239)][_0x29f54a(0x2e1)](this),BattleManager[_0x29f54a(0x374)]();},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x2b0)]=Game_Battler['prototype'][_0xefec4f(0x30e)],Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x30e)]=function(_0x9b9e5){const _0x5760c7=_0xefec4f;VisuMZ[_0x5760c7(0x369)]['Game_Battler_onBattleStart'][_0x5760c7(0x2e1)](this,_0x9b9e5),this[_0x5760c7(0x37d)](_0x9b9e5);},Game_Battler[_0xefec4f(0x294)]['onBattleStartSTB']=function(_0x3e16dc){const _0x51b1b4=_0xefec4f;if(!BattleManager[_0x51b1b4(0x251)]())return;this['clearSTBExploit']();const _0x43aafd=new Game_Action(this);this['setSTBNextTurnSpeed'](0x0);},VisuMZ[_0xefec4f(0x369)]['Game_Battler_onTurnEnd']=Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x1e8)],Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x1e8)]=function(){const _0x5acd94=_0xefec4f;VisuMZ[_0x5acd94(0x369)][_0x5acd94(0x38f)][_0x5acd94(0x2e1)](this),BattleManager[_0x5acd94(0x251)]()&&VisuMZ[_0x5acd94(0x369)][_0x5acd94(0x289)][_0x5acd94(0x22f)][_0x5acd94(0x2ca)]&&('uaKbK'==='MFnfe'?(_0x178adf[_0x5acd94(0x369)][_0x5acd94(0x1ab)][_0x5acd94(0x2e1)](this),_0x2b9af7[_0x5acd94(0x374)]()):this[_0x5acd94(0x1e4)]());},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x389)]=Game_Battler[_0xefec4f(0x294)]['performActionEnd'],Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x244)]=function(){const _0x177439=_0xefec4f;VisuMZ[_0x177439(0x369)][_0x177439(0x389)][_0x177439(0x2e1)](this),BattleManager[_0x177439(0x251)]()&&this[_0x177439(0x358)]();},Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x358)]=function(){const _0x430f97=_0xefec4f;if(this['numActions']()>0x0&&this===BattleManager[_0x430f97(0x2f3)]){const _0x4505da=BattleManager[_0x430f97(0x259)];if(_0x4505da[_0x430f97(0x2b8)]>0x0&&_0x4505da[0x0]!==this)return;const _0x39e282=this['battler']();if(_0x39e282)_0x39e282[_0x430f97(0x209)]();}},Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x245)]=function(){const _0xec9ef2=_0xefec4f;return VisuMZ[_0xec9ef2(0x316)]['Settings']['Mechanics'][_0xec9ef2(0x205)];},VisuMZ['BattleSystemSTB']['Game_Battler_makeSpeed']=Game_Battler['prototype'][_0xefec4f(0x202)],Game_Battler[_0xefec4f(0x294)]['makeSpeed']=function(){const _0x4e1313=_0xefec4f;BattleManager[_0x4e1313(0x251)]()?this[_0x4e1313(0x301)]():VisuMZ[_0x4e1313(0x369)]['Game_Battler_makeSpeed'][_0x4e1313(0x2e1)](this);},Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x301)]=function(){const _0xa6d1dc=_0xefec4f;this['_speed']=VisuMZ['BattleSystemSTB'][_0xa6d1dc(0x289)][_0xa6d1dc(0x2a5)]['InitialSpeedJS']['call'](this);},Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x2b2)]=function(){const _0x57cae1=_0xefec4f,_0x4ed54f=this[_0x57cae1(0x214)]()?this['currentClass']()[_0x57cae1(0x317)]:this[_0x57cae1(0x2f9)]()[_0x57cae1(0x317)];if(_0x4ed54f[_0x57cae1(0x1dd)](VisuMZ[_0x57cae1(0x369)][_0x57cae1(0x2c0)][_0x57cae1(0x2cc)]))return VisuMZ[_0x57cae1(0x369)][_0x57cae1(0x2d1)](RegExp['$1']);return VisuMZ['BattleSystemSTB'][_0x57cae1(0x289)][_0x57cae1(0x280)][_0x57cae1(0x1b5)]||[];},Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x2fb)]=function(){const _0x3249eb=_0xefec4f,_0x39e6f2=this[_0x3249eb(0x214)]()?this[_0x3249eb(0x19a)]()[_0x3249eb(0x317)]:this['enemy']()[_0x3249eb(0x317)];if(_0x39e6f2[_0x3249eb(0x1dd)](VisuMZ['BattleSystemSTB'][_0x3249eb(0x2c0)][_0x3249eb(0x1cf)]))return _0x3249eb(0x2df)!==_0x3249eb(0x2df)?_0x2ff482['Settings'][_0x3249eb(0x2c2)]:VisuMZ[_0x3249eb(0x369)][_0x3249eb(0x2d1)](RegExp['$1']);return VisuMZ['BattleSystemSTB'][_0x3249eb(0x289)][_0x3249eb(0x28d)][_0x3249eb(0x1b5)]||[];},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x2d1)]=function(_0x448c5c){const _0x563712=_0xefec4f,_0x40e4d9=_0x448c5c[_0x563712(0x379)](','),_0xbe27a5=[];for(let _0x7bfd65 of _0x40e4d9){_0x7bfd65=(String(_0x7bfd65)||'')[_0x563712(0x278)]();const _0x5b55ff=/^\d+$/[_0x563712(0x31d)](_0x7bfd65);_0x5b55ff?_0x563712(0x302)===_0x563712(0x240)?(_0x447c59[_0x563712(0x369)][_0x563712(0x23c)]['call'](this),_0x1b9080['removeActionBattlersSTB']()):_0xbe27a5[_0x563712(0x2e5)](Number(_0x7bfd65)):_0xbe27a5['push'](DataManager[_0x563712(0x2d8)](_0x7bfd65));}return _0xbe27a5;},Game_Battler[_0xefec4f(0x294)]['becomeSTBExploited']=function(_0x418fad,_0x43cd34){const _0x125ff1=_0xefec4f;if(!BattleManager[_0x125ff1(0x251)]())return;if(!BattleManager[_0x125ff1(0x33a)]())return;if(this[_0x125ff1(0x262)]())return;const _0x4acbb8=VisuMZ[_0x125ff1(0x369)]['Settings']['Exploited'];!_0x4acbb8[_0x125ff1(0x24b)]&&(_0x125ff1(0x2ac)!==_0x125ff1(0x2a8)?this['setSTBExploited'](!![]):this[_0x125ff1(0x293)]());if(this[_0x125ff1(0x300)]())return;if(this['hp']<=0x0)return;this[_0x125ff1(0x260)](_0x4acbb8);if(this['hp']>0x0||!this[_0x125ff1(0x26b)]())for(const _0x171565 of this[_0x125ff1(0x2b2)]()){if(!$dataStates[_0x171565])continue;this['addState'](_0x171565);}_0x4acbb8[_0x125ff1(0x2c3)]&&_0x4acbb8['CustomJS'][_0x125ff1(0x2e1)](this,_0x418fad,_0x43cd34);if(this[_0x125ff1(0x214)]()&&BattleManager['areAllActorsExploited']()){const _0x45f23d=_0x4acbb8['vsActorsFullExploit'];_0x45f23d>0x0&&$dataCommonEvents[_0x45f23d]&&$gameTemp['reserveCommonEvent'](_0x45f23d);}else{if(this['isEnemy']()&&BattleManager[_0x125ff1(0x1b9)]()){if('YjKvK'==='YjKvK'){const _0x57975a=_0x4acbb8['vsEnemiesFullExploit'];_0x57975a>0x0&&$dataCommonEvents[_0x57975a]&&$gameTemp[_0x125ff1(0x377)](_0x57975a);}else return _0x13e4f4[_0x125ff1(0x316)]['Settings']['Mechanics']['AllowRandomSpeed'];}}},Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x368)]=function(_0x15cf09,_0x7590b9){const _0x5ed52f=_0xefec4f;if(!BattleManager[_0x5ed52f(0x251)]())return;if(!BattleManager['isSTBExploitSystemEnabled']())return;if(_0x7590b9[_0x5ed52f(0x37f)]())return;if(_0x15cf09[_0x5ed52f(0x262)]())return;const _0x43a2ee=VisuMZ[_0x5ed52f(0x369)][_0x5ed52f(0x289)][_0x5ed52f(0x28d)];!_0x43a2ee[_0x5ed52f(0x270)]&&_0x7590b9['setSTBExploitedFlag'](!![]);if(this[_0x5ed52f(0x2a6)]())return;this[_0x5ed52f(0x260)](_0x43a2ee);_0x43a2ee['ExtraActions']>0x0&&(_0x5ed52f(0x2c8)===_0x5ed52f(0x2c8)?this[_0x5ed52f(0x1b0)](_0x43a2ee[_0x5ed52f(0x352)]):this[_0x5ed52f(0x2ec)]());for(const _0x48d1aa of this[_0x5ed52f(0x2fb)]()){if(!$dataStates[_0x48d1aa])continue;this[_0x5ed52f(0x37a)](_0x48d1aa);}_0x43a2ee['CustomJS']&&_0x43a2ee[_0x5ed52f(0x2c3)][_0x5ed52f(0x2e1)](this,_0x15cf09,_0x7590b9);},Game_Battler[_0xefec4f(0x294)][_0xefec4f(0x260)]=function(_0x43e8d4){const _0x1e77cf=_0xefec4f;if(!_0x43e8d4)return;if(_0x43e8d4[_0x1e77cf(0x1bf)]){const _0x4c40b0=_0x43e8d4[_0x1e77cf(0x1bf)],_0x2b85a6=_0x43e8d4[_0x1e77cf(0x2be)],_0x21343b=_0x43e8d4['Mute'];$gameTemp[_0x1e77cf(0x329)]([this],_0x4c40b0,_0x2b85a6,_0x21343b);}if(this[_0x1e77cf(0x299)]()&&_0x43e8d4['PopupText'][_0x1e77cf(0x2b8)]>0x0){if(_0x1e77cf(0x22c)!==_0x1e77cf(0x22c)){if(!this[_0x1e77cf(0x238)]())return;const _0x5044f7=_0x36414b[_0x1e77cf(0x369)][_0x1e77cf(0x289)][_0x1e77cf(0x2c5)];if(!_0x5044f7[_0x1e77cf(0x32f)])return;const _0x49acf6=_0x3e78a3[_0x1e77cf(0x224)]()[_0x1e77cf(0x1ef)](_0x354e11=>_0x354e11&&_0x354e11[_0x1e77cf(0x23e)]()&&_0x354e11[_0x1e77cf(0x2ed)]())[_0x1e77cf(0x2b8)],_0x2c8a30=_0x12ccc8[_0x1e77cf(0x224)]()[_0x1e77cf(0x1ef)](_0x5e77cd=>_0x5e77cd&&_0x5e77cd[_0x1e77cf(0x23e)]()&&_0x5e77cd['isAppeared']())[_0x1e77cf(0x2b8)],_0x14cced=this[_0x1e77cf(0x1fe)](_0x49acf6,_0x2c8a30);this[_0x1e77cf(0x256)]=_0x14cced['x'],this[_0x1e77cf(0x2db)]=_0x14cced['y'],(this[_0x1e77cf(0x256)]!==this[_0x1e77cf(0x2f0)]||this['_targetHomeY']!==this[_0x1e77cf(0x1de)])&&(this['_homeDuration']=_0x5044f7[_0x1e77cf(0x2bc)]);}else{const _0x54d142=_0x43e8d4[_0x1e77cf(0x2de)],_0x432a3c={'textColor':ColorManager[_0x1e77cf(0x267)](_0x43e8d4[_0x1e77cf(0x346)]),'flashColor':_0x43e8d4[_0x1e77cf(0x2f8)],'flashDuration':_0x43e8d4[_0x1e77cf(0x263)]};this[_0x1e77cf(0x1f5)](_0x54d142,_0x432a3c);}}},Game_Battler['prototype']['stbGainInstant']=function(_0xcab4ef){const _0x47bf0=_0xefec4f;this[_0x47bf0(0x361)]=this[_0x47bf0(0x361)]||[];const _0x2e535b=this[_0x47bf0(0x361)]['length']<=0x0;if(this[_0x47bf0(0x36f)]()){if(_0x47bf0(0x1c5)===_0x47bf0(0x331))_0x1334aa(_0x47bf0(0x1fa)[_0x47bf0(0x2d4)](_0x23fc69,_0x11561f)),_0xc6cbdf[_0x47bf0(0x249)]();else{for(let _0x364da9=0x0;_0x364da9<_0xcab4ef;_0x364da9++){this['_actions']['push'](new Game_Action(this));}if(this[_0x47bf0(0x1f8)]()){const _0x1befb4=this[_0x47bf0(0x2f9)]()['actions'][_0x47bf0(0x1ef)](_0x9c60fd=>this['isActionValid'](_0x9c60fd));if(_0x1befb4[_0x47bf0(0x2b8)]>0x0){if(_0x47bf0(0x29f)==='MoVus'){const _0x1e952a=this[_0x47bf0(0x34f)],_0x45b27c=this[_0x47bf0(0x19e)](),_0x570392=this[_0x47bf0(0x1a4)]();this[_0x47bf0(0x320)]['bitmap']=new _0x2f8f15(_0x45b27c,_0x570392);const _0x4e467e=this[_0x47bf0(0x320)]['bitmap'],_0x4dd1a5=_0x3900f3[_0x47bf0(0x347)],_0x271bed=_0x48e90e[_0x47bf0(0x1ff)],_0x1f376e=_0x2f2f18[_0x47bf0(0x310)](_0x4dd1a5,_0x271bed,_0x45b27c,_0x570392),_0x22efdc=_0x1e952a%0x10*_0x4dd1a5,_0x4c6046=_0x195d9b[_0x47bf0(0x309)](_0x1e952a/0x10)*_0x271bed,_0x2db2f3=_0x2dec0c['floor'](_0x5f29e0[_0x47bf0(0x343)](_0x45b27c-_0x1f376e,0x0)/0x2),_0x1751e8=_0x196481[_0x47bf0(0x309)](_0x35cd58[_0x47bf0(0x343)](_0x570392-_0x1f376e,0x0)/0x2);_0x4e467e['blt'](_0x52f939,_0x22efdc,_0x4c6046,_0x4dd1a5,_0x271bed,_0x2db2f3,_0x1751e8,_0x1f376e,_0x1f376e);}else{let _0x22d3b1;!_0x2e535b&&('lqhsj'===_0x47bf0(0x1af)?_0x22d3b1=this[_0x47bf0(0x361)]['shift']():this[_0x47bf0(0x1b4)]=![]),this['selectAllActions'](_0x1befb4),!_0x2e535b&&(_0x47bf0(0x1fc)===_0x47bf0(0x2e4)?this[_0x47bf0(0x251)]()?_0x207386[_0x47bf0(0x369)][_0x47bf0(0x380)]['call'](this):_0x5a3a81[_0x47bf0(0x369)][_0x47bf0(0x20f)][_0x47bf0(0x2e1)](this):this[_0x47bf0(0x361)][_0x47bf0(0x1bc)](_0x22d3b1));}}}}}},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x2d9)]=Game_Actor[_0xefec4f(0x294)]['selectNextCommand'],Game_Actor[_0xefec4f(0x294)][_0xefec4f(0x357)]=function(){const _0x28cc66=_0xefec4f;if(BattleManager['isSTB']()){if(this[_0x28cc66(0x299)]())this[_0x28cc66(0x299)]()['stepForward']();return![];}return VisuMZ[_0x28cc66(0x369)]['Game_Actor_selectNextCommand'][_0x28cc66(0x2e1)](this);},Game_Actor[_0xefec4f(0x294)][_0xefec4f(0x1b7)]=function(){const _0x3b23ab=_0xefec4f,_0x54313d=this[_0x3b23ab(0x1e9)]()[_0x3b23ab(0x317)];if(_0x54313d['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x54313d[_0x3b23ab(0x1dd)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x3b23ab(0x2fd);}return Window_STB_TurnOrder[_0x3b23ab(0x289)][_0x3b23ab(0x1c3)];},Game_Actor[_0xefec4f(0x294)][_0xefec4f(0x219)]=function(){const _0x25c64a=_0xefec4f,_0x11d03b=this[_0x25c64a(0x1e9)]()[_0x25c64a(0x317)];if(_0x11d03b[_0x25c64a(0x1dd)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x25c64a(0x199)===_0x25c64a(0x199))return String(RegExp['$1']);else{if(this['isSTB']())return![];return _0x28b707[_0x25c64a(0x369)][_0x25c64a(0x2d2)][_0x25c64a(0x2e1)](this);}}return this[_0x25c64a(0x272)]();},Game_Actor[_0xefec4f(0x294)][_0xefec4f(0x1bd)]=function(){const _0x27ab5f=_0xefec4f,_0x4aac0b=this[_0x27ab5f(0x1e9)]()[_0x27ab5f(0x317)];if(_0x4aac0b[_0x27ab5f(0x1dd)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x27ab5f(0x1ea)]();},Game_Actor[_0xefec4f(0x294)][_0xefec4f(0x22b)]=function(){const _0x17486b=_0xefec4f,_0x44dd32=this[_0x17486b(0x1e9)]()[_0x17486b(0x317)];if(_0x44dd32[_0x17486b(0x1dd)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder[_0x17486b(0x289)][_0x17486b(0x36e)];},Game_Enemy[_0xefec4f(0x294)]['createTurnOrderSTBGraphicType']=function(){const _0x1d8b56=_0xefec4f,_0x5b924f=this[_0x1d8b56(0x2f9)]()[_0x1d8b56(0x317)];if(_0x5b924f[_0x1d8b56(0x1dd)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x1d8b56(0x1d7)!==_0x1d8b56(0x1cc))return _0x1d8b56(0x236);else _0x41145e[_0x1d8b56(0x369)][_0x1d8b56(0x2ea)]['call'](this,_0x29a8c1);}else{if(_0x5b924f[_0x1d8b56(0x1dd)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x1d8b56(0x2fd);}return Window_STB_TurnOrder[_0x1d8b56(0x289)][_0x1d8b56(0x231)];},Game_Enemy[_0xefec4f(0x294)]['createTurnOrderSTBGraphicFaceName']=function(){const _0x329324=_0xefec4f,_0x20f8a6=this[_0x329324(0x2f9)]()[_0x329324(0x317)];if(_0x20f8a6['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x329324(0x197)!==_0x329324(0x229))return String(RegExp['$1']);else this[_0x329324(0x252)](0x0);}return Window_STB_TurnOrder[_0x329324(0x289)]['EnemyBattlerFaceName'];},Game_Enemy['prototype'][_0xefec4f(0x2cf)]=function(){const _0x193a81=_0xefec4f,_0x8b39a9=this[_0x193a81(0x2f9)]()['note'];if(_0x8b39a9['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_STB_TurnOrder['Settings'][_0x193a81(0x1a3)];},Game_Enemy[_0xefec4f(0x294)][_0xefec4f(0x22b)]=function(){const _0x507ad4=_0xefec4f,_0x14935c=this[_0x507ad4(0x2f9)]()[_0x507ad4(0x317)];if(_0x14935c[_0x507ad4(0x1dd)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder['Settings'][_0x507ad4(0x1e5)];},VisuMZ['BattleSystemSTB']['Game_Party_removeActor']=Game_Party['prototype'][_0xefec4f(0x34e)],Game_Party[_0xefec4f(0x294)][_0xefec4f(0x34e)]=function(_0x4b2169){const _0x38a68a=_0xefec4f;VisuMZ[_0x38a68a(0x369)]['Game_Party_removeActor'][_0x38a68a(0x2e1)](this,_0x4b2169),SceneManager[_0x38a68a(0x1d9)]()&&BattleManager[_0x38a68a(0x251)]()&&BattleManager[_0x38a68a(0x2a0)][_0x38a68a(0x322)]($gameActors[_0x38a68a(0x1e9)](_0x4b2169));},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x334)]=Scene_Battle[_0xefec4f(0x294)]['createActorCommandWindow'],Scene_Battle['prototype'][_0xefec4f(0x2a2)]=function(){const _0x34081f=_0xefec4f;VisuMZ[_0x34081f(0x369)][_0x34081f(0x334)][_0x34081f(0x2e1)](this),BattleManager[_0x34081f(0x251)]()&&this[_0x34081f(0x19f)]();},Scene_Battle[_0xefec4f(0x294)][_0xefec4f(0x19f)]=function(){const _0x3efe2a=_0xefec4f,_0x132612=this[_0x3efe2a(0x23d)];this['isPartyCommandWindowDisabled']()&&delete _0x132612[_0x3efe2a(0x1d8)]['cancel'];},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x28a)]=Scene_Battle['prototype'][_0xefec4f(0x2e6)],Scene_Battle[_0xefec4f(0x294)]['commandCancel']=function(){const _0x47a8b0=_0xefec4f;if(BattleManager[_0x47a8b0(0x251)]())this['commandCancelSTB']();else{if('VsoEt'===_0x47a8b0(0x2e3))VisuMZ[_0x47a8b0(0x369)][_0x47a8b0(0x28a)][_0x47a8b0(0x2e1)](this);else return _0x4b7bf3['BattleSystemSTB'][_0x47a8b0(0x289)][_0x47a8b0(0x22f)][_0x47a8b0(0x307)];}},Scene_Battle[_0xefec4f(0x294)]['commandCancelSTB']=function(){const _0x1a67de=_0xefec4f;this[_0x1a67de(0x200)][_0x1a67de(0x25a)](),this[_0x1a67de(0x23d)][_0x1a67de(0x275)]();},VisuMZ[_0xefec4f(0x369)]['Scene_Battle_commandFight']=Scene_Battle[_0xefec4f(0x294)][_0xefec4f(0x2af)],Scene_Battle[_0xefec4f(0x294)][_0xefec4f(0x2af)]=function(){const _0x311cc9=_0xefec4f;BattleManager[_0x311cc9(0x251)]()?this[_0x311cc9(0x293)]():VisuMZ[_0x311cc9(0x369)]['Scene_Battle_commandFight'][_0x311cc9(0x2e1)](this);},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x24d)]=Scene_Battle['prototype'][_0xefec4f(0x1a1)],Scene_Battle['prototype']['createAllWindows']=function(){const _0x4cc419=_0xefec4f;VisuMZ[_0x4cc419(0x369)]['Scene_Battle_createAllWindows']['call'](this),this[_0x4cc419(0x26c)]();},Scene_Battle[_0xefec4f(0x294)][_0xefec4f(0x26c)]=function(){const _0x2957c3=_0xefec4f;if(!BattleManager[_0x2957c3(0x251)]())return;this[_0x2957c3(0x2d6)]=new Window_STB_TurnOrder();const _0x4736c5=this[_0x2957c3(0x1a8)](this[_0x2957c3(0x33f)]);this['addChildAt'](this[_0x2957c3(0x2d6)],_0x4736c5),this[_0x2957c3(0x210)](),BattleManager[_0x2957c3(0x19c)](!![]);},Scene_Battle[_0xefec4f(0x294)][_0xefec4f(0x210)]=function(){const _0x3201fd=_0xefec4f,_0x5cc3e1=Window_STB_TurnOrder['Settings'];if(_0x5cc3e1['DisplayPosition']!==_0x3201fd(0x25f))return;if(!_0x5cc3e1[_0x3201fd(0x1a9)])return;if(!this[_0x3201fd(0x37c)])return;const _0xdd7267=this['_stbTurnOrderWindow']['y']-Math[_0x3201fd(0x253)]((Graphics[_0x3201fd(0x370)]-Graphics[_0x3201fd(0x2ba)])/0x2),_0x45a202=_0xdd7267+this[_0x3201fd(0x2d6)]['height'];this[_0x3201fd(0x37c)]['y']=_0x45a202+_0x5cc3e1['ScreenBuffer'];};function Sprite_STB_TurnOrder_Battler(){const _0x11dbe5=_0xefec4f;this[_0x11dbe5(0x313)](...arguments);}Sprite_STB_TurnOrder_Battler['prototype']=Object['create'](Sprite_Clickable[_0xefec4f(0x294)]),Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)]['constructor']=Sprite_STB_TurnOrder_Battler,Sprite_STB_TurnOrder_Battler['prototype']['initialize']=function(_0x165571,_0x1b2bd2){const _0x4889a1=_0xefec4f;this[_0x4889a1(0x274)](_0x165571,_0x1b2bd2),Sprite_Clickable['prototype'][_0x4889a1(0x313)][_0x4889a1(0x2e1)](this),this[_0x4889a1(0x19d)]=0x0,this[_0x4889a1(0x284)](),this[_0x4889a1(0x2b9)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0xefec4f(0x274)]=function(_0x2afbad,_0x1d7132){const _0x19bfd9=_0xefec4f;this['_unit']=_0x2afbad,this[_0x19bfd9(0x2c1)]=_0x1d7132;const _0x408824=Window_STB_TurnOrder[_0x19bfd9(0x289)],_0x1937f1=this[_0x19bfd9(0x238)](),_0x5c7870=this[_0x19bfd9(0x1e6)]();this[_0x19bfd9(0x23b)]=0x0,this['_positionTargetX']=_0x1937f1?_0x408824[_0x19bfd9(0x1cb)]*_0x5c7870:0x0,this[_0x19bfd9(0x324)]=_0x1937f1?0x0:_0x408824[_0x19bfd9(0x1cb)]*_0x5c7870,this[_0x19bfd9(0x344)]=0x0,this[_0x19bfd9(0x1e1)]=0xff,this[_0x19bfd9(0x32d)]=![],this[_0x19bfd9(0x2e9)]=![],this[_0x19bfd9(0x304)]=0x0,this[_0x19bfd9(0x1d2)]=0x0;},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x284)]=function(){const _0x3772ee=_0xefec4f;this[_0x3772ee(0x20b)](),this[_0x3772ee(0x1ba)](),this['createGraphicSprite'](),this[_0x3772ee(0x265)](),this[_0x3772ee(0x303)]();},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)]['createInitialPositions']=function(){const _0x44213e=_0xefec4f;this['x']=this[_0x44213e(0x35a)],this['y']=this[_0x44213e(0x324)];},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x238)]=function(){const _0x48147e=_0xefec4f,_0x7bb647=Window_STB_TurnOrder[_0x48147e(0x289)],_0x1e57e9=['top',_0x48147e(0x338)][_0x48147e(0x1ac)](_0x7bb647[_0x48147e(0x2a9)]);return _0x1e57e9;},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x19e)]=function(){const _0x339abc=_0xefec4f,_0x2fc477=Window_STB_TurnOrder[_0x339abc(0x289)];return this[_0x339abc(0x238)]()?_0x2fc477[_0x339abc(0x1cb)]:_0x2fc477[_0x339abc(0x31b)];},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x1a4)]=function(){const _0x8d6d0a=_0xefec4f,_0x35f8b6=Window_STB_TurnOrder[_0x8d6d0a(0x289)];return this[_0x8d6d0a(0x238)]()?_0x35f8b6[_0x8d6d0a(0x31b)]:_0x35f8b6[_0x8d6d0a(0x1cb)];},Sprite_STB_TurnOrder_Battler['prototype'][_0xefec4f(0x35d)]=function(){const _0x29c2a4=_0xefec4f;this[_0x29c2a4(0x2e0)]=new Bitmap(0x48,0x24);const _0x5f1af3=this[_0x29c2a4(0x299)]()?this[_0x29c2a4(0x299)]()[_0x29c2a4(0x1f4)]():_0x29c2a4(0x271)['format'](this[_0x29c2a4(0x351)],this[_0x29c2a4(0x2c1)]);this['bitmap'][_0x29c2a4(0x373)](_0x5f1af3,0x0,0x0,0x48,0x24,_0x29c2a4(0x2ae));},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x1ba)]=function(){const _0x580fe5=_0xefec4f;if(!Window_STB_TurnOrder[_0x580fe5(0x289)][_0x580fe5(0x203)])return;const _0xabdb9=Window_STB_TurnOrder[_0x580fe5(0x289)],_0x3efa58=this[_0x580fe5(0x351)]===$gameParty?_0x580fe5(0x355):_0x580fe5(0x2f1),_0x1fd06d=_0x580fe5(0x1f3)[_0x580fe5(0x2d4)](_0x3efa58),_0x2f3a78=new Sprite();_0x2f3a78[_0x580fe5(0x2e7)]['x']=this[_0x580fe5(0x2e7)]['x'],_0x2f3a78[_0x580fe5(0x2e7)]['y']=this[_0x580fe5(0x2e7)]['y'];if(_0xabdb9[_0x1fd06d]){if(_0x580fe5(0x381)!==_0x580fe5(0x381))return this[_0x580fe5(0x2bf)]===_0x2fb159&&(this[_0x580fe5(0x2bf)]=this['createTurnOrderSTBGraphicFaceName']()),this[_0x580fe5(0x2bf)];else _0x2f3a78[_0x580fe5(0x2e0)]=ImageManager[_0x580fe5(0x206)](_0xabdb9[_0x1fd06d]);}else{if(_0x580fe5(0x340)===_0x580fe5(0x30a)){const _0x49563a=_0x2b1d02(_0x5cb871['$1']);_0x49563a!==_0x2bf214[_0x55cc25][_0x580fe5(0x32e)]&&(_0x57999a(_0x580fe5(0x1fa)[_0x580fe5(0x2d4)](_0x58cbca,_0x49563a)),_0x396bdd['exit']());}else{const _0x4c357f=this['bitmapWidth'](),_0x328374=this[_0x580fe5(0x1a4)]();_0x2f3a78[_0x580fe5(0x2e0)]=new Bitmap(_0x4c357f,_0x328374);const _0xc1b04c=ColorManager[_0x580fe5(0x267)](_0xabdb9['%1BgColor1'[_0x580fe5(0x2d4)](_0x3efa58)]),_0x121afb=ColorManager[_0x580fe5(0x267)](_0xabdb9['%1BgColor2'['format'](_0x3efa58)]);_0x2f3a78[_0x580fe5(0x2e0)]['gradientFillRect'](0x0,0x0,_0x4c357f,_0x328374,_0xc1b04c,_0x121afb,!![]);}}this[_0x580fe5(0x333)]=_0x2f3a78,this['addChild'](this['_backgroundSprite']),this[_0x580fe5(0x336)]=this[_0x580fe5(0x333)]['width'],this[_0x580fe5(0x370)]=this[_0x580fe5(0x333)]['height'];},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x38b)]=function(){const _0x24edde=_0xefec4f,_0x1346ae=new Sprite();_0x1346ae['anchor']['x']=this[_0x24edde(0x2e7)]['x'],_0x1346ae['anchor']['y']=this[_0x24edde(0x2e7)]['y'],this[_0x24edde(0x320)]=_0x1346ae,this[_0x24edde(0x1b6)](this['_graphicSprite']),this[_0x24edde(0x2ce)]();},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x265)]=function(){const _0x7a3b6d=_0xefec4f;if(!Window_STB_TurnOrder[_0x7a3b6d(0x289)][_0x7a3b6d(0x326)])return;const _0x534b1a=Window_STB_TurnOrder['Settings'],_0x2487c8=this[_0x7a3b6d(0x351)]===$gameParty?_0x7a3b6d(0x355):_0x7a3b6d(0x2f1),_0x21481f=_0x7a3b6d(0x255)[_0x7a3b6d(0x2d4)](_0x2487c8),_0x227154=new Sprite();_0x227154[_0x7a3b6d(0x2e7)]['x']=this[_0x7a3b6d(0x2e7)]['x'],_0x227154[_0x7a3b6d(0x2e7)]['y']=this[_0x7a3b6d(0x2e7)]['y'];if(_0x534b1a[_0x21481f])_0x227154[_0x7a3b6d(0x2e0)]=ImageManager[_0x7a3b6d(0x206)](_0x534b1a[_0x21481f]);else{let _0x1ff8f9=this[_0x7a3b6d(0x19e)](),_0x616586=this[_0x7a3b6d(0x1a4)](),_0x359c0f=_0x534b1a[_0x7a3b6d(0x221)];_0x227154[_0x7a3b6d(0x2e0)]=new Bitmap(_0x1ff8f9,_0x616586);const _0x2aef1f=_0x7a3b6d(0x37b),_0x1bac93=ColorManager['getColor'](_0x534b1a['%1BorderColor'[_0x7a3b6d(0x2d4)](_0x2487c8)]);_0x227154[_0x7a3b6d(0x2e0)][_0x7a3b6d(0x1e0)](0x0,0x0,_0x1ff8f9,_0x616586,_0x2aef1f),_0x1ff8f9-=0x2,_0x616586-=0x2,_0x227154['bitmap'][_0x7a3b6d(0x1e0)](0x1,0x1,_0x1ff8f9,_0x616586,_0x1bac93),_0x1ff8f9-=_0x359c0f*0x2,_0x616586-=_0x359c0f*0x2,_0x227154['bitmap'][_0x7a3b6d(0x1e0)](0x1+_0x359c0f,0x1+_0x359c0f,_0x1ff8f9,_0x616586,_0x2aef1f),_0x1ff8f9-=0x2,_0x616586-=0x2,_0x359c0f+=0x1,_0x227154[_0x7a3b6d(0x2e0)][_0x7a3b6d(0x250)](0x1+_0x359c0f,0x1+_0x359c0f,_0x1ff8f9,_0x616586);}this[_0x7a3b6d(0x333)]=_0x227154,this[_0x7a3b6d(0x1b6)](this['_backgroundSprite']);},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x303)]=function(){const _0x38be2b=_0xefec4f,_0x48b054=Window_STB_TurnOrder[_0x38be2b(0x289)];if(!_0x48b054[_0x38be2b(0x21c)])return;if(this[_0x38be2b(0x351)]===$gameParty)return;const _0x4e8a92=this[_0x38be2b(0x19e)](),_0x3a2ebf=this[_0x38be2b(0x1a4)](),_0x480b74=new Sprite();_0x480b74[_0x38be2b(0x2e7)]['x']=this['anchor']['x'],_0x480b74[_0x38be2b(0x2e7)]['y']=this[_0x38be2b(0x2e7)]['y'],_0x480b74[_0x38be2b(0x2e0)]=new Bitmap(_0x4e8a92,_0x3a2ebf),this[_0x38be2b(0x217)]=_0x480b74,this['addChild'](this[_0x38be2b(0x217)]);},Sprite_STB_TurnOrder_Battler['prototype'][_0xefec4f(0x299)]=function(){const _0x5409fa=_0xefec4f;return this['_unit']?this['_unit'][_0x5409fa(0x224)]()[this[_0x5409fa(0x2c1)]]:null;},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x212)]=function(){const _0xbe9923=_0xefec4f;Sprite_Clickable[_0xbe9923(0x294)]['update']['call'](this),this[_0xbe9923(0x38a)](),this[_0xbe9923(0x29b)](),this[_0xbe9923(0x2b9)](),this[_0xbe9923(0x1da)](),this[_0xbe9923(0x241)](),this[_0xbe9923(0x201)](),this['updateLetter'](),this[_0xbe9923(0x228)]();},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)]['checkPosition']=function(){const _0x1d607c=_0xefec4f,_0x5e7b66=this[_0x1d607c(0x290)]();if(this['_position']===_0x5e7b66)return;this['_position']=_0x5e7b66;this[_0x1d607c(0x19d)]<0xff&&this[_0x1d607c(0x299)]()&&_0x5e7b66!==this[_0x1d607c(0x1e6)]()&&this[_0x1d607c(0x252)](0xff);if(_0x5e7b66===this[_0x1d607c(0x1e6)]()&&this[_0x1d607c(0x344)]<=0x0&&this[_0x1d607c(0x19d)]>0x0)'IhOfd'===_0x1d607c(0x1d5)?this[_0x1d607c(0x313)](...arguments):this[_0x1d607c(0x252)](0x0);else{if(this[_0x1d607c(0x344)]<=0x0&&this[_0x1d607c(0x19d)]<0xff){if(_0x1d607c(0x1be)!==_0x1d607c(0x1be)){const _0x2806dd=_0x53b81f['Settings'];this['_fadeDuration']=_0x2806dd[_0x1d607c(0x2bc)],this['_fadeTarget']=_0x5d6eaf;}else this[_0x1d607c(0x2b9)]();}}this[_0x1d607c(0x315)]();},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x24e)]=function(){const _0x4d3073=_0xefec4f,_0x14b531=this['containerWindow']();if(!_0x14b531)return;let _0x3061eb=![];if(this['_containerWidth']!==_0x14b531[_0x4d3073(0x336)])_0x3061eb=!![];else this['_containerHeight']!==_0x14b531[_0x4d3073(0x370)]&&('QKBLa'!=='QKBLa'?(this[_0x4d3073(0x1b4)]===_0x3881dd&&this[_0x4d3073(0x2ec)](),this[_0x4d3073(0x1b4)]=_0x1bc148):_0x3061eb=!![]);_0x3061eb&&this[_0x4d3073(0x315)]();},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x315)]=function(){const _0x1dc72e=_0xefec4f,_0x4be214=Window_STB_TurnOrder[_0x1dc72e(0x289)],_0x24fc7f=this[_0x1dc72e(0x238)](),_0x3960f5=_0x4be214[_0x1dc72e(0x2d0)],_0x2badc5=_0x4be214['SubjectDistance'],_0x40645b=SceneManager[_0x1dc72e(0x30d)]['_stbTurnOrderWindow'];if(!_0x40645b)return;const _0x5b737f=this[_0x1dc72e(0x290)]();this[_0x1dc72e(0x23b)]=_0x4be214[_0x1dc72e(0x2bc)],this[_0x1dc72e(0x35a)]=_0x24fc7f?_0x4be214[_0x1dc72e(0x1cb)]*_0x5b737f:0x0,this['_positionTargetY']=_0x24fc7f?0x0:_0x4be214[_0x1dc72e(0x1cb)]*_0x5b737f;if(_0x5b737f>0x0){if('MyAPQ'!==_0x1dc72e(0x2da))this[_0x1dc72e(0x35a)]+=_0x24fc7f?_0x2badc5:0x0,this['_positionTargetY']+=_0x24fc7f?0x0:_0x2badc5;else{const _0x569950=this[_0x1dc72e(0x1e9)]()['note'];if(_0x569950[_0x1dc72e(0x1dd)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x1dc72e(0x236);else{if(_0x569950[_0x1dc72e(0x1dd)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x1dc72e(0x2fd);}return _0x4a76f[_0x1dc72e(0x289)]['ActorBattlerType'];}}_0x3960f5?this[_0x1dc72e(0x35a)]=_0x24fc7f?_0x40645b[_0x1dc72e(0x336)]-this[_0x1dc72e(0x35a)]-_0x4be214['SpriteThin']:0x0:this[_0x1dc72e(0x324)]=_0x24fc7f?0x0:_0x40645b[_0x1dc72e(0x370)]-this['_positionTargetY']-_0x4be214['SpriteThin'];},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x29b)]=function(){const _0x411b53=_0xefec4f;if(this[_0x411b53(0x344)]>0x0)return;if(this[_0x411b53(0x23b)]>0x0){const _0x1ee4a0=this['_positionDuration'];this['x']=(this['x']*(_0x1ee4a0-0x1)+this[_0x411b53(0x35a)])/_0x1ee4a0,this['y']=(this['y']*(_0x1ee4a0-0x1)+this[_0x411b53(0x324)])/_0x1ee4a0,this['_positionDuration']--;}if(this[_0x411b53(0x23b)]<=0x0){if(_0x411b53(0x268)!==_0x411b53(0x268))return this[_0x411b53(0x1fe)](_0x193cf8[_0x411b53(0x2d3)](),0x9,!![]);else{this['x']=this[_0x411b53(0x35a)],this['y']=this[_0x411b53(0x324)];if(this[_0x411b53(0x19d)]<0xff&&!this[_0x411b53(0x29d)]&&this[_0x411b53(0x344)]<=0x0){const _0x28ced9=this[_0x411b53(0x299)]();_0x28ced9&&(this[_0x411b53(0x1e1)]=_0x28ced9[_0x411b53(0x23e)]()&&_0x28ced9[_0x411b53(0x2ed)]()?0xff:0x0);}}}},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x1e6)]=function(){const _0x58a734=_0xefec4f,_0x491f99=Window_STB_TurnOrder[_0x58a734(0x289)],_0xade83e=this[_0x58a734(0x238)]()?_0x491f99[_0x58a734(0x1c9)]:_0x491f99['MaxVertSprites'];return _0xade83e+0x1;},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x318)]=function(){const _0x45176a=_0xefec4f;return SceneManager[_0x45176a(0x30d)][_0x45176a(0x2d6)];},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x290)]=function(){const _0xbcc61b=_0xefec4f,_0x55c962=this[_0xbcc61b(0x299)]();if(!_0x55c962)return this[_0xbcc61b(0x1e6)]();if(_0x55c962===BattleManager['_subject']){if(_0xbcc61b(0x216)!==_0xbcc61b(0x216)){if(!this[_0xbcc61b(0x251)]())return;this[_0xbcc61b(0x374)]();this[_0xbcc61b(0x259)]['length']>0x0&&(this[_0xbcc61b(0x2f3)]&&(!this[_0xbcc61b(0x2a0)][_0xbcc61b(0x1ac)](this[_0xbcc61b(0x2f3)])&&this[_0xbcc61b(0x2a0)][_0xbcc61b(0x1bc)](this[_0xbcc61b(0x2f3)])),this[_0xbcc61b(0x2f3)]=this[_0xbcc61b(0x2a1)]());;}else return 0x0;}if(BattleManager[_0xbcc61b(0x2a0)][_0xbcc61b(0x1ac)](_0x55c962)){const _0x3143e8=BattleManager[_0xbcc61b(0x2a0)][_0xbcc61b(0x2b7)](_0x55c962)+0x1;return _0x3143e8;}return this[_0xbcc61b(0x1e6)]();},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x252)]=function(_0xba6147){const _0x82184b=_0xefec4f,_0x2983b3=Window_STB_TurnOrder[_0x82184b(0x289)];this[_0x82184b(0x344)]=_0x2983b3[_0x82184b(0x2bc)],this[_0x82184b(0x1e1)]=_0xba6147;},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)]['checkOpacity']=function(){const _0x2caa84=_0xefec4f,_0x4ff5b3=this[_0x2caa84(0x299)]();if(!_0x4ff5b3)return;if(this[_0x2caa84(0x32d)]===_0x4ff5b3[_0x2caa84(0x23e)]()&&this['_isAppeared']===_0x4ff5b3[_0x2caa84(0x2ed)]())return;this[_0x2caa84(0x32d)]=_0x4ff5b3[_0x2caa84(0x23e)](),this['_isAppeared']=_0x4ff5b3[_0x2caa84(0x2ed)]();let _0x43687b=this[_0x2caa84(0x32d)]&&this[_0x2caa84(0x2e9)]?0xff:0x0;this[_0x2caa84(0x252)](_0x43687b);},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x1da)]=function(){const _0x281a82=_0xefec4f;if(this['_fadeDuration']>0x0){const _0x574715=this[_0x281a82(0x344)];this['opacity']=(this[_0x281a82(0x19d)]*(_0x574715-0x1)+this[_0x281a82(0x1e1)])/_0x574715,this['_fadeDuration']--;if(this['_fadeDuration']<=0x0){if(_0x281a82(0x291)==='rFgvD')this[_0x281a82(0x38a)](),this[_0x281a82(0x23b)]=0x0,this['updatePosition'](),this[_0x281a82(0x19d)]=this[_0x281a82(0x1e1)];else{let _0x59ba10=this[_0x281a82(0x19e)](),_0x29b470=this[_0x281a82(0x1a4)](),_0x58741f=_0xc1037e[_0x281a82(0x221)];_0x4e51bd[_0x281a82(0x2e0)]=new _0xffac49(_0x59ba10,_0x29b470);const _0x15f7f1=_0x281a82(0x37b),_0xd686a4=_0x348e31[_0x281a82(0x267)](_0x434d8e[_0x281a82(0x2f4)[_0x281a82(0x2d4)](_0x1828d5)]);_0x4d82e0[_0x281a82(0x2e0)][_0x281a82(0x1e0)](0x0,0x0,_0x59ba10,_0x29b470,_0x15f7f1),_0x59ba10-=0x2,_0x29b470-=0x2,_0xec88f7['bitmap'][_0x281a82(0x1e0)](0x1,0x1,_0x59ba10,_0x29b470,_0xd686a4),_0x59ba10-=_0x58741f*0x2,_0x29b470-=_0x58741f*0x2,_0x1632e8[_0x281a82(0x2e0)]['fillRect'](0x1+_0x58741f,0x1+_0x58741f,_0x59ba10,_0x29b470,_0x15f7f1),_0x59ba10-=0x2,_0x29b470-=0x2,_0x58741f+=0x1,_0x381f74[_0x281a82(0x2e0)][_0x281a82(0x250)](0x1+_0x58741f,0x1+_0x58741f,_0x59ba10,_0x29b470);}}}if(this[_0x281a82(0x29d)])return;if(BattleManager['_phase']===_0x281a82(0x2fa)){if(_0x281a82(0x261)==='YHDDQ')return _0x104b5e(_0x577be9['$1']);else this[_0x281a82(0x29d)]=!![],this[_0x281a82(0x252)](0x0);}},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x241)]=function(){const _0x52673d=_0xefec4f,_0x27b3fa=this[_0x52673d(0x299)]();if(!_0x27b3fa)return;const _0x3e4467=Window_STB_TurnOrder[_0x52673d(0x289)],_0x4e15db=this[_0x52673d(0x351)]===$gameParty?_0x52673d(0x355):_0x52673d(0x2f1);let _0xa65a0f=_0x27b3fa[_0x52673d(0x230)]();if(_0x27b3fa[_0x52673d(0x214)]()&&_0xa65a0f==='enemy')_0xa65a0f=_0x52673d(0x236);else{if(_0x27b3fa[_0x52673d(0x1f8)]()&&_0xa65a0f===_0x52673d(0x2f7)){if(_0x52673d(0x1a2)!==_0x52673d(0x243))_0xa65a0f=_0x52673d(0x2f9);else return _0x2482b6[_0x52673d(0x356)]&&_0x5c00b4[_0x52673d(0x2e2)]['includes']('['+_0x57c068+']');}}if(this[_0x52673d(0x1aa)]!==_0xa65a0f)return this[_0x52673d(0x2ce)]();switch(this[_0x52673d(0x1aa)]){case _0x52673d(0x236):if(this['_graphicFaceName']!==_0x27b3fa[_0x52673d(0x219)]()){if('qaLqR'!=='qaLqR')_0x4c4512[_0x52673d(0x369)]['BattleManager_endAction'][_0x52673d(0x2e1)](this),this[_0x52673d(0x23f)]();else return this[_0x52673d(0x2ce)]();}if(this[_0x52673d(0x327)]!==_0x27b3fa[_0x52673d(0x1bd)]()){if(_0x52673d(0x30f)!==_0x52673d(0x32b))return this[_0x52673d(0x2ce)]();else this[_0x52673d(0x2f6)]()['stbGainInstant'](0x1);}break;case'icon':if(this[_0x52673d(0x34f)]!==_0x27b3fa[_0x52673d(0x227)]())return this[_0x52673d(0x2ce)]();break;case _0x52673d(0x2f9):if(_0x27b3fa[_0x52673d(0x24f)]()){if(_0x52673d(0x285)!==_0x52673d(0x1b3)){if(this['_graphicSv']!==_0x27b3fa[_0x52673d(0x31c)]())return this[_0x52673d(0x2ce)]();}else{if(!this[_0x52673d(0x251)]())return;this[_0x52673d(0x2a0)]=this[_0x52673d(0x2a0)]||[],this[_0x52673d(0x2a0)]=this[_0x52673d(0x2a0)][_0x52673d(0x1ef)](_0x46f15f=>_0x46f15f&&_0x46f15f[_0x52673d(0x2ed)]()&&_0x46f15f[_0x52673d(0x23e)]()),this[_0x52673d(0x19c)]();}}else{if(this[_0x52673d(0x30c)]!==_0x27b3fa['battlerName']())return this[_0x52673d(0x2ce)]();}break;case _0x52673d(0x2f7):if(_0x27b3fa[_0x52673d(0x214)]()){if(this[_0x52673d(0x371)]!==_0x27b3fa[_0x52673d(0x1d0)]()){if(_0x52673d(0x20a)!==_0x52673d(0x31a))return this[_0x52673d(0x2ce)]();else{this[_0x52673d(0x351)]=_0x74a635,this[_0x52673d(0x2c1)]=_0x11f495;const _0x50c4b4=_0x21f293[_0x52673d(0x289)],_0x49aea8=this[_0x52673d(0x238)](),_0x2ae068=this[_0x52673d(0x1e6)]();this[_0x52673d(0x23b)]=0x0,this['_positionTargetX']=_0x49aea8?_0x50c4b4['SpriteThin']*_0x2ae068:0x0,this['_positionTargetY']=_0x49aea8?0x0:_0x50c4b4[_0x52673d(0x1cb)]*_0x2ae068,this[_0x52673d(0x344)]=0x0,this[_0x52673d(0x1e1)]=0xff,this['_isAlive']=![],this[_0x52673d(0x2e9)]=![],this[_0x52673d(0x304)]=0x0,this[_0x52673d(0x1d2)]=0x0;}}}else{if(this[_0x52673d(0x30c)]!==_0x27b3fa[_0x52673d(0x1d0)]())return this[_0x52673d(0x2ce)]();}break;}},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)]['processUpdateGraphic']=function(){const _0x39fce2=_0xefec4f,_0xa1abf4=this[_0x39fce2(0x299)]();if(!_0xa1abf4)return;this[_0x39fce2(0x1aa)]=_0xa1abf4[_0x39fce2(0x230)]();if(_0xa1abf4[_0x39fce2(0x214)]()&&this[_0x39fce2(0x1aa)]===_0x39fce2(0x2f9))this[_0x39fce2(0x1aa)]=_0x39fce2(0x236);else _0xa1abf4['isEnemy']()&&this[_0x39fce2(0x1aa)]==='svactor'&&(this[_0x39fce2(0x1aa)]=_0x39fce2(0x2f9));let _0x341691;switch(this[_0x39fce2(0x1aa)]){case _0x39fce2(0x236):this['_graphicFaceName']=_0xa1abf4[_0x39fce2(0x219)](),this[_0x39fce2(0x327)]=_0xa1abf4[_0x39fce2(0x1bd)](),_0x341691=ImageManager[_0x39fce2(0x378)](this[_0x39fce2(0x385)]),_0x341691['addLoadListener'](this[_0x39fce2(0x264)][_0x39fce2(0x2eb)](this,_0x341691));break;case'icon':this[_0x39fce2(0x34f)]=_0xa1abf4['createTurnOrderSTBGraphicIconIndex'](),_0x341691=ImageManager[_0x39fce2(0x206)](_0x39fce2(0x27e)),_0x341691[_0x39fce2(0x225)](this[_0x39fce2(0x1d1)]['bind'](this,_0x341691));break;case _0x39fce2(0x2f9):if(_0xa1abf4[_0x39fce2(0x24f)]())this[_0x39fce2(0x371)]=_0xa1abf4[_0x39fce2(0x31c)](),_0x341691=ImageManager['loadSvActor'](this['_graphicSv']),_0x341691[_0x39fce2(0x225)](this['changeSvActorGraphicBitmap'][_0x39fce2(0x2eb)](this,_0x341691));else{if($gameSystem[_0x39fce2(0x2cb)]())this['_graphicEnemy']=_0xa1abf4['battlerName'](),_0x341691=ImageManager[_0x39fce2(0x34a)](this[_0x39fce2(0x30c)]),_0x341691[_0x39fce2(0x225)](this[_0x39fce2(0x198)]['bind'](this,_0x341691));else{if(_0x39fce2(0x295)!==_0x39fce2(0x295)){if(this['_graphicSv']!==_0x566ef7[_0x39fce2(0x1d0)]())return this[_0x39fce2(0x2ce)]();}else this[_0x39fce2(0x30c)]=_0xa1abf4[_0x39fce2(0x1d0)](),_0x341691=ImageManager[_0x39fce2(0x2bd)](this[_0x39fce2(0x30c)]),_0x341691['addLoadListener'](this[_0x39fce2(0x198)]['bind'](this,_0x341691));}}break;case _0x39fce2(0x2f7):this['_graphicSv']=_0xa1abf4[_0x39fce2(0x1d0)](),_0x341691=ImageManager[_0x39fce2(0x345)](this[_0x39fce2(0x371)]),_0x341691[_0x39fce2(0x225)](this[_0x39fce2(0x27c)]['bind'](this,_0x341691));break;}},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x264)]=function(_0x44a5b9){const _0x294be4=_0xefec4f,_0x1fb6dd=this[_0x294be4(0x327)],_0x561bf0=this[_0x294be4(0x19e)](),_0x376154=this[_0x294be4(0x1a4)](),_0x11db21=Math['max'](_0x561bf0,_0x376154);this[_0x294be4(0x320)]['bitmap']=new Bitmap(_0x561bf0,_0x376154);const _0xf4e128=this[_0x294be4(0x320)][_0x294be4(0x2e0)],_0x42b049=ImageManager[_0x294be4(0x23a)],_0x4845f5=ImageManager[_0x294be4(0x292)],_0x44720a=_0x11db21/Math[_0x294be4(0x343)](_0x42b049,_0x4845f5),_0x2f3816=ImageManager[_0x294be4(0x23a)],_0x1f0cbb=ImageManager[_0x294be4(0x292)],_0x3d4f2f=_0x1fb6dd%0x4*_0x42b049+(_0x42b049-_0x2f3816)/0x2,_0x22dd5e=Math[_0x294be4(0x309)](_0x1fb6dd/0x4)*_0x4845f5+(_0x4845f5-_0x1f0cbb)/0x2,_0x52d8dd=(_0x561bf0-_0x42b049*_0x44720a)/0x2,_0x356a28=(_0x376154-_0x4845f5*_0x44720a)/0x2;_0xf4e128[_0x294be4(0x2cd)](_0x44a5b9,_0x3d4f2f,_0x22dd5e,_0x2f3816,_0x1f0cbb,_0x52d8dd,_0x356a28,_0x11db21,_0x11db21);},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)]['changeIconGraphicBitmap']=function(_0x463f15){const _0x2cb377=_0xefec4f,_0x1ea894=this[_0x2cb377(0x34f)],_0x36b121=this['bitmapWidth'](),_0x374ec4=this[_0x2cb377(0x1a4)]();this[_0x2cb377(0x320)]['bitmap']=new Bitmap(_0x36b121,_0x374ec4);const _0x47da26=this['_graphicSprite']['bitmap'],_0x292317=ImageManager[_0x2cb377(0x347)],_0x211bf2=ImageManager['iconHeight'],_0x59c1df=Math[_0x2cb377(0x310)](_0x292317,_0x211bf2,_0x36b121,_0x374ec4),_0x63dfde=_0x1ea894%0x10*_0x292317,_0x4e148a=Math[_0x2cb377(0x309)](_0x1ea894/0x10)*_0x211bf2,_0x5abaf1=Math['floor'](Math['max'](_0x36b121-_0x59c1df,0x0)/0x2),_0x42666e=Math['floor'](Math[_0x2cb377(0x343)](_0x374ec4-_0x59c1df,0x0)/0x2);_0x47da26[_0x2cb377(0x2cd)](_0x463f15,_0x63dfde,_0x4e148a,_0x292317,_0x211bf2,_0x5abaf1,_0x42666e,_0x59c1df,_0x59c1df);},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)]['changeSvActorGraphicBitmap']=function(_0x571fc1){const _0x369c6f=_0xefec4f,_0x4e8328=this[_0x369c6f(0x19e)](),_0x45f171=this[_0x369c6f(0x1a4)](),_0x35ff95=Math['min'](_0x4e8328,_0x45f171);this['_graphicSprite'][_0x369c6f(0x2e0)]=new Bitmap(_0x4e8328,_0x45f171);const _0x4f48f3=this[_0x369c6f(0x320)][_0x369c6f(0x2e0)],_0x317398=this['_graphicSv'][_0x369c6f(0x1dd)](/\$/i),_0x1c6da0=_0x317398?0x1:ImageManager['svActorHorzCells'],_0xe6e59=_0x317398?0x1:ImageManager[_0x369c6f(0x27d)],_0x501f8f=_0x571fc1['width']/_0x1c6da0,_0x550752=_0x571fc1[_0x369c6f(0x370)]/_0xe6e59,_0x5ce961=Math['min'](0x1,_0x35ff95/_0x501f8f,_0x35ff95/_0x550752),_0x32d469=_0x501f8f*_0x5ce961,_0x4105d9=_0x550752*_0x5ce961,_0x613c2a=Math[_0x369c6f(0x253)]((_0x4e8328-_0x32d469)/0x2),_0x5d88db=Math[_0x369c6f(0x253)]((_0x45f171-_0x4105d9)/0x2);_0x4f48f3['blt'](_0x571fc1,0x0,0x0,_0x501f8f,_0x550752,_0x613c2a,_0x5d88db,_0x32d469,_0x4105d9);},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x198)]=function(_0x30af14){const _0x599f82=_0xefec4f,_0x1102a4=Window_STB_TurnOrder[_0x599f82(0x289)],_0x4ac4f6=this['bitmapWidth'](),_0x469f3e=this[_0x599f82(0x1a4)](),_0x38f642=Math[_0x599f82(0x310)](_0x4ac4f6,_0x469f3e);this[_0x599f82(0x320)]['bitmap']=new Bitmap(_0x4ac4f6,_0x469f3e);const _0x7caf43=this[_0x599f82(0x320)][_0x599f82(0x2e0)],_0xb0cede=Math[_0x599f82(0x310)](0x1,_0x38f642/_0x30af14[_0x599f82(0x336)],_0x38f642/_0x30af14[_0x599f82(0x370)]),_0x17373f=_0x30af14[_0x599f82(0x336)]*_0xb0cede,_0xd00ce9=_0x30af14['height']*_0xb0cede,_0x3891e9=Math[_0x599f82(0x253)]((_0x4ac4f6-_0x17373f)/0x2),_0x3ea4eb=Math[_0x599f82(0x253)]((_0x469f3e-_0xd00ce9)/0x2);_0x7caf43[_0x599f82(0x2cd)](_0x30af14,0x0,0x0,_0x30af14['width'],_0x30af14[_0x599f82(0x370)],_0x3891e9,_0x3ea4eb,_0x17373f,_0xd00ce9);},Sprite_STB_TurnOrder_Battler['prototype'][_0xefec4f(0x201)]=function(){const _0x53f9c6=_0xefec4f,_0x2c7892=this[_0x53f9c6(0x299)]();if(!_0x2c7892)return;if(!_0x2c7892['isEnemy']())return;if(this[_0x53f9c6(0x257)]===_0x2c7892['battlerHue']())return;this[_0x53f9c6(0x257)]=_0x2c7892[_0x53f9c6(0x1ed)]();if(_0x2c7892[_0x53f9c6(0x24f)]())this['_graphicHue']=0x0;this[_0x53f9c6(0x320)][_0x53f9c6(0x37e)](this[_0x53f9c6(0x257)]);},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x2c4)]=function(){const _0x3c6354=_0xefec4f;if(!this[_0x3c6354(0x217)])return;const _0x2cf07b=this['battler']();if(!_0x2cf07b)return;if(this[_0x3c6354(0x384)]===_0x2cf07b[_0x3c6354(0x384)]&&this['_plural']===_0x2cf07b[_0x3c6354(0x1f1)])return;this[_0x3c6354(0x384)]=_0x2cf07b[_0x3c6354(0x384)],this[_0x3c6354(0x1f1)]=_0x2cf07b[_0x3c6354(0x1f1)];const _0x5e7756=Window_STB_TurnOrder['Settings'],_0x2c8c5d=this['isHorz'](),_0x4ebd58=this[_0x3c6354(0x19e)](),_0x1296a9=this[_0x3c6354(0x1a4)](),_0x26efc7=this[_0x3c6354(0x217)]['bitmap'];_0x26efc7[_0x3c6354(0x33c)]();if(!this[_0x3c6354(0x1f1)])return;_0x26efc7[_0x3c6354(0x1b2)]=_0x5e7756[_0x3c6354(0x35c)]||$gameSystem[_0x3c6354(0x1c2)](),_0x26efc7['fontSize']=_0x5e7756[_0x3c6354(0x375)]||0x10;if(_0x2c8c5d)_0x3c6354(0x348)===_0x3c6354(0x348)?_0x26efc7[_0x3c6354(0x373)](this[_0x3c6354(0x384)][_0x3c6354(0x278)](),0x0,_0x1296a9/0x2,_0x4ebd58,_0x1296a9/0x2,_0x3c6354(0x2ae)):(this[_0x3c6354(0x38a)](),this[_0x3c6354(0x23b)]=0x0,this['updatePosition'](),this['opacity']=this['_fadeTarget']);else{if(_0x3c6354(0x232)===_0x3c6354(0x26f)){const _0x527aa5=this[_0x3c6354(0x327)],_0x14dd5b=this['bitmapWidth'](),_0x32e319=this[_0x3c6354(0x1a4)](),_0x5eccec=_0x2775e7[_0x3c6354(0x343)](_0x14dd5b,_0x32e319);this[_0x3c6354(0x320)][_0x3c6354(0x2e0)]=new _0x5d2a41(_0x14dd5b,_0x32e319);const _0x5ec612=this[_0x3c6354(0x320)][_0x3c6354(0x2e0)],_0x47e172=_0x171df[_0x3c6354(0x23a)],_0x58894e=_0x13fbd6[_0x3c6354(0x292)],_0x38022a=_0x5eccec/_0xa7f8dc[_0x3c6354(0x343)](_0x47e172,_0x58894e),_0x5e25e4=_0x462c4b[_0x3c6354(0x23a)],_0x41df38=_0x4a50a7[_0x3c6354(0x292)],_0x2936b1=_0x527aa5%0x4*_0x47e172+(_0x47e172-_0x5e25e4)/0x2,_0x172162=_0x1590c7[_0x3c6354(0x309)](_0x527aa5/0x4)*_0x58894e+(_0x58894e-_0x41df38)/0x2,_0x247e0f=(_0x14dd5b-_0x47e172*_0x38022a)/0x2,_0x5bbded=(_0x32e319-_0x58894e*_0x38022a)/0x2;_0x5ec612[_0x3c6354(0x2cd)](_0x42e58b,_0x2936b1,_0x172162,_0x5e25e4,_0x41df38,_0x247e0f,_0x5bbded,_0x5eccec,_0x5eccec);}else _0x26efc7[_0x3c6354(0x373)](this[_0x3c6354(0x384)][_0x3c6354(0x278)](),0x0,0x2,_0x4ebd58-0x8,_0x1296a9-0x4,_0x3c6354(0x314));}},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x228)]=function(){const _0x5bdb12=_0xefec4f,_0x15010e=this[_0x5bdb12(0x299)]();if(!_0x15010e)return;const _0x262685=_0x15010e[_0x5bdb12(0x299)]();if(!_0x262685)return;const _0x50fba6=_0x262685['mainSprite']();if(!_0x50fba6)return;this['setBlendColor'](_0x50fba6['_blendColor']);},Sprite_STB_TurnOrder_Battler[_0xefec4f(0x294)][_0xefec4f(0x26a)]=function(){const _0x363008=_0xefec4f;return this[_0x363008(0x299)]();},VisuMZ[_0xefec4f(0x369)][_0xefec4f(0x2ea)]=Window_Help[_0xefec4f(0x294)][_0xefec4f(0x36b)],Window_Help[_0xefec4f(0x294)]['setItem']=function(_0x1e331d){const _0x23ef6e=_0xefec4f;if(BattleManager[_0x23ef6e(0x251)]()&&_0x1e331d&&_0x1e331d['note']&&_0x1e331d[_0x23ef6e(0x317)][_0x23ef6e(0x1dd)](/<(?:STB) HELP>\s*([\s\S]*)\s*<\/(?:STB) HELP>/i)){if(_0x23ef6e(0x22d)===_0x23ef6e(0x28f)){const _0xb0da7f=new _0x37530b(_0x920474,_0x2a0486);this['_turnOrderInnerSprite'][_0x23ef6e(0x1b6)](_0xb0da7f),this['_turnOrderContainer']['push'](_0xb0da7f);}else this[_0x23ef6e(0x204)](String(RegExp['$1']));}else VisuMZ[_0x23ef6e(0x369)]['Window_Help_setItem']['call'](this,_0x1e331d);};function Window_STB_TurnOrder(){const _0x5cca0a=_0xefec4f;this[_0x5cca0a(0x313)](...arguments);}Window_STB_TurnOrder['prototype']=Object[_0xefec4f(0x363)](Window_Base[_0xefec4f(0x294)]),Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x1fd)]=Window_STB_TurnOrder,Window_STB_TurnOrder[_0xefec4f(0x289)]=VisuMZ['BattleSystemSTB']['Settings'][_0xefec4f(0x2c5)],Window_STB_TurnOrder['prototype'][_0xefec4f(0x313)]=function(){const _0x3ceb08=_0xefec4f,_0x472837=this[_0x3ceb08(0x296)]();this[_0x3ceb08(0x35e)](_0x472837),Window_Base[_0x3ceb08(0x294)][_0x3ceb08(0x313)][_0x3ceb08(0x2e1)](this,_0x472837),this[_0x3ceb08(0x20d)](),this[_0x3ceb08(0x337)](),this[_0x3ceb08(0x19d)]=0x0;},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x296)]=function(){const _0x312158=_0xefec4f;return this[_0x312158(0x1fe)]($gameParty['maxBattleMembers'](),0x9,!![]);},Window_STB_TurnOrder[_0xefec4f(0x294)]['initHomePositions']=function(_0x3deae8){const _0x681e8e=_0xefec4f;this[_0x681e8e(0x256)]=this[_0x681e8e(0x2f0)]=_0x3deae8['x'],this['_targetHomeY']=this['_homeY']=_0x3deae8['y'],this['_fullWidth']=_0x3deae8[_0x681e8e(0x336)],this['_fullHeight']=_0x3deae8[_0x681e8e(0x370)],this['_homeDuration']=0x0;},Window_STB_TurnOrder[_0xefec4f(0x294)]['createBattlerRect']=function(_0x3e88f9,_0x248865,_0x32dcb0){const _0x2c9aa0=_0xefec4f,_0x39b04d=Window_STB_TurnOrder[_0x2c9aa0(0x289)],_0x11052c=this[_0x2c9aa0(0x238)]()?_0x39b04d[_0x2c9aa0(0x1c9)]:_0x39b04d[_0x2c9aa0(0x2f5)],_0x51cb1a=Math[_0x2c9aa0(0x310)](_0x11052c,_0x3e88f9+_0x248865),_0x3d07ea=SceneManager[_0x2c9aa0(0x30d)][_0x2c9aa0(0x34c)][_0x2c9aa0(0x370)],_0x4117ec=SceneManager[_0x2c9aa0(0x30d)][_0x2c9aa0(0x2aa)][_0x2c9aa0(0x370)],_0x148747=_0x39b04d[_0x2c9aa0(0x208)],_0xf75b9c=Graphics[_0x2c9aa0(0x370)]-_0x3d07ea-_0x4117ec;let _0x571917=0x0,_0x5e4d2f=0x0,_0x54d429=0x0,_0x210998=0x0;switch(_0x39b04d[_0x2c9aa0(0x2a9)]){case'top':_0x571917=_0x39b04d[_0x2c9aa0(0x1cb)]*_0x51cb1a+_0x148747,_0x5e4d2f=_0x39b04d[_0x2c9aa0(0x31b)],_0x54d429=Math['ceil']((Graphics[_0x2c9aa0(0x336)]-_0x571917)/0x2),_0x210998=_0x39b04d[_0x2c9aa0(0x323)];break;case _0x2c9aa0(0x338):_0x571917=_0x39b04d[_0x2c9aa0(0x1cb)]*_0x51cb1a+_0x148747,_0x5e4d2f=_0x39b04d['SpriteLength'],_0x54d429=Math[_0x2c9aa0(0x321)]((Graphics[_0x2c9aa0(0x336)]-_0x571917)/0x2),_0x210998=Graphics[_0x2c9aa0(0x370)]-_0x3d07ea-_0x5e4d2f-_0x39b04d[_0x2c9aa0(0x323)];break;case _0x2c9aa0(0x2dd):_0x571917=_0x39b04d[_0x2c9aa0(0x31b)],_0x5e4d2f=_0x39b04d[_0x2c9aa0(0x1cb)]*_0x51cb1a+_0x148747,_0x54d429=_0x39b04d[_0x2c9aa0(0x323)],_0x210998=Math['ceil']((_0xf75b9c-_0x5e4d2f)/0x2),_0x210998+=_0x4117ec;break;case _0x2c9aa0(0x314):_0x571917=_0x39b04d['SpriteLength'],_0x5e4d2f=_0x39b04d['SpriteThin']*_0x51cb1a+_0x148747,_0x54d429=Graphics[_0x2c9aa0(0x336)]-_0x571917-_0x39b04d[_0x2c9aa0(0x323)],_0x210998=Math[_0x2c9aa0(0x321)]((_0xf75b9c-_0x5e4d2f)/0x2),_0x210998+=_0x4117ec;break;}if(!_0x32dcb0){const _0x28fcb9=Window_STB_TurnOrder[_0x2c9aa0(0x289)][_0x2c9aa0(0x2d0)];let _0x486fa5=Math[_0x2c9aa0(0x310)](_0x11052c,Math[_0x2c9aa0(0x310)]($gameParty[_0x2c9aa0(0x2d3)]()+0x8)-_0x51cb1a);switch(_0x39b04d[_0x2c9aa0(0x2a9)]){case _0x2c9aa0(0x25f):case _0x2c9aa0(0x338):_0x28fcb9&&(_0x54d429-=_0x486fa5*_0x39b04d['SpriteThin']);break;}}return _0x54d429+=_0x39b04d[_0x2c9aa0(0x1a7)],_0x210998+=_0x39b04d['DisplayOffsetY'],new Rectangle(_0x54d429,_0x210998,_0x571917,_0x5e4d2f);},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x287)]=function(){const _0x1d202d=_0xefec4f;this[_0x1d202d(0x1f7)]=0x0;},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x238)]=function(){const _0x4542b6=_0xefec4f,_0x1dfe7c=Window_STB_TurnOrder[_0x4542b6(0x289)],_0x520634=[_0x4542b6(0x25f),_0x4542b6(0x338)][_0x4542b6(0x1ac)](_0x1dfe7c['DisplayPosition']);return _0x520634;},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x20d)]=function(){const _0x490568=_0xefec4f;this[_0x490568(0x2e8)]=new Sprite(),this[_0x490568(0x213)](this[_0x490568(0x2e8)]),this[_0x490568(0x283)]=[];for(let _0x1181c1=0x0;_0x1181c1<$gameParty[_0x490568(0x2d3)]();_0x1181c1++){if(_0x490568(0x312)!==_0x490568(0x312)){if(!_0x1971a7[_0x490568(0x289)][_0x490568(0x203)])return;const _0x3dbb14=_0x4737ca[_0x490568(0x289)],_0x437a24=this['_unit']===_0x51beba?'Actor':_0x490568(0x2f1),_0x9b78d7='%1SystemBg'['format'](_0x437a24),_0x559f83=new _0x45d6be();_0x559f83[_0x490568(0x2e7)]['x']=this['anchor']['x'],_0x559f83['anchor']['y']=this[_0x490568(0x2e7)]['y'];if(_0x3dbb14[_0x9b78d7])_0x559f83[_0x490568(0x2e0)]=_0x5cb763[_0x490568(0x206)](_0x3dbb14[_0x9b78d7]);else{const _0x17592e=this[_0x490568(0x19e)](),_0x314642=this[_0x490568(0x1a4)]();_0x559f83[_0x490568(0x2e0)]=new _0x51dfc5(_0x17592e,_0x314642);const _0x5369d8=_0x329e05[_0x490568(0x267)](_0x3dbb14[_0x490568(0x1d3)[_0x490568(0x2d4)](_0x437a24)]),_0x411329=_0x68a21b[_0x490568(0x267)](_0x3dbb14[_0x490568(0x266)[_0x490568(0x2d4)](_0x437a24)]);_0x559f83[_0x490568(0x2e0)][_0x490568(0x21e)](0x0,0x0,_0x17592e,_0x314642,_0x5369d8,_0x411329,!![]);}this[_0x490568(0x333)]=_0x559f83,this[_0x490568(0x1b6)](this[_0x490568(0x333)]),this[_0x490568(0x336)]=this['_backgroundSprite']['width'],this[_0x490568(0x370)]=this[_0x490568(0x333)][_0x490568(0x370)];}else{const _0x449a89=new Sprite_STB_TurnOrder_Battler($gameParty,_0x1181c1);this[_0x490568(0x2e8)][_0x490568(0x1b6)](_0x449a89),this[_0x490568(0x283)]['push'](_0x449a89);}}for(let _0x34f3ad=0x0;_0x34f3ad<0x8;_0x34f3ad++){const _0x5191a6=new Sprite_STB_TurnOrder_Battler($gameTroop,_0x34f3ad);this['_turnOrderInnerSprite']['addChild'](_0x5191a6),this[_0x490568(0x283)]['push'](_0x5191a6);}},Window_STB_TurnOrder[_0xefec4f(0x294)]['update']=function(){const _0x1c197d=_0xefec4f;Window_Base[_0x1c197d(0x294)][_0x1c197d(0x212)]['call'](this),this[_0x1c197d(0x28c)](),this[_0x1c197d(0x29b)](),this[_0x1c197d(0x282)](),this[_0x1c197d(0x330)](),this[_0x1c197d(0x337)]();},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x28c)]=function(){const _0x5d8594=_0xefec4f;if(this[_0x5d8594(0x325)]>0x0){const _0x339773=this['_homeDuration'];this[_0x5d8594(0x2f0)]=(this[_0x5d8594(0x2f0)]*(_0x339773-0x1)+this[_0x5d8594(0x256)])/_0x339773,this[_0x5d8594(0x1de)]=(this[_0x5d8594(0x1de)]*(_0x339773-0x1)+this[_0x5d8594(0x2db)])/_0x339773,this[_0x5d8594(0x325)]--,this[_0x5d8594(0x325)]<=0x0&&(this[_0x5d8594(0x2f0)]=this[_0x5d8594(0x256)],this[_0x5d8594(0x1de)]=this['_targetHomeY']);}},Window_STB_TurnOrder['prototype'][_0xefec4f(0x29b)]=function(){const _0x763abe=_0xefec4f,_0x20e197=Window_STB_TurnOrder[_0x763abe(0x289)];if(_0x20e197['DisplayPosition']!=='top')return;if(!_0x20e197[_0x763abe(0x235)])return;const _0x530f4f=SceneManager[_0x763abe(0x30d)][_0x763abe(0x2aa)];if(!_0x530f4f)return;if(_0x530f4f['visible'])this['x']=this['_homeX']+(_0x20e197[_0x763abe(0x32c)]||0x0),this['y']=this[_0x763abe(0x1de)]+(_0x20e197[_0x763abe(0x305)]||0x0);else{if(_0x763abe(0x306)!=='suBVA')return this[_0x763abe(0x2ce)]();else this['x']=this[_0x763abe(0x2f0)],this['y']=this['_homeY'];}const _0x3ed077=SceneManager['_scene']['_windowLayer'];if(Window_STB_TurnOrder[_0x763abe(0x2b1)]===undefined){if('YUCmV'==='YUCmV')Window_STB_TurnOrder[_0x763abe(0x2b1)]=Math[_0x763abe(0x253)]((Graphics[_0x763abe(0x336)]-Math[_0x763abe(0x310)](Graphics['boxWidth'],_0x3ed077['width']))/0x2),Window_STB_TurnOrder[_0x763abe(0x342)]=Math[_0x763abe(0x253)]((Graphics[_0x763abe(0x370)]-Math['min'](Graphics[_0x763abe(0x2ba)],_0x3ed077[_0x763abe(0x370)]))/0x2);else{if(this[_0x763abe(0x344)]>0x0){const _0x450534=this[_0x763abe(0x344)];this[_0x763abe(0x19d)]=(this[_0x763abe(0x19d)]*(_0x450534-0x1)+this[_0x763abe(0x1e1)])/_0x450534,this[_0x763abe(0x344)]--,this[_0x763abe(0x344)]<=0x0&&(this[_0x763abe(0x38a)](),this['_positionDuration']=0x0,this['updatePosition'](),this['opacity']=this['_fadeTarget']);}if(this[_0x763abe(0x29d)])return;_0x23e1f4[_0x763abe(0x2ad)]===_0x763abe(0x2fa)&&(this['_isBattleOver']=!![],this[_0x763abe(0x252)](0x0));}}this['x']+=_0x3ed077['x']-Window_STB_TurnOrder['_ogWindowLayerX'],this['y']+=_0x3ed077['y']-Window_STB_TurnOrder['_ogWindowLayerY'];},Window_STB_TurnOrder[_0xefec4f(0x294)]['updateSidePosition']=function(){const _0x28e351=_0xefec4f,_0x48e58e=Window_STB_TurnOrder['Settings'];if(['top']['includes'](_0x48e58e[_0x28e351(0x2a9)]))return;this['x']=this['_homeX'],this['y']=this['_homeY'];const _0x16681b=SceneManager[_0x28e351(0x30d)]['_windowLayer'];this['x']+=_0x16681b['x'],this['y']+=_0x16681b['y'];},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x330)]=function(){const _0x80c5a4=_0xefec4f;if(!this['_turnOrderInnerSprite'])return;const _0x4547c8=this[_0x80c5a4(0x2e8)][_0x80c5a4(0x2bb)];if(!_0x4547c8)return;_0x4547c8['sort'](this[_0x80c5a4(0x32a)][_0x80c5a4(0x2eb)](this));},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x32a)]=function(_0x4283a5,_0x2284ed){const _0x250742=_0xefec4f,_0x3bd2a9=this[_0x250742(0x238)](),_0x570dbf=Window_STB_TurnOrder[_0x250742(0x289)][_0x250742(0x2d0)];if(_0x3bd2a9&&!_0x570dbf){if('KgTNp'===_0x250742(0x2c7))this[_0x250742(0x273)]();else return _0x4283a5['x']-_0x2284ed['x'];}else{if(_0x3bd2a9&&_0x570dbf)return _0x2284ed['x']-_0x4283a5['x'];else{if(!_0x3bd2a9&&_0x570dbf){if(_0x250742(0x220)!=='lvNsY')this[_0x250742(0x1dc)]=![];else return _0x4283a5['y']-_0x2284ed['y'];}else{if(!_0x3bd2a9&&!_0x570dbf)return _0x2284ed['y']-_0x4283a5['y'];}}}},Window_STB_TurnOrder[_0xefec4f(0x294)]['updateVisibility']=function(){const _0xe1f353=_0xefec4f;this[_0xe1f353(0x2d5)]=$gameSystem['isBattleSystemSTBTurnOrderVisible']();},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x36d)]=function(_0x37221e){const _0x3698fe=_0xefec4f;this['_turnOrderContainer'][_0x3698fe(0x247)]((_0x597817,_0x1a5ddc)=>{const _0x312223=_0x3698fe;return _0x597817[_0x312223(0x290)]()-_0x1a5ddc[_0x312223(0x290)]();}),this['recalculateHome']();if(!_0x37221e)return;for(const _0xdae1d2 of this['_turnOrderContainer']){if(_0x3698fe(0x311)===_0x3698fe(0x311)){if(!_0xdae1d2)continue;_0xdae1d2['update'](),_0xdae1d2[_0x3698fe(0x23b)]=0x0;}else delete _0x25282c[_0x3698fe(0x1d8)][_0x3698fe(0x1f6)];}},Window_STB_TurnOrder[_0xefec4f(0x294)][_0xefec4f(0x2b4)]=function(){const _0x19604b=_0xefec4f;if(!this['isHorz']())return;const _0x266e62=VisuMZ['BattleSystemSTB'][_0x19604b(0x289)]['TurnOrder'];if(!_0x266e62[_0x19604b(0x32f)])return;const _0x4aab27=$gameParty[_0x19604b(0x224)]()[_0x19604b(0x1ef)](_0xb0c50d=>_0xb0c50d&&_0xb0c50d['isAlive']()&&_0xb0c50d[_0x19604b(0x2ed)]())[_0x19604b(0x2b8)],_0x1ba7ac=$gameTroop[_0x19604b(0x224)]()[_0x19604b(0x1ef)](_0x2b4494=>_0x2b4494&&_0x2b4494[_0x19604b(0x23e)]()&&_0x2b4494[_0x19604b(0x2ed)]())[_0x19604b(0x2b8)],_0x533e85=this[_0x19604b(0x1fe)](_0x4aab27,_0x1ba7ac);this[_0x19604b(0x256)]=_0x533e85['x'],this[_0x19604b(0x2db)]=_0x533e85['y'],(this[_0x19604b(0x256)]!==this[_0x19604b(0x2f0)]||this['_targetHomeY']!==this[_0x19604b(0x1de)])&&(this[_0x19604b(0x325)]=_0x266e62[_0x19604b(0x2bc)]);};