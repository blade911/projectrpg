//=============================================================================
// VisuStella MZ - Limited Skill Uses
// VisuMZ_3_LimitedSkillUses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_LimitedSkillUses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LimitedSkillUses = VisuMZ.LimitedSkillUses || {};
VisuMZ.LimitedSkillUses.version = 1.02;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.02] [LimitedSkillUses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Limited_Skill_Uses_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin enables you to set a limited amount of times certain skills (or
 * all skills) can be used per battle or ever. This adds a different type of
 * skill currency and balance mechanic in limiting the amount of times a skill
 * can be used without directly having to alter MP, TP, or the like.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Determine globally or individually how many skill uses a battler can use
 *   per battle (does not apply to basic attack and guard skills).
 * * Determine how many uses are restored per battle.
 * * Use notetag effects to alter the amount of uses a user or target has
 *   globally, for specific skill types, or for specific individual skills.
 * * Adjust how the limited uses are displayed in-game.
 * * Equipment, class types, states, etc. can all affect the maximum quantity
 *   of uses for skills, too.
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
 * * VisuMZ_1_SkillsStatesCore
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Basic Limited Use-Related Notetags ===
 * 
 * ---
 *
 * <Limited Uses: x>
 *
 * - Used for: Skill Notetags
 * - Sets the limited use maximum base amount for this skill.
 * - This value will override the Plugin Parameter settings for a base value if
 *   "All Skills Limited?" is turned on.
 * - Replace 'x' with a number value representing the base maximum uses this
 *   skill can have.
 *
 * ---
 *
 * <Unlimited Use>
 *
 * - Used for: Skill Notetags
 * - If the Plugin Parameter "All Skills Limited?" is turned on, this will
 *   disable limited uses for this skill, allowing it to be used in unlimited
 *   amounts independent of the Limited Use base.
 *
 * ---
 * 
 * === Use Recovery-Related Notetags ===
 * 
 * ---
 *
 * <Victory Uses Recover: x>
 * <Escape Uses Recover: x>
 * <Defeat Uses Recover: x>
 * <After Battle Uses Recover: x>
 *
 * - Used for: Skill Notetags
 * - Determines how many limited uses are recovered at the end of each battle
 *   depending on the result.
 *   - Victory notetag variant requires winning the battle.
 *   - Escape notetag variant requires escaping the battle.
 *   - Defeat notetag variant requires losing the battle.
 *   - After Battle notetag variant applies to all cases.
 * - Replace 'x' with how many uses are restored upon completing a battle.
 *
 * ---
 *
 * <Bypass Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This prevents the skill from recovering all uses with the "Recover All"
 *   event command.
 *
 * ---
 *
 * <Allow Recover All Uses>
 *
 * - Used for: Skill Notetags
 * - This allows the skill to recover all uses with the "Recover All" event
 *   command when the "Recover All?" plugin parameter is disabled.
 *
 * ---
 * 
 * === Use Alteration-Related Notetags ===
 * 
 * ---
 *
 * <User Global Uses: +x>
 * <User Global Uses: -x>
 *
 * <User SType id Uses: +x>
 * <User SType id Uses: -x>
 * <User SType name Uses: +x>
 * <User SType name Uses: -x>
 *
 * <User Skill id Uses: +x>
 * <User Skill id Uses: -x>
 * <User Skill name Uses: +x>
 * <User Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's user.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *   - Skill notetag viarant effects a specific matching skill.
 * - Replace 'id' with the ID of the skill type.
 * - Replace 'name' with the name of the skill type (without text codes).
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 *
 * <Target Global Uses: +x>
 * <Target Global Uses: -x>
 *
 * <Target SType id Uses: +x>
 * <Target SType id Uses: -x>
 * <Target SType name Uses: +x>
 * <Target SType name Uses: -x>
 *
 * <Target Skill id Uses: +x>
 * <Target Skill id Uses: -x>
 * <Target Skill name Uses: +x>
 * <Target Skill name Uses: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the limited use amounts for the action's target.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - Replace 'x' with the amount to alter the remaining uses by. Positive
 *   values restore uses while negative values reduce remaining uses.
 *
 * ---
 * 
 * === Trait Based-Related Notetags ===
 * 
 * ---
 *
 * <Gloal Use Max: +x>
 * <Gloal Use Max: -x>
 * 
 * <SType id Use Max: +x>
 * <SType id Use Max: -x>
 * <SType name Use Max: +x>
 * <SType name Use Max: -x>
 * 
 * <Skill id Use Max: +x>
 * <Skill id Use Max: -x>
 * <Skill name Use Max: +x>
 * <Skill name Use Max: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the maximum limited uses for all skills, skills of a particular
 *   type, or individual skills.
 *   - Global notetag variant affects all limited uses.
 *   - SType notetag variant effects all skills with a matching type.
 *     - Replace 'id' with the ID of the skill type.
 *     - Replace 'name' with the name of the skill type (without text codes).
 *   - Skill notetag viarant effects a specific matching skill.
 *     - Replace 'id' with the ID of the skill.
 *     - Replace 'name' with the name of the skill.
 * - Replace 'x' with the amount to adjust the maximum uses by. Positive values
 *   increase the maximum uses while negative values decrease them.
 *   - These will be hard capped by the settings found in the Plugin Parmeters.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Limited Skill Uses.
 *
 * ---
 *
 * General
 * 
 *   Limited Use Icon:
 *   - Icon used for representing Limited Uses in the cost.
 * 
 *   Cost Format:
 *   - Format for Limited Use cost display.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Empty Format:
 *   - Format for Limited Use cost display when empty.
 *   - %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * 
 *   Cost Position Front?:
 *   - Put the Limited Uses at the front of skill/item costs?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanical settings regarding Limited Skill Uses.
 *
 * ---
 *
 * All Limited
 * 
 *   All Skills Limited?:
 *   - Make all skills have limited uses?
 *   - Does not apply to basic attack and guard.
 * 
 *     Default Max:
 *     - If all skills are limited, what is the default maximum uses?
 *
 * ---
 *
 * Hard Caps
 * 
 *   Maximum:
 *   - What is the maximum hardcap for limited uses?
 * 
 *   Minimum:
 *   - What is the minimum hardcap for limited uses?
 *
 * ---
 *
 * Recovery
 * 
 *   Battle Victory:
 *   - How many uses for each skill does a victory restore by default?
 * 
 *   Battle Escape:
 *   - How many uses for each skill does an escape restore by default?
 * 
 *   Battle Defeat:
 *   - How many uses for each skill does a defeat restore by default?
 * 
 *   Recover All?:
 *   - Does the "Recover All" command restore Limited Skill Uses?
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
 * Version 1.02: January 13, 2022
 * * Feature Update!
 * ** Removed unused template plugin commands. Update made by Arisu.
 * 
 * Version 1.01: March 26, 2021
 * * Compatibility Update!
 * ** Skill type limited uses now affect all skill types with skills that have
 *    multiple skill types declared through the Skills and States Core.
 * 
 * Version 1.00 Official Release Date: March 10, 2021
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
 * @param LimitedSkillUses
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
 * @desc General settings regarding Limited Skill Uses.
 * @default {"Icon:num":"160","CostFmt:str":"\\FS[22]\\C[8]%1/%2\\C[0]","EmptyFmt:str":"\\FS[22]\\C[8]Empty\\C[0]","CostPosition:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanical settings regarding Limited Skill Uses.
 * @default {"AllLimited":"","AllLimited:eval":"false","DefaultMax:num":"2","HardCaps":"","Maximum:num":"100","Minimum:num":"1","Recovery":"","BattleVictory:num":"10","BattleEscape:num":"5","BattleDefeat:num":"5","RecoverAll:eval":"true"}
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
 * @param Icon:num
 * @text Limited Use Icon
 * @desc Icon used for representing Limited Uses in the cost.
 * @default 160
 *
 * @param CostFmt:str
 * @text Cost Format
 * @desc Format for Limited Use cost display.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]%1/%2\C[0]
 *
 * @param EmptyFmt:str
 * @text Empty Format
 * @desc Format for Limited Use cost display when empty.
 * %1 - Remaining, %2 - Max Uses, %3 - Times Used, %4 - Icon
 * @default \FS[22]\C[8]Empty\C[0]
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the Limited Uses at the front of skill/item costs?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param AllLimited
 * @text All Limited
 *
 * @param AllLimited:eval
 * @text All Skills Limited?
 * @parent AllLimited
 * @type boolean
 * @on Limited
 * @off Normal
 * @desc Make all skills have limited uses?
 * Does not apply to basic attack and guard.
 * @default false
 *
 * @param DefaultMax:num
 * @text Default Max
 * @parent AllLimited:eval
 * @type number
 * @min 1
 * @desc If all skills are limited, what is the default maximum uses?
 * @default 2
 *
 * @param HardCaps
 * @text Hard Caps
 *
 * @param Maximum:num
 * @text Maximum
 * @parent HardCaps
 * @type number
 * @desc What is the maximum hardcap for limited uses?
 * @default 100
 *
 * @param Minimum:num
 * @text Minimum
 * @parent HardCaps
 * @type number
 * @desc What is the minimum hardcap for limited uses?
 * @default 1
 *
 * @param Recovery
 *
 * @param BattleVictory:num
 * @text Battle Victory
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a victory restore by default?
 * @default 10
 *
 * @param BattleEscape:num
 * @text Battle Escape
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does an escape restore by default?
 * @default 5
 *
 * @param BattleDefeat:num
 * @text Battle Defeat
 * @parent Recovery
 * @type number
 * @desc How many uses for each skill does a defeat restore by default?
 * @default 5
 *
 * @param RecoverAll:eval
 * @text Recover All?
 * @parent Recovery
 * @type boolean
 * @on Recovers
 * @off Does Not
 * @desc Does the "Recover All" command restore Limited Skill Uses?
 * @default true
 *
 */
//=============================================================================

function _0x84c9(){const _0xf8800f=['limitedUseEmptyFmt','7XiPlqe','JSON','ARRAYEVAL','calcSkillLimitedUseMax','trim','recoverLimitedSkillUses','skillLimitedUseTimes','ARRAYSTR','escape','applyItemUserEffect','version','AllLimited','LimitedUse','STypeLimitedUses','guardSkillId','canRecoverAllLimitedSkillUses','limitedUseFmt','TargetSkillLimitedUses','prototype','GlobalLimitedUses','skillTypes','ConvertParams','3561512bOVAbf','Game_BattlerBase_paySkillCost','LIMITED_SKILL_USE_RECOVERY','LIMITED_SKILL_USE_BASE','_inBattle','skillLimitedUseMax','filter','format','Maximum','LimitedSkillUses','_cache_SkillLimitedUseMax','meetsSkillConditions','paySkillCost','9527200oeemUi','status','getSkillIdWithName','SkillLimitedUses','traitObjects','test','LIMITED_SKILL_USE_ALL_LIMITED','RegExp','General','BattleManager_endBattle','isAttackOrGuardSkill','_skillLimitedUseTimes','Game_Action_applyItemUserEffect','BattleEscape','match','stypeId','3211932DudLHc','UserSkillLimitedUses','item','name','max','UserSTypeLimitedUses','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Game_BattlerBase_refresh','subject','testItemEffect','STRUCT','includes','paySkillLimitedUse','exit','EmptyFmt','BypassRecoverAll','ARRAYNUM','UnlimitedUse','VisuMZ_1_SkillsStatesCore','parse','skillCostSeparator','getStypeIdWithName','makeAdditionalCostTextLimitedSkillUses','Settings','DefaultMax','AllowRecoverAll','isSkillLimitedUse','return\x200','makeAdditionalSkillCostText','Game_BattlerBase_recoverAll','map','Game_Action_testItemEffect','CostPosition','EVAL','RecoverDefeat','8OqhPlw','endBattle','602664ZlNSIZ','victory','recoverAll','note','skills','_stypeIDs','11jfRCdi','alterLimitedSkillUses','endBattleRecoveryLimitedSkillUses','ARRAYSTRUCT','_skillIDs','CostFmt','limitedUseIcon','UserGlobalLimitedUses','370983HxHJJO','340570pVeemh','RecoverEscape','LIMITED_SKILL_USE_HARDCAP_MAX','FUNC','refresh','recoverLimitedSkillUsesBattle','406742gpDcNG','call','Mechanics','Window_Base_makeAdditionalSkillCostText','toUpperCase','TargetSTypeLimitedUses','TargetGlobalLimitedUses','LIMITED_SKILL_USE_HARDCAP_MIN','279ExzGtX','getSkillTypes','description','Game_BattlerBase_meetsSkillConditions','Icon','5WNAcih'];_0x84c9=function(){return _0xf8800f;};return _0x84c9();}function _0x600d(_0x41e86f,_0x458969){const _0x84c982=_0x84c9();return _0x600d=function(_0x600d05,_0x430980){_0x600d05=_0x600d05-0x10e;let _0xc4fac=_0x84c982[_0x600d05];return _0xc4fac;},_0x600d(_0x41e86f,_0x458969);}const _0x5b93a8=_0x600d;(function(_0xcecfd8,_0x32c3dd){const _0x32f629=_0x600d,_0x272a0b=_0xcecfd8();while(!![]){try{const _0x4c084d=-parseInt(_0x32f629(0x14e))/0x1+parseInt(_0x32f629(0x137))/0x2*(parseInt(_0x32f629(0x147))/0x3)+-parseInt(_0x32f629(0x173))/0x4*(-parseInt(_0x32f629(0x15b))/0x5)+-parseInt(_0x32f629(0x139))/0x6*(parseInt(_0x32f629(0x15d))/0x7)+parseInt(_0x32f629(0x180))/0x8+-parseInt(_0x32f629(0x156))/0x9*(parseInt(_0x32f629(0x148))/0xa)+-parseInt(_0x32f629(0x13f))/0xb*(parseInt(_0x32f629(0x113))/0xc);if(_0x4c084d===_0x32c3dd)break;else _0x272a0b['push'](_0x272a0b['shift']());}catch(_0x2e455d){_0x272a0b['push'](_0x272a0b['shift']());}}}(_0x84c9,0xb5f5c));var label='LimitedSkillUses',tier=tier||0x0,dependencies=[_0x5b93a8(0x126)],pluginData=$plugins[_0x5b93a8(0x179)](function(_0x466b01){const _0x212be1=_0x5b93a8;return _0x466b01[_0x212be1(0x181)]&&_0x466b01[_0x212be1(0x158)][_0x212be1(0x11f)]('['+label+']');})[0x0];VisuMZ[label][_0x5b93a8(0x12b)]=VisuMZ[label][_0x5b93a8(0x12b)]||{},VisuMZ[_0x5b93a8(0x172)]=function(_0x2da452,_0x123c14){const _0x295bca=_0x5b93a8;for(const _0x401439 in _0x123c14){if(_0x401439['match'](/(.*):(.*)/i)){const _0x257ea9=String(RegExp['$1']),_0x5c174c=String(RegExp['$2'])['toUpperCase']()[_0x295bca(0x161)]();let _0x5232a9,_0x4f23cc,_0x25ef2e;switch(_0x5c174c){case'NUM':_0x5232a9=_0x123c14[_0x401439]!==''?Number(_0x123c14[_0x401439]):0x0;break;case _0x295bca(0x124):_0x4f23cc=_0x123c14[_0x401439]!==''?JSON['parse'](_0x123c14[_0x401439]):[],_0x5232a9=_0x4f23cc[_0x295bca(0x132)](_0x2b2481=>Number(_0x2b2481));break;case _0x295bca(0x135):_0x5232a9=_0x123c14[_0x401439]!==''?eval(_0x123c14[_0x401439]):null;break;case _0x295bca(0x15f):_0x4f23cc=_0x123c14[_0x401439]!==''?JSON[_0x295bca(0x127)](_0x123c14[_0x401439]):[],_0x5232a9=_0x4f23cc[_0x295bca(0x132)](_0xc78fc4=>eval(_0xc78fc4));break;case _0x295bca(0x15e):_0x5232a9=_0x123c14[_0x401439]!==''?JSON[_0x295bca(0x127)](_0x123c14[_0x401439]):'';break;case'ARRAYJSON':_0x4f23cc=_0x123c14[_0x401439]!==''?JSON[_0x295bca(0x127)](_0x123c14[_0x401439]):[],_0x5232a9=_0x4f23cc[_0x295bca(0x132)](_0x3532d1=>JSON[_0x295bca(0x127)](_0x3532d1));break;case _0x295bca(0x14b):_0x5232a9=_0x123c14[_0x401439]!==''?new Function(JSON[_0x295bca(0x127)](_0x123c14[_0x401439])):new Function(_0x295bca(0x12f));break;case'ARRAYFUNC':_0x4f23cc=_0x123c14[_0x401439]!==''?JSON[_0x295bca(0x127)](_0x123c14[_0x401439]):[],_0x5232a9=_0x4f23cc['map'](_0x3442d3=>new Function(JSON[_0x295bca(0x127)](_0x3442d3)));break;case'STR':_0x5232a9=_0x123c14[_0x401439]!==''?String(_0x123c14[_0x401439]):'';break;case _0x295bca(0x164):_0x4f23cc=_0x123c14[_0x401439]!==''?JSON[_0x295bca(0x127)](_0x123c14[_0x401439]):[],_0x5232a9=_0x4f23cc['map'](_0x3b28b6=>String(_0x3b28b6));break;case _0x295bca(0x11e):_0x25ef2e=_0x123c14[_0x401439]!==''?JSON[_0x295bca(0x127)](_0x123c14[_0x401439]):{},_0x5232a9=VisuMZ['ConvertParams']({},_0x25ef2e);break;case _0x295bca(0x142):_0x4f23cc=_0x123c14[_0x401439]!==''?JSON[_0x295bca(0x127)](_0x123c14[_0x401439]):[],_0x5232a9=_0x4f23cc[_0x295bca(0x132)](_0xbd2d1b=>VisuMZ['ConvertParams']({},JSON[_0x295bca(0x127)](_0xbd2d1b)));break;default:continue;}_0x2da452[_0x257ea9]=_0x5232a9;}}return _0x2da452;},(_0x4edd97=>{const _0x4cca51=_0x5b93a8,_0x15f6d4=_0x4edd97[_0x4cca51(0x116)];for(const _0x5504e8 of dependencies){if(!Imported[_0x5504e8]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4cca51(0x17a)](_0x15f6d4,_0x5504e8)),SceneManager['exit']();break;}}const _0x54b5f6=_0x4edd97[_0x4cca51(0x158)];if(_0x54b5f6['match'](/\[Version[ ](.*?)\]/i)){const _0x330aa1=Number(RegExp['$1']);_0x330aa1!==VisuMZ[label][_0x4cca51(0x167)]&&(alert(_0x4cca51(0x119)[_0x4cca51(0x17a)](_0x15f6d4,_0x330aa1)),SceneManager[_0x4cca51(0x121)]());}if(_0x54b5f6[_0x4cca51(0x111)](/\[Tier[ ](\d+)\]/i)){const _0x19340e=Number(RegExp['$1']);_0x19340e<tier?(alert(_0x4cca51(0x11a)[_0x4cca51(0x17a)](_0x15f6d4,_0x19340e,tier)),SceneManager[_0x4cca51(0x121)]()):tier=Math[_0x4cca51(0x117)](_0x19340e,tier);}VisuMZ[_0x4cca51(0x172)](VisuMZ[label]['Settings'],_0x4edd97['parameters']);})(pluginData),VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x187)]={'LimitedUse':/<(?:LIMIT|LIMITED) (?:USE|USES):[ ](\d+)>/i,'UnlimitedUse':/<UNLIMITED (?:USE|USES)>/i,'RecoverVictory':/<(?:VICTORY|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverEscape':/<(?:ESCAPE|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'RecoverDefeat':/<(?:DEFEAT|AFTER BATTLE|BATTLE) (?:USE|USES) (?:RECOVER|RECOVERY):[ ](\d+)>/i,'BypassRecoverAll':/<BYPASS RECOVER ALL USES>/i,'AllowRecoverAll':/<ALLOW RECOVER ALL USES>/i,'UserGlobalLimitedUses':/<USER GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSTypeLimitedUses':/<USER STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'UserSkillLimitedUses':/<USER SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetGlobalLimitedUses':/<TARGET GLOBAL (?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSTypeLimitedUses':/<TARGET STYPE[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'TargetSkillLimitedUses':/<TARGET SKILL[ ](.*)[ ](?:USE|USES):[ ]([\+\-]\d+)>/gi,'GlobalLimitedUses':/<GLOBAL USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/i,'STypeLimitedUses':/<STYPE[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi,'SkillLimitedUses':/<SKILL[ ](.*)[ ]USE (?:MAX|MAXIMUM):[ ]([\+\-]\d+)>/gi},DataManager['getSkillIdWithName']=function(_0x18e7c4){const _0x29ff1e=_0x5b93a8;_0x18e7c4=_0x18e7c4[_0x29ff1e(0x152)]()[_0x29ff1e(0x161)](),this['_skillIDs']=this[_0x29ff1e(0x143)]||{};if(this[_0x29ff1e(0x143)][_0x18e7c4])return this['_skillIDs'][_0x18e7c4];for(const _0xd52ce4 of $dataSkills){if(!_0xd52ce4)continue;this[_0x29ff1e(0x143)][_0xd52ce4[_0x29ff1e(0x116)][_0x29ff1e(0x152)]()[_0x29ff1e(0x161)]()]=_0xd52ce4['id'];}return this['_skillIDs'][_0x18e7c4]||0x0;},DataManager[_0x5b93a8(0x129)]=function(_0x190208){const _0x278c01=_0x5b93a8;_0x190208=_0x190208['toUpperCase']()[_0x278c01(0x161)](),this[_0x278c01(0x13e)]=this[_0x278c01(0x13e)]||{};if(this['_stypeIDs'][_0x190208])return this[_0x278c01(0x13e)][_0x190208];for(let _0x27a219=0x1;_0x27a219<0x64;_0x27a219++){if(!$dataSystem[_0x278c01(0x171)][_0x27a219])continue;let _0x26b667=$dataSystem[_0x278c01(0x171)][_0x27a219]['toUpperCase']()[_0x278c01(0x161)]();_0x26b667=_0x26b667['replace'](/\x1I\[(\d+)\]/gi,''),_0x26b667=_0x26b667['replace'](/\\I\[(\d+)\]/gi,''),this[_0x278c01(0x13e)][_0x26b667]=_0x27a219;}return this[_0x278c01(0x13e)][_0x190208]||0x0;},DataManager['isSkillLimitedUse']=function(_0x58aa29){const _0x3ef956=_0x5b93a8;if(!_0x58aa29)return![];const _0x4477c8=VisuMZ['LimitedSkillUses'][_0x3ef956(0x187)],_0x3e9dc9=_0x58aa29['note'];if(_0x3e9dc9[_0x3ef956(0x111)](_0x4477c8[_0x3ef956(0x169)]))return!![];else{if(_0x3e9dc9[_0x3ef956(0x111)](_0x4477c8[_0x3ef956(0x125)]))return![];}return Game_BattlerBase[_0x3ef956(0x186)];},DataManager[_0x5b93a8(0x16c)]=function(_0x4485f3){const _0x471f8f=_0x5b93a8;if(!_0x4485f3)return![];const _0x1c4db2=VisuMZ[_0x471f8f(0x17c)][_0x471f8f(0x187)],_0x223677=_0x4485f3[_0x471f8f(0x13c)];if(Game_BattlerBase['LIMITED_SKILL_USE_RECOVER_ALL']){if(_0x223677[_0x471f8f(0x111)](_0x1c4db2[_0x471f8f(0x123)]))return![];return!![];}else{if(_0x223677['match'](_0x1c4db2[_0x471f8f(0x12d)]))return!![];return![];}},ImageManager[_0x5b93a8(0x145)]=VisuMZ['LimitedSkillUses'][_0x5b93a8(0x12b)]['General'][_0x5b93a8(0x15a)],TextManager[_0x5b93a8(0x16d)]=VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x12b)][_0x5b93a8(0x188)][_0x5b93a8(0x144)],TextManager[_0x5b93a8(0x15c)]=VisuMZ[_0x5b93a8(0x17c)]['Settings'][_0x5b93a8(0x188)][_0x5b93a8(0x122)],VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x189)]=BattleManager['endBattle'],BattleManager[_0x5b93a8(0x138)]=function(_0x47b6b2){const _0x42b6e8=_0x5b93a8;VisuMZ['LimitedSkillUses']['BattleManager_endBattle'][_0x42b6e8(0x14f)](this,_0x47b6b2),$gameParty[_0x42b6e8(0x162)](_0x47b6b2);},VisuMZ[_0x5b93a8(0x17c)]['Game_Action_applyItemUserEffect']=Game_Action[_0x5b93a8(0x16f)][_0x5b93a8(0x166)],Game_Action[_0x5b93a8(0x16f)][_0x5b93a8(0x166)]=function(_0x46410d){const _0x472c4f=_0x5b93a8;VisuMZ[_0x472c4f(0x17c)][_0x472c4f(0x10f)]['call'](this,_0x46410d),this['applyLimitedSkillUsesUserEffect'](_0x46410d);},Game_Action[_0x5b93a8(0x16f)]['applyLimitedSkillUsesUserEffect']=function(_0x4dc4ab){const _0x5189=_0x5b93a8;if(!this['item']())return;const _0x1dd83e=VisuMZ['LimitedSkillUses']['RegExp'];if(this['subject']()){const _0x361a42=_0x1dd83e[_0x5189(0x146)],_0x34e8f4=_0x1dd83e[_0x5189(0x118)],_0x1adea2=_0x1dd83e['UserSkillLimitedUses'];this[_0x5189(0x11c)]()[_0x5189(0x140)](this[_0x5189(0x115)](),_0x361a42,_0x34e8f4,_0x1adea2);}if(_0x4dc4ab){const _0x100e53=_0x1dd83e[_0x5189(0x154)],_0x51e9be=_0x1dd83e['TargetSTypeLimitedUses'],_0x3e59e7=_0x1dd83e['TargetSkillLimitedUses'];_0x4dc4ab['alterLimitedSkillUses'](this[_0x5189(0x115)](),_0x100e53,_0x51e9be,_0x3e59e7);}},VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x133)]=Game_Action[_0x5b93a8(0x16f)][_0x5b93a8(0x11d)],Game_Action[_0x5b93a8(0x16f)][_0x5b93a8(0x11d)]=function(_0x51c511,_0x7910a2){const _0x489c50=_0x5b93a8,_0x5aeb1d=VisuMZ[_0x489c50(0x17c)][_0x489c50(0x187)],_0x5bbe5b=this[_0x489c50(0x115)]()[_0x489c50(0x13c)],_0x1f7b01=['UserGlobalLimitedUses',_0x489c50(0x118),_0x489c50(0x114),'TargetGlobalLimitedUses',_0x489c50(0x153),_0x489c50(0x16e)];for(const _0x121c01 of _0x1f7b01){if(_0x5bbe5b[_0x489c50(0x111)](_0x5aeb1d[_0x121c01]))return!![];}return VisuMZ[_0x489c50(0x17c)][_0x489c50(0x133)][_0x489c50(0x14f)](this,_0x51c511,_0x7910a2);},Game_BattlerBase['LIMITED_SKILL_USE_ALL_LIMITED']=VisuMZ[_0x5b93a8(0x17c)]['Settings'][_0x5b93a8(0x150)][_0x5b93a8(0x168)],Game_BattlerBase[_0x5b93a8(0x176)]=VisuMZ[_0x5b93a8(0x17c)]['Settings'][_0x5b93a8(0x150)][_0x5b93a8(0x12c)],Game_BattlerBase[_0x5b93a8(0x14a)]=VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x12b)][_0x5b93a8(0x150)][_0x5b93a8(0x17b)],Game_BattlerBase[_0x5b93a8(0x155)]=VisuMZ[_0x5b93a8(0x17c)]['Settings'][_0x5b93a8(0x150)]['Minimum'],Game_BattlerBase['LIMITED_SKILL_USE_RECOVER_ALL']=VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x12b)][_0x5b93a8(0x150)]['RecoverAll'],VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x159)]=Game_BattlerBase[_0x5b93a8(0x16f)][_0x5b93a8(0x17e)],Game_BattlerBase['prototype']['meetsSkillConditions']=function(_0x279431){const _0x3e3e95=_0x5b93a8;if(DataManager[_0x3e3e95(0x12e)](_0x279431)&&!this[_0x3e3e95(0x18a)](_0x279431)){const _0xd12619=this[_0x3e3e95(0x178)](_0x279431['id']),_0x2de8d4=this['skillLimitedUseTimes'](_0x279431['id']);if(_0x2de8d4>=_0xd12619)return![];}return VisuMZ['LimitedSkillUses'][_0x3e3e95(0x159)][_0x3e3e95(0x14f)](this,_0x279431);},Game_BattlerBase[_0x5b93a8(0x16f)][_0x5b93a8(0x18a)]=function(_0x306380){const _0x5cd0ac=_0x5b93a8;if(!_0x306380)return![];return _0x306380['id']===this['attackSkillId']()||_0x306380['id']===this[_0x5cd0ac(0x16b)]();},VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x11b)]=Game_BattlerBase['prototype']['refresh'],Game_BattlerBase['prototype'][_0x5b93a8(0x14c)]=function(){const _0x5517a5=_0x5b93a8;this['_cache_SkillLimitedUseMax']={},VisuMZ['LimitedSkillUses'][_0x5517a5(0x11b)][_0x5517a5(0x14f)](this);},VisuMZ['LimitedSkillUses'][_0x5b93a8(0x174)]=Game_BattlerBase[_0x5b93a8(0x16f)][_0x5b93a8(0x17f)],Game_BattlerBase['prototype'][_0x5b93a8(0x17f)]=function(_0x978298){const _0x3c65e2=_0x5b93a8;VisuMZ[_0x3c65e2(0x17c)]['Game_BattlerBase_paySkillCost'][_0x3c65e2(0x14f)](this,_0x978298),DataManager['isSkillLimitedUse'](_0x978298)&&!this[_0x3c65e2(0x18a)](_0x978298)&&this[_0x3c65e2(0x120)](_0x978298['id'],0x1);},Game_BattlerBase[_0x5b93a8(0x16f)]['skillLimitedUseMax']=function(_0x33dd0d){const _0x5d9630=_0x5b93a8;this[_0x5d9630(0x17d)]=this[_0x5d9630(0x17d)]||{};if(this[_0x5d9630(0x17d)][_0x33dd0d])return this[_0x5d9630(0x17d)][_0x33dd0d];return this[_0x5d9630(0x17d)][_0x33dd0d]=this[_0x5d9630(0x160)](_0x33dd0d),this[_0x5d9630(0x17d)][_0x33dd0d];},Game_BattlerBase['prototype'][_0x5b93a8(0x160)]=function(_0x5124cf){const _0x3fa96a=_0x5b93a8,_0x5718e0=$dataSkills[_0x5124cf];if(!_0x5718e0)return 0x0;const _0x4f33e1=VisuMZ[_0x3fa96a(0x17c)]['RegExp'],_0x47812c=_0x5718e0[_0x3fa96a(0x13c)];let _0x55fc37=Game_BattlerBase[_0x3fa96a(0x176)];_0x47812c[_0x3fa96a(0x111)](_0x4f33e1[_0x3fa96a(0x169)])&&(_0x55fc37=Number(RegExp['$1']));const _0x5b2f70=this[_0x3fa96a(0x184)]();for(const _0x8ad4ea of _0x5b2f70){if(!_0x8ad4ea)continue;_0x8ad4ea[_0x3fa96a(0x13c)][_0x3fa96a(0x111)](_0x4f33e1[_0x3fa96a(0x170)])&&(_0x55fc37+=Number(RegExp['$1']));const _0x21eef1=_0x8ad4ea[_0x3fa96a(0x13c)]['match'](_0x4f33e1[_0x3fa96a(0x16a)]);if(_0x21eef1)for(const _0x3593c5 of _0x21eef1){if(!_0x3593c5)continue;_0x3593c5[_0x3fa96a(0x111)](_0x4f33e1[_0x3fa96a(0x16a)]);let _0x588900=String(RegExp['$1']);const _0x3990e8=Number(RegExp['$2']);_0x588900=(String(_0x588900)||'')[_0x3fa96a(0x161)]();const _0xd24f7a=/^\d+$/[_0x3fa96a(0x185)](_0x588900),_0x4adc63=_0xd24f7a?Number(_0x588900):DataManager['getStypeIdWithName'](_0x588900);if(_0x4adc63===_0x5718e0[_0x3fa96a(0x112)])_0x55fc37+=_0x3990e8;}const _0x57fc06=_0x8ad4ea[_0x3fa96a(0x13c)][_0x3fa96a(0x111)](_0x4f33e1[_0x3fa96a(0x183)]);if(_0x57fc06)for(const _0x270134 of _0x57fc06){if(!_0x270134)continue;_0x270134[_0x3fa96a(0x111)](_0x4f33e1[_0x3fa96a(0x183)]);let _0x3d8bc3=String(RegExp['$1']);const _0x42ac57=Number(RegExp['$2']);_0x3d8bc3=(String(_0x3d8bc3)||'')[_0x3fa96a(0x161)]();const _0x77e2f7=/^\d+$/['test'](_0x3d8bc3),_0x4a852b=_0x77e2f7?Number(_0x3d8bc3):DataManager['getSkillIdWithName'](_0x3d8bc3);if(_0x4a852b===_0x5124cf)_0x55fc37+=_0x42ac57;}}_0x55fc37=_0x55fc37||0x0;const _0x415dd4=Game_BattlerBase['LIMITED_SKILL_USE_HARDCAP_MIN'],_0xbc0201=Game_BattlerBase['LIMITED_SKILL_USE_HARDCAP_MAX'];return _0x55fc37['clamp'](_0x415dd4,_0xbc0201);},Game_BattlerBase[_0x5b93a8(0x16f)][_0x5b93a8(0x163)]=function(_0x33a406){const _0xc3980d=_0x5b93a8,_0x4a098a=this[_0xc3980d(0x178)](_0x33a406);this[_0xc3980d(0x10e)]=this[_0xc3980d(0x10e)]||{};if(this[_0xc3980d(0x10e)][_0x33a406])return this['_skillLimitedUseTimes'][_0x33a406];return this[_0xc3980d(0x10e)][_0x33a406]=0x0,Math[_0xc3980d(0x117)](0x0,this['_skillLimitedUseTimes'][_0x33a406]);},Game_BattlerBase[_0x5b93a8(0x16f)]['paySkillLimitedUse']=function(_0x41b99e,_0x3c547f){const _0x457ade=_0x5b93a8;_0x3c547f=_0x3c547f||0x0,this[_0x457ade(0x10e)]=this[_0x457ade(0x10e)]||{},this['_skillLimitedUseTimes'][_0x41b99e]=this[_0x457ade(0x10e)][_0x41b99e]||0x0,this[_0x457ade(0x10e)][_0x41b99e]+=_0x3c547f,this['_skillLimitedUseTimes'][_0x41b99e]=Math['max'](0x0,this['_skillLimitedUseTimes'][_0x41b99e]);},Game_BattlerBase[_0x5b93a8(0x16f)]['setSkillLimitedUseTimes']=function(_0x850fe9,_0xaa3701){const _0x315396=_0x5b93a8;_0xaa3701=_0xaa3701||0x0,this[_0x315396(0x10e)]=this[_0x315396(0x10e)]||{},this[_0x315396(0x10e)][_0x850fe9]=this[_0x315396(0x10e)][_0x850fe9]||0x0,this[_0x315396(0x10e)][_0x850fe9]=_0xaa3701,this['_skillLimitedUseTimes'][_0x850fe9]=Math[_0x315396(0x117)](0x0,this['_skillLimitedUseTimes'][_0x850fe9]);},VisuMZ['LimitedSkillUses']['Game_BattlerBase_recoverAll']=Game_BattlerBase[_0x5b93a8(0x16f)][_0x5b93a8(0x13b)],Game_BattlerBase[_0x5b93a8(0x16f)][_0x5b93a8(0x13b)]=function(){const _0x48ef14=_0x5b93a8;VisuMZ[_0x48ef14(0x17c)][_0x48ef14(0x131)]['call'](this),this['recoverAllLimitedSkillUses']();},Game_BattlerBase[_0x5b93a8(0x16f)]['recoverAllLimitedSkillUses']=function(){const _0x3e9f74=_0x5b93a8;this['_skillLimitedUseTimes']=this[_0x3e9f74(0x10e)]||{};for(const _0x1af681 in this['_skillLimitedUseTimes']){if(!this[_0x3e9f74(0x10e)][_0x1af681])continue;const _0x5cb332=Number(_0x1af681)||0x0,_0x13a59a=$dataSkills[_0x5cb332];if(!_0x13a59a)continue;DataManager['canRecoverAllLimitedSkillUses'](_0x13a59a)&&this['setSkillLimitedUseTimes'](_0x5cb332,0x0);}},Game_Battler['LIMITED_SKILL_USE_RECOVERY']={'victory':VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x12b)][_0x5b93a8(0x150)]['BattleVictory'],'escape':VisuMZ[_0x5b93a8(0x17c)]['Settings']['Mechanics'][_0x5b93a8(0x110)],'defeat':VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x12b)][_0x5b93a8(0x150)]['BattleDefeat']},Game_Battler[_0x5b93a8(0x16f)][_0x5b93a8(0x14d)]=function(_0x1fcc7d){const _0x2760fe=_0x5b93a8;for(const _0x12b1f8 of this[_0x2760fe(0x13d)]()){this[_0x2760fe(0x141)](_0x12b1f8,_0x1fcc7d);}},Game_Battler[_0x5b93a8(0x16f)]['endBattleRecoveryLimitedSkillUses']=function(_0x4c9b3a,_0x21b7ad){const _0x15f76b=_0x5b93a8;if(!_0x4c9b3a)return;if(!DataManager[_0x15f76b(0x12e)](_0x4c9b3a))return;const _0x4bec1e=VisuMZ[_0x15f76b(0x17c)][_0x15f76b(0x187)],_0x4a9503=_0x4c9b3a[_0x15f76b(0x13c)];let _0x280b82=0x0;if(_0x21b7ad===0x0)_0x4a9503[_0x15f76b(0x111)](_0x4bec1e['RecoverVictory'])?_0x280b82=Number(RegExp['$1']):_0x280b82=Game_Battler['LIMITED_SKILL_USE_RECOVERY'][_0x15f76b(0x13a)];else _0x21b7ad===0x1?_0x4a9503[_0x15f76b(0x111)](_0x4bec1e[_0x15f76b(0x149)])?_0x280b82=Number(RegExp['$1']):_0x280b82=Game_Battler[_0x15f76b(0x175)][_0x15f76b(0x165)]:_0x4a9503['match'](_0x4bec1e[_0x15f76b(0x136)])?_0x280b82=Number(RegExp['$1']):_0x280b82=Game_Battler['LIMITED_SKILL_USE_RECOVERY']['defeat'];this[_0x15f76b(0x120)](_0x4c9b3a['id'],-_0x280b82);},Game_Battler['prototype'][_0x5b93a8(0x140)]=function(_0x9be983,_0x3773e0,_0x5d45ad,_0x591fdf){const _0x22278f=_0x5b93a8;for(const _0x564fc6 of this[_0x22278f(0x13d)]()){if(!_0x564fc6)continue;if(!DataManager[_0x22278f(0x12e)](_0x564fc6))continue;if(this[_0x22278f(0x18a)](_0x564fc6))continue;const _0x544a60=_0x9be983[_0x22278f(0x13c)];let _0x100903=0x0;_0x544a60[_0x22278f(0x111)](_0x3773e0)&&(_0x100903+=Number(RegExp['$1'])||0x0);const _0x6beecd=_0x544a60[_0x22278f(0x111)](_0x5d45ad);if(_0x6beecd)for(const _0x4bc289 of _0x6beecd){if(!_0x4bc289)continue;_0x4bc289['match'](_0x5d45ad);let _0x254d28=String(RegExp['$1']);const _0x3d596a=Number(RegExp['$2']);_0x254d28=(String(_0x254d28)||'')[_0x22278f(0x161)]();const _0x2d7d8c=/^\d+$/[_0x22278f(0x185)](_0x254d28),_0xeecfb9=_0x2d7d8c?Number(_0x254d28):DataManager['getStypeIdWithName'](_0x254d28),_0x4b7919=DataManager[_0x22278f(0x157)](_0x564fc6)||[_0x564fc6[_0x22278f(0x112)]];if(_0x4b7919['includes'](_0xeecfb9))_0x100903+=_0x3d596a;}const _0x1ad9be=_0x544a60[_0x22278f(0x111)](_0x591fdf);if(_0x1ad9be)for(const _0x2db3e7 of _0x1ad9be){if(!_0x2db3e7)continue;_0x2db3e7[_0x22278f(0x111)](_0x591fdf);let _0x4130af=String(RegExp['$1']);const _0x27efeb=Number(RegExp['$2']);_0x4130af=(String(_0x4130af)||'')[_0x22278f(0x161)]();const _0x14df70=/^\d+$/['test'](_0x4130af),_0x36b4e9=_0x14df70?Number(_0x4130af):DataManager[_0x22278f(0x182)](_0x4130af);if(_0x36b4e9===_0x564fc6['id'])_0x100903+=_0x27efeb;}this[_0x22278f(0x120)](_0x564fc6['id'],-_0x100903);}},Game_Party['prototype'][_0x5b93a8(0x162)]=function(_0x227d77){const _0x4d7f96=_0x5b93a8,_0x319935=this[_0x4d7f96(0x177)];this[_0x4d7f96(0x177)]=![];for(const _0x3c11ff of this['allMembers']()){if(!_0x3c11ff)continue;_0x3c11ff['recoverLimitedSkillUsesBattle'](_0x227d77);}this[_0x4d7f96(0x177)]=_0x319935;},VisuMZ[_0x5b93a8(0x17c)][_0x5b93a8(0x151)]=Window_Base[_0x5b93a8(0x16f)][_0x5b93a8(0x130)],Window_Base[_0x5b93a8(0x16f)][_0x5b93a8(0x130)]=function(_0x35abfe,_0x5c883e,_0x3d2432){const _0x2e902a=_0x5b93a8;return _0x3d2432=VisuMZ[_0x2e902a(0x17c)][_0x2e902a(0x151)][_0x2e902a(0x14f)](this,_0x35abfe,_0x5c883e,_0x3d2432),_0x3d2432=this[_0x2e902a(0x12a)](_0x35abfe,_0x5c883e,_0x3d2432),_0x3d2432;},Window_Base[_0x5b93a8(0x16f)][_0x5b93a8(0x12a)]=function(_0x480104,_0x3d45c4,_0x1f2cbf){const _0x948f91=_0x5b93a8;if(!_0x480104)return _0x1f2cbf;if(!_0x3d45c4)return _0x1f2cbf;if(!DataManager[_0x948f91(0x12e)](_0x3d45c4))return _0x1f2cbf;if(_0x480104[_0x948f91(0x18a)](_0x3d45c4))return _0x1f2cbf;const _0x50b7c6=VisuMZ['LimitedSkillUses'][_0x948f91(0x12b)][_0x948f91(0x188)][_0x948f91(0x134)],_0x2d29fd=_0x480104[_0x948f91(0x178)](_0x3d45c4['id']),_0x177917=_0x480104[_0x948f91(0x163)](_0x3d45c4['id']),_0x2b5a01=Math[_0x948f91(0x117)](0x0,_0x2d29fd-_0x177917),_0x4bc8a0='\x5cI[%1]'[_0x948f91(0x17a)](ImageManager[_0x948f91(0x145)]),_0xbb9ede=_0x2b5a01>0x0?TextManager[_0x948f91(0x16d)]:TextManager[_0x948f91(0x15c)];let _0x3205b5=_0xbb9ede[_0x948f91(0x17a)](_0x2b5a01,_0x2d29fd,_0x177917,_0x4bc8a0);if(_0x1f2cbf==='')_0x1f2cbf+=_0x3205b5;else _0x50b7c6?_0x1f2cbf=_0x3205b5+this[_0x948f91(0x128)]()+_0x1f2cbf:_0x1f2cbf=_0x1f2cbf+this['skillCostSeparator']()+_0x3205b5;return _0x1f2cbf;};