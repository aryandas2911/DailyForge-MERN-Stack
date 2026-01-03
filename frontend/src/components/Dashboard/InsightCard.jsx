export default function InsightCard({ insights }) {
  return (
    <div className="bg-(--surface) rounded-xl shadow-md p-5">
      <h2 className="text-lg font-semibold text-main mb-4">Insights</h2>
      <ul className="space-y-3 text-sm text-main">
        {insights?.map((insight, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-(--primary)">{insight.icon}</span>
            <span>{insight.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
