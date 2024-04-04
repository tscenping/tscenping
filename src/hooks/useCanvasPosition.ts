import { useEffect, useState } from "react";

interface DrawProps {
  x: number;
  y: number;
  dx?: number;
  dy?: number;
  radius?: number;
  width: number;
  height: number;
}

interface CanvasValue {
  width: number;
  height: number;
}

const useCanvasPosition = (props: DrawProps, canvas: CanvasValue) => {
  // const returnProps: DrawProps = {

  
};

export default useCanvasPosition;
