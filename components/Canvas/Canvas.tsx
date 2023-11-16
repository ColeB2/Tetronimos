import React from "react";
import useCanvas from "./useCanvas";



interface CanvasProps {
    width: number;
    height: number;
    draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;

}


const Canvas = ({height, width, draw}: CanvasProps) => {
    const canvasRef = useCanvas({ draw });

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            height={height}
            width={width}
        />
    )
}

export default Canvas