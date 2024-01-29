function addBook() {
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const commentInput = document.getElementById('comment');

    const title = titleInput.value;
    const author = authorInput.value;
    const comment = commentInput.value;

    titleInput.value = '';
    authorInput.value = '';
    commentInput.value = '';

    postBook(title, author, comment);
}

const getList = async () => {
    let url = "http://127.0.0.1:5000/books"; // Updated URL
    let list = document.getElementById('list');
    list.innerHTML = '';

    try {
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();

        data.books.forEach((book) => {
            let newItem = document.createElement('li');
            newItem.innerHTML = `${book.title}, <strong>${book.author}</strong>. <br> ${book.comment}`;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";

            deleteButton.addEventListener("click", () => {
                deleteBook(book.id)
                    .then(() => getList())
                    .catch((error) => {
                        console.error('Error deleting the book:', error);
                    });
            });

            newItem.appendChild(deleteButton);
            list.appendChild(newItem);
        });

    } catch (error) {
        console.error('Error:', error);
    }
};

getList();

const postBook = async (title, author, comment) => {
    const data = {
        "title": title,
        "author": author,
        "comment": comment
    };

    let url = 'http://127.0.0.1:5000/books/add'; // Updated URL
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        getList(); // Update the list after addition
    } catch (error) {
        console.error('Error:', error);
    }
};

const deleteBook = async (book_id) => {
    let url = 'http://127.0.0.1:5000/books/delete/' + book_id; // Updated URL
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Network error: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('add-book').addEventListener('click', addBook);
});
