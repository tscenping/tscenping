import { useEffect, useRef, useState } from "react";

interface DrawProps {
  x: number;
  y: number;
  radius?: number;
  width: number;
  height: number;
}

const myRacketColor = "#6DFCAF";
const rivalRacketColor = "#FFFFFF";
// const canvasColor = "#71A1FF";
const canvasColor = "#2D2D2D";
const ballColor = "#FFFFFF";

export default function GameFrame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  let racketWidth = canvasWidth * 0.25;
  let racketHeight = canvasHeight * 0.025;
  let myRacket = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  let rivalRacket = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  const x = myRacket.x + 10;
  const y = canvasHeight - canvasHeight * 0.05;
  // const width = racketWidth;
  // const height = racketHeight;
  const radius = 13;
  // ctx.fillRect(
  //   canvasWidth * 0.05,
  //   canvasHeight - canvasHeight * 0.05,
  //   canvasWidth * 0.25,
  //   canvasHeight * 0.025
  // );

  // ctx.fillRect(
  //   canvasWidth - canvasWidth * 0.3,
  //   canvasHeight * 0.025,
  //   canvasWidth * 0.25,
  //   canvasHeight * 0.025
  // );

  const drawRacket = (
    ctx: CanvasRenderingContext2D,
    props: DrawProps,
    color: string
  ) => {
    const { x, y, width, height } = props;
    ctx.shadowColor = color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = color === myRacketColor ? -4 : 4;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };
  const changeRacketPosition = () => {
    const newMyRacket = {
      x: canvasWidth * 0.05,
      y: canvasHeight - canvasHeight * 0.05,
      width: canvasWidth * 0.3,
      height: canvasHeight * 0.025,
    };
    const newRivalRacket = {
      x: canvasWidth - canvasWidth * 0.3,
      y: canvasHeight * 0.025,
      width: canvasWidth * 0.3,
      height: canvasHeight * 0.025,
    };
    return { newMyRacket, newRivalRacket };
  };

  const keyDownEventHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft": {
        if (myRacket.x - canvasWidth * 0.025 < canvasWidth * 0.05) {
          myRacket.x = canvasWidth * 0.05;
          break;
        }
        myRacket.x -= canvasWidth * 0.025;
        break;
      }

      case "ArrowRight": {
        if (myRacket.x > canvasWidth - canvasWidth * 0.05 - canvasWidth * 0.25)
          break;
        myRacket.x += canvasWidth * 0.025;
        break;
      }
      default:
        break;
    }
  };

  const keyUpEventHandler = (e: KeyboardEvent) => {};

  useEffect(() => {
    setTimeout(() => {
      if (parentRef.current) {
        setCanvasWidth(parentRef.current.clientWidth);
        setCanvasHeight(parentRef.current.clientHeight);
        racketHeight = parentRef.current.clientHeight * 0.025;
        racketWidth = parentRef.current.clientWidth * 0.25;
      }
    }, 100);
  }, [parentRef.current]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    console.log(canvasHeight, canvasWidth);
    function loop() {
      requestAnimationFrame(loop);
      if (ctx) {
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        drawRacket(ctx, myRacket, myRacketColor);
        drawRacket(ctx, rivalRacket, rivalRacketColor);
      }
    }
    const rackets = changeRacketPosition();
    myRacket = rackets.newMyRacket;
    rivalRacket = rackets.newRivalRacket;
    const animationId = requestAnimationFrame(loop);

    document.addEventListener("keydown", keyDownEventHandler);
    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("keydown", keyDownEventHandler);
    };
  }, [canvasWidth, canvasHeight]);

  return (
    <div className="w-full h-full" ref={parentRef}>
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        ref={canvasRef}
        className="w-full h-full"
      ></canvas>
    </div>
  );
}
