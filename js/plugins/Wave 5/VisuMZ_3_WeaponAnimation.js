//=============================================================================
// VisuStella MZ - Weapon Animation
// VisuMZ_3_WeaponAnimation.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_WeaponAnimation = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaponAnimation = VisuMZ.WeaponAnimation || {};
VisuMZ.WeaponAnimation.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.08] [WeaponAnimation]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weapon_Animation_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Ever wanted to give your swords different images despite being the same
 * sword type? Or how about your axes? Or any weapon? Now you can! On top of
 * that, you can even use custom images to accomplish this.
 * 
 * This plugin allows you to go past the standard weapon images and even using
 * custom images.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Select different weapon animation from the weapon sprite sheets.
 * * Use custom images for weapon animations.
 * * Allow weapons to have their own unique weapon animation sprites.
 * * Customize hues and motions for the weapon animations.
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
 * * VisuMZ_1_BattleCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Sprite_Weapon loadBitmap function Change
 * 
 * Due to how this plugin works, loading bitmaps for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the bitmap data will be loaded differently to
 * accommodate the differences in file structure.
 *
 * ---
 * 
 * Sprite_Weapon updateFrame function Change
 * 
 * Due to how this plugin works, updating frames for the Sprite_Weapon
 * prototype class is now different. Depending if there is any data found for a
 * custom weapon animation, the frame data will be setup differently to
 * accommodate the differences in file structure.
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
 * === Weapon Image-Related Notetags ===
 * 
 * ---
 *
 * <Weapon Image: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a numeric type.
 * - Replace 'x' with a number representing the weapon image's ID.
 * - You'll get an image from "img/system/" folder's weapon sheets.
 * - Each sheet contains 12 weapon images. If you wish to load a weapon from
 *   the first sheet, it'll be within 1-12.
 * - If you wish to load a weapon from the second sheet, it'll be within 13-24,
 *   and so on.
 * - The weapon sheets increase in increments of 12, which means that if you
 *   wish to load a weapon from weapon sheet 50, x will be between 589 to 600.
 *
 *   By default, these are the number values associated with each:
 * 
 *   1 - Dagger   7 - Long Bow  13 - Mace       19 - Slingshot  25 - Book
 *   2 - Sword    8 - Crossbow  14 - Rod        20 - Shotgun    26 - Custom
 *   3 - Flail    9 - Gun       15 - Club       21 - Rifle      27 - Custom
 *   4 - Axe     10 - Claw      16 - Chain      22 - Chainsaw   28 - Custom
 *   5 - Whip    11 - Glove     17 - Sword#2    23 - Railgun    29 - Custom
 *   6 - Staff   12 - Spear     18 - Iron Pipe  24 - Stun Rod   30 - Custom
 *
 * ---
 *
 * <Weapon Image: filename>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes the weapon image used for the affected battler to a unique file.
 * - Replace 'filename' with the name of the file found in the "img/weapons/"
 *   folder (or whichever folder you've set it to in the plugin parameters).
 * - This is case sensitive.
 * - Do not include the file extension.
 * 
 *   Example:
 * 
 *   <Weapon Image: Beam Sword>
 *
 * ---
 *
 * <Weapon Motion: thrust>
 * <Weapon Motion: swing>
 * <Weapon Motion: missile>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Forces the weapon to play a specific motion when attacking.
 * - If this is not defined, the played motion will be the custom motion
 *   declared in the plugin parameters.
 * - You can also replace the motion type with the following:
 * 
 *   walk     wait     chant     guard     damage     evade
 *   thrust   swing    missile   skill     spell      item
 *   escape   victory  dying     abnormal  sleep      dead
 *
 * ---
 *
 * <Weapon Hue: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This notetag requires a <Weapon Image: x> or <Weapon Image: filename>
 *   notetag on the same trait object.
 * - Changes the hue of the custom weapon image.
 * - Replace 'x' with a hue number between 0 and 255.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * There's a couple of plugin parameters that can be adjusted for this plugin.
 *
 * ---
 *
 * General
 * 
 *   Image Filepath:
 *   - The filepath used for custom weapon images folder.
 *   - This defaults to "img/weapons/"
 * 
 *   Default Motion:
 *   - Default motion used for custom weapon images.
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
 * Version 1.08: February 17, 2022
 * * Bug Fixes!
 * ** Added a fail safe to prevent freeze motion frames on items trying to use
 *    custom weapon sprites, but do not actually have them in the game project.
 *    Fix made by Olivia.
 * 
 * Version 1.07: January 27, 2022
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will default to the enforced
 *    weapon graphic if there is no custom weapon sprite on the weapon, but on
 *    a piece of armor instead. Update made by Olivia.
 * 
 * Version 1.06: June 11, 2021
 * * Bug Fixes!
 * ** Freeze motion frames for weapon attacks will no longer cause crashes if
 *    the user does not have a weapon equipped. Fix made by Olivia.
 * 
 * Version 1.05: April 9, 2021
 * * Bug Fixes!
 * ** Freeze Motions should now hide weapons instead of always displaying them
 *    when the hide option is enabled. Fix made by Olivia.
 * 
 * Version 1.04: February 12, 2021
 * * Bug Fixes!
 * ** Freeze frame now supports enemy custom weapon images. Fix made by Irina.
 * 
 * Version 1.03: January 29, 2021
 * * Bug Fixes!
 * ** Basic weapon animations should now show the proper weapon image.
 *    Fix made by Olivia.
 * ** Freeze frame now supports custom non-attack animations. Fix by Olivia.
 * 
 * Version 1.02: January 22, 2021
 * * Compatibility Update
 * ** Plugin is now compatible with Battle Core's Freeze Motion.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** If battlers with custom weapon animations perform an Action Sequence with
 *    "Show Weapon" set to false, they will no longer force the attack motion.
 *    Fix made by Yanfly.
 *
 * Version 1.00: November 25, 2020
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
 * @param WeaponAnimation
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param filepath:str
 * @text Image Filepath
 * @desc The filepath used for custom weapon images folder.
 * @default img/weapons/
 *
 * @param motion:str
 * @text Default Motion
 * @type combo
 * @option swing
 * @option thrust
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Default motion used for custom weapon images.
 * @default swing
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
//=============================================================================

function _0x45fe(){const _0x3debca=['trim','toLowerCase','287rWvCfH','FUNC','map','Game_Battler_startWeaponAnimation','version','description','aXvZq','max','setHue','MbNqI','EVAL','isActor','Game_BattlerBase_initMembers','weaponImageId','Sprite_Weapon_loadBitmap','ARRAYFUNC','setFrame','isEnemy','Game_Battler_freezeMotion','name','hue','preloadCustomWeaponImage','lXEsk','NUM','motion','JSON','STR','checkCacheKey','width','note','call','88FSshAd','gTkWY','format','ARRAYSTR','height','motionType','requestMotion','match','vxjrs','enemy','number','_weaponImageId','2870YWCXyg','PtkAS','_customFrames','29902180WUOvQO','return\x200','_cache','refresh','Settings','2972GjmAgu','CNNTZ','startWeaponAnimation','includes','parameters','_pattern','loadWeapon','isCustomWeaponGraphic','initMembers','ARRAYSTRUCT','exit','bitmap','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','gsXTE','ARRAYNUM','prototype','13CEUeoO','jMbYZ','ARRAYEVAL','startAction','filepath','loadBitmapCustomWeapon','updateFrame','ConvertParams','floor','EjXCS','985LFZYgX','STRUCT','BattleManager_startAction','WeaponAnimation','329412miVYcz','tkLrZ','3529XjhNsK','1341VtJeBE','loadSystem','clamp','updateFrameCustomWeaponGraphic','167576vFClII','customWeaponGraphic','createCustomWeaponGraphicFromObj','PbJGd','15216zFSRSz','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_freezeMotionData','Weapons','amEaJ','createCustomWeaponGraphic','RegExp','31617XQUhry','status','Game_BattlerBase_refresh','Sprite_Weapon_updateFrame','_uniqueStartWeaponAnimation','376KPTpUk','Yyjem','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','loadBitmap','parse','freezeMotion'];_0x45fe=function(){return _0x3debca;};return _0x45fe();}const _0x1e258c=_0x467d;function _0x467d(_0x409045,_0x22132b){const _0x45feab=_0x45fe();return _0x467d=function(_0x467df3,_0x4b4d6f){_0x467df3=_0x467df3-0x19f;let _0x25ae81=_0x45feab[_0x467df3];return _0x25ae81;},_0x467d(_0x409045,_0x22132b);}(function(_0xb059d3,_0x4ca2e9){const _0x551c3b=_0x467d,_0x2c7238=_0xb059d3();while(!![]){try{const _0x20b209=-parseInt(_0x551c3b(0x206))/0x1*(-parseInt(_0x551c3b(0x1ab))/0x2)+parseInt(_0x551c3b(0x207))/0x3*(parseInt(_0x551c3b(0x1e6))/0x4)+parseInt(_0x551c3b(0x200))/0x5*(-parseInt(_0x551c3b(0x19f))/0x6)+parseInt(_0x551c3b(0x1b3))/0x7*(-parseInt(_0x551c3b(0x20b))/0x8)+parseInt(_0x551c3b(0x1a6))/0x9*(-parseInt(_0x551c3b(0x1de))/0xa)+-parseInt(_0x551c3b(0x1d2))/0xb*(parseInt(_0x551c3b(0x204))/0xc)+parseInt(_0x551c3b(0x1f6))/0xd*(parseInt(_0x551c3b(0x1e1))/0xe);if(_0x20b209===_0x4ca2e9)break;else _0x2c7238['push'](_0x2c7238['shift']());}catch(_0x3516da){_0x2c7238['push'](_0x2c7238['shift']());}}}(_0x45fe,0x851a1));var label=_0x1e258c(0x203),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins['filter'](function(_0x3a9c73){const _0x4aea29=_0x1e258c;return _0x3a9c73[_0x4aea29(0x1a7)]&&_0x3a9c73[_0x4aea29(0x1b8)][_0x4aea29(0x1e9)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x1e258c(0x1e5)]||{},VisuMZ[_0x1e258c(0x1fd)]=function(_0x570be6,_0x54ae9a){const _0x593188=_0x1e258c;for(const _0x5023f9 in _0x54ae9a){if(_0x5023f9[_0x593188(0x1d9)](/(.*):(.*)/i)){const _0x492f16=String(RegExp['$1']),_0xdc8d4f=String(RegExp['$2'])['toUpperCase']()[_0x593188(0x1b1)]();let _0x5ae9fe,_0x31e797,_0x34bd9b;switch(_0xdc8d4f){case _0x593188(0x1ca):_0x5ae9fe=_0x54ae9a[_0x5023f9]!==''?Number(_0x54ae9a[_0x5023f9]):0x0;break;case _0x593188(0x1f4):_0x31e797=_0x54ae9a[_0x5023f9]!==''?JSON[_0x593188(0x1af)](_0x54ae9a[_0x5023f9]):[],_0x5ae9fe=_0x31e797[_0x593188(0x1b5)](_0x575b30=>Number(_0x575b30));break;case _0x593188(0x1bd):_0x5ae9fe=_0x54ae9a[_0x5023f9]!==''?eval(_0x54ae9a[_0x5023f9]):null;break;case _0x593188(0x1f8):_0x31e797=_0x54ae9a[_0x5023f9]!==''?JSON[_0x593188(0x1af)](_0x54ae9a[_0x5023f9]):[],_0x5ae9fe=_0x31e797[_0x593188(0x1b5)](_0x413c33=>eval(_0x413c33));break;case _0x593188(0x1cc):_0x5ae9fe=_0x54ae9a[_0x5023f9]!==''?JSON[_0x593188(0x1af)](_0x54ae9a[_0x5023f9]):'';break;case'ARRAYJSON':_0x31e797=_0x54ae9a[_0x5023f9]!==''?JSON['parse'](_0x54ae9a[_0x5023f9]):[],_0x5ae9fe=_0x31e797['map'](_0x42abd6=>JSON[_0x593188(0x1af)](_0x42abd6));break;case _0x593188(0x1b4):_0x5ae9fe=_0x54ae9a[_0x5023f9]!==''?new Function(JSON[_0x593188(0x1af)](_0x54ae9a[_0x5023f9])):new Function(_0x593188(0x1e2));break;case _0x593188(0x1c2):_0x31e797=_0x54ae9a[_0x5023f9]!==''?JSON['parse'](_0x54ae9a[_0x5023f9]):[],_0x5ae9fe=_0x31e797[_0x593188(0x1b5)](_0x4a5df0=>new Function(JSON[_0x593188(0x1af)](_0x4a5df0)));break;case _0x593188(0x1cd):_0x5ae9fe=_0x54ae9a[_0x5023f9]!==''?String(_0x54ae9a[_0x5023f9]):'';break;case _0x593188(0x1d5):_0x31e797=_0x54ae9a[_0x5023f9]!==''?JSON[_0x593188(0x1af)](_0x54ae9a[_0x5023f9]):[],_0x5ae9fe=_0x31e797[_0x593188(0x1b5)](_0x227ae6=>String(_0x227ae6));break;case _0x593188(0x201):_0x34bd9b=_0x54ae9a[_0x5023f9]!==''?JSON[_0x593188(0x1af)](_0x54ae9a[_0x5023f9]):{},_0x5ae9fe=VisuMZ[_0x593188(0x1fd)]({},_0x34bd9b);break;case _0x593188(0x1ef):_0x31e797=_0x54ae9a[_0x5023f9]!==''?JSON[_0x593188(0x1af)](_0x54ae9a[_0x5023f9]):[],_0x5ae9fe=_0x31e797[_0x593188(0x1b5)](_0x2c74c9=>VisuMZ[_0x593188(0x1fd)]({},JSON[_0x593188(0x1af)](_0x2c74c9)));break;default:continue;}_0x570be6[_0x492f16]=_0x5ae9fe;}}return _0x570be6;},(_0x33bde5=>{const _0x5c71e5=_0x1e258c,_0x3a6f7b=_0x33bde5[_0x5c71e5(0x1c6)];for(const _0x3dc7cc of dependencies){if(_0x5c71e5(0x1da)!=='bmxoZ'){if(!Imported[_0x3dc7cc]){alert(_0x5c71e5(0x1f2)[_0x5c71e5(0x1d4)](_0x3a6f7b,_0x3dc7cc)),SceneManager[_0x5c71e5(0x1f0)]();break;}}else _0x13f80e=_0x2965cd(_0x47da7c['$1'])||0x1;}const _0x3cc130=_0x33bde5['description'];if(_0x3cc130[_0x5c71e5(0x1d9)](/\[Version[ ](.*?)\]/i)){const _0x28399b=Number(RegExp['$1']);_0x28399b!==VisuMZ[label][_0x5c71e5(0x1b7)]&&(alert(_0x5c71e5(0x1a0)['format'](_0x3a6f7b,_0x28399b)),SceneManager['exit']());}if(_0x3cc130[_0x5c71e5(0x1d9)](/\[Tier[ ](\d+)\]/i)){const _0x4881f7=Number(RegExp['$1']);_0x4881f7<tier?'aXvZq'!==_0x5c71e5(0x1b9)?(_0x42ff52=_0x4d6a5a(_0x15ab79['$1']),_0x25dcf1--):(alert(_0x5c71e5(0x1ad)['format'](_0x3a6f7b,_0x4881f7,tier)),SceneManager[_0x5c71e5(0x1f0)]()):tier=Math[_0x5c71e5(0x1ba)](_0x4881f7,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x33bde5[_0x5c71e5(0x1ea)]);})(pluginData),VisuMZ[_0x1e258c(0x203)][_0x1e258c(0x1a5)]={'ImageNum':/<WEAPON IMAGE:[ ](\d+)>/i,'ImageStr':/<WEAPON IMAGE:[ ](.*)>/i,'Hue':/<WEAPON HUE:[ ](\d+)>/i,'Motion':/<WEAPON MOTION:[ ](.*)>/i},ImageManager[_0x1e258c(0x1ec)]=function(_0x18373d){const _0x533603=_0x1e258c,_0xd6f64c=VisuMZ[_0x533603(0x203)][_0x533603(0x1e5)][_0x533603(0x1fa)];return this[_0x533603(0x1ae)](_0xd6f64c,_0x18373d);},VisuMZ['WeaponAnimation'][_0x1e258c(0x202)]=BattleManager[_0x1e258c(0x1f9)],BattleManager[_0x1e258c(0x1f9)]=function(){const _0x446e8d=_0x1e258c;VisuMZ[_0x446e8d(0x203)][_0x446e8d(0x202)][_0x446e8d(0x1d1)](this),this['_subject']&&this['_subject'][_0x446e8d(0x1c8)]();},VisuMZ['WeaponAnimation'][_0x1e258c(0x1bf)]=Game_BattlerBase['prototype'][_0x1e258c(0x1ee)],Game_BattlerBase[_0x1e258c(0x1f5)][_0x1e258c(0x1ee)]=function(){const _0x4c8783=_0x1e258c;this[_0x4c8783(0x1e3)]={},VisuMZ['WeaponAnimation'][_0x4c8783(0x1bf)][_0x4c8783(0x1d1)](this);},VisuMZ[_0x1e258c(0x203)]['Game_BattlerBase_refresh']=Game_BattlerBase['prototype'][_0x1e258c(0x1e4)],Game_BattlerBase[_0x1e258c(0x1f5)][_0x1e258c(0x1e4)]=function(){const _0x53d319=_0x1e258c;this[_0x53d319(0x1e3)]={},VisuMZ[_0x53d319(0x203)][_0x53d319(0x1a8)]['call'](this);},Game_BattlerBase[_0x1e258c(0x1f5)]['checkCacheKey']=function(_0x2e9a04){const _0x3685bc=_0x1e258c;return this[_0x3685bc(0x1e3)]=this[_0x3685bc(0x1e3)]||{},this[_0x3685bc(0x1e3)][_0x2e9a04]!==undefined;},Game_BattlerBase[_0x1e258c(0x1f5)][_0x1e258c(0x20c)]=function(){const _0x57e9e9=_0x1e258c;let _0x50ea34=_0x57e9e9(0x20c);if(this[_0x57e9e9(0x1ce)](_0x50ea34))return this[_0x57e9e9(0x1e3)][_0x50ea34];return this[_0x57e9e9(0x1e3)][_0x50ea34]=this['createCustomWeaponGraphic'](),this['_cache'][_0x50ea34];},Game_BattlerBase[_0x1e258c(0x1f5)][_0x1e258c(0x1a4)]=function(){const _0x32ca84=_0x1e258c;for(const _0x218fcc of this['traitObjects']()){if(_0x32ca84(0x1f3)!=='gsXTE')this[_0x32ca84(0x1ed)]()?this['updateFrameCustomWeaponGraphic']():_0x12bf76[_0x32ca84(0x203)][_0x32ca84(0x1a9)][_0x32ca84(0x1d1)](this);else{if(!_0x218fcc)continue;const _0x2bc1f4=this['createCustomWeaponGraphicFromObj'](_0x218fcc);if(_0x2bc1f4[_0x32ca84(0x1c6)]!==0x0)return{'name':_0x2bc1f4[_0x32ca84(0x1c6)],'hue':_0x2bc1f4[_0x32ca84(0x1c7)],'motion':_0x2bc1f4[_0x32ca84(0x1cb)]};}}return 0x0;},Game_BattlerBase[_0x1e258c(0x1f5)][_0x1e258c(0x20d)]=function(_0xcd6201){const _0x46b06a=_0x1e258c,_0x5570e4=VisuMZ[_0x46b06a(0x203)][_0x46b06a(0x1a5)];let _0x58a287=0x0,_0x31207a=0x0,_0x35a115=VisuMZ['WeaponAnimation'][_0x46b06a(0x1e5)][_0x46b06a(0x1cb)];const _0x574fd4=_0xcd6201?_0xcd6201[_0x46b06a(0x1d0)]:'';if(_0x574fd4[_0x46b06a(0x1d9)](_0x5570e4['ImageNum']))_0x46b06a(0x1f7)!==_0x46b06a(0x1f7)?_0x41cf98['WeaponAnimation'][_0x46b06a(0x1a9)][_0x46b06a(0x1d1)](this):_0x58a287=Number(RegExp['$1'])||0x1;else _0x574fd4[_0x46b06a(0x1d9)](_0x5570e4['ImageStr'])&&(_0x58a287=String(RegExp['$1']));_0x574fd4['match'](_0x5570e4['Hue'])&&(_0x31207a=Number(RegExp['$1'])[_0x46b06a(0x209)](0x0,0xff));if(_0x574fd4['match'](_0x5570e4['Motion'])){if(_0x46b06a(0x205)===_0x46b06a(0x1c9))return this[_0x46b06a(0x1e3)]=this[_0x46b06a(0x1e3)]||{},this['_cache'][_0xb26b98]!==_0x126d88;else _0x35a115=String(RegExp['$1'])[_0x46b06a(0x1b2)]()[_0x46b06a(0x1b1)]();}return{'name':_0x58a287,'hue':_0x31207a,'motion':_0x35a115};},VisuMZ[_0x1e258c(0x203)][_0x1e258c(0x1b6)]=Game_Battler['prototype'][_0x1e258c(0x1e8)],Game_Battler[_0x1e258c(0x1f5)][_0x1e258c(0x1e8)]=function(_0x35ed3a){const _0x34f9b3=_0x1e258c;if(this[_0x34f9b3(0x1aa)])return;let _0x319ba2=![];this[_0x34f9b3(0x20c)]()&&_0x35ed3a>0x0&&(_0x35ed3a=this[_0x34f9b3(0x20c)](),_0x319ba2=!![]);VisuMZ[_0x34f9b3(0x203)][_0x34f9b3(0x1b6)][_0x34f9b3(0x1d1)](this,_0x35ed3a);if(!_0x319ba2)return;if(_0x35ed3a===0x0)return;this[_0x34f9b3(0x1aa)]=!![],this[_0x34f9b3(0x1d8)](_0x35ed3a[_0x34f9b3(0x1cb)]||'swing'),this[_0x34f9b3(0x1aa)]=![];},Game_Battler['prototype'][_0x1e258c(0x1c8)]=function(){const _0x131977=_0x1e258c;if(!this['customWeaponGraphic']())return;const _0x22dd2e=this['customWeaponGraphic']();if(typeof _0x22dd2e['name']===_0x131977(0x1dc)){const _0x3c2f19=Math[_0x131977(0x1fe)]((_0x22dd2e[_0x131977(0x1c6)]-0x1)/0xc)+0x1;ImageManager[_0x131977(0x208)]('Weapons'+_0x3c2f19);}else ImageManager[_0x131977(0x1ec)](_0x22dd2e[_0x131977(0x1c6)]);},VisuMZ[_0x1e258c(0x203)][_0x1e258c(0x1c5)]=Game_Battler[_0x1e258c(0x1f5)][_0x1e258c(0x1b0)],Game_Battler[_0x1e258c(0x1f5)][_0x1e258c(0x1b0)]=function(_0x56e468,_0x3a05ad,_0x205475){const _0x12b0c0=_0x1e258c;VisuMZ['WeaponAnimation'][_0x12b0c0(0x1c5)][_0x12b0c0(0x1d1)](this,_0x56e468,_0x3a05ad,_0x205475);if(!_0x3a05ad){if(_0x12b0c0(0x20e)===_0x12b0c0(0x1ac))this[_0x12b0c0(0x1f1)]=_0xbbf228[_0x12b0c0(0x208)]('');else return;}let _0x1addbc=0x0;_0x56e468[_0x12b0c0(0x1d9)](/ATTACK[ ](\d+)/i)&&(_0x1addbc=Number(RegExp['$1']),_0x1addbc--);if(this[_0x12b0c0(0x1be)]()){if(_0x12b0c0(0x1a3)!==_0x12b0c0(0x1df)){const _0x4e0747=this['weapons'](),_0x2029e3=_0x4e0747[_0x1addbc]||null,_0x423d7d=this[_0x12b0c0(0x20d)](_0x2029e3);if(_0x423d7d[_0x12b0c0(0x1c6)]!==0x0){if('nZqae'!=='nZqae'){if(!this[_0x12b0c0(0x1dd)])return;if(typeof this[_0x12b0c0(0x1dd)]['name']===_0x12b0c0(0x1dc)){const _0x3b0ac4=(this[_0x12b0c0(0x1dd)][_0x12b0c0(0x1c6)]-0x1)%0xc,_0x218150=0x60,_0x5858e2=0x40,_0x29bba9=(_0x1f2c04[_0x12b0c0(0x1fe)](_0x3b0ac4/0x6)*0x3+this[_0x12b0c0(0x1eb)])*_0x218150,_0x112c21=_0x5b8332[_0x12b0c0(0x1fe)](_0x3b0ac4%0x6)*_0x5858e2;this[_0x12b0c0(0x1c3)](_0x29bba9,_0x112c21,_0x218150,_0x5858e2);}else{const _0x332347=_0x12c0fe[_0x12b0c0(0x1fe)](this[_0x12b0c0(0x1f1)][_0x12b0c0(0x1cf)]/0x3),_0x192db0=this['bitmap']['height'],_0x134cbe=this[_0x12b0c0(0x1eb)]*_0x332347,_0x27a1d7=0x0;this[_0x12b0c0(0x1c3)](_0x134cbe,_0x27a1d7,_0x332347,_0x192db0);}}else _0x56e468['match'](/ATTACK/i)&&(this[_0x12b0c0(0x1a1)][_0x12b0c0(0x1d7)]=_0x423d7d[_0x12b0c0(0x1cb)]),this['_freezeMotionData'][_0x12b0c0(0x1c0)]=_0x423d7d['name'];}else{const _0x496aa8=this[_0x12b0c0(0x20c)]();_0x496aa8['name']!==0x0&&(_0x56e468[_0x12b0c0(0x1d9)](/ATTACK/i)&&(this['_freezeMotionData'][_0x12b0c0(0x1d7)]=_0x496aa8[_0x12b0c0(0x1cb)]),this[_0x12b0c0(0x1a1)][_0x12b0c0(0x1c0)]=_0x496aa8[_0x12b0c0(0x1c6)]);}}else _0x4ceb2f=_0x57af92(_0x407a85['$1']);}else{if(this[_0x12b0c0(0x1c4)]()){if(_0x12b0c0(0x1d3)!=='eoLvc'){const _0x510b86=this[_0x12b0c0(0x20d)](this[_0x12b0c0(0x1db)]());_0x510b86['name']!==0x0&&(_0x56e468[_0x12b0c0(0x1d9)](/ATTACK/i)&&(this[_0x12b0c0(0x1a1)]['motionType']=_0x510b86['motion']),this[_0x12b0c0(0x1a1)][_0x12b0c0(0x1c0)]=_0x510b86[_0x12b0c0(0x1c6)]);}else{if(this[_0x12b0c0(0x1aa)])return;let _0x9e37c2=![];this[_0x12b0c0(0x20c)]()&&_0x594436>0x0&&(_0x441bb6=this[_0x12b0c0(0x20c)](),_0x9e37c2=!![]);_0x249551['WeaponAnimation'][_0x12b0c0(0x1b6)][_0x12b0c0(0x1d1)](this,_0x254303);if(!_0x9e37c2)return;if(_0x46598a===0x0)return;this[_0x12b0c0(0x1aa)]=!![],this[_0x12b0c0(0x1d8)](_0x317e61['motion']||'swing'),this['_uniqueStartWeaponAnimation']=![];}}}},Sprite_Weapon[_0x1e258c(0x1f5)][_0x1e258c(0x1ed)]=function(){const _0x560db8=_0x1e258c;return typeof this[_0x560db8(0x1dd)]!==_0x560db8(0x1dc);},VisuMZ['WeaponAnimation'][_0x1e258c(0x1c1)]=Sprite_Weapon[_0x1e258c(0x1f5)][_0x1e258c(0x1ae)],Sprite_Weapon[_0x1e258c(0x1f5)][_0x1e258c(0x1ae)]=function(){const _0x2c43af=_0x1e258c;this[_0x2c43af(0x1ed)]()?this[_0x2c43af(0x1fb)]():'ELITG'!==_0x2c43af(0x1ff)?(this['_customFrames']=![],VisuMZ[_0x2c43af(0x203)][_0x2c43af(0x1c1)]['call'](this),this[_0x2c43af(0x1bb)](0x0)):this[_0x2c43af(0x1f1)]=_0x192fe1[_0x2c43af(0x208)](_0x2c43af(0x1a2)+_0xec43a1);},Sprite_Weapon['prototype'][_0x1e258c(0x1fb)]=function(){const _0xc87778=_0x1e258c;if(!this[_0xc87778(0x1dd)])return;if(typeof this[_0xc87778(0x1dd)][_0xc87778(0x1c6)]===_0xc87778(0x1dc)){if(_0xc87778(0x1bc)!==_0xc87778(0x1e7)){const _0x57f161=Math[_0xc87778(0x1fe)]((this['_weaponImageId'][_0xc87778(0x1c6)]-0x1)/0xc)+0x1;_0x57f161>=0x1?this[_0xc87778(0x1f1)]=ImageManager['loadSystem'](_0xc87778(0x1a2)+_0x57f161):this['bitmap']=ImageManager[_0xc87778(0x208)]('');}else _0x30e980=_0xc71067(_0xe947e['$1'])[_0xc87778(0x1b2)]()['trim']();}else{this[_0xc87778(0x1e0)]=!![];const _0x8ba0f4=this[_0xc87778(0x1dd)][_0xc87778(0x1c6)]?this['_weaponImageId'][_0xc87778(0x1c6)]:this[_0xc87778(0x1dd)];this[_0xc87778(0x1f1)]=ImageManager[_0xc87778(0x1ec)](_0x8ba0f4||'');}this[_0xc87778(0x1bb)](this[_0xc87778(0x1dd)][_0xc87778(0x1c7)]||0x0);},VisuMZ['WeaponAnimation'][_0x1e258c(0x1a9)]=Sprite_Weapon[_0x1e258c(0x1f5)][_0x1e258c(0x1fc)],Sprite_Weapon[_0x1e258c(0x1f5)][_0x1e258c(0x1fc)]=function(){const _0x157882=_0x1e258c;this['isCustomWeaponGraphic']()?this[_0x157882(0x20a)]():VisuMZ[_0x157882(0x203)][_0x157882(0x1a9)][_0x157882(0x1d1)](this);},Sprite_Weapon[_0x1e258c(0x1f5)][_0x1e258c(0x20a)]=function(){const _0x352e02=_0x1e258c;if(!this['_weaponImageId'])return;if(typeof this[_0x352e02(0x1dd)]['name']===_0x352e02(0x1dc)){const _0x4dc1f1=(this[_0x352e02(0x1dd)][_0x352e02(0x1c6)]-0x1)%0xc,_0x38fa98=0x60,_0x16e60b=0x40,_0x444963=(Math[_0x352e02(0x1fe)](_0x4dc1f1/0x6)*0x3+this[_0x352e02(0x1eb)])*_0x38fa98,_0x59e897=Math[_0x352e02(0x1fe)](_0x4dc1f1%0x6)*_0x16e60b;this[_0x352e02(0x1c3)](_0x444963,_0x59e897,_0x38fa98,_0x16e60b);}else{const _0x405a86=Math[_0x352e02(0x1fe)](this[_0x352e02(0x1f1)]['width']/0x3),_0x1697e9=this['bitmap'][_0x352e02(0x1d6)],_0x577cd8=this[_0x352e02(0x1eb)]*_0x405a86,_0x256d43=0x0;this['setFrame'](_0x577cd8,_0x256d43,_0x405a86,_0x1697e9);}};