document.getElementById("search").addEventListener("click", () => {
  // get book name from box

  let inputBox = document.getElementById("input_box");

  let inputValue = inputBox.value;

  // empty input box validation
  if (inputValue === "") {
    let result = document.getElementById("result");
    result.style.display = "block";
    result.innerText = "Field must not be empty !!";
    let bookFound = document.getElementById("book-found");
    bookFound.innerHTML = "";
  } else {
    // book fetch
    result.style.display = "none";
    let loadData = bookname => {
      let url = `https://openlibrary.org/search.json?q=${bookname}`;
      fetch(url)
        .then(response => response.json())
        .then(data => bookDetails(data));
    };
    loadData(inputValue);
    inputBox.value = "";

    // book details function

    let bookDetails = data => {
      console.log(data);

      // book found check

      let bookFound = document.getElementById("book-found");
      bookFound.style.display = "block";
      bookFound.innerText = `Total books found : ${data.numFound}`;

      // unexpeted book name validation

      if (data.numFound === 0) {
        bookFound.innerHTML = `<span class="text-danger">Please give a valid book name</span> `;
      }

      // list of books shows

      let row = document.getElementById("row");
      row.textContent = "";
      let details = data.docs;
      details.forEach(favBooks => {
        let div = document.createElement("div");
        div.classList.add("col");
        let bookTitle = favBooks.title.slice(0, 10);
        div.innerHTML = `
          <div class="card mb-3 shadow rounded" style="max-width: 540px">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  class="card-img-top w-100 h-100"
                  src="https://covers.openlibrary.org/b/id/${favBooks.cover_i}-L.jpg"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h1 class="card-title text-success">${bookTitle}</h1>
                  <hr />
                  <h3 class="lead"><span class="fw-bold">Author : </span> ${favBooks.author_name}</h3>
                  <p class="lead"><span class="fw-bold">Publisher : </span> ${favBooks.publisher}</p>

                  <p class="card-text">
                    <small class="text-muted"
                      >First Published : ${favBooks.first_publish_year}</small
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        `;
        row.appendChild(div);
      });
    };
  }
});
