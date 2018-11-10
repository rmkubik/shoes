import Prefab from './prefab';

class OneWayTile extends Prefab {
  constructor({
    scene, position,
  }) {
    super({
      scene, position, sheet: 'tiles', sprite: 108,
    });

    this.direction = {
      x: 0,
      y: 1,
    };

    this.body.setImmovable(true);
  }
}

export default OneWayTile;
