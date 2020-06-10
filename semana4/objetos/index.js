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

    if ((post.titulo === "")|| (post.autor === "") || (post.texto === "")) {
        alert("Os campos de título, autor e texto devem estar preenchidos!");
    } else {
        window.location = "post.html?post.titulo="+ post.titulo + "&post.autor=" + post.autor + "&post.imagem=" + post.imagem + "&post.texto=" + post.texto;
    }

    title.value = "";
    author.value = "";
    image.value = "";
    text.value = "";
}
