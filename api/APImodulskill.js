

const url = "http://localhost:4500/moduloSkills";




// obtener todos los registros
export const getAllModules = async ()=>{
    try {
        const datos = await fetch(`${url}?_expand=skill`);
        const result = await datos.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// obtener un registro por id
export const getOneModuleById = async (id)=>{
    try {
        const data = await fetch(`${url}/${id}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}


// agregar un nuevo registro
export const addOneModule = async (modul)=>{
    try {
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(modul),
            headers:{
                "Content-Type":"application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// borrar un registro (por id)
export const deleteOneModule = async (id)=>{
    try {
        await fetch(`${url}/${id}`,{
            method: "DELETE"
        })
    } catch (error) {  
        console.log(error);
    }
}

// actualizar un registro (por su id)
export const updateOneModule = async (modul)=>{
    try {
        await fetch(`${url}/${modul.id}`,{
            method: "PUT",
            body: JSON.stringify(modul),
            headers: {
                "Content-Type":"application/json"
            }
       })
    } catch (error) {
        console.log(error);
    }
}

// filtrar registros por el campo name 
export const searchRegistersLike = async (text)=>{
    try {
        const data = await fetch(`${url}?nombre_like=${text}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}
