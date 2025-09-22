import {BookPreview} from "./bookPreview.jsx"

const { useState, useEffect } = React


export function BookList({ books}) {

   
    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        {/* <button onClick={ev => onRemoveCar(car.id, ev)}>Remove</button>
                        <button onClick={() => onSelectCarId(car.id)} >Details</button> */}
                    </section>
                </li>
            )}
        </ul>
    )

}