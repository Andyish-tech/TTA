// Load and parse the XML
fetch('books.xml')
  .then(response => response.text())
  .then(xmlStr => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlStr, 'application/xml');
    const books = Array.from(xml.getElementsByTagName('book')).map(book => ({
      id: book.getAttribute('id'),
      title: book.getElementsByTagName('title')[0].textContent,
      author: book.getElementsByTagName('author')[0].textContent,
      year: book.getElementsByTagName('year')[0].textContent,
    }));
    displayBooks(books);
  });

function displayBooks(books) {
  const container = document.getElementById('book-list');
  container.innerHTML = '';
  
  books.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.innerHTML = `
      <strong>${book.title}</strong> by ${book.author} (${book.year})
      <div class="reviews" id="reviews-${book.id}">Loading reviews...</div>
    `;
    container.appendChild(bookDiv);

    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${book.id}`)
      .then(res => res.json())
      .then(reviews => {
        const reviewHTML = reviews.slice(0, 3).map(r => `<li>${r.name}: ${r.body}</li>`).join('');
        document.getElementById(`reviews-${book.id}`).innerHTML = `<ul>${reviewHTML}</ul>`;
      });
  });
}
