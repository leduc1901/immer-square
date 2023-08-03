/* eslint-disable default-case */
import  { produceWithPatches, applyPatches } from "immer";

export const boxAction = (draft, action) => {
  const { width, height, id, color, position } = action;
  let box = draft.boxes[draft.selectBox];

  switch (action.type) {
    case "ADD_BOX":
      draft.boxes[id] = {
        id,
        width,
        height,
        color,
        position,
      };
      break;
    case "SELECT_BOX":
      draft.selectBox = id
      break;
    case "MOVE_BOX":
      if (!box) return;
      box.position = position;
      break;
    case "RESIZE_BOX":
      if (!box) return;
      box.width = width;
      box.height = height;
      box.position = position;
      break;
    case "DELETE":
      delete draft.boxes[draft.selectBox];
      break;
    case "APPLY_PATCHES":
      return applyPatches(draft, action.patches);
  }
};

export const patchGeneratingBoxesReducer = produceWithPatches(boxAction);

export function getInitialState() {
  return {
    boxes: {},
  };
}
