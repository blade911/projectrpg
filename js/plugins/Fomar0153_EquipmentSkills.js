//=============================================================================
// RPG Maker MZ - Equipment Skills - Version 1.1
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allows you to pernamently learn skills from your equipment.
 * @author Fomar0153
 *
 * @param Learn Skills added by traits
 * @type boolean
 * @desc Do you want to learn skills added by traits pernamnetly with this system?
 * @default true
 *
 * @param Restrict Learning
 * @type boolean
 * @desc Do you want to use notetags to restrict who can learn which skills?
 * @default false
 *
 * @param Show Multipliers
 * @type boolean
 * @desc Do you want to show it weapons have increased AP gain for some skills?
 * @default true
 *
 * @param Character Sprite Width
 * @type integer
 * @desc Enter the width of your character sprites if using non default sizes.
 * @default 32
 *
 * @param Skill Learn Bar Colour 1
 * @type integer
 * @desc Enter the width of your character sprites if using non default sizes.
 * @default 12
 *
 * @param Skill Learn Bar Colour 2
 * @type integer
 * @desc Enter the width of your character sprites if using non default sizes.
 * @default 4
 *
 *
 * @help Fomar0153_EquipmentSkills.js
 *
 * Notetag skills: <ap: x>
 * Then either add the skill to equipment via traits if you want them to have access to the skills
 * prior to mastering or notetag the equipment with: <skills: x;y;z>
 * Seperate the skill ids with a semicolon.
 * If you want a piece of equipment to teach a skill faster than that the normal rate then do: skillid:learnrate
 * e.g. <skills: x:2;y;z>
 *
 * If you are using the Restrict Learning option use the following notetag
 * on either the Actor or Class tab of the database.
 * <skillsrestrict: n1,n2,n3>
 * Replace n1,n2,n3 with the skill ids from the database of the skills want
 * that actor or class to learn. Seperate ids with a comma.
 *
 * Version 1.0 -> 1.1
 * Added a new feature, you can now restrict who can learn specific skills from
 * equipment.
 * Removed a console.log that I missed!
 */

var Fomar = Fomar || {};
Fomar.EquipmentSkills = {};

Fomar.EquipmentSkills.parameters = PluginManager.parameters('Fomar0153_EquipmentSkills');

Fomar.EquipmentSkills.learnTraitSkills = (Fomar.EquipmentSkills.parameters["Learn Skills added by traits"] == "true");
Fomar.EquipmentSkills.showMult = (Fomar.EquipmentSkills.parameters["Show Multipliers"] == "true");
Fomar.EquipmentSkills.charWidth = parseInt(Fomar.EquipmentSkills.parameters["Character Sprite Width"]);
Fomar.EquipmentSkills.color1 = parseInt(Fomar.EquipmentSkills.parameters["Skill Learn Bar Colour 1"]);
Fomar.EquipmentSkills.color2 = parseInt(Fomar.EquipmentSkills.parameters["Skill Learn Bar Colour 2"]);
Fomar.EquipmentSkills.restrict = (Fomar.EquipmentSkills.parameters["Restrict Learning"] == "true");

