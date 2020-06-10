const title = document.getElementById("create-title");
const author = document.getElementById("create-author");
const image = document.getElementById("create-image");
const text = document.getElementById("create-text");
const postsContainer = document.getElementById("posts-container");
const createPage = document.getElementById("create-page");
const postPage = document.getElementById("post-page");

let post;
let todosPosts = [];

let mostrarCreatePage = () => {
    createPage.classList.remove("display-none")
    postPage.classList.add("display-none")
}

let pressionaEnter = () => {
    if (event.key === 'Enter') {
        publicarPost();
    }
}

let publicarPost = () => {

    post = {
        titulo: title.value,
        autor: author.value,
        imagem: image.value,
        texto: text.value
    }    

    
    if ((post.titulo === "")|| (post.autor === "") || (post.texto === "")) {
        alert("Os campos de título, autor e texto devem estar preenchidos!");
    } else {
        postPage.classList.remove("display-none");

        postsContainer.innerHTML += `
        <div class="post">
            <h2>${post.titulo}</h2>
            <p class="post-author">por ${post.autor}</p>
            <img class="post-image" src=${post.imagem}>
            <p class="paragraph">${post.texto}</p>
        </div>
        `
        createPage.classList.add("display-none");
    }

    todosPosts.push(post);

    title.value = "";
    author.value = "";
    image.value = "";
    text.value = "";

}

let mostrarTodosPosts = () => {
    console.log(post)
    if (post === undefined){
        alert("Não há posts. Comece criando um.")
    } else {
        createPage.classList.add("display-none")
        postPage.classList.remove("display-none")
    }
}
