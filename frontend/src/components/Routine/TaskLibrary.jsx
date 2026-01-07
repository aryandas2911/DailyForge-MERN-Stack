import { useState } from "react";
import useTasks from "../../hooks/useTasks.js";

export default function TaskLibrary({ onAddTask }) {
  const { tasks } = useTasks();
  const [query, setQuery] = useState("");

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="card card-muted h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-main">Task Library</h2>
        <p className="text-xs text-muted">Drag tasks into your week</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 rounded-xl border-soft px-3 py-2 text-sm focus:outline-none"
      />

      {/* Task List */}
      <div className="flex-1 space-y-3 overflow-auto pr-1">
        {filteredTasks?.length ? (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="group flex items-center gap-3 rounded-xl border-soft bg-white/80 p-3
                         cursor-grab active:cursor-grabbing
                         hover:bg-white hover:shadow-md transition"
            >
              {/* Color dot */}
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    task.priority === "High"
                      ? "#ef4444"
                      : task.priority === "Medium"
                      ? "#f59e0b"
                      : "#10b981",
                }}
              />

              {/* Title */}
              <p className="flex-1 text-sm font-medium text-main truncate">
                {task.title}
              </p>
            </div>
          ))
        ) : (
          <div className="text-sm text-muted text-center py-8">
            No tasks found
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <button className="btn btn-primary w-full mt-4" onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
}
