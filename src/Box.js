import React, { useEffect, useRef, useState } from "react";
import ResizableRect from "react-resizable-rotatable-draggable";

const RenderBox = ({
  box,
  dispatch,
  selectedBox,
}) => {

  const ref = useRef();
  const [width, setWidth] = useState(box.width);
  const [height, setHeight] = useState(box.height);
  const [top, setTop] = useState(box.position.y);
  const [left, setLeft] = useState(box.position.x);

  useEffect(() => {
    setTop(box.position.y)
    setLeft(box.position.x)
    setWidth(box.width)
    setHeight(box.height)
  }, [box])

  const handleUp = () => {
    dispatch({
      type: "RESIZE_BOX",
      position: {
        x: left,
        y: top,
      },
      width,
      height
    });
  };

  const handleDragEnd = () => {
    dispatch({
      type: "MOVE_BOX",
      position: {
        x: left,
        y: top,
      },
    });
  };

  const handleResize = (style) => {
    const { top, left, width, height } = style;
    setWidth(Math.round(width));
    setHeight(Math.round(height));
    setTop(Math.round(top));
    setLeft(Math.round(left));
  };

  const handleDrag = (deltaX, deltaY) => {
    setLeft(left + deltaX);
    setTop(top + deltaY);
  };

  return (
    <>
      <div
        style={{
          top,
          left,
          width,
          height,
          backgroundColor: box.color,
          position: "absolute",
        }}
        onClick={() =>
          dispatch(
            {
              type: "SELECT_BOX",
              id: box.id,
            },
            false
          )
        }
      ></div>
      {selectedBox === box.id && (
        <ResizableRect
          ref={ref}
          top={top}
          left={left}
          minWidth={10}
          width={width}
          minHeight={10}
          height={height}
          onDrag={handleDrag}
          onResize={handleResize}
          onResizeEnd={handleUp}
          onDragEnd={handleDragEnd}
          zoomable="nw, ne, se, sw"
        />
      )}
    </>
  );
};

export default RenderBox;
