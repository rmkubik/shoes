import Phaser from 'phaser';

const fragShader = `
  precision mediump float;

  uniform sampler2D uMainSampler;
  uniform float time;

  varying vec2 outTexCoord;

  #define SPEED 5.0

  void main(void)
  {
    // float radius = time;
    // float center_x = 0;
    // float center_y = 0;

    // if (pow(outTexCoord.x - center_x, 2) + pow(outTexCoord.y - center_y, 2) < pow(radius, 2)) {
    if (outTexCoord.x > time * SPEED) {
      gl_FragColor = texture2D(uMainSampler, outTexCoord);
    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  }
`;

class BattleTransitionPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
  constructor(game) {
    super({ game, renderer: game.renderer, fragShader });
  }
}

export default BattleTransitionPipeline;
