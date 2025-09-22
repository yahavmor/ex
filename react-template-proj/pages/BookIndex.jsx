import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/bookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./bookDetails.jsx"



const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    function onRemoveCar(carId, { target }) {
        const elLi = target.closest('li')

        carService.remove(carId)
            .then(() => {
                setCars(cars => cars.filter(car => car.id !== carId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSelectCarId(carId) {
        setSelectedCarId(carId)
    }

    function onSetFilterBy(newFilterBy) {
        console.log('newFilterBy:', newFilterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }


    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            {selectedBookId
                ? <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
                : <Fragment>
                    <BookFilter defaultFilter={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList
                        books={books}
                        // onRemoveBook={onRemoveBook}
                        // onSelectBookId={onSelectBookId}
                    />
                </Fragment>

            }
        </section>
    )

}
