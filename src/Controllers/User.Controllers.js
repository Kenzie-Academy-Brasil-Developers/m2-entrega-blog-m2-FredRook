export default class UserRequest {
    static base_url = "https://blog-m2.herokuapp.com/users/register"
    static base_url_newPost = "https://blog-m2.herokuapp.com/posts"
    static base_url_searchPostById = "https://blog-m2.herokuapp.com/posts/{id}"
    static base_url_pegueAllPosts ="https://blog-m2.herokuapp.com/posts?page=1"
    static guardarToken = localStorage.getItem("@Blog-Kenzie:token")
    static headers = {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${JSON.parse(this.guardarToken)}`
    }

//////// CRIA O USUÁRIO ////////
    static   async createUser(createUserData){
        return await fetch(this.base_url, {
            method: "POST",
            headers:this.headers,
            body: JSON.stringify(createUserData)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    }

//////// PEGA O POST DO USUÁRIO POR ID ////////
    static async listPostUserById(){
        return await fetch(`${this.base_url_searchPostById}/${id}`, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    static async listPostUserByIdSome (){
        const usersAllPosts = await this.listUserById();

        const usersAllPostsSome = usersAllPosts.some((elem) => elem.user.id === user.username);

        return usersAllPostsSome;
    }

//////// DELETA O CADASTRO DO USUÁRIO ////////
    static async deleteUserProfile (){
        return await fetch(`${this.base_url}/id`,{
            method: "DELETE",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => {
            localStorage.removeItem("@Blog-Kenzie:userId")
            localStorage.removeItem("@Blog-Kenzie:token")
        return res 
        })
        .catch(err => console.log(err))
    }

//////// CRIA UM NOVO POST ////////
    static async newPost (novoPost){
        return await fetch(this.base_url_newPost, {
            method: "PATCH",
            headers:{
                "content": "new content"
              },
            body: JSON.stringify(novoPost)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    }

//////// ALTERA O POST FEITO ////////
    static async modifyNewPost (modificaPost){
        return await fetch(`${this.base_url_searchPostById}/id`,{
            method: "POST",
            headers:{
                "content": "content"
              },
            body: JSON.stringify(modificaPost)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    }

//////// PEGA TODOS OS POSTS DE TODOS USUÁRIOS ////////
    static async getAllPosts (){
        return await fetch(this.base_url_pegueAllPosts, {
            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    }


    static async getUsersAllPosts(){

        const usersAllPosts = await this.getAllPosts();

        const usersAllPostsFilter = usersAllPosts.filter((elem) => elem.data.id);

        return usersAllPostsFilter;
    }

//////// DELETA O POST DO USUÁRIO ////////
    static async deleteUserPost (id){
            const response = await fetch(base_url_searchPostById + `id/${id}`, {
                method: "DELETE"
            })
            return response;
    }


}