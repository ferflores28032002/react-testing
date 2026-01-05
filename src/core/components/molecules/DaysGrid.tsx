interface DaysGridProps {
  days: number[];
}

export const DaysGrid = ({ days }: DaysGridProps) => {
  return (
    <div className="grid gap-2 md:gap-4 items-center" style={{ gridTemplateColumns: '150px repeat(15, 1fr)' }}>
      <div className="bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-lg border border-gray-200">
        <span className="text-xs md:text-sm font-bold text-gray-900">Día</span>
      </div>
      {days.map(day => (
        <div key={day} className="bg-white px-2 md:px-3 py-1.5 md:py-2 rounded text-center border border-gray-200">
          <span className="text-[10px] md:text-xs font-semibold text-gray-700">{day}</span>
        </div>
      ))}
    </div>
  );
};
