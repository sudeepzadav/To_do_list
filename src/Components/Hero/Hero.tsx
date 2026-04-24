import { useState, useEffect } from "react";
import { MdCheck, MdDelete, MdEdit, MdAlarm } from "react-icons/md";

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
  const [dueTasks, setDueTasks] = useState<Task[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  // Check for due tasks whenever tasks change or on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const due = tasks.filter((t) => t.date === today);
    if (due.length > 0) {
      setDueTasks(due);
      setShowPopup(true);
    }
  }, [tasks]);

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
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-indigo-900 to-purple-900 dark:bg-gray-950 dark:bg-none grid grid-cols-5 px-16">

      {/* Alarm Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <MdAlarm className="text-red-500 text-4xl animate-bounce" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Task Reminder!
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
              The following tasks are due today:
            </p>
            <ul className="space-y-2 mb-6">
              {dueTasks.map((t, i) => (
                <li
                  key={i}
                  className="bg-red-50 dark:bg-gray-700 border border-red-200 dark:border-red-500 rounded-lg px-4 py-2 text-gray-800 dark:text-white font-medium"
                >
                   {t.text}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl duration-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

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
              className="border py-2 px-4 rounded-xl outline-none cursor-pointer
                dark:bg-gray-700 dark:text-white dark:border-gray-600 text-white"
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
                          onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
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
                        <span className="flex items-center gap-2">
                          {index + 1}. {t.text}
                          {t.date === new Date().toISOString().split("T")[0] && (
                            <MdAlarm className="text-red-400 text-base" title="Due today!" />
                          )}
                        </span>
                        {t.date && (
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                            📅 {formatDate(t.date)}
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
          Make Your <br /> Life Easy With Us
        </h1>
        <p className="text-base text-gray-300 dark:text-gray-400">
          Record your daily schedule...
        </p>
      </div>

    </div>
  );
};

export default Hero;