import { useEffect, useRef } from "react";
import Container from "../components/Util/Container";

interface DrawProps {
  x: number;
  y: number;
  dx?: number;
  dy?: number;
  radius?: number;
  width: number;
  height: number;
}

interface MatchStatusData {
  myRacket: DrawProps;
  rivalRacket: DrawProps;
  ball: DrawProps;
}

let canvasHeight = 1200;
let canvasWidth = 500;
const ballRadius = 10;

const myRacket: DrawProps = {
  x: 10,
  y: canvasHeight - 20,
  dx: 0,
  dy: 0,
  height: 10,
  width: canvasHeight * 0.25,
};

const rivalRacket: DrawProps = {
  x: canvasWidth - 10 - canvasHeight * 0.25,
  y: 10,
  dx: 0,
  dy: 0,
  height: 10,
  width: canvasHeight * 0.25,
};

const ball: DrawProps = {
  x: canvasWidth / 2,
  y: canvasHeight / 2,
  dx: 0,
  dy: 0,
  width: 20,
  height: 20,
  radius: 10,
};

const myRaketColor = "#6DFCAF";
const rivalRaketColor = "#FFFFFF";
const canvasColor = "#71A1FF";
const ballColor = "#FFFFFF";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function loop() {
      requestAnimationFrame(loop);
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);

      //배경

      context.fillStyle = canvasColor;

      if (!parentRef.current) return;

      // parentRef.current.clientWidth
      // context.fillRect(0, 0, canvas.width, canvas.height);
      canvasWidth = parentRef.current.clientWidth;
      canvasHeight = parentRef.current.clientHeight;
      context.fillRect(0, 0, canvasWidth, canvasHeight);

      //중앙선
      // context.fillStyle = "lightgrey";
      // context.fillRect(0, canvas.height / 2 - 5, canvas.width, 10);

      // 라켓
      context.fillStyle = myRaketColor;
      context.fillRect(myRacket.x, myRacket.y, myRacket.width, myRacket.height);
      context.fillStyle = rivalRaketColor;
      context.fillRect(
        rivalRacket.x,
        rivalRacket.y,
        rivalRacket.width,
        rivalRacket.height
      );

      // 공
      context.fillStyle = ballColor;
      // context.fillRect(ball.x, ball.y, ball.width, ball.height)
      context.beginPath(); // 경로 그리기 시작
      context.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2); // 원 그리기
      context.fillStyle = ballColor; // 공의 색상 지정
      context.fill(); // 채우기
      context.closePath(); // 경로 그리기 종료
    }

    const animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <Container>
      <div className="w-full h-full" ref={parentRef}>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className=""
        ></canvas>
      </div>
    </Container>
  );
}
