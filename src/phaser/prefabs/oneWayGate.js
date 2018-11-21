import Prefab from './prefab';

class OneWayTile extends Prefab {
  constructor({
    scene, position,
  }) {
    super({
      scene, position, sheet: 'tiles', sprite: 6,
    });

    this.direction = {
      x: 0,
      y: 1,
    };

    this.body.setImmovable(true);
    this.body.checkCollision = {
      none: false, up: false, down: true, left: false, right: false,
    };
    scene.physics.add.collider(this, scene.player);
  }
}

export default OneWayTile;
