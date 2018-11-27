import Phaser from 'phaser';
import Trainer from '../prefabs/trainer';
import WildEncounter from '../prefabs/wildEncounter';
import OneWayGate from '../prefabs/oneWayGate';
import { getMapItem } from '../state/map';

class Map {
  constructor({
    scene, layers, tilesets,
  }) {
    this.scene = scene;
    this.offset = {
      x: 0,
    };

    // this.tilemap = scene.make.tilemap({ key });
    this.tilemap = this.scene.make.tilemap({
      tileWidth: 16, tileHeight: 16, width: 30, height: 105,
    });

    this.objectMap = {
      21: Trainer,
      8: WildEncounter,
      7: OneWayGate,
    };

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
        this.offset.x,
        0,
      ),
    }), {});

    this.maps = {
      house: this.scene.make.tilemap({ key: 'house' }),
      clearing: this.scene.make.tilemap({ key: 'clearing' }),
      clearing2: this.scene.make.tilemap({ key: 'clearing2' }),
      narrows: this.scene.make.tilemap({ key: 'narrows' }),
      cobbler: this.scene.make.tilemap({ key: 'cobbler' }),
      clearingTrainer: this.scene.make.tilemap({ key: 'clearingTrainer' }),
      splitTwoGrass: this.scene.make.tilemap({ key: 'splitTwoGrass' }),
      splitThreeGrass: this.scene.make.tilemap({ key: 'splitThreeGrass' }),
      empty: this.scene.make.tilemap({ key: 'empty' }),
      finalBoss: this.scene.make.tilemap({ key: 'finalBoss' }),
    };

    this.encounterSpacing = 15;
    this.scene.state.map.forEach((encounter, index) => {
      const mapLayerData = this.getMapLayerData(encounter.mapKey);
      // remove obkectMap indices --> -1
      // create special objects like trainers
      const objects = this.getObjectsFromLayerData(mapLayerData);
      mapLayerData.objects = this.pruneObjectTiles(mapLayerData);
      this.setMapDataLayer(mapLayerData, { x: 0, y: index * this.encounterSpacing });
      this.createObjects(objects, index);
    });

    // add 1 to index for some reason?
    // this.layers.objects.setCollisionByExclusion([-1, 593, 650, 1362, 1363]);
    this.layers.objects.setCollisionByExclusion([-1, 7, 8]);

    // grass
    // this.layers.objects.setTileIndexCallback(593, () => this.scene.sceneTransition('battle'));
    // this.layers.objects.setTileIndexCallback(650, () => this.scene.sceneTransition('battle'));
    // doors
    this.layers.objects.setTileIndexCallback(152, () => this.scene.sceneTransition('shop'));


    if (this.debug) {
      const debugGraphics = this.scene.add.graphics();
      this.tilemap.renderDebug(debugGraphics, undefined, this.layers.objects);
    }
  }

  createObjects(objects, index) {
    const sortedObjects = [...objects].sort((a, b) => a.x - b.x);
    let encounterIndex = 0;

    return sortedObjects.forEach((object) => {
      const y = (this.tilemap.tileHeight * index * this.encounterSpacing)
        + (object.y * this.tilemap.tileHeight);

      this.scene.objects.add(new this.objectMap[object.index]({
        scene: this.scene,
        position: {
          x: this.offset.x + (object.x * this.tilemap.tileWidth),
          y,
        },
        encounterIndex,
        state: getMapItem(this.scene.state, this.calcMapIndex(y), encounterIndex),
      }));

      // TODO: THIS IS ANOTHER HACK. If the object index matches the WildEncounter or Trainer then
      // we need to incremement the encounterIndex.
      if (object.index === 8 || object.index === 21) {
        encounterIndex += 1;
      }
    });
  }

  getObjectsFromLayerData(layerData) {
    return layerData.objects.reduce((objects, row) => {
      row.forEach((tile) => {
        if (this.objectMap[tile.index]) {
          objects.push(tile);
        }
      });
      return objects;
    }, []);
  }

  pruneObjectTiles(layerData) {
    return layerData.objects.map(row => row.map(tile => (this.objectMap[tile.index] ? -1 : tile)));
  }

  getMapLayerData(key) {
    return this.maps[key].layers.reduce((layers, layer) => ({
      ...layers,
      [layer.name]: layer.data,
    }), {});
  }

  setMapDataLayer(mapLayerData, position) {
    Object.entries(mapLayerData).forEach(([layerName, layerData]) => {
      this.layers[layerName].putTilesAt(layerData, position.x, position.y);
    });
  }

  calcMapIndex(y) {
    return Math.floor(y / (this.encounterSpacing * this.tilemap.tileHeight));
  }

  getMapIndex(object) {
    return this.calcMapIndex(object.y);
  }
}

export default Map;
