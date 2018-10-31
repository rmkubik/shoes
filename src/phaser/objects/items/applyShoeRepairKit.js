import { getCurrentPlayerShoe } from '../../state/map';

export default {
  animation: (scene) => {
    const onComplete = new Promise((resolve) => {
      const item = scene.add.image(240, 300, 'items', 1);
      scene.tweens.add({
        targets: item,
        x: 110,
        y: 230,
        ease: 'Power1',
        duration: 500,
        onComplete: () => {
          // scene.player.heal();
          item.destroy();
          resolve();
        },
      });
    });
    return onComplete;
  },
  effect: (scene) => {
    scene.player.heal();
    getCurrentPlayerShoe(scene.state).hp.current = getCurrentPlayerShoe(scene.state).hp.max;
  },
};
