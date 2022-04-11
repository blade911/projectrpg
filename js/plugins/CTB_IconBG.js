//=============================================================================
// RPG Maker MZ - CT_Bolt's IconBG Plugin
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v0.30 CT_Bolt's IconBG Plugin
 * @author CT_Bolt
 * 
 * @param IconBG 
 * @desc The filename of the Icon Background Image (saved in 'system')
 * @default MZIconsBackgrounds
 * 
 * @param Default
 * @desc The default index used (-1 = no background)
 * @default -1
 *
 * @help CTB_IconBG.js
 *   Item Notetag Example: <iconBG:4>
 
 * Version: 0.30
 *
 */

var CTB = CTB || {}; CTB.IconBG  = CTB.IconBG || {};
var Imported = Imported || {}; Imported["CTB_IconBG"] = 0.30;

(($_$) => {
    function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $_$.par = getPluginParameters();
    $_$.par['IconBG'] = $_$.par['IconBG'] || 'MZIconsBackgrounds';
	if ($_$.par['IconBG'][0] !== '"' && $_$.par['IconBG'][0] !== "'"){
		$_$.par['IconBG'] = '"' + $_$.par['IconBG'] + '"';
	};
	$_$.par['Default'] = $_$.par['Default'] || '10';
	if ($_$.par['Default'][0] !== '"' && $_$.par['Default'][0] !== "'"){
		$_$.par['Default'] = '"' + $_$.par['Default'] + '"';
	};
	
	$_$['Scene_Boot.prototype.loadSystemImages'] = Scene_Boot.prototype.loadSystemImages;
	Scene_Boot.prototype.loadSystemImages = function() {
		$_$['Scene_Boot.prototype.loadSystemImages'].apply(this, arguments);
		ImageManager.loadSystem(eval($_$.par['IconBG']));
	};
	
	/*
	Window_StatusBase.prototype.drawActorIcons = function(actor, x, y, width) {
		width = width || 144;
		const iconWidth = ImageManager.iconWidth;
		const icons = actor.allIcons().slice(0, Math.floor(width / iconWidth));
		let iconX = x;
		for (const icon of icons) {
			this.drawIcon(icon, iconX, y + 2);
			iconX += iconWidth;
		}
	};
	*/
	
	Window_Base.prototype.drawItemName = function(item, x, y, width) {
		if (item) {
			var iconBG_index = item.meta.iconBG;			
			const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			const textMargin = ImageManager.iconWidth + 4;
			const itemWidth = Math.max(0, width - textMargin);
			this.resetTextColor();
			this.drawIcon(item.iconIndex, x, iconY, iconBG_index);
			this.drawText(item.name, x + textMargin, y, itemWidth);
		}
	};
	
	Window_Base.prototype.processDrawIcon = function(iconIndex, textState, iconBG_index) {
		if (textState.drawing) {
			this.drawIcon(iconIndex, textState.x + 2, textState.y + 2, iconBG_index);
		}
		textState.x += ImageManager.iconWidth + 4;
	};
	
	Window_Base.prototype.drawIcon = function(iconIndex, x, y, bgIndex) {
		const bitmap = ImageManager.loadSystem("IconSet");
		const pw = ImageManager.iconWidth;
		const ph = ImageManager.iconHeight;		
		const sx = (iconIndex % 16) * pw;
		const sy = Math.floor(iconIndex / 16) * ph;
		
		bgIndex = bgIndex || eval($_$.par['Default']) || -1;
		if (bgIndex >= 0){
			const bg = ImageManager.loadSystem(eval($_$.par['IconBG']));
			const sxBG = (bgIndex % 16) * pw;
			const syBG = Math.floor(bgIndex / 16) * ph;				
			this.contents.blt(bg, sxBG, syBG, pw, ph, x, y);
		}
		
		this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
	};
	
})(CTB.IconBG);