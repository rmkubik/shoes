import { getCurrentMapItem, getCurrentEnemy } from '../../state/map';

export default {
  animation: (scene) => {
    // const onComplete = new Promise((resolve) => {
    //   const item = scene.add.image(160, 280, 'items', 0);
    //   scene.tweens.add({
    //     targets: item,
    //     x: 320,
    //     y: 80,
    //     ease: 'Power1',
    //     duration: 500,
    //     onComplete: () => {
    //       item.destroy();
    //       resolve();
    //     },
    //   });
    // });
    // return onComplete;
  },
  effect: (target, { damage }) => {
    target.takeDamage(damage);
  },
};
