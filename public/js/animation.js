export function createAnimation(frames, frameLen) {
    return function drawAnimationTile(distance) {
        const frameIndex = Math.floor(distance / frameLen) % frames.length;
        const framName = frames[frameIndex];
        return framName;
    }
}