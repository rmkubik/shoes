import Phaser from 'phaser';

import { generateArrayFromInclusive } from '../helpers';

class Map {
  constructor({
    scene, key, layers, tilesets,
  }) {
    this.tilemap = scene.make.tilemap({ key });
    this.tilesets = tilesets.reduce((map, { tiledName, tileSetKey }) => ({
      ...map,
      [tileSetKey]: this.tilemap.addTilesetImage(tiledName, tileSetKey),
    }), {});
    this.layers = layers.reduce((map, { tiledName, tileSetKey }) => ({
      ...map,
      [tiledName]: this.tilemap.createStaticLayer(tiledName, this.tilesets[tileSetKey], 0, 0),
    }), {});

    this.layers.objects.setCollision([
      ...generateArrayFromInclusive(0, 1356),
      ...generateArrayFromInclusive(1358, 1765),
    ]);

    this.layers.objects.setTileIndexCallback(593, () => {
      console.log('grass');
    });

    // const debugGraphics = this.add.graphics();
    // map.renderDebug(debugGraphics, undefined, objectsLayer);

    // console.log(map.layers.find(layer => layer.name === 'objects').data);
  }
}

export default Map;
