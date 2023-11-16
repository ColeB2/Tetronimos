import { useRef, useEffect } from 'react'

interface UseCanvasProps {
    draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
}

const useCanvas = ({ draw }: UseCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const context = canvasRef.current?.getContext('2d');
        let frameCount: number = 0
        let animationFrameId: number
        
        if (context) {
            const render = () => {
                frameCount++
                draw(context, frameCount)
                animationFrameId = window.requestAnimationFrame(render)
            }
            render()
        }
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])
    return canvasRef
}

export default useCanvas