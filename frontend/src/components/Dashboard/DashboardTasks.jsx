import { useNavigate } from "react-router-dom";
import useTasks from "../../hooks/useTasks";

export default function DashboardTasks() {
  const { tasks, updateTask } = useTasks();
  const navigate = useNavigate();

  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const priorityBorder = {
    Low: "border-green-400",
    Medium: "border-yellow-400",
    High: "border-red-400",
  };

  const todayTasks = tasks
    ?.filter((task) => {
      const today = new Date();
      const created = new Date(task.createdAt);

      return (
        today.getFullYear() === created.getFullYear() &&
        today.getMonth() === created.getMonth() &&
        today.getDate() === created.getDate()
      );
    })
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
    .slice(0, 5);

  return (
    <div className="bg-(--surface) rounded-xl shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-main">Today's Tasks</h2>
        <button
          className="text-sm text-primary hover:underline"
          onClick={() => navigate("/tasks")}
        >
          Edit Tasks →
        </button>
      </div>

      {todayTasks?.length ? (
        <div className="space-y-4">
          {todayTasks.map((task) => (
            <div key={task._id} className="flex items-start gap-4">
              <div
                className={`flex-1 flex justify-between items-center border-l-4 pl-4 rounded-md
                ${priorityBorder[task.priority]} bg-white/80 p-3 shadow-sm`}
              >
                <div>
                  <p
                    className={`text-sm font-medium ${
                      task.status === "Completed"
                        ? "line-through text-muted"
                        : "text-main"
                    }`}
                  >
                    {task.title}
                  </p>
                  <span className="text-xs text-muted">
                    Priority: {task.priority}
                  </span>
                </div>

                <input
                  type="checkbox"
                  className="accent-(--primary)"
                  checked={task.status === "Completed"}
                  onChange={() =>
                    updateTask(task._id, {
                      status: task.status === "Completed" ? "Due" : "Completed",
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          No tasks for today.{" "}
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() => navigate("/tasks")}
          >
            Add one →
          </span>
        </p>
      )}
    </div>
  );
}
