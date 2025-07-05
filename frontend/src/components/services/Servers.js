import axios from "axios";

export const getServerCategories = (token) => {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    const promise = axios.get('api/server/getcategories/');
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
};

export const CreateNewServer = (picture, banner, title, description, category) => {
    //Headers
    const config = {
        headers : {
            'Content-Type' : 'multipart/form-data',
        }
    };

    let formData = new FormData();
    formData.append('picture', picture)
    formData.append('banner', banner)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)

    axios
    .post('api/server/createserver/', formData, config)
    .then(response => {
        console.log(formData);
        console.log(response);
    })
    .catch(error => {
        console.log(error);
        window.alert('Error ' + error)
    })
    return true;
};