(() => {

  Fomar.EquipmentSkills.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
  Game_Actor.prototype.initMembers = function() {
    Fomar.EquipmentSkills.Game_Actor_initMembers.call(this);
    this._ap = {};
  };

  Game_Actor.prototype.gainAP = function(ap) {
    for (const item of this.equips()) {
      if (item) {
        if (Fomar.EquipmentSkills.learnTraitSkills) {
          var tmp = item.traits.filter(trait => trait.code === Game_BattlerBase.TRAIT_SKILL_ADD);
          for (var i = 0; i < tmp.length; i++) {
            this.gainSkillAP(tmp[i].dataId, ap);
          }
        }
        if (item.meta["skills"]) {
          var skills = item.meta['skills'].split(";");
          for (var i = 0; i < skills.length; i++) {
            if (skills[i].includes(":")) {
              this.gainSkillAP(parseInt(skills[i].split(":")[0]), ap * parseInt(skills[i].split(":")[1]));
            } else {
              this.gainSkillAP(parseInt(skills[i]), ap);
            }
          }
        }
      }
    }
  };

  Game_Actor.prototype.gainSkillAP = function(skillId, ap) {
    if (Fomar.EquipmentSkills.restrict && !this.canLearn(skillId)) {
      return;
    }
    if ($dataSkills[skillId].meta["ap"]) {
      this._ap[skillId] = this._ap[skillId] || 0;
      if (this._ap[skillId] < $dataSkills[skillId].meta["ap"]) {
        this._ap[skillId] = Math.min(this._ap[skillId] + ap, $dataSkills[skillId].meta["ap"])
        if (this._ap[skillId] == $dataSkills[skillId].meta["ap"]) {
          this.learnSkill(skillId);
          $gameMessage.add(TextManager.obtainSkill.format($dataSkills[skillId].name));
        }
      }
    }
  }

  Game_Actor.prototype.canLearn = function(skillId) {
    if (!Fomar.EquipmentSkills.restrict || this.actor().skillRestrictions.includes(skillId) || this.currentClass().skillRestrictions.includes(skillId)) {
      return true;
    }
    return false;
  }


  Fomar.EquipmentSkills.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    if (Fomar.EquipmentSkills.DataManager_isDatabaseLoaded.call(this)) {
      this.loadSkillRestrictions($dataActors);
      this.loadSkillRestrictions($dataClasses);
      return true;
    } else {
      return false;
    }
  };

  DataManager.loadSkillRestrictions = function(data) {
    for (var i = 1; i < data.length; i++) {
      data[i].skillRestrictions = [];
      if (data[i].meta['skillsrestrict']) {
        data[i].meta['skillsrestrict'].split(",").forEach(function(skillId) {
          data[i].skillRestrictions.push(parseInt(skillId));
        });
      }
    }
  }

  Window_EquipStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
      const nameRect = this.itemLineRect(0);
      this.drawActorCharacter(this._actor, nameRect.x + this.padding, nameRect.height + this.padding);
      this.drawActorName(this._actor, nameRect.x + Fomar.EquipmentSkills.charWidth + 4, this.lineHeight() / 4, nameRect.width - Fomar.EquipmentSkills.charWidth - 4);
      this.drawAllParams();
      this.drawSkills();
    }
  };

  Window_EquipStatus.prototype.drawSkills = function() {
    if (this._actor && this._slotId < 0) {
      return;
    }
    if (this._tempActor) {
      var e = this._tempActor.equips()[this._slotId];
    } else {
      var e = this._actor.equips()[this._slotId];
    }
    if (e) {
      var skills = [];
      var mults = {};
      if (Fomar.EquipmentSkills.learnTraitSkills) {
        e.traits.filter(trait => trait.code === Game_BattlerBase.TRAIT_SKILL_ADD).forEach(function(skill) {
          if ($dataSkills[skill.dataId].meta["ap"]) {
            skills.push($dataSkills[skill.dataId]);
            mults[skill.dataId] = 1;
          }
        });
      }
      if (e.meta['skills']) {
        e.meta['skills'].split(";").forEach(function(skill) {
          var s = skill.split(":");
          if ($dataSkills[parseInt(s[0])].meta["ap"]) {
            skills.push($dataSkills[parseInt(s[0])]);
            mults[parseInt(s[0])] = parseInt(s[1]) || 1;
          }
        });
      }
      for (var i = 0; i < skills.length; i++) {
        if (i == 3) {
          break;
        }
        this._actor._ap[skills[i].id] = this._actor._ap[skills[i].id] || 0;
        this.drawGauge(4, this.lineHeight() * (8.5 + 1.5 * i), this.itemLineRect(0).width, this.lineHeight() / 2, (this._actor._ap[skills[i].id] / skills[i].meta["ap"]));
        this.drawMinMaxValue(4, this.lineHeight() * (8.5 + 1.5 * i), this.itemLineRect(0).width, this.lineHeight() / 2, skills[i], mults[skills[i].id]);
        this.changePaintOpacity(this._actor.canLearn(skills[i].id));
        this.drawItemName(skills[i], 4, this.lineHeight() * (7.5 + 1.5 * i));
        this.changePaintOpacity(1);
      }
    }
  };

  Window_EquipStatus.prototype.drawGauge = function(x, y, width, height, rate) {
    const fillW = Math.floor((width - 2) * rate);
    const fillH = height - 2;
    const color0 = ColorManager.gaugeBackColor();
    const color1 = ColorManager.textColor(Fomar.EquipmentSkills.color1);
    const color2 = ColorManager.textColor(Fomar.EquipmentSkills.color2);
    this.contents.fillRect(x, y, width, height, color0);
    this.contents.gradientFillRect(x + 1, y + 1, fillW, fillH, color1, color2);
  };

  Window_EquipStatus.prototype.drawMinMaxValue = function(x, y, width, height, skill, mult) {
    this.resetTextColor();
    const size = this.contents.fontSize;
    this.contents.fontSize /= 2;
    if (Fomar.EquipmentSkills.showMult) {
      this.contents.drawText("x" + mult, x, y - this.lineHeight() / 2, width, height, "right");
    }
    if (!Fomar.EquipmentSkills.restrict || this._actor.canLearn(skill.id)) {
      this.contents.drawText(this._actor._ap[skill.id] + "/" + skill.meta["ap"], x, y, width, height, "center");
    } else {
      this.contents.drawText("N/A", x, y, width, height, "center");
    }
    this.contents.fontSize = size;
  };

  Window_EquipStatus.prototype.setSlotId = function(slotId) {
    if (this._slotId !== slotId) {
      this._slotId = slotId;
      this.refresh();
    }
  };

  Fomar.EquipmentSkills.Window_EquipSlot_update = Window_EquipSlot.prototype.update;
  Window_EquipSlot.prototype.update = function() {
    Fomar.EquipmentSkills.Window_EquipSlot_update.call(this);
    if (this._statusWindow) {
      this._statusWindow.setSlotId(this.index());
    }
  };

  Fomar.EquipmentSkills.Scene_Equip_createStatusWindow = Scene_Equip.prototype.createStatusWindow;
  Scene_Equip.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_EquipStatus(rect);
    this.addWindow(this._statusWindow);
  };

  Window_EquipStatus.prototype.paramY = function(index) {
    return Math.floor(this.lineHeight() * (index + 1.5));
  };

})();
