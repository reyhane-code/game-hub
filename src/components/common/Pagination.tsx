// components/Pagination.js
import Button from "./Button";

interface Props {
  page: number;
  perPage: number;
  count: number;
  setPage: (page: number) => void
}


const Pagination = ({ page, perPage, count, setPage }: Props) => {
  const totalPages = Math.ceil(count / perPage);

  return (
    <div className="flex justify-between items-center">
      <Button
        color="primary"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="mx-5"
      >
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        color="primary"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="mx-5"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
