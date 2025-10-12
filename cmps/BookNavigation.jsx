const { Link, Outlet } = ReactRouterDOM

export function BookNavigation({ prevBook, nextBook }) {
  return (
    <div className="book-navigation">
      <button>
        <Link to={`/book/${prevBook.id}`}>⬅️ Previous book</Link>
      </button>
      <button>
        <Link to={`/book/${nextBook.id}`}>Next book ➡️</Link>
      </button>
    </div>
  )
}
