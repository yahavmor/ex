import { BookList } from "../cmps/bookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./bookDetails.jsx"


const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    // const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    
    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
            // .catch(err => console.log('err:', err))
    }

    function onRemoveCar(carId, { target }) {
        const elLi = target.closest('li')

        carService.remove(carId)
            // .then(() => animateCSS(elLi, 'fadeOut'))
            .then(() => {
                setCars(cars => cars.filter(car => car.id !== carId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSelectCarId(carId) {
        setSelectedCarId(carId)
    }

    /* 
        filterBy = {txt:'asd', minSpeed:123, labels:[...]}
        newFilterBy = {txt:'asd', minSpeed:123}
    */
    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }


    // console.log('render')
    if (!books) return <div>Loading...</div>

    return (
        <section className="car-index">
            {selectedBookId
                ? <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />
                : <Fragment>
                    {/* <CarFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} /> */}
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
