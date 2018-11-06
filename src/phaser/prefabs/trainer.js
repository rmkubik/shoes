import Prefab from './prefab';

class Trainer extends Prefab {
  constructor({
    scene, position,
  }) {
    super({
      scene, position, sheet: 'characters', sprite: 324,
    });

    this.body.setCollideWorldBounds(true);
  }

  update() {
    const searchWidth = 2;
    if (
      this.scene.player.y < this.body.y + searchWidth
      && this.scene.player.y > this.body.y - searchWidth
    ) {
      this.scene.sceneTransition('battle');
    }
  }
}

export default Trainer;
