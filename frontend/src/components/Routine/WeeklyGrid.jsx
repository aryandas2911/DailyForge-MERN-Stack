const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Generate time slots from 06:00 to 22:00 (30 min intervals)
const generateTimeSlots = () => {
  const slots = [];
  let hour = 6;
  let minute = 0;

  while (hour < 23 || (hour === 23 && minute === 0)) {
    const label = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
    slots.push(label);

    minute += 60;
    if (minute === 60) {
      minute = 0;
      hour += 1;
    }
  }

  return slots;
};

const TIME_SLOTS = generateTimeSlots();

export default function WeeklyGrid() {
  return (
    <div className="card card-primary overflow-x-auto">
      <h2 className="text-lg font-semibold text-main mb-4">Weekly Schedule</h2>

      {/* Grid Container */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "80px repeat(7, minmax(120px, 1fr))",
        }}
      >
        {/* Header Row */}
        <div />
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-sm font-medium text-main text-center pb-2"
          >
            {day}
          </div>
        ))}

        {/* Time Rows */}
        {TIME_SLOTS.map((time) => (
          <>
            {/* Time label */}
            <div key={time} className="text-xs text-muted pr-2 pt-3 text-right">
              {time}
            </div>

            {/* Day cells */}
            {DAYS.map((day) => (
              <div
                key={`${day}-${time}`}
                className="border-soft h-12 bg-white/70 hover:bg-white transition"
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
