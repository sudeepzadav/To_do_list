import { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { MdCheck, MdDelete, MdEdit } from "react-icons/md";

interface Task {
  text: string;
  date: string;
}

const Hero = () => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editDate, setEditDate] = useState("");

  const handleAdd = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, date }]);
    setTask("");
    setDate("");
  };

  const handleDelete = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditStart = (index: number) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
    setEditDate(tasks[index].date);
  };

  const handleEditSave = () => {
    if (editValue.trim() === "") return;
    const updated = [...tasks];
    updated[editIndex!] = { text: editValue, date: editDate };
    setTasks(updated);
    setEditIndex(null);
    setEditValue("");
    setEditDate("");
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-indigo-900 to-purple-900 dark:bg-gray-950 dark:bg-none grid grid-cols-5 px-16">
      {/* Left side */}
      <div className="col-span-3 flex h-30 mt-20">
        <div className="w-full">
          {/* Input box */}
          <div className="bg-gray-500 dark:bg-gray-800 flex flex-wrap px-5 py-6 gap-3 rounded-xl">
            <input
              type="text"
              placeholder="Add your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="border py-2 px-4 flex-1 min-w-40 rounded-xl outline-none
                dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-black text-gray-400 py-2 px-4 rounded-xl outline-none cursor-pointer
                dark:bg-gray-700 dark:text-white dark:border-gray-600 "
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:scale-110 duration-200"
            >
              Add
            </button>
          </div>

          {/* Task list box */}
          <div className="bg-gray-400 dark:bg-gray-800 mt-10 h-120 rounded-xl py-3 overflow-y-auto">
            <span className="text-2xl px-4 mt-5 underline font-semibold dark:text-white">
              List of tasks:
            </span>
            <ul className="border-t-2 border-gray-500 mt-1">
              {tasks.length === 0 ? (
                <p className="text-center mt-10 text-base text-gray-600 dark:text-gray-400">
                  No tasks yet! Add one above.
                </p>
              ) : (
                tasks.map((t, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-lg flex justify-between items-center gap-2 border-b border-gray-300
                      dark:text-white dark:border-gray-600"
                  >
                    {editIndex === index ? (
                      <div className="flex gap-2 flex-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleEditSave()
                          }
                          className="border py-1 px-2 rounded-lg w-full outline-none
                            dark:bg-gray-700 dark:text-white dark:border-gray-500"
                          autoFocus
                        />
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="border py-1 px-2 rounded-lg outline-none cursor-pointer 
                            dark:bg-gray-700 dark:text-white dark:border-gray-500"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span>
                          {index + 1}. {t.text}
                        </span>
                        {t.date && (
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-4 flex items-center gap-3">
                            <CiCalendarDate /> {formatDate(t.date)}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {editIndex === index ? (
                        <button
                          onClick={handleEditSave}
                          className="text-green-600 dark:text-green-400 hover:text-green-800 font-bold px-2 text-xl"
                        >
                          <MdCheck />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditStart(index)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 font-bold px-2 text-xl"
                        >
                          <MdEdit />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 font-bold px-2 text-xl"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="lg:col-span-2 flex flex-col justify-center gap-3 px-6 sm:px-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white dark:text-white">
          Make Your <span className="text-orange-500 flex flex-col">Life Easy With Us</span> 
        </h1>
        <p className="text-base text-gray-300 dark:text-gray-400">
          Record your daily schedule...
        </p>
      </div>
    </div>
  );
};

export default Hero;
