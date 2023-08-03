/* eslint-disable no-mixed-operators */
import "./App.css";
import React, { useState, useRef, useCallback } from "react";
import { Flex } from "theme-ui";
import AllButtons from "./AllButtons";
import Canvas from "./Canvas";
import {
  getInitialState,
  patchGeneratingBoxesReducer,
} from "./ButtonBehavior";

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function App() {
  const [state, setState] = useState(() => getInitialState());
  const { boxes, selectBox } = state;
  const undoStack = useRef([]);
  const undoStackPointer = useRef(-1);

  const dispatch = useCallback((action, undoable = true) => {
    setState((currentState) => {
      const [nextState, patches, inversePatches] = patchGeneratingBoxesReducer(
        currentState,
        action
      );
      if (undoable) {
        const pointer = ++undoStackPointer.current;
        undoStack.current.length = pointer;
        undoStack.current[pointer] = { patches, inversePatches };  
      }
      return nextState;
    });
  }, []);

  const createButton = () => {
    const width = Math.floor(Math.random() * (300 - 100 + 1) + 100)
    const height = Math.floor(Math.random() * (300 - 100 + 1) + 100)
    dispatch({
      type: "ADD_BOX",
      width: width,
      height: height,
      id: uuidv4(),
      color:
        `#` +
        Math.floor(16777215 * Math.random()).toString(16),
      position: {
        x: window.innerWidth * 0.8 / 2 - width / 2,
        y: window.innerHeight / 2 - height / 2,
      }
    });
  };

  const deleteButton = () => {
    dispatch({
      type: "DELETE",
    });
    dispatch({
      type: "SELECT_BOX",
      id: null
    }, false)
  }

  const undoButton = () => {
    if (undoStackPointer.current < 0) return;
    const patches = undoStack.current[undoStackPointer.current].inversePatches;
    dispatch({ type: "APPLY_PATCHES", patches }, false);
    undoStackPointer.current--;
    dispatch({
      type: "SELECT_BOX",
      id: null
    }, false)
  };

  const redoButton = () => {
    if (undoStackPointer.current === undoStack.current.length - 1) return;
    undoStackPointer.current++;
    const patches = undoStack.current[undoStackPointer.current].patches;
    dispatch({ type: "APPLY_PATCHES", patches }, false);
    dispatch({
      type: "SELECT_BOX",
      id: null
    }, false)
  };

  return (
    <Flex>
      <AllButtons
        createButton={createButton}
        undoButton={undoButton}
        undoStack={undoStack}
        redoButton={redoButton}
        deleteButton={deleteButton}
        undoStackPointer={undoStackPointer}
      />
      <Canvas boxes={boxes} dispatch={dispatch} selectedBox={selectBox}/>
    </Flex>
  );
}

export default App;
