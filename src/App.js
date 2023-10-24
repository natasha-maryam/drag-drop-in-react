import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';


const tasksList = [
  {id:"1", item:"Learn Japanese"},
  {id:"2", item:"Develop personal portfolio"},
  {id:"3", item:"Develop E-commerce website"},
  {id:"4", item:"Workout for an hour"},
  {id:"5", item:"Finish reading a book"},
]

function App() {
     const [weeklyTaskOrder, setWeeklyTaskOrder] = useState(tasksList);
     const [dailyTaskOrder, setDailyTaskOrder] = useState([]);

 function handleOnDragEnd(result){
  const {destination, source} = result;

  if(!destination) return;

    if(source.droppableId === destination.droppableId){
      if(source.droppableId === 'weeklytasks'){
        const newWeeklyTasks= [...weeklyTaskOrder]
        const [reorderedItem] = newWeeklyTasks.splice(source.index, 1)
        newWeeklyTasks.splice(destination.index, 0, reorderedItem)
        setWeeklyTaskOrder(newWeeklyTasks)
      }
      else{
        const newDailyTasks = [...dailyTaskOrder]
        const [reorderedItem] = newDailyTasks.splice(source.index, 0)
        newDailyTasks.splice(destination.index, 0 , reorderedItem)
        setDailyTaskOrder(newDailyTasks)
      }
    }
    else{
      const weekList = [...weeklyTaskOrder]
      const dailyList = [...dailyTaskOrder]
      if (source.droppableId === "weeklytasks") {
        const [removed] = weekList.splice(source.index, 1);
        dailyList.splice(destination.index, 0, removed);
        console.log("uuyyiu", removed)
        setWeeklyTaskOrder(weekList);
        setDailyTaskOrder(dailyList);
        
        // console.log("njfre", dailyList)
        // console.log("uitrt", weekList)
      } else {        
        const [removed] = dailyList.splice(source.index,1);
        console.log("ghyu", removed)
        weekList.splice(destination.index, 0, removed);
        setWeeklyTaskOrder(weekList);
        setDailyTaskOrder(dailyList);}
}
    }

     return(
      <div className='tasker'>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className='container'>
        <Droppable droppableId='weeklytasks'>
                    {(provided) => (
                    <div className='weeklybox'
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                            <h3>Weekly Tasks</h3>
                            {weeklyTaskOrder.map(({id,item},index)=>{
                                return(
                                  <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <h5 className='task' 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                                {item}
                                            </h5>
                                        )
                                            } 
                                    </Draggable>
                                    )  
                            })}
                        {provided.placeholder}
                    </div>)}
                </Droppable>

        <Droppable droppableId='dailytasks'>
        {(provided) =>(
          <div className='dailybox' ref={provided.innerRef} {...provided.droppableProps}>
            <h3>Daily Tasks</h3>
            {dailyTaskOrder.map(({id,item},index)=>{
                                return(
                                  <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <h5 className='task' 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                                {item}
                                            </h5>
                                        )
                                            } 
                                    </Draggable>
                                    )  
                            })}
            {provided.placeholder}
          </div>
        )}

        </Droppable>

        </div>
      </DragDropContext>

      </div>
     )
}
export default App;