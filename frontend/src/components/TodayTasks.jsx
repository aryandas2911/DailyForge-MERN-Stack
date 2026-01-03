export default function TodayTasks({ tasks }) {
  return (
    <div className="bg-(--surface) rounded-xl shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-main">Today's Tasks</h2>
        <button className="text-sm text-primary hover:underline">
          Edit Routine →
        </button>
      </div>

      {tasks?.length ? (
        <div className="space-y-4">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="text-xs text-muted w-20">{task.time}</span>
              <div
                className={`flex-1 flex justify-between items-center border-l-4 pl-4 rounded-md ${task.color} bg-white/80 p-3 shadow-sm`}
              >
                <div>
                  <p className="text-sm font-medium text-main">{task.title}</p>
                  <span className="text-xs text-muted">{task.duration}</span>
                </div>
                <input type="checkbox" className="accent-(--primary)" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          No routine scheduled.{" "}
          <span className="text-primary hover:underline cursor-pointer">
            Build Routine →
          </span>
        </p>
      )}
    </div>
  );
}
