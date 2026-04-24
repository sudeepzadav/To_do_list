import { useState } from "react";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";

const Hero = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);  // ← tracks which task is being edited
  const [editValue, setEditValue] = useState("");                    // ← tracks the edited text

  const handleAdd = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const handleDelete = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditStart = (index: number) => {
    setEditIndex(index);          // remember which task we're editing
    setEditValue(tasks[index]);   // pre-fill with current task text
  };

  const handleEditSave = () => {
    if (editValue.trim() === "") return;
    const updated = [...tasks];
    updated[editIndex!] = editValue;  // replace old task with new text
    setTasks(updated);
    setEditIndex(null);               // exit edit mode
    setEditValue("");
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-indigo-900 to-purple-900 grid grid-cols-5 px-16">
      {/* Left side*/}
      <div className="col-span-3 flex h-30 mt-20">
        <div>
          <div className="bg-gray-500 flex px-5 py-10 gap-5 border-0 rounded-xl">
            <input
              type="text"
              placeholder="Add your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="border py-2 px-4 lg:w-170 rounded-xl"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:scale-110 duration-200"
            >
              Add
            </button>
          </div>

          <div className="border-0 bg-gray-400 mt-10 h-120 rounded-xl py-3">
            <span className="text-2xl px-4 mt-5 underline font-semibold">
              List of tasks:
            </span>
            <ul className="border-t-2">
              {tasks.map((t, index) => (
                <li key={index} className="px-4 py-2 text-lg flex justify-between items-center gap-2">

                  {/* If this task is being edited, show input — otherwise show text */}
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                      className="border py-1 px-2 rounded-lg w-full"
                      autoFocus
                    />
                  ) : (
                    <span>{index + 1}. {t}</span>
                  )}

                  <div className="flex gap-2">
                    {/* Edit mode: show Save button — otherwise show Edit button */}
                    {editIndex === index ? (
                      <button
                        onClick={handleEditSave}
                        className="text-green-600 hover:text-green-800 font-bold px-2"
                      >
                        <MdCheck />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditStart(index)}
                        className="text-blue-600 hover:text-blue-800 font-bold px-2"
                      >
                        <MdEdit />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800 font-bold px-2"
                    >
                      <MdDelete />
                    </button>
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right side*/}
      <div className="lg:col-span-2 flex flex-col justify-center gap-3 px-6 sm:px-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
          Make Your <br /> Life Easy With Us
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-300">
          Record your daily schedule...
        </p>
      </div>
    </div>
  );
};

export default Hero;