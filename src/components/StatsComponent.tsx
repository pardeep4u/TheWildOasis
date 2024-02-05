export function StatsComponent({
  Icon,
  statsTitle,
  statsData,
  bgColor,
  textColor,
}: {
  Icon: React.ElementType;
  statsTitle: string;
  statsData: string;
  bgColor?: string;
  textColor?: string;
}) {
  return (
    <div
      className={`flex bg-white items-center rounded-sm justify-start gap-5 py-3 px-5 shadow-md`}
    >
      <div
        className={`bg-green-100 px-3 py-3 rounded-full flex items-center justify-center`}
        style={{ backgroundColor: bgColor }}
      >
        <Icon
          className={`w-8 h-8 text-green-600`}
          style={{ color: textColor }}
        />
      </div>
      <div>
        <p className="text-xs font-medium uppercase">{statsTitle}</p>
        <div className={`text-lg font-bold`}>{statsData}</div>
      </div>
    </div>
  );
}
