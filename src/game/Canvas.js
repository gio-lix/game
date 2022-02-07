import React, {useEffect, useLayoutEffect, useRef} from 'react';
import BallMovement from "../utils/BallMovement";
import data from '../data'
import WallHit from "../utils/WallHit";
import PaddleRect from "./Paddle";
import Brick from "./Brick";
import BrickCollision from "../utils/BrickHit";
import PaddleHit from "../utils/PaddleHit";
import PlayerStats from "../utils/PlayerState";
import AllBroken from "../utils/AllBroke";

let bricks = [];

const Canvas = () => {
    const canvasRef = useRef(null)
    const {ballObj, paddleProps, player,brickObj} = data
    useLayoutEffect(() => {
        const render = () => {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")

            paddleProps.y = canvas.height - 30
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // ball and wall Collision
            WallHit(ballObj, canvas, player,paddleProps)
            AllBroken(bricks,player,canvas,ballObj)

            PlayerStats(ctx,player, canvas )
            //brick
            let newBrickSet = Brick(player.level, bricks, canvas, brickObj);

            if (newBrickSet && newBrickSet.length > 0) {
                bricks = newBrickSet;
            }
            bricks.map((brick) => {
                return brick.draw(ctx);
            });

            // handle ball Movement
            BallMovement(ctx, ballObj)

            let breakCollision;
            for (let i = 0; i < bricks.length; i++) {
                breakCollision = BrickCollision(ballObj, bricks[i]);

                if (breakCollision.hit && !bricks[i].broke) {
                    if (breakCollision.axis === "X") {
                        ballObj.dx *= -1;
                        bricks[i].broke = true;
                    } else if (breakCollision.axis === "Y") {
                        ballObj.dy *= -1;
                        bricks[i].broke = true;
                    }
                    player.score += 10;

                }
            }


            PaddleRect(ctx, canvas, paddleProps)

            PaddleHit(ballObj, paddleProps)

            requestAnimationFrame(render)
        }
        render()
    }, [])

    return (
        <canvas onMouseMove={(e) => paddleProps.x = e.clientX - 155 } ref={canvasRef} width="700" height="500" className='border border-black bg-gray-700'/>
    );
};

export default Canvas;
