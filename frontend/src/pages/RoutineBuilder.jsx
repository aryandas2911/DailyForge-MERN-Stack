import { useState } from "react";
import TaskLibrary from "../components/Routine/TaskLibrary";
import WeeklyGrid from "../components/Routine/WeeklyGrid";
import TaskFormModal from "../components/Task/TaskFormModal";
import useTasks from "../hooks/useTasks.js";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RoutineBuilder() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data) => {
    try {
      await addTask({ ...data, status: "Due" });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  return (
    <div className="app-bg min-h-screen px-6 py-8">
      {/* Header */}
      <header className="mb-8 flex items-start gap-4">
        {/* Back button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-1 rounded-lg p-2 border border-soft text-muted 
               hover:bg-white transition"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Title block */}
        <div>
          <h1 className="text-3xl font-semibold text-main">Routine Builder</h1>
          <p className="mt-1 text-muted">Design your week</p>
        </div>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left */}
        <aside className="col-span-12 md:col-span-3">
          <TaskLibrary onAddTask={() => setIsModalOpen(true)} />
        </aside>

        {/* Right */}
        <section className="col-span-12 md:col-span-9">
          <WeeklyGrid />
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <TaskFormModal
          task={null}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
