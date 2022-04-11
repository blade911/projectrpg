//=============================================================================
// Ramza Plugins - Consume Skill Learn
// Ramza_ConsumeSkillLearn.js
// v1.02
//=============================================================================

var Ramza = Ramza || {};
Ramza.CSL = Ramza.CSL || {};
Ramza.CSL.version = 1.02

//=============================================================================
 /*:
 * @plugindesc v1.02 Adds the ability to learn specified skills by killing them with a specific skill
 * @author Ramza
 *
 * @param RequireKill
 * @text Require Kill
 * @desc Does the enemy need to die to allow the user to learn a skill from it?
 * @type boolean
 * @default true
 * 
 * @param SuccessText
 * @text Success Text
 * @desc Text shown when a skill is learned. (%u for user, %t for target, %s for skill)
 * @type text
 * @default Success! <br>%u consumed %t and learned <br>%s!
 *
 * @param AlreadyKnownText
 * @text Already Known Text
 * @desc The text displayed when learning fails due to already knowing the skill.
 * @type text
 * @default Successfully consumed %t, <br>but you already knew %s...
 *
 * @param NoSkillText
 * @text No Skill Text
 * @desc Failure text when the enemy has no skill to learn
 * Default: %t had nothing to learn...
 * @type text
 * @default %t had nothing to learn...
 *
 * @param NoPassText
 * @text Random Check Failed Text
 * @desc The failure text shown when a skill is present, but was not learned due to failing the check.
 * Default: %u couldn't learn anything...
 * @type text
 * @default %u couldn't learn anything...
 *
 * @help
 * ============================================================================
 * Description:
 * ============================================================================
 *
 * This plugin allows via note tags to set skills as being 'consume' skills, 
 * if an actor uses one of these skills to kill an opponent, they will learn a 
 * skill from that opponent. The skill learned is set via note tag on the 
 * monster note box.
 *
 * This plugin is inspired by blue magic systems in several final fantasy games, 
 * particularly Final Fantasy 8 and 9.
 *
 * The tag can be set on any skill, so go ahead and make a fancy action sequence
 * to really invoke the essence of those systems from those games!
 *
 * ============================================================================
 * Required Plugins:
 * ============================================================================
 *
 * YEP_SkillCore
 * http://yanfly.moe/2015/10/13/yep-8-skill-core/
 *
 *
 * ============================================================================
 * Known compatibility issues:
 *
 * None
 *
 * ============================================================================
 * Usage:
 * ============================================================================
 * Note Tags for Skills:
 * 	<Consume Skill>
 * Sets the skill as a consume type skill, which will allow the user to learn 
 * a skill from an enemy killed by the use of this skill.
 *
 * Note Tags for Monsters:
 * 	<Consumed Skill: x y%>
 * An enemy with this note tag will teach skill Id 'x' to the actor who kills 
 * it with a skill marked with the <Consume Skill> tag.
 * If y% is used, a random number will be checked against, and if the check 
 * passes the skill will be learned. 
 * 
 * ============================================================================
 * Terms of Use:
 * ============================================================================

 * -You may use this plugin in free or commercial games
 * -You may use this plugin in as many projects as you like.
 * -You may not share this plugin, or modified versions of it, with anyone else.
 * -You may modify this original script for personal use only.
 * -You may only share edits to this plugin in the form of extensions to it, 
 *  such that anyone using them must also own this plugin for them  to function.
 * -You must also abide by the restrictions of all dependency plugins
 * ============================================================================
 * Changelog
 * ============================================================================
 * v1.02
 * -Added to the original consumed skill notetag to allow a percentage chance
 *  of successfully learning a skill from eating an enemy, rather than a 100% 
 *  guaranteed chance.
 * -Added a plugin parameter to allow skills to be learned without having to 
 *  kill the target with the consume skill.
 * v1.01
 * -Added improved plugin manager support
 * -This plugin requires the new plugin manager in RMMV versions 1.5.2 and above.
 * v1.00
 * -Initial release
 * ============================================================================
 * end of helpfile
 */
 //process plugin parameters
var Param = PluginManager.parameters('Ramza_ConsumeSkillLearn');
Ramza.CSL.Params = Ramza.CSL.Params || {};
Ramza.CSL.Params.requireKill = eval(Param['RequireKill']);
Ramza.CSL.Params.successText = String(Param['SuccessText']);
Ramza.CSL.Params.knownText = String(Param['AlreadyKnownText']);
Ramza.CSL.Params.noSkillText = String(Param['NoSkillText']);
Ramza.CSL.Params.noPassText = String(Param['NoPassText']);

