import LoginRequest from "../Controllers/Login.Controllers.js";
import UserRequest from "../Controllers/User.Controllers.js";
import NewUser  from "../Controllers/NewUser.Controller.js";

export default class ComponentsDom{
    static body = document.querySelector("body");
    static main = document.querySelector("main");

    static header(avatarUrl, username) {
        const header = document.querySelector("header");

        const img    = document.createElement("img");
        const div    = document.createElement("div");
        const p      = document.createElement("p");
        const section   = document.createElement("section");
        const button = document.createElement("button");

        img.classList.add("headerImg");
        div.classList.add("headerNome");
        p.classList.add("nomeP");
        section.classList.add("headerBtn");
        button.classList.add("btnLogin");

        img.src = avatarUrl;
        img.alt = "AVATAR DO USUARIO";

        p.innerText = username;

        button.type = "button";
        button.innerText = "Login";

        if (JSON.parse(localStorage.getItem("@Blog-Kenzie:user")) === null ){
            button.innerText = "Login";
            button.addEventListener("click", (event) =>{
               const modal = document.querySelector(".modal__login");
               modal.style.display = "flex";
            });
        } else {
            button.innerText = "Logout";
            button.addEventListener("click", (event) => {
                event.preventDefault();
                localStorage.removeItem("@Blog-Kenzie:user");
                localStorage.removeItem("@Blog-Kenzie:token");
                window.location.reload(true);
            });
        }

        section.append(button);
        div.append(p);
        header.append(img, div, section);
    }

    static modalLogin(){

        const modal         = document.createElement("div")
        const container     = document.createElement("div")
        const modalInner    = document.createElement("div")
        const buttonClose   = document.createElement("button")
        const figure        = document.createElement("figure")
        const img           = document.createElement("img")
        const h2            = document.createElement("h2")
        const form          = document.createElement("form")
        const inputEmail    = document.createElement("input")
        const inputPassword = document.createElement("input")
        const formButton    = document.createElement("button")
        const p             = document.createElement("p")

         modal.classList.add("modal", "modal__login")
         container.classList.add("container")
         modalInner.classList.add("modal__inner")
         buttonClose.classList.add("modal__close")
         form.classList.add("modal__form")
         formButton.classList.add("button", "button__primary", "button--marrom")

         buttonClose.type = "button";
         buttonClose.addEventListener("click", (event) => {
            modal.style.display = "none";
         })

         img.src = "./src/Assets/icons8-excluir.svg ";
         img.alt = "Fechar!";

         h2.innerText = "Login"

         inputEmail.type = "email";
         inputEmail.name = "email";
         inputEmail.id   = "email";
         inputEmail.placeholder = "E-mail";

         inputPassword.type = "password";
         inputPassword.name = "password";
         inputPassword.id   = "password";
         inputPassword.placeholder = "Senha";

         formButton.type = "button";
         formButton.innerText = "Logar";
         formButton.addEventListener("click", async (event) => {
            event.preventDefault();
            const data = {};
            const formValues = [...event.srcElement.form];
            formValues.forEach((input) => {
                if(input.value !== ""){
                    data[input.name] = input.value;
                    modal.style.display = "none";
                }
            });
            await LoginRequest.login(data);
         });


         p.innerHTML = `Não tem cadastro? <a href="#">Clique aqui</a> para se cadastrar!`;

         figure.append(img);
         form.append(inputEmail, inputPassword, formButton);
         buttonClose.append(figure);
         modalInner.append(buttonClose, h2, form);
         container.append(modalInner);
         modal.append(container);
         this.body.append(modal);

         modal.style.display = "none";
    }

    static async returnCardsForEach(){
        const renderAllPosts = await UserRequest.getAllPosts();
        /* console.log(renderAllPosts.data) */
        const divPosts = document.createElement("div")
    
        renderAllPosts.data.forEach((posts) => {
     
            const cardsNews = this.posts(posts.avatarUrl, posts.username, posts.content) 

            divPosts.append(cardsNews)
        })
        this.main.append(divPosts)
    }

    static async posts(avatarUrl, username, content){
        const tagUl    = document.createElement("ul")
        const boxTexto   = document.createElement("div")
        const inputTexto = document.createElement("input")
        const posts  = document.createElement("div")
        const imgUsuario  = document.createElement("div")
        const img   = document.createElement("img")
        const usuarioPost  = document.createElement("div")
        const usuarioNickName    = document.createElement("h1")
        const textUsuario     = document.createElement("p")

        tagUl.classList.add("tagUl")
        boxTexto.classList.add("boxTexto")
        inputTexto.classList.add("inputTexto")
        posts.classList.add("posts")
        imgUsuario.classList.add("imgUsuario")
        usuarioPost.classList.add("usuarioPost")
        usuarioNickName.classList.add("usuarioNickName")
        textUsuario.classList.add("textUsuario")

        inputTexto.innerText = "Escreva o post!" // COLOCAR O INPUT DO USER
        img.src = avatarUrl;
        img.alt = "AVATAR DO USUARIO";
        usuarioNickName.innerText = username;
        textUsuario.innerText = content;

        usuarioPost.append(usuarioNickName, textUsuario)
        posts.append(imgUsuario, img)
        boxTexto.append(inputTexto)
        tagUl.append(usuarioPost, posts, boxTexto)
        this.main.append(tagUl)
    }
}

