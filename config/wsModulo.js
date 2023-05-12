import {

    getAllModules

}from '../api/APImodulskill.js';

import {
    getAllSkill,
    getOneSkillById
} from '../api/APIskill.js';

let ws = {

    async listSkill(){
        const list = await getAllSkill(); 
        let html = '';
        list.forEach( element => {
            html +=/*html*/ `
                <option value="${element.id}">${element.nombre}</option>
            `
        });
        return html;
    },  


    async showAllRegisters(){
        const data = await getAllModules();      
        let html = '';
        data.forEach(element => {
            console.log(element);
            html += /*html*/`
            <tr>
                <th scope="row">${element.id}</th>
                <td>${element.nombre}</td>
                <td>${element.skill.nombre}</td>
                <td>
                    <button type="button" class="btn btnUpdate  btns edit" data-modulo="${element.id}"
                        data-bs-toggle="modal" data-bs-target="#cReclutaUp">
                        <i class="fa-solid fa-pen-to-square infos edit" style="color: #ffffff;"
                        data-modulo="${element.id}"></i>
                    </button>
                    <button type="button" class="btn btns btnDelete drop" data-modulo="${element.id}">
                        <i class="fa-solid fa-trash infos drop" style="color: #ffffff;" data-modulo="${element.id}"></i>
                    </button>
                </td>
            </tr>
            ` 
        });
        
        return html;
    }

}



self.addEventListener("message",(e)=>{
    Promise.resolve(ws[e.data.accion]((e.data.body)? e.data.body: undefined)).then(res=> postMessage(res));
})