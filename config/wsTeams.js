import {
    getAllTeams,
    getOneTeamById,
    searchRegistersLike
} from '../api/APIteam.js';

let ws = {

    async showAllRegistros() {
        const data = await getAllTeams();
        let html = '';
        data.forEach(element => {
            html += /*html*/`
                <tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombre}</td>
                    <td>${element.trainer}</td>
                    <td>
                    <!-- <button type="button" class="btn btn-info btns info" data-category="${element.id}">
                        <i class="fa-solid fa-circle-info infos info" data-category="${element.id}"></i>
                    </button> -->
                    <button type="button" class="btn btnUpdate btns edit" data-team="${element.id}"
                        data-bs-toggle="modal" data-bs-target="#cTeamUp">
                        <i class="fa-solid fa-pen-to-square infos edit" style="color: #ffffff;"
                        data-team="${element.id}"></i>
                    </button>
                    <button type="button" class="btn btns btnDelete drop" data-team="${element.id}">
                        <i class="fa-solid fa-trash infos drop" style="color: #ffffff;" data-team="${element.id}"></i>
                    </button>
                    </td>
                </tr>
            `
        });

        return html;
    },

    async getRegisterForUpdate(id){
        const data = await getOneTeamById(id);
        return data;
    },

    async searchByName(name){
        const data = await searchRegistersLike(name);
        let html = ''
        data.forEach(element => {
            html += /*html*/`
                <tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombre}</td>
                    <td>${element.trainer}</td>
                    <td>
                    <!-- <button type="button" class="btn btn-info btns info" data-category="${element.id}">
                        <i class="fa-solid fa-circle-info infos info" data-category="${element.id}"></i>
                    </button> -->
                    <button type="button" class="btn btn-warning btns edit" data-team="${element.id}"
                        data-bs-toggle="modal" data-bs-target="#cTeamUp">
                        <i class="fa-solid fa-pen-to-square infos edit" style="color: #ffffff;"
                        data-team="${element.id}"></i>
                    </button>
                    <button type="button" class="btn btn-danger btns drop" data-team="${element.id}">
                        <i class="fa-solid fa-trash infos drop" style="color: #ffffff;" data-team="${element.id}"></i>
                    </button>
                    </td>
                </tr>
            `
        });
        return html;
    }

}



self.addEventListener("message", (e) => {
    Promise.resolve(ws[e.data.accion]((e.data.body) ? e.data.body : undefined)).then(res => postMessage(res));
})