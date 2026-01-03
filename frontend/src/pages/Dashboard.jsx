import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CheckCircle2, Calendar, Flame, Plus, Puzzle } from "lucide-react";

import StatCard from "../components/Dashboard/StatCard";
import TaskPreview from "../components/Dashboard/TaskPreview";
import InsightCard from "../components/Dashboard/InsightCard";
import DashboardTasks from "../components/Dashboard/DashboardTasks";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const upcomingTasks = [
    { title: "DSA Practice", due: "Today", color: "bg-red-400" },
    { title: "Read ML Paper", due: "Tomorrow", color: "bg-yellow-400" },
    { title: "React Component", due: "Today", color: "bg-green-400" },
    { title: "Write Blog", due: "Tomorrow", color: "bg-blue-400" },
  ];

  const insights = [
    { icon: "⚠️", message: "Wednesday is overloaded" },
    { icon: "💤", message: "Sleep < 6h" },
    { icon: "🧘", message: "No breaks scheduled today" },
  ];

  return (
    <div className="min-h-screen w-full max-w-[1440px] mx-auto app-bg px-6 py-8 space-y-8">
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 shadow-md rounded-xl bg-(--surface) gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-main leading-tight">
            Good afternoon, {user?.name}
          </h1>
          <p className="text-sm text-muted mt-1">
            {new Date()
              .toLocaleDateString("en-US", {
                weekday: "long",
                day: "2-digit",
                month: "short",
              })
              .replace(",", " ·")}
          </p>
        </div>
      </header>

      {/* Stats Row */}
      <section className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex-1">
          <StatCard
            label="Today"
            value="3 / 5"
            subtitle="Tasks done"
            icon={<CheckCircle2 size={20} />}
          />
        </div>
        <div className="flex-1">
          <StatCard
            label="This Week"
            value="72%"
            subtitle="Completion"
            icon={<Calendar size={20} />}
          />
        </div>
        <div className="flex-1">
          <StatCard
            label="Streak"
            value="5"
            subtitle="Days"
            icon={<Flame size={20} />}
          />
        </div>
      </section>

      {/* Today's Tasks */}
      <div className="w-full">
        <DashboardTasks />
      </div>

      {/* Bottom Row: TaskPreview + Insights */}
      <section className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="flex-1">
          <TaskPreview tasks={upcomingTasks} />
        </div>
        <div className="flex-1">
          <InsightCard insights={insights} />
        </div>
      </section>
    </div>
  );
}
