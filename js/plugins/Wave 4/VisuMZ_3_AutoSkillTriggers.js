//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.11] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * Battle System - FTB
 * Battle System - ETB
 * Battle System - PTB
 * 
 * These battle systems are incompatible with Auto Skill Triggers. This is due
 * to their turn structures, making them highly incompatible with the way that
 * Auto Skill Triggers work.
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
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
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
 * Version 1.11: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 16, 2021
 * * Compatibility Update!
 * ** Auto Skill Triggers is now disabled with the following battle systems:
 *    ETB, FTB, and PTB. This is due to the way their turn structures work,
 *    making them highly incompatible with one another.
 * ** We may revisit this in the future, but for now, Auto Skill Triggers are
 *    to be disabled by code when any of the battle systems are detected.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section.
 * 
 * Version 1.09: June 25, 2021
 * * Feature Update!
 * ** Added failsafe for those using illegal syntax charactes inside of their
 *    database type names which conflict with notetag creation. Fix by Irina.
 * 
 * Version 1.08: March 19, 2021
 * * Bug Fixes!
 * ** Death Triggers that cannot be used will no longer cause the battler to
 *    become immortal. Fix made by Irina.
 * 
 * Version 1.07: March 12, 2021
 * * Bug Fixes!
 * ** Battle Start auto-triggers should now work properly for actors when using
 *    auto-skills set up to be battle screen only. Fix made by Irina.
 * 
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

