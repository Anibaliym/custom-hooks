import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
    const [ todos, dispatchTodo ] = useReducer( todoReducer, [], init ); 
    const todosCount = todos.length; 
    const todosPendingCount = todos.filter( todo => !todo.done).length; 

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ))
    }, [ todos ])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo', 
            payload: todo
        }

        dispatchTodo(action); 
    };

    const handleRemoveTodo = ( id ) => {
        dispatchTodo({
            type: '[TODO] Remove Todo', 
            payload: id
        }); 
    }

    const handleToggleTodo = ( id ) => {
        dispatchTodo({
            type: '[TODO] Toggle Todo', 
            payload: id
        });   
    }


    return {
        todos, 
        todosCount,
        todosPendingCount,
        handleNewTodo,
        handleRemoveTodo,
        handleToggleTodo,        
    }
}
