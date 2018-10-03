import Prefab from './prefab';

class Player extends Prefab {
  constructor({
    scene, position, speed, keys,
  }) {
    super({
      scene, position, sheet: 'characters', sprite: 325,
    });

    this.speed = speed;
    this.keys = keys;
    this.direction = { x: 0, y: 0 };

    this.body.setCollideWorldBounds(true);
  }

  update() {
    const direction = { x: 0, y: 0 };
    this.body.setVelocity(0);

    if (this.keys.up.isDown) {
      direction.y = -1;
    }
    if (this.keys.left.isDown) {
      direction.x = -1;
    }
    if (this.keys.down.isDown) {
      direction.y = 1;
    }
    if (this.keys.right.isDown) {
      direction.x = 1;
    }

    if (direction.x !== 0 || direction.y !== 0) {
      this.direction = direction;

      this.body.setVelocityX(this.speed * this.direction.x);
      this.body.setVelocityY(this.speed * this.direction.y);
    }
  }
}

export default Player;
