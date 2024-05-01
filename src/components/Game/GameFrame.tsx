import { useEffect, useRef, useState } from "react";
import { gameSocket } from "socket/GameSocket";
import { useGameMatchState } from "store/game";
import { ObjectType } from "types/GameTypes";

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

export default function GameFrame() {
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

  // const width = racketWidth;
  // const height = racketHeight;
  const radius = 5;
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
    const { x, y } = props;
    // x 1200 y 800
    let yCoordinate = (x / 1200) * canvasHeight;
    let xCoordinate = (y / 800) * canvasWidth;
    ctx.shadowColor = color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = color === myRacketColor ? -4 : 4;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(xCoordinate + radius, yCoordinate);
    ctx.lineTo(xCoordinate + racketWidth - radius, yCoordinate);
    ctx.arcTo(
      xCoordinate + racketWidth,
      yCoordinate,
      xCoordinate + racketWidth,
      yCoordinate + radius,
      radius
    );
    ctx.lineTo(xCoordinate + racketWidth, yCoordinate + racketHeight - radius);
    ctx.arcTo(
      xCoordinate + racketWidth,
      yCoordinate + racketHeight,
      xCoordinate + racketWidth - radius,
      yCoordinate + racketHeight,
      radius
    );
    ctx.lineTo(xCoordinate + radius, yCoordinate + racketHeight);
    ctx.arcTo(
      xCoordinate,
      yCoordinate + racketHeight,
      xCoordinate,
      yCoordinate + racketHeight - radius,
      radius
    );
    ctx.lineTo(xCoordinate, yCoordinate + radius);
    ctx.arcTo(
      xCoordinate,
      yCoordinate,
      xCoordinate + radius,
      yCoordinate,
      radius
    );
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  };

  const keyUpEventHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "up",
        keyName: "arrowUp",
      });
      // myRacket.dy = 0
    } else if (e.key === "ArrowRight") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "up",
        keyName: "arrowDown",
      });
      // myRacket.dy = 0
    }
  };

  const keyDownEventHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "down",
        keyName: "arrowDown",
      });
      console.log("arrowDown", 2);
    } else if (e.key === "ArrowLeft") {
      gameSocket.emit("matchKeyDown", {
        gameId: gameId,
        keyStatus: "down",
        keyName: "arrowUp",
      });
      console.log("arrowUp");
    }
  };

  const matchStatusHandler = (data: MatchStatus) => {
    myRacket.x = data.myRacket.x;
    myRacket.y = data.myRacket.y;
    rivalRacket.x = data.rivalRacket.x;
    rivalRacket.y = data.rivalRacket.y;
    ball.x = data.ball.x;
    ball.y = data.ball.y;
  };

  useEffect(() => {
    gameSocket.on("matchStatus", matchStatusHandler);
    return () => {
      gameSocket.off("matchStatus", matchStatusHandler);
    };
  });

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
        // context.fillRect(ball.x, ball.y, ball.width, ball.height)
        // console.log(ball)
        ctx.beginPath(); // 경로 그리기 시작
        ctx.arc(
          (ball.y / 800) * canvasWidth,
          (ball.x / 1200) * canvasHeight,
          10,
          0,
          Math.PI * 2
        ); // 원 그리기
        console.log(ball);
        ctx.fillStyle = ballColor; // 공의 색상 지정
        ctx.fill(); // 채우기
        ctx.closePath(); // 경로 그리기 종료
      }
    }
    myRacket.x++;
    ball.x++;
    // const rackets = changeRacketPosition();
    // myRacket = rackets.newMyRacket;
    // rivalRacket = rackets.newRivalRacket;
    // racketHeight = rackets.newRacketHeight;
    // racketWidth = rackets.newRacketWidth;
    const animationId = requestAnimationFrame(loop);
    // gameSocket.on("matchStatus", matchStatusHandler);

    document.addEventListener("keydown", keyDownEventHandler);
    document.addEventListener("keyup", keyUpEventHandler);
    return () => {
      cancelAnimationFrame(animationId);
      // gameSocket.off("matchStatus", matchStatusHandler);
      document.removeEventListener("keydown", keyDownEventHandler);
      document.removeEventListener("keyup", keyUpEventHandler);
      // document.removeEventListener("keydown", keyDownEventHandler);
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

// const keyDownEventHandler = (e: KeyboardEvent) => {
//   switch (e.key) {
//     case "ArrowLeft": {
//       if (myRacket.x - canvasWidth * 0.025 < canvasWidth * 0.05) {
//         myRacket.x = canvasWidth * 0.05;
//         break;
//       }
//       myRacket.x -= canvasWidth * 0.025;
//       break;
//     }

//     case "ArrowRight": {
//       if (myRacket.x > canvasWidth - canvasWidth * 0.05 - canvasWidth * 0.25)
//         break;
//       myRacket.x += canvasWidth * 0.025;
//       break;
//     }
//     default:
//       break;
//   }
// };
