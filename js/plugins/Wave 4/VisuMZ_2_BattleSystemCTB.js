//=============================================================================
// VisuStella MZ - Battle System CTB - Charge Turn Battle
// VisuMZ_2_BattleSystemCTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemCTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemCTB = VisuMZ.BattleSystemCTB || {};
VisuMZ.BattleSystemCTB.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.13] [BattleSystemCTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_CTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin creates a Charge Turn Battle (CTB) system using RPG Maker MZ's
 * TPB as a base. CTB functions by calculating the speed of every battler and
 * balancing them relative to one another. When it's a battler's turn, the
 * battler will either choose an action to perform immediately or charge it
 * for later depending if the skill requires charging.
 * 
 * This is a battle system where agility plays an important factor in the
 * progress of battle where higher agility values give battlers more advantage
 * and additional turns over lower agility values, which give battlers less
 * advantage and less turns.
 * 
 * A turn order display will appear to compensate for the removal of gauges.
 * The turn order display will show a preview of what the turn order could
 * possibly be like. This turn order display is variable and can be changed
 * due to player and enemy influence by using different action speeds, effects
 * provided by this plugin that alter the turn order, and more!
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB integrated mechanics converted for CTB such as
 *   speed, calculations, etc.
 * * No more waiting for gauges to show up! In fact, you won't even see the
 *   TPB gauge in-game.
 * * A turn order display that previews a potential lineup for how the
 *   participating battlers in battle will play out.
 * * Notetags that give skills and items access to manipulating a battler's
 *   CTB speed.
 * * Notetags that give skills and items access to directly manipulate a target
 *   batter's position on the Turn Order display.
 * * These mechanics are separate from ATB and TPB itself, so you can still use
 *   either battle system without affecting both of them.
 * * Through the Core Engine, you can switch in and out of CTB for a different
 *   battle system.
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
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "ctb".
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
 * Despite the fact that the Battle System CTB plugin uses RPG Maker MZ's TPB
 * as a base, it does not have any gauges to depict the time it takes for a
 * battler's turn to appear. Instead, a turn order display appears on the
 * screen (you pick where it can appear: top, bottom, left, or right) and shows
 * a possible preview of the battler turn order.
 * 
 * This is only a preview of what can happen because lots of different things
 * can influence the position and ordering of the turn order display, ranging
 * from skill/item speeds, notetag effects, changes in AGI, etc. What is seen
 * on the turn order display is the most likely possibility instead of the
 * exact order to occur due to the external influences.
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
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to CTB,
 * skills and items with positive speed values will have an impact on how full
 * their CTB Speed will be in the following turn. A value of 2000 will put the
 * turn at 50% ready, 1000 will put the gauge at 25% ready, 500 will put it at
 * 12.5% ready, and so on. Notetags can also be used to influence this.
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
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General CTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <CTB Help>
 *  description
 *  description
 * </CTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under CTB.
 * - This is primarily used if the skill behaves differently in CTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to CTB.
 *
 * ---
 * 
 * === CTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the CTB Turn Order Display
 * 
 * ---
 *
 * <CTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <CTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <CTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === CTB Speed Manipulation-Related Notetags ===
 * 
 * These notetags are used for CTB Speed manipulation purposes.
 * 
 * ---
 *
 * <CTB Set Order: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position to exactly x.
 * - Replace 'x' with a number value depicting the exact position of the turn
 *   order position. 0 is the currently active battler and cannot be used.
 *   1 is closest to taking a turn. Higher numbers are further away.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB Change Order: +x>
 * <CTB Change Order: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the target's CTB Turn Order position by x slots.
 * - Replace 'x' with a number value indicating the increase or decrease.
 *   Negative values decrease the turns needed to wait while positive values
 *   increase the turns needed.
 * - This does not affect the currently active battler.
 *
 * ---
 *
 * <CTB After Speed: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's CTB Speed will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   CTB Speed to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <CTB Charge Speed: x%>
 * <CTB Charge Speed: +x%>
 * <CTB Charge Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <CTB Cast Speed: x%>
 * <CTB Cast Speed: +x%>
 * <CTB Cast Speed: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's speed amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the CTB
 *   Speed you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 * 
 * === JavaScript Notetags: CTB Speed Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional CTB Speed Manipulation.
 * 
 * ---
 * 
 * <JS CTB Order>
 *  code
 *  code
 *  order = code;
 * </JS CTB Order>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine where to set the target's
 *   order on the CTB Turn Order Display to.
 * - The 'order' variable represents the final position on the Turn Order
 *   Display to place the target.
 * - The 'position' variable represents the target's current position on the
 *   Turn Order Display.
 * - This does not affect the currently active battler.
 * 
 * ---
 * 
 * <JS CTB Charge Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Charge Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a charging state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS CTB Cast Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB Cast Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to if the target is in a casting state.
 * - The 'rate' variable represents rate value the CTB Speed will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current CTB Speed rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS CTB After Speed>
 *  code
 *  code
 *  rate = code;
 * </JS CTB After Speed>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   CTB Speed to after performing this skill/item action.
 * - The 'rate' variable represents rate value the CTB Speed will change to
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
 * Actor: Change CTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the CTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change CTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * Actor: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the actor(s).
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
 * Enemy: Change CTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change CTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * Enemy: Clear CTB Turn Order Graphic
 * - Clears the CTB Turn Order graphics for the enemy(ies).
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
 * System: CTB Turn Order Visibility
 * - Determine the visibility of the CTB Turn Order Display.
 * 
 *   Visibility:
 *   - Changes the visibility of the CTB Turn Order Display.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System CTB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * General
 * 
 *   Device Friendly:
 *   - Make the calculations more device friendly?
 *   - Or make it for desktop at full strength?
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Initial Speed:
 *   - JavaScript code to determine how much speed to give each battler at the
 *     start of battle.
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
 * Plugin Parameters: Order Change Effects Settings
 * ============================================================================
 * 
 * Whenever the turn order a battler is changed by a CTB Order notetag, play
 * these effects on the target battler. These effects do not play if the order
 * was changed due to speed changes and only through the specific notetags.
 *
 * ---
 *
 * Delay Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is delayed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is delayed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is delayed.
 *
 * ---
 *
 * Delay Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is delayed.
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
 * Rush Turn Order > Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 *   - Occurs when the turn order is rushed.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - Occurs when the turn order is rushed.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - Occurs when the turn order is rushed.
 *
 * ---
 *
 * Rush Turn Order > Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 *   - Occurs when the turn order is rushed.
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
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System CTB. These adjust how the
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
 *   Total Horizontal:
 *   - How many slots do you want to display for top and bottom Turn Order
 *     Display positions?
 * 
 *   Total Vertical:
 *   - How many slots do you want to display for left and right Turn Order
 *     Display positions?
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
 * Version 1.13: March 3, 2022
 * * Feature Update!
 * ** Reserved common events for non-action sequence skills now function
 *    separately from one another when used by a battler with Action Times+.
 *    Update made by Olivia.
 * 
 * Version 1.12: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.10: June 18, 2021
 * * Bug Fixes!
 * ** Fixed turn order icon reappearing for a dying battler. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Mechanics > General > Device Friendly
 * **** Make the calculations more device friendly? Or make it for desktop at
 *      full strength?
 * 
 * Version 1.09: June 11, 2021
 * * Bug Fixes!
 * ** Plugin Command: "Enemy: Change CTB Turn Order Face" should now properly
 *    change to the correct face index. Fix made by Arisu.
 * 
 * Version 1.08: April 23, 2021
 * * Feature Update!
 * ** When using 100% for After Speed notetag, no other battler is able to
 *    interrupt the action. Update made by Olivia.
 * 
 * Version 1.07: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.06: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * ** Added in a built-in anti-softlock check.
 * 
 * Version 1.05: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Optimization Update!
 * ** Uses less resources for turn order display.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change CTB Turn Order Face
 * **** Changes the faces used for the specific actor(s) on the CTB Turn Order.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Turn Order icons no longer stay invisible after rotating out completely.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <CTB Turn Order Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Action times + should no longer freeze the game. Fix made by Yanfly.
 * ** Actors and enemies without actions will no longer softlock the game.
 *    Fix made by Yanfly.
 * ** Auto-battle during CTB should no longer lock the game! Fix by Yanfly.
 * ** Enemies without any actions should no longer cause endless loops.
 *    Fix made by Yanfly.
 * ** SV_Actor graphics on the Turn Order display are now centered.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release: October 19, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CtbTurnOrderActorIcon
 * @text Actor: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderActorFace
 * @text Actor: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearActorGraphic
 * @text Actor: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the actor(s).
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
 * @command CtbTurnOrderEnemyIcon
 * @text Enemy: Change CTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderEnemyFace
 * @text Enemy: Change CTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the CTB Turn Order.
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
 * @command CtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear CTB Turn Order Graphic
 * @desc Clears the CTB Turn Order graphics for the enemy(ies).
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
 * @text System: CTB Turn Order Visibility
 * @desc Determine the visibility of the CTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the CTB Turn Order Display.
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
 * @param BattleSystemCTB
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
 * @desc Mechanics settings used for Battle System CTB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.50","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Effect:struct
 * @text Order Change Effects
 * @type struct<Effect>
 * @desc Effects to play when the Turn Order is changed in CTB.
 * @default {"Delay":"","DelayAnimation":"","DelayAnimationID:num":"54","DelayMirror:eval":"false","DelayMute:eval":"false","DelayPopups":"","DelayPopupText:str":"DELAY","DelayTextColor:str":"25","DelayFlashColor:eval":"[255, 0, 0, 160]","DelayFlashDuration:num":"60","Rush":"","RushAnimation":"","RushAnimationID:num":"51","RushMirror:eval":"false","RushMute:eval":"false","RushPopups":"","RushPopupText:str":"RUSH","RushTextColor:str":"24","RushFlashColor:eval":"[0, 255, 0, 160]","RushFlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System CTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","TotalHorzSprites:num":"16","TotalVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * @param DeviceFriendly:eval
 * @text Device Friendly
 * @parent General
 * @type boolean
 * @on Device Friendly
 * @off For Desktops
 * @desc Make the calculations more device friendly?
 * Or make it for desktop at full strength?
 * @default false
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Speed
 * @parent JavaScript
 * @desc JavaScript code to determine how much speed to give
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
 * Effect Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Effect:
 *
 * @param Delay
 * @text Delay Turn Order
 * 
 * @param DelayAnimation
 * @text Animation
 * @parent Delay
 *
 * @param DelayAnimationID:num
 * @text Animation ID
 * @parent DelayAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is delayed.
 * @default 54
 *
 * @param DelayMirror:eval
 * @text Mirror Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayMute:eval
 * @text Mute Animation
 * @parent DelayAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is delayed.
 * @default false
 *
 * @param DelayPopups
 * @text Popups
 * @parent Delay
 *
 * @param DelayPopupText:str
 * @text Text
 * @parent DelayPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is delayed.
 * @default DELAY
 *
 * @param DelayTextColor:str
 * @text Text Color
 * @parent DelayPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param DelayFlashColor:eval
 * @text Flash Color
 * @parent DelayPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param DelayFlashDuration:num
 * @text Flash Duration
 * @parent DelayPopups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @param Rush
 * @text Rush Turn Order
 * 
 * @param RushAnimation
 * @text Animation
 * @parent Rush
 *
 * @param RushAnimationID:num
 * @text Animation ID
 * @parent RushAnimation
 * @type animation
 * @desc Play this animation when the effect activates.
 * Occurs when the turn order is rushed.
 * @default 51
 *
 * @param RushMirror:eval
 * @text Mirror Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushMute:eval
 * @text Mute Animation
 * @parent RushAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * Occurs when the turn order is rushed.
 * @default false
 *
 * @param RushPopups
 * @text Popups
 * @parent Rush
 *
 * @param RushPopupText:str
 * @text Text
 * @parent RushPopups
 * @desc Text displayed upon the effect activating.
 * Occurs when the turn order is rushed.
 * @default RUSH
 *
 * @param RushTextColor:str
 * @text Text Color
 * @parent RushPopups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param RushFlashColor:eval
 * @text Flash Color
 * @parent RushPopups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param RushFlashDuration:num
 * @text Flash Duration
 * @parent RushPopups
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
 * @param TotalHorzSprites:num
 * @text Total Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param TotalVertSprites:num
 * @text Total Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many slots do you want to display for left and
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

const _0x5e6d15=_0x2b1e;(function(_0x128c43,_0x11fb2c){const _0x369f0d=_0x2b1e,_0x316a39=_0x128c43();while(!![]){try{const _0x15a609=parseInt(_0x369f0d(0x14e))/0x1*(parseInt(_0x369f0d(0xef))/0x2)+parseInt(_0x369f0d(0x95))/0x3*(parseInt(_0x369f0d(0x228))/0x4)+parseInt(_0x369f0d(0xf0))/0x5*(parseInt(_0x369f0d(0x274))/0x6)+parseInt(_0x369f0d(0x119))/0x7+-parseInt(_0x369f0d(0x23a))/0x8*(parseInt(_0x369f0d(0x91))/0x9)+-parseInt(_0x369f0d(0x25e))/0xa+-parseInt(_0x369f0d(0x97))/0xb*(parseInt(_0x369f0d(0x180))/0xc);if(_0x15a609===_0x11fb2c)break;else _0x316a39['push'](_0x316a39['shift']());}catch(_0x442071){_0x316a39['push'](_0x316a39['shift']());}}}(_0x3a0d,0xb7519));var label=_0x5e6d15(0x288),tier=tier||0x0,dependencies=[_0x5e6d15(0x19d),_0x5e6d15(0x1ec)],pluginData=$plugins['filter'](function(_0x249d7c){const _0x15fe69=_0x5e6d15;return _0x249d7c[_0x15fe69(0x232)]&&_0x249d7c[_0x15fe69(0xa2)][_0x15fe69(0x20c)]('['+label+']');})[0x0];VisuMZ[label][_0x5e6d15(0x239)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5e6d15(0x145)]=function(_0x575194,_0x2e9d6f){const _0x260c57=_0x5e6d15;for(const _0x44cc0d in _0x2e9d6f){if(_0x44cc0d[_0x260c57(0x1dd)](/(.*):(.*)/i)){if(_0x260c57(0x116)!==_0x260c57(0x116))this['initBattleSystemCTB']();else{const _0x542083=String(RegExp['$1']),_0x4aeb72=String(RegExp['$2'])['toUpperCase']()[_0x260c57(0x26d)]();let _0x535dc1,_0x102cf6,_0x34a980;switch(_0x4aeb72){case'NUM':_0x535dc1=_0x2e9d6f[_0x44cc0d]!==''?Number(_0x2e9d6f[_0x44cc0d]):0x0;break;case _0x260c57(0x24c):_0x102cf6=_0x2e9d6f[_0x44cc0d]!==''?JSON[_0x260c57(0x19a)](_0x2e9d6f[_0x44cc0d]):[],_0x535dc1=_0x102cf6['map'](_0x19cb88=>Number(_0x19cb88));break;case _0x260c57(0x26c):_0x535dc1=_0x2e9d6f[_0x44cc0d]!==''?eval(_0x2e9d6f[_0x44cc0d]):null;break;case'ARRAYEVAL':_0x102cf6=_0x2e9d6f[_0x44cc0d]!==''?JSON[_0x260c57(0x19a)](_0x2e9d6f[_0x44cc0d]):[],_0x535dc1=_0x102cf6[_0x260c57(0x1c2)](_0x4db44a=>eval(_0x4db44a));break;case'JSON':_0x535dc1=_0x2e9d6f[_0x44cc0d]!==''?JSON[_0x260c57(0x19a)](_0x2e9d6f[_0x44cc0d]):'';break;case _0x260c57(0x179):_0x102cf6=_0x2e9d6f[_0x44cc0d]!==''?JSON[_0x260c57(0x19a)](_0x2e9d6f[_0x44cc0d]):[],_0x535dc1=_0x102cf6['map'](_0x215715=>JSON[_0x260c57(0x19a)](_0x215715));break;case _0x260c57(0x1bb):_0x535dc1=_0x2e9d6f[_0x44cc0d]!==''?new Function(JSON['parse'](_0x2e9d6f[_0x44cc0d])):new Function(_0x260c57(0x254));break;case'ARRAYFUNC':_0x102cf6=_0x2e9d6f[_0x44cc0d]!==''?JSON[_0x260c57(0x19a)](_0x2e9d6f[_0x44cc0d]):[],_0x535dc1=_0x102cf6[_0x260c57(0x1c2)](_0x5b3912=>new Function(JSON['parse'](_0x5b3912)));break;case _0x260c57(0x8a):_0x535dc1=_0x2e9d6f[_0x44cc0d]!==''?String(_0x2e9d6f[_0x44cc0d]):'';break;case _0x260c57(0x126):_0x102cf6=_0x2e9d6f[_0x44cc0d]!==''?JSON['parse'](_0x2e9d6f[_0x44cc0d]):[],_0x535dc1=_0x102cf6[_0x260c57(0x1c2)](_0x3018e7=>String(_0x3018e7));break;case'STRUCT':_0x34a980=_0x2e9d6f[_0x44cc0d]!==''?JSON[_0x260c57(0x19a)](_0x2e9d6f[_0x44cc0d]):{},_0x535dc1=VisuMZ['ConvertParams']({},_0x34a980);break;case _0x260c57(0x1b6):_0x102cf6=_0x2e9d6f[_0x44cc0d]!==''?JSON['parse'](_0x2e9d6f[_0x44cc0d]):[],_0x535dc1=_0x102cf6['map'](_0x8e08fe=>VisuMZ[_0x260c57(0x145)]({},JSON['parse'](_0x8e08fe)));break;default:continue;}_0x575194[_0x542083]=_0x535dc1;}}}return _0x575194;},(_0x1d8801=>{const _0x4c5655=_0x5e6d15,_0x26204d=_0x1d8801['name'];for(const _0x34fdef of dependencies){if(!Imported[_0x34fdef]){if('RUalJ'!=='RUalJ'){const _0x11df7e=_0x3ca7ac[_0x4c5655(0x288)]['JS'][_0x28d57b][_0x4c5655(0x28f)](this,this['subject'](),_0x24e178);_0x139c23[_0x4c5655(0x280)](_0x11df7e);}else{alert(_0x4c5655(0x131)[_0x4c5655(0x1a3)](_0x26204d,_0x34fdef)),SceneManager['exit']();break;}}}const _0x46ad3e=_0x1d8801[_0x4c5655(0xa2)];if(_0x46ad3e[_0x4c5655(0x1dd)](/\[Version[ ](.*?)\]/i)){if('nMXtQ'==='GBJKZ')_0x214d02[_0x4c5655(0x115)]=_0x34baa7[_0x4c5655(0x17d)](_0x977528[_0x42c44d]);else{const _0x5e32a9=Number(RegExp['$1']);_0x5e32a9!==VisuMZ[label]['version']&&(alert(_0x4c5655(0x120)[_0x4c5655(0x1a3)](_0x26204d,_0x5e32a9)),SceneManager[_0x4c5655(0x13b)]());}}if(_0x46ad3e[_0x4c5655(0x1dd)](/\[Tier[ ](\d+)\]/i)){const _0x58bf08=Number(RegExp['$1']);if(_0x58bf08<tier){if('kUYLB'===_0x4c5655(0x1de))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x26204d,_0x58bf08,tier)),SceneManager[_0x4c5655(0x13b)]();else{let _0x2f2a63=_0x3b8681[_0x4c5655(0x288)]['Settings'][_0x4c5655(0x236)]['TpbAccelerationJS'][_0x4c5655(0x28f)](this,this);const _0x461e74=0x0;return _0x2f2a63+_0x461e74;}}else tier=Math[_0x4c5655(0xc1)](_0x58bf08,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x1d8801[_0x4c5655(0x1ab)]);})(pluginData),PluginManager[_0x5e6d15(0x169)](pluginData[_0x5e6d15(0x29b)],_0x5e6d15(0x20e),_0x53283a=>{const _0x4f02c9=_0x5e6d15;VisuMZ[_0x4f02c9(0x145)](_0x53283a,_0x53283a);const _0x27156e=_0x53283a['Actors'],_0x28e626=_0x53283a[_0x4f02c9(0x293)];for(const _0x244174 of _0x27156e){if(_0x4f02c9(0x265)!=='TTCNG'){const _0x5d3e71=$gameActors[_0x4f02c9(0x243)](_0x244174);if(!_0x5d3e71)continue;_0x5d3e71[_0x4f02c9(0x1f2)]=_0x4f02c9(0x1a5),_0x5d3e71['_ctbTurnOrderIconIndex']=_0x28e626;}else _0x5d2f3d[_0x4f02c9(0x288)][_0x4f02c9(0x13f)]['call'](this,_0xcafdd5);}}),PluginManager['registerCommand'](pluginData[_0x5e6d15(0x29b)],_0x5e6d15(0x1a0),_0x357f0f=>{const _0xc105b8=_0x5e6d15;VisuMZ[_0xc105b8(0x145)](_0x357f0f,_0x357f0f);const _0x154a01=_0x357f0f[_0xc105b8(0x88)],_0x2b0e90=_0x357f0f[_0xc105b8(0x176)],_0x177e55=_0x357f0f[_0xc105b8(0xff)];for(const _0x158510 of _0x154a01){if(_0xc105b8(0x295)!==_0xc105b8(0x295))this['rotateCTBSprites'](),this['_subject'][_0xc105b8(0x1c8)](_0xc105b8(0x199));else{const _0x4543d6=$gameActors[_0xc105b8(0x243)](_0x158510);if(!_0x4543d6)continue;_0x4543d6['_ctbTurnOrderGraphicType']='face',_0x4543d6[_0xc105b8(0x202)]=_0x2b0e90,_0x4543d6['_ctbTurnOrderFaceIndex']=_0x177e55;}}}),PluginManager[_0x5e6d15(0x169)](pluginData['name'],_0x5e6d15(0x12d),_0x302470=>{const _0x5c8823=_0x5e6d15;VisuMZ[_0x5c8823(0x145)](_0x302470,_0x302470);const _0x423b44=_0x302470[_0x5c8823(0x88)];for(const _0x833563 of _0x423b44){const _0x36600c=$gameActors[_0x5c8823(0x243)](_0x833563);if(!_0x36600c)continue;_0x36600c[_0x5c8823(0xee)]();}}),PluginManager['registerCommand'](pluginData[_0x5e6d15(0x29b)],_0x5e6d15(0x173),_0x5d397b=>{const _0x2f4552=_0x5e6d15;VisuMZ[_0x2f4552(0x145)](_0x5d397b,_0x5d397b);const _0x16ddd0=_0x5d397b['Enemies'],_0x1f6d09=_0x5d397b['IconIndex'];for(const _0x54da5b of _0x16ddd0){const _0x5d4cf8=$gameTroop[_0x2f4552(0x1d3)]()[_0x54da5b];if(!_0x5d4cf8)continue;_0x5d4cf8[_0x2f4552(0x1f2)]=_0x2f4552(0x1a5),_0x5d4cf8[_0x2f4552(0x16e)]=_0x1f6d09;}}),PluginManager[_0x5e6d15(0x169)](pluginData[_0x5e6d15(0x29b)],_0x5e6d15(0x143),_0x5888ac=>{const _0x89faaf=_0x5e6d15;VisuMZ[_0x89faaf(0x145)](_0x5888ac,_0x5888ac);const _0x1846db=_0x5888ac[_0x89faaf(0x163)],_0xf98de0=_0x5888ac[_0x89faaf(0x176)],_0x196378=_0x5888ac['FaceIndex'];for(const _0x4efeb7 of _0x1846db){if('bieUz'===_0x89faaf(0xa0)){const _0x2c461f=_0x494603[_0x89faaf(0x239)];if(_0x2c461f[_0x89faaf(0x104)]!=='top')return;if(!_0x2c461f[_0x89faaf(0x154)])return;const _0x1ae1e4=_0x397191[_0x89faaf(0x8d)][_0x89faaf(0x12e)];if(!_0x1ae1e4)return;_0x1ae1e4[_0x89faaf(0x18a)]?(this['x']=this['_homeX']+(_0x2c461f['RepositionTopHelpX']||0x0),this['y']=this[_0x89faaf(0xb1)]+(_0x2c461f[_0x89faaf(0x92)]||0x0)):(this['x']=this['_homeX'],this['y']=this[_0x89faaf(0xb1)]);const _0x2caa5c=_0x52fe78['_scene'][_0x89faaf(0x234)];_0x378d36[_0x89faaf(0x138)]===_0x50a348&&(_0x51ed98[_0x89faaf(0x138)]=_0x3a23b7[_0x89faaf(0x124)]((_0x9cf6a6[_0x89faaf(0x215)]-_0x42460a[_0x89faaf(0x18e)](_0x3f49b1['boxWidth'],_0x2caa5c['width']))/0x2),_0x155876['_ogWindowLayerY']=_0x6d8230[_0x89faaf(0x124)]((_0x37cabb[_0x89faaf(0x235)]-_0x5c94c2[_0x89faaf(0x18e)](_0x74556c[_0x89faaf(0x196)],_0x2caa5c[_0x89faaf(0x235)]))/0x2)),this['x']+=_0x2caa5c['x']-_0x2be924[_0x89faaf(0x138)],this['y']+=_0x2caa5c['y']-_0x226868[_0x89faaf(0x1fe)];}else{const _0xad5ca=$gameTroop[_0x89faaf(0x1d3)]()[_0x4efeb7];if(!_0xad5ca)continue;_0xad5ca[_0x89faaf(0x1f2)]='face',_0xad5ca['_ctbTurnOrderFaceName']=_0xf98de0,_0xad5ca['_ctbTurnOrderFaceIndex']=_0x196378;}}}),PluginManager[_0x5e6d15(0x169)](pluginData['name'],_0x5e6d15(0xe8),_0x1ad33b=>{const _0x392479=_0x5e6d15;VisuMZ['ConvertParams'](_0x1ad33b,_0x1ad33b);const _0x8f0ee3=_0x1ad33b[_0x392479(0x163)];for(const _0xbc0a34 of _0x8f0ee3){const _0x2847a7=$gameTroop['members']()[_0xbc0a34];if(!_0x2847a7)continue;_0x2847a7[_0x392479(0xee)]();}}),PluginManager[_0x5e6d15(0x169)](pluginData[_0x5e6d15(0x29b)],_0x5e6d15(0x26e),_0x59b309=>{const _0xe9a0d9=_0x5e6d15;VisuMZ[_0xe9a0d9(0x145)](_0x59b309,_0x59b309);const _0x3f94c7=_0x59b309['Visible'];$gameSystem['setBattleSystemCTBTurnOrderVisible'](_0x3f94c7);}),VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x12a)]=Scene_Boot[_0x5e6d15(0x178)]['onDatabaseLoaded'],Scene_Boot[_0x5e6d15(0x178)][_0x5e6d15(0x161)]=function(){const _0xcc5a64=_0x5e6d15;this[_0xcc5a64(0x16c)](),VisuMZ[_0xcc5a64(0x288)][_0xcc5a64(0x12a)][_0xcc5a64(0x28f)](this),this[_0xcc5a64(0x11a)]();},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x218)]={},Scene_Boot[_0x5e6d15(0x178)][_0x5e6d15(0x16c)]=function(){const _0x1241f0=_0x5e6d15,_0x4972dd=VisuMZ[_0x1241f0(0x288)][_0x1241f0(0x218)],_0x5e6756=_0x1241f0(0xaa),_0x20346b=[_0x1241f0(0xd2),_0x1241f0(0x285),_0x1241f0(0x1a8)];for(const _0x139551 of _0x20346b){if(_0x1241f0(0xd1)===_0x1241f0(0x19f)){const _0x1d0c52=this['_fadeDuration'];this[_0x1241f0(0x1a7)]=(this[_0x1241f0(0x1a7)]*(_0x1d0c52-0x1)+this[_0x1241f0(0x24e)])/_0x1d0c52,this[_0x1241f0(0x14d)]--,this[_0x1241f0(0x14d)]<=0x0&&(this[_0x1241f0(0x184)](),this[_0x1241f0(0x1d4)]=0x0,this[_0x1241f0(0x118)](),this['opacity']=this[_0x1241f0(0x24e)]);}else{const _0x3895b9=_0x5e6756[_0x1241f0(0x1a3)](_0x139551[_0x1241f0(0x1b4)]()['trim'](),_0x1241f0(0xdf),_0x1241f0(0x255)),_0xcaff11=new RegExp(_0x3895b9,'i');VisuMZ[_0x1241f0(0x288)][_0x1241f0(0x218)][_0x139551]=_0xcaff11;}}VisuMZ[_0x1241f0(0x288)][_0x1241f0(0x218)][_0x1241f0(0x289)]=/<JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>\s*([\s\S]*)\s*<\/JS (?:CTB) (?:ORDER|DELAY|RUSH|SHIFT)>/i;},Scene_Boot[_0x5e6d15(0x178)][_0x5e6d15(0x11a)]=function(){const _0x42901e=_0x5e6d15;if(VisuMZ[_0x42901e(0xbe)])return;const _0x511824=$dataSkills[_0x42901e(0xb7)]($dataItems);for(const _0x172c3e of _0x511824){if(_0x42901e(0x149)===_0x42901e(0x149)){if(!_0x172c3e)continue;VisuMZ[_0x42901e(0x288)][_0x42901e(0x270)](_0x172c3e);}else return _0x219920(_0x1244ab['$1']);}},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0xea)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x5e6d15(0xea)]=function(_0x1a32cd){const _0x27be7c=_0x5e6d15;VisuMZ['BattleSystemCTB'][_0x27be7c(0xea)]['call'](this,_0x1a32cd),VisuMZ['BattleSystemCTB'][_0x27be7c(0x270)](_0x1a32cd);},VisuMZ['BattleSystemCTB'][_0x5e6d15(0x132)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x5e6d15(0x132)]=function(_0x548f4e){const _0x36e166=_0x5e6d15;VisuMZ[_0x36e166(0x288)][_0x36e166(0x132)][_0x36e166(0x28f)](this,_0x548f4e),VisuMZ[_0x36e166(0x288)]['Parse_Notetags_CreateJS'](_0x548f4e);},VisuMZ['BattleSystemCTB'][_0x5e6d15(0x270)]=function(_0x2958f9){const _0x43bb95=_0x5e6d15,_0x31e399=[_0x43bb95(0xd2),_0x43bb95(0x285),'After'];for(const _0x2765bd of _0x31e399){VisuMZ['BattleSystemCTB'][_0x43bb95(0xfc)](_0x2958f9,_0x2765bd);}VisuMZ[_0x43bb95(0x288)][_0x43bb95(0x22e)](_0x2958f9,_0x43bb95(0x159));},VisuMZ[_0x5e6d15(0x288)]['JS']={},VisuMZ[_0x5e6d15(0x288)]['createRateJS']=function(_0x2beff4,_0x43aaca){const _0x23be58=_0x5e6d15,_0x186dac=_0x2beff4[_0x23be58(0xc7)];if(_0x186dac[_0x23be58(0x1dd)](VisuMZ['BattleSystemCTB'][_0x23be58(0x218)][_0x43aaca])){const _0x2dc7e8=String(RegExp['$1']),_0x5aefac=_0x23be58(0x113)['format'](_0x2dc7e8,_0x43aaca),_0x56b045=VisuMZ[_0x23be58(0x288)][_0x23be58(0xfe)](_0x2beff4,_0x43aaca);VisuMZ[_0x23be58(0x288)]['JS'][_0x56b045]=new Function(_0x5aefac);}},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x22e)]=function(_0x3d70b4,_0x4f243d){const _0x1303b6=_0x5e6d15,_0x110065=_0x3d70b4['note'];if(_0x110065['match'](VisuMZ['BattleSystemCTB'][_0x1303b6(0x218)]['OrderJS'])){const _0x416a0b=String(RegExp['$1']),_0x1d3c0c=_0x1303b6(0xc9)[_0x1303b6(0x1a3)](_0x416a0b,_0x4f243d),_0x1aca7e=VisuMZ[_0x1303b6(0x288)][_0x1303b6(0xfe)](_0x3d70b4,_0x4f243d);VisuMZ['BattleSystemCTB']['JS'][_0x1aca7e]=new Function(_0x1d3c0c);}},VisuMZ[_0x5e6d15(0x288)]['createKeyJS']=function(_0x3ac3c0,_0x29397b){const _0x462050=_0x5e6d15;let _0x365100='';if($dataActors[_0x462050(0x20c)](_0x3ac3c0))_0x365100='Actor-%1-%2'['format'](_0x3ac3c0['id'],_0x29397b);if($dataClasses[_0x462050(0x20c)](_0x3ac3c0))_0x365100=_0x462050(0x150)[_0x462050(0x1a3)](_0x3ac3c0['id'],_0x29397b);if($dataSkills[_0x462050(0x20c)](_0x3ac3c0))_0x365100='Skill-%1-%2'[_0x462050(0x1a3)](_0x3ac3c0['id'],_0x29397b);if($dataItems[_0x462050(0x20c)](_0x3ac3c0))_0x365100=_0x462050(0x219)[_0x462050(0x1a3)](_0x3ac3c0['id'],_0x29397b);if($dataWeapons[_0x462050(0x20c)](_0x3ac3c0))_0x365100=_0x462050(0x1b8)[_0x462050(0x1a3)](_0x3ac3c0['id'],_0x29397b);if($dataArmors[_0x462050(0x20c)](_0x3ac3c0))_0x365100='Armor-%1-%2'[_0x462050(0x1a3)](_0x3ac3c0['id'],_0x29397b);if($dataEnemies[_0x462050(0x20c)](_0x3ac3c0))_0x365100=_0x462050(0x10e)[_0x462050(0x1a3)](_0x3ac3c0['id'],_0x29397b);if($dataStates[_0x462050(0x20c)](_0x3ac3c0))_0x365100=_0x462050(0x1d9)[_0x462050(0x1a3)](_0x3ac3c0['id'],_0x29397b);return _0x365100;},ImageManager['svActorHorzCells']=ImageManager[_0x5e6d15(0x165)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x5e6d15(0x294)]||0x6,VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x250)]=BattleManager[_0x5e6d15(0xa3)],BattleManager[_0x5e6d15(0xa3)]=function(){const _0x133599=_0x5e6d15;if(this[_0x133599(0x177)]())return _0x133599(0x1b3);return VisuMZ['BattleSystemCTB'][_0x133599(0x250)][_0x133599(0x28f)](this);},BattleManager[_0x5e6d15(0x177)]=function(){const _0xe7fd7a=_0x5e6d15;return $gameSystem[_0xe7fd7a(0x214)]()===_0xe7fd7a(0x1b3);},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x140)]=BattleManager[_0x5e6d15(0x22c)],BattleManager[_0x5e6d15(0x22c)]=function(){const _0x45545a=_0x5e6d15;if(this[_0x45545a(0x177)]())return!![];return VisuMZ['BattleSystemCTB'][_0x45545a(0x140)][_0x45545a(0x28f)](this);},VisuMZ['BattleSystemCTB'][_0x5e6d15(0x134)]=BattleManager['isActiveTpb'],BattleManager[_0x5e6d15(0x298)]=function(){const _0x4bd1e9=_0x5e6d15;if(this[_0x4bd1e9(0x177)]())return![];return VisuMZ['BattleSystemCTB']['BattleManager_isActiveTpb'][_0x4bd1e9(0x28f)](this);},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x13f)]=BattleManager['updateTurn'],BattleManager['updateTurn']=function(_0x410cc7){const _0x23bde8=_0x5e6d15;this[_0x23bde8(0x177)]()?this[_0x23bde8(0x1fd)](_0x410cc7):VisuMZ[_0x23bde8(0x288)][_0x23bde8(0x13f)][_0x23bde8(0x28f)](this,_0x410cc7);},BattleManager[_0x5e6d15(0x1fd)]=function(_0x422b2d){const _0x32aeb4=_0x5e6d15;$gameParty[_0x32aeb4(0xf1)]();for(;;){if(_0x32aeb4(0x1fa)!==_0x32aeb4(0x1fa))_0x17daf9[_0x32aeb4(0x177)]()?this['updateTpbCastTimeCTB']():_0x17701b[_0x32aeb4(0x288)][_0x32aeb4(0x12b)][_0x32aeb4(0x28f)](this);else{if(this[_0x32aeb4(0x10a)]&&this['_phase']===_0x32aeb4(0x142)){if('JZDLC'===_0x32aeb4(0x19b))this['_positionTargetY']=_0x322b02?0x0:_0x39172b[_0x32aeb4(0x235)]-this['_positionTargetY']-_0x25b76c[_0x32aeb4(0x93)];else{this[_0x32aeb4(0x9c)](),this['updateTurnOrderCTB']();break;}}if(this[_0x32aeb4(0x261)]()){if(_0x32aeb4(0xad)!==_0x32aeb4(0xad))return _0x5a7025[_0x32aeb4(0x214)]()==='CTB';else break;}_0x422b2d&&this[_0x32aeb4(0xd3)]();if(!this[_0x32aeb4(0x10a)]){if('Zlwqg'===_0x32aeb4(0x157)){if(this[_0x32aeb4(0x177)]())return _0x32aeb4(0x1b3);return _0x40406c['BattleSystemCTB'][_0x32aeb4(0x250)][_0x32aeb4(0x28f)](this);}else this[_0x32aeb4(0x10a)]=this[_0x32aeb4(0x195)]();}this['_subject']&&(this[_0x32aeb4(0x9c)](),this[_0x32aeb4(0x16b)]());if(VisuMZ[_0x32aeb4(0x288)][_0x32aeb4(0x239)][_0x32aeb4(0x236)][_0x32aeb4(0xba)]){if('CJOCf'!=='VHcjl')break;else _0x28bfa6[_0x32aeb4(0xf6)](this['_letter'][_0x32aeb4(0x26d)](),0x0,_0x2b3b65/0x2,_0x54da86,_0x7d7005/0x2,'center');}}}this[_0x32aeb4(0xa5)]();},VisuMZ[_0x5e6d15(0x288)]['BattleManager_processTurn']=BattleManager[_0x5e6d15(0x9c)],BattleManager['processTurn']=function(){const _0x66d6e5=_0x5e6d15;if(this[_0x66d6e5(0x177)]()){if(_0x66d6e5(0x167)!==_0x66d6e5(0x1d5))this[_0x66d6e5(0x204)]();else{const _0x14d29c=this['tpbRequiredCastTime'](),_0x1fa6ed=_0x14d29c*_0x1be025;this[_0x66d6e5(0x225)]=this[_0x66d6e5(0x225)]+_0x1fa6ed;}}else{if('ONqlZ'==='uyqTw'){const _0x23c34b=this[_0x66d6e5(0x1ca)],_0x2e90ee=this[_0x66d6e5(0xf7)](),_0x5b339e=this[_0x66d6e5(0x1c5)](),_0x25ae03=_0x52ed2a[_0x66d6e5(0xc1)](_0x2e90ee,_0x5b339e);this[_0x66d6e5(0xe6)][_0x66d6e5(0x115)]=new _0x33d001(_0x2e90ee,_0x5b339e);const _0x1a086f=this['_graphicSprite'][_0x66d6e5(0x115)],_0xc1971c=_0x5af2fb[_0x66d6e5(0x1a6)],_0x3047f6=_0x1d51dd[_0x66d6e5(0xca)],_0x25163f=_0x25ae03/_0x1f4a4b['max'](_0xc1971c,_0x3047f6),_0x183402=_0xb2a92d[_0x66d6e5(0x1a6)],_0xa30c2a=_0x47ac03['faceHeight'],_0x4d2092=_0x23c34b%0x4*_0xc1971c+(_0xc1971c-_0x183402)/0x2,_0x53da0f=_0x7076d9['floor'](_0x23c34b/0x4)*_0x3047f6+(_0x3047f6-_0xa30c2a)/0x2,_0x46a78f=(_0x2e90ee-_0xc1971c*_0x25163f)/0x2,_0x120663=(_0x5b339e-_0x3047f6*_0x25163f)/0x2;_0x1a086f[_0x66d6e5(0xcd)](_0x5e042f,_0x4d2092,_0x53da0f,_0x183402,_0xa30c2a,_0x46a78f,_0x120663,_0x25ae03,_0x25ae03);}else VisuMZ[_0x66d6e5(0x288)][_0x66d6e5(0x24d)]['call'](this);}},BattleManager[_0x5e6d15(0x204)]=function(){const _0x5dd905=_0x5e6d15,_0x120f5e=this['_subject'],_0x40b34d=_0x120f5e['currentAction']();if(_0x40b34d){if(_0x5dd905(0xcc)!=='qMWpX')this[_0x5dd905(0xd8)]=_0x457067?_0x4fb26b['width']-this[_0x5dd905(0xd8)]-_0x1cd0aa[_0x5dd905(0x93)]:0x0;else{_0x40b34d['prepare']();if(_0x40b34d[_0x5dd905(0x1f5)]()){if(_0x5dd905(0x198)!==_0x5dd905(0x133))this['startAction'](),_0x120f5e['removeCurrentAction']();else for(let _0x2ca470=0x0;_0x2ca470<_0x25b0fd;_0x2ca470++){const _0x3de7cb=new _0x26c1b4(_0x79ff57,_0x285da7,_0x2ca470);this[_0x5dd905(0x1d2)]['addChild'](_0x3de7cb),this[_0x5dd905(0x286)][_0x5dd905(0x262)](_0x3de7cb);}}else _0x120f5e[_0x5dd905(0x22f)](),_0x120f5e[_0x5dd905(0x185)](0x0),this[_0x5dd905(0x1aa)](),this[_0x5dd905(0x10a)]=null;}}else _0x120f5e[_0x5dd905(0x185)](0x0),this[_0x5dd905(0x1aa)](),this[_0x5dd905(0x10a)]=null;},BattleManager[_0x5e6d15(0x261)]=function(){const _0xefe783=_0x5e6d15;if(this[_0xefe783(0x10a)])return!![];if(this[_0xefe783(0x15f)]!==_0xefe783(0x142))return!![];if(this['isInputting']())return!![];if(this[_0xefe783(0x1e3)])return![];const _0xf7c374=this['allBattleMembers']()[_0xefe783(0x171)](_0x6e0d52=>_0x6e0d52&&_0x6e0d52[_0xefe783(0xb6)]());return _0xf7c374[_0xefe783(0x20f)](_0x639e5a=>_0x639e5a['isPassCTB']());},Game_Battler[_0x5e6d15(0x178)]['isPassCTB']=function(){const _0x137d4c=_0x5e6d15;if(this['isTpbCharged']())return!![];if(this[_0x137d4c(0x11d)]())return!![];if(this['isActing']())return!![];return![];},BattleManager[_0x5e6d15(0xa5)]=function(){const _0xd9c5d1=_0x5e6d15;let _0x5515d1=VisuMZ[_0xd9c5d1(0x288)][_0xd9c5d1(0x239)][_0xd9c5d1(0x236)]['DeviceFriendly']?0x1e:0xa;if(this[_0xd9c5d1(0x261)]()&&this[_0xd9c5d1(0x268)]()){this['_anti_CTB_SoftlockCount']=this[_0xd9c5d1(0x1c3)]||0x0,this['_anti_CTB_SoftlockCount']++;if(this[_0xd9c5d1(0x1c3)]>=_0x5515d1){if('iePqQ'!==_0xd9c5d1(0x9d)){let _0x5d5340=_0x3b9863[_0xd9c5d1(0x288)][_0xd9c5d1(0x239)][_0xd9c5d1(0x236)][_0xd9c5d1(0xba)]?0x1e:0xa;this[_0xd9c5d1(0x261)]()&&this[_0xd9c5d1(0x268)]()?(this[_0xd9c5d1(0x1c3)]=this['_anti_CTB_SoftlockCount']||0x0,this[_0xd9c5d1(0x1c3)]++,this['_anti_CTB_SoftlockCount']>=_0x5d5340&&this['processCtbAntiSoftlock']()):this[_0xd9c5d1(0x1c3)]=0x0;}else this[_0xd9c5d1(0x27c)]();}}else this[_0xd9c5d1(0x1c3)]=0x0;},BattleManager['otherCtbChecksPassed']=function(){const _0x1746d6=_0x5e6d15;if(this[_0x1746d6(0x10a)])return![];if(this['_phase']!==_0x1746d6(0x142))return![];if(this[_0x1746d6(0x27d)]())return![];return!![];},BattleManager[_0x5e6d15(0x27c)]=function(){const _0x55e57e=_0x5e6d15;$gameTemp[_0x55e57e(0x23f)]()&&(_0x55e57e(0x103)===_0x55e57e(0x103)?console[_0x55e57e(0x89)](_0x55e57e(0x190),this['_anti_CTB_SoftlockCount']):(this['x']=this[_0x55e57e(0xd8)],this['y']=this[_0x55e57e(0x10f)],this[_0x55e57e(0x1a7)]<=0x0&&!this[_0x55e57e(0x242)]&&this[_0x55e57e(0x28e)](0xff)));for(const _0x41d10e of this[_0x55e57e(0x17c)]()){if(_0x55e57e(0x98)===_0x55e57e(0x1e9))_0x131f23[_0x55e57e(0x185)](0x0),this[_0x55e57e(0x1aa)](),this[_0x55e57e(0x10a)]=null;else{if(!_0x41d10e)continue;_0x41d10e[_0x55e57e(0x1b5)]()&&(_0x41d10e[_0x55e57e(0x1c8)](_0x55e57e(0x199)),_0x41d10e[_0x55e57e(0x182)]=_0x55e57e(0x1ea));}}this['_subject']=null,this[_0x55e57e(0x15f)]=_0x55e57e(0x142),this[_0x55e57e(0x29a)]=![];},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x101)]=BattleManager[_0x5e6d15(0x100)],BattleManager[_0x5e6d15(0x100)]=function(){const _0x23fd4f=_0x5e6d15;if(this[_0x23fd4f(0x177)]())'cMjzq'!=='ErJmU'?this[_0x23fd4f(0x15e)]():(_0x3d62c9[_0x23fd4f(0x288)]['ParseSkillNotetags']['call'](this,_0x5aa48a),_0x49f04a[_0x23fd4f(0x288)]['Parse_Notetags_CreateJS'](_0x51bb25));else{if(_0x23fd4f(0x216)!==_0x23fd4f(0xdd))VisuMZ['BattleSystemCTB'][_0x23fd4f(0x101)]['call'](this);else return this['_tpbCastTime']/this[_0x23fd4f(0x102)]();}},BattleManager[_0x5e6d15(0x15e)]=function(){const _0x462f91=_0x5e6d15,_0x2b077a=this[_0x462f91(0x17c)]();_0x2b077a[_0x462f91(0x221)]((_0xc15b96,_0x296172)=>{const _0x5d4a67=_0x462f91;return _0xc15b96[_0x5d4a67(0x146)](0x1)-_0x296172[_0x5d4a67(0x146)](0x1);});for(const _0x58a812 of _0x2b077a){_0x462f91(0xeb)===_0x462f91(0x127)?this[_0x462f91(0x177)]()?this[_0x462f91(0x204)]():_0x12a55b[_0x462f91(0x288)]['BattleManager_processTurn'][_0x462f91(0x28f)](this):this[_0x462f91(0x223)](_0x58a812);}},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x1bf)]=BattleManager[_0x5e6d15(0x1dc)],BattleManager[_0x5e6d15(0x1dc)]=function(){const _0x1d21d3=_0x5e6d15;VisuMZ[_0x1d21d3(0x288)][_0x1d21d3(0x1bf)][_0x1d21d3(0x28f)](this),this['updateTurnOrderCTB'](!![]);},VisuMZ['BattleSystemCTB'][_0x5e6d15(0x1e5)]=BattleManager[_0x5e6d15(0x1aa)],BattleManager['endAction']=function(){const _0x389a83=_0x5e6d15;this['preEndActionCTB'](),VisuMZ['BattleSystemCTB']['BattleManager_endAction'][_0x389a83(0x28f)](this),this[_0x389a83(0x200)]();},BattleManager[_0x5e6d15(0x1ce)]=function(){const _0xa72346=_0x5e6d15;if(!this[_0xa72346(0x177)]())return;if(this[_0xa72346(0x10a)]&&this[_0xa72346(0x10a)]['numActions']()<=0x0){if(_0xa72346(0xe5)!=='CIxRz'){if(_0x108edd[_0xa72346(0xe0)](this))return;_0x2b2601['BattleSystemCTB']['Game_Battler_updateTpb'][_0xa72346(0x28f)](this);}else this[_0xa72346(0x227)](),this[_0xa72346(0x10a)][_0xa72346(0x1c8)](_0xa72346(0x199));}},BattleManager[_0x5e6d15(0x200)]=function(){const _0x582550=_0x5e6d15;if(!this['isCTB']())return;if(this[_0x582550(0x10a)]&&$gameTemp['isCommonEventReserved']()){if(_0x582550(0x10d)!==_0x582550(0x141)){this['_subject'][_0x582550(0x182)]=_0x582550(0x16f),this[_0x582550(0x10a)][_0x582550(0x1a1)]=_0x582550(0x27b);return;}else return _0x274342[_0x582550(0x146)](0x1)-_0x37ddde[_0x582550(0x146)](0x1);}this[_0x582550(0x16b)](),this[_0x582550(0x10a)]&&this[_0x582550(0x9c)]();},VisuMZ[_0x5e6d15(0x288)]['BattleManager_startActorInput']=BattleManager[_0x5e6d15(0x1b9)],BattleManager[_0x5e6d15(0x1b9)]=function(){const _0x26f2de=_0x5e6d15;this[_0x26f2de(0x16b)](),VisuMZ['BattleSystemCTB']['BattleManager_startActorInput'][_0x26f2de(0x28f)](this);},BattleManager[_0x5e6d15(0x16b)]=function(_0x890d9f){const _0x26281d=_0x5e6d15;if(!this[_0x26281d(0x177)]())return;const _0x315e78=SceneManager[_0x26281d(0x8d)][_0x26281d(0xae)];if(!_0x315e78)return;_0x315e78['updateTurnOrder'](_0x890d9f);},BattleManager[_0x5e6d15(0x227)]=function(){const _0x189d75=_0x5e6d15;if(!this[_0x189d75(0x177)]())return;const _0x15222a=SceneManager[_0x189d75(0x8d)]['_ctbTurnOrderWindow'];if(!_0x15222a)return;_0x15222a[_0x189d75(0x8b)](this['_subject']);},VisuMZ['BattleSystemCTB'][_0x5e6d15(0x130)]=Game_System[_0x5e6d15(0x178)][_0x5e6d15(0x203)],Game_System[_0x5e6d15(0x178)]['initialize']=function(){const _0x371d23=_0x5e6d15;VisuMZ[_0x371d23(0x288)][_0x371d23(0x130)]['call'](this),this[_0x371d23(0xf8)]();},Game_System[_0x5e6d15(0x178)][_0x5e6d15(0xf8)]=function(){const _0x2f7455=_0x5e6d15;this[_0x2f7455(0x15d)]=!![];},Game_System[_0x5e6d15(0x178)]['isBattleSystemCTBTurnOrderVisible']=function(){const _0x24de42=_0x5e6d15;return this[_0x24de42(0x15d)]===undefined&&(_0x24de42(0x266)===_0x24de42(0x266)?this['initBattleSystemCTB']():this[_0x24de42(0x1c1)]()),this['_ctbTurnOrderVisible'];},Game_System[_0x5e6d15(0x178)][_0x5e6d15(0x259)]=function(_0x15e767){const _0x5c15bb=_0x5e6d15;this[_0x5c15bb(0x15d)]===undefined&&(_0x5c15bb(0x1cd)===_0x5c15bb(0x1cd)?this[_0x5c15bb(0xf8)]():this[_0x5c15bb(0x20b)]()),this[_0x5c15bb(0x15d)]=_0x15e767;},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x282)]=Game_Action['prototype'][_0x5e6d15(0xb8)],Game_Action[_0x5e6d15(0x178)]['applyItemUserEffect']=function(_0x176b2d){const _0x2f9946=_0x5e6d15;VisuMZ[_0x2f9946(0x288)][_0x2f9946(0x282)][_0x2f9946(0x28f)](this,_0x176b2d),this[_0x2f9946(0x275)](_0x176b2d);},Game_Action[_0x5e6d15(0x178)][_0x5e6d15(0x275)]=function(_0x5719c8){const _0x1a5395=_0x5e6d15;if(!SceneManager[_0x1a5395(0x1ae)]())return;if(!BattleManager[_0x1a5395(0x177)]())return;if(this[_0x1a5395(0x253)]())this[_0x1a5395(0x248)](_0x5719c8);},Game_Action[_0x5e6d15(0x178)][_0x5e6d15(0x248)]=function(_0x45bbf5){const _0x31ca70=_0x5e6d15,_0x4b604e=this[_0x31ca70(0x253)]()[_0x31ca70(0xc7)];if(_0x45bbf5[_0x31ca70(0xd0)]()){const _0xfd5648=VisuMZ[_0x31ca70(0x288)][_0x31ca70(0xfe)](this[_0x31ca70(0x253)](),_0x31ca70(0xd2));if(VisuMZ['BattleSystemCTB']['JS'][_0xfd5648]){if(_0x31ca70(0x229)===_0x31ca70(0x229)){const _0x4344ab=VisuMZ[_0x31ca70(0x288)]['JS'][_0xfd5648][_0x31ca70(0x28f)](this,this[_0x31ca70(0x162)](),_0x45bbf5);_0x45bbf5[_0x31ca70(0x280)](_0x4344ab);}else _0x4c1088['isCTB']()?this[_0x31ca70(0x25d)]():_0x16214e[_0x31ca70(0x288)][_0x31ca70(0x1d7)]['call'](this);}if(_0x4b604e[_0x31ca70(0x1dd)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)){if(_0x31ca70(0xe4)!==_0x31ca70(0xe4)){if(!_0x526051[_0x31ca70(0x239)][_0x31ca70(0x117)])return;const _0x3de265=_0x47b827[_0x31ca70(0x239)],_0x285da6=this[_0x31ca70(0x1f8)]===_0x2a65ac?'Actor':'Enemy',_0x4eb220='%1SystemBg'['format'](_0x285da6),_0x3a0b9e=new _0x1d5c97();_0x3a0b9e[_0x31ca70(0x1be)]['x']=this[_0x31ca70(0x1be)]['x'],_0x3a0b9e[_0x31ca70(0x1be)]['y']=this['anchor']['y'];if(_0x3de265[_0x4eb220])_0x3a0b9e[_0x31ca70(0x115)]=_0x33f842[_0x31ca70(0x17d)](_0x3de265[_0x4eb220]);else{const _0x1bfe14=this[_0x31ca70(0xf7)](),_0x4ba2c8=this[_0x31ca70(0x1c5)]();_0x3a0b9e[_0x31ca70(0x115)]=new _0x1ffe53(_0x1bfe14,_0x4ba2c8);const _0xfa0f4d=_0x523115[_0x31ca70(0x12c)](_0x3de265[_0x31ca70(0xc4)[_0x31ca70(0x1a3)](_0x285da6)]),_0x4873e2=_0x34e687[_0x31ca70(0x12c)](_0x3de265['%1BgColor2'['format'](_0x285da6)]);_0x3a0b9e[_0x31ca70(0x115)][_0x31ca70(0x13d)](0x0,0x0,_0x1bfe14,_0x4ba2c8,_0xfa0f4d,_0x4873e2,!![]);}this[_0x31ca70(0x292)]=_0x3a0b9e,this[_0x31ca70(0x13a)](this[_0x31ca70(0x292)]),this[_0x31ca70(0x215)]=this[_0x31ca70(0x292)]['width'],this[_0x31ca70(0x235)]=this['_backgroundSprite'][_0x31ca70(0x235)];}else _0x45bbf5[_0x31ca70(0x280)](Number(RegExp['$1'])*0.01);}if(_0x4b604e[_0x31ca70(0x1dd)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x31ca70(0x16d)!==_0x31ca70(0x16d))return _0x27bb7a(_0x3fad6d['$1']);else _0x45bbf5['changeCtbChargeTime'](Number(RegExp['$1'])*0.01);}}else{if(_0x45bbf5[_0x31ca70(0x183)]()){const _0x2b499e=VisuMZ[_0x31ca70(0x288)][_0x31ca70(0xfe)](this[_0x31ca70(0x253)](),_0x31ca70(0x285));if(VisuMZ[_0x31ca70(0x288)]['JS'][_0x2b499e]){const _0x255a19=VisuMZ[_0x31ca70(0x288)]['JS'][_0x2b499e]['call'](this,this[_0x31ca70(0x162)](),_0x45bbf5);_0x45bbf5[_0x31ca70(0x1a9)](_0x255a19);}_0x4b604e['match'](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x45bbf5[_0x31ca70(0x1a9)](Number(RegExp['$1'])*0.01),_0x4b604e[_0x31ca70(0x1dd)](/<(?:CTB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x45bbf5[_0x31ca70(0xe3)](Number(RegExp['$1'])*0.01);}}const _0x2e0a91=VisuMZ[_0x31ca70(0x288)][_0x31ca70(0xfe)](this['item'](),_0x31ca70(0x159));if(VisuMZ[_0x31ca70(0x288)]['JS'][_0x2e0a91]){if(_0x31ca70(0xe9)==='ctnyw')this[_0x31ca70(0x18a)]=_0x418a95[_0x31ca70(0xda)]();else{const _0x4332a2=VisuMZ[_0x31ca70(0x288)]['JS'][_0x2e0a91][_0x31ca70(0x28f)](this,this['subject'](),_0x45bbf5);_0x45bbf5[_0x31ca70(0x21c)](_0x4332a2);}}if(_0x4b604e[_0x31ca70(0x1dd)](/<(?:CTB) (?:SET|MAKE|EXACT) ORDER:[ ](\d+)>/i)){if(_0x31ca70(0xcf)!==_0x31ca70(0x296))_0x45bbf5['setTurnOrderCTB'](Number(RegExp['$1']));else return 0x0;}_0x4b604e[_0x31ca70(0x1dd)](/<(?:CTB) (?:CHANGE|DELAY|RUSH|SHIFT) ORDER:[ ]([\+\-]\d+)>/i)&&(_0x31ca70(0x16a)!=='fyDsN'?_0x495dcc+=_0x3c8ec5[_0x31ca70(0x288)]['JS'][_0x578c2e]['call'](this,this[_0x31ca70(0x162)](),this[_0x31ca70(0x162)]()):_0x45bbf5['changeTurnOrderByCTB'](Number(RegExp['$1'])));},VisuMZ[_0x5e6d15(0x288)]['Game_Action_applyGlobal']=Game_Action[_0x5e6d15(0x178)][_0x5e6d15(0x137)],Game_Action['prototype'][_0x5e6d15(0x137)]=function(){const _0x466dee=_0x5e6d15;VisuMZ[_0x466dee(0x288)][_0x466dee(0x211)][_0x466dee(0x28f)](this),this[_0x466dee(0x1e7)]();},Game_Action[_0x5e6d15(0x178)][_0x5e6d15(0x1e7)]=function(){const _0x1de6cb=_0x5e6d15;if(!this[_0x1de6cb(0x253)]())return;if(!BattleManager['isCTB']())return;const _0x5c237b=this[_0x1de6cb(0x253)]()[_0x1de6cb(0xc7)];let _0x4d6164=0x0;this[_0x1de6cb(0x249)]&&(_0x4d6164=this[_0x1de6cb(0x162)]()[_0x1de6cb(0x257)]);const _0x1bea0f=VisuMZ[_0x1de6cb(0x288)][_0x1de6cb(0xfe)](this[_0x1de6cb(0x253)](),_0x1de6cb(0x1a8));VisuMZ[_0x1de6cb(0x288)]['JS'][_0x1bea0f]&&(_0x1de6cb(0x96)===_0x1de6cb(0x8f)?(this['_graphicEnemy']=_0x1e0339['battlerName'](),_0x963811=_0x540cfc[_0x1de6cb(0x11b)](this[_0x1de6cb(0x125)]),_0x598099[_0x1de6cb(0x164)](this[_0x1de6cb(0x11f)]['bind'](this,_0x28a713))):_0x4d6164+=VisuMZ[_0x1de6cb(0x288)]['JS'][_0x1bea0f][_0x1de6cb(0x28f)](this,this[_0x1de6cb(0x162)](),this['subject']()));let _0x4678c0=this[_0x1de6cb(0x253)]()[_0x1de6cb(0x208)]>0x0?this[_0x1de6cb(0x253)]()['speed']:0x0;if(this[_0x1de6cb(0x17f)]())_0x4678c0+=this[_0x1de6cb(0x162)]()[_0x1de6cb(0x244)]();_0x4d6164+=(_0x4678c0/0xfa0)[_0x1de6cb(0x29c)](0x0,0x1);this[_0x1de6cb(0x253)]()[_0x1de6cb(0xc7)]['match'](/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x1de6cb(0x26b)==='WIKoW'?(this['x']=this['_homeX'],this['y']=this[_0x1de6cb(0xb1)]):_0x4d6164+=Number(RegExp['$1'])*0.01);const _0x35bf1f=this[_0x1de6cb(0x162)]()[_0x1de6cb(0xa7)]()[_0x1de6cb(0xb7)](this[_0x1de6cb(0x162)]()[_0x1de6cb(0x1cf)]()),_0x3f9785=/<(?:CTB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x363fae=_0x35bf1f['map'](_0x3716e0=>_0x3716e0&&_0x3716e0['note'][_0x1de6cb(0x1dd)](_0x3f9785)?Number(RegExp['$1'])*0.01:0x0);_0x4d6164=_0x363fae[_0x1de6cb(0xb0)]((_0x574816,_0x1bb63e)=>_0x574816+_0x1bb63e,_0x4d6164),this[_0x1de6cb(0x162)]()[_0x1de6cb(0x185)](_0x4d6164);},Game_BattlerBase[_0x5e6d15(0x178)]['setCtbChargeTime']=function(_0x2a057a){const _0xd81a6d=_0x5e6d15;this[_0xd81a6d(0x257)]=_0x2a057a;},Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0x284)]=function(_0x21354c){const _0x24fee2=_0x5e6d15;this[_0x24fee2(0x280)](this[_0x24fee2(0x257)]+_0x21354c);},Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0x1a9)]=function(_0x302807){const _0x456c7a=_0x5e6d15,_0x525056=this['tpbRequiredCastTime']();this[_0x456c7a(0x225)]=_0x525056*_0x302807;},Game_BattlerBase[_0x5e6d15(0x178)]['changeCtbCastTime']=function(_0x49a6a6){const _0x57ed9f=_0x5e6d15,_0x2c5034=this[_0x57ed9f(0x102)](),_0x509d6a=_0x2c5034*_0x49a6a6;this[_0x57ed9f(0x225)]=this[_0x57ed9f(0x225)]+_0x509d6a;},VisuMZ[_0x5e6d15(0x288)]['Game_BattlerBase_appear']=Game_BattlerBase['prototype'][_0x5e6d15(0x83)],Game_BattlerBase['prototype'][_0x5e6d15(0x83)]=function(){const _0x215c68=_0x5e6d15;VisuMZ[_0x215c68(0x288)]['Game_BattlerBase_appear'][_0x215c68(0x28f)](this),BattleManager[_0x215c68(0x16b)]();},VisuMZ['BattleSystemCTB']['Game_BattlerBase_hide']=Game_BattlerBase[_0x5e6d15(0x178)]['hide'],Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0x18f)]=function(){const _0x4b421c=_0x5e6d15;VisuMZ['BattleSystemCTB'][_0x4b421c(0x1f4)]['call'](this),BattleManager[_0x4b421c(0x16b)]();},Game_BattlerBase['prototype']['clearTurnOrderCTBGraphics']=function(){const _0xda84a7=_0x5e6d15;delete this[_0xda84a7(0x1f2)],delete this[_0xda84a7(0x202)],delete this[_0xda84a7(0xe1)],delete this['_ctbTurnOrderIconIndex'];},Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0xbc)]=function(){const _0x430751=_0x5e6d15;return this['_ctbTurnOrderGraphicType']===undefined&&(this['_ctbTurnOrderGraphicType']=this[_0x430751(0x212)]()),this['_ctbTurnOrderGraphicType'];},Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0x212)]=function(){const _0x2f40e1=_0x5e6d15;return Window_CTB_TurnOrder[_0x2f40e1(0x239)][_0x2f40e1(0x8c)];},Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0x1eb)]=function(){const _0x549041=_0x5e6d15;return this[_0x549041(0x202)]===undefined&&(this[_0x549041(0x202)]=this['createTurnOrderCTBGraphicFaceName']()),this['_ctbTurnOrderFaceName'];},Game_BattlerBase[_0x5e6d15(0x178)]['createTurnOrderCTBGraphicFaceName']=function(){const _0x3ba26c=_0x5e6d15;return Window_CTB_TurnOrder['Settings'][_0x3ba26c(0x21e)];},Game_BattlerBase[_0x5e6d15(0x178)]['TurnOrderCTBGraphicFaceIndex']=function(){const _0x57278e=_0x5e6d15;if(this[_0x57278e(0xe1)]===undefined){if(_0x57278e(0x1da)==='tiVHm')this['_ctbTurnOrderFaceIndex']=this[_0x57278e(0xa1)]();else return this['_ctbTurnOrderIconIndex']===_0x10b4e4&&(this[_0x57278e(0x16e)]=this[_0x57278e(0x1ed)]()),this[_0x57278e(0x16e)];}return this[_0x57278e(0xe1)];},Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0xa1)]=function(){const _0x545e52=_0x5e6d15;return Window_CTB_TurnOrder[_0x545e52(0x239)][_0x545e52(0x1ff)];},Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0x205)]=function(){const _0x42be8d=_0x5e6d15;return this[_0x42be8d(0x16e)]===undefined&&(this[_0x42be8d(0x16e)]=this['createTurnOrderCTBGraphicIconIndex']()),this[_0x42be8d(0x16e)];},Game_BattlerBase[_0x5e6d15(0x178)][_0x5e6d15(0x1ed)]=function(){const _0x330def=_0x5e6d15;return Window_CTB_TurnOrder[_0x330def(0x239)][_0x330def(0xb5)];},Game_BattlerBase['prototype'][_0x5e6d15(0xc0)]=function(_0x2298be){const _0x15e78b=_0x5e6d15;this[_0x15e78b(0x16e)]=_0x2298be;},Game_BattlerBase[_0x5e6d15(0x178)]['ctbTicksToGoal']=function(_0x31080f,_0xef9141){const _0x296669=_0x5e6d15;if(this[_0x296669(0xa4)]())return Number[_0x296669(0x251)];if(!this[_0x296669(0xb6)]())return Number[_0x296669(0x251)];if(_0x31080f===0x1&&!_0xef9141){if('WvOBZ'!==_0x296669(0x109)){const _0x384d45=this[_0x296669(0xf7)](),_0x1ab14c=this['bitmapHeight'](),_0x1cc920=_0x3ca4e0[_0x296669(0x18e)](_0x384d45,_0x1ab14c);this['_graphicSprite']['bitmap']=new _0x3d4621(_0x384d45,_0x1ab14c);const _0x23e3e9=this['_graphicSprite'][_0x296669(0x115)],_0x1c940e=this[_0x296669(0x22b)][_0x296669(0x1dd)](/\$/i),_0x164a58=_0x1c940e?0x1:_0x12b1ae[_0x296669(0x165)],_0x87dd5f=_0x1c940e?0x1:_0x26bd8d[_0x296669(0x294)],_0x1ea1f7=_0x3d682f[_0x296669(0x215)]/_0x164a58,_0x577cda=_0x589a82['height']/_0x87dd5f,_0x53bf44=_0x4a49cc[_0x296669(0x18e)](0x1,_0x1cc920/_0x1ea1f7,_0x1cc920/_0x577cda),_0x121b10=_0x1ea1f7*_0x53bf44,_0x45a301=_0x577cda*_0x53bf44,_0x710434=_0x5b0f43['round']((_0x384d45-_0x121b10)/0x2),_0x4fb950=_0x492955[_0x296669(0x124)]((_0x1ab14c-_0x45a301)/0x2);_0x23e3e9['blt'](_0x3be7f3,0x0,0x0,_0x1ea1f7,_0x577cda,_0x710434,_0x4fb950,_0x121b10,_0x45a301);}else{if(this===BattleManager['_subject'])return _0x296669(0x1c4)!==_0x296669(0x1c4)?_0x296669(0x247):Number[_0x296669(0x1bc)]/0xa;if(this===BattleManager['actor']())return Number[_0x296669(0x1bc)]/0xa;if(BattleManager[_0x296669(0x87)]&&BattleManager['_actionBattlers'][_0x296669(0x20c)](this)){let _0x18215b=Number[_0x296669(0x1bc)]/0x1388;return _0x18215b+=BattleManager[_0x296669(0x87)][_0x296669(0x174)](this)*0x5,_0x18215b;}}}return _0x31080f-=this['tpbChargeTime'](),_0x31080f/=this[_0x296669(0x23d)](),_0x31080f+=this['ctbTicksToGoalAddedCastTime'](),_0x31080f;},Game_BattlerBase['prototype'][_0x5e6d15(0x18b)]=function(){const _0x6736b9=_0x5e6d15;if(this[_0x6736b9(0x182)]===_0x6736b9(0x10b)){if(_0x6736b9(0x245)!==_0x6736b9(0x245)){const _0xa31c96=new _0x26db1b();_0xa31c96[_0x6736b9(0x1be)]['x']=this[_0x6736b9(0x1be)]['x'],_0xa31c96[_0x6736b9(0x1be)]['y']=this['anchor']['y'],this['_graphicSprite']=_0xa31c96,this['addChild'](this[_0x6736b9(0xe6)]),this['processUpdateGraphic']();}else return(this[_0x6736b9(0x102)]()-this['_tpbCastTime'])/this[_0x6736b9(0x23d)]();}else return 0x0;},VisuMZ['BattleSystemCTB'][_0x5e6d15(0xdc)]=Game_Battler[_0x5e6d15(0x178)]['initTpbChargeTime'],Game_Battler['prototype'][_0x5e6d15(0x222)]=function(_0x2019ef){const _0x2f6da8=_0x5e6d15;BattleManager['isCTB']()?_0x2f6da8(0x9e)==='CpegH'?this[_0x2f6da8(0x15c)](_0x2019ef):this[_0x2f6da8(0x10a)]=this[_0x2f6da8(0x195)]():VisuMZ[_0x2f6da8(0x288)][_0x2f6da8(0xdc)][_0x2f6da8(0x28f)](this,_0x2019ef);},Game_Battler['prototype']['initTpbChargeTimeCTB']=function(_0x558195){const _0x1438ef=_0x5e6d15,_0x529638=VisuMZ[_0x1438ef(0x288)][_0x1438ef(0x239)][_0x1438ef(0x236)];let _0x41acb4=this[_0x1438ef(0x19e)]()*eval(_0x529638['InitialGaugeJS']);const _0x5a9f9e=this[_0x1438ef(0xa7)]()[_0x1438ef(0xb7)](this[_0x1438ef(0x1cf)]()),_0xe14608=/<(?:CTB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0x444998=_0x5a9f9e[_0x1438ef(0x1c2)](_0x27bc92=>_0x27bc92&&_0x27bc92[_0x1438ef(0xc7)][_0x1438ef(0x1dd)](_0xe14608)?Number(RegExp['$1'])*0.01:0x0);_0x41acb4=_0x444998['reduce']((_0x7ae328,_0x5c4577)=>_0x7ae328+_0x5c4577,_0x41acb4),this['_tpbState']=_0x1438ef(0x1ea),this[_0x1438ef(0x257)]=(_0x558195?0x1:_0x41acb4)[_0x1438ef(0x29c)](0x0,0x1);if(this['isRestricted']()){if(_0x1438ef(0xf5)!==_0x1438ef(0xf5)){if(this['isTpbCharged']())return!![];if(this[_0x1438ef(0x11d)]())return!![];if(this[_0x1438ef(0x24b)]())return!![];return![];}else this['_tpbChargeTime']=0x0;}},Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0xd0)]=function(){const _0x3dc5cb=_0x5e6d15;return this[_0x3dc5cb(0x182)]===_0x3dc5cb(0x1ea);},Game_Battler['prototype']['isCtbCastingState']=function(){const _0x845206=_0x5e6d15;return this[_0x845206(0x182)]===_0x845206(0x10b)&&this[_0x845206(0x1fc)]()&&this[_0x845206(0x1fc)]()[_0x845206(0x253)]()&&this['currentAction']()[_0x845206(0x253)]()[_0x845206(0x208)]<0x0;},Game_BattlerBase[_0x5e6d15(0x178)]['getCtbCastTimeRate']=function(){const _0x4cf88c=_0x5e6d15;return this['isCtbCastingState']()?this[_0x4cf88c(0x225)]/this['tpbRequiredCastTime']():0x0;},Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x13c)]=function(){const _0x16f27b=_0x5e6d15;return!this[_0x16f27b(0x233)]();},Game_Battler[_0x5e6d15(0x178)]['setCtbAfterSpeed']=function(_0x56bb91){this['_ctbAfterSpeed']=_0x56bb91;},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x1f6)]=Game_Battler['prototype'][_0x5e6d15(0xf3)],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0xf3)]=function(){const _0xaa3fc9=_0x5e6d15;this[_0xaa3fc9(0xbd)]=BattleManager[_0xaa3fc9(0x177)](),VisuMZ['BattleSystemCTB'][_0xaa3fc9(0x1f6)]['call'](this),this[_0xaa3fc9(0xbd)]=undefined;},VisuMZ[_0x5e6d15(0x288)]['Game_Battler_clearTpbChargeTime']=Game_Battler[_0x5e6d15(0x178)]['clearTpbChargeTime'],Game_Battler['prototype'][_0x5e6d15(0x15a)]=function(){const _0x5337c7=_0x5e6d15;BattleManager[_0x5337c7(0x177)]()?this[_0x5337c7(0x25d)]():_0x5337c7(0x17b)!=='nxBfn'?VisuMZ['BattleSystemCTB'][_0x5337c7(0x1d7)][_0x5337c7(0x28f)](this):this[_0x5337c7(0x15d)]=!![];},Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x25d)]=function(){const _0x46b6c7=_0x5e6d15;if(this[_0x46b6c7(0xbd)])return;this[_0x46b6c7(0x182)]=_0x46b6c7(0x1ea),this['_tpbChargeTime']-=0x1,this[_0x46b6c7(0x257)]+=this[_0x46b6c7(0xf4)]||0x0;},VisuMZ[_0x5e6d15(0x288)]['Game_Battler_applyTpbPenalty']=Game_Battler[_0x5e6d15(0x178)]['applyTpbPenalty'],Game_Battler['prototype'][_0x5e6d15(0x299)]=function(){const _0x26d32f=_0x5e6d15;BattleManager[_0x26d32f(0x177)]()?this[_0x26d32f(0xde)]():VisuMZ[_0x26d32f(0x288)]['Game_Battler_applyTpbPenalty'][_0x26d32f(0x28f)](this);},Game_Battler['prototype'][_0x5e6d15(0xde)]=function(){const _0x2fac15=_0x5e6d15;this[_0x2fac15(0x182)]=_0x2fac15(0x1ea),this[_0x2fac15(0x257)]+=VisuMZ[_0x2fac15(0x288)][_0x2fac15(0x239)]['Mechanics'][_0x2fac15(0x1f0)]||0x0;},VisuMZ[_0x5e6d15(0x288)]['Game_Battler_tpbSpeed']=Game_Battler['prototype'][_0x5e6d15(0x1f7)],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x1f7)]=function(){const _0x1b11ec=_0x5e6d15;return BattleManager[_0x1b11ec(0x177)]()?VisuMZ[_0x1b11ec(0x288)][_0x1b11ec(0x239)][_0x1b11ec(0x236)][_0x1b11ec(0x1e8)][_0x1b11ec(0x28f)](this,this):VisuMZ['BattleSystemCTB'][_0x1b11ec(0xc5)][_0x1b11ec(0x28f)](this);},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x148)]=Game_Battler[_0x5e6d15(0x178)]['tpbBaseSpeed'],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x1fb)]=function(){const _0x40ee05=_0x5e6d15;return BattleManager[_0x40ee05(0x177)]()?VisuMZ[_0x40ee05(0x288)][_0x40ee05(0x239)]['Mechanics'][_0x40ee05(0x28c)][_0x40ee05(0x28f)](this,this):VisuMZ[_0x40ee05(0x288)]['Game_Battler_tpbBaseSpeed'][_0x40ee05(0x28f)](this);},VisuMZ[_0x5e6d15(0x288)]['Game_Battler_tpbRelativeSpeed']=Game_Battler[_0x5e6d15(0x178)]['tpbRelativeSpeed'],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x19e)]=function(){const _0x5b904a=_0x5e6d15;if(BattleManager[_0x5b904a(0x177)]()){if(_0x5b904a(0x186)!=='jCKPW')return VisuMZ[_0x5b904a(0x288)][_0x5b904a(0x239)][_0x5b904a(0x236)][_0x5b904a(0x175)]['call'](this,this);else{const _0x1cd658=this['_positionDuration'];this['x']=(this['x']*(_0x1cd658-0x1)+this[_0x5b904a(0xd8)])/_0x1cd658,this['y']=(this['y']*(_0x1cd658-0x1)+this[_0x5b904a(0x10f)])/_0x1cd658,this[_0x5b904a(0x1d4)]--;}}else return VisuMZ[_0x5b904a(0x288)][_0x5b904a(0x197)][_0x5b904a(0x28f)](this);},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x21d)]=Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x23d)],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x23d)]=function(){const _0x55d03b=_0x5e6d15;if(BattleManager[_0x55d03b(0x177)]()){if(_0x55d03b(0x168)===_0x55d03b(0x14c))this['processTurn']();else{let _0x1e9d96=VisuMZ[_0x55d03b(0x288)][_0x55d03b(0x239)][_0x55d03b(0x236)][_0x55d03b(0x22d)][_0x55d03b(0x28f)](this,this);const _0x119c3f=0x0;return _0x1e9d96+_0x119c3f;}}else return VisuMZ[_0x55d03b(0x288)][_0x55d03b(0x21d)]['call'](this);},VisuMZ['BattleSystemCTB'][_0x5e6d15(0x18d)]=Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x102)],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x102)]=function(){const _0x4df764=_0x5e6d15;return BattleManager[_0x4df764(0x177)]()?_0x4df764(0x230)!==_0x4df764(0x230)?_0x231d53[_0x4df764(0x239)][_0x4df764(0xb9)]*0x14:VisuMZ['BattleSystemCTB'][_0x4df764(0x239)][_0x4df764(0x236)][_0x4df764(0x181)][_0x4df764(0x28f)](this,this):VisuMZ[_0x4df764(0x288)]['Game_Battler_tpbRequiredCastTime'][_0x4df764(0x28f)](this);},Game_Battler[_0x5e6d15(0x178)]['getCurrentTurnOrderPositionCTB']=function(){const _0x10069e=_0x5e6d15,_0x3e5428=SceneManager['_scene']['_ctbTurnOrderWindow'];if(!_0x3e5428)return-0x1;const _0x46edd2=_0x3e5428['_turnOrderContainer'];if(!_0x46edd2)return-0x1;const _0xa98c79=_0x46edd2[_0x10069e(0x231)](_0x13d8e2=>_0x13d8e2['battler']()===this);return _0x46edd2[_0x10069e(0x174)](_0xa98c79);},Game_Battler['prototype'][_0x5e6d15(0x153)]=function(_0x3c3f96){const _0x17221c=_0x5e6d15;if(!BattleManager[_0x17221c(0x177)]())return;if(!SceneManager['isSceneBattle']())return;if(this===BattleManager[_0x17221c(0x243)]())return;if(this===BattleManager['_subject'])return;const _0x4ba529=this[_0x17221c(0x220)]();if(_0x4ba529<0x0)return;this[_0x17221c(0x21c)](_0x4ba529+_0x3c3f96);},Game_Battler[_0x5e6d15(0x178)]['setTurnOrderCTB']=function(_0xf0c903){const _0x13b658=_0x5e6d15;if(!BattleManager[_0x13b658(0x177)]())return;if(!SceneManager[_0x13b658(0x1ae)]())return;if(this===BattleManager[_0x13b658(0x243)]())return;if(this===BattleManager[_0x13b658(0x10a)])return;_0xf0c903=Math[_0x13b658(0xc1)](_0xf0c903,0x1),this['processTurnOrderChangeCTB'](_0xf0c903);},Game_Battler[_0x5e6d15(0x178)]['processTurnOrderChangeCTB']=function(_0xc618a7){const _0x50b922=_0x5e6d15;if(!BattleManager[_0x50b922(0x177)]())return;if(!SceneManager['isSceneBattle']())return;if(this===BattleManager['actor']())return;if(this===BattleManager[_0x50b922(0x10a)])return;const _0x31caba=SceneManager[_0x50b922(0x8d)]['_ctbTurnOrderWindow'];if(!_0x31caba)return;const _0x85672a=_0x31caba['_turnOrderContainer'];if(!_0x85672a)return;const _0x54237e=this[_0x50b922(0x220)]();_0x54237e!==_0xc618a7&&(_0x50b922(0x25f)===_0x50b922(0x188)?this[_0x50b922(0x1b7)]=_0x50b922(0x247):this[_0x50b922(0x1a4)](_0xc618a7-_0x54237e));let _0x2bae07=_0xc618a7,_0x250c4b=_0xc618a7;if(_0x54237e>_0xc618a7)_0x2bae07-=0x1;else{if(_0x50b922(0x240)===_0x50b922(0x170)){const _0x138c21=this[_0x50b922(0x243)]()[_0x50b922(0xc7)];if(_0x138c21[_0x50b922(0x1dd)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x4d6347(_0x402fd8['$1']);return this[_0x50b922(0x277)]();}else _0x250c4b+=0x1;}const _0x5c7ebd=_0x85672a[_0x2bae07]['ticksLeft'](!![]),_0x183a99=_0x85672a[_0x250c4b]['ticksLeft'](!![]),_0x54bdbf=(_0x5c7ebd+_0x183a99)/0x2;let _0x3f770d=_0x54bdbf*this['tpbAcceleration']();if(this[_0x50b922(0x182)]===_0x50b922(0x1ea))this['_tpbChargeTime']=0x1-_0x3f770d;else{if(this[_0x50b922(0x182)]===_0x50b922(0x10b)){if(_0x50b922(0x256)==='OTVsn'){const _0x461b66=_0x4f132c[_0x50b922(0x239)];if(!_0x461b66[_0x50b922(0x158)])return;if(this['_unit']===_0x24db68)return;const _0x568ff5=this[_0x50b922(0xf7)](),_0x224b05=this[_0x50b922(0x1c5)](),_0x379812=new _0x318b52();_0x379812[_0x50b922(0x1be)]['x']=this[_0x50b922(0x1be)]['x'],_0x379812[_0x50b922(0x1be)]['y']=this[_0x50b922(0x1be)]['y'],_0x379812[_0x50b922(0x115)]=new _0x29a472(_0x568ff5,_0x224b05),this['_letterSprite']=_0x379812,this[_0x50b922(0x13a)](this['_letterSprite']);}else this[_0x50b922(0x225)]=this[_0x50b922(0x102)]()-_0x3f770d;}}BattleManager['_actionBattlers']=[],BattleManager[_0x50b922(0x16b)]();},Game_Battler['prototype'][_0x5e6d15(0x1a4)]=function(_0x2bc705){const _0x4782f3=_0x5e6d15,_0x3dbd67=VisuMZ[_0x4782f3(0x288)][_0x4782f3(0x239)][_0x4782f3(0x189)],_0x4be7aa=_0x2bc705>0x0?_0x4782f3(0x210):_0x4782f3(0x1c7);if(_0x3dbd67[_0x4782f3(0x86)[_0x4782f3(0x1a3)](_0x4be7aa)]){if('SObjk'!=='SObjk')return this[_0x4782f3(0xc2)]();else{const _0x2746f2=_0x3dbd67[_0x4782f3(0x86)[_0x4782f3(0x1a3)](_0x4be7aa)],_0xabd5d9=_0x3dbd67[_0x4782f3(0x99)[_0x4782f3(0x1a3)](_0x4be7aa)],_0x2692a2=_0x3dbd67['%1Mute'['format'](_0x4be7aa)];$gameTemp[_0x4782f3(0x18c)]([this],_0x2746f2,_0xabd5d9,_0x2692a2);}}if(this['battler']()&&_0x3dbd67['%1PopupText'[_0x4782f3(0x1a3)](_0x4be7aa)][_0x4782f3(0x11e)]>0x0){if('sSERt'!==_0x4782f3(0x26f))_0x38c428='enemy';else{const _0x3e4b86=_0x3dbd67[_0x4782f3(0x263)['format'](_0x4be7aa)],_0xbd73ac={'textColor':ColorManager[_0x4782f3(0x12c)](_0x3dbd67[_0x4782f3(0x139)[_0x4782f3(0x1a3)](_0x4be7aa)]),'flashColor':_0x3dbd67[_0x4782f3(0x17e)[_0x4782f3(0x1a3)](_0x4be7aa)],'flashDuration':_0x3dbd67[_0x4782f3(0x237)['format'](_0x4be7aa)]};this[_0x4782f3(0xd5)](_0x3e4b86,_0xbd73ac);}}},VisuMZ[_0x5e6d15(0x288)]['Game_Battler_updateTpb']=Game_Battler['prototype'][_0x5e6d15(0xd3)],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0xd3)]=function(){const _0x1f2d35=_0x5e6d15;if(BattleManager['ctbHasInstantActionAfter'](this))return;VisuMZ[_0x1f2d35(0x288)][_0x1f2d35(0x1df)][_0x1f2d35(0x28f)](this);},BattleManager[_0x5e6d15(0xe0)]=function(_0x44d802){const _0xd96e24=_0x5e6d15;return BattleManager[_0xd96e24(0x17c)]()[_0xd96e24(0x171)](_0xe93bcd=>_0xe93bcd!==_0x44d802)[_0xd96e24(0x20f)](_0x152de7=>_0x152de7[_0xd96e24(0x1b5)]()&&_0x152de7[_0xd96e24(0x233)]()&&_0x152de7[_0xd96e24(0xf4)]>=0x1);},VisuMZ[_0x5e6d15(0x288)]['Game_Battler_updateTpbChargeTime']=Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x28d)],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x28d)]=function(){const _0x39f9ac=_0x5e6d15;if(BattleManager[_0x39f9ac(0x177)]()){if(_0x39f9ac(0x1f3)===_0x39f9ac(0x24a)){const _0x41c6ef=this[_0x39f9ac(0x1c9)]()[_0x39f9ac(0xc7)];if(_0x41c6ef[_0x39f9ac(0x1dd)](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x304191(_0x53cb77['$1']);return _0x4c7bd9[_0x39f9ac(0x239)]['EnemyBattlerIcon'];}else this['updateTpbChargeTimeCTB']();}else VisuMZ[_0x39f9ac(0x288)][_0x39f9ac(0xe2)]['call'](this);},Game_Battler['prototype']['updateTpbChargeTimeCTB']=function(){const _0x562b2f=_0x5e6d15;if(this[_0x562b2f(0x182)]===_0x562b2f(0x1ea)){if(_0x562b2f(0x224)!==_0x562b2f(0x94)){this[_0x562b2f(0x257)]+=this[_0x562b2f(0x23d)]();if(this[_0x562b2f(0x257)]>=0x1){if('epsBi'==='epsBi')this[_0x562b2f(0x1c1)]();else{if(this[_0x562b2f(0x10a)])return![];if(this[_0x562b2f(0x15f)]!=='turn')return![];if(this[_0x562b2f(0x27d)]())return![];return!![];}}}else this[_0x562b2f(0x9c)](),this['updateTurnOrderCTB']();}},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x12b)]=Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x22a)],Game_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x22a)]=function(){const _0x4c15ab=_0x5e6d15;BattleManager[_0x4c15ab(0x177)]()?this[_0x4c15ab(0x287)]():VisuMZ[_0x4c15ab(0x288)][_0x4c15ab(0x12b)][_0x4c15ab(0x28f)](this);},Game_Battler[_0x5e6d15(0x178)]['updateTpbCastTimeCTB']=function(){const _0xcc8c1c=_0x5e6d15;if(this['_tpbState']===_0xcc8c1c(0x10b)){if('FPzKI'!==_0xcc8c1c(0x25a))this[_0xcc8c1c(0x225)]+=this['tpbAcceleration'](),this[_0xcc8c1c(0x225)]>=this['tpbRequiredCastTime']()&&(this[_0xcc8c1c(0x182)]=_0xcc8c1c(0x16f));else{const _0x52d39d=_0x470ea4[_0xcc8c1c(0x288)]['createKeyJS'](this[_0xcc8c1c(0x253)](),_0xcc8c1c(0xd2));if(_0x1e6464[_0xcc8c1c(0x288)]['JS'][_0x52d39d]){const _0x497102=_0x838a87['BattleSystemCTB']['JS'][_0x52d39d]['call'](this,this[_0xcc8c1c(0x162)](),_0x970f7a);_0x863b75[_0xcc8c1c(0x280)](_0x497102);}_0x347cbf[_0xcc8c1c(0x1dd)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x47f597[_0xcc8c1c(0x280)](_0x360596(_0x309b5e['$1'])*0.01),_0x4b5c9b[_0xcc8c1c(0x1dd)](/<(?:CTB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0xbc957f[_0xcc8c1c(0x284)](_0x570b46(_0x3fa957['$1'])*0.01);}}},Game_Actor[_0x5e6d15(0x178)][_0x5e6d15(0x212)]=function(){const _0x408f09=_0x5e6d15,_0x452e0=this['actor']()[_0x408f09(0xc7)];if(_0x452e0[_0x408f09(0x1dd)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x452e0[_0x408f09(0x1dd)](/<CTB TURN ORDER ICON:[ ](\d+)>/i)){if('CeZuE'!==_0x408f09(0x1b0))_0x386db0(_0x408f09(0x1d1)[_0x408f09(0x1a3)](_0x3b3c3,_0x31dc71,_0x40b0c7)),_0x4a730c[_0x408f09(0x13b)]();else return _0x408f09(0x1a5);}}return Window_CTB_TurnOrder['Settings']['ActorBattlerType'];},Game_Actor['prototype'][_0x5e6d15(0x1eb)]=function(){const _0xd77020=_0x5e6d15,_0x1890b5=this[_0xd77020(0x243)]()['note'];if(_0x1890b5[_0xd77020(0x1dd)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0xd77020(0x277)]();},Game_Actor[_0x5e6d15(0x178)][_0x5e6d15(0x1ee)]=function(){const _0x3c63d0=_0x5e6d15,_0x222914=this[_0x3c63d0(0x243)]()['note'];if(_0x222914['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor['prototype'][_0x5e6d15(0x1ed)]=function(){const _0x437b00=_0x5e6d15,_0x66ede3=this[_0x437b00(0x243)]()[_0x437b00(0xc7)];if(_0x66ede3['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x437b00(0xbb)!==_0x437b00(0xbb)?_0x496b2c['x']-_0x3a56a6['x']:Number(RegExp['$1']);return Window_CTB_TurnOrder[_0x437b00(0x239)][_0x437b00(0xaf)];},Game_Enemy[_0x5e6d15(0x178)][_0x5e6d15(0x212)]=function(){const _0x55fc16=_0x5e6d15,_0x50dbb8=this[_0x55fc16(0x1c9)]()[_0x55fc16(0xc7)];if(_0x50dbb8[_0x55fc16(0x1dd)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('MuRZt'===_0x55fc16(0x241))_0x4832ed[_0x55fc16(0x288)]['Game_Action_applyItemUserEffect'][_0x55fc16(0x28f)](this,_0x6615a1),this['applyBattleSystemCTBUserEffect'](_0x52aef5);else return _0x55fc16(0x247);}else{if(_0x50dbb8['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return _0x55fc16(0x1a5);}return Window_CTB_TurnOrder[_0x55fc16(0x239)][_0x55fc16(0x8c)];},Game_Enemy[_0x5e6d15(0x178)]['createTurnOrderCTBGraphicFaceName']=function(){const _0x3baaf9=_0x5e6d15,_0x10388c=this[_0x3baaf9(0x1c9)]()[_0x3baaf9(0xc7)];if(_0x10388c[_0x3baaf9(0x1dd)](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x3baaf9(0x9a)==='NWzxW')_0x336e60['drawText'](this[_0x3baaf9(0x10c)]['trim'](),0x0,0x2,_0x2e01ce-0x8,_0x42fa69-0x4,_0x3baaf9(0xb2));else return String(RegExp['$1']);}return Window_CTB_TurnOrder[_0x3baaf9(0x239)]['EnemyBattlerFaceName'];},Game_Enemy[_0x5e6d15(0x178)][_0x5e6d15(0xa1)]=function(){const _0x237dc1=_0x5e6d15,_0x28ee6c=this[_0x237dc1(0x1c9)]()[_0x237dc1(0xc7)];if(_0x28ee6c['match'](/<CTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_CTB_TurnOrder[_0x237dc1(0x239)][_0x237dc1(0x1ff)];},Game_Enemy[_0x5e6d15(0x178)][_0x5e6d15(0x1ed)]=function(){const _0x494cc4=_0x5e6d15,_0x5eef5c=this[_0x494cc4(0x1c9)]()[_0x494cc4(0xc7)];if(_0x5eef5c['match'](/<CTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_CTB_TurnOrder['Settings'][_0x494cc4(0xb5)];},VisuMZ['BattleSystemCTB'][_0x5e6d15(0x112)]=Scene_Battle[_0x5e6d15(0x178)][_0x5e6d15(0x1e0)],Scene_Battle[_0x5e6d15(0x178)][_0x5e6d15(0x1e0)]=function(){const _0x80cb9f=_0x5e6d15;VisuMZ['BattleSystemCTB'][_0x80cb9f(0x112)][_0x80cb9f(0x28f)](this),this[_0x80cb9f(0x1e1)]();},Scene_Battle[_0x5e6d15(0x178)]['createCTBTurnOrderWindow']=function(){const _0x54fa12=_0x5e6d15;if(!BattleManager[_0x54fa12(0x177)]())return;this[_0x54fa12(0xae)]=new Window_CTB_TurnOrder();const _0x1cb7fc=this[_0x54fa12(0x269)](this['_windowLayer']);this[_0x54fa12(0x128)](this['_ctbTurnOrderWindow'],_0x1cb7fc),this[_0x54fa12(0x12f)](),BattleManager[_0x54fa12(0x16b)](!![]);},Scene_Battle[_0x5e6d15(0x178)][_0x5e6d15(0x12f)]=function(){const _0xd9166a=_0x5e6d15,_0x3024af=Window_CTB_TurnOrder[_0xd9166a(0x239)];if(_0x3024af['DisplayPosition']!=='top')return;if(!_0x3024af[_0xd9166a(0x1ba)])return;if(!this[_0xd9166a(0x1b1)])return;const _0x59402f=this['_ctbTurnOrderWindow']['y']-Math[_0xd9166a(0x124)]((Graphics[_0xd9166a(0x235)]-Graphics['boxHeight'])/0x2),_0x2897ce=_0x59402f+this['_ctbTurnOrderWindow']['height'];this[_0xd9166a(0x1b1)]['y']=_0x2897ce+_0x3024af[_0xd9166a(0x1cb)];};function Sprite_CTB_TurnOrder_Battler(){const _0x23b584=_0x5e6d15;this[_0x23b584(0x203)](...arguments);}function _0x2b1e(_0x296ce1,_0x4764b5){const _0x3a0dd=_0x3a0d();return _0x2b1e=function(_0x2b1ea2,_0x4de132){_0x2b1ea2=_0x2b1ea2-0x82;let _0x5bd942=_0x3a0dd[_0x2b1ea2];return _0x5bd942;},_0x2b1e(_0x296ce1,_0x4764b5);}Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)]=Object[_0x5e6d15(0x279)](Sprite_Clickable[_0x5e6d15(0x178)]),Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0xd6)]=Sprite_CTB_TurnOrder_Battler,Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x203)]=function(_0x4d01fe,_0x112b5d,_0x17acd0){const _0x1f2591=_0x5e6d15;this['initMembers'](_0x4d01fe,_0x112b5d,_0x17acd0),Sprite_Clickable['prototype'][_0x1f2591(0x203)]['call'](this),this['createChildren']();},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x264)]=function(_0x5314f5,_0x533fa6,_0x240d44){const _0x1b698e=_0x5e6d15;this[_0x1b698e(0x1f8)]=_0x5314f5,this[_0x1b698e(0x8e)]=_0x533fa6,this['_dupe']=_0x240d44;const _0x10d0ce=Window_CTB_TurnOrder['Settings'],_0x484355=this[_0x1b698e(0x107)](),_0xeb08c7=this[_0x1b698e(0x14f)]();this[_0x1b698e(0x1d4)]=0x0,this['_positionTargetX']=_0x484355?_0x10d0ce[_0x1b698e(0x93)]*_0xeb08c7:0x0,this[_0x1b698e(0x10f)]=_0x484355?0x0:_0x10d0ce[_0x1b698e(0x93)]*_0xeb08c7,this[_0x1b698e(0x14d)]=0x0,this['_fadeTarget']=0xff,this['_isAlive']=!![],this[_0x1b698e(0x1b2)]=!![];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0xac)]=function(){const _0x538e35=_0x5e6d15;this['createInitialPositions'](),this['createBackgroundSprite'](),this[_0x538e35(0x1c0)](),this[_0x538e35(0xb3)](),this[_0x538e35(0x122)]();},Sprite_CTB_TurnOrder_Battler['prototype']['createInitialPositions']=function(){const _0x4fdfe8=_0x5e6d15;this['x']=this[_0x4fdfe8(0xd8)],this['y']=this[_0x4fdfe8(0x10f)];},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x107)]=function(){const _0x16700d=_0x5e6d15,_0x55b594=Window_CTB_TurnOrder[_0x16700d(0x239)],_0x2ffc9d=[_0x16700d(0x129),_0x16700d(0x187)][_0x16700d(0x20c)](_0x55b594[_0x16700d(0x104)]);return _0x2ffc9d;},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0xf7)]=function(){const _0x130c5c=_0x5e6d15,_0x164a96=Window_CTB_TurnOrder[_0x130c5c(0x239)];return this[_0x130c5c(0x107)]()?_0x164a96[_0x130c5c(0x93)]:_0x164a96[_0x130c5c(0x111)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0x1c5)]=function(){const _0x11575c=_0x5e6d15,_0x53e4dc=Window_CTB_TurnOrder['Settings'];return this[_0x11575c(0x107)]()?_0x53e4dc[_0x11575c(0x111)]:_0x53e4dc[_0x11575c(0x93)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0x152)]=function(){const _0x244124=_0x5e6d15;this[_0x244124(0x115)]=new Bitmap(0x48,0x24);const _0x1fedc2=this[_0x244124(0xc2)]()?this[_0x244124(0xc2)]()[_0x244124(0x29b)]():_0x244124(0xd4)['format'](this['_unit'],this['_index'],this[_0x244124(0x278)]);this[_0x244124(0x115)][_0x244124(0xf6)](_0x1fedc2,0x0,0x0,0x48,0x24,_0x244124(0xe7));},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x213)]=function(){const _0x2c61ad=_0x5e6d15;if(!Window_CTB_TurnOrder[_0x2c61ad(0x239)]['ShowMarkerBg'])return;const _0x21bce8=Window_CTB_TurnOrder[_0x2c61ad(0x239)],_0x480582=this[_0x2c61ad(0x1f8)]===$gameParty?_0x2c61ad(0x283):_0x2c61ad(0x1f9),_0x12e39b=_0x2c61ad(0x15b)['format'](_0x480582),_0x28994a=new Sprite();_0x28994a['anchor']['x']=this['anchor']['x'],_0x28994a[_0x2c61ad(0x1be)]['y']=this[_0x2c61ad(0x1be)]['y'];if(_0x21bce8[_0x12e39b])'FYrXh'!==_0x2c61ad(0x1c6)?_0x28994a[_0x2c61ad(0x115)]=ImageManager[_0x2c61ad(0x17d)](_0x21bce8[_0x12e39b]):_0x42b5f6+=0x1;else{const _0x1a5c92=this['bitmapWidth'](),_0x237efa=this[_0x2c61ad(0x1c5)]();_0x28994a['bitmap']=new Bitmap(_0x1a5c92,_0x237efa);const _0x33adfd=ColorManager[_0x2c61ad(0x12c)](_0x21bce8[_0x2c61ad(0xc4)[_0x2c61ad(0x1a3)](_0x480582)]),_0x4beeb7=ColorManager['getColor'](_0x21bce8[_0x2c61ad(0x84)[_0x2c61ad(0x1a3)](_0x480582)]);_0x28994a[_0x2c61ad(0x115)][_0x2c61ad(0x13d)](0x0,0x0,_0x1a5c92,_0x237efa,_0x33adfd,_0x4beeb7,!![]);}this[_0x2c61ad(0x292)]=_0x28994a,this[_0x2c61ad(0x13a)](this[_0x2c61ad(0x292)]),this[_0x2c61ad(0x215)]=this['_backgroundSprite'][_0x2c61ad(0x215)],this[_0x2c61ad(0x235)]=this['_backgroundSprite'][_0x2c61ad(0x235)];},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x1c0)]=function(){const _0x1d4340=_0x5e6d15,_0x3d63f=new Sprite();_0x3d63f['anchor']['x']=this[_0x1d4340(0x1be)]['x'],_0x3d63f[_0x1d4340(0x1be)]['y']=this[_0x1d4340(0x1be)]['y'],this[_0x1d4340(0xe6)]=_0x3d63f,this[_0x1d4340(0x13a)](this[_0x1d4340(0xe6)]),this[_0x1d4340(0x276)]();},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)]['createBorderSprite']=function(){const _0xf56bbf=_0x5e6d15;if(!Window_CTB_TurnOrder['Settings'][_0xf56bbf(0x28a)])return;const _0x4ec02b=Window_CTB_TurnOrder[_0xf56bbf(0x239)],_0x30b8b9=this[_0xf56bbf(0x1f8)]===$gameParty?'Actor':_0xf56bbf(0x1f9),_0x3c616a='%1SystemBorder'[_0xf56bbf(0x1a3)](_0x30b8b9),_0x318024=new Sprite();_0x318024['anchor']['x']=this['anchor']['x'],_0x318024[_0xf56bbf(0x1be)]['y']=this['anchor']['y'];if(_0x4ec02b[_0x3c616a]){if(_0xf56bbf(0x252)===_0xf56bbf(0x290))return this[_0xf56bbf(0xe1)]===_0x14c5fb&&(this['_ctbTurnOrderFaceIndex']=this[_0xf56bbf(0xa1)]()),this['_ctbTurnOrderFaceIndex'];else _0x318024[_0xf56bbf(0x115)]=ImageManager['loadSystem'](_0x4ec02b[_0x3c616a]);}else{if(_0xf56bbf(0xb4)==='WTbEe')return this[_0xf56bbf(0x276)]();else{let _0x241e32=this[_0xf56bbf(0xf7)](),_0x3bfa38=this['bitmapHeight'](),_0x37f90c=_0x4ec02b[_0xf56bbf(0xd9)];_0x318024[_0xf56bbf(0x115)]=new Bitmap(_0x241e32,_0x3bfa38);const _0xe04968=_0xf56bbf(0x27f),_0x44601c=ColorManager[_0xf56bbf(0x12c)](_0x4ec02b['%1BorderColor'[_0xf56bbf(0x1a3)](_0x30b8b9)]);_0x318024[_0xf56bbf(0x115)][_0xf56bbf(0x260)](0x0,0x0,_0x241e32,_0x3bfa38,_0xe04968),_0x241e32-=0x2,_0x3bfa38-=0x2,_0x318024['bitmap'][_0xf56bbf(0x260)](0x1,0x1,_0x241e32,_0x3bfa38,_0x44601c),_0x241e32-=_0x37f90c*0x2,_0x3bfa38-=_0x37f90c*0x2,_0x318024[_0xf56bbf(0x115)][_0xf56bbf(0x260)](0x1+_0x37f90c,0x1+_0x37f90c,_0x241e32,_0x3bfa38,_0xe04968),_0x241e32-=0x2,_0x3bfa38-=0x2,_0x37f90c+=0x1,_0x318024[_0xf56bbf(0x115)][_0xf56bbf(0xa6)](0x1+_0x37f90c,0x1+_0x37f90c,_0x241e32,_0x3bfa38);}}this['_backgroundSprite']=_0x318024,this[_0xf56bbf(0x13a)](this[_0xf56bbf(0x292)]);},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x122)]=function(){const _0x12c3cc=_0x5e6d15,_0x520034=Window_CTB_TurnOrder[_0x12c3cc(0x239)];if(!_0x520034[_0x12c3cc(0x158)])return;if(this[_0x12c3cc(0x1f8)]===$gameParty)return;const _0x127817=this[_0x12c3cc(0xf7)](),_0x140265=this[_0x12c3cc(0x1c5)](),_0x10391=new Sprite();_0x10391[_0x12c3cc(0x1be)]['x']=this['anchor']['x'],_0x10391[_0x12c3cc(0x1be)]['y']=this[_0x12c3cc(0x1be)]['y'],_0x10391[_0x12c3cc(0x115)]=new Bitmap(_0x127817,_0x140265),this[_0x12c3cc(0x1db)]=_0x10391,this[_0x12c3cc(0x13a)](this['_letterSprite']);},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0xc2)]=function(){const _0x37a172=_0x5e6d15;return this[_0x37a172(0x1f8)]?this['_unit'][_0x37a172(0x1d3)]()[this[_0x37a172(0x8e)]]:null;},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)]['ticksLeft']=function(_0x95870){const _0xa45471=_0x5e6d15,_0x34936b=this[_0xa45471(0xc2)]();if(!_0x34936b)return Number[_0xa45471(0x251)];const _0x3a5de3=0x1*(this['_dupe']+0x1);return _0x34936b['ctbTicksToGoal'](_0x3a5de3,_0x95870);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0x151)]=function(){const _0x49e110=_0x5e6d15;Sprite_Clickable['prototype']['update'][_0x49e110(0x28f)](this),this[_0x49e110(0x184)](),this['updatePosition'](),this[_0x49e110(0x1f1)](),this[_0x49e110(0x28b)](),this[_0x49e110(0x121)](),this[_0x49e110(0x108)](),this['updateLetter'](),this['updateSelectionEffect']();},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x184)]=function(){const _0x30c21d=_0x5e6d15,_0x19ae87=this['containerPosition']();if(this[_0x30c21d(0x147)]===_0x19ae87)return;this[_0x30c21d(0x147)]=_0x19ae87;const _0xc800=Window_CTB_TurnOrder['Settings'],_0x1ec641=this[_0x30c21d(0x107)](),_0x1ce100=_0xc800[_0x30c21d(0x85)],_0x747073=_0xc800['SubjectDistance'],_0x5a2d11=SceneManager[_0x30c21d(0x8d)][_0x30c21d(0xae)];if(!_0x5a2d11)return;this[_0x30c21d(0x1d4)]=_0xc800[_0x30c21d(0x29d)],this['_positionTargetX']=_0x1ec641?_0xc800[_0x30c21d(0x93)]*_0x19ae87:0x0,this[_0x30c21d(0x10f)]=_0x1ec641?0x0:_0xc800['SpriteThin']*_0x19ae87,_0x19ae87>0x0&&(_0x30c21d(0x194)===_0x30c21d(0x194)?(this[_0x30c21d(0xd8)]+=_0x1ec641?_0x747073:0x0,this[_0x30c21d(0x10f)]+=_0x1ec641?0x0:_0x747073):this['onCtbOrderChange'](_0x553553-_0x32b97d)),_0x1ce100?this['_positionTargetX']=_0x1ec641?_0x5a2d11['width']-this['_positionTargetX']-_0xc800[_0x30c21d(0x93)]:0x0:this[_0x30c21d(0x10f)]=_0x1ec641?0x0:_0x5a2d11[_0x30c21d(0x235)]-this[_0x30c21d(0x10f)]-_0xc800[_0x30c21d(0x93)];},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0x118)]=function(){const _0x57e041=_0x5e6d15;if(this[_0x57e041(0x14d)]>0x0)return;if(this[_0x57e041(0x1d4)]>0x0){if('WWhkV'!==_0x57e041(0x14b)){const _0x351adc=this['_positionDuration'];this['x']=(this['x']*(_0x351adc-0x1)+this[_0x57e041(0xd8)])/_0x351adc,this['y']=(this['y']*(_0x351adc-0x1)+this['_positionTargetY'])/_0x351adc,this[_0x57e041(0x1d4)]--;}else this['_isBattleOver']=!![],this[_0x57e041(0x28e)](0x0);}if(this[_0x57e041(0x1d4)]<=0x0&&this[_0x57e041(0xed)]){if(_0x57e041(0x23c)===_0x57e041(0x23c)){this['x']=this[_0x57e041(0xd8)],this['y']=this['_positionTargetY'];if(this[_0x57e041(0x1a7)]<=0x0&&!this[_0x57e041(0x242)]){if(_0x57e041(0xec)===_0x57e041(0x1bd))return this['_ctbTurnOrderGraphicType']===_0x1ea9f5&&(this[_0x57e041(0x1f2)]=this[_0x57e041(0x212)]()),this[_0x57e041(0x1f2)];else this['startFade'](0xff);}}else _0x271b54[_0x57e041(0x1a9)](_0xed41e2(_0x50e1db['$1'])*0.01);}},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x14f)]=function(){const _0x1f2675=_0x5e6d15;return Window_CTB_TurnOrder[_0x1f2675(0x239)]['TotalHorzSprites']*0x14;},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0xfa)]=function(){const _0x323eed=_0x5e6d15;return SceneManager[_0x323eed(0x8d)][_0x323eed(0xae)];},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x114)]=function(){const _0x5d4851=_0x5e6d15;if(!this[_0x5d4851(0xfa)]())return this[_0x5d4851(0x14f)]();const _0x14b0a3=this['containerWindow']()[_0x5d4851(0x286)];return _0x14b0a3[_0x5d4851(0x174)](this);},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0xf2)]=function(){const _0x149244=_0x5e6d15,_0x3f9e8d=Window_CTB_TurnOrder[_0x149244(0x239)],_0x4ed84d=this[_0x149244(0x107)](),_0x33950c=_0x4ed84d?_0x3f9e8d['TotalHorzSprites']:_0x3f9e8d[_0x149244(0x1af)];this[_0x149244(0x278)]-=0x1,this[_0x149244(0x278)]<0x0&&('ZDFFN'!==_0x149244(0x23e)?this[_0x149244(0x1c3)]=0x0:(this[_0x149244(0x278)]=_0x33950c-0x1,this[_0x149244(0x28e)](0x0)));},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x28e)]=function(_0x22d9f6){const _0x33cfd2=_0x5e6d15,_0x2862d7=Window_CTB_TurnOrder[_0x33cfd2(0x239)];this[_0x33cfd2(0x14d)]=_0x2862d7['UpdateFrames'],this[_0x33cfd2(0x24e)]=_0x22d9f6;},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x1f1)]=function(){const _0x5b1aca=_0x5e6d15,_0x57c2bc=this[_0x5b1aca(0xc2)]();if(!_0x57c2bc)return;if(this[_0x5b1aca(0xed)]===_0x57c2bc[_0x5b1aca(0x1b5)]()&&this[_0x5b1aca(0x1b2)]===_0x57c2bc[_0x5b1aca(0xb6)]())return;this[_0x5b1aca(0xed)]=_0x57c2bc[_0x5b1aca(0x1b5)](),this[_0x5b1aca(0x1b2)]=_0x57c2bc['isAppeared']();let _0x53b324=this[_0x5b1aca(0xed)]&&this[_0x5b1aca(0x1b2)]?0xff:0x0;this[_0x5b1aca(0x28e)](_0x53b324);},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x28b)]=function(){const _0xcb65a1=_0x5e6d15;if(this['_fadeDuration']>0x0){const _0x1d1c9b=this[_0xcb65a1(0x14d)];this[_0xcb65a1(0x1a7)]=(this['opacity']*(_0x1d1c9b-0x1)+this[_0xcb65a1(0x24e)])/_0x1d1c9b,this['_fadeDuration']--,this[_0xcb65a1(0x14d)]<=0x0&&(this[_0xcb65a1(0x184)](),this['_positionDuration']=0x0,this[_0xcb65a1(0x118)](),this[_0xcb65a1(0x1a7)]=this[_0xcb65a1(0x24e)]);}if(this['_isBattleOver'])return;BattleManager['_phase']===_0xcb65a1(0x20d)&&(this[_0xcb65a1(0x242)]=!![],this[_0xcb65a1(0x28e)](0x0));},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x121)]=function(){const _0x476892=_0x5e6d15,_0x1afa4c=this[_0x476892(0xc2)]();if(!_0x1afa4c)return;const _0x2d3f71=Window_CTB_TurnOrder[_0x476892(0x239)],_0x312da8=this['_unit']===$gameParty?'Actor':'Enemy';let _0xf95aa9=_0x1afa4c[_0x476892(0xbc)]();if(_0x1afa4c[_0x476892(0xc6)]()&&_0xf95aa9===_0x476892(0x1c9)){if(_0x476892(0x207)!==_0x476892(0x207))return _0x1962fd[_0x476892(0x8d)][_0x476892(0xae)];else _0xf95aa9=_0x476892(0x247);}else _0x1afa4c[_0x476892(0x24f)]()&&_0xf95aa9===_0x476892(0x20a)&&(_0xf95aa9=_0x476892(0x1c9));if(this['_graphicType']!==_0xf95aa9){if(_0x476892(0x281)!==_0x476892(0x281))_0x3889c3[_0x476892(0x288)][_0x476892(0x130)][_0x476892(0x28f)](this),this[_0x476892(0xf8)]();else return this[_0x476892(0x276)]();}switch(this[_0x476892(0x1b7)]){case _0x476892(0x247):if(this[_0x476892(0x172)]!==_0x1afa4c['TurnOrderCTBGraphicFaceName']())return this['processUpdateGraphic']();if(this['_graphicFaceIndex']!==_0x1afa4c[_0x476892(0x1ee)]())return this['processUpdateGraphic']();break;case _0x476892(0x1a5):if(this['_graphicIconIndex']!==_0x1afa4c['TurnOrderCTBGraphicIconIndex']())return this[_0x476892(0x276)]();break;case'enemy':if(_0x1afa4c[_0x476892(0xdb)]()){if(this[_0x476892(0x22b)]!==_0x1afa4c[_0x476892(0x273)]())return this['processUpdateGraphic']();}else{if(this[_0x476892(0x125)]!==_0x1afa4c[_0x476892(0xab)]())return this[_0x476892(0x276)]();}break;case'svactor':if(_0x1afa4c[_0x476892(0xc6)]()){if(_0x476892(0x271)!==_0x476892(0x271))this[_0x476892(0x15e)]();else{if(this[_0x476892(0x22b)]!==_0x1afa4c['battlerName']()){if(_0x476892(0x1d0)===_0x476892(0x1d0))return this[_0x476892(0x276)]();else this[_0x476892(0x1c3)]=this[_0x476892(0x1c3)]||0x0,this['_anti_CTB_SoftlockCount']++,this[_0x476892(0x1c3)]>=_0x5595c8&&this[_0x476892(0x27c)]();}}}else{if(this[_0x476892(0x125)]!==_0x1afa4c[_0x476892(0xab)]())return this[_0x476892(0x276)]();}break;}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0x276)]=function(){const _0x48324e=_0x5e6d15,_0xf52223=this[_0x48324e(0xc2)]();if(!_0xf52223)return;this[_0x48324e(0x1b7)]=_0xf52223[_0x48324e(0xbc)]();if(_0xf52223['isActor']()&&this[_0x48324e(0x1b7)]==='enemy')this['_graphicType']=_0x48324e(0x247);else{if(_0xf52223[_0x48324e(0x24f)]()&&this['_graphicType']===_0x48324e(0x20a)){if(_0x48324e(0x272)!==_0x48324e(0x238))this[_0x48324e(0x1b7)]=_0x48324e(0x1c9);else for(let _0x401009=0x0;_0x401009<_0x540046;_0x401009++){const _0x3623d3=new _0x44c947(_0x2eb528,_0x2e6efa,_0x401009);this['_turnOrderInnerSprite'][_0x48324e(0x13a)](_0x3623d3),this[_0x48324e(0x286)][_0x48324e(0x262)](_0x3623d3);}}}let _0xe79e30;switch(this[_0x48324e(0x1b7)]){case'face':this[_0x48324e(0x172)]=_0xf52223[_0x48324e(0x1eb)](),this[_0x48324e(0x1ca)]=_0xf52223[_0x48324e(0x1ee)](),_0xe79e30=ImageManager[_0x48324e(0x1ef)](this[_0x48324e(0x172)]),_0xe79e30[_0x48324e(0x164)](this['changeFaceGraphicBitmap'][_0x48324e(0x27a)](this,_0xe79e30));break;case _0x48324e(0x1a5):this[_0x48324e(0x144)]=_0xf52223['createTurnOrderCTBGraphicIconIndex'](),_0xe79e30=ImageManager[_0x48324e(0x17d)](_0x48324e(0x135)),_0xe79e30[_0x48324e(0x164)](this['changeIconGraphicBitmap'][_0x48324e(0x27a)](this,_0xe79e30));break;case'enemy':if(_0xf52223[_0x48324e(0xdb)]())this[_0x48324e(0x22b)]=_0xf52223['svBattlerName'](),_0xe79e30=ImageManager[_0x48324e(0x291)](this['_graphicSv']),_0xe79e30[_0x48324e(0x164)](this['changeSvActorGraphicBitmap'][_0x48324e(0x27a)](this,_0xe79e30));else $gameSystem[_0x48324e(0x1ad)]()?(this['_graphicEnemy']=_0xf52223[_0x48324e(0xab)](),_0xe79e30=ImageManager[_0x48324e(0x82)](this[_0x48324e(0x125)]),_0xe79e30[_0x48324e(0x164)](this[_0x48324e(0x11f)][_0x48324e(0x27a)](this,_0xe79e30))):_0x48324e(0x209)===_0x48324e(0x209)?(this[_0x48324e(0x125)]=_0xf52223[_0x48324e(0xab)](),_0xe79e30=ImageManager['loadEnemy'](this[_0x48324e(0x125)]),_0xe79e30['addLoadListener'](this[_0x48324e(0x11f)]['bind'](this,_0xe79e30))):(delete this[_0x48324e(0x1f2)],delete this[_0x48324e(0x202)],delete this['_ctbTurnOrderFaceIndex'],delete this[_0x48324e(0x16e)]);break;case _0x48324e(0x20a):this[_0x48324e(0x22b)]=_0xf52223[_0x48324e(0xab)](),_0xe79e30=ImageManager[_0x48324e(0x291)](this[_0x48324e(0x22b)]),_0xe79e30[_0x48324e(0x164)](this[_0x48324e(0x156)][_0x48324e(0x27a)](this,_0xe79e30));break;}},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0x1ac)]=function(_0x4f50e6){const _0x5a67b8=_0x5e6d15,_0xd6459c=this[_0x5a67b8(0x1ca)],_0x1d63e8=this[_0x5a67b8(0xf7)](),_0x266f77=this[_0x5a67b8(0x1c5)](),_0x4838d4=Math[_0x5a67b8(0xc1)](_0x1d63e8,_0x266f77);this['_graphicSprite']['bitmap']=new Bitmap(_0x1d63e8,_0x266f77);const _0xeb4743=this[_0x5a67b8(0xe6)][_0x5a67b8(0x115)],_0x4c7e74=ImageManager[_0x5a67b8(0x1a6)],_0x341100=ImageManager[_0x5a67b8(0xca)],_0xefc97c=_0x4838d4/Math['max'](_0x4c7e74,_0x341100),_0x295dd9=ImageManager['faceWidth'],_0x548417=ImageManager[_0x5a67b8(0xca)],_0x328f3a=_0xd6459c%0x4*_0x4c7e74+(_0x4c7e74-_0x295dd9)/0x2,_0x489e4c=Math[_0x5a67b8(0x123)](_0xd6459c/0x4)*_0x341100+(_0x341100-_0x548417)/0x2,_0x21a4dc=(_0x1d63e8-_0x4c7e74*_0xefc97c)/0x2,_0x512dc2=(_0x266f77-_0x341100*_0xefc97c)/0x2;_0xeb4743[_0x5a67b8(0xcd)](_0x4f50e6,_0x328f3a,_0x489e4c,_0x295dd9,_0x548417,_0x21a4dc,_0x512dc2,_0x4838d4,_0x4838d4);},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x1e4)]=function(_0x5bf71d){const _0x483f9a=_0x5e6d15,_0x2c8a89=this[_0x483f9a(0x144)],_0x3f538e=this['bitmapWidth'](),_0x88f89b=this[_0x483f9a(0x1c5)]();this['_graphicSprite'][_0x483f9a(0x115)]=new Bitmap(_0x3f538e,_0x88f89b);const _0x362e48=this[_0x483f9a(0xe6)][_0x483f9a(0x115)],_0x357e2a=ImageManager[_0x483f9a(0x217)],_0x407eb0=ImageManager[_0x483f9a(0x13e)],_0x1b7831=Math[_0x483f9a(0x18e)](_0x357e2a,_0x407eb0,_0x3f538e,_0x88f89b),_0x1eb2a4=_0x2c8a89%0x10*_0x357e2a,_0x384f25=Math[_0x483f9a(0x123)](_0x2c8a89/0x10)*_0x407eb0,_0x462db8=Math[_0x483f9a(0x123)](Math[_0x483f9a(0xc1)](_0x3f538e-_0x1b7831,0x0)/0x2),_0x5b3edd=Math[_0x483f9a(0x123)](Math[_0x483f9a(0xc1)](_0x88f89b-_0x1b7831,0x0)/0x2);_0x362e48[_0x483f9a(0xcd)](_0x5bf71d,_0x1eb2a4,_0x384f25,_0x357e2a,_0x407eb0,_0x462db8,_0x5b3edd,_0x1b7831,_0x1b7831);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0x156)]=function(_0x4f6dfa){const _0x527a99=_0x5e6d15,_0xfe088c=this[_0x527a99(0xf7)](),_0x2722c0=this[_0x527a99(0x1c5)](),_0x1f6af3=Math['min'](_0xfe088c,_0x2722c0);this[_0x527a99(0xe6)][_0x527a99(0x115)]=new Bitmap(_0xfe088c,_0x2722c0);const _0x63604f=this[_0x527a99(0xe6)][_0x527a99(0x115)],_0x46820e=this[_0x527a99(0x22b)]['match'](/\$/i),_0x255573=_0x46820e?0x1:ImageManager[_0x527a99(0x165)],_0x21db86=_0x46820e?0x1:ImageManager[_0x527a99(0x294)],_0x317d34=_0x4f6dfa[_0x527a99(0x215)]/_0x255573,_0x4043ed=_0x4f6dfa['height']/_0x21db86,_0x3c07d4=Math[_0x527a99(0x18e)](0x1,_0x1f6af3/_0x317d34,_0x1f6af3/_0x4043ed),_0x6cb5ab=_0x317d34*_0x3c07d4,_0x38e509=_0x4043ed*_0x3c07d4,_0x2383c4=Math['round']((_0xfe088c-_0x6cb5ab)/0x2),_0x3f3606=Math[_0x527a99(0x124)]((_0x2722c0-_0x38e509)/0x2);_0x63604f[_0x527a99(0xcd)](_0x4f6dfa,0x0,0x0,_0x317d34,_0x4043ed,_0x2383c4,_0x3f3606,_0x6cb5ab,_0x38e509);},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)]['changeEnemyGraphicBitmap']=function(_0x303e40){const _0x49b219=_0x5e6d15,_0x5dd379=Window_CTB_TurnOrder[_0x49b219(0x239)],_0x2a0c62=this[_0x49b219(0xf7)](),_0x8881db=this['bitmapHeight'](),_0x55fd01=Math[_0x49b219(0x18e)](_0x2a0c62,_0x8881db);this[_0x49b219(0xe6)][_0x49b219(0x115)]=new Bitmap(_0x2a0c62,_0x8881db);const _0x5360ff=this['_graphicSprite'][_0x49b219(0x115)],_0x5c5d75=Math[_0x49b219(0x18e)](0x1,_0x55fd01/_0x303e40[_0x49b219(0x215)],_0x55fd01/_0x303e40[_0x49b219(0x235)]),_0x50c59c=_0x303e40['width']*_0x5c5d75,_0x58d37b=_0x303e40[_0x49b219(0x235)]*_0x5c5d75,_0x1e465e=Math[_0x49b219(0x124)]((_0x2a0c62-_0x50c59c)/0x2),_0x281ec7=Math['round']((_0x8881db-_0x58d37b)/0x2);_0x5360ff[_0x49b219(0xcd)](_0x303e40,0x0,0x0,_0x303e40[_0x49b219(0x215)],_0x303e40[_0x49b219(0x235)],_0x1e465e,_0x281ec7,_0x50c59c,_0x58d37b);},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)]['updateGraphicHue']=function(){const _0x1cad64=_0x5e6d15,_0x2f13e5=this['battler']();if(!_0x2f13e5)return;if(!_0x2f13e5['isEnemy']())return;if(this[_0x1cad64(0x1a2)]===_0x2f13e5[_0x1cad64(0xcb)]())return;this[_0x1cad64(0x1a2)]=_0x2f13e5['battlerHue']();if(_0x2f13e5[_0x1cad64(0xdb)]())this[_0x1cad64(0x1a2)]=0x0;this[_0x1cad64(0xe6)]['setHue'](this[_0x1cad64(0x1a2)]);},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x11c)]=function(){const _0x5f091d=_0x5e6d15;if(!this[_0x5f091d(0x1db)])return;const _0x1e45d2=this['battler']();if(!_0x1e45d2)return;if(this[_0x5f091d(0x10c)]===_0x1e45d2[_0x5f091d(0x10c)]&&this[_0x5f091d(0x1e6)]===_0x1e45d2['_plural'])return;this[_0x5f091d(0x10c)]=_0x1e45d2[_0x5f091d(0x10c)],this[_0x5f091d(0x1e6)]=_0x1e45d2[_0x5f091d(0x1e6)];const _0x1a41a0=Window_CTB_TurnOrder[_0x5f091d(0x239)],_0x394b30=this[_0x5f091d(0x107)](),_0x169645=this[_0x5f091d(0xf7)](),_0x47423c=this[_0x5f091d(0x1c5)](),_0x5be285=this[_0x5f091d(0x1db)][_0x5f091d(0x115)];_0x5be285[_0x5f091d(0x136)]();if(!this[_0x5f091d(0x1e6)])return;_0x5be285[_0x5f091d(0xf9)]=_0x1a41a0[_0x5f091d(0x105)]||$gameSystem[_0x5f091d(0x191)](),_0x5be285[_0x5f091d(0x226)]=_0x1a41a0[_0x5f091d(0x19c)]||0x10,_0x394b30?_0x5be285[_0x5f091d(0xf6)](this[_0x5f091d(0x10c)]['trim'](),0x0,_0x47423c/0x2,_0x169645,_0x47423c/0x2,_0x5f091d(0xe7)):_0x5be285[_0x5f091d(0xf6)](this['_letter']['trim'](),0x0,0x2,_0x169645-0x8,_0x47423c-0x4,_0x5f091d(0xb2));},Sprite_CTB_TurnOrder_Battler[_0x5e6d15(0x178)][_0x5e6d15(0x9b)]=function(){const _0x517112=_0x5e6d15,_0x23da60=this[_0x517112(0xc2)]();if(!_0x23da60)return;const _0x26600a=_0x23da60[_0x517112(0xc2)]();if(!_0x26600a)return;const _0x4ecfa9=_0x26600a[_0x517112(0x110)]();if(!_0x4ecfa9)return;this[_0x517112(0xfd)](_0x4ecfa9[_0x517112(0x21a)]);},Sprite_CTB_TurnOrder_Battler['prototype'][_0x5e6d15(0xfb)]=function(){const _0x14a07d=_0x5e6d15;return this[_0x14a07d(0xc2)]();},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x9f)]=Window_Help[_0x5e6d15(0x178)]['setItem'],Window_Help[_0x5e6d15(0x178)][_0x5e6d15(0x193)]=function(_0x4b1285){const _0x24c215=_0x5e6d15;if(BattleManager[_0x24c215(0x177)]()&&_0x4b1285&&_0x4b1285['note']&&_0x4b1285[_0x24c215(0xc7)][_0x24c215(0x1dd)](/<(?:CTB) HELP>\s*([\s\S]*)\s*<\/(?:CTB) HELP>/i))_0x24c215(0x90)===_0x24c215(0x90)?this[_0x24c215(0xbf)](String(RegExp['$1'])):(this['x']=this[_0x24c215(0xd8)],this['y']=this['_positionTargetY']);else{if('FhXPX'!==_0x24c215(0x1e2)){const _0x1b8b06=_0x155064[_0x24c215(0x239)],_0x311539=[_0x24c215(0x129),_0x24c215(0x187)][_0x24c215(0x20c)](_0x1b8b06[_0x24c215(0x104)]);return _0x311539;}else VisuMZ[_0x24c215(0x288)][_0x24c215(0x9f)][_0x24c215(0x28f)](this,_0x4b1285);}},VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0xc3)]=Window_StatusBase['prototype'][_0x5e6d15(0xc8)],Window_StatusBase[_0x5e6d15(0x178)][_0x5e6d15(0xc8)]=function(_0x326bc2,_0x3c5569,_0x28bc7e,_0x5dfe8b){const _0x262f41=_0x5e6d15;if(BattleManager[_0x262f41(0x177)]()&&_0x3c5569==='time')return;VisuMZ[_0x262f41(0x288)]['Window_StatusBase_placeGauge']['call'](this,_0x326bc2,_0x3c5569,_0x28bc7e,_0x5dfe8b);};function Window_CTB_TurnOrder(){const _0x4f98a7=_0x5e6d15;this[_0x4f98a7(0x203)](...arguments);}Window_CTB_TurnOrder['prototype']=Object[_0x5e6d15(0x279)](Window_Base[_0x5e6d15(0x178)]),Window_CTB_TurnOrder[_0x5e6d15(0x178)]['constructor']=Window_CTB_TurnOrder,Window_CTB_TurnOrder['Settings']=VisuMZ[_0x5e6d15(0x288)][_0x5e6d15(0x239)]['TurnOrder'],Window_CTB_TurnOrder[_0x5e6d15(0x178)][_0x5e6d15(0x203)]=function(){const _0x3b60b7=_0x5e6d15,_0x5acc32=this[_0x3b60b7(0x27e)]();this[_0x3b60b7(0x25c)]=_0x5acc32['x'],this['_homeY']=_0x5acc32['y'],Window_Base[_0x3b60b7(0x178)][_0x3b60b7(0x203)][_0x3b60b7(0x28f)](this,_0x5acc32),this[_0x3b60b7(0xa9)](),this[_0x3b60b7(0x258)](),this[_0x3b60b7(0x1a7)]=0x0;},Window_CTB_TurnOrder['prototype']['windowRect']=function(){const _0x25feeb=_0x5e6d15,_0x540a30=Window_CTB_TurnOrder[_0x25feeb(0x239)],_0x388242=SceneManager[_0x25feeb(0x8d)][_0x25feeb(0x1cc)][_0x25feeb(0x235)],_0x3ab42f=SceneManager['_scene'][_0x25feeb(0x12e)][_0x25feeb(0x235)],_0xa84400=_0x540a30['SubjectDistance'];let _0x54641e=0x0,_0x10e92d=0x0,_0x34c34d=0x0,_0x1deb03=0x0;switch(_0x540a30[_0x25feeb(0x104)]){case _0x25feeb(0x129):_0x54641e=_0x540a30[_0x25feeb(0x93)]*_0x540a30[_0x25feeb(0xb9)]+_0xa84400,_0x10e92d=_0x540a30[_0x25feeb(0x111)],_0x34c34d=Math[_0x25feeb(0x201)]((Graphics['width']-_0x54641e)/0x2),_0x1deb03=_0x540a30[_0x25feeb(0x1cb)];break;case _0x25feeb(0x187):_0x54641e=_0x540a30[_0x25feeb(0x93)]*_0x540a30[_0x25feeb(0xb9)]+_0xa84400,_0x10e92d=_0x540a30['SpriteLength'],_0x34c34d=Math[_0x25feeb(0x201)]((Graphics['width']-_0x54641e)/0x2),_0x1deb03=Graphics['height']-_0x388242-_0x10e92d-_0x540a30[_0x25feeb(0x1cb)];break;case'left':_0x54641e=_0x540a30[_0x25feeb(0x111)],_0x10e92d=_0x540a30[_0x25feeb(0x93)]*_0x540a30[_0x25feeb(0x1af)]+_0xa84400,_0x34c34d=_0x540a30[_0x25feeb(0x1cb)],_0x1deb03=Math[_0x25feeb(0x201)]((Graphics['height']-_0x388242+_0x3ab42f-_0x10e92d)/0x2);break;case _0x25feeb(0xb2):_0x54641e=_0x540a30[_0x25feeb(0x111)],_0x10e92d=_0x540a30[_0x25feeb(0x93)]*_0x540a30[_0x25feeb(0x1af)]+_0xa84400,_0x34c34d=Graphics[_0x25feeb(0x215)]-_0x54641e-_0x540a30[_0x25feeb(0x1cb)],_0x1deb03=Math['ceil']((Graphics[_0x25feeb(0x235)]-_0x388242+_0x3ab42f-_0x10e92d)/0x2);break;}return _0x34c34d+=_0x540a30[_0x25feeb(0x192)],_0x1deb03+=_0x540a30['DisplayOffsetY'],new Rectangle(_0x34c34d,_0x1deb03,_0x54641e,_0x10e92d);},Window_CTB_TurnOrder[_0x5e6d15(0x178)]['updatePadding']=function(){const _0x290469=_0x5e6d15;this[_0x290469(0x21f)]=0x0;},Window_CTB_TurnOrder['prototype']['isHorz']=function(){const _0x4eb761=_0x5e6d15,_0x3b4b55=Window_CTB_TurnOrder[_0x4eb761(0x239)],_0x370974=[_0x4eb761(0x129),_0x4eb761(0x187)][_0x4eb761(0x20c)](_0x3b4b55[_0x4eb761(0x104)]);return _0x370974;},Window_CTB_TurnOrder[_0x5e6d15(0x178)][_0x5e6d15(0xa9)]=function(){const _0x1d02f1=_0x5e6d15,_0x2e222c=Window_CTB_TurnOrder[_0x1d02f1(0x239)],_0x3ef220=this[_0x1d02f1(0x107)](),_0x2726a3=_0x3ef220?_0x2e222c[_0x1d02f1(0xb9)]:_0x2e222c[_0x1d02f1(0x1af)];this[_0x1d02f1(0x1d2)]=new Sprite(),this['addInnerChild'](this['_turnOrderInnerSprite']),this['_turnOrderContainer']=[];for(let _0x1d01d4=0x0;_0x1d01d4<$gameParty['maxBattleMembers']();_0x1d01d4++){if(_0x1d02f1(0x25b)!==_0x1d02f1(0xa8))for(let _0x133308=0x0;_0x133308<_0x2726a3;_0x133308++){const _0x4f3101=new Sprite_CTB_TurnOrder_Battler($gameParty,_0x1d01d4,_0x133308);this[_0x1d02f1(0x1d2)][_0x1d02f1(0x13a)](_0x4f3101),this['_turnOrderContainer'][_0x1d02f1(0x262)](_0x4f3101);}else this['setText'](_0x11edff(_0x9d18c0['$1']));}for(let _0x512a2e=0x0;_0x512a2e<0x8;_0x512a2e++){if(_0x1d02f1(0x206)!==_0x1d02f1(0x206))this[_0x1d02f1(0x223)](_0xe3e995);else for(let _0x13d3da=0x0;_0x13d3da<_0x2726a3;_0x13d3da++){const _0x3fa6e6=new Sprite_CTB_TurnOrder_Battler($gameTroop,_0x512a2e,_0x13d3da);this[_0x1d02f1(0x1d2)][_0x1d02f1(0x13a)](_0x3fa6e6),this[_0x1d02f1(0x286)][_0x1d02f1(0x262)](_0x3fa6e6);}}},Window_CTB_TurnOrder[_0x5e6d15(0x178)][_0x5e6d15(0x151)]=function(){const _0x3e3bc4=_0x5e6d15;Window_Base[_0x3e3bc4(0x178)]['update'][_0x3e3bc4(0x28f)](this),this[_0x3e3bc4(0x118)](),this['updateBattleContainerOrder'](),this[_0x3e3bc4(0x258)]();},Window_CTB_TurnOrder[_0x5e6d15(0x178)][_0x5e6d15(0x118)]=function(){const _0x1969dc=_0x5e6d15,_0x23a1fb=Window_CTB_TurnOrder[_0x1969dc(0x239)];if(_0x23a1fb['DisplayPosition']!==_0x1969dc(0x129))return;if(!_0x23a1fb['RepositionTopForHelp'])return;const _0x436b96=SceneManager[_0x1969dc(0x8d)][_0x1969dc(0x12e)];if(!_0x436b96)return;if(_0x436b96['visible']){if(_0x1969dc(0x26a)==='puUXS'){if(!_0x17cf69[_0x1969dc(0x177)]())return;if(!_0x3ec4b7['isSceneBattle']())return;if(this===_0x2b0242['actor']())return;if(this===_0x318315[_0x1969dc(0x10a)])return;const _0x5bcd4f=this[_0x1969dc(0x220)]();if(_0x5bcd4f<0x0)return;this[_0x1969dc(0x21c)](_0x5bcd4f+_0x200f72);}else this['x']=this['_homeX']+(_0x23a1fb[_0x1969dc(0x17a)]||0x0),this['y']=this[_0x1969dc(0xb1)]+(_0x23a1fb['RepositionTopHelpY']||0x0);}else this['x']=this[_0x1969dc(0x25c)],this['y']=this[_0x1969dc(0xb1)];const _0xd4a8e3=SceneManager[_0x1969dc(0x8d)][_0x1969dc(0x234)];Window_CTB_TurnOrder[_0x1969dc(0x138)]===undefined&&(Window_CTB_TurnOrder[_0x1969dc(0x138)]=Math[_0x1969dc(0x124)]((Graphics[_0x1969dc(0x215)]-Math[_0x1969dc(0x18e)](Graphics[_0x1969dc(0x160)],_0xd4a8e3[_0x1969dc(0x215)]))/0x2),Window_CTB_TurnOrder[_0x1969dc(0x1fe)]=Math['round']((Graphics['height']-Math[_0x1969dc(0x18e)](Graphics[_0x1969dc(0x196)],_0xd4a8e3[_0x1969dc(0x235)]))/0x2)),this['x']+=_0xd4a8e3['x']-Window_CTB_TurnOrder['_ogWindowLayerX'],this['y']+=_0xd4a8e3['y']-Window_CTB_TurnOrder[_0x1969dc(0x1fe)];},Window_CTB_TurnOrder[_0x5e6d15(0x178)][_0x5e6d15(0x21b)]=function(){const _0x3fe6d5=_0x5e6d15;if(!this['_turnOrderInnerSprite'])return;const _0x41d8ec=this[_0x3fe6d5(0x1d2)][_0x3fe6d5(0x1d8)];if(!_0x41d8ec)return;_0x41d8ec[_0x3fe6d5(0x221)](this[_0x3fe6d5(0x14a)][_0x3fe6d5(0x27a)](this));},Window_CTB_TurnOrder[_0x5e6d15(0x178)][_0x5e6d15(0x14a)]=function(_0x2e7c1d,_0x59d111){const _0x4aae97=_0x5e6d15,_0x3ddbdc=this['isHorz'](),_0x4d2a48=Window_CTB_TurnOrder[_0x4aae97(0x239)][_0x4aae97(0x85)];if(_0x3ddbdc&&!_0x4d2a48)return _0x2e7c1d['x']-_0x59d111['x'];else{if(_0x3ddbdc&&_0x4d2a48){if(_0x4aae97(0x267)!==_0x4aae97(0xd7))return _0x59d111['x']-_0x2e7c1d['x'];else{let _0x18407d=_0x123362[_0x4aae97(0x1bc)]/0x1388;return _0x18407d+=_0xdfe7be[_0x4aae97(0x87)]['indexOf'](this)*0x5,_0x18407d;}}else{if(!_0x3ddbdc&&_0x4d2a48){if('ZpeIK'===_0x4aae97(0x23b))return _0x2e7c1d['y']-_0x59d111['y'];else _0xe751b0=this[_0x4aae97(0x162)]()[_0x4aae97(0x257)];}else{if(!_0x3ddbdc&&!_0x4d2a48){if(_0x4aae97(0xce)===_0x4aae97(0x246)){const _0x41a858=_0x4a32f0[_0x4aae97(0x239)];if(_0x41a858[_0x4aae97(0x104)]!==_0x4aae97(0x129))return;if(!_0x41a858['RepositionLogWindow'])return;if(!this[_0x4aae97(0x1b1)])return;const _0x5b5a53=this['_ctbTurnOrderWindow']['y']-_0xc78f2d[_0x4aae97(0x124)]((_0x17d9f4['height']-_0x1a00c9[_0x4aae97(0x196)])/0x2),_0x3ab6b3=_0x5b5a53+this[_0x4aae97(0xae)]['height'];this[_0x4aae97(0x1b1)]['y']=_0x3ab6b3+_0x41a858[_0x4aae97(0x1cb)];}else return _0x59d111['y']-_0x2e7c1d['y'];}}}}},Window_CTB_TurnOrder[_0x5e6d15(0x178)]['updateVisibility']=function(){const _0x48e5fb=_0x5e6d15;this[_0x48e5fb(0x18a)]=$gameSystem[_0x48e5fb(0xda)]();},Window_CTB_TurnOrder[_0x5e6d15(0x178)]['updateTurnOrder']=function(_0x1abc64){const _0x2c2ffa=_0x5e6d15;this['_turnOrderContainer'][_0x2c2ffa(0x221)]((_0x1d88c0,_0x2fcef9)=>{const _0xfca4ff=_0x2c2ffa;return _0x1d88c0['ticksLeft']()-_0x2fcef9[_0xfca4ff(0x155)]();});if(!_0x1abc64)return;for(const _0x5c15de of this['_turnOrderContainer']){if(_0x2c2ffa(0x297)!==_0x2c2ffa(0x297))return _0x4fea5c['isCTB']()?_0x31d228[_0x2c2ffa(0x288)][_0x2c2ffa(0x239)]['Mechanics']['TpbSpeedCalcJS'][_0x2c2ffa(0x28f)](this,this):_0x553cb4[_0x2c2ffa(0x288)][_0x2c2ffa(0xc5)][_0x2c2ffa(0x28f)](this);else{if(!_0x5c15de)continue;_0x5c15de['update'](),_0x5c15de['_positionDuration']=0x0;}}},Window_CTB_TurnOrder[_0x5e6d15(0x178)][_0x5e6d15(0x8b)]=function(_0x58beb1){const _0x406cc4=_0x5e6d15;for(const _0x2aa3c8 of this[_0x406cc4(0x286)]){if(_0x406cc4(0x106)===_0x406cc4(0x166))this[_0x406cc4(0x1d6)](),this['createBackgroundSprite'](),this[_0x406cc4(0x1c0)](),this['createBorderSprite'](),this['createLetterSprite']();else{if(!_0x2aa3c8)continue;if(_0x2aa3c8[_0x406cc4(0xc2)]()!==_0x58beb1)continue;_0x2aa3c8[_0x406cc4(0xf2)]();}}};function _0x3a0d(){const _0x4c1f49=['_ctbTurnOrderFaceName','initialize','processTurnCTB','TurnOrderCTBGraphicIconIndex','PumMD','QqkuW','speed','zdqbj','svactor','updateTpbChargeTimeCTB','includes','battleEnd','CtbTurnOrderActorIcon','some','Delay','Game_Action_applyGlobal','createTurnOrderCTBGraphicType','createBackgroundSprite','getBattleSystem','width','BAAJF','iconWidth','RegExp','Item-%1-%2','_blendColor','updateBattleContainerOrder','setTurnOrderCTB','Game_Battler_tpbAcceleration','EnemyBattlerFaceName','padding','getCurrentTurnOrderPositionCTB','sort','initTpbChargeTime','updateTpbBattler','iKVIm','_tpbCastTime','fontSize','rotateCTBSprites','4KwUNRt','tfYcS','updateTpbCastTime','_graphicSv','isTpb','TpbAccelerationJS','createOrderJS','removeCurrentAction','ulcmp','find','status','canMove','_windowLayer','height','Mechanics','%1FlashDuration','fZsHn','Settings','8PmexoN','ZpeIK','sYeDu','tpbAcceleration','ZDFFN','isPlaytest','ySLAq','ZIQbk','_isBattleOver','actor','attackSpeed','kEYkG','SAtAC','face','applyItemBattleSystemCTBUserEffect','_forcing','iHETq','isActing','ARRAYNUM','BattleManager_processTurn','_fadeTarget','isEnemy','BattleManager_battleSys','MAX_SAFE_INTEGER','XgwSA','item','return\x200','(?:GAUGE|TIME|SPEED)','utkgs','_tpbChargeTime','updateVisibility','setBattleSystemCTBTurnOrderVisible','uHXyg','HOvPV','_homeX','clearTpbChargeTimeCTB','7125550aZAVUK','jJEqU','fillRect','isAnyBattlerReadyCTB','push','%1PopupText','initMembers','pUFTT','nuzoR','HtKhD','otherCtbChecksPassed','getChildIndex','aDWVl','LkBIo','EVAL','trim','SystemTurnOrderVisibility','sSERt','Parse_Notetags_CreateJS','taQTJ','QquKW','svBattlerName','78aoLapP','applyBattleSystemCTBUserEffect','processUpdateGraphic','faceName','_dupe','create','bind','acting','processCtbAntiSoftlock','isInputting','windowRect','#000000','setCtbChargeTime','nzMuv','Game_Action_applyItemUserEffect','Actor','changeCtbChargeTime','Cast','_turnOrderContainer','updateTpbCastTimeCTB','BattleSystemCTB','OrderJS','ShowMarkerBorder','updateOpacity','TpbBaseSpeedCalcJS','updateTpbChargeTime','startFade','call','WiEdE','loadSvActor','_backgroundSprite','IconIndex','svActorVertCells','hXMVf','SduuY','vlJhe','isActiveTpb','applyTpbPenalty','_inputting','name','clamp','UpdateFrames','loadSvEnemy','appear','%1BgColor2','OrderDirection','%1AnimationID','_actionBattlers','Actors','log','STR','rotateCTBSprite','EnemyBattlerType','_scene','_index','BCnfz','SmNPo','547893IxLGXT','RepositionTopHelpY','SpriteThin','ydObV','1920207TIDRZK','iasBG','118591jfDwIM','JXifI','%1Mirror','MesVT','updateSelectionEffect','processTurn','iePqQ','CpegH','Window_Help_setItem','SQPgV','createTurnOrderCTBGraphicFaceIndex','description','battleSys','isDead','checkCtbAntiSoftlock','clearRect','traitObjects','IsehQ','createBattlerSprites','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','battlerName','createChildren','KSYLJ','_ctbTurnOrderWindow','ActorBattlerIcon','reduce','_homeY','right','createBorderSprite','tQZXH','EnemyBattlerIcon','isAppeared','concat','applyItemUserEffect','TotalHorzSprites','DeviceFriendly','Hidli','TurnOrderCTBGraphicType','_onRestrictBypassCtbReset','ParseAllNotetags','setText','setCTBGraphicIconIndex','max','battler','Window_StatusBase_placeGauge','%1BgColor1','Game_Battler_tpbSpeed','isActor','note','placeGauge','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20position\x20=\x20target.getCurrentTurnOrderPositionCTB();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20order\x20=\x20position;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(order)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20order\x20=\x20position;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20order;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','faceHeight','battlerHue','qMWpX','blt','wgMAB','bXHgO','isCtbChargingState','KIlos','Charge','updateTpb','%1\x20%2\x20%3','setupTextPopup','constructor','rRSfq','_positionTargetX','BorderThickness','isBattleSystemCTBTurnOrderVisible','hasSvBattler','Game_Battler_initTpbChargeTime','UbsSP','applyCTBPenalty','(?:CTB)','ctbHasInstantActionAfter','_ctbTurnOrderFaceIndex','Game_Battler_updateTpbChargeTime','changeCtbCastTime','ZPnBA','CIxRz','_graphicSprite','center','CtbTurnOrderClearEnemyGraphic','VglyC','ParseSkillNotetags','LUYUy','jozuQ','_isAlive','clearTurnOrderCTBGraphics','1518618VOoXtP','456905UEIhwM','requestMotionRefresh','rotateDupeNumber','onRestrict','_ctbAfterSpeed','taJzm','drawText','bitmapWidth','initBattleSystemCTB','fontFace','containerWindow','getStateTooltipBattler','createRateJS','setBlendColor','createKeyJS','FaceIndex','updateAllTpbBattlers','BattleManager_updateAllTpbBattlers','tpbRequiredCastTime','osNPX','DisplayPosition','EnemyBattlerFontFace','BEeHG','isHorz','updateGraphicHue','WvOBZ','_subject','casting','_letter','mbIcf','Enemy-%1-%2','_positionTargetY','mainSprite','SpriteLength','Scene_Battle_createAllWindows','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','containerPosition','bitmap','cegkC','ShowMarkerBg','updatePosition','5161807mAOtNT','process_VisuMZ_BattleSystemCTB_JS_Notetags','loadEnemy','updateLetter','isTpbReady','length','changeEnemyGraphicBitmap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updateGraphic','createLetterSprite','floor','round','_graphicEnemy','ARRAYSTR','dNeAV','addChildAt','top','Scene_Boot_onDatabaseLoaded','Game_Battler_updateTpbCastTime','getColor','CtbTurnOrderClearActorGraphic','_helpWindow','repositionLogWindowCTB','Game_System_initialize','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','ParseItemNotetags','LjbpS','BattleManager_isActiveTpb','IconSet','clear','applyGlobal','_ogWindowLayerX','%1TextColor','addChild','exit','ctbStopped','gradientFillRect','iconHeight','BattleManager_updateTurn','BattleManager_isTpb','iSYAc','turn','CtbTurnOrderEnemyFace','_graphicIconIndex','ConvertParams','ctbTicksToGoal','_position','Game_Battler_tpbBaseSpeed','XUFuF','compareBattlerSprites','XVMrr','rCbSB','_fadeDuration','1YOlkNN','defaultPosition','Class-%1-%2','update','createTestBitmap','changeTurnOrderByCTB','RepositionTopForHelp','ticksLeft','changeSvActorGraphicBitmap','XMVcb','EnemyBattlerDrawLetter','Order','clearTpbChargeTime','%1SystemBg','initTpbChargeTimeCTB','_ctbTurnOrderVisible','updateAllTpbBattlersCTB','_phase','boxWidth','onDatabaseLoaded','subject','Enemies','addLoadListener','svActorHorzCells','dIzyG','KbADQ','mpagt','registerCommand','fyDsN','updateTurnOrderCTB','process_VisuMZ_BattleSystemCTB_CreateRegExp','DnRYZ','_ctbTurnOrderIconIndex','ready','HubEb','filter','_graphicFaceName','CtbTurnOrderEnemyIcon','indexOf','BattlerRelativeSpeedJS','FaceName','isCTB','prototype','ARRAYJSON','RepositionTopHelpX','Txles','allBattleMembers','loadSystem','%1FlashColor','isAttack','2004covsXm','TpbCastTimeJS','_tpbState','isCtbCastingState','checkPosition','setCtbAfterSpeed','jUOYq','bottom','qsmYT','Effect','visible','ctbTicksToGoalAddedCastTime','requestFauxAnimation','Game_Battler_tpbRequiredCastTime','min','hide','Anti-CTB\x20Softlock\x20Count:','mainFontFace','DisplayOffsetX','setItem','KArCd','getNextSubject','boxHeight','Game_Battler_tpbRelativeSpeed','vQTuG','undecided','parse','MFyHq','EnemyBattlerFontSize','VisuMZ_0_CoreEngine','tpbRelativeSpeed','hRGaq','CtbTurnOrderActorFace','_actionState','_graphicHue','format','onCtbOrderChange','icon','faceWidth','opacity','After','setCtbCastTime','endAction','parameters','changeFaceGraphicBitmap','isSideView','isSceneBattle','TotalVertSprites','CeZuE','_logWindow','_isAppeared','CTB','toUpperCase','isAlive','ARRAYSTRUCT','_graphicType','Weapon-%1-%2','startActorInput','RepositionLogWindow','FUNC','MIN_SAFE_INTEGER','oxNGU','anchor','BattleManager_startBattle','createGraphicSprite','onTpbCharged','map','_anti_CTB_SoftlockCount','Mduyy','bitmapHeight','ucAcx','Rush','setActionState','enemy','_graphicFaceIndex','ScreenBuffer','_statusWindow','eEUaN','preEndActionCTB','skills','SEoqb','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_turnOrderInnerSprite','members','_positionDuration','yqvWw','createInitialPositions','Game_Battler_clearTpbChargeTime','children','State-%1-%2','tiVHm','_letterSprite','startBattle','match','kUYLB','Game_Battler_updateTpb','createAllWindows','createCTBTurnOrderWindow','FhXPX','_autoBattle','changeIconGraphicBitmap','BattleManager_endAction','_plural','applyGlobalBattleSystemCTBEffects','TpbSpeedCalcJS','QQUDq','charging','TurnOrderCTBGraphicFaceName','VisuMZ_1_BattleCore','createTurnOrderCTBGraphicIconIndex','TurnOrderCTBGraphicFaceIndex','loadFace','EscapeFailPenalty','checkOpacity','_ctbTurnOrderGraphicType','UmYAq','Game_BattlerBase_hide','isValid','Game_Battler_onRestrict','tpbSpeed','_unit','Enemy','dRQwL','tpbBaseSpeed','currentAction','updateTurnCTB','_ogWindowLayerY','EnemyBattlerFaceIndex','postEndActionCTB','ceil'];_0x3a0d=function(){return _0x4c1f49;};return _0x3a0d();}