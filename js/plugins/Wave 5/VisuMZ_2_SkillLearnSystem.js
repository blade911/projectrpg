//=============================================================================
// VisuStella MZ - Skill Learn System
// VisuMZ_2_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_SkillLearnSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillLearnSystem = VisuMZ.SkillLearnSystem || {};
VisuMZ.SkillLearnSystem.version = 1.07;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.07] [SkillLearnSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets your game's actors have an alternative way of learning
 * skills aside from leveling up. Instead, they can learn skills through the
 * in-game skill menu, where they can trade gold, items, or the brand new
 * resources made available by this plugin: Ability Points and/or Skill Points.
 * 
 * Ability Points and Skill Points are new resources provided by this plugin
 * that can be acquired in a variety of ways, of which, you can set through its
 * mechanical settings in the Plugin Parameters. These can be through leveling
 * up, performing actions, and/or defeating enemies.
 * 
 * When learning skills through this plugin's in-game system, skills can have
 * a variety of costs and requirements. These requirements can come in the form
 * of needing to be at a certain level, having specific skills learned, and/or
 * having certain switches on.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can now learn new skills from the in-game skill menu under the
 *   new "Learn" command.
 * * In this new menu, actors can spend various resources to learn new skills.
 * * These resources can be Ability Points, Skill Points, items, and more.
 * * Ability Points and Skill Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Learnable skills may have requirements that need to be first met even if
 *   the actor has the available resources.
 * * Skill learning requirements can include levels, having other skills
 *   learned, and/or enabled switches.
 * * Play animations upon learning a new skill inside the menu.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * Battle Test
 *
 * When doing a battle test through the database, all of an actor's learnable
 * skills through the Skill Learn System's notetags will become available for
 * the test battle to reduce the need to manually add them.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Skill Points and Ability Points earned can be visibly shown in the rewards
 * window.
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
 * === Ability Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting AP: x>
 * <Class name Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in a
 *   specific class if Ability Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Ability Points for.
 * - Replace 'name' with the name of the class to set starting Ability
 *   Points for.
 *
 * ---
 *
 * <AP Gain: x>
 * <User AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Ability Points gain from
 *   the Plugin Parameters.
 *
 * ---
 *
 * <Target AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <AP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Ability Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Ability Points to
 *   grant the player's party each.
 * - This effect will take over the "Per Enemy" Ability Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <AP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Skill Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting SP: x>
 * <Class name Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in a specific
 *   class if Skill Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Skill Points for.
 * - Replace 'name' with the name of the class to set starting Skill
 *   Points for.
 *
 * ---
 *
 * <SP Gain: x>
 * <User SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <SP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Skill Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Skill Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <SP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Learnable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill: id>
 * <Learn Skills: id, id, id>
 * 
 * <Learn Skill: name>
 * <Learn Skills: name, name, name>
 *
 * - Used for: Class Notetags
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple entries are permited.
 *
 * ---
 *
 * <Learn Skills>
 *  id
 *  id
 *  id
 *  name
 *  name
 *  name
 * <Learn Skills>
 *
 * - Used for: Class
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple middle entries are permited.
 *
 * ---
 * 
 * === Skill Learn Cost-Related Notetags ===
 * 
 * ---
 *
 * <Learn AP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Ability Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Ability Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Ability Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn CP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Class Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn JP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Job Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn SP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Skill Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn Item id Cost: x>
 * <Learn Item name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the items needed to be consumed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the item needed to be 
 *   consumed.
 * - Replace 'name' with the name of the item needed to be consumed.
 * - Replace 'x' with a number representing the amount of the item needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Weapon id Cost: x>
 * <Learn Weapon name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the weapons needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the weapon needed to be 
 *   consumed.
 * - Replace 'name' with the name of the weapon needed to be consumed.
 * - Replace 'x' with a number representing the amount of the weapon needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Armor id Cost: x>
 * <Learn Armor name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the armors needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the armor needed to be 
 *   consumed.
 * - Replace 'name' with the name of the armor needed to be consumed.
 * - Replace 'x' with a number representing the amount of the armor needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Gold Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the gold cost needed for an actor to learn the skill through
 *   the Skill Learn System.
 * - Replace 'x' with a number representing the amount of gold needed to learn
 *   this skill.
 * - If this notetag is not used, then the gold cost will default to the value
 *   found in the settings.
 *
 * ---
 *
 * <Learn Skill Costs>
 *  AP: x
 * 
 *  SP: x
 * 
 *  Item id: x
 *  Item name: x
 * 
 *  Weapon id: x
 *  Weapon name: x
 * 
 *  Armor id: x
 *  Armor name: x
 *  
 *  Gold: x
 * </Learn Skill Costs>
 *
 * - Used for: Skill Notetags
 * - Determines a group of resources needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with the ID's of items, weapons, armors to be consumed.
 * - Replace 'name' with the names of items, weapons, armors to be consumed.
 * - Replace 'x' with the quantities of the designated resource to be consumed.
 * - Insert multiple entries of items, weapons, and armors inside the notetags
 *   to add more resource entries.
 *
 * ---
 * 
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic Ability Point and Skill Point costs.
 * 
 * ---
 *
 * <JS Learn AP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn AP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Ability Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Ability
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn AP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn CP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn CP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Class Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn CP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn JP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn JP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Job Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn JP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn SP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn SP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Skill Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn SP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 * 
 * === Show Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Show Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to even
 *   appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Show Skill: id>
 * <Learn Show Skill: name>
 * 
 * <Learn Show All Skills: id, id, id>
 * <Learn Show All Skills: name, name, name>
 * 
 * <Learn Show Any Skills: id, id, id>
 * <Learn Show Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to appear visibly in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to appear visibly in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 *
 * ---
 *
 * <Learn Show Switch: x>
 * 
 * <Learn Show All Switches: x, x, x>
 * 
 * <Learn Show Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Show Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined show conditions.
 * 
 * ---
 *
 * <JS Learn Show>
 *  code
 *  code
 *  visible = code;
 * </JS Learn Show>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   visibly shown in the Skill Learn System menu.
 * - The 'visible' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be visible.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other show conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Show List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Show Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Require Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Require Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to be
 *   enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Require Skill: id>
 * <Learn Require Skill: name>
 * 
 * <Learn Require All Skills: id, id, id>
 * <Learn Require All Skills: name, name, name>
 * 
 * <Learn Require Any Skills: id, id, id>
 * <Learn Require Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to be enabled in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to be enabled in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 *
 * ---
 *
 * <Learn Require Switch: x>
 * 
 * <Learn Require All Switches: x, x, x>
 * 
 * <Learn Require Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to be enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Requirement Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined learning requirement conditions.
 * 
 * ---
 *
 * <JS Learn Requirements>
 *  code
 *  code
 *  enabled = code;
 * </JS Learn Requirements>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   enabled for learning in the Skill Learn System menu.
 * - The 'enabled' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be enabled.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other requirement conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Requirements List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list
 *   as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Requirements Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Animation-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill Animation: id>
 * <Learn Skill Animation: id, id, id>
 * 
 * - Used for: Skill Notetags
 * - Plays the animation(s) when this skill is learned through the Skill Learn
 *   System's menu.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 *
 * ---
 * 
 * <Learn Skill Fade Speed: x>
 * 
 * - Used for: Skill Notetags
 * - This determines the speed at which the skill's icon fades in during the
 *   skill learning animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Learn Skill Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Skill Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   skill's icon during learning instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of learning skills, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === JavaScript Notetags: On Learning Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * produce special effects when the skill is learned.
 * 
 * ---
 *
 * <JS On Learn Skill>
 *  code
 *  code
 *  code
 * </JS On Learn Skill>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform the desired actions when
 *   the skill is learned.
 * - This will apply to any time the skill is learned by an actor, even if it
 *   is through natural leveling or through the Skill Learn System menu.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
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
 * === Ability Points Plugin Commands ===
 * 
 * ---
 *
 * Ability Points: Gain
 * - The target actor(s) gains Ability Points.
 * - Gained amounts are affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Add
 * - The target actor(s) receives Ability Points.
 * - Received amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Lose
 * - The target actor(s) loses Ability Points.
 * - Lost amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Set
 * - Changes the exact Ability Points for the target actor(s).
 * - Changed amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Skill Points Plugin Commands ===
 * 
 * ---
 *
 * Skill Points: Gain
 * - The target actor(s) gains Skill Points.
 * - Gained amounts are affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Add
 * - The target actor(s) receives Skill Points.
 * - Received amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Lose
 * - The target actor(s) loses Skill Points.
 * - Lost amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Set
 * - Changes the exact Skill Points for the target actor(s).
 * - Changed amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show Skill Learn in Skill Menu?
 * - Shows/hides Skill Learn inside the skill menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Skill Learn inside the skill menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Skill Learn System. These determine the settings
 * that are used for the Skill Learn System menu's main screen.
 *
 * ---
 *
 * Visual
 * 
 *   Displayed Costs:
 *   - Select which cost types to display in the skill entry.
 *   - This also determines the order they are displayed.
 *     - AP - Ability Points
 *     - SP - Skill Points
 *     - Item - Item Costs
 *     - Weapon - Weapon Costs
 *     - Armor - Armor Costs
 *     - Gold - Gold Costs
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus when the Skill Learn
 *     System is active.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Learned Text:
 *   - This is the text that appears if the skill has been learned.
 *   - You may use text codes.
 * 
 *   Requirements
 * 
 *     Requirement Header:
 *     - Header for requirements.
 *     - %1 - Requirements (all of them)
 * 
 *     Separation Format:
 *     - This determines how the requirements are separated.
 *     - %1 - Previous Requirement, %2 - Second Requirement
 * 
 *     Level Format:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Skill Format:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Switch Format:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Separation Format:
 *     - This determines how the costs are separated from one another.
 *     - %1 - Previous Cost, %2 - Second Cost
 * 
 *     Item Format:
 *     - Determine how items are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Item Name
 * 
 *     Weapon Format:
 *     - Determine how weapons are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * 
 *     Armor Format:
 *     - Determine how armors are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Armor Name
 * 
 *     Gold Format:
 *     - Determine how gold is displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Skill Learn System. The Skill Learn System is
 * accessible normally through the in-game Skill menu.
 *
 * ---
 *
 * Main Access Settings
 * 
 *   Command Name:
 *   - Name of the 'Skill Learn' option in the Menu.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Learn?
 * 
 *   Show in Menu?:
 *   - Add the 'Skill Learn' option to the Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Animation settings for the Skill Learn System. By default, an animation will
 * be played upon learning a skill through the Skill Learn System's menu in
 * order to provide player feedback about learning the said skill.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when learning a skill?
 * 
 *   Show Windows?:
 *   - Show windows during a skill learn animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when learning.
 *
 * ---
 *
 * Skill Sprite
 * 
 *   Scale:
 *   - How big do you want the skill sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the icon to fade in?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Settings for the sound effect played when learning a new skill through the
 * Skill Learn System.
 *
 * ---
 *
 * Settings
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for the Skill Learn System. There are two new windows added
 * into the Skill menu through this plugin: the Detail Window and the Confirm
 * Window.
 * 
 * The Detail Window will list the required costs of learning a skill in detail
 * in case the icons provided are not clear enough to show what's needed.
 * 
 * The Confirm Window is a window that appears towards the bottom to let the
 * player make a confirmation before deciding to learn the skill.
 *
 * ---
 *
 * Detail Window
 * 
 *   Requirements
 * 
 *     Requirement Title:
 *     - Text used when drawing the learning requirements.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Requirement Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Not Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Level:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Requirement Skill:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Requirement Switch:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Cost Title:
 *     - Text used when drawing the learning costs.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Cost Name:
 *     - Text used to label the resource being consumed.
 * 
 *     Cost Quantity:
 *     - Text used to label the cost of the resource.
 * 
 *     Cost of Owned:
 *     - Text used to label the amount of the resource in possession.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Confirm Window
 * 
 *   Confirm Text:
 *   - Text used for the Confirm command.
 *   - Text codes can be used.
 * 
 *   Cancel Text:
 *   - Text used for the Cancel command.
 *   - Text codes can be used.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Ability Points Settings
 * ============================================================================
 *
 * Ability Points are an actor-only resource used as a currency for this
 * plugin. You can determine how they appear in-game, how they're earned, and
 * what kind of mechanics are involved with them. Ability Points can also be 
 * used in other VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Ability Points:
 *   - Do you want Ability Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Ability Points an actor can have?
 *   - Use 0 for unlimited Ability Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Ability Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Ability Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Ability Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Ability Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Ability Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Ability Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Ability Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Ability Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much AP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Ability Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Ability Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawAbilityPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorAbilityPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Ability Points aren't shared or if you want the Ability
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Points Settings
 * ============================================================================
 *
 * Skill Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Skill Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Skill Points:
 *   - Do you want Skill Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Skill Points an actor can have?
 *   - Use 0 for unlimited Skill Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Skill Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Skill Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Skill Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Skill Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Skill Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Skill Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Skill Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much SP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Skill Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Skill Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawSkillPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorSkillPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Skill Points aren't shared or if you want the Skill
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.07: February 10, 2022
 * * Bug Fixes!
 * ** Costs for CP and JP will have better fail safes to not automatically
 *    reduce to 0 under specific conditions when learning skills. Fix by Arisu.
 * 
 * Version 1.06: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Learn Skill Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      skill's icon during learning instead.
 * 
 * Version 1.04: December 18, 2020
 * * Bug Fixes!
 * ** Notetags that utilize multiple numeric ID's instead of skill names should
 *    now be working properly. Fix made by Yanfly.
 * 
 * Version 1.03: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** The Plugin Parameter for "Displayed Costs" have been updated to contain
 *    compatibility for a future plugin.
 * ** The Plugin Parameter for "JS: Draw Status" has been updated to contain
 *    compatibility for a future plugin.
 * *** To quickly acquire the new changes for the above Plugin Parameters,
 *     delete the "General" settings from the main Plugin Parameters page, then
 *     open them up again. These settings will be defaulted to the new
 *     additions added for the plugin. Warning! Old settings will be lost.
 * * New Features!
 * ** Added <Learn CP Cost: x>, <Learn JP Cost: x>, <JS Learn CP Cost>,
 *    <JS Learn JP Cost> notetags. Added by Arisu.
 * 
 * Version 1.02: November 29, 2020
 * * Bug Fixes!
 * ** The plugin should no longer be dependent on Skills & States Core. Fix
 *    made by Arisu.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Game no longer crashes when displaying AP/SP rewards for those without
 *    the Victory Aftermath plugin. Fix made by Yanfly.
 *
 * Version 1.00: November 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsGain
 * @text Ability Points: Gain
 * @desc The target actor(s) gains Ability Points.
 * Gained amounts are affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsAdd
 * @text Ability Points: Add
 * @desc The target actor(s) receives Ability Points.
 * Received amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsLose
 * @text Ability Points: Lose
 * @desc The target actor(s) loses Ability Points.
 * Lost amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsSet
 * @text Ability Points: Set
 * @desc Changes the exact Ability Points for the target actor(s).
 * Changed amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsGain
 * @text Skill Points: Gain
 * @desc The target actor(s) gains Skill Points.
 * Gained amounts are affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsAdd
 * @text Skill Points: Add
 * @desc The target actor(s) receives Skill Points.
 * Received amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsLose
 * @text Skill Points: Lose
 * @desc The target actor(s) loses Skill Points.
 * Lost amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsSet
 * @text Skill Points: Set
 * @desc Changes the exact Skill Points for the target actor(s).
 * Changed amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillLearnSystemMenu
 * @text System: Show Skill Learn in Skill Menu?
 * @desc Shows/hides Skill Learn inside the skill menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Skill Learn inside the skill menu.
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
 * @param SkillLearnSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Scene_SkillLearn
 *
 * @param General:struct
 * @text General Settings
 * @parent Scene_SkillLearn
 * @type struct<General>
 * @desc General settings for the Skill Learn System.
 * @default {"Visual":"","DisplayedCosts:arraystr":"[\"AP\",\"SP\",\"Item\",\"Weapon\",\"Armor\",\"Gold\"]","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Costs\\n// Compatibility Target\\nconst costs = this.getSkillLearnDisplayedCosts();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(costs.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const cost of costs) {\\n    switch (cost) {\\n\\n        case 'AP':\\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'CP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'JP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'SP':\\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'Gold':\\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\\n            break;\\n\\n        default:\\n            continue;\\n    }\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\"","Vocabulary":"","Learned:str":"Learned","Requirements":"","RequireFmt:str":"Requires %1","ReqSeparateFmt:str":"%1, %2","ReqLevelFmt:str":"\\C[16]%3\\C[0]%1","ReqSkillFmt:str":"%1\\C[16]%2\\C[0]","ReqSwitchFmt:str":"\\C[16]%1\\C[0]","Costs":"","SeparationFmt:str":"%1  %2","ItemFmt:str":"×%1%2","WeaponFmt:str":"×%1%2","ArmorFmt:str":"×%1%2","GoldFmt:str":"×%1%2"}
 *
 * @param MenuAccess:struct
 * @text Menu Access Settings
 * @parent Scene_SkillLearn
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Skill Learn System.
 * @default {"Name:str":"Learn","Icon:num":"87","ShowMenu:eval":"true"}
 *
 * @param Animation:struct
 * @text Animation Settings
 * @parent Scene_SkillLearn
 * @type struct<Animation>
 * @desc Animation settings for the Skill Learn System.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"true","Animations:arraynum":"[\"40\",\"48\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Learn Sound Effect
 * @parent Scene_SkillLearn
 * @type struct<Sound>
 * @desc Settings for the sound effect played when learning a new skill through the Skill Learn System.
 * @default {"name:str":"Skill3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Window:struct
 * @text Window Settings
 * @parent Scene_SkillLearn
 * @type struct<Window>
 * @desc Window settings for the Skill Learn System.
 * @default {"DetailWindow":"","Requirements":"","RequirementTitle:str":"\\C[16]%1%2 Requirements\\C[0]","ReqMetFmt:str":"\\C[24]✔ %1\\C[0]","ReqNotMetFmt:str":"\\C[0]✘ %1\\C[0]","ReqLevelFmt:str":"\\I[87]%2 %1 Reached","ReqSkillFmt:str":"%1%2 Learned","ReqSwitchFmt:str":"\\I[160]%1","Costs":"","LearningTitle:str":"\\C[16]Learning\\C[0] %1%2","IngredientName:str":"\\C[16]Resource\\C[0]","IngredientCost:str":"\\C[16]Cost\\C[0]","IngredientOwned:str":"\\C[16]Owned\\C[0]","DetailWindow_BgType:num":"0","DetailWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y;\\nconst ww = skillWindowRect.width;\\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ConfirmWindow":"","ConfirmCmd:str":"\\I[164]Learn","CancelCmd:str":"\\I[168]Cancel","ConfirmWindow_BgType:num":"0","ConfirmWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst ww = skillWindowRect.width;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param AbilityPoints:struct
 * @text Ability Points Settings
 * @parent Resources
 * @type struct<AbilityPoints>
 * @desc Settings for Ability Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","DefaultCost:num":"0","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"78","Vocabulary":"","FullText:str":"Ability Points","AbbrText:str":"AP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(5)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(10)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param SkillPoints:struct
 * @text Skill Points Settings
 * @parent Resources
 * @type struct<SkillPoints>
 * @desc Settings for Skill Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","DefaultCost:num":"1","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"79","Vocabulary":"","FullText:str":"Skill Points","AbbrText:str":"SP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
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
 * @param Visual
 * 
 * @param DisplayedCosts:arraystr
 * @text Displayed Costs
 * @parent Visual
 * @type select[]
 * @option AP - Ability Points
 * @value AP
 * @option CP - Class Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value CP
 * @option JP - Job Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value JP
 * @option SP - Skill Points
 * @value SP
 * @option Item - Item Costs
 * @value Item
 * @option Weapon - Weapon Costs
 * @value Weapon
 * @option Armor - Armor Costs
 * @value Armor
 * @option Gold - Gold Costs
 * @value Gold
 * @desc Select which cost types to display in the skill entry.
 * This also determines the order they are displayed.
 * @default ["AP","SP","Item","Weapon","Armor","Gold"]
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Visual
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus when the Skill Learn System is active.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Costs\n// Compatibility Target\nconst costs = this.getSkillLearnDisplayedCosts();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(costs.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const cost of costs) {\n    switch (cost) {\n\n        case 'AP':\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'CP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'JP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'SP':\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'Gold':\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\n            break;\n\n        default:\n            continue;\n    }\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 * @param Vocabulary
 *
 * @param Learned:str
 * @text Learned Text
 * @parent Vocabulary
 * @desc This is the text that appears if the skill has been
 * learned. You may use text codes.
 * @default Learned
 *
 * @param Requirements
 * @parent Vocabulary
 *
 * @param RequireFmt:str
 * @text Requirement Header
 * @parent Requirements
 * @desc Header for requirements.
 * %1 - Requirements (all of them)
 * @default Requires %1
 *
 * @param ReqSeparateFmt:str
 * @text Separation Format
 * @parent Requirements
 * @desc This determines how the requirements are separated.
 * %1 - Previous Requirement, %2 - Second Requirement
 * @default %1, %2
 *
 * @param ReqLevelFmt:str
 * @text Level Format
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \C[16]%3\C[0]%1
 *
 * @param ReqSkillFmt:str
 * @text Skill Format
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1\C[16]%2\C[0]
 *
 * @param ReqSwitchFmt:str
 * @text Switch Format
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \C[16]%1\C[0]
 *
 * @param Costs
 * @parent Vocabulary
 *
 * @param SeparationFmt:str
 * @text Separation Format
 * @parent Costs
 * @desc This determines how the costs are separated from one another.
 * %1 - Previous Cost, %2 - Second Cost
 * @default %1  %2
 *
 * @param ItemFmt:str
 * @text Item Format
 * @parent Costs
 * @desc Determine how items are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Item Name
 * @default ×%1%2
 *
 * @param WeaponFmt:str
 * @text Weapon Format
 * @parent Costs
 * @desc Determine how weapons are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * @default ×%1%2
 *
 * @param ArmorFmt:str
 * @text Armor Format
 * @parent Costs
 * @desc Determine how armors are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Armor Name
 * @default ×%1%2
 *
 * @param GoldFmt:str
 * @text Gold Format
 * @parent Costs
 * @desc Determine how gold is displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * @default ×%1%2
 *
 */
/* ----------------------------------------------------------------------------
 * MenuAccess Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @desc Name of the 'Skill Learn' option in the Menu.
 * @default Learn
 *
 * @param Icon:num
 * @text Icon
 * @desc What is the icon you want to use to represent Skill Learn?
 * @default 87
 *
 * @param ShowMenu:eval
 * @text Show in Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Skill Learn' option to the Menu by default?
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
 * @desc Show animations when learning a skill?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during a skill learn animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when learning.
 * @default ["40","48"]
 *
 * @param Sprite
 * @text Skill Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the skill sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the icon to fade in?
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
 * @default Skill3
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
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param DetailWindow
 * @text Detail Window
 * 
 * @param Requirements
 * @parent DetailWindow
 *
 * @param RequirementTitle:str
 * @text Requirement Title
 * @parent Requirements
 * @desc Text used when drawing the learning requirements.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]%1%2 Requirements\C[0]
 *
 * @param ReqMetFmt:str
 * @text Requirement Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[24]✔ %1\C[0]
 *
 * @param ReqNotMetFmt:str
 * @text Requirement Not Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[0]✘ %1\C[0]
 *
 * @param ReqLevelFmt:str
 * @text Requirement Level
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \I[87]%2 %1 Reached
 *
 * @param ReqSkillFmt:str
 * @text Requirement Skill
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1%2 Learned
 *
 * @param ReqSwitchFmt:str
 * @text Requirement Switch
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \I[160]%1
 * 
 * @param Costs
 * @parent DetailWindow
 *
 * @param LearningTitle:str
 * @text Cost Title
 * @parent Costs
 * @desc Text used when drawing the learning costs.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]Learning\C[0] %1%2
 *
 * @param IngredientName:str
 * @text Cost Name
 * @parent Costs
 * @desc Text used to label the resource being consumed.
 * @default \C[16]Resource\C[0]
 *
 * @param IngredientCost:str
 * @text Cost Quantity
 * @parent Costs
 * @desc Text used to label the cost of the resource.
 * @default \C[16]Cost\C[0]
 *
 * @param IngredientOwned:str
 * @text Cost of Owned
 * @parent Costs
 * @desc Text used to label the amount of the resource in possession.
 * @default \C[16]Owned\C[0]
 *
 * @param DetailWindow_BgType:num
 * @text Background Type
 * @parent DetailWindow
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
 * @param DetailWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DetailWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y;\nconst ww = skillWindowRect.width;\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ConfirmWindow
 * @text Confirm Window
 *
 * @param ConfirmCmd:str
 * @text Confirm Text
 * @parent ConfirmWindow
 * @desc Text used for the Confirm command.
 * Text codes can be used.
 * @default \I[164]Learn
 *
 * @param CancelCmd:str
 * @text Cancel Text
 * @parent ConfirmWindow
 * @desc Text used for the Cancel command.
 * Text codes can be used.
 * @default \I[168]Cancel
 *
 * @param ConfirmWindow_BgType:num
 * @text Background Type
 * @parent ConfirmWindow
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
 * @param ConfirmWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ConfirmWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst ww = skillWindowRect.width;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Ability Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AbilityPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Ability Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Ability Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default true
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default AP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 0
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Ability Points an actor can have?
 * Use 0 for unlimited Ability Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Ability Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Ability Points?
 * @default 78
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Ability Points appears in-game.
 * @default Ability Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Ability Points appears in-game.
 * @default AP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Ability Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(5)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Ability Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Ability Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(10)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Ability Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much AP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Ability Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Skill Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Skill Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default SP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 1
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Skill Points an actor can have?
 * Use 0 for unlimited Skill Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Skill Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Skill Points?
 * @default 79
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Skill Points appears in-game.
 * @default Skill Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Skill Points appears in-game.
 * @default SP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[4]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Skill Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Skill Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Skill Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Skill Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much SP an actor has earned in battle during the
 * victory phase?
 * @default false
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Skill Points as
 * the main acquired resource in the actor windows?
 * @default false
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x397bec=_0x651b;(function(_0x16b830,_0x4b05d6){const _0x2535d7=_0x651b,_0x1fb98e=_0x16b830();while(!![]){try{const _0x487bc6=-parseInt(_0x2535d7(0x24f))/0x1+parseInt(_0x2535d7(0x2e0))/0x2*(parseInt(_0x2535d7(0x201))/0x3)+-parseInt(_0x2535d7(0x3e4))/0x4*(-parseInt(_0x2535d7(0x216))/0x5)+-parseInt(_0x2535d7(0x209))/0x6*(-parseInt(_0x2535d7(0x21e))/0x7)+parseInt(_0x2535d7(0x286))/0x8*(parseInt(_0x2535d7(0x457))/0x9)+-parseInt(_0x2535d7(0x3ab))/0xa*(-parseInt(_0x2535d7(0x451))/0xb)+-parseInt(_0x2535d7(0x3cb))/0xc*(parseInt(_0x2535d7(0x3b3))/0xd);if(_0x487bc6===_0x4b05d6)break;else _0x1fb98e['push'](_0x1fb98e['shift']());}catch(_0x9f69d9){_0x1fb98e['push'](_0x1fb98e['shift']());}}}(_0x1b36,0x202a0));var label=_0x397bec(0x2d5),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x397bec(0x407)](function(_0x5dc316){const _0x271278=_0x397bec;return _0x5dc316[_0x271278(0x237)]&&_0x5dc316[_0x271278(0x1ea)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x397bec(0x2a2)]=VisuMZ[label][_0x397bec(0x2a2)]||{},VisuMZ[_0x397bec(0x420)]=function(_0x35daf0,_0x3c6e52){const _0x5c1fe8=_0x397bec;for(const _0x52bc1c in _0x3c6e52){if(_0x52bc1c['match'](/(.*):(.*)/i)){const _0x5cee20=String(RegExp['$1']),_0x56472c=String(RegExp['$2'])[_0x5c1fe8(0x353)]()[_0x5c1fe8(0x3ea)]();let _0x20bcef,_0x3ca17e,_0x47f16e;switch(_0x56472c){case _0x5c1fe8(0x438):_0x20bcef=_0x3c6e52[_0x52bc1c]!==''?Number(_0x3c6e52[_0x52bc1c]):0x0;break;case _0x5c1fe8(0x45c):_0x3ca17e=_0x3c6e52[_0x52bc1c]!==''?JSON['parse'](_0x3c6e52[_0x52bc1c]):[],_0x20bcef=_0x3ca17e[_0x5c1fe8(0x281)](_0x1e1752=>Number(_0x1e1752));break;case _0x5c1fe8(0x3cf):_0x20bcef=_0x3c6e52[_0x52bc1c]!==''?eval(_0x3c6e52[_0x52bc1c]):null;break;case _0x5c1fe8(0x2e2):_0x3ca17e=_0x3c6e52[_0x52bc1c]!==''?JSON['parse'](_0x3c6e52[_0x52bc1c]):[],_0x20bcef=_0x3ca17e[_0x5c1fe8(0x281)](_0x4834d4=>eval(_0x4834d4));break;case _0x5c1fe8(0x2df):_0x20bcef=_0x3c6e52[_0x52bc1c]!==''?JSON[_0x5c1fe8(0x1c7)](_0x3c6e52[_0x52bc1c]):'';break;case _0x5c1fe8(0x239):_0x3ca17e=_0x3c6e52[_0x52bc1c]!==''?JSON[_0x5c1fe8(0x1c7)](_0x3c6e52[_0x52bc1c]):[],_0x20bcef=_0x3ca17e[_0x5c1fe8(0x281)](_0x5537f6=>JSON[_0x5c1fe8(0x1c7)](_0x5537f6));break;case _0x5c1fe8(0x270):_0x20bcef=_0x3c6e52[_0x52bc1c]!==''?new Function(JSON[_0x5c1fe8(0x1c7)](_0x3c6e52[_0x52bc1c])):new Function(_0x5c1fe8(0x2af));break;case _0x5c1fe8(0x360):_0x3ca17e=_0x3c6e52[_0x52bc1c]!==''?JSON[_0x5c1fe8(0x1c7)](_0x3c6e52[_0x52bc1c]):[],_0x20bcef=_0x3ca17e[_0x5c1fe8(0x281)](_0x72c018=>new Function(JSON[_0x5c1fe8(0x1c7)](_0x72c018)));break;case _0x5c1fe8(0x246):_0x20bcef=_0x3c6e52[_0x52bc1c]!==''?String(_0x3c6e52[_0x52bc1c]):'';break;case _0x5c1fe8(0x33c):_0x3ca17e=_0x3c6e52[_0x52bc1c]!==''?JSON['parse'](_0x3c6e52[_0x52bc1c]):[],_0x20bcef=_0x3ca17e[_0x5c1fe8(0x281)](_0x1d935a=>String(_0x1d935a));break;case'STRUCT':_0x47f16e=_0x3c6e52[_0x52bc1c]!==''?JSON[_0x5c1fe8(0x1c7)](_0x3c6e52[_0x52bc1c]):{},_0x20bcef=VisuMZ[_0x5c1fe8(0x420)]({},_0x47f16e);break;case _0x5c1fe8(0x425):_0x3ca17e=_0x3c6e52[_0x52bc1c]!==''?JSON[_0x5c1fe8(0x1c7)](_0x3c6e52[_0x52bc1c]):[],_0x20bcef=_0x3ca17e[_0x5c1fe8(0x281)](_0x228927=>VisuMZ['ConvertParams']({},JSON['parse'](_0x228927)));break;default:continue;}_0x35daf0[_0x5cee20]=_0x20bcef;}}return _0x35daf0;},(_0x575dd9=>{const _0x129eef=_0x397bec,_0x509b09=_0x575dd9[_0x129eef(0x3ef)];for(const _0x1bbe40 of dependencies){if(_0x129eef(0x302)===_0x129eef(0x41a))this['_abilityPoints']={};else{if(!Imported[_0x1bbe40]){if('fBeoW'!==_0x129eef(0x308))this['_skillLearnSystem_drawItemMode']=this[_0x129eef(0x36f)](),_0x374dd6[_0x129eef(0x2d5)]['Window_SkillList_drawItem']['call'](this,_0x4eb30f),this['_skillLearnSystem_drawItemMode']=![];else{alert(_0x129eef(0x3d0)[_0x129eef(0x2f5)](_0x509b09,_0x1bbe40)),SceneManager[_0x129eef(0x3dd)]();break;}}}}const _0xfe6b44=_0x575dd9[_0x129eef(0x1ea)];if(_0xfe6b44[_0x129eef(0x3f5)](/\[Version[ ](.*?)\]/i)){if('fPkuL'!=='fPkuL')_0x408e96=_0x1a553d||this['currentClass']()['id'];else{const _0xc69cff=Number(RegExp['$1']);_0xc69cff!==VisuMZ[label][_0x129eef(0x24a)]&&(alert(_0x129eef(0x21f)[_0x129eef(0x2f5)](_0x509b09,_0xc69cff)),SceneManager[_0x129eef(0x3dd)]());}}if(_0xfe6b44[_0x129eef(0x3f5)](/\[Tier[ ](\d+)\]/i)){if(_0x129eef(0x38a)==='AvrPM'){const _0x135708=_0x49f216(_0x1fd77b['$1']),_0x240816={'id':0x0,'quantity':_0x2a33d9(_0x34d9eb['$2'])},_0x3eac87=/^\d+$/[_0x129eef(0x37a)](_0x135708);_0x3eac87?_0x240816['id']=_0x783741(_0x135708):_0x240816['id']=_0x39090b[_0x129eef(0x344)](_0x135708),_0x240816['id']>0x0&&_0xa206ba[_0x129eef(0x266)](_0x240816);}else{const _0x3b5c1d=Number(RegExp['$1']);if(_0x3b5c1d<tier)alert(_0x129eef(0x1e5)[_0x129eef(0x2f5)](_0x509b09,_0x3b5c1d,tier)),SceneManager[_0x129eef(0x3dd)]();else{if(_0x129eef(0x1c4)===_0x129eef(0x1c4))tier=Math[_0x129eef(0x27f)](_0x3b5c1d,tier);else return _0x35786d(_0x1b6cf6['$1']);}}}VisuMZ[_0x129eef(0x420)](VisuMZ[label][_0x129eef(0x2a2)],_0x575dd9[_0x129eef(0x245)]);})(pluginData),PluginManager[_0x397bec(0x375)](pluginData[_0x397bec(0x3ef)],'AbilityPointsGain',_0x4e6397=>{const _0x46469a=_0x397bec;VisuMZ[_0x46469a(0x420)](_0x4e6397,_0x4e6397);const _0x352e47=_0x4e6397['Actors'][_0x46469a(0x281)](_0x957050=>$gameActors[_0x46469a(0x2fe)](_0x957050)),_0x56a3b2=_0x4e6397[_0x46469a(0x36a)],_0x43340c=_0x4e6397['Points'];for(const _0x49d1af of _0x352e47){if(!_0x49d1af)continue;for(const _0x576bf4 of _0x56a3b2){_0x46469a(0x40a)==='blWYU'?_0x49d1af[_0x46469a(0x2de)](_0x43340c,_0x576bf4):this[_0x46469a(0x3c6)][_0x46469a(0x2d8)]+=this[_0x46469a(0x387)];}}}),PluginManager[_0x397bec(0x375)](pluginData[_0x397bec(0x3ef)],_0x397bec(0x232),_0x2daed0=>{const _0x4066b8=_0x397bec;VisuMZ[_0x4066b8(0x420)](_0x2daed0,_0x2daed0);const _0x864807=_0x2daed0[_0x4066b8(0x268)][_0x4066b8(0x281)](_0x1475d9=>$gameActors[_0x4066b8(0x2fe)](_0x1475d9)),_0x1b55dd=_0x2daed0[_0x4066b8(0x36a)],_0x12b39c=_0x2daed0['Points'];for(const _0x5cad66 of _0x864807){if(!_0x5cad66)continue;for(const _0x3c9806 of _0x1b55dd){_0x5cad66[_0x4066b8(0x2fb)](_0x12b39c,_0x3c9806);}}}),PluginManager[_0x397bec(0x375)](pluginData[_0x397bec(0x3ef)],_0x397bec(0x20b),_0x80210a=>{const _0x4ee880=_0x397bec;VisuMZ[_0x4ee880(0x420)](_0x80210a,_0x80210a);const _0x4844f9=_0x80210a[_0x4ee880(0x268)][_0x4ee880(0x281)](_0x714ac9=>$gameActors['actor'](_0x714ac9)),_0x79dd79=_0x80210a[_0x4ee880(0x36a)],_0x2415ec=_0x80210a[_0x4ee880(0x3fb)];for(const _0x1d5d5a of _0x4844f9){if(_0x4ee880(0x3f8)===_0x4ee880(0x3a1)){if(!_0x5f43e8[_0x4ee880(0x390)])return;_0xfbde82>0x0&&(_0x469f32*=this[_0x4ee880(0x252)]()),this['gainMulticlassRewardPoints'](_0x4130b5,'Ability');}else{if(!_0x1d5d5a)continue;for(const _0x18f954 of _0x79dd79){_0x1d5d5a[_0x4ee880(0x342)](_0x2415ec,_0x18f954);}}}}),PluginManager['registerCommand'](pluginData['name'],'AbilityPointsSet',_0x11f1ff=>{const _0x529689=_0x397bec;VisuMZ['ConvertParams'](_0x11f1ff,_0x11f1ff);const _0x3a459e=_0x11f1ff[_0x529689(0x268)][_0x529689(0x281)](_0x274a2d=>$gameActors[_0x529689(0x2fe)](_0x274a2d)),_0x4560f0=_0x11f1ff[_0x529689(0x36a)],_0x2fad9b=_0x11f1ff[_0x529689(0x3fb)];for(const _0x151a5b of _0x3a459e){if(_0x529689(0x2ac)!==_0x529689(0x34a)){if(!_0x151a5b)continue;for(const _0x5f1e79 of _0x4560f0){_0x151a5b[_0x529689(0x44f)](_0x2fad9b,_0x5f1e79);}}else _0x22d64f=0x0;}}),PluginManager[_0x397bec(0x375)](pluginData[_0x397bec(0x3ef)],'SkillPointsGain',_0xd9bd4d=>{const _0x11ec19=_0x397bec;VisuMZ[_0x11ec19(0x420)](_0xd9bd4d,_0xd9bd4d);const _0x10920e=_0xd9bd4d['Actors']['map'](_0x242ae5=>$gameActors['actor'](_0x242ae5)),_0x4c435e=_0xd9bd4d[_0x11ec19(0x36a)],_0x37ea9d=_0xd9bd4d[_0x11ec19(0x3fb)];for(const _0x31ddd1 of _0x10920e){if(!_0x31ddd1)continue;for(const _0x4ea999 of _0x4c435e){if('VZvcX'===_0x11ec19(0x2a9)){let _0x1aa7e6=0x0;const _0x3b47e4=/^\d+$/[_0x11ec19(0x37a)](_0x2f0667);_0x3b47e4?_0x1aa7e6=_0x31e1ff(_0xbc2e73):_0x1aa7e6=_0x1d7bda['getSkillIdWithName'](_0xb5393f);if(!this[_0x11ec19(0x2c4)][_0x11ec19(0x24d)](_0x1aa7e6))return![];}else _0x31ddd1[_0x11ec19(0x33e)](_0x37ea9d,_0x4ea999);}}}),PluginManager[_0x397bec(0x375)](pluginData[_0x397bec(0x3ef)],_0x397bec(0x42f),_0x2680da=>{const _0x2414bb=_0x397bec;VisuMZ['ConvertParams'](_0x2680da,_0x2680da);const _0x2f4a52=_0x2680da[_0x2414bb(0x268)][_0x2414bb(0x281)](_0x2b416c=>$gameActors['actor'](_0x2b416c)),_0x43c026=_0x2680da[_0x2414bb(0x36a)],_0x2dcd31=_0x2680da['Points'];for(const _0x3f2086 of _0x2f4a52){if(_0x2414bb(0x31a)===_0x2414bb(0x31a)){if(!_0x3f2086)continue;for(const _0x69d825 of _0x43c026){_0x2414bb(0x2ae)!==_0x2414bb(0x2ae)?_0x3b2194=_0x1cb479:_0x3f2086[_0x2414bb(0x20c)](_0x2dcd31,_0x69d825);}}else this[_0x2414bb(0x1dd)](),this[_0x2414bb(0x251)](),this[_0x2414bb(0x3bb)](),_0x2e1e4d[_0x2414bb(0x452)](),_0x3399ec[_0x2414bb(0x452)]();}}),PluginManager[_0x397bec(0x375)](pluginData[_0x397bec(0x3ef)],_0x397bec(0x1f0),_0x516100=>{const _0x24fc6f=_0x397bec;VisuMZ['ConvertParams'](_0x516100,_0x516100);const _0x5ecf76=_0x516100[_0x24fc6f(0x268)][_0x24fc6f(0x281)](_0x17b15e=>$gameActors[_0x24fc6f(0x2fe)](_0x17b15e)),_0x49d460=_0x516100[_0x24fc6f(0x36a)],_0x270ee7=_0x516100[_0x24fc6f(0x3fb)];for(const _0x2379a2 of _0x5ecf76){if(_0x24fc6f(0x3c2)==='xobfB'){if(!_0x2379a2)continue;for(const _0xb854af of _0x49d460){if('hLaAL'===_0x24fc6f(0x1ca)){this[_0x24fc6f(0x3c6)]['x']=_0xca3270[_0x24fc6f(0x1d9)](_0x3b4d51[_0x24fc6f(0x386)]/0x2);const _0x119402=_0x416167[_0x24fc6f(0x1d9)](_0xb71f36[_0x24fc6f(0x361)]*this[_0x24fc6f(0x3c6)][_0x24fc6f(0x3ce)]['y']);this[_0x24fc6f(0x3c6)]['y']=_0x527d6c[_0x24fc6f(0x1d9)]((_0xf7fcff[_0x24fc6f(0x219)]+_0x119402)/0x2);}else _0x2379a2[_0x24fc6f(0x3fc)](_0x270ee7,_0xb854af);}}else _0x46611a=_0x3b7a93['SkillLearnSystem']['JS'][_0x579d20]['call'](this,this['_actor'],_0x3cc824),_0x344707[_0x24fc6f(0x430)]>0x0&&(_0x35c453!==''?_0x486cee=_0x43da5b['format'](_0x24c171,_0x2cd055):_0x3be36d=_0x4c0efe);}}),PluginManager[_0x397bec(0x375)](pluginData['name'],_0x397bec(0x2f6),_0xcd75b2=>{const _0x21e69d=_0x397bec;VisuMZ['ConvertParams'](_0xcd75b2,_0xcd75b2);const _0x1bb42a=_0xcd75b2['Actors'][_0x21e69d(0x281)](_0x175fbe=>$gameActors[_0x21e69d(0x2fe)](_0x175fbe)),_0x596c2f=_0xcd75b2[_0x21e69d(0x36a)],_0x5bfeb1=_0xcd75b2[_0x21e69d(0x3fb)];for(const _0x4bc74c of _0x1bb42a){if(!_0x4bc74c)continue;for(const _0x4b1197 of _0x596c2f){_0x21e69d(0x389)!=='GkIhJ'?_0x18ccbb[_0x21e69d(0x266)](_0x28bce4(_0x37252c)):_0x4bc74c[_0x21e69d(0x1e2)](_0x5bfeb1,_0x4b1197);}}}),PluginManager['registerCommand'](pluginData[_0x397bec(0x3ef)],_0x397bec(0x31d),_0x4b846f=>{const _0x161ab0=_0x397bec;VisuMZ[_0x161ab0(0x420)](_0x4b846f,_0x4b846f),$gameSystem['setSkillLearnSystemMenuAccess'](_0x4b846f[_0x161ab0(0x383)]);}),VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x40f)]=Scene_Boot[_0x397bec(0x26f)]['onDatabaseLoaded'],Scene_Boot[_0x397bec(0x26f)]['onDatabaseLoaded']=function(){const _0x44905d=_0x397bec;VisuMZ[_0x44905d(0x2d5)][_0x44905d(0x40f)][_0x44905d(0x42b)](this),this[_0x44905d(0x262)]();},Scene_Boot[_0x397bec(0x26f)][_0x397bec(0x262)]=function(){const _0x113172=_0x397bec;if(VisuMZ[_0x113172(0x3a2)])return;this[_0x113172(0x309)]();},VisuMZ['SkillLearnSystem'][_0x397bec(0x3e1)]={'StartingAbilityPoints':/<STARTING (?:ABILITY POINTS|AP):[ ](.*)>/i,'StartClassAbilityPoints':/<CLASS (.*) STARTING (?:ABILITY POINTS|AP):[ ](.*)>/gi,'UserGainAbilityPoints':/<(?:ABILITY POINTS|AP|USER ABILITY POINTS|USER AP) GAIN:[ ](.*)>/i,'TargetGainAbilityPoints':/<TARGET (?:ABILITY POINTS|AP) GAIN:[ ](.*)>/i,'EnemyAbilityPoints':/<(?:ABILITY POINTS|AP):[ ](.*)>/i,'AbilityPointsRate':/<(?:ABILITY POINTS|AP) RATE:[ ](\d+)([%％])>/i,'StartingSkillPoints':/<STARTING (?:SKILL POINTS|SP):[ ](.*)>/i,'StartClassSkillPoints':/<CLASS (.*) STARTING (?:SKILL POINTS|SP):[ ](.*)>/gi,'UserGainSkillPoints':/<(?:SKILL POINTS|SP|USER SKILL POINTS|USER SP) GAIN:[ ](.*)>/i,'TargetGainSkillPoints':/<TARGET (?:SKILL POINTS|SP) GAIN:[ ](.*)>/i,'EnemySkillPoints':/<(?:SKILL POINTS|SP):[ ](.*)>/i,'SkillPointsRate':/<(?:SKILL POINTS|SP) RATE:[ ](\d+)([%％])>/i,'LearnSkillA':/<LEARN (?:SKILL|SKILLS):[ ](.*)>/gi,'LearnSkillB':/<LEARN (?:SKILL|SKILLS)>\s*([\s\S]*)\s*<\/LEARN (?:SKILL|SKILLS)>/i,'LearnApCost':/<LEARN (?:ABILITY POINTS|AP) COST:[ ](\d+)>/i,'LearnCpCost':/<LEARN (?:CLASS POINTS|CP) COST:[ ](\d+)>/i,'LearnJpCost':/<LEARN (?:JOB POINTS|JP) COST:[ ](\d+)>/i,'LearnSpCost':/<LEARN (?:SKILL POINTS|SP) COST:[ ](\d+)>/i,'LearnItemCost':/<LEARN ITEM (.*) COST:[ ](\d+)>/gi,'LearnWeaponCost':/<LEARN WEAPON (.*) COST:[ ](\d+)>/gi,'LearnArmorCost':/<LEARN ARMOR (.*) COST:[ ](\d+)>/gi,'LearnGoldCost':/<LEARN GOLD COST:[ ](\d+)>/i,'LearnCostBatch':/<LEARN SKILL (?:COST|COSTS)>\s*([\s\S]*)\s*<\/LEARN SKILL (?:COST|COSTS)>/i,'LearnShowLevel':/<LEARN SHOW LEVEL:[ ](\d+)>/i,'LearnShowSkillsAll':/<LEARN SHOW (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnShowSkillsAny':/<LEARN SHOW ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnShowSwitchesAll':/<LEARN SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnShowSwitchesAny':/<LEARN SHOW ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'LearnReqLevel':/<LEARN REQUIRE LEVEL:[ ](\d+)>/i,'LearnReqSkillsAll':/<LEARN REQUIRE (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnReqSkillsAny':/<LEARN REQUIRE ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnReqSwitchesAll':/<LEARN REQUIRE (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnReqSwitchesAny':/<LEARN REQUIRE ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'animationIDs':/<LEARN SKILL (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<LEARN SKILL FADE SPEED:[ ](\d+)>/i,'learnPicture':/<LEARN SKILL (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'jsLearnApCost':/<JS LEARN (?:ABILITY POINTS|AP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:ABILITY POINTS|AP) COST>/i,'jsLearnCpCost':/<JS LEARN (?:CLASS POINTS|CP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:CLASS POINTS|CP) COST>/i,'jsLearnJpCost':/<JS LEARN (?:JOB POINTS|JP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:JOB POINTS|JP) COST>/i,'jsLearnSpCost':/<JS LEARN (?:SKILL POINTS|SP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:SKILL POINTS|SP) COST>/i,'jsLearnShow':/<JS LEARN (?:SHOW|VISIBLE)>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE)>/i,'jsLearnShowListTxt':/<JS LEARN (?:SHOW|VISIBLE) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) LIST TEXT>/i,'jsLearnShowDetailTxt':/<JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>/i,'jsLearnReq':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS)>/i,'jsLearnReqListTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>/i,'jsLearnReqDetailTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>/i,'jsOnLearn':/<JS ON LEARN SKILL>\s*([\s\S]*)\s*<\/JS ON LEARN SKILL>/i},VisuMZ['SkillLearnSystem']['JS']={},Scene_Boot[_0x397bec(0x26f)][_0x397bec(0x309)]=function(){const _0x7f82ae=_0x397bec,_0x20f584=$dataActors[_0x7f82ae(0x333)]($dataSkills);for(const _0x587ffa of _0x20f584){if(!_0x587ffa)continue;VisuMZ['SkillLearnSystem'][_0x7f82ae(0x3e8)](_0x587ffa);}},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x343)]=VisuMZ['ParseSkillNotetags'],VisuMZ['ParseSkillNotetags']=function(_0x2fed95){const _0x14b8ca=_0x397bec;VisuMZ[_0x14b8ca(0x2d5)][_0x14b8ca(0x343)]['call'](this,_0x2fed95),VisuMZ[_0x14b8ca(0x2d5)][_0x14b8ca(0x3e8)](_0x2fed95);},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x3e8)]=function(_0x2a2ab8){const _0x472cce=_0x397bec,_0x5be534=VisuMZ[_0x472cce(0x2d5)][_0x472cce(0x3e1)];VisuMZ[_0x472cce(0x2d5)][_0x472cce(0x2f7)](_0x2a2ab8,_0x472cce(0x3b9),_0x5be534[_0x472cce(0x3b9)]),VisuMZ['SkillLearnSystem'][_0x472cce(0x2f7)](_0x2a2ab8,_0x472cce(0x22a),_0x5be534[_0x472cce(0x22a)]),VisuMZ[_0x472cce(0x2d5)][_0x472cce(0x2f7)](_0x2a2ab8,_0x472cce(0x37b),_0x5be534['jsLearnJpCost']),VisuMZ[_0x472cce(0x2d5)][_0x472cce(0x2f7)](_0x2a2ab8,_0x472cce(0x2b2),_0x5be534[_0x472cce(0x2b2)]),VisuMZ[_0x472cce(0x2d5)][_0x472cce(0x254)](_0x2a2ab8,'jsLearnShow',_0x5be534[_0x472cce(0x306)]),VisuMZ['SkillLearnSystem'][_0x472cce(0x366)](_0x2a2ab8,_0x472cce(0x218),_0x5be534['jsLearnReq']),VisuMZ['SkillLearnSystem'][_0x472cce(0x29a)](_0x2a2ab8,_0x472cce(0x3f4),_0x5be534[_0x472cce(0x3f4)]),VisuMZ[_0x472cce(0x2d5)]['createTextJS'](_0x2a2ab8,_0x472cce(0x3d5),_0x5be534[_0x472cce(0x3d5)]),VisuMZ[_0x472cce(0x2d5)][_0x472cce(0x29a)](_0x2a2ab8,'jsLearnReqListTxt',_0x5be534['jsLearnReqListTxt']),VisuMZ[_0x472cce(0x2d5)][_0x472cce(0x29a)](_0x2a2ab8,_0x472cce(0x3db),_0x5be534[_0x472cce(0x3db)]),VisuMZ[_0x472cce(0x2d5)][_0x472cce(0x278)](_0x2a2ab8,'jsOnLearn',_0x5be534[_0x472cce(0x2e9)]);},VisuMZ[_0x397bec(0x2d5)]['createCostJS']=function(_0x4260c5,_0x494b5c,_0x1f673f){const _0x502c3f=_0x397bec,_0x52dffc=_0x4260c5[_0x502c3f(0x3a0)];if(_0x52dffc[_0x502c3f(0x3f5)](_0x1f673f)){const _0x355201=String(RegExp['$1']),_0x1d6d46=_0x502c3f(0x35c)[_0x502c3f(0x2f5)](_0x355201),_0x271864=VisuMZ['SkillLearnSystem'][_0x502c3f(0x3ac)](_0x4260c5,_0x494b5c);VisuMZ['SkillLearnSystem']['JS'][_0x271864]=new Function(_0x1d6d46);}},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x254)]=function(_0x16a3f2,_0x193ec7,_0x4cd4c3){const _0x1f1547=_0x397bec,_0x18a8c3=_0x16a3f2[_0x1f1547(0x3a0)];if(_0x18a8c3[_0x1f1547(0x3f5)](_0x4cd4c3)){const _0x146960=String(RegExp['$1']),_0x230d13='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x1f1547(0x2f5)](_0x146960),_0x588102=VisuMZ[_0x1f1547(0x2d5)][_0x1f1547(0x3ac)](_0x16a3f2,_0x193ec7);VisuMZ['SkillLearnSystem']['JS'][_0x588102]=new Function(_0x230d13);}},VisuMZ[_0x397bec(0x2d5)]['createConditionJS']=function(_0x2bc9f6,_0x5f24c5,_0x3ff240){const _0x2e5023=_0x397bec,_0x579788=_0x2bc9f6[_0x2e5023(0x3a0)];if(_0x579788[_0x2e5023(0x3f5)](_0x3ff240)){if(_0x2e5023(0x37c)===_0x2e5023(0x2ad))return this[_0x2e5023(0x22b)];else{const _0x27870c=String(RegExp['$1']),_0x48aebf=_0x2e5023(0x22d)[_0x2e5023(0x2f5)](_0x27870c),_0x261f96=VisuMZ[_0x2e5023(0x2d5)][_0x2e5023(0x3ac)](_0x2bc9f6,_0x5f24c5);VisuMZ[_0x2e5023(0x2d5)]['JS'][_0x261f96]=new Function(_0x48aebf);}}},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x29a)]=function(_0x2f4ad3,_0x31524f,_0x26b26d){const _0x2f35f0=_0x397bec,_0x51e49a=_0x2f4ad3[_0x2f35f0(0x3a0)];if(_0x51e49a[_0x2f35f0(0x3f5)](_0x26b26d)){const _0x4c7c76=String(RegExp['$1']),_0x31cd2f=_0x2f35f0(0x2eb)['format'](_0x4c7c76),_0x37ddb4=VisuMZ[_0x2f35f0(0x2d5)]['createKeyJS'](_0x2f4ad3,_0x31524f);VisuMZ[_0x2f35f0(0x2d5)]['JS'][_0x37ddb4]=new Function(_0x31cd2f);}},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x278)]=function(_0xe8edca,_0x574cf6,_0x3636b0){const _0x2e1c3d=_0x397bec,_0x1f2110=_0xe8edca[_0x2e1c3d(0x3a0)];if(_0x1f2110[_0x2e1c3d(0x3f5)](_0x3636b0)){const _0x3e94be=String(RegExp['$1']),_0x296f40=_0x2e1c3d(0x27d)[_0x2e1c3d(0x2f5)](_0x3e94be),_0xf0edfd=VisuMZ[_0x2e1c3d(0x2d5)]['createKeyJS'](_0xe8edca,_0x574cf6);VisuMZ[_0x2e1c3d(0x2d5)]['JS'][_0xf0edfd]=new Function(_0x296f40);}},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x3ac)]=function(_0x710644,_0x535514){const _0x4669d8=_0x397bec;let _0x949ca='';if($dataActors[_0x4669d8(0x374)](_0x710644))_0x949ca=_0x4669d8(0x32a)[_0x4669d8(0x2f5)](_0x710644['id'],_0x535514);if($dataClasses[_0x4669d8(0x374)](_0x710644))_0x949ca=_0x4669d8(0x1cc)[_0x4669d8(0x2f5)](_0x710644['id'],_0x535514);if($dataSkills[_0x4669d8(0x374)](_0x710644))_0x949ca='Skill-%1-%2'[_0x4669d8(0x2f5)](_0x710644['id'],_0x535514);if($dataItems[_0x4669d8(0x374)](_0x710644))_0x949ca=_0x4669d8(0x401)[_0x4669d8(0x2f5)](_0x710644['id'],_0x535514);if($dataWeapons[_0x4669d8(0x374)](_0x710644))_0x949ca=_0x4669d8(0x3bf)[_0x4669d8(0x2f5)](_0x710644['id'],_0x535514);if($dataArmors[_0x4669d8(0x374)](_0x710644))_0x949ca=_0x4669d8(0x448)[_0x4669d8(0x2f5)](_0x710644['id'],_0x535514);if($dataEnemies[_0x4669d8(0x374)](_0x710644))_0x949ca=_0x4669d8(0x250)[_0x4669d8(0x2f5)](_0x710644['id'],_0x535514);if($dataStates[_0x4669d8(0x374)](_0x710644))_0x949ca='State-%1-%2'['format'](_0x710644['id'],_0x535514);return _0x949ca;},DataManager[_0x397bec(0x459)]=function(_0x31fe4a){const _0x3e3b8a=_0x397bec;_0x31fe4a=_0x31fe4a['toUpperCase']()[_0x3e3b8a(0x3ea)](),this[_0x3e3b8a(0x3b1)]=this[_0x3e3b8a(0x3b1)]||{};if(this[_0x3e3b8a(0x3b1)][_0x31fe4a])return this['_classIDs'][_0x31fe4a];for(const _0x8c5929 of $dataClasses){if(!_0x8c5929)continue;let _0x55ccfa=_0x8c5929[_0x3e3b8a(0x3ef)];_0x55ccfa=_0x55ccfa['replace'](/\x1I\[(\d+)\]/gi,''),_0x55ccfa=_0x55ccfa[_0x3e3b8a(0x323)](/\\I\[(\d+)\]/gi,''),this[_0x3e3b8a(0x3b1)][_0x55ccfa['toUpperCase']()[_0x3e3b8a(0x3ea)]()]=_0x8c5929['id'];}return this[_0x3e3b8a(0x3b1)][_0x31fe4a]||0x0;},DataManager[_0x397bec(0x1f1)]=function(_0x52e8a2){const _0x387e54=_0x397bec;_0x52e8a2=_0x52e8a2[_0x387e54(0x353)]()[_0x387e54(0x3ea)](),this[_0x387e54(0x3c3)]=this[_0x387e54(0x3c3)]||{};if(this[_0x387e54(0x3c3)][_0x52e8a2])return this[_0x387e54(0x3c3)][_0x52e8a2];for(const _0x2e0f92 of $dataSkills){if(!_0x2e0f92)continue;this[_0x387e54(0x3c3)][_0x2e0f92['name'][_0x387e54(0x353)]()[_0x387e54(0x3ea)]()]=_0x2e0f92['id'];}return this[_0x387e54(0x3c3)][_0x52e8a2]||0x0;},DataManager[_0x397bec(0x27c)]=function(_0x2aeaa2){const _0x3a3e0e=_0x397bec;_0x2aeaa2=_0x2aeaa2[_0x3a3e0e(0x353)]()[_0x3a3e0e(0x3ea)](),this[_0x3a3e0e(0x449)]=this[_0x3a3e0e(0x449)]||{};if(this[_0x3a3e0e(0x449)][_0x2aeaa2])return this[_0x3a3e0e(0x449)][_0x2aeaa2];for(const _0x5ae604 of $dataItems){if(_0x3a3e0e(0x3a7)==='piXft'){if(!_0x5ae604)continue;this[_0x3a3e0e(0x449)][_0x5ae604[_0x3a3e0e(0x3ef)]['toUpperCase']()['trim']()]=_0x5ae604['id'];}else _0x2b4395[_0x3a3e0e(0x2de)](_0x4b9393,_0x186386);}return this['_itemIDs'][_0x2aeaa2]||0x0;},DataManager[_0x397bec(0x344)]=function(_0x332df7){const _0x2a32f5=_0x397bec;_0x332df7=_0x332df7[_0x2a32f5(0x353)]()[_0x2a32f5(0x3ea)](),this[_0x2a32f5(0x3d8)]=this['_weaponIDs']||{};if(this[_0x2a32f5(0x3d8)][_0x332df7])return this[_0x2a32f5(0x3d8)][_0x332df7];for(const _0x3a342a of $dataWeapons){if(!_0x3a342a)continue;this['_weaponIDs'][_0x3a342a[_0x2a32f5(0x3ef)][_0x2a32f5(0x353)]()[_0x2a32f5(0x3ea)]()]=_0x3a342a['id'];}return this[_0x2a32f5(0x3d8)][_0x332df7]||0x0;},DataManager[_0x397bec(0x1e6)]=function(_0x4f7c77){const _0x43c3ed=_0x397bec;_0x4f7c77=_0x4f7c77[_0x43c3ed(0x353)]()['trim'](),this[_0x43c3ed(0x45d)]=this[_0x43c3ed(0x45d)]||{};if(this[_0x43c3ed(0x45d)][_0x4f7c77])return this[_0x43c3ed(0x45d)][_0x4f7c77];for(const _0x30a4df of $dataArmors){if(_0x43c3ed(0x3c9)!==_0x43c3ed(0x3c9)){if(!this[_0x43c3ed(0x437)])return;this[_0x43c3ed(0x33d)](this[_0x43c3ed(0x437)]),this[_0x43c3ed(0x437)]['destroy'](),this[_0x43c3ed(0x437)]=_0x1ad8ec;}else{if(!_0x30a4df)continue;this['_armorIDs'][_0x30a4df['name'][_0x43c3ed(0x353)]()[_0x43c3ed(0x3ea)]()]=_0x30a4df['id'];}}return this[_0x43c3ed(0x45d)][_0x4f7c77]||0x0;},DataManager[_0x397bec(0x318)]=function(_0x490c33){const _0x15f0b9=_0x397bec;if(!$dataClasses[_0x490c33])return[];const _0x368827=[],_0x5a8ccf=$dataClasses[_0x490c33]['note'],_0x262550=VisuMZ[_0x15f0b9(0x2d5)]['RegExp'],_0x38d246=_0x5a8ccf[_0x15f0b9(0x3f5)](_0x262550[_0x15f0b9(0x30b)]);if(_0x38d246){if(_0x15f0b9(0x33b)===_0x15f0b9(0x31e))_0x51756c=0x0;else for(const _0x170053 of _0x38d246){if(_0x15f0b9(0x38d)!=='TdtBf'){if(!_0x170053)continue;_0x170053['match'](_0x262550['LearnSkillA']);const _0x3c962b=String(RegExp['$1'])['split'](',')[_0x15f0b9(0x281)](_0x20de2a=>_0x20de2a['trim']());;for(let _0xe35c95 of _0x3c962b){_0xe35c95=(String(_0xe35c95)||'')[_0x15f0b9(0x3ea)]();const _0x1db776=/^\d+$/['test'](_0xe35c95);_0x1db776?_0x15f0b9(0x26a)===_0x15f0b9(0x26a)?_0x368827['push'](Number(_0xe35c95)):_0x204796=_0x3d8008[_0x15f0b9(0x1f1)](_0x16525d):'fqbge'!==_0x15f0b9(0x1c6)?_0x147e34=_0x39480e[_0x15f0b9(0x459)](_0x22bdff):_0x368827['push'](DataManager[_0x15f0b9(0x1f1)](_0xe35c95));}}else{const _0x16eb6d=_0x4c3477(_0x9746e9['$1']),_0x2ddae2=_0x4a6d2b[_0x15f0b9(0x39f)][_0x15f0b9(0x2f5)](_0x16eb6d,_0x42a445[_0x15f0b9(0x208)],_0x114b81[_0x15f0b9(0x285)]),_0x1a6ce5=_0x2f00b6[_0x15f0b9(0x208)]>=_0x16eb6d?_0x459cba:_0x5c54ff;_0x3c0711+=_0x1a6ce5['format'](_0x2ddae2)+'\x0a';}}}const _0x1e4384=_0x5a8ccf[_0x15f0b9(0x3f5)](_0x262550[_0x15f0b9(0x367)]);if(_0x1e4384)for(const _0x5df56c of _0x1e4384){if('QMnRm'!==_0x15f0b9(0x44c)){if(!_0x5df56c)continue;_0x5df56c[_0x15f0b9(0x3f5)](_0x262550[_0x15f0b9(0x30b)]);const _0x55eeb5=String(RegExp['$1'])[_0x15f0b9(0x20a)](/[\r\n]+/);for(let _0x14ded2 of _0x55eeb5){_0x14ded2=(String(_0x14ded2)||'')[_0x15f0b9(0x3ea)]();const _0xcea46e=/^\d+$/[_0x15f0b9(0x37a)](_0x14ded2);_0xcea46e?_0x368827[_0x15f0b9(0x266)](Number(_0x14ded2)):_0x15f0b9(0x3b4)!==_0x15f0b9(0x3b4)?_0x2de7d2=_0x54773f:_0x368827[_0x15f0b9(0x266)](DataManager[_0x15f0b9(0x1f1)](_0x14ded2));}}else _0x5a2e00=0x0;}return _0x368827['sort']((_0x39f979,_0x3fc9b4)=>_0x39f979-_0x3fc9b4)[_0x15f0b9(0x407)]((_0x4c5827,_0x204008,_0x2d0599)=>_0x2d0599[_0x15f0b9(0x22e)](_0x4c5827)===_0x204008);},DataManager[_0x397bec(0x44d)]=function(_0x58b099){const _0x260f11=_0x397bec;if(!_0x58b099)return 0x0;if(!DataManager['isSkill'](_0x58b099))return 0x0;const _0x2b8905=VisuMZ['SkillLearnSystem'][_0x260f11(0x3e1)],_0x4cc3df=_0x58b099[_0x260f11(0x3a0)];if(_0x4cc3df[_0x260f11(0x3f5)](_0x2b8905[_0x260f11(0x3a9)]))return Number(RegExp['$1']);if(_0x4cc3df['match'](_0x2b8905[_0x260f11(0x380)])){const _0x143bad=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0xf85519 of _0x143bad){if(_0x260f11(0x3e0)!==_0x260f11(0x3e0))return!!_0x393476[_0x260f11(0x24e)];else{if(_0xf85519[_0x260f11(0x3f5)](/(?:ABILITY POINTS|AP):[ ](\d+)/gi))return Number(RegExp['$1']);}}}const _0x9fe411=VisuMZ[_0x260f11(0x2d5)][_0x260f11(0x3ac)](_0x58b099,'jsLearnApCost');if(VisuMZ[_0x260f11(0x2d5)]['JS'][_0x9fe411]){const _0x588c72=SceneManager['_scene'][_0x260f11(0x416)]();return VisuMZ[_0x260f11(0x2d5)]['JS'][_0x9fe411]['call'](this,_0x588c72,_0x58b099);}return VisuMZ[_0x260f11(0x2d5)][_0x260f11(0x2a2)][_0x260f11(0x298)]['DefaultCost']||0x0;},DataManager[_0x397bec(0x1d7)]=function(_0x5c94c0){const _0x1bf2be=_0x397bec;if(!_0x5c94c0)return 0x0;if(!DataManager[_0x1bf2be(0x3f6)](_0x5c94c0))return 0x0;const _0x39e675=VisuMZ['SkillLearnSystem'][_0x1bf2be(0x3e1)],_0x33cdc2=_0x5c94c0['note'];if(_0x33cdc2['match'](_0x39e675[_0x1bf2be(0x28d)]))return Number(RegExp['$1']);if(_0x33cdc2[_0x1bf2be(0x3f5)](_0x39e675[_0x1bf2be(0x380)])){if(_0x1bf2be(0x3d7)!==_0x1bf2be(0x362)){const _0xa86518=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x381e8e of _0xa86518){if(_0x1bf2be(0x1c2)===_0x1bf2be(0x258))_0x4a06ef=_0x372154||this[_0x1bf2be(0x428)]()['id'];else{if(_0x381e8e[_0x1bf2be(0x3f5)](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return Number(RegExp['$1']);}}}else this[_0x1bf2be(0x3da)](...arguments);}const _0x372170=VisuMZ['SkillLearnSystem'][_0x1bf2be(0x3ac)](_0x5c94c0,_0x1bf2be(0x22a));if(VisuMZ[_0x1bf2be(0x2d5)]['JS'][_0x372170]){const _0x2fea47=SceneManager[_0x1bf2be(0x28b)]['user']();return VisuMZ[_0x1bf2be(0x2d5)]['JS'][_0x372170][_0x1bf2be(0x42b)](this,_0x2fea47,_0x5c94c0)||0x0;}return VisuMZ[_0x1bf2be(0x20f)][_0x1bf2be(0x2a2)][_0x1bf2be(0x32b)][_0x1bf2be(0x256)]||0x0;},DataManager['getSkillLearnJobPointCost']=function(_0x21d9b){const _0xf4e97a=_0x397bec;if(!_0x21d9b)return 0x0;if(!DataManager[_0xf4e97a(0x3f6)](_0x21d9b))return 0x0;const _0x231a98=VisuMZ[_0xf4e97a(0x2d5)][_0xf4e97a(0x3e1)],_0x14f93d=_0x21d9b[_0xf4e97a(0x3a0)];if(_0x14f93d['match'](_0x231a98[_0xf4e97a(0x341)]))return Number(RegExp['$1']);if(_0x14f93d[_0xf4e97a(0x3f5)](_0x231a98[_0xf4e97a(0x380)])){const _0x614d93=String(RegExp['$1'])[_0xf4e97a(0x20a)](/[\r\n]+/);for(const _0x4758f9 of _0x614d93){if(_0x4758f9['match'](/(?:JOB POINTS|JP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x40483b=VisuMZ[_0xf4e97a(0x2d5)][_0xf4e97a(0x3ac)](_0x21d9b,_0xf4e97a(0x37b));if(VisuMZ[_0xf4e97a(0x2d5)]['JS'][_0x40483b]){const _0x122607=SceneManager['_scene']['user']();return VisuMZ[_0xf4e97a(0x2d5)]['JS'][_0x40483b][_0xf4e97a(0x42b)](this,_0x122607,_0x21d9b);}return VisuMZ[_0xf4e97a(0x20f)][_0xf4e97a(0x2a2)][_0xf4e97a(0x26b)][_0xf4e97a(0x256)]||0x0;},DataManager[_0x397bec(0x26d)]=function(_0x23fb21){const _0x2508ac=_0x397bec;if(!_0x23fb21)return 0x0;if(!DataManager[_0x2508ac(0x3f6)](_0x23fb21))return 0x0;const _0x4b037f=VisuMZ[_0x2508ac(0x2d5)]['RegExp'],_0x51ee00=_0x23fb21[_0x2508ac(0x3a0)];if(_0x51ee00[_0x2508ac(0x3f5)](_0x4b037f[_0x2508ac(0x1db)]))return Number(RegExp['$1']);if(_0x51ee00[_0x2508ac(0x3f5)](_0x4b037f[_0x2508ac(0x380)])){const _0x50f578=String(RegExp['$1'])[_0x2508ac(0x20a)](/[\r\n]+/);for(const _0x2908bc of _0x50f578){if(_0x2908bc['match'](/(?:SKILL POINTS|SP):[ ](\d+)/gi)){if(_0x2508ac(0x455)===_0x2508ac(0x377))_0x425c4b+=_0x24ca39[_0x2508ac(0x1d9)]((_0x24b238-_0x9e513b)/0x2);else return Number(RegExp['$1']);}}}const _0x77978e=VisuMZ['SkillLearnSystem'][_0x2508ac(0x3ac)](_0x23fb21,_0x2508ac(0x2b2));if(VisuMZ[_0x2508ac(0x2d5)]['JS'][_0x77978e]){const _0x3d63cd=SceneManager[_0x2508ac(0x28b)]['user']();return VisuMZ[_0x2508ac(0x2d5)]['JS'][_0x77978e][_0x2508ac(0x42b)](this,_0x3d63cd,_0x23fb21);}return VisuMZ['SkillLearnSystem']['Settings'][_0x2508ac(0x295)][_0x2508ac(0x256)]||0x0;},DataManager[_0x397bec(0x1bf)]=function(_0x2f5f92){const _0xad404b=_0x397bec;if(!_0x2f5f92)return 0x0;if(!DataManager[_0xad404b(0x3f6)](_0x2f5f92))return 0x0;const _0x4b6491=VisuMZ[_0xad404b(0x2d5)][_0xad404b(0x3e1)],_0x574191=_0x2f5f92[_0xad404b(0x3a0)],_0x37eb9a=[],_0x5ae5ab=_0x574191[_0xad404b(0x3f5)](_0x4b6491[_0xad404b(0x233)]);if(_0x5ae5ab){if(_0xad404b(0x43e)!=='JFPwi')for(const _0xfa5c54 of _0x5ae5ab){if('duNFP'!==_0xad404b(0x388))this[_0xad404b(0x331)]();else{if(!_0xfa5c54)continue;_0xfa5c54[_0xad404b(0x3f5)](_0x4b6491['LearnItemCost']);const _0x26eb54=String(RegExp['$1']),_0x1786c6={'id':0x0,'quantity':Number(RegExp['$2'])},_0x290367=/^\d+$/[_0xad404b(0x37a)](_0x26eb54);_0x290367?_0xad404b(0x1e3)!==_0xad404b(0x3cc)?_0x1786c6['id']=Number(_0x26eb54):_0x86900a=_0x44e9f8[_0xad404b(0x1f1)](_0x5ab7a5):_0x1786c6['id']=DataManager[_0xad404b(0x27c)](_0x26eb54),_0x1786c6['id']>0x0&&_0x37eb9a[_0xad404b(0x266)](_0x1786c6);}}else this[_0xad404b(0x20c)](-_0x59a011,_0xe2ac76);}if(_0x574191[_0xad404b(0x3f5)](_0x4b6491['LearnCostBatch'])){if(_0xad404b(0x29d)!=='CGQKG'){const _0x45a467=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x316aa0 of _0x45a467){if(_0x316aa0[_0xad404b(0x3f5)](/ITEM[ ](.*):[ ](\d+)/gi)){if('hCjZd'!=='hCjZd')_0x18295f=_0x208e9b||this[_0xad404b(0x428)]()['id'];else{const _0x3e0ded=String(RegExp['$1']),_0x364b52={'id':0x0,'quantity':Number(RegExp['$2'])},_0x4b811d=/^\d+$/['test'](_0x3e0ded);_0x4b811d?_0xad404b(0x3ae)===_0xad404b(0x221)?_0x37aa7f[_0xad404b(0x266)](_0x670e03):_0x364b52['id']=Number(_0x3e0ded):_0x364b52['id']=DataManager[_0xad404b(0x27c)](_0x3e0ded),_0x364b52['id']>0x0&&_0x37eb9a[_0xad404b(0x266)](_0x364b52);}}}}else return this['deadMembers']()[_0xad404b(0x42a)]((_0x29e9f2,_0x2fdabe)=>_0x29e9f2+_0x2fdabe[_0xad404b(0x2b8)](),0x0);}return _0x37eb9a;},DataManager[_0x397bec(0x1c8)]=function(_0x12f6f0){const _0x3fb12f=_0x397bec;if(!_0x12f6f0)return 0x0;if(!DataManager[_0x3fb12f(0x3f6)](_0x12f6f0))return 0x0;const _0x543bf4=VisuMZ[_0x3fb12f(0x2d5)][_0x3fb12f(0x3e1)],_0x555fa1=_0x12f6f0[_0x3fb12f(0x3a0)],_0x1eef70=[],_0x36347a=_0x555fa1[_0x3fb12f(0x3f5)](_0x543bf4[_0x3fb12f(0x29e)]);if(_0x36347a){if('lBQft'===_0x3fb12f(0x3bd))_0xdcba82(_0x3fb12f(0x21f)['format'](_0xe39079,_0x3f84f3)),_0x344b0f['exit']();else for(const _0x2f4707 of _0x36347a){if(!_0x2f4707)continue;_0x2f4707[_0x3fb12f(0x3f5)](_0x543bf4[_0x3fb12f(0x29e)]);const _0x38abda=String(RegExp['$1']),_0x1cec40={'id':0x0,'quantity':Number(RegExp['$2'])},_0x45fbdb=/^\d+$/['test'](_0x38abda);if(_0x45fbdb)_0x3fb12f(0x1c9)==='PKyBV'?_0x1cec40['id']=Number(_0x38abda):this[_0x3fb12f(0x34f)]=_0x2b4ce4['SkillLearnSystem'][_0x3fb12f(0x2a2)]['MenuAccess'][_0x3fb12f(0x282)];else{if(_0x3fb12f(0x244)!==_0x3fb12f(0x206))_0x1cec40['id']=DataManager[_0x3fb12f(0x344)](_0x38abda);else{if(_0x48a479[_0x3fb12f(0x3f5)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return _0x447cd6(_0x28f5a2['$1']);}}_0x1cec40['id']>0x0&&('sNGks'!==_0x3fb12f(0x2d2)?_0x1eef70[_0x3fb12f(0x266)](_0x1cec40):_0x370126['push'](_0x154d69['getSkillIdWithName'](_0x53d970)));}}if(_0x555fa1[_0x3fb12f(0x3f5)](_0x543bf4[_0x3fb12f(0x380)])){if(_0x3fb12f(0x44a)===_0x3fb12f(0x44a)){const _0x3a701c=String(RegExp['$1'])[_0x3fb12f(0x20a)](/[\r\n]+/);for(const _0x37e117 of _0x3a701c){if('SCdjk'==='pvsfB')return _0x3d0943=_0x4d9d41[_0x3fb12f(0x39a)],_0x546a29[_0x3fb12f(0x2f5)](_0x3b8b66,_0x5081a1['abilityPointsAbbr'],_0x3fb12f(0x293)['format'](_0x4f5c92[_0x3fb12f(0x441)]),_0x10f836[_0x3fb12f(0x39b)]);else{if(_0x37e117[_0x3fb12f(0x3f5)](/WEAPON[ ](.*):[ ](\d+)/gi)){const _0x40d78f=String(RegExp['$1']),_0x24cdd6={'id':0x0,'quantity':Number(RegExp['$2'])},_0x21fbf6=/^\d+$/['test'](_0x40d78f);if(_0x21fbf6)_0x24cdd6['id']=Number(_0x40d78f);else{if(_0x3fb12f(0x3c5)==='lieLw'){const _0x3b6a01=_0x1553bb[_0x3fb12f(0x28b)];if(!_0x3b6a01)return![];const _0x285ee9=_0x3b6a01['_itemWindow'];if(!_0x285ee9)return![];return _0x285ee9[_0x3fb12f(0x36f)]&&_0x285ee9[_0x3fb12f(0x36f)]();}else _0x24cdd6['id']=DataManager[_0x3fb12f(0x344)](_0x40d78f);}_0x24cdd6['id']>0x0&&_0x1eef70[_0x3fb12f(0x266)](_0x24cdd6);}}}}else{_0x4b0c85=_0x43c87a||'left';const _0x4ddc67='\x5cI[%1]'['format'](_0x330e63[_0x3fb12f(0x441)]),_0x3fc574=_0x3fed0e[_0x3fb12f(0x39a)],_0x5a572f=_0x3fc574[_0x3fb12f(0x2f5)](_0x243345,_0x39514c['abilityPointsAbbr'],_0x4ddc67,_0x39d5fb['abilityPointsFull']),_0x9ff113=this[_0x3fb12f(0x350)](_0x5a572f)[_0x3fb12f(0x386)];if(_0x694c54==='left')_0x8d6d75+=0x0;else _0x292ccd===_0x3fb12f(0x202)?_0x490afc+=_0x74149c['round']((_0x2ad59c-_0x9ff113)/0x2):_0x4f45b1+=_0xa60df2-_0x9ff113;this[_0x3fb12f(0x3c4)](_0x5a572f,_0x66784,_0x8af3ba);}}return _0x1eef70;},DataManager['getSkillLearnArmorCost']=function(_0xe69639){const _0xa49575=_0x397bec;if(!_0xe69639)return 0x0;if(!DataManager['isSkill'](_0xe69639))return 0x0;const _0x1771f6=VisuMZ[_0xa49575(0x2d5)][_0xa49575(0x3e1)],_0xbc956f=_0xe69639[_0xa49575(0x3a0)],_0x4c00fd=[],_0x122231=_0xbc956f['match'](_0x1771f6[_0xa49575(0x3c1)]);if(_0x122231)for(const _0x3cd638 of _0x122231){if(!_0x3cd638)continue;_0x3cd638[_0xa49575(0x3f5)](_0x1771f6[_0xa49575(0x3c1)]);const _0x1ecc5e=String(RegExp['$1']),_0x35d1fe={'id':0x0,'quantity':Number(RegExp['$2'])},_0x150551=/^\d+$/['test'](_0x1ecc5e);_0x150551?_0x35d1fe['id']=Number(_0x1ecc5e):_0x35d1fe['id']=DataManager['getArmorIdWithName'](_0x1ecc5e),_0x35d1fe['id']>0x0&&_0x4c00fd[_0xa49575(0x266)](_0x35d1fe);}if(_0xbc956f[_0xa49575(0x3f5)](_0x1771f6[_0xa49575(0x380)])){const _0x2bed4b=String(RegExp['$1'])[_0xa49575(0x20a)](/[\r\n]+/);for(const _0x51cb09 of _0x2bed4b){if(_0xa49575(0x392)!==_0xa49575(0x2bb)){if(_0x51cb09[_0xa49575(0x3f5)](/ARMOR[ ](.*):[ ](\d+)/gi)){const _0xb7cb83=String(RegExp['$1']),_0x170e53={'id':0x0,'quantity':Number(RegExp['$2'])},_0x5556fb=/^\d+$/[_0xa49575(0x37a)](_0xb7cb83);_0x5556fb?_0x170e53['id']=Number(_0xb7cb83):_0x170e53['id']=DataManager[_0xa49575(0x1e6)](_0xb7cb83),_0x170e53['id']>0x0&&_0x4c00fd[_0xa49575(0x266)](_0x170e53);}}else this['initAbilityPoints']();}}return _0x4c00fd;},DataManager[_0x397bec(0x400)]=function(_0x2cbad3){const _0xe42509=_0x397bec;if(!_0x2cbad3)return 0x0;if(!DataManager[_0xe42509(0x3f6)](_0x2cbad3))return 0x0;const _0x3a001e=VisuMZ['SkillLearnSystem'][_0xe42509(0x3e1)],_0x3c8b19=_0x2cbad3[_0xe42509(0x3a0)];if(_0x3c8b19[_0xe42509(0x3f5)](_0x3a001e[_0xe42509(0x3eb)]))return Number(RegExp['$1']);if(_0x3c8b19[_0xe42509(0x3f5)](_0x3a001e[_0xe42509(0x380)])){const _0x5def74=String(RegExp['$1'])[_0xe42509(0x20a)](/[\r\n]+/);for(const _0x286391 of _0x5def74){if(_0x286391[_0xe42509(0x3f5)](/GOLD:[ ](\d+)/gi)){if(_0xe42509(0x382)===_0xe42509(0x382))return Number(RegExp['$1']);else this['applySkillPoints']();}}}return 0x0;},TextManager[_0x397bec(0x1f9)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)]['MenuAccess']['Icon'],ImageManager[_0x397bec(0x441)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x298)][_0x397bec(0x1eb)],ImageManager[_0x397bec(0x2ce)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x295)][_0x397bec(0x1eb)],SoundManager['playSkillLearn']=function(){const _0x4935aa=_0x397bec;AudioManager[_0x4935aa(0x354)](VisuMZ[_0x4935aa(0x2d5)][_0x4935aa(0x2a2)][_0x4935aa(0x29b)]);},TextManager['skillLearnAlreadyLearned']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)]['General'][_0x397bec(0x408)],TextManager[_0x397bec(0x1d8)]=VisuMZ['SkillLearnSystem']['Settings'][_0x397bec(0x2c7)][_0x397bec(0x369)],TextManager['skillLearnReqSeparatorFmt']=VisuMZ['SkillLearnSystem']['Settings']['General']['ReqSeparateFmt'],TextManager[_0x397bec(0x419)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)]['General'][_0x397bec(0x35d)],TextManager[_0x397bec(0x319)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x2c7)]['ReqSkillFmt'],TextManager['skillLearnReqSwitchFmt']=VisuMZ['SkillLearnSystem'][_0x397bec(0x2a2)][_0x397bec(0x2c7)][_0x397bec(0x393)],TextManager[_0x397bec(0x3e9)]=VisuMZ[_0x397bec(0x2d5)]['Settings'][_0x397bec(0x2c7)][_0x397bec(0x20e)],TextManager[_0x397bec(0x307)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)]['General'][_0x397bec(0x212)],TextManager[_0x397bec(0x2ed)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x2c7)][_0x397bec(0x23d)],TextManager['skillLearnArmorFmt']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x2c7)][_0x397bec(0x349)],TextManager[_0x397bec(0x43b)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)]['General'][_0x397bec(0x1ed)],TextManager[_0x397bec(0x2a0)]=VisuMZ[_0x397bec(0x2d5)]['Settings'][_0x397bec(0x264)][_0x397bec(0x289)],TextManager[_0x397bec(0x384)]=VisuMZ['SkillLearnSystem'][_0x397bec(0x2a2)][_0x397bec(0x261)]['RequirementTitle'],TextManager['skillLearnReqMet']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x261)][_0x397bec(0x2d3)],TextManager['skillLearnReqNotMet']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)]['Window'][_0x397bec(0x2e7)],TextManager[_0x397bec(0x39f)]=VisuMZ[_0x397bec(0x2d5)]['Settings'][_0x397bec(0x261)][_0x397bec(0x35d)],TextManager['skillLearnReqListSkill']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x261)][_0x397bec(0x368)],TextManager[_0x397bec(0x2e1)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)]['Window'][_0x397bec(0x393)],TextManager[_0x397bec(0x1ef)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x261)][_0x397bec(0x3d2)],TextManager['skillLearningName']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x261)][_0x397bec(0x365)],TextManager[_0x397bec(0x23f)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x261)][_0x397bec(0x2cd)],TextManager[_0x397bec(0x1bb)]=VisuMZ[_0x397bec(0x2d5)]['Settings']['Window'][_0x397bec(0x3ec)],TextManager[_0x397bec(0x432)]=VisuMZ['SkillLearnSystem'][_0x397bec(0x2a2)][_0x397bec(0x261)][_0x397bec(0x2bc)],TextManager[_0x397bec(0x29c)]=VisuMZ['SkillLearnSystem'][_0x397bec(0x2a2)][_0x397bec(0x261)][_0x397bec(0x1da)],TextManager['abilityPointsFull']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x298)][_0x397bec(0x27b)],TextManager[_0x397bec(0x450)]=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x298)][_0x397bec(0x348)],TextManager['abilityPointsFmt']=VisuMZ[_0x397bec(0x2d5)]['Settings'][_0x397bec(0x298)][_0x397bec(0x288)],TextManager['skillPointsFull']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)]['SkillPoints']['FullText'],TextManager[_0x397bec(0x235)]=VisuMZ[_0x397bec(0x2d5)]['Settings'][_0x397bec(0x295)]['AbbrText'],TextManager['skillPointsFmt']=VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2a2)][_0x397bec(0x295)]['TextFmt'],VisuMZ[_0x397bec(0x2d5)]['BattleManager_makeRewards']=BattleManager[_0x397bec(0x3a4)],BattleManager[_0x397bec(0x3a4)]=function(){const _0x2746ab=_0x397bec;VisuMZ[_0x2746ab(0x2d5)]['BattleManager_makeRewards']['call'](this),this['makeRewardsAbilityPoints'](),this[_0x2746ab(0x31f)](),this[_0x2746ab(0x242)](),this[_0x2746ab(0x255)]();},VisuMZ[_0x397bec(0x2d5)]['BattleManager_displayRewards']=BattleManager[_0x397bec(0x3c8)],BattleManager[_0x397bec(0x3c8)]=function(){const _0x85221d=_0x397bec;VisuMZ['SkillLearnSystem'][_0x85221d(0x3df)][_0x85221d(0x42b)](this),this[_0x85221d(0x1fd)](),this[_0x85221d(0x1bd)]();},BattleManager[_0x397bec(0x294)]=function(){const _0x595aad=_0x397bec;this[_0x595aad(0x2e5)][_0x595aad(0x303)]=$gameTroop[_0x595aad(0x41e)]();},BattleManager[_0x397bec(0x1fd)]=function(){const _0x340d10=_0x397bec;if(!this[_0x340d10(0x34c)]())return;$gameMessage[_0x340d10(0x332)]();const _0x2f3c25=$gameParty['members'](),_0x5e3717=VisuMZ[_0x340d10(0x2d5)][_0x340d10(0x2a2)]['AbilityPoints'],_0x1cf5d1=_0x5e3717['VictoryText'];for(const _0x1e521c of _0x2f3c25){if(!_0x1e521c)continue;const _0x4d7e4e=_0x1cf5d1[_0x340d10(0x2f5)](_0x1e521c[_0x340d10(0x3ef)](),_0x1e521c['earnedAbilityPoints'](),TextManager[_0x340d10(0x450)],TextManager[_0x340d10(0x39a)]);$gameMessage['add']('\x5c.'+_0x4d7e4e);}},BattleManager[_0x397bec(0x31f)]=function(){const _0xc93cb1=_0x397bec;this['_rewards'][_0xc93cb1(0x303)]=this['_rewards'][_0xc93cb1(0x303)]||0x0;let _0x53d680=$gameParty[_0xc93cb1(0x276)]();VisuMZ['SkillLearnSystem']['Settings'][_0xc93cb1(0x298)]['AliveActors']&&(_0x53d680=_0x53d680[_0xc93cb1(0x407)](_0x129f90=>_0x129f90[_0xc93cb1(0x347)]()));for(const _0x5f32b1 of _0x53d680){if(_0xc93cb1(0x355)!==_0xc93cb1(0x355))this['finishSkillLearnAnimation']();else{if(!_0x5f32b1)continue;if(!$dataSystem[_0xc93cb1(0x434)]&&!_0x5f32b1['isBattleMember']())continue;_0x5f32b1[_0xc93cb1(0x2de)](this[_0xc93cb1(0x2e5)][_0xc93cb1(0x303)]),_0x5f32b1[_0xc93cb1(0x1df)](this['_rewards'][_0xc93cb1(0x303)]);}}},BattleManager[_0x397bec(0x34c)]=function(){const _0x530227=_0x397bec;return VisuMZ[_0x530227(0x2d5)][_0x530227(0x2a2)][_0x530227(0x298)][_0x530227(0x274)];},BattleManager[_0x397bec(0x242)]=function(){const _0x1e374b=_0x397bec;this[_0x1e374b(0x2e5)][_0x1e374b(0x2b8)]=$gameTroop[_0x1e374b(0x364)]();},BattleManager[_0x397bec(0x1bd)]=function(){const _0x46db90=_0x397bec;if(!this[_0x46db90(0x3b6)]())return;$gameMessage[_0x46db90(0x332)]();const _0x2ce59f=$gameParty[_0x46db90(0x3a6)](),_0x18611f=VisuMZ[_0x46db90(0x2d5)]['Settings'][_0x46db90(0x295)],_0x20881b=_0x18611f[_0x46db90(0x228)];for(const _0x32a4c1 of _0x2ce59f){if(_0x46db90(0x287)===_0x46db90(0x287)){if(!_0x32a4c1)continue;const _0x43cf81=_0x20881b['format'](_0x32a4c1[_0x46db90(0x3ef)](),_0x32a4c1[_0x46db90(0x34d)](),TextManager['skillPointsAbbr'],TextManager[_0x46db90(0x379)]);$gameMessage[_0x46db90(0x260)]('\x5c.'+_0x43cf81);}else return _0x23f542(_0x34c30e['$1']);}},BattleManager[_0x397bec(0x255)]=function(){const _0x38209a=_0x397bec;this[_0x38209a(0x2e5)]['skillPoints']=this[_0x38209a(0x2e5)][_0x38209a(0x2b8)]||0x0;let _0x1203f9=$gameParty[_0x38209a(0x276)]();if(VisuMZ['SkillLearnSystem']['Settings'][_0x38209a(0x295)][_0x38209a(0x3be)]){if(_0x38209a(0x247)!==_0x38209a(0x1e1))_0x1203f9=_0x1203f9[_0x38209a(0x407)](_0x5c9239=>_0x5c9239[_0x38209a(0x347)]());else return _0x68044d['skillLearnAlreadyLearned'];}for(const _0x241b93 of _0x1203f9){if(_0x38209a(0x24b)===_0x38209a(0x24b)){if(!_0x241b93)continue;if(!$dataSystem['optExtraExp']&&!_0x241b93[_0x38209a(0x39e)]())continue;_0x241b93['gainSkillPoints'](this[_0x38209a(0x2e5)][_0x38209a(0x2b8)]),_0x241b93[_0x38209a(0x41f)](this[_0x38209a(0x2e5)][_0x38209a(0x2b8)]);}else this[_0x38209a(0x406)](this[_0x38209a(0x2c4)],this['_actor'][_0x38209a(0x428)]()['id'],_0x3bf513,_0x52654b,_0x136f44,_0x38209a(0x2ab));}},BattleManager[_0x397bec(0x3b6)]=function(){const _0x307ef7=_0x397bec;return VisuMZ[_0x307ef7(0x2d5)][_0x307ef7(0x2a2)][_0x307ef7(0x295)][_0x307ef7(0x274)];},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x26c)]=Game_System[_0x397bec(0x26f)]['initialize'],Game_System[_0x397bec(0x26f)][_0x397bec(0x3da)]=function(){const _0x81a365=_0x397bec;VisuMZ['SkillLearnSystem'][_0x81a365(0x26c)][_0x81a365(0x42b)](this),this['initSkillLearnSystemMenuAccess']();},Game_System[_0x397bec(0x26f)][_0x397bec(0x38f)]=function(){const _0x3acf25=_0x397bec;this[_0x3acf25(0x34f)]=VisuMZ[_0x3acf25(0x2d5)][_0x3acf25(0x2a2)]['MenuAccess'][_0x3acf25(0x282)];},Game_System[_0x397bec(0x26f)][_0x397bec(0x461)]=function(){const _0x4db249=_0x397bec;return this[_0x4db249(0x34f)]===undefined&&this[_0x4db249(0x38f)](),this['_SkillLearnSystem_MenuAccess'];},Game_System[_0x397bec(0x26f)]['setSkillLearnSystemMenuAccess']=function(_0xaa1d16){const _0x33f3dc=_0x397bec;this[_0x33f3dc(0x34f)]===undefined&&this[_0x33f3dc(0x38f)](),this[_0x33f3dc(0x34f)]=_0xaa1d16;},VisuMZ['SkillLearnSystem'][_0x397bec(0x2ca)]=Game_Action['prototype'][_0x397bec(0x279)],Game_Action[_0x397bec(0x26f)][_0x397bec(0x279)]=function(_0x3f5794){const _0x2d658f=_0x397bec;VisuMZ[_0x2d658f(0x2d5)]['Game_Action_applyItemUserEffect']['call'](this,_0x3f5794),this[_0x2d658f(0x399)](_0x3f5794);},Game_Action['prototype']['applySkillLearnSystemUserEffect']=function(_0x44021f){const _0x363806=_0x397bec;if(this[_0x363806(0x2f8)]())this[_0x363806(0x2f0)](_0x44021f);},Game_Action['prototype'][_0x397bec(0x2f0)]=function(_0x256369){const _0x11182e=_0x397bec,_0xacfa83=VisuMZ[_0x11182e(0x2d5)][_0x11182e(0x3e1)],_0xf80b52=this[_0x11182e(0x2f8)]()[_0x11182e(0x3a0)];if($gameParty[_0x11182e(0x2cc)]()){if(this[_0x11182e(0x32d)]()[_0x11182e(0x313)]()&&_0xf80b52[_0x11182e(0x3f5)](_0xacfa83[_0x11182e(0x299)])){if(_0x11182e(0x272)!==_0x11182e(0x21d)){const _0x25e8d8=eval(RegExp['$1']);this['subject']()[_0x11182e(0x2de)](_0x25e8d8);}else _0x59c1d4['id']=_0x3e6f78(_0x4a069f);}else this[_0x11182e(0x331)]();if(_0x256369['isActor']()&&_0xf80b52[_0x11182e(0x3f5)](_0xacfa83[_0x11182e(0x1b7)])){if(_0x11182e(0x3de)!=='fWVth'){const _0x2ee7fd=eval(RegExp['$1']);_0x256369[_0x11182e(0x2de)](_0x2ee7fd);}else{const _0x3b325e=_0x322159(_0x32fd2e['$1']),_0x3896d4='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x11182e(0x2f5)](_0x3b325e),_0x36c810=_0x2d23d5[_0x11182e(0x2d5)][_0x11182e(0x3ac)](_0x22b376,_0xb2b768);_0x21e956[_0x11182e(0x2d5)]['JS'][_0x36c810]=new _0x491063(_0x3896d4);}}}if($gameParty['inBattle']()){if(_0x11182e(0x1cd)!=='OkDqn')_0x2b9c2f['gainSkillPoints'](_0x37d917,_0xa23c63);else{if(this[_0x11182e(0x32d)]()['isActor']()&&_0xf80b52['match'](_0xacfa83[_0x11182e(0x275)])){const _0x294cdd=eval(RegExp['$1']);this[_0x11182e(0x32d)]()['gainSkillPoints'](_0x294cdd);}else{if('xQKzn'==='xQKzn')this[_0x11182e(0x3ca)]();else{const _0x243312=this[_0x11182e(0x310)](_0x1aaa47),_0xc66de3=this['textSizeEx'](_0x243312)[_0x11182e(0x386)];_0x481e4d+=_0x16c067-_0xc66de3,this[_0x11182e(0x3c4)](_0x243312,_0x20699f,_0x3311cf);}}if(_0x256369[_0x11182e(0x313)]()&&_0xf80b52[_0x11182e(0x3f5)](_0xacfa83[_0x11182e(0x3d1)])){const _0x4bc7ca=eval(RegExp['$1']);_0x256369[_0x11182e(0x33e)](_0x4bc7ca);}}}if(_0xf80b52[_0x11182e(0x3f5)](/<NOTETAG>/i)){}},Game_Action[_0x397bec(0x26f)]['applyAbilityPoints']=function(){const _0x20e8e0=_0x397bec;if(!$gameParty['inBattle']())return;if(!this['subject']()[_0x20e8e0(0x313)]())return;const _0xf89f8a=VisuMZ[_0x20e8e0(0x2d5)][_0x20e8e0(0x2a2)]['AbilityPoints'];let _0x51a638=0x0;try{_0x51a638=eval(_0xf89f8a[_0x20e8e0(0x1fa)]);}catch(_0x44f9e8){if($gameTemp[_0x20e8e0(0x301)]())console[_0x20e8e0(0x1b9)](_0x44f9e8);}this[_0x20e8e0(0x32d)]()[_0x20e8e0(0x2de)](_0x51a638);},Game_Action[_0x397bec(0x26f)][_0x397bec(0x3ca)]=function(){const _0x4c8f29=_0x397bec;if(!$gameParty[_0x4c8f29(0x2cc)]())return;if(!this[_0x4c8f29(0x32d)]()[_0x4c8f29(0x313)]())return;const _0x2eef34=VisuMZ[_0x4c8f29(0x2d5)][_0x4c8f29(0x2a2)][_0x4c8f29(0x295)];let _0x16231a=0x0;try{_0x16231a=eval(_0x2eef34[_0x4c8f29(0x1fa)]);}catch(_0x2f295d){if(_0x4c8f29(0x20d)===_0x4c8f29(0x1cb)){const _0x4056a7=_0x118e0a(_0x24e54b['$1']);_0x4bd574=_0x3b3fe5[_0x4c8f29(0x419)]['format'](_0x4056a7,_0x1e101a['level'],_0x43a485[_0x4c8f29(0x285)]),_0x554740['length']>0x0&&(_0x2d3683!==''?_0x13aed5=_0x323184['format'](_0x3670ba,_0x2197b5):_0x1f5251=_0x4ca890);}else{if($gameTemp['isPlaytest']())console[_0x4c8f29(0x1b9)](_0x2f295d);}}this[_0x4c8f29(0x32d)]()['gainSkillPoints'](_0x16231a);},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x38e)]=Game_Battler[_0x397bec(0x26f)]['onBattleStart'],Game_Battler[_0x397bec(0x26f)][_0x397bec(0x322)]=function(_0x1b4e0d){const _0x25ecce=_0x397bec;VisuMZ['SkillLearnSystem'][_0x25ecce(0x38e)][_0x25ecce(0x42b)](this,_0x1b4e0d);if(this[_0x25ecce(0x313)]()){if(_0x25ecce(0x222)===_0x25ecce(0x427))return _0xe13c0e(_0x1ade6f['$1']);else this[_0x25ecce(0x2ff)]=this[_0x25ecce(0x291)](),this[_0x25ecce(0x403)]=this[_0x25ecce(0x292)]();}},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x2d9)]=Game_Actor[_0x397bec(0x26f)]['setup'],Game_Actor['prototype'][_0x397bec(0x2ef)]=function(_0x5077b3){const _0x523c48=_0x397bec;VisuMZ[_0x523c48(0x2d5)]['Game_Actor_setup']['call'](this,_0x5077b3),this['initAbilityPoints'](),this['gainStartingAbilityPoints'](),this[_0x523c48(0x363)](),this[_0x523c48(0x340)]();},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x31b)]=Game_Actor[_0x397bec(0x26f)][_0x397bec(0x33f)],Game_Actor['prototype'][_0x397bec(0x33f)]=function(_0x1900e2,_0x13c60f){const _0x4cae53=_0x397bec;this[_0x4cae53(0x2aa)]=!![],VisuMZ[_0x4cae53(0x2d5)][_0x4cae53(0x31b)][_0x4cae53(0x42b)](this,_0x1900e2,_0x13c60f),this['_SkillLearnSystem_preventLevelUpGain']=undefined;},VisuMZ[_0x397bec(0x2d5)]['Game_Actor_levelUp']=Game_Actor[_0x397bec(0x26f)][_0x397bec(0x1d5)],Game_Actor[_0x397bec(0x26f)][_0x397bec(0x1d5)]=function(){const _0x49d60b=_0x397bec;VisuMZ['SkillLearnSystem'][_0x49d60b(0x3fa)][_0x49d60b(0x42b)](this),this['levelUpGainAbilityPoints'](this[_0x49d60b(0x428)]()['id']),this['levelUpGainSkillPoints'](this[_0x49d60b(0x428)]()['id']);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x300)]=function(){const _0x56150f=_0x397bec;this[_0x56150f(0x41c)]={};},Game_Actor[_0x397bec(0x26f)]['gainStartingAbilityPoints']=function(){const _0x1fb5ad=_0x397bec,_0x511f22=VisuMZ['SkillLearnSystem'][_0x1fb5ad(0x3e1)],_0x3c7ce8=this[_0x1fb5ad(0x2fe)]()[_0x1fb5ad(0x3a0)];if(_0x3c7ce8[_0x1fb5ad(0x3f5)](_0x511f22['StartingAbilityPoints'])){const _0x588480=eval(RegExp['$1']);this[_0x1fb5ad(0x2de)](_0x588480);}const _0x4c08ce=VisuMZ[_0x1fb5ad(0x2d5)]['Settings']['AbilityPoints'];if(!_0x4c08ce[_0x1fb5ad(0x338)])return;const _0x5d20d3=_0x3c7ce8['match'](_0x511f22[_0x1fb5ad(0x415)]);if(_0x5d20d3)for(const _0x2178c8 of _0x5d20d3){if(!_0x2178c8)continue;_0x2178c8[_0x1fb5ad(0x3f5)](_0x511f22[_0x1fb5ad(0x415)]);const _0x13807c=String(RegExp['$1']),_0x4e76bb=eval(RegExp['$2']),_0x554807=/^\d+$/['test'](_0x13807c);let _0x60db7=0x0;_0x554807?_0x60db7=Number(_0x13807c):_0x1fb5ad(0x376)!==_0x1fb5ad(0x1e7)?_0x60db7=DataManager[_0x1fb5ad(0x459)](_0x13807c):this[_0x1fb5ad(0x1fc)](),this[_0x1fb5ad(0x2de)](_0x4e76bb,_0x60db7);}},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x291)]=function(_0x5ce6cc){const _0x2dea42=_0x397bec;this[_0x2dea42(0x41c)]===undefined&&this[_0x2dea42(0x300)]();const _0x12ac6a=VisuMZ[_0x2dea42(0x2d5)][_0x2dea42(0x2a2)][_0x2dea42(0x298)];return _0x12ac6a['SharedResource']?_0x5ce6cc=0x0:_0x5ce6cc=_0x5ce6cc||this[_0x2dea42(0x428)]()['id'],this['_abilityPoints'][_0x5ce6cc]=this['_abilityPoints'][_0x5ce6cc]||0x0,Math[_0x2dea42(0x1d9)](this[_0x2dea42(0x41c)][_0x5ce6cc]);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x44f)]=function(_0x30d8e1,_0x3eafa6){const _0x1e4c75=_0x397bec;this[_0x1e4c75(0x41c)]===undefined&&this['initAbilityPoints']();const _0x1fada1=VisuMZ['SkillLearnSystem'][_0x1e4c75(0x2a2)]['AbilityPoints'];_0x1fada1[_0x1e4c75(0x338)]?'YScQZ'!=='YScQZ'?(_0x5f1a92[_0x1e4c75(0x2d5)][_0x1e4c75(0x217)][_0x1e4c75(0x42b)](this),this[_0x1e4c75(0x33a)]()):_0x3eafa6=0x0:_0x3eafa6=_0x3eafa6||this['currentClass']()['id'];this[_0x1e4c75(0x41c)][_0x3eafa6]=this[_0x1e4c75(0x41c)][_0x3eafa6]||0x0,this[_0x1e4c75(0x41c)][_0x3eafa6]=Math[_0x1e4c75(0x1d9)](_0x30d8e1||0x0);const _0x103c5c=_0x1fada1['MaxResource']||Number[_0x1e4c75(0x30d)];this[_0x1e4c75(0x41c)][_0x3eafa6]=this[_0x1e4c75(0x41c)][_0x3eafa6][_0x1e4c75(0x2fc)](0x0,_0x103c5c);},Game_Actor['prototype']['gainAbilityPoints']=function(_0x1748e5,_0x421274){const _0x42268c=_0x397bec;_0x1748e5>0x0&&(_0x1748e5*=this[_0x42268c(0x252)]()),this[_0x42268c(0x2fb)](_0x1748e5,_0x421274);},Game_Actor[_0x397bec(0x26f)]['gainAbilityPointsForMulticlasses']=function(_0x34bff0){const _0x180f65=_0x397bec;if(!Imported['VisuMZ_2_ClassChangeSystem'])return;_0x34bff0>0x0&&(_0x34bff0*=this[_0x180f65(0x252)]()),this[_0x180f65(0x234)](_0x34bff0,'Ability');},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x2fb)]=function(_0x451578,_0x19b8ca){const _0x230ea8=_0x397bec,_0x127bef=VisuMZ[_0x230ea8(0x2d5)][_0x230ea8(0x2a2)][_0x230ea8(0x298)];_0x127bef[_0x230ea8(0x338)]?_0x230ea8(0x39d)===_0x230ea8(0x39d)?_0x19b8ca=0x0:_0x494399=_0xa480c5:_0x19b8ca=_0x19b8ca||this['currentClass']()['id'],_0x451578+=this['getAbilityPoints'](_0x19b8ca),this[_0x230ea8(0x44f)](_0x451578,_0x19b8ca);},Game_Actor[_0x397bec(0x26f)]['loseAbilityPoints']=function(_0x95b6b4,_0x1d8166){const _0x3a626a=_0x397bec;this[_0x3a626a(0x2fb)](-_0x95b6b4,_0x1d8166);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x252)]=function(){return this['traitObjects']()['reduce']((_0x5b893b,_0x1d7ac3)=>{const _0x4a6e7d=_0x651b;if('lQpNz'!==_0x4a6e7d(0x1b5)){if(_0x1d7ac3&&_0x1d7ac3[_0x4a6e7d(0x3a0)][_0x4a6e7d(0x3f5)](VisuMZ[_0x4a6e7d(0x2d5)][_0x4a6e7d(0x3e1)]['AbilityPointsRate']))return _0x5b893b*(Number(RegExp['$1'])*0.01);else{if('RClsu'==='RClsu')return _0x5b893b;else{_0x287546[_0x4a6e7d(0x2d5)]['Settings'][_0x4a6e7d(0x2c7)][_0x4a6e7d(0x370)][_0x4a6e7d(0x42b)](this);return;}}}else{if(!_0x1acf76[_0x4a6e7d(0x461)]())return;if(!this['_actor'])return;let _0xe48f80=this['skillLearnSystemCommandName']();const _0xf047be=this[_0x4a6e7d(0x2c4)][_0x4a6e7d(0x453)]()[0x0];this[_0x4a6e7d(0x207)](_0xe48f80,_0x4a6e7d(0x297),!![],'skillLearn');}},0x1);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x3e2)]=function(_0x3b9960){const _0x10f6ac=_0x397bec;if(this['_SkillLearnSystem_preventLevelUpGain'])return;const _0x43af6f=VisuMZ['SkillLearnSystem'][_0x10f6ac(0x2a2)][_0x10f6ac(0x298)];let _0x59b2c0=0x0;try{_0x59b2c0=eval(_0x43af6f['PerLevelUp']);}catch(_0x485a25){if($gameTemp[_0x10f6ac(0x301)]())console[_0x10f6ac(0x1b9)](_0x485a25);}this[_0x10f6ac(0x2de)](_0x59b2c0,_0x3b9960);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x3b8)]=function(){const _0x52803e=_0x397bec;return this['_earnedAbilityPoints']=this['_earnedAbilityPoints']||0x0,this[_0x52803e(0x291)]()-this[_0x52803e(0x2ff)];},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x363)]=function(){const _0x436d3f=_0x397bec;this[_0x436d3f(0x1c5)]={};},Game_Actor['prototype'][_0x397bec(0x340)]=function(){const _0xc07a2c=_0x397bec,_0x50e14d=VisuMZ[_0xc07a2c(0x2d5)][_0xc07a2c(0x3e1)],_0x1456f2=this[_0xc07a2c(0x2fe)]()[_0xc07a2c(0x3a0)];if(_0x1456f2[_0xc07a2c(0x3f5)](_0x50e14d[_0xc07a2c(0x30c)])){const _0x3011f7=eval(RegExp['$1']);this[_0xc07a2c(0x33e)](_0x3011f7);}const _0x587bcd=VisuMZ['SkillLearnSystem'][_0xc07a2c(0x2a2)][_0xc07a2c(0x295)];if(!_0x587bcd['SharedResource'])return;const _0x29e875=_0x1456f2[_0xc07a2c(0x3f5)](_0x50e14d['StartClassSkillPoints']);if(_0x29e875){if(_0xc07a2c(0x200)===_0xc07a2c(0x200))for(const _0x276f31 of _0x29e875){if(_0xc07a2c(0x423)===_0xc07a2c(0x423)){if(!_0x276f31)continue;_0x276f31[_0xc07a2c(0x3f5)](_0x50e14d[_0xc07a2c(0x345)]);const _0x429378=String(RegExp['$1']),_0x3c1430=eval(RegExp['$2']),_0x32d7f0=/^\d+$/[_0xc07a2c(0x37a)](_0x429378);let _0x550d12=0x0;if(_0x32d7f0){if(_0xc07a2c(0x44b)===_0xc07a2c(0x44b))_0x550d12=Number(_0x429378);else{_0x948753=(_0x408035(_0xf8b912)||'')['trim']();const _0x2191ae=/^\d+$/['test'](_0x1c0c25);_0x2191ae?_0x5a8168[_0xc07a2c(0x266)](_0x20c08a(_0x66a27b)):_0x7c6e89[_0xc07a2c(0x266)](_0x41b8d1[_0xc07a2c(0x1f1)](_0x11b410));}}else'YtSaj'==='HVlwO'?_0xc5857b=_0xdc580e(_0x538bc5):_0x550d12=DataManager[_0xc07a2c(0x459)](_0x429378);this['gainSkillPoints'](_0x3c1430,_0x550d12);}else try{return _0x170ffe(_0x25f3ea['$1']);}catch(_0x56e969){if(_0x2a0805[_0xc07a2c(0x301)]())_0x52383a['log'](_0x56e969);return 0x0;}}else{const _0x3c9015=this[_0xc07a2c(0x30f)]();this['_skillLearnConfirmWindow']=new _0x9b726c(_0x3c9015),this[_0xc07a2c(0x336)](this[_0xc07a2c(0x21b)]),this[_0xc07a2c(0x21b)][_0xc07a2c(0x2db)]('ok',this[_0xc07a2c(0x337)][_0xc07a2c(0x1ff)](this)),this[_0xc07a2c(0x21b)][_0xc07a2c(0x2db)]('cancel',this[_0xc07a2c(0x436)][_0xc07a2c(0x1ff)](this)),this[_0xc07a2c(0x21b)][_0xc07a2c(0x330)]();const _0x4e9a69=_0x13db3e[_0xc07a2c(0x2d5)][_0xc07a2c(0x2a2)]['Window'][_0xc07a2c(0x3c7)];this[_0xc07a2c(0x21b)][_0xc07a2c(0x35b)](_0x4e9a69);}}},Game_Actor['prototype'][_0x397bec(0x292)]=function(_0x119377){const _0x5036e2=_0x397bec;this[_0x5036e2(0x1c5)]===undefined&&this[_0x5036e2(0x363)]();const _0x5315cd=VisuMZ[_0x5036e2(0x2d5)][_0x5036e2(0x2a2)][_0x5036e2(0x295)];if(_0x5315cd[_0x5036e2(0x338)]){if('NVsws'!==_0x5036e2(0x37e))_0x119377=0x0;else{const _0x278f74=this[_0x5036e2(0x42c)](_0x1e7674);this[_0x5036e2(0x305)](),this[_0x5036e2(0x215)](this[_0x5036e2(0x2e4)](_0x4b3ef1));const _0x34bb85=this[_0x5036e2(0x40d)](_0x3c6fa7),_0x4d8187=this[_0x5036e2(0x350)](_0x34bb85)[_0x5036e2(0x386)];_0x278f74['x']+=_0x2f8c3e['round']((_0x278f74[_0x5036e2(0x386)]-_0x4d8187)/0x2),this[_0x5036e2(0x3c4)](_0x34bb85,_0x278f74['x'],_0x278f74['y'],_0x4d8187);}}else _0x5036e2(0x2f9)!==_0x5036e2(0x2f9)?this[_0x5036e2(0x38f)]():_0x119377=_0x119377||this[_0x5036e2(0x428)]()['id'];return this['_skillPoints'][_0x119377]=this['_skillPoints'][_0x119377]||0x0,Math[_0x5036e2(0x1d9)](this[_0x5036e2(0x1c5)][_0x119377]);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x1e2)]=function(_0x90a61a,_0x21ae36){const _0x1e27b9=_0x397bec;this[_0x1e27b9(0x1c5)]===undefined&&this[_0x1e27b9(0x363)]();const _0x7b5721=VisuMZ[_0x1e27b9(0x2d5)][_0x1e27b9(0x2a2)][_0x1e27b9(0x295)];_0x7b5721[_0x1e27b9(0x338)]?_0x21ae36=0x0:_0x21ae36=_0x21ae36||this['currentClass']()['id'];this[_0x1e27b9(0x1c5)][_0x21ae36]=this['_skillPoints'][_0x21ae36]||0x0,this[_0x1e27b9(0x1c5)][_0x21ae36]=Math[_0x1e27b9(0x1d9)](_0x90a61a||0x0);const _0x5f8f16=_0x7b5721[_0x1e27b9(0x3d9)]||Number['MAX_SAFE_INTEGER'];this[_0x1e27b9(0x1c5)][_0x21ae36]=this[_0x1e27b9(0x1c5)][_0x21ae36][_0x1e27b9(0x2fc)](0x0,_0x5f8f16);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x33e)]=function(_0x184403,_0x519432){_0x184403>0x0&&(_0x184403*=this['skillPointsRate']()),this['addSkillPoints'](_0x184403,_0x519432);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x41f)]=function(_0x43fec5){const _0x2fb218=_0x397bec;if(!Imported[_0x2fb218(0x390)])return;_0x43fec5>0x0&&(_0x43fec5*=this[_0x2fb218(0x1d2)]()),this[_0x2fb218(0x234)](_0x43fec5,_0x2fb218(0x1fb));},Game_Actor[_0x397bec(0x26f)]['addSkillPoints']=function(_0x425823,_0x28b9e4){const _0x36c920=_0x397bec,_0x191c9a=VisuMZ[_0x36c920(0x2d5)][_0x36c920(0x2a2)][_0x36c920(0x295)];_0x191c9a[_0x36c920(0x338)]?_0x28b9e4=0x0:_0x28b9e4=_0x28b9e4||this[_0x36c920(0x428)]()['id'],_0x425823+=this[_0x36c920(0x292)](_0x28b9e4),this['setSkillPoints'](_0x425823,_0x28b9e4);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x3fc)]=function(_0x26e82e,_0x52d0b9){const _0x55abed=_0x397bec;this[_0x55abed(0x20c)](-_0x26e82e,_0x52d0b9);},Game_Actor['prototype'][_0x397bec(0x1d2)]=function(){const _0x15552e=_0x397bec;return this[_0x15552e(0x371)]()[_0x15552e(0x42a)]((_0x554b7c,_0x19b64d)=>{const _0x52ac10=_0x15552e;if(_0x19b64d&&_0x19b64d[_0x52ac10(0x3a0)][_0x52ac10(0x3f5)](VisuMZ['SkillLearnSystem'][_0x52ac10(0x3e1)][_0x52ac10(0x3ed)])){if(_0x52ac10(0x373)!==_0x52ac10(0x373))_0x2eb978!==''?_0x5c5fd6=_0x11d5f8[_0x52ac10(0x2f5)](_0x2c676a,_0x34e938):_0x3e9a38=_0x1249e2;else return _0x554b7c*(Number(RegExp['$1'])*0.01);}else return _0x554b7c;},0x1);},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x213)]=function(_0x1bb7fc){const _0x133707=_0x397bec;if(this[_0x133707(0x2aa)])return;const _0x7cd65e=VisuMZ[_0x133707(0x2d5)]['Settings'][_0x133707(0x295)];let _0x8b4cce=0x0;try{_0x8b4cce=eval(_0x7cd65e[_0x133707(0x2e6)]);}catch(_0x14a0d5){if($gameTemp[_0x133707(0x301)]())console['log'](_0x14a0d5);}this[_0x133707(0x33e)](_0x8b4cce,_0x1bb7fc);},Game_Actor['prototype'][_0x397bec(0x34d)]=function(){const _0x37de31=_0x397bec;return this[_0x37de31(0x403)]=this['_earnedSkillPoints']||0x0,this[_0x37de31(0x292)]()-this['_earnedSkillPoints'];},Game_Actor[_0x397bec(0x26f)]['meetRequirementsForSkillLearnSystem']=function(_0x17ee74){const _0x45e86b=_0x397bec;if(!_0x17ee74)return![];const _0x4d07af=VisuMZ[_0x45e86b(0x2d5)][_0x45e86b(0x3ac)](_0x17ee74,'jsLearnReq');if(VisuMZ['SkillLearnSystem']['JS'][_0x4d07af]){if('Xrkop'===_0x45e86b(0x231))_0x19d5e6=_0x30c54d['max'](_0x4486f6,_0x3bdd39);else{if(!VisuMZ[_0x45e86b(0x2d5)]['JS'][_0x4d07af]['call'](this,this,_0x17ee74))return![];}}const _0x5017ec=VisuMZ[_0x45e86b(0x2d5)][_0x45e86b(0x3e1)],_0x2e5542=_0x17ee74[_0x45e86b(0x3a0)];if(_0x2e5542[_0x45e86b(0x3f5)](_0x5017ec[_0x45e86b(0x290)])){if(_0x45e86b(0x21a)!==_0x45e86b(0x21a))_0x3c5f35['SkillLearnSystem']['Window_SkillList_drawSkillCost'][_0x45e86b(0x42b)](this,_0x4a615c,_0x683ba8,_0x489857,_0x477c1c);else{const _0x14abf0=Number(RegExp['$1']);if(_0x14abf0>this[_0x45e86b(0x208)])return![];}}if(_0x2e5542[_0x45e86b(0x3f5)](_0x5017ec[_0x45e86b(0x1e0)])){if(_0x45e86b(0x315)===_0x45e86b(0x460)){const _0xeeb346=_0x392383[_0x45e86b(0x3a0)];if(_0xeeb346[_0x45e86b(0x3f5)](_0x3280e8)){const _0x7ead5f=_0x137c9b(_0x14d488['$1']),_0x397ec8='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x7ead5f),_0x20d3ac=_0x1c3adb['SkillLearnSystem'][_0x45e86b(0x3ac)](_0x75ca7,_0x2065d1);_0x3abcc5[_0x45e86b(0x2d5)]['JS'][_0x20d3ac]=new _0x43915c(_0x397ec8);}}else{const _0x29fe72=String(RegExp['$1'])[_0x45e86b(0x20a)](',')[_0x45e86b(0x281)](_0x6178a8=>_0x6178a8['trim']());for(const _0x22f778 of _0x29fe72){let _0x68e84f=0x0;const _0x22e430=/^\d+$/[_0x45e86b(0x37a)](_0x22f778);_0x22e430?_0x68e84f=Number(_0x22f778):_0x45e86b(0x30e)===_0x45e86b(0x30e)?_0x68e84f=DataManager[_0x45e86b(0x1f1)](_0x22f778):_0x56aa67=_0x177f54(_0x2dc798);if(!this['isLearnedSkill'](_0x68e84f))return![];}}}if(_0x2e5542[_0x45e86b(0x3f5)](_0x5017ec[_0x45e86b(0x320)])){const _0x2a3a44=String(RegExp['$1'])[_0x45e86b(0x20a)](',')[_0x45e86b(0x281)](_0x3995ba=>_0x3995ba['trim']());let _0x164e6d=![];for(const _0x23e829 of _0x2a3a44){if(_0x45e86b(0x372)==='kaXhf'){let _0x3b28f4=0x0;const _0x3ed05e=/^\d+$/[_0x45e86b(0x37a)](_0x23e829);_0x3ed05e?_0x3b28f4=Number(_0x23e829):_0x3b28f4=DataManager[_0x45e86b(0x1f1)](_0x23e829);if($dataSkills[_0x3b28f4])console['log']($dataSkills[_0x3b28f4][_0x45e86b(0x3ef)],this[_0x45e86b(0x24d)](_0x3b28f4));if(this['isLearnedSkill'](_0x3b28f4)){_0x164e6d=!![];break;}}else{const _0x33a017=_0x113941[_0x45e86b(0x291)](_0x99206);this[_0x45e86b(0x1be)](_0x33a017,_0x1ab718,_0x2082c4,_0x2ff078,_0x43d841);}}if(!_0x164e6d)return![];}if(_0x2e5542[_0x45e86b(0x3f5)](_0x5017ec[_0x45e86b(0x32e)])){const _0x3ce2e2=String(RegExp['$1'])['split'](',')[_0x45e86b(0x281)](_0x318d86=>Number(_0x318d86));for(const _0x7e488a of _0x3ce2e2){if(!$gameSwitches['value'](_0x7e488a))return![];}}if(_0x2e5542[_0x45e86b(0x3f5)](_0x5017ec['LearnReqSwitchesAny'])){if(_0x45e86b(0x1f7)===_0x45e86b(0x43c)){if(_0x59f771[_0x45e86b(0x3f5)](/(?:ABILITY POINTS|AP):[ ](\d+)/gi))return _0x2b3c75(_0x5a1421['$1']);}else{const _0x874023=String(RegExp['$1'])[_0x45e86b(0x20a)](',')['map'](_0x26594b=>Number(_0x26594b));let _0x38b282=![];for(const _0x474cce of _0x874023){if('kbqcY'!==_0x45e86b(0x426))_0x488f43!==''?_0x251643=_0x5db1ed[_0x45e86b(0x2f5)](_0x31289b,_0x244206):_0x5e59e1=_0x42c098;else{if($gameSwitches[_0x45e86b(0x326)](_0x474cce)){if('swUuL'==='swUuL'){_0x38b282=!![];break;}else{const _0xf37165=_0x1dc656(_0x9084f3['$1']);this['gainSkillPoints'](_0xf37165);}}}}if(!_0x38b282)return![];}}return!![];},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x2b1)]=function(_0x2cda8e){const _0x17646d=_0x397bec;if(!_0x2cda8e)return![];const _0x13ee19=DataManager['getSkillLearnAbilityPointCost'](_0x2cda8e);if(_0x13ee19>this[_0x17646d(0x291)]())return![];const _0x43295b=DataManager['getSkillLearnSkillPointCost'](_0x2cda8e);if(_0x43295b>this[_0x17646d(0x292)]())return![];const _0x2437b3=DataManager['getSkillLearnGoldCost'](_0x2cda8e);if(_0x2437b3>$gameParty[_0x17646d(0x1ee)]())return![];if(Imported[_0x17646d(0x390)]){const _0x41445a=DataManager[_0x17646d(0x1d7)](_0x2cda8e);if(_0x41445a>this[_0x17646d(0x39c)]())return![];const _0x2257ff=DataManager[_0x17646d(0x284)](_0x2cda8e);if(_0x2257ff>this['getJobPoints']())return![];}const _0xf0a321=DataManager['getSkillLearnItemCost'](_0x2cda8e);for(const _0x2f72d7 of _0xf0a321){if(!_0x2f72d7)continue;const _0x239e0c=$dataItems[_0x2f72d7['id']];if(_0x239e0c&&_0x2f72d7[_0x17646d(0x2b3)]>$gameParty[_0x17646d(0x3d3)](_0x239e0c))return![];}const _0x2e530a=DataManager[_0x17646d(0x1c8)](_0x2cda8e);for(const _0x1ca9d2 of _0x2e530a){if(!_0x1ca9d2)continue;const _0x3be97e=$dataWeapons[_0x1ca9d2['id']];if(_0x3be97e&&_0x1ca9d2[_0x17646d(0x2b3)]>$gameParty[_0x17646d(0x3d3)](_0x3be97e))return![];}const _0x2e0731=DataManager[_0x17646d(0x445)](_0x2cda8e);for(const _0x4f9024 of _0x2e0731){if(!_0x4f9024)continue;const _0x205006=$dataArmors[_0x4f9024['id']];if(_0x205006&&_0x4f9024[_0x17646d(0x2b3)]>$gameParty[_0x17646d(0x3d3)](_0x205006))return![];}return!![];},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x440)]=function(_0x3de481){const _0x5a1d60=_0x397bec;if(!_0x3de481)return;const _0x49669a=DataManager[_0x5a1d60(0x44d)](_0x3de481);this[_0x5a1d60(0x342)](_0x49669a);const _0x5282ca=DataManager[_0x5a1d60(0x26d)](_0x3de481);this[_0x5a1d60(0x3fc)](_0x5282ca);const _0x2ca59e=DataManager[_0x5a1d60(0x400)](_0x3de481);$gameParty[_0x5a1d60(0x3b7)](_0x2ca59e);if(Imported['VisuMZ_2_ClassChangeSystem']){const _0x5c9e65=DataManager[_0x5a1d60(0x1d7)](_0x3de481);this[_0x5a1d60(0x316)](_0x5c9e65);const _0x456b2a=DataManager['getSkillLearnJobPointCost'](_0x3de481);this['loseJobPoints'](_0x456b2a);}const _0x5035fa=DataManager[_0x5a1d60(0x1bf)](_0x3de481);for(const _0x59fada of _0x5035fa){if(!_0x59fada)continue;const _0xd9f204=$dataItems[_0x59fada['id']],_0x3720d9=_0x59fada['quantity'];$gameParty[_0x5a1d60(0x1dc)](_0xd9f204,_0x3720d9);}const _0x4d3022=DataManager['getSkillLearnWeaponCost'](_0x3de481);for(const _0x67d9a6 of _0x4d3022){if(_0x5a1d60(0x414)===_0x5a1d60(0x277)){const _0x28688a=_0x41b8cf(_0x5eba7f['$1'])[_0x5a1d60(0x20a)](',')[_0x5a1d60(0x281)](_0x2e4b89=>_0x2e4b89[_0x5a1d60(0x3ea)]());;for(const _0xddedc9 of _0x28688a){let _0x6dfcd3=0x0;const _0x14de0f=/^\d+$/[_0x5a1d60(0x37a)](_0xddedc9);_0x14de0f?_0x6dfcd3=_0x328ae0(_0xddedc9):_0x6dfcd3=_0x51cfa9['getSkillIdWithName'](_0xddedc9);if(!this['_actor'][_0x5a1d60(0x24d)](_0x6dfcd3))return![];}}else{if(!_0x67d9a6)continue;const _0x553e40=$dataWeapons[_0x67d9a6['id']],_0x792713=_0x67d9a6[_0x5a1d60(0x2b3)];$gameParty[_0x5a1d60(0x1dc)](_0x553e40,_0x792713);}}const _0x295a8f=DataManager[_0x5a1d60(0x445)](_0x3de481);for(const _0x13092b of _0x295a8f){if(!_0x13092b)continue;const _0x48ef02=$dataArmors[_0x13092b['id']],_0x5894f3=_0x13092b[_0x5a1d60(0x2b3)];$gameParty[_0x5a1d60(0x1dc)](_0x48ef02,_0x5894f3);}this[_0x5a1d60(0x3f2)](_0x3de481['id']),this['refresh']();},VisuMZ[_0x397bec(0x2d5)]['Game_Actor_learnSkill']=Game_Actor['prototype'][_0x397bec(0x3f2)],Game_Actor[_0x397bec(0x26f)]['learnSkill']=function(_0x2b9918){const _0x3d1a1f=_0x397bec,_0x1b8b74=!this[_0x3d1a1f(0x24d)](_0x2b9918);VisuMZ[_0x3d1a1f(0x2d5)][_0x3d1a1f(0x2be)][_0x3d1a1f(0x42b)](this,_0x2b9918);if(_0x1b8b74&&this[_0x3d1a1f(0x24d)](_0x2b9918)){const _0x3b3d89=$dataSkills[_0x2b9918],_0x1eb8fa=VisuMZ['SkillLearnSystem']['createKeyJS'](_0x3b3d89,_0x3d1a1f(0x2e9));VisuMZ[_0x3d1a1f(0x2d5)]['JS'][_0x1eb8fa]&&VisuMZ[_0x3d1a1f(0x2d5)]['JS'][_0x1eb8fa]['call'](this,this,_0x3b3d89);}},Game_Actor[_0x397bec(0x26f)][_0x397bec(0x2a3)]=function(){const _0x57de5e=_0x397bec,_0x5de8d1=DataManager['getSkillLearnSkillsFromClass'](this['currentClass']()['id']);for(const _0xc33d50 of _0x5de8d1){const _0x1142ef=$dataSkills[_0xc33d50];if(!_0x1142ef)continue;if(_0x1142ef[_0x57de5e(0x3ef)][_0x57de5e(0x3ea)]()==='')continue;if(_0x1142ef[_0x57de5e(0x3ef)][_0x57de5e(0x3f5)](/-----/i))continue;this[_0x57de5e(0x3f2)](_0xc33d50);}},Game_Enemy['prototype'][_0x397bec(0x303)]=function(){const _0x22eda7=_0x397bec,_0x4ad407=VisuMZ[_0x22eda7(0x2d5)][_0x22eda7(0x2a2)][_0x22eda7(0x298)],_0xc2796d=VisuMZ[_0x22eda7(0x2d5)][_0x22eda7(0x3e1)],_0x73aebb=this[_0x22eda7(0x454)]()[_0x22eda7(0x3a0)];if(_0x73aebb[_0x22eda7(0x3f5)](_0xc2796d[_0x22eda7(0x458)]))try{if(_0x22eda7(0x267)===_0x22eda7(0x1c1))_0x489132=_0xa70b4d(_0x35c087[_0x22eda7(0x2e6)]);else return eval(RegExp['$1']);}catch(_0x32de0e){if($gameTemp[_0x22eda7(0x301)]())console[_0x22eda7(0x1b9)](_0x32de0e);return 0x0;}try{return eval(_0x4ad407[_0x22eda7(0x2c8)]);}catch(_0x56e9a8){if($gameTemp['isPlaytest']())console[_0x22eda7(0x1b9)](_0x56e9a8);return 0x0;}},Game_Enemy[_0x397bec(0x26f)][_0x397bec(0x2b8)]=function(){const _0x520e68=_0x397bec,_0x7e0b10=VisuMZ[_0x520e68(0x2d5)]['Settings'][_0x520e68(0x295)],_0x3dd495=VisuMZ[_0x520e68(0x2d5)][_0x520e68(0x3e1)],_0x1124f9=this[_0x520e68(0x454)]()[_0x520e68(0x3a0)];if(_0x1124f9[_0x520e68(0x3f5)](_0x3dd495[_0x520e68(0x22f)]))try{if(_0x520e68(0x3ff)!=='rwztL')_0x2c67c6+=_0x271bba-_0x49b4c7;else return eval(RegExp['$1']);}catch(_0x2ff058){if(_0x520e68(0x2a5)!==_0x520e68(0x2a5)){const _0x19d5b2=_0x5e0be6(_0x5b7106['$1']);this[_0x520e68(0x2de)](_0x19d5b2);}else{if($gameTemp[_0x520e68(0x301)]())console['log'](_0x2ff058);return 0x0;}}try{if(_0x520e68(0x446)!==_0x520e68(0x283))return eval(_0x7e0b10[_0x520e68(0x2c8)]);else this[_0x520e68(0x2c9)](_0x24a009)?this[_0x520e68(0x1ba)](_0x6d0c4f,_0x15ee70,_0x113aed,_0x48026e):this[_0x520e68(0x32c)](_0x6ea59a,_0x4a3f0f,_0x5ecc77,_0x317802);}catch(_0x45dcf9){if($gameTemp['isPlaytest']())console[_0x520e68(0x1b9)](_0x45dcf9);return 0x0;}},VisuMZ['SkillLearnSystem'][_0x397bec(0x25f)]=Game_Party[_0x397bec(0x26f)][_0x397bec(0x3d4)],Game_Party[_0x397bec(0x26f)][_0x397bec(0x3d4)]=function(){const _0x4d00e7=_0x397bec;VisuMZ[_0x4d00e7(0x2d5)][_0x4d00e7(0x25f)]['call'](this),this[_0x4d00e7(0x229)]();},Game_Party['prototype'][_0x397bec(0x229)]=function(){const _0x19c68f=_0x397bec;for(const _0x4f52c9 of this[_0x19c68f(0x276)]()){if(!_0x4f52c9)continue;_0x4f52c9['onLoadBattleTestSkillLearnSystem']();}},Game_Troop[_0x397bec(0x26f)][_0x397bec(0x41e)]=function(){const _0x4338b3=_0x397bec;return this['deadMembers']()[_0x4338b3(0x42a)]((_0x259cdd,_0x57f01d)=>_0x259cdd+_0x57f01d['abilityPoints'](),0x0);},Game_Troop['prototype']['skillPointsTotal']=function(){const _0x40a8b5=_0x397bec;return this[_0x40a8b5(0x226)]()[_0x40a8b5(0x42a)]((_0x54fb03,_0x345d36)=>_0x54fb03+_0x345d36['skillPoints'](),0x0);},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x238)]=Scene_Skill['prototype'][_0x397bec(0x2c5)],Scene_Skill[_0x397bec(0x26f)]['create']=function(){const _0x5d06bd=_0x397bec;VisuMZ['SkillLearnSystem']['Scene_Skill_create'][_0x5d06bd(0x42b)](this),this[_0x5d06bd(0x2c1)]();},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x2c1)]=function(){const _0x19a742=_0x397bec;this[_0x19a742(0x2cf)](),this[_0x19a742(0x40e)]();},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x2cf)]=function(){const _0x6fa0e3=_0x397bec,_0x7fde3b=this['skillLearnIngredientsWindowRect']();this[_0x6fa0e3(0x1ec)]=new Window_SkillLearnIngredients(_0x7fde3b),this['addWindow'](this[_0x6fa0e3(0x1ec)]),this[_0x6fa0e3(0x1ec)][_0x6fa0e3(0x330)]();const _0x439101=VisuMZ[_0x6fa0e3(0x2d5)][_0x6fa0e3(0x2a2)][_0x6fa0e3(0x261)][_0x6fa0e3(0x3b0)];this[_0x6fa0e3(0x1ec)][_0x6fa0e3(0x35b)](_0x439101);},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x3b2)]=function(){const _0x375428=_0x397bec;if(VisuMZ[_0x375428(0x2d5)][_0x375428(0x2a2)][_0x375428(0x261)]['DetailWindow_RectJS'])return VisuMZ[_0x375428(0x2d5)]['Settings'][_0x375428(0x261)][_0x375428(0x263)]['call'](this);const _0x2eabab=this[_0x375428(0x43f)](),_0x19e429=_0x2eabab['x'],_0x4fb1bb=_0x2eabab['y'],_0x162d73=_0x2eabab['width'],_0x30cf6b=_0x2eabab[_0x375428(0x219)]-this[_0x375428(0x259)](0x2,![]);return new Rectangle(_0x19e429,_0x4fb1bb,_0x162d73,_0x30cf6b);},Scene_Skill['prototype'][_0x397bec(0x40e)]=function(){const _0x2d6aa0=_0x397bec,_0x1f7ee2=this[_0x2d6aa0(0x30f)]();this['_skillLearnConfirmWindow']=new Window_SkillLearnConfirm(_0x1f7ee2),this[_0x2d6aa0(0x336)](this[_0x2d6aa0(0x21b)]),this[_0x2d6aa0(0x21b)][_0x2d6aa0(0x2db)]('ok',this[_0x2d6aa0(0x337)][_0x2d6aa0(0x1ff)](this)),this[_0x2d6aa0(0x21b)][_0x2d6aa0(0x2db)](_0x2d6aa0(0x439),this[_0x2d6aa0(0x436)][_0x2d6aa0(0x1ff)](this)),this[_0x2d6aa0(0x21b)][_0x2d6aa0(0x330)]();const _0x23f72c=VisuMZ[_0x2d6aa0(0x2d5)][_0x2d6aa0(0x2a2)][_0x2d6aa0(0x261)][_0x2d6aa0(0x3c7)];this['_skillLearnConfirmWindow'][_0x2d6aa0(0x35b)](_0x23f72c);},Scene_Skill[_0x397bec(0x26f)]['skillLearnConfirmWindow']=function(){const _0x5b4f68=_0x397bec;if(VisuMZ[_0x5b4f68(0x2d5)][_0x5b4f68(0x2a2)]['Window'][_0x5b4f68(0x2b4)]){if(_0x5b4f68(0x447)!==_0x5b4f68(0x431))return VisuMZ[_0x5b4f68(0x2d5)][_0x5b4f68(0x2a2)][_0x5b4f68(0x261)][_0x5b4f68(0x2b4)][_0x5b4f68(0x42b)](this);else this[_0x5b4f68(0x2e5)][_0x5b4f68(0x303)]=_0x3db610['abilityPointsTotal']();}const _0x4e6ec2=this[_0x5b4f68(0x43f)](),_0x32bdef=_0x4e6ec2[_0x5b4f68(0x386)],_0x1ecaf0=this[_0x5b4f68(0x259)](0x2,![]),_0x9b604f=_0x4e6ec2['x'],_0x5d1f62=_0x4e6ec2['y']+_0x4e6ec2['height']-_0x1ecaf0;return new Rectangle(_0x9b604f,_0x5d1f62,_0x32bdef,_0x1ecaf0);},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x25d)]=Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x34e)],Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x34e)]=function(){const _0x2a712d=_0x397bec;if(this[_0x2a712d(0x2a8)][_0x2a712d(0x36f)]())'NMEHD'!==_0x2a712d(0x25b)?_0x1dc976=_0x55a9cc(_0xf9de9e):this[_0x2a712d(0x1c0)]();else{if(_0x2a712d(0x3bc)!==_0x2a712d(0x42e))VisuMZ[_0x2a712d(0x2d5)][_0x2a712d(0x25d)][_0x2a712d(0x42b)](this);else{if(_0x54cecd[_0x2a712d(0x301)]())_0x57c987[_0x2a712d(0x1b9)](_0x57b707);}}},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x1c0)]=function(){const _0x50d4ba=_0x397bec;this[_0x50d4ba(0x2a8)]['hide'](),this[_0x50d4ba(0x1ec)][_0x50d4ba(0x1d3)](),this[_0x50d4ba(0x1ec)][_0x50d4ba(0x402)](),this[_0x50d4ba(0x21b)][_0x50d4ba(0x1d3)](),this[_0x50d4ba(0x21b)]['refresh'](),this[_0x50d4ba(0x21b)][_0x50d4ba(0x26e)](),this['_skillLearnConfirmWindow'][_0x50d4ba(0x413)](0x0);},Scene_Skill[_0x397bec(0x26f)]['onSkillLearnConfirmOk']=function(){const _0x88575d=_0x397bec;VisuMZ[_0x88575d(0x2d5)][_0x88575d(0x2a2)]['Animation'][_0x88575d(0x1b6)]?this[_0x88575d(0x3fe)]():this[_0x88575d(0x3bb)]();},Scene_Skill['prototype'][_0x397bec(0x436)]=function(){const _0x543584=_0x397bec;this[_0x543584(0x2a8)][_0x543584(0x1d3)](),this[_0x543584(0x2a8)][_0x543584(0x26e)](),this[_0x543584(0x1ec)][_0x543584(0x330)](),this['_skillLearnConfirmWindow']['hide']();},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x3bb)]=function(){const _0x374b79=_0x397bec;this['_windowLayer'][_0x374b79(0x1d0)]=!![],this[_0x374b79(0x334)]=![],SoundManager[_0x374b79(0x396)](),this['user']()[_0x374b79(0x440)](this['item']()),this[_0x374b79(0x436)](),this['_itemWindow'][_0x374b79(0x402)](),this['_statusWindow']['refresh']();},VisuMZ[_0x397bec(0x2d5)]['Scene_Skill_update']=Scene_Skill['prototype']['update'],Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x324)]=function(){const _0x488a90=_0x397bec;VisuMZ[_0x488a90(0x2d5)]['Scene_Skill_update'][_0x488a90(0x42b)](this),this[_0x488a90(0x3c0)]();},Scene_Skill['prototype'][_0x397bec(0x3fe)]=function(){const _0x46cdbc=_0x397bec;this[_0x46cdbc(0x334)]=!![],this[_0x46cdbc(0x2f4)]=0x14,this[_0x46cdbc(0x2e3)][_0x46cdbc(0x1d0)]=VisuMZ[_0x46cdbc(0x2d5)][_0x46cdbc(0x2a2)][_0x46cdbc(0x3a3)][_0x46cdbc(0x2d6)]||![],this[_0x46cdbc(0x3e6)]();},Scene_Skill[_0x397bec(0x26f)]['createSkillLearnSkillSprite']=function(){const _0x3fb8e2=_0x397bec;this[_0x3fb8e2(0x3c6)]=new Sprite(),this[_0x3fb8e2(0x2cb)](this['_skillLearnIconSprite']),this[_0x3fb8e2(0x424)](),this[_0x3fb8e2(0x352)](),this[_0x3fb8e2(0x280)](),this['setSkillLearnSkillSpriteOpacity'](),this[_0x3fb8e2(0x1c3)](),this[_0x3fb8e2(0x224)](this[_0x3fb8e2(0x2f2)][_0x3fb8e2(0x236)]());},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x424)]=function(){const _0x267a21=_0x397bec,_0x2b3eec=VisuMZ[_0x267a21(0x2d5)][_0x267a21(0x3e1)],_0x2e6ebb=this[_0x267a21(0x2f8)]()[_0x267a21(0x3a0)];this[_0x267a21(0x225)]='';if(_0x2e6ebb[_0x267a21(0x3f5)](_0x2b3eec[_0x267a21(0x412)]))this[_0x267a21(0x225)]=String(RegExp['$1']);else{if(_0x2e6ebb[_0x267a21(0x3f5)](_0x2b3eec[_0x267a21(0x45b)])){if(_0x267a21(0x2c6)==='BWOmQ'){const _0x3ba900=_0x384d53(_0x232530['$1'])[_0x267a21(0x20a)](',')[_0x267a21(0x281)](_0x168b1b=>_0x1b3d16(_0x168b1b));for(const _0x1bfe1c of _0x3ba900){if(!_0x5c9e34[_0x267a21(0x326)](_0x1bfe1c))return![];}}else this['_learnPicture']=String(RegExp['$1']);}}this[_0x267a21(0x3e5)]=new Sprite();this[_0x267a21(0x225)]?this[_0x267a21(0x3e5)][_0x267a21(0x356)]=ImageManager['loadPicture'](this[_0x267a21(0x225)]):(this[_0x267a21(0x3e5)][_0x267a21(0x356)]=ImageManager[_0x267a21(0x23c)](_0x267a21(0x359)),this[_0x267a21(0x3e5)][_0x267a21(0x356)][_0x267a21(0x210)]=![]);this[_0x267a21(0x3e5)][_0x267a21(0x2bd)]['x']=0.5,this[_0x267a21(0x3e5)][_0x267a21(0x2bd)]['y']=0.5;if(!this[_0x267a21(0x225)]){if(_0x267a21(0x40c)==='dcCod'){const _0x54b467=VisuMZ[_0x267a21(0x2d5)][_0x267a21(0x2a2)][_0x267a21(0x3a3)][_0x267a21(0x2d1)]||0x8;this[_0x267a21(0x3e5)][_0x267a21(0x3ce)]['x']=_0x54b467,this[_0x267a21(0x3e5)][_0x267a21(0x3ce)]['y']=_0x54b467;}else try{return _0x1c8ef6(_0x342c89['$1']);}catch(_0x446162){if(_0x97ec11['isPlaytest']())_0x57c579['log'](_0x446162);return 0x0;}}this[_0x267a21(0x3c6)][_0x267a21(0x2cb)](this['_skillLearnBitmapSprite']);},Scene_Skill['prototype'][_0x397bec(0x352)]=function(){const _0x2b5f29=_0x397bec;if(this[_0x2b5f29(0x225)])return;const _0x27da43=this[_0x2b5f29(0x2f8)](),_0x22a69e=_0x27da43[_0x2b5f29(0x1ce)],_0x2b0a14=ImageManager[_0x2b5f29(0x327)],_0x53cc68=ImageManager[_0x2b5f29(0x361)],_0x942bb0=_0x22a69e%0x10*_0x2b0a14,_0x457894=Math[_0x2b5f29(0x314)](_0x22a69e/0x10)*_0x53cc68;this[_0x2b5f29(0x3e5)]['setFrame'](_0x942bb0,_0x457894,_0x2b0a14,_0x53cc68);},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x280)]=function(){const _0x50f05f=_0x397bec;this[_0x50f05f(0x3c6)]['x']=Math['round'](Graphics[_0x50f05f(0x386)]/0x2);const _0xc93cfd=Math[_0x50f05f(0x1d9)](ImageManager[_0x50f05f(0x361)]*this[_0x50f05f(0x3c6)][_0x50f05f(0x3ce)]['y']);this[_0x50f05f(0x3c6)]['y']=Math[_0x50f05f(0x1d9)]((Graphics['height']+_0xc93cfd)/0x2);},Scene_Skill['prototype'][_0x397bec(0x2b9)]=function(){const _0x466655=_0x397bec;this[_0x466655(0x387)]=VisuMZ[_0x466655(0x2d5)][_0x466655(0x2a2)][_0x466655(0x3a3)][_0x466655(0x2d4)]||0x1,this[_0x466655(0x2f8)]()[_0x466655(0x3a0)][_0x466655(0x3f5)](VisuMZ[_0x466655(0x2d5)][_0x466655(0x3e1)][_0x466655(0x2d7)])&&(this['_skillLearnIconSpriteOpacitySpeed']=Math[_0x466655(0x27f)](Number(RegExp['$1']),0x1)),this[_0x466655(0x3c6)][_0x466655(0x2d8)]=0x0;},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x1c3)]=function(){const _0x4b8f31=_0x397bec;this[_0x4b8f31(0x2f2)]=[];if(this[_0x4b8f31(0x2f8)]()[_0x4b8f31(0x3a0)]['match'](VisuMZ[_0x4b8f31(0x2d5)]['RegExp']['animationIDs']))this['_skillLearnAnimationIDs']=RegExp['$1'][_0x4b8f31(0x20a)](',')[_0x4b8f31(0x281)](_0x3272d2=>Number(_0x3272d2));else{if(_0x4b8f31(0x2ea)!==_0x4b8f31(0x2ea)){const _0x3d8966=_0x89810e[_0x4b8f31(0x1d7)](_0x1559b9);this[_0x4b8f31(0x316)](_0x3d8966);const _0x1e584b=_0x506ae5[_0x4b8f31(0x284)](_0x590d60);this[_0x4b8f31(0x27a)](_0x1e584b);}else this[_0x4b8f31(0x2f2)]=this[_0x4b8f31(0x2f2)][_0x4b8f31(0x333)](VisuMZ['SkillLearnSystem'][_0x4b8f31(0x2a2)]['Animation'][_0x4b8f31(0x1b4)]);}},Scene_Skill['prototype'][_0x397bec(0x224)]=function(_0x4d2624){const _0x382d2c=_0x397bec,_0x58944a=$dataAnimations[_0x4d2624];if(!_0x58944a)return;const _0x238a9a=this[_0x382d2c(0x35f)](_0x58944a);this['_skillLearnAnimationSprite']=new(_0x238a9a?Sprite_AnimationMV:Sprite_Animation)();const _0x1726b0=[this[_0x382d2c(0x3c6)]],_0x3b48fa=0x0;this['_skillLearnAnimationSprite'][_0x382d2c(0x2ef)](_0x1726b0,_0x58944a,![],_0x3b48fa,null),this[_0x382d2c(0x2cb)](this[_0x382d2c(0x437)]);},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x35f)]=function(_0x4d535f){const _0x2f4e26=_0x397bec;return!!_0x4d535f[_0x2f4e26(0x24e)];},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x3c0)]=function(){const _0x37a5a0=_0x397bec;if(!this[_0x37a5a0(0x334)])return;this[_0x37a5a0(0x1d4)](),this[_0x37a5a0(0x405)]();if(this[_0x37a5a0(0x1d1)]()){if(_0x37a5a0(0x417)===_0x37a5a0(0x311)){const _0x3a953b=_0x506180(_0x188ff0['$1']),_0x4d56bb=_0x37a5a0(0x2b7)['format'](_0x3a953b),_0x33231c=_0x34c12b[_0x37a5a0(0x2d5)][_0x37a5a0(0x3ac)](_0x532eb1,_0xdb0838);_0x2f9cb8[_0x37a5a0(0x2d5)]['JS'][_0x33231c]=new _0x35a957(_0x4d56bb);}else this[_0x37a5a0(0x2fa)]();}},Scene_Skill['prototype'][_0x397bec(0x1d4)]=function(){const _0x2c5e1f=_0x397bec;this[_0x2c5e1f(0x3c6)][_0x2c5e1f(0x2d8)]+=this[_0x2c5e1f(0x387)];},Scene_Skill['prototype'][_0x397bec(0x405)]=function(){const _0xeddb61=_0x397bec;if(!this[_0xeddb61(0x437)])return;if(this[_0xeddb61(0x437)][_0xeddb61(0x1fe)]())return;this['destroySkillLearnAnimationSprite'](),this[_0xeddb61(0x224)](this[_0xeddb61(0x2f2)][_0xeddb61(0x236)]());},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x1dd)]=function(){const _0x1a953c=_0x397bec;if(!this[_0x1a953c(0x437)])return;this[_0x1a953c(0x33d)](this[_0x1a953c(0x437)]),this[_0x1a953c(0x437)][_0x1a953c(0x304)](),this[_0x1a953c(0x437)]=undefined;},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x251)]=function(){const _0x2c0b69=_0x397bec;if(!this['_skillLearnIconSprite'])return;this[_0x2c0b69(0x33d)](this[_0x2c0b69(0x3c6)]),this[_0x2c0b69(0x3c6)][_0x2c0b69(0x304)](),this[_0x2c0b69(0x3c6)]=undefined;},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x1d1)]=function(){const _0x36655a=_0x397bec;if(TouchInput[_0x36655a(0x223)]())return!![];if(Input[_0x36655a(0x3cd)]('ok'))return!![];if(Input['isTriggered'](_0x36655a(0x439)))return!![];if(this[_0x36655a(0x3c6)][_0x36655a(0x2d8)]<0xff)return![];if(this[_0x36655a(0x437)])return![];return this['_skillLearnAnimationWait']--<=0x0;},Scene_Skill[_0x397bec(0x26f)][_0x397bec(0x2fa)]=function(){const _0x2879ae=_0x397bec;this[_0x2879ae(0x1dd)](),this[_0x2879ae(0x251)](),this[_0x2879ae(0x3bb)](),TouchInput[_0x2879ae(0x452)](),Input[_0x2879ae(0x452)]();},Window_Base[_0x397bec(0x26f)][_0x397bec(0x1be)]=function(_0x9429c4,_0x4779fd,_0x5977c7,_0x285a04,_0x944f2f){const _0x56517f=_0x397bec;_0x944f2f=_0x944f2f||_0x56517f(0x271);const _0x447aa5='\x5cI[%1]'[_0x56517f(0x2f5)](ImageManager[_0x56517f(0x441)]),_0x41971a=TextManager['abilityPointsFmt'],_0x587726=_0x41971a[_0x56517f(0x2f5)](_0x9429c4,TextManager[_0x56517f(0x450)],_0x447aa5,TextManager['abilityPointsFull']),_0x47964c=this[_0x56517f(0x350)](_0x587726)[_0x56517f(0x386)];if(_0x944f2f===_0x56517f(0x271))_0x4779fd+=0x0;else _0x944f2f===_0x56517f(0x202)?_0x4779fd+=Math['round']((_0x285a04-_0x47964c)/0x2):_0x56517f(0x203)===_0x56517f(0x203)?_0x4779fd+=_0x285a04-_0x47964c:_0x589a8a=_0x2f47a5;this[_0x56517f(0x3c4)](_0x587726,_0x4779fd,_0x5977c7);},Window_Base[_0x397bec(0x26f)][_0x397bec(0x325)]=function(_0xe3ce7a,_0x1c713b,_0x5a655d,_0x597a7e,_0x47e048,_0x467120){const _0x3c83cd=_0x397bec,_0x288399=_0xe3ce7a[_0x3c83cd(0x291)](_0x1c713b);this['drawAbilityPoints'](_0x288399,_0x5a655d,_0x597a7e,_0x47e048,_0x467120);},Window_Base[_0x397bec(0x26f)][_0x397bec(0x3f9)]=function(_0x458023,_0x57bf95,_0x5219fa,_0x24115e,_0x107762){const _0x14c1d2=_0x397bec;_0x107762=_0x107762||_0x14c1d2(0x271);const _0x20eab9='\x5cI[%1]'[_0x14c1d2(0x2f5)](ImageManager[_0x14c1d2(0x2ce)]),_0x57b5cc=TextManager[_0x14c1d2(0x379)],_0x481688=_0x57b5cc[_0x14c1d2(0x2f5)](_0x458023,TextManager[_0x14c1d2(0x235)],_0x20eab9,TextManager['skillPointsFull']),_0x51c6b8=this['textSizeEx'](_0x481688)[_0x14c1d2(0x386)];if(_0x107762===_0x14c1d2(0x271))_0x57bf95+=0x0;else _0x107762===_0x14c1d2(0x202)?_0x57bf95+=Math[_0x14c1d2(0x1d9)]((_0x24115e-_0x51c6b8)/0x2):_0x57bf95+=_0x24115e-_0x51c6b8;this[_0x14c1d2(0x3c4)](_0x481688,_0x57bf95,_0x5219fa);},Window_Base[_0x397bec(0x26f)][_0x397bec(0x1f6)]=function(_0x4ecfe1,_0x1f66b2,_0x5b426e,_0x15c15e,_0x4317a4,_0x3b4c8b){const _0x2d6a52=_0x397bec,_0x3c1f1e=_0x4ecfe1[_0x2d6a52(0x292)](_0x1f66b2);this[_0x2d6a52(0x3f9)](_0x3c1f1e,_0x5b426e,_0x15c15e,_0x4317a4,_0x3b4c8b);},VisuMZ['SkillLearnSystem'][_0x397bec(0x217)]=Window_SkillType[_0x397bec(0x26f)][_0x397bec(0x443)],Window_SkillType[_0x397bec(0x26f)]['makeCommandList']=function(){const _0xe3209b=_0x397bec;VisuMZ['SkillLearnSystem']['Window_SkillType_makeCommandList'][_0xe3209b(0x42b)](this),this[_0xe3209b(0x33a)]();},Window_SkillType[_0x397bec(0x26f)]['addSkillLearnSystemCommand']=function(){const _0x271ac0=_0x397bec;if(!$gameSystem['isSkillLearnSystemMenuAccess']())return;if(!this[_0x271ac0(0x2c4)])return;let _0x4e8a62=this[_0x271ac0(0x41b)]();const _0x44cb2a=this['_actor']['skillTypes']()[0x0];this[_0x271ac0(0x207)](_0x4e8a62,_0x271ac0(0x297),!![],_0x271ac0(0x44e));},Window_SkillType['prototype'][_0x397bec(0x41b)]=function(){const _0x5511a9=_0x397bec;let _0x150d10=TextManager['skillLearnCmd'];if(_0x150d10[_0x5511a9(0x3f5)](/\\I\[(\d+)\]/i))return _0x150d10;if(!Imported[_0x5511a9(0x36b)])return _0x150d10;if(this[_0x5511a9(0x1de)]()===_0x5511a9(0x1cf))return _0x150d10;const _0x1afda7=TextManager[_0x5511a9(0x1f9)];return _0x5511a9(0x339)[_0x5511a9(0x2f5)](_0x1afda7,_0x150d10);},VisuMZ[_0x397bec(0x2d5)]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x397bec(0x26f)][_0x397bec(0x402)],Window_SkillStatus['prototype'][_0x397bec(0x402)]=function(){const _0x3c0fbe=_0x397bec;this['resetFontSettings'](),this[_0x3c0fbe(0x36f)]()?this['refreshSkillLearnSystem']():VisuMZ[_0x3c0fbe(0x2d5)][_0x3c0fbe(0x2b6)][_0x3c0fbe(0x42b)](this);},Window_SkillStatus[_0x397bec(0x26f)][_0x397bec(0x36f)]=function(){const _0x4e3889=_0x397bec,_0x40ce38=SceneManager[_0x4e3889(0x28b)];if(!_0x40ce38)return![];const _0x289e55=_0x40ce38[_0x4e3889(0x2a8)];if(!_0x289e55)return![];return _0x289e55[_0x4e3889(0x36f)]&&_0x289e55[_0x4e3889(0x36f)]();},Window_SkillStatus[_0x397bec(0x26f)][_0x397bec(0x357)]=function(){const _0x4fbfb6=_0x397bec;if(!this[_0x4fbfb6(0x2c4)])return;Window_StatusBase[_0x4fbfb6(0x26f)]['refresh'][_0x4fbfb6(0x42b)](this);if(VisuMZ['SkillLearnSystem'][_0x4fbfb6(0x2a2)]['General'][_0x4fbfb6(0x370)]){VisuMZ[_0x4fbfb6(0x2d5)][_0x4fbfb6(0x2a2)][_0x4fbfb6(0x2c7)][_0x4fbfb6(0x370)][_0x4fbfb6(0x42b)](this);return;}const _0x14d3e0=this['colSpacing']()/0x2,_0x804327=this[_0x4fbfb6(0x22b)],_0x2e4918=_0x804327/0x2-this['lineHeight']()*1.5;this[_0x4fbfb6(0x43a)](this[_0x4fbfb6(0x2c4)],_0x14d3e0+0x1,0x0,0x90,_0x804327),this['drawActorSimpleStatus'](this['_actor'],_0x14d3e0+0xb4,_0x2e4918);let _0x258fd3=this[_0x4fbfb6(0x253)]()/0x2+0xb4+0xb4+0xb4,_0x191e5d=this[_0x4fbfb6(0x25a)]-_0x258fd3-0x2;if(_0x191e5d<0x12c)return;const _0x47d7f7=this[_0x4fbfb6(0x456)](),_0x3ca71d=Math[_0x4fbfb6(0x314)](this[_0x4fbfb6(0x22b)]/this[_0x4fbfb6(0x2d0)]()),_0x282736=Math[_0x4fbfb6(0x3aa)](_0x47d7f7[_0x4fbfb6(0x430)]/_0x3ca71d);let _0x86d1ff=_0x258fd3,_0x5f40f9=Math[_0x4fbfb6(0x27f)](Math[_0x4fbfb6(0x1d9)]((this['innerHeight']-this[_0x4fbfb6(0x2d0)]()*Math[_0x4fbfb6(0x3aa)](_0x47d7f7[_0x4fbfb6(0x430)]/_0x282736))/0x2),0x0);const _0x4c6f37=_0x5f40f9;let _0x33267e=(this['innerWidth']-_0x86d1ff-this[_0x4fbfb6(0x1e8)]()*0x2*_0x282736)/_0x282736;_0x282736===0x1&&(_0x33267e=Math[_0x4fbfb6(0x3ba)](ImageManager['faceWidth'],_0x33267e),_0x86d1ff+=Math[_0x4fbfb6(0x1d9)]((this[_0x4fbfb6(0x25a)]-_0x86d1ff-this[_0x4fbfb6(0x1e8)]()*0x2-_0x33267e)/0x2));for(const _0x58c23d of _0x47d7f7){switch(_0x58c23d){case'AP':this[_0x4fbfb6(0x325)](this[_0x4fbfb6(0x2c4)],this[_0x4fbfb6(0x2c4)][_0x4fbfb6(0x428)]()['id'],_0x86d1ff,_0x5f40f9,_0x33267e,'right');break;case'CP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x4fbfb6(0x312)](this['_actor'],this[_0x4fbfb6(0x2c4)]['currentClass']()['id'],_0x86d1ff,_0x5f40f9,_0x33267e,_0x4fbfb6(0x2ab));break;case'JP':Imported['VisuMZ_2_ClassChangeSystem']&&this[_0x4fbfb6(0x406)](this[_0x4fbfb6(0x2c4)],this['_actor']['currentClass']()['id'],_0x86d1ff,_0x5f40f9,_0x33267e,_0x4fbfb6(0x2ab));break;case'SP':this['drawActorSkillPoints'](this[_0x4fbfb6(0x2c4)],this['_actor'][_0x4fbfb6(0x428)]()['id'],_0x86d1ff,_0x5f40f9,_0x33267e,'right');break;case _0x4fbfb6(0x257):this[_0x4fbfb6(0x385)]($gameParty[_0x4fbfb6(0x1ee)](),TextManager['currencyUnit'],_0x86d1ff,_0x5f40f9,_0x33267e);break;default:continue;}_0x5f40f9+=this[_0x4fbfb6(0x2d0)](),_0x5f40f9+this['lineHeight']()>this[_0x4fbfb6(0x22b)]&&(_0x5f40f9=_0x4c6f37,_0x86d1ff+=_0x33267e+this[_0x4fbfb6(0x1e8)]()*0x2);}},Window_SkillStatus[_0x397bec(0x26f)]['getSkillLearnDisplayedCosts']=function(){const _0x5817f1=_0x397bec,_0x21a914=JsonEx['makeDeepCopy'](VisuMZ['SkillLearnSystem']['Settings'][_0x5817f1(0x2c7)]['DisplayedCosts']);return!Imported['VisuMZ_2_ClassChangeSystem']&&(_0x5817f1(0x27e)===_0x5817f1(0x27e)?(_0x21a914[_0x5817f1(0x24c)]('CP'),_0x21a914[_0x5817f1(0x24c)]('JP')):_0x4883a2*=this[_0x5817f1(0x1d2)]()),_0x21a914[_0x5817f1(0x24c)](_0x5817f1(0x2c2))[_0x5817f1(0x24c)](_0x5817f1(0x1f2))[_0x5817f1(0x24c)]('Armor');},Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x36f)]=function(){const _0x57c86f=_0x397bec;return this[_0x57c86f(0x2ec)]===_0x57c86f(0x44e);},VisuMZ['SkillLearnSystem']['Window_SkillList_setStypeId']=Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x410)],Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x410)]=function(_0x39f409){const _0x40797e=_0x397bec,_0x42c577=this[_0x40797e(0x36f)]();VisuMZ['SkillLearnSystem']['Window_SkillList_setStypeId'][_0x40797e(0x42b)](this,_0x39f409);if(_0x42c577!==this[_0x40797e(0x36f)]()){if('rdSWG'!==_0x40797e(0x3dc))_0x54d279=_0x559300(_0x56142e);else{const _0x50eaa5=SceneManager[_0x40797e(0x28b)];if(!_0x50eaa5)return;const _0x37349d=_0x50eaa5[_0x40797e(0x240)];if(_0x37349d)_0x37349d[_0x40797e(0x402)]();}}},VisuMZ[_0x397bec(0x2d5)]['Window_SkillList_maxCols']=Window_SkillList[_0x397bec(0x26f)]['maxCols'],Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x21c)]=function(){const _0x8f5ddb=_0x397bec;return this['isSkillLearnMode']()?0x1:VisuMZ[_0x8f5ddb(0x2d5)][_0x8f5ddb(0x204)][_0x8f5ddb(0x42b)](this);},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x3f7)]=Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x23b)],Window_SkillList['prototype']['makeItemList']=function(){const _0xce13ec=_0x397bec;this['_actor']&&this[_0xce13ec(0x36f)]()?this[_0xce13ec(0x1fc)]():VisuMZ['SkillLearnSystem']['Window_SkillList_makeItemList']['call'](this);},Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x1fc)]=function(){const _0x7c35fc=_0x397bec,_0x1214eb=DataManager[_0x7c35fc(0x318)](this[_0x7c35fc(0x2c4)][_0x7c35fc(0x428)]()['id']);this['_data']=_0x1214eb[_0x7c35fc(0x281)](_0x25dda7=>$dataSkills[_0x25dda7])[_0x7c35fc(0x407)](_0x379c14=>this['includes'](_0x379c14));},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x28c)]=Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x374)],Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x374)]=function(_0x1e078c){const _0x60f61d=_0x397bec;if(this[_0x60f61d(0x36f)]()){if(_0x60f61d(0x2e8)===_0x60f61d(0x2e8))return this['skillLearnIncludes'](_0x1e078c);else{this[_0x60f61d(0x41c)]===_0x221707&&this['initAbilityPoints']();const _0xf253fc=_0x34a2e2[_0x60f61d(0x2d5)][_0x60f61d(0x2a2)]['AbilityPoints'];return _0xf253fc[_0x60f61d(0x338)]?_0x54aff6=0x0:_0x23a697=_0x3f186e||this['currentClass']()['id'],this[_0x60f61d(0x41c)][_0x52a1a]=this[_0x60f61d(0x41c)][_0x13687c]||0x0,_0x2b350f[_0x60f61d(0x1d9)](this[_0x60f61d(0x41c)][_0x51b192]);}}else{if('sTzbt'===_0x60f61d(0x220))return VisuMZ[_0x60f61d(0x2d5)][_0x60f61d(0x28c)][_0x60f61d(0x42b)](this,_0x1e078c);else this[_0x60f61d(0x38f)]();}},Window_SkillList['prototype']['skillLearnIncludes']=function(_0x50d70b){const _0x4aa778=_0x397bec;if(!_0x50d70b)return![];if(_0x50d70b[_0x4aa778(0x3ef)][_0x4aa778(0x430)]<=0x0)return![];if(_0x50d70b['name']['match'](/-----/i))return![];const _0x151048=VisuMZ['SkillLearnSystem'][_0x4aa778(0x3ac)](_0x50d70b,_0x4aa778(0x306));if(VisuMZ[_0x4aa778(0x2d5)]['JS'][_0x151048]){if('dRQYg'===_0x4aa778(0x435)){if(!VisuMZ[_0x4aa778(0x2d5)]['JS'][_0x151048]['call'](this,this[_0x4aa778(0x2c4)],_0x50d70b))return![];}else _0x2e777c['ConvertParams'](_0x2c6d3b,_0x346b0e),_0x136848['setSkillLearnSystemMenuAccess'](_0x508cc9[_0x4aa778(0x383)]);}const _0x49ff56=VisuMZ[_0x4aa778(0x2d5)][_0x4aa778(0x3e1)],_0x94279=_0x50d70b[_0x4aa778(0x3a0)];if(_0x94279[_0x4aa778(0x3f5)](_0x49ff56[_0x4aa778(0x3f0)])){const _0x4603ef=Number(RegExp['$1']);if(_0x4603ef>this['_actor']['level'])return![];}if(_0x94279[_0x4aa778(0x3f5)](_0x49ff56[_0x4aa778(0x1f5)])){const _0x57f757=String(RegExp['$1'])['split'](',')['map'](_0x5c90fb=>_0x5c90fb[_0x4aa778(0x3ea)]());;for(const _0x58805a of _0x57f757){let _0x889d14=0x0;const _0x560243=/^\d+$/[_0x4aa778(0x37a)](_0x58805a);_0x560243?_0x889d14=Number(_0x58805a):_0x889d14=DataManager[_0x4aa778(0x1f1)](_0x58805a);if(!this['_actor'][_0x4aa778(0x24d)](_0x889d14))return![];}}if(_0x94279[_0x4aa778(0x3f5)](_0x49ff56[_0x4aa778(0x43d)])){const _0x244e57=String(RegExp['$1'])[_0x4aa778(0x20a)](',')[_0x4aa778(0x281)](_0x4d87cd=>_0x4d87cd[_0x4aa778(0x3ea)]());;let _0x4d50a7=![];for(const _0x1b9f8a of _0x244e57){if('xocrY'===_0x4aa778(0x2da)){let _0x414dd5=0x0;const _0x28da8e=/^\d+$/[_0x4aa778(0x37a)](_0x1b9f8a);_0x28da8e?_0x414dd5=Number(_0x1b9f8a):_0x4aa778(0x23a)!==_0x4aa778(0x23a)?(_0x48f3a7[_0x4aa778(0x2d5)][_0x4aa778(0x2ca)][_0x4aa778(0x42b)](this,_0x11bc80),this[_0x4aa778(0x399)](_0x4a5a4c)):_0x414dd5=DataManager[_0x4aa778(0x1f1)](_0x1b9f8a);if(this[_0x4aa778(0x2c4)]['isLearnedSkill'](_0x414dd5)){_0x4d50a7=!![];break;}}else this[_0x4aa778(0x312)](this[_0x4aa778(0x2c4)],this['_actor'][_0x4aa778(0x428)]()['id'],_0x29c7a1,_0x430b27,_0x40577d,_0x4aa778(0x2ab));}if(!_0x4d50a7)return![];}if(_0x94279[_0x4aa778(0x3f5)](_0x49ff56[_0x4aa778(0x296)])){if(_0x4aa778(0x37d)!==_0x4aa778(0x37d))_0xad4c2f>0x0&&(_0x1722d6*=this[_0x4aa778(0x252)]()),this[_0x4aa778(0x2fb)](_0xf1da38,_0x5372ef);else{const _0x38b425=String(RegExp['$1'])[_0x4aa778(0x20a)](',')[_0x4aa778(0x281)](_0x376668=>Number(_0x376668));for(const _0x2557d0 of _0x38b425){if(!$gameSwitches[_0x4aa778(0x326)](_0x2557d0))return![];}}}if(_0x94279[_0x4aa778(0x3f5)](_0x49ff56[_0x4aa778(0x45e)])){if(_0x4aa778(0x28e)===_0x4aa778(0x265))_0x5f04d2=_0x944677(_0x4e1498[_0x4aa778(0x1fa)]);else{const _0x22cbe9=String(RegExp['$1'])[_0x4aa778(0x20a)](',')[_0x4aa778(0x281)](_0xa6d894=>Number(_0xa6d894));let _0x4cdf45=![];for(const _0x10accf of _0x22cbe9){if($gameSwitches[_0x4aa778(0x326)](_0x10accf)){_0x4cdf45=!![];break;}}if(!_0x4cdf45)return![];}}return _0x50d70b;},VisuMZ[_0x397bec(0x2d5)]['Window_SkillList_isEnabled']=Window_SkillList['prototype'][_0x397bec(0x25c)],Window_SkillList[_0x397bec(0x26f)]['isEnabled']=function(_0x578d48){const _0x1fdba9=_0x397bec;return this[_0x1fdba9(0x2c4)]&&this[_0x1fdba9(0x36f)]()?this[_0x1fdba9(0x409)](_0x578d48):VisuMZ[_0x1fdba9(0x2d5)]['Window_SkillList_isEnabled'][_0x1fdba9(0x42b)](this,_0x578d48);},VisuMZ[_0x397bec(0x2d5)][_0x397bec(0x37f)]=Window_SkillList[_0x397bec(0x26f)]['drawItem'],Window_SkillList[_0x397bec(0x26f)]['drawItem']=function(_0x18e58b){const _0x2b2f9b=_0x397bec;this[_0x2b2f9b(0x45f)]=this[_0x2b2f9b(0x36f)](),VisuMZ[_0x2b2f9b(0x2d5)][_0x2b2f9b(0x37f)]['call'](this,_0x18e58b),this[_0x2b2f9b(0x45f)]=![];},Window_SkillList[_0x397bec(0x26f)]['isSkillLearnEnabled']=function(_0x398a90){const _0x1031f4=_0x397bec;if(!_0x398a90)return![];if(_0x398a90[_0x1031f4(0x3ef)][_0x1031f4(0x430)]<=0x0)return![];if(_0x398a90[_0x1031f4(0x3ef)]['match'](/-----/i))return![];if(this[_0x1031f4(0x2c4)]['isLearnedSkill'](_0x398a90['id']))return![];if(this[_0x1031f4(0x45f)]){if(!this['_actor'][_0x1031f4(0x273)](_0x398a90))return![];return this[_0x1031f4(0x2c4)][_0x1031f4(0x2b1)](_0x398a90);}return!![];},VisuMZ['SkillLearnSystem'][_0x397bec(0x3f1)]=Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x346)],Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x346)]=function(_0x4bdc0f,_0x1d94cb,_0x2cc4be,_0x3e67b2){const _0x1f838b=_0x397bec;this[_0x1f838b(0x36f)]()?_0x1f838b(0x3e7)!==_0x1f838b(0x3e7)?(_0x23fc89=_0x17ccd9[_0x1f838b(0x1f8)]['format'](_0x2eb71b[_0x1f838b(0x3a5)][_0x17ac85]||''),_0x58d1fc['length']>0x0&&(_0x3d9e73!==''?_0x299694=_0x5188dd['format'](_0x365e0a,_0x8902f5):_0x383c27=_0x10183d)):this[_0x1f838b(0x2c9)](_0x4bdc0f)?this[_0x1f838b(0x1ba)](_0x4bdc0f,_0x1d94cb,_0x2cc4be,_0x3e67b2):'oEhMr'!==_0x1f838b(0x2a6)?(_0x36eb76[_0x1f838b(0x2d5)][_0x1f838b(0x40f)][_0x1f838b(0x42b)](this),this['process_VisuMZ_SkillLearnSystem_Notetags']()):this[_0x1f838b(0x32c)](_0x4bdc0f,_0x1d94cb,_0x2cc4be,_0x3e67b2):VisuMZ[_0x1f838b(0x2d5)]['Window_SkillList_drawSkillCost'][_0x1f838b(0x42b)](this,_0x4bdc0f,_0x1d94cb,_0x2cc4be,_0x3e67b2);},Window_SkillList[_0x397bec(0x26f)]['shouldDrawSkillLearnRequirements']=function(_0x1657ea){const _0x4f4ad1=_0x397bec;return this[_0x4f4ad1(0x2c4)]&&!this['_actor']['meetRequirementsForSkillLearnSystem'](_0x1657ea);},Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x1ba)]=function(_0x46ddb5,_0x53bb67,_0x548da1,_0x1a6d0f){const _0xfb1af3=_0x397bec,_0x55679a=this[_0xfb1af3(0x310)](_0x46ddb5),_0x4abe48=this[_0xfb1af3(0x350)](_0x55679a)[_0xfb1af3(0x386)];_0x53bb67+=_0x1a6d0f-_0x4abe48,this[_0xfb1af3(0x3c4)](_0x55679a,_0x53bb67,_0x548da1);},Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x310)]=function(_0x4a39fa){const _0x10f513=_0x397bec,_0x1f6ad8=VisuMZ[_0x10f513(0x2d5)][_0x10f513(0x2a2)]['General'],_0x3fa6bb=TextManager[_0x10f513(0x2f1)],_0x398fc2=VisuMZ[_0x10f513(0x2d5)][_0x10f513(0x3e1)],_0x4c637d=_0x4a39fa['note'];let _0x18e927='',_0x1afc43='';const _0x3772e1=[_0x10f513(0x1f3),'SKILLS',_0x10f513(0x2ba),'CUSTOM'];for(const _0x1b2798 of _0x3772e1){if('lYNEr'===_0x10f513(0x1e9))switch(_0x1b2798){case _0x10f513(0x1f3):if(_0x4c637d['match'](_0x398fc2[_0x10f513(0x290)])){const _0x45c04e=Number(RegExp['$1']);_0x1afc43=TextManager['skillLearnReqLevelFmt']['format'](_0x45c04e,TextManager[_0x10f513(0x208)],TextManager[_0x10f513(0x285)]),_0x1afc43[_0x10f513(0x430)]>0x0&&(_0x10f513(0x40b)!=='hhcKW'?_0x18e927!==''?_0x18e927=_0x3fa6bb[_0x10f513(0x2f5)](_0x18e927,_0x1afc43):_0x18e927=_0x1afc43:this[_0x10f513(0x225)]=_0x5b03ac(_0x15db5f['$1']));}break;case'SKILLS':if(_0x4c637d[_0x10f513(0x3f5)](_0x398fc2['LearnReqSkillsAll'])){const _0x472e58=String(RegExp['$1'])[_0x10f513(0x20a)](',')['map'](_0x48d013=>_0x48d013[_0x10f513(0x3ea)]());;for(const _0x4da3df of _0x472e58){let _0x42f41c=0x0;const _0x449d46=/^\d+$/[_0x10f513(0x37a)](_0x4da3df);if(_0x449d46)_0x42f41c=Number(_0x4da3df);else{if('eufvj'!==_0x10f513(0x41d)){const _0x47f7f0=_0x8c10a5(_0x471f70['$1']);if(_0x47f7f0>this[_0x10f513(0x208)])return![];}else _0x42f41c=DataManager[_0x10f513(0x1f1)](_0x4da3df);}if($dataSkills[_0x42f41c]){if('VYqhu'!=='VYqhu'){const _0x3242f6=_0x469551(_0x3dbe14['$1']);this['subject']()[_0x10f513(0x33e)](_0x3242f6);}else{const _0x117e45=$dataSkills[_0x42f41c];_0x1afc43=TextManager['skillLearnReqSkillFmt'][_0x10f513(0x2f5)](_0x10f513(0x293)[_0x10f513(0x2f5)](_0x117e45[_0x10f513(0x1ce)]),_0x117e45[_0x10f513(0x3ef)]),_0x1afc43[_0x10f513(0x430)]>0x0&&(_0x18e927!==''?_0x18e927=_0x3fa6bb[_0x10f513(0x2f5)](_0x18e927,_0x1afc43):_0x18e927=_0x1afc43);}}}}if(_0x4c637d['match'](_0x398fc2[_0x10f513(0x320)])){const _0x4ae290=String(RegExp['$1'])[_0x10f513(0x20a)](',')['map'](_0x3db66f=>_0x3db66f[_0x10f513(0x3ea)]());;for(const _0x3a565f of _0x4ae290){let _0x381004=0x0;const _0x4de3b4=/^\d+$/[_0x10f513(0x37a)](_0x3a565f);if(_0x4de3b4){if(_0x10f513(0x2bf)!==_0x10f513(0x2bf)){if(_0x50c847['ParseAllNotetags'])return;this['process_VisuMZ_SkillLearnSystem_JS']();}else _0x381004=Number(_0x3a565f);}else{if(_0x10f513(0x36e)!==_0x10f513(0x36e)){const _0x64a468=_0x49d616[_0x10f513(0x3a5)][_0x2cdff7],_0x159e38=_0x4760bd['value'](_0x29ef58)?_0xd63fea:_0x1aab91;_0xba4e1c+=_0x159e38['format'](_0x64a468)+'\x0a';}else _0x381004=DataManager['getSkillIdWithName'](_0x3a565f);}if($dataSkills[_0x381004]){if(_0x10f513(0x404)===_0x10f513(0x2b5))_0x5450ed[_0x10f513(0x2d5)][_0x10f513(0x3f7)]['call'](this);else{const _0x3b222a=$dataSkills[_0x381004];_0x1afc43=TextManager[_0x10f513(0x319)]['format'](_0x10f513(0x293)[_0x10f513(0x2f5)](_0x3b222a[_0x10f513(0x1ce)]),_0x3b222a['name']),_0x1afc43[_0x10f513(0x430)]>0x0&&(_0x18e927!==''?_0x18e927=_0x3fa6bb[_0x10f513(0x2f5)](_0x18e927,_0x1afc43):_0x18e927=_0x1afc43);}}}}break;case _0x10f513(0x2ba):if(_0x4c637d[_0x10f513(0x3f5)](_0x398fc2[_0x10f513(0x32e)])){const _0x1f8f65=String(RegExp['$1'])['split'](',')[_0x10f513(0x281)](_0x3d3d05=>_0x3d3d05[_0x10f513(0x3ea)]());;for(const _0x44332f of _0x1f8f65){if(_0x10f513(0x241)===_0x10f513(0x241))$dataSystem[_0x10f513(0x3a5)][_0x44332f]&&(_0x10f513(0x329)===_0x10f513(0x329)?(_0x1afc43=TextManager[_0x10f513(0x1f8)][_0x10f513(0x2f5)]($dataSystem['switches'][_0x44332f]||''),_0x1afc43[_0x10f513(0x430)]>0x0&&(_0x18e927!==''?'Pftgj'===_0x10f513(0x36c)?_0x5bf9ce=_0x230bee[_0x10f513(0x3e9)][_0x10f513(0x2f5)](_0x191546,_0x1789d1):_0x18e927=_0x3fa6bb[_0x10f513(0x2f5)](_0x18e927,_0x1afc43):_0x18e927=_0x1afc43)):_0x2d2854['id']=_0x763eab['getItemIdWithName'](_0x468158));else{const _0x28d7d5=_0x2c516b[_0x10f513(0x28b)]['user']();return _0x44f07b[_0x10f513(0x2d5)]['JS'][_0x1664fb][_0x10f513(0x42b)](this,_0x28d7d5,_0x35afa0)||0x0;}}}if(_0x4c637d[_0x10f513(0x3f5)](_0x398fc2[_0x10f513(0x269)])){const _0x569570=String(RegExp['$1'])[_0x10f513(0x20a)](',')[_0x10f513(0x281)](_0x859fc8=>_0x859fc8[_0x10f513(0x3ea)]());;for(const _0x899718 of _0x569570){if('KKgdQ'===_0x10f513(0x35e))_0x59ed79=_0x4255ae;else{if($dataSystem[_0x10f513(0x3a5)][_0x899718]){_0x1afc43=TextManager[_0x10f513(0x1f8)][_0x10f513(0x2f5)]($dataSystem[_0x10f513(0x3a5)][_0x899718]||'');if(_0x1afc43['length']>0x0){if(_0x10f513(0x3f3)!=='MDxZg'){if(this[_0x10f513(0x32d)]()[_0x10f513(0x313)]()&&_0x44b2d5[_0x10f513(0x3f5)](_0x3fac15['UserGainSkillPoints'])){const _0x563664=_0x3f8bcd(_0x5c7360['$1']);this[_0x10f513(0x32d)]()[_0x10f513(0x33e)](_0x563664);}else this['applySkillPoints']();if(_0x131902['isActor']()&&_0x51ea40['match'](_0x5d70b3[_0x10f513(0x3d1)])){const _0x21426a=_0xe7ad71(_0x55999b['$1']);_0x1572b2[_0x10f513(0x33e)](_0x21426a);}}else _0x18e927!==''?_0x18e927=_0x3fa6bb[_0x10f513(0x2f5)](_0x18e927,_0x1afc43):_0x10f513(0x394)!==_0x10f513(0x391)?_0x18e927=_0x1afc43:(_0x1c3c6b[_0x10f513(0x2d5)][_0x10f513(0x343)][_0x10f513(0x42b)](this,_0x51a794),_0x50b9d3[_0x10f513(0x2d5)][_0x10f513(0x3e8)](_0x4dbe49));}}}}}break;case _0x10f513(0x36d):const _0x41b982=VisuMZ['SkillLearnSystem'][_0x10f513(0x3ac)](_0x4a39fa,_0x10f513(0x381));if(VisuMZ['SkillLearnSystem']['JS'][_0x41b982]){_0x1afc43=VisuMZ['SkillLearnSystem']['JS'][_0x41b982][_0x10f513(0x42b)](this,this['_actor'],_0x4a39fa);if(_0x1afc43['length']>0x0){if('FlVwZ'!==_0x10f513(0x418))_0x4d6dd5=_0x278efc[_0x10f513(0x1f1)](_0x212a2d);else{if(_0x18e927!=='')_0x18e927=_0x3fa6bb[_0x10f513(0x2f5)](_0x18e927,_0x1afc43);else{if(_0x10f513(0x3b5)!==_0x10f513(0x3b5)){if(!_0x454e20[_0x10f513(0x326)](_0x4ad0ad))return![];}else _0x18e927=_0x1afc43;}}}}break;}else _0x59780b['SkillLearnSystem'][_0x10f513(0x2d9)]['call'](this,_0x5a1294),this[_0x10f513(0x300)](),this[_0x10f513(0x42d)](),this['initSkillPoints'](),this['gainStartingSkillPoints']();}return _0x18e927=TextManager['skillLearnReqHeaderFmt'][_0x10f513(0x2f5)](_0x18e927),_0x18e927[_0x10f513(0x3ea)]();},Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x32c)]=function(_0xc9a1,_0x1667cd,_0x55f2e1,_0x5bebb4){const _0x32f5f4=_0x397bec,_0x2e3a30=this[_0x32f5f4(0x351)](_0xc9a1),_0x45f9e2=this[_0x32f5f4(0x350)](_0x2e3a30)[_0x32f5f4(0x386)];_0x1667cd+=_0x5bebb4-_0x45f9e2,this[_0x32f5f4(0x3c4)](_0x2e3a30,_0x1667cd,_0x55f2e1);},Window_SkillList[_0x397bec(0x26f)][_0x397bec(0x351)]=function(_0x9c4a88){const _0x19f92c=_0x397bec;if(this[_0x19f92c(0x2c4)]&&this[_0x19f92c(0x2c4)][_0x19f92c(0x24d)](_0x9c4a88['id']))return _0x19f92c(0x1bc)===_0x19f92c(0x398)?_0x8fe0d2(_0x4d74f8['$1']):TextManager[_0x19f92c(0x328)];const _0x3252b9=VisuMZ['SkillLearnSystem'][_0x19f92c(0x2a2)][_0x19f92c(0x2c7)],_0x2bea5a=TextManager[_0x19f92c(0x3e9)];let _0x50bc5b='';const _0x3e9e6b=JsonEx[_0x19f92c(0x317)](_0x3252b9[_0x19f92c(0x214)]);_0x3e9e6b[_0x19f92c(0x266)](_0x19f92c(0x378));for(const _0x48dd0a of _0x3e9e6b){if(!_0x48dd0a)continue;const _0x344abf=this[_0x19f92c(0x1b8)](_0x9c4a88,_0x48dd0a)[_0x19f92c(0x3ea)]();if(_0x344abf[_0x19f92c(0x430)]>0x0){if(_0x50bc5b!=='')_0x50bc5b=_0x2bea5a[_0x19f92c(0x2f5)](_0x50bc5b,_0x344abf);else{if('RhVTB'==='bCPXh')return _0x39ca6b=_0x16432b[_0x19f92c(0x379)],_0x47baf1[_0x19f92c(0x2f5)](_0x3b6393,_0x56c913[_0x19f92c(0x235)],_0x19f92c(0x293)[_0x19f92c(0x2f5)](_0x457d20[_0x19f92c(0x2ce)]),_0x26106b[_0x19f92c(0x28f)]);else _0x50bc5b=_0x344abf;}}}return _0x50bc5b[_0x19f92c(0x3ea)]();},Window_SkillList['prototype'][_0x397bec(0x1b8)]=function(_0x33a411,_0x40327f){const _0x192f17=_0x397bec;let _0x3319be=0x0,_0x5cb46a='',_0x104a28='';switch(_0x40327f[_0x192f17(0x353)]()[_0x192f17(0x3ea)]()){case'AP':_0x3319be=DataManager['getSkillLearnAbilityPointCost'](_0x33a411);if(_0x3319be>0x0)return _0x5cb46a=TextManager['abilityPointsFmt'],_0x5cb46a[_0x192f17(0x2f5)](_0x3319be,TextManager['abilityPointsAbbr'],'\x5cI[%1]'['format'](ImageManager[_0x192f17(0x441)]),TextManager['abilityPointsFull']);break;case'SP':_0x3319be=DataManager[_0x192f17(0x26d)](_0x33a411);if(_0x3319be>0x0){if(_0x192f17(0x2ee)===_0x192f17(0x2ee))return _0x5cb46a=TextManager[_0x192f17(0x379)],_0x5cb46a[_0x192f17(0x2f5)](_0x3319be,TextManager[_0x192f17(0x235)],_0x192f17(0x293)[_0x192f17(0x2f5)](ImageManager[_0x192f17(0x2ce)]),TextManager['skillPointsFull']);else{let _0x4b8580=0x0;const _0x174697=/^\d+$/[_0x192f17(0x37a)](_0x39ea53);_0x174697?_0x4b8580=_0x4e5615(_0x1cac39):_0x4b8580=_0x3f632d[_0x192f17(0x1f1)](_0x41f1d1);if(!this[_0x192f17(0x24d)](_0x4b8580))return![];}}break;case _0x192f17(0x442):_0x3319be=DataManager[_0x192f17(0x1bf)](_0x33a411),_0x5cb46a=TextManager[_0x192f17(0x307)];for(const _0x48786e of _0x3319be){if(_0x192f17(0x211)===_0x192f17(0x211)){if(!_0x48786e)continue;const _0x291575=$dataItems[_0x48786e['id']];if(!_0x291575)continue;const _0xbb2960=_0x5cb46a['format'](_0x48786e['quantity'],_0x192f17(0x293)[_0x192f17(0x2f5)](_0x291575[_0x192f17(0x1ce)]),_0x291575[_0x192f17(0x3ef)]);_0x104a28!==''?_0x104a28=TextManager[_0x192f17(0x3e9)][_0x192f17(0x2f5)](_0x104a28,_0xbb2960):_0x104a28=_0xbb2960;}else{if(_0x2e6414[_0x192f17(0x3f5)](/(?:JOB POINTS|JP):[ ](\d+)/gi))return _0x4452bd(_0x22b847['$1']);}}return _0x104a28;case _0x192f17(0x358):_0x3319be=DataManager['getSkillLearnWeaponCost'](_0x33a411),_0x5cb46a=TextManager['skillLearnWeaponFmt'];for(const _0x4f1db8 of _0x3319be){if(!_0x4f1db8)continue;const _0x3737f8=$dataWeapons[_0x4f1db8['id']];if(!_0x3737f8)continue;const _0x5153c7=_0x5cb46a['format'](_0x4f1db8[_0x192f17(0x2b3)],_0x192f17(0x293)['format'](_0x3737f8[_0x192f17(0x1ce)]),_0x3737f8['name']);_0x104a28!==''?_0x104a28=TextManager[_0x192f17(0x3e9)]['format'](_0x104a28,_0x5153c7):_0x192f17(0x3e3)!==_0x192f17(0x243)?_0x104a28=_0x5153c7:_0x1e0ea8=_0x43c1aa(_0xe4e34c);}return _0x104a28;case _0x192f17(0x321):_0x3319be=DataManager['getSkillLearnArmorCost'](_0x33a411),_0x5cb46a=TextManager['skillLearnArmorFmt'];for(const _0x1f2533 of _0x3319be){if(!_0x1f2533)continue;const _0x3075a2=$dataArmors[_0x1f2533['id']];if(!_0x3075a2)continue;const _0x4bf068=_0x5cb46a[_0x192f17(0x2f5)](_0x1f2533[_0x192f17(0x2b3)],_0x192f17(0x293)[_0x192f17(0x2f5)](_0x3075a2[_0x192f17(0x1ce)]),_0x3075a2[_0x192f17(0x3ef)]);_0x104a28!==''?_0x192f17(0x2b0)!==_0x192f17(0x2b0)?_0x201960+=0x0:_0x104a28=TextManager[_0x192f17(0x3e9)][_0x192f17(0x2f5)](_0x104a28,_0x4bf068):_0x104a28=_0x4bf068;}return _0x104a28;case _0x192f17(0x1d6):_0x3319be=DataManager[_0x192f17(0x400)](_0x33a411);if(_0x3319be>0x0)return _0x5cb46a=TextManager[_0x192f17(0x43b)],_0x5cb46a[_0x192f17(0x2f5)](_0x3319be,Imported[_0x192f17(0x2f3)]?_0x192f17(0x293)[_0x192f17(0x2f5)](VisuMZ[_0x192f17(0x422)][_0x192f17(0x2a2)][_0x192f17(0x257)][_0x192f17(0x3d6)]):TextManager[_0x192f17(0x395)],TextManager[_0x192f17(0x395)]);break;case'CUSTOM':const _0x1adddd=VisuMZ[_0x192f17(0x2d5)][_0x192f17(0x3ac)](_0x33a411,'jsLearnShowListTxt');if(VisuMZ['SkillLearnSystem']['JS'][_0x1adddd])return VisuMZ[_0x192f17(0x2d5)]['JS'][_0x1adddd][_0x192f17(0x42b)](this,this[_0x192f17(0x2c4)],_0x33a411);break;case'CP':if(Imported[_0x192f17(0x390)]){if(_0x192f17(0x249)===_0x192f17(0x249)){_0x3319be=DataManager['getSkillLearnClassPointCost'](_0x33a411);if(_0x3319be>0x0)return _0x5cb46a=TextManager[_0x192f17(0x22c)],_0x5cb46a['format'](_0x3319be,TextManager['classPointsAbbr'],_0x192f17(0x293)[_0x192f17(0x2f5)](ImageManager[_0x192f17(0x3af)]),TextManager[_0x192f17(0x38c)]);break;}else this['_earnedAbilityPoints']=this[_0x192f17(0x291)](),this['_earnedSkillPoints']=this[_0x192f17(0x292)]();}case'JP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x3319be=DataManager['getSkillLearnJobPointCost'](_0x33a411);if(_0x3319be>0x0)return _0x5cb46a=TextManager[_0x192f17(0x38b)],_0x5cb46a['format'](_0x3319be,TextManager[_0x192f17(0x205)],_0x192f17(0x293)[_0x192f17(0x2f5)](ImageManager['jobPointsIcon']),TextManager[_0x192f17(0x444)]);break;}}return'';},Window_ActorCommand['prototype']['isSkillLearnMode']=function(){return![];};function Window_SkillLearnIngredients(){const _0x362c5b=_0x397bec;this[_0x362c5b(0x3da)](...arguments);}Window_SkillLearnIngredients[_0x397bec(0x26f)]=Object[_0x397bec(0x2c5)](Window_Base['prototype']),Window_SkillLearnIngredients[_0x397bec(0x26f)][_0x397bec(0x2dd)]=Window_SkillLearnIngredients,Window_SkillLearnIngredients[_0x397bec(0x26f)][_0x397bec(0x3da)]=function(_0x58c32c){const _0x14bd4e=_0x397bec;Window_Base[_0x14bd4e(0x26f)][_0x14bd4e(0x3da)]['call'](this,_0x58c32c);},Window_SkillLearnIngredients[_0x397bec(0x26f)][_0x397bec(0x402)]=function(){const _0x59b1f3=_0x397bec;this['contents'][_0x59b1f3(0x452)](),this['resetFontSettings'](),this[_0x59b1f3(0x230)]()?this[_0x59b1f3(0x3ad)]():_0x59b1f3(0x3fd)===_0x59b1f3(0x3fd)?this[_0x59b1f3(0x335)]():_0x1920c2=_0x236daa(_0x10df7e);},Window_SkillLearnIngredients[_0x397bec(0x26f)][_0x397bec(0x429)]=function(_0x43fd2b,_0x274a67,_0x2ceb78,_0x25d01c){const _0x5aaa09=_0x397bec,_0x453ce0=this['textSizeEx'](_0x43fd2b)['width'],_0x5772d7=_0x274a67+Math['round']((_0x25d01c-_0x453ce0)/0x2);this[_0x5aaa09(0x3c4)](_0x43fd2b,_0x5772d7,_0x2ceb78);},Window_SkillLearnIngredients[_0x397bec(0x26f)]['drawTextExRightAlign']=function(_0x2fb290,_0xd535f6,_0x253ab6,_0x3e00ed){const _0x261142=_0x397bec,_0x4e78fb=this[_0x261142(0x350)](_0x2fb290)['width'],_0x3a9482=_0xd535f6+Math['round'](_0x3e00ed-_0x4e78fb);this['drawTextEx'](_0x2fb290,_0x3a9482,_0x253ab6);},Window_SkillLearnIngredients[_0x397bec(0x26f)]['shouldDrawRequirements']=function(){const _0x3d2444=_0x397bec,_0x544cb0=SceneManager[_0x3d2444(0x28b)][_0x3d2444(0x2f8)](),_0x5e72c6=SceneManager[_0x3d2444(0x28b)][_0x3d2444(0x416)]();return _0x5e72c6&&!_0x5e72c6[_0x3d2444(0x273)](_0x544cb0);},Window_SkillLearnIngredients[_0x397bec(0x26f)][_0x397bec(0x3ad)]=function(){const _0x44f3bf=_0x397bec,_0x4eaa16=SceneManager[_0x44f3bf(0x28b)][_0x44f3bf(0x2f8)](),_0x3422e0=VisuMZ[_0x44f3bf(0x2d5)]['RegExp'],_0x349400=_0x4eaa16[_0x44f3bf(0x3a0)],_0x7b26e=SceneManager[_0x44f3bf(0x28b)][_0x44f3bf(0x416)](),_0x3fdf79=this[_0x44f3bf(0x2d0)](),_0x2d1cda=TextManager[_0x44f3bf(0x3a8)],_0x20b758=TextManager[_0x44f3bf(0x2a1)];let _0x273aab=0x0,_0x38dae2=0x0;const _0x2b04ab=_0x44f3bf(0x293)[_0x44f3bf(0x2f5)](_0x4eaa16[_0x44f3bf(0x1ce)]),_0x17988d=TextManager['skillLearnReqTitle'][_0x44f3bf(0x2f5)](_0x2b04ab,_0x4eaa16[_0x44f3bf(0x3ef)]);this[_0x44f3bf(0x429)](_0x17988d,_0x273aab,_0x38dae2,this[_0x44f3bf(0x25a)]),_0x38dae2+=Math['round'](_0x3fdf79*1.5);let _0x73cda6='';if(_0x349400['match'](_0x3422e0[_0x44f3bf(0x290)])){const _0x1564c3=Number(RegExp['$1']),_0x37c3e5=TextManager['skillLearnReqListLevel']['format'](_0x1564c3,TextManager['level'],TextManager[_0x44f3bf(0x285)]),_0x34c19b=_0x7b26e[_0x44f3bf(0x208)]>=_0x1564c3?_0x2d1cda:_0x20b758;_0x73cda6+=_0x34c19b['format'](_0x37c3e5)+'\x0a';}if(_0x349400[_0x44f3bf(0x3f5)](_0x3422e0['LearnReqSkillsAll'])){if(_0x44f3bf(0x29f)===_0x44f3bf(0x29f)){const _0x3c9f49=String(RegExp['$1'])[_0x44f3bf(0x20a)](',')[_0x44f3bf(0x281)](_0x1218ea=>_0x1218ea[_0x44f3bf(0x3ea)]());;for(const _0x4d429f of _0x3c9f49){let _0x4c7a7d=0x0;const _0x4336dc=/^\d+$/['test'](_0x4d429f);_0x4336dc?_0x4c7a7d=Number(_0x4d429f):_0x4c7a7d=DataManager[_0x44f3bf(0x1f1)](_0x4d429f);const _0x11f2ec=$dataSkills[_0x4c7a7d];if(_0x11f2ec){if(_0x44f3bf(0x1e4)===_0x44f3bf(0x1e4)){const _0xb998ee=TextManager[_0x44f3bf(0x227)][_0x44f3bf(0x2f5)](_0x44f3bf(0x293)[_0x44f3bf(0x2f5)](_0x11f2ec[_0x44f3bf(0x1ce)]),_0x11f2ec[_0x44f3bf(0x3ef)]),_0x3df1df=_0x7b26e[_0x44f3bf(0x24d)](_0x4c7a7d)?_0x2d1cda:_0x20b758;_0x73cda6+=_0x3df1df['format'](_0xb998ee)+'\x0a';}else _0xaf0aa[_0x44f3bf(0x342)](_0x4387aa,_0x54e0b1);}}}else{if(_0x1fa8e1[_0x44f3bf(0x301)]())_0x23e0bb[_0x44f3bf(0x1b9)](_0x3dff29);return 0x0;}}if(_0x349400[_0x44f3bf(0x3f5)](_0x3422e0['LearnReqSkillsAny'])){const _0x431e5c=String(RegExp['$1'])[_0x44f3bf(0x20a)](',')['map'](_0x131aa9=>_0x131aa9[_0x44f3bf(0x3ea)]());;for(const _0x11397e of _0x431e5c){if(_0x44f3bf(0x2a4)!==_0x44f3bf(0x248)){let _0x1a2cab=0x0;const _0x11223b=/^\d+$/['test'](_0x11397e);_0x11223b?_0x1a2cab=Number(_0x11397e):_0x1a2cab=DataManager[_0x44f3bf(0x1f1)](_0x11397e);const _0x45fc83=$dataSkills[_0x1a2cab];if(_0x45fc83){const _0x486765=TextManager[_0x44f3bf(0x227)][_0x44f3bf(0x2f5)](_0x44f3bf(0x293)[_0x44f3bf(0x2f5)](_0x45fc83[_0x44f3bf(0x1ce)]),_0x45fc83[_0x44f3bf(0x3ef)]),_0xeb26a8=_0x7b26e['isLearnedSkill'](_0x1a2cab)?_0x2d1cda:_0x20b758;_0x73cda6+=_0xeb26a8['format'](_0x486765)+'\x0a';}}else this[_0x44f3bf(0x2cf)](),this[_0x44f3bf(0x40e)]();}}if(_0x349400['match'](_0x3422e0[_0x44f3bf(0x32e)])){const _0x55acc6=String(RegExp['$1'])['split'](',')[_0x44f3bf(0x281)](_0x200626=>Number(_0x200626));for(const _0x1f155e of _0x55acc6){if(_0x44f3bf(0x25e)==='uwmhe')return _0x485d84(_0x3d1119['$1']);else{const _0x4f5054=$dataSystem['switches'][_0x1f155e],_0x5a3439=$gameSwitches[_0x44f3bf(0x326)](_0x1f155e)?_0x2d1cda:_0x20b758;_0x73cda6+=_0x5a3439[_0x44f3bf(0x2f5)](_0x4f5054)+'\x0a';}}}if(_0x349400[_0x44f3bf(0x3f5)](_0x3422e0[_0x44f3bf(0x269)])){const _0x201e78=String(RegExp['$1'])[_0x44f3bf(0x20a)](',')[_0x44f3bf(0x281)](_0x39ff8b=>Number(_0x39ff8b));for(const _0x1dd0d6 of _0x201e78){const _0x3d4e9a=$dataSystem[_0x44f3bf(0x3a5)][_0x1dd0d6],_0x18ac15=$gameSwitches[_0x44f3bf(0x326)](_0x1dd0d6)?_0x2d1cda:_0x20b758;_0x73cda6+=_0x18ac15[_0x44f3bf(0x2f5)](_0x3d4e9a)+'\x0a';}}const _0x503c63=VisuMZ[_0x44f3bf(0x2d5)]['createKeyJS'](_0x4eaa16,_0x44f3bf(0x3db));if(VisuMZ[_0x44f3bf(0x2d5)]['JS'][_0x503c63]){if(_0x44f3bf(0x35a)!==_0x44f3bf(0x35a))this['resetFontSettings'](),this[_0x44f3bf(0x36f)]()?this['refreshSkillLearnSystem']():_0x38030d['SkillLearnSystem']['Window_SkillStatus_refresh'][_0x44f3bf(0x42b)](this);else{const _0x3196ea=VisuMZ[_0x44f3bf(0x2d5)]['JS'][_0x503c63][_0x44f3bf(0x42b)](this,_0x7b26e,_0x4eaa16);_0x73cda6+=_0x3196ea+'\x0a';}}this[_0x44f3bf(0x429)](_0x73cda6,_0x273aab,_0x38dae2,this[_0x44f3bf(0x25a)]);},Window_SkillLearnIngredients[_0x397bec(0x26f)][_0x397bec(0x335)]=function(){const _0x22816e=_0x397bec,_0x4c4ae1=SceneManager[_0x22816e(0x28b)][_0x22816e(0x2f8)](),_0x33e163=SceneManager['_scene'][_0x22816e(0x416)](),_0x37b272=this[_0x22816e(0x456)]();let _0x21576a=0x0,_0x14a298=0x0;const _0x4fdab6=this[_0x22816e(0x2d0)](),_0x1fc01d=Math[_0x22816e(0x1d9)](this[_0x22816e(0x25a)]/0x2),_0x40defc=Math[_0x22816e(0x1d9)](this[_0x22816e(0x25a)]/0x4),_0x910414=0x0,_0x5f076c=_0x1fc01d,_0x415f5f=_0x1fc01d+_0x40defc,_0x2fb706='\x5cI[%1]'[_0x22816e(0x2f5)](_0x4c4ae1['iconIndex']),_0xbbbcd3=TextManager[_0x22816e(0x1ef)][_0x22816e(0x2f5)](_0x2fb706,_0x4c4ae1[_0x22816e(0x3ef)]);this['drawTextExCenterAlign'](_0xbbbcd3,_0x21576a,_0x14a298,this[_0x22816e(0x25a)]),_0x14a298+=_0x4fdab6,this[_0x22816e(0x429)](TextManager[_0x22816e(0x2c0)],_0x910414,_0x14a298,_0x1fc01d),this[_0x22816e(0x429)](TextManager[_0x22816e(0x23f)],_0x5f076c,_0x14a298,_0x40defc),this[_0x22816e(0x429)](TextManager[_0x22816e(0x1bb)],_0x415f5f,_0x14a298,_0x40defc),_0x14a298+=_0x4fdab6;const _0x1e6bef=_0x910414+this[_0x22816e(0x1e8)]();for(const _0x558671 of _0x37b272){this[_0x22816e(0x45a)]();let _0xed328c='',_0x45bcaa=0x0,_0x45b600=0x0,_0x57434d='';switch(_0x558671[_0x22816e(0x353)]()['trim']()){case'AP':_0x45bcaa=DataManager[_0x22816e(0x44d)](_0x4c4ae1);if(_0x45bcaa<=0x0)continue;this['drawAbilityPoints'](_0x45bcaa,_0x5f076c,_0x14a298,_0x40defc,_0x22816e(0x2ab)),_0xed328c='\x5cI[%1]%2'[_0x22816e(0x2f5)](ImageManager[_0x22816e(0x441)],TextManager[_0x22816e(0x39b)]),this['drawTextEx'](_0xed328c,_0x1e6bef,_0x14a298),_0x45b600=_0x33e163['getAbilityPoints'](),this['drawAbilityPoints'](_0x45b600,_0x415f5f,_0x14a298,_0x40defc-this[_0x22816e(0x1e8)](),_0x22816e(0x2ab));break;case'SP':_0x45bcaa=DataManager[_0x22816e(0x26d)](_0x4c4ae1);if(_0x45bcaa<=0x0)continue;this[_0x22816e(0x3f9)](_0x45bcaa,_0x5f076c,_0x14a298,_0x40defc,_0x22816e(0x2ab)),_0xed328c=_0x22816e(0x339)[_0x22816e(0x2f5)](ImageManager[_0x22816e(0x2ce)],TextManager[_0x22816e(0x28f)]),this[_0x22816e(0x3c4)](_0xed328c,_0x1e6bef,_0x14a298),_0x45b600=_0x33e163['getSkillPoints'](),this[_0x22816e(0x3f9)](_0x45b600,_0x415f5f,_0x14a298,_0x40defc-this[_0x22816e(0x1e8)](),_0x22816e(0x2ab));break;case _0x22816e(0x1d6):_0x45bcaa=DataManager['getSkillLearnGoldCost'](_0x4c4ae1);if(_0x45bcaa<=0x0)continue;this[_0x22816e(0x385)](_0x45bcaa,TextManager[_0x22816e(0x395)],_0x5f076c,_0x14a298,_0x40defc);const _0x43e660=Imported[_0x22816e(0x2f3)]?_0x22816e(0x293)[_0x22816e(0x2f5)](VisuMZ['CoreEngine'][_0x22816e(0x2a2)][_0x22816e(0x257)][_0x22816e(0x3d6)]):TextManager[_0x22816e(0x395)];_0xed328c=_0x22816e(0x28a)[_0x22816e(0x2f5)](_0x43e660,TextManager[_0x22816e(0x395)]),this[_0x22816e(0x3c4)](_0xed328c,_0x1e6bef,_0x14a298),_0x45b600=$gameParty[_0x22816e(0x1ee)](),this[_0x22816e(0x385)](_0x45b600,TextManager[_0x22816e(0x395)],_0x415f5f,_0x14a298,_0x40defc-this[_0x22816e(0x1e8)]());break;case'ITEM':const _0x32c5e1=DataManager[_0x22816e(0x1bf)](_0x4c4ae1);if(_0x32c5e1[_0x22816e(0x430)]<=0x0)continue;for(const _0x3f561e of _0x32c5e1){if(!_0x3f561e)continue;const _0x316a12=$dataItems[_0x3f561e['id']];_0x57434d=TextManager['skillLearnItemFmt'],this[_0x22816e(0x2fd)](_0x316a12,_0x1e6bef,_0x14a298,_0x1fc01d-_0x1e6bef),_0xed328c=_0x57434d[_0x22816e(0x2f5)](_0x3f561e[_0x22816e(0x2b3)],_0x22816e(0x293)[_0x22816e(0x2f5)](_0x316a12[_0x22816e(0x1ce)]),_0x316a12[_0x22816e(0x3ef)]),this[_0x22816e(0x411)](_0xed328c,_0x5f076c,_0x14a298,_0x40defc),_0xed328c=_0x57434d['format']($gameParty['numItems'](_0x316a12),_0x22816e(0x293)[_0x22816e(0x2f5)](_0x316a12[_0x22816e(0x1ce)]),_0x316a12[_0x22816e(0x3ef)]),this[_0x22816e(0x411)](_0xed328c,_0x415f5f,_0x14a298,_0x40defc-this[_0x22816e(0x1e8)]()),_0x14a298+=_0x4fdab6;if(_0x14a298+_0x4fdab6>this['innerHeight'])return;}continue;case'WEAPON':const _0xe26080=DataManager[_0x22816e(0x1c8)](_0x4c4ae1);if(_0xe26080['length']<=0x0)continue;for(const _0x37b91a of _0xe26080){if(!_0x37b91a)continue;const _0x35631c=$dataWeapons[_0x37b91a['id']];_0x57434d=TextManager['skillLearnWeaponFmt'],this[_0x22816e(0x2fd)](_0x35631c,_0x1e6bef,_0x14a298,_0x1fc01d-_0x1e6bef),_0xed328c=_0x57434d['format'](_0x37b91a[_0x22816e(0x2b3)],_0x22816e(0x293)[_0x22816e(0x2f5)](_0x35631c[_0x22816e(0x1ce)]),_0x35631c[_0x22816e(0x3ef)]),this[_0x22816e(0x411)](_0xed328c,_0x5f076c,_0x14a298,_0x40defc),_0xed328c=_0x57434d['format']($gameParty['numItems'](_0x35631c),_0x22816e(0x293)[_0x22816e(0x2f5)](_0x35631c['iconIndex']),_0x35631c[_0x22816e(0x3ef)]),this[_0x22816e(0x411)](_0xed328c,_0x415f5f,_0x14a298,_0x40defc-this['itemPadding']()),_0x14a298+=_0x4fdab6;if(_0x14a298+_0x4fdab6>this['innerHeight'])return;}continue;case'ARMOR':const _0x1feb74=DataManager[_0x22816e(0x445)](_0x4c4ae1);if(_0x1feb74[_0x22816e(0x430)]<=0x0)continue;for(const _0x36d0ad of _0x1feb74){if(!_0x36d0ad)continue;const _0x494dc8=$dataArmors[_0x36d0ad['id']];_0x57434d=TextManager['skillLearnArmorFmt'],this['drawItemName'](_0x494dc8,_0x1e6bef,_0x14a298,_0x1fc01d-_0x1e6bef),_0xed328c=_0x57434d['format'](_0x36d0ad[_0x22816e(0x2b3)],_0x22816e(0x293)['format'](_0x494dc8['iconIndex']),_0x494dc8[_0x22816e(0x3ef)]),this['drawTextExRightAlign'](_0xed328c,_0x5f076c,_0x14a298,_0x40defc),_0xed328c=_0x57434d[_0x22816e(0x2f5)]($gameParty['numItems'](_0x494dc8),'\x5cI[%1]'['format'](_0x494dc8[_0x22816e(0x1ce)]),_0x494dc8[_0x22816e(0x3ef)]),this[_0x22816e(0x411)](_0xed328c,_0x415f5f,_0x14a298,_0x40defc-this['itemPadding']()),_0x14a298+=_0x4fdab6;if(_0x14a298+_0x4fdab6>this[_0x22816e(0x22b)])return;}continue;case'CUSTOM':const _0x15222d=VisuMZ[_0x22816e(0x2d5)][_0x22816e(0x3ac)](_0x4c4ae1,'jsLearnShowDetailTxt');if(VisuMZ[_0x22816e(0x2d5)]['JS'][_0x15222d]){if(_0x22816e(0x31c)!==_0x22816e(0x31c))return _0x21bc30(_0x142988['$1']);else _0xed328c=VisuMZ[_0x22816e(0x2d5)]['JS'][_0x15222d][_0x22816e(0x42b)](this,_0x33e163,_0x4c4ae1),this[_0x22816e(0x3c4)](_0xed328c,_0x1e6bef,_0x14a298);}else continue;break;case'CP':if(Imported['VisuMZ_2_ClassChangeSystem']){if(_0x22816e(0x2a7)===_0x22816e(0x2a7)){_0x45bcaa=DataManager[_0x22816e(0x1d7)](_0x4c4ae1)||0x0;if(_0x45bcaa<=0x0)continue;this[_0x22816e(0x32f)](_0x45bcaa,_0x5f076c,_0x14a298,_0x40defc,_0x22816e(0x2ab)),_0xed328c=_0x22816e(0x339)['format'](ImageManager[_0x22816e(0x3af)],TextManager[_0x22816e(0x38c)]),this[_0x22816e(0x3c4)](_0xed328c,_0x1e6bef,_0x14a298),_0x45b600=_0x33e163[_0x22816e(0x39c)](),this[_0x22816e(0x32f)](_0x45b600,_0x415f5f,_0x14a298,_0x40defc-this[_0x22816e(0x1e8)](),_0x22816e(0x2ab));}else{if(!_0x1386fc[_0x22816e(0x2cc)]())return;if(!this[_0x22816e(0x32d)]()[_0x22816e(0x313)]())return;const _0x2d5fff=_0x2ef5d0[_0x22816e(0x2d5)][_0x22816e(0x2a2)][_0x22816e(0x295)];let _0x25f929=0x0;try{_0x25f929=_0x1e5df6(_0x2d5fff[_0x22816e(0x1fa)]);}catch(_0xb69129){if(_0x2b50e8[_0x22816e(0x301)]())_0x35e125[_0x22816e(0x1b9)](_0xb69129);}this[_0x22816e(0x32d)]()[_0x22816e(0x33e)](_0x25f929);}}break;case'JP':if(Imported[_0x22816e(0x390)]){_0x45bcaa=DataManager[_0x22816e(0x284)](_0x4c4ae1)||0x0;if(_0x45bcaa<=0x0)continue;this[_0x22816e(0x433)](_0x45bcaa,_0x5f076c,_0x14a298,_0x40defc,_0x22816e(0x2ab)),_0xed328c='\x5cI[%1]%2'[_0x22816e(0x2f5)](ImageManager[_0x22816e(0x1f4)],TextManager[_0x22816e(0x444)]),this[_0x22816e(0x3c4)](_0xed328c,_0x1e6bef,_0x14a298),_0x45b600=_0x33e163[_0x22816e(0x3ee)](),this['drawJobPoints'](_0x45b600,_0x415f5f,_0x14a298,_0x40defc-this[_0x22816e(0x1e8)](),_0x22816e(0x2ab));}break;default:continue;}_0x14a298+=_0x4fdab6;if(_0x14a298+_0x4fdab6>this['innerHeight'])return;}},Window_SkillLearnIngredients[_0x397bec(0x26f)]['getSkillLearnDisplayedCosts']=function(){const _0x5c4ef6=_0x397bec,_0x5e578d=JsonEx['makeDeepCopy'](VisuMZ[_0x5c4ef6(0x2d5)][_0x5c4ef6(0x2a2)][_0x5c4ef6(0x2c7)][_0x5c4ef6(0x214)]);return _0x5e578d[_0x5c4ef6(0x266)]('Custom'),_0x5e578d;},Window_SkillLearnIngredients[_0x397bec(0x26f)][_0x397bec(0x397)]=function(){return![];};function _0x1b36(){const _0x147077=['refreshSkillLearnSystem','WEAPON','IconSet','cxhqQ','setBackgroundType','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','ReqLevelFmt','efsCV','isMVAnimation','ARRAYFUNC','iconHeight','Qelgz','initSkillPoints','skillPointsTotal','IngredientName','createConditionJS','LearnSkillB','ReqSkillFmt','RequireFmt','Classes','VisuMZ_1_SkillsStatesCore','mzJwI','CUSTOM','Hzubt','isSkillLearnMode','StatusWindowDrawJS','traitObjects','kaXhf','XsptJ','includes','registerCommand','TSxqC','TliVP','Custom','skillPointsFmt','test','jsLearnJpCost','blEhQ','zLXoc','aasvd','Window_SkillList_drawItem','LearnCostBatch','jsLearnReqListTxt','NBAqs','Show','skillLearnReqTitle','drawCurrencyValue','width','_skillLearnIconSpriteOpacitySpeed','duNFP','GkIhJ','Icmnt','jobPointsFmt','classPointsFull','DsHyn','Game_Battler_onBattleStart','initSkillLearnSystemMenuAccess','VisuMZ_2_ClassChangeSystem','EjtNd','fDnOd','ReqSwitchFmt','umOIS','currencyUnit','playSkillLearn','showVisualGoldDisplay','tlegC','applySkillLearnSystemUserEffect','abilityPointsFmt','abilityPointsFull','getClassPoints','oJYYy','isBattleMember','skillLearnReqListLevel','note','BUaMP','ParseAllNotetags','Animation','makeRewards','switches','members','piXft','skillLearnReqMet','LearnApCost','ceil','10AndLxU','createKeyJS','drawRequirements','rljOw','classPointsIcon','DetailWindow_BgType','_classIDs','skillLearnIngredientsWindowRect','19955HPiMvs','zhOUY','kNsfJ','skillPointsVisible','loseGold','earnedAbilityPoints','jsLearnApCost','min','finishSkillLearnAnimation','TcgZv','RrfEl','AliveActors','Weapon-%1-%2','updateSkillLearnAnimation','LearnArmorCost','xobfB','_skillIDs','drawTextEx','EYXZO','_skillLearnIconSprite','ConfirmWindow_BgType','displayRewards','vfyLt','applySkillPoints','4368zivRjI','khbBJ','isTriggered','scale','EVAL','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','TargetGainSkillPoints','LearningTitle','numItems','setupBattleTestMembers','jsLearnShowDetailTxt','GoldIcon','jFNml','_weaponIDs','MaxResource','initialize','jsLearnReqDetailTxt','rdSWG','exit','ybyaC','BattleManager_displayRewards','bdHyD','RegExp','levelUpGainAbilityPoints','ajqqI','692NPQvxH','_skillLearnBitmapSprite','createSkillLearnSkillSprite','SfCCs','Parse_Notetags_CreateJS','skillLearnSeparationFmt','trim','LearnGoldCost','IngredientOwned','SkillPointsRate','getJobPoints','name','LearnShowLevel','Window_SkillList_drawSkillCost','learnSkill','MDxZg','jsLearnShowListTxt','match','isSkill','Window_SkillList_makeItemList','qLrRN','drawSkillPoints','Game_Actor_levelUp','Points','loseSkillPoints','ZMrQL','startSkillLearnAnimation','rwztL','getSkillLearnGoldCost','Item-%1-%2','refresh','_earnedSkillPoints','QpRCx','updateSkillLearnAnimationSprite','drawActorJobPoints','filter','Learned','isSkillLearnEnabled','blWYU','yQwUj','dcCod','commandName','createSkillLearnConfirmWindow','Scene_Boot_onDatabaseLoaded','setStypeId','drawTextExRightAlign','learnPicture','select','COtaF','StartClassAbilityPoints','user','zAjhW','FlVwZ','skillLearnReqLevelFmt','tMzXT','skillLearnSystemCommandName','_abilityPoints','eufvj','abilityPointsTotal','gainSkillPointsForMulticlasses','ConvertParams','isConfirmEnabled','CoreEngine','rvekC','setSkillLearnSkillSpriteBitmap','ARRAYSTRUCT','kbqcY','nlxuY','currentClass','drawTextExCenterAlign','reduce','call','itemLineRect','gainStartingAbilityPoints','wBNnw','SkillPointsAdd','length','Keanj','skillLearnConfirmCmd','drawJobPoints','optExtraExp','dRQYg','onSkillLearnConfirmCancel','_skillLearnAnimationSprite','NUM','cancel','drawActorFace','skillLearnGoldFmt','PIpDg','LearnShowSkillsAny','CeBNF','itemWindowRect','processPayForSkillLearnSystem','abilityPointsIcon','ITEM','makeCommandList','jobPointsFull','getSkillLearnArmorCost','gQNAQ','EjMvO','Armor-%1-%2','_itemIDs','iCkPN','KTSDd','Gbqsu','getSkillLearnAbilityPointCost','skillLearn','setAbilityPoints','abilityPointsAbbr','347215uLASAZ','clear','skillTypes','enemy','XblRj','getSkillLearnDisplayedCosts','190485ozIgDe','EnemyAbilityPoints','getClassIdWithName','resetFontSettings','bigPicture','ARRAYNUM','_armorIDs','LearnShowSwitchesAny','_skillLearnSystem_drawItemMode','CvWFJ','isSkillLearnSystemMenuAccess','Animations','LQGWs','ShowAnimations','TargetGainAbilityPoints','createSkillLearnCostText','log','drawSkillLearnRequirements','skillLearningOwned','fFMZU','displayRewardsSkillPoints','drawAbilityPoints','getSkillLearnItemCost','onSkillLearnItemOk','kuXlS','SHLNE','createSkillLearnAnimationIDs','fcbJN','_skillPoints','fqbge','parse','getSkillLearnWeaponCost','PKyBV','qptDc','XYRmH','Class-%1-%2','OkDqn','iconIndex','text','visible','isFinishedSkillLearnAnimating','skillPointsRate','show','updateSkillLearnSpriteOpacity','levelUp','GOLD','getSkillLearnClassPointCost','skillLearnReqHeaderFmt','round','CancelCmd','LearnSpCost','loseItem','destroySkillLearnAnimationSprite','commandStyle','gainAbilityPointsForMulticlasses','LearnReqSkillsAll','fFeEr','setSkillPoints','expnP','HAKze','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','getArmorIdWithName','FYleh','itemPadding','lYNEr','description','Icon','_skillLearnIngredientsWindow','GoldFmt','gold','skillLearningTitle','SkillPointsLose','getSkillIdWithName','Weapon','LEVEL','jobPointsIcon','LearnShowSkillsAll','drawActorSkillPoints','CmXDF','skillLearnReqSwitchFmt','skillLearnIcon','PerAction','Skill','makeSkillLearnList','displayRewardsAbilityPoints','isPlaying','bind','ytjtp','3IwODhJ','center','kwRPq','Window_SkillList_maxCols','jobPointsAbbr','myZhr','addCommand','level','18210gjOybJ','split','AbilityPointsLose','addSkillPoints','wrXIe','SeparationFmt','ClassChangeSystem','smooth','DdybF','ItemFmt','levelUpGainSkillPoints','DisplayedCosts','changePaintOpacity','4715GOBqOH','Window_SkillType_makeCommandList','jsLearnReq','height','NWCZO','_skillLearnConfirmWindow','maxCols','YZiWU','497VVPNst','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','sTzbt','TzJAw','MkTVb','isReleased','createSkillLearnAnimation','_learnPicture','deadMembers','skillLearnReqListSkill','VictoryText','setupBattleTestMembersSkillLearnSystem','jsLearnCpCost','innerHeight','classPointsFmt','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Condition\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','indexOf','EnemySkillPoints','shouldDrawRequirements','CDHUT','AbilityPointsAdd','LearnItemCost','gainMulticlassRewardPoints','skillPointsAbbr','shift','status','Scene_Skill_create','ARRAYJSON','UcVxT','makeItemList','loadSystem','WeaponFmt','currentSymbol','skillLearningCost','_statusWindow','EMihm','makeRewardsSkillPoints','IrKOU','jVuKd','parameters','STR','BLEax','YlYaV','KrxwI','version','adPkI','remove','isLearnedSkill','frames','182193BRIjgu','Enemy-%1-%2','destroySkillLearnSprite','abilityPointsRate','colSpacing','createVisibleJS','gainRewardsSkillPoints','DefaultCost','Gold','OVosq','calcWindowHeight','innerWidth','NMEHD','isEnabled','Scene_Skill_onItemOk','lWaUa','Game_Party_setupBattleTestMembers','add','Window','process_VisuMZ_SkillLearnSystem_Notetags','DetailWindow_RectJS','MenuAccess','hgkYJ','push','vccjf','Actors','LearnReqSwitchesAny','HflYR','JobPoints','Game_System_initialize','getSkillLearnSkillPointCost','activate','prototype','FUNC','left','lRaqU','meetRequirementsForSkillLearnSystem','ShowVictory','UserGainSkillPoints','allMembers','CxOMH','createActionJS','applyItemUserEffect','loseJobPoints','FullText','getItemIdWithName','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','PtJLA','max','setSkillLearnSkillSpritePosition','map','ShowMenu','EOTGq','getSkillLearnJobPointCost','levelA','88RjTVeY','wBiQv','TextFmt','Name','%1%2','_scene','Window_SkillList_includes','LearnCpCost','mrcgR','skillPointsFull','LearnReqLevel','getAbilityPoints','getSkillPoints','\x5cI[%1]','makeRewardsAbilityPoints','SkillPoints','LearnShowSwitchesAll','skill','AbilityPoints','UserGainAbilityPoints','createTextJS','Sound','skillLearnCancelCmd','mtatZ','LearnWeaponCost','APYhM','skillLearnCmd','skillLearnReqNotMet','Settings','onLoadBattleTestSkillLearnSystem','ARsCt','SMtSg','oEhMr','BhJOB','_itemWindow','YjpMl','_SkillLearnSystem_preventLevelUpGain','right','xIbSh','WqzNS','lNgtV','return\x200','rtAvf','canPayForSkillLearnSystem','jsLearnSpCost','quantity','ConfirmWindow_RectJS','KasUC','Window_SkillStatus_refresh','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','skillPoints','setSkillLearnSkillSpriteOpacity','SWITCHES','YfOeH','ConfirmCmd','anchor','Game_Actor_learnSkill','VUOOL','skillLearningName','createSkillLearnSystemWindows','Item','alkYM','_actor','create','CouED','General','PerEnemy','shouldDrawSkillLearnRequirements','Game_Action_applyItemUserEffect','addChild','inBattle','IngredientCost','skillPointsIcon','createSkillLearnIngredientsWindow','lineHeight','Scale','yVNPM','ReqMetFmt','FadeSpeed','SkillLearnSystem','ShowWindows','opacitySpeed','opacity','Game_Actor_setup','xocrY','setHandler','playOkSound','constructor','gainAbilityPoints','JSON','459346lXcqoV','skillLearnReqListSwitch','ARRAYEVAL','_windowLayer','isCommandEnabled','_rewards','PerLevelUp','ReqNotMetFmt','sKKkS','jsOnLearn','vTRpx','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_stypeId','skillLearnWeaponFmt','qMyqB','setup','applyItemSkillLearnSystemUserEffect','skillLearnReqSeparatorFmt','_skillLearnAnimationIDs','VisuMZ_0_CoreEngine','_skillLearnAnimationWait','format','SkillPointsSet','createCostJS','item','ktiJw','processFinishSkillLearnAnimation','addAbilityPoints','clamp','drawItemName','actor','_earnedAbilityPoints','initAbilityPoints','isPlaytest','BWUlb','abilityPoints','destroy','resetTextColor','jsLearnShow','skillLearnItemFmt','fBeoW','process_VisuMZ_SkillLearnSystem_JS','itemHeight','LearnSkillA','StartingSkillPoints','MAX_SAFE_INTEGER','KJUte','skillLearnConfirmWindow','getSkillLearnRequirementText','zEuTW','drawActorClassPoints','isActor','floor','ekthR','loseClassPoints','makeDeepCopy','getSkillLearnSkillsFromClass','skillLearnReqSkillFmt','bWmzm','Game_Actor_changeClass','wBPuB','SystemShowSkillLearnSystemMenu','bfayS','gainRewardsAbilityPoints','LearnReqSkillsAny','ARMOR','onBattleStart','replace','update','drawActorAbilityPoints','value','iconWidth','skillLearnAlreadyLearned','suovl','Actor-%1-%2','ClassPoints','drawSkillLearnCost','subject','LearnReqSwitchesAll','drawClassPoints','hide','applyAbilityPoints','newPage','concat','_skillLearnAnimationPlaying','drawIngredients','addWindow','onSkillLearnConfirmOk','SharedResource','\x5cI[%1]%2','addSkillLearnSystemCommand','vOYRM','ARRAYSTR','removeChild','gainSkillPoints','changeClass','gainStartingSkillPoints','LearnJpCost','loseAbilityPoints','ParseSkillNotetags','getWeaponIdWithName','StartClassSkillPoints','drawSkillCost','isAlive','AbbrText','ArmorFmt','WfSdU','drawItem','abilityPointsVisible','earnedSkillPoints','onItemOk','_SkillLearnSystem_MenuAccess','textSizeEx','getSkillLearnCostText','setSkillLearnSkillSpriteFrame','toUpperCase','playStaticSe','TMTRW','bitmap'];_0x1b36=function(){return _0x147077;};return _0x1b36();}function Window_SkillLearnConfirm(){const _0x2cff9d=_0x397bec;this[_0x2cff9d(0x3da)](...arguments);}function _0x651b(_0xbf1d5a,_0x49f8be){const _0x1b3657=_0x1b36();return _0x651b=function(_0x651b4a,_0x25a264){_0x651b4a=_0x651b4a-0x1b4;let _0x3f3b6b=_0x1b3657[_0x651b4a];return _0x3f3b6b;},_0x651b(_0xbf1d5a,_0x49f8be);}Window_SkillLearnConfirm['prototype']=Object[_0x397bec(0x2c5)](Window_HorzCommand['prototype']),Window_SkillLearnConfirm['prototype'][_0x397bec(0x2dd)]=Window_SkillLearnConfirm,Window_SkillLearnConfirm[_0x397bec(0x26f)][_0x397bec(0x3da)]=function(_0x585b87){const _0x3f5377=_0x397bec;Window_HorzCommand[_0x3f5377(0x26f)]['initialize'][_0x3f5377(0x42b)](this,_0x585b87);},Window_SkillLearnConfirm['prototype'][_0x397bec(0x21c)]=function(){return 0x2;},Window_SkillLearnConfirm[_0x397bec(0x26f)][_0x397bec(0x30a)]=function(){const _0x55e441=_0x397bec;return this[_0x55e441(0x22b)];},Window_SkillLearnConfirm[_0x397bec(0x26f)][_0x397bec(0x443)]=function(){const _0x4de06a=_0x397bec;this[_0x4de06a(0x207)](TextManager[_0x4de06a(0x432)],'ok',this[_0x4de06a(0x421)]()),this['addCommand'](TextManager[_0x4de06a(0x29c)],_0x4de06a(0x439));},Window_SkillLearnConfirm[_0x397bec(0x26f)][_0x397bec(0x421)]=function(){const _0x9427cb=_0x397bec,_0x494348=SceneManager[_0x9427cb(0x28b)];if(!_0x494348)return![];const _0x484d81=_0x494348['user']();if(!_0x484d81)return![];const _0x515ef1=_0x494348['item']();if(!_0x515ef1)return![];if(!_0x484d81[_0x9427cb(0x273)](_0x515ef1))return![];return _0x484d81[_0x9427cb(0x2b1)](_0x515ef1);},Window_SkillLearnConfirm['prototype'][_0x397bec(0x34b)]=function(_0x30e745){const _0x540e76=_0x397bec,_0x1120ec=this[_0x540e76(0x42c)](_0x30e745);this[_0x540e76(0x305)](),this[_0x540e76(0x215)](this[_0x540e76(0x2e4)](_0x30e745));const _0x2077f4=this[_0x540e76(0x40d)](_0x30e745),_0x4f9ddc=this[_0x540e76(0x350)](_0x2077f4)[_0x540e76(0x386)];_0x1120ec['x']+=Math[_0x540e76(0x1d9)]((_0x1120ec['width']-_0x4f9ddc)/0x2),this[_0x540e76(0x3c4)](_0x2077f4,_0x1120ec['x'],_0x1120ec['y'],_0x4f9ddc);},Window_SkillLearnConfirm['prototype'][_0x397bec(0x2dc)]=function(){const _0x5b134e=_0x397bec;if(this[_0x5b134e(0x23e)]()==='ok'){}else{if('alkYM'!==_0x5b134e(0x2c3))return this[_0x5b134e(0x34f)]===_0x10b66c&&this[_0x5b134e(0x38f)](),this[_0x5b134e(0x34f)];else Window_HorzCommand['prototype'][_0x5b134e(0x2dc)][_0x5b134e(0x42b)](this);}};