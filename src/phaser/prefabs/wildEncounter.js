import Prefab from './prefab';

class WildEncounter extends Prefab {
  constructor({
    scene, position,
  }) {
    super({
      scene, position, sheet: 'tiles', sprite: 7,
    });

    this.body.setCollideWorldBounds(true);
    this.transitioning = false;
  }

  update() {
    const searchWidth = 1.2;
    if (
      this.scene.player.y < this.body.y + (searchWidth * 16)
      && this.scene.player.y > this.body.y - (searchWidth * 16)
      && this.scene.player.x < this.body.x + (searchWidth * 16)
      && this.scene.player.x > this.body.x - (searchWidth * 16)
      && !this.transitioning
    ) {
      this.transitioning = true;
      this.scene.player.freeze();

      const exclamation = this.scene.add.image(this.x, this.y - 16, 'tiles', 8);
      exclamation.setScale(0.25, 0.25);
      this.scene.tweens.add({
        targets: exclamation,
        scaleX: 1,
        scaleY: 1,
        ease: 'Power1',
        duration: 300,
      });
      this.scene.tweens.add({
        targets: exclamation,
        y: exclamation.y - 8,
        ease: 'Sine.easeInOut',
        duration: 250,
        repeat: 2,
        yoyo: true,

        onComplete: () => {
          this.scene.sceneTransition('battle');
        },
      });
    }
  }
}

export default WildEncounter;
