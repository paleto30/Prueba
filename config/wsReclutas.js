import {
    getAllReclutas
} from '../api/APIreclutas.js';
import {
    getAllTeams
} from '../api/APIteam.js';


let ws = {

    async showAllTeams() {
        const data = await getAllTeams();
        let html = '';
        data.forEach(element => {
            html += /*html*/`
                <option value="${element.id}">${element.nombre}</option>
            `
        });

        return html;
    },

    async showAllRegistros() {
        const data = await getAllReclutas();
        let html = '';
        data.forEach( element => {
            html += /*html*/`
                <tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombre}</td>
                    <td>${element.edad}</td>
                    <td>
                    <button type="button" class="btn btn-info btns info" data-recluta="${element.id}">
                        <i class="fa-solid fa-circle-info infos info" data-recluta="${element.id}"></i>
                    </button>
                    <button type="button" class="btn btn-warning btns edit" data-recluta="${element.id}"
                        data-bs-toggle="modal" data-bs-target="#cReclutaUp">
                        <i class="fa-solid fa-pen-to-square infos edit" style="color: #ffffff;"
                        data-recluta="${element.id}"></i>
                    </button>
                    <button type="button" class="btn btn-danger btns drop" data-recluta="${element.id}">
                        <i class="fa-solid fa-trash infos drop" style="color: #ffffff;" data-recluta="${element.id}"></i>
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