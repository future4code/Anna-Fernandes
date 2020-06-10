function queryString(parameter) {
    var loc = location.search.substring(1, location.search.length);
    var param_value = false;
    var params = loc.split("&");
    for (i = 0; i < params.length; i++) {
        param_name = params[i].substring(0, params[i].indexOf('='));
        if (param_name == parameter) {
            param_value = params[i].substring(params[i].indexOf('=') + 1)
        }
    }
    if (param_value) {
        return param_value;
    } else {
        return undefined;
    }
}

let postTitulo = queryString("post.titulo");
let postAutor = queryString("post.autor");
let postTexto = queryString("post.texto");
let postImagem = queryString("post.imagem");

postTitulo = decodeURI(postTitulo)
postAutor = decodeURI(postAutor)
postTexto = decodeURI(postTexto)
postImagem = decodeURI(postImagem)

postsContainer.innerHTML += `
<div class="post">
    <h2>${postTitulo}</h2>
    <p class="post-author">por ${postAutor}</p>
    <img class="post-image" src=${postImagem}>
    <p class="paragraph">${postTexto}</p>
</div>
`