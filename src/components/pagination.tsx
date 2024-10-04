import { useSearchParams } from "react-router-dom";

export const Pagination: React.FC<{ count: number }> = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");

  function handlePageChange(pageNumber: number) {
    searchParams.set("page", pageNumber + "");
    setSearchParams(searchParams);
  }

  return (
    <div className='flex justify-between space-x-4'>
      <div className='text-sm text-muted-foreground'>
        Showing {(page - 1) * 20 + 1}-{(page - 1) * 20 + 20} of{" "}
        {count.toLocaleString()} Movies
      </div>

      <button
        onClick={() => {
          handlePageChange(parseInt(searchParams.get("page") || "1") - 1);
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          handlePageChange(parseInt(searchParams.get("page") || "1") + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};
