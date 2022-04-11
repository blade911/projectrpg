//This plugin will remove Skill Types from all applicable menus when there are no available skills
//in that category.


var Ramza_Game_BattlerBase_addedSkillTypes = Game_BattlerBase.prototype.addedSkillTypes;
Game_BattlerBase.prototype.addedSkillTypes = function() {
	var skillT = Ramza_Game_BattlerBase_addedSkillTypes.call(this)
	var win = (SceneManager._scene._skillWindow) ? SceneManager._scene._skillWindow : SceneManager._scene._itemWindow
	var newSkillT = []
	win.setActor(this)
	skillT.map(function(ele){
		win._stypeId = ele
		win.makeItemList()
		if (win._data.length > 0 ) newSkillT.push(ele)
	})
	delete win._stypeId
	delete win._actor
	return newSkillT
};
