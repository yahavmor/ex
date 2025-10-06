import { BookAdd } from "../cmps/BookAdd.jsx"
import { BookService } from "../services/book.service.js"
import { showErrorMsg , showSuccessMsg } from "../services/event-bus.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(BookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
            navigate('/book/edit/add')
    }, [])


    function loadBook() {
        setIsLoading(true)
        BookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => {
                console.log('err:', err)
                navigate('/Book')
            })
            .finally(() => setIsLoading(false))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        if (field === 'listPrice') {
            setBookToEdit(prevBook => ({
                ...prevBook,
                listPrice: {
                    ...prevBook.listPrice,
                    amount: value
                }
            }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        BookService.save(bookToEdit)
            .then(() => navigate('/book'))
            .then(() => showSuccessMsg('Book saved'))
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
                showErrorMsg('Cannot save book')
            })
    }


    const loadingClass = isLoading ? 'loading' : ''
    const { title, listPrice } = bookToEdit
        return (
        <section className="book-edit">
                <Outlet />
            <div>
                    <h1>Edit/Add Book manually</h1>
                <form className={loadingClass} onSubmit={onSaveBook}>
                    <label>title</label>
                    <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                    <label>List price</label>
                    <input value={listPrice.amount} onChange={handleChange} type="number" name="listPrice" id="listPrice" />

                    <button disabled={!title}>Save</button>
                </form>
            </div>
        </section>
    )

}