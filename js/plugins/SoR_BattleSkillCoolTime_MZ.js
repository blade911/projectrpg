//=============================================================================
// SoR_BattleSkillCoolTime_MZ.js
// SoR License (C) 2020 蒼竜, REQUIRED User Registration on Dragon Cave
// http://dragonflare.blue/dcave/license.php
// ----------------------------------------------------------------------------
// Latest version v1.10 (2021/07/11)
//=============================================================================
/*:ja
@plugindesc ＜戦闘用スキルクールタイム＞ v1.10
@author 蒼竜
@orderBefore SoR_SkillLevelVariation_MZ
@target MZ
@url http://dragonflare.blue/dcave/
@orderAfter SoR_TagDataProcessor_MZ
@base SoR_TagDataProcessor_MZ
@help 戦闘中に、プレイヤーが特定スキル・行動に固執して
連続で使用できないように"クールタイム"の概念を設定します。

必要なスキルのメモ欄に時間を書き込むことで機能が有効となります。
マップ上など、非戦闘中における連続使用制限は発生しません。
@param ---全般---
@param CoolTime_Unit
@desc クールタイムの管理単位(default: 0)
@type select
@option ターン
@value 0
@option 時間
@value 1
@default 0
@param GameFPS
@desc ゲーム最大FPS，時間管理時のみ (default: 60)
@default 60
@type number
@param IsApplyForEnemy
@desc 'true'の時、エネミーにもクールタイム制限を適用します (default: false)
@default false
@type boolean

@param CoolTimePass_UnderCannotMove
@desc 行動不能状態におけるクールタイム経過(default: 0)
@type select
@option する(常にクールタイムを消化)
@value 0
@option しない(行動不能状態中はクールタイムを消化されない)
@value 1
@default 0
@param Phase_CTMeasurement
@desc クールタイムの時間計測を行うタイミング。時間形式専用(default: 3)
@type select
@option 常に
@value 0
@option コマンド入力中は止める
@value 1
@option アクション中は止める
@value 2
@option アクション・コマンド入力中は止める
@value 3
@default 3

@param ---表示系---
@param ShowSkillSeal_byCoolTime
@desc 'true'の時、クールタイムによる使用不可をスキル画面に表示します(ウィンドウ非改変時のみ保証) (default: true)
@default true
@type boolean
@param SkillSealing_Text
@desc クールタイムによるスキル使用不可状態を表すテキスト (default: CHARGING)
@default CHARGING
@type string
*/
/*:
@plugindesc <Cooltime For Battle Skills> v1.10
@author Soryu
@orderBefore SoR_SkillLevelVariation_MZ
@target MZ
@url http://dragonflare.blue/dcave/index.e_php
@orderAfter SoR_TagDataProcessor_MZ
@base SoR_TagDataProcessor_MZ
@help This plugin defines the cooltime for skills
during battles so that player cannot use the same skill intensively.

Skills which given designated tag notation are applied its cooltime.
Consequtive usage on the map is never restricted.
@param ---General---
@param CoolTime_Unit
@desc Format of cooltime dealt (default: 0)
@type select
@option Default turn based
@value 0
@option Time (elapsed frames) based
@value 1
@default 0
@param GameFPS
@desc Maximum FPS assumed in the game for time based cooltime management (default: 60)
@default 60
@type number
@param IsApplyForEnemy
@desc If true, enemies are also restricted the consequtive skill use by cool time. (default: false)
@default false
@type boolean

@param CoolTimePass_UnderCannotMove
@desc Is the cooltime of battlers who cannot move processed? (default: 0)
@type select
@option Yes (Cooltime is always passed.)
@value 0
@option No (Cooltime is passed only when the battle can move.)
@value 1
@default 0
@param Phase_CTMeasurement
@desc Situation that cooltime passes, only for time based (default: 3)
@type select
@option Always
@value 0
@option Except for inpputing commands
@value 1
@option Except for performing actions
@value 2
@option Except for both inpputing commands and performing actions
@value 3
@default 3

@param ---Display---
@param ShowSkillSeal_byCoolTime
@desc If true, a text which indicates a disabled skill due to the cooltime in the skill window (assume the default RMMZ skill window) is shown. (default: true)
@default true
@type boolean
@param SkillSealing_Text
@desc Text to indicate a disabled skill due to the cooltime (default: CHARGING)
@default CHARGING
@type string
*/

