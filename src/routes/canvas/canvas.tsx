import React, { useRef, useEffect } from "react";

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas = ({ width, height }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context == null) throw new Error("Could not get context");
      canvas.addEventListener("click", addInput, false);
    }
  }, []);

  const addElement = (event: MouseEvent) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context == null) throw new Error("Could not get context");
      const r = canvas.getBoundingClientRect();
      const x = event.clientX - r.left;
      const y = event.clientY - r.top;
      context.font = "30px Arial";
      context.fillText("Hello World", x, y);
    }
  };

  const addInput = (event: MouseEvent) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context == null) throw new Error("Could not get context");
      const input = document.createElement("input");
      const r = canvas.getBoundingClientRect();
      const x = event.clientX - r.left;
      const y = event.clientY - r.top;
      input.type = "text";
      input.style.position = "fixed";
      input.style.left = x - 4 + "px";
      input.style.top = y - 4 + "px";

      // check if enter pressed
      input.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.keyCode === 13) {
          context.font = "30px Arial";
          context.fillText(input.value, x, y);
          input.remove();
        }
      });

      input.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
          input.remove();
        }
      });

      document.body.appendChild(input);

      input.focus();
    }
  };

  return <canvas ref={canvasRef} height={height} width={width} />;
};

Canvas.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default Canvas;
