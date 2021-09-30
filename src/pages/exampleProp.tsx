import React, { useEffect, useRef } from "react";
import { createNoSubstitutionTemplateLiteral } from "typescript";

export default function ExampleProp({
  markers,
}: {
  markers: { name: string; language: string }[];
}) {
  // const p: JSX.Element[][] = markers.map((marker) =>
  //   Object.values(marker).map((value) => <div>{value}</div>)
  // );

  const sourceCanvasElementRef = useRef<HTMLCanvasElement>(null);
  const sourceCanvasElementRef2 = useRef<HTMLCanvasElement>(null);
  const targetCanvasElementRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!sourceCanvasElementRef.current || !targetCanvasElementRef.current)
      return;

    const sourceContext = sourceCanvasElementRef.current?.getContext("2d");
    const targetContext = targetCanvasElementRef.current?.getContext("2d");

    if (sourceContext) {
      sourceContext.beginPath();
      sourceContext.moveTo(125, 125);
      sourceContext.lineTo(125, 20);
      sourceContext.lineTo(45, 125);
      sourceContext.closePath();
      sourceContext.stroke();

      sourceContext.fillStyle = "orange";
      sourceContext.fillRect(160, 20, 100, 100);

      sourceContext.fillStyle = "red";
      sourceContext.fillRect(160, 130, 100, 100);

      sourceContext.fillStyle = "red";
      sourceContext.fillRect(270, 130, 100, 100);

      sourceContext.fillStyle = "red";
      sourceContext.fillRect(380, 130, 100, 100);

      sourceContext.fillStyle = "green";
      sourceContext.fillRect(45, 130, 100, 100);

      sourceContext.fillStyle = "green";
      sourceContext.fillRect(45, 240, 100, 100);

      sourceContext.fillStyle = "green";
      sourceContext.fillRect(45, 350, 100, 100);

      const contextFullImageData = sourceContext?.getImageData(
        0,
        0,
        sourceCanvasElementRef.current.offsetWidth,
        sourceCanvasElementRef.current.offsetHeight
      );

      const areaImage = getAreaImage(contextFullImageData);

      const imageData = sourceContext?.getImageData(
        areaImage.minX,
        areaImage.minY,
        areaImage.maxX,
        areaImage.maxY
      );

      if (targetContext) {
        const proxyCanvas = document.createElement("canvas");
        proxyCanvas.width = imageData.width;
        proxyCanvas.height = imageData.height;
        proxyCanvas.getContext("2d")?.putImageData(imageData, 0, 0);

        const scaleX = imageData.width / targetCanvasElementRef.current.width;
        const scaleY = imageData.height / targetCanvasElementRef.current.height;
        const scale = Math.min(scaleX, scaleY);

        console.log(imageData);

        targetContext.drawImage(
          proxyCanvas,
          0,
          0,
          targetCanvasElementRef.current.width,
          targetCanvasElementRef.current.height
        );
      }
    }
  }, []);

  const getAreaImage = (imageData: ImageData) => {
    let curPixX = 0;
    let curPixY = 0;
    const upperLeftAngle = { x: imageData.width, y: imageData.height };
    const bottomRightAngle = { x: 0, y: 0 };
    for (let i = 0; i < imageData.data.length; i++) {
      if (i % 4 === 0) {
        curPixX++;
      }
      if (imageData.data[i + 4] && curPixX < upperLeftAngle.x) {
        upperLeftAngle.x = curPixX;
      }
      if (imageData.data[i + 4] && curPixY < upperLeftAngle.y) {
        upperLeftAngle.y = curPixY;
      }
      if (imageData.data[i + 4] && curPixX > bottomRightAngle.x) {
        bottomRightAngle.x = curPixX;
      }
      if (imageData.data[i + 4] && curPixY > bottomRightAngle.y) {
        bottomRightAngle.y = curPixY;
      }
      if (curPixX === imageData.width) {
        curPixY++;
        curPixX = curPixY === imageData.height ? curPixX : 0;
      }
    }

    return {
      minX: upperLeftAngle.x,
      minY: upperLeftAngle.y,
      maxX: bottomRightAngle.x,
      maxY: bottomRightAngle.y,
    };
  };

  return (
    <>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "600px",
        }}
      >
        <canvas
          style={{ border: "1px solid black" }}
          ref={sourceCanvasElementRef}
          width="600"
          height="700"
        ></canvas>
        <canvas
          style={{ border: "1px solid black" }}
          ref={sourceCanvasElementRef2}
          width="600"
          height="700"
        ></canvas>
      </div>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "120px",
        }}
      >
        <canvas
          style={{ border: "1px solid black" }}
          ref={targetCanvasElementRef}
          height="120"
        ></canvas>
      </div>
    </>
  );
}
