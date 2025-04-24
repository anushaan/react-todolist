import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

const TodoList = () => {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addToDo = () => {
    if (!text.trim()) return;
    setTodo([...todo, { text, completed: false }]);
    setText("");
  };
  const toggleTodo = (index) => {
    const updated = todo.map((list, idx) =>
      idx === index ? { ...list, completed: !list.completed } : list
    );
    setTodo(updated);
  };
  const editTodo = (index) => {
    setEditIndex(index);
    setText(todo[index].text);
  };
  const saveEditTodo = () => {
    const updated = [...todo];
    updated[editIndex].text = text;
    setTodo(updated);
    setEditIndex(null);
    setText("");
  };

  const deleteTodo = (index) => {
    const updated = todo.filter((list, idx) => idx !== index);
    setTodo(updated);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">TodoList</h1>
      <div className="flex space-x-2">
        <Input
          value={text}
          placeholder="Add the task"
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={editIndex !== null ? saveEditTodo : addToDo}>
          {editIndex !== null ? "Save" : "Add"}
        </Button>
      </div>
      <div className="space-y-2">
        {todo.map((list, index) => (
          <Card key={index}>
            <CardContent
              onClick={() => toggleTodo(index)}
              className={`cursor-pointer transition hover:scale-[1.02] ${
                list.completed ? "opacity-50 line-through" : ""
              }`}
            >
              {list.text}
            </CardContent>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="destructive"
                className="px-6 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(index);
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline"
                className="px-6 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  editTodo(index);
                }}
              >
                Edit
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
