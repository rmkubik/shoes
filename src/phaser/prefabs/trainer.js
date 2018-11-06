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
    const searchWidth = 16;
    if (this.scene.player.y < this.body.y + searchWidth && this.scene.player.y > this.body.y - searchWidth) {
      console.log('I SEE YOU!!!');
    }
  }
}

export default Trainer;
