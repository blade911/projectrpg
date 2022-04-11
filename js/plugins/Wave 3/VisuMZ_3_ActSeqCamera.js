//=============================================================================
// VisuStella MZ - Action Sequence Camera
// VisuMZ_3_ActSeqCamera.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqCamera = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqCamera = VisuMZ.ActSeqCamera || {};
VisuMZ.ActSeqCamera.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.03] [ActSeqCamera]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Camera_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds new Action Sequences functions to the VisuStella MZ
 * Battle Core plugin to give you, the game dev, control over the battle camera
 * and zoom functions.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Attach the camera to a specific point on the screen.
 * * Attach the camera to a specific target(s) on the screen.
 * * Pan the camera to be off center using the offset functions.
 * * Remove camera clamping to let the camera go out of bounds.
 * * Set the camera zoom level as you want.
 * * Tilt the camera by adjust the angle.
 * * New Options added to let the player turn on/off the battle camera.
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
 * - VisuMZ_0_CoreEngine
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Spriteset Position Rewrite
 *
 * - The Spriteset_Battle function for updatePosition needed to be rewritten in
 * order to allow all the new features and functions added by the battle camera
 * and zoom.
 * 
 * - Camera tricks like zooming, panning, and tilting will be reset during the
 * input phase to ensure the player is able to see the whole battlefield.
 * 
 * - The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 *
 * ---
 * 
 * === Action Sequences - Angle (Camera) ===
 * 
 * These action sequences allow you to have control over the camera angle.
 * 
 * ---
 *
 * ANGLE: Change Angle
 * - Changes the camera angle.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Angle:
 *   - Change the camera angle to this many degrees.
 *
 *   Duration:
 *   - Duration in frames to change camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Reset Angle
 * - Reset any angle settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera angle.
 *
 *   Angle Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Angle?:
 *   - Wait for angle changes to complete before performing next command?
 *
 * ---
 *
 * ANGLE: Wait For Angle
 * - Waits for angle changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Camera Control ===
 *
 * These Action Sequences are battle camera-related.
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 * 
 * === Action Sequences - Skew (Camera) ===
 * 
 * These action sequences allow you to have control over the camera skew.
 * 
 * ---
 *
 * SKEW: Change Skew
 * - Changes the camera skew.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Skew X:
 *   - Change the camera skew X to this value.
 *
 *   Skew Y:
 *   - Change the camera skew Y to this value.
 *
 *   Duration:
 *   - Duration in frames to change camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Reset Skew
 * - Reset any skew settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset camera skew.
 *
 *   Skew Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Skew?:
 *   - Wait for skew changes to complete before performing next command?
 *
 * ---
 *
 * SKEW: Wait For Skew
 * - Waits for skew changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Zoom (Camera) ===
 *
 * These Action Sequences are zoom-related.
 *
 * ---
 *
 * ZOOM: Change Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Reset Zoom
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * These plugin parameters add a new options command in order to let the player
 * decide if they want the battle camera ON or OFF.
 * 
 * The player has the option to turn off the battle camera effects. If they
 * choose to turn it off, then all of this plugin's effects will be disabled
 * until they turn it back on. This is to give players control over how the
 * game visually appears in case they have motion sickness.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Battle Camera options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Options Name:
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
 * Version 1.03: January 6, 2022
 * * Compatibility Update!
 * ** The newly added MV Animation-support should now work properly with the
 *    Action Sequence Camera plugin. Update made by Irina.
 * 
 * Version 1.02: December 4, 2020
 * * Bug Fixes!
 * ** Show Pictures should now appear in the right positions. Fix by Irina.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Damage offsets are now corrected and in line with the latest Battle Core
 *    version.
 *
 * Version 1.00: September 23, 2020
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
 * @param ActSeqCamera
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Options:struct
 * @text Options Menu
 * @type struct<Options>
 * @desc Settings for the Options Menu
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","OptionsName:str":"Battle Camera"}
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
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Battle Camera options to the Options menu?
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
 * @param OptionsName:str
 * @text Options Name
 * @parent Options
 * @desc Command name of the option.
 * @default Battle Camera
 *
 */
//=============================================================================

