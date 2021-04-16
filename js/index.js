function fetchBooks(){
    fetch('http://localhost:3000/books')
        .then(resp => resp.json())
        .then(json => bookList(json))
}


function bookList(books){
    books.forEach(book => {
        let ul = document.getElementById('list')
        let li = document.createElement('li')
        li.innerHTML=book.title
        ul.appendChild(li)
        li.addEventListener('click', function(){
            clearPanel()
            displayBook(book)
            
        })
    });
}

function displayBook(book){
    let div = document.getElementById('show-panel')
    let img = document.createElement('img')
    img.setAttribute("src", `${book.img_url}`)
    img.alt = book.title
    let h31 = document.createElement('h3')
    h31.innerHTML=book.title    
    let p = document.createElement('p')
    p.innerHTML=book.description
            
    div.appendChild(img)
    div.appendChild(h31)
    if(book.subtitle!==undefined){
        let h32 = document.createElement('h3')
        h32.innerHTML =book.subtitle
        div.appendChild(h32)
    }
    div.appendChild(p)
    let users = book.users
    let ulUsers = document.createElement('ul')
    ulUsers.id='users'
    users.forEach(user =>{    
        let liUsers = document.createElement('li')
        liUsers.innerHTML=user.username
        ulUsers.appendChild(liUsers);
        div.appendChild(ulUsers)
    })

    let button = document.createElement('button')
    if(users.find(element => {return element.id===1})){
        button.innerHTML='UNLIKE'
    }
    else{
        button.innerHTML='LIKE'
    }    
    
    div.appendChild(button)
    button.addEventListener('click', function(){
        
        if(button.innerHTML==='LIKE'){
            button.innerHTML='UNLIKE'
            patchLike(book)
           
        }
        else if(users.find(element => element.id===1)){
            button.innerHTML='UNLIKE'

        }
        else{
            button.innerHTML='LIKE'
            //patchUnlike(book)
            
        }
    })
    
}

function patchLike(book){
    const arr=book.users
    let user1 = {id:1, username:"pouros"}
    arr.push(user1)    
    let formData={
        users:arr
    }    
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }
    fetch(`http://localhost:3000/books/${book.id}`,configObj)
        .then(resp => resp.json())
        .then(json =>clearUsers(json.users))    
}


function clearPanel(){
    let element = document.getElementById("show-panel");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
}

function clearUsers(book){
    let ulUsers = document.getElementById("users");
        while (ulUsers.firstChild) {
            ulUsers.removeChild(ulUsers.firstChild);
        }    
    updateUsers(book);    
}

function updateUsers(book){
    book.forEach(user =>{  
        let ulUsers = document.getElementById("users");  
        let liUsers = document.createElement('li')
        liUsers.innerHTML=user.username
        ulUsers.appendChild(liUsers);                
    })
}












document.addEventListener("DOMContentLoaded", function() {
    fetchBooks()
});
