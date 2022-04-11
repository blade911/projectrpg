//=============================================================================
// VisuStella MZ - Battle System - FTB - Free Turn Battle
// VisuMZ_2_BattleSystemFTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemFTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemFTB = VisuMZ.BattleSystemFTB || {};
VisuMZ.BattleSystemFTB.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.06] [BattleSystemFTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_FTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Free Turn Battle (FTB) is a type of battle system made for RPG Maker MZ,
 * where the teams for actors and enemies take turns attacking one another as
 * a whole. During each team's turns, an action count is given to them and they
 * can freely perform actions among their teammates as wanted (or if turned off
 * by the Plugin Parameters, in a cycle). When the action count is depleted or
 * if one team ran out of battler's that can act, the other team begins their
 * turn and so forth.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ftb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actor and enemy teams take turns attacking each other as a whole.
 * * Action counts are given to each team at the start of each turn to utilize
 *   actions for.
 * * If enabled, actors can be freely switched around to perform actions with.
 * * Alter the mechanics of the Battle System FTB to your liking through the
 *   Plugin Parameters.
 * * An Action Count Display is shown for each side to relay information to the
 *   player about the current state of each turn.
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
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
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
 * Surprise Attacks and Preemptive Bonuses
 * 
 * Due to the nature of a team-based battle system, surprise attacks and
 * preemptive bonuses no longer prevent the other team from being able to act
 * for a turn as that gives the initiating team too much advantage. Instead,
 * a surprise attack means the enemy team will always start first for each turn
 * while a preemptive bonus means the actor team will always start first for
 * each turn.
 * 
 * ---
 * 
 * Agility and Speed
 * 
 * When there is no surprise attack or preemptive bonus, aka a neutral battle
 * initiative, then the team that goes first is determined by their Agility
 * value at the start of battle (unless determined otherwise through the Plugin
 * Parameters).
 * 
 * However, because of the nature of team-based battle systems, agility and
 * speed have no impact on action speeds as action speeds are now instantly
 * performed.
 * 
 * Agility, however, can influence Action Counts through buffs and debuffs if
 * enabled through the Plugin Parameters. Each stack of Agility buffs will
 * raise the Action Count for a team while each stack of Agility debuffs will
 * decrease them for subsequent turns.
 * 
 * ---
 * 
 * Action Count
 * 
 * Each team will have an allotted number of actions available for usage. This
 * amount is determined by the number of alive members they have available by
 * default multiplied by their action count base.
 * 
 * The amount of actions that can be performed at base value can be determined
 * inside the Plugin Parameters > Mechanics Settings > Base.
 * 
 * The action count can be altered by AGI buffs and/or debuffs depending on the
 * Plugin Parameter settings.
 * 
 * Further action counts can be altered by various notetag effects tied to the
 * trait objects of each battle member.
 * 
 * ---
 * 
 * Action Orders
 * 
 * As team-based battle systems always have teams go between each other, the
 * standard action orders seen for turn-based and tick-based battle systems no
 * longer exist. However, in the event the actor team has berserk, confused, or
 * autobattlers, the actions will be performed in the following order:
 * 
 * 1. Berserk, confused, and auto battlers go first.
 * 2. If any actions are left, inputtable actors go next.
 * 3. If any actions are left, but there are no inputtable actors, berserk,
 *    confused, and auto battlers use up the remaining actions.
 * 4. Switch to the next team.
 * 
 * For enemy teams, enemies will always go in order from left-to-right for the
 * front view or right-to-left for sideview. If there are actions left, the
 * enemy team will cycle back to the first acting enemy.
 * 
 * ---
 * 
 * Free Range Switching
 * 
 * If this is enabled (it's an optional feature) and it's the player's turn,
 * the player can freely switch between actors in his/her party by pressing the
 * left/right buttons or the page up/page down buttons. The Actor Command
 * Window will automatically update to the newly selected actor. This gives the
 * player complete control and freedom over the party and the party's actions.
 * 
 * For touch controls, instead of pressing left/right or page up/page down on
 * the keyboard, click on the Battle Status Window for the target actor to be
 * selected to perform an action. The Actor Command Window will automatically
 * update to the newly selected actor.
 * 
 * ---
 *
 * Turn Structure
 * 
 * Each battle turn is dedicated to one team or the other. You need to design
 * your turns with this in mind. When one team finishes its actions, the next
 * turn will have the other team perform theirs.
 * 
 * As a result, both teams will not benefit from their turn end activities such
 * as regeneration at the end of each battle turn. Instead, they will only
 * occur at the end of their own respective turns.
 * 
 * However, for states and buffs, this is slightly different. States and buffs
 * update at the end of the opposing team's turn. This is so that 1 turn states
 * like Guard will last until the opponent's turn is over instead of being over
 * immediately after the player's turn ends (rendering the effect useless).
 * 
 * The state and buff turn updates can be disabled in the Plugin Parameters.
 * However, the durations must be accounted for if disabled (ie. making Guard
 * last two turns instead of 1).
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
 * === General FTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <FTB Help>
 *  description
 *  description
 * </FTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under FTB.
 * - This is primarily used if the skill behaves differently in FTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to FTB.
 *
 * ---
 * 
 * === Action Cost-Related Notetags ===
 * 
 * ---
 *
 * <FTB Action Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the FTB action cost of this skill/item to 'x'.
 * - Replace 'x' with a number value representing the action cost required to
 *   perform the skill.
 *
 * ---
 *
 * <FTB Hide Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item hidden regardless of Plugin
 *   Parameter settings.
 *
 * ---
 *
 * <FTB Show Action Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the FTB action cost for this skill/item visible regardless of Plugin
 *   Parameter settings.
 *
 * ---
 * 
 * === Mechanics-Related Notetags ===
 * 
 * ---
 *
 * <FTB Pass Turn>
 *
 * - Used for: Skill, Item Notetags
 * - If a battler uses this skill/item, then even if there are actions left for
 *   the team to perform, that battler would no longer be able to input as they
 *   have already passed their turn.
 * - By default, this applies to "Guard". If you don't want it to apply to the
 *   Guard skill, turn it off in the Plugin Parameters for mechanics.
 *
 * ---
 *
 * <FTB Actions: +x>
 * <FTB Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Battlers associated with these trait objects can increase or decrease the
 *   maximum number of actions performed each turn.
 * - Replace 'x' with a number representing the increase or decrease in action
 *   count per turn.
 * - Depending on the Plugin Parameters, altering the max value can result in
 *   gaining or losing remaining actions for the current turn.
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
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: FTB Action Count Visibility
 * - Determine the visibility of the FTB Action Count Display.
 *
 *   Visibility:
 *   - Changes the visibility of the FTB Action Count Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Determines the general settings of the FTB Battle System. These settings
 * range from determining how the Action Count resources and costs are
 * displayed to the text that appear during team shifting.
 *
 * ---
 *
 * Action Counts
 * 
 *   Full Name:
 *   - What is the full name of "Action Counts" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Action Counts" in your game?
 * 
 *   Cost Format:
 *   - How are Action Count costs displayed?
 *   - %1 - Cost, %2 - Abbr Text, %3 - Icon
 * 
 * ---
 * 
 * Icons
 * 
 *   Actor Action Icon:
 *   - What icon is used to represent actor actions?
 * 
 *   Enemy Action Icon:
 *   - What icon is used to represent enemy actions?
 * 
 *   Empty Action Icon:
 *   - What icon is used to represent empty actions?
 *
 * ---
 *
 * Team Shift
 * 
 *   Party's Turn:
 *   - Text that appears when it's the party's turn.
 *   - %1 - Party Name
 * 
 *   Enemy's Turn:
 *   - Text that appears when it's the enemy's turn.
 * 
 *   Wait Frames:
 *   - How many frames to wait in between team changes?
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the action cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the action cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the action cost for the Guard command?
 * 
 *   Show Cost: 0 Action:
 *   - Show the action cost when the cost is 0 action?
 * 
 *   Show Cost: 1 Action:
 *   - Show the action cost when the cost is 1 action?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the FTB Battle System. From here, you can
 * enable or disable core mechanics, determine how to determine turn advantage,
 * and how the various supporting mechanics operate.
 *
 * ---
 *
 * Main Mechanics
 * 
 *   Enable Free Switch?:
 *   - Enable free range switching between actors?
 * 
 *     Maintain Same Actor?:
 *     - Requires Free Switching.
 *     - Maintain the same actor after an action or move onto the next
 *       available actor?
 * 
 *   Reset Index New Turns:
 *   - Resets the selected actor whenever a new turn starts?
 *   - Needs "Free Switching" to be off.
 * 
 *   Guard > Pass Turn?:
 *   - Does guarding cause a battler to pass turn?
 * 
 *   Gain Differences?:
 *   - If the max Action Count for a team changes, gain the difference in value
 *     if positive?
 * 
 *   Lose Differences?:
 *   - If the max Action Count for a team changes, lose the difference in value
 *     if negative?
 * 
 *   State/Buff Updates:
 *   - If enabled, update state/buff turns only on opponent turns.
 *   - Otherwise, they occur every turn.
 *
 * ---
 *
 * Turn Advantage
 * 
 *   Neutral Advantage:
 *   - For a neutral advantage battle, what determines which team goes first?
 *     - Random - 50% chance on which team goes first
 *     - Player - Player's team always goes first.
 *     - Lowest AGI - Battler with lowest AGI's team goes first
 *     - Average AGI - Team with the highest average AGI goes first
 *     - Highest AGI - Battler with highest AGI's team goes first
 *     - Total AGI - Team with highest total AGI goes first
 *
 * ---
 *
 * Action Generation
 * 
 *   Base:
 *   - What is the starting base number of actions that are generated per
 *     battler each turn?
 * 
 *   AGI Buff Influence?:
 *   - Do AGI buffs give +1 for each stack?
 * 
 *   AGI Debuff Influence?:
 *   - Do AGI debuffs give -1 for each stack?
 * 
 *   Maximum Actions:
 *   - What is the absolute maximum number of actions a team can have
 *     each turn?
 * 
 *   Minimum Actions:
 *   - What is the bare minimum number of actions a team can have each turn?
 * 
 *   Allow Overflow?:
 *   - Allow current actions to overflow?
 *   - Or let them cap at the current team max?
 *
 * ---
 *
 * Default Action Costs
 * 
 *   Skills:
 *   - What is the default action cost for skills?
 * 
 *   Items:
 *   - What is the default action cost for items?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Count Display Settings
 * ============================================================================
 *
 * Adjust the settings for the Action Count Display. They appear in the upper
 * or lower corners of the screen for the player party and the enemy troop.
 *
 * ---
 *
 * Display Settings
 * 
 *   Draw Horizontally?:
 *   - Which direction do you want the Action Count Display to go?
 * 
 *   Bottom Position?:
 *   - Place the Action Count Display towards the bottom of the screen?
 * 
 *     Offset Top Log Y?:
 *     - If using the top position, offset the log window's Y position.
 * 
 *     Reposition for Help?:
 *     - If using the top position, reposition the display when the help window
 *       is open?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's X/Y coordinates by this much when the
 *     Help Window is visible.
 *
 * ---
 *
 * Picture Settings
 * 
 *   Actor Action Picture:
 *   Enemy Action Picture:
 *   Empty Action Picture:
 *   - Optional. Place an image for an actor, enemy, or empty action instead of
 *     an icon?
 *
 * ---
 *
 * Coordinates
 * 
 *   Screen Buffer X:
 *   Screen Buffer Y:
 *   - Buffer from the the edge of the screen's X/Y by this much.
 * 
 *   Actor Offset X:
 *   Actor Offset Y:
 *   Enemy Offset X:
 *   Enemy Offset Y:
 *   - Offset the actor/enemy images' X/Y by this much.
 *
 * ---
 *
 * Draw Settings
 * 
 *   Max Actions Visible:
 *   - How many action slots max should be drawn for each team?
 * 
 *   Image Size:
 *   - What is the size of the icons or pictures for the action slots?
 * 
 *   Gap Distance:
 *   - How wide should the gab between each slot be in pixels?
 * 
 *   Icon Smoothing?:
 *   - Smooth the display for icons?
 *   - Or pixelate them?
 * 
 *   Picture Smoothing?:
 *   - Smooth the display for pictures?
 *   - Or pixelate them?
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Show Number?:
 *   - Show a number to display the actions remaining?
 * 
 *   Font Size:
 *   - What font size should be used for this number?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the remaining actions number X/Y.
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
 * Verison 1.06: March 17, 2022
 * * Bug Fixes!
 * ** Death by slip damage will now perform the proper death animation.
 *    Fix made by Olivia.
 * 
 * Version 1.05: August 13, 2021
 * * Bug Fixes!
 * ** Fixed some Plugin Parameters that did not work properly when
 *    showing/hiding action costs. Fix made by Irina.
 * 
 * Version 1.04: June 18, 2021
 * * Documentation Update!
 * ** Added "Action Count" section to Major Changes for extra clarity on how
 *    action counts are determined.
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Olivia:
 * *** <FTB Show Action Cost>
 * **** Makes the FTB action cost for this skill/item visible regardless of
 *      Plugin Parameter settings.
 * 
 * Version 1.03: May 28, 2021
 * * Documentation Update!
 * ** Updated the text for Plugin Parameter "Maintain Same Actor?"
 * *** Requires Free Switching. Maintain the same actor after an action or move
 *     onto the next available actor?
 * * Feature Update!
 * ** When there are more actions available than the number of actions that can
 *    be shown at a time, the visible icons displayed will be trimmed to fit
 *    the number of maximum visible icons displayed. Update by Olivia.
 * 
 * Version 1.02: April 2, 2021
 * * Bug Fixes!
 * ** Action costs for FTP will now only take effect if inside battle only.
 *    Fix made by Olivia.
 * 
 * Version 1.01: March 19, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: February 22, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemActionCountVisibility
 * @text System: FTB Action Count Visibility
 * @desc Determine the visibility of the FTB Action Count Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the FTB Action Count Display.
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
 * @param BattleSystemFTB
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
 * @desc Determines the general settings of the FTB Battle System.
 * @default {"ActionCounts":"","ActionCountFull:str":"Fight Points","ActionCountAbbr:str":"FP","ActionCountCostFmt:str":"\\FS[22]\\C[0]×%1%3\\C[0]","Icons":"","ActorActionsIcon:num":"165","EnemyActionsIcon:num":"162","EmptyActionsIcon:num":"161","TeamShift":"","PartyTeamShiftFmt:str":"%1's Turn!","TroopTeamShiftFmt:str":"Opponent's Turn!","TeamShiftWait:num":"60","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","Show_0_Action_Cost:eval":"true","Show_1_Action_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of the FTB Battle System.
 * @default {"Main":"","FreeChange:eval":"true","KeepPrevActor:eval":"true","GuardPass:eval":"true","GainDiff:eval":"true","LoseDiff:eval":"false","StateBuffUpdate:eval":"true","TurnAdvantage":"","NeutralAdvantage:str":"average agi","ActionGeneration":"","GenerateBase:num":"1","AgiBuff:eval":"true","AgiDebuff:eval":"false","MaxActions:num":"99","MinActions:num":"1","AllowOverflow:eval":"false","DefaultCost":"","DefaultCostSkill:num":"1","DefaultCostItem:num":"1"}
 *
 * @param ActionCountDisplay:struct
 * @text Action Count Display
 * @type struct<ActionCountDisplay>
 * @desc Adjust the settings for the Action Count Display.
 * @default {"Display":"","DrawHorz:eval":"true","BottomPosition:eval":"true","LogWindowTopOffsetY:num":"40","RepositionTopForHelp:eval":"true","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"160","Pictures":"","ActorActionPicture:str":"","EnemyActionPicture:str":"","EmptyActionPicture:str":"","Coordinates":"","ScreenBufferX:num":"16","ScreenBufferY:num":"16","ActorOffsetX:num":"0","ActorOffsetY:num":"0","EnemyOffsetX:num":"0","EnemyOffsetY:num":"0","DrawSettings":"","MaxVisible:num":"10","ImageSize:num":"32","ImageGapDistance:num":"2","IconSmoothing:eval":"false","PictureSmoothing:eval":"true","TurnsRemaining":"","DrawActionsRemaining:eval":"true","ActionsRemainingFontSize:num":"26","ActionsRemainingOffsetX:num":"0","ActionsRemainingOffsetY:num":"0"}
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
 * @param ActionCounts
 * @text Action Counts
 *
 * @param ActionCountFull:str
 * @text Full Name
 * @parent ActionCounts
 * @desc What is the full name of "Action Counts" in your game?
 * @default Fight Points
 *
 * @param ActionCountAbbr:str
 * @text Abbreviation
 * @parent ActionCounts
 * @desc What is the abbreviation of "Action Counts" in your game?
 * @default FP
 *
 * @param ActionCountCostFmt:str
 * @text Cost Format
 * @parent ActionCounts
 * @desc How are Action Count costs displayed?
 * %1 - Cost, %2 - Abbr Text, %3 - Icon
 * @default \FS[22]\C[0]×%1%3\C[0]
 *
 * @param Icons
 *
 * @param ActorActionsIcon:num
 * @text Actor Action Icon
 * @parent Icons
 * @desc What icon is used to represent actor actions?
 * @default 165
 *
 * @param EnemyActionsIcon:num
 * @text Enemy Action Icon
 * @parent Icons
 * @desc What icon is used to represent enemy actions?
 * @default 162
 *
 * @param EmptyActionsIcon:num
 * @text Empty Action Icon
 * @parent Icons
 * @desc What icon is used to represent empty actions?
 * @default 161
 *
 * @param TeamShift
 * @text Team Shift
 *
 * @param PartyTeamShiftFmt:str
 * @text Party's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the party's turn.
 * %1 - Party Name
 * @default %1's Turn!
 *
 * @param TroopTeamShiftFmt:str
 * @text Enemy's Turn
 * @parent TeamShift
 * @desc Text that appears when it's the enemy's turn.
 * @default Opponent's Turn!
 *
 * @param TeamShiftWait:num
 * @text Wait Frames
 * @parent TeamShift
 * @type number
 * @desc How many frames to wait in between team changes?
 * @default 60
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the action cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost for the Guard command?
 * @default false
 *
 * @param Show_0_Action_Cost:eval
 * @text Show Cost: 0 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 0 action?
 * @default true
 *
 * @param Show_1_Action_Cost:eval
 * @text Show Cost: 1 Action
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the action cost when the cost is 1 action?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Main
 * @text Main Mechanics
 *
 * @param FreeChange:eval
 * @text Enable Free Switch?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable free range switching between actors?
 * @default true
 *
 * @param KeepPrevActor:eval
 * @text Maintain Same Actor?
 * @parent FreeChange:eval
 * @type boolean
 * @on Maintain
 * @off Next Available
 * @desc Requires Free Switching. Maintain the same actor after
 * an action or move onto the next available actor?
 * @default true
 *
 * @param NewTurnResetIndex:eval
 * @text Reset Index New Turns
 * @parent Main
 * @type boolean
 * @on Reset
 * @off Keep
 * @desc Resets the selected actor whenever a new turn starts?
 * Needs "Free Switching" to be off.
 * @default false
 *
 * @param GuardPass:eval
 * @text Guard > Pass Turn?
 * @parent Main
 * @type boolean
 * @on Pass Turn
 * @off Don't Pass
 * @desc Does guarding cause a battler to pass turn?
 * @default true
 *
 * @param GainDiff:eval
 * @text Gain Differences?
 * @parent Main
 * @type boolean
 * @on Gain Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * gain the difference in value if positive?
 * @default true
 *
 * @param LoseDiff:eval
 * @text Lose Differences?
 * @parent Main
 * @type boolean
 * @on Lose Differences
 * @off Keep Same
 * @desc If the max Action Count for a team changes,
 * lose the difference in value if negative?
 * @default false
 *
 * @param StateBuffUpdate:eval
 * @text State/Buff Updates
 * @parent Main
 * @type boolean
 * @on Opponent Turns Only
 * @off All Turns
 * @desc If enabled, update state/buff turns only on opponent
 * turns. Otherwise, they occur every turn.
 * @default true
 *
 * @param TurnAdvantage
 * @text Turn Advantage
 *
 * @param NeutralAdvantage:str
 * @text Neutral Advantage
 * @parent TurnAdvantage
 * @type select
 * @option Random - 50% chance on which team goes first
 * @value random
 * @option Player - Player's team always goes first
 * @value player
 * @option Enemy - Enemy's team always goes first
 * @value enemy
 * @option Lowest AGI - Battler with lowest AGI's team goes first
 * @value lowest agi
 * @option Average AGI - Team with the highest average AGI goes first
 * @value average agi
 * @option Highest AGI - Battler with highest AGI's team goes first
 * @value highest agi
 * @option Total AGI - Team with highest total AGI goes first
 * @value total agi
 * @desc For a neutral advantage battle, what determines which team goes first?
 * @default average agi
 *
 * @param ActionGeneration
 * @text Action Generation
 *
 * @param GenerateBase:num
 * @text Base
 * @parent ActionGeneration
 * @type number
 * @desc What is the starting base number of actions that are generated per battler each turn?
 * @default 1
 *
 * @param AgiBuff:eval
 * @text AGI Buff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI buffs give +1 for each stack?
 * @default true
 *
 * @param AgiDebuff:eval
 * @text AGI Debuff Influence?
 * @parent ActionGeneration
 * @type boolean
 * @on Influence
 * @off No Influence
 * @desc Do AGI debuffs give -1 for each stack?
 * @default false
 *
 * @param MaxActions:num
 * @text Maximum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the absolute maximum number of actions a team can have each turn?
 * @default 99
 *
 * @param MinActions:num
 * @text Minimum Actions
 * @parent ActionGeneration
 * @type number
 * @desc What is the bare minimum number of actions a team can have each turn?
 * @default 1
 *
 * @param AllowOverflow:eval
 * @text Allow Overflow?
 * @parent ActionGeneration
 * @type boolean
 * @on Allow
 * @off Cap to Max
 * @desc Allow current actions to overflow?
 * Or let them cap at the current team max?
 * @default false
 *
 * @param DefaultCost
 * @text Default Action Costs
 *
 * @param DefaultCostSkill:num
 * @text Skills
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for skills?
 * @default 1
 *
 * @param DefaultCostItem:num
 * @text Items
 * @parent DefaultCost
 * @type number
 * @desc What is the default action cost for items?
 * @default 1
 * 
 */
/* ----------------------------------------------------------------------------
 * Action Count Display Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionCountDisplay:
 *
 * @param Display
 * @text Display Settings
 *
 * @param DrawHorz:eval
 * @text Draw Horizontally?
 * @parent Display
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Which direction do you want the Action Count Display to go?
 * @default true
 *
 * @param BottomPosition:eval
 * @text Bottom Position?
 * @parent Display
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Place the Action Count Display towards the bottom of the screen?
 * @default true
 *
 * @param LogWindowTopOffsetY:num
 * @text Offset Top Log Y?
 * @parent BottomPosition:eval
 * @type number
 * @desc If using the top position, offset the log window's Y position.
 * @default 40
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent BottomPosition:eval
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If using the top position, reposition the display when the help window is open?
 * @default true
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
 * @default 160
 *
 * @param Pictures
 * @text Picture Settings
 *
 * @param ActorActionPicture:str
 * @text Actor Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an actor action instead of an icon?
 * @default 
 *
 * @param EnemyActionPicture:str
 * @text Enemy Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an enemy action instead of an icon?
 * @default 
 *
 * @param EmptyActionPicture:str
 * @text Empty Action Picture
 * @parent Pictures
 * @type file
 * @dir img/pictures/
 * @desc Optional. Place an image for an empty action instead of an icon?
 * @default 
 *
 * @param Coordinates
 *
 * @param ScreenBufferX:num
 * @text Screen Buffer X
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's X by this much.
 * @default 16
 *
 * @param ScreenBufferY:num
 * @text Screen Buffer Y
 * @parent Coordinates
 * @desc Buffer from the the edge of the screen's Y by this much.
 * @default 16
 *
 * @param ActorOffsetX:num
 * @text Actor Offset X
 * @parent Coordinates
 * @desc Offset the actor images' X by this much.
 * @default 0
 *
 * @param ActorOffsetY:num
 * @text Actor Offset Y
 * @parent Coordinates
 * @desc Offset the actor images' Y by this much.
 * @default 0
 *
 * @param EnemyOffsetX:num
 * @text Enemy Offset X
 * @parent Coordinates
 * @desc Offset the enemy images' X by this much.
 * @default 0
 *
 * @param EnemyOffsetY:num
 * @text Enemy Offset Y
 * @parent Coordinates
 * @desc Offset the enemy images' Y by this much.
 * @default 0
 *
 * @param DrawSettings
 * @text Draw Settings
 *
 * @param MaxVisible:num
 * @text Max Actions Visible
 * @parent DrawSettings
 * @desc How many action slots max should be drawn for each team?
 * @default 10
 *
 * @param ImageSize:num
 * @text Image Size
 * @parent DrawSettings
 * @desc What is the size of the icons or pictures for the action slots?
 * @default 32
 *
 * @param ImageGapDistance:num
 * @text Gap Distance
 * @parent DrawSettings
 * @desc How wide should the gab between each slot be in pixels?
 * @default 2
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for icons?
 * Or pixelate them?
 * @default false
 *
 * @param PictureSmoothing:eval
 * @text Picture Smoothing?
 * @parent DrawSettings
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Smooth the display for pictures?
 * Or pixelate them?
 * @default true
 *
 * @param TurnsRemaining
 * @text Turns Remaining
 *
 * @param DrawActionsRemaining:eval
 * @text Show Number?
 * @parent TurnsRemaining
 * @type boolean
 * @on Show Number
 * @off Don't Show
 * @desc Show a number to display the actions remaining?
 * @default true
 *
 * @param ActionsRemainingFontSize:num
 * @text Font Size
 * @parent DrawActionsRemaining:eval
 * @desc What font size should be used for this number?
 * @default 26
 *
 * @param ActionsRemainingOffsetX:num
 * @text Offset X
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number X.
 * @default 0
 *
 * @param ActionsRemainingOffsetY:num
 * @text Offset Y
 * @parent DrawActionsRemaining:eval
 * @desc Offset the remaining actions number Y.
 * @default 0
 *
 */
//=============================================================================

function _0x4007(_0x59edc9,_0x5b136a){const _0x3da2a8=_0x3da2();return _0x4007=function(_0x40078e,_0x2ca39e){_0x40078e=_0x40078e-0x76;let _0x1d627e=_0x3da2a8[_0x40078e];return _0x1d627e;},_0x4007(_0x59edc9,_0x5b136a);}const _0xc9b14=_0x4007;(function(_0x45cc96,_0x5887ea){const _0x4aa762=_0x4007,_0x19b7a4=_0x45cc96();while(!![]){try{const _0x2d6318=parseInt(_0x4aa762(0x23c))/0x1+parseInt(_0x4aa762(0xfe))/0x2+parseInt(_0x4aa762(0xdf))/0x3*(parseInt(_0x4aa762(0xef))/0x4)+parseInt(_0x4aa762(0x1cb))/0x5*(-parseInt(_0x4aa762(0x17d))/0x6)+-parseInt(_0x4aa762(0x1fb))/0x7+parseInt(_0x4aa762(0x102))/0x8*(parseInt(_0x4aa762(0x8c))/0x9)+parseInt(_0x4aa762(0x1ee))/0xa*(-parseInt(_0x4aa762(0x150))/0xb);if(_0x2d6318===_0x5887ea)break;else _0x19b7a4['push'](_0x19b7a4['shift']());}catch(_0xffb2f2){_0x19b7a4['push'](_0x19b7a4['shift']());}}}(_0x3da2,0x85c15));function _0x3da2(){const _0x1432c5=['Scene_Battle_commandFight','bDlzh','commandCancel','DefaultCostItem','RepositionTopHelpY','ftbHighestAgility','ftbCreateTeamSwitchText','item','registerCommand','QWmxN','enemy','BattleManager_processTurn','waitCount','floor','highest\x20agi','return\x200','passTurnFTB','Game_Battler_performCollapse','toUpperCase','forceChangeEquip','EnemyActionPicture','_ftbTroopActionCountWindow','gainCurrentActionsFTB','round','battleMembers','_FTB_MAX_ACTIONS','_FTB_NEUTRAL_TURN_ADVANTAGE','resetFontSettings','NHAVr','ActionsRemainingOffsetX','rAofk','makeAdditionalSkillCostText','canUse','BottomPosition','canActFTB','yzmIb','isActiveTpb','iconHeight','isTurnBased','Game_Battler_removeState','updateTurn','_inBattle','format','drawItemNumber','JSON','xwjei','_buffs','Show_1_Action_Cost','ActionsRemainingOffsetY','canInput','agility','cursorLeft','NeutralAdvantage','refresh','_ftbTurnAdvantageUnit','PictureSmoothing','byyyR','startTurnFTB','ARRAYNUM','useItem','nCsaI','uYEVj','Game_BattlerBase_canUse','createActorCommandWindowFTB','Game_Battler_addDebuff','Window_Help_setItem','BattleManager_startTurn','Game_Action_applyGlobal','ActorActionsIcon','MaxVisible','EJRku','cursorPagedown','ActorOffsetX','Window_Selectable_cursorRight','33esYuhm','ZNnBn','endActionFTB','speed','selectNextActorFTB','clearBuffs','psuIE','_partyCommandWindow','removeState','drawImage','sort','initMembersFTB','IlrNj','BattleManager_startInput','AgiBuff','_actionBattlers','_passedTurnFTB','NzJeT','EVhvk','traitObjects','ConvertParams','drawBigIcon','clamp','updateStateTurns','clear','setUnit','changeEquipById','ShowCostForAttack','guardSkillId','_phase','drawText','addBuff','PartyTeamShiftFmt','endTurn','_storedBitmaps','Game_Actor_changeEquip','RAdCh','General','lYgsN','VyjZL','BattleManager_isTurnBased','ufWxC','_FTB_STATE_BUFF_TURN_UPDATES_ONLY_ON_OPPONENT_TURNS','EVAL','Zsttk','1042518AJRFPa','StateBuffUpdate','Game_BattlerBase_updateBuffTurns','_FTB_BETWEEN_TEAMS_WAIT','attackSkillId','KxnMR','filter','_actor','canActorBeSelectedFTB','_FTB_KEEP_PREV_ACTOR','ItemScene','processTurnFTB','GuardPass','ImageSize','BattleManager_isActiveTpb','getNextSubject','canMove','BattleManager_endAction','Game_BattlerBase_appear','indexOf','removeActionBattlersFTB','BattleManager_makeActionOrders','_handlers','concat','call','FTB','fontSize','initBattleSystemFTB','AgiDebuff','map','getCurrentActionsFTB','Scene_Battle_commandCancel','BattleSystemFTB','cursorRight','makeActions','_surprise','makeActionOrdersFTB','trim','ARRAYJSON','performCollapse','_windowLayer','ActionsRemainingFontSize','dsCVx','isPassingTurnFTB','drawActionsRemaining','UuIOc','Window_Selectable_processTouch','_bypassStateTurnUpdatesFTB','_FTB_RECALC_SUB_DIFF','EnemyOffsetY','_ftbLastIndex','SystemActionCountVisibility','isDrawItemNumber','yheCC','JGTiF','QvZCZ','includes','fCEFE','subject','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','min','BattleManager_battleSys','friendsUnit','battler','ftbActorActionsIcon','iXtXR','isBattleSystemFTBActionCountVisible','iconWidth','repositionLogWindowFTB','zCfQd','ScreenBufferX','RepositionTopForHelp','vmLoG','releaseUnequippableItems','meetEndTurnConditionsFTB','createActorCommandWindow','BattleManager_endTurn','startInput','30Yyooek','weqxt','RegExp','addState','LSliV','createActionsFTB','stepBack','_scene','ftbFreeRangeSwitch','EnemyOffsetX','Show_0_Action_Cost','ftb%1ActionsIcon','aliveMembers','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','iVoqC','setup','_FTB_ACTION_OVERFLOW','battleSys','GswtS','enemies','members','isActor','WsoGc','ItemQuantityFontSize','create','KTqEK','lMyVY','addDebuff','innerHeight','some','applyGlobalFTB','_FTB_ACTION_AGI_DEBUFF','_FTB_RESET_INDEX','checkNeedsUpdate','ShowActionPointCost','1770070uCkjMV','performTurnEndFTB','ftbTroopTeamShift','setLastFtbIndex','_context','_inputting','startTurn','maxCols','_FTB_ACTION_AGI_BUFF','BattleManager_startBattle','changeClass','cIYGD','_unit','3539053RwPsZe','ImageGapDistance','XRKpG','name','NUM','isPartyCommandWindowDisabled','total\x20agi','Visible','_ftbActionsMax','update','skillCostSeparator','startBattle','isAlive','cursorPageup','ftbAliveMembers','ARRAYSTR','endAllBattlersTurn','createStartingCoordinates','onTurnEnd','changeEquip','applyGlobal','actors','max','length','commandCancelFTB','_currentActions','hmqwr','ShowCostForGuard','isTpb','close','_FTB_GUARD_PASS','setItem','setText','battleEnd','woaSR','visible','bpscP','startDamagePopup','addLoadListener','height','ftbCostFormat','updateStateTurnsFTB','random','BattleManager_finishActorInput','_forcedBattlers','_FTB_RECALC_ADD_DIFF','_helpWindow','_actorCommandWindow','BattleManager_isTpb','Game_Battler_addBuff','recalculateActionsFTB','currentAction','updateVisibility','CjJVM','getBattleSystem','_ftbActionCountVisible','_FTB_COST_SHOW_ATTACK','LoseDiff','Current','endTurnFTB','EmptyActionPicture','transform','FreeChange','loseCurrentActionsFTB','_ftbActionsCur','638649xGtYIO','Game_BattlerBase_updateStateTurns','canDrawActionsRemaining','EmptyActionsIcon','keepPrevSubjectFTB','isFTB','cFIQb','rmhjV','RepositionTopHelpX','center','endAction','exit','BattleManager_isTeamBased','_ftbCurrentUnit','processTurn','_maxActions','index','Game_Actor_releaseUnequippableItems','qbGjV','width','imageSmoothingEnabled','selectNextActor','Window_Selectable_cursorLeft','onBattleStart','loadPicture','fsZcd','description','gCGtP','_ftbPartyActionCountWindow','agi','DGdLi','makeAdditionalCostTextFTB','_subject','Game_Battler_useItem','reduce','ftbSwitchActorDirection','_statusWindow','addChildAt','unshift','clearStates','STR','Window_Base_drawItemNumber','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','processTouchFTB','DrYDM','active','screenX','TeamShiftWait','_FTB_COST_SHOW_GUARD','Honej','setMaxActionsFTB','vhJyI','selectNextCommand','opacity','inBattle','removeBuff','pKOro','Empty','iumzc','XJsRC','AllowOverflow','padding','Game_Unit_onBattleStart','rNdhK','xICyu','_FTB_FREE_CHANGE','Game_Actor_changeClass','isSceneBattle','Mechanics','updateBuffTurns','randomInt','jyrYt','Game_Battler_addState','setBackgroundType','ftbPartyTeamShift','toLowerCase','Game_Action_speed','BattleManager_selectNextActor','45syGciO','numItems','Settings','updatePadding','_currentActor','_FTB_MIN_ACTIONS','startBattleFTB','Scene_Battle_createActorCommandWindow','stepForward','HideActionPointCost','note','Window_Selectable_cursorPageup','parse','isTriggered','clearPassTurnFTB','addText','Scene_Battle_createAllWindows','shift','player','textWidth','onTouchSelectFTB','startInputFTB','finishActorInput','isOpen','ARRAYFUNC','ActorActionPicture','zKirX','setCurrentActionsFTB','loadSystem','Nothing','GAZda','ftbEnemyActionsIcon','match','constructor','DefaultCostSkill','ItemQuantityFmt','_FTB_COST_SHOW_0','TCzTS','DrawHorz','createContentsArray','isSkill','payActionCostFTB','wqmgh','Game_Actor_forceChangeEquip','%1ActionPicture','getMaxActionsFTB','push','average\x20agi','reduceActionsFTB','jImxG','prototype','lowest\x20agi','Game_BattlerBase_clearStates','ActionCountDisplay','_doubleTouch','drawItemNumberFTB','LogWindowTopOffsetY','windowRect','EboAo','STZCQ','Game_BattlerBase_hide','getActionCostFTB','turnCount','Window_Selectable_cursorPagedown','_logWindow','Game_Battler_onTurnEnd','BattleManager_endAllBattlersTurn','ScreenBufferY','STRUCT','FIzhw','ftbLowestAgility','HssUL','gTTPX','Game_Actor_discardEquip','hide','appear','processSwitchActors','blt','startActorInput','_ftbTeamEven','ftbTotalAgility','isTeamBased','Enemy','1977BZUXSn','discardEquip','_FTB_COST_SHOW_1','Game_Battler_removeBuff','updatePosition','initialize','GainDiff','innerWidth','Actor','status','setBattleSystemFTBActionCountVisible','TroopTeamShiftFmt','_FTB_COST_POSITION','createAllWindows','ftbActionCount','DrawActionsRemaining','4892jhaHvs','Game_Actor_selectNextCommand','startActorCommandSelection','_action','hitIndex','KtmBK','processTouch','commandFight','ActionCountCostFmt','IconSmoothing','ftbActionPointsAbbr','Game_Enemy_transform','ActionCountFull','RyDUX','ftbEmptyActionsIcon','1678686tSTEuc','_ftbTeamOdd','contents','Game_System_initialize','548848BmJSvz','createActionCountWindowsFTB','Window_Base_makeAdditionalSkillCostText','ItemsEquipsCore'];_0x3da2=function(){return _0x1432c5;};return _0x3da2();}var label='BattleSystemFTB',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xc9b14(0x183)](function(_0x4c681b){const _0xe395ac=_0xc9b14;return _0x4c681b[_0xe395ac(0xe8)]&&_0x4c681b['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0xc9b14(0x8e)]=VisuMZ[label][_0xc9b14(0x8e)]||{},VisuMZ['ConvertParams']=function(_0x4d51b6,_0x51268e){const _0x5861b1=_0xc9b14;for(const _0x170d47 in _0x51268e){if(_0x5861b1(0x122)!==_0x5861b1(0x122)){if(this[_0x5861b1(0x1bc)]())this[_0x5861b1(0x1bc)]()['stepForward']();return![];}else{if(_0x170d47[_0x5861b1(0xac)](/(.*):(.*)/i)){const _0x1cb03c=String(RegExp['$1']),_0x5b5f5a=String(RegExp['$2'])[_0x5861b1(0x118)]()[_0x5861b1(0x1a2)]();let _0xfd3e3b,_0x4c3021,_0x13b26e;switch(_0x5b5f5a){case _0x5861b1(0x1ff):_0xfd3e3b=_0x51268e[_0x170d47]!==''?Number(_0x51268e[_0x170d47]):0x0;break;case _0x5861b1(0x140):_0x4c3021=_0x51268e[_0x170d47]!==''?JSON[_0x5861b1(0x98)](_0x51268e[_0x170d47]):[],_0xfd3e3b=_0x4c3021[_0x5861b1(0x19a)](_0x4689c0=>Number(_0x4689c0));break;case _0x5861b1(0x17b):_0xfd3e3b=_0x51268e[_0x170d47]!==''?eval(_0x51268e[_0x170d47]):null;break;case'ARRAYEVAL':_0x4c3021=_0x51268e[_0x170d47]!==''?JSON[_0x5861b1(0x98)](_0x51268e[_0x170d47]):[],_0xfd3e3b=_0x4c3021[_0x5861b1(0x19a)](_0x2edea6=>eval(_0x2edea6));break;case _0x5861b1(0x132):_0xfd3e3b=_0x51268e[_0x170d47]!==''?JSON['parse'](_0x51268e[_0x170d47]):'';break;case _0x5861b1(0x1a3):_0x4c3021=_0x51268e[_0x170d47]!==''?JSON[_0x5861b1(0x98)](_0x51268e[_0x170d47]):[],_0xfd3e3b=_0x4c3021['map'](_0x81fa20=>JSON[_0x5861b1(0x98)](_0x81fa20));break;case'FUNC':_0xfd3e3b=_0x51268e[_0x170d47]!==''?new Function(JSON[_0x5861b1(0x98)](_0x51268e[_0x170d47])):new Function(_0x5861b1(0x115));break;case _0x5861b1(0xa4):_0x4c3021=_0x51268e[_0x170d47]!==''?JSON[_0x5861b1(0x98)](_0x51268e[_0x170d47]):[],_0xfd3e3b=_0x4c3021['map'](_0x24bb33=>new Function(JSON[_0x5861b1(0x98)](_0x24bb33)));break;case _0x5861b1(0x264):_0xfd3e3b=_0x51268e[_0x170d47]!==''?String(_0x51268e[_0x170d47]):'';break;case _0x5861b1(0x20a):_0x4c3021=_0x51268e[_0x170d47]!==''?JSON[_0x5861b1(0x98)](_0x51268e[_0x170d47]):[],_0xfd3e3b=_0x4c3021[_0x5861b1(0x19a)](_0x117cb0=>String(_0x117cb0));break;case _0x5861b1(0xd0):_0x13b26e=_0x51268e[_0x170d47]!==''?JSON[_0x5861b1(0x98)](_0x51268e[_0x170d47]):{},_0xfd3e3b=VisuMZ[_0x5861b1(0x164)]({},_0x13b26e);break;case'ARRAYSTRUCT':_0x4c3021=_0x51268e[_0x170d47]!==''?JSON['parse'](_0x51268e[_0x170d47]):[],_0xfd3e3b=_0x4c3021['map'](_0x3f95ab=>VisuMZ[_0x5861b1(0x164)]({},JSON[_0x5861b1(0x98)](_0x3f95ab)));break;default:continue;}_0x4d51b6[_0x1cb03c]=_0xfd3e3b;}}}return _0x4d51b6;},(_0x267955=>{const _0x2a783c=_0xc9b14,_0x27478e=_0x267955[_0x2a783c(0x1fe)];for(const _0x46510a of dependencies){if(!Imported[_0x46510a]){alert(_0x2a783c(0x1d8)[_0x2a783c(0x130)](_0x27478e,_0x46510a)),SceneManager[_0x2a783c(0x247)]();break;}}const _0x4dcbe6=_0x267955[_0x2a783c(0x256)];if(_0x4dcbe6[_0x2a783c(0xac)](/\[Version[ ](.*?)\]/i)){const _0x5b8e42=Number(RegExp['$1']);_0x5b8e42!==VisuMZ[label]['version']&&(alert(_0x2a783c(0x1b8)[_0x2a783c(0x130)](_0x27478e,_0x5b8e42)),SceneManager[_0x2a783c(0x247)]());}if(_0x4dcbe6['match'](/\[Tier[ ](\d+)\]/i)){if(_0x2a783c(0x1aa)!=='UuIOc'){const _0x7e6cfe=_0x342400[_0x2a783c(0x8e)];if(_0x7e6cfe['BottomPosition'])return;if(!_0x7e6cfe['RepositionTopForHelp'])return;const _0xf2ff40=_0x462d10[_0x2a783c(0x1d2)][_0x2a783c(0x229)];if(!_0xf2ff40)return;_0xf2ff40[_0x2a783c(0x21e)]?(this['x']=_0x7e6cfe[_0x2a783c(0x244)]||0x0,this['y']=_0x7e6cfe[_0x2a783c(0x10a)]||0x0):(this['x']=0x0,this['y']=0x0);}else{const _0x41f7f4=Number(RegExp['$1']);if(_0x41f7f4<tier){if(_0x2a783c(0x129)==='mImTa'){this[_0x2a783c(0x121)]();const _0x4d2ca3=_0x5c34f5['Settings'],_0x31c20d=new _0x54b783(_0x3c4ab8,_0x131070,_0x4d2ca3['ImageSize'],_0x4d2ca3[_0x2a783c(0x18a)]);_0x31c20d['x']+=_0x4d2ca3[_0x2a783c(0x123)],_0x31c20d['y']+=_0x4d2ca3['ActionsRemainingOffsetY'];const _0x3d4aea=this[_0x2a783c(0x1fa)][_0x2a783c(0x19b)]();this[_0x2a783c(0x100)][_0x2a783c(0x197)]=_0x4d2ca3['ActionsRemainingFontSize'],this[_0x2a783c(0x100)][_0x2a783c(0x16e)](_0x3d4aea,_0x31c20d['x'],_0x31c20d['y'],_0x31c20d[_0x2a783c(0x24f)],_0x31c20d[_0x2a783c(0x222)],_0x2a783c(0x245)),this[_0x2a783c(0x121)]();}else alert(_0x2a783c(0x266)[_0x2a783c(0x130)](_0x27478e,_0x41f7f4,tier)),SceneManager[_0x2a783c(0x247)]();}else tier=Math[_0x2a783c(0x211)](_0x41f7f4,tier);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x267955['parameters']);})(pluginData),PluginManager[_0xc9b14(0x10e)](pluginData['name'],_0xc9b14(0x1b0),_0x38104d=>{const _0x40b9f7=_0xc9b14;VisuMZ[_0x40b9f7(0x164)](_0x38104d,_0x38104d);const _0x587006=_0x38104d[_0x40b9f7(0x202)];$gameSystem[_0x40b9f7(0xe9)](_0x587006);}),VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x1cd)]={'ActionPointCost':/<FTB (?:FP|ACTION) COST:[ ](\d+)>/i,'HideActionPointCost':/<FTB HIDE (?:FP|ACTION) COST>/i,'ShowActionPointCost':/<FTB SHOW (?:FP|ACTION) COST>/i,'PassTurn':/<FTB PASS TURN>/i,'ActionPointTraitPlus':/<FTB (?:FP|ACTION|ACTIONS):[ ]([\+\-]\d+)>/i},DataManager[_0xc9b14(0xc9)]=function(_0x48f8ba){const _0x368e50=_0xc9b14;if(!_0x48f8ba)return 0x0;const _0x464bd3=VisuMZ[_0x368e50(0x19d)][_0x368e50(0x8e)]['Mechanics'],_0x1b9cc3=VisuMZ[_0x368e50(0x19d)][_0x368e50(0x1cd)],_0x6a1c6f=_0x48f8ba[_0x368e50(0x96)];if(_0x6a1c6f[_0x368e50(0xac)](_0x1b9cc3['ActionPointCost']))return Number(RegExp['$1']);else{if(DataManager[_0x368e50(0xb4)](_0x48f8ba)){if(_0x368e50(0x1b2)!=='yheCC')this[_0x368e50(0xe4)](...arguments);else return _0x464bd3[_0x368e50(0xae)];}else return DataManager['isItem'](_0x48f8ba)?_0x464bd3[_0x368e50(0x109)]:0x0;}},ImageManager[_0xc9b14(0x1bd)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x175)][_0xc9b14(0x14a)],ImageManager[_0xc9b14(0xab)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x175)]['EnemyActionsIcon'],ImageManager[_0xc9b14(0xfd)]=VisuMZ['BattleSystemFTB'][_0xc9b14(0x8e)][_0xc9b14(0x175)][_0xc9b14(0x23f)],TextManager['ftbActionPointsFull']=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x175)][_0xc9b14(0xfb)],TextManager[_0xc9b14(0xf9)]=VisuMZ[_0xc9b14(0x19d)]['Settings'][_0xc9b14(0x175)]['ActionCountAbbr'],TextManager['ftbCostFormat']=VisuMZ['BattleSystemFTB'][_0xc9b14(0x8e)]['General'][_0xc9b14(0xf7)],TextManager[_0xc9b14(0x88)]=VisuMZ['BattleSystemFTB']['Settings']['General'][_0xc9b14(0x170)],TextManager[_0xc9b14(0x1f0)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x175)][_0xc9b14(0xea)],SceneManager['isSceneBattle']=function(){const _0x17dc89=_0xc9b14;return this[_0x17dc89(0x1d2)]&&this['_scene'][_0x17dc89(0xad)]===Scene_Battle;},BattleManager['_FTB_FREE_CHANGE']=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)]['Mechanics'][_0xc9b14(0x239)],BattleManager[_0xc9b14(0x186)]=VisuMZ['BattleSystemFTB'][_0xc9b14(0x8e)][_0xc9b14(0x82)]['KeepPrevActor'],BattleManager[_0xc9b14(0x1eb)]=VisuMZ['BattleSystemFTB'][_0xc9b14(0x8e)][_0xc9b14(0x82)]['NewTurnResetIndex']??![],BattleManager[_0xc9b14(0x219)]=VisuMZ['BattleSystemFTB']['Settings'][_0xc9b14(0x82)][_0xc9b14(0x189)],BattleManager[_0xc9b14(0x228)]=VisuMZ['BattleSystemFTB']['Settings']['Mechanics'][_0xc9b14(0xe5)],BattleManager[_0xc9b14(0x1ad)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)]['Mechanics'][_0xc9b14(0x234)],BattleManager[_0xc9b14(0x120)]=VisuMZ['BattleSystemFTB'][_0xc9b14(0x8e)][_0xc9b14(0x82)][_0xc9b14(0x13a)],BattleManager[_0xc9b14(0x180)]=VisuMZ[_0xc9b14(0x19d)]['Settings']['General'][_0xc9b14(0x26b)],BattleManager[_0xc9b14(0x17a)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x82)][_0xc9b14(0x17e)],VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x1ba)]=BattleManager[_0xc9b14(0x1dc)],BattleManager[_0xc9b14(0x1dc)]=function(){const _0x22da38=_0xc9b14;if(this[_0x22da38(0x241)]())return _0x22da38(0x196);return VisuMZ[_0x22da38(0x19d)][_0x22da38(0x1ba)]['call'](this);},BattleManager['isFTB']=function(){const _0x96ee6b=_0xc9b14;return $gameSystem[_0x96ee6b(0x231)]()===_0x96ee6b(0x196);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x22b)]=BattleManager[_0xc9b14(0x217)],BattleManager['isTpb']=function(){const _0x22885b=_0xc9b14;if(this[_0x22885b(0x241)]())return![];return VisuMZ[_0x22885b(0x19d)][_0x22885b(0x22b)][_0x22885b(0x195)](this);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x18b)]=BattleManager[_0xc9b14(0x12a)],BattleManager[_0xc9b14(0x12a)]=function(){const _0xb46b3c=_0xc9b14;if(this['isFTB']())return![];return VisuMZ['BattleSystemFTB']['BattleManager_isActiveTpb'][_0xb46b3c(0x195)](this);},VisuMZ['BattleSystemFTB'][_0xc9b14(0x178)]=BattleManager[_0xc9b14(0x12c)],BattleManager[_0xc9b14(0x12c)]=function(){const _0x4abbf3=_0xc9b14;if(this[_0x4abbf3(0x241)]())return!![];return VisuMZ[_0x4abbf3(0x19d)]['BattleManager_isTurnBased'][_0x4abbf3(0x195)](this);},VisuMZ['BattleSystemFTB'][_0xc9b14(0x248)]=BattleManager[_0xc9b14(0xdd)],BattleManager[_0xc9b14(0xdd)]=function(){const _0x50bcc9=_0xc9b14;if(this[_0x50bcc9(0x241)]())return!![];return VisuMZ[_0x50bcc9(0x19d)][_0x50bcc9(0x248)][_0x50bcc9(0x195)](this);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x15d)]=BattleManager[_0xc9b14(0x1ca)],BattleManager['startInput']=function(){const _0xda064e=_0xc9b14;if(this[_0xda064e(0x241)]())this[_0xda064e(0x1a0)]=![];VisuMZ['BattleSystemFTB']['BattleManager_startInput']['call'](this);if(this[_0xda064e(0x241)]()&&$gameParty[_0xda064e(0x137)]())this[_0xda064e(0xa1)]();},BattleManager[_0xc9b14(0xa1)]=function(){const _0x15aec8=_0xc9b14;this[_0x15aec8(0x1f4)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x111)]=BattleManager['processTurn'],BattleManager[_0xc9b14(0x24a)]=function(){const _0x30374d=_0xc9b14;this['isFTB']()?_0x30374d(0x230)!=='CjJVM'?(_0x27dcb6[_0x30374d(0x19d)][_0x30374d(0x173)]['call'](this,_0x40c822,_0x320cfb),this[_0x30374d(0x1bb)]()[_0x30374d(0x22d)]()):this['processTurnFTB']():_0x30374d(0x162)!=='EVhvk'?this['setText'](_0x190c36(_0x261ecb['$1'])):VisuMZ[_0x30374d(0x19d)][_0x30374d(0x111)][_0x30374d(0x195)](this);},BattleManager[_0xc9b14(0x188)]=function(){const _0xe5e9ba=_0xc9b14,_0x48091a=this[_0xe5e9ba(0x25c)];if(_0x48091a&&!_0x48091a[_0xe5e9ba(0x1bb)]()['canActFTB']()){if(_0xe5e9ba(0x13e)==='JvDqS'){const _0xf5517c=_0x31ac26[_0xe5e9ba(0xaf)],_0x274101=_0xf5517c['format'](_0x3b5edc[_0xe5e9ba(0x8d)](_0x5e4317)),_0x10c91=this[_0xe5e9ba(0x9f)](_0x274101+this[_0xe5e9ba(0x205)]());_0x46d63a-=_0x10c91;}else this[_0xe5e9ba(0x246)](),this[_0xe5e9ba(0x25c)]=null,this[_0xe5e9ba(0x12e)](![]);}else{if(_0x48091a&&_0x48091a[_0xe5e9ba(0x1e0)]()&&_0x48091a['canInput']()){if('RamNb'!=='avQSY'){const _0x1121f3=_0x48091a[_0xe5e9ba(0x22e)]();if(!_0x1121f3)'wJxrL'===_0xe5e9ba(0x17c)?this[_0xe5e9ba(0x1d3)]()?this[_0xe5e9ba(0x25f)](!![]):_0x5162fe[_0xe5e9ba(0x19d)][_0xe5e9ba(0xcb)][_0xe5e9ba(0x195)](this):VisuMZ[_0xe5e9ba(0x19d)]['BattleManager_processTurn'][_0xe5e9ba(0x195)](this);else _0x1121f3['_forceAction']?_0xe5e9ba(0x133)!==_0xe5e9ba(0x133)?this['ftbSwitchActorDirection'](![]):VisuMZ[_0xe5e9ba(0x19d)][_0xe5e9ba(0x111)][_0xe5e9ba(0x195)](this):(this[_0xe5e9ba(0x90)]=_0x48091a,this['startActorInput']());}else _0x5d3714[_0xe5e9ba(0x1ef)]();}else VisuMZ['BattleSystemFTB'][_0xe5e9ba(0x111)]['call'](this);}},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x226)]=BattleManager[_0xc9b14(0xa2)],BattleManager[_0xc9b14(0xa2)]=function(){const _0x293731=_0xc9b14;if(this['isFTB']()){if(_0x293731(0x1e4)===_0x293731(0xd1))return this['constructor']===_0x3b9bea&&_0x44ebbb[_0x293731(0x241)]()&&_0x12b5df[_0x293731(0x7f)];else VisuMZ['BattleSystemFTB'][_0x293731(0x111)][_0x293731(0x195)](this);}else{if('cIYGD'!==_0x293731(0x1f9)){if(this[_0x293731(0x1ac)])return;_0x5d4b6a[_0x293731(0x19d)][_0x293731(0x23d)][_0x293731(0x195)](this);}else VisuMZ[_0x293731(0x19d)][_0x293731(0x226)]['call'](this);}},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8b)]=BattleManager[_0xc9b14(0x251)],BattleManager[_0xc9b14(0x251)]=function(){const _0xe492f5=_0xc9b14;this[_0xe492f5(0x241)]()?this[_0xe492f5(0x154)]():VisuMZ['BattleSystemFTB'][_0xe492f5(0x8b)][_0xe492f5(0x195)](this);},BattleManager[_0xc9b14(0x154)]=function(){const _0x317a28=_0xc9b14;this[_0x317a28(0x90)]=null,this[_0x317a28(0x1f3)]=![];},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x18e)]=BattleManager[_0xc9b14(0x246)],BattleManager['endAction']=function(){const _0x5dde30=_0xc9b14,_0x4c2eb4=this[_0x5dde30(0x25c)];VisuMZ[_0x5dde30(0x19d)][_0x5dde30(0x18e)][_0x5dde30(0x195)](this),this[_0x5dde30(0x152)](_0x4c2eb4);},BattleManager[_0xc9b14(0x152)]=function(_0x5115c0){const _0x137afe=_0xc9b14;if(!this[_0x137afe(0x241)]())return;_0x5115c0&&_0x5115c0[_0x137afe(0x19f)]();if(this[_0x137afe(0x227)]['length']>0x0)_0x137afe(0x1b6)===_0x137afe(0x1b6)?(this['_subject']&&(!this[_0x137afe(0x15f)]['includes'](this[_0x137afe(0x25c)])&&this['_actionBattlers'][_0x137afe(0x262)](this['_subject'])),this[_0x137afe(0x25c)]=this[_0x137afe(0x18c)]()):(_0x27b3e2[_0x137afe(0x19d)][_0x137afe(0x101)][_0x137afe(0x195)](this),this[_0x137afe(0x198)]());else this[_0x137afe(0x240)](_0x5115c0)&&(_0x137afe(0x161)!==_0x137afe(0x161)?this[_0x137afe(0xa7)](this[_0x137afe(0x19b)]()+_0x1a91d8):this[_0x137afe(0x25c)]=_0x5115c0);_0x5115c0[_0x137afe(0x1bb)]()[_0x137afe(0x1f1)](_0x5115c0);},BattleManager[_0xc9b14(0x240)]=function(_0x43b36c){const _0x42bf7b=_0xc9b14;if(!_0x43b36c)return![];if(!_0x43b36c[_0x42bf7b(0x1e0)]())return![];if(!_0x43b36c['canMove']())return![];if(!_0x43b36c['canInput']())return![];if(_0x43b36c[_0x42bf7b(0x1a8)]())return![];return BattleManager[_0x42bf7b(0x7f)]&&BattleManager[_0x42bf7b(0x186)];},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x1f7)]=BattleManager[_0xc9b14(0x206)],BattleManager[_0xc9b14(0x206)]=function(){const _0x1939b8=_0xc9b14;VisuMZ['BattleSystemFTB'][_0x1939b8(0x1f7)][_0x1939b8(0x195)](this),this[_0x1939b8(0x92)]();},BattleManager[_0xc9b14(0x92)]=function(){const _0x5005b3=_0xc9b14;if(!this['isFTB']())return;if(this['_preemptive'])_0x5005b3(0x268)!==_0x5005b3(0x268)?this[_0x5005b3(0x203)]=_0x7eb3b3[_0x5005b3(0x166)](_0x2ef5ae['_FTB_MIN_ACTIONS'],_0x206a8f[_0x5005b3(0x11f)]):this[_0x5005b3(0x13c)]=_0x5005b3(0x210);else this[_0x5005b3(0x1a0)]?this[_0x5005b3(0x13c)]=_0x5005b3(0x1de):this[_0x5005b3(0x13c)]=BattleManager[_0x5005b3(0x120)];this[_0x5005b3(0x13c)]=this[_0x5005b3(0x13c)]||_0x5005b3(0x225);let _0x279675=0x0,_0x6fa6c0=0x0;switch(this['_ftbTurnAdvantageUnit'][_0x5005b3(0x89)]()[_0x5005b3(0x1a2)]()){case _0x5005b3(0x225):let _0x4cd589=[_0x5005b3(0x210),_0x5005b3(0x1de)];this['_ftbTurnAdvantageUnit']=_0x4cd589[Math[_0x5005b3(0x84)](_0x4cd589[_0x5005b3(0x212)])];break;case _0x5005b3(0x9e):this[_0x5005b3(0x13c)]='actors';break;case _0x5005b3(0x110):this[_0x5005b3(0x13c)]=_0x5005b3(0x1de);break;case _0x5005b3(0xbf):_0x279675=$gameParty[_0x5005b3(0xd2)](),_0x6fa6c0=$gameTroop['ftbLowestAgility'](),this[_0x5005b3(0x13c)]=_0x279675>=_0x6fa6c0?_0x5005b3(0x210):_0x5005b3(0x1de);break;case _0x5005b3(0xbb):_0x279675=$gameParty[_0x5005b3(0x138)](),_0x6fa6c0=$gameTroop[_0x5005b3(0x138)](),this[_0x5005b3(0x13c)]=_0x279675>=_0x6fa6c0?_0x5005b3(0x210):'enemies';break;case _0x5005b3(0x114):_0x279675=$gameParty['ftbHighestAgility'](),_0x6fa6c0=$gameTroop['ftbHighestAgility'](),this[_0x5005b3(0x13c)]=_0x279675>=_0x6fa6c0?_0x5005b3(0x210):'enemies';break;case _0x5005b3(0x201):_0x279675=$gameParty[_0x5005b3(0xdc)](),_0x6fa6c0=$gameTroop[_0x5005b3(0xdc)](),this['_ftbTurnAdvantageUnit']=_0x279675>=_0x6fa6c0?_0x5005b3(0x210):_0x5005b3(0x1de);break;}this[_0x5005b3(0xff)]=this[_0x5005b3(0x13c)]===_0x5005b3(0x210)?$gameParty:$gameTroop,this[_0x5005b3(0xdb)]=this[_0x5005b3(0x13c)]===_0x5005b3(0x210)?$gameTroop:$gameParty;},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x192)]=BattleManager['makeActionOrders'],BattleManager['makeActionOrders']=function(){const _0x571a27=_0xc9b14;this['isFTB']()?this['makeActionOrdersFTB']():'RBPkY'!==_0x571a27(0x26d)?VisuMZ[_0x571a27(0x19d)][_0x571a27(0x192)]['call'](this):(_0x2eec20[_0x571a27(0x19d)]['Game_Battler_addDebuff'][_0x571a27(0x195)](this,_0x5435f,_0x492cc7),this[_0x571a27(0x1bb)]()[_0x571a27(0x22d)]());},BattleManager[_0xc9b14(0x1a1)]=function(){const _0xea10f5=_0xc9b14;let _0x30da93=[],_0x1ada73=[],_0x55c81a=0x0;const _0x48ca67=$gameTroop[_0xea10f5(0xca)]();let _0x61c35d=_0x48ca67%0x2===0x0?this[_0xea10f5(0xdb)]:this['_ftbTeamOdd'];this[_0xea10f5(0x249)]=_0x61c35d;if(_0x61c35d===$gameParty){if(_0xea10f5(0x1e1)!=='chECh'){let _0x3501ee=$gameParty['ftbAliveMembers']()[_0xea10f5(0x183)](_0x3bf3a8=>_0x3bf3a8[_0xea10f5(0x18d)]()&&!_0x3bf3a8[_0xea10f5(0x137)]()),_0x4e6810=$gameParty[_0xea10f5(0x209)]()[_0xea10f5(0x183)](_0x3155d3=>_0x3155d3[_0xea10f5(0x18d)]()&&_0x3155d3[_0xea10f5(0x137)]());_0x30da93=_0x30da93['concat'](_0x3501ee),_0x55c81a=Game_Unit[_0xea10f5(0x11f)];while(_0x55c81a--){_0xea10f5(0x243)!==_0xea10f5(0x1b4)?_0x30da93=_0x30da93['concat'](_0x4e6810):this[_0xea10f5(0x241)]()?this[_0xea10f5(0x154)]():_0x13f3da['BattleSystemFTB'][_0xea10f5(0x8b)][_0xea10f5(0x195)](this);}_0x55c81a=Game_Unit['_FTB_MAX_ACTIONS']-0x1;while(_0x55c81a--){_0xea10f5(0xb1)!==_0xea10f5(0x24e)?_0x30da93=_0x30da93[_0xea10f5(0x194)](_0x3501ee):(this[_0xea10f5(0x160)]=!![],_0x2da85b[_0xea10f5(0x191)]());}}else _0x253a31[_0xea10f5(0x19d)]['Scene_Battle_commandCancel']['call'](this);}if(_0x61c35d===$gameTroop){if(_0xea10f5(0x179)!==_0xea10f5(0x15c)){let _0x112c1e=$gameTroop[_0xea10f5(0x209)]()[_0xea10f5(0x183)](_0x1a3fc1=>_0x1a3fc1[_0xea10f5(0x18d)]());if($gameSystem['isSideView']()){if('rNdhK'!==_0xea10f5(0x7d))return _0x30995e[_0xea10f5(0x241)]()?0x0:_0x17b1e8[_0xea10f5(0x19d)][_0xea10f5(0x8a)][_0xea10f5(0x195)](this);else _0x112c1e[_0xea10f5(0x15a)]((_0x562152,_0x28ec1d)=>_0x28ec1d['screenX']()-_0x562152[_0xea10f5(0x26a)]());}else _0xea10f5(0x1dd)===_0xea10f5(0x1dd)?_0x112c1e[_0xea10f5(0x15a)]((_0x204d9e,_0x52e3de)=>_0x204d9e[_0xea10f5(0x26a)]()-_0x52e3de['screenX']()):(_0xd8c753===this[_0xea10f5(0x24c)]()&&(this[_0xea10f5(0xc2)]=!![]),this['select'](_0xc59159),_0x397689['processSwitchActors'](_0xd5c2b3,_0x1090a5));_0x55c81a=Game_Unit[_0xea10f5(0x11f)];while(_0x55c81a--){_0x1ada73=_0x1ada73[_0xea10f5(0x194)](_0x112c1e);}$gameTroop[_0xea10f5(0x19f)]();}else{if(this[_0xea10f5(0x1fa)]===_0x289747)_0x5db8c1=!_0xc54276;}}this[_0xea10f5(0x15f)]=_0x30da93['concat'](_0x1ada73);},BattleManager[_0xc9b14(0x191)]=function(){const _0x2690be=_0xc9b14;if(!this[_0x2690be(0x241)]())return;this[_0x2690be(0x15f)]=this['_actionBattlers']||[],this[_0x2690be(0x15f)]=this['_actionBattlers'][_0x2690be(0x183)](_0x4c0a1a=>_0x4c0a1a['canMove']()&&!_0x4c0a1a[_0x2690be(0x1a8)]());},VisuMZ['BattleSystemFTB']['BattleManager_setup']=BattleManager[_0xc9b14(0x1da)],BattleManager[_0xc9b14(0x1da)]=function(_0x13f74d,_0x55fbb0,_0x48cf95){const _0x3a46e3=_0xc9b14;VisuMZ[_0x3a46e3(0x19d)]['BattleManager_setup'][_0x3a46e3(0x195)](this,_0x13f74d,_0x55fbb0,_0x48cf95),this[_0x3a46e3(0x15b)]();},BattleManager[_0xc9b14(0x15b)]=function(){const _0x22b900=_0xc9b14;if(!BattleManager[_0x22b900(0x241)]())return;this['_ftbCurrentUnit']=undefined,$gameParty['startTurnFTB'](),$gameTroop['startTurnFTB']();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x148)]=BattleManager['startTurn'],BattleManager[_0xc9b14(0x1f4)]=function(){const _0x4aaaea=_0xc9b14;this[_0x4aaaea(0x13f)](),VisuMZ['BattleSystemFTB']['BattleManager_startTurn'][_0x4aaaea(0x195)](this),this[_0x4aaaea(0x10c)]();},BattleManager[_0xc9b14(0x13f)]=function(){const _0x619f1d=_0xc9b14;if(!BattleManager[_0x619f1d(0x241)]())return;$gameParty[_0x619f1d(0x9a)](),$gameTroop[_0x619f1d(0x9a)]();const _0x3a78d4=$gameTroop['turnCount']()+0x1;let _0x2015aa=_0x3a78d4%0x2===0x0?this[_0x619f1d(0xdb)]:this[_0x619f1d(0xff)],_0x2686d8=_0x3a78d4%0x2===0x0?this[_0x619f1d(0xff)]:this[_0x619f1d(0xdb)];_0x3a78d4>0x1&&_0x2686d8[_0x619f1d(0x1ef)](),_0x2015aa[_0x619f1d(0x224)](),_0x2015aa[_0x619f1d(0x13f)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x1c9)]=BattleManager[_0xc9b14(0x171)],BattleManager[_0xc9b14(0x171)]=function(){const _0x57810e=_0xc9b14;VisuMZ[_0x57810e(0x19d)][_0x57810e(0x1c9)][_0x57810e(0x195)](this),this[_0x57810e(0x236)]();},BattleManager[_0xc9b14(0x236)]=function(){const _0xafde87=_0xc9b14;if(!BattleManager[_0xafde87(0x241)]())return;},VisuMZ['BattleSystemFTB'][_0xc9b14(0xce)]=BattleManager[_0xc9b14(0x20b)],BattleManager[_0xc9b14(0x20b)]=function(){const _0x4e2525=_0xc9b14;if(this[_0x4e2525(0x241)]())return;VisuMZ['BattleSystemFTB'][_0x4e2525(0xce)]['call'](this);},BattleManager[_0xc9b14(0x10c)]=function(){const _0x463fb1=_0xc9b14;if(!BattleManager[_0x463fb1(0x241)]())return;let _0x500556='';if(this[_0x463fb1(0x249)]===$gameParty){if(_0x463fb1(0x242)==='cFIQb'){let _0x401e65=$gameParty[_0x463fb1(0x1fe)]();_0x500556=TextManager['ftbPartyTeamShift'][_0x463fb1(0x130)](_0x401e65);}else _0x4e8ea2['sort']((_0x51e469,_0x34c4f0)=>_0x51e469[_0x463fb1(0x26a)]()-_0x34c4f0['screenX']());}else'woaSR'!==_0x463fb1(0x21d)?this[_0x463fb1(0x241)]()?this[_0x463fb1(0x1a1)]():_0x15dac1[_0x463fb1(0x19d)][_0x463fb1(0x192)][_0x463fb1(0x195)](this):_0x500556=TextManager[_0x463fb1(0x1f0)];if(_0x500556!==''){if('JGTiF'===_0x463fb1(0x1b3)){this['_logWindow'][_0x463fb1(0xba)](_0x463fb1(0x9b),_0x500556);const _0x133fa7=BattleManager[_0x463fb1(0x180)];this[_0x463fb1(0xcc)][_0x463fb1(0xba)](_0x463fb1(0x112),_0x133fa7),this[_0x463fb1(0xcc)]['push'](_0x463fb1(0x168));}else return this[_0x463fb1(0x23b)]=this[_0x463fb1(0x23b)]||0x0,this[_0x463fb1(0x23b)]>0x0;}},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x101)]=Game_System[_0xc9b14(0xbe)]['initialize'],Game_System[_0xc9b14(0xbe)][_0xc9b14(0xe4)]=function(){const _0xdf7cc=_0xc9b14;VisuMZ['BattleSystemFTB'][_0xdf7cc(0x101)]['call'](this),this[_0xdf7cc(0x198)]();},Game_System['prototype'][_0xc9b14(0x198)]=function(){this['_ftbActionCountVisible']=!![];},Game_System[_0xc9b14(0xbe)][_0xc9b14(0x1bf)]=function(){const _0x38b5de=_0xc9b14;if(BattleManager[_0x38b5de(0x16d)]===_0x38b5de(0x21c))return![];return this[_0x38b5de(0x232)]===undefined&&(_0x38b5de(0x107)!==_0x38b5de(0x142)?this[_0x38b5de(0x198)]():(_0x55a26c[_0x38b5de(0x19d)]['Game_Unit_onBattleStart'][_0x38b5de(0x195)](this,_0x240e4d),_0x5b4a4a[_0x38b5de(0x241)]()&&(this[_0x38b5de(0x1af)]=0x0))),this['_ftbActionCountVisible'];},Game_System[_0xc9b14(0xbe)][_0xc9b14(0xe9)]=function(_0x365fd4){const _0x52c134=_0xc9b14;this[_0x52c134(0x232)]===undefined&&this[_0x52c134(0x198)](),this[_0x52c134(0x232)]=_0x365fd4;},VisuMZ['BattleSystemFTB'][_0xc9b14(0x8a)]=Game_Action[_0xc9b14(0xbe)][_0xc9b14(0x153)],Game_Action[_0xc9b14(0xbe)][_0xc9b14(0x153)]=function(){const _0x5e38ba=_0xc9b14;if(BattleManager[_0x5e38ba(0x241)]()){if(_0x5e38ba(0x1d9)==='iVoqC')return 0x0;else _0x8d50ae['isFTB']()&&_0x4d0969&&_0x5529f0[_0x5e38ba(0x96)]&&_0x2f4f1a['note'][_0x5e38ba(0xac)](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?this[_0x5e38ba(0x21b)](_0x23aeab(_0x935481['$1'])):_0x16a590[_0x5e38ba(0x19d)][_0x5e38ba(0x147)][_0x5e38ba(0x195)](this,_0x324efe);}else return VisuMZ[_0x5e38ba(0x19d)][_0x5e38ba(0x8a)][_0x5e38ba(0x195)](this);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x149)]=Game_Action[_0xc9b14(0xbe)][_0xc9b14(0x20f)],Game_Action[_0xc9b14(0xbe)]['applyGlobal']=function(){const _0x212ff0=_0xc9b14;VisuMZ['BattleSystemFTB'][_0x212ff0(0x149)][_0x212ff0(0x195)](this),this[_0x212ff0(0x1e9)]();},Game_Action[_0xc9b14(0xbe)][_0xc9b14(0x1e9)]=function(){const _0x7c256d=_0xc9b14;if(!BattleManager[_0x7c256d(0x241)]())return;if(!this[_0x7c256d(0x1b7)]())return;if(!this['item']())return;this[_0x7c256d(0xb4)]()&&this[_0x7c256d(0x10d)]()['id']===this[_0x7c256d(0x1b7)]()['guardSkillId']()&&(BattleManager[_0x7c256d(0x219)]&&(_0x7c256d(0x7e)==='xICyu'?this[_0x7c256d(0x1b7)]()[_0x7c256d(0x116)]():_0x477803+=_0x1ad3ae));const _0x52732e=VisuMZ['BattleSystemFTB']['RegExp'],_0x167f3a=this[_0x7c256d(0x10d)]()[_0x7c256d(0x96)];_0x167f3a[_0x7c256d(0xac)](_0x52732e['PassTurn'])&&this[_0x7c256d(0x1b7)]()[_0x7c256d(0x116)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0xc8)]=Game_BattlerBase[_0xc9b14(0xbe)][_0xc9b14(0xd6)],Game_BattlerBase['prototype'][_0xc9b14(0xd6)]=function(){const _0x3740b5=_0xc9b14;VisuMZ[_0x3740b5(0x19d)][_0x3740b5(0xc8)][_0x3740b5(0x195)](this),BattleManager['removeActionBattlersFTB'](),this[_0x3740b5(0x1bb)]()[_0x3740b5(0x22d)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x18f)]=Game_BattlerBase[_0xc9b14(0xbe)][_0xc9b14(0xd7)],Game_BattlerBase['prototype'][_0xc9b14(0xd7)]=function(){const _0x361728=_0xc9b14;VisuMZ[_0x361728(0x19d)][_0x361728(0x18f)][_0x361728(0x195)](this),BattleManager[_0x361728(0x191)](),this[_0x361728(0x1bb)]()[_0x361728(0x22d)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x117)]=Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0x1a4)],Game_Battler['prototype'][_0xc9b14(0x1a4)]=function(){const _0x321a16=_0xc9b14;VisuMZ[_0x321a16(0x19d)][_0x321a16(0x117)][_0x321a16(0x195)](this),BattleManager['removeActionBattlersFTB'](),this[_0x321a16(0x1bb)]()[_0x321a16(0x22d)]();},Game_BattlerBase[_0xc9b14(0xbe)]['passTurnFTB']=function(){const _0x439760=_0xc9b14;this[_0x439760(0x160)]=!![],BattleManager[_0x439760(0x191)]();},Game_BattlerBase[_0xc9b14(0xbe)]['isPassingTurnFTB']=function(){const _0x2f55bd=_0xc9b14;return!!this[_0x2f55bd(0x160)];},Game_BattlerBase['_FTB_ACTION_BASE']=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x82)]['GenerateBase'],Game_BattlerBase[_0xc9b14(0x1f6)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x82)][_0xc9b14(0x15e)],Game_BattlerBase[_0xc9b14(0x1ea)]=VisuMZ[_0xc9b14(0x19d)]['Settings'][_0xc9b14(0x82)][_0xc9b14(0x199)],Game_BattlerBase[_0xc9b14(0xbe)][_0xc9b14(0xed)]=function(){const _0x5c0461=_0xc9b14;let _0x98ea78=Game_BattlerBase['_FTB_ACTION_BASE'];if(this[_0x5c0461(0x134)]===undefined)this[_0x5c0461(0x155)]();const _0x2ed9a9=this[_0x5c0461(0x134)][0x6]||0x0;if(_0x2ed9a9>0x0&&Game_BattlerBase[_0x5c0461(0x1f6)])_0x98ea78+=_0x2ed9a9;else _0x2ed9a9<0x0&&Game_BattlerBase[_0x5c0461(0x1ea)]&&(_0x5c0461(0x25a)===_0x5c0461(0x25a)?_0x98ea78+=_0x2ed9a9:(this['endAction'](),this[_0x5c0461(0x25c)]=null,this['updateTurn'](![])));const _0x49fc57=VisuMZ[_0x5c0461(0x19d)]['RegExp'],_0x42656a=this[_0x5c0461(0x163)]();for(const _0x16f8da of _0x42656a){if(!_0x16f8da)continue;const _0x3dba66=_0x16f8da['note'];_0x3dba66['match'](_0x49fc57['ActionPointTraitPlus'])&&(_0x98ea78+=Number(RegExp['$1']));}return Math['max'](0x0,_0x98ea78);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0xc0)]=Game_BattlerBase['prototype'][_0xc9b14(0x263)],Game_BattlerBase['prototype']['clearStates']=function(){const _0x3d13bf=_0xc9b14;VisuMZ['BattleSystemFTB'][_0x3d13bf(0xc0)][_0x3d13bf(0x195)](this),this[_0x3d13bf(0x1bb)]()['recalculateActionsFTB']();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x144)]=Game_BattlerBase[_0xc9b14(0xbe)][_0xc9b14(0x126)],Game_BattlerBase[_0xc9b14(0xbe)][_0xc9b14(0x126)]=function(_0x3c37f8){const _0x19c208=_0xc9b14;if(SceneManager[_0x19c208(0x81)]()&&BattleManager['isFTB']()){const _0x288ec4=DataManager[_0x19c208(0xc9)](_0x3c37f8);if(_0x288ec4>this[_0x19c208(0x1bb)]()[_0x19c208(0x19b)]())return![];}return VisuMZ[_0x19c208(0x19d)]['Game_BattlerBase_canUse']['call'](this,_0x3c37f8);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x25d)]=Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0x141)],Game_Battler['prototype'][_0xc9b14(0x141)]=function(_0x2c8c61){const _0x1b2a71=_0xc9b14;VisuMZ[_0x1b2a71(0x19d)][_0x1b2a71(0x25d)][_0x1b2a71(0x195)](this,_0x2c8c61),this['payActionCostFTB'](_0x2c8c61);},Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0xb5)]=function(_0x53d90d){const _0x295bc5=_0xc9b14;if(!_0x53d90d)return;if(!SceneManager[_0x295bc5(0x81)]())return;if(!BattleManager['isFTB']())return;const _0x1b1bae=BattleManager[_0x295bc5(0xf2)];if(_0x1b1bae&&_0x1b1bae['_forceAction'])return;const _0x4f8eaf=DataManager[_0x295bc5(0xc9)](_0x53d90d);this[_0x295bc5(0x1bb)]()['reduceActionsFTB'](_0x4f8eaf);},VisuMZ[_0xc9b14(0x19d)]['Game_Battler_onTurnEnd']=Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0x20d)],Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0x20d)]=function(){const _0x94ebaf=_0xc9b14;this[_0x94ebaf(0x1ac)]=BattleManager[_0x94ebaf(0x241)]()&&BattleManager[_0x94ebaf(0x17a)],VisuMZ[_0x94ebaf(0x19d)][_0x94ebaf(0xcd)][_0x94ebaf(0x195)](this),delete this[_0x94ebaf(0x1ac)];},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x23d)]=Game_BattlerBase[_0xc9b14(0xbe)][_0xc9b14(0x167)],Game_BattlerBase[_0xc9b14(0xbe)]['updateStateTurns']=function(){const _0x781337=_0xc9b14;if(this[_0x781337(0x1ac)])return;VisuMZ['BattleSystemFTB']['Game_BattlerBase_updateStateTurns']['call'](this);},VisuMZ['BattleSystemFTB'][_0xc9b14(0x17f)]=Game_BattlerBase['prototype']['updateBuffTurns'],Game_BattlerBase[_0xc9b14(0xbe)][_0xc9b14(0x83)]=function(){const _0x37ad24=_0xc9b14;if(this[_0x37ad24(0x1ac)])return;VisuMZ[_0x37ad24(0x19d)][_0x37ad24(0x17f)][_0x37ad24(0x195)](this);},VisuMZ[_0xc9b14(0x19d)]['Game_Battler_addState']=Game_Battler['prototype'][_0xc9b14(0x1ce)],Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0x1ce)]=function(_0x15f1d1){const _0x11f6e3=_0xc9b14;VisuMZ[_0x11f6e3(0x19d)][_0x11f6e3(0x86)]['call'](this,_0x15f1d1),this[_0x11f6e3(0x1bb)]()[_0x11f6e3(0x22d)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x12d)]=Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0x158)],Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0x158)]=function(_0x444617){const _0x2dd963=_0xc9b14;VisuMZ[_0x2dd963(0x19d)]['Game_Battler_removeState']['call'](this,_0x444617),this[_0x2dd963(0x1bb)]()[_0x2dd963(0x22d)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x22c)]=Game_Battler[_0xc9b14(0xbe)]['addBuff'],Game_Battler[_0xc9b14(0xbe)][_0xc9b14(0x16f)]=function(_0x1daa77,_0x1f84c6){const _0x229b50=_0xc9b14;VisuMZ[_0x229b50(0x19d)]['Game_Battler_addBuff'][_0x229b50(0x195)](this,_0x1daa77,_0x1f84c6),this['friendsUnit']()['recalculateActionsFTB']();},VisuMZ['BattleSystemFTB'][_0xc9b14(0x146)]=Game_Battler['prototype'][_0xc9b14(0x1e6)],Game_Battler[_0xc9b14(0xbe)]['addDebuff']=function(_0x172277,_0x540f7c){const _0x2179c1=_0xc9b14;VisuMZ[_0x2179c1(0x19d)][_0x2179c1(0x146)][_0x2179c1(0x195)](this,_0x172277,_0x540f7c),this['friendsUnit']()[_0x2179c1(0x22d)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0xe2)]=Game_Battler[_0xc9b14(0xbe)]['removeBuff'],Game_Battler['prototype'][_0xc9b14(0x273)]=function(_0x67f35){const _0x2cc8f7=_0xc9b14;VisuMZ[_0x2cc8f7(0x19d)][_0x2cc8f7(0xe2)][_0x2cc8f7(0x195)](this,_0x67f35),this[_0x2cc8f7(0x1bb)]()[_0x2cc8f7(0x22d)]();},VisuMZ['BattleSystemFTB'][_0xc9b14(0xf0)]=Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0x270)],Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0x270)]=function(){const _0x3971ca=_0xc9b14;if(BattleManager[_0x3971ca(0x241)]()){if(_0x3971ca(0x14c)!==_0x3971ca(0x14c)){if(!_0x3d74b5[_0x3971ca(0x241)]())return;if(!_0x480596['inBattle']())return;const _0x531f9a=this[_0x3971ca(0xb9)]();this['createActionsFTB']();let _0x5c2db0=this['getCurrentActionsFTB']();const _0x2ef63e=this['getMaxActionsFTB']()-_0x531f9a;if(_0x378083[_0x3971ca(0x228)]&&_0x2ef63e>0x0)_0x5c2db0+=_0x2ef63e;if(_0x3c5066['_FTB_RECALC_SUB_DIFF']&&_0x2ef63e<0x0)_0x5c2db0+=_0x2ef63e;_0x5c2db0=_0x2bef43['min'](_0x5c2db0,_0x5d94d4[_0x3971ca(0x11f)]),this[_0x3971ca(0xa7)](_0x5c2db0);}else{if(this[_0x3971ca(0x1bc)]())this[_0x3971ca(0x1bc)]()[_0x3971ca(0x94)]();return![];}}return VisuMZ[_0x3971ca(0x19d)][_0x3971ca(0xf0)]['call'](this);},VisuMZ[_0xc9b14(0x19d)]['Game_Actor_changeEquip']=Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0x20e)],Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0x20e)]=function(_0x3c6798,_0x335d58){const _0x35cc1b=_0xc9b14;VisuMZ['BattleSystemFTB'][_0x35cc1b(0x173)][_0x35cc1b(0x195)](this,_0x3c6798,_0x335d58),this[_0x35cc1b(0x1bb)]()[_0x35cc1b(0x22d)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0xb7)]=Game_Actor[_0xc9b14(0xbe)]['forceChangeEquip'],Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0x119)]=function(_0x14e71f,_0x277c0d){const _0x3a6e9e=_0xc9b14;VisuMZ[_0x3a6e9e(0x19d)][_0x3a6e9e(0xb7)][_0x3a6e9e(0x195)](this,_0x14e71f,_0x277c0d),this[_0x3a6e9e(0x1bb)]()[_0x3a6e9e(0x22d)]();},VisuMZ[_0xc9b14(0x19d)]['Game_Actor_changeEquipById']=Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0x16a)],Game_Actor[_0xc9b14(0xbe)]['changeEquipById']=function(_0x466822,_0x1a0e66){const _0x27c289=_0xc9b14;VisuMZ[_0x27c289(0x19d)]['Game_Actor_changeEquipById'][_0x27c289(0x195)](this,_0x466822,_0x1a0e66),this[_0x27c289(0x1bb)]()[_0x27c289(0x22d)]();},VisuMZ[_0xc9b14(0x19d)]['Game_Actor_discardEquip']=Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0xe0)],Game_Actor[_0xc9b14(0xbe)]['discardEquip']=function(_0x341519){const _0x18b9f3=_0xc9b14;VisuMZ['BattleSystemFTB'][_0x18b9f3(0xd5)][_0x18b9f3(0x195)](this,_0x341519),this['friendsUnit']()[_0x18b9f3(0x22d)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x24d)]=Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0x1c6)],Game_Actor['prototype'][_0xc9b14(0x1c6)]=function(_0x417a34){const _0x32b48f=_0xc9b14;VisuMZ[_0x32b48f(0x19d)][_0x32b48f(0x24d)]['call'](this,_0x417a34),this[_0x32b48f(0x1bb)]()[_0x32b48f(0x22d)]();},VisuMZ['BattleSystemFTB']['Game_Actor_changeClass']=Game_Actor['prototype'][_0xc9b14(0x1f8)],Game_Actor[_0xc9b14(0xbe)][_0xc9b14(0x1f8)]=function(_0x4b12d6,_0x20f934){const _0x36c4aa=_0xc9b14;VisuMZ[_0x36c4aa(0x19d)]['Game_Actor_changeClass'][_0x36c4aa(0x195)](this,_0x4b12d6,_0x20f934),this[_0x36c4aa(0x1bb)]()[_0x36c4aa(0x22d)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0xfa)]=Game_Enemy[_0xc9b14(0xbe)][_0xc9b14(0x238)],Game_Enemy[_0xc9b14(0xbe)]['transform']=function(_0x567cda){const _0x507581=_0xc9b14;VisuMZ[_0x507581(0x19d)]['Game_Enemy_transform'][_0x507581(0x195)](this,_0x567cda),this[_0x507581(0x1bb)]()['recalculateActionsFTB']();},Game_Unit['_FTB_MAX_ACTIONS']=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x82)]['MaxActions'],Game_Unit['_FTB_MIN_ACTIONS']=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x82)]['MinActions'],Game_Unit[_0xc9b14(0x1db)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x82)][_0xc9b14(0x7a)],Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x13f)]=function(){const _0x2702e9=_0xc9b14;this[_0x2702e9(0x1d0)](),this['setCurrentActionsFTB'](this[_0x2702e9(0xb9)]());},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x1d0)]=function(){const _0x1fdd95=_0xc9b14;this[_0x1fdd95(0x12f)]=!![];let _0x107211=0x0,_0x52d876=this[_0x1fdd95(0x1d7)]()[_0x1fdd95(0x183)](_0x44a5db=>_0x44a5db[_0x1fdd95(0x18d)]());_0x107211=_0x52d876[_0x1fdd95(0x25e)]((_0x285dbd,_0x8eebc2)=>_0x285dbd+_0x8eebc2[_0x1fdd95(0xed)](),_0x107211),_0x107211=_0x107211[_0x1fdd95(0x166)](Game_Unit[_0x1fdd95(0x91)],Game_Unit['_FTB_MAX_ACTIONS']),this[_0x1fdd95(0x203)]=_0x107211;},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x22d)]=function(){const _0x47c37a=_0xc9b14;if(!BattleManager[_0x47c37a(0x241)]())return;if(!$gameParty[_0x47c37a(0x272)]())return;const _0x3a616d=this[_0x47c37a(0xb9)]();this[_0x47c37a(0x1d0)]();let _0xd2e82a=this[_0x47c37a(0x19b)]();const _0x5be402=this[_0x47c37a(0xb9)]()-_0x3a616d;if(BattleManager['_FTB_RECALC_ADD_DIFF']&&_0x5be402>0x0)_0xd2e82a+=_0x5be402;if(BattleManager['_FTB_RECALC_SUB_DIFF']&&_0x5be402<0x0)_0xd2e82a+=_0x5be402;_0xd2e82a=Math[_0x47c37a(0x1b9)](_0xd2e82a,Game_Unit[_0x47c37a(0x11f)]),this['setCurrentActionsFTB'](_0xd2e82a);},Game_Unit[_0xc9b14(0xbe)]['getCurrentActionsFTB']=function(){const _0x2dd85b=_0xc9b14;return this[_0x2dd85b(0x23b)]||0x0;},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0xa7)]=function(_0x38f298){const _0x59c2d9=_0xc9b14;this[_0x59c2d9(0x23b)]=Math[_0x59c2d9(0x11d)](_0x38f298)[_0x59c2d9(0x166)](0x0,Game_Unit['_FTB_MAX_ACTIONS']),!Game_Unit[_0x59c2d9(0x1db)]&&(this[_0x59c2d9(0x23b)]=Math[_0x59c2d9(0x1b9)](this['_ftbActionsCur'],this[_0x59c2d9(0xb9)]()));},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x11c)]=function(_0x377f57){const _0x1ccb2b=_0xc9b14;this[_0x1ccb2b(0xa7)](this['getCurrentActionsFTB']()+_0x377f57);},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x23a)]=function(_0x111e25){this['gainCurrentActionsFTB'](-_0x111e25);},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0xb9)]=function(){const _0x176d4d=_0xc9b14;return this[_0x176d4d(0x203)]||0x0;},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x26e)]=function(_0x4a01e1){const _0x1ae5e1=_0xc9b14;this[_0x1ae5e1(0x203)]=_0x4a01e1['clamp'](Game_Unit[_0x1ae5e1(0x91)],Game_Unit[_0x1ae5e1(0x11f)]);},Game_Unit['prototype'][_0xc9b14(0xbc)]=function(_0x27634d){this['loseCurrentActionsFTB'](_0x27634d);},Game_Unit['prototype'][_0xc9b14(0x128)]=function(){const _0x33b386=_0xc9b14;return this[_0x33b386(0x23b)]=this[_0x33b386(0x23b)]||0x0,this[_0x33b386(0x23b)]>0x0;},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x1ef)]=function(){const _0x2bb167=_0xc9b14;for(const _0x59ab73 of this['members']()){if(!_0x59ab73)continue;const _0x5743d7=_0x59ab73[_0x2bb167(0x207)]();_0x59ab73[_0x2bb167(0x20d)](),_0x59ab73[_0x2bb167(0x220)](),_0x5743d7&&_0x59ab73['isDead']()&&(_0x2bb167(0x76)===_0x2bb167(0x1cc)?this[_0x2bb167(0x1b7)]()[_0x2bb167(0x116)]():_0x59ab73[_0x2bb167(0x1a4)]());}},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x1c7)]=function(){const _0x12d837=_0xc9b14;if(this[_0x12d837(0x19b)]()<=0x0)return!![];if(!this[_0x12d837(0x1d7)]()[_0x12d837(0x1e8)](_0x1dc0a0=>_0x1dc0a0[_0x12d837(0x18d)]()))return!![];return![];},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x224)]=function(){const _0x18131c=_0xc9b14;for(const _0x4b0354 of this['members']()){if(!_0x4b0354)continue;_0x4b0354['updateStateTurns'](),_0x4b0354['removeStatesAuto'](0x2),_0x4b0354[_0x18131c(0x83)](),_0x4b0354[_0x18131c(0x220)]();}},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x9a)]=function(){const _0x5b77ba=_0xc9b14;for(const _0x1dc030 of this[_0x5b77ba(0x1df)]()){if(!_0x1dc030)continue;_0x1dc030[_0x5b77ba(0x160)]=![];}},Game_Unit['prototype'][_0xc9b14(0xd2)]=function(){const _0x427799=_0xc9b14,_0x4ce211=this[_0x427799(0x1df)]();return Math[_0x427799(0x1b9)](..._0x4ce211[_0x427799(0x19a)](_0x3bda9b=>_0x3bda9b[_0x427799(0x259)]));},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x10b)]=function(){const _0x43cfd1=_0xc9b14,_0x560cf5=this[_0x43cfd1(0x1df)]();return Math[_0x43cfd1(0x211)](..._0x560cf5[_0x43cfd1(0x19a)](_0x52c594=>_0x52c594['agi']));},Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0xdc)]=function(){const _0x4bcfc4=_0xc9b14,_0x34f042=this[_0x4bcfc4(0x1df)]();return _0x34f042[_0x4bcfc4(0x25e)]((_0x37852a,_0x24bc6e)=>_0x37852a+_0x24bc6e['agi'],0x0);},VisuMZ['BattleSystemFTB'][_0xc9b14(0x7c)]=Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x253)],Game_Unit[_0xc9b14(0xbe)][_0xc9b14(0x253)]=function(_0x13b6f9){const _0x1c1c27=_0xc9b14;VisuMZ['BattleSystemFTB'][_0x1c1c27(0x7c)][_0x1c1c27(0x195)](this,_0x13b6f9),BattleManager[_0x1c1c27(0x241)]()&&(this[_0x1c1c27(0x1af)]=0x0);},Game_Unit['prototype'][_0xc9b14(0x209)]=function(){const _0x56ef8d=_0xc9b14,_0x1f4147=this[_0x56ef8d(0x1d7)]();if(BattleManager['_FTB_RESET_INDEX'])return _0x1f4147;if(BattleManager[_0x56ef8d(0x7f)])return _0x1f4147;this['_ftbLastIndex']=this[_0x56ef8d(0x1af)]||0x0;while(!_0x1f4147[_0x56ef8d(0x1e8)](_0xb74112=>_0xb74112[_0x56ef8d(0x24c)]()===this[_0x56ef8d(0x1af)])){const _0x29878e=this[_0x56ef8d(0x1df)](),_0x2dc36b=_0x29878e[this[_0x56ef8d(0x1af)]];let _0x35c489=_0x29878e['indexOf'](_0x2dc36b)+0x1;if(_0x35c489>=_0x29878e[_0x56ef8d(0x212)])_0x35c489=0x0;this[_0x56ef8d(0x1af)]=_0x35c489;}for(;;){const _0x8e87dd=_0x1f4147[0x0]['index']();if(_0x8e87dd===this['_ftbLastIndex'])break;_0x1f4147[_0x56ef8d(0xba)](_0x1f4147['shift']());}return _0x1f4147;},Game_Unit[_0xc9b14(0xbe)]['setLastFtbIndex']=function(_0x3c66b8){const _0x2dbf0f=_0xc9b14;this['_ftbLastIndex']=_0x3c66b8?_0x3c66b8['index']():0x0,this[_0x2dbf0f(0x1af)]++;},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x93)]=Scene_Battle['prototype'][_0xc9b14(0x1c8)],Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0x1c8)]=function(){const _0x3ca05a=_0xc9b14;VisuMZ['BattleSystemFTB']['Scene_Battle_createActorCommandWindow']['call'](this);if(BattleManager[_0x3ca05a(0x241)]()){if(_0x3ca05a(0x182)!=='anePB')this[_0x3ca05a(0x145)]();else{const _0x542184=_0x29e974[_0x3ca05a(0x1d6)[_0x3ca05a(0x130)](_0x510f68)];this[_0x3ca05a(0x165)](_0x542184,_0x519fde,_0x51ceda),this[_0x3ca05a(0x23e)](_0x4f24ef)&&this[_0x3ca05a(0x1a9)](_0x4ca25d,_0x54f99e);}}},Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0x145)]=function(){const _0x5a668f=_0xc9b14,_0x3a4dbe=this['_actorCommandWindow'];if(this[_0x5a668f(0x200)]()){if('itVzp'!=='itVzp')return _0x494a22[_0x5a668f(0x19d)]['Game_Action_speed'][_0x5a668f(0x195)](this);else delete _0x3a4dbe[_0x5a668f(0x193)]['cancel'];}},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x19c)]=Scene_Battle[_0xc9b14(0xbe)]['commandCancel'],Scene_Battle['prototype'][_0xc9b14(0x108)]=function(){const _0xb6e303=_0xc9b14;BattleManager['isFTB']()?_0xb6e303(0x26f)==='vhJyI'?this[_0xb6e303(0x213)]():this[_0xb6e303(0x1d3)]()&&this[_0xb6e303(0x1f5)]()===0x1?this[_0xb6e303(0x25f)](!![]):_0x27bade[_0xb6e303(0x19d)][_0xb6e303(0x14f)]['call'](this,_0x121430):VisuMZ[_0xb6e303(0x19d)][_0xb6e303(0x19c)][_0xb6e303(0x195)](this);},Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0x213)]=function(){const _0x3cc542=_0xc9b14;this[_0x3cc542(0x157)][_0x3cc542(0x1da)](),this[_0x3cc542(0x22a)][_0x3cc542(0x218)]();},VisuMZ['BattleSystemFTB'][_0xc9b14(0x106)]=Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0xf6)],Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0xf6)]=function(){const _0x12355d=_0xc9b14;BattleManager[_0x12355d(0x241)]()?this['startActorCommandSelection']():_0x12355d(0xc6)!==_0x12355d(0xfc)?VisuMZ[_0x12355d(0x19d)][_0x12355d(0x106)][_0x12355d(0x195)](this):_0x13eda5['BattleSystemFTB'][_0x12355d(0x111)]['call'](this);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x9c)]=Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0xec)],Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0xec)]=function(){const _0x302e3c=_0xc9b14;VisuMZ[_0x302e3c(0x19d)]['Scene_Battle_createAllWindows'][_0x302e3c(0x195)](this),this['createActionCountWindowsFTB']();},Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0x103)]=function(){const _0x1e1f56=_0xc9b14;if(!BattleManager['isFTB']())return;const _0x3cdd96=this['getChildIndex'](this[_0x1e1f56(0x1a5)]);this[_0x1e1f56(0x11b)]=new Window_FTB_ActionCount(),this[_0x1e1f56(0x11b)][_0x1e1f56(0x169)]($gameTroop),this[_0x1e1f56(0x261)](this[_0x1e1f56(0x11b)],_0x3cdd96),this[_0x1e1f56(0x258)]=new Window_FTB_ActionCount(),this[_0x1e1f56(0x258)][_0x1e1f56(0x169)]($gameParty),this[_0x1e1f56(0x261)](this['_ftbPartyActionCountWindow'],_0x3cdd96),this[_0x1e1f56(0x1c1)]();},Scene_Battle[_0xc9b14(0xbe)][_0xc9b14(0x1c1)]=function(){const _0xde046=_0xc9b14;if(!BattleManager[_0xde046(0x241)]())return;if(!this['_logWindow'])return;const _0x243d29=Window_FTB_ActionCount[_0xde046(0x8e)];if(_0x243d29['BottomPosition'])return;this[_0xde046(0xcc)]['y']+=_0x243d29[_0xde046(0xc4)];},Window_Base[_0xc9b14(0xeb)]=VisuMZ['BattleSystemFTB'][_0xc9b14(0x8e)][_0xc9b14(0x175)]['CostPosition'],Window_Base[_0xc9b14(0x233)]=VisuMZ[_0xc9b14(0x19d)]['Settings'][_0xc9b14(0x175)][_0xc9b14(0x16b)],Window_Base[_0xc9b14(0x26c)]=VisuMZ[_0xc9b14(0x19d)]['Settings'][_0xc9b14(0x175)][_0xc9b14(0x216)],Window_Base[_0xc9b14(0xb0)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x175)][_0xc9b14(0x1d5)],Window_Base[_0xc9b14(0xe1)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0x175)][_0xc9b14(0x135)],VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x104)]=Window_Base[_0xc9b14(0xbe)][_0xc9b14(0x125)],Window_Base[_0xc9b14(0xbe)][_0xc9b14(0x125)]=function(_0x4051d4,_0x27a892,_0x3e8fa9){const _0x1129f2=_0xc9b14;return _0x3e8fa9=VisuMZ[_0x1129f2(0x19d)][_0x1129f2(0x104)]['call'](this,_0x4051d4,_0x27a892,_0x3e8fa9),_0x3e8fa9=this[_0x1129f2(0x25b)](_0x4051d4,_0x27a892,_0x3e8fa9),_0x3e8fa9;},VisuMZ['BattleSystemFTB'][_0xc9b14(0x265)]=Window_Base[_0xc9b14(0xbe)][_0xc9b14(0x131)],Window_Base[_0xc9b14(0xbe)][_0xc9b14(0x131)]=function(_0x22030b,_0x8d73f1,_0x1c28a,_0x5f1859){const _0x588206=_0xc9b14;BattleManager[_0x588206(0x241)]()&&this['constructor']===Window_BattleItem?_0x588206(0x1fd)!==_0x588206(0x1fd)?(_0x167339[_0x588206(0x19d)][_0x588206(0x1c9)][_0x588206(0x195)](this),this['endTurnFTB']()):this[_0x588206(0xc3)](_0x22030b,_0x8d73f1,_0x1c28a,_0x5f1859):_0x588206(0x143)!==_0x588206(0xd3)?VisuMZ[_0x588206(0x19d)][_0x588206(0x265)]['call'](this,_0x22030b,_0x8d73f1,_0x1c28a,_0x5f1859):(_0x200c7e['isFTB']()&&this[_0x588206(0xad)]===_0x26fb47?this[_0x588206(0xc3)](_0x311eb0,_0x2eccf9,_0x541a9f,_0x5e6b3f):_0x1256d1[_0x588206(0x19d)][_0x588206(0x265)][_0x588206(0x195)](this,_0x27be0b,_0x4e85ed,_0x18341f,_0x1f54ae),this['resetFontSettings']()),this[_0x588206(0x121)]();},Window_Base[_0xc9b14(0xbe)]['drawItemNumberFTB']=function(_0x1cb3b8,_0x10e675,_0x412e0c,_0xf8a3b0){const _0x47930f=_0xc9b14,_0x58d862=BattleManager[_0x47930f(0x184)]||$gameParty[_0x47930f(0x1df)]()[0x0],_0x3cd974=this[_0x47930f(0x25b)](_0x58d862,_0x1cb3b8,''),_0x536075=this['textSizeEx'](_0x3cd974)[_0x47930f(0x24f)],_0x34d3cd=Window_Base[_0x47930f(0xeb)];let _0x5268c6=_0x10e675+_0xf8a3b0-_0x536075;if(_0x3cd974==='')VisuMZ[_0x47930f(0x19d)][_0x47930f(0x265)][_0x47930f(0x195)](this,_0x1cb3b8,_0x10e675,_0x412e0c,_0xf8a3b0);else{if(this[_0x47930f(0x1b1)](_0x1cb3b8)){if('LSliV'!==_0x47930f(0x1cf))this[_0x47930f(0xf1)]();else{this[_0x47930f(0x121)]();const _0x2caddd=VisuMZ[_0x47930f(0x105)][_0x47930f(0x8e)][_0x47930f(0x187)];this[_0x47930f(0x100)]['fontSize']=_0x2caddd[_0x47930f(0x1e2)];if(_0x34d3cd){if(_0x47930f(0x1e5)===_0x47930f(0x174))return this[_0x47930f(0x23b)]||0x0;else{const _0x406557=_0x2caddd[_0x47930f(0xaf)],_0x5ab5c2=_0x406557[_0x47930f(0x130)]($gameParty['numItems'](_0x1cb3b8)),_0x1ed7e5=this[_0x47930f(0x9f)](_0x5ab5c2+this['skillCostSeparator']());_0x5268c6-=_0x1ed7e5;}}else _0xf8a3b0-=this[_0x47930f(0x9f)](this[_0x47930f(0x205)]())+_0x536075;VisuMZ[_0x47930f(0x19d)][_0x47930f(0x265)]['call'](this,_0x1cb3b8,_0x10e675,_0x412e0c,_0xf8a3b0);}}}this['drawTextEx'](_0x3cd974,_0x5268c6,_0x412e0c);},Window_Base[_0xc9b14(0xbe)]['makeAdditionalCostTextFTB']=function(_0x5d75d5,_0x476ccb,_0x4187e5){const _0x7b8c6b=_0xc9b14;if(!BattleManager[_0x7b8c6b(0x241)]())return _0x4187e5;if(!_0x5d75d5)return _0x4187e5;if(!_0x476ccb)return _0x4187e5;if(_0x476ccb[_0x7b8c6b(0x96)][_0x7b8c6b(0xac)](VisuMZ[_0x7b8c6b(0x19d)][_0x7b8c6b(0x1cd)][_0x7b8c6b(0x95)]))return _0x4187e5;let _0x301186=DataManager[_0x7b8c6b(0xc9)](_0x476ccb);const _0x3ed0b9=Window_Base[_0x7b8c6b(0xeb)],_0x2502b8=Window_Base[_0x7b8c6b(0x233)],_0x431c83=Window_Base[_0x7b8c6b(0x26c)],_0x4e5a98=Window_Base['_FTB_COST_SHOW_0'],_0x53c47a=Window_Base['_FTB_COST_SHOW_1'];if(_0x476ccb[_0x7b8c6b(0x96)][_0x7b8c6b(0xac)](VisuMZ[_0x7b8c6b(0x19d)][_0x7b8c6b(0x1cd)][_0x7b8c6b(0x1ed)])){if(_0x301186<0x0)return _0x4187e5;}else{if(_0x7b8c6b(0x10f)!==_0x7b8c6b(0x1c2)){if(DataManager[_0x7b8c6b(0xb4)](_0x476ccb)&&this[_0x7b8c6b(0xad)]===Window_ActorCommand){if(_0x7b8c6b(0x176)===_0x7b8c6b(0x176)){if(!_0x2502b8&&_0x476ccb['id']===_0x5d75d5[_0x7b8c6b(0x181)]())return _0x4187e5;if(!_0x431c83&&_0x476ccb['id']===_0x5d75d5[_0x7b8c6b(0x16c)]())return _0x4187e5;}else _0x39feb2-=_0x500002;}if(_0x301186<0x0)return _0x4187e5;if(!_0x4e5a98&&_0x301186===0x0)return _0x4187e5;if(!_0x53c47a&&_0x301186===0x1)return _0x4187e5;}else{if(_0x254159[_0x7b8c6b(0x81)]()&&_0x2e7c47[_0x7b8c6b(0x241)]()){const _0x3a2c7f=_0x30e35c[_0x7b8c6b(0xc9)](_0x2496ae);if(_0x3a2c7f>this[_0x7b8c6b(0x1bb)]()[_0x7b8c6b(0x19b)]())return![];}return _0x6d35d3['BattleSystemFTB'][_0x7b8c6b(0x144)][_0x7b8c6b(0x195)](this,_0x1fc33c);}}const _0x23d3fb='\x5cI[%1]'[_0x7b8c6b(0x130)](ImageManager[_0x7b8c6b(0x1bd)]),_0x27c9c3=TextManager[_0x7b8c6b(0xf9)];let _0x4041c8=TextManager[_0x7b8c6b(0x223)]['format'](_0x301186,_0x27c9c3,_0x23d3fb);if(_0x4187e5==='')_0x4187e5+=_0x4041c8;else{if(_0x3ed0b9){if(_0x7b8c6b(0xbd)===_0x7b8c6b(0xf4)){const _0x14a088=_0x5b67f0[_0x7b8c6b(0xc9)](_0x4a56ed);if(_0x14a088>this['friendsUnit']()[_0x7b8c6b(0x19b)]())return![];}else _0x4187e5=_0x4041c8+this[_0x7b8c6b(0x205)]()+_0x4187e5;}else{if(_0x7b8c6b(0x85)!==_0x7b8c6b(0x85)){const _0x2594d5=this[_0x7b8c6b(0x1df)]();return _0x245333[_0x7b8c6b(0x211)](..._0x2594d5[_0x7b8c6b(0x19a)](_0x271c5d=>_0x271c5d[_0x7b8c6b(0x259)]));}else _0x4187e5=_0x4187e5+this['skillCostSeparator']()+_0x4041c8;}}return _0x4187e5;},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x147)]=Window_Help[_0xc9b14(0xbe)][_0xc9b14(0x21a)],Window_Help[_0xc9b14(0xbe)][_0xc9b14(0x21a)]=function(_0x1230f4){const _0x22f0ef=_0xc9b14;BattleManager[_0x22f0ef(0x241)]()&&_0x1230f4&&_0x1230f4['note']&&_0x1230f4['note'][_0x22f0ef(0xac)](/<(?:FTB) HELP>\s*([\s\S]*)\s*<\/(?:FTB) HELP>/i)?this[_0x22f0ef(0x21b)](String(RegExp['$1'])):VisuMZ[_0x22f0ef(0x19d)][_0x22f0ef(0x147)]['call'](this,_0x1230f4);},Window_Selectable[_0xc9b14(0xbe)][_0xc9b14(0x1d3)]=function(){const _0x4097a1=_0xc9b14;return this[_0x4097a1(0xad)]===Window_ActorCommand&&BattleManager['isFTB']()&&BattleManager[_0x4097a1(0x7f)];},VisuMZ[_0xc9b14(0x19d)]['Window_Selectable_cursorRight']=Window_Selectable['prototype'][_0xc9b14(0x19e)],Window_Selectable[_0xc9b14(0xbe)][_0xc9b14(0x19e)]=function(_0x3f75c8){const _0x15c0fa=_0xc9b14;this['ftbFreeRangeSwitch']()&&this[_0x15c0fa(0x1f5)]()===0x1?this[_0x15c0fa(0x25f)](!![]):VisuMZ[_0x15c0fa(0x19d)]['Window_Selectable_cursorRight']['call'](this,_0x3f75c8);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x252)]=Window_Selectable[_0xc9b14(0xbe)][_0xc9b14(0x139)],Window_Selectable[_0xc9b14(0xbe)][_0xc9b14(0x139)]=function(_0x5edd79){const _0x156981=_0xc9b14;this[_0x156981(0x1d3)]()&&this[_0x156981(0x1f5)]()===0x1?'iUkkU'!==_0x156981(0x156)?this[_0x156981(0x25f)](![]):(_0x5a77ca['BattleSystemFTB'][_0x156981(0x80)][_0x156981(0x195)](this,_0x298509,_0x1b069f),this[_0x156981(0x1bb)]()['recalculateActionsFTB']()):VisuMZ[_0x156981(0x19d)][_0x156981(0x252)][_0x156981(0x195)](this,_0x5edd79);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0xcb)]=Window_Selectable[_0xc9b14(0xbe)][_0xc9b14(0x14d)],Window_Selectable[_0xc9b14(0xbe)]['cursorPagedown']=function(){const _0x35ac85=_0xc9b14;this['ftbFreeRangeSwitch']()?_0x35ac85(0x151)==='kzWXG'?this[_0x35ac85(0x198)]():this[_0x35ac85(0x25f)](!![]):VisuMZ[_0x35ac85(0x19d)]['Window_Selectable_cursorPagedown'][_0x35ac85(0x195)](this);},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x97)]=Window_Selectable['prototype'][_0xc9b14(0x208)],Window_Selectable['prototype'][_0xc9b14(0x208)]=function(){const _0x7f3102=_0xc9b14;if(this[_0x7f3102(0x1d3)]()){if('UvBVn'!=='UvBVn')return 0x0;else this[_0x7f3102(0x25f)](![]);}else _0x7f3102(0xd4)===_0x7f3102(0x215)?(this['_subject']&&(!this[_0x7f3102(0x15f)][_0x7f3102(0x1b5)](this[_0x7f3102(0x25c)])&&this[_0x7f3102(0x15f)]['unshift'](this['_subject'])),this[_0x7f3102(0x25c)]=this[_0x7f3102(0x18c)]()):VisuMZ['BattleSystemFTB'][_0x7f3102(0x97)][_0x7f3102(0x195)](this);},Window_ActorCommand[_0xc9b14(0xbe)][_0xc9b14(0x25f)]=function(_0x1d5cba){const _0x510219=_0xc9b14,_0x26c81e=BattleManager[_0x510219(0x90)];let _0x2b2a34=$gameParty[_0x510219(0x11e)]()[_0x510219(0x190)](_0x26c81e);const _0x31be83=$gameParty['battleMembers']()[_0x510219(0x212)]-0x1;let _0x1a9d99=$gameParty['battleMembers']()[_0x2b2a34];for(;;){_0x2b2a34+=_0x1d5cba?0x1:-0x1;if(_0x2b2a34<0x0)_0x2b2a34=_0x31be83;if(_0x2b2a34>_0x31be83)_0x2b2a34=0x0;_0x1a9d99=$gameParty[_0x510219(0x11e)]()[_0x2b2a34];if(_0x1a9d99&&_0x1a9d99[_0x510219(0x137)]()&&!_0x1a9d99[_0x510219(0x1a8)]())break;if(_0x1a9d99===_0x26c81e)break;}this[_0x510219(0xd8)](_0x26c81e,_0x1a9d99);},Window_ActorCommand[_0xc9b14(0xbe)][_0xc9b14(0xd8)]=function(_0xb797a,_0x96d6dc){const _0x32b22a=_0xc9b14;if(_0xb797a===_0x96d6dc)return;if(_0xb797a['battler']())_0xb797a[_0x32b22a(0x1bc)]()[_0x32b22a(0x1d1)]();this['playCursorSound'](),BattleManager[_0x32b22a(0x25c)]=_0x96d6dc,BattleManager['_currentActor']=_0x96d6dc,BattleManager[_0x32b22a(0xda)](),SceneManager['_scene'][_0x32b22a(0xf1)]();},VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x1ab)]=Window_Selectable[_0xc9b14(0xbe)][_0xc9b14(0xf5)],Window_Selectable[_0xc9b14(0xbe)][_0xc9b14(0xf5)]=function(){const _0x4c6ae7=_0xc9b14;if(BattleManager['isFTB']()&&BattleManager['_FTB_FREE_CHANGE']&&this[_0x4c6ae7(0xad)]===Window_BattleStatus)this[_0x4c6ae7(0x267)]();else{if(_0x4c6ae7(0x255)===_0x4c6ae7(0x255))VisuMZ[_0x4c6ae7(0x19d)]['Window_Selectable_processTouch'][_0x4c6ae7(0x195)](this);else{if(this[_0x4c6ae7(0x241)]())return!![];return _0x341df2['BattleSystemFTB'][_0x4c6ae7(0x178)][_0x4c6ae7(0x195)](this);}}},Window_BattleStatus[_0xc9b14(0xbe)][_0xc9b14(0x267)]=function(){const _0x464527=_0xc9b14;this[_0x464527(0xa3)]()&&(_0x464527(0x177)===_0x464527(0x177)?TouchInput[_0x464527(0x99)]()&&this[_0x464527(0xa0)](!![]):_0x12704f=_0x246576[_0x464527(0x194)](_0x13841a));},Window_BattleStatus[_0xc9b14(0xbe)][_0xc9b14(0xa0)]=function(_0x41b852){const _0x19a511=_0xc9b14,_0x2e1268=SceneManager['_scene'][_0x19a511(0x22a)];if(!_0x2e1268)return;if(!_0x2e1268[_0x19a511(0x269)])return;this[_0x19a511(0xc2)]=![];const _0x3e7041=this[_0x19a511(0x24c)](),_0x15520f=this[_0x19a511(0xf3)]();if(_0x15520f>=0x0){const _0x27491b=$gameParty[_0x19a511(0x11e)]()[_0x3e7041],_0x245fe1=$gameParty[_0x19a511(0x11e)]()[_0x15520f];if(this[_0x19a511(0x185)](_0x245fe1)){if(_0x15520f===this[_0x19a511(0x24c)]()){if(_0x19a511(0xaa)==='BAPGN'){const _0x34f672=_0x235508[_0x19a511(0x8e)];let _0x273d8b=_0x34f672[_0x19a511(0x18a)];const _0x1e4928=_0x1fac13[_0x19a511(0xa8)]('IconSet'),_0x5a657f=_0xbbc31f[_0x19a511(0x1c0)],_0x4320c2=_0x49ccf9[_0x19a511(0x12b)],_0x5f467a=_0x1f53ec%0x10*_0x5a657f,_0x30b599=_0xb8060a[_0x19a511(0x113)](_0x1048c5/0x10)*_0x4320c2;this[_0x19a511(0x100)]['_context'][_0x19a511(0x250)]=_0x34f672['IconSmoothing'],this[_0x19a511(0x100)][_0x19a511(0xd9)](_0x1e4928,_0x5f467a,_0x30b599,_0x5a657f,_0x4320c2,_0x1e5078,_0x2baefe,_0x273d8b,_0x273d8b),this[_0x19a511(0x100)][_0x19a511(0x1f2)]['imageSmoothingEnabled']=!![];}else this[_0x19a511(0xc2)]=!![];}this['select'](_0x15520f),_0x2e1268[_0x19a511(0xd8)](_0x27491b,_0x245fe1);}}},Window_BattleStatus['prototype'][_0xc9b14(0x185)]=function(_0x3ad92f){const _0x55400b=_0xc9b14;if(!_0x3ad92f)return![];if(!_0x3ad92f[_0x55400b(0x18d)]())return![];if(!_0x3ad92f[_0x55400b(0x137)]())return![];if(_0x3ad92f[_0x55400b(0x1a8)]())return![];return!![];};function Window_FTB_ActionCount(){const _0x12d8d7=_0xc9b14;this[_0x12d8d7(0xe4)](...arguments);}Window_FTB_ActionCount[_0xc9b14(0xbe)]=Object[_0xc9b14(0x1e3)](Window_Base[_0xc9b14(0xbe)]),Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0xad)]=Window_FTB_ActionCount,Window_FTB_ActionCount[_0xc9b14(0x8e)]=VisuMZ[_0xc9b14(0x19d)][_0xc9b14(0x8e)][_0xc9b14(0xc1)],Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0xe4)]=function(){const _0x969300=_0xc9b14,_0x488170=this['windowRect']();Window_Base['prototype'][_0x969300(0xe4)]['call'](this,_0x488170),this[_0x969300(0x87)](0x0),this['initMembers'](),this[_0x969300(0x271)]=0x0;},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0xc5)]=function(){const _0x245627=_0xc9b14;return new Rectangle(0x0,0x0,Graphics[_0x245627(0x24f)],Graphics[_0x245627(0x222)]);},Window_FTB_ActionCount['prototype']['initMembers']=function(){const _0x5ba0e7=_0xc9b14;this[_0x5ba0e7(0x1fa)]=null,this[_0x5ba0e7(0x214)]=0x0,this[_0x5ba0e7(0x24b)]=0x0;const _0x2b0c2b=Window_FTB_ActionCount[_0x5ba0e7(0x8e)];this[_0x5ba0e7(0x172)]={'ActorPicture':_0x2b0c2b[_0x5ba0e7(0xa5)]?ImageManager[_0x5ba0e7(0x254)](_0x2b0c2b['ActorActionPicture']):'','EnemyPicture':_0x2b0c2b[_0x5ba0e7(0x11a)]?ImageManager[_0x5ba0e7(0x254)](_0x2b0c2b[_0x5ba0e7(0x11a)]):'','EmptyPicture':_0x2b0c2b[_0x5ba0e7(0x237)]?ImageManager['loadPicture'](_0x2b0c2b[_0x5ba0e7(0x237)]):''};},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0x8f)]=function(){const _0x400388=_0xc9b14;this[_0x400388(0x7b)]=0x0;},Window_FTB_ActionCount[_0xc9b14(0xbe)]['setUnit']=function(_0x1ba387){const _0x3799b9=_0xc9b14;this[_0x3799b9(0x1fa)]=_0x1ba387,this[_0x3799b9(0x204)]();},Window_FTB_ActionCount[_0xc9b14(0xbe)]['update']=function(){const _0x3e227e=_0xc9b14;Window_Base[_0x3e227e(0xbe)][_0x3e227e(0x204)][_0x3e227e(0x195)](this),this[_0x3e227e(0x1ec)](),this[_0x3e227e(0xe3)](),this[_0x3e227e(0x22f)]();},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0x1ec)]=function(){const _0x41e5e7=_0xc9b14;if(!this[_0x41e5e7(0x1fa)])return;(this[_0x41e5e7(0x214)]!==this[_0x41e5e7(0x1fa)]['getCurrentActionsFTB']()||this[_0x41e5e7(0x24b)]!==this[_0x41e5e7(0x1fa)]['getMaxActionsFTB']())&&(_0x41e5e7(0x79)!=='XJsRC'?this[_0x41e5e7(0x1d3)]()?this[_0x41e5e7(0x25f)](![]):_0x187056[_0x41e5e7(0x19d)]['Window_Selectable_cursorPageup']['call'](this):(this[_0x41e5e7(0x214)]=this[_0x41e5e7(0x1fa)][_0x41e5e7(0x19b)](),this[_0x41e5e7(0x24b)]=this['_unit'][_0x41e5e7(0xb9)](),this[_0x41e5e7(0x13b)]()));},Window_FTB_ActionCount[_0xc9b14(0xbe)]['updateVisibility']=function(){const _0x228f90=_0xc9b14;this[_0x228f90(0x21e)]=$gameSystem['isBattleSystemFTBActionCountVisible']();},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0x13b)]=function(){const _0x231e2b=_0xc9b14;this[_0x231e2b(0x100)][_0x231e2b(0x168)]();if(!this[_0x231e2b(0x1fa)])return;const _0x3f6084=Window_FTB_ActionCount['Settings'];if(!_0x3f6084)return;const _0x4a45bb=this[_0x231e2b(0x20c)](),_0x1d0eb4=this[_0x231e2b(0xb3)](),_0x4019fb=_0x3f6084[_0x231e2b(0x18a)]+_0x3f6084[_0x231e2b(0x1fc)],_0x1855bf=_0x3f6084[_0x231e2b(0xb2)];let _0x260a9a=_0x4a45bb['x'],_0x319464=_0x4a45bb['y'];while(_0x1d0eb4[_0x231e2b(0x212)]>_0x3f6084[_0x231e2b(0x14b)]){_0x1d0eb4[_0x231e2b(0x9d)]();}while(_0x1d0eb4[_0x231e2b(0x212)]>0x0){const _0x3488fa=_0x1d0eb4[_0x231e2b(0x9d)]();this[_0x231e2b(0x159)](_0x3488fa,_0x260a9a,_0x319464,_0x1d0eb4[_0x231e2b(0x212)]);if(_0x1855bf){if(_0x231e2b(0xa6)!==_0x231e2b(0xa6))return _0x24fbb5?_0x2b5b40===0x0:_0x1e4971===_0x436e73[_0x231e2b(0x14b)]-0x1;else _0x260a9a+=_0x4019fb;}else _0x319464+=_0x4019fb;}},Window_FTB_ActionCount[_0xc9b14(0xbe)]['createStartingCoordinates']=function(){const _0x30a7a4=_0xc9b14,_0xa15485=Window_FTB_ActionCount[_0x30a7a4(0x8e)],_0xe0e44c=this[_0x30a7a4(0x1fa)]===$gameParty,_0x54baa2=_0xa15485['ImageSize'],_0xc6fe42=_0x54baa2*(_0xa15485[_0x30a7a4(0x14b)]-0x1)+_0xa15485[_0x30a7a4(0x1fc)]*(_0xa15485[_0x30a7a4(0x14b)]-0x2),_0x35fc98=_0xa15485[_0x30a7a4(0xb2)],_0x3c3925=SceneManager[_0x30a7a4(0x1d2)][_0x30a7a4(0x260)][_0x30a7a4(0x222)];let _0x23e0ba=0x0,_0x187a28=0x0;const _0x1d5d2d=_0xa15485[_0x30a7a4(0x127)];if(_0x1d5d2d){_0x187a28=this[_0x30a7a4(0x1e7)]-_0x3c3925-_0xa15485['ScreenBufferY']-_0x54baa2,_0x23e0ba=_0xe0e44c?this[_0x30a7a4(0xe6)]-_0xa15485[_0x30a7a4(0x1c3)]-_0x54baa2:_0xa15485['ScreenBufferX'];if(_0x35fc98&&_0xe0e44c)_0x23e0ba-=_0xc6fe42;else!_0x35fc98&&(_0x187a28-=_0xc6fe42);}else'bNpZB'==='bNpZB'?(_0x187a28=_0xa15485[_0x30a7a4(0xcf)],_0x23e0ba=_0xe0e44c?this[_0x30a7a4(0xe6)]-_0xa15485[_0x30a7a4(0x1c3)]-_0x54baa2:_0xa15485[_0x30a7a4(0x1c3)],_0x35fc98&&_0xe0e44c&&(_0x23e0ba-=_0xc6fe42)):_0x120348[_0x30a7a4(0x19d)]['BattleManager_processTurn'][_0x30a7a4(0x195)](this);return _0x23e0ba+=_0xe0e44c?_0xa15485[_0x30a7a4(0x14e)]:_0xa15485[_0x30a7a4(0x1d4)],_0x187a28+=_0xe0e44c?_0xa15485[_0x30a7a4(0x14e)]:_0xa15485[_0x30a7a4(0x1ae)],new Point(Math[_0x30a7a4(0x11d)](_0x23e0ba),Math['round'](_0x187a28));},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0xb3)]=function(){const _0x5d8822=_0xc9b14,_0xcfe017=Window_FTB_ActionCount[_0x5d8822(0x8e)];let _0x4fa5f2=!![];if(_0xcfe017[_0x5d8822(0xb2)]){if(_0x5d8822(0x78)!==_0x5d8822(0x1a7)){if(this[_0x5d8822(0x1fa)]===$gameParty)_0x4fa5f2=!_0x4fa5f2;}else _0x90ef1a[_0x5d8822(0x19d)]['BattleManager_startBattle']['call'](this),this['startBattleFTB']();}else _0x5d8822(0x1be)!==_0x5d8822(0xc7)?_0x4fa5f2=!_0xcfe017[_0x5d8822(0x127)]:_0x2021a5[_0x5d8822(0xba)](_0x28d59b);let _0x501130=this[_0x5d8822(0x1fa)][_0x5d8822(0x19b)](),_0x4ca530=Math[_0x5d8822(0x211)](0x0,this[_0x5d8822(0x1fa)]['getMaxActionsFTB']()-_0x501130);const _0x4a4550=[];while(_0x501130--){if(_0x5d8822(0x21f)===_0x5d8822(0x21f)){const _0x22b440=_0x5d8822(0x235);_0x4a4550[_0x5d8822(0xba)](_0x22b440);}else{if(_0x57ea50[_0x5d8822(0x241)]()){if(this[_0x5d8822(0x1bc)]())this['battler']()[_0x5d8822(0x94)]();return![];}return _0x360eb8[_0x5d8822(0x19d)]['Game_Actor_selectNextCommand'][_0x5d8822(0x195)](this);}}while(_0x4ca530--){const _0xb229b5=_0x5d8822(0x77);if(_0x4fa5f2){if('BgCax'===_0x5d8822(0xb6)){this[_0x5d8822(0x121)]();const _0x289c49=_0x456a7b['ItemsEquipsCore'][_0x5d8822(0x8e)][_0x5d8822(0x187)];this[_0x5d8822(0x100)][_0x5d8822(0x197)]=_0x289c49[_0x5d8822(0x1e2)];if(_0x56752b){const _0xd7187c=_0x289c49[_0x5d8822(0xaf)],_0x445ae1=_0xd7187c[_0x5d8822(0x130)](_0x32079d[_0x5d8822(0x8d)](_0x2b4120)),_0x2f89f3=this[_0x5d8822(0x9f)](_0x445ae1+this[_0x5d8822(0x205)]());_0x2e2498-=_0x2f89f3;}else _0x527cfe-=this[_0x5d8822(0x9f)](this['skillCostSeparator']())+_0x3236b5;_0x5fd488[_0x5d8822(0x19d)]['Window_Base_drawItemNumber'][_0x5d8822(0x195)](this,_0x2f4793,_0x5ec69d,_0x221f26,_0x26c3ea);}else _0x4a4550[_0x5d8822(0xba)](_0xb229b5);}else{if(_0x5d8822(0x1c5)===_0x5d8822(0x1c5))_0x4a4550['unshift'](_0xb229b5);else{if(this['isFTB']())this[_0x5d8822(0x1a0)]=![];_0x3c2f7c[_0x5d8822(0x19d)]['BattleManager_startInput']['call'](this);if(this['isFTB']()&&_0x138dfe[_0x5d8822(0x137)]())this[_0x5d8822(0xa1)]();}}}while(_0x4a4550[_0x5d8822(0x212)]<0xa){const _0x25ace1='Nothing';_0x4fa5f2?_0x4a4550[_0x5d8822(0xba)](_0x25ace1):_0x5d8822(0x257)===_0x5d8822(0x257)?_0x4a4550[_0x5d8822(0x262)](_0x25ace1):(_0x2fe1f8=_0x100b75[_0x5d8822(0xcf)],_0x4934bb=_0x55231f?this['innerWidth']-_0x11f471['ScreenBufferX']-_0x394a01:_0x18588f[_0x5d8822(0x1c3)],_0x14a797&&_0x49cbcf&&(_0x11470b-=_0x1ce535));}return _0x4a4550;},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0x159)]=function(_0x12bc18,_0x25973e,_0x5d4f93,_0xaa8cb){const _0x520c81=_0xc9b14;if(_0x12bc18===_0x520c81(0xa9))return;if(_0x12bc18===_0x520c81(0x235))_0x12bc18=this['_unit']===$gameParty?_0x520c81(0xe7):_0x520c81(0xde);const _0x41ab5d=Window_FTB_ActionCount[_0x520c81(0x8e)];if(_0x41ab5d[_0x520c81(0xb8)[_0x520c81(0x130)](_0x12bc18)]){const _0x32c125=_0x41ab5d['%1ActionPicture'[_0x520c81(0x130)](_0x12bc18)],_0x2e3399=ImageManager['loadPicture'](_0x32c125);_0x2e3399[_0x520c81(0x221)](this['drawPicture']['bind'](this,_0x2e3399,_0x25973e,_0x5d4f93,_0xaa8cb));}else{const _0xe03cc5=ImageManager['ftb%1ActionsIcon'['format'](_0x12bc18)];this[_0x520c81(0x165)](_0xe03cc5,_0x25973e,_0x5d4f93),this['canDrawActionsRemaining'](_0xaa8cb)&&this['drawActionsRemaining'](_0x25973e,_0x5d4f93);}},Window_FTB_ActionCount[_0xc9b14(0xbe)]['drawPicture']=function(_0x533dcf,_0x3b84f0,_0x35d587,_0x56bbc5){const _0x14c4b2=_0xc9b14;if(!_0x533dcf)return;const _0x57eded=Window_FTB_ActionCount[_0x14c4b2(0x8e)],_0x2557a2=_0x57eded['ImageSize'],_0x4c6f10=_0x2557a2/_0x533dcf[_0x14c4b2(0x24f)],_0x5cae54=_0x2557a2/_0x533dcf[_0x14c4b2(0x222)],_0x150380=Math[_0x14c4b2(0x1b9)](_0x4c6f10,_0x5cae54,0x1),_0x4f8603=_0x533dcf[_0x14c4b2(0x222)],_0x3867f0=_0x533dcf[_0x14c4b2(0x222)],_0x281d91=Math['round'](_0x4f8603*_0x150380),_0x27aa89=Math[_0x14c4b2(0x11d)](_0x3867f0*_0x150380),_0x11d3b2=Math[_0x14c4b2(0x11d)](_0x3b84f0+(_0x2557a2-_0x281d91)/0x2),_0x14c4e6=Math['round'](_0x35d587+(_0x2557a2-_0x27aa89)/0x2);this[_0x14c4b2(0x100)]['_context']['imageSmoothingEnabled']=_0x57eded[_0x14c4b2(0x13d)],this[_0x14c4b2(0x100)][_0x14c4b2(0xd9)](_0x533dcf,0x0,0x0,_0x4f8603,_0x3867f0,_0x11d3b2,_0x14c4e6,_0x281d91,_0x27aa89),this[_0x14c4b2(0x100)][_0x14c4b2(0x1f2)][_0x14c4b2(0x250)]=!![],this[_0x14c4b2(0x23e)](_0x56bbc5)&&this[_0x14c4b2(0x1a9)](_0x3b84f0,_0x35d587);},Window_FTB_ActionCount['prototype'][_0xc9b14(0x165)]=function(_0x49281f,_0x4f7c0c,_0x4189ff){const _0x4d001d=_0xc9b14,_0x5362b0=Window_FTB_ActionCount[_0x4d001d(0x8e)];let _0x241eb9=_0x5362b0['ImageSize'];const _0x42105a=ImageManager[_0x4d001d(0xa8)]('IconSet'),_0x4b570d=ImageManager[_0x4d001d(0x1c0)],_0x1f6dd7=ImageManager[_0x4d001d(0x12b)],_0x2703e1=_0x49281f%0x10*_0x4b570d,_0x26e49e=Math[_0x4d001d(0x113)](_0x49281f/0x10)*_0x1f6dd7;this[_0x4d001d(0x100)][_0x4d001d(0x1f2)]['imageSmoothingEnabled']=_0x5362b0[_0x4d001d(0xf8)],this[_0x4d001d(0x100)][_0x4d001d(0xd9)](_0x42105a,_0x2703e1,_0x26e49e,_0x4b570d,_0x1f6dd7,_0x4f7c0c,_0x4189ff,_0x241eb9,_0x241eb9),this[_0x4d001d(0x100)][_0x4d001d(0x1f2)][_0x4d001d(0x250)]=!![];},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0xe3)]=function(){const _0x5855e1=_0xc9b14,_0x319163=Window_FTB_ActionCount['Settings'];if(_0x319163[_0x5855e1(0x127)])return;if(!_0x319163[_0x5855e1(0x1c4)])return;const _0x1cd9be=SceneManager[_0x5855e1(0x1d2)][_0x5855e1(0x229)];if(!_0x1cd9be)return;if(_0x1cd9be['visible'])this['x']=_0x319163['RepositionTopHelpX']||0x0,this['y']=_0x319163[_0x5855e1(0x10a)]||0x0;else{if('rAofk'!==_0x5855e1(0x124)){let _0x32ef9b=_0xced4e0['name']();_0x2eb0a8=_0x14bfe1[_0x5855e1(0x88)][_0x5855e1(0x130)](_0x32ef9b);}else this['x']=0x0,this['y']=0x0;}},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0x23e)]=function(_0x533fce){const _0x4fe8db=_0xc9b14,_0xdeb9b=Window_FTB_ActionCount[_0x4fe8db(0x8e)];if(!_0xdeb9b[_0x4fe8db(0xee)])return![];const _0x36dd77=_0xdeb9b['BottomPosition'],_0x3131d2=_0xdeb9b[_0x4fe8db(0xb2)],_0x5e9476=this['_unit']===$gameParty;if(_0x3131d2)return _0x5e9476?_0x533fce===0x0:_0x533fce===_0xdeb9b[_0x4fe8db(0x14b)]-0x1;else return _0x36dd77?_0x533fce===0x0:_0x533fce===_0xdeb9b[_0x4fe8db(0x14b)]-0x1;},Window_FTB_ActionCount[_0xc9b14(0xbe)][_0xc9b14(0x1a9)]=function(_0x13b586,_0x45ed4f){const _0x369d84=_0xc9b14;this[_0x369d84(0x121)]();const _0x27e6a7=Window_FTB_ActionCount[_0x369d84(0x8e)],_0x23082f=new Rectangle(_0x13b586,_0x45ed4f,_0x27e6a7['ImageSize'],_0x27e6a7['ImageSize']);_0x23082f['x']+=_0x27e6a7['ActionsRemainingOffsetX'],_0x23082f['y']+=_0x27e6a7[_0x369d84(0x136)];const _0x5d9b8=this[_0x369d84(0x1fa)][_0x369d84(0x19b)]();this[_0x369d84(0x100)][_0x369d84(0x197)]=_0x27e6a7[_0x369d84(0x1a6)],this[_0x369d84(0x100)][_0x369d84(0x16e)](_0x5d9b8,_0x23082f['x'],_0x23082f['y'],_0x23082f[_0x369d84(0x24f)],_0x23082f[_0x369d84(0x222)],_0x369d84(0x245)),this[_0x369d84(0x121)]();};