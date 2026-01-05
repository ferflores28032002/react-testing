interface ChunkHeaderProps {
  startDay: number;
  endDay: number;
}

export const ChunkHeader = ({ startDay, endDay }: ChunkHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-3 md:mb-4">
      <h4 className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider">
        Días {startDay} - {endDay}
      </h4>
    </div>
  );
};
