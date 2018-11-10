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
    this.frozen = {
      up: false,
      down: false,
      left: false,
      right: false,
    };

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
      const frozenDirection = this.resolveFrozenDirection(direction);

      this.body.setVelocityX(this.speed * frozenDirection.x);
      this.body.setVelocityY(this.speed * frozenDirection.y);
    }
  }

  resolveFrozenDirection({ x, y }) {
    const direction = {
      x,
      y,
    };

    if (this.frozen.up && y === -1) {
      direction.y = 0;
    }
    if (this.frozen.down && y === 1) {
      direction.y = 0;
    }
    if (this.frozen.left && x === -1) {
      direction.x = 0;
    }
    if (this.frozen.right && x === 1) {
      direction.x = 0;
    }

    return direction;
  }

  freeze() {
    this.setFreeze({
      up: true, down: true, left: true, right: true,
    });
  }

  unFreeze() {
    this.setFreeze({
      up: false, down: false, left: false, right: false,
    });
  }

  setFreeze(direction) {
    this.frozen = {
      ...this.frozen,
      ...direction,
    };
  }
}

export default Player;
