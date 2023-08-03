
import React from 'react'
import { Button, Flex } from 'theme-ui'


const AllButtons = ({createButton, deleteButton, undoButton, undoStack, redoButton, undoStackPointer}) => {
  return (
    <Flex p={4} sx={{width: '20%', justifyContent: 'center' ,alignItems: 'center',flexDirection: 'column', backgroundColor: 'white', height: '100vh', borderRight: '1px solid black'}}>
      <Button onClick={createButton} mt={2} sx={{backgroundColor: 'blue', cursor: 'pointer'}}>Create</Button>
      <Button onClick={deleteButton} mt={2} sx={{backgroundColor: 'red', cursor: 'pointer'}}>Delete</Button>
      <Button onClick={undoButton} disabled={!undoStack.current.length} mt={2} sx={{backgroundColor: 'purple', cursor: 'pointer'}}>Undo</Button>
      <Button onClick={redoButton} disabled={undoStackPointer.current === undoStack.current.length - 1} mt={2} sx={{backgroundColor: 'green', cursor: 'pointer'}}>Redo</Button>
    </Flex>
  )
}

export default AllButtons 