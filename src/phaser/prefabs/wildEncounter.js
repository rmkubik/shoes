import Prefab from './prefab';

class WildEncounter extends Prefab {
  constructor({
    scene, position, scale = 0.5, encounterIndex, state,
  }) {
    super({
      scene, position, // sheet: 'characters', sprite: 3,
    });

    this.encounterIndex = encounterIndex;

    // TODO: This is  hack. Wild Encounter is purposely using a sprite that doesn't
    // exist so that it will not be rendered. Then it is intentionally rendering
    // a separate sprite on top of itself. WildEncounter should either not be a prefab,
    // or it should be correctly passed a sprite index upon creation.
    // the -8 is to draw the hacky sprite at the center of a tile.
    scene.add.sprite(
      this.x - 8,
      this.y - 8,
      state.enemies[0].imageKey,
    ).setScale(scale);

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
          this.scene.sceneTransition('battle', this.encounterIndex);
        },
      });
    }
  }
}

export default WildEncounter;
