export default class LoginRequest{
    static base_url = "https://blog-m2.herokuapp.com/users/login"

    static async login(loginData){
        return await fetch(this.base_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            localStorage.setItem("@Blog-Kenzie:userId", JSON.stringify(res.userId))
            localStorage.setItem("@Blog-Kenzie:token", JSON.stringify(res.token))
            return res; 
        })
        .catch(err => console.log(err));
    }
}