function _0x461f(_0x5132de,_0x5ec5de){const _0x4efd25=_0x4efd();return _0x461f=function(_0x461f92,_0x3e9f3e){_0x461f92=_0x461f92-0x142;let _0x3eab63=_0x4efd25[_0x461f92];return _0x3eab63;},_0x461f(_0x5132de,_0x5ec5de);}const _0x256cf3=_0x461f;(function(_0x2cd4df,_0x4bee26){const _0x56e3f0=_0x461f,_0x4b6efc=_0x2cd4df();while(!![]){try{const _0x41d614=parseInt(_0x56e3f0(0x168))/0x1+-parseInt(_0x56e3f0(0x143))/0x2+-parseInt(_0x56e3f0(0x163))/0x3*(parseInt(_0x56e3f0(0x1cc))/0x4)+-parseInt(_0x56e3f0(0x1f1))/0x5+-parseInt(_0x56e3f0(0x1cf))/0x6+-parseInt(_0x56e3f0(0x1c5))/0x7+parseInt(_0x56e3f0(0x1f3))/0x8;if(_0x41d614===_0x4bee26)break;else _0x4b6efc['push'](_0x4b6efc['shift']());}catch(_0x3fb8bf){_0x4b6efc['push'](_0x4b6efc['shift']());}}}(_0x4efd,0x4fffc));var label='AutoSkillTriggers',tier=tier||0x0,dependencies=[_0x256cf3(0x175)],pluginData=$plugins['filter'](function(_0x455de7){const _0x53e41b=_0x256cf3;return _0x455de7[_0x53e41b(0x19b)]&&_0x455de7['description'][_0x53e41b(0x1cd)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x256cf3(0x1dd)]=function(_0x2ffa84,_0x15d431){const _0x592dd5=_0x256cf3;for(const _0x2b1994 in _0x15d431){if(_0x2b1994[_0x592dd5(0x181)](/(.*):(.*)/i)){const _0x553153=String(RegExp['$1']),_0x478146=String(RegExp['$2'])[_0x592dd5(0x1e6)]()[_0x592dd5(0x1a3)]();let _0x2c8408,_0x2a0b1f,_0x31319e;switch(_0x478146){case'NUM':_0x2c8408=_0x15d431[_0x2b1994]!==''?Number(_0x15d431[_0x2b1994]):0x0;break;case'ARRAYNUM':_0x2a0b1f=_0x15d431[_0x2b1994]!==''?JSON[_0x592dd5(0x144)](_0x15d431[_0x2b1994]):[],_0x2c8408=_0x2a0b1f[_0x592dd5(0x1b4)](_0x343918=>Number(_0x343918));break;case _0x592dd5(0x18e):_0x2c8408=_0x15d431[_0x2b1994]!==''?eval(_0x15d431[_0x2b1994]):null;break;case _0x592dd5(0x1af):_0x2a0b1f=_0x15d431[_0x2b1994]!==''?JSON[_0x592dd5(0x144)](_0x15d431[_0x2b1994]):[],_0x2c8408=_0x2a0b1f[_0x592dd5(0x1b4)](_0x3a22c4=>eval(_0x3a22c4));break;case _0x592dd5(0x1ca):_0x2c8408=_0x15d431[_0x2b1994]!==''?JSON[_0x592dd5(0x144)](_0x15d431[_0x2b1994]):'';break;case _0x592dd5(0x201):_0x2a0b1f=_0x15d431[_0x2b1994]!==''?JSON['parse'](_0x15d431[_0x2b1994]):[],_0x2c8408=_0x2a0b1f['map'](_0x5339d2=>JSON[_0x592dd5(0x144)](_0x5339d2));break;case _0x592dd5(0x169):_0x2c8408=_0x15d431[_0x2b1994]!==''?new Function(JSON[_0x592dd5(0x144)](_0x15d431[_0x2b1994])):new Function(_0x592dd5(0x192));break;case _0x592dd5(0x20f):_0x2a0b1f=_0x15d431[_0x2b1994]!==''?JSON[_0x592dd5(0x144)](_0x15d431[_0x2b1994]):[],_0x2c8408=_0x2a0b1f[_0x592dd5(0x1b4)](_0xc983bc=>new Function(JSON['parse'](_0xc983bc)));break;case _0x592dd5(0x19a):_0x2c8408=_0x15d431[_0x2b1994]!==''?String(_0x15d431[_0x2b1994]):'';break;case _0x592dd5(0x1a2):_0x2a0b1f=_0x15d431[_0x2b1994]!==''?JSON[_0x592dd5(0x144)](_0x15d431[_0x2b1994]):[],_0x2c8408=_0x2a0b1f['map'](_0x4b582f=>String(_0x4b582f));break;case _0x592dd5(0x16c):_0x31319e=_0x15d431[_0x2b1994]!==''?JSON['parse'](_0x15d431[_0x2b1994]):{},_0x2c8408=VisuMZ[_0x592dd5(0x1dd)]({},_0x31319e);break;case _0x592dd5(0x1ed):_0x2a0b1f=_0x15d431[_0x2b1994]!==''?JSON[_0x592dd5(0x144)](_0x15d431[_0x2b1994]):[],_0x2c8408=_0x2a0b1f['map'](_0x5cbcd5=>VisuMZ[_0x592dd5(0x1dd)]({},JSON[_0x592dd5(0x144)](_0x5cbcd5)));break;default:continue;}_0x2ffa84[_0x553153]=_0x2c8408;}}return _0x2ffa84;},(_0x18ff88=>{const _0x3d14ac=_0x256cf3,_0x19a5f1=_0x18ff88['name'];for(const _0x1692f4 of dependencies){if(_0x3d14ac(0x14d)!==_0x3d14ac(0x172)){if(!Imported[_0x1692f4]){if(_0x3d14ac(0x1a1)===_0x3d14ac(0x1f9))_0x50f4d4[_0x3d14ac(0x1cb)](_0x3d14ac(0x17d)),_0x598435[_0x3d14ac(0x1cb)](_0x3d14ac(0x161)[_0x3d14ac(0x1b8)](_0x2033be,_0xbf1d3d)),_0x5367f8[_0x3d14ac(0x1cb)](_0x3d14ac(0x215)),_0x2fa390[_0x3d14ac(0x1cb)](_0x3d14ac(0x16e));else{alert(_0x3d14ac(0x15e)[_0x3d14ac(0x1b8)](_0x19a5f1,_0x1692f4)),SceneManager[_0x3d14ac(0x1d6)]();break;}}}else _0x1a8c82(_0x3d14ac(0x217)[_0x3d14ac(0x1b8)](_0x5ba9ef,_0x47e4c0,_0x5e46c8)),_0x6b35b1[_0x3d14ac(0x1d6)]();}const _0x35ae38=_0x18ff88[_0x3d14ac(0x1d3)];if(_0x35ae38['match'](/\[Version[ ](.*?)\]/i)){const _0x5530a0=Number(RegExp['$1']);_0x5530a0!==VisuMZ[label][_0x3d14ac(0x20b)]&&(alert(_0x3d14ac(0x1f0)[_0x3d14ac(0x1b8)](_0x19a5f1,_0x5530a0)),SceneManager[_0x3d14ac(0x1d6)]());}if(_0x35ae38[_0x3d14ac(0x181)](/\[Tier[ ](\d+)\]/i)){const _0x113640=Number(RegExp['$1']);if(_0x113640<tier){if(_0x3d14ac(0x209)===_0x3d14ac(0x1bf)){const _0x4a5cd1=_0x5a78ac(_0x48d417['$1']);_0x4a5cd1<_0x50abc5?(_0x299e4f(_0x3d14ac(0x217)['format'](_0xce3259,_0x4a5cd1,_0x3078e4)),_0x47afe9[_0x3d14ac(0x1d6)]()):_0x495c6d=_0x12e66e[_0x3d14ac(0x1eb)](_0x4a5cd1,_0x3dbdfa);}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x19a5f1,_0x113640,tier)),SceneManager[_0x3d14ac(0x1d6)]();}else tier=Math['max'](_0x113640,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x3d14ac(0x19f)],_0x18ff88[_0x3d14ac(0x20d)]);})(pluginData),VisuMZ[_0x256cf3(0x211)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x256cf3(0x214)][_0x256cf3(0x222)],Scene_Boot[_0x256cf3(0x214)][_0x256cf3(0x222)]=function(){const _0x2940b6=_0x256cf3;VisuMZ[_0x2940b6(0x211)][_0x2940b6(0x164)][_0x2940b6(0x158)](this),this[_0x2940b6(0x1fc)]();},Scene_Boot[_0x256cf3(0x214)][_0x256cf3(0x1fc)]=function(){const _0x3053c6=_0x256cf3;VisuMZ[_0x3053c6(0x211)]['CreateNotetags']();},VisuMZ[_0x256cf3(0x211)][_0x256cf3(0x206)]={},VisuMZ[_0x256cf3(0x211)]['CreateNotetags']=function(){const _0x39ab46=_0x256cf3;let _0xbf3179=[[_0x39ab46(0x146),_0x39ab46(0x1ba)],[_0x39ab46(0x14f),_0x39ab46(0x178)],['Ally','ALLY'],[_0x39ab46(0x1e7),_0x39ab46(0x167)],[_0x39ab46(0x196),_0x39ab46(0x1dc)],[_0x39ab46(0x1d2),_0x39ab46(0x216)],[_0x39ab46(0x173),_0x39ab46(0x18c)]],_0x530f58=[[_0x39ab46(0x199),_0x39ab46(0x14b)],[_0x39ab46(0x1e4),_0x39ab46(0x18a)],[_0x39ab46(0x1ee),_0x39ab46(0x1da)]];for(const _0x31cd49 of _0xbf3179){if(!_0x31cd49)continue;_0x530f58[_0x39ab46(0x1fd)](['on%1Attack'[_0x39ab46(0x1b8)](_0x31cd49[0x0]),_0x39ab46(0x20c)[_0x39ab46(0x1b8)](_0x31cd49[0x1])]),_0x530f58[_0x39ab46(0x1fd)](['on%1Guard'[_0x39ab46(0x1b8)](_0x31cd49[0x0]),_0x39ab46(0x15a)[_0x39ab46(0x1b8)](_0x31cd49[0x1])]),_0x530f58[_0x39ab46(0x1fd)](['on%1Item'['format'](_0x31cd49[0x0]),_0x39ab46(0x16f)[_0x39ab46(0x1b8)](_0x31cd49[0x1])]),_0x530f58[_0x39ab46(0x1fd)]([_0x39ab46(0x198)[_0x39ab46(0x1b8)](_0x31cd49[0x0]),'(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)'[_0x39ab46(0x1b8)](_0x31cd49[0x1])]),_0x530f58[_0x39ab46(0x1fd)]([_0x39ab46(0x21f)['format'](_0x31cd49[0x0]),_0x39ab46(0x1c0)[_0x39ab46(0x1b8)](_0x31cd49[0x1])]),_0x530f58[_0x39ab46(0x1fd)]([_0x39ab46(0x1bd)[_0x39ab46(0x1b8)](_0x31cd49[0x0]),_0x39ab46(0x1d9)[_0x39ab46(0x1b8)](_0x31cd49[0x1])]);}for(const _0x112671 of $dataSystem[_0x39ab46(0x1bc)]){if(!_0x112671)continue;let _0x1de365=DataManager[_0x39ab46(0x14e)](_0x112671);for(const _0x5b99f1 of _0xbf3179){if(!_0x5b99f1)continue;_0x530f58[_0x39ab46(0x1fd)]([_0x39ab46(0x1ae)[_0x39ab46(0x1b8)](_0x1de365[_0x39ab46(0x187)](/[ ]/gi,''),_0x5b99f1[0x0]),_0x39ab46(0x1ea)[_0x39ab46(0x1b8)](_0x1de365,_0x5b99f1[0x1])]);}}for(const _0x1ea51c of $dataSystem[_0x39ab46(0x15d)]){if('wsvMO'===_0x39ab46(0x145)){if(!_0x49885c[_0x39ab46(0x1f5)]())return![];if(!this['canMove']())return![];if(this[_0x39ab46(0x1fb)])return![];return this['skills']()[_0x39ab46(0x1b0)](_0x506b0d=>this[_0x39ab46(0x176)](_0x506b0d));}else{if(!_0x1ea51c)continue;let _0x287189=DataManager['stripNameTextCodes'](_0x1ea51c);for(const _0x52c1f1 of _0xbf3179){if('lNlKt'===_0x39ab46(0x17b)){if(!_0x52c1f1)continue;_0x530f58[_0x39ab46(0x1fd)](['on%2Element%1'['format'](_0x287189[_0x39ab46(0x187)](/[ ]/gi,''),_0x52c1f1[0x0]),'(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)'[_0x39ab46(0x1b8)](_0x287189,_0x52c1f1[0x1])]);}else return!!this[_0x39ab46(0x189)];}}}for(const _0x18d8de of _0x530f58){if('FgJqv'===_0x39ab46(0x1ff)){if(!this[_0x39ab46(0x14a)]())return;this[_0x39ab46(0x157)](_0x8bf525['id']),this[_0x39ab46(0x21c)](0x1,!![]);const _0x4e6300=_0x3318eb[_0x39ab46(0x207)];_0x4e6300['unshift'](_0x4e6300[_0x39ab46(0x186)]());const _0x2f2a14=_0x515ead[_0x39ab46(0x19d)][_0x39ab46(0x1a9)];_0x2f2a14&&_0x2f2a14[_0x39ab46(0x148)](this);}else this[_0x39ab46(0x1f7)](_0x18d8de[0x0],_0x18d8de[0x1]);}},VisuMZ[_0x256cf3(0x211)][_0x256cf3(0x1f7)]=function(_0xe3b6e3,_0x2a50d4){const _0x196592=_0x256cf3;_0xe3b6e3=_0xe3b6e3['toUpperCase']()[_0x196592(0x1a3)]();const _0x222701=_0x196592(0x1d0)[_0x196592(0x1b8)](_0x2a50d4),_0x24639a=_0xe3b6e3+'_CHANCE',_0x48189=_0x196592(0x1c6)[_0x196592(0x1b8)](_0x2a50d4);try{VisuMZ[_0x196592(0x211)]['RegExp'][_0xe3b6e3]=new RegExp(_0x222701,'i'),VisuMZ[_0x196592(0x211)][_0x196592(0x206)][_0x24639a]=new RegExp(_0x48189,'i');}catch(_0x277c63){if(Utils[_0x196592(0x1b7)]('test')){if('aLnJl'===_0x196592(0x18b))console[_0x196592(0x1cb)](_0x196592(0x17d)),console[_0x196592(0x1cb)](_0x196592(0x161)[_0x196592(0x1b8)](_0x222701,_0x48189)),console['log']('Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.'),console[_0x196592(0x1cb)](_0x196592(0x16e));else{if(_0x342de6[_0x196592(0x212)]())_0x49502f['processOnBattleWinAutoSkillTriggers']();if(this['_forcedBattlers'][_0x196592(0x1b1)]>0x0)return![];return _0x3077cb['AutoSkillTriggers']['BattleManager_checkBattleEnd'][_0x196592(0x158)](this);}}}},DataManager[_0x256cf3(0x208)]=function(_0x4dddbc){const _0x175125=_0x256cf3;return this[_0x175125(0x14e)]($dataSystem[_0x175125(0x1bc)][_0x4dddbc]);},DataManager[_0x256cf3(0x14e)]=function(_0x41b848){const _0x5cb73f=_0x256cf3;if(!_0x41b848)return'';return _0x41b848=_0x41b848[_0x5cb73f(0x187)](/\\V\[(\d+)\]/gi,''),_0x41b848=_0x41b848[_0x5cb73f(0x187)](/\\I\[(\d+)\]/gi,''),_0x41b848=_0x41b848['replace'](/\\C\[(\d+)\]/gi,''),_0x41b848=_0x41b848['replace'](/\\N\[(\d+)\]/gi,''),_0x41b848=_0x41b848['replace'](/\\P\[(\d+)\]/gi,''),(_0x41b848||'')[_0x5cb73f(0x1e6)]()[_0x5cb73f(0x1a3)]();},DataManager['getElementNameFromID']=function(_0x486cf1){const _0x5a5357=_0x256cf3;return this['stripNameTextCodes']($dataSystem[_0x5a5357(0x15d)][_0x486cf1]);},BattleManager[_0x256cf3(0x1a4)]=function(){const _0x4f9f15=_0x256cf3;if(this[_0x4f9f15(0x1a8)]('ETB'))return![];if(this[_0x4f9f15(0x1a8)](_0x4f9f15(0x1ce)))return![];if(this['isBattleSys'](_0x4f9f15(0x1bb)))return![];return!![];},VisuMZ[_0x256cf3(0x211)][_0x256cf3(0x17a)]=BattleManager[_0x256cf3(0x21a)],BattleManager['endAction']=function(){const _0x45e6ff=_0x256cf3,_0x20a37d=this['_action']&&this[_0x45e6ff(0x1fe)][_0x45e6ff(0x197)](),_0x21c43b=this['_subject'];_0x20a37d&&('tVsGt'==='tVsGt'?this[_0x45e6ff(0x1df)][_0x45e6ff(0x20a)]=!![]:(_0x2d2300[_0x45e6ff(0x158)](this),this[_0x45e6ff(0x1ec)]())),VisuMZ[_0x45e6ff(0x211)]['BattleManager_endAction'][_0x45e6ff(0x158)](this),_0x21c43b&&_0x20a37d&&_0x21c43b[_0x45e6ff(0x1c3)]();},VisuMZ['AutoSkillTriggers'][_0x256cf3(0x182)]=BattleManager[_0x256cf3(0x149)],BattleManager[_0x256cf3(0x149)]=function(){const _0x5e09af=_0x256cf3;if($gameTroop['isAllDead']())$gameParty[_0x5e09af(0x1a6)]();if(this['_forcedBattlers']['length']>0x0)return![];return VisuMZ[_0x5e09af(0x211)][_0x5e09af(0x182)][_0x5e09af(0x158)](this);},VisuMZ[_0x256cf3(0x211)]['Game_Action_clear']=Game_Action[_0x256cf3(0x214)]['clear'],Game_Action[_0x256cf3(0x214)][_0x256cf3(0x159)]=function(){const _0xc8a953=_0x256cf3;VisuMZ[_0xc8a953(0x211)]['Game_Action_clear'][_0xc8a953(0x158)](this),this[_0xc8a953(0x1d1)](![]);},Game_Action[_0x256cf3(0x214)][_0x256cf3(0x1d1)]=function(_0xdb6bbc){const _0x43bcf0=_0x256cf3;this[_0x43bcf0(0x189)]=_0xdb6bbc;},Game_Action[_0x256cf3(0x214)]['isAutoSkillTrigger']=function(){return!!this['_autoSkillTrigger'];},VisuMZ[_0x256cf3(0x211)][_0x256cf3(0x1fa)]=Game_Action[_0x256cf3(0x214)][_0x256cf3(0x1a5)],Game_Action[_0x256cf3(0x214)][_0x256cf3(0x1a5)]=function(){const _0x127494=_0x256cf3;let _0x15a845=VisuMZ[_0x127494(0x211)]['Game_Action_isValid'][_0x127494(0x158)](this),_0x52c0bd=this[_0x127494(0x1f2)]()?this['item']()['occasion']:-0x1;return this[_0x127494(0x1f2)]()&&this[_0x127494(0x197)]()?(this['item']()['occasion']=0x0,_0x15a845=_0x15a845&&this[_0x127494(0x17e)]()['canUse'](this[_0x127494(0x1f2)]()),this[_0x127494(0x1f2)]()[_0x127494(0x1c7)]=_0x52c0bd,_0x15a845):_0x15a845;},VisuMZ['AutoSkillTriggers'][_0x256cf3(0x1f8)]=Game_Action[_0x256cf3(0x214)][_0x256cf3(0x191)],Game_Action[_0x256cf3(0x214)][_0x256cf3(0x191)]=function(){const _0x51337b=_0x256cf3;VisuMZ[_0x51337b(0x211)]['Game_Action_applyGlobal'][_0x51337b(0x158)](this),this[_0x51337b(0x1b3)]();},Game_Action[_0x256cf3(0x214)][_0x256cf3(0x165)]=function(){const _0x7f729c=_0x256cf3;if(!this[_0x7f729c(0x150)]())return[];let _0x24cb36=[];if(Imported[_0x7f729c(0x166)])_0x24cb36=DataManager[_0x7f729c(0x174)](this['item']());else{if(_0x7f729c(0x155)===_0x7f729c(0x155))_0x24cb36[_0x7f729c(0x1fd)](this[_0x7f729c(0x1f2)]()[_0x7f729c(0x160)]);else{let _0x1407aa=[];if(_0x51c013[_0x7f729c(0x19e)])_0x1407aa=this[_0x7f729c(0x15d)]();else{if(this[_0x7f729c(0x1f2)]()[_0x7f729c(0x1ab)][_0x7f729c(0x142)]<0x0){const _0x29a271=this['subject']();_0x1407aa=_0x29a271['attackElements']();}else _0x1407aa=[this[_0x7f729c(0x1f2)]()[_0x7f729c(0x1ab)]['elementId']];}return _0x1407aa[_0x7f729c(0x1b4)](_0x5dc8ab=>_0x4dd89d[_0x7f729c(0x1e1)](_0x5dc8ab));}}return _0x24cb36['map'](_0x494df2=>DataManager['getSkillTypeNameFromID'](_0x494df2));},Game_Action[_0x256cf3(0x214)][_0x256cf3(0x1db)]=function(){const _0x16d413=_0x256cf3;let _0x55ccd8=[];if(Imported[_0x16d413(0x19e)])_0x55ccd8=this[_0x16d413(0x15d)]();else{if(this[_0x16d413(0x1f2)]()['damage'][_0x16d413(0x142)]<0x0){const _0x52e45c=this[_0x16d413(0x17e)]();_0x55ccd8=_0x52e45c[_0x16d413(0x1e8)]();}else _0x55ccd8=[this['item']()[_0x16d413(0x1ab)][_0x16d413(0x142)]];}return _0x55ccd8[_0x16d413(0x1b4)](_0x446190=>DataManager[_0x16d413(0x1e1)](_0x446190));},Game_Action['prototype']['applyAutoSkillTriggers']=function(){const _0x3625f1=_0x256cf3;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(!this['item']())return;if(this[_0x3625f1(0x1f2)]()[_0x3625f1(0x194)][_0x3625f1(0x181)](/<NO AUTO SKILL TRIGGER>/i))return;if(this['item']()[_0x3625f1(0x194)][_0x3625f1(0x181)](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x61f265=this['subject'](),_0x20a431=BattleManager['_targets'][_0x3625f1(0x188)]((_0x159969,_0x12c62d,_0x3f8199)=>_0x3f8199[_0x3625f1(0x218)](_0x159969)===_0x12c62d),_0x11b009=_0x61f265[_0x3625f1(0x203)]()[_0x3625f1(0x14c)](),_0x5b82e6=_0x61f265[_0x3625f1(0x183)]()[_0x3625f1(0x14c)]();this[_0x3625f1(0x152)](_0x61f265,_0x3625f1(0x146));for(const _0x140d9b of _0x20a431){this[_0x3625f1(0x152)](_0x140d9b,'Target');if(_0x140d9b['isActor']()===_0x61f265[_0x3625f1(0x221)]())this[_0x3625f1(0x152)](_0x140d9b,_0x3625f1(0x1ac));else _0x140d9b[_0x3625f1(0x221)]()!==_0x61f265[_0x3625f1(0x221)]()&&this[_0x3625f1(0x152)](_0x140d9b,_0x3625f1(0x1e7));}for(const _0x449113 of _0x11b009){this[_0x3625f1(0x152)](_0x449113,'Friends');if(_0x449113!==_0x61f265){if(_0x3625f1(0x210)===_0x3625f1(0x210))this[_0x3625f1(0x152)](_0x449113,_0x3625f1(0x1d2));else{if(!this[_0x3625f1(0x14a)]())return;if(!_0x16232f[_0x3625f1(0x1f5)]())return;this[_0x3625f1(0x16a)]=!![],this[_0x3625f1(0x171)](_0x3625f1(0x1ee));}}}for(const _0x3cf95c of _0x5b82e6){'OiWWA'!==_0x3625f1(0x1d4)?this[_0x3625f1(0x1df)][_0x3625f1(0x20a)]=!![]:this[_0x3625f1(0x152)](_0x3cf95c,_0x3625f1(0x173));}},Game_Action[_0x256cf3(0x214)][_0x256cf3(0x152)]=function(_0x41528b,_0x2a5c9a){const _0x887061=_0x256cf3;if(!_0x41528b)return;if(!BattleManager[_0x887061(0x1a4)]())return;if(this['isAttack']())_0x41528b[_0x887061(0x171)](_0x887061(0x1b2)[_0x887061(0x1b8)](_0x2a5c9a));if(this['isGuard']())_0x41528b[_0x887061(0x171)](_0x887061(0x195)[_0x887061(0x1b8)](_0x2a5c9a));if(this[_0x887061(0x1e0)]())_0x41528b[_0x887061(0x171)]('on%1Item'[_0x887061(0x1b8)](_0x2a5c9a));if(this[_0x887061(0x184)]())_0x41528b[_0x887061(0x171)]('on%1Physical'['format'](_0x2a5c9a));if(this[_0x887061(0x21b)]())_0x41528b['processAutoSkillTrigger'](_0x887061(0x21f)[_0x887061(0x1b8)](_0x2a5c9a));if(this[_0x887061(0x1b6)]())_0x41528b[_0x887061(0x171)](_0x887061(0x1bd)[_0x887061(0x1b8)](_0x2a5c9a));const _0x5b9718=this['getAutoSkillTriggerSTypes']();for(let _0x3b77b3 of _0x5b9718){if(_0x887061(0x219)===_0x887061(0x220))_0x3f6c46('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x887061(0x1b8)](_0x371e1a,_0x4c21f0)),_0x5c46f3[_0x887061(0x1d6)]();else{if(!_0x3b77b3)continue;_0x3b77b3=_0x3b77b3['replace'](/[ ]/gi,''),_0x41528b[_0x887061(0x171)](_0x887061(0x1ef)[_0x887061(0x1b8)](_0x2a5c9a,_0x3b77b3));}}const _0x2dce95=this[_0x887061(0x1db)]();for(let _0x2ac373 of _0x2dce95){if(!_0x2ac373)continue;_0x2ac373=_0x2ac373[_0x887061(0x187)](/[ ]/gi,''),_0x41528b[_0x887061(0x171)]('on%1Element%2'[_0x887061(0x1b8)](_0x2a5c9a,_0x2ac373));}},VisuMZ['AutoSkillTriggers'][_0x256cf3(0x147)]=Game_BattlerBase[_0x256cf3(0x214)][_0x256cf3(0x1de)],Game_BattlerBase[_0x256cf3(0x214)]['addNewState']=function(_0x2ac4cc){const _0xc1fce3=_0x256cf3;if(this[_0xc1fce3(0x193)](_0x2ac4cc)){if(_0xc1fce3(0x179)!==_0xc1fce3(0x1d5))return this[_0xc1fce3(0x18f)]();else _0x21cd68[_0xc1fce3(0x148)](this);}VisuMZ[_0xc1fce3(0x211)][_0xc1fce3(0x147)]['call'](this,_0x2ac4cc);},Game_BattlerBase[_0x256cf3(0x214)][_0x256cf3(0x193)]=function(_0x2560f2){const _0x49530e=_0x256cf3;if(_0x2560f2!==this[_0x49530e(0x185)]())return![];if(Imported['VisuMZ_3_LifeStateEffects']){if(this[_0x49530e(0x170)]())return![];if(this[_0x49530e(0x205)]()&&this[_0x49530e(0x20e)]())return![];}return this[_0x49530e(0x1d7)]();},Game_BattlerBase['prototype'][_0x256cf3(0x1d7)]=function(){const _0x3256a9=_0x256cf3;if(!SceneManager[_0x3256a9(0x1f5)]())return![];if(!this['canMove']())return![];if(this[_0x3256a9(0x1fb)])return![];return this[_0x3256a9(0x202)]()[_0x3256a9(0x1b0)](_0x2bbf20=>this[_0x3256a9(0x176)](_0x2bbf20));},Game_BattlerBase[_0x256cf3(0x214)][_0x256cf3(0x176)]=function(_0xa96ac5){const _0x22a944=_0x256cf3,_0x24c471=VisuMZ['AutoSkillTriggers'][_0x22a944(0x206)][_0x22a944(0x21d)];return _0xa96ac5&&_0xa96ac5['note'][_0x22a944(0x181)](_0x24c471)&&this['canUse'](_0xa96ac5);},VisuMZ['AutoSkillTriggers'][_0x256cf3(0x1aa)]=Game_BattlerBase[_0x256cf3(0x214)]['isImmortal'],Game_BattlerBase['prototype'][_0x256cf3(0x1e9)]=function(){const _0x21b984=_0x256cf3;if(this['_deathAutoSkillTriggerActive'])return!![];return VisuMZ[_0x21b984(0x211)][_0x21b984(0x1aa)]['call'](this);},Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x171)]=function(_0xeab34e){const _0x282029=_0x256cf3;if(!SceneManager[_0x282029(0x1f5)]())return;if(!BattleManager[_0x282029(0x1a4)]())return;_0xeab34e=_0xeab34e[_0x282029(0x1e6)]()[_0x282029(0x1a3)]();const _0x4c1fbf=VisuMZ[_0x282029(0x211)][_0x282029(0x206)][_0xeab34e],_0x34906b=_0xeab34e+'_CHANCE',_0x10a4f1=VisuMZ[_0x282029(0x211)][_0x282029(0x206)][_0x34906b];if(!_0x4c1fbf&&!_0x10a4f1)return;if(!this[_0x282029(0x14a)]())return;for(const _0x22c7c7 of this[_0x282029(0x202)]()){if('TdlGW'!==_0x282029(0x213)){const _0x132208=_0x4f51aa['AutoSkillTriggers']['RegExp']['ONDEATH'];return _0x23c706&&_0x491002[_0x282029(0x194)][_0x282029(0x181)](_0x132208)&&this[_0x282029(0x1b9)](_0x3fdadc);}else{if(!_0x22c7c7)continue;if(!this[_0x282029(0x1b9)](_0x22c7c7))continue;let _0xafc48a=![];if(_0x22c7c7[_0x282029(0x194)][_0x282029(0x181)](_0x4c1fbf))_0x282029(0x1c4)!=='NPjlH'?(this[_0x282029(0x16a)]=![],this[_0x282029(0x1fb)]=![]):_0xafc48a=!![];else{if(_0x22c7c7[_0x282029(0x194)]['match'](_0x10a4f1)){if(_0x282029(0x21e)===_0x282029(0x151)){if(!_0x249ea1[_0x282029(0x1a4)]())return;if(!this[_0x282029(0x1be)])return;if(this['_actions'][_0x282029(0x1b1)]>0x0)return;this[_0x282029(0x1d8)]=this['_savedAutoSkillTriggerActions'],this['_savedAutoSkillTriggerActions']=_0x37af72;}else{const _0x2255f2=(Number(RegExp['$1'])||0x0)*0.01;_0xafc48a=Math[_0x282029(0x1e2)]()<_0x2255f2;}}}_0xafc48a&&(_0x282029(0x153)===_0x282029(0x1b5)?_0x487797[_0x282029(0x1fd)](this[_0x282029(0x1f2)]()[_0x282029(0x160)]):Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager['isOTB']()?this[_0x282029(0x15c)](_0x22c7c7):this[_0x282029(0x177)](_0x22c7c7));}}},Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x177)]=function(_0x5b7bb6){const _0xf5c5b1=_0x256cf3;this['forceAutoSkillTrigger'](_0x5b7bb6['id']);const _0x3e6aaf=BattleManager[_0xf5c5b1(0x207)]['clone'](),_0x4e5de1=BattleManager[_0xf5c5b1(0x1df)];BattleManager[_0xf5c5b1(0x1df)]=null,BattleManager['forceAction'](this),BattleManager['_actionBattlers']=_0x3e6aaf,BattleManager[_0xf5c5b1(0x1df)]=_0x4e5de1;},Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x15c)]=function(_0x31ef03){const _0x46680d=_0x256cf3;if(!this[_0x46680d(0x14a)]())return;this['forceAutoSkillTrigger'](_0x31ef03['id']),this[_0x46680d(0x21c)](0x1,!![]);const _0x1123b6=BattleManager[_0x46680d(0x207)];_0x1123b6[_0x46680d(0x1c2)](_0x1123b6[_0x46680d(0x186)]());const _0xf28606=SceneManager[_0x46680d(0x19d)][_0x46680d(0x1a9)];if(_0xf28606){if(_0x46680d(0x180)!=='mxvlR'){this[_0x46680d(0x157)](_0x502fb0['id']);const _0x2f9c84=_0x24e648[_0x46680d(0x207)]['clone'](),_0x331f68=_0x1197ba['_subject'];_0x186078['_subject']=null,_0x2fce12['forceAction'](this),_0x404c17[_0x46680d(0x207)]=_0x2f9c84,_0x44eaab['_subject']=_0x331f68;}else _0xf28606[_0x46680d(0x148)](this);}},Game_Battler['prototype']['forceAutoSkillTrigger']=function(_0x3bae1d){const _0x4d43a2=_0x256cf3;if(!BattleManager[_0x4d43a2(0x1a4)]())return;!this[_0x4d43a2(0x1be)]&&(this[_0x4d43a2(0x1be)]=this[_0x4d43a2(0x1d8)][_0x4d43a2(0x1f6)]());this[_0x4d43a2(0x19c)](_0x3bae1d,-0x2);if(!this[_0x4d43a2(0x1d8)])return;const _0x132a2f=this[_0x4d43a2(0x1d8)][this['_actions'][_0x4d43a2(0x1b1)]-0x1];_0x132a2f[_0x4d43a2(0x1d1)](!![]);},Game_Battler['prototype'][_0x256cf3(0x1c3)]=function(){const _0x162c75=_0x256cf3;if(!BattleManager[_0x162c75(0x1a4)]())return;if(!this[_0x162c75(0x1be)])return;if(this['_actions']['length']>0x0)return;this['_actions']=this[_0x162c75(0x1be)],this[_0x162c75(0x1be)]=undefined;},VisuMZ[_0x256cf3(0x211)][_0x256cf3(0x204)]=Game_Battler['prototype']['onBattleEnd'],Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x1e5)]=function(){const _0x22e044=_0x256cf3;this[_0x22e044(0x1be)]=undefined,VisuMZ[_0x22e044(0x211)][_0x22e044(0x204)][_0x22e044(0x158)](this);},VisuMZ[_0x256cf3(0x211)][_0x256cf3(0x17c)]=Game_Battler[_0x256cf3(0x214)]['clearTpbChargeTime'],Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x1a7)]=function(){const _0x39dcec=_0x256cf3;if(this[_0x39dcec(0x20a)]){this['_autoSkillTriggerBypassTpbClear']=undefined;return;}VisuMZ['AutoSkillTriggers']['Game_Battler_clearTpbChargeTime'][_0x39dcec(0x158)](this);},VisuMZ['AutoSkillTriggers']['Game_Battler_onBattleStart']=Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x199)],Game_Battler['prototype']['onBattleStart']=function(_0x138a7c){const _0x5993c3=_0x256cf3;this[_0x5993c3(0x1be)]=undefined,$gameParty[_0x5993c3(0x15b)]=!![],VisuMZ['AutoSkillTriggers']['Game_Battler_onBattleStart'][_0x5993c3(0x158)](this,_0x138a7c),this[_0x5993c3(0x171)](_0x5993c3(0x199)),this[_0x5993c3(0x162)]();},VisuMZ[_0x256cf3(0x211)][_0x256cf3(0x156)]=Game_BattlerBase[_0x256cf3(0x214)][_0x256cf3(0x1c1)],Game_BattlerBase[_0x256cf3(0x214)][_0x256cf3(0x1c1)]=function(){const _0x419a19=_0x256cf3;VisuMZ[_0x419a19(0x211)][_0x419a19(0x156)][_0x419a19(0x158)](this),this[_0x419a19(0x162)]();},Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x162)]=function(){const _0x5c8455=_0x256cf3;this[_0x5c8455(0x16a)]=![],this[_0x5c8455(0x1fb)]=![];},Game_Battler[_0x256cf3(0x214)]['processDeathAutoSkillTriggerEffects']=function(){const _0x4895fe=_0x256cf3;if(!this[_0x4895fe(0x14a)]())return;if(!SceneManager[_0x4895fe(0x1f5)]())return;this['_deathAutoSkillTriggerActive']=!![],this['processAutoSkillTrigger'](_0x4895fe(0x1ee));};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x1f4)];Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x1f4)]=function(){const _0x5b6f54=_0x256cf3;_Game_Battler_onAllActionsEnd_['call'](this),this[_0x5b6f54(0x1ec)]();},Game_Battler[_0x256cf3(0x214)][_0x256cf3(0x1ec)]=function(){const _0x3c06c3=_0x256cf3;if(!this['_deathAutoSkillTriggerActive'])return;if(this[_0x3c06c3(0x1fb)])return;const _0x3a7d30=BattleManager[_0x3c06c3(0x154)];for(const _0x2ff6ed of _0x3a7d30){if(_0x3c06c3(0x18d)===_0x3c06c3(0x18d)){if(!_0x2ff6ed)continue;if(_0x2ff6ed[0x0]===this)return;}else return this[_0x3c06c3(0x1f2)]()[_0x3c06c3(0x1c7)]=0x0,_0xde65de=_0x17366b&&this[_0x3c06c3(0x17e)]()[_0x3c06c3(0x1b9)](this['item']()),this[_0x3c06c3(0x1f2)]()[_0x3c06c3(0x1c7)]=_0x36718c,_0x2d5f62;}this[_0x3c06c3(0x16a)]=![],this['_deathAutoSkillTriggerPerformed']=!![],this[_0x3c06c3(0x16b)]();if(this[_0x3c06c3(0x16d)]())this[_0x3c06c3(0x162)]();},VisuMZ[_0x256cf3(0x211)][_0x256cf3(0x190)]=Game_Unit[_0x256cf3(0x214)][_0x256cf3(0x199)],Game_Unit['prototype'][_0x256cf3(0x199)]=function(_0x5eaed9){const _0x31e2fc=_0x256cf3;VisuMZ['AutoSkillTriggers']['Game_Unit_onBattleStart'][_0x31e2fc(0x158)](this,_0x5eaed9);if(this[_0x31e2fc(0x1c8)]===Game_Party)this[_0x31e2fc(0x1c9)]=![];},Game_Unit[_0x256cf3(0x214)]['processAutoSkillTriggers']=function(_0x25a16a,_0x554168){const _0x2b86c1=_0x256cf3;_0x554168=_0x554168||null;const _0x3d4677=this[_0x2b86c1(0x14c)]()[_0x2b86c1(0x188)](_0x4fe268=>_0x4fe268!==_0x554168);for(const _0x29aaf1 of _0x3d4677){if(!_0x29aaf1)continue;_0x29aaf1[_0x2b86c1(0x171)](_0x25a16a);}},Game_Party[_0x256cf3(0x214)]['processOnBattleWinAutoSkillTriggers']=function(){const _0x774fff=_0x256cf3;if(this['_onBattleWinAutoSkillTriggerOn'])return;this[_0x774fff(0x1c9)]=!![],this[_0x774fff(0x200)](_0x774fff(0x1e4));};Imported['VisuMZ_2_BattleSystemOTB']&&(Window_OTB_TurnOrder[_0x256cf3(0x214)][_0x256cf3(0x148)]=function(_0x59991b){const _0x28da22=_0x256cf3;let _0x5386d6=null;for(const _0x347028 of this['_currentTurn']){if(_0x28da22(0x1e3)===_0x28da22(0x1ad))return this[_0x28da22(0x18f)]();else{if(!_0x347028)continue;if(_0x347028[_0x28da22(0x15f)]()!==_0x59991b)continue;_0x5386d6=_0x347028,_0x347028[_0x28da22(0x1a0)]=_0x347028[_0x28da22(0x1a0)]||0x0,_0x347028[_0x28da22(0x1a0)]++;}}_0x5386d6['_instance']=0x0,_0x5386d6['_positionDuration']=0x258,_0x5386d6['x']=this['_subjectX'],this[_0x28da22(0x17f)][_0x28da22(0x1c2)](this[_0x28da22(0x17f)][_0x28da22(0x186)]()),this['requestUpdateTurnOrders']();});function _0x4efd(){const _0x3676b=['match','BattleManager_checkBattleEnd','opponentsUnit','isPhysical','deathStateId','pop','replace','filter','_autoSkillTrigger','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)','aLnJl','OPPONENTS','jjhkb','EVAL','processDeathAutoSkillTriggerEffects','Game_Unit_onBattleStart','applyGlobal','return\x200','canActivateDeathAutoSkillTrigger','note','on%1Guard','Friends','isAutoSkillTrigger','on%1Physical','onBattleStart','STR','status','forceAction','_scene','VisuMZ_1_ElementStatusCore','Settings','_instance','Lpaws','ARRAYSTR','trim','isAutoSkillTriggerCompatible','isValid','processOnBattleWinAutoSkillTriggers','clearTpbChargeTime','isBattleSys','_otbTurnOrderWindow','Game_BattlerBase_isImmortal','damage','Ally','xYziJ','on%2SType%1','ARRAYEVAL','some','length','on%1Attack','applyAutoSkillTriggers','map','WIOxX','isCertainHit','isOptionValid','format','canUse','USER','PTB','skillTypes','on%1Certain','_savedAutoSkillTriggerActions','iSXEv','(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)','revive','unshift','returnSavedAutoSkillTriggerActions','NPjlH','3644767iaWyHp','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','occasion','constructor','_onBattleWinAutoSkillTriggerOn','JSON','log','64XeBapB','includes','FTB','651414lGanKX','<AUTO\x20TRIGGER:[\x20]%1>','setAutoSkillTrigger','FriendsOnly','description','OiWWA','yskOd','exit','hasDeathAutoSkillTrigger','_actions','(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)','(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)','getAutoSkillTriggerElements','FRIENDS','ConvertParams','addNewState','_subject','isItem','getElementNameFromID','random','dlxCs','onBattleWin','onBattleEnd','toUpperCase','Enemy','attackElements','isImmortal','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','max','checkDeathAutoSkillTriggerRemoval','ARRAYSTRUCT','onDeath','on%1SType%2','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','414595gcRiua','item','12419680qSltMu','onAllActionsEnd','isSceneBattle','clone','CreateNotetag','Game_Action_applyGlobal','HdKap','Game_Action_isValid','_deathAutoSkillTriggerPerformed','process_VisuMZ_AutoSkillTriggers_Notetags','push','_action','QhtXC','processAutoSkillTriggers','ARRAYJSON','skills','friendsUnit','Game_Battler_onBattleEnd','isEnemy','RegExp','_actionBattlers','getSkillTypeNameFromID','twcDN','_autoSkillTriggerBypassTpbClear','version','(?:ATTACK\x20%1|STRIKE\x20%1)','parameters','hasDeathTransform','ARRAYFUNC','dUjBC','AutoSkillTriggers','isAllDead','TdlGW','prototype','Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.','FRIENDS\x20ONLY','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','indexOf','ZRDbV','endAction','isMagical','otbAddActions','ONDEATH','PJbHv','on%1Magical','sNPXo','isActor','onDatabaseLoaded','elementId','537468YpfeoG','parse','RRmSA','User','Game_BattlerBase_addNewState','adjustTurnOrderAutoSkillTrigger','checkBattleEnd','canMove','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','aliveMembers','VwUZW','stripNameTextCodes','Target','isSkill','KyasY','performAutoSkillTriggers','MosUr','_forcedBattlers','WuKET','Game_BattlerBase_revive','forceAutoSkillTrigger','call','clear','(?:GUARD\x20%1|GUARD\x20%1)','_inBattle','constructAutoSkillTriggerOTB','elements','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','battler','stypeId','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','clearDeathAutoSkillTrigger','52827oeBlPH','Scene_Boot_onDatabaseLoaded','getAutoSkillTriggerSTypes','VisuMZ_1_SkillsStatesCore','ENEMY','37863fUuEGj','FUNC','_deathAutoSkillTriggerActive','refresh','STRUCT','isAlive','\x20\x20\x20','(?:ITEM\x20%1|ITEM\x20%1)','hasLifeStateAutoLifeEffect','processAutoSkillTrigger','BFWJw','Opponents','getSkillTypes','VisuMZ_1_BattleCore','meetsDeathAutoSkillTrigger','constructAutoSkillTrigger','TARGET','csNsG','BattleManager_endAction','lNlKt','Game_Battler_clearTpbChargeTime','===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20===','subject','_currentTurn','mxvlR'];_0x4efd=function(){return _0x3676b;};return _0x4efd();};