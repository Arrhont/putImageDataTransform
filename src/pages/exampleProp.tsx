import React, {useEffect, useRef } from "react";

const getAreaImage = (imageData: ImageData) => {
  const upperLeftAngle = { x: imageData.width, y: imageData.height };
  const bottomRightAngle = { x: 0, y: 0 };

  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3]) {
      const pixelNumber = Math.floor(i / 4);
      const x = pixelNumber % imageData.width + 1;
      const y = Math.floor(pixelNumber / imageData.width) + 1;

      if (x < upperLeftAngle.x) {
        upperLeftAngle.x = x;
      }
      if (y < upperLeftAngle.y) {
        upperLeftAngle.y = y;
      }
      if (x > bottomRightAngle.x) {
        bottomRightAngle.x = x;
      }
      if (y > bottomRightAngle.y) {
        bottomRightAngle.y = y;
      }
    }
  }

  const width = bottomRightAngle.x - upperLeftAngle.x;
  const height = bottomRightAngle.y - upperLeftAngle.y;

  return [upperLeftAngle.x, upperLeftAngle.y, width, height] as const;
};

export default function ExampleProp({
  markers,
}: { markers: { name: string; language: string }[];
}) {
  const sourceCanvasElementRef = useRef<HTMLCanvasElement>(null);
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
      sourceContext.fillRect(380, 20, 100, 100);

      sourceContext.fillStyle = "green";
      sourceContext.fillRect(45, 130, 100, 100);

      sourceContext.fillStyle = "green";
      sourceContext.fillRect(45, 240, 100, 100);

      sourceContext.fillStyle = "green";
      sourceContext.fillRect(45, 350, 100, 100);

      const contextFullImageData = sourceContext?.getImageData(
        0,
        0,
        sourceCanvasElementRef.current.width,
        sourceCanvasElementRef.current.height
      );

      const areaImage = getAreaImage(contextFullImageData);

      const imageData = sourceContext?.getImageData(...areaImage);

      if (targetContext) {
        const proxyCanvas = document.createElement("canvas");
        proxyCanvas.width = imageData.width;
        proxyCanvas.height = imageData.height;
        proxyCanvas.getContext("2d")?.putImageData(imageData, 0, 0);

        const imageDataAspectRatio = imageData.width / imageData.height;
        const targetAspectRatio = targetContext.canvas.width / targetContext.canvas.height;

        const ratioFactor = imageDataAspectRatio / targetAspectRatio

        targetContext.drawImage(
          proxyCanvas,
          0,
          0,
            ratioFactor > 1 ? targetContext.canvas.width : targetContext.canvas.width * ratioFactor,
            ratioFactor > 1 ? targetContext.canvas.height * ratioFactor : targetContext.canvas.height,
        );
      }
    }
  }, []);

  return (
    <div>

        <canvas
    style={{border: "1px solid black"}}
    ref={sourceCanvasElementRef}
    width="600"
    height="700"
    />
        <canvas
    style={{border: "1px solid black"}}
    ref={targetCanvasElementRef}
    width="200px"
    height="120px"
    />
    </div>
  );
}
