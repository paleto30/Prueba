import{
    addOneRecluta,
    deleteOneRecluta,
    updateOneRecluta
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

    // funcion para eliminar los datos de la tabla
    accionDeleteTabla() {
        const tabla = document.querySelector("#bodyRecluta");
        tabla.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains("drop")) {
                const id = parseInt(e.target.dataset.recluta);
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
                        await deleteOneRecluta(id);
                    }
                });
            }
        })
    },


    addListTeamsUpdtae(){
        const ws = new Worker('./config/wsReclutas.js',{type:"module"});
        ws.postMessage({accion:"showAllTeams"}); 
        ws.addEventListener("message",(e)=>{
            document.querySelector("#teamUp").innerHTML = e.data;
            ws.terminate();
        })
    },


    accionUpdateTable() {
        const tabla = document.querySelector("#bodyRecluta");
        tabla.addEventListener('click', (e) => {
            if (e.target.classList.contains("edit")) {
                const id = parseInt(e.target.dataset.recluta);
                const one = new Worker('./config/wsReclutas.js',{type:"module"});
                one.postMessage({ accion: "getRegisterForUpdate", body: id });
                one.addEventListener("message", (e) => {
                    mostrarRecluta(e.data);
                    one.terminate();
                })

                const formUpdate = document.querySelector("#reclutaUp");
                formUpdate.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const data = Object.fromEntries(new FormData(e.target));
                    data['nombre'] = data.nombre.toUpperCase();
                    data['edad'] = parseInt(data.edad);
                    data['identificacion'] = parseInt(data.identificacion);
                    data['team'] = parseInt(data.team);
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
                           await updateOneRecluta(data);
                        }
                    })
                })
            }
        })
        // de esta manera le seteamos al formulario de actualizacion
        // los datos que ya tiene el registro
        function mostrarRecluta(recluta) {
            const inputId = recluta['id'];
            const inputName = recluta['nombre'];
            const inputImg = recluta['imagen'];
            const inputEdad = recluta['edad'];
            const inpphone  = recluta['telefono'];
            const inpDirec  = recluta['direccion'];
            const inputFechaNac  = recluta['fechaNac'];
            const inpIdenti = recluta['identificacion'];
            const inpFechIng = recluta['fechaIngre'];
            const inpTeam = recluta['team'];

            document.querySelector("#idUp").value = inputId;
            document.querySelector("#nombreUp").value = inputName;
            document.querySelector("#imagenUp").value = inputImg;
            document.querySelector("#edadUp").value = inputEdad;
            document.querySelector("#telefonoUp").value = inpphone;
            document.querySelector("#direccionUp").value = inpDirec;
            document.querySelector("#fechaNacUp").value = inputFechaNac;
            document.querySelector("#identificacionUp").value = inpIdenti;
            document.querySelector("#fechaIngreUp").value = inpFechIng;
            document.querySelector("#teamUp").value = inpTeam;

        }
    },

    searchByName(){
        const buscar = document.querySelector("#buscar");
        buscar.addEventListener("input",(e)=>{
            if (!buscar.value) {
                this.cargarTabla();
            }else{
                const sh =  new Worker('./config/wsReclutas.js',{type:"module"});
                sh.postMessage({accion:"searchByNameR", body:buscar.value.toUpperCase()});
                sh.addEventListener("message",(e)=>{
                    document.querySelector("#bodyRecluta").innerHTML = e.data;
                    sh.terminate();
                })
            }
        })
    },


    UserMoreInformation(){
        const tabla = document.querySelector("#bodyRecluta");
        console.log(tabla);
        tabla.addEventListener("click",(e)=>{
            e.preventDefault();
            if (e.target.classList.contains("info")) {
                const id = parseInt(e.target.dataset.recluta);
                const wsD =  new Worker('./config/wsReclutas.js',{type:"module"});
                wsD.postMessage({accion:"lookDetailsRecluta",body:id});
                wsD.addEventListener("message",(e)=>{
                    console.log(e.data);
                    document.querySelector("#detailsM").innerHTML = e.data;
                    ws.terminate();
                })
            }
        })
    }

}