var SoR = SoR || {};
(function() {
if(!PluginManager._scripts.includes("SoR_TagDataProcessor_MZ")) throw new Error("[SoR_BattleSkillCoolTime_MZ] This plugin REQUIRES SoR_TagDataProcessor_MZ.");
const Param = PluginManager.parameters('SoR_BattleSkillCoolTime_MZ');

const Max_FPS = Number(Param['GameFPS'] || 0);
const CoolTime_Unit = Number(Param['CoolTime_Unit'] || 0);
const CoolTimePass_UnderCannotMove = Number(Param['CoolTimePass_UnderCannotMove'] || 0);
const Phase_CTMeasurement = Number(Param['Phase_CTMeasurement']);
const IsApplyForEnemy = Boolean(Param['IsApplyForEnemy'] === 'true' || false);
const ShowSkillSeal_byCoolTime = Boolean(Param['ShowSkillSeal_byCoolTime'] === 'true' || false);
const SkillSealing_Text = String(Param['SkillSealing_Text']);


///////////////////////////////////////////////////////////////////////////////////////
const SoR_BSCT_DM_initializeSoRTagProcessor = DataManager.initializeSoRTagProcessor;
DataManager.initializeSoRTagProcessor = function() {
    SoR_BSCT_DM_initializeSoRTagProcessor.call(this);
    const q = {name: "SoRTagBSCT", target: ["skill"]};
    this._SoRTagProcessFuncs.push(q);
}
DataManager.SoRTagBSCT_init = function(obj) {
    obj.coolTime = 0;
}
DataManager.SoRTagBSCT = function(obj, line) {
    let MatchFlag = true;
    const tag = /<(?:CoolTime):?[ ]*(.*)>/i;

    if(line.match(tag)) obj.coolTime = Number(RegExp.$1);
    else MatchFlag = false;

    return MatchFlag;
}
///////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
Game_Battler.prototype.resetCoolTime = function() {
    this.sct_table = {};
}

const SoR_BSCT_GB_initTpbTurn = Game_Battler.prototype.initTpbTurn;
Game_Battler.prototype.initTpbTurn = function() {
    SoR_BSCT_GB_initTpbTurn.call(this);
    this.resetCoolTime();
}

Game_Battler.prototype.setCoolTime = function(action) {
    const obj = action._item.object();
    if(!DataManager.isSkill(obj)) return;
    if(obj.coolTime<=0) return;

    const basetime = this.calcSkillCoolTime(obj);
    const sct = CoolTime_Unit==0 ? basetime+1 : basetime * Max_FPS;
    const finalized = this.applyCoolTimeCorrection(sct);
    this.sct_table[obj.id] =  Math.floor(finalized);
}

Game_Battler.prototype.calcSkillCoolTime = function(skill) {
    return skill.coolTime;
}

//modified by others
Game_Battler.prototype.applyCoolTimeCorrection = function(sct) {
    return sct;
}

Game_Battler.prototype.IsNotUnderSCT = function(item) {
    return !(item.id in this.sct_table);
}

Game_Battler.prototype.BSCTlen = function() {
    return Object.keys(this.sct_table).length;
}


const SoR_BSCT_BM_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    SoR_BSCT_BM_startAction.call(this);
    this.applyCoolTime();
}

BattleManager.applyCoolTime = function() {
    if(!IsApplyForEnemy && this._subject.isEnemy()) return;
    const action = this._subject.currentAction();
    this._subject.setCoolTime(action);
}
////////////////////////////////////////////////////////////////////////////

const SoR_BSCT_GBB_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    const prev = SoR_BSCT_GBB_meetsSkillConditions.call(this,...arguments);
    const sct = !$gameParty.inBattle()? true : this.IsNotUnderSCT(skill);
    return prev && sct;
}

Game_Unit.prototype.updateBSCT = function() {
    for (const member of this.members()) member.updateSCT();    
}

Game_Battler.prototype.updateSCT = function() {
    if(!canPassSCT(this.canMove())) return;

    for (const sid in this.sct_table) {
        this.sct_table[sid]--;
        if(this.sct_table[sid]<=0) delete this.sct_table[sid];
    }
}

function canPassSCT (state) {
    if(CoolTimePass_UnderCannotMove == 0) return true;
    if(state) return true;

    return false;
}


////////////////////////////////////////////////////////////////////////////
const SoR_BSCT_BM_update = BattleManager.update;
BattleManager.update = function(timeActive) {
    SoR_BSCT_BM_update.call(this,...arguments);
    this.updateBSCT();
}

BattleManager.updateBSCT = function() {
    if(CoolTime_Unit==0) return;
    switch(Phase_CTMeasurement){
        case 1:
            if(BattleManager._inputting) return;
        break;
        case 2:
            if(this._phase == "action") return;
        break;
        case 3:
            if(this._phase == "action" || BattleManager._inputting) return;
        break;
        default:
        break;
    }

    $gameParty.updateBSCT();
    if(IsApplyForEnemy) $gameTroop.updateBSCT();
}

const SoR_BSCT_BM_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    SoR_BSCT_BM_endTurn.call(this);
    if(CoolTime_Unit==0){
        $gameParty.updateBSCT();
        if(IsApplyForEnemy) $gameTroop.updateBSCT();
    }
}

////////////////////////////////////////////////////////////////////////////

if(ShowSkillSeal_byCoolTime){

    const SoR_BSCT_WBS_drawItem = Window_BattleSkill.prototype.drawItem;
    Window_BattleSkill.prototype.drawItem = function(index) {
        SoR_BSCT_WBS_drawItem.call(this,...arguments);

        const skill = this.itemAt(index);
        if (skill) {
            const costWidth = this.costWidth();
            const rect = this.itemLineRect(index);
            this.drawBSCTInfo(skill, rect.x, rect.y, rect.width - costWidth, this.isCooling(skill));
        }
    }

    Window_BattleSkill.prototype.drawBSCTInfo = function(item, x, y, width, cooling) {
        if (item && cooling) {
            const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            const textMargin = ImageManager.iconWidth + 4;
            const itemWidth = Math.max(0, width - textMargin);

            this.contents.fontSize = 16;
            this.changeTextColor(ColorManager.textColor(14));
            this.drawText(SkillSealing_Text, x + textMargin, y + 12, itemWidth, "center");
            this.resetFontSettings();
        }
    }
    Window_BattleSkill.prototype.isCooling = function(item) { return !this._actor.IsNotUnderSCT(item); }

    const SoR_BSCT_WBS_update = Window_BattleSkill.prototype.update;
    Window_BattleSkill.prototype.update = function() { 
        SoR_BSCT_WBS_update.call(this);
        if(this.nbindSkills_SCT && this.nbindSkills_SCT > this._actor.BSCTlen()) this.refresh();
    }

    const SoR_BSCT_WBS_refresh = Window_BattleSkill.prototype.refresh;
    Window_BattleSkill.prototype.refresh = function() {
        SoR_BSCT_WBS_refresh.call(this);
        this.nbindSkills_SCT = this._actor.BSCTlen();
    }

}

})();