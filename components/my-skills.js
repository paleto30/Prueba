import{
    addOneSkill,
    deleteOneSkill,
    updateOneSkill
} from '../api/APIskill.js';
export default{

    addNewRegistro(){
        const formPost = document.querySelector("#skill");  
        formPost.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target)); 
            data['nombre'] = data.nombre.toUpperCase();
            await addOneSkill(data);
            formPost.reset();
        })
    },

     // funcion para cargar los datos de la tabla 
     cargarTabla() {
        const all = new Worker('./config/wsSkills.js', { type: "module" });
        all.postMessage({ accion: "showAllRegistros" });
        all.addEventListener("message", (e) => {
            document.querySelector("#bodySkill").innerHTML = e.data;
            all.terminate();
        })
    },

     // funcion para eliminar los datos de la tabla
     accionDeleteTabla() {
        const tabla = document.querySelector("#bodySkill");
        tabla.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains("drop")) {
                const id = parseInt(e.target.dataset.skill);
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
                        await deleteOneSkill(id);
                    }
                });
            }
        })
    },

    accionUpdateTable() {
        const tabla = document.querySelector("#bodySkill");
        tabla.addEventListener('click', (e) => {
            if (e.target.classList.contains("edit")) {
                const id = parseInt(e.target.dataset.skill);
                const one = new Worker('./config/wsSkills.js', { type: "module" });
                one.postMessage({ accion: "getRegisterForUpdate", body: id });
                one.addEventListener("message", (e) => {
                    mostrarSkill(e.data);
                    one.terminate();
                })

                const formUpdate = document.querySelector("#skillU");
                formUpdate.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.target));
                    data['nombre'] = data.nombre.toUpperCase();
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
                           await updateOneSkill(data);
                        }
                    })
                })
            }
        })
        // de esta manera le seteamos al formulario de actualizacion
        // los datos que ya tiene el registro
        function mostrarSkill(team) {
            const inputId = team['id'];
            const inputName = team['nombre'];
            document.querySelector("#nombreUp").value = inputName;
            document.querySelector("#idUp").value = inputId;
        }
    },

    searchByName(){
        const buscar = document.querySelector("#buscar");
        buscar.addEventListener("input",(e)=>{
            if (!buscar.value) {
                this.cargarTabla();
            }else{
                const sh = new Worker('./config/wsSkills.js', { type: "module" });
                sh.postMessage({accion:"searchByName", body:buscar.value.toUpperCase()});
                sh.addEventListener("message",(e)=>{
                    document.querySelector("#bodySkill").innerHTML = e.data;
                    sh.terminate();
                })
            }
        })
    }






}