import {
    getAllReclutas,
    getOneById,
    searchRegistersLike
} from '../api/APIreclutas.js';
import {
    getAllTeams,
    getOneTeamById
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
                    <button type="button" class="btn btns info btnInfo" data-recluta="${element.id}" data-bs-toggle="modal" data-bs-target="#detallesM">
                        <i class="fa-solid fa-circle-info infos info" data-recluta="${element.id}" style="color: white"></i>
                    </button>
                    <button type="button" class="btn btns btnUpdate edit" data-recluta="${element.id}"
                        data-bs-toggle="modal" data-bs-target="#cReclutaUp">
                        <i class="fa-solid fa-pen-to-square infos edit" style="color: #ffffff;"
                        data-recluta="${element.id}"></i>
                    </button>
                    <button type="button" class="btn btns btnDelete drop" data-recluta="${element.id}">
                        <i class="fa-solid fa-trash infos drop" style="color: #ffffff;" data-recluta="${element.id}"></i>
                    </button>
                    </td>
                </tr>
            ` 
        }); 

        return html;
    },

    async getRegisterForUpdate(id){
        const data = await getOneById(id);
        return data;
    },

    async searchByNameR(name){
        const data = await searchRegistersLike(name);
        let html = ''
        data.forEach( element => {
            html += /*html*/`
                <tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombre}</td>
                    <td>${element.edad}</td>
                    <td>
                    <button type="button" class="btn btn-info btns info" data-recluta="${element.id}" data-bs-toggle="modal" data-bs-target="#detallesM">
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
        
    },


    async lookDetailsRecluta(id){

        const data = await getOneById(id);
        const team = await getOneTeamById(data.team);
        
        let html = /*html*/`
            <div class="card mb-1" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${data.imagen}" style="width: 15rem; height: 15rem;" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <ul >
                        <li class="items"><Strong>Nombre:</Strong> ${data.nombre}</li>
                        <li class="items"><Strong>Edad:</Strong> ${data.edad}</li>
                        <li class="items"><strong>Telefono:</strong> ${data.telefono}</li>
                        <li class="items"><strong>Direccion:</strong> ${data.direccion}</li>
                        <li class="items"><strong>Fecha Nacimiento:</strong> ${data.fechaNac}</li>
                        <li class="items"><strong># Identidad:</strong> ${data.identificacion}</li>
                        <li class="items"><strong>Fecha Ingreso:</strong> ${data.fechaIngre}</li>
                        <li class="items"><strong>Team: </strong> ${team.nombre}</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        `    
        return html;
    }   

}


self.addEventListener("message", (e) => {
    Promise.resolve(ws[e.data.accion]((e.data.body) ? e.data.body : undefined)).then(res => postMessage(res));
})