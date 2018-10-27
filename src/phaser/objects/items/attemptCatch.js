import helpers from './helpers';
import { getCurrentMapItem, getCurrentEnemy } from '../../state/map';


const calcCatchChance = shoe => (1 - (shoe.hp.current / shoe.hp.max)) * shoe.catchChance.current;

export default {
  animation: (scene) => {
    const onComplete = new Promise((resolve) => {
      const item = scene.add.image(160, 280, 'items', 0);
      scene.tweens.add({
        targets: item,
        x: 320,
        y: 80,
        ease: 'Power1',
        duration: 1000,
        onComplete: () => {
          item.destroy();
          resolve();
        },
      });
    });
    return onComplete;
  },
  effect: (state) => {
    const encounter = getCurrentMapItem(state);
    const enemy = getCurrentEnemy(state);
    if (encounter.wild && Math.random() < calcCatchChance(enemy)) {
      enemy.hp.current = enemy.hp.max;
      helpers.restoreAllMovesUses(enemy);
      state.player.shoes.push(enemy);
      encounter.enemies.splice(encounter.currentEnemyIndex, 1);
    }
  },
};
