import { useEffect, useRef, useState } from "react";
import { gameSocket } from "socket/GameSocket";
import { useGameMatchState } from "store/game";
import { MatchDataType, ObjectType } from "types/GameTypes";

interface DrawProps {
  x: number;
  y: number;
  radius?: number;
}

interface MatchStatus {
  myRacket: ObjectType;
  rivalRacket: ObjectType;
  ball: ObjectType;
}

const myRacketColor = "#6DFCAF";
const rivalRacketColor = "#FFFFFF";
// const canvasColor = "#71A1FF";
const canvasColor = "#2D2D2D";
const ballColor = "#FFFFFF";

export default function GameFrame({ props }: { props: MatchDataType }) {
  const { gameId } = useGameMatchState();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  let racketWidth = canvasWidth * 0.25;
  let racketHeight = canvasHeight * 0.025;
  const ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
  };
  const myRacket = {
    x: 10,
    y: 10,
  };

  const rivalRacket = {
    x: canvasWidth - racketWidth - 10,
    y: 0,
  };

  let radius = 5;
  let rightPressed = false;
  let leftPressed = false;

  const leftKey = (value: "down" | "up") => {
    if (value === "down") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "up",
        keyName: props.myPosition === "LEFT" ? "arrowUp" : "arrowDown",
      });
    } else if (value === "up") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "down",
        keyName: props.myPosition === "LEFT" ? "arrowDown" : "arrowUp",
      });
    }
  };

  const rightKey = (value: "down" | "up") => {
    if (value === "down") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "up",
        keyName: props.myPosition === "LEFT" ? "arrowDown" : "arrowUp",
      });
    } else if (value === "up") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "down",
        keyName: props.myPosition === "LEFT" ? "arrowUp" : "arrowDown",
      });
    }
  };

  const drawRacket = (
    ctx: CanvasRenderingContext2D,
    props: DrawProps,
    color: string
  ) => {
    const { x, y } = props;
    // x 1200 y 800
    // let y = (x / 1200) * canvasHeight;
    // let x = (y / 800) * canvasWidth;
    ctx.shadowColor = color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = color === myRacketColor ? -4 : 4;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + racketWidth - radius, y);
    ctx.arcTo(x + racketWidth, y, x + racketWidth, y + radius, radius);
    ctx.lineTo(x + racketWidth, y + racketHeight - radius);
    ctx.arcTo(
      x + racketWidth,
      y + racketHeight,
      x + racketWidth - radius,
      y + racketHeight,
      radius
    );
    ctx.lineTo(x + radius, y + racketHeight);
    ctx.arcTo(x, y + racketHeight, x, y + racketHeight - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };

  const keyUpEventHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "up",
        keyName: props.myPosition === "LEFT" ? "arrowUp" : "arrowDown",
      });
      // myRacket.dy = 0
    } else if (e.key === "ArrowRight") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "up",
        keyName: props.myPosition === "LEFT" ? "arrowDown" : "arrowUp",
      });
      // myRacket.dy = 0
    }
  };

  const keyDownEventHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "down",
        keyName: props.myPosition === "LEFT" ? "arrowUp" : "arrowDown",
      });
    } else if (e.key === "ArrowLeft") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "down",
        keyName: props.myPosition === "LEFT" ? "arrowDown" : "arrowUp",
      });
    }
  };

  // let y = (x / 1200) * canvasHeight;
  // let x = (y / 800) * canvasWidth;
  const matchStatusHandler = (data: MatchStatus) => {
    if (props.myPosition === "LEFT") {
      myRacket.x =
        canvasWidth - (data.myRacket.y / 800) * canvasWidth - racketWidth;
      myRacket.y =
        canvasHeight - (data.myRacket.x / 1200) * canvasHeight - racketHeight;
      rivalRacket.x =
        canvasWidth - (data.rivalRacket.y / 800) * canvasWidth - racketWidth;
      rivalRacket.y = canvasHeight - (data.rivalRacket.x / 1200) * canvasHeight;
    } else {
      myRacket.x = (data.myRacket.y / 800) * canvasWidth;
      myRacket.y = (data.myRacket.x / 1200) * canvasHeight - racketHeight / 2;
      rivalRacket.x = (data.rivalRacket.y / 800) * canvasWidth;
      rivalRacket.y = (data.rivalRacket.x / 1200) * canvasHeight;
    }
    ball.x = data.ball.x;
    ball.y = data.ball.y;
  };

  useEffect(() => {
    setTimeout(() => {
      if (parentRef.current) {
        setCanvasWidth(parentRef.current.clientWidth);
        setCanvasHeight(parentRef.current.clientHeight);
        //eslint-disable-next-line react-hooks/exhaustive-deps
        racketHeight = parentRef.current.clientHeight * 0.025;
        //eslint-disable-next-line react-hooks/exhaustive-deps
        racketWidth = parentRef.current.clientWidth * 0.25;
      }
    }, 100);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentRef.current]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    function loop() {
      requestAnimationFrame(loop);
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = canvasColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        drawRacket(ctx, myRacket, myRacketColor);
        drawRacket(ctx, rivalRacket, rivalRacketColor);
        ctx.shadowColor = ballColor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        ctx.fillStyle = ballColor;
        ctx.beginPath(); // 경로 그리기 시작
        ctx.arc(
          props.myPosition === "LEFT"
            ? canvasWidth - (ball.y / 800) * canvasWidth
            : (ball.y / 800) * canvasWidth,
          props.myPosition === "LEFT"
            ? canvasHeight - (ball.x / 1200) * canvasHeight
            : (ball.x / 1200) * canvasHeight,
          canvasWidth * 0.02,
          0,
          Math.PI * 2
        ); // 원 그리기
        // console.log(ball);
        ctx.fillStyle = ballColor; // 공의 색상 지정
        ctx.fill(); // 채우기
        ctx.closePath(); // 경로 그리기 종료
      }
    }
    myRacket.x++;
    ball.x++;
    const animationId = requestAnimationFrame(loop);
    gameSocket.on("matchStatus", matchStatusHandler);
    document.addEventListener("keydown", keyDownEventHandler);
    document.addEventListener("keyup", keyUpEventHandler);
    return () => {
      cancelAnimationFrame(animationId);
      gameSocket.off("matchStatus", matchStatusHandler);
      document.removeEventListener("keydown", keyDownEventHandler);
      document.removeEventListener("keyup", keyUpEventHandler);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasWidth, canvasHeight]);

  const touchStartHandler = (value: "LEFT" | "RIGHT") => () => {
    if (value === "LEFT" && !leftPressed) {
      leftKey("down");
      leftPressed = true;
      console.log("leftStart");
    } else if (value === "RIGHT" && !rightPressed) {
      rightKey("down");
      console.log("rightStart");
      rightPressed = true;
    }
  };
  const touchEndHandler = (value: "LEFT" | "RIGHT") => () => {
    if (value === "LEFT" && leftPressed) {
      leftKey("up");
      console.log("leftEnd");
      leftPressed = false;
    } else if (value === "RIGHT" && rightPressed) {
      rightKey("up");
      console.log("rightEnd");
      rightPressed = false;
    }
  };

  return (
    <div className="relative w-full h-full" ref={parentRef}>
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        ref={canvasRef}
        className="w-full h-full"
      ></canvas>
      <div
        className="absolute top-0 w-1/2 h-full"
        onTouchStart={touchStartHandler("LEFT")}
        onTouchEnd={touchEndHandler("LEFT")}
      ></div>
      <div
        className="absolute top-0 right-0 w-1/2 h-full"
        onTouchStart={touchStartHandler("RIGHT")}
        onTouchEnd={touchEndHandler("RIGHT")}
      ></div>
    </div>
  );
}
