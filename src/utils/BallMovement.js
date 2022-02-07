export default function BallMovement(ctx, ballObj) {
    let data = new Ball(ballObj.x, ballObj.y, ballObj.rad)
    data.draw(ctx)
    ballObj.x += ballObj.dx
    ballObj.y += ballObj.dy

}
class Ball {
    constructor(x, y ,rad) {
        this.x = x
        this.y = y
        this.rad = rad
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.rad,3, 3 * Math.PI)
        ctx.fillStyle = "yellow"
        ctx.stroke()
        ctx.fill()
    }
}