//Initialize note tag processing:

Ramza.CSL.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Ramza.CSL.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Ramza._loaded_CSL) {
    this.processConsumeEnemyNotetags($dataEnemies);
	this.processConsumeSkillNotetags($dataSkills);
	Ramza._loaded_CSL = true;
  }
  return true;
};


//Process enemy note tags
DataManager.processConsumeEnemyNotetags = function(group) {
	var note = /<(?:CONSUMED SKILL):[ ](\d+)[ ]?(\d+)?[%]?>/i;
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i]
			if (line.match(note)) {
				obj._learnedSkill = (parseInt(RegExp.$1));
				obj._learnChance = (RegExp.$2) ? (parseInt(RegExp.$2))/100 : 1
			}	  
		}
	}
};

//Process skill note tags
DataManager.processConsumeSkillNotetags = function(group) {
	var note = /<(?:CONSUME SKILL)>/i
	for (var n = 1; n < group.length; n++){
		var obj = group[n]
		var notedata = obj.note.split(/[\r\n]+/);
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i]
			if (line.match(note)) {
				obj._isConsumeSkill = true
				Ramza.CSL.addSkillEval(obj)
			}	  
		}		
	}
}
Ramza.CSL.addSkillEval = function(skill) {
	var tempEval = skill.customAfterEval || ""
	var addEval = "if (target.consumedSkill() && !user.isLearnedSkill(target.consumedSkill()) && (target.hp == 0 || !Ramza.CSL.Params.requireKill)) {" + "\n"
	+	"if (Math.random() < target.consumedSkillRate()) {" + "\n"
	+	"console.log('success', this)" + "\n"
	+ 	"Ramza.CSL.showSuccessMsg($dataSkills[target.consumedSkill()], target, user)" + "\n"
	+	"user.learnSkill(target.consumedSkill())" + "\n"
	+	"} else {" + "\n"
	+	"console.log('failure')" + "\n"
	+	"Ramza.CSL.showFailureMsg($dataSkills[target.consumedSkill()], target, user, true)" + "\n"
	+	"}" + "\n"
	+"} else {" + "\n"
	+	"console.log('failure')" + "\n"
	+	"Ramza.CSL.showFailureMsg($dataSkills[target.consumedSkill()], target, user)" + "\n"
	+ "}" + "\n"
	skill.customAfterEval = addEval + tempEval
}

Game_Enemy.prototype.consumedSkill = function(){
	//returns the skill Id of a skill learned by consuming the battler
	if (this.enemy()._learnedSkill != undefined){
		return this.enemy()._learnedSkill
	}
}

Game_Enemy.prototype.consumedSkillRate = function(){
	//returns the skill Id of a skill learned by consuming the battler
	if (this.enemy()._learnChance != undefined){
		return this.enemy()._learnChance
	} else {
		return 1
	}
}

Ramza.CSL.showSuccessMsg = function(skill, target, user) {
	var text = Ramza.CSL.Params.successText
	text = text.replace("%u", user.name())
	text = (Imported.YEP_MessageCore)? text.replace("%s", "\\is[" + skill.id + "]") : text.replace("%s", skill.name)
	text = text.replace("%t", target.name())
	if (Imported.YEP_MessageCore) text = "<WordWrap>" + text
	$gameMessage.add(text)
};

Ramza.CSL.showFailureMsg = function(skill, target, user, failedChk) {
	if (target.hp != 0){
		//didn't kill target
	} else if (failedChk){
		//failed the check
		var text = Ramza.CSL.Params.noPassText
		text = text.replace("%u", user.name())
		text = (Imported.YEP_MessageCore)? text.replace("%s", "\\is[" + skill.id + "]") : text.replace("%s", skill.name)
		text = text.replace("%t", target.name())
		if (Imported.YEP_MessageCore) text = "<WordWrap>" + text
		$gameMessage.add(text)
	} else if (skill){
		var text = Ramza.CSL.Params.knownText
		text = text.replace("%u", user.name())
		text = (Imported.YEP_MessageCore)? text.replace("%s", "\\is[" + skill.id + "]") : text.replace("%s", skill.name)
		text = text.replace("%t", target.name())
		if (Imported.YEP_MessageCore) text = "<WordWrap>" + text
		$gameMessage.add(text)
	} else {
		var text = Ramza.CSL.Params.noSkillText
		text = text.replace("%u", user.name())
		text = text.replace("%t", target.name())
		if (Imported.YEP_MessageCore) text = "<WordWrap>" + text
		$gameMessage.add(text)
	}
};