const _0x522462=_0xe409;(function(_0xcd9cb0,_0x35167b){const _0xf512d0=_0xe409,_0x2cf18f=_0xcd9cb0();while(!![]){try{const _0xc7e76a=-parseInt(_0xf512d0(0xe0))/0x1*(-parseInt(_0xf512d0(0x115))/0x2)+parseInt(_0xf512d0(0xdc))/0x3+parseInt(_0xf512d0(0x154))/0x4+parseInt(_0xf512d0(0x14b))/0x5*(-parseInt(_0xf512d0(0x13e))/0x6)+-parseInt(_0xf512d0(0x162))/0x7*(parseInt(_0xf512d0(0x140))/0x8)+-parseInt(_0xf512d0(0x122))/0x9+-parseInt(_0xf512d0(0x139))/0xa;if(_0xc7e76a===_0x35167b)break;else _0x2cf18f['push'](_0x2cf18f['shift']());}catch(_0xb4e84b){_0x2cf18f['push'](_0x2cf18f['shift']());}}}(_0x1bf1,0xb7855));var label=_0x522462(0x12b),tier=tier||0x0,dependencies=[_0x522462(0x142),_0x522462(0x167)],pluginData=$plugins[_0x522462(0x119)](function(_0x32c1a3){const _0x31813e=_0x522462;return _0x32c1a3[_0x31813e(0x141)]&&_0x32c1a3[_0x31813e(0x12a)]['includes']('['+label+']');})[0x0];function _0x1bf1(){const _0xb1990d=['battleCameraOption','clearCameraFocusTargets','Settings','cameraX','setBattleAngle','zoomScale','call','trim','angleEasing','updateBattleZoom','battleCamera','position','format','3103749CeaOBZ','cameraOffsetY','Sprite_AnimationMV_updatePosition','_cacheScaleX','3AcMnaq','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','width','Options','InOutSine','isSceneBattle','clearBattleCamera','cameraDuration','makeData','Scene_Options_maxCommands','angleDuration','length','Sprite_Battler_damageOffsetY','boxWidth','cameraFocusTargetsY','screenHeight','cameraXTarget','AdjustRect','cameraOffsetXTarget','applyData','updatePositionShake','ConvertParams','createLowerLayer','match','round','ARRAYSTR','_animation','addGeneralOptions','AddOption','Spriteset_Battle_createLowerLayer','_damageContainer','skewWholeDuration','cameraOffsetX','skewTargetY','ARRAYJSON','name','skewEasing','ConfigManager_makeData','max','update','Linear','map','initialize','prototype','_targets','parameters','cameraFocusTargets','cameraFocusTarget','updateBattleAngle','zoomDuration','isInputting','cameraY','ApplyEasing','777076FfvbzB','zoomScaleTarget','damageOffsetX','_oldCamera','filter','cameraDurationWhole','OptionsName','skewTargetX','parse','addBattleCameraCommand','getBattleAngle','ARRAYNUM','boxHeight','9480735JcMXzx','Spriteset_Battle_initialize','_scene','ceil','cameraOffsetEasing','ConfigManager_applyData','screenWidth','ARRAYFUNC','description','ActSeqCamera','height','Game_Screen_clear','Sprite_Battler_damageOffsetX','cameraOffsetDuration','advanced','updatePositionSkew','angleWholeDuration','setBattleSkew','damageOffsetY','skewY','updatePositionAngle','angle','setBattleCameraTargets','1910670IamgTd','cameraYTarget','ANTI_TINT_UI','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','setCameraFocusTargets','567846mhIUyj','updatePosition','88IwYWqf','status','VisuMZ_0_CoreEngine','cameraOffsetYTarget','zoomEasing','clamp','FUNC','zoomWholeDuration','updateBattleCameraOffset','battleCameraData','battler','50VKpzqo','updatePositionCamera','updatePositionZoom','anchor','reduce','toUpperCase','clear','updatePositionCameraRoamOld','skewX','5262116opbyvJ','addBattleCameraCommands','setup','BattleManager_setup','updatePositionCameraRoamNew','NUM','initialBattleCameraSettings','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updateBattleCamera','cameraFocusTargetsX','cameraEasing','_cacheScaleY','cameraOffsetDurationWhole','getBattleZoom','364721RzfdIG','setBattleZoom','exit','ARRAYSTRUCT','_battleCamera','VisuMZ_1_BattleCore','updatePositionCameraNeutral','addCommand','scale','angleTarget','JSON','getBattleCameraClamp','skew','applyEasing','Window_Options_addGeneralOptions','_cameraFocusTargets','Game_Screen_update','applyAnchorsForTiltEffect'];_0x1bf1=function(){return _0xb1990d;};return _0x1bf1();}function _0xe409(_0x4630b2,_0x4ac7bb){const _0x1bf1a4=_0x1bf1();return _0xe409=function(_0xe40952,_0x176c24){_0xe40952=_0xe40952-0xd0;let _0x5347d8=_0x1bf1a4[_0xe40952];return _0x5347d8;},_0xe409(_0x4630b2,_0x4ac7bb);}VisuMZ[label][_0x522462(0xd1)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x522462(0xf5)]=function(_0x1e9a42,_0xe40c60){const _0x332967=_0x522462;for(const _0x4aae44 in _0xe40c60){if(_0x4aae44[_0x332967(0xf7)](/(.*):(.*)/i)){const _0x55f027=String(RegExp['$1']),_0x4df842=String(RegExp['$2'])[_0x332967(0x150)]()[_0x332967(0xd6)]();let _0x35fe46,_0xd01a77,_0x3a3693;switch(_0x4df842){case _0x332967(0x159):_0x35fe46=_0xe40c60[_0x4aae44]!==''?Number(_0xe40c60[_0x4aae44]):0x0;break;case _0x332967(0x120):_0xd01a77=_0xe40c60[_0x4aae44]!==''?JSON[_0x332967(0x11d)](_0xe40c60[_0x4aae44]):[],_0x35fe46=_0xd01a77[_0x332967(0x109)](_0x2edac2=>Number(_0x2edac2));break;case'EVAL':_0x35fe46=_0xe40c60[_0x4aae44]!==''?eval(_0xe40c60[_0x4aae44]):null;break;case'ARRAYEVAL':_0xd01a77=_0xe40c60[_0x4aae44]!==''?JSON['parse'](_0xe40c60[_0x4aae44]):[],_0x35fe46=_0xd01a77[_0x332967(0x109)](_0xeb8a8c=>eval(_0xeb8a8c));break;case _0x332967(0x16c):_0x35fe46=_0xe40c60[_0x4aae44]!==''?JSON[_0x332967(0x11d)](_0xe40c60[_0x4aae44]):'';break;case _0x332967(0x102):_0xd01a77=_0xe40c60[_0x4aae44]!==''?JSON[_0x332967(0x11d)](_0xe40c60[_0x4aae44]):[],_0x35fe46=_0xd01a77[_0x332967(0x109)](_0x3ca8ee=>JSON['parse'](_0x3ca8ee));break;case _0x332967(0x146):_0x35fe46=_0xe40c60[_0x4aae44]!==''?new Function(JSON[_0x332967(0x11d)](_0xe40c60[_0x4aae44])):new Function('return\x200');break;case _0x332967(0x129):_0xd01a77=_0xe40c60[_0x4aae44]!==''?JSON[_0x332967(0x11d)](_0xe40c60[_0x4aae44]):[],_0x35fe46=_0xd01a77[_0x332967(0x109)](_0x232eea=>new Function(JSON[_0x332967(0x11d)](_0x232eea)));break;case'STR':_0x35fe46=_0xe40c60[_0x4aae44]!==''?String(_0xe40c60[_0x4aae44]):'';break;case _0x332967(0xf9):_0xd01a77=_0xe40c60[_0x4aae44]!==''?JSON[_0x332967(0x11d)](_0xe40c60[_0x4aae44]):[],_0x35fe46=_0xd01a77[_0x332967(0x109)](_0x129d25=>String(_0x129d25));break;case'STRUCT':_0x3a3693=_0xe40c60[_0x4aae44]!==''?JSON[_0x332967(0x11d)](_0xe40c60[_0x4aae44]):{},_0x35fe46=VisuMZ['ConvertParams']({},_0x3a3693);break;case _0x332967(0x165):_0xd01a77=_0xe40c60[_0x4aae44]!==''?JSON['parse'](_0xe40c60[_0x4aae44]):[],_0x35fe46=_0xd01a77[_0x332967(0x109)](_0x3092ef=>VisuMZ['ConvertParams']({},JSON[_0x332967(0x11d)](_0x3092ef)));break;default:continue;}_0x1e9a42[_0x55f027]=_0x35fe46;}}return _0x1e9a42;},(_0x5df77=>{const _0x5316ee=_0x522462,_0x5b11cd=_0x5df77[_0x5316ee(0x103)];for(const _0x3a9f75 of dependencies){if(!Imported[_0x3a9f75]){alert(_0x5316ee(0x13c)[_0x5316ee(0xdb)](_0x5b11cd,_0x3a9f75)),SceneManager['exit']();break;}}const _0x27ce0b=_0x5df77[_0x5316ee(0x12a)];if(_0x27ce0b[_0x5316ee(0xf7)](/\[Version[ ](.*?)\]/i)){const _0x15da17=Number(RegExp['$1']);_0x15da17!==VisuMZ[label]['version']&&(alert(_0x5316ee(0x15b)[_0x5316ee(0xdb)](_0x5b11cd,_0x15da17)),SceneManager[_0x5316ee(0x164)]());}if(_0x27ce0b['match'](/\[Tier[ ](\d+)\]/i)){const _0x6abc65=Number(RegExp['$1']);_0x6abc65<tier?(alert(_0x5316ee(0xe1)[_0x5316ee(0xdb)](_0x5b11cd,_0x6abc65,tier)),SceneManager[_0x5316ee(0x164)]()):tier=Math[_0x5316ee(0x106)](_0x6abc65,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x5316ee(0xd1)],_0x5df77[_0x5316ee(0x10d)]);})(pluginData),ConfigManager['battleCamera']=!![],VisuMZ[_0x522462(0x12b)][_0x522462(0x105)]=ConfigManager[_0x522462(0xe8)],ConfigManager['makeData']=function(){const _0x15f43f=_0x522462,_0x8d9ee0=VisuMZ['ActSeqCamera']['ConfigManager_makeData'][_0x15f43f(0xd5)](this);return _0x8d9ee0['battleCamera']=this[_0x15f43f(0xd9)],_0x8d9ee0;},VisuMZ['ActSeqCamera'][_0x522462(0x127)]=ConfigManager[_0x522462(0xf3)],ConfigManager[_0x522462(0xf3)]=function(_0x47b12a){const _0x2acec1=_0x522462;VisuMZ[_0x2acec1(0x12b)][_0x2acec1(0x127)][_0x2acec1(0xd5)](this,_0x47b12a),_0x2acec1(0xd9)in _0x47b12a?this[_0x2acec1(0xd9)]=_0x47b12a[_0x2acec1(0xd9)]:this[_0x2acec1(0xd9)]=!![];},TextManager[_0x522462(0x174)]=VisuMZ[_0x522462(0x12b)][_0x522462(0xd1)]['Options'][_0x522462(0x11b)],VisuMZ[_0x522462(0x12b)][_0x522462(0x157)]=BattleManager['setup'],BattleManager[_0x522462(0x156)]=function(_0x49de61,_0xb2c08c,_0x408f){const _0xd29eab=_0x522462;VisuMZ[_0xd29eab(0x12b)][_0xd29eab(0x157)][_0xd29eab(0xd5)](this,_0x49de61,_0xb2c08c,_0x408f),this[_0xd29eab(0xd0)]();},BattleManager[_0x522462(0xd0)]=function(){const _0x30d3b7=_0x522462;this[_0x30d3b7(0x171)]=[];},BattleManager[_0x522462(0x10e)]=function(){const _0x3e3936=_0x522462;if(this[_0x3e3936(0x171)]===undefined)this[_0x3e3936(0xd0)]();return this[_0x3e3936(0x171)];},BattleManager[_0x522462(0x13d)]=function(_0x74c096){const _0x5e845c=_0x522462;this[_0x5e845c(0x171)]=_0x74c096[_0x5e845c(0x119)]((_0x406e4e,_0x1b2cc9,_0x2f68e7)=>_0x2f68e7['indexOf'](_0x406e4e)===_0x1b2cc9);},BattleManager[_0x522462(0x15d)]=function(){const _0x232774=_0x522462,_0x30db0c=this[_0x232774(0x10e)]();if(_0x30db0c[_0x232774(0xeb)]<=0x0)return Math[_0x232774(0xf8)](Graphics[_0x232774(0xe2)]/0x2);let _0x16d2f2=_0x30db0c[_0x232774(0x14f)]((_0x391c06,_0xb4b447)=>_0x391c06+=_0xb4b447[_0x232774(0x14a)]()['x'],0x0)/_0x30db0c['length'];return _0x16d2f2+=Math['round']((Graphics['width']-Graphics[_0x232774(0xed)])/0x2),_0x16d2f2;},BattleManager[_0x522462(0xee)]=function(){const _0x3b565f=_0x522462,_0x34923b=this[_0x3b565f(0x10e)]();if(_0x34923b[_0x3b565f(0xeb)]<=0x0)return Math[_0x3b565f(0xf8)](Graphics[_0x3b565f(0x12c)]/0x2);let _0x21bf01=_0x34923b[_0x3b565f(0x14f)]((_0x29960a,_0x1e0819)=>_0x29960a+=_0x1e0819[_0x3b565f(0x14a)]()['y']-Math['round'](_0x1e0819['battler']()[_0x3b565f(0x12c)]/0x2),0x0)/_0x34923b['length'];return _0x21bf01+=Math['round']((Graphics[_0x3b565f(0x12c)]-Graphics['boxHeight'])/0x2),_0x21bf01;},VisuMZ[_0x522462(0x12b)][_0x522462(0x12d)]=Game_Screen[_0x522462(0x10b)][_0x522462(0x151)],Game_Screen[_0x522462(0x10b)][_0x522462(0x151)]=function(){const _0x60dbe0=_0x522462;VisuMZ[_0x60dbe0(0x12b)]['Game_Screen_clear'][_0x60dbe0(0xd5)](this),this[_0x60dbe0(0xe6)]();},Game_Screen[_0x522462(0x10b)][_0x522462(0xe6)]=function(){const _0x3cdb3b=_0x522462;this['_battleCamera']=this[_0x3cdb3b(0x15a)]();},Game_Screen[_0x522462(0x10b)][_0x522462(0x15a)]=function(){const _0x470cb1=_0x522462,_0x146597=$dataSystem[_0x470cb1(0x130)][_0x470cb1(0x128)],_0x242cbd=$dataSystem['advanced'][_0x470cb1(0xef)];return{'angle':0x0,'angleTarget':0x0,'angleDuration':0x0,'angleWholeDuration':0x0,'angleEasing':_0x470cb1(0xe4),'cameraFocusTarget':![],'cameraX':Math[_0x470cb1(0xf8)](_0x146597/0x2),'cameraY':Math[_0x470cb1(0xf8)](_0x242cbd/0x2),'cameraXTarget':Math[_0x470cb1(0xf8)](_0x146597/0x2),'cameraYTarget':Math['round'](_0x242cbd/0x2),'cameraDuration':0x0,'cameraDurationWhole':0x0,'cameraEasing':_0x470cb1(0xe4),'cameraClamp':!![],'cameraOffsetX':0x0,'cameraOffsetY':0x0,'cameraOffsetXTarget':0x0,'cameraOffsetYTarget':0x0,'cameraOffsetDuration':0x0,'cameraOffsetDurationWhole':0x0,'cameraOffsetEasing':_0x470cb1(0xe4),'skewX':0x0,'skewTargetX':0x0,'skewY':0x0,'skewTargetY':0x0,'skewDuration':0x0,'skewWholeDuration':0x0,'skewEasing':_0x470cb1(0xe4),'zoomScale':0x1,'zoomScaleTarget':0x1,'zoomDuration':0x0,'zoomWholeDuration':0x0,'zoomEasing':_0x470cb1(0xe4)};},Game_Screen['prototype'][_0x522462(0x149)]=function(){const _0x46ffa4=_0x522462;if(this[_0x46ffa4(0x166)]===undefined)this[_0x46ffa4(0xe6)]();if(!ConfigManager[_0x46ffa4(0xd9)])return this[_0x46ffa4(0x15a)]();return this[_0x46ffa4(0x166)];},VisuMZ[_0x522462(0x12b)][_0x522462(0x172)]=Game_Screen[_0x522462(0x10b)][_0x522462(0x107)],Game_Screen['prototype']['update']=function(){const _0x3d5e26=_0x522462;VisuMZ[_0x3d5e26(0x12b)]['Game_Screen_update'][_0x3d5e26(0xd5)](this),this[_0x3d5e26(0x110)](),this[_0x3d5e26(0x15c)](),this[_0x3d5e26(0x148)](),this['updateBattleSkew'](),this[_0x3d5e26(0xd8)]();},Game_Screen[_0x522462(0x10b)][_0x522462(0xd3)]=function(_0x21d782,_0x192588,_0x4859de){const _0x1b3200=_0x522462,_0x5a43e6=this[_0x1b3200(0x149)]();_0x5a43e6[_0x1b3200(0x16b)]=-_0x21d782,_0x5a43e6[_0x1b3200(0xea)]=_0x192588,_0x5a43e6[_0x1b3200(0x132)]=_0x192588,_0x5a43e6['angleEasing']=_0x4859de;},Game_Screen[_0x522462(0x10b)]['updateBattleAngle']=function(){const _0x4bf9ce=_0x522462;if(!SceneManager['isSceneBattle']())return;const _0x488641=this[_0x4bf9ce(0x149)](),_0x3b8c45=_0x488641['angleDuration'],_0x23406a=_0x488641[_0x4bf9ce(0x132)],_0x3339a8=_0x488641[_0x4bf9ce(0xd7)];_0x3b8c45>0x0?(_0x488641[_0x4bf9ce(0x137)]=this['applyEasing'](_0x488641[_0x4bf9ce(0x137)],_0x488641['angleTarget'],_0x3b8c45,_0x23406a,_0x3339a8),_0x488641[_0x4bf9ce(0xea)]--):_0x488641[_0x4bf9ce(0x137)]=_0x488641[_0x4bf9ce(0x16b)];},Game_Screen[_0x522462(0x10b)]['setBattleCameraPoint']=function(_0x4b82ac,_0x56f046,_0x331187,_0x1301d0){const _0x163fb7=_0x522462,_0x10f72f=this[_0x163fb7(0x149)]();_0x10f72f[_0x163fb7(0x10f)]=![],_0x10f72f['cameraXTarget']=Math[_0x163fb7(0xf8)](_0x4b82ac),_0x10f72f[_0x163fb7(0x13a)]=Math['round'](_0x56f046),_0x10f72f[_0x163fb7(0xe7)]=_0x331187,_0x10f72f[_0x163fb7(0x11a)]=_0x331187,_0x10f72f[_0x163fb7(0x15e)]=_0x1301d0;},Game_Screen[_0x522462(0x10b)][_0x522462(0x138)]=function(_0x1c0a52,_0x2f0586,_0x570843){const _0x1a577e=_0x522462;if(_0x1c0a52['length']<=0x0)return;const _0x360bda=this[_0x1a577e(0x149)]();_0x360bda[_0x1a577e(0x10f)]=!![],BattleManager[_0x1a577e(0x13d)](_0x1c0a52),_0x360bda['cameraDuration']=_0x2f0586,_0x360bda['cameraDurationWhole']=_0x2f0586,_0x360bda['cameraEasing']=_0x570843;},Game_Screen['prototype'][_0x522462(0x15c)]=function(){const _0x112e24=_0x522462;if(!SceneManager['isSceneBattle']())return;const _0x587c61=this[_0x112e24(0x149)](),_0x10a8bc=_0x587c61[_0x112e24(0xe7)],_0x58182b=_0x587c61[_0x112e24(0x11a)],_0x199fc5=_0x587c61['cameraEasing'];_0x587c61['cameraFocusTarget']&&(_0x587c61[_0x112e24(0xf0)]=BattleManager[_0x112e24(0x15d)](),_0x587c61['cameraYTarget']=BattleManager['cameraFocusTargetsY']()),_0x10a8bc>0x0?(_0x587c61[_0x112e24(0xd2)]=this[_0x112e24(0x16f)](_0x587c61[_0x112e24(0xd2)],_0x587c61[_0x112e24(0xf0)],_0x10a8bc,_0x58182b,_0x199fc5),_0x587c61[_0x112e24(0x113)]=this[_0x112e24(0x16f)](_0x587c61['cameraY'],_0x587c61['cameraYTarget'],_0x10a8bc,_0x58182b,_0x199fc5),_0x587c61[_0x112e24(0xe7)]--):(_0x587c61[_0x112e24(0xd2)]=_0x587c61[_0x112e24(0xf0)],_0x587c61['cameraY']=_0x587c61['cameraYTarget']);},Game_Screen[_0x522462(0x10b)]['setBattleCameraOffset']=function(_0x5618d8,_0x5443c4,_0x1b1f63,_0x299a45){const _0x8d88f6=_0x522462,_0x50166f=this[_0x8d88f6(0x149)]();_0x50166f[_0x8d88f6(0xf2)]=Math[_0x8d88f6(0xf8)](_0x5618d8),_0x50166f[_0x8d88f6(0x143)]=Math[_0x8d88f6(0xf8)](_0x5443c4),_0x50166f['cameraOffsetDuration']=_0x1b1f63,_0x50166f[_0x8d88f6(0x160)]=_0x1b1f63,_0x50166f[_0x8d88f6(0x126)]=_0x299a45;},Game_Screen[_0x522462(0x10b)][_0x522462(0x148)]=function(){const _0x1978b7=_0x522462;if(!SceneManager[_0x1978b7(0xe5)]())return;const _0x252052=this[_0x1978b7(0x149)](),_0x13a80f=_0x252052[_0x1978b7(0x12f)],_0x41b91a=_0x252052[_0x1978b7(0x160)],_0x595fd3=_0x252052[_0x1978b7(0x126)];_0x13a80f>0x0?(_0x252052[_0x1978b7(0x100)]=this[_0x1978b7(0x16f)](_0x252052['cameraOffsetX'],_0x252052[_0x1978b7(0xf2)],_0x13a80f,_0x41b91a,_0x595fd3),_0x252052[_0x1978b7(0xdd)]=this[_0x1978b7(0x16f)](_0x252052[_0x1978b7(0xdd)],_0x252052[_0x1978b7(0x143)],_0x13a80f,_0x41b91a,_0x595fd3),_0x252052[_0x1978b7(0x12f)]--):(_0x252052[_0x1978b7(0x100)]=_0x252052[_0x1978b7(0xf2)],_0x252052[_0x1978b7(0xdd)]=_0x252052[_0x1978b7(0x143)]);},Game_Screen[_0x522462(0x10b)][_0x522462(0x133)]=function(_0x30e657,_0x58d659,_0x17684d,_0x2e0464){const _0x2b28ca=_0x522462,_0x35396b=this[_0x2b28ca(0x149)]();_0x35396b[_0x2b28ca(0x11c)]=_0x30e657,_0x35396b[_0x2b28ca(0x101)]=_0x58d659,_0x35396b['skewDuration']=_0x17684d,_0x35396b[_0x2b28ca(0xff)]=_0x17684d,_0x35396b['skewEasing']=_0x2e0464;},Game_Screen[_0x522462(0x10b)]['updateBattleSkew']=function(){const _0x4b9d7=_0x522462;if(!SceneManager[_0x4b9d7(0xe5)]())return;const _0x3707f5=this[_0x4b9d7(0x149)](),_0x38a985=_0x3707f5['skewDuration'],_0xa0ccfc=_0x3707f5[_0x4b9d7(0xff)],_0x4d458d=_0x3707f5[_0x4b9d7(0x104)];_0x38a985>0x0?(_0x3707f5[_0x4b9d7(0x153)]=this[_0x4b9d7(0x16f)](_0x3707f5[_0x4b9d7(0x153)],_0x3707f5[_0x4b9d7(0x11c)],_0x38a985,_0xa0ccfc,_0x4d458d),_0x3707f5[_0x4b9d7(0x135)]=this['applyEasing'](_0x3707f5[_0x4b9d7(0x135)],_0x3707f5[_0x4b9d7(0x101)],_0x38a985,_0xa0ccfc,_0x4d458d),_0x3707f5['skewDuration']--):(_0x3707f5[_0x4b9d7(0x153)]=_0x3707f5[_0x4b9d7(0x11c)],_0x3707f5['skewY']=_0x3707f5['skewTargetY']);},Game_Screen[_0x522462(0x10b)][_0x522462(0x163)]=function(_0x47c545,_0x5dc30a,_0x589c89){const _0x589222=_0x522462,_0x2a3353=this[_0x589222(0x149)]();_0x2a3353[_0x589222(0x116)]=_0x47c545,_0x2a3353['zoomDuration']=_0x5dc30a,_0x2a3353[_0x589222(0x147)]=_0x5dc30a,_0x2a3353[_0x589222(0x144)]=_0x589c89;},Game_Screen[_0x522462(0x10b)][_0x522462(0xd8)]=function(){const _0x458610=_0x522462;if(!SceneManager[_0x458610(0xe5)]())return;const _0x323ac0=this[_0x458610(0x149)](),_0x1e6381=_0x323ac0[_0x458610(0x111)],_0x14e9fb=_0x323ac0[_0x458610(0x147)],_0x277ec5=_0x323ac0[_0x458610(0x144)];_0x1e6381>0x0?(_0x323ac0[_0x458610(0xd4)]=this[_0x458610(0x16f)](_0x323ac0['zoomScale'],_0x323ac0[_0x458610(0x116)],_0x1e6381,_0x14e9fb,_0x277ec5),_0x323ac0['zoomDuration']--):_0x323ac0[_0x458610(0xd4)]=_0x323ac0[_0x458610(0x116)];},Game_Screen[_0x522462(0x10b)]['applyEasing']=function(_0x41e3ca,_0x16d858,_0x15d302,_0x4e87ca,_0x5e9ec5){const _0x2933a4=_0x522462,_0x275aa9=VisuMZ[_0x2933a4(0x114)]((_0x4e87ca-_0x15d302)/_0x4e87ca,_0x5e9ec5||_0x2933a4(0x108)),_0x1d2780=VisuMZ[_0x2933a4(0x114)]((_0x4e87ca-_0x15d302+0x1)/_0x4e87ca,_0x5e9ec5||_0x2933a4(0x108)),_0x594e14=(_0x41e3ca-_0x16d858*_0x275aa9)/(0x1-_0x275aa9);return _0x594e14+(_0x16d858-_0x594e14)*_0x1d2780;},VisuMZ['ActSeqCamera'][_0x522462(0xe9)]=Scene_Options['prototype']['maxCommands'],Scene_Options['prototype']['maxCommands']=function(){const _0x1c3157=_0x522462;let _0xf6da57=VisuMZ[_0x1c3157(0x12b)][_0x1c3157(0xe9)][_0x1c3157(0xd5)](this);const _0x294cdd=VisuMZ[_0x1c3157(0x12b)]['Settings'];if(_0x294cdd[_0x1c3157(0xe3)][_0x1c3157(0xfc)]&&_0x294cdd[_0x1c3157(0xe3)][_0x1c3157(0xf1)])_0xf6da57++;return _0xf6da57;},VisuMZ['ActSeqCamera'][_0x522462(0x12e)]=Sprite_Battler[_0x522462(0x10b)][_0x522462(0x117)],Sprite_Battler[_0x522462(0x10b)]['damageOffsetX']=function(){const _0x31d226=_0x522462;let _0x66319a=VisuMZ[_0x31d226(0x12b)][_0x31d226(0x12e)][_0x31d226(0xd5)](this);return _0x66319a+=Math[_0x31d226(0xf8)]((Graphics[_0x31d226(0xe2)]-Graphics['boxWidth'])/0x2),_0x66319a;},VisuMZ[_0x522462(0x12b)]['Sprite_Battler_damageOffsetY']=Sprite_Battler['prototype']['damageOffsetY'],Sprite_Battler[_0x522462(0x10b)][_0x522462(0x134)]=function(){const _0x41fcc2=_0x522462;let _0x19ae91=VisuMZ[_0x41fcc2(0x12b)][_0x41fcc2(0xec)][_0x41fcc2(0xd5)](this);return _0x19ae91+=Math['round']((Graphics[_0x41fcc2(0x12c)]-Graphics[_0x41fcc2(0x121)])/0x2),_0x19ae91;},VisuMZ[_0x522462(0x12b)][_0x522462(0xde)]=Sprite_AnimationMV[_0x522462(0x10b)][_0x522462(0x13f)],Sprite_AnimationMV[_0x522462(0x10b)][_0x522462(0x13f)]=function(){const _0x36f486=_0x522462;VisuMZ[_0x36f486(0x12b)]['Sprite_AnimationMV_updatePosition'][_0x36f486(0xd5)](this);if(this[_0x36f486(0xfa)][_0x36f486(0xda)]!==0x3&&this[_0x36f486(0x10c)][_0x36f486(0xeb)]>0x0){if(Spriteset_Battle[_0x36f486(0x13b)]){const _0x4dfed7=SceneManager[_0x36f486(0x124)]['_spriteset'];this['x']-=_0x4dfed7['x'],this['y']-=_0x4dfed7['y'];}}},VisuMZ['ActSeqCamera'][_0x522462(0x123)]=Spriteset_Battle['prototype'][_0x522462(0x10a)],Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x10a)]=function(){const _0x576f35=_0x522462;VisuMZ[_0x576f35(0x12b)][_0x576f35(0x123)][_0x576f35(0xd5)](this),this[_0x576f35(0xdf)]=undefined,this[_0x576f35(0x15f)]=undefined;},VisuMZ['ActSeqCamera']['Spriteset_Battle_createLowerLayer']=Spriteset_Battle[_0x522462(0x10b)]['createLowerLayer'],Spriteset_Battle[_0x522462(0x10b)][_0x522462(0xf6)]=function(){const _0x5d1cd4=_0x522462;VisuMZ[_0x5d1cd4(0x12b)][_0x5d1cd4(0xfd)][_0x5d1cd4(0xd5)](this),this[_0x5d1cd4(0x173)]();},Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x173)]=function(){const _0x5da4f3=_0x522462;if(Spriteset_Battle['_oldCamera'])return;const _0x384415=-Math[_0x5da4f3(0x125)](Graphics[_0x5da4f3(0xe2)]/0x2),_0x25d466=-Math[_0x5da4f3(0x125)](Graphics[_0x5da4f3(0x12c)]/0x2);this[_0x5da4f3(0x14e)]['x']=0.5,this['anchor']['y']=0.5;const _0x298337=[this['_baseSprite'],this[_0x5da4f3(0xfe)]];for(const _0x4d84c4 of _0x298337){if(!_0x4d84c4)continue;_0x4d84c4['x']=_0x384415,_0x4d84c4['y']=_0x25d466;}},Spriteset_Battle['prototype'][_0x522462(0x13f)]=function(){const _0x5d7935=_0x522462;this[_0x5d7935(0x136)](),this[_0x5d7935(0x131)](),this[_0x5d7935(0x14d)](),this[_0x5d7935(0x14c)](),this[_0x5d7935(0xf4)]();},Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x136)]=function(){const _0x38fed9=_0x522462,_0xe42330=this[_0x38fed9(0x11f)]();this[_0x38fed9(0x137)]=_0xe42330;},Spriteset_Battle['prototype'][_0x522462(0x11f)]=function(){const _0x3fe1eb=_0x522462;if(!ConfigManager[_0x3fe1eb(0xd9)])return 0x0;if(BattleManager[_0x3fe1eb(0x112)]())return 0x0;return $gameScreen[_0x3fe1eb(0x149)]()['angle'];},Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x131)]=function(){const _0x1ec82f=_0x522462;if(BattleManager[_0x1ec82f(0x112)]()||!ConfigManager[_0x1ec82f(0xd9)])this[_0x1ec82f(0x16e)]['x']=0x0,this['skew']['y']=0x0;else{const _0x3ec1ec=$gameScreen[_0x1ec82f(0x149)]();this[_0x1ec82f(0x16e)]['x']=_0x3ec1ec[_0x1ec82f(0x153)],this[_0x1ec82f(0x16e)]['y']=_0x3ec1ec[_0x1ec82f(0x135)];}},Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x14d)]=function(){const _0x2ae443=_0x522462,_0x30db09=this[_0x2ae443(0x161)]();this[_0x2ae443(0x16a)]['x']=this[_0x2ae443(0x16a)]['y']=_0x30db09;},Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x161)]=function(){const _0x41986d=_0x522462;if(!ConfigManager[_0x41986d(0xd9)])return 0x1;if(BattleManager[_0x41986d(0x112)]())return 0x1;return $gameScreen['battleCameraData']()[_0x41986d(0xd4)];},Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x14c)]=function(){const _0x52d981=_0x522462;BattleManager[_0x52d981(0x112)]()||!ConfigManager[_0x52d981(0xd9)]?this[_0x52d981(0x168)]():Spriteset_Battle['_oldCamera']?this['updatePositionCameraRoamOld']():this[_0x52d981(0x158)]();},Spriteset_Battle['prototype'][_0x522462(0x168)]=function(){const _0x4fe863=_0x522462;if(Spriteset_Battle[_0x4fe863(0x118)])return;this['x']=Math[_0x4fe863(0x125)](Graphics[_0x4fe863(0xe2)]/0x2),this['y']=Math['ceil'](Graphics[_0x4fe863(0x12c)]/0x2);},Spriteset_Battle['prototype'][_0x522462(0x152)]=function(){const _0x185cda=_0x522462,_0x4d84f8=$gameScreen[_0x185cda(0x149)](),_0x4ed1aa=this['getBattleCameraClamp'](),_0x360f8d=this[_0x185cda(0x161)]();let _0x4f5423=-(_0x4d84f8[_0x185cda(0xd2)]+_0x4d84f8[_0x185cda(0x100)])*_0x360f8d+Graphics[_0x185cda(0xe2)]/0x2,_0x22fa77=-(_0x4d84f8[_0x185cda(0x113)]+_0x4d84f8[_0x185cda(0xdd)])*_0x360f8d+Graphics[_0x185cda(0x12c)]/0x2;if(_0x4ed1aa&&_0x360f8d>=0x1){const _0x4421fd=-Graphics[_0x185cda(0xe2)]*_0x360f8d+Graphics[_0x185cda(0xe2)]/0x2,_0x37f228=-Graphics[_0x185cda(0x12c)]*_0x360f8d+Graphics[_0x185cda(0x12c)]/0x2;this['x']=Math[_0x185cda(0xf8)](_0x4f5423['clamp'](_0x4421fd,0x0)),this['y']=Math[_0x185cda(0xf8)](_0x22fa77[_0x185cda(0x145)](_0x37f228,0x0));}else _0x4ed1aa&&_0x360f8d<0x1?(this['x']=Math[_0x185cda(0xf8)]((Graphics[_0x185cda(0xe2)]-Graphics['width']*_0x360f8d)/0x2),this['y']=Math[_0x185cda(0xf8)]((Graphics[_0x185cda(0x12c)]-Graphics[_0x185cda(0x12c)]*_0x360f8d)/0x2)):(this['x']=Math[_0x185cda(0xf8)](_0x4f5423),this['y']=Math['round'](_0x22fa77));},Spriteset_Battle[_0x522462(0x118)]=![],Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x158)]=function(){const _0x19ce28=_0x522462,_0x278a1d=$gameScreen[_0x19ce28(0x149)]();let _0x5a772d=this[_0x19ce28(0x16d)](),_0x1b76bd=this[_0x19ce28(0x161)](),_0x2039d2=-(_0x278a1d[_0x19ce28(0xd2)]+_0x278a1d[_0x19ce28(0x100)])+Graphics[_0x19ce28(0xe2)];_0x2039d2-=(0x1-_0x1b76bd)*(Graphics[_0x19ce28(0xe2)]/0x2-_0x278a1d[_0x19ce28(0xd2)]-_0x278a1d['cameraOffsetX']);let _0x144edc=-(_0x278a1d[_0x19ce28(0x113)]+_0x278a1d[_0x19ce28(0xdd)])+Graphics[_0x19ce28(0x12c)];if(_0x5a772d){if(_0x1b76bd>=0x1){const _0x1d8055=Graphics['width']-Graphics[_0x19ce28(0xe2)]/0x2*_0x1b76bd,_0x2a06d3=Graphics['width']/0x2*_0x1b76bd;_0x2039d2=_0x2039d2['clamp'](_0x1d8055,_0x2a06d3);const _0xa4cd74=Graphics[_0x19ce28(0x12c)]-Graphics['height']/0x2*_0x1b76bd,_0x40a761=Graphics[_0x19ce28(0x12c)]/0x2*_0x1b76bd;_0x144edc=_0x144edc[_0x19ce28(0x145)](_0xa4cd74,_0x40a761);}else _0x1b76bd<0x1&&(_0x2039d2=Graphics[_0x19ce28(0xe2)]/0x2,_0x144edc=Graphics[_0x19ce28(0x12c)]/0x2);}this['x']=Math[_0x19ce28(0xf8)](_0x2039d2),this['y']=Math[_0x19ce28(0xf8)](_0x144edc);},Spriteset_Battle[_0x522462(0x10b)][_0x522462(0x16d)]=function(){const _0x2c78e3=_0x522462;if(!ConfigManager[_0x2c78e3(0xd9)])return!![];if(BattleManager[_0x2c78e3(0x112)]())return!![];return $gameScreen[_0x2c78e3(0x149)]()['cameraClamp'];},Spriteset_Battle[_0x522462(0x10b)][_0x522462(0xf4)]=function(){const _0x31d25b=_0x522462;this['x']+=Math['round']($gameScreen['shake']()),Imported[_0x31d25b(0x142)]&&this['updatePositionCoreEngine']&&this['updatePositionCoreEngine']();},VisuMZ[_0x522462(0x12b)][_0x522462(0x170)]=Window_Options['prototype'][_0x522462(0xfb)],Window_Options[_0x522462(0x10b)][_0x522462(0xfb)]=function(){const _0x4c6b10=_0x522462;VisuMZ[_0x4c6b10(0x12b)]['Window_Options_addGeneralOptions']['call'](this),this[_0x4c6b10(0x155)]();},Window_Options[_0x522462(0x10b)]['addBattleCameraCommands']=function(){const _0x3265d1=_0x522462;VisuMZ[_0x3265d1(0x12b)][_0x3265d1(0xd1)]['Options']['AddOption']&&this[_0x3265d1(0x11e)]();},Window_Options[_0x522462(0x10b)][_0x522462(0x11e)]=function(){const _0x39c1ab=_0x522462,_0x3875da=TextManager[_0x39c1ab(0x174)],_0x12fe87=_0x39c1ab(0xd9);this[_0x39c1ab(0x169)](_0x3875da,_0x12fe87);};