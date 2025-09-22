export function BookPreview({ book }) {

    const { title, listPrice , thumbnail} = book
    return (
        <article className="book-preview">
            <h2>title: {title}</h2>
            <h4>
                price: {listPrice.amount} {listPrice.currencyCode}
            </h4>
            <img src={thumbnail} alt="Book Image" />        
        </article>
    )
}