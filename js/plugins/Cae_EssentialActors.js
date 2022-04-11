//=========================================================
// Cae_EssentialActors.js
//=========================================================

/*:
 * @plugindesc Set certain actors to be essential. If one dies: game over.
 * @author Caethyril
 * @help Name this plugin "Cae_EssentialActors.js".
 * 
 * Double-click the plugin parameter to set which actors are essential -->
 *
 * Terms of use: free to use and modify!
 *
 * @param Essential Actors
 * @type actor[]
 * @desc If one of these actors dies, the player gets a game over.
 * @default []
 */

(function(alias) {

'use strict';

	const PLUGIN_NAME = 'Cae_EssentialActors';
	const ESSENTIAL = JSON.parse(PluginManager.parameters(PLUGIN_NAME)['Essential Actors'] || '[]').map(Number);

	Scene_Base.prototype.checkGameover = function() {
		let mainCharDead = ESSENTIAL.some(function(id) {
			return $gameActors.actor(id).isDead();
		});
		if (mainCharDead) {
			SceneManager.goto(Scene_Gameover);
		} else {
			alias.call(this);
		}
	};

})(Scene_Base.prototype.checkGameover);