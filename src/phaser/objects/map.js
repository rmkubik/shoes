import Phaser from 'phaser';

class Map {
  constructor({
    scene, layers, tilesets,
  }) {
    // this.tilemap = scene.make.tilemap({ key });
    this.tilemap = scene.make.tilemap({
      tileWidth: 16, tileHeight: 16, width: 15, height: 100,
    });

    this.tilesets = tilesets.reduce((map, {
      tiledName, tileSetKey, margin, spacing, gid,
    }) => ({
      ...map,
      [tileSetKey]: this.tilemap.addTilesetImage(
        tiledName,
        tileSetKey,
        undefined,
        undefined,
        margin,
        spacing,
        gid,
      ),
    }), {});

    this.layers = layers.reduce((map, { tiledName, tileSetKey }) => ({
      ...map,
      [tiledName]: this.tilemap.createBlankDynamicLayer(
        tiledName,
        this.tilesets[tileSetKey],
        120,
        0,
      ),
    }), {});

    this.maps = {
      house: scene.make.tilemap({ key: 'house' }),
      clearing: scene.make.tilemap({ key: 'clearing' }),
      clearing2: scene.make.tilemap({ key: 'clearing2' }),
      narrows: scene.make.tilemap({ key: 'narrows' }),
      cobbler: scene.make.tilemap({ key: 'cobbler' }),
    };

    this.encounterSpacing = 10;
    scene.state.map.forEach((encounter, index) => {
      this.setMapDataLayer(encounter.mapKey, { x: 0, y: index * this.encounterSpacing });
    });

    // add 1 to index for some reason?
    this.layers.objects.setCollisionByExclusion([-1, 593, 650, 1362, 1363]);

    this.layers.objects.setTileIndexCallback(593, scene.startBattleTransition);
    this.layers.objects.setTileIndexCallback(650, scene.startBattleTransition);

    if (this.debug) {
      const debugGraphics = scene.add.graphics();
      this.tilemap.renderDebug(debugGraphics, undefined, this.layers.objects);
    }
  }

  getMapLayerData(key) {
    return this.maps[key].layers.reduce((layers, layer) => ({
      ...layers,
      [layer.name]: layer.data,
    }), {});
  }

  setMapDataLayer(key, position) {
    const mapLayerData = this.getMapLayerData(key);
    Object.entries(mapLayerData).forEach(([layerName, layerData]) => {
      this.layers[layerName].putTilesAt(layerData, position.x, position.y);
    });
  }

  getEncounterIndex(object) {
    return Math.floor(object.y / (this.encounterSpacing * this.tilemap.tileHeight));
  }
}

export default Map;
