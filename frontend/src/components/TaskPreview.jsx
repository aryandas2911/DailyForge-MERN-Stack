export default function TaskPreview({ tasks }) {
  return (
    <div className="bg-(--surface) rounded-xl shadow-md p-5">
      <h2 className="text-lg font-semibold text-main mb-4">Upcoming Tasks</h2>
      <ul className="space-y-3">
        {tasks?.slice(0, 5).map((task, i) => (
          <li key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${task.color}`}></span>
              <span className="text-sm text-main">{task.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">{task.due}</span>
              <input type="checkbox" className="accent-(--primary)" />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-primary hover:underline cursor-pointer">
        View All Tasks →
      </div>
    </div>
  );
}
