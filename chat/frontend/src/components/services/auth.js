import axios from "axios";

export const setAxiosAuthToken = (token) => {
    if (typeof token !== "undefined" && token) {
        axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

export const setToken = (token) => {
    localStorage.setItem("token", token)
};

export const setCurrentUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user))
};

export const unsetCurrentUser = () => {
    setAxiosAuthToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const getCurrentUser = () => {
    axios
    .get("api/authy/whoami")
    .then(response => {
        const user = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            picture: response.data.profile.picture,
            banner: response.data.profile.banner,
        }
        setCurrentUser(user);
    })
};

export  const logout = () => {
    axios
    .post('api/authy/logout')
    .then(response => {
        unsetCurrentUser();
        console.log("Logout successfully");
    })
}

export  const logoutAll = () => {
    axios
    .post('api/authy/logoutall')
    .then(response => {
        unsetCurrentUser();
        console.log("Logout successfully all tokens deleted");
    })
}

export const loginUser = (username, password) => {
    const config = {
        headers : {
           'Content-type' : 'application/json',
        }
    };

    const body = JSON.stringify({username, password});
    const promise = axios.post('api/authy/login', body, config);
    const dataPromise = promise.then((response) => response.data.token);
    return dataPromise;
}

export const registerUser = (username, email, password) => {
    const config = {
        headers : {
           'Content-type' : 'application/json',
        }
    };
    const body = JSON.stringify({username, email, password})

    axios
    .post('api/authy/signup', body, config)
    .then(response => {
        const auth_token = response.data.token;
        setAxiosAuthToken(auth_token)
        setToken(auth_token)
        getCurrentUser()
    })
    .catch(error => {
        unsetCurrentUser();
        console.log(error);
        window.alert("Ошибка: имя пользователя/адрес электронной почты могут дублироваться." + error)
    });
    return true;
}