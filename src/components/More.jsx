import Button from "react-bootstrap/Button";

export default function More({ pagination, loadNextPage }) {
  let thereAreMore = false;
  if (pagination) {
    const { count, offset, total } = pagination;
    thereAreMore = offset + count < total;
  }

  return (
    <div className="more">
      {thereAreMore && (
        <Button variant="outline-secondary" onClick={loadNextPage}>
          More &raquo;
        </Button>
      )}
    </div>
  );
}
