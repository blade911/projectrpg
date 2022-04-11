//=============================================================================
// VisuStella MZ - Item Crafting System
// VisuMZ_2_ItemCraftingSys.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ItemCraftingSys = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemCraftingSys = VisuMZ.ItemCraftingSys || {};
VisuMZ.ItemCraftingSys.version = 1.13;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.13] [ItemCraftingSys]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Item_Crafting_System_VisuStella_MZ
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Item crafting has become a common feature in many RPG's. However, it is not
 * a feature included by default with RPG Maker MZ. This plugin adds in a scene
 * that supports item crafting, either through the main menu, or through an
 * event initiated command.
 * 
 * Craftable items are normally all available by default, but they can be
 * barred away through switch requirements. Upon crafting items, switches can
 * also be turned on/off to make a progression system if desired.
 * 
 * Item ingredients can be items, weapons, armors, and cost gold as well.
 * Multiple ingredients can be required at a time or just one. Some items can
 * also be set to only be craftable at custom crafting areas.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Adds an item crafting scene to the game.
 * * Item crafting scene can be accessible from the Main Menu or through
 *   event-based Plugin Commands.
 * * Crafting ingredients can consist of items, weapons, armors, and gold.
 * * Crafting specific items can require switches to be turned on in order to
 *   be listed in the crafting list.
 * * Upon crafting specific items, they can also turn on/off other switches,
 *   making a progression system to be possible.
 * * Custom item crafting effects can occur for those who understand JavaScript
 *   to implement.
 * * This plugin can mask the names of uncrafted items, too.
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
 * - VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through crafting, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the ingredients list. This allows you to effectively have multiple ways to
 * craft the same item using different recipes.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
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
 * === General Notetags ===
 * 
 * These notetags are used to mark the item as a craftable item or as items
 * that can only be crafted through a custom crafting list.
 *
 * ---
 *
 * <Crafting Ingredients>
 *  Item id: x
 *  Item name: x
 *  Weapon id: x
 *  Weapon name: x
 *  Armor id: x
 *  Armor name: x
 *  Gold: x
 *  Category name: x
 * </Crafting Ingredients>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Turns this item/weapon/armor into a craftable item by using the listed
 *   ingredients to craft with.
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Insert/delete any number of copies of the ingredients as needed.
 * - Replace 'id' with the item/weapon/armor ID of the ingredient to be used.
 * - Replace 'name' with the name of the item/weapon/armor/category to be used.
 * - Replace 'x' with the number of ingredients needed to be used for crafting.
 * 
 * Category Rules:
 * 
 * - If the 'Category name' variant is used, it will draw from all items,
 *   weapons, and armors that have matching <Category: x> notetag data.
 * - Multiples of the same category name can be used. However, the player must
 *   select different items each time.
 * - If the selected category item already exists as a static ingredient, that
 *   item cannot be selected either.
 * 
 * Examples:
 * 
 * <Crafting Ingredients>
 *  Item 5: 1
 *  Item 6: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Item Potion: 1
 *  Item Magic Water: 3
 *  Gold: 100
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon 1: 4
 *  Armor 2: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Weapon Sword: 4
 *  Armor Hat: 2
 * </Crafting Ingredients>
 * 
 * <Crafting Ingredients>
 *  Category Fruit: 2
 *  Category Meat: 3
 * </Crafting Ingredients>
 * 
 * ---
 *
 * <Custom Crafting Only>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - This item can only be crafted with custom crafting lists selected through
 *   the Plugin Command.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create recipes with different ingredients in <Crafting Ingredients>
 *   notetag contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When crafted, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * 
 * ---
 * 
 * === Switch-Related Notetags ===
 * 
 * These notetags can make item crafting require certain switches to be on,
 * or turn switches on/off upon crafting items.
 *
 * ---
 *
 * <Crafting Show Switch: x>
 * 
 * <Crafting Show All Switches: x,x,x>
 * <Crafting Show Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the craftable item in the crafting scene.
 * - Replace 'x' with the switch ID to determine the item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - Insert as many switch ID's as needed.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting Turn On Switch: x>
 * <Crafting Turn On Switches: x,x,x>
 * 
 * <Crafting Turn Off Switch: x>
 * <Crafting Turn Off Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Upon crafting this item, turn on/off the marked switch(es).
 * - Replace 'x' with the switch ID to turn on/off.
 *
 * ---
 * 
 * === Masking-Related Notetags ===
 * 
 * These notetags can are used to determine name-masking properties for
 * uncrafted items.
 *
 * ---
 *
 * <Crafting Mask: text>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Displays the specific 'text' when the item has not yet been crafted.
 * - Replace 'text' with the text you wish to display if the item has not yet
 *   been crafted by the player.
 * - This can be bypassed with the custom Item Crafting list plugin command
 *   option if enabled.
 *
 * ---
 *
 * <Crafting No Mask>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Bypasses name masking even if the item has not yet been crafted.
 *
 * ---
 * 
 * === JavaScript Notetag: Effect-Related ===
 * 
 * The following are notetags made for users with JavaScript knowledge to
 * make custom effects that occur upon crafting the item.
 *
 * ---
 *
 * <JS Crafting Effect>
 *  code
 *  code
 *  code
 * </JS Crafting Effect>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' with JavaScript code to determine what kinds of effects you
 *   want to occur upon crafting this item.
 * - The 'item' variable represents the item being crafted.
 * - The 'number' variable represents the number of items being crafted.
 *
 * ---
 * 
 * === Crafting Animation-Related Notetags ===
 * 
 * These notetags let you set custom crafting animations when a specific item,
 * weapon, or armor is crafted so that way, they don't all have to use the
 * default crafting animation from the plugin parameters.
 * 
 * ---
 * 
 * <Crafting Animation: id>
 * <Crafting Animation: id, id, id>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Plays the animation(s) when this item, weapon, or armor is crafted.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 * 
 * ---
 * 
 * <Crafting Fade Speed: x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - This determines the speed at which the item's icon fades in during the
 *   crafting animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Crafting Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item, weapon, or armor's icon during crafting instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of crafting, too.
 * - The size used for the image will vary based on your game's resolution.
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
 * === Scene ===
 * 
 * ---
 *
 * Scene: Item Crafting (All)
 * - Go to the Item Crafting scene.
 * - All enabled recipes will be available.
 *
 * ---
 *
 * Scene: Item Crafting (Custom)
 * - Go to the Item Crafting scene.
 * - Select specific items to craft here.
 * - Some items can only appear through custom lists like this by using the
 *   <Custom Crafting Only> notetag.
 *
 *   Items:
 *   - Select which Item ID(s) to become craftable.
 *
 *   Weapons:
 *   - Select which Weapon ID(s) to become craftable.
 *
 *   Armors:
 *   - Select which armor ID(s) to become craftable.
 *
 *   Bypass Switches?:
 *   - Bypass any of the requirement switches?
 *
 *   Bypass Masks?:
 *   - Bypass name masking for uncrafted items?
 *
 * ---
 * 
 * === System ===
 * 
 * ---
 *
 * System: Enable Crafting in Menu?
 * - Enables/disables Crafting menu inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Crafting menu inside the main menu.
 *
 * ---
 *
 * System: Show Crafting in Menu?
 * - Shows/hides Crafting menu inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Crafting menu inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings pertaining to Item Crafting.
 *
 * ---
 *
 * Scene_ItemCrafting
 * 
 *   Assist Button:
 *   - Text used to for the Button Assist Window's OK button when about ready
 *     to craft an item.
 * 
 *   Crafted Icon:
 *   - Icon used to depict of an item has already been crafted.
 * 
 *   Ingredient Bridge:
 *   - Text used to bridge ingredients in the item crafting scene.
 *
 * ---
 * 
 * Switches
 * 
 *   Switch: Craft:
 *   - Crafting items in Crafting Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Crafting Scene opens.
 * 
 * ---
 * 
 * Categories
 * 
 *   Category Title:
 *   - Text format used for display categories.
 *   - %1 - Category Name, %2 - Needed Quantity
 * 
 *   Selected Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Selected Text:
 *   - This is the add on text that is displayed after an item's name that's
 *     already an ingredient.
 * 
 *   Uncategorized Text:
 *   - Text used for an uncategorized item category.
 * 
 *   Uncategorized Icon:
 *   - Icon used for uncategorized item category.
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Owned:
 *   -Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Listing:
 *   - Code that is run globally across all items when checking if an item
 *     should be listed or not.
 * 
 *   JS: Craft Effect:
 *   - Code that is run globally across all items when crafted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Masking Settings
 * ============================================================================
 *
 * Masking settings related to uncrafted items.
 *
 * ---
 *
 * Masking
 * 
 *   Enable Masking:
 *   - Enable masking for uncrafted items?
 * 
 *   Italics For Masking:
 *   - Use Italics when masking?
 * 
 *   Mask Character:
 *   - Text used for masking per individual character.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Menu Settings
 * ============================================================================
 *
 * Main Menu settings for Item Crafting.
 *
 * ---
 *
 * Main Menu
 * 
 *   Command Name:
 *   - Name of the 'Crafting' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'Crafting' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'Crafting' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Default settings for playing animations after crafting.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when crafting an item?
 * 
 *   Show Windows?:
 *   - Show windows during an item crafting animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when crafting.
 *
 * ---
 *
 * Sprite
 * 
 *   Scale:
 *   - How big do you want the item sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the item to fade in?
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Crafting Sound Settings
 * ============================================================================
 *
 * Default settings for the sound effect played when crafting an item.
 *
 * ---
 *
 * Sound
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ItemCrafting.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   Background 2:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings pertaining to Item Crafting.
 *
 * ---
 *
 * Windows
 * 
 *   Requirement Font Size:
 *   - Font size used for requirement quantity.
 * 
 *   Show Tooltips:
 *   - Show tooltips when the mouse hovers over an ingredient?
 * 
 *   Custom Window Skin:
 *   - Select a custom window skin if you want the tooltip window to have one.
 *
 * ---
 *
 * Background Types
 * 
 *   Help Window:
 *   Category Window:
 *   Gold Window:
 *   List Window:
 *   Status Window:
 *   Ingredient Title:
 *   Ingredient List:
 *   Number Window:
 *   Button Assist Window:
 *   - Select background type for the specific window.
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
 * Version 1.13: January 20, 2022
 * * Bug Fixes!
 * ** Tooltips for proxy items no longer show the original item's materials.
 *    Fix made by Olivia.
 * 
 * Version 1.12: December 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added Major Changes section for "Proxy Items".
 * * Feature Update!
 * ** Number window is now updated to show how much of an ingredient the player
 *    owns, how much will be consumed, and the number result of the crafting.
 * * New Features!
 * ** New notetags added by Arisu!
 * *** <Proxy: id>
 * *** <Proxy: name>
 * **** REQUIRES the most up to date VisuMZ Items and Equips Core!
 * **** Turns this item, weapon, or armor into a proxy for another item,
 *      allowing you to create recipes with different ingredients in
 *      <Crafting Ingredients> notetag contents and yield the same item.
 * **** The proxy item itself will take on the name, icon, and description of
 *      the original item it is supposed to represent.
 * **** No other properties are carried over from the original.
 * **** When viewed through the Window_ShopStatus window, the contents will
 *      reference the original item and not the proxy item.
 * **** Proxy items themselves cannot be acquired. This includes event
 *      commands, item drops, or equips.
 * **** When crafted, the item yielded won't be the proxy item but the item it
 *      is a proxy for.
 * **** Replace 'id' with a number representing the item, weapon, or armor ID
 *      of the same item type. If the proxy is an item, this will reference an
 *      item. If the proxy is a weapon, this will reference a weapon. Same for
 *      armors.
 * **** Replace 'name' with text representing the item, weapon, or armor's
 *      name. The referenced item needs to be the same item type as the proxy.
 *      Item for item, weapon for weapon, armor for armor.
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > General > Vocab > Owned
 * *** Plugin Parameters > General > Vocab > Shift
 * *** Plugin Parameters > General > Vocab > Net
 * **** These are new vocabulary terms for the new number window appearance.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: June 25, 2021
 * * Bug Fixes!
 * ** When exiting out of the ingredients list back towards the item selection
 *    window, the help window should now be properly updated. Fix by Irina.
 * 
 * Version 1.09: March 12, 2021
 * * Bug Fixes!
 * ** Having extra spaces before an ingredient's name should no longer cause
 *    problems to information parsing. Fix made by Irina.
 * 
 * Version 1.08: March 5, 2021
 * * Feature Update!
 * ** Plugin Commands and Item Crafting Scene option will not appear if you do
 *    not have any recipes prepared at all in your game. Update made by Irina.
 * 
 * Version 1.07: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > General Settings > Switches > Switch: Craft
 * **** Crafting items in Crafting Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Crafting Scene opens.
 * **** This can be used after an "Item Crafting" plugin command to determine
 *      if the player has crafted an item or not.
 * 
 * Version 1.06: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Crafting Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      item, weapon, or armor's icon during crafting instead.
 * 
 * Version 1.05: November 29, 2020
 * * Bug Fixes!
 * ** If on-screen touch buttons are disabled, they will no longer cause crash
 *    errors. Fix made by Arisu.
 * 
 * Version 1.04: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: November 8, 2020
 * * Feature Update!
 * ** Animations are now more compatible with the sprites. Update by Irina.
 * 
 * Version 1.02: October 25, 2020
 * * Bug Fixes!
 * ** Masked Names no longer show in the number input window. Fixed by Irina.
 * ** Plugin no longer requires a new game to be started in order for Item
 *    Crafting to work for the main menu. Fix made by Irina.
 * ** Touch Button for OK will no longer bypass the item requirements.
 *    Fix made by Irina.
 * ** Uncategorized items will now default to a newly created Uncategorized
 *    list of items. Fix made by Irina.
 * * Documentation Update!
 * ** Plugin Parameters > General is updated with "Uncategorized Text" and
 *    "Uncategorized Icon" for uncategorized items.
 *
 * Version 1.01: October 18, 2020
 * * Feature Update!
 * ** Bounce SFX pitch plugin parameter is now uncapped.
 * * Bug Fixes!
 * ** Color matches no longer crash the game if the matching amount is set to
 *    zero. Bug fixed by Yanfly.
 * ** Selecting a category without modern controls will now activate the list
 *    window. Bug fixed by Yanfly.
 * ** The Category Window no longer disappears when there's only one
 *    category. Bug fixed by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 *
 * Version 1.00 Official Release Date: November 2, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ItemCraftingSceneOpen
 * @text Scene: Item Crafting (All)
 * @desc Go to the Item Crafting scene.
 * All enabled recipes will be available.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CustomItemCraftingSceneOpen
 * @text Scene: Item Crafting (Custom)
 * @desc Go to the Item Crafting scene.
 * Select specific items to craft here.
 * 
 * @arg Contents
 *
 * @arg Items:arraynum
 * @text Items
 * @type item[]
 * @parent Contents
 * @desc Select which Item ID(s) to become craftable.
 * @default []
 *
 * @arg Weapons:arraynum
 * @text Weapons
 * @type weapon[]
 * @parent Contents
 * @desc Select which Weapon ID(s) to become craftable.
 * @default []
 *
 * @arg Armors:arraynum
 * @text Armors
 * @type armor[]
 * @parent Contents
 * @desc Select which armor ID(s) to become craftable.
 * @default []
 * 
 * @arg Settings
 *
 * @arg BypassSwitches:eval
 * @text Bypass Switches?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass any of the requirement switches?
 * @default false
 *
 * @arg BypassMasks:eval
 * @text Bypass Masks?
 * @parent Settings
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass name masking for uncrafted items?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableItemCraftingMenu
 * @text System: Enable Crafting in Menu?
 * @desc Enables/disables Crafting menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Crafting menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowItemCraftingMenu
 * @text System: Show Crafting in Menu?
 * @desc Shows/hides Crafting menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Crafting menu inside the main menu.
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
 * @param ItemCraftingSys
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
 * @desc General settings pertaining to Item Crafting.
 * @default {"Scene":"","CraftAssistButton:str":"Craft","CraftedIcon:num":"223","IngredientBridge:str":"+","Categories":"","CategoryIcon:num":"16","CategoryTitle:str":"Pick %1 Type (Quantity: %2)","SelectedColor:str":"17","SelectedText:str":" (Selected)","Uncategorized:str":"Uncategorized","NoCategoryIcon:num":"160","JS":"","jsGlobalListing:func":"\"// Declare Variables\\nlet item = arguments[0]; // This is the item being crafted.\\nlet listed = true;       // Default listing value.\\n\\n// Perform Checks\\n\\n\\n// Return Boolean\\nreturn listed;\"","jsGlobalCraftEffect:func":"\"// Declare Variables\\nlet item = arguments[0];   // This is the item being crafted.\\nlet number = arguments[1]; // This is the number of them being crafted.\\n\\n// Perform Actions\""}
 *
 * @param Mask:struct
 * @text Masking Settings
 * @type struct<Mask>
 * @desc Masking settings related to uncrafted items.
 * @default {"Enable:eval":"true","MaskItalics:eval":"true","MaskLetter:str":"?"}
 *
 * @param MainMenu:struct
 * @text Main Menu Settings
 * @type struct<MainMenu>
 * @desc Main Menu settings for Item Crafting.
 * @default {"Name:str":"Crafting","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 * 
 * @param Animation:struct
 * @text Animation Settings
 * @type struct<Animation>
 * @desc Default settings for playing animations after crafting.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"false","Animations:arraynum":"[\"44\",\"47\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Crafting Sound Settings
 * @type struct<Sound>
 * @desc Default settings for the sound effect played when crafting an item.
 * @default {"name:str":"Skill2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ItemCrafting.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Window settings for Scene_ItemCrafting.
 * The window positions are the same as Scene_Shop.
 * @default {"ReqQuantityFontSize:num":"18","ToolTips:eval":"true","name:str":"","BgTypes":"","HelpBgType:num":"0","CategoryBgType:num":"0","GoldBgType:num":"0","ListBgType:num":"0","StatusBgType:num":"0","IngredientTitle:num":"0","IngredientList:num":"0","NumberBgType:num":"0","ButtonAssistBgType:num":"0"}
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
 * @param Scene
 * @text Scene_ItemCrafting
 *
 * @param CraftAssistButton:str
 * @text Assist Button
 * @parent Scene
 * @desc Text used to for the Button Assist Window's OK button when about ready to craft an item.
 * @default Craft
 *
 * @param CraftedIcon:num
 * @text Crafted Icon
 * @parent Scene
 * @desc Icon used to depict of an item has already been crafted.
 * @default 223
 *
 * @param IngredientBridge:str
 * @text Ingredient Bridge
 * @parent Scene
 * @desc Text used to bridge ingredients in the item crafting scene.
 * @default +
 *
 * @param Switches
 *
 * @param SwitchCraft:num
 * @text Switch: Craft
 * @parent Switches
 * @type switch
 * @desc Crafting items in Crafting Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Crafting Scene opens.
 * @default 0
 * 
 * @param Categories
 *
 * @param CategoryIcon:num
 * @text Category Icon
 * @parent Categories
 * @desc Icon used for open-ended ingredients.
 * @default 16
 *
 * @param CategoryTitle:str
 * @text Category Title
 * @parent Categories
 * @desc Text format used for display categories.
 * %1 - Category Name, %2 - Needed Quantity
 * @default Pick %1 Type (Quantity: %2)
 *
 * @param SelectedColor:str
 * @text Selected Color
 * @parent Categories
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param SelectedText:str
 * @text Selected Text
 * @parent Categories
 * @desc This is the add on text that is displayed after an
 * item's name that's already an ingredient.
 * @default  (Selected)
 *
 * @param Uncategorized:str
 * @text Uncategorized Text
 * @parent Categories
 * @desc Text used for an uncategorized item category.
 * @default Uncategorized
 *
 * @param NoCategoryIcon:num
 * @text Uncategorized Icon
 * @parent Categories
 * @desc Icon used for uncategorized item category.
 * @default 160
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 * @param JS
 * @text Global JS Effects
 *
 * @param jsGlobalListing:func
 * @text JS: Listing
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when checking if an item should be listed or not.
 * @default "// Declare Variables\nlet item = arguments[0]; // This is the item being crafted.\nlet listed = true;       // Default listing value.\n\n// Perform Checks\n\n\n// Return Boolean\nreturn listed;"
 *
 * @param jsGlobalCraftEffect:func
 * @text JS: Craft Effect
 * @parent JS
 * @type note
 * @desc Code that is run globally across all items when crafted.
 * @default "// Declare Variables\nlet item = arguments[0];   // This is the item being crafted.\nlet number = arguments[1]; // This is the number of them being crafted.\n\n// Perform Actions"
 *
 */
/* ----------------------------------------------------------------------------
 * Masking Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mask:
 *
 * @param Enable:eval
 * @text Enable Masking
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable masking for uncrafted items?
 * @default true
 *
 * @param MaskItalics:eval
 * @text Italics For Masking
 * @type boolean
 * @on Italics
 * @off Normal
 * @desc Use Italics when masking?
 * @default true
 *
 * @param MaskLetter:str
 * @text Mask Character
 * @desc Text used for masking per individual character.
 * @default ?
 *
 */
/* ----------------------------------------------------------------------------
 * MainMenu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Crafting' option in the Main Menu.
 * @default Crafting
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Crafting' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when crafting an item?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during an item crafting animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when crafting.
 * @default ["44","47"]
 *
 * @param Sprite
 * @text Item Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the item sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the item to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
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
 * @param ReqQuantityFontSize:num
 * @text Requirement Font Size
 * @parent Windows
 * @desc Font size used for requirement quantity.
 * @default 18
 *
 * @param ToolTips:eval
 * @text Show Tooltips
 * @parent Windows
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips when the mouse hovers over an ingredient?
 * @default true
 *
 * @param name:str
 * @text Custom Window Skin
 * @parent ToolTips:eval
 * @type file
 * @dir img/system/
 * @desc Select a custom window skin if you want the tooltip window to have one.
 * @default 
 *
 * @param BgTypes
 * @text Background Types
 * @parent Windows
 *
 * @param HelpBgType:num
 * @text Help Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Help Window.
 * @default 0
 *
 * @param CategoryBgType:num
 * @text Category Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Category Window.
 * @default 0
 *
 * @param GoldBgType:num
 * @text Gold Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Gold Window.
 * @default 0
 *
 * @param ListBgType:num
 * @text List Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the List Window.
 * @default 0
 *
 * @param StatusBgType:num
 * @text Status Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Status Window.
 * @default 0
 *
 * @param IngredientTitle:num
 * @text Ingredient Title
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient Title Window.
 * @default 0
 *
 * @param IngredientList:num
 * @text Ingredient List
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Ingredient List Window.
 * @default 0
 *
 * @param NumberBgType:num
 * @text Number Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 * @param ButtonAssistBgType:num
 * @text Button Assist Window
 * @parent BgTypes
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for the Number Window.
 * @default 0
 *
 */
//=============================================================================

const _0x5d6f52=_0x3aaa;(function(_0x41053f,_0x1a1108){const _0x183a38=_0x3aaa,_0x5b2ad3=_0x41053f();while(!![]){try{const _0x371157=parseInt(_0x183a38(0x1d7))/0x1*(-parseInt(_0x183a38(0x371))/0x2)+parseInt(_0x183a38(0x1be))/0x3*(parseInt(_0x183a38(0x393))/0x4)+parseInt(_0x183a38(0x33d))/0x5*(-parseInt(_0x183a38(0x3a1))/0x6)+-parseInt(_0x183a38(0x228))/0x7+parseInt(_0x183a38(0x356))/0x8*(-parseInt(_0x183a38(0x374))/0x9)+-parseInt(_0x183a38(0x2dd))/0xa*(parseInt(_0x183a38(0x1d2))/0xb)+parseInt(_0x183a38(0x383))/0xc*(parseInt(_0x183a38(0x27d))/0xd);if(_0x371157===_0x1a1108)break;else _0x5b2ad3['push'](_0x5b2ad3['shift']());}catch(_0x501f91){_0x5b2ad3['push'](_0x5b2ad3['shift']());}}}(_0x412f,0x85765));var label=_0x5d6f52(0x373),tier=tier||0x0,dependencies=[_0x5d6f52(0x302)],pluginData=$plugins[_0x5d6f52(0x372)](function(_0xffe9eb){const _0x2a8790=_0x5d6f52;return _0xffe9eb[_0x2a8790(0x366)]&&_0xffe9eb[_0x2a8790(0x2f0)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5d6f52(0x396)]=VisuMZ[label][_0x5d6f52(0x396)]||{},VisuMZ['ConvertParams']=function(_0x385540,_0x567caa){const _0x2114bc=_0x5d6f52;for(const _0x47d643 in _0x567caa){if(_0x47d643[_0x2114bc(0x25c)](/(.*):(.*)/i)){const _0x140c67=String(RegExp['$1']),_0x40b52d=String(RegExp['$2'])[_0x2114bc(0x28f)]()[_0x2114bc(0x204)]();let _0x10f074,_0x256b87,_0x323e6b;switch(_0x40b52d){case'NUM':_0x10f074=_0x567caa[_0x47d643]!==''?Number(_0x567caa[_0x47d643]):0x0;break;case _0x2114bc(0x39e):_0x256b87=_0x567caa[_0x47d643]!==''?JSON[_0x2114bc(0x288)](_0x567caa[_0x47d643]):[],_0x10f074=_0x256b87['map'](_0x346db7=>Number(_0x346db7));break;case _0x2114bc(0x232):_0x10f074=_0x567caa[_0x47d643]!==''?eval(_0x567caa[_0x47d643]):null;break;case _0x2114bc(0x1b9):_0x256b87=_0x567caa[_0x47d643]!==''?JSON[_0x2114bc(0x288)](_0x567caa[_0x47d643]):[],_0x10f074=_0x256b87['map'](_0x3c6b29=>eval(_0x3c6b29));break;case'JSON':_0x10f074=_0x567caa[_0x47d643]!==''?JSON['parse'](_0x567caa[_0x47d643]):'';break;case _0x2114bc(0x256):_0x256b87=_0x567caa[_0x47d643]!==''?JSON[_0x2114bc(0x288)](_0x567caa[_0x47d643]):[],_0x10f074=_0x256b87[_0x2114bc(0x36b)](_0x1762cb=>JSON[_0x2114bc(0x288)](_0x1762cb));break;case'FUNC':_0x10f074=_0x567caa[_0x47d643]!==''?new Function(JSON[_0x2114bc(0x288)](_0x567caa[_0x47d643])):new Function(_0x2114bc(0x1c8));break;case _0x2114bc(0x391):_0x256b87=_0x567caa[_0x47d643]!==''?JSON[_0x2114bc(0x288)](_0x567caa[_0x47d643]):[],_0x10f074=_0x256b87['map'](_0x119083=>new Function(JSON[_0x2114bc(0x288)](_0x119083)));break;case _0x2114bc(0x359):_0x10f074=_0x567caa[_0x47d643]!==''?String(_0x567caa[_0x47d643]):'';break;case _0x2114bc(0x255):_0x256b87=_0x567caa[_0x47d643]!==''?JSON[_0x2114bc(0x288)](_0x567caa[_0x47d643]):[],_0x10f074=_0x256b87[_0x2114bc(0x36b)](_0x25c196=>String(_0x25c196));break;case _0x2114bc(0x23a):_0x323e6b=_0x567caa[_0x47d643]!==''?JSON[_0x2114bc(0x288)](_0x567caa[_0x47d643]):{},_0x10f074=VisuMZ[_0x2114bc(0x327)]({},_0x323e6b);break;case _0x2114bc(0x363):_0x256b87=_0x567caa[_0x47d643]!==''?JSON[_0x2114bc(0x288)](_0x567caa[_0x47d643]):[],_0x10f074=_0x256b87[_0x2114bc(0x36b)](_0x32a390=>VisuMZ[_0x2114bc(0x327)]({},JSON[_0x2114bc(0x288)](_0x32a390)));break;default:continue;}_0x385540[_0x140c67]=_0x10f074;}}return _0x385540;},(_0x1abfe9=>{const _0x45c00d=_0x5d6f52,_0xfe8c21=_0x1abfe9[_0x45c00d(0x364)];for(const _0x2af71a of dependencies){if(!Imported[_0x2af71a]){alert(_0x45c00d(0x286)[_0x45c00d(0x39b)](_0xfe8c21,_0x2af71a)),SceneManager[_0x45c00d(0x2d0)]();break;}}const _0x11287c=_0x1abfe9[_0x45c00d(0x2f0)];if(_0x11287c['match'](/\[Version[ ](.*?)\]/i)){const _0x5dd556=Number(RegExp['$1']);_0x5dd556!==VisuMZ[label]['version']&&(alert(_0x45c00d(0x237)[_0x45c00d(0x39b)](_0xfe8c21,_0x5dd556)),SceneManager['exit']());}if(_0x11287c['match'](/\[Tier[ ](\d+)\]/i)){const _0x47a73e=Number(RegExp['$1']);_0x47a73e<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x45c00d(0x39b)](_0xfe8c21,_0x47a73e,tier)),SceneManager[_0x45c00d(0x2d0)]()):tier=Math[_0x45c00d(0x1db)](_0x47a73e,tier);}VisuMZ[_0x45c00d(0x327)](VisuMZ[label][_0x45c00d(0x396)],_0x1abfe9[_0x45c00d(0x1da)]);})(pluginData),VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x379)]='You\x20do\x20not\x20have\x20any\x20craftable\x20items!\x0aRefer\x20to\x20the\x20help\x20file\x20on\x20how\x20to\x20create\x20crafting\x20recipes.',PluginManager['registerCommand'](pluginData[_0x5d6f52(0x364)],'ItemCraftingSceneOpen',_0x214bb7=>{const _0x57c330=_0x5d6f52;if(SceneManager[_0x57c330(0x39a)]())return;if(SceneManager[_0x57c330(0x1dc)]())return;if(DataManager[_0x57c330(0x266)]()[_0x57c330(0x2e0)]<=0x0){$gameTemp[_0x57c330(0x35b)]()&&alert(VisuMZ[_0x57c330(0x373)][_0x57c330(0x379)]);return;}SceneManager[_0x57c330(0x315)](Scene_ItemCrafting);}),PluginManager['registerCommand'](pluginData['name'],_0x5d6f52(0x280),_0x3a6012=>{const _0x330100=_0x5d6f52;if(SceneManager['isSceneBattle']())return;if(SceneManager[_0x330100(0x1dc)]())return;VisuMZ[_0x330100(0x327)](_0x3a6012,_0x3a6012);const _0x2caca1={'items':_0x3a6012[_0x330100(0x252)][_0x330100(0x36b)](_0x25a7c4=>$dataItems[_0x25a7c4])['filter'](_0xe78bd8=>DataManager['allCraftableItems']()[_0x330100(0x2b3)](_0xe78bd8)),'weapons':_0x3a6012[_0x330100(0x239)]['map'](_0x43c356=>$dataWeapons[_0x43c356])[_0x330100(0x372)](_0x357f84=>DataManager[_0x330100(0x22d)]()[_0x330100(0x2b3)](_0x357f84)),'armors':_0x3a6012[_0x330100(0x26d)][_0x330100(0x36b)](_0x166ee1=>$dataArmors[_0x166ee1])[_0x330100(0x372)](_0xb9d3d1=>DataManager[_0x330100(0x325)]()[_0x330100(0x2b3)](_0xb9d3d1)),'BypassSwitches':_0x3a6012[_0x330100(0x2a4)],'BypassMasks':_0x3a6012[_0x330100(0x241)]};_0x2caca1[_0x330100(0x2e4)]=_0x2caca1[_0x330100(0x309)]['concat'](_0x2caca1[_0x330100(0x294)],_0x2caca1[_0x330100(0x37d)]);if(_0x2caca1[_0x330100(0x2e4)][_0x330100(0x2e0)]<=0x0){$gameTemp['isPlaytest']()&&alert(VisuMZ[_0x330100(0x373)][_0x330100(0x379)]);return;}$gameTemp['setCustomItemCraftingSettings'](_0x2caca1),SceneManager[_0x330100(0x315)](Scene_ItemCrafting);}),PluginManager['registerCommand'](pluginData[_0x5d6f52(0x364)],'SystemEnableItemCraftingMenu',_0x276e75=>{const _0x40ca72=_0x5d6f52;VisuMZ[_0x40ca72(0x327)](_0x276e75,_0x276e75),$gameSystem[_0x40ca72(0x361)](_0x276e75[_0x40ca72(0x397)]);}),PluginManager[_0x5d6f52(0x2f5)](pluginData['name'],_0x5d6f52(0x23e),_0x2f7287=>{const _0x32a0d8=_0x5d6f52;VisuMZ['ConvertParams'](_0x2f7287,_0x2f7287),$gameSystem['setMainMenuItemCraftingVisible'](_0x2f7287[_0x32a0d8(0x306)]);}),VisuMZ['ItemCraftingSys'][_0x5d6f52(0x269)]=Scene_Boot['prototype'][_0x5d6f52(0x254)],Scene_Boot[_0x5d6f52(0x27a)][_0x5d6f52(0x254)]=function(){const _0x2c468a=_0x5d6f52;VisuMZ[_0x2c468a(0x373)][_0x2c468a(0x269)]['call'](this),this[_0x2c468a(0x319)]();},Scene_Boot[_0x5d6f52(0x27a)][_0x5d6f52(0x319)]=function(){this['process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags']();},VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x23b)]={'Ingredients':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>\s*([\s\S]*)\s*<\/(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) INGREDIENTS>/i,'AllSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'AnySwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) SHOW (?:ANY SWITCH|ANY SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OnSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN ON (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'OffSwitches':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) TURN OFF (?:SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/gi,'MaskText':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) MASK:[ ](.*)>/i,'NoMask':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) NO MASK>/i,'customCraftingOnly':/<CUSTOM (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) ONLY>/i,'jsOnCraft':/<JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>\s*([\s\S]*)\s*<\/JS (?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) EFFECT>/i,'animationIDs':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) FADE SPEED:[ ](\d+)>/i,'craftPicture':/<(?:CRAFT|CRAFTING|RECIPE|SYNTHESIS) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i},Scene_Boot[_0x5d6f52(0x27a)][_0x5d6f52(0x272)]=function(){const _0x5084e0=_0x5d6f52;if(VisuMZ[_0x5084e0(0x348)])return;const _0x50d775=$dataItems[_0x5084e0(0x211)]($dataWeapons,$dataArmors);for(const _0x2e1629 of _0x50d775){if(!_0x2e1629)continue;VisuMZ[_0x5084e0(0x373)][_0x5084e0(0x298)](_0x2e1629);}},VisuMZ['ItemCraftingSys'][_0x5d6f52(0x2f1)]=VisuMZ['ParseItemNotetags'],VisuMZ[_0x5d6f52(0x2f1)]=function(_0x43773e){const _0xc8cd56=_0x5d6f52;VisuMZ['ItemCraftingSys'][_0xc8cd56(0x2f1)][_0xc8cd56(0x240)](this,_0x43773e),VisuMZ[_0xc8cd56(0x373)][_0xc8cd56(0x298)](_0x43773e);},VisuMZ['ItemCraftingSys'][_0x5d6f52(0x1cb)]=VisuMZ[_0x5d6f52(0x1cb)],VisuMZ[_0x5d6f52(0x1cb)]=function(_0x4a2270){const _0x36ad48=_0x5d6f52;VisuMZ['ItemCraftingSys'][_0x36ad48(0x1cb)][_0x36ad48(0x240)](this,_0x4a2270),VisuMZ['ItemCraftingSys']['Parse_Notetags_CreateJS'](_0x4a2270);},VisuMZ['ItemCraftingSys'][_0x5d6f52(0x2af)]=VisuMZ[_0x5d6f52(0x2af)],VisuMZ[_0x5d6f52(0x2af)]=function(_0x542bac){const _0x1c8b6a=_0x5d6f52;VisuMZ['ItemCraftingSys'][_0x1c8b6a(0x2af)]['call'](this,_0x542bac),VisuMZ['ItemCraftingSys'][_0x1c8b6a(0x298)](_0x542bac);},VisuMZ['ItemCraftingSys'][_0x5d6f52(0x298)]=function(_0xa7e1b9){const _0x1cc8af=_0x5d6f52;_0xa7e1b9[_0x1cc8af(0x29e)][_0x1cc8af(0x25c)](VisuMZ[_0x1cc8af(0x373)][_0x1cc8af(0x23b)][_0x1cc8af(0x200)])&&VisuMZ[_0x1cc8af(0x373)][_0x1cc8af(0x2db)](_0xa7e1b9,RegExp['$1']);},VisuMZ[_0x5d6f52(0x373)]['JS']={},VisuMZ['ItemCraftingSys'][_0x5d6f52(0x2db)]=function(_0x4128b3,_0x4d1be9){const _0x500539=_0x5d6f52,_0x119980=_0x500539(0x30e)[_0x500539(0x39b)](_0x4d1be9),_0x555b00=DataManager[_0x500539(0x2c2)](_0x4128b3);VisuMZ[_0x500539(0x373)]['JS'][_0x555b00]=new Function(_0x119980);},DataManager['isCraftItemListed']=function(_0x45df91){const _0x5f1421=_0x5d6f52;if(!_0x45df91)return![];if(DataManager['getCraftingIngredients'](_0x45df91)[_0x5f1421(0x2e0)]<=0x0)return![];if(_0x45df91[_0x5f1421(0x29e)]['match'](VisuMZ[_0x5f1421(0x373)][_0x5f1421(0x23b)][_0x5f1421(0x1c3)])){if(!$gameTemp[_0x5f1421(0x1c4)]())return![];}if(!VisuMZ[_0x5f1421(0x373)][_0x5f1421(0x396)]['General'][_0x5f1421(0x28c)][_0x5f1421(0x240)](this,_0x45df91))return![];if(!VisuMZ[_0x5f1421(0x373)][_0x5f1421(0x36c)](_0x45df91))return![];if(!VisuMZ['ItemCraftingSys'][_0x5f1421(0x1fb)](_0x45df91))return![];return!![];},VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x36c)]=function(_0x557bf3){const _0x28b36d=_0x5d6f52,_0xea9832=$gameTemp['getCustomItemCraftingSettings']();if(_0xea9832&&_0xea9832['BypassSwitches'])return!![];const _0x3fa01f=VisuMZ[_0x28b36d(0x373)][_0x28b36d(0x23b)][_0x28b36d(0x378)],_0x21d18b=_0x557bf3[_0x28b36d(0x29e)]['match'](_0x3fa01f);if(_0x21d18b)for(const _0x58857f of _0x21d18b){if(!_0x58857f)continue;_0x58857f['match'](_0x3fa01f);const _0x4ee64d=JSON[_0x28b36d(0x288)]('['+RegExp['$1'][_0x28b36d(0x25c)](/\d+/g)+']');for(const _0x3cbb4b of _0x4ee64d){if(!$gameSwitches['value'](_0x3cbb4b))return![];}}return!![];},VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x1fb)]=function(_0x5b4b3c){const _0x1844fc=_0x5d6f52,_0xf94a1c=$gameTemp['getCustomItemCraftingSettings']();if(_0xf94a1c&&_0xf94a1c['BypassSwitches'])return!![];const _0x3df3e1=VisuMZ[_0x1844fc(0x373)][_0x1844fc(0x23b)][_0x1844fc(0x27c)],_0x597da4=_0x5b4b3c[_0x1844fc(0x29e)][_0x1844fc(0x25c)](_0x3df3e1);if(_0x597da4){for(const _0x2722d4 of _0x597da4){if(!_0x2722d4)continue;_0x2722d4[_0x1844fc(0x25c)](_0x3df3e1);const _0x313544=JSON['parse']('['+RegExp['$1'][_0x1844fc(0x25c)](/\d+/g)+']');for(const _0x1344d2 of _0x313544){if($gameSwitches[_0x1844fc(0x34a)](_0x1344d2))return!![];}}return![];}return!![];},DataManager['currentCraftableItems']=function(){const _0x8c7c4a=_0x5d6f52,_0x4979ee=$gameTemp[_0x8c7c4a(0x1c4)]();if(_0x4979ee)return _0x4979ee['all'][_0x8c7c4a(0x372)](_0xbc7e54=>this[_0x8c7c4a(0x28b)](_0xbc7e54));const _0x4692ed=this['craftableItems'](),_0x3a3baa=this['craftableWeapons'](),_0x282bce=this[_0x8c7c4a(0x2ff)]();return _0x4692ed[_0x8c7c4a(0x211)](_0x3a3baa,_0x282bce);},DataManager['craftableItems']=function(){const _0x5c1de3=_0x5d6f52;return this['allCraftableItems']()[_0x5c1de3(0x372)](_0x1caf18=>this['isCraftItemListed'](_0x1caf18));},DataManager[_0x5d6f52(0x1ea)]=function(){const _0x5c2332=_0x5d6f52;if(this[_0x5c2332(0x268)]!==undefined)return this['_allCraftableItems'];this[_0x5c2332(0x268)]=[];for(const _0x53945b of $dataItems){if(!_0x53945b)continue;_0x53945b[_0x5c2332(0x29e)]['match'](VisuMZ[_0x5c2332(0x373)]['RegExp'][_0x5c2332(0x27b)])&&this[_0x5c2332(0x268)][_0x5c2332(0x315)](_0x53945b);}return this[_0x5c2332(0x268)];},DataManager[_0x5d6f52(0x2b5)]=function(){const _0x3e0f5c=_0x5d6f52;return this[_0x3e0f5c(0x22d)]()[_0x3e0f5c(0x372)](_0x45306a=>this[_0x3e0f5c(0x28b)](_0x45306a));},DataManager[_0x5d6f52(0x22d)]=function(){const _0xddd5d4=_0x5d6f52;if(this[_0xddd5d4(0x2f3)]!==undefined)return this[_0xddd5d4(0x2f3)];this[_0xddd5d4(0x2f3)]=[];for(const _0x4c74d9 of $dataWeapons){if(!_0x4c74d9)continue;_0x4c74d9[_0xddd5d4(0x29e)]['match'](VisuMZ[_0xddd5d4(0x373)]['RegExp'][_0xddd5d4(0x27b)])&&this['_allCraftableWeapons'][_0xddd5d4(0x315)](_0x4c74d9);}return this[_0xddd5d4(0x2f3)];},DataManager[_0x5d6f52(0x2ff)]=function(){const _0x7e4269=_0x5d6f52;return this[_0x7e4269(0x325)]()[_0x7e4269(0x372)](_0x553f3b=>this['isCraftItemListed'](_0x553f3b));},DataManager[_0x5d6f52(0x325)]=function(){const _0x2d9be7=_0x5d6f52;if(this[_0x2d9be7(0x28a)]!==undefined)return this[_0x2d9be7(0x28a)];this[_0x2d9be7(0x28a)]=[];for(const _0x5be362 of $dataArmors){if(!_0x5be362)continue;_0x5be362[_0x2d9be7(0x29e)]['match'](VisuMZ['ItemCraftingSys'][_0x2d9be7(0x23b)]['Ingredients'])&&this[_0x2d9be7(0x28a)]['push'](_0x5be362);}return this[_0x2d9be7(0x28a)];},DataManager[_0x5d6f52(0x37a)]=function(_0x148d34){const _0xaec47d=_0x5d6f52;if(!_0x148d34)return[];const _0x12adda=this[_0xaec47d(0x2c2)](_0x148d34);return this[_0xaec47d(0x350)]===undefined&&this[_0xaec47d(0x3a3)](),this[_0xaec47d(0x350)][_0x12adda]||[];},DataManager[_0x5d6f52(0x2c2)]=function(_0x36e2b1){const _0x2732d6=_0x5d6f52;let _0x1f69af=_0x2732d6(0x2fe);if(this['isItem'](_0x36e2b1))return _0x1f69af[_0x2732d6(0x39b)]('Item',_0x36e2b1['id']);if(this[_0x2732d6(0x2a0)](_0x36e2b1))return _0x1f69af[_0x2732d6(0x39b)](_0x2732d6(0x3a4),_0x36e2b1['id']);if(this[_0x2732d6(0x390)](_0x36e2b1))return _0x1f69af['format']('Armor',_0x36e2b1['id']);return'';},DataManager[_0x5d6f52(0x3a3)]=function(){const _0x503aaf=_0x5d6f52;this[_0x503aaf(0x350)]={};const _0x4020f9=$dataItems['concat']($dataWeapons,$dataArmors);for(const _0x49e4e8 of _0x4020f9){if(!_0x49e4e8)continue;if(_0x49e4e8[_0x503aaf(0x29e)][_0x503aaf(0x25c)](VisuMZ[_0x503aaf(0x373)][_0x503aaf(0x23b)]['Ingredients'])){const _0x4e3203=String(RegExp['$1'])[_0x503aaf(0x381)](/[\r\n]+/),_0x21dc56=this[_0x503aaf(0x2f6)](_0x49e4e8,_0x4e3203);if(_0x21dc56[_0x503aaf(0x2e0)]<=0x0)continue;const _0x234b78=this[_0x503aaf(0x2c2)](_0x49e4e8);this['_craftingIngredients'][_0x234b78]=_0x21dc56;}}},DataManager[_0x5d6f52(0x2f6)]=function(_0x33d9a9,_0xe3db08){const _0x4b8747=_0x5d6f52;let _0x65b09=[];for(let _0x4d5784 of _0xe3db08){_0x4d5784=_0x4d5784[_0x4b8747(0x204)]();if(_0x4d5784[_0x4b8747(0x25c)](/GOLD:[ ](\d+)/i))_0x65b09[_0x4b8747(0x315)]([_0x4b8747(0x257),Number(RegExp['$1'])]);else{if(_0x4d5784[_0x4b8747(0x25c)](/CATEGORY[ ](.*):[ ](\d+)/i)){const _0x3c9ba7=String(RegExp['$1'])['trim'](),_0x3cbd1c=Number(RegExp['$2'])||0x1,_0xe4bb3=_0x4b8747(0x311)['format'](_0x3c9ba7);_0x65b09[_0x4b8747(0x315)]([_0xe4bb3,_0x3cbd1c]);}else{if(_0x4d5784[_0x4b8747(0x25c)](/(.*?)[ ](\d+):[ ](\d+)/i)){const _0x110bf4=RegExp['$1'][_0x4b8747(0x21b)]()[_0x4b8747(0x204)](),_0x1a0c17=Number(RegExp['$2'])||0x0,_0x3a7134=Number(RegExp['$3'])||0x1;let _0x1ad063=null;if(['item',_0x4b8747(0x309)][_0x4b8747(0x2b3)](_0x110bf4))_0x1ad063=$dataItems;if([_0x4b8747(0x1fd),_0x4b8747(0x294)][_0x4b8747(0x2b3)](_0x110bf4))_0x1ad063=$dataWeapons;if([_0x4b8747(0x1de),_0x4b8747(0x37d)][_0x4b8747(0x2b3)](_0x110bf4))_0x1ad063=$dataArmors;this['checkItemCraftingResultsValid'](_0x33d9a9,_0x1ad063,_0x1a0c17,_0x65b09)&&_0x65b09[_0x4b8747(0x315)]([_0x1ad063[_0x1a0c17],_0x3a7134]);}else{if(_0x4d5784[_0x4b8747(0x25c)](/(.*?)[ ](.*):[ ](\d+)/i)){const _0x1c8bdc=RegExp['$1']['toLowerCase']()[_0x4b8747(0x204)](),_0xed1400=RegExp['$2']['trim'](),_0x272708=Number(RegExp['$3'])||0x1;let _0x423205=null,_0x29c88e=0x0;[_0x4b8747(0x229),'items'][_0x4b8747(0x2b3)](_0x1c8bdc)&&(_0x423205=$dataItems,_0x29c88e=this[_0x4b8747(0x308)](_0xed1400)),[_0x4b8747(0x1fd),'weapons'][_0x4b8747(0x2b3)](_0x1c8bdc)&&(_0x423205=$dataWeapons,_0x29c88e=this[_0x4b8747(0x1f2)](_0xed1400)),[_0x4b8747(0x1de),'armors'][_0x4b8747(0x2b3)](_0x1c8bdc)&&(_0x423205=$dataArmors,_0x29c88e=this[_0x4b8747(0x1d9)](_0xed1400)),this[_0x4b8747(0x26e)](_0x33d9a9,_0x423205,_0x29c88e,_0x65b09)&&_0x65b09[_0x4b8747(0x315)]([_0x423205[_0x29c88e],_0x272708]);}}}}}return _0x65b09;},DataManager[_0x5d6f52(0x26e)]=function(_0x316e7b,_0xf271ea,_0x48b888,_0x4f4834){if(!_0xf271ea)return![];if(!_0xf271ea[_0x48b888])return![];const _0x36486f=_0xf271ea[_0x48b888];if(_0x36486f===_0x316e7b)return![];for(const _0x1a86f7 of _0x4f4834){if(!_0x1a86f7)continue;if(_0x1a86f7[0x0]===_0x36486f)return![];}return!![];},DataManager['getItemIdWithName']=function(_0x35a7b1){const _0x5a3f0b=_0x5d6f52;_0x35a7b1=_0x35a7b1[_0x5a3f0b(0x28f)]()['trim'](),this[_0x5a3f0b(0x21e)]=this[_0x5a3f0b(0x21e)]||{};if(this[_0x5a3f0b(0x21e)][_0x35a7b1])return this[_0x5a3f0b(0x21e)][_0x35a7b1];for(const _0x522be7 of $dataItems){if(!_0x522be7)continue;this['_itemIDs'][_0x522be7[_0x5a3f0b(0x364)][_0x5a3f0b(0x28f)]()['trim']()]=_0x522be7['id'];}return this['_itemIDs'][_0x35a7b1]||0x0;},DataManager['getWeaponIdWithName']=function(_0x202cba){const _0x518fcd=_0x5d6f52;_0x202cba=_0x202cba['toUpperCase']()[_0x518fcd(0x204)](),this['_weaponIDs']=this[_0x518fcd(0x32f)]||{};if(this[_0x518fcd(0x32f)][_0x202cba])return this[_0x518fcd(0x32f)][_0x202cba];for(const _0xbea821 of $dataWeapons){if(!_0xbea821)continue;this[_0x518fcd(0x32f)][_0xbea821[_0x518fcd(0x364)][_0x518fcd(0x28f)]()[_0x518fcd(0x204)]()]=_0xbea821['id'];}return this['_weaponIDs'][_0x202cba]||0x0;},DataManager[_0x5d6f52(0x1d9)]=function(_0x4b1741){const _0x38b2bc=_0x5d6f52;_0x4b1741=_0x4b1741[_0x38b2bc(0x28f)]()[_0x38b2bc(0x204)](),this[_0x38b2bc(0x24a)]=this['_armorIDs']||{};if(this['_armorIDs'][_0x4b1741])return this[_0x38b2bc(0x24a)][_0x4b1741];for(const _0x4fba95 of $dataArmors){if(!_0x4fba95)continue;this[_0x38b2bc(0x24a)][_0x4fba95[_0x38b2bc(0x364)][_0x38b2bc(0x28f)]()[_0x38b2bc(0x204)]()]=_0x4fba95['id'];}return this[_0x38b2bc(0x24a)][_0x4b1741]||0x0;},DataManager[_0x5d6f52(0x27f)]=function(_0x15d386){const _0x474d50=_0x5d6f52;if(!_0x15d386)return![];if(!VisuMZ[_0x474d50(0x373)][_0x474d50(0x396)][_0x474d50(0x39d)][_0x474d50(0x397)])return![];DataManager[_0x474d50(0x1ca)]&&(_0x15d386=DataManager[_0x474d50(0x1ca)](_0x15d386));const _0x1822c3=$gameTemp[_0x474d50(0x1c4)]();if(_0x1822c3&&_0x1822c3[_0x474d50(0x241)])return![];if(_0x15d386[_0x474d50(0x29e)][_0x474d50(0x25c)](VisuMZ[_0x474d50(0x373)]['RegExp']['NoMask']))return![];return!$gameSystem['isItemCrafted'](_0x15d386);},ImageManager[_0x5d6f52(0x1f4)]=VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)]['General']['CraftedIcon'],SoundManager[_0x5d6f52(0x2aa)]=function(_0x21eb37){const _0x5414f9=_0x5d6f52;AudioManager[_0x5414f9(0x354)](VisuMZ[_0x5414f9(0x373)][_0x5414f9(0x396)][_0x5414f9(0x274)]);},TextManager[_0x5d6f52(0x2c8)]=VisuMZ[_0x5d6f52(0x373)]['Settings'][_0x5d6f52(0x1bf)][_0x5d6f52(0x276)],TextManager[_0x5d6f52(0x317)]=VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)][_0x5d6f52(0x1bf)][_0x5d6f52(0x20e)],TextManager[_0x5d6f52(0x32e)]=VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)]['Mask']['MaskLetter'],TextManager[_0x5d6f52(0x31f)]=VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)][_0x5d6f52(0x208)]['Name'],TextManager[_0x5d6f52(0x352)]={'owned':VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)]['General'][_0x5d6f52(0x36d)]||'Owned','shift':VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)]['General'][_0x5d6f52(0x395)]||_0x5d6f52(0x2d1),'net':VisuMZ[_0x5d6f52(0x373)]['Settings'][_0x5d6f52(0x1bf)][_0x5d6f52(0x1d5)]||'Net'},ColorManager['getColor']=function(_0x5488f4){const _0x106460=_0x5d6f52;return _0x5488f4=String(_0x5488f4),_0x5488f4['match'](/#(.*)/i)?_0x106460(0x20b)[_0x106460(0x39b)](String(RegExp['$1'])):this['textColor'](Number(_0x5488f4));},SceneManager[_0x5d6f52(0x39a)]=function(){const _0x310cd7=_0x5d6f52;return this[_0x310cd7(0x273)]&&this[_0x310cd7(0x273)][_0x310cd7(0x362)]===Scene_Battle;},SceneManager['isSceneItemCrafting']=function(){const _0x5523ce=_0x5d6f52;return this[_0x5523ce(0x273)]&&this[_0x5523ce(0x273)]['constructor']===Scene_ItemCrafting;},Game_Temp[_0x5d6f52(0x27a)][_0x5d6f52(0x1c4)]=function(){return this['_customItemCraftingSettings'];},Game_Temp[_0x5d6f52(0x27a)][_0x5d6f52(0x1f1)]=function(){const _0x4c2ef9=_0x5d6f52;this[_0x4c2ef9(0x2d9)]=undefined;},Game_Temp[_0x5d6f52(0x27a)][_0x5d6f52(0x1e0)]=function(_0x49a9cc){const _0x37b925=_0x5d6f52;this[_0x37b925(0x2d9)]=_0x49a9cc;},VisuMZ[_0x5d6f52(0x373)]['Game_System_initialize']=Game_System[_0x5d6f52(0x27a)][_0x5d6f52(0x20f)],Game_System[_0x5d6f52(0x27a)][_0x5d6f52(0x20f)]=function(){const _0x52409f=_0x5d6f52;VisuMZ[_0x52409f(0x373)]['Game_System_initialize'][_0x52409f(0x240)](this),this[_0x52409f(0x24c)](),this[_0x52409f(0x38e)]();},Game_System[_0x5d6f52(0x27a)][_0x5d6f52(0x24c)]=function(){const _0x97deb7=_0x5d6f52;this[_0x97deb7(0x2a7)]={'shown':VisuMZ[_0x97deb7(0x373)][_0x97deb7(0x396)][_0x97deb7(0x208)][_0x97deb7(0x33c)],'enabled':VisuMZ['ItemCraftingSys'][_0x97deb7(0x396)][_0x97deb7(0x208)][_0x97deb7(0x25a)]};},Game_System[_0x5d6f52(0x27a)]['isMainMenuItemCraftingVisible']=function(){const _0x2f77aa=_0x5d6f52;if(this['_ItemCrafting_MainMenu']===undefined)this[_0x2f77aa(0x24c)]();return this[_0x2f77aa(0x2a7)][_0x2f77aa(0x344)];},Game_System[_0x5d6f52(0x27a)][_0x5d6f52(0x27e)]=function(_0x193236){const _0xac813d=_0x5d6f52;if(this[_0xac813d(0x2a7)]===undefined)this[_0xac813d(0x24c)]();this[_0xac813d(0x2a7)][_0xac813d(0x344)]=_0x193236;},Game_System[_0x5d6f52(0x27a)][_0x5d6f52(0x26c)]=function(){const _0x24a08d=_0x5d6f52;if(this[_0x24a08d(0x2a7)]===undefined)this[_0x24a08d(0x24c)]();return this[_0x24a08d(0x2a7)][_0x24a08d(0x295)];},Game_System[_0x5d6f52(0x27a)][_0x5d6f52(0x361)]=function(_0x54152f){const _0x408a60=_0x5d6f52;if(this[_0x408a60(0x2a7)]===undefined)this['initItemCraftingMainMenu']();this['_ItemCrafting_MainMenu'][_0x408a60(0x295)]=_0x54152f;},Game_System[_0x5d6f52(0x27a)][_0x5d6f52(0x38e)]=function(){const _0x1b8107=_0x5d6f52;this[_0x1b8107(0x386)]={'items':{},'weapons':{},'armors':{}};},Game_System['prototype'][_0x5d6f52(0x303)]=function(_0x1ea2bb){const _0x12f887=_0x5d6f52;return!!this[_0x12f887(0x301)](_0x1ea2bb);},Game_System['prototype'][_0x5d6f52(0x301)]=function(_0x43a8d1){const _0x38b171=_0x5d6f52;if(!_0x43a8d1)return![];if(this[_0x38b171(0x386)]===undefined)this[_0x38b171(0x38e)]();let _0x4ab7b2={};if(DataManager[_0x38b171(0x1f6)](_0x43a8d1))_0x4ab7b2=this[_0x38b171(0x386)][_0x38b171(0x309)];if(DataManager[_0x38b171(0x2a0)](_0x43a8d1))_0x4ab7b2=this[_0x38b171(0x386)][_0x38b171(0x294)];if(DataManager['isArmor'](_0x43a8d1))_0x4ab7b2=this[_0x38b171(0x386)][_0x38b171(0x37d)];return _0x4ab7b2[_0x43a8d1['id']]||0x0;},Game_System[_0x5d6f52(0x27a)][_0x5d6f52(0x1ef)]=function(_0x239c6d,_0x53936c){const _0x609046=_0x5d6f52;if(!_0x239c6d)return![];if(this[_0x609046(0x386)]===undefined)this[_0x609046(0x38e)]();_0x53936c=_0x53936c||0x1;let _0x4aa006={};if(DataManager['isItem'](_0x239c6d))_0x4aa006=this[_0x609046(0x386)][_0x609046(0x309)];if(DataManager[_0x609046(0x2a0)](_0x239c6d))_0x4aa006=this[_0x609046(0x386)][_0x609046(0x294)];if(DataManager[_0x609046(0x390)](_0x239c6d))_0x4aa006=this[_0x609046(0x386)][_0x609046(0x37d)];_0x4aa006[_0x239c6d['id']]=_0x4aa006[_0x239c6d['id']]||0x0,_0x4aa006[_0x239c6d['id']]+=_0x53936c;},VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x360)]=Scene_Menu[_0x5d6f52(0x27a)][_0x5d6f52(0x328)],Scene_Menu['prototype'][_0x5d6f52(0x328)]=function(){const _0x27f6d1=_0x5d6f52;VisuMZ[_0x27f6d1(0x373)][_0x27f6d1(0x360)][_0x27f6d1(0x240)](this);const _0x55d6fd=this['_commandWindow'];_0x55d6fd[_0x27f6d1(0x313)](_0x27f6d1(0x1b7),this[_0x27f6d1(0x1cc)][_0x27f6d1(0x216)](this));},Scene_Menu[_0x5d6f52(0x27a)][_0x5d6f52(0x1cc)]=function(){const _0x9db37d=_0x5d6f52;SceneManager[_0x9db37d(0x315)](Scene_ItemCrafting);};function Scene_ItemCrafting(){const _0x1e44a3=_0x5d6f52;this[_0x1e44a3(0x20f)](...arguments);}Scene_ItemCrafting[_0x5d6f52(0x27a)]=Object['create'](Scene_Item['prototype']),Scene_ItemCrafting['prototype'][_0x5d6f52(0x362)]=Scene_ItemCrafting,Scene_ItemCrafting[_0x5d6f52(0x27a)]['initialize']=function(){const _0x2f72b0=_0x5d6f52;Scene_Item[_0x2f72b0(0x27a)][_0x2f72b0(0x20f)][_0x2f72b0(0x240)](this);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x25d)]=function(){const _0x5d5450=_0x5d6f52;Scene_Item[_0x5d5450(0x27a)]['update'][_0x5d5450(0x240)](this),this[_0x5d5450(0x2cc)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x28d)]=function(){const _0x2164c6=_0x5d6f52;Scene_Item[_0x2164c6(0x27a)]['create']['call'](this),this[_0x2164c6(0x343)](),this[_0x2164c6(0x310)](),this[_0x2164c6(0x267)](),this[_0x2164c6(0x235)](),this[_0x2164c6(0x330)]()&&this[_0x2164c6(0x1e1)](),this[_0x2164c6(0x3a0)](),this[_0x2164c6(0x347)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x3a0)]=function(){const _0x29ab43=_0x5d6f52,_0x4ae2f9=VisuMZ[_0x29ab43(0x373)][_0x29ab43(0x396)][_0x29ab43(0x34e)];this[_0x29ab43(0x2ae)]&&this[_0x29ab43(0x2ae)]['setBackgroundType'](_0x4ae2f9['HelpBgType']),this[_0x29ab43(0x20c)]&&this[_0x29ab43(0x20c)][_0x29ab43(0x34d)](_0x4ae2f9[_0x29ab43(0x2fb)]),this[_0x29ab43(0x248)]&&this[_0x29ab43(0x248)][_0x29ab43(0x34d)](_0x4ae2f9[_0x29ab43(0x39c)]),this[_0x29ab43(0x264)]&&this[_0x29ab43(0x264)]['setBackgroundType'](_0x4ae2f9[_0x29ab43(0x210)]),this['_statusWindow']&&this['_statusWindow'][_0x29ab43(0x34d)](_0x4ae2f9[_0x29ab43(0x2eb)]),this[_0x29ab43(0x336)]&&this[_0x29ab43(0x336)]['setBackgroundType'](_0x4ae2f9[_0x29ab43(0x365)]),this[_0x29ab43(0x32c)]&&this[_0x29ab43(0x32c)][_0x29ab43(0x34d)](_0x4ae2f9[_0x29ab43(0x2ba)]),this['_numberWindow']&&this[_0x29ab43(0x1ba)]['setBackgroundType'](_0x4ae2f9[_0x29ab43(0x385)]),this['_buttonAssistWindow']&&this[_0x29ab43(0x38c)][_0x29ab43(0x34d)](_0x4ae2f9[_0x29ab43(0x39f)]);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x2a8)]=function(){const _0x51e8c8=_0x5d6f52;return Scene_Shop['prototype'][_0x51e8c8(0x305)]['call'](this);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x343)]=function(){const _0x31cb88=_0x5d6f52,_0x32e871=this[_0x31cb88(0x2d2)]();this[_0x31cb88(0x248)]=new Window_Gold(_0x32e871),this[_0x31cb88(0x2ef)](this[_0x31cb88(0x248)]);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x2d2)]=function(){const _0x5874d8=_0x5d6f52;return Scene_Shop[_0x5874d8(0x27a)][_0x5874d8(0x242)][_0x5874d8(0x240)](this);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x35f)]=function(){const _0xdade1a=_0x5d6f52;return Scene_Shop[_0xdade1a(0x27a)]['commandWindowRectItemsEquipsCore'][_0xdade1a(0x240)](this);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x2fc)]=function(){const _0x3cd4a4=_0x5d6f52;this[_0x3cd4a4(0x297)](),this[_0x3cd4a4(0x330)]()&&this['postCreateItemWindowModernControls'](),this[_0x3cd4a4(0x246)]()&&(this[_0x3cd4a4(0x1d8)](),this[_0x3cd4a4(0x2ef)](this[_0x3cd4a4(0x264)]));},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x297)]=function(){const _0x51de46=_0x5d6f52,_0x3aab78=this['itemWindowRect']();this[_0x51de46(0x264)]=new Window_ItemCraftingList(_0x3aab78),this[_0x51de46(0x264)][_0x51de46(0x2bf)](this[_0x51de46(0x2ae)]),this[_0x51de46(0x264)]['setHandler']('ok',this[_0x51de46(0x38f)]['bind'](this)),this['_itemWindow']['setHandler'](_0x51de46(0x2b2),this['onItemCancel']['bind'](this)),this[_0x51de46(0x2ef)](this[_0x51de46(0x264)]),this[_0x51de46(0x20c)][_0x51de46(0x335)](this['_itemWindow']),!this[_0x51de46(0x20c)]['needsSelection']()&&(this[_0x51de46(0x264)]['y']-=this[_0x51de46(0x20c)][_0x51de46(0x333)],this['_itemWindow'][_0x51de46(0x333)]+=this['_categoryWindow'][_0x51de46(0x333)],this['_categoryWindow'][_0x51de46(0x26f)](),this['_categoryWindow']['deactivate'](),this[_0x51de46(0x1e1)]());},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x329)]=function(){const _0x168a35=_0x5d6f52;return this['_commandWindow']=this[_0x168a35(0x20c)],Scene_Shop['prototype']['buyWindowRectItemsEquipsCore']['call'](this);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x282)]=function(){const _0x54750e=_0x5d6f52;return Scene_Shop[_0x54750e(0x27a)][_0x54750e(0x218)][_0x54750e(0x240)](this);},Scene_ItemCrafting['prototype'][_0x5d6f52(0x310)]=function(){const _0x32e78d=_0x5d6f52,_0x57a4ca=this[_0x32e78d(0x329)]();this[_0x32e78d(0x1ba)]=new Window_ItemCraftingNumber(_0x57a4ca),this[_0x32e78d(0x1ba)][_0x32e78d(0x26f)](),this[_0x32e78d(0x1ba)]['setHandler']('ok',this[_0x32e78d(0x283)][_0x32e78d(0x216)](this)),this[_0x32e78d(0x1ba)][_0x32e78d(0x313)]('cancel',this[_0x32e78d(0x38b)]['bind'](this)),this[_0x32e78d(0x2ef)](this[_0x32e78d(0x1ba)]);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x267)]=function(){const _0x2d2f9a=_0x5d6f52,_0x1f1753=this[_0x2d2f9a(0x35f)]();this['_ingredientSelectTitle']=new Window_Selectable(_0x1f1753),this['_ingredientSelectTitle'][_0x2d2f9a(0x26f)](),this[_0x2d2f9a(0x2ef)](this[_0x2d2f9a(0x336)]);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x235)]=function(){const _0x5147a6=_0x5d6f52,_0x12a800=this[_0x5147a6(0x329)](),_0x5b6a89=new Window_ItemCraftingIngredient(_0x12a800);_0x5b6a89[_0x5147a6(0x26f)](),_0x5b6a89[_0x5147a6(0x2bf)](this['_helpWindow']),_0x5b6a89['setStatusWindow'](this[_0x5147a6(0x223)]),_0x5b6a89[_0x5147a6(0x313)]('ok',this['onIngredientListOk'][_0x5147a6(0x216)](this)),_0x5b6a89[_0x5147a6(0x313)](_0x5147a6(0x2b2),this[_0x5147a6(0x1e9)][_0x5147a6(0x216)](this)),this[_0x5147a6(0x32c)]=_0x5b6a89,this[_0x5147a6(0x2ef)](this[_0x5147a6(0x32c)]);},Scene_ItemCrafting[_0x5d6f52(0x27a)]['onCategoryOk']=function(){const _0x2a9e4e=_0x5d6f52;this[_0x2a9e4e(0x264)][_0x2a9e4e(0x30b)](),this[_0x2a9e4e(0x264)][_0x2a9e4e(0x24d)](0x0);},Scene_ItemCrafting['prototype']['onItemOk']=function(){const _0x527396=_0x5d6f52;$gameTemp[_0x527396(0x1d6)]=!![],this[_0x527396(0x2de)]=this[_0x527396(0x264)][_0x527396(0x229)](),this[_0x527396(0x264)]['hide'](),this[_0x527396(0x2cf)](),this['doesItemHaveOpenCategories']()?this[_0x527396(0x2d5)]():this[_0x527396(0x260)](),$gameTemp[_0x527396(0x1d6)]=![],this[_0x527396(0x2de)]=this['_itemWindow'][_0x527396(0x229)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)]['setupNumberWindow']=function(){const _0x2d8ebb=_0x5d6f52;this[_0x2d8ebb(0x336)][_0x2d8ebb(0x26f)](),this['_ingredientSelectList'][_0x2d8ebb(0x26f)](),this[_0x2d8ebb(0x20c)][_0x2d8ebb(0x331)](),$gameTemp['_bypassProxy']=!![],this[_0x2d8ebb(0x1ba)][_0x2d8ebb(0x2e7)](this[_0x2d8ebb(0x264)]['item']()),$gameTemp['_bypassProxy']=![],this['_numberWindow']['show'](),this[_0x2d8ebb(0x1ba)][_0x2d8ebb(0x30b)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x1f7)]=function(){const _0x315b74=_0x5d6f52;this[_0x315b74(0x1ba)][_0x315b74(0x26f)](),this[_0x315b74(0x336)][_0x315b74(0x26f)](),this[_0x315b74(0x32c)]['hide'](),this['_categoryWindow'][_0x315b74(0x331)](),this[_0x315b74(0x264)][_0x315b74(0x331)](),this['_itemWindow']['activate'](),this[_0x315b74(0x264)][_0x315b74(0x2e6)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x283)]=function(){const _0x506719=_0x5d6f52;VisuMZ['ItemCraftingSys']['Settings'][_0x506719(0x250)][_0x506719(0x1e2)]?this[_0x506719(0x1f0)]():this[_0x506719(0x25e)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x25e)]=function(){const _0x567e7f=_0x5d6f52;this[_0x567e7f(0x2bd)][_0x567e7f(0x2c9)]=!![],this[_0x567e7f(0x285)]=![],this['processItemCrafting'](),this[_0x567e7f(0x2fa)](),this[_0x567e7f(0x1f7)](),this[_0x567e7f(0x264)]['refresh'](),this[_0x567e7f(0x20c)]['refresh'](),this[_0x567e7f(0x20c)][_0x567e7f(0x299)](),this[_0x567e7f(0x20c)][_0x567e7f(0x2b7)](),this['_goldWindow'][_0x567e7f(0x1e7)](),this[_0x567e7f(0x264)][_0x567e7f(0x2e6)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x23f)]=function(){const _0x12c59f=_0x5d6f52;$gameTemp[_0x12c59f(0x1d6)]=!![];let _0x259de2=this[_0x12c59f(0x264)][_0x12c59f(0x229)]();$gameTemp['_bypassProxy']=![];const _0x312ec4=this[_0x12c59f(0x1ba)]['number'](),_0x4c9948=DataManager[_0x12c59f(0x37a)](_0x259de2);let _0x12a87a=0x0;for(const _0x9226cb of _0x4c9948){if(!_0x9226cb)continue;let _0x1c2e88=_0x9226cb[0x0];const _0x2ec1ee=_0x9226cb[0x1]*_0x312ec4;_0x1c2e88===_0x12c59f(0x257)?$gameParty['loseGold'](_0x2ec1ee):(typeof _0x1c2e88==='string'&&_0x1c2e88[_0x12c59f(0x25c)](/CATEGORY/i)&&(_0x1c2e88=this[_0x12c59f(0x206)][_0x12a87a],_0x12a87a+=0x1),$gameParty['loseItem'](_0x1c2e88,_0x2ec1ee,![]));}_0x259de2=this[_0x12c59f(0x264)][_0x12c59f(0x229)](),$gameParty[_0x12c59f(0x2b4)](_0x259de2,_0x312ec4),this['_numberWindow']['number']()>0x0?SoundManager['playItemCrafting']():SoundManager[_0x12c59f(0x243)](),$gameSystem[_0x12c59f(0x1ef)](_0x259de2,_0x312ec4);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x2fa)]=function(){const _0x11c0b0=_0x5d6f52,_0x3030b2=this['_item'],_0x4c0af2=this[_0x11c0b0(0x1ba)]['number']();VisuMZ['ItemCraftingSys'][_0x11c0b0(0x2ec)](_0x3030b2,!![]),VisuMZ[_0x11c0b0(0x373)][_0x11c0b0(0x2ec)](_0x3030b2,![]),this['enableCraftingSwitches']();const _0x13249e=DataManager[_0x11c0b0(0x2c2)](_0x3030b2);VisuMZ['ItemCraftingSys']['JS'][_0x13249e]&&VisuMZ[_0x11c0b0(0x373)]['JS'][_0x13249e]['call'](this,_0x3030b2,_0x4c0af2),VisuMZ[_0x11c0b0(0x373)][_0x11c0b0(0x396)][_0x11c0b0(0x1bf)][_0x11c0b0(0x35a)][_0x11c0b0(0x240)](this,_0x3030b2,_0x4c0af2);},VisuMZ['ItemCraftingSys'][_0x5d6f52(0x2ec)]=function(_0x58ea80,_0x571344){const _0x5e7d21=_0x5d6f52,_0x4981c9=_0x571344?VisuMZ[_0x5e7d21(0x373)][_0x5e7d21(0x23b)][_0x5e7d21(0x382)]:VisuMZ[_0x5e7d21(0x373)][_0x5e7d21(0x23b)][_0x5e7d21(0x222)],_0x17b022=_0x58ea80['note'][_0x5e7d21(0x25c)](_0x4981c9);if(_0x17b022)for(const _0x55d923 of _0x17b022){if(!_0x55d923)continue;_0x55d923[_0x5e7d21(0x25c)](_0x4981c9);const _0x51a4ef=JSON[_0x5e7d21(0x288)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3df3fb of _0x51a4ef){$gameSwitches['setValue'](_0x3df3fb,_0x571344);}}},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x38b)]=function(){const _0x3aeac4=_0x5d6f52;SoundManager['playCancel'](),this[_0x3aeac4(0x1e9)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x33f)]=function(){const _0xbc1367=_0x5d6f52,_0x412801=this['_ingredientSelectList'][_0xbc1367(0x229)]();this[_0xbc1367(0x206)][this[_0xbc1367(0x2c6)]]=_0x412801,this['_ingredientIndex']++,this['setupSelectIngredientWindow']();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x1e9)]=function(){const _0x5f2333=_0x5d6f52;this[_0x5f2333(0x206)][_0x5f2333(0x388)](),this['_ingredientIndex']--,this[_0x5f2333(0x2c6)]<0x0?this[_0x5f2333(0x1f7)]():this[_0x5f2333(0x2d5)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)]['clearUserSelectedIngredients']=function(){const _0x4d35c3=_0x5d6f52;this[_0x4d35c3(0x287)]=[],this[_0x4d35c3(0x33a)]=[],this['_ingredientsList']=[],this[_0x4d35c3(0x2c6)]=0x0;},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x31c)]=function(){const _0x2145c6=_0x5d6f52;if(!this[_0x2145c6(0x2de)])return![];const _0x54407e=DataManager[_0x2145c6(0x37a)](this[_0x2145c6(0x2de)]);for(const _0x4ca768 of _0x54407e){if(!_0x4ca768)continue;const _0x551bdc=_0x4ca768[0x0];if(!_0x551bdc)continue;if(typeof _0x551bdc==='string'&&_0x551bdc[_0x2145c6(0x25c)](/CATEGORY/i)){_0x551bdc[_0x2145c6(0x25c)](/CATEGORY: (.*)/i);const _0x13bb4f=String(RegExp['$1'])[_0x2145c6(0x204)]();this[_0x2145c6(0x287)]['push'](_0x13bb4f),this['_ingredientAmounts'][_0x2145c6(0x315)](_0x4ca768[0x1]||0x1);}}return this['_ingredientCategories']['length']>0x0;},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x2d5)]=function(){const _0x318f5f=_0x5d6f52;if(this[_0x318f5f(0x2c6)]>=this[_0x318f5f(0x287)][_0x318f5f(0x2e0)])return this[_0x318f5f(0x260)]();this['_categoryWindow'][_0x318f5f(0x26f)](),this[_0x318f5f(0x1ba)]['hide']();const _0x5a13b0=this[_0x318f5f(0x287)][this[_0x318f5f(0x2c6)]],_0x1f574b=this['_ingredientAmounts'][this['_ingredientIndex']];this[_0x318f5f(0x336)][_0x318f5f(0x331)](),this[_0x318f5f(0x32c)][_0x318f5f(0x331)](),this['_ingredientSelectTitle'][_0x318f5f(0x1dd)][_0x318f5f(0x219)]();const _0xb4ed64=VisuMZ[_0x318f5f(0x373)][_0x318f5f(0x396)][_0x318f5f(0x1bf)]['CategoryTitle'],_0x590d0d=VisuMZ[_0x318f5f(0x389)][_0x318f5f(0x396)][_0x318f5f(0x32b)]['ItemQuantityFmt'],_0x5769e7=_0xb4ed64['format'](_0x5a13b0,_0x590d0d[_0x318f5f(0x39b)](_0x1f574b)),_0x443655=this[_0x318f5f(0x336)][_0x318f5f(0x334)](0x0);this[_0x318f5f(0x336)][_0x318f5f(0x207)](_0x5769e7,_0x443655['x'],_0x443655['y']),this[_0x318f5f(0x32c)][_0x318f5f(0x2e7)](_0x5a13b0,_0x1f574b);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x2e3)]=function(){const _0x18992f=_0x5d6f52;if(this[_0x18992f(0x1ba)]&&this['_numberWindow']['active'])return TextManager[_0x18992f(0x1ec)](_0x18992f(0x1cf),_0x18992f(0x377));return Scene_Item[_0x18992f(0x27a)][_0x18992f(0x2e3)]['call'](this);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x2f7)]=function(){const _0xced145=_0x5d6f52;if(this[_0xced145(0x1ba)]&&this[_0xced145(0x1ba)][_0xced145(0x2d3)])return TextManager[_0xced145(0x1ec)]('up',_0xced145(0x2b1));return Scene_Item[_0xced145(0x27a)][_0xced145(0x2f7)][_0xced145(0x240)](this);},Scene_ItemCrafting['prototype'][_0x5d6f52(0x320)]=function(){const _0x14f878=_0x5d6f52;if(this[_0x14f878(0x29f)]())return VisuMZ[_0x14f878(0x389)][_0x14f878(0x396)][_0x14f878(0x32b)][_0x14f878(0x293)];else{if(this[_0x14f878(0x1ba)]&&this[_0x14f878(0x1ba)]['active'])return VisuMZ['ItemsEquipsCore']['Settings'][_0x14f878(0x338)][_0x14f878(0x23d)];}return Scene_Item['prototype'][_0x14f878(0x320)]['call'](this);},Scene_ItemCrafting['prototype'][_0x5d6f52(0x230)]=function(){const _0x496e2a=_0x5d6f52;if(this['_numberWindow']&&this[_0x496e2a(0x1ba)]['active'])return VisuMZ[_0x496e2a(0x389)][_0x496e2a(0x396)]['ShopScene'][_0x496e2a(0x224)];return Scene_Item[_0x496e2a(0x27a)][_0x496e2a(0x230)][_0x496e2a(0x240)](this);},Scene_ItemCrafting[_0x5d6f52(0x27a)]['buttonAssistText4']=function(){const _0x3bf236=_0x5d6f52;return this['_numberWindow']&&this[_0x3bf236(0x1ba)][_0x3bf236(0x2d3)]?TextManager[_0x3bf236(0x317)]:Scene_Item[_0x3bf236(0x27a)]['buttonAssistText4']['call'](this);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x31a)]=function(){const _0xc4c373=_0x5d6f52;Scene_MenuBase[_0xc4c373(0x27a)][_0xc4c373(0x31a)][_0xc4c373(0x240)](this),this[_0xc4c373(0x205)](this[_0xc4c373(0x263)]()),this['createCustomBackgroundImages']();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x263)]=function(){const _0x3e3a19=_0x5d6f52;return VisuMZ[_0x3e3a19(0x373)][_0x3e3a19(0x396)]['BgSettings'][_0x3e3a19(0x21f)];},Scene_ItemCrafting['prototype'][_0x5d6f52(0x332)]=function(){const _0x5963f1=_0x5d6f52,_0x3d41c2={'BgFilename1':VisuMZ[_0x5963f1(0x373)][_0x5963f1(0x396)][_0x5963f1(0x2c5)][_0x5963f1(0x345)],'BgFilename2':VisuMZ[_0x5963f1(0x373)][_0x5963f1(0x396)][_0x5963f1(0x2c5)][_0x5963f1(0x353)]};_0x3d41c2&&(_0x3d41c2[_0x5963f1(0x345)]!==''||_0x3d41c2[_0x5963f1(0x353)]!=='')&&(this[_0x5963f1(0x2c7)]=new Sprite(ImageManager[_0x5963f1(0x38a)](_0x3d41c2['BgFilename1'])),this[_0x5963f1(0x238)]=new Sprite(ImageManager[_0x5963f1(0x2e5)](_0x3d41c2[_0x5963f1(0x353)])),this[_0x5963f1(0x225)](this[_0x5963f1(0x2c7)]),this[_0x5963f1(0x225)](this['_backSprite2']),this[_0x5963f1(0x2c7)][_0x5963f1(0x233)][_0x5963f1(0x1c1)](this[_0x5963f1(0x22f)][_0x5963f1(0x216)](this,this[_0x5963f1(0x2c7)])),this[_0x5963f1(0x238)][_0x5963f1(0x233)][_0x5963f1(0x1c1)](this[_0x5963f1(0x22f)][_0x5963f1(0x216)](this,this[_0x5963f1(0x238)])));},Scene_ItemCrafting['prototype'][_0x5d6f52(0x22f)]=function(_0x183cc2){const _0x208f7b=_0x5d6f52;this[_0x208f7b(0x23c)](_0x183cc2),this['centerSprite'](_0x183cc2);},Scene_ItemCrafting[_0x5d6f52(0x27a)]['startAnimation']=function(){const _0x5086f6=_0x5d6f52;this['_animationPlaying']=!![],this[_0x5086f6(0x1bb)]=0x14,this[_0x5086f6(0x2bd)][_0x5086f6(0x2c9)]=VisuMZ[_0x5086f6(0x373)][_0x5086f6(0x396)][_0x5086f6(0x250)][_0x5086f6(0x265)]||![],this[_0x5086f6(0x2d4)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x2d4)]=function(){const _0x334400=_0x5d6f52;this[_0x334400(0x236)]=new Sprite(),this[_0x334400(0x225)](this[_0x334400(0x236)]),this[_0x334400(0x307)](),this[_0x334400(0x342)](),this[_0x334400(0x300)](),this[_0x334400(0x1c2)](),this[_0x334400(0x20d)](),this['createAnimation'](this['_animationIDs'][_0x334400(0x2ee)]());},Scene_ItemCrafting['prototype']['setItemSpriteBitmap']=function(){const _0x47de9a=_0x5d6f52,_0x29abcd=VisuMZ[_0x47de9a(0x373)][_0x47de9a(0x23b)],_0x28dd1a=this[_0x47de9a(0x2de)]['note'];this['_craftPicture']='';if(_0x28dd1a[_0x47de9a(0x25c)](_0x29abcd[_0x47de9a(0x2f4)]))this['_craftPicture']=String(RegExp['$1']);else _0x28dd1a[_0x47de9a(0x25c)](_0x29abcd[_0x47de9a(0x34f)])&&(this[_0x47de9a(0x2b6)]=String(RegExp['$1']));this[_0x47de9a(0x24e)]=new Sprite();this[_0x47de9a(0x2b6)]?this[_0x47de9a(0x24e)][_0x47de9a(0x233)]=ImageManager[_0x47de9a(0x2a5)](this[_0x47de9a(0x2b6)]):(this[_0x47de9a(0x24e)][_0x47de9a(0x233)]=ImageManager['loadSystem']('IconSet'),this['_iconSprite'][_0x47de9a(0x233)][_0x47de9a(0x2f8)]=![]);this['_iconSprite'][_0x47de9a(0x37b)]['x']=0.5,this[_0x47de9a(0x24e)][_0x47de9a(0x37b)]['y']=0.5;if(!this[_0x47de9a(0x2b6)]){const _0x4a6dc3=VisuMZ[_0x47de9a(0x373)][_0x47de9a(0x396)][_0x47de9a(0x250)][_0x47de9a(0x24b)]||0x8;this['_iconSprite'][_0x47de9a(0x1f5)]['x']=_0x4a6dc3,this[_0x47de9a(0x24e)][_0x47de9a(0x1f5)]['y']=_0x4a6dc3;}this[_0x47de9a(0x236)][_0x47de9a(0x225)](this[_0x47de9a(0x24e)]);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x342)]=function(){const _0x4c39e3=_0x5d6f52;if(this[_0x4c39e3(0x2b6)])return;const _0x1fff7a=this[_0x4c39e3(0x2de)],_0x51231a=_0x1fff7a[_0x4c39e3(0x1d4)],_0x308e42=ImageManager[_0x4c39e3(0x2bb)],_0x47d7c2=ImageManager[_0x4c39e3(0x398)],_0x58d695=_0x51231a%0x10*_0x308e42,_0x3bc7e3=Math[_0x4c39e3(0x321)](_0x51231a/0x10)*_0x47d7c2;this[_0x4c39e3(0x24e)][_0x4c39e3(0x324)](_0x58d695,_0x3bc7e3,_0x308e42,_0x47d7c2);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x300)]=function(){const _0x2cf55b=_0x5d6f52;this['_itemSprite']['x']=Math['round'](Graphics[_0x2cf55b(0x2f9)]/0x2);const _0x8ec033=Math[_0x2cf55b(0x30a)](ImageManager[_0x2cf55b(0x398)]*this[_0x2cf55b(0x236)]['scale']['y']);this['_itemSprite']['y']=Math[_0x2cf55b(0x30a)]((Graphics[_0x2cf55b(0x333)]+_0x8ec033)/0x2);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x1c2)]=function(){const _0x384881=_0x5d6f52;this[_0x384881(0x370)]=VisuMZ[_0x384881(0x373)][_0x384881(0x396)][_0x384881(0x250)]['FadeSpeed']||0x1,this[_0x384881(0x2de)][_0x384881(0x29e)]['match'](VisuMZ['ItemCraftingSys'][_0x384881(0x23b)][_0x384881(0x33b)])&&(this['_itemSpriteOpacitySpeed']=Math[_0x384881(0x1db)](Number(RegExp['$1']),0x1)),this['_itemSprite'][_0x384881(0x1e8)]=0x0;},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x20d)]=function(){const _0xd87c5d=_0x5d6f52;this[_0xd87c5d(0x1d3)]=[],this['_item'][_0xd87c5d(0x29e)][_0xd87c5d(0x25c)](VisuMZ[_0xd87c5d(0x373)][_0xd87c5d(0x23b)]['animationIDs'])?this[_0xd87c5d(0x1d3)]=RegExp['$1'][_0xd87c5d(0x381)](',')[_0xd87c5d(0x36b)](_0x19fa54=>Number(_0x19fa54)):this[_0xd87c5d(0x1d3)]=this['_animationIDs'][_0xd87c5d(0x211)](VisuMZ[_0xd87c5d(0x373)][_0xd87c5d(0x396)][_0xd87c5d(0x250)][_0xd87c5d(0x29c)]);},Scene_ItemCrafting['prototype'][_0x5d6f52(0x341)]=function(_0x16c99a){const _0x4c320a=_0x5d6f52,_0x44a796=$dataAnimations[_0x16c99a];if(!_0x44a796)return;const _0x5b6c05=this['isMVAnimation'](_0x44a796);this['_animationSprite']=new(_0x5b6c05?Sprite_AnimationMV:Sprite_Animation)();const _0x6a97e5=[this[_0x4c320a(0x236)]],_0x519aca=0x0;this[_0x4c320a(0x1ff)][_0x4c320a(0x2e7)](_0x6a97e5,_0x44a796,![],_0x519aca,null),this[_0x4c320a(0x225)](this['_animationSprite']);},Scene_ItemCrafting['prototype'][_0x5d6f52(0x2ca)]=function(_0x17bb65){const _0x22ba34=_0x5d6f52;return!!_0x17bb65[_0x22ba34(0x258)];},Scene_ItemCrafting[_0x5d6f52(0x27a)]['updateCraftingAnimation']=function(){const _0xf53627=_0x5d6f52;if(!this['_animationPlaying'])return;this[_0xf53627(0x32a)](),this['updateAnimationSprite'](),this[_0xf53627(0x251)]()&&this[_0xf53627(0x220)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x32a)]=function(){const _0x3f3f94=_0x5d6f52;this[_0x3f3f94(0x236)][_0x3f3f94(0x1e8)]+=this['_itemSpriteOpacitySpeed'];},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x212)]=function(){const _0x18afc6=_0x5d6f52;if(!this[_0x18afc6(0x1ff)])return;if(this[_0x18afc6(0x1ff)][_0x18afc6(0x2ac)]())return;this[_0x18afc6(0x221)](),this['createAnimation'](this[_0x18afc6(0x1d3)]['shift']());},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x221)]=function(){const _0xeb4820=_0x5d6f52;if(!this[_0xeb4820(0x1ff)])return;this[_0xeb4820(0x2ed)](this[_0xeb4820(0x1ff)]),this[_0xeb4820(0x1ff)][_0xeb4820(0x29d)](),this[_0xeb4820(0x1ff)]=undefined;},Scene_ItemCrafting[_0x5d6f52(0x27a)]['destroyItemSprite']=function(){const _0x1739d4=_0x5d6f52;if(!this[_0x1739d4(0x236)])return;this[_0x1739d4(0x2ed)](this[_0x1739d4(0x236)]),this[_0x1739d4(0x236)][_0x1739d4(0x29d)](),this[_0x1739d4(0x236)]=undefined;},Scene_ItemCrafting['prototype'][_0x5d6f52(0x251)]=function(){const _0x18dbf8=_0x5d6f52;if(TouchInput[_0x18dbf8(0x1c5)]())return!![];if(Input[_0x18dbf8(0x2a9)]('ok'))return!![];if(Input[_0x18dbf8(0x2a9)](_0x18dbf8(0x2b2)))return!![];if(this[_0x18dbf8(0x236)][_0x18dbf8(0x1e8)]<0xff)return![];if(this[_0x18dbf8(0x1ff)])return![];return this[_0x18dbf8(0x1bb)]--<=0x0;},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x220)]=function(){const _0x263c30=_0x5d6f52;this[_0x263c30(0x221)](),this['destroyItemSprite'](),this[_0x263c30(0x25e)](),TouchInput[_0x263c30(0x219)](),Input[_0x263c30(0x219)]();},Scene_ItemCrafting[_0x5d6f52(0x27a)]['terminate']=function(){const _0x43f6ca=_0x5d6f52;Scene_Item[_0x43f6ca(0x27a)]['terminate'][_0x43f6ca(0x240)](this),$gameTemp['clearCustomItemCraftingSettings']();},Scene_ItemCrafting['prototype'][_0x5d6f52(0x347)]=function(){const _0x298d47=_0x5d6f52;if(!SceneManager[_0x298d47(0x1dc)]())return;const _0x3a8b59=VisuMZ[_0x298d47(0x373)][_0x298d47(0x396)][_0x298d47(0x1bf)];_0x3a8b59[_0x298d47(0x217)]&&$gameSwitches['setValue'](_0x3a8b59['SwitchCraft'],![]);},Scene_ItemCrafting[_0x5d6f52(0x27a)][_0x5d6f52(0x316)]=function(){const _0x1d986d=_0x5d6f52;if(!SceneManager[_0x1d986d(0x1dc)]())return;const _0x406d57=VisuMZ[_0x1d986d(0x373)][_0x1d986d(0x396)][_0x1d986d(0x1bf)];_0x406d57[_0x1d986d(0x217)]&&$gameSwitches[_0x1d986d(0x22a)](_0x406d57[_0x1d986d(0x217)],!![]);},VisuMZ['ItemCraftingSys'][_0x5d6f52(0x1f8)]=Window_MenuCommand[_0x5d6f52(0x27a)]['addOriginalCommands'],Window_MenuCommand['prototype'][_0x5d6f52(0x25f)]=function(){const _0x22779b=_0x5d6f52;VisuMZ[_0x22779b(0x373)][_0x22779b(0x1f8)][_0x22779b(0x240)](this),this['addItemCraftingCommand']();},Window_MenuCommand[_0x5d6f52(0x27a)][_0x5d6f52(0x2c4)]=function(){const _0x1b37a5=_0x5d6f52;if(!this['addItemCraftingCommandAutomatically']())return;if(!this['isItemCraftingCommandVisible']())return;const _0x468816=TextManager[_0x1b37a5(0x31f)],_0xf62eee=this[_0x1b37a5(0x351)]();this['addCommand'](_0x468816,_0x1b37a5(0x1b7),_0xf62eee);},Window_MenuCommand['prototype']['addItemCraftingCommandAutomatically']=function(){const _0x22efa0=_0x5d6f52;return Imported[_0x22efa0(0x1e6)]?![]:!![];},Window_MenuCommand[_0x5d6f52(0x27a)][_0x5d6f52(0x31e)]=function(){const _0x1c22a7=_0x5d6f52;return $gameSystem[_0x1c22a7(0x340)]();},Window_MenuCommand[_0x5d6f52(0x27a)]['isItemCraftingCommandEnabled']=function(){const _0x3bdd62=_0x5d6f52;if(DataManager['currentCraftableItems']()[_0x3bdd62(0x2e0)]<=0x0)return![];return $gameSystem[_0x3bdd62(0x26c)]();},VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x2d6)]=Window_ItemCategory[_0x5d6f52(0x27a)][_0x5d6f52(0x281)],Window_ItemCategory[_0x5d6f52(0x27a)][_0x5d6f52(0x281)]=function(){const _0x4e4704=_0x5d6f52;VisuMZ[_0x4e4704(0x373)][_0x4e4704(0x2d6)][_0x4e4704(0x240)](this),SceneManager['isSceneItemCrafting']()&&this[_0x4e4704(0x26b)]();},Window_ItemCategory[_0x5d6f52(0x27a)][_0x5d6f52(0x26b)]=function(){const _0x5daf46=_0x5d6f52,_0x335f4b=Window_ItemCategory[_0x5daf46(0x30d)],_0x561e04=DataManager[_0x5daf46(0x266)]()[_0x5daf46(0x21c)](),_0x5be247=[];for(const _0x587d18 of _0x335f4b){this['_category']=_0x587d18['Type'];for(const _0x3d0f11 of _0x561e04){Window_ItemList[_0x5daf46(0x27a)][_0x5daf46(0x2b3)][_0x5daf46(0x240)](this,_0x3d0f11)&&_0x5be247[_0x5daf46(0x315)](_0x3d0f11);}}this['_category']=null;for(const _0x433cc4 of _0x5be247){_0x561e04['remove'](_0x433cc4);}_0x561e04[_0x5daf46(0x2e0)]>0x0&&this[_0x5daf46(0x2cd)](),this['_nonCategoryItemCraftingItems']=_0x561e04;},Window_ItemCategory[_0x5d6f52(0x27a)][_0x5d6f52(0x2cd)]=function(){const _0x43c54e=_0x5d6f52,_0x516012=VisuMZ[_0x43c54e(0x373)][_0x43c54e(0x396)][_0x43c54e(0x1bf)];let _0x1f188f=_0x516012[_0x43c54e(0x226)]||_0x43c54e(0x226),_0x580643=_0x516012['NoCategoryIcon']||0xa0;_0x1f188f=_0x43c54e(0x291)[_0x43c54e(0x39b)](_0x580643,_0x1f188f),this[_0x43c54e(0x358)](_0x1f188f,_0x43c54e(0x278),!![],_0x43c54e(0x2bc));},VisuMZ['ItemCraftingSys']['Window_ItemCategory_addItemCategory']=Window_ItemCategory[_0x5d6f52(0x27a)][_0x5d6f52(0x35d)],Window_ItemCategory[_0x5d6f52(0x27a)]['addItemCategory']=function(_0x10ed94){const _0x2a2dac=_0x5d6f52;if(SceneManager[_0x2a2dac(0x1dc)]()&&!this[_0x2a2dac(0x1c6)](_0x10ed94))return;VisuMZ[_0x2a2dac(0x373)][_0x2a2dac(0x33e)][_0x2a2dac(0x240)](this,_0x10ed94);},Window_ItemCategory[_0x5d6f52(0x27a)][_0x5d6f52(0x1c6)]=function(_0x2aec9c){const _0x396756=_0x5d6f52,_0x35f147=DataManager[_0x396756(0x266)](),_0x14536b=_0x2aec9c['Type'],_0x3b79bd=_0x2aec9c[_0x396756(0x367)];this[_0x396756(0x369)]=_0x14536b;for(const _0x5e2588 of _0x35f147){if(!_0x5e2588)continue;if(Window_ItemList[_0x396756(0x27a)]['includes'][_0x396756(0x240)](this,_0x5e2588))return this['_category']=null,!![];}return this[_0x396756(0x369)]=null,![];},VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x1e5)]=Window_ItemCategory[_0x5d6f52(0x27a)][_0x5d6f52(0x234)],Window_ItemCategory[_0x5d6f52(0x27a)][_0x5d6f52(0x234)]=function(){const _0x12d640=_0x5d6f52;if(SceneManager[_0x12d640(0x1dc)]())return!![];return VisuMZ[_0x12d640(0x373)][_0x12d640(0x1e5)]['call'](this);};function Window_ItemCraftingList(){const _0x5bf425=_0x5d6f52;this[_0x5bf425(0x20f)](...arguments);}Window_ItemCraftingList['prototype']=Object[_0x5d6f52(0x28d)](Window_ItemList[_0x5d6f52(0x27a)]),Window_ItemCraftingList['prototype'][_0x5d6f52(0x362)]=Window_ItemCraftingList,Window_ItemCraftingList[_0x5d6f52(0x2a2)]=VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)][_0x5d6f52(0x34e)][_0x5d6f52(0x279)],Window_ItemCraftingList[_0x5d6f52(0x203)]=VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)][_0x5d6f52(0x39d)]['MaskItalics'],Window_ItemCraftingList[_0x5d6f52(0x27a)]['initialize']=function(_0x10e046){const _0xb5c74d=_0x5d6f52;Window_ItemList[_0xb5c74d(0x27a)][_0xb5c74d(0x20f)][_0xb5c74d(0x240)](this,_0x10e046),this[_0xb5c74d(0x2fd)]();},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x394)]=function(){return 0x1;},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x30c)]=function(){const _0x568876=_0x5d6f52;return Window_Scrollable[_0x568876(0x27a)][_0x568876(0x30c)]['call'](this)*0x3+0x8;},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x271)]=function(_0x160a37){return!![];},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x1d1)]=function(){const _0x2a24f7=_0x5d6f52;this[_0x2a24f7(0x201)]=DataManager['currentCraftableItems']()[_0x2a24f7(0x372)](_0xb1851e=>this[_0x2a24f7(0x2b3)](_0xb1851e));const _0x3a4514=this[_0x2a24f7(0x201)][_0x2a24f7(0x36b)](_0xba0daa=>DataManager[_0x2a24f7(0x37a)](_0xba0daa)[_0x2a24f7(0x2e0)]);this['_maxIngredientsSize']=Math['max'](..._0x3a4514)+0x1;},Window_ItemCraftingList['prototype']['includes']=function(_0x3b7aea){const _0x626b0=_0x5d6f52;if(this['_category']==='ItemCraftingNoCategory'){const _0x29f1a4=SceneManager[_0x626b0(0x273)];if(_0x29f1a4&&_0x29f1a4['_categoryWindow']&&_0x29f1a4[_0x626b0(0x20c)][_0x626b0(0x202)])return _0x29f1a4[_0x626b0(0x20c)][_0x626b0(0x202)][_0x626b0(0x2b3)](_0x3b7aea);}return Window_ItemList[_0x626b0(0x27a)]['includes'][_0x626b0(0x240)](this,_0x3b7aea);},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x209)]=function(){},Window_ItemCraftingList['prototype'][_0x5d6f52(0x349)]=function(_0x4ab9a1){const _0x2ca7b1=_0x5d6f52,_0x4380aa=this[_0x2ca7b1(0x22b)](_0x4ab9a1);if(!_0x4380aa)return;const _0x1edbd0=this['itemRectWithPadding'](_0x4ab9a1);this[_0x2ca7b1(0x249)](),this['drawFadedItemBackground'](_0x1edbd0,0x2),this[_0x2ca7b1(0x326)](_0x4ab9a1,_0x4380aa,_0x1edbd0),this[_0x2ca7b1(0x387)](_0x4380aa,_0x1edbd0),this[_0x2ca7b1(0x2a3)](_0x4380aa,_0x1edbd0),this[_0x2ca7b1(0x2cb)](_0x4380aa,_0x1edbd0);},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x2e2)]=function(_0x5d7367,_0x50ab2a){const _0x4b6565=_0x5d6f52;_0x50ab2a=_0x50ab2a||0x1,this[_0x4b6565(0x36a)](![]);const _0x491cc7=ColorManager[_0x4b6565(0x1b8)](),_0x5a60f8=ColorManager['dimColor2'](),_0x5bab7a=_0x5d7367[_0x4b6565(0x2f9)]/0x2,_0x2439ec=this['lineHeight']();while(_0x50ab2a--){this['contents']['gradientFillRect'](_0x5d7367['x'],_0x5d7367['y'],_0x5bab7a,_0x2439ec,_0x5a60f8,_0x491cc7),this['contents'][_0x4b6565(0x1c7)](_0x5d7367['x']+_0x5bab7a,_0x5d7367['y'],_0x5bab7a,_0x2439ec,_0x491cc7,_0x5a60f8);}this[_0x4b6565(0x36a)](!![]);},Window_Base[_0x5d6f52(0x27a)]['drawCraftingItemName']=function(_0xefde73,_0xa72278){const _0x97888e=_0x5d6f52;let _0x143fdc=_0xefde73[_0x97888e(0x364)],_0x6695fb=_0xa72278[_0x97888e(0x333)]+this['itemPadding']()*0x2,_0x133a62=_0xa72278['y'],_0x2fef83=_0xa72278[_0x97888e(0x2f9)]-_0x6695fb-this['itemPadding']()-ImageManager[_0x97888e(0x2bb)];DataManager[_0x97888e(0x27f)](_0xefde73)&&(_0x143fdc=VisuMZ[_0x97888e(0x373)][_0x97888e(0x2ab)](_0xefde73),this[_0x97888e(0x1dd)]['fontItalic']=Window_ItemCraftingList['maskItalics']),this[_0x97888e(0x1c9)](_0x143fdc,_0x6695fb,_0x133a62,_0x2fef83,_0x97888e(0x1cf)),this['contents'][_0x97888e(0x1d0)]=![];},VisuMZ['ItemCraftingSys'][_0x5d6f52(0x2ab)]=function(_0x34b82b){const _0x4fdf2b=_0x5d6f52;DataManager[_0x4fdf2b(0x1ca)]&&(_0x34b82b=DataManager[_0x4fdf2b(0x1ca)](_0x34b82b));if(_0x34b82b[_0x4fdf2b(0x29e)][_0x4fdf2b(0x25c)](VisuMZ[_0x4fdf2b(0x373)]['RegExp'][_0x4fdf2b(0x1fc)]))return String(RegExp['$1']);else{const _0x382cf5=TextManager[_0x4fdf2b(0x32e)];return Array(_0x34b82b[_0x4fdf2b(0x364)][_0x4fdf2b(0x2e0)]+0x1)['join'](_0x382cf5);}},Window_ItemCraftingList['prototype'][_0x5d6f52(0x326)]=function(_0x4befc8,_0xc926a6,_0x3869ab){const _0x38d816=_0x5d6f52,_0x11697b=VisuMZ[_0x38d816(0x373)][_0x38d816(0x23b)],_0xb1c422=_0xc926a6[_0x38d816(0x29e)];let _0x44ebcc='';if(_0xb1c422['match'](_0x11697b[_0x38d816(0x2f4)]))_0x44ebcc=String(RegExp['$1']);else _0xb1c422[_0x38d816(0x25c)](_0x11697b[_0x38d816(0x34f)])&&(_0x44ebcc=String(RegExp['$1']));if(_0x44ebcc){const _0x264818=ImageManager['loadPicture'](_0x44ebcc);_0x264818[_0x38d816(0x1c1)](this['drawPicture'][_0x38d816(0x216)](this,_0x4befc8,_0x264818));}else this[_0x38d816(0x2a1)](_0xc926a6,_0x3869ab);},Window_ItemCraftingList['prototype'][_0x5d6f52(0x35c)]=function(_0x383890,_0x1f45f7){const _0x100256=_0x5d6f52,_0x155a39=this[_0x100256(0x3a2)](_0x383890);let _0x20c456=_0x155a39['x']+this[_0x100256(0x1df)](),_0x4e8032=_0x155a39['y']+0x4,_0x4833f4=_0x155a39[_0x100256(0x2f9)]-this[_0x100256(0x1df)]()*0x2,_0x2c9675=_0x155a39[_0x100256(0x333)]-0x8,_0x4f3b85=Math[_0x100256(0x322)](_0x4833f4,_0x2c9675);const _0xb9254c=_0x4f3b85/_0x1f45f7[_0x100256(0x2f9)],_0x4e3e82=_0x4f3b85/_0x1f45f7['height'],_0x2e84f7=Math[_0x100256(0x322)](_0xb9254c,_0x4e3e82,0x1);let _0x3e873b=Math['round'](_0x1f45f7['width']*_0x2e84f7),_0x5af9cd=Math[_0x100256(0x30a)](_0x1f45f7[_0x100256(0x333)]*_0x2e84f7);_0x20c456+=Math[_0x100256(0x30a)]((_0x4f3b85-_0x3e873b)/0x2),_0x4e8032+=Math[_0x100256(0x30a)]((_0x4f3b85-_0x5af9cd)/0x2);const _0x31f766=_0x1f45f7['width'],_0x515ca2=_0x1f45f7[_0x100256(0x333)];this[_0x100256(0x1dd)]['_context']['imageSmoothingEnabled']=!![],this[_0x100256(0x1dd)][_0x100256(0x34b)](_0x1f45f7,0x0,0x0,_0x31f766,_0x515ca2,_0x20c456,_0x4e8032,_0x3e873b,_0x5af9cd),this[_0x100256(0x1dd)]['_context'][_0x100256(0x392)]=!![];},Window_ItemCraftingList[_0x5d6f52(0x27a)]['drawBigItemIcon']=function(_0x899a50,_0x7b0aa8){const _0x1e334f=_0x5d6f52,_0xa3bffa=_0x899a50[_0x1e334f(0x1d4)];let _0x1af68e=_0x7b0aa8['x']+this[_0x1e334f(0x1df)](),_0x28f3ab=_0x7b0aa8['y']+0x4,_0x5005f5=_0x7b0aa8[_0x1e334f(0x2f9)]-this[_0x1e334f(0x1df)]()*0x2,_0x2829cf=_0x7b0aa8[_0x1e334f(0x333)]-0x8,_0x42ccc4=Math['min'](_0x5005f5,_0x2829cf);_0x42ccc4=Math[_0x1e334f(0x321)](_0x42ccc4/ImageManager[_0x1e334f(0x2bb)])*ImageManager[_0x1e334f(0x2bb)],_0x28f3ab+=(_0x2829cf-_0x42ccc4)/0x2;const _0xd8f6ec=ImageManager['loadSystem']('IconSet'),_0x224fa7=ImageManager[_0x1e334f(0x2bb)],_0xfc8d33=ImageManager[_0x1e334f(0x398)],_0x112f41=_0xa3bffa%0x10*_0x224fa7,_0x20241d=Math[_0x1e334f(0x321)](_0xa3bffa/0x10)*_0xfc8d33;this[_0x1e334f(0x1dd)]['_context']['imageSmoothingEnabled']=![],this[_0x1e334f(0x1dd)][_0x1e334f(0x34b)](_0xd8f6ec,_0x112f41,_0x20241d,_0x224fa7,_0xfc8d33,_0x1af68e,_0x28f3ab,_0x42ccc4,_0x42ccc4),this['contents'][_0x1e334f(0x275)][_0x1e334f(0x392)]=!![];},Window_ItemCraftingList['prototype'][_0x5d6f52(0x387)]=function(_0x2d12e5,_0x56346e){const _0x52fc59=_0x5d6f52;if(!$gameSystem[_0x52fc59(0x303)](_0x2d12e5))return;const _0x69806f=ImageManager[_0x52fc59(0x1f4)];let _0x15dad0=_0x56346e['x']+_0x56346e[_0x52fc59(0x2f9)]-ImageManager['iconWidth'],_0x3cbf8a=_0x56346e['y']+0x2;this[_0x52fc59(0x380)](_0x69806f,_0x15dad0,_0x3cbf8a);},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x2cb)]=function(_0x388b30,_0x5d8d58){const _0x2af590=_0x5d6f52,_0xf19284=DataManager['getCraftingIngredients'](_0x388b30);let _0x4259c0=_0x5d8d58['height']+this[_0x2af590(0x1df)]()*0x2,_0x3bd691=_0x5d8d58['y']+Math[_0x2af590(0x30a)](this[_0x2af590(0x2f2)]()*1.2),_0x4dd200=_0x5d8d58[_0x2af590(0x2f9)]-_0x4259c0-this[_0x2af590(0x1df)](),_0x5f05ee=Math[_0x2af590(0x321)](_0x4dd200/this[_0x2af590(0x1bd)]),_0x4e4839=!![];for(const _0x255480 of _0xf19284){if(!_0x4e4839){let _0x3200c5=TextManager['itemCraftingIngredientsBridge'],_0x2a83a1=_0x5d8d58['y']+(_0x5d8d58['height']-this['lineHeight']()*1.5);this[_0x2af590(0x1c9)](_0x3200c5,_0x4259c0,_0x2a83a1,_0x5f05ee,_0x2af590(0x355));}_0x4259c0+=_0x5f05ee;const _0x272ace=_0x255480[0x0],_0x55b59c=_0x255480[0x1],_0x233c46=_0x272ace===_0x2af590(0x257)?$gameParty[_0x2af590(0x257)]():$gameParty['numItems'](_0x272ace);if(_0x272ace===_0x2af590(0x257))this[_0x2af590(0x36f)](_0x55b59c,_0x233c46,_0x4259c0,_0x3bd691,_0x5f05ee);else typeof _0x272ace===_0x2af590(0x270)&&_0x272ace['match'](/CATEGORY/i)?this[_0x2af590(0x314)](_0x272ace,_0x55b59c,_0x4259c0,_0x3bd691,_0x5f05ee):this[_0x2af590(0x368)](_0x272ace,_0x55b59c,_0x233c46,_0x4259c0,_0x3bd691,_0x5f05ee);this[_0x2af590(0x249)](),_0x4e4839=![];}},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x36f)]=function(_0x729eaa,_0x1ad3fc,_0x52bd29,_0x4f3fef,_0x66e322){const _0x1f8590=_0x5d6f52;if(Imported['VisuMZ_0_CoreEngine']){let _0x14092b=_0x52bd29-Math[_0x1f8590(0x30a)](ImageManager[_0x1f8590(0x2bb)]/0x2),_0xdc9eb3=_0x4f3fef+Math[_0x1f8590(0x30a)]((this[_0x1f8590(0x2f2)]()-ImageManager['iconHeight'])/0x2);const _0x2b59f7=VisuMZ['CoreEngine']?VisuMZ[_0x1f8590(0x304)]['Settings'][_0x1f8590(0x292)]['GoldIcon']:0x0;this[_0x1f8590(0x380)](_0x2b59f7,_0x14092b,_0xdc9eb3);}else{let _0xbb617=_0x52bd29-Math[_0x1f8590(0x30a)](_0x66e322/0x2),_0x2d9a94=_0x4f3fef+Math[_0x1f8590(0x30a)]((this['lineHeight']()-ImageManager[_0x1f8590(0x398)])/0x2);this[_0x1f8590(0x2c0)](ColorManager[_0x1f8590(0x2b0)]()),this['makeFontBigger'](),this[_0x1f8590(0x1c9)](TextManager[_0x1f8590(0x1fa)],_0xbb617,_0x2d9a94,_0x66e322,_0x1f8590(0x355)),this['resetFontSettings']();}let _0x305392=_0x52bd29-Math[_0x1f8590(0x30a)](_0x66e322/0x2),_0xf4fc26=_0x4f3fef+this['lineHeight']();const _0x45470a=VisuMZ[_0x1f8590(0x389)]['Settings'][_0x1f8590(0x32b)][_0x1f8590(0x36e)];let _0x2f4f51=_0x45470a[_0x1f8590(0x39b)](_0x729eaa);_0x729eaa>_0x1ad3fc&&this['changeTextColor'](ColorManager['powerDownColor']()),this[_0x1f8590(0x1dd)]['fontSize']=Window_ItemCraftingList[_0x1f8590(0x2a2)],this[_0x1f8590(0x1c9)](_0x2f4f51,_0x305392,_0xf4fc26,_0x66e322,_0x1f8590(0x355));},Window_ItemCraftingList['prototype'][_0x5d6f52(0x314)]=function(_0x43269e,_0x512c14,_0x404a92,_0x406375,_0x5e3096){const _0x9e03e3=_0x5d6f52,_0x1c5e0a=VisuMZ[_0x9e03e3(0x373)][_0x9e03e3(0x396)][_0x9e03e3(0x1bf)];let _0x3e7b30=_0x404a92-Math['round'](ImageManager[_0x9e03e3(0x2bb)]/0x2),_0x21c27b=_0x406375+Math[_0x9e03e3(0x30a)]((this[_0x9e03e3(0x2f2)]()-ImageManager[_0x9e03e3(0x398)])/0x2);this['drawIcon'](_0x1c5e0a[_0x9e03e3(0x2df)],_0x3e7b30,_0x21c27b),_0x43269e['match'](/CATEGORY: (.*)/i);const _0x3a8320=String(RegExp['$1'])[_0x9e03e3(0x204)]();let _0x2ddad8=_0x404a92-Math[_0x9e03e3(0x30a)](_0x5e3096/0x2),_0x2fcde5=_0x406375;this['contents'][_0x9e03e3(0x2a6)]=Window_ItemCraftingList[_0x9e03e3(0x2a2)],this[_0x9e03e3(0x1c9)](_0x3a8320,_0x2ddad8,_0x2fcde5,_0x5e3096,'center');let _0xa4fd5a=_0x404a92-Math[_0x9e03e3(0x30a)](_0x5e3096/0x2),_0x59dbb7=_0x406375+this[_0x9e03e3(0x2f2)]();const _0x5e4781=VisuMZ['ItemsEquipsCore'][_0x9e03e3(0x396)][_0x9e03e3(0x32b)][_0x9e03e3(0x36e)];let _0x3559aa=_0x5e4781[_0x9e03e3(0x39b)](_0x512c14);this[_0x9e03e3(0x1dd)][_0x9e03e3(0x2a6)]=Window_ItemCraftingList[_0x9e03e3(0x2a2)],this[_0x9e03e3(0x1c9)](_0x3559aa,_0xa4fd5a,_0x59dbb7,_0x5e3096,_0x9e03e3(0x355));},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x368)]=function(_0x3176db,_0x461a82,_0x122860,_0x1917aa,_0x5a53dd,_0xcea7f1){const _0x4fac04=_0x5d6f52;let _0x514902=_0x1917aa-Math[_0x4fac04(0x30a)](ImageManager['iconWidth']/0x2),_0x42a9ce=_0x5a53dd+Math[_0x4fac04(0x30a)]((this['lineHeight']()-ImageManager[_0x4fac04(0x398)])/0x2);this[_0x4fac04(0x380)](_0x3176db[_0x4fac04(0x1d4)],_0x514902,_0x42a9ce);let _0x245ee7=_0x1917aa-Math[_0x4fac04(0x30a)](_0xcea7f1/0x2),_0x3ac751=_0x5a53dd+this[_0x4fac04(0x2f2)]();const _0x253c2a=VisuMZ[_0x4fac04(0x389)][_0x4fac04(0x396)]['ItemScene'][_0x4fac04(0x36e)];let _0x28b7d4=_0x253c2a[_0x4fac04(0x39b)](_0x4fac04(0x31b)['format'](_0x122860,_0x461a82));_0x461a82>_0x122860&&this[_0x4fac04(0x2c0)](ColorManager[_0x4fac04(0x323)]()),this[_0x4fac04(0x1dd)]['fontSize']=Window_ItemCraftingList[_0x4fac04(0x2a2)],this[_0x4fac04(0x1c9)](_0x28b7d4,_0x245ee7,_0x3ac751,_0xcea7f1,_0x4fac04(0x355));},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x2fd)]=function(){const _0x130cba=_0x5d6f52;if(!VisuMZ[_0x130cba(0x373)][_0x130cba(0x396)]['Window'][_0x130cba(0x2b9)])return;const _0x508ae8=new Rectangle(0x0,0x0,Graphics[_0x130cba(0x32d)],Window_Base[_0x130cba(0x27a)][_0x130cba(0x1ed)](0x1));this[_0x130cba(0x2ea)]=new Window_ItemCraftingTooltip(_0x508ae8),this[_0x130cba(0x225)](this['_tooltipWindow']);},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x25d)]=function(){const _0x1ee7c0=_0x5d6f52;Window_ItemList[_0x1ee7c0(0x27a)][_0x1ee7c0(0x25d)][_0x1ee7c0(0x240)](this),this['updateTooltipWindow']();},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x29a)]=function(){const _0x2d2caf=_0x5d6f52;if(!this[_0x2d2caf(0x2ea)])return;this[_0x2d2caf(0x2c1)]()?this['setTooltipWindowText']():this['_tooltipWindow'][_0x2d2caf(0x1ee)]('');const _0xac9c0e=new Point(TouchInput['x'],TouchInput['y']),_0x4b224a=this['worldTransform'][_0x2d2caf(0x35e)](_0xac9c0e);this[_0x2d2caf(0x2ea)]['x']=_0x4b224a['x']-this[_0x2d2caf(0x2ea)][_0x2d2caf(0x2f9)]/0x2,this[_0x2d2caf(0x2ea)]['y']=_0x4b224a['y']-this['_tooltipWindow'][_0x2d2caf(0x333)];},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x2c1)]=function(){const _0x30b55e=_0x5d6f52;if(!this[_0x30b55e(0x2d3)])return![];if(!this[_0x30b55e(0x229)]())return![];if(!this[_0x30b55e(0x227)]())return![];if(this['hitIndex']()!==this[_0x30b55e(0x284)]())return![];return!![];},Window_ItemCraftingList[_0x5d6f52(0x27a)][_0x5d6f52(0x2d8)]=function(){const _0x8d6523=_0x5d6f52,_0x364b66=this[_0x8d6523(0x3a2)](this['index']());$gameTemp['_bypassProxy']=!![];const _0x41d915=DataManager[_0x8d6523(0x37a)](this[_0x8d6523(0x229)]());$gameTemp[_0x8d6523(0x1d6)]=![];const _0x4c871a=new Point(TouchInput['x'],TouchInput['y']),_0xb06c6=this['worldTransform'][_0x8d6523(0x35e)](_0x4c871a);let _0x376160=_0x364b66[_0x8d6523(0x333)]+this['itemPadding']()*0x2,_0x500150=_0x364b66['y']+this[_0x8d6523(0x2f2)](),_0x43ea11=_0x364b66[_0x8d6523(0x2f9)]-_0x376160-this[_0x8d6523(0x1df)](),_0x5a4cae=Math[_0x8d6523(0x321)](_0x43ea11/this[_0x8d6523(0x1bd)]);for(const _0xe59bb4 of _0x41d915){_0x376160+=_0x5a4cae;const _0x46301c=new Rectangle(_0x376160-ImageManager['iconWidth'],0x0,ImageManager[_0x8d6523(0x2bb)]*0x2,Graphics[_0x8d6523(0x1c0)]);if(_0x46301c[_0x8d6523(0x30f)](_0xb06c6['x'],_0xb06c6['y'])){let _0x657606=_0xe59bb4[0x0],_0x1db54d='';if(_0x657606===_0x8d6523(0x257))_0x1db54d=TextManager['currencyUnit'];else typeof _0x657606===_0x8d6523(0x270)&&_0x657606[_0x8d6523(0x25c)](/CATEGORY/i)?(_0x657606[_0x8d6523(0x25c)](/CATEGORY: (.*)/i),_0x1db54d=String(RegExp['$1'])[_0x8d6523(0x204)]()):_0x1db54d=_0x657606[_0x8d6523(0x364)];this[_0x8d6523(0x2ea)][_0x8d6523(0x1ee)](_0x1db54d[_0x8d6523(0x204)]());return;}}this['_tooltipWindow'][_0x8d6523(0x1ee)]('');},Window_ItemCraftingList[_0x5d6f52(0x27a)]['updateHelp']=function(){const _0x5418d0=_0x5d6f52,_0xe88358=this['item']()&&DataManager[_0x5418d0(0x27f)](this['item']())?null:this[_0x5418d0(0x229)]();this[_0x5418d0(0x1ce)](_0xe88358),this[_0x5418d0(0x223)]&&this['_statusWindow'][_0x5418d0(0x362)]===Window_ShopStatus&&this['_statusWindow'][_0x5418d0(0x339)](_0xe88358);};function Window_ItemCraftingTooltip(){const _0x3332c0=_0x5d6f52;this[_0x3332c0(0x20f)](...arguments);}Window_ItemCraftingTooltip[_0x5d6f52(0x27a)]=Object[_0x5d6f52(0x28d)](Window_Base['prototype']),Window_ItemCraftingTooltip[_0x5d6f52(0x27a)][_0x5d6f52(0x362)]=Window_ItemCraftingTooltip,Window_ItemCraftingTooltip[_0x5d6f52(0x357)]=VisuMZ[_0x5d6f52(0x373)][_0x5d6f52(0x396)][_0x5d6f52(0x34e)][_0x5d6f52(0x364)],Window_ItemCraftingTooltip[_0x5d6f52(0x27a)]['initialize']=function(_0x5e66df){const _0x30f4fa=_0x5d6f52;Window_Base[_0x30f4fa(0x27a)][_0x30f4fa(0x20f)]['call'](this,_0x5e66df),this[_0x30f4fa(0x34d)](this['hasCustomWindowSkin']()?0x0:0x2),this[_0x30f4fa(0x1ee)]('');},Window_ItemCraftingTooltip[_0x5d6f52(0x27a)][_0x5d6f52(0x2e8)]=function(){const _0x502509=_0x5d6f52;return Window_ItemCraftingTooltip[_0x502509(0x357)]!=='';},Window_ItemCraftingTooltip[_0x5d6f52(0x27a)]['loadWindowskin']=function(){const _0x66d8b4=_0x5d6f52;Window_ItemCraftingTooltip[_0x66d8b4(0x357)]!==''?this['windowskin']=ImageManager[_0x66d8b4(0x1fe)](Window_ItemCraftingTooltip['tooltipSkin']):Window_Base[_0x66d8b4(0x27a)][_0x66d8b4(0x247)][_0x66d8b4(0x240)](this);},Window_ItemCraftingTooltip[_0x5d6f52(0x27a)][_0x5d6f52(0x1ee)]=function(_0x4129d0){const _0x1da001=_0x5d6f52;this[_0x1da001(0x245)]!==_0x4129d0&&(this['_text']=_0x4129d0,this['refresh']());},Window_ItemCraftingTooltip[_0x5d6f52(0x27a)]['clear']=function(){const _0x4e4e07=_0x5d6f52;this[_0x4e4e07(0x1ee)]('');},Window_ItemCraftingTooltip[_0x5d6f52(0x27a)][_0x5d6f52(0x339)]=function(_0x4b80e5){const _0x115527=_0x5d6f52;this[_0x115527(0x1ee)](_0x4b80e5?_0x4b80e5[_0x115527(0x364)]:'');},Window_ItemCraftingTooltip[_0x5d6f52(0x27a)]['refresh']=function(){const _0x4957cb=_0x5d6f52,_0x299309=this[_0x4957cb(0x213)]();this[_0x4957cb(0x1eb)](),this['drawText'](this[_0x4957cb(0x245)],0x0,0x0,this[_0x4957cb(0x318)],_0x4957cb(0x355));},Window_ItemCraftingTooltip[_0x5d6f52(0x27a)][_0x5d6f52(0x1eb)]=function(){const _0x37a469=_0x5d6f52;if(this[_0x37a469(0x245)]==='')this['contents'][_0x37a469(0x219)](),this['width']=0x0;else{let _0x4c9206=this['textWidth'](this[_0x37a469(0x245)])+this[_0x37a469(0x1df)]()*0x4;this['width']=_0x4c9206+$gameSystem[_0x37a469(0x2da)]()*0x2,this[_0x37a469(0x20a)]();if(this['hasCustomWindowSkin']())return;const _0x24c975=ColorManager[_0x37a469(0x1b8)]();this[_0x37a469(0x1dd)][_0x37a469(0x384)](0x0,0x0,this['innerWidth'],this[_0x37a469(0x29b)],_0x24c975);}};function Window_ItemCraftingNumber(){this['initialize'](...arguments);}function _0x412f(){const _0x4bad5a=['Animation','isFinishedAnimating','Items','textWidth','onDatabaseLoaded','ARRAYSTR','ARRAYJSON','gold','frames','selectedIngredientList','EnableMainMenu','SelectedColor','match','update','finishAnimation','addOriginalCommands','setupNumberWindow','totalPriceY','determineMax','getBackgroundOpacity','_itemWindow','ShowWindows','currentCraftableItems','createIngredientSelectionTitle','_allCraftableItems','Scene_Boot_onDatabaseLoaded','textColor','createUncategorizedItemCategory','isMainMenuItemCraftingEnabled','Armors','checkItemCraftingResultsValid','hide','string','isEnabled','process_VisuMZ_ItemCraftingSys_JS_TraitObject_Notetags','_scene','Sound','_context','IngredientBridge','isShowNew','category','ReqQuantityFontSize','prototype','Ingredients','AnySwitches','16653cLuIVT','setMainMenuItemCraftingVisible','isCraftingItemMasked','CustomItemCraftingSceneOpen','makeCommandList','statusWindowRect','onNumberOk','index','_animationPlaying','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_ingredientCategories','parse','drawItemName','_allCraftableArmors','isCraftItemListed','jsGlobalListing','create','owned','toUpperCase','net','\x5cI[%1]%2','Gold','buttonAssistCategory','weapons','enabled','setClickHandler','createItemWindowBase','Parse_Notetags_CreateJS','refreshCursor','updateTooltipWindow','innerHeight','Animations','destroy','note','buttonAssistItemListRequirement','isWeapon','drawBigItemIcon','quantityFontSize','drawCraftingItemName','BypassSwitches','loadPicture','fontSize','_ItemCrafting_MainMenu','helpWindowRect','isTriggered','playItemCrafting','maskItemName','isPlaying','maxItems','_helpWindow','ParseArmorNotetags','systemColor','down','cancel','includes','gainItem','craftableWeapons','_craftPicture','callUpdateHelp','numItems','ToolTips','IngredientList','iconWidth','ItemCraftingNoCategory','_windowLayer','\x20=\x20','setHelpWindow','changeTextColor','tooltipFrameCheckRequirements','createCraftingItemKey','drawHorzLine','addItemCraftingCommand','BgSettings','_ingredientIndex','_backSprite1','itemCraftingIngredientsBridge','visible','isMVAnimation','drawCraftingIngredients','updateCraftingAnimation','addUncategorizedItemCategory','_amount','clearUserSelectedIngredients','exit','Change','goldWindowRect','active','createItemSprite','setupSelectIngredientWindow','Window_ItemCategory_makeCommandList','changeOkButtonEnable','setTooltipWindowText','_customItemCraftingSettings','windowPadding','createJS','visualGoldDisplayAutosize','3710nwtdQZ','_item','CategoryIcon','length','\x20+\x20','drawFadedItemBackground','buttonAssistKey1','all','loadTitle2','updateHelp','setup','hasCustomWindowSkin','drawIngredients','_tooltipWindow','StatusBgType','TurnSwitches','removeChild','shift','addWindow','description','ParseItemNotetags','lineHeight','_allCraftableWeapons','craftPicture','registerCommand','parseCraftingIngredientsData','buttonAssistKey2','smooth','width','onItemCrafted','CategoryBgType','createItemWindow','createTooltipWindow','%1%2','craftableArmors','setItemSpritePosition','getItemCraftedTimes','VisuMZ_1_ItemsEquipsCore','isItemCrafted','CoreEngine','helpWindowRectItemsEquipsCore','Show','setItemSpriteBitmap','getItemIdWithName','items','round','activate','itemHeight','categoryList','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20item\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20number\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','contains','createNumberWindow','category:\x20%1','_alreadySelected','setHandler','drawIngredientCategory','push','enableCraftingSwitches','itemCraftingNumberWindowOk','innerWidth','process_VisuMZ_ItemCraftingSys_Notetags','createBackground','%1/%2','doesItemHaveOpenCategories','drawGoldIngredient','isItemCraftingCommandVisible','ItemCraftingMenuCommand','buttonAssistText1','floor','min','powerDownColor','setFrame','allCraftableArmors','drawBigItemImage','ConvertParams','createCommandWindow','itemWindowRect','updateItemSpriteOpacity','ItemScene','_ingredientSelectList','boxWidth','itemCraftingMask','_weaponIDs','isUseModernControls','show','createCustomBackgroundImages','height','itemLineRect','setItemWindow','_ingredientSelectTitle','ceil','ShopScene','setItem','_ingredientAmounts','opacitySpeed','ShowMainMenu','5epnbup','Window_ItemCategory_addItemCategory','onIngredientListOk','isMainMenuItemCraftingVisible','createAnimation','setItemSpriteFrame','createGoldWindow','shown','BgFilename1','cursorWidth','resetCraftingSwitches','ParseAllNotetags','drawItem','value','blt','categories','setBackgroundType','Window','bigPicture','_craftingIngredients','isItemCraftingCommandEnabled','ItemCraftingNumberWindow','BgFilename2','playStaticSe','center','8tEMtcu','tooltipSkin','addCommand','STR','jsGlobalCraftEffect','isPlaytest','drawPicture','addItemCategory','applyInverse','categoryWindowRect','Scene_Menu_createCommandWindow','setMainMenuItemCraftingEnabled','constructor','ARRAYSTRUCT','name','IngredientTitle','status','Icon','drawIngredientItem','_category','changePaintOpacity','map','CheckAllSwitches','NumWindowOwned','ItemQuantityFmt','drawIngredientGold','_itemSpriteOpacitySpeed','16LEKjEp','filter','ItemCraftingSys','4134087wHMjsi','_number','GoldIcon','right','AllSwitches','WarningMsg','getCraftingIngredients','anchor','visualGoldDisplayNoCost','armors','drawCurrencyValue','drawCurrentItemName','drawIcon','split','OnSwitches','27204ElgagK','fillRect','NumberBgType','_itemsCrafted','drawCraftedIcon','pop','ItemsEquipsCore','loadTitle1','onNumberCancel','_buttonAssistWindow','_categoryIndex','initItemCraftingSys','onItemOk','isArmor','ARRAYFUNC','imageSmoothingEnabled','3380032XZKCrd','maxCols','NumWindowShift','Settings','Enable','iconHeight','drawCategories','isSceneBattle','format','GoldBgType','Mask','ARRAYNUM','ButtonAssistBgType','setWindowBackgroundTypes','3971886CXuBVM','itemRectWithPadding','createCraftingIngredientsLists','Weapon','itemCrafting','dimColor1','ARRAYEVAL','_numberWindow','_animationWait','_max','_maxIngredientsSize','3oMJJEp','General','boxHeight','addLoadListener','setItemSpriteOpacity','customCraftingOnly','getCustomItemCraftingSettings','isReleased','isItemCraftingCategoryValid','gradientFillRect','return\x200','drawText','getProxyItem','ParseWeaponNotetags','commandItemCrafting','isTouchOkEnabled','setHelpWindowItem','left','fontItalic','makeItemList','30239kYIXmf','_animationIDs','iconIndex','NumWindowNet','_bypassProxy','66421ZcOKNt','createStatusWindow','getArmorIdWithName','parameters','max','isSceneItemCrafting','contents','armor','itemPadding','setCustomItemCraftingSettings','onCategoryOk','ShowAnimations','onButtonOk','_clickHandler','Window_ItemCategory_needsSelection','VisuMZ_1_MainMenuCore','refresh','opacity','onIngredientListCancel','allCraftableItems','drawTooltipBackground','getInputMultiButtonStrings','fittingHeight','setText','registerCraftedItem','startAnimation','clearCustomItemCraftingSettings','getWeaponIdWithName','_buttons','itemCraftedIcon','scale','isItem','activateItemWindow','Window_MenuCommand_addOriginalCommands','getColor','currencyUnit','CheckAnySwitches','MaskText','weapon','loadSystem','_animationSprite','jsOnCraft','_data','_nonCategoryItemCraftingItems','maskItalics','trim','setBackgroundOpacity','_ingredientsList','drawTextEx','MainMenu','selectLast','createContents','#%1','_categoryWindow','createAnimationIDs','CraftAssistButton','initialize','ListBgType','concat','updateAnimationSprite','baseTextRect','drawTotalPrice','placeButtons','bind','SwitchCraft','statusWindowRectItemsEquipsCore','clear','drawItemIngredient','toLowerCase','clone','SelectedText','_itemIDs','SnapshotOpacity','processFinishAnimation','destroyAnimationSprite','OffSwitches','_statusWindow','buttonAssistLargeIncrement','addChild','Uncategorized','isTouchedInsideFrame','3708621gnDsqh','item','setValue','itemAt','drawMathMarks','allCraftableWeapons','maxGold','adjustSprite','buttonAssistText2','drawItemBackground','EVAL','bitmap','needsSelection','createIngredientSelectionList','_itemSprite','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_backSprite2','Weapons','STRUCT','RegExp','scaleSprite','buttonAssistSmallIncrement','SystemShowItemCraftingMenu','processItemCrafting','call','BypassMasks','goldWindowRectItemsEquipsCore','playCancel','itemNameY','_text','allowCreateStatusWindow','loadWindowskin','_goldWindow','resetFontSettings','_armorIDs','Scale','initItemCraftingMainMenu','smoothSelect','_iconSprite','isOkEnabled'];_0x412f=function(){return _0x4bad5a;};return _0x412f();}function _0x3aaa(_0x4997db,_0x4a2d33){const _0x412f3b=_0x412f();return _0x3aaa=function(_0x3aaa65,_0x17b894){_0x3aaa65=_0x3aaa65-0x1b7;let _0x5077ee=_0x412f3b[_0x3aaa65];return _0x5077ee;},_0x3aaa(_0x4997db,_0x4a2d33);}Window_ItemCraftingNumber[_0x5d6f52(0x27a)]=Object[_0x5d6f52(0x28d)](Window_ShopNumber[_0x5d6f52(0x27a)]),Window_ItemCraftingNumber['prototype'][_0x5d6f52(0x362)]=Window_ItemCraftingNumber,Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x20f)]=function(_0xb1923d){const _0xec6ff8=_0x5d6f52;Window_ShopNumber['prototype']['initialize'][_0xec6ff8(0x240)](this,_0xb1923d);},Window_ItemCraftingNumber[_0x5d6f52(0x27a)]['setup']=function(_0x40171e){const _0x20218f=_0x5d6f52;this[_0x20218f(0x2de)]=_0x40171e,this[_0x20218f(0x1bc)]=this['determineMax'](),this['_number']=Math[_0x20218f(0x322)](0x1,this[_0x20218f(0x1bc)]),this[_0x20218f(0x215)](),this[_0x20218f(0x1e7)]();},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x262)]=function(){const _0x55d810=_0x5d6f52,_0xd43ce0=[],_0x17b117=this[_0x55d810(0x2de)],_0x18b69c=DataManager[_0x55d810(0x37a)](_0x17b117);let _0x2f27d3=0x0;for(const _0x11445f of _0x18b69c){if(!_0x11445f)continue;let _0x4de0bf=_0x11445f[0x0];const _0x22ef66=_0x11445f[0x1];_0x4de0bf===_0x55d810(0x257)?_0xd43ce0[_0x55d810(0x315)](Math[_0x55d810(0x321)]($gameParty['gold']()/_0x22ef66)):(typeof _0x4de0bf===_0x55d810(0x270)&&_0x4de0bf[_0x55d810(0x25c)](/CATEGORY/i)&&(_0x4de0bf=SceneManager[_0x55d810(0x273)][_0x55d810(0x206)][_0x2f27d3],_0x2f27d3+=0x1),_0xd43ce0[_0x55d810(0x315)](Math['floor']($gameParty[_0x55d810(0x2b8)](_0x4de0bf)/_0x22ef66)));}if(_0xd43ce0[_0x55d810(0x2e0)]<=0x0)_0xd43ce0[_0x55d810(0x315)](0x0);return _0xd43ce0[_0x55d810(0x315)]($gameParty[_0x55d810(0x2ad)](_0x17b117)-$gameParty[_0x55d810(0x2b8)](_0x17b117)),Math[_0x55d810(0x322)](..._0xd43ce0);},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x1e7)]=function(){const _0x5ad121=_0x5d6f52;Window_Selectable['prototype'][_0x5ad121(0x1e7)][_0x5ad121(0x240)](this),this[_0x5ad121(0x2d7)](),this[_0x5ad121(0x231)](0x0),this[_0x5ad121(0x214)](),this[_0x5ad121(0x2c3)](),this['drawCurrentItemName']();},Window_ItemCraftingNumber[_0x5d6f52(0x27a)]['changeOkButtonEnable']=function(){const _0x413e82=_0x5d6f52,_0x1ff4d5=this[_0x413e82(0x1f3)][0x4];if(!_0x1ff4d5)return;this[_0x413e82(0x24f)]()?_0x1ff4d5[_0x413e82(0x296)](this[_0x413e82(0x1e3)]['bind'](this)):_0x1ff4d5[_0x413e82(0x1e4)]=null;},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x244)]=function(){const _0x4e4894=_0x5d6f52;return Math[_0x4e4894(0x321)](this[_0x4e4894(0x261)]()+this['lineHeight']()*0x2);},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x261)]=function(){const _0x35d57c=_0x5d6f52;return Math[_0x35d57c(0x321)](this[_0x35d57c(0x29b)]-this[_0x35d57c(0x2f2)]()*6.5);},Window_ItemCraftingNumber[_0x5d6f52(0x27a)]['buttonY']=function(){const _0x4624fe=_0x5d6f52;return Math[_0x4624fe(0x321)](this[_0x4624fe(0x244)]()+this[_0x4624fe(0x2f2)]()*0x2);},Window_ItemCraftingNumber['prototype'][_0x5d6f52(0x24f)]=function(){const _0x44560c=_0x5d6f52;if((this[_0x44560c(0x375)]||0x0)<=0x0)return![];return Window_ShopNumber['prototype'][_0x44560c(0x24f)][_0x44560c(0x240)](this);},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x1cd)]=function(){const _0x4ae50d=_0x5d6f52;return this[_0x4ae50d(0x24f)]();},Window_ItemCraftingNumber[_0x5d6f52(0x27a)]['drawTotalPrice']=function(){const _0xa86d8f=_0x5d6f52,_0x2c53bd=DataManager[_0xa86d8f(0x37a)](this[_0xa86d8f(0x2de)]);let _0x5c1e10=this[_0xa86d8f(0x261)]();_0x5c1e10-=this[_0xa86d8f(0x2f2)]()*_0x2c53bd[_0xa86d8f(0x2e0)],this[_0xa86d8f(0x38d)]=0x0,this[_0xa86d8f(0x399)](_0x5c1e10);for(const _0x1e7844 of _0x2c53bd){_0x5c1e10+=this[_0xa86d8f(0x2f2)]();if(!_0x1e7844)continue;this['drawIngredients'](_0x1e7844,_0x5c1e10);};},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x399)]=function(_0x41bd6a){const _0x4a65bc=_0x5d6f52,_0xd34f2d=this[_0x4a65bc(0x1df)]();let _0x4d67f7=_0xd34f2d*0x2;const _0x570ec5=this['innerWidth']-_0x4d67f7-_0xd34f2d*0x3,_0x3e1d4a=_0x4d67f7+Math[_0x4a65bc(0x337)](_0x570ec5/0x3),_0x53eaaf=Math[_0x4a65bc(0x321)](_0x570ec5*0x2/0x3/0x3),_0x5cd078=Math[_0x4a65bc(0x1db)](this[_0x4a65bc(0x253)](_0x4a65bc(0x2e1)),this[_0x4a65bc(0x253)](_0x4a65bc(0x2be)));this[_0x4a65bc(0x249)](),this[_0x4a65bc(0x2c0)](ColorManager[_0x4a65bc(0x2b0)]());const _0x41d523=[_0x4a65bc(0x28e),'shift',_0x4a65bc(0x290)];for(let _0x99b8c6=0x0;_0x99b8c6<0x3;_0x99b8c6++){const _0x2bfe73=_0x41d523[_0x99b8c6],_0x3a9027=TextManager[_0x4a65bc(0x352)][_0x2bfe73];this[_0x4a65bc(0x1c9)](_0x3a9027,_0x3e1d4a+_0x53eaaf*_0x99b8c6+_0x5cd078,_0x41bd6a,_0x53eaaf-_0x5cd078,_0x4a65bc(0x355));}},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x22c)]=function(_0x26304f,_0x505015){const _0x4445f2=_0x5d6f52,_0x3c16cc=this[_0x4445f2(0x1df)]();let _0x340795=_0x3c16cc*0x2;const _0xbc631f=this[_0x4445f2(0x318)]-_0x340795-_0x3c16cc*0x3,_0x330456=_0x340795+Math[_0x4445f2(0x337)](_0xbc631f/0x3),_0x54d2c3=Math[_0x4445f2(0x321)](_0xbc631f*0x2/0x3/0x3);_0x505015='\x20%1'[_0x4445f2(0x39b)](_0x505015),this[_0x4445f2(0x1c9)](_0x505015,_0x330456+_0x54d2c3*0x1,_0x26304f,_0x54d2c3,_0x4445f2(0x1cf)),this[_0x4445f2(0x1c9)]('\x20=',_0x330456+_0x54d2c3*0x2,_0x26304f,_0x54d2c3,_0x4445f2(0x1cf));},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x2e9)]=function(_0x4d4c29,_0x537095){const _0x10e708=_0x5d6f52;let _0x20b1be=_0x4d4c29[0x0];this['resetFontSettings'](),this[_0x10e708(0x22c)](_0x537095,'-'),_0x20b1be==='gold'?this[_0x10e708(0x31d)](_0x4d4c29,_0x537095,!![]):this[_0x10e708(0x21a)](_0x4d4c29,_0x537095,!![],![]);},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x37f)]=function(){const _0x1d2dc5=_0x5d6f52,_0x5d7986=[this[_0x1d2dc5(0x2de)],0x1],_0x53f909=this[_0x1d2dc5(0x244)](),_0x5b91fb=DataManager['isCraftingItemMasked'](this[_0x1d2dc5(0x2de)]);this['drawItemIngredient'](_0x5d7986,_0x53f909,![],_0x5b91fb),this[_0x1d2dc5(0x22c)](_0x53f909,'+');},Window_ItemCraftingNumber['prototype'][_0x5d6f52(0x2dc)]=function(){return!![];},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x37c)]=function(){return![];},Window_ItemCraftingNumber[_0x5d6f52(0x27a)][_0x5d6f52(0x31d)]=function(_0x51e8bb,_0x37e520,_0x4cff88){const _0x1ca1cf=_0x5d6f52,_0x3226aa=this[_0x1ca1cf(0x1df)]();let _0x4f5cdc=_0x3226aa*0x2;const _0x5d0de8=this[_0x1ca1cf(0x318)]-_0x4f5cdc-_0x3226aa*0x3,_0x2be1a8=_0x4f5cdc+Math[_0x1ca1cf(0x337)](_0x5d0de8/0x3),_0x48c41d=Math['floor'](_0x5d0de8*0x2/0x3/0x3),_0x111f11=Math[_0x1ca1cf(0x1db)](this[_0x1ca1cf(0x253)](_0x1ca1cf(0x2e1)),this[_0x1ca1cf(0x253)](_0x1ca1cf(0x2be))),_0x39c38e=_0x51e8bb[0x0],_0x5841ea=_0x51e8bb[0x1],_0x412994=_0x5841ea*this['_number'],_0xead384=VisuMZ[_0x1ca1cf(0x304)]?VisuMZ['CoreEngine'][_0x1ca1cf(0x396)]['Gold'][_0x1ca1cf(0x376)]:0x0;if(_0xead384>0x0){const _0x437334=_0x37e520+(this[_0x1ca1cf(0x2f2)]()-ImageManager['iconHeight'])/0x2;this[_0x1ca1cf(0x380)](_0xead384,_0x4f5cdc,_0x437334);const _0x2262e8=ImageManager[_0x1ca1cf(0x2bb)]+0x4;_0x4f5cdc+=_0x2262e8;}this[_0x1ca1cf(0x2c0)](ColorManager[_0x1ca1cf(0x2b0)]()),this[_0x1ca1cf(0x1c9)](TextManager[_0x1ca1cf(0x1fa)],_0x4f5cdc,_0x37e520,_0x48c41d,_0x1ca1cf(0x1cf));const _0x1e4ee8=$gameParty[_0x1ca1cf(0x257)]();this[_0x1ca1cf(0x37e)](_0x1e4ee8,TextManager['currencyUnit'],_0x2be1a8,_0x37e520,_0x48c41d);const _0x2ea5eb=_0x2be1a8+_0x48c41d*0x1+_0x111f11,_0x4e9a54=_0x48c41d-_0x111f11;this[_0x1ca1cf(0x37e)](_0x412994,TextManager['currencyUnit'],_0x2ea5eb,_0x37e520,_0x4e9a54);const _0x381b4b=_0x2be1a8+_0x48c41d*0x2+_0x111f11,_0xeff73a=_0x48c41d-_0x111f11,_0x281f7=Math[_0x1ca1cf(0x322)](_0x1e4ee8+_0x412994*(_0x4cff88?-0x1:0x1),$gameParty[_0x1ca1cf(0x22e)]());this['drawCurrencyValue'](_0x281f7,TextManager[_0x1ca1cf(0x1fa)],_0x381b4b,_0x37e520,_0xeff73a);},Window_ItemCraftingNumber['prototype']['drawItemIngredient']=function(_0x4aaa4c,_0x1e68c2,_0x4dcd49,_0x66586c){const _0x5d36f8=_0x5d6f52,_0xc66061=this[_0x5d36f8(0x1df)]();let _0xad3924=_0xc66061*0x2;const _0x4fa4eb=this['innerWidth']-_0xad3924-_0xc66061*0x3,_0x2e7e95=_0xad3924+Math[_0x5d36f8(0x337)](_0x4fa4eb/0x3),_0x1c6f4e=Math[_0x5d36f8(0x321)](_0x4fa4eb*0x2/0x3/0x3),_0x3548bd=Math[_0x5d36f8(0x1db)](this[_0x5d36f8(0x253)](_0x5d36f8(0x2e1)),this[_0x5d36f8(0x253)](_0x5d36f8(0x2be)));let _0x1702bb=_0x4aaa4c[0x0];typeof _0x1702bb===_0x5d36f8(0x270)&&_0x1702bb['match'](/CATEGORY/i)&&(_0x1702bb=SceneManager[_0x5d36f8(0x273)]['_ingredientsList'][this[_0x5d36f8(0x38d)]],this[_0x5d36f8(0x38d)]+=0x1);const _0x18bd54=_0x4aaa4c[0x1],_0x5ccad8=_0x18bd54*this[_0x5d36f8(0x375)];let _0x35d512=_0x1702bb[_0x5d36f8(0x1d4)];const _0x33dd8b=_0x35d512>0x0?ImageManager[_0x5d36f8(0x2bb)]+0x4:0x0;if(_0x66586c){const _0x4bd94e=new Rectangle(_0xad3924,_0x1e68c2,_0x4fa4eb,this[_0x5d36f8(0x2f2)]());this[_0x5d36f8(0x2a3)](_0x1702bb,_0x4bd94e),this[_0x5d36f8(0x380)](_0x1702bb[_0x5d36f8(0x1d4)],_0x4bd94e['x'],_0x4bd94e['y']);}else this[_0x5d36f8(0x289)](_0x1702bb,_0xad3924,_0x1e68c2,_0x4fa4eb);const _0x14c0e6=_0x2e7e95+_0x1c6f4e*0x0,_0x3d12a2=_0x1c6f4e-_0x33dd8b,_0x562490=$gameParty[_0x5d36f8(0x2b8)](_0x1702bb);this[_0x5d36f8(0x1c9)](_0x562490,_0x14c0e6,_0x1e68c2,_0x3d12a2,_0x5d36f8(0x377)),this[_0x5d36f8(0x380)](_0x35d512,_0x14c0e6+_0x3d12a2+0x4,_0x1e68c2);const _0x43e9f4=_0x2e7e95+_0x1c6f4e*0x1+_0x3548bd,_0x417699=_0x1c6f4e-_0x3548bd-_0x33dd8b;this['drawText'](_0x5ccad8,_0x43e9f4,_0x1e68c2,_0x417699,_0x5d36f8(0x377)),this[_0x5d36f8(0x380)](_0x35d512,_0x43e9f4+_0x417699+0x4,_0x1e68c2);const _0x759259=_0x2e7e95+_0x1c6f4e*0x2+_0x3548bd,_0x574a79=_0x1c6f4e-_0x3548bd-_0x33dd8b,_0x1454e3=_0x562490+_0x5ccad8*(_0x4dcd49?-0x1:0x1);this[_0x5d36f8(0x1c9)](_0x1454e3,_0x759259,_0x1e68c2,_0x574a79,_0x5d36f8(0x377)),this['drawIcon'](_0x35d512,_0x759259+_0x574a79+0x4,_0x1e68c2);},Window_ItemCraftingNumber[_0x5d6f52(0x27a)]['itemRect']=function(){const _0x5e3526=_0x5d6f52,_0x4c2f5f=this['itemPadding']();let _0x36550b=_0x4c2f5f*0x2;const _0x5d299e=this[_0x5e3526(0x318)]-_0x36550b-_0x4c2f5f*0x3,_0x51e4b1=_0x36550b+Math[_0x5e3526(0x337)](_0x5d299e/0x3),_0x217d28=this[_0x5e3526(0x244)](),_0x175130=Math[_0x5e3526(0x321)](_0x5d299e*0x2/0x3/0x3),_0x480936=Math['max'](this[_0x5e3526(0x253)](_0x5e3526(0x2e1)),this[_0x5e3526(0x253)](_0x5e3526(0x2be))),_0xd8ec83=this[_0x5e3526(0x2de)]?.[_0x5e3526(0x1d4)]>0x0?ImageManager[_0x5e3526(0x2bb)]:0x0,_0x579099=this[_0x5e3526(0x346)](),_0x4e92cd=new Rectangle(Math['floor'](_0x51e4b1+_0x175130*0x2-this[_0x5e3526(0x346)]()-_0xd8ec83+this[_0x5e3526(0x1df)]()/0x2-0x2),_0x217d28,this[_0x5e3526(0x346)](),this['lineHeight']());return _0x4e92cd;};function Window_ItemCraftingIngredient(){const _0x59481a=_0x5d6f52;this[_0x59481a(0x20f)](...arguments);}Window_ItemCraftingIngredient['prototype']=Object[_0x5d6f52(0x28d)](Window_ItemList[_0x5d6f52(0x27a)]),Window_ItemCraftingIngredient[_0x5d6f52(0x27a)]['constructor']=Window_ItemCraftingIngredient,Window_ItemCraftingIngredient[_0x5d6f52(0x27a)][_0x5d6f52(0x20f)]=function(_0x1c537d){const _0x4d4234=_0x5d6f52;Window_Selectable[_0x4d4234(0x27a)][_0x4d4234(0x20f)][_0x4d4234(0x240)](this,_0x1c537d),this[_0x4d4234(0x2ce)]=0x0;},Window_ItemCraftingIngredient[_0x5d6f52(0x27a)][_0x5d6f52(0x277)]=function(){return![];},Window_ItemCraftingIngredient[_0x5d6f52(0x27a)][_0x5d6f52(0x2e7)]=function(_0x5dbfb7,_0xca2918){const _0x51397a=_0x5d6f52;this[_0x51397a(0x369)]=_0x5dbfb7,this[_0x51397a(0x2ce)]=_0xca2918||0x1,this['refresh'](),this['scrollTo'](0x0,0x0),this[_0x51397a(0x30b)](),this[_0x51397a(0x24d)](0x0);},Window_ItemCraftingIngredient[_0x5d6f52(0x27a)]['makeItemList']=function(){const _0x326eb2=_0x5d6f52;this['_data']=$gameParty['allItems']()[_0x326eb2(0x372)](_0x11d41a=>this['includes'](_0x11d41a));},Window_ItemCraftingIngredient['prototype'][_0x5d6f52(0x2b3)]=function(_0x596353){const _0x4e035a=_0x5d6f52;if(!_0x596353)return![];if(_0x596353===SceneManager['_scene'][_0x4e035a(0x2de)])return![];return _0x596353[_0x4e035a(0x34c)][_0x4e035a(0x2b3)](this[_0x4e035a(0x369)]['toUpperCase']()[_0x4e035a(0x204)]());},Window_ItemCraftingIngredient[_0x5d6f52(0x27a)][_0x5d6f52(0x271)]=function(_0x5b959d){const _0x313539=_0x5d6f52;if(!_0x5b959d)return![];if(this[_0x313539(0x259)]()[_0x313539(0x2b3)](_0x5b959d))return![];return $gameParty[_0x313539(0x2b8)](_0x5b959d)>=this[_0x313539(0x2ce)];},Window_ItemCraftingIngredient[_0x5d6f52(0x27a)][_0x5d6f52(0x259)]=function(){const _0x35cc11=_0x5d6f52,_0x54f202=[],_0x5649c3=DataManager[_0x35cc11(0x37a)](SceneManager[_0x35cc11(0x273)]['_item']);for(const _0x44c1e6 of _0x5649c3){if(!_0x44c1e6)continue;const _0x16096e=_0x44c1e6[0x0];(DataManager[_0x35cc11(0x1f6)](_0x16096e)||DataManager[_0x35cc11(0x2a0)](_0x16096e)||DataManager[_0x35cc11(0x390)](_0x16096e))&&_0x54f202[_0x35cc11(0x315)](_0x16096e);}return _0x54f202[_0x35cc11(0x211)](SceneManager[_0x35cc11(0x273)][_0x35cc11(0x206)]);},Window_ItemCraftingIngredient['prototype'][_0x5d6f52(0x289)]=function(_0x455833,_0x320422,_0x451f42,_0x42c97b){const _0x118e14=_0x5d6f52;_0x455833&&this['selectedIngredientList']()[_0x118e14(0x2b3)](_0x455833)&&(this[_0x118e14(0x312)]=!![]),Window_ItemList[_0x118e14(0x27a)]['drawItemName'][_0x118e14(0x240)](this,_0x455833,_0x320422,_0x451f42,_0x42c97b),this[_0x118e14(0x312)]=![];},Window_ItemCraftingIngredient[_0x5d6f52(0x27a)][_0x5d6f52(0x1c9)]=function(_0xd3d004,_0x2ee9cc,_0x2adec9,_0x170f93,_0x514a42){const _0x532c8b=_0x5d6f52;if(this[_0x532c8b(0x312)]){const _0x143800=VisuMZ[_0x532c8b(0x373)][_0x532c8b(0x396)][_0x532c8b(0x1bf)];this[_0x532c8b(0x1dd)][_0x532c8b(0x26a)]=ColorManager[_0x532c8b(0x1f9)](_0x143800[_0x532c8b(0x25b)]),_0xd3d004+=_0x143800[_0x532c8b(0x21d)];}Window_Base[_0x532c8b(0x27a)][_0x532c8b(0x1c9)][_0x532c8b(0x240)](this,_0xd3d004,_0x2ee9cc,_0x2adec9,_0x170f93,_0x514a42);};