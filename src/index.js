const url = "http://localhost:3000"
const quoteList = document.querySelector("#quote-list")
const newQuoteForm = document.querySelector("#new-quote-form")

function renderQuote(quoteObj){
    const li = document.createElement("li")
    const blockQuote = document.createElement("blockquote")
    const quote = document.createElement("p")
    const author = document.createElement("footer")
    const br = document.createElement("br")
    const likeBtn = document.createElement("button")
    const span = document.createElement("span")
    const deleteBtn = document.createElement("button")

    li.className = "quote-card"
    blockQuote.className = "blockquote"
    quote.className = "mb-0"
    author.className = "blockquote-footer"
    likeBtn.className = "btn-success"
    deleteBtn.className = "btn-danger"

    quote.textContent = quoteObj.quote
    author.textContent = quoteObj.author
    likeBtn.textContent = "Likes:"
    span.textContent = 0
    deleteBtn.textContent = "Delete"

    quoteList.append(li)
    li.append(blockQuote)

    blockQuote.append(quote)
    blockQuote.append(author)
    blockQuote.append(br)
    blockQuote.append(likeBtn)
    blockQuote.append(deleteBtn)

    likeBtn.append(span)

    deleteBtn.addEventListener("click", () => {
        li.remove()
    })
}


fetch("http://localhost:3000/quotes?_embed=likes")
.then(res => res.json())
.then(data => {

    data.forEach(quoteObj => renderQuote(quoteObj))
})

newQuoteForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const newQuote = {
        quote: e.target.quote.value,
        author: e.target.author.value,
    }

    fetch(`${url}/quotes`, {
        method: "POST",
        headers: {
            "content-type" : "application/json",
            "accept" : "application/json"
        },
        body: JSON.stringify(newQuote)
    })
    .then(res => res.json())
    .then(data => renderQuote(data))
    .catch(err => alert("Something went wrong. Your quote was not saved. Please try again later."))

})