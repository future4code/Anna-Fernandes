const title = document.getElementById("create-title");
const author = document.getElementById("create-author");
const image = document.getElementById("create-image");
const text = document.getElementById("create-text");
const postsContainer = document.getElementById("posts-container");
const createPage = document.getElementById("create-page");
const postPage = document.getElementById("post-page");

let post;
let todosPosts = [];

let pressionaEnter = () => {
    if (event.key === 'Enter') {
        publicarPost();
    }
}

let publicarPost = (post) => {
    event.preventDefault()

    post = {
        titulo: title.value,
        autor: author.value,
        imagem: image.value,
        texto: text.value
    }

    todosPosts.push(post);
    sessionStorage.setItem("todos", todosPosts);
    sessionStorage.setItem("titulo", post.titulo);
    sessionStorage.setItem("autor", post.autor);
    sessionStorage.setItem("imagem", post.imagem);
    sessionStorage.setItem("texto", post.texto);

    if ((post.titulo === "")|| (post.autor === "") || (post.texto === "")) {
        alert("Os campos de título, autor e texto devem estar preenchidos!");
    } else {
        window.location = "post.html"
    }

    title.value = "";
    author.value = "";
    image.value = "";
    text.value = "";
}

const postTitulo = sessionStorage.getItem("titulo");
const postAutor = sessionStorage.getItem("autor");
const postImagem = sessionStorage.getItem("imagem");
const postTexto = sessionStorage.getItem("texto");

if(postPage) {
    postsContainer.innerHTML += `
    <div class="post">
    <h2>${postTitulo}</h2>
    <p class="post-author">por ${postAutor}</p>
    <img class="post-image" src=${postImagem}>
    <p class="paragraph">${postTexto}</p>
    </div>
    `
}

let createPost = () => {
    window.location = "index.html"
}
