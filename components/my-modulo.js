import {
    addOneModule,
} from '../api/APImodulskill.js';


export default{

    listSkills(){
        const ws = new Worker('./config/wsModulo.js',{type:"module"});
        ws.postMessage({accion:"listSkill"});
        ws.addEventListener("message",(e)=>{
            document.querySelector("#skill").innerHTML = e.data;
            ws.terminate();
        })
    },
    
    addNewModule(){
        const form = document.querySelector("#fModul");
        form.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            data['nombre'] = data.nombre.toUpperCase();
            data['skillId'] = parseInt(data.skillId);
            await addOneModule(data);
            formPost.reset();
        })
    },


    cargarTabla(){
        const ws = new Worker('./config/wsModulo.js',{type:"module"});
        ws.postMessage({accion:"showAllRegisters"});
        ws.addEventListener("message",(e)=>{
            document.querySelector("#bodyModul").innerHTML = e.data;
            ws.terminate();
        })
        
    } 

    

}