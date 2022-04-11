//=============================================================================
// VisuStella MZ - Combat Log
// VisuMZ_4_CombatLog.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_CombatLog = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CombatLog = VisuMZ.CombatLog || {};
VisuMZ.CombatLog.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.11] [CombatLog]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Combat_Log_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes text appears way too fast in the battle system or sometimes
 * players may miss what kind of information was delivered on-screen. For times
 * like that, being able to access the Combat Log would be important. The
 * Combat Log records all of the text that appears in the battle log window at
 * the top. The player can access the Combat Log display any time during action
 * selection phase or by holding down the designated Hot Key. Sometimes,
 * players can even review over the Combat Log to try and figure out any kinds
 * of patterns enemies may even have.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Record the events that happen in battle into an accessible Combat Log for
 *   players to go back and review.
 * * Access the Combat Log in-battle through the Party Command Window, Actor
 *   Command Window, or by holding down the Hot Key.
 * * Icons are added to help players quickly differentiate between different
 *   types of events.
 * * Combat Log can have its numbers color-coded to quickly determine their
 *   effects towards action targets.
 * * Players can review past Combat Logs from an option in the Main Menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_1_BattleCore
 * 
 * The VisuStella MZ Battle Core's <Battle Commands> notetag can now add in
 * "Combat Log" to its list to have the Combat Log shown as an option to the
 * Actor Command Window. Do remember to have this option enabled in the Plugin
 * Parameters as well.
 * 
 * ---
 *
 * VisuMZ_1_MessageCore
 *
 * By having the VisuStella MZ Message Core installed, you can enable the
 * Auto Color functions for the Combat Log. Do remember to have this option
 * enabled in the Plugin Parameters as well.
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
 * === Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Bypass Combat Log>
 *
 * - Used for: State Notetags
 * - Insert this notetag inside a state to make its state messages ignored.
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
 * === Combat Log Plugin Commands ===
 * 
 * ---
 *
 * Combat Log: Add Text
 * - Adds custom text to the current Combat Log.
 *
 *   Text:
 *   - What text would you like to add to the Combat Log?
 *
 *   Icon:
 *   - What icon would you like to bind to this entry?
 *
 * ---
 *
 * Combat Log: Add Horizontal Line
 * - Adds a horizontal line to the current Combat Log.
 *
 * ---
 *
 * Combat Log: Bypass Text?
 * - Temporarily bypass adding any new text to the Combat Log until this
 *   is turned off?
 *
 *   Bypass?:
 *   - Bypass text from being added to the Combat Log temporarily?
 *
 * ---
 *
 * Combat Log: Hot Key Enable?
 * - Enables/disables the Combat Log hot key in battle?
 *
 *   Enable?:
 *   - Enables/disables the Combat Log hot key in battle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show in Main Menu?
 * - Shows/hides CombatLog menu inside the Main Menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside the Main Menu.
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * System: Show in Party Command?
 * - Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_PartyCommand.
 *
 * ---
 *
 * System: Show in Actor Command?
 * - Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 *   Show/Hide?:
 *   - Shows/hides Combat Log command inside Window_ActorCommand.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Combat Log. Determine how the commands appear,
 * the hot key used, and accessibility through the Main Menu, Party Command
 * Window, and Actor Command Window.
 *
 * ---
 *
 * General
 * 
 *   Command Name:
 *   - Name of the 'Combat Log' option in the various menus.
 * 
 *   Icon:
 *   - Icon used for each of the 'Combat Log' options.
 * 
 *   Hot Key:
 *   - This is the key used for quickly opening the Combat Log in battle.
 * 
 *   Stored Logs:
 *   - How many combat logs are stored as a history?
 *   - This affects the Combat Log menu.
 *
 * ---
 *
 * Main Menu
 * 
 *   Show in Main Menu?:
 *   - Add the 'Combat Log' option to the Main Menu by default?
 *   - Note! This command will be disabled if the player does not have any
 *     Combat Logs recorded.
 *
 * ---
 *
 * Window_PartyCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_PartyCommand by default?
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Show in Window?:
 *   - Add the 'Combat Log' option to Window_ActorCommand by default?
 * 
 *   Help: Combat Log:
 *   - Help text for Combat Log command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Combat Log Settings
 * ============================================================================
 *
 * Settings regarding the Combat Log contents. Disable any unwanted information
 * you want from here to prevent them from being displayed.
 *
 * ---
 *
 * General
 * 
 *   Show Icons?:
 *   - Show icons in the Combat Log?
 * 
 *   Auto Color?:
 *   - Use auto colors for the Combat Log?
 *   - Requires VisuMZ_1_MessageCore
 * 
 *   Color Numbers?:
 *   - Color numbers for damage differences?
 *
 * ---
 *
 * Battle Start
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Enemy Emerge
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Advantages
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Preemptive Icon:
 *   Surprised Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * End Turn
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Turn Count
 *
 * ---
 *
 * Battle Victory
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Escape
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Battle Defeat
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Action Text
 * 
 *   Show Skill Message 1?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Skill Message 2?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Item Message?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * HP Settings > HP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * HP Settings > No HP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * MP Settings > MP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * MP Settings > No MP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * TP Settings > TP Heal
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * TP Settings > No TP Damage
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text Color:
 *   - Text color used for this event in the Combat Log.
 *
 * ---
 *
 * State Settings
 * 
 *   Show State Add?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Remove?:
 *   - Show this event in the Combat Log?
 * 
 *   Show State Current?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Buff & Debuff Settings
 * 
 *   Show Add Buff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Add Debuff?:
 *   - Show this event in the Combat Log?
 * 
 *   Show Erase Buff?:
 *   - Show this event in the Combat Log?
 *
 * ---
 *
 * Counterattack
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Reflection
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Substitute
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Effect Failure
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Critical Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Missed Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * Evaded Hit
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_CombatLog. Pretty up the scene to fit the rest
 * of your game with these settings!
 *
 * ---
 *
 * Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Settings regarding this plugin's windows. These alter how the windows appear
 * in the battle and menu scenes.
 *
 * ---
 *
 * Combat Log (Battle)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat Log (Menu)
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Combat History (Menu)
 * 
 *   Latest Command:
 *   - Text displayed for latest battle.
 *   - %1 - Battle Count
 * 
 *   Past Command:
 *   - Text displayed for past battles.
 *   - %1 - Battle Count
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compatibility Settings
 * ============================================================================
 *
 * These settings are for creating compatibility with the other VisuStella MZ
 * plugins that can benefit from having their effects recorded inside of the
 * Combat Log.
 *
 * ---
 *
 * Battle System - ATB > Interrupt
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - CTB > Order Change
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Battle System - STB > Instant
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Anti-Damage Barriers > Cancel Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Nullify Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Reduction Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name
 *
 * ---
 *
 * Anti-Damage Barriers > Absorption Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - Damage
 *
 * ---
 *
 * Anti-Damage Barriers > MP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - MP
 *
 * ---
 *
 * Anti-Damage Barriers > TP Dispersion Barrier
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name, %2 - State Name, %3 - TP
 *
 * ---
 *
 * Life State Effects > Auto Life
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Curse
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Doom
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Fragile
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Guts
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Life State Effects > Undead
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
 * 
 *   Text:
 *   - Text displayed for this event in the Combat Log.
 *   - You may use text codes.
 *   - %1 - Target Name
 *
 * ---
 *
 * Steal Items > Steal Text
 * 
 *   Show?:
 *   - Show this event in the Combat Log?
 * 
 *   Icon:
 *   - Icon used for this event in the Combat Log.
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
 * * Trihan
 * * Arisu
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.11: January 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 6, 2022
 * * Bug Fixes!
 * ** Incorrect text usage for enemy recovery is now fixed. Fix made by Arisu.
 * 
 * Version 1.09: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: April 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General Settings > Help: Combat Log
 * **** Help text for Combat Log command.
 * 
 * Version 1.07: March 19, 2021
 * * Bug Fixes!
 * ** Combat log should no longer mask some windows from appearing and is now
 *    instead placed as a non-window object. Fix made by Arisu.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Icons for counters, reflections, and substitutes should now display
 *    properly in the combat log. Fix made by Arisu.
 * ** Turn data should now display properly in TPB-base battle systems.
 *    Fix made by Arisu.
 * ** Switching out to the Options Scene or Party Scene should no longer clear
 *    the Combat Log in-battle. Fix made by Arisu.
 * 
 * Version 1.05: January 22, 2021
 * * Feature Update!
 * ** Dimmed background sprite now expands through the width of the screen
 *    while in battle to no longer display the jagged edges. Update by Irina.
 * 
 * Version 1.04: January 15, 2021
 * * Feature Update!
 * ** Any entries added to the Combat Log with \V[x] will now have their exact
 *    variable data stored at the time instead of displaying their current
 *    variable value. Update made by Irina.
 * 
 * Version 1.03: January 8, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Irina.
 * *** Plugin Parameters > General Settings > Stored Logs
 * **** How many combat logs are stored as a history?
 * 
 * Version 1.02: January 1, 2021
 * * Bug Fixes!
 * ** Compatibility with the Absorption Barrier should be fixed. Fix made by
 *    Yanfly.
 * 
 * Version 1.01: December 25, 2020
 * * Feature Update!
 * ** Combat Log when opened with the hot key will automatically close itself
 *    if the Message Window is open. Update made by Yanfly.
 *
 * Version 1.00: January 15, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddText
 * @text Combat Log: Add Text
 * @desc Adds custom text to the current Combat Log.
 *
 * @arg Text:str
 * @text Text
 * @desc What text would you like to add to the Combat Log?
 * @default Custom
 *
 * @arg Icon:num
 * @text Icon
 * @desc What icon would you like to bind to this entry?
 * @default 87
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogAddHorzLine
 * @text Combat Log: Add Horizontal Line
 * @desc Adds a horizontal line to the current Combat Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogBypass
 * @text Combat Log: Bypass Text?
 * @desc Temporarily bypass adding any new text to the Combat Log until this is turned off?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass Text
 * @off Add Normally
 * @desc Bypass text from being added to the Combat Log temporarily?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CombatLogEnableHotKey
 * @text Combat Log: Hot Key Enable?
 * @desc Enables/disables the Combat Log hot key in battle?
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Combat Log hot key in battle.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogMenu
 * @text System: Show in Main Menu?
 * @desc Shows/hides CombatLog menu inside the Main Menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside the Main Menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogParty
 * @text System: Show in Party Command?
 * @desc Shows/hides CombatLog menu inside the Window_PartyCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_PartyCommand.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowCombatLogActor
 * @text System: Show in Actor Command?
 * @desc Shows/hides CombatLog menu inside the Window_ActorCommand.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Combat Log command inside Window_ActorCommand.
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
 * @param CombatLog
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings for the Combat Log.
 * @default {"General":"","Name:str":"Combat Log","Icon:num":"189","HotKey:str":"shift","MainMenu":"","ShowMainMenu:eval":"true","PartyCommand":"","ShowPartyCommand:eval":"true","ActorCommand":"","ShowActorCommand:eval":"true"}
 *
 * @param CombatLog:struct
 * @text Combat Log Settings
 * @type struct<CombatLog>
 * @desc Settings regarding the Combat Log contents.
 * @default {"General":"","ShowIcons:eval":"true","AutoColor:eval":"true","ColorNumbers:eval":"true","BattleStart":"","ShowBattleStart:eval":"true","IconBattleStart:num":"97","TextBattleStart:str":"\\C[4]Battle Start!\\C[0]","EnemyEmerge":"","ShowEnemyEmerge:eval":"true","IconEnemyEmerge:num":"5","Advantages":"","ShowAdvantages:eval":"true","IconPreemptive:num":"77","IconSurprise:num":"78","StartTurn":"","ShowStartTurn:eval":"true","IconStartTurn:num":"97","TextStartTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]Start!","EndTurn":"","ShowEndTurn:eval":"true","IconEndTurn:num":"97","TextEndTurn:str":"\\C[4]Turn \\C[5]%1\\C[4]: \\C[6]End!","Victory":"","ShowVictory:eval":"true","IconVictory:num":"87","Escape":"","ShowEscape:eval":"true","IconEscape:num":"82","Defeat":"","ShowDefeat:eval":"true","IconDefeat:num":"1","Actions":"","ShowSkillMessage1:eval":"true","ShowSkillMessage2:eval":"true","ShowItemMessage:eval":"true","HP":"","ShowHP:eval":"true","HealHP":"","IconHealHP:num":"72","TextColorHealHP:num":"24","DmgHP":"","IconDmgHP:num":"168","TextColorDmgHP:num":"2","NoDmgHP":"","IconNoDmgHP:num":"81","TextColorNoDmgHP:num":"6","MP":"","ShowMP:eval":"true","HealMP":"","IconHealMP:num":"72","TextColorHealMP:num":"4","DmgMP":"","IconDmgMP:num":"171","TextColorDmgMP:num":"5","NoDmgMP":"","IconNoDmgMP:num":"81","TextColorNoDmgMP:num":"6","TP":"","ShowTP:eval":"true","HealTP":"","IconHealTP:num":"164","TextColorHealTP:num":"24","DmgTP":"","IconDmgTP:num":"170","TextColorDmgTP:num":"28","NoDmgTP":"","IconNoDmgTP:num":"81","TextColorNoDmgTP:num":"6","States":"","ShowStateAdd:eval":"true","ShowStateRemove:eval":"true","ShowStateCurrent:eval":"true","Buffs":"","ShowAddBuff:eval":"true","ShowAddDebuff:eval":"true","ShowEraseBuff:eval":"true","Counter":"","ShowCounter:eval":"true","IconCounter:num":"77","Reflect":"","ShowReflect:eval":"true","IconReflect:num":"81","Subst":"","ShowSubst:eval":"true","IconSubst:num":"81","Fail":"","ShowFail:eval":"true","IconFail:num":"166","Critical":"","ShowCritical:eval":"true","IconCritical:num":"87","Miss":"","ShowMiss:eval":"true","IconMiss:num":"82","Evade":"","ShowEvade:eval":"true","IconEvade:num":"82"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_CombatLog.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding this plugin's windows.
 * @default {"CombatLogBattle":"","CombatLogBattle_BgType:num":"1","CombatLogBattle_RectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = Graphics.boxHeight;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatLogMenu":"","CombatLogMenu_BgType:num":"0","CombatLogMenu_RectJS:func":"\"const wx = 0;\\nconst wy = this._historyWindow.y + this._historyWindow.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","CombatHistory":"","CombatHistoryLatest:str":"Latest","CombatHistoryPrevious:str":"Battle #%1","CombatHistory_BgType:num":"0","CombatHistory_RectJS:func":"\"const ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(1, true);\\nconst wx = 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param -
 *
 * @param Compatibility:struct
 * @text Compatibility Settings
 * @type struct<Compatibility>
 * @desc Compatibility settings with other VisuStella MZ plugins.
 * @default {"VisuMZ_2_BattleSystemATB":"","VisuMZ_2_BattleSystemATB_Interrupt":"","ShowBattleSysAtbInterrupt:eval":"true","IconBattleSysAtbInterrupt:num":"78","TextBattleSysAtbInterrupt:str":"%1 has been interrupted!","VisuMZ_2_BattleSystemCTB":"","VisuMZ_2_BattleSystemCTB_OrderChange":"","ShowBattleSysCtbOrderChange:eval":"true","IconBattleSysCtbOrderChange:num":"75","TextBattleSysCtbOrderChange:str":"%1's turn order has changed!","VisuMZ_2_BattleSystemSTB":"","VisuMZ_2_BattleSystemSTB_Instant":"","ShowBattleSysStbInstant:eval":"true","IconBattleSysStbInstant:num":"73","TextBattleSysStbInstant:str":"%1's gains an extra action!","VisuMZ_3_AntiDmgBarriers":"","VisuMZ_3_AntiDmgBarriers_Cancel":"","Show_AntiDmgBarrier_Cancel:eval":"true","Text_AntiDmgBarrier_Cancel:str":"%2 cancels damage for %1!","VisuMZ_3_AntiDmgBarriers_Nullify":"","Show_AntiDmgBarrier_Nullify:eval":"true","Text_AntiDmgBarrier_Nullify:str":"%2 nullifies damage for %1!","VisuMZ_3_AntiDmgBarriers_Reduce":"","Show_AntiDmgBarrier_Reduce:eval":"true","Text_AntiDmgBarrier_Reduce:str":"%2 reduces damage for %1!","VisuMZ_3_AntiDmgBarriers_Absorb":"","Show_AntiDmgBarrier_Absorb:eval":"true","Text_AntiDmgBarrier_Absorb:str":"%2 absorbs \\C[5]%2\\C[0] damage for %1!","VisuMZ_3_AntiDmgBarriers_MpDisperse":"","Show_AntiDmgBarrier_MpDisperse:eval":"true","Text_AntiDmgBarrier_MpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_AntiDmgBarriers_TpDisperse":"","Show_AntiDmgBarrier_TpDisperse:eval":"true","Text_AntiDmgBarrier_TpDisperse:str":"%2 dispersed damage to %1's %3!","VisuMZ_3_LifeStateEffects":"","VisuMZ_3_LifeStateEffects_AutoLife":"","Show_LifeStateEffects_AutoLife:eval":"true","Icon_LifeStateEffects_AutoLife:num":"70","Text_LifeStateEffects_AutoLife:str":"%1 is automatically revived!","VisuMZ_3_LifeStateEffects_Curse":"","Show_LifeStateEffects_Curse:eval":"true","Icon_LifeStateEffects_Curse:num":"71","Text_LifeStateEffects_Curse:str":"%1's curse takes hold...","VisuMZ_3_LifeStateEffects_Doom":"","Show_LifeStateEffects_Doom:eval":"true","Icon_LifeStateEffects_Doom:num":"1","Text_LifeStateEffects_Doom:str":"%1 has fallen to doom.","VisuMZ_3_LifeStateEffects_Fragile":"","Show_LifeStateEffects_Fragile:eval":"true","Icon_LifeStateEffects_Fragile:num":"166","Text_LifeStateEffects_Fragile:str":"%1 was too fragile!","VisuMZ_3_LifeStateEffects_Guts":"","Show_LifeStateEffects_Guts:eval":"true","Icon_LifeStateEffects_Guts:num":"77","Text_LifeStateEffects_Guts:str":"%1 powers through a fatal blow!","VisuMZ_3_LifeStateEffects_Undead":"","Show_LifeStateEffects_Undead:eval":"true","Icon_LifeStateEffects_Undead:num":"10","Text_LifeStateEffects_Undead:str":"%1 suffers from being undead!","VisuMZ_3_StealItems":"","VisuMZ_3_StealItems_Steal":"","Show_StealItems_Steal:eval":"true","Icon_StealItems_Steal:num":"142"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 *
 * @param Name:str
 * @text Command Name
 * @parent General
 * @desc Name of the 'Combat Log' option in the various menus.
 * @default Combat Log
 *
 * @param Icon:num
 * @text Icon
 * @parent General
 * @desc Icon used for each of the 'Combat Log' options.
 * @default 189
 *
 * @param HotKey:str
 * @text Hot Key
 * @parent General
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for quickly opening the Combat Log in battle.
 * @default shift
 *
 * @param StoredLogs:num
 * @text Stored Logs
 * @parent General
 * @desc How many combat logs are stored as a history?
 * This affects the Combat Log menu.
 * @default 5
 *
 * @param MainMenu
 * @text Main Menu
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @parent MainMenu
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to the Main Menu by default?
 * @default true
 *
 * @param PartyCommand
 * @text Window_PartyCommand
 *
 * @param ShowPartyCommand:eval
 * @text Show in Window?
 * @parent PartyCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_PartyCommand by default?
 * @default true
 *
 * @param ActorCommand
 * @text Window_ActorCommand
 *
 * @param ShowActorCommand:eval
 * @text Show in Window?
 * @parent ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Combat Log' option to Window_ActorCommand by default?
 * @default true
 *
 * @param BattleHelpCombatLog:json
 * @text Help: Combat Log
 * @parent ActorCommand
 * @type note
 * @desc Help text for Combat Log command.
 * Requires VisuMZ_1_BattleCore!
 * @default "View the combat log."
 *
 */
/* ----------------------------------------------------------------------------
 * Combat Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CombatLog:
 *
 * @param General
 *
 * @param ShowIcons:eval
 * @text Show Icons?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show icons in the Combat Log?
 * @default true
 *
 * @param AutoColor:eval
 * @text Auto Color?
 * @parent General
 * @type boolean
 * @on Use Auto Color
 * @off Don't Use
 * @desc Use auto colors for the Combat Log?
 * Requires VisuMZ_1_MessageCore
 * @default true
 *
 * @param ColorNumbers:eval
 * @text Color Numbers?
 * @parent General
 * @type boolean
 * @on Color Numbers
 * @off Don't Color
 * @desc Color numbers for damage differences?
 * @default true
 * 
 * @param BattleStart
 * @text Battle Start
 *
 * @param ShowBattleStart:eval
 * @text Show?
 * @parent BattleStart
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleStart:num
 * @text Icon
 * @parent BattleStart
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextBattleStart:str
 * @text Text
 * @parent BattleStart
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes.
 * @default \C[4]Battle Start!\C[0]
 * 
 * @param EnemyEmerge
 * @text Enemy Emerge
 *
 * @param ShowEnemyEmerge:eval
 * @text Show?
 * @parent EnemyEmerge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEnemyEmerge:num
 * @text Icon
 * @parent EnemyEmerge
 * @desc Icon used for this event in the Combat Log.
 * @default 5
 * 
 * @param Advantages
 * @text Battle Advantages
 *
 * @param ShowAdvantages:eval
 * @text Show?
 * @parent Advantages
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconPreemptive:num
 * @text Preemptive Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param IconSurprise:num
 * @text Surprised Icon
 * @parent Advantages
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 * 
 * @param StartTurn
 * @text Start Turn
 *
 * @param ShowStartTurn:eval
 * @text Show?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconStartTurn:num
 * @text Icon
 * @parent StartTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextStartTurn:str
 * @text Text
 * @parent StartTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]Start!
 * 
 * @param EndTurn
 * @text End Turn
 *
 * @param ShowEndTurn:eval
 * @text Show?
 * @parent EndTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEndTurn:num
 * @text Icon
 * @parent EndTurn
 * @desc Icon used for this event in the Combat Log.
 * @default 97
 *
 * @param TextEndTurn:str
 * @text Text
 * @parent EndTurn
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Turn Count
 * @default \C[4]Turn \C[5]%1\C[4]: \C[6]End!
 * 
 * @param Victory
 * @text Battle Victory
 *
 * @param ShowVictory:eval
 * @text Show?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconVictory:num
 * @text Icon
 * @parent Victory
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Escape
 * @text Battle Escape
 *
 * @param ShowEscape:eval
 * @text Show?
 * @parent Escape
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEscape:num
 * @text Icon
 * @parent Escape
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Defeat
 * @text Battle Defeat
 *
 * @param ShowDefeat:eval
 * @text Show?
 * @parent Defeat
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconDefeat:num
 * @text Icon
 * @parent Defeat
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 * 
 * @param Actions
 * @text Action Text
 *
 * @param ShowSkillMessage1:eval
 * @text Show Skill Message 1?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowSkillMessage2:eval
 * @text Show Skill Message 2?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowItemMessage:eval
 * @text Show Item Message?
 * @parent Actions
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HP
 * @text HP Settings
 *
 * @param ShowHP:eval
 * @text Show?
 * @parent HP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealHP
 * @text HP Heal
 * @parent HP
 *
 * @param IconHealHP:num
 * @text Icon
 * @parent HealHP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealHP:num
 * @text Text Color
 * @parent HealHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgHP
 * @text HP Damage
 * @parent HP
 *
 * @param IconDmgHP:num
 * @text Icon
 * @parent DmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 168
 *
 * @param TextColorDmgHP:num
 * @text Text Color
 * @parent DmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 2
 * 
 * @param NoDmgHP
 * @text No HP Damage
 * @parent HP
 *
 * @param IconNoDmgHP:num
 * @text Icon
 * @parent NoDmgHP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgHP:num
 * @text Text Color
 * @parent NoDmgHP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param MP
 * @text MP Settings
 *
 * @param ShowMP:eval
 * @text Show?
 * @parent MP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealMP
 * @text MP Heal
 * @parent MP
 *
 * @param IconHealMP:num
 * @text Icon
 * @parent HealMP
 * @desc Icon used for this event in the Combat Log.
 * @default 72
 *
 * @param TextColorHealMP:num
 * @text Text Color
 * @parent HealMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 4
 * 
 * @param DmgMP
 * @text MP Damage
 * @parent MP
 *
 * @param IconDmgMP:num
 * @text Icon
 * @parent DmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 171
 *
 * @param TextColorDmgMP:num
 * @text Text Color
 * @parent DmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 5
 * 
 * @param NoDmgMP
 * @text No MP Damage
 * @parent MP
 *
 * @param IconNoDmgMP:num
 * @text Icon
 * @parent NoDmgMP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgMP:num
 * @text Text Color
 * @parent NoDmgMP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param TP
 * @text TP Settings
 *
 * @param ShowTP:eval
 * @text Show?
 * @parent TP
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param HealTP
 * @text TP Heal
 * @parent TP
 *
 * @param IconHealTP:num
 * @text Icon
 * @parent HealTP
 * @desc Icon used for this event in the Combat Log.
 * @default 164
 *
 * @param TextColorHealTP:num
 * @text Text Color
 * @parent HealTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 24
 * 
 * @param DmgTP
 * @text TP Damage
 * @parent TP
 *
 * @param IconDmgTP:num
 * @text Icon
 * @parent DmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 170
 *
 * @param TextColorDmgTP:num
 * @text Text Color
 * @parent DmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 28
 * 
 * @param NoDmgTP
 * @text No TP Damage
 * @parent TP
 *
 * @param IconNoDmgTP:num
 * @text Icon
 * @parent NoDmgTP
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 *
 * @param TextColorNoDmgTP:num
 * @text Text Color
 * @parent NoDmgTP
 * @type number
 * @min 0
 * @max 31
 * @desc Text color used for this event in the Combat Log.
 * @default 6
 * 
 * @param States
 * @text State Settings
 *
 * @param ShowStateAdd:eval
 * @text Show State Add?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateRemove:eval
 * @text Show State Remove?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowStateCurrent:eval
 * @text Show State Current?
 * @parent States
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Buffs
 * @text Buff & Debuff Settings
 *
 * @param ShowAddBuff:eval
 * @text Show Add Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowAddDebuff:eval
 * @text Show Add Debuff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param ShowEraseBuff:eval
 * @text Show Erase Buff?
 * @parent Buffs
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 * 
 * @param Counter
 * @text Counterattack
 *
 * @param ShowCounter:eval
 * @text Show?
 * @parent Counter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCounter:num
 * @text Icon
 * @parent Counter
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 * 
 * @param Reflect
 * @text Reflection
 *
 * @param ShowReflect:eval
 * @text Show?
 * @parent Reflect
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconReflect:num
 * @text Icon
 * @parent Reflect
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Subst
 * @text Substitute
 *
 * @param ShowSubst:eval
 * @text Show?
 * @parent Subst
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconSubst:num
 * @text Icon
 * @parent Subst
 * @desc Icon used for this event in the Combat Log.
 * @default 81
 * 
 * @param Fail
 * @text Effect Failure
 *
 * @param ShowFail:eval
 * @text Show?
 * @parent Fail
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconFail:num
 * @text Icon
 * @parent Fail
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 * 
 * @param Critical
 * @text Critical Hit
 *
 * @param ShowCritical:eval
 * @text Show?
 * @parent Critical
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconCritical:num
 * @text Icon
 * @parent Critical
 * @desc Icon used for this event in the Combat Log.
 * @default 87
 * 
 * @param Miss
 * @text Missed Hit
 *
 * @param ShowMiss:eval
 * @text Show?
 * @parent Miss
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconMiss:num
 * @text Icon
 * @parent Miss
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 * 
 * @param Evade
 * @text Evaded Hit
 *
 * @param ShowEvade:eval
 * @text Show?
 * @parent Evade
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconEvade:num
 * @text Icon
 * @parent Evade
 * @desc Icon used for this event in the Combat Log.
 * @default 82
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param CombatLogBattle
 * @text Combat Log (Battle)
 *
 * @param CombatLogBattle_BgType:num
 * @text Background Type
 * @parent CombatLogBattle
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 1
 *
 * @param CombatLogBattle_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogBattle
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = Graphics.boxHeight;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatLogMenu
 * @text Combat Log (Menu)
 *
 * @param CombatLogMenu_BgType:num
 * @text Background Type
 * @parent CombatLogMenu
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CombatLogMenu_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatLogMenu
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._historyWindow.y + this._historyWindow.height;\nconst ww = Graphics.boxWidth;\nconst wh = this.mainAreaHeight() - this._historyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param CombatHistory
 * @text Combat History (Menu)
 *
 * @param CombatHistoryLatest:str
 * @text Latest Command
 * @parent CombatHistory
 * @desc Text displayed for latest battle.
 * %1 - Battle Count
 * @default Latest
 *
 * @param CombatHistoryPrevious:str
 * @text Past Command
 * @parent CombatHistory
 * @desc Text displayed for past battles.
 * %1 - Battle Count
 * @default Battle #%1
 *
 * @param CombatHistory_BgType:num
 * @text Background Type
 * @parent CombatHistory
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CombatHistory_RectJS:func
 * @text JS: X, Y, W, H
 * @parent CombatHistory
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(1, true);\nconst wx = 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Compatibility Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compatibility:
 *
 * @param VisuMZ_2_BattleSystemATB
 * @text Battle System - ATB
 * 
 * @param VisuMZ_2_BattleSystemATB_Interrupt
 * @text Interrupt
 * @parent VisuMZ_2_BattleSystemATB
 *
 * @param ShowBattleSysAtbInterrupt:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysAtbInterrupt:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Icon used for this event in the Combat Log.
 * @default 78
 *
 * @param TextBattleSysAtbInterrupt:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemATB_Interrupt
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has been interrupted!
 *
 * @param VisuMZ_2_BattleSystemCTB
 * @text Battle System - CTB
 * 
 * @param VisuMZ_2_BattleSystemCTB_OrderChange
 * @text Order Change
 * @parent VisuMZ_2_BattleSystemCTB
 *
 * @param ShowBattleSysCtbOrderChange:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysCtbOrderChange:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Icon used for this event in the Combat Log.
 * @default 75
 *
 * @param TextBattleSysCtbOrderChange:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemCTB_OrderChange
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's turn order has changed!
 *
 * @param VisuMZ_2_BattleSystemSTB
 * @text Battle System - STB
 * 
 * @param VisuMZ_2_BattleSystemSTB_Instant
 * @text Instant
 * @parent VisuMZ_2_BattleSystemSTB
 *
 * @param ShowBattleSysStbInstant:eval
 * @text Show?
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param IconBattleSysStbInstant:num
 * @text Icon
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Icon used for this event in the Combat Log.
 * @default 73
 *
 * @param TextBattleSysStbInstant:str
 * @text Text
 * @parent VisuMZ_2_BattleSystemSTB_Instant
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's gains an extra action!
 *
 * @param VisuMZ_3_AntiDmgBarriers
 * @text Anti-Damage Barriers
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Cancel
 * @text Cancel Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Cancel:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Cancel:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Cancel
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 cancels damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Nullify
 * @text Nullify Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Nullify:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Nullify:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Nullify
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 nullifies damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Reduce
 * @text Reduction Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Reduce:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Reduce:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Reduce
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name
 * @default %2 reduces damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_Absorb
 * @text Absorption Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_Absorb:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_Absorb:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_Absorb
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - Damage
 * @default %2 absorbs \C[5]%2\C[0] damage for %1!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @text MP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_MpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_MpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_MpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - MP
 * @default %2 dispersed damage to %1's %3!
 * 
 * @param VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @text TP Dispersion Barrier
 * @parent VisuMZ_3_AntiDmgBarriers
 *
 * @param Show_AntiDmgBarrier_TpDisperse:eval
 * @text Show?
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Text_AntiDmgBarrier_TpDisperse:str
 * @text Text
 * @parent VisuMZ_3_AntiDmgBarriers_TpDisperse
 * @desc Text displayed for this event in the Combat Log.
 * %1 - Target Name, %2 - State Name, %3 - TP
 * @default %2 dispersed damage to %1's %3!
 *
 * @param VisuMZ_3_LifeStateEffects
 * @text Life State Effects
 * 
 * @param VisuMZ_3_LifeStateEffects_AutoLife
 * @text Auto Life
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_AutoLife:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_AutoLife:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Icon used for this event in the Combat Log.
 * @default 70
 *
 * @param Text_LifeStateEffects_AutoLife:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_AutoLife
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 is automatically revived!
 * 
 * @param VisuMZ_3_LifeStateEffects_Curse
 * @text Curse
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Curse:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Curse:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Icon used for this event in the Combat Log.
 * @default 71
 *
 * @param Text_LifeStateEffects_Curse:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Curse
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1's curse takes hold...
 * 
 * @param VisuMZ_3_LifeStateEffects_Doom
 * @text Doom
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Doom:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Doom:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Icon used for this event in the Combat Log.
 * @default 1
 *
 * @param Text_LifeStateEffects_Doom:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Doom
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 has fallen to doom.
 * 
 * @param VisuMZ_3_LifeStateEffects_Fragile
 * @text Fragile
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Fragile:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Fragile:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Icon used for this event in the Combat Log.
 * @default 166
 *
 * @param Text_LifeStateEffects_Fragile:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Fragile
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 was too fragile!
 * 
 * @param VisuMZ_3_LifeStateEffects_Guts
 * @text Guts
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Guts:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Guts:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Icon used for this event in the Combat Log.
 * @default 77
 *
 * @param Text_LifeStateEffects_Guts:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Guts
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 powers through a fatal blow!
 * 
 * @param VisuMZ_3_LifeStateEffects_Undead
 * @text Undead
 * @parent VisuMZ_3_LifeStateEffects
 *
 * @param Show_LifeStateEffects_Undead:eval
 * @text Show?
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_LifeStateEffects_Undead:num
 * @text Icon
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Icon used for this event in the Combat Log.
 * @default 10
 *
 * @param Text_LifeStateEffects_Undead:str
 * @text Text
 * @parent VisuMZ_3_LifeStateEffects_Undead
 * @desc Text displayed for this event in the Combat Log.
 * You may use text codes. %1 - Target Name
 * @default %1 suffers from being undead!
 *
 * @param VisuMZ_3_StealItems
 * @text Steal Items
 * 
 * @param VisuMZ_3_StealItems_Steal
 * @text Steal Text
 * @parent VisuMZ_3_StealItems
 *
 * @param Show_StealItems_Steal:eval
 * @text Show?
 * @parent VisuMZ_3_StealItems_Steal
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this event in the Combat Log?
 * @default true
 *
 * @param Icon_StealItems_Steal:num
 * @text Icon
 * @parent VisuMZ_3_StealItems_Steal
 * @desc Icon used for this event in the Combat Log.
 * @default 142
 *
 */
//=============================================================================

const _0x8a75bb=_0x87a9;(function(_0x44cafb,_0x3fdf6a){const _0x41adf1=_0x87a9,_0x3b967c=_0x44cafb();while(!![]){try{const _0xeff424=parseInt(_0x41adf1(0x2ea))/0x1+parseInt(_0x41adf1(0x1b2))/0x2*(-parseInt(_0x41adf1(0x19d))/0x3)+parseInt(_0x41adf1(0x2af))/0x4*(parseInt(_0x41adf1(0x2ed))/0x5)+parseInt(_0x41adf1(0x2a1))/0x6*(parseInt(_0x41adf1(0x2f6))/0x7)+-parseInt(_0x41adf1(0x1fd))/0x8+parseInt(_0x41adf1(0x265))/0x9+parseInt(_0x41adf1(0x26a))/0xa*(-parseInt(_0x41adf1(0x283))/0xb);if(_0xeff424===_0x3fdf6a)break;else _0x3b967c['push'](_0x3b967c['shift']());}catch(_0x226ea4){_0x3b967c['push'](_0x3b967c['shift']());}}}(_0x4131,0x8847c));var label=_0x8a75bb(0x262),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x266f9f){const _0x4b7a27=_0x8a75bb;return _0x266f9f[_0x4b7a27(0x19b)]&&_0x266f9f['description'][_0x4b7a27(0x183)]('['+label+']');})[0x0];function _0x87a9(_0x5221e2,_0x7aeb86){const _0x413133=_0x4131();return _0x87a9=function(_0x87a9f0,_0x173c1e){_0x87a9f0=_0x87a9f0-0x13d;let _0x44b094=_0x413133[_0x87a9f0];return _0x44b094;},_0x87a9(_0x5221e2,_0x7aeb86);}VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x8a75bb(0x1e0)]=function(_0x5e6c20,_0x3e6be1){const _0x536571=_0x8a75bb;for(const _0x7379f9 in _0x3e6be1){if(_0x7379f9[_0x536571(0x2e3)](/(.*):(.*)/i)){const _0xce23a3=String(RegExp['$1']),_0xb59e78=String(RegExp['$2'])[_0x536571(0x25f)]()['trim']();let _0x4c0c33,_0x1ab806,_0x4f3266;switch(_0xb59e78){case _0x536571(0x26f):_0x4c0c33=_0x3e6be1[_0x7379f9]!==''?Number(_0x3e6be1[_0x7379f9]):0x0;break;case'ARRAYNUM':_0x1ab806=_0x3e6be1[_0x7379f9]!==''?JSON[_0x536571(0x2f8)](_0x3e6be1[_0x7379f9]):[],_0x4c0c33=_0x1ab806['map'](_0x29ef8f=>Number(_0x29ef8f));break;case _0x536571(0x1af):_0x4c0c33=_0x3e6be1[_0x7379f9]!==''?eval(_0x3e6be1[_0x7379f9]):null;break;case _0x536571(0x179):_0x1ab806=_0x3e6be1[_0x7379f9]!==''?JSON['parse'](_0x3e6be1[_0x7379f9]):[],_0x4c0c33=_0x1ab806['map'](_0x2cfdb0=>eval(_0x2cfdb0));break;case _0x536571(0x22e):_0x4c0c33=_0x3e6be1[_0x7379f9]!==''?JSON['parse'](_0x3e6be1[_0x7379f9]):'';break;case'ARRAYJSON':_0x1ab806=_0x3e6be1[_0x7379f9]!==''?JSON[_0x536571(0x2f8)](_0x3e6be1[_0x7379f9]):[],_0x4c0c33=_0x1ab806[_0x536571(0x174)](_0x23ef4c=>JSON[_0x536571(0x2f8)](_0x23ef4c));break;case'FUNC':_0x4c0c33=_0x3e6be1[_0x7379f9]!==''?new Function(JSON['parse'](_0x3e6be1[_0x7379f9])):new Function(_0x536571(0x2ee));break;case _0x536571(0x243):_0x1ab806=_0x3e6be1[_0x7379f9]!==''?JSON[_0x536571(0x2f8)](_0x3e6be1[_0x7379f9]):[],_0x4c0c33=_0x1ab806[_0x536571(0x174)](_0x344fdc=>new Function(JSON[_0x536571(0x2f8)](_0x344fdc)));break;case _0x536571(0x23b):_0x4c0c33=_0x3e6be1[_0x7379f9]!==''?String(_0x3e6be1[_0x7379f9]):'';break;case'ARRAYSTR':_0x1ab806=_0x3e6be1[_0x7379f9]!==''?JSON[_0x536571(0x2f8)](_0x3e6be1[_0x7379f9]):[],_0x4c0c33=_0x1ab806[_0x536571(0x174)](_0x5e7b18=>String(_0x5e7b18));break;case'STRUCT':_0x4f3266=_0x3e6be1[_0x7379f9]!==''?JSON[_0x536571(0x2f8)](_0x3e6be1[_0x7379f9]):{},_0x4c0c33=VisuMZ['ConvertParams']({},_0x4f3266);break;case _0x536571(0x2aa):_0x1ab806=_0x3e6be1[_0x7379f9]!==''?JSON[_0x536571(0x2f8)](_0x3e6be1[_0x7379f9]):[],_0x4c0c33=_0x1ab806[_0x536571(0x174)](_0x3cfab8=>VisuMZ[_0x536571(0x1e0)]({},JSON[_0x536571(0x2f8)](_0x3cfab8)));break;default:continue;}_0x5e6c20[_0xce23a3]=_0x4c0c33;}}return _0x5e6c20;},(_0x4032ba=>{const _0x1917f9=_0x8a75bb,_0x30c1b5=_0x4032ba[_0x1917f9(0x2e7)];for(const _0x3c7f6e of dependencies){if(!Imported[_0x3c7f6e]){alert(_0x1917f9(0x259)['format'](_0x30c1b5,_0x3c7f6e)),SceneManager['exit']();break;}}const _0x421cc0=_0x4032ba['description'];if(_0x421cc0['match'](/\[Version[ ](.*?)\]/i)){const _0x3f0717=Number(RegExp['$1']);_0x3f0717!==VisuMZ[label][_0x1917f9(0x2bf)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x1917f9(0x22f)](_0x30c1b5,_0x3f0717)),SceneManager[_0x1917f9(0x2df)]());}if(_0x421cc0[_0x1917f9(0x2e3)](/\[Tier[ ](\d+)\]/i)){const _0x3c1806=Number(RegExp['$1']);_0x3c1806<tier?(alert(_0x1917f9(0x252)['format'](_0x30c1b5,_0x3c1806,tier)),SceneManager['exit']()):tier=Math[_0x1917f9(0x143)](_0x3c1806,tier);}VisuMZ[_0x1917f9(0x1e0)](VisuMZ[label][_0x1917f9(0x193)],_0x4032ba[_0x1917f9(0x330)]);})(pluginData),PluginManager[_0x8a75bb(0x29c)](pluginData[_0x8a75bb(0x2e7)],_0x8a75bb(0x28e),_0x66f2f4=>{const _0x56a74e=_0x8a75bb;VisuMZ[_0x56a74e(0x1e0)](_0x66f2f4,_0x66f2f4);const _0x2471c0=_0x66f2f4[_0x56a74e(0x2a8)],_0x3cc801=_0x66f2f4['Icon'];$gameSystem['addTextToCombatLog'](_0x2471c0,_0x3cc801);}),PluginManager[_0x8a75bb(0x29c)](pluginData[_0x8a75bb(0x2e7)],_0x8a75bb(0x25c),_0x2415d9=>{const _0x3fcd4e=_0x8a75bb;VisuMZ[_0x3fcd4e(0x1e0)](_0x2415d9,_0x2415d9),$gameSystem[_0x3fcd4e(0x14c)]();}),PluginManager[_0x8a75bb(0x29c)](pluginData[_0x8a75bb(0x2e7)],_0x8a75bb(0x1c2),_0xcb8050=>{const _0x4b0f07=_0x8a75bb;VisuMZ[_0x4b0f07(0x1e0)](_0xcb8050,_0xcb8050);const _0x2c43bf=_0xcb8050[_0x4b0f07(0x2f4)];$gameSystem['setBypassCombatLog'](_0x2c43bf);}),PluginManager[_0x8a75bb(0x29c)](pluginData[_0x8a75bb(0x2e7)],_0x8a75bb(0x296),_0x508f54=>{const _0x480d5b=_0x8a75bb;VisuMZ[_0x480d5b(0x1e0)](_0x508f54,_0x508f54);const _0x46057c=_0x508f54[_0x480d5b(0x15b)];$gameSystem[_0x480d5b(0x1ba)](_0x46057c);}),PluginManager[_0x8a75bb(0x29c)](pluginData[_0x8a75bb(0x2e7)],_0x8a75bb(0x30c),_0x5c7382=>{const _0xf3ee98=_0x8a75bb;VisuMZ[_0xf3ee98(0x1e0)](_0x5c7382,_0x5c7382);const _0x56d28a=_0x5c7382['Show'];$gameSystem[_0xf3ee98(0x1e7)](_0x56d28a);}),PluginManager[_0x8a75bb(0x29c)](pluginData[_0x8a75bb(0x2e7)],_0x8a75bb(0x17f),_0xc5c3d9=>{const _0x515526=_0x8a75bb;VisuMZ[_0x515526(0x1e0)](_0xc5c3d9,_0xc5c3d9);const _0x376e80=_0xc5c3d9[_0x515526(0x1e5)];$gameSystem[_0x515526(0x2c3)](_0x376e80);}),PluginManager['registerCommand'](pluginData[_0x8a75bb(0x2e7)],'SystemShowCombatLogActor',_0x1a8b2e=>{const _0x1d67bf=_0x8a75bb;VisuMZ[_0x1d67bf(0x1e0)](_0x1a8b2e,_0x1a8b2e);const _0x51c5cf=_0x1a8b2e[_0x1d67bf(0x1e5)];$gameSystem['setActorCmdCombatLogVisible'](_0x51c5cf);}),VisuMZ['CombatLog'][_0x8a75bb(0x1e4)]={'BypassCombatLog':/<BYPASS COMBAT LOG>/i},ImageManager['combatLog_BattleCmd_Icon']=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x285)]['Icon'],ImageManager[_0x8a75bb(0x323)]=VisuMZ['CombatLog'][_0x8a75bb(0x193)]['CombatLog'][_0x8a75bb(0x19f)],ImageManager[_0x8a75bb(0x1f8)]=VisuMZ[_0x8a75bb(0x262)]['Settings'][_0x8a75bb(0x262)][_0x8a75bb(0x1e1)],ImageManager['combatLog_Preemptive_Icon']=VisuMZ[_0x8a75bb(0x262)]['Settings']['CombatLog'][_0x8a75bb(0x1c5)],ImageManager[_0x8a75bb(0x20a)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x1df)],ImageManager['combatLog_StartTurn_Icon']=VisuMZ['CombatLog'][_0x8a75bb(0x193)][_0x8a75bb(0x262)]['IconStartTurn'],ImageManager[_0x8a75bb(0x32d)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x268)],ImageManager[_0x8a75bb(0x20d)]=VisuMZ['CombatLog'][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x2bd)],ImageManager['combatLog_Result_Escape']=VisuMZ['CombatLog']['Settings']['CombatLog'][_0x8a75bb(0x247)],ImageManager[_0x8a75bb(0x1b7)]=VisuMZ[_0x8a75bb(0x262)]['Settings'][_0x8a75bb(0x262)][_0x8a75bb(0x1c3)],ImageManager[_0x8a75bb(0x200)]=VisuMZ['CombatLog']['Settings'][_0x8a75bb(0x262)][_0x8a75bb(0x177)],ImageManager[_0x8a75bb(0x2d6)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)]['IconReflect'],ImageManager[_0x8a75bb(0x2b0)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x319)],ImageManager['combatLog_Failure_Icon']=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x152)],ImageManager[_0x8a75bb(0x167)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)]['IconCritical'],ImageManager['combatLog_Miss_Icon']=VisuMZ[_0x8a75bb(0x262)]['Settings']['CombatLog']['IconMiss'],ImageManager['combatLog_Evasion_Icon']=VisuMZ[_0x8a75bb(0x262)]['Settings'][_0x8a75bb(0x262)]['IconEvade'],ImageManager[_0x8a75bb(0x27c)]=VisuMZ['CombatLog'][_0x8a75bb(0x193)][_0x8a75bb(0x262)]['IconHealHP'],ImageManager[_0x8a75bb(0x329)]=VisuMZ[_0x8a75bb(0x262)]['Settings']['CombatLog'][_0x8a75bb(0x1c0)],ImageManager[_0x8a75bb(0x2f7)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x1ab)],ImageManager['combatLog_MP_Heal']=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x16f)],ImageManager[_0x8a75bb(0x212)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x1d9)],ImageManager['combatLog_MP_NoDmg']=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x1a0)],ImageManager[_0x8a75bb(0x1f4)]=VisuMZ[_0x8a75bb(0x262)]['Settings']['CombatLog'][_0x8a75bb(0x206)],ImageManager[_0x8a75bb(0x2da)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x184)],ImageManager[_0x8a75bb(0x23a)]=VisuMZ['CombatLog']['Settings'][_0x8a75bb(0x262)][_0x8a75bb(0x2fe)],TextManager[_0x8a75bb(0x235)]=VisuMZ[_0x8a75bb(0x262)]['Settings'][_0x8a75bb(0x285)][_0x8a75bb(0x284)],TextManager[_0x8a75bb(0x313)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x282)],TextManager[_0x8a75bb(0x2f1)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x1cd)],TextManager[_0x8a75bb(0x211)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x154)],TextManager[_0x8a75bb(0x1ac)]=VisuMZ['CombatLog'][_0x8a75bb(0x193)][_0x8a75bb(0x285)][_0x8a75bb(0x297)]??_0x8a75bb(0x261),TextManager[_0x8a75bb(0x2d2)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x2f9)][_0x8a75bb(0x1d7)],TextManager[_0x8a75bb(0x2e6)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x2f9)][_0x8a75bb(0x307)],ColorManager[_0x8a75bb(0x27c)]=VisuMZ['CombatLog'][_0x8a75bb(0x193)][_0x8a75bb(0x262)]['TextColorHealHP'],ColorManager[_0x8a75bb(0x329)]=VisuMZ['CombatLog'][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x24b)],ColorManager[_0x8a75bb(0x2f7)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)]['TextColorNoDmgHP'],ColorManager[_0x8a75bb(0x1b8)]=VisuMZ[_0x8a75bb(0x262)]['Settings']['CombatLog']['TextColorHealMP'],ColorManager[_0x8a75bb(0x212)]=VisuMZ['CombatLog']['Settings'][_0x8a75bb(0x262)][_0x8a75bb(0x1e2)],ColorManager[_0x8a75bb(0x30b)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x1a0)],ColorManager['combatLog_TP_Heal']=VisuMZ['CombatLog']['Settings']['CombatLog'][_0x8a75bb(0x15a)],ColorManager['combatLog_TP_Dmg']=VisuMZ['CombatLog'][_0x8a75bb(0x193)][_0x8a75bb(0x262)]['TextColorDmgTP'],ColorManager['combatLog_TP_NoDmg']=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x262)][_0x8a75bb(0x226)],ColorManager['applyCombatLogColor']=function(_0x559acd,_0x4d0bee){const _0x3907c1=_0x8a75bb;if(!VisuMZ['CombatLog'][_0x3907c1(0x193)][_0x3907c1(0x262)]['ColorNumbers'])return Math[_0x3907c1(0x32f)](_0x4d0bee);const _0x1c6c34='combatLog_%1_%2';let _0x496912;if(_0x4d0bee>0x0)_0x496912=_0x1c6c34[_0x3907c1(0x22f)](_0x559acd,_0x3907c1(0x254));else _0x4d0bee===0x0?_0x496912=_0x1c6c34[_0x3907c1(0x22f)](_0x559acd,_0x3907c1(0x2fb)):_0x496912=_0x1c6c34[_0x3907c1(0x22f)](_0x559acd,'Dmg');return _0x4d0bee=Math[_0x3907c1(0x32f)](_0x4d0bee),ColorManager[_0x496912]?_0x3907c1(0x2c5)[_0x3907c1(0x22f)](ColorManager[_0x496912],_0x4d0bee):_0x4d0bee;},SceneManager[_0x8a75bb(0x1f9)]=function(){const _0x49733c=_0x8a75bb;return this[_0x49733c(0x1d2)]&&this[_0x49733c(0x1d2)][_0x49733c(0x304)]===Scene_Battle;},VisuMZ[_0x8a75bb(0x262)]['BattleManager_startBattle']=BattleManager[_0x8a75bb(0x2cb)],BattleManager[_0x8a75bb(0x2cb)]=function(){const _0x545d5b=_0x8a75bb;VisuMZ[_0x545d5b(0x262)]['BattleManager_startBattle'][_0x545d5b(0x21d)](this),this[_0x545d5b(0x159)]();},BattleManager[_0x8a75bb(0x159)]=function(){const _0x351509=_0x8a75bb,_0x439755=VisuMZ[_0x351509(0x262)][_0x351509(0x193)][_0x351509(0x262)];if(_0x439755[_0x351509(0x218)]){$gameSystem[_0x351509(0x21f)](),$gameSystem[_0x351509(0x30e)](![]),$gameSystem['addHorzLineToCombatLog']();let _0x255ea8=TextManager[_0x351509(0x313)],_0x593bf5=ImageManager[_0x351509(0x323)];$gameSystem['addTextToCombatLog'](_0x255ea8,_0x593bf5),$gameSystem[_0x351509(0x14c)]();}if(_0x439755[_0x351509(0x253)])for(const _0xa0f5de of $gameTroop['aliveMembers']()){let _0x3da6d7=TextManager[_0x351509(0x158)][_0x351509(0x22f)](_0xa0f5de['combatLogName']()),_0xfd54e8=ImageManager[_0x351509(0x1f8)];$gameSystem[_0x351509(0x1ee)](_0x3da6d7,_0xfd54e8);}if(_0x439755[_0x351509(0x2d4)]){if(this[_0x351509(0x17d)]){let _0x51a93b=TextManager[_0x351509(0x278)][_0x351509(0x22f)]($gameParty[_0x351509(0x2e8)]()),_0x2ac6a8=ImageManager[_0x351509(0x13f)];$gameSystem[_0x351509(0x1ee)](_0x51a93b,_0x2ac6a8);}else{if(this[_0x351509(0x2de)]){let _0x261631=TextManager[_0x351509(0x1bf)][_0x351509(0x22f)]($gameParty[_0x351509(0x2e8)]()),_0x3e1108=ImageManager[_0x351509(0x20a)];$gameSystem[_0x351509(0x1ee)](_0x261631,_0x3e1108);}}}},VisuMZ['CombatLog'][_0x8a75bb(0x266)]=BattleManager['endTurn'],BattleManager[_0x8a75bb(0x31b)]=function(){const _0x169af6=_0x8a75bb;if($gameTroop[_0x169af6(0x2e1)]()>0x0&&VisuMZ[_0x169af6(0x262)]['Settings'][_0x169af6(0x262)]['ShowEndTurn']){$gameSystem[_0x169af6(0x14c)]();let _0x3940fd=TextManager[_0x169af6(0x211)][_0x169af6(0x22f)]($gameTroop[_0x169af6(0x2e1)]()),_0xd50b3=ImageManager['combatLog_EndTurn_Icon'];$gameSystem['addTextToCombatLog'](_0x3940fd,_0xd50b3),$gameSystem['addHorzLineToCombatLog']();}VisuMZ['CombatLog'][_0x169af6(0x266)][_0x169af6(0x21d)](this);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x2b6)]=BattleManager['updateTurnEnd'],BattleManager['updateTurnEnd']=function(){const _0xbe5f8e=_0x8a75bb;VisuMZ[_0xbe5f8e(0x262)]['BattleManager_updateTurnEnd']['call'](this);if(this[_0xbe5f8e(0x153)]()&&VisuMZ[_0xbe5f8e(0x262)]['Settings']['CombatLog']['ShowStartTurn']&&$gameTroop[_0xbe5f8e(0x2e1)]()>0x0){$gameSystem[_0xbe5f8e(0x14c)]();let _0x209bd0=TextManager[_0xbe5f8e(0x2f1)]['format']($gameTroop['turnCount']()),_0x43c488=ImageManager[_0xbe5f8e(0x17e)];$gameSystem['addTextToCombatLog'](_0x209bd0,_0x43c488);}},VisuMZ['CombatLog'][_0x8a75bb(0x2d9)]=BattleManager['processVictory'],BattleManager[_0x8a75bb(0x1c9)]=function(){const _0x32a84e=_0x8a75bb;$gameSystem[_0x32a84e(0x30e)](!![]),VisuMZ[_0x32a84e(0x262)][_0x32a84e(0x2d9)][_0x32a84e(0x21d)](this),$gameSystem[_0x32a84e(0x30e)](![]);if(VisuMZ[_0x32a84e(0x262)][_0x32a84e(0x193)]['CombatLog']['ShowVictory']){$gameSystem[_0x32a84e(0x14c)]();let _0x4ce0fd=TextManager[_0x32a84e(0x1ff)][_0x32a84e(0x22f)]($gameParty[_0x32a84e(0x2e8)]()),_0x48e6db=ImageManager[_0x32a84e(0x20d)];$gameSystem[_0x32a84e(0x1ee)](_0x4ce0fd,_0x48e6db),$gameSystem[_0x32a84e(0x14c)]();}},VisuMZ[_0x8a75bb(0x262)]['BattleManager_processAbort']=BattleManager[_0x8a75bb(0x216)],BattleManager[_0x8a75bb(0x216)]=function(){const _0x4eb0e5=_0x8a75bb;$gameSystem[_0x4eb0e5(0x30e)](!![]),VisuMZ['CombatLog'][_0x4eb0e5(0x2b3)]['call'](this),$gameSystem[_0x4eb0e5(0x30e)](![]),$gameSystem['addHorzLineToCombatLog']();},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x2eb)]=BattleManager[_0x8a75bb(0x238)],BattleManager[_0x8a75bb(0x238)]=function(){const _0x3d7e74=_0x8a75bb;VisuMZ['CombatLog'][_0x3d7e74(0x2eb)][_0x3d7e74(0x21d)](this);if(VisuMZ[_0x3d7e74(0x262)][_0x3d7e74(0x193)]['CombatLog'][_0x3d7e74(0x14e)]){$gameSystem[_0x3d7e74(0x14c)]();let _0x510eb6=TextManager[_0x3d7e74(0x2bb)][_0x3d7e74(0x22f)]($gameParty[_0x3d7e74(0x2e8)]()),_0x39b555=ImageManager['combatLog_Result_Escape'];$gameSystem[_0x3d7e74(0x1ee)](_0x510eb6,_0x39b555),$gameSystem[_0x3d7e74(0x14c)]();}},VisuMZ['CombatLog']['BattleManager_onEscapeFailure']=BattleManager[_0x8a75bb(0x1fa)],BattleManager[_0x8a75bb(0x1fa)]=function(){const _0x5265a0=_0x8a75bb;VisuMZ[_0x5265a0(0x262)]['BattleManager_onEscapeFailure'][_0x5265a0(0x21d)](this);if(VisuMZ['CombatLog'][_0x5265a0(0x193)][_0x5265a0(0x262)][_0x5265a0(0x14e)]){$gameSystem[_0x5265a0(0x14c)]();let _0x20720b=TextManager['escapeStart'][_0x5265a0(0x22f)]($gameParty['combatLogName']()),_0x552878=ImageManager[_0x5265a0(0x299)];$gameSystem[_0x5265a0(0x1ee)](_0x20720b,_0x552878),$gameSystem[_0x5265a0(0x1ee)](TextManager[_0x5265a0(0x2d8)],_0x552878),$gameSystem[_0x5265a0(0x14c)]();}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x21e)]=BattleManager[_0x8a75bb(0x14f)],BattleManager[_0x8a75bb(0x14f)]=function(){const _0x5075be=_0x8a75bb;VisuMZ[_0x5075be(0x262)]['BattleManager_processDefeat'][_0x5075be(0x21d)](this);if(VisuMZ['CombatLog']['Settings'][_0x5075be(0x262)][_0x5075be(0x16e)]){$gameSystem[_0x5075be(0x14c)]();let _0x5bf939=TextManager[_0x5075be(0x2d1)][_0x5075be(0x22f)]($gameParty[_0x5075be(0x2e8)]()),_0x537bb2=ImageManager['combatLog_Result_Defeat'];$gameSystem[_0x5075be(0x1ee)](_0x5bf939,_0x537bb2),$gameSystem['addHorzLineToCombatLog']();}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x276)]=Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x180)],Game_System[_0x8a75bb(0x31f)]['initialize']=function(){const _0x5eea14=_0x8a75bb;VisuMZ[_0x5eea14(0x262)][_0x5eea14(0x276)]['call'](this),this['initCombatLogBase'](),this[_0x5eea14(0x17a)]();},Game_System[_0x8a75bb(0x245)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)]['General'][_0x8a75bb(0x14a)]??0x5,Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x2db)]=function(){const _0x171df0=_0x8a75bb;this['_combatLogs']=[],this[_0x171df0(0x164)]=![];},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x2c0)]=function(_0x18a222){const _0x33fa8c=_0x8a75bb;if(this[_0x33fa8c(0x1aa)]===undefined)this[_0x33fa8c(0x2db)]();return _0x18a222=_0x18a222||0x0,this[_0x33fa8c(0x1aa)][_0x18a222]=this[_0x33fa8c(0x1aa)][_0x18a222]||[],this['_combatLogs'][_0x18a222];},Game_System[_0x8a75bb(0x31f)]['addTextToCombatLog']=function(_0x432ee3,_0x5b87d0){const _0x205fcd=_0x8a75bb;if(this[_0x205fcd(0x170)]())return;if(!_0x432ee3)return;_0x5b87d0=_0x5b87d0||0x0,_0x432ee3=VisuMZ['CombatLog'][_0x205fcd(0x1ad)](_0x432ee3);const _0x57b7c9=this[_0x205fcd(0x2c0)](),_0x43a79a=_0x432ee3[_0x205fcd(0x227)]('\x0a');while(_0x43a79a[_0x205fcd(0x2b7)]>0x0){let _0x2b3980=_0x43a79a[_0x205fcd(0x269)]();VisuMZ[_0x205fcd(0x262)][_0x205fcd(0x193)][_0x205fcd(0x262)][_0x205fcd(0x142)]&&(_0x2b3980=_0x205fcd(0x1b6)[_0x205fcd(0x22f)](_0x5b87d0,_0x2b3980)),_0x5b87d0=0x0,_0x57b7c9[_0x205fcd(0x2c7)](_0x2b3980);}this[_0x205fcd(0x244)]();},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x14c)]=function(){const _0x1d62fb=_0x8a75bb;if(this[_0x1d62fb(0x170)]())return;const _0x479519=this[_0x1d62fb(0x2c0)](),_0x150762=_0x479519[_0x479519[_0x1d62fb(0x2b7)]-0x1];if(_0x150762===_0x1d62fb(0x305))return;_0x479519[_0x1d62fb(0x2c7)]('=====HORZLINE====='),this[_0x1d62fb(0x244)]();},VisuMZ[_0x8a75bb(0x262)]['RemoveUnwantedTextCodes']=function(_0x27c31b){const _0x3453fe=_0x8a75bb;while(_0x27c31b[_0x3453fe(0x2e3)](/\\V\[(\d+)\]/gi)){_0x27c31b=_0x27c31b[_0x3453fe(0x30a)](/\\V\[(\d+)\]/gi,(_0x1bf871,_0x18a132)=>$gameVariables[_0x3453fe(0x24c)](parseInt(_0x18a132)));}return _0x27c31b;},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x21f)]=function(){const _0x405e37=_0x8a75bb;if(this[_0x405e37(0x1aa)]===undefined)this['initCombatLogBase']();this[_0x405e37(0x1aa)][_0x405e37(0x1d1)]([]);while(this[_0x405e37(0x1aa)][_0x405e37(0x2b7)]>Game_System[_0x405e37(0x245)]){this[_0x405e37(0x1aa)][_0x405e37(0x15f)]();}},Game_System[_0x8a75bb(0x31f)]['getTotalCombatLogs']=function(){const _0x2c4082=_0x8a75bb;if(this[_0x2c4082(0x1aa)]===undefined)this[_0x2c4082(0x2db)]();return this['_combatLogs'][_0x2c4082(0x2b7)];},Game_System['prototype'][_0x8a75bb(0x170)]=function(){const _0xd4a27d=_0x8a75bb;if(this[_0xd4a27d(0x164)]===undefined)this[_0xd4a27d(0x2db)]();return this[_0xd4a27d(0x164)];},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x30e)]=function(_0x20bece){const _0x2ecbe5=_0x8a75bb;if(this['_bypassAddToCombatLog']===undefined)this[_0x2ecbe5(0x2db)]();this['_bypassAddToCombatLog']=_0x20bece;;},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x244)]=function(){const _0x88def=_0x8a75bb;if(!SceneManager[_0x88def(0x1f9)]())return;const _0x91e8a2=SceneManager[_0x88def(0x1d2)]['_combatLogWindow'];_0x91e8a2&&_0x91e8a2[_0x88def(0x1b5)]();},Game_System[_0x8a75bb(0x31f)]['initCombatLogAccess']=function(){const _0x17fa3f=_0x8a75bb,_0x41b429=VisuMZ[_0x17fa3f(0x262)]['Settings'][_0x17fa3f(0x285)];this[_0x17fa3f(0x2fa)]={'mainMenu':_0x41b429[_0x17fa3f(0x312)],'partyCmd':_0x41b429[_0x17fa3f(0x331)],'actorCmd':_0x41b429['ShowActorCommand'],'hotkeyOn':!![]};},Game_System['prototype']['isMainMenuCombatLogVisible']=function(){const _0x40b10d=_0x8a75bb;if(this[_0x40b10d(0x2fa)]===undefined)this[_0x40b10d(0x17a)]();return this['_combatLogAccess']['mainMenu'];},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x27e)]=function(){const _0x21d275=_0x8a75bb;if(this['_combatLogs']===undefined)this[_0x21d275(0x2db)]();return this[_0x21d275(0x191)]()>0x0;},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x1e7)]=function(_0x336525){const _0x45a4f9=_0x8a75bb;if(this[_0x45a4f9(0x2fa)]===undefined)this[_0x45a4f9(0x17a)]();this[_0x45a4f9(0x2fa)][_0x45a4f9(0x140)]=_0x336525;},Game_System[_0x8a75bb(0x31f)]['isPartyCmdCombatLogVisible']=function(){const _0x2966f2=_0x8a75bb;if(this[_0x2966f2(0x2fa)]===undefined)this[_0x2966f2(0x17a)]();return this[_0x2966f2(0x2fa)][_0x2966f2(0x18d)];},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x2c3)]=function(_0x53e5ec){const _0x437ca5=_0x8a75bb;if(this[_0x437ca5(0x2fa)]===undefined)this[_0x437ca5(0x17a)]();this[_0x437ca5(0x2fa)][_0x437ca5(0x18d)]=_0x53e5ec;},Game_System['prototype'][_0x8a75bb(0x287)]=function(){const _0x219111=_0x8a75bb;if(this[_0x219111(0x2fa)]===undefined)this[_0x219111(0x17a)]();return this[_0x219111(0x2fa)][_0x219111(0x302)];},Game_System[_0x8a75bb(0x31f)][_0x8a75bb(0x26d)]=function(_0x12c6dc){const _0x54e84e=_0x8a75bb;if(this[_0x54e84e(0x2fa)]===undefined)this['initCombatLogAccess']();this[_0x54e84e(0x2fa)][_0x54e84e(0x302)]=_0x12c6dc;},Game_System['prototype'][_0x8a75bb(0x21b)]=function(){const _0x1c7699=_0x8a75bb;if(this['_combatLogAccess']===undefined)this['initCombatLogAccess']();return this[_0x1c7699(0x2fa)][_0x1c7699(0x2b2)];},Game_System['prototype'][_0x8a75bb(0x1ba)]=function(_0x326ee6){const _0x40565f=_0x8a75bb;if(this[_0x40565f(0x2fa)]===undefined)this['initCombatLogAccess']();this['_combatLogAccess'][_0x40565f(0x2b2)]=_0x326ee6;},VisuMZ[_0x8a75bb(0x262)]['Game_BattlerBase_setHp']=Game_BattlerBase[_0x8a75bb(0x31f)]['setHp'],Game_BattlerBase[_0x8a75bb(0x31f)][_0x8a75bb(0x18e)]=function(_0x4c6f02){const _0x1e2ba2=_0x8a75bb,_0x4a7a05=this[_0x1e2ba2(0x26b)];VisuMZ[_0x1e2ba2(0x262)][_0x1e2ba2(0x220)][_0x1e2ba2(0x21d)](this,_0x4c6f02);if(!SceneManager[_0x1e2ba2(0x1f9)]())return;if(this['_combatLogPayment'])return;if(!VisuMZ[_0x1e2ba2(0x262)][_0x1e2ba2(0x193)][_0x1e2ba2(0x262)][_0x1e2ba2(0x16d)])return;const _0x42049d=_0x4c6f02;let _0x2caca2,_0x15c60e,_0x482073=_0x42049d-_0x4a7a05;if(_0x42049d>_0x4a7a05)_0x2caca2=this['isActor']()?TextManager[_0x1e2ba2(0x250)]:TextManager[_0x1e2ba2(0x2e2)],_0x15c60e=ImageManager[_0x1e2ba2(0x27c)];else _0x42049d===_0x4a7a05?(_0x2caca2=this[_0x1e2ba2(0x326)]()?TextManager[_0x1e2ba2(0x2b1)]:TextManager[_0x1e2ba2(0x263)],_0x15c60e=ImageManager[_0x1e2ba2(0x2f7)]):(_0x2caca2=this[_0x1e2ba2(0x326)]()?TextManager[_0x1e2ba2(0x1b9)]:TextManager['enemyDamage'],_0x15c60e=ImageManager[_0x1e2ba2(0x329)]);_0x482073=ColorManager[_0x1e2ba2(0x334)]('HP',_0x482073);let _0x1e6a3c=_0x2caca2[_0x1e2ba2(0x22f)](this['combatLogName'](),_0x482073,TextManager['hp']);$gameSystem['addTextToCombatLog'](_0x1e6a3c,_0x15c60e);},VisuMZ[_0x8a75bb(0x262)]['Game_BattlerBase_setMp']=Game_BattlerBase[_0x8a75bb(0x31f)]['setMp'],Game_BattlerBase[_0x8a75bb(0x31f)][_0x8a75bb(0x22a)]=function(_0x1ca23d){const _0x589828=_0x8a75bb,_0x3f4c3d=this['_mp'];VisuMZ['CombatLog'][_0x589828(0x234)]['call'](this,_0x1ca23d);if(!SceneManager[_0x589828(0x1f9)]())return;if(this[_0x589828(0x21a)])return;if(!VisuMZ[_0x589828(0x262)]['Settings']['CombatLog'][_0x589828(0x2dd)])return;const _0x3e874a=_0x1ca23d;let _0x41062b,_0x2ca2cb,_0x325914=_0x3e874a-_0x3f4c3d;if(_0x3e874a>_0x3f4c3d)_0x41062b=this['isActor']()?TextManager[_0x589828(0x250)]:TextManager['enemyRecovery'],_0x2ca2cb=ImageManager['combatLog_MP_Heal'];else _0x3e874a===_0x3f4c3d?(_0x41062b=this[_0x589828(0x326)]()?TextManager['actorLoss']:TextManager[_0x589828(0x208)],_0x2ca2cb=ImageManager[_0x589828(0x30b)]):(_0x41062b=this[_0x589828(0x326)]()?TextManager[_0x589828(0x190)]:TextManager[_0x589828(0x208)],_0x2ca2cb=ImageManager[_0x589828(0x212)]);_0x325914=ColorManager[_0x589828(0x334)]('MP',_0x325914);let _0x3068dd=_0x41062b[_0x589828(0x22f)](this[_0x589828(0x2e8)](),_0x325914,TextManager['mp']);$gameSystem[_0x589828(0x1ee)](_0x3068dd,_0x2ca2cb);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x1f5)]=Game_BattlerBase[_0x8a75bb(0x31f)][_0x8a75bb(0x31d)],Game_BattlerBase[_0x8a75bb(0x31f)][_0x8a75bb(0x31d)]=function(_0x42544b){const _0x4edc10=_0x8a75bb,_0x2bd685=this[_0x4edc10(0x1d0)];VisuMZ[_0x4edc10(0x262)][_0x4edc10(0x1f5)]['call'](this,_0x42544b);if(!SceneManager[_0x4edc10(0x1f9)]())return;if(this['_combatLogPayment'])return;if(this['_combatLogSilentTp'])return;if(!VisuMZ[_0x4edc10(0x262)][_0x4edc10(0x193)]['CombatLog']['ShowTP'])return;const _0xfbc834=_0x42544b;let _0x14cb39,_0x22e7bd,_0x29c5a0=_0xfbc834-_0x2bd685;if(_0xfbc834>_0x2bd685)_0x14cb39=this[_0x4edc10(0x326)]()?TextManager[_0x4edc10(0x250)]:TextManager[_0x4edc10(0x2e2)],_0x22e7bd=ImageManager[_0x4edc10(0x1f4)];else _0xfbc834===_0x2bd685?(_0x14cb39=this[_0x4edc10(0x326)]()?TextManager['actorLoss']:TextManager[_0x4edc10(0x208)],_0x22e7bd=ImageManager[_0x4edc10(0x23a)]):(_0x14cb39=this[_0x4edc10(0x326)]()?TextManager[_0x4edc10(0x190)]:TextManager[_0x4edc10(0x208)],_0x22e7bd=ImageManager['combatLog_TP_Dmg']);_0x29c5a0=ColorManager[_0x4edc10(0x334)]('TP',_0x29c5a0);let _0x3d1a5a=_0x14cb39[_0x4edc10(0x22f)](this[_0x4edc10(0x2e8)](),_0x29c5a0,TextManager['tp']);$gameSystem['addTextToCombatLog'](_0x3d1a5a,_0x22e7bd);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x322)]=Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x156)],Game_Battler['prototype'][_0x8a75bb(0x156)]=function(_0x1f8196){const _0x8661f6=_0x8a75bb;this[_0x8661f6(0x2d5)]=!![],VisuMZ[_0x8661f6(0x262)][_0x8661f6(0x322)][_0x8661f6(0x21d)](this,_0x1f8196),this[_0x8661f6(0x2d5)]=![];},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x32a)]=Game_Battler['prototype'][_0x8a75bb(0x281)],Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x281)]=function(_0x1c7bb3){const _0x403f00=_0x8a75bb;this[_0x403f00(0x21a)]=!![],VisuMZ[_0x403f00(0x262)][_0x403f00(0x32a)][_0x403f00(0x21d)](this,_0x1c7bb3),this[_0x403f00(0x21a)]=![];},VisuMZ[_0x8a75bb(0x262)]['Game_Battler_addState']=Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x1db)],Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x1db)]=function(_0x4280b5){const _0x3dc6e6=_0x8a75bb,_0x5517fb=this[_0x3dc6e6(0x1c1)](_0x4280b5);VisuMZ[_0x3dc6e6(0x262)][_0x3dc6e6(0x1a9)]['call'](this,_0x4280b5);const _0x2ab88b=this['isStateAffected'](_0x4280b5);this[_0x3dc6e6(0x2b9)](_0x4280b5,_0x5517fb,_0x2ab88b);},VisuMZ[_0x8a75bb(0x262)]['Game_Battler_removeState']=Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x1cb)],Game_Battler[_0x8a75bb(0x31f)]['removeState']=function(_0x47d85b){const _0x578e18=_0x8a75bb,_0x450552=this['isStateAffected'](_0x47d85b);VisuMZ[_0x578e18(0x262)]['Game_Battler_removeState'][_0x578e18(0x21d)](this,_0x47d85b);const _0xde8ec1=this[_0x578e18(0x1c1)](_0x47d85b);this[_0x578e18(0x2b9)](_0x47d85b,_0x450552,_0xde8ec1);},Game_Battler['prototype']['combatLogStateChanges']=function(_0x149d99,_0x4bec5c,_0x112ab0){const _0x4ae359=_0x8a75bb;if(!SceneManager[_0x4ae359(0x1f9)]())return;const _0x59ddc7=$dataStates[_0x149d99];if(!_0x59ddc7)return;if(_0x59ddc7['note'][_0x4ae359(0x2e3)](VisuMZ[_0x4ae359(0x262)][_0x4ae359(0x1e4)][_0x4ae359(0x204)]))return;const _0x13be91=VisuMZ[_0x4ae359(0x262)][_0x4ae359(0x193)][_0x4ae359(0x262)];if(!_0x4bec5c&&_0x112ab0){let _0x378610=this[_0x4ae359(0x326)]()?_0x59ddc7[_0x4ae359(0x2a0)]:_0x59ddc7['message2'];if(_0x378610&&_0x13be91[_0x4ae359(0x15c)]){let _0x2ba454=_0x378610[_0x4ae359(0x22f)](this['combatLogName']()),_0x2309d2=_0x59ddc7[_0x4ae359(0x188)];$gameSystem[_0x4ae359(0x1ee)](_0x2ba454,_0x2309d2);}}if(_0x4bec5c&&_0x112ab0){let _0x4904a5=_0x59ddc7['message3'];if(_0x4904a5&&_0x13be91[_0x4ae359(0x1d8)]){let _0x162698=_0x4904a5[_0x4ae359(0x22f)](this['combatLogName']()),_0xefea4e=_0x59ddc7[_0x4ae359(0x188)];$gameSystem[_0x4ae359(0x1ee)](_0x162698,_0xefea4e);}}if(_0x4bec5c&&!_0x112ab0){let _0x2b22f2=_0x59ddc7['message4'];if(_0x2b22f2&&_0x13be91[_0x4ae359(0x2ce)]){let _0x1df4d5=_0x2b22f2['format'](this[_0x4ae359(0x2e8)]()),_0x44ff60=_0x59ddc7['iconIndex'];$gameSystem['addTextToCombatLog'](_0x1df4d5,_0x44ff60);}}},VisuMZ['CombatLog'][_0x8a75bb(0x196)]=Game_BattlerBase['prototype']['increaseBuff'],Game_BattlerBase['prototype'][_0x8a75bb(0x214)]=function(_0x513d80){const _0x3a2116=_0x8a75bb;VisuMZ['CombatLog'][_0x3a2116(0x196)][_0x3a2116(0x21d)](this,_0x513d80);if(!VisuMZ[_0x3a2116(0x262)]['Settings']['CombatLog'][_0x3a2116(0x328)])return;this[_0x3a2116(0x229)](_0x513d80,0x1,TextManager[_0x3a2116(0x18f)]);},VisuMZ['CombatLog'][_0x8a75bb(0x1a6)]=Game_BattlerBase[_0x8a75bb(0x31f)]['decreaseBuff'],Game_BattlerBase[_0x8a75bb(0x31f)][_0x8a75bb(0x29a)]=function(_0x47a639){const _0x9828c9=_0x8a75bb;VisuMZ['CombatLog'][_0x9828c9(0x1a6)][_0x9828c9(0x21d)](this,_0x47a639);if(!VisuMZ[_0x9828c9(0x262)][_0x9828c9(0x193)][_0x9828c9(0x262)][_0x9828c9(0x23f)])return;this[_0x9828c9(0x229)](_0x47a639,-0x1,TextManager[_0x9828c9(0x1d5)]);},VisuMZ['CombatLog'][_0x8a75bb(0x31c)]=Game_BattlerBase[_0x8a75bb(0x31f)]['eraseBuff'],Game_BattlerBase[_0x8a75bb(0x31f)][_0x8a75bb(0x230)]=function(_0x3e0609){const _0xe60eb5=_0x8a75bb,_0x13c9ad=this[_0xe60eb5(0x18a)][_0x3e0609]||0x0;VisuMZ[_0xe60eb5(0x262)][_0xe60eb5(0x31c)][_0xe60eb5(0x21d)](this,_0x3e0609);const _0x2b0e2b=this[_0xe60eb5(0x18a)][_0x3e0609]||0x0,_0x371095=_0x2b0e2b>_0x13c9ad?0x1:-0x1;if(!VisuMZ[_0xe60eb5(0x262)]['Settings'][_0xe60eb5(0x262)][_0xe60eb5(0x18c)])return;this[_0xe60eb5(0x229)](_0x3e0609,_0x371095,TextManager['buffRemove']);},Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x229)]=function(_0x54d205,_0x3dca0f,_0x37715b){const _0x5dcf33=_0x8a75bb;if(!SceneManager['isSceneBattle']())return;if(!_0x37715b)return;const _0x5a7087=this[_0x5dcf33(0x14d)](_0x3dca0f||-0x1,_0x54d205),_0x37bd4c=TextManager['param'](_0x54d205),_0x55ffa4=_0x37715b[_0x5dcf33(0x22f)](this[_0x5dcf33(0x2e8)](),_0x37bd4c);$gameSystem[_0x5dcf33(0x1ee)](_0x55ffa4,_0x5a7087);},Game_Actor[_0x8a75bb(0x31f)][_0x8a75bb(0x2e8)]=function(){const _0x2aa397=_0x8a75bb;return'\x5cN[%1]'['format'](this[_0x2aa397(0x318)]);},Game_Enemy[_0x8a75bb(0x31f)][_0x8a75bb(0x2e8)]=function(){return this['name']();},Game_Party[_0x8a75bb(0x31f)][_0x8a75bb(0x2e8)]=function(){const _0x112b15=_0x8a75bb,_0x474e7c=this[_0x112b15(0x1d3)]()[_0x112b15(0x2b7)];if(_0x474e7c===0x0)return'';else return _0x474e7c===0x1?this[_0x112b15(0x228)]()[_0x112b15(0x2e8)]():TextManager[_0x112b15(0x1ed)][_0x112b15(0x22f)](this[_0x112b15(0x228)]()[_0x112b15(0x2e8)]());},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x29b)]=Scene_Menu[_0x8a75bb(0x31f)][_0x8a75bb(0x314)],Scene_Menu['prototype'][_0x8a75bb(0x314)]=function(){const _0x5f42d0=_0x8a75bb;VisuMZ['CombatLog'][_0x5f42d0(0x29b)][_0x5f42d0(0x21d)](this);const _0x453e3b=this[_0x5f42d0(0x178)];_0x453e3b[_0x5f42d0(0x25b)](_0x5f42d0(0x262),this[_0x5f42d0(0x32e)][_0x5f42d0(0x145)](this));},Scene_Menu[_0x8a75bb(0x31f)][_0x8a75bb(0x32e)]=function(){const _0x311e55=_0x8a75bb;SceneManager[_0x311e55(0x2c7)](Scene_CombatLog);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x27a)]=Scene_Battle[_0x8a75bb(0x31f)][_0x8a75bb(0x207)],Scene_Battle[_0x8a75bb(0x31f)][_0x8a75bb(0x207)]=function(){const _0x4dc45a=_0x8a75bb;VisuMZ['CombatLog'][_0x4dc45a(0x27a)][_0x4dc45a(0x21d)](this),this[_0x4dc45a(0x2ae)]();},Scene_Battle['prototype'][_0x8a75bb(0x2ae)]=function(){const _0x39b3de=_0x8a75bb,_0x3dd3d2=this['combatLogWindowRect']();this[_0x39b3de(0x160)]=new Window_CombatLogDisplay(_0x3dd3d2),this[_0x39b3de(0x160)][_0x39b3de(0x2cc)](0x0),this[_0x39b3de(0x197)](this[_0x39b3de(0x160)]),this['_combatLogWindow']['x']=this['_windowLayer']['x'],this['_combatLogWindow']['y']=this[_0x39b3de(0x2a2)]['y'],this['_combatLogWindow'][_0x39b3de(0x237)](VisuMZ[_0x39b3de(0x262)][_0x39b3de(0x193)][_0x39b3de(0x2f9)]['CombatLogBattle_BgType']),this['_combatLogWindow'][_0x39b3de(0x25b)](_0x39b3de(0x24d),this['closeCombatLog'][_0x39b3de(0x145)](this)),this[_0x39b3de(0x160)][_0x39b3de(0x25b)](_0x39b3de(0x15e),this[_0x39b3de(0x29f)][_0x39b3de(0x145)](this)),this[_0x39b3de(0x151)]['setHandler'](_0x39b3de(0x24d),this[_0x39b3de(0x163)][_0x39b3de(0x145)](this,this[_0x39b3de(0x151)])),this[_0x39b3de(0x185)]['setHandler'](_0x39b3de(0x24d),this[_0x39b3de(0x163)][_0x39b3de(0x145)](this,this['_actorCommandWindow']));},Scene_Battle['prototype']['combatLogWindowRect']=function(){const _0x1b3e97=_0x8a75bb,_0x45c20a=VisuMZ[_0x1b3e97(0x262)][_0x1b3e97(0x193)]['Window'][_0x1b3e97(0x1ef)];if(_0x45c20a)return _0x45c20a[_0x1b3e97(0x21d)](this);const _0x4a6c70=0x0,_0x47521e=0x0,_0x53baed=Graphics[_0x1b3e97(0x25a)],_0x18fe6b=Graphics['boxHeight'];return new Rectangle(_0x4a6c70,_0x47521e,_0x53baed,_0x18fe6b);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x23e)]=Scene_Battle[_0x8a75bb(0x31f)][_0x8a75bb(0x332)],Scene_Battle[_0x8a75bb(0x31f)]['isAnyInputWindowActive']=function(){const _0x17d060=_0x8a75bb;if(this[_0x17d060(0x160)]&&this[_0x17d060(0x160)][_0x17d060(0x2c6)])return!![];return VisuMZ[_0x17d060(0x262)][_0x17d060(0x23e)][_0x17d060(0x21d)](this);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x251)]=Scene_Battle[_0x8a75bb(0x31f)][_0x8a75bb(0x32c)],Scene_Battle['prototype'][_0x8a75bb(0x32c)]=function(){const _0x3e9aae=_0x8a75bb;VisuMZ['CombatLog'][_0x3e9aae(0x251)][_0x3e9aae(0x21d)](this),this['_combatLogWindow']&&this[_0x3e9aae(0x160)][_0x3e9aae(0x255)]>0x0&&this['_cancelButton']&&(this[_0x3e9aae(0x280)][_0x3e9aae(0x1a4)]=![]);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x169)]=Scene_Battle[_0x8a75bb(0x31f)][_0x8a75bb(0x327)],Scene_Battle[_0x8a75bb(0x31f)][_0x8a75bb(0x327)]=function(){const _0x4cc468=_0x8a75bb;return BattleManager[_0x4cc468(0x2e0)]()&&this['_combatLogWindow']&&this['_combatLogWindow'][_0x4cc468(0x2c6)]?![]:VisuMZ[_0x4cc468(0x262)][_0x4cc468(0x169)]['call'](this);},Scene_Battle['prototype']['openCombatLog']=function(_0x1d61d8){const _0x3b6dbb=_0x8a75bb;this[_0x3b6dbb(0x160)][_0x3b6dbb(0x277)](),this['_combatLogWindow'][_0x3b6dbb(0x2b4)](),this['_combatLogWindow']['battleRefresh'](),this[_0x3b6dbb(0x160)][_0x3b6dbb(0x316)](_0x1d61d8);},Scene_Battle[_0x8a75bb(0x31f)][_0x8a75bb(0x29f)]=function(){const _0x3ba69c=_0x8a75bb;this[_0x3ba69c(0x160)]['close']();const _0x2a3534=this[_0x3ba69c(0x160)][_0x3ba69c(0x209)]();_0x2a3534[_0x3ba69c(0x2b4)]();};function Scene_CombatLog(){const _0x40e78f=_0x8a75bb;this[_0x40e78f(0x180)](...arguments);}Scene_CombatLog[_0x8a75bb(0x31f)]=Object[_0x8a75bb(0x18b)](Scene_MenuBase['prototype']),Scene_CombatLog['prototype'][_0x8a75bb(0x304)]=Scene_CombatLog,Scene_CombatLog[_0x8a75bb(0x31f)]['initialize']=function(){const _0xb6c7ce=_0x8a75bb;Scene_MenuBase[_0xb6c7ce(0x31f)][_0xb6c7ce(0x180)][_0xb6c7ce(0x21d)](this);},Scene_CombatLog['prototype']['helpAreaHeight']=function(){return 0x0;},Scene_CombatLog['prototype'][_0x8a75bb(0x18b)]=function(){const _0x542f4e=_0x8a75bb;Scene_MenuBase[_0x542f4e(0x31f)][_0x542f4e(0x18b)]['call'](this),this[_0x542f4e(0x1a5)](),this[_0x542f4e(0x2ae)]();},Scene_CombatLog[_0x8a75bb(0x31f)]['createHistoryWindow']=function(){const _0x305997=_0x8a75bb,_0x2fb6fa=this['historyWindowRect']();this[_0x305997(0x1d4)]=new Window_CombatLogHistory(_0x2fb6fa),this[_0x305997(0x1d4)]['setHandler']('cancel',this[_0x305997(0x210)][_0x305997(0x145)](this)),this[_0x305997(0x308)](this['_historyWindow']),this[_0x305997(0x1d4)][_0x305997(0x237)](VisuMZ[_0x305997(0x262)]['Settings']['Window'][_0x305997(0x2b8)]);},Scene_CombatLog[_0x8a75bb(0x31f)][_0x8a75bb(0x171)]=function(){const _0x171e79=_0x8a75bb,_0x17067a=VisuMZ[_0x171e79(0x262)][_0x171e79(0x193)][_0x171e79(0x2f9)][_0x171e79(0x2f3)];if(_0x17067a)return _0x17067a['call'](this);const _0x275eb1=Graphics['boxWidth'],_0x37474c=this[_0x171e79(0x2a5)](0x1,!![]),_0x18675d=0x0,_0x5b3d78=this[_0x171e79(0x28f)]();return new Rectangle(_0x18675d,_0x5b3d78,_0x275eb1,_0x37474c);},Scene_CombatLog['prototype'][_0x8a75bb(0x2ae)]=function(){const _0x4b5ed5=_0x8a75bb,_0x3588a9=this[_0x4b5ed5(0x2ad)]();this['_combatLogWindow']=new Window_CombatLogDisplay(_0x3588a9),this[_0x4b5ed5(0x308)](this['_combatLogWindow']),this[_0x4b5ed5(0x1d4)]['setLogWindow'](this[_0x4b5ed5(0x160)]),this['_combatLogWindow'][_0x4b5ed5(0x237)](VisuMZ['CombatLog'][_0x4b5ed5(0x193)]['Window'][_0x4b5ed5(0x2fd)]);},Scene_CombatLog[_0x8a75bb(0x31f)][_0x8a75bb(0x2ad)]=function(){const _0x19490a=_0x8a75bb,_0x3dd352=VisuMZ[_0x19490a(0x262)][_0x19490a(0x193)][_0x19490a(0x2f9)]['CombatLogMenu_RectJS'];if(_0x3dd352)return _0x3dd352['call'](this);const _0x62ffc5=0x0,_0x2f328c=this[_0x19490a(0x1d4)]['y']+this[_0x19490a(0x1d4)][_0x19490a(0x148)],_0x1fe645=Graphics[_0x19490a(0x25a)],_0x16a3cf=this[_0x19490a(0x2a6)]()-this[_0x19490a(0x1d4)][_0x19490a(0x148)];return new Rectangle(_0x62ffc5,_0x2f328c,_0x1fe645,_0x16a3cf);},Scene_CombatLog['prototype'][_0x8a75bb(0x20b)]=function(){const _0x3c9aa7=_0x8a75bb;Scene_MenuBase['prototype']['createBackground'][_0x3c9aa7(0x21d)](this),this['setBackgroundOpacity'](this[_0x3c9aa7(0x147)]()),this['createCustomBackgroundImages']();},Scene_CombatLog[_0x8a75bb(0x31f)]['getBackgroundOpacity']=function(){const _0x1402f2=_0x8a75bb;return VisuMZ[_0x1402f2(0x262)][_0x1402f2(0x193)][_0x1402f2(0x324)][_0x1402f2(0x30d)];},Scene_CombatLog['prototype'][_0x8a75bb(0x272)]=function(){const _0x18e37c=_0x8a75bb,_0xfb1e94=VisuMZ[_0x18e37c(0x262)][_0x18e37c(0x193)]['BgSettings'];_0xfb1e94&&(_0xfb1e94[_0x18e37c(0x1e3)]!==''||_0xfb1e94[_0x18e37c(0x1a2)]!=='')&&(this[_0x18e37c(0x232)]=new Sprite(ImageManager[_0x18e37c(0x24f)](_0xfb1e94[_0x18e37c(0x1e3)])),this['_backSprite2']=new Sprite(ImageManager['loadTitle2'](_0xfb1e94['BgFilename2'])),this['addChild'](this[_0x18e37c(0x232)]),this['addChild'](this[_0x18e37c(0x306)]),this[_0x18e37c(0x232)]['bitmap']['addLoadListener'](this[_0x18e37c(0x14b)][_0x18e37c(0x145)](this,this[_0x18e37c(0x232)])),this['_backSprite2'][_0x18e37c(0x150)][_0x18e37c(0x286)](this[_0x18e37c(0x14b)][_0x18e37c(0x145)](this,this[_0x18e37c(0x306)])));},Scene_CombatLog[_0x8a75bb(0x31f)][_0x8a75bb(0x14b)]=function(_0x4758f6){const _0x373656=_0x8a75bb;this[_0x373656(0x333)](_0x4758f6),this[_0x373656(0x20f)](_0x4758f6);},VisuMZ['CombatLog']['Window_Selectable_allowShiftScrolling']=Window_Selectable[_0x8a75bb(0x31f)][_0x8a75bb(0x29d)],Window_Selectable[_0x8a75bb(0x31f)][_0x8a75bb(0x29d)]=function(){const _0xe1f9b9=_0x8a75bb;if(SceneManager[_0xe1f9b9(0x1f9)]()){const _0x5493e4=SceneManager[_0xe1f9b9(0x1d2)][_0xe1f9b9(0x160)];if(_0x5493e4&&_0x5493e4[_0xe1f9b9(0x24a)]())return![];}return VisuMZ['CombatLog'][_0xe1f9b9(0x264)][_0xe1f9b9(0x21d)](this);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x320)]=Window_Selectable['prototype'][_0x8a75bb(0x13d)],Window_Selectable[_0x8a75bb(0x31f)][_0x8a75bb(0x13d)]=function(){const _0x31ab1f=_0x8a75bb;if(SceneManager[_0x31ab1f(0x1f9)]()){const _0x445cf4=SceneManager[_0x31ab1f(0x1d2)]['_combatLogWindow'];if(_0x445cf4&&_0x445cf4[_0x31ab1f(0x24a)]())return![];}return VisuMZ['CombatLog'][_0x31ab1f(0x320)][_0x31ab1f(0x21d)](this);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x199)]=Window_MenuCommand[_0x8a75bb(0x31f)]['addOriginalCommands'],Window_MenuCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x295)]=function(){const _0x34261c=_0x8a75bb;VisuMZ['CombatLog'][_0x34261c(0x199)][_0x34261c(0x21d)](this);if(Imported[_0x34261c(0x2ef)])return;this[_0x34261c(0x275)]();},Window_MenuCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x275)]=function(){const _0x37ca8c=_0x8a75bb;if(!this[_0x37ca8c(0x2ab)]())return;const _0x1282dc=TextManager[_0x37ca8c(0x235)],_0x597c16=this[_0x37ca8c(0x201)]();this['addCommand'](_0x1282dc,_0x37ca8c(0x24d),_0x597c16);},Window_MenuCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x2ab)]=function(){const _0x3f5c31=_0x8a75bb;return $gameSystem[_0x3f5c31(0x165)]();},Window_MenuCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x201)]=function(){const _0x331572=_0x8a75bb;return $gameSystem[_0x331572(0x27e)]();},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x205)]=Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x1dc)],Window_BattleLog['prototype'][_0x8a75bb(0x1dc)]=function(){const _0x29caa0=_0x8a75bb;VisuMZ['CombatLog']['Window_BattleLog_startTurn']['call'](this);if(!VisuMZ[_0x29caa0(0x262)][_0x29caa0(0x193)][_0x29caa0(0x262)]['ShowStartTurn'])return;$gameSystem['addHorzLineToCombatLog']();let _0x141fa7=TextManager['combatLog_StartTurn'][_0x29caa0(0x22f)]($gameTroop[_0x29caa0(0x2e1)]()),_0xeeb12a=ImageManager['combatLog_StartTurn_Icon'];$gameSystem[_0x29caa0(0x1ee)](_0x141fa7,_0xeeb12a);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x2ca)]=Window_BattleLog['prototype'][_0x8a75bb(0x2e4)],Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x2e4)]=function(_0x57c40a,_0x1024a2,_0x2ad28f){const _0x44be3e=_0x8a75bb;$gameSystem[_0x44be3e(0x14c)](),VisuMZ[_0x44be3e(0x262)]['Window_BattleLog_startAction'][_0x44be3e(0x21d)](this,_0x57c40a,_0x1024a2,_0x2ad28f);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x1b1)]=Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x182)],Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x182)]=function(_0x51c66f){const _0x5486d4=_0x8a75bb;VisuMZ['CombatLog'][_0x5486d4(0x1b1)][_0x5486d4(0x21d)](this,_0x51c66f);if(!_0x51c66f)return;if(!VisuMZ[_0x5486d4(0x262)]['Settings'][_0x5486d4(0x262)]['ShowStateCurrent']);const _0x24d566=_0x51c66f[_0x5486d4(0x337)]();for(const _0x3f5e2d of _0x24d566){if(!_0x3f5e2d)continue;if(!_0x3f5e2d['message3'])continue;if(_0x3f5e2d[_0x5486d4(0x213)][_0x5486d4(0x2e3)](VisuMZ[_0x5486d4(0x262)]['RegExp'][_0x5486d4(0x204)]))continue;let _0x146964=_0x3f5e2d[_0x5486d4(0x1e9)],_0xfca4c1=_0x146964['format'](_0x51c66f['combatLogName']()),_0x39837b=_0x3f5e2d[_0x5486d4(0x188)];$gameSystem[_0x5486d4(0x1ee)](_0xfca4c1,_0x39837b);}},VisuMZ['CombatLog'][_0x8a75bb(0x241)]=Window_BattleLog['prototype'][_0x8a75bb(0x25d)],Window_BattleLog['prototype'][_0x8a75bb(0x25d)]=function(_0x58cb82,_0xb74865){const _0x2e620b=_0x8a75bb;VisuMZ[_0x2e620b(0x262)][_0x2e620b(0x241)][_0x2e620b(0x21d)](this,_0x58cb82,_0xb74865);const _0x3117c5=VisuMZ[_0x2e620b(0x262)][_0x2e620b(0x193)][_0x2e620b(0x262)];if(DataManager[_0x2e620b(0x181)](_0xb74865)){if(_0xb74865['message1']&&_0x3117c5[_0x2e620b(0x2fc)]){let _0x332be2=_0xb74865[_0x2e620b(0x2a0)],_0x535b55=_0x332be2[_0x2e620b(0x22f)](_0x58cb82[_0x2e620b(0x2e8)](),_0xb74865[_0x2e620b(0x2e7)]),_0x57a163=_0xb74865[_0x2e620b(0x188)];$gameSystem['addTextToCombatLog'](_0x535b55,_0x57a163);}if(_0xb74865[_0x2e620b(0x336)]&&_0x3117c5[_0x2e620b(0x1dd)]){let _0x3640de=_0xb74865[_0x2e620b(0x336)],_0x212a6d=_0x3640de[_0x2e620b(0x22f)](_0x58cb82[_0x2e620b(0x2e8)](),_0xb74865[_0x2e620b(0x2e7)]),_0x19e2db=_0xb74865['iconIndex'];$gameSystem[_0x2e620b(0x1ee)](_0x212a6d,_0x19e2db);}}else{if(TextManager[_0x2e620b(0x281)]&&_0x3117c5['ShowItemMessage']){let _0x23963e=TextManager[_0x2e620b(0x281)],_0x3e19f0=_0x23963e[_0x2e620b(0x22f)](_0x58cb82[_0x2e620b(0x2e8)](),_0xb74865['name']),_0x108589=_0xb74865[_0x2e620b(0x188)];$gameSystem['addTextToCombatLog'](_0x3e19f0,_0x108589);}}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x16a)]=Window_BattleLog['prototype'][_0x8a75bb(0x30f)],Window_BattleLog[_0x8a75bb(0x31f)]['displayCounter']=function(_0x8b7e55){const _0x44ae11=_0x8a75bb;VisuMZ[_0x44ae11(0x262)][_0x44ae11(0x16a)][_0x44ae11(0x21d)](this,_0x8b7e55);if(TextManager[_0x44ae11(0x1c6)]&&VisuMZ[_0x44ae11(0x262)][_0x44ae11(0x193)][_0x44ae11(0x262)][_0x44ae11(0x198)]){let _0x5302f1=TextManager[_0x44ae11(0x1c6)],_0x384e4c=_0x5302f1[_0x44ae11(0x22f)](_0x8b7e55[_0x44ae11(0x2e8)]()),_0x40d21a=ImageManager['combatLog_Counter_Icon'];$gameSystem[_0x44ae11(0x1ee)](_0x384e4c,_0x40d21a);}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x2e9)]=Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x1a7)],Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x1a7)]=function(_0x335684){const _0x3c28fa=_0x8a75bb;VisuMZ['CombatLog'][_0x3c28fa(0x2e9)][_0x3c28fa(0x21d)](this,_0x335684);if(TextManager[_0x3c28fa(0x29e)]&&VisuMZ[_0x3c28fa(0x262)]['Settings']['CombatLog'][_0x3c28fa(0x256)]){let _0xfe1cfa=TextManager[_0x3c28fa(0x29e)],_0x305823=_0xfe1cfa[_0x3c28fa(0x22f)](_0x335684[_0x3c28fa(0x2e8)]()),_0x3371b7=ImageManager[_0x3c28fa(0x2d6)];$gameSystem[_0x3c28fa(0x1ee)](_0x305823,_0x3371b7);}},VisuMZ['CombatLog'][_0x8a75bb(0x2d3)]=Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x249)],Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x249)]=function(_0x14832c,_0x26ca9f){const _0x326f6a=_0x8a75bb;VisuMZ[_0x326f6a(0x262)][_0x326f6a(0x2d3)][_0x326f6a(0x21d)](this,_0x14832c,_0x26ca9f);if(TextManager[_0x326f6a(0x1be)]&&VisuMZ[_0x326f6a(0x262)]['Settings'][_0x326f6a(0x262)]['ShowSubst']){const _0xf2011a=_0x14832c[_0x326f6a(0x2e8)]();let _0x37760f=TextManager[_0x326f6a(0x1be)],_0x4216d8=_0x37760f['format'](_0xf2011a,_0x26ca9f[_0x326f6a(0x2e8)]()),_0x5ec14b=ImageManager[_0x326f6a(0x2b0)];$gameSystem[_0x326f6a(0x1ee)](_0x4216d8,_0x5ec14b);}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x28a)]=Window_BattleLog[_0x8a75bb(0x31f)]['displayFailure'],Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x1bc)]=function(_0x5ec8c7){const _0x282138=_0x8a75bb;VisuMZ[_0x282138(0x262)]['Window_BattleLog_displayFailure'][_0x282138(0x21d)](this,_0x5ec8c7);if(_0x5ec8c7[_0x282138(0x1e6)]()[_0x282138(0x300)]()&&!_0x5ec8c7[_0x282138(0x1e6)]()[_0x282138(0x146)]){if(TextManager[_0x282138(0x149)]&&VisuMZ[_0x282138(0x262)][_0x282138(0x193)]['CombatLog'][_0x282138(0x23d)]){let _0x583b95=TextManager[_0x282138(0x149)],_0x1062d7=_0x583b95[_0x282138(0x22f)](_0x5ec8c7[_0x282138(0x2e8)]()),_0x35b3a9=ImageManager['combatLog_Failure_Icon'];$gameSystem[_0x282138(0x1ee)](_0x1062d7,_0x35b3a9);}}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x233)]=Window_BattleLog['prototype'][_0x8a75bb(0x21c)],Window_BattleLog['prototype']['displayCritical']=function(_0x239597){const _0x41272d=_0x8a75bb;VisuMZ[_0x41272d(0x262)]['Window_BattleLog_displayCritical']['call'](this,_0x239597);if(_0x239597[_0x41272d(0x1e6)]()[_0x41272d(0x258)]&&VisuMZ[_0x41272d(0x262)]['Settings']['CombatLog'][_0x41272d(0x217)]){if(_0x239597[_0x41272d(0x326)]()){if(TextManager['criticalToActor']){let _0x4cf9bf=TextManager[_0x41272d(0x248)],_0x9723c1=ImageManager['combatLog_CriticalHit_Icon'];$gameSystem['addTextToCombatLog'](_0x4cf9bf,_0x9723c1);}}else{if(TextManager['criticalToEnemy']){let _0x5924a4=TextManager[_0x41272d(0x2c9)],_0x2c9297=ImageManager[_0x41272d(0x167)];$gameSystem[_0x41272d(0x1ee)](_0x5924a4,_0x2c9297);}}}},VisuMZ['CombatLog']['Window_BattleLog_displayMiss']=Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x2a3)],Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x2a3)]=function(_0x6ea8db){const _0x27f54c=_0x8a75bb;VisuMZ[_0x27f54c(0x262)][_0x27f54c(0x1c7)]['call'](this,_0x6ea8db);if(_0x6ea8db[_0x27f54c(0x1e6)]()[_0x27f54c(0x1f0)]&&VisuMZ[_0x27f54c(0x262)][_0x27f54c(0x193)][_0x27f54c(0x262)][_0x27f54c(0x2ac)]){const _0x7e7f23=_0x6ea8db['isActor']();if(_0x7e7f23&&TextManager[_0x27f54c(0x1fb)]){let _0x2f1899=TextManager[_0x27f54c(0x1fb)],_0x34de71=_0x2f1899[_0x27f54c(0x22f)](_0x6ea8db[_0x27f54c(0x2e8)]()),_0x29fb7d=ImageManager[_0x27f54c(0x288)];$gameSystem[_0x27f54c(0x1ee)](_0x34de71,_0x29fb7d);}else{if(!_0x7e7f23&&TextManager[_0x27f54c(0x1ce)]){let _0x227982=TextManager[_0x27f54c(0x1ce)],_0x540b6a=_0x227982[_0x27f54c(0x22f)](_0x6ea8db[_0x27f54c(0x2e8)]()),_0x30f6fb=ImageManager[_0x27f54c(0x288)];$gameSystem[_0x27f54c(0x1ee)](_0x540b6a,_0x30f6fb);}}}else{if(TextManager['actionFailure']&&VisuMZ['CombatLog'][_0x27f54c(0x193)][_0x27f54c(0x262)]['ShowFail']){let _0x38fa3c=TextManager['actionFailure'],_0x177c73=_0x38fa3c['format'](_0x6ea8db['combatLogName']()),_0x522bf4=ImageManager[_0x27f54c(0x1b4)];$gameSystem['addTextToCombatLog'](_0x177c73,_0x522bf4);}}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x236)]=Window_BattleLog[_0x8a75bb(0x31f)][_0x8a75bb(0x294)],Window_BattleLog['prototype'][_0x8a75bb(0x294)]=function(_0x682b13){const _0x30529c=_0x8a75bb;VisuMZ['CombatLog'][_0x30529c(0x236)]['call'](this,_0x682b13);if(VisuMZ[_0x30529c(0x262)]['Settings']['CombatLog'][_0x30529c(0x335)]){if(_0x682b13['result']()[_0x30529c(0x1f0)]&&TextManager[_0x30529c(0x161)]){let _0xf6ceb0=TextManager[_0x30529c(0x161)],_0x174937=_0xf6ceb0[_0x30529c(0x22f)](_0x682b13[_0x30529c(0x2e8)]()),_0x20ff48=ImageManager[_0x30529c(0x1cf)];$gameSystem[_0x30529c(0x1ee)](_0x174937,_0x20ff48);}else{if(TextManager[_0x30529c(0x17c)]){let _0x43693d=TextManager[_0x30529c(0x17c)],_0x1e5b83=_0x43693d[_0x30529c(0x22f)](_0x682b13[_0x30529c(0x2e8)]()),_0x37daad=ImageManager[_0x30529c(0x1cf)];$gameSystem[_0x30529c(0x1ee)](_0x1e5b83,_0x37daad);}}}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x175)]=Window_PartyCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x215)],Window_PartyCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x215)]=function(){const _0x46356a=_0x8a75bb;VisuMZ['CombatLog'][_0x46356a(0x175)][_0x46356a(0x21d)](this);if(Imported[_0x46356a(0x317)])return;this['addCombatLogCommand']();},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x32b)]=Window_PartyCommand['prototype'][_0x8a75bb(0x2c8)],Window_PartyCommand['prototype'][_0x8a75bb(0x2c8)]=function(){const _0x2020c9=_0x8a75bb;VisuMZ['CombatLog'][_0x2020c9(0x32b)][_0x2020c9(0x21d)](this),this[_0x2020c9(0x275)]();},Window_PartyCommand['prototype'][_0x8a75bb(0x275)]=function(){const _0x232c4b=_0x8a75bb;if(!$gameSystem[_0x232c4b(0x1ea)]())return;if(this[_0x232c4b(0x16b)](_0x232c4b(0x24d))>=0x0)return;const _0x3b5a24=Imported['VisuMZ_1_BattleCore']?this[_0x232c4b(0x219)]():_0x232c4b(0x23c),_0x1256e5=TextManager[_0x232c4b(0x235)],_0x15e6ef=ImageManager['combatLog_BattleCmd_Icon']||0x0,_0x28fffe=_0x3b5a24===_0x232c4b(0x23c)?_0x1256e5:_0x232c4b(0x1b6)[_0x232c4b(0x22f)](_0x15e6ef,_0x1256e5);this[_0x232c4b(0x19e)](_0x28fffe,_0x232c4b(0x24d));},VisuMZ[_0x8a75bb(0x262)]['Window_ActorCommand_makeCommandList']=Window_ActorCommand['prototype'][_0x8a75bb(0x215)],Window_ActorCommand['prototype'][_0x8a75bb(0x215)]=function(){const _0x50c7bf=_0x8a75bb;VisuMZ[_0x50c7bf(0x262)][_0x50c7bf(0x1ec)][_0x50c7bf(0x21d)](this);if(Imported['VisuMZ_1_BattleCore'])return;if(this[_0x50c7bf(0x16b)]('combatLog')>=0x0)return;this['addCombatLogCommand']();},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x141)]=Window_ActorCommand['prototype']['addCustomCommands'],Window_ActorCommand['prototype']['addCustomCommands']=function(){const _0x562824=_0x8a75bb;VisuMZ[_0x562824(0x262)][_0x562824(0x141)]['call'](this),this[_0x562824(0x275)]();},Window_ActorCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x275)]=function(){const _0x5bcc07=_0x8a75bb;if(!$gameSystem[_0x5bcc07(0x287)]())return;this[_0x5bcc07(0x16b)]('combatLog')>=0x0&&this[_0x5bcc07(0x1b0)]();const _0x49967a=Imported[_0x5bcc07(0x317)]?this[_0x5bcc07(0x219)]():_0x5bcc07(0x23c),_0x342bf6=TextManager['combatLog_BattleCmd_Name'],_0x3d298b=ImageManager[_0x5bcc07(0x1f2)]||0x0,_0x4c609e=_0x49967a===_0x5bcc07(0x23c)?_0x342bf6:'\x5cI[%1]%2'[_0x5bcc07(0x22f)](_0x3d298b,_0x342bf6);this['addCommand'](_0x4c609e,_0x5bcc07(0x24d));},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)][_0x8a75bb(0x186)]=Window_ActorCommand[_0x8a75bb(0x31f)]['updateHelp'],Window_ActorCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x2c4)]=function(){const _0x31b2bd=_0x8a75bb,_0x247da5=this[_0x31b2bd(0x1f3)]();switch(_0x247da5){case _0x31b2bd(0x24d):this[_0x31b2bd(0x2c2)][_0x31b2bd(0x24e)](TextManager['combatLogHelp']);break;default:VisuMZ['CombatLog'][_0x31b2bd(0x193)]['Window_ActorCommand_updateHelp']['call'](this);break;}},Window_ActorCommand[_0x8a75bb(0x31f)][_0x8a75bb(0x1b0)]=function(){const _0xada5e4=_0x8a75bb;while(this[_0xada5e4(0x16b)](_0xada5e4(0x24d))>=0x0){const _0x404e50=this[_0xada5e4(0x16b)]('combatLog');this['_list'][_0xada5e4(0x242)](_0x404e50,0x1);}};function Window_CombatLogHistory(){this['initialize'](...arguments);}Window_CombatLogHistory[_0x8a75bb(0x31f)]=Object[_0x8a75bb(0x18b)](Window_HorzCommand[_0x8a75bb(0x31f)]),Window_CombatLogHistory['prototype'][_0x8a75bb(0x304)]=Window_CombatLogHistory,Window_CombatLogHistory[_0x8a75bb(0x31f)][_0x8a75bb(0x180)]=function(_0x2171ce){const _0x14a20e=_0x8a75bb;Window_HorzCommand[_0x14a20e(0x31f)]['initialize'][_0x14a20e(0x21d)](this,_0x2171ce);},Window_CombatLogHistory[_0x8a75bb(0x31f)]['maxCols']=function(){const _0x3e2e81=_0x8a75bb;return $gameSystem[_0x3e2e81(0x191)]();},Window_CombatLogHistory[_0x8a75bb(0x31f)][_0x8a75bb(0x325)]=function(){},Window_CombatLogHistory[_0x8a75bb(0x31f)][_0x8a75bb(0x2d7)]=function(_0x20b1ac){},Window_CombatLogHistory[_0x8a75bb(0x31f)]['cursorUp']=function(_0x5d3a08){},Window_CombatLogHistory[_0x8a75bb(0x31f)][_0x8a75bb(0x274)]=function(){const _0x30bc11=_0x8a75bb;Window_HorzCommand['prototype'][_0x30bc11(0x274)][_0x30bc11(0x21d)](this),this[_0x30bc11(0x1fe)]&&this['_logWindow'][_0x30bc11(0x2cc)](this[_0x30bc11(0x2a4)]());},Window_CombatLogHistory[_0x8a75bb(0x31f)][_0x8a75bb(0x1a3)]=function(_0x59bef7){const _0x452091=_0x8a75bb;this[_0x452091(0x1fe)]=_0x59bef7;},Window_CombatLogHistory[_0x8a75bb(0x31f)][_0x8a75bb(0x215)]=function(){const _0x3fb9fe=_0x8a75bb;let _0x890f32=$gameSystem[_0x3fb9fe(0x191)]();for(let _0x5dfb31=0x0;_0x5dfb31<_0x890f32;_0x5dfb31++){let _0x5b48c8=_0x5dfb31===0x0?TextManager[_0x3fb9fe(0x2d2)]:TextManager[_0x3fb9fe(0x2e6)],_0x1880b0=_0x5b48c8[_0x3fb9fe(0x22f)]($gameSystem[_0x3fb9fe(0x17b)]()-_0x5dfb31);this['addCommand'](_0x1880b0,'history',!![],_0x5dfb31);}};function Window_CombatLogDisplay(){this['initialize'](...arguments);}function _0x4131(){const _0xe50768=['addCustomCommands','criticalToEnemy','Window_BattleLog_startAction','startBattle','setCombatLogIndex','_dimmerSprite','ShowStateRemove','Game_Battler_onCtbOrderChange','Show_AntiDmgBarrier_Cancel','defeat','_combatLog_Latest','Window_BattleLog_displaySubstitute','ShowAdvantages','_combatLogSilentTp','combatLog_Reflection_Icon','cursorDown','escapeFailure','BattleManager_processVictory','combatLog_TP_Dmg','initCombatLogBase','down','ShowMP','_surprise','exit','isActiveTpb','turnCount','enemyRecovery','match','startAction','onAntiDamageMpBarrier','_combatLog_HistoryFmt','name','combatLogName','Window_BattleLog_displayReflection','1001060LqaKsU','BattleManager_onEscapeSuccess','SCROLL_SPEED_CURSOR','5DLhPxU','return\x200','VisuMZ_1_MainMenuCore','SHOW_LINE_BACKGROUND','combatLog_StartTurn','commandName','CombatHistory_RectJS','Bypass','scale','28MoxPKD','combatLog_HP_NoDmg','parse','Window','_combatLogAccess','NoDmg','ShowSkillMessage1','CombatLogMenu_BgType','IconNoDmgTP','drawRect','isHit','TextBattleSysStbInstant','actorCmd','Icon_LifeStateEffects_%1','constructor','=====HORZLINE=====','_backSprite2','CombatHistoryPrevious','addWindow','displayAbsorptionBarrierPopup','replace','combatLog_MP_NoDmg','SystemShowCombatLogMenu','SnapshotOpacity','setBypassCombatLog','displayCounter','ShowBattleSysStbInstant','dimColor2','ShowMainMenu','combatLog_BattleStart','createCommandWindow','onTouchOk','setLastWindow','VisuMZ_1_BattleCore','_actorId','IconSubst','onCtbOrderChange','endTurn','Game_BattlerBase_eraseBuff','setTp','isBusy','prototype','Window_Selectable_isCursorMovable','end','Game_Battler_gainSilentTp','combatLog_BattleStart_Icon','BgSettings','processCursorHomeEndTrigger','isActor','isTimeActive','ShowAddBuff','combatLog_HP_Dmg','Game_Battler_useItem','Window_PartyCommand_addCustomCommands','updateCancelButton','combatLog_EndTurn_Icon','commandCombatLog','abs','parameters','ShowPartyCommand','isAnyInputWindowActive','scaleSprite','applyCombatLogColor','ShowEvade','message2','states','isCursorMovable','fillRect','combatLog_Preemptive_Icon','mainMenu','Window_ActorCommand_addCustomCommands','ShowIcons','max','pageup','bind','success','getBackgroundOpacity','height','actionFailure','StoredLogs','adjustSprite','addHorzLineToCombatLog','buffIconIndex','ShowEscape','processDefeat','bitmap','_partyCommandWindow','IconFail','isTpb','TextEndTurn','Show_AntiDmgBarrier_Absorb','gainSilentTp','HotKey','emerge','startBattleCombatLog','TextColorHealTP','Enable','ShowStateAdd','Text_AntiDmgBarrier_MpDisperse','cancel','pop','_combatLogWindow','evasion','Game_Battler_onAntiDamageNullificationBarrier','openCombatLog','_bypassAddToCombatLog','isMainMenuCombatLogVisible','Show_AntiDmgBarrier_Nullify','combatLog_CriticalHit_Icon','isAccessKeyPressed','Scene_Battle_isTimeActive','Window_BattleLog_displayCounter','findSymbol','onAntiDamageTpBarrier','ShowHP','ShowDefeat','IconHealMP','isBypassCombatLog','historyWindowRect','Game_Battler_onAntiDamageTpBarrier','onLifeStateEffect','map','Window_PartyCommand_makeCommandList','smoothScrollTo','IconCounter','_commandWindow','ARRAYEVAL','initCombatLogAccess','battleCount','magicEvasion','_preemptive','combatLog_StartTurn_Icon','SystemShowCombatLogParty','initialize','isSkill','displayCurrentState','includes','IconDmgTP','_actorCommandWindow','Window_ActorCommand_updateHelp','_lastWindow','iconIndex','pagedown','_buffs','create','ShowEraseBuff','partyCmd','setHp','buffAdd','actorLoss','getTotalCombatLogs','ShowBattleSysAtbInterrupt','Settings','isPressed','Game_Battler_displayAbsorptionBarrierPopup','Game_BattlerBase_increaseBuff','addChild','ShowCounter','Window_MenuCommand_addOriginalCommands','addStealText','status','itemHeight','81057FQFiXp','addCommand','IconBattleStart','IconNoDmgMP','setFrame','BgFilename2','setLogWindow','visible','createHistoryWindow','Game_BattlerBase_decreaseBuff','displayReflection','none','Game_Battler_addState','_combatLogs','IconNoDmgHP','combatLogHelp','RemoveUnwantedTextCodes','Show_AntiDmgBarrier_Reduce','EVAL','removeCombatLogCommand','Window_BattleLog_displayCurrentState','52xlnViG','processOk','combatLog_Failure_Icon','requestRefresh','\x5cI[%1]%2','combatLog_Result_Defeat','combatLog_MP_Heal','actorDamage','setCombatLogHotKeyActive','inBattle','displayFailure','close','substitute','surprise','IconDmgHP','isStateAffected','CombatLogBypass','IconDefeat','_combatLogIndex','IconPreemptive','counterAttack','Window_BattleLog_displayMiss','select','processVictory','addChildToBack','removeState','Game_BattlerBase_getAntiDamageBarrierReduction','TextStartTurn','enemyNoHit','combatLog_Evasion_Icon','_tp','unshift','_scene','battleMembers','_historyWindow','debuffAdd','isTriggered','CombatHistoryLatest','ShowStateCurrent','IconDmgMP','dimColor1','addState','startTurn','ShowSkillMessage2','drawBackgroundRect','IconSurprise','ConvertParams','IconEnemyEmerge','TextColorDmgMP','BgFilename1','RegExp','Show','result','setMainMenuCombatLogVisible','Text_AntiDmgBarrier_TpDisperse','message3','isPartyCmdCombatLogVisible','anchor','Window_ActorCommand_makeCommandList','partyName','addTextToCombatLog','CombatLogBattle_RectJS','physical','Text_AntiDmgBarrier_Absorb','combatLog_BattleCmd_Icon','currentSymbol','combatLog_TP_Heal','Game_BattlerBase_setTp','drawTextEx','Game_Battler_onLifeStateEffect','combatLog_EnemyEmerge_Icon','isSceneBattle','onEscapeFailure','actorNoHit','drawHorzLine','2897368qwWvqf','_logWindow','victory','combatLog_Counter_Icon','isCombatLogCommandEnabled','onAntiDamageNullificationBarrier','stbGainInstant','BypassCombatLog','Window_BattleLog_startTurn','IconHealTP','createDisplayObjects','enemyLoss','getLastWindow','combatLog_Surprise_Icon','createBackground','deactivate','combatLog_Result_Victory','AutoColor','centerSprite','popScene','combatLog_EndTurn','combatLog_MP_Dmg','note','increaseBuff','makeCommandList','processAbort','ShowCritical','ShowBattleStart','commandStyle','_combatLogPayment','isCombatLogHotKeyActive','displayCritical','call','BattleManager_processDefeat','finishCurrentCombatLog','Game_BattlerBase_setHp','Show_LifeStateEffects_%1','BIGGER_LINE_HEIGHT','SCROLL_SPEED_PAGEDN','refresh','gradientFillRect','TextColorNoDmgTP','split','leader','combatLogBuffChanges','setMp','smoothScrollDown','maxScrollY','drawItemBackground','JSON','format','eraseBuff','ACCESS_BUTTON','_backSprite1','Window_BattleLog_displayCritical','Game_BattlerBase_setMp','combatLog_BattleCmd_Name','Window_BattleLog_displayEvasion','setBackgroundType','onEscapeSuccess','processCursorMove','combatLog_TP_NoDmg','STR','text','ShowFail','Scene_Battle_isAnyInputWindowActive','ShowAddDebuff','TextBattleSysAtbInterrupt','Window_BattleLog_displayAction','splice','ARRAYFUNC','refreshCombatLog','COMBATLOG_MAXIMUM_BATTLE_ENTRIES','_requestRefresh','IconEscape','criticalToActor','displaySubstitute','isOpen','TextColorDmgHP','value','combatLog','setText','loadTitle1','actorRecovery','Scene_Battle_updateCancelButton','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ShowEnemyEmerge','Heal','openness','ShowReflect','HORZ_LINE_THICKNESS','critical','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','boxWidth','setHandler','CombatLogAddHorzLine','displayAction','Compatibility','toUpperCase','smoothScrollUp','View\x20the\x20combat\x20log.','CombatLog','enemyNoDamage','Window_Selectable_allowShiftScrolling','1888794nHIsze','BattleManager_endTurn','scrollTo','IconEndTurn','shift','435080firARb','_hp','padding','setActorCmdCombatLogVisible','Game_Battler_onAtbInterrupt','NUM','resize','_victoryPhase','createCustomBackgroundImages','itemRect','update','addCombatLogCommand','Game_System_initialize','open','preemptive','Window_BattleLog_addStealText','Scene_Battle_createDisplayObjects','onAtbInterrupt','combatLog_HP_Heal','drawItem','isMainMenuCombatLogEnabled','_list','_cancelButton','useItem','TextBattleStart','319aSmuCw','Name','General','addLoadListener','isActorCmdCombatLogVisible','combatLog_Miss_Icon','onAntiDamageCancelBarrier','Window_BattleLog_displayFailure','Text_AntiDmgBarrier_Nullify','getAntiDamageBarrierReduction','processCancel','CombatLogAddText','mainAreaTop','refreshDimmerBitmap','Game_Battler_onAntiDamageMpBarrier','Icon_StealItems_Steal','Text_AntiDmgBarrier_Reduce','displayEvasion','addOriginalCommands','CombatLogEnableHotKey','BattleHelpCombatLog','Text_AntiDmgBarrier_Cancel','combatLog_Result_Escape','decreaseBuff','Scene_Menu_createCommandWindow','registerCommand','allowShiftScrolling','magicReflection','closeCombatLog','message1','944232GUEAZh','_windowLayer','displayMiss','currentExt','calcWindowHeight','mainAreaHeight','battleRefresh','Text','IconBattleSysStbInstant','ARRAYSTRUCT','isCombatLogCommandVisible','ShowMiss','combatLogWindowRect','createCombatLogWindow','4176748LJdAXJ','combatLog_Substitute_Icon','actorNoDamage','hotkeyOn','BattleManager_processAbort','activate','width','BattleManager_updateTurnEnd','length','CombatHistory_BgType','combatLogStateChanges','Show_StealItems_Steal','escapeStart','home','IconVictory','IconBattleSysAtbInterrupt','version','getCombatLog','checkRefresh','_helpWindow','setPartyCmdCombatLogVisible','updateHelp','\x5cC[%1]%2\x5cC[0]','active','push'];_0x4131=function(){return _0xe50768;};return _0x4131();}Window_CombatLogDisplay[_0x8a75bb(0x31f)]=Object[_0x8a75bb(0x18b)](Window_Command[_0x8a75bb(0x31f)]),Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x304)]=Window_CombatLogDisplay,Window_CombatLogDisplay['BIGGER_LINE_HEIGHT']=![],Window_CombatLogDisplay[_0x8a75bb(0x2f0)]=![],Window_CombatLogDisplay['HORZ_LINE_THICKNESS']=0x4,Window_CombatLogDisplay[_0x8a75bb(0x2ec)]=0.2,Window_CombatLogDisplay[_0x8a75bb(0x223)]=1.5,Window_CombatLogDisplay[_0x8a75bb(0x231)]=VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x193)]['General'][_0x8a75bb(0x157)]||_0x8a75bb(0x1a8),Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x180)]=function(_0x4ebe4d){const _0x4f01d4=_0x8a75bb;Window_Command['prototype'][_0x4f01d4(0x180)][_0x4f01d4(0x21d)](this,_0x4ebe4d),this[_0x4f01d4(0x20c)](),this[_0x4f01d4(0x246)]=![],SceneManager[_0x4f01d4(0x1f9)]()&&(this[_0x4f01d4(0x255)]=0x0);},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x19c)]=function(){const _0x15087b=_0x8a75bb;let _0x57c9ce=Window_Scrollable['prototype'][_0x15087b(0x19c)]['call'](this);return _0x57c9ce+(Window_CombatLogDisplay[_0x15087b(0x222)]?0x8:0x0);},Window_CombatLogDisplay['prototype']['isAutoColorAffected']=function(){const _0x282e75=_0x8a75bb;return VisuMZ[_0x282e75(0x262)][_0x282e75(0x193)][_0x282e75(0x262)][_0x282e75(0x20e)];},Window_CombatLogDisplay['prototype']['isMenuCursorBlacklisted']=function(){return!![];},Window_CombatLogDisplay['prototype'][_0x8a75bb(0x1c8)]=function(_0x381050){},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x1b3)]=function(){const _0x49c8e1=_0x8a75bb;this[_0x49c8e1(0x28d)]();},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x315)]=function(){const _0x4e2c92=_0x8a75bb;this[_0x4e2c92(0x28d)]();},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x239)]=function(){const _0x409d9c=_0x8a75bb;SceneManager['isSceneBattle']()&&!this[_0x409d9c(0x2c6)]&&($gameSystem[_0x409d9c(0x21b)]()&&Window_CombatLogDisplay[_0x409d9c(0x231)]!==undefined&&(this[_0x409d9c(0x168)]()?(this[_0x409d9c(0x2c1)](),this['open']()):this[_0x409d9c(0x1bd)]())),this[_0x409d9c(0x24a)]()&&(Input[_0x409d9c(0x194)](_0x409d9c(0x2dc))&&this['smoothScrollDown'](Window_CombatLogDisplay[_0x409d9c(0x2ec)]),Input['isPressed']('up')&&this[_0x409d9c(0x260)](Window_CombatLogDisplay[_0x409d9c(0x2ec)]),Input[_0x409d9c(0x194)](_0x409d9c(0x189))&&this[_0x409d9c(0x22b)](Window_CombatLogDisplay[_0x409d9c(0x223)]),Input['isPressed'](_0x409d9c(0x144))&&this['smoothScrollUp'](Window_CombatLogDisplay[_0x409d9c(0x223)]),Input[_0x409d9c(0x1d6)](_0x409d9c(0x2bc))&&this[_0x409d9c(0x176)](0x0,0x0),Input[_0x409d9c(0x1d6)](_0x409d9c(0x321))&&this[_0x409d9c(0x176)](0x0,this['maxScrollY']()));},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x168)]=function(){const _0x119528=_0x8a75bb;if($gameMessage[_0x119528(0x31e)]())return![];if(BattleManager[_0x119528(0x271)])return![];return Input[_0x119528(0x194)](Window_CombatLogDisplay[_0x119528(0x231)]);},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x2cc)]=function(_0xd23750){const _0x22b999=_0x8a75bb;if(this[_0x22b999(0x1c4)]===_0xd23750)return;this['_combatLogIndex']=_0xd23750,this[_0x22b999(0x224)](),this[_0x22b999(0x267)](0x0,0x0);},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x215)]=function(){const _0x281863=_0x8a75bb;if(this[_0x281863(0x1c4)]===undefined)return;const _0x588afc=$gameSystem[_0x281863(0x2c0)](this[_0x281863(0x1c4)]);for(const _0x3e3fab of _0x588afc){if(!_0x3e3fab)continue;this[_0x281863(0x19e)](_0x3e3fab,_0x281863(0x24d));}const _0x4b72ea=this[_0x281863(0x27f)][this['_list'][_0x281863(0x2b7)]-0x1];_0x4b72ea&&_0x4b72ea[_0x281863(0x2e7)]!==_0x281863(0x305)&&this['addCommand']('=====HORZLINE=====','combatLog');},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x22d)]=function(_0x3c335b){const _0x184253=_0x8a75bb;if(Window_CombatLogDisplay['SHOW_LINE_BACKGROUND']){const _0x27caef=this[_0x184253(0x273)](_0x3c335b);this[_0x184253(0x1de)](_0x27caef);}},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x27d)]=function(_0xaf168c){const _0x41eff9=_0x8a75bb,_0x9341dc=this['itemLineRect'](_0xaf168c),_0x46b6d3=this[_0x41eff9(0x2f2)](_0xaf168c);_0x46b6d3==='=====HORZLINE====='?this[_0x41eff9(0x1fc)](_0x9341dc):this[_0x41eff9(0x1f6)](_0x46b6d3,_0x9341dc['x'],_0x9341dc['y'],_0x9341dc[_0x41eff9(0x2b5)]);},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x1fc)]=function(_0xcd6f4){const _0x578b9d=_0x8a75bb;this['resetFontSettings']();const _0x980dc0=Window_CombatLogDisplay[_0x578b9d(0x257)],_0x197878=_0xcd6f4['y']+(_0xcd6f4[_0x578b9d(0x148)]-_0x980dc0)/0x2;this[_0x578b9d(0x2ff)](_0xcd6f4['x'],_0x197878,_0xcd6f4[_0x578b9d(0x2b5)],_0x980dc0);},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x1b5)]=function(){const _0xd20174=_0x8a75bb;this[_0xd20174(0x246)]=!![];},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x2c1)]=function(){const _0x3ec05f=_0x8a75bb;this[_0x3ec05f(0x246)]&&this['battleRefresh']();},Window_CombatLogDisplay['prototype'][_0x8a75bb(0x2a7)]=function(){const _0x1b30e7=_0x8a75bb;this['_requestRefresh']=![],this[_0x1b30e7(0x1c4)]=0x0,this[_0x1b30e7(0x224)](),this[_0x1b30e7(0x267)](0x0,this[_0x1b30e7(0x22c)]());},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x316)]=function(_0x2accb4){this['_lastWindow']=_0x2accb4;},Window_CombatLogDisplay['prototype'][_0x8a75bb(0x209)]=function(){const _0x198394=_0x8a75bb;return this[_0x198394(0x187)];},Window_CombatLogDisplay[_0x8a75bb(0x31f)]['createDimmerSprite']=function(){const _0x15caac=_0x8a75bb;this[_0x15caac(0x2cd)]=new Sprite(),this[_0x15caac(0x2cd)][_0x15caac(0x150)]=new Bitmap(0x0,0x0),this[_0x15caac(0x2cd)]['x']=-0x4,this[_0x15caac(0x1ca)](this[_0x15caac(0x2cd)]);},Window_CombatLogDisplay[_0x8a75bb(0x31f)][_0x8a75bb(0x290)]=function(){const _0x14f39a=_0x8a75bb;if(this['_dimmerSprite']){const _0x974026=this[_0x14f39a(0x2cd)][_0x14f39a(0x150)],_0x45d8ce=this[_0x14f39a(0x2b5)]>0x0?this[_0x14f39a(0x2b5)]+0x8:0x0,_0x552f0c=this[_0x14f39a(0x148)],_0x271200=this[_0x14f39a(0x26c)],_0x20f366=ColorManager[_0x14f39a(0x1da)](),_0x45f954=ColorManager[_0x14f39a(0x311)]();_0x974026[_0x14f39a(0x270)](_0x45d8ce,_0x552f0c),_0x974026[_0x14f39a(0x225)](0x0,0x0,_0x45d8ce,_0x271200,_0x45f954,_0x20f366,!![]),_0x974026[_0x14f39a(0x13e)](0x0,_0x271200,_0x45d8ce,_0x552f0c-_0x271200*0x2,_0x20f366),_0x974026[_0x14f39a(0x225)](0x0,_0x552f0c-_0x271200,_0x45d8ce,_0x271200,_0x20f366,_0x45f954,!![]),this['_dimmerSprite'][_0x14f39a(0x1a1)](0x0,0x0,_0x45d8ce,_0x552f0c),$gameParty[_0x14f39a(0x1bb)]()&&(this[_0x14f39a(0x2cd)][_0x14f39a(0x2f5)]['x']=0x64,this[_0x14f39a(0x2cd)][_0x14f39a(0x1eb)]['x']=0.5);}},VisuMZ[_0x8a75bb(0x262)]['Game_Battler_onAtbInterrupt']=Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x27b)],Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x27b)]=function(){const _0x5d7774=_0x8a75bb;VisuMZ[_0x5d7774(0x262)][_0x5d7774(0x26e)]['call'](this);if(!SceneManager[_0x5d7774(0x1f9)]())return;const _0x5cd0ab=VisuMZ[_0x5d7774(0x262)][_0x5d7774(0x193)][_0x5d7774(0x25e)];if(!_0x5cd0ab)return;if(!_0x5cd0ab[_0x5d7774(0x192)])return;const _0xa3020f=_0x5cd0ab[_0x5d7774(0x240)];if(_0xa3020f){let _0x5a1b33=_0xa3020f[_0x5d7774(0x22f)](this[_0x5d7774(0x2e8)]()),_0x5a1a75=_0x5cd0ab[_0x5d7774(0x2be)];$gameSystem['addTextToCombatLog'](_0x5a1b33,_0x5a1a75);}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x2cf)]=Game_Battler[_0x8a75bb(0x31f)]['onCtbOrderChange'],Game_Battler['prototype'][_0x8a75bb(0x31a)]=function(_0x3745f6){const _0x782d1b=_0x8a75bb;VisuMZ[_0x782d1b(0x262)][_0x782d1b(0x2cf)][_0x782d1b(0x21d)](this,_0x3745f6);if(_0x3745f6===0x0)return;if(!SceneManager[_0x782d1b(0x1f9)]())return;const _0x519dd1=VisuMZ[_0x782d1b(0x262)][_0x782d1b(0x193)][_0x782d1b(0x25e)];if(!_0x519dd1)return;if(!_0x519dd1['ShowBattleSysCtbOrderChange'])return;const _0xc51ced=_0x519dd1['TextBattleSysCtbOrderChange'];if(_0xc51ced){let _0x31628f=_0xc51ced[_0x782d1b(0x22f)](this[_0x782d1b(0x2e8)]()),_0x1f8cf3=_0x519dd1['IconBattleSysCtbOrderChange'];$gameSystem['addTextToCombatLog'](_0x31628f,_0x1f8cf3);}},VisuMZ['CombatLog']['Game_Battler_stbGainInstant']=Game_Battler['prototype'][_0x8a75bb(0x203)],Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x203)]=function(_0x54f5b9){const _0x23bd67=_0x8a75bb;VisuMZ[_0x23bd67(0x262)]['Game_Battler_stbGainInstant']['call'](this,_0x54f5b9);if(_0x54f5b9===0x0)return;if(!SceneManager[_0x23bd67(0x1f9)]())return;const _0x2b4075=VisuMZ[_0x23bd67(0x262)][_0x23bd67(0x193)]['Compatibility'];if(!_0x2b4075)return;if(!_0x2b4075[_0x23bd67(0x310)])return;const _0x4e1501=_0x2b4075[_0x23bd67(0x301)];if(_0x4e1501){let _0x27f83b=_0x4e1501[_0x23bd67(0x22f)](this[_0x23bd67(0x2e8)]()),_0x45e9f8=_0x2b4075[_0x23bd67(0x2a9)];$gameSystem[_0x23bd67(0x1ee)](_0x27f83b,_0x45e9f8);}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x162)]=Game_Battler['prototype']['onAntiDamageNullificationBarrier'],Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x202)]=function(_0x251aa0){const _0x2a62e4=_0x8a75bb,_0x3fe119=VisuMZ[_0x2a62e4(0x262)][_0x2a62e4(0x193)]['Compatibility'];if(_0x3fe119&&_0x3fe119[_0x2a62e4(0x166)]&&SceneManager[_0x2a62e4(0x1f9)]()){let _0x1bf142=_0x3fe119[_0x2a62e4(0x28b)];if(_0x1bf142){let _0xad447d=_0x1bf142['format'](this[_0x2a62e4(0x2e8)](),_0x251aa0[_0x2a62e4(0x2e7)]),_0x365d87=_0x251aa0[_0x2a62e4(0x188)];$gameSystem[_0x2a62e4(0x1ee)](_0xad447d,_0x365d87);}}VisuMZ[_0x2a62e4(0x262)][_0x2a62e4(0x162)]['call'](this,_0x251aa0);},VisuMZ[_0x8a75bb(0x262)]['Game_Battler_onAntiDamageCancelBarrier']=Game_Battler['prototype'][_0x8a75bb(0x289)],Game_Battler[_0x8a75bb(0x31f)]['onAntiDamageCancelBarrier']=function(_0xac46f5){const _0x5313d1=_0x8a75bb,_0x284af1=VisuMZ[_0x5313d1(0x262)][_0x5313d1(0x193)][_0x5313d1(0x25e)];if(_0x284af1&&_0x284af1[_0x5313d1(0x2d0)]&&SceneManager['isSceneBattle']()){let _0x131b4c=_0x284af1[_0x5313d1(0x298)];if(_0x131b4c){let _0x32c8ef=_0x131b4c[_0x5313d1(0x22f)](this[_0x5313d1(0x2e8)](),_0xac46f5[_0x5313d1(0x2e7)]),_0x13908d=_0xac46f5[_0x5313d1(0x188)];$gameSystem[_0x5313d1(0x1ee)](_0x32c8ef,_0x13908d);}}VisuMZ['CombatLog']['Game_Battler_onAntiDamageCancelBarrier'][_0x5313d1(0x21d)](this,_0xac46f5);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x1cc)]=Game_BattlerBase[_0x8a75bb(0x31f)][_0x8a75bb(0x28c)],Game_BattlerBase['prototype'][_0x8a75bb(0x28c)]=function(_0x171226){const _0x23a5d3=_0x8a75bb,_0x5ce3e6=VisuMZ[_0x23a5d3(0x262)][_0x23a5d3(0x193)][_0x23a5d3(0x25e)];if(_0x5ce3e6&&_0x5ce3e6[_0x23a5d3(0x1ae)]&&SceneManager['isSceneBattle']()){let _0x585c5a=_0x5ce3e6[_0x23a5d3(0x293)];if(_0x585c5a){let _0x2301eb=_0x585c5a[_0x23a5d3(0x22f)](this['combatLogName'](),$dataStates[_0x171226][_0x23a5d3(0x2e7)]),_0x12ab9c=$dataStates[_0x171226][_0x23a5d3(0x188)];$gameSystem[_0x23a5d3(0x1ee)](_0x2301eb,_0x12ab9c);}}return VisuMZ['CombatLog'][_0x23a5d3(0x1cc)][_0x23a5d3(0x21d)](this,_0x171226);},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x195)]=Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x309)],Game_Battler[_0x8a75bb(0x31f)]['displayAbsorptionBarrierPopup']=function(_0x32433c,_0x2f2871){const _0x23431a=_0x8a75bb;VisuMZ[_0x23431a(0x262)][_0x23431a(0x195)][_0x23431a(0x21d)](this,_0x32433c,_0x2f2871);if(_0x32433c===0x0)return;const _0xb917b3=VisuMZ[_0x23431a(0x262)]['Settings'][_0x23431a(0x25e)];if(_0xb917b3&&_0xb917b3[_0x23431a(0x155)]&&SceneManager[_0x23431a(0x1f9)]()){let _0x12daf3=_0xb917b3[_0x23431a(0x1f1)];if(_0x12daf3){let _0x358fb9=_0x12daf3[_0x23431a(0x22f)](this['combatLogName'](),_0x2f2871['name'],_0x32433c),_0x2bdc95=_0x2f2871[_0x23431a(0x188)];$gameSystem['addTextToCombatLog'](_0x358fb9,_0x2bdc95);}}},VisuMZ[_0x8a75bb(0x262)]['Game_Battler_onAntiDamageMpBarrier']=Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x2e5)],Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x2e5)]=function(_0x15a520){const _0x94c3e3=_0x8a75bb,_0xd06c3f=VisuMZ[_0x94c3e3(0x262)][_0x94c3e3(0x193)][_0x94c3e3(0x25e)];if(_0xd06c3f&&_0xd06c3f['Show_AntiDmgBarrier_MpDisperse']&&SceneManager['isSceneBattle']()){let _0x18f9b8=_0xd06c3f[_0x94c3e3(0x15d)];if(_0x18f9b8){let _0x9bb924=_0x18f9b8[_0x94c3e3(0x22f)](this['combatLogName'](),_0x15a520[_0x94c3e3(0x2e7)],TextManager['mp']),_0x11ecc8=_0x15a520[_0x94c3e3(0x188)];$gameSystem[_0x94c3e3(0x1ee)](_0x9bb924,_0x11ecc8);}}VisuMZ[_0x94c3e3(0x262)][_0x94c3e3(0x291)]['call'](this,_0x15a520);},VisuMZ['CombatLog'][_0x8a75bb(0x172)]=Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x16c)],Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x16c)]=function(_0x4d4581){const _0x51970b=_0x8a75bb,_0x5b489c=VisuMZ[_0x51970b(0x262)]['Settings'][_0x51970b(0x25e)];if(_0x5b489c&&_0x5b489c['Show_AntiDmgBarrier_TpDisperse']&&SceneManager[_0x51970b(0x1f9)]()){let _0x5f4b57=_0x5b489c[_0x51970b(0x1e8)];if(_0x5f4b57){let _0x2daf13=_0x5f4b57[_0x51970b(0x22f)](this[_0x51970b(0x2e8)](),_0x4d4581[_0x51970b(0x2e7)],TextManager['tp']),_0x25eaf4=_0x4d4581[_0x51970b(0x188)];$gameSystem[_0x51970b(0x1ee)](_0x2daf13,_0x25eaf4);}}VisuMZ[_0x51970b(0x262)]['Game_Battler_onAntiDamageTpBarrier'][_0x51970b(0x21d)](this,_0x4d4581);},VisuMZ['CombatLog']['Game_Battler_onLifeStateEffect']=Game_Battler[_0x8a75bb(0x31f)][_0x8a75bb(0x173)],Game_Battler[_0x8a75bb(0x31f)]['onLifeStateEffect']=function(_0x723f9){const _0x5904da=_0x8a75bb;VisuMZ[_0x5904da(0x262)][_0x5904da(0x1f7)][_0x5904da(0x21d)](this,_0x723f9);if(!SceneManager['isSceneBattle']())return;if(!_0x723f9)return;const _0x50a0f5=VisuMZ[_0x5904da(0x262)][_0x5904da(0x193)][_0x5904da(0x25e)];if(!_0x50a0f5)return;if(!_0x50a0f5[_0x5904da(0x221)[_0x5904da(0x22f)](_0x723f9)])return;let _0x514cf3=_0x50a0f5['Text_LifeStateEffects_%1'[_0x5904da(0x22f)](_0x723f9)];if(_0x514cf3){let _0x487ce0=_0x514cf3[_0x5904da(0x22f)](this[_0x5904da(0x2e8)]()),_0x4e43d0=_0x50a0f5[_0x5904da(0x303)[_0x5904da(0x22f)](_0x723f9)];$gameSystem[_0x5904da(0x1ee)](_0x487ce0,_0x4e43d0);}},VisuMZ[_0x8a75bb(0x262)][_0x8a75bb(0x279)]=Window_BattleLog['prototype'][_0x8a75bb(0x19a)],Window_BattleLog[_0x8a75bb(0x31f)]['addStealText']=function(_0x45e820){const _0x159d5f=_0x8a75bb;VisuMZ[_0x159d5f(0x262)][_0x159d5f(0x279)][_0x159d5f(0x21d)](this,_0x45e820);if(_0x45e820==='')return;const _0x3e0880=VisuMZ[_0x159d5f(0x262)]['Settings'][_0x159d5f(0x25e)];if(_0x3e0880&&_0x3e0880[_0x159d5f(0x2ba)]&&SceneManager[_0x159d5f(0x1f9)]()){let _0x4d7b66=_0x3e0880[_0x159d5f(0x292)];$gameSystem[_0x159d5f(0x1ee)](_0x45e820,_0x4d7b66);}};