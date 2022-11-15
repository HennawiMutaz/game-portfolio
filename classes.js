class Sprite {
    constructor({position, velocity, image, frames = { max: 1 }, sprites}) {
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};
        this.image.onload = () => {
            this.width = this.image.width / frames.max;
            this.height = this.image.height;
        }
        this.moving = false;
        this.sprites = sprites;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frames.val * this.width, // crop x start pos
            0, // crop y start pos
            this.image.width / this.frames.max, // crop width (end pos)
            this.image.height, // crop height (end pos)
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max, // width of cropped image that should be drawn on canvas
            this.image.height, // height of cropped image that should be drawn on canvas
            );

            if (!this.moving) return;

            if (this.frames.max > 1) this.frames.elapsed++;

            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1) this.frames.val++; //total of 4 frames [0,1,2,3] for character movements
                else this.frames.val = 0;                
            }
        }
}

class Boundary {
    static width = 48;
    static height = 48;
    constructor({position}) {
        this.position = position;
        // 12px X 12px originally => 12 * 4 (zoomed in 400%) = 48px X 48px
        this.width = 48; 
        this.height = 48;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 0, 0, 0)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}