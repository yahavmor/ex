import {BookPreview} from "./bookPreview.jsx"



const { useState, useEffect } = React


export function BookList({ books,  onRemoveBook, onSelectBookId }) {


    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={ev => onRemoveBook(book.id, ev)}>Remove</button>
                        <button onClick={() => onSelectBookId(book.id)} >Details</button>
                    </section>
                </li>
            )}
        </ul>
    )

}