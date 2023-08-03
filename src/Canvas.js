import React, {useEffect} from "react";
import { Box } from "theme-ui";
import RenderBox from "./Box";

const Canvas = ({ boxes, moveElement, selectedBox, dispatch, resizeElement }) => {
  const [stateBoxes, setStateBoxes] = React.useState(boxes)

  useEffect(() => {
    setStateBoxes(boxes)
  }, [boxes])


  return (
    <Box
      sx={{
        width: "80%",
        backgroundColor: "white",
        height: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {Object.values(stateBoxes).map((box) => (
        <RenderBox box={box} dispatch={dispatch} resizeElement={resizeElement} moveElement={moveElement} selectedBox={selectedBox}/>
      ))}
    </Box>
  );
};

export default Canvas;
