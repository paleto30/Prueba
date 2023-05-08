import {
    addOneTeam,
    deleteOneTeam,
    updateOneTeam,
    
} from '../api/APIteam.js';

export default{

    addNewRegistro(){
        const formPost =  document.querySelector("#team");  
        formPost.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target)); 
            data['nombre'] = data.nombre.toUpperCase();
            data['trainer'] = data.trainer.toUpperCase();
            await addOneTeam(data);
            formPost.reset();
        })
    },

    // funcion para cargar los datos de la tabla 
    cargarTabla() {
        const all = new Worker('./config/wsTeams.js', { type: "module" });
        all.postMessage({ accion: "showAllRegistros" });
        all.addEventListener("message", (e) => {
            document.querySelector("#bodyTeams").innerHTML = e.data;
            all.terminate();
        })
    },

    // funcion para eliminar los datos de la tabla
    accionDeleteTabla() {
        const tabla = document.querySelector("#bodyTeams");
        tabla.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains("drop")) {
                const id = parseInt(e.target.dataset.team);
                Swal.fire({
                    title: 'estas seguro?',
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, borrar!'
                }).then( async (result) => {
                    if (result.isConfirmed) {  
                        await deleteOneTeam(id);
                    }
                });
            }
        })
    },

    accionUpdateTable() {

        const tabla = document.querySelector("#bodyTeams");
        tabla.addEventListener('click', (e) => {
            if (e.target.classList.contains("edit")) {
                const id = parseInt(e.target.dataset.team);
                const one = new Worker('./config/wsTeams.js', { type: "module" });
                one.postMessage({ accion: "getRegisterForUpdate", body: id });
                one.addEventListener("message", (e) => {
                    mostrarTeam(e.data);
                    one.terminate();
                })

                const formUpdate = document.querySelector("#teamU");
                formUpdate.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.target));
                    data['nombre'] = data.nombre.toUpperCase();
                    data['trainer'] = data.trainer.toUpperCase();
                    Swal.fire({
                        title: 'Estas seguro?',
                        text: "",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, actualizar!'
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                           await updateOneTeam(data);
                        }
                    })
                })
            }
        })
        // de esta manera le seteamos al formulario de actualizacion
        // los datos que ya tiene el registro
        function mostrarTeam(team) {
            const inputId = team['id'];
            const inputName = team['nombre'];
            const inputTrainer = team['trainer'];
            document.querySelector("#nombreUp").value = inputName;
            document.querySelector("#trainerUp").value = inputTrainer
            document.querySelector("#idUp").value = inputId;
        }
    },


    async searchByName(){
        const buscar = document.querySelector("#buscar");
        buscar.addEventListener("input",(e)=>{
            if (!buscar.value) {
                this.cargarTabla();
            }else{
                const sh = new Worker('./config/wsTeams.js', { type: "module" });
                sh.postMessage({accion:"searchByName", body:buscar.value.toUpperCase()});
                sh.addEventListener("message",(e)=>{
                    document.querySelector("#bodyTeams").innerHTML = e.data;
                    sh.terminate();
                })
            }
        })
    }
}