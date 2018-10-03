import Phaser from 'phaser';

class Prefab extends Phaser.GameObjects.Sprite {
  constructor({
    scene, position, sheet, sprite,
  }) {
    super(scene, position.x, position.y, sheet, typeof sprite !== 'number' ? `${sprite}.png` : sprite);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    // scene.objects.add(this);

    this.setPosition(this.width / 2, this.height / 2);
  }

  static convertVelocityToAngle(velocity) {
    const { x, y } = velocity;
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  static convertPixelsToTile(position, tileSize) {
    const { x, y } = position;
    return {
      x: Math.floor(x / tileSize),
      y: Math.floor(y / tileSize),
    };
  }
}

export default Prefab;
