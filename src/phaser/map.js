import Phaser from 'phaser';

import { generateArrayFromInclusive } from '../helpers';

class Map {
  constructor({
    scene, key, layers, tilesets,
  }) {
    // this.tilemap = scene.make.tilemap({ key });
    this.tilemap = scene.make.tilemap({
      tileWidth: 16, tileHeight: 16, width: 15, height: 100,
    });

    this.tilesets = tilesets.reduce((map, {
      tiledName, tileSetKey, margin, spacing, gid,
    }) => ({
      ...map,
      [tileSetKey]: this.tilemap.addTilesetImage(tiledName, tileSetKey, undefined, undefined, margin, spacing, gid),
    }), {});

    this.layers = layers.reduce((map, { tiledName, tileSetKey }) => ({
      ...map,
      // [tiledName]: this.tilemap.createStaticLayer(tiledName, this.tilesets[tileSetKey], 0, 0),
      [tiledName]: this.tilemap.createBlankDynamicLayer(tiledName, this.tilesets[tileSetKey], 0, 0),
    }), {});

    this.layers.objects.setCollision([
      ...generateArrayFromInclusive(0, 592),
      ...generateArrayFromInclusive(594, 649),
      ...generateArrayFromInclusive(651, 1356),
      ...generateArrayFromInclusive(1358, 1765),
    ]);

    this.layers.objects.setTileIndexCallback(593, scene.startBattleTransition);
    this.layers.objects.setTileIndexCallback(650, scene.startBattleTransition);

    // this.layers.objects.putTilesAt([0], 0, 0);

    this.maps = {
      clearing: scene.make.tilemap({ key: 'clearing' }),
      clearing2: scene.make.tilemap({ key: 'clearing2' }),
    };

    this.setMapDataLayer('clearing', { x: 0, y: 0 });
    this.setMapDataLayer('clearing2', { x: 0, y: 10 });

    // const debugGraphics = this.add.graphics();
    // map.renderDebug(debugGraphics, undefined, objectsLayer);

    // console.log(map.layers.find(layer => layer.name === 'objects').data);
  }

  static convertTilesToData(tiles) {
    return tiles.map(row => row.map(tile => tile.index));
  }

  getMapLayerData(key) {
    return this.maps[key].layers.reduce((layers, layer) => ({
      ...layers,
      [layer.name]: layer.data, // Map.convertTilesToData(layer.data),
    }), {});
  }

  setMapDataLayer(key, position) {
    const mapLayerData = this.getMapLayerData(key);
    Object.entries(mapLayerData).forEach(([layerName, layerData]) => {
      this.layers[layerName].putTilesAt(layerData, position.x, position.y);
    });
  }
}

export default Map;
