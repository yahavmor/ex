export function BookPreview({ book }) {

    const { title, listPrice , thumbnail , pageCount , publishedDate } = book
    const color = listPrice.amount > 150 ? 'red' : listPrice.amount < 20 ? 'green' : ''
    return (
        <article className="book-preview">
            <h2 className="book-title">{title}</h2>
            <h4 className={`book-price ${color}`}>
                price: {listPrice.amount} {listPrice.currencyCode}
            </h4>
            <img className="book-image" src={thumbnail} alt="Book Image" />
            <h4>{pageCount>500 ? 'Serious Reading':pageCount>200 ? 'Descent Reading' : pageCount<100 ? ' Light Reading': '' }</h4>        
            <h4>{publishedDate>2024 ? 'New!': publishedDate<2015 ? 'Vintage': '' }</h4>
            <h2>{listPrice.isOnSale? 'On sale': ''}</h2>

        </article>
    )
}