import React, { useState, useEffect } from 'react'
import { getServerCategories } from '../services/Servers'

function CreateServer() {

    const [picture, setPicture] = useState();
    const [banner, setBanner] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [formCategory, setFormCategory] = useState();

    const [serverCategory, setServerCategory] = useState([]);

    const fileNamePicture = document.querySelector('#picture-file');
    const fileNameBanner = document.querySelector('#banner-file');

    useEffect(() => {
        const token = localStorage.getItem("token");
        // Запрос на получение всех категорий
        getServerCategories(token)
        .then( response => {
            setServerCategory(response);
        })
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(picture)
        console.log(title)
    }

    return (
        <main>
            <div className="container pt-6">
                <div className="card-content">
                    <form onSubmit={handleSubmit} >
                        <h3 className="title is-3">Создать новый сервер</h3>

                        <div className="field">
                            <div id="picture-file" className="file is-medium has-name">
                              <label className="file-label">
                                <input
                                    id="picture"
                                    className="file-input"
                                    type="file"
                                    name="picture"
                                    onChange={ e => {setPicture(e.target.files[0])
                                    // создание функционала отображения названия файла после его добавления
                                    let fileInput = document.getElementById('picture');
                                        if (fileInput.files.length > 0) {
                                            fileNamePicture.textContent = fileInput.files[0].name;
                                        }
                                    }}
                                />

                                <span className="file-cta">
                                  <span className="file-icon">
                                    <i className="material-icons">file_upload</i>
                                  </span>
                                  <span className="file-label">Выберите картинку</span>
                                </span>
                                <span className="file-name"></span>
                              </label>
                            </div>
                        </div>

                        <div className="field">
                            <div id="banner-file" className="file is-medium has-name">
                              <label className="file-label">
                                <input
                                    id="banner"
                                    className="file-input"
                                    type="file"
                                    name="banner"
                                    onChange={ e => {setBanner(e.target.files[0])
                                    // создание функционала отображения названия файла после его добавления
                                    let bannerInput = document.getElementById('banner');
                                        if (fileInput.files.length > 0) {
                                            fileNameBanner.textContent = fileInput.files[0].name;
                                        }
                                    }}
                                />
                                <span className="file-cta">
                                  <span className="file-icon">
                                    <i className="material-icons">file_upload</i>
                                  </span>
                                  <span className="file-label">Выберите банер</span>
                                </span>
                                <span className="file-name"></span>
                              </label>
                            </div>
                        </div>

                        <div className="field">
                          <label className="label">Название</label>
                          <div className="control">
                            <input
                                id="title"
                                name="title"
                                className="input"
                                type="text"
                                placeholder="Text input"
                                onChange={ e => {setTitle(e.target.value)}}
                            />
                          </div>
                        </div>

                        <div className="field">
                          <label className="label">Описание</label>
                          <div className="control">
                            <textarea
                                id="description"
                                name="description"
                                className="textarea"
                                placeholder="Textarea"
                                onChange={ e => {setDescription(e.target.value)}}
                            >
                            </textarea>
                          </div>
                        </div>

                        <div className="field">
                          <label className="label">Катеория</label>
                          <div className="control">
                            <div className="select">
                              <select onChange={ e => setFormCategory(e.target.value)}>
                                <option value="" disabled >Выберите категорию</option>
                                { serverCategory.map(category => (
                                    <option key={category.id} value={category.id}>{ category.title }</option>
                                )) }
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="field is-grouped">
                          <div className="control">
                            <button type="submit" className="button is-link">Создать</button>
                          </div>
                          <div className="control">
                            <button className="button is-link is-light">Отменить</button>
                          </div>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    )
}

export default CreateServer