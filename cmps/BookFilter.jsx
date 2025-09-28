const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { title, listPrice , pageCount} = filterByToEdit

    return (
        <section className="book-filter-container">
            <form onSubmit={onSubmitFilter}>
                <label>Title</label>
                <input onChange={handleChange} value={title} name="title" id="title" type="text" />

                <label>Price</label>
                <input onChange={handleChange} value={listPrice || ''} name="listPrice" id="listPrice" type="number" />

                <label>Page Count</label>
                <input onChange={handleChange} value={pageCount || ''} name="pageCount" id="pageCount" type="number" />

                <label>On sale</label>
                <input onChange={handleChange} value={listPrice.isOnSale} name="isOnSale" id="isOnSale" type="checkbox" />

                <button>Submit</button>

            </form>
        </section>
    )
}