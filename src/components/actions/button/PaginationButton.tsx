export default function PaginationButton({
  page,
  totalPage,
  set
}: {
  page: number;
  totalPage: number;
  set: (newPage: number) => void;
}) {
  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => set(Math.max(page - 1, 1))}
        disabled={page <= 1}
      >
        «
      </button>
      <button className="join-item btn">Page {page}</button>
      <button
        className="join-item btn"
        onClick={() => set(Math.min(page + 1, totalPage))}
        disabled={page >= totalPage}
      >
        »
      </button>
    </div>
  );
}
