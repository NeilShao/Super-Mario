export default class SpriteSheet {
  constructor(image, width, height) {
      this.image = image;
      this.width = width;
      this.height = height;
      this.tiles = new Map();
      this.animations = new Map();
  }

  define(name, x, y, width, height) {
      const buffers = [false, true].map(flip => {
          const buffer = document.createElement('canvas');
          buffer.width = width;
          buffer.height = height;
          const context = buffer.getContext('2d');

          if (flip) {
              context.scale(-1, 1);
              context.translate(-width, 0);
          }

          context.drawImage(
              this.image,
              x,
              y,
              width,
              height,
              0,
              0,
              width,
              height
          );
          return buffer;
      })

      this.tiles.set(name, buffers)
  }

  defineAnimation(name, animation) {
      this.animations.set(name, animation);
  }

  defineTile(name, x, y) {
      this.define(name, x * this.width, y * this.height, this.width, this.height)
  }

  draw(name, context, x, y, flip = false) {
      const buffer = this.tiles.get(name);
      if (!buffer) {
          return;
      }
      context.drawImage(buffer[flip ? 1 : 0], x, y)
  }

  drawAnimation(name, context, x, y, distance, flip) {
      const animation = this.animations.get(name);
      if (animation) {
          this.draw(animation(distance), context, x, y, flip);
      }
  }

  drawAnimationTile(name, context, x, y, distance) {
    const animation = this.animations.get(name);
    if (animation) {
        this.drawTile(animation(distance), context, x, y);
    }
}

  drawTile(name, context, x, y) {
      this.draw(name, context, x * this.width, y * this.height)
  }
}