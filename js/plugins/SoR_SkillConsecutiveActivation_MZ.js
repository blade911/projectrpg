//=============================================================================
// SoR_SkillConsecutiveActivation_MZ.js
// SoR License X (C) 2022 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/licenseX.php
// ----------------------------------------------------------------------------
// Latest version v1.00 (2022/02/15)
//=============================================================================
/*:ja
@plugindesc ＜連続スキル発動＞ v1.00
@author 蒼竜
@target MZ
@url https://dragonflare.blue/dcave/
@help ※要 88.「SoRタグデータ解析」(SoR_TagDataProcessor_MZ.js)

１回の戦闘行動において、登録したスキルを
連続して発動する機能を持ったスキルを実装します。

起点となるスキルを戦闘で使用した際に、登録された
連続発動スキルは、基本的な発動条件、並びに指定した
任意の条件を満たしている限り、続けて発動します。
*/
/*:
@plugindesc <Consecutive Skill Activation> v1.00
@author Soryu
@target MZ
@url https://dragonflare.blue/dcave/index_e.php
@help [Prerequisite] 88. SoR_TagDataProcessor_MZ

This plugin implements skills which can be followed
by designated skills when it is activated in battles.

When the origin skill is used, its associated skills 
are activated consecutively as long as skill conditions
(given by the default system and originally designated)
are fulfilled.
*/
(function() {
if(!PluginManager._scripts.includes("SoR_TagDataProcessor_MZ")) throw new Error("[SoR_SkillConsecutiveActivation_MZ] This plugin REQUIRES SoR_TagDataProcessor_MZ.");
const pluginName = "SoR_SkillConsecutiveActivation_MZ";
const Param = PluginManager.parameters(pluginName);

const SoR_SCA_DM_initializeSoRTagProcessor = DataManager.initializeSoRTagProcessor;
DataManager.initializeSoRTagProcessor = function() {
    SoR_SCA_DM_initializeSoRTagProcessor.call(this);
    const q = {name: "SoRSCA", target: ["skill"]};
    this._SoRTagProcessFuncs.push(q);
}
DataManager.SoRSCA_init = function(obj) {}

const beginTag = /<(?:SkillConsecutive)>/i;
const endTag = /<(?:\/SkillConsecutive)>/i;
const skillTag = /[\s]*(\d+)?,[\s]*(.*)[\s]*,[\s]*(.*)/;


DataManager.SoRSCA = function(obj, line, intensive) {
    let MatchFlag = false;
	
    if(!intensive){
        if(line.match(beginTag)){
            obj.consecutiveList = [];
            return null;
        }
        else return false;
    }

	if(intensive === true){
        if(line.match(skillTag)){
            const sid = Number(RegExp.$1);
            const prob = Number(RegExp.$2);
            const cond = RegExp.$3;

            if(!Number.isNaN(sid) && !Number.isNaN(prob)){
                const cand = {
                    skillId: sid,
                    prob: prob,
                    cond: cond.trim()
                }
                if(cand.prob<=0 || cand.prob>=1) cand.prob=1;
                obj.consecutiveList.push(cand);
            }
		}
        else if (line.match(endTag)){//finish tags
            return true;
        }
    }
	
	return MatchFlag;
}


//////////////////////////////////////////////////////////////////////////////////
const SoR_SCA_BM_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    SoR_SCA_BM_startBattle.call(this);
    this.Init_SkillConsecutiveActivation();
}

BattleManager.Init_SkillConsecutiveActivation = function() {
    this.ConsecutiveSkills = [];
}

const SoR_SCA_BM_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    if(this.ConsecutiveSkills.length >= 1){
        this.perform_consecutiveSkills();
        return;
    }

    SoR_SCA_BM_endAction.call(this);//default
}


BattleManager.perform_consecutiveSkills = function() {
    const skill = this.ConsecutiveSkills.shift();

    const testRand = Math.random();
    if(skill.prob < testRand || !SoR_Eval(skill.cond)){
        this.Init_SkillConsecutiveActivation();
        return;
    }

    const conSkill = new Game_Action(this._subject);
    conSkill.setSkill(skill.skillId);
    if(!this._subject.canUse($dataSkills[skill.skillId])){
        this.Init_SkillConsecutiveActivation();
        return;
    }


    this._subject.clearActions();
    this._subject._actions[0] = conSkill;
    this._subject._actions[0]._SoR_ActionCounter = 0;////drago

    const subject = this._subject;
    const action = this._subject._actions[0];

    targets = action.testTarget();
    if(targets[0]) action.setTarget(targets[0].index());
    this._phase = "turn";
}


Game_Action.prototype.testTarget = function() {
    const targets = [];
    if (!this._forcing && this.subject().isConfused()) {
        targets.push(this.confusionTarget());
    } else if (this.isForEveryone()) {
        targets.push(...this.targetsForEveryone());
    } else if (this.isForOpponent()) {
        targets.push(...this.targetsForOpponents());
    } else if (this.isForFriend()) {
        targets.push(...this.targetsForFriends());
    }
    return this.repeatTargets(targets);
}


//////////////////////////////////////////////////////////////
const SoR_SCA_BM_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    SoR_SCA_BM_startAction.call(this);
    this.setConsecutiveSkills();
}

BattleManager.setConsecutiveSkills = function() {
    const subject = this._subject;
    const action = subject.currentAction();
    const obj = action._item.object();

    if(!obj.consecutiveList || this.ConsecutiveSkills.length>0) return;
    this.ConsecutiveSkills = obj.consecutiveList.slice();
}


////////////////////////////////////////////////////////
function SoR_Eval(ev) {
    const sentence = "return (" + ev + ");";
    if(typeof $gameTemp.SoRTmp_script === "undefined") $gameTemp.SoRTmp_script = new Map();
    if(!$gameTemp.SoRTmp_script.has(sentence)){
        $gameTemp.SoRTmp_script.set(sentence, new Function(sentence));
    }     
    const res = $gameTemp.SoRTmp_script.get(sentence)();
    return res;
}

})();