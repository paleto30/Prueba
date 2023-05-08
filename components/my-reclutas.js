import{
    addOneRecluta
} from '../api/APIreclutas.js';
export default{


    addListTeams(){
        const ws = new Worker('./config/wsReclutas.js',{type:"module"});
        ws.postMessage({accion:"showAllTeams"}); 
        ws.addEventListener("message",(e)=>{
            document.querySelector("#teams").innerHTML = e.data;
            ws.terminate();
        })
    },
    

    addNewRecluta(){
        const formPost =  document.querySelector("#recluta");  
        formPost.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target)); 
            data['nombre'] = data.nombre.toUpperCase();
            data['edad'] = parseInt(data.edad);
            data['identificacion'] = parseInt(data.identificacion);
            data['team'] = parseInt(data.team);
            await addOneRecluta(data);
            formPost.reset();
        })
    },

    // funcion para cargar los datos de la tabla 
    cargarTabla() {
        const all = new Worker('./config/wsReclutas.js',{type:"module"});
        all.postMessage({ accion: "showAllRegistros" });
        all.addEventListener("message", (e) => {
            document.querySelector("#bodyRecluta").innerHTML = e.data;
            all.terminate();
        })
    },

}