export default function StatCard({ label, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      {icon && <div className="text-(--primary)">{icon}</div>}
      <div className="mt-4">
        <p className="text-sm text-muted">{label}</p>
        <p className="text-2xl font-semibold text-main">{value}</p>
        {subtitle && <p className="text-xs text-muted mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
