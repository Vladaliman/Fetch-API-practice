//Event listeners for the buttons that fire the fetch functions

//the getText button event listener
document.querySelector("#getText").addEventListener('click', getText);

//the getUsers button event listener
document.querySelector("#getUsers").addEventListener('click', getUsers);

//the getPosts button event listener
document.querySelector("#getPosts").addEventListener('click', getPosts);

//the addPost form event listener
document.querySelector("#addPost").addEventListener('submit', addPost);

// The functions that fetch the data

// the getText function fetching text from a local file
function getText(){
    fetch('sample.txt')
    .then((res) => res.text())
    .then((data)=>{
        document.querySelector("#output").innerHTML = data;
    })
    .catch((err) => {
        document.querySelector("#output").innerHTML = err;
    })
}
//the function that fetches the local json data
function getUsers(){
    fetch('users.json')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h2 class="mb-4">Users</h2>';
        // looping with the forEach method and appending the data
        data.forEach(user => {
            output += `
            <ul class="list-group mb-3">
                <li class="list-group-item list-group-item-action active">ID: ${user.id}</li>
                <li class="list-group-item">Name: ${user.name}</li>
                <li class="list-group-item">Email: ${user.email}</li>
            </ul>
            `;
        });
        document.querySelector("#output").innerHTML = output;
    })
}
//the function that fetches the restfull api json data
function getPosts(){
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h2 class="mb-4">Posts</h2>';
        // looping with the forEach method and appending the data
        data.forEach(post => {
            output += `
            <div class="card border-primary mb-3">
                <h3 class="card-header">${post.title}</h3>
                <p class="card-text">${post.body}</p>
            </div>
            `;
        });
        document.querySelector("#output").innerHTML = output;
    })
}

// the function that adds a post submited in the form
function addPost(e){
    //stoping the defalt submit event
    e.preventDefault();
    //geting the value and storeing it in a variable
    let title = document.querySelector('#title').value;
    let body = document.querySelector('#body').value;
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        //defineing the method
        method:'POST',
        //adding the headers
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        //convert body to string before sending
        body:JSON.stringify({title:title, body:body})
    })
    .then((res) => res.json())
    .then((data) => {
        document.querySelector("#output").innerHTML = 'Post added successfully (result loged in the console)';
        console.log(data);
    })

}
