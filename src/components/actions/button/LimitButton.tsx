'use client';

interface LimitButtonProps {
  current: number;
  limit?: number[];
  set: (value: number) => void;
}

export default function LimitButton({
  limit = [10, 25, 50, 100],
  set,
  current
}: LimitButtonProps) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn">
        Limit {current}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {limit.map((value) => (
          <li key={value}>
            <a onClick={() => set(value)}>{value}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
