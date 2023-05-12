import {
    getAllSkill,
    getOneSkillById,
    searchRegistersLike
} from '../api/APIskill.js';

let ws  = {

    async showAllRegistros() {
        const data = await getAllSkill();
        let html = '';
        data.forEach(element => {
            html += /*html*/`
                <tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombre}</td>
                    <td>
                   
                    <button type="button" class="btn btnUpdate btns edit" data-skill="${element.id}"
                        data-bs-toggle="modal" data-bs-target="#upSkill">
                        <i class="fa-solid fa-pen-to-square infos edit" style="color: #ffffff;"
                        data-skill="${element.id}"></i>
                    </button>
                    <button type="button" class="btn btnDelete btns drop" data-skill="${element.id}">
                        <i class="fa-solid fa-trash infos drop" style="color: #ffffff;" data-skill="${element.id}"></i>
                    </button>
                    </td>
                </tr>
            `
        });
        return html;
    },

    async getRegisterForUpdate(id){
        const data = await getOneSkillById(id);
        return data;
    },


    async searchByName(name) {
        const data = await searchRegistersLike(name);
        let html = '';
        data.forEach(element => {
            html += /*html*/`
                <tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombre}</td>
                    <td>
                    <button type="button" class="btn btn-warning btns edit" data-skill="${element.id}"
                        data-bs-toggle="modal" data-bs-target="#upSkill">
                        <i class="fa-solid fa-pen-to-square infos edit" style="color: #ffffff;"
                        data-skill="${element.id}"></i>
                    </button>
                    <button type="button" class="btn btn-danger btns drop" data-skill="${element.id}">
                        <i class="fa-solid fa-trash infos drop" style="color: #ffffff;" data-skill="${element.id}"></i>
                    </button>
                    </td>
                </tr>
            `
        });
        return html;
    },

}

self.addEventListener("message", (e) => {
    Promise.resolve(ws[e.data.accion]((e.data.body) ? e.data.body : undefined)).then(res => postMessage(res));
})