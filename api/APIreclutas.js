

const url = " http://localhost:4500/reclutas"

// obtener todos los registros
export const getAllReclutas = async ()=>{
    try {
        const datos = await fetch(url);
        const result = await datos.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// obtener un registro por id
export const getOneById = async (id)=>{
    try {
        const data = await fetch(`${url}/${id}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}


// agregar un nuevo registro
export const addOneRecluta = async (recluta)=>{
    try {
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(recluta),
            headers:{
                "Content-Type":"application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// borrar un registro (por id)
export const deleteOneRecluta = async (id)=>{
    try {
        await fetch(`${url}/${id}`,{
            method: "DELETE"
        })
    } catch (error) {  
        console.log(error);
    }
}

// actualizar un registro (por su id)
export const updateOneRecluta = async (recluta)=>{
    try {
        await fetch(`${url}/${recluta.id}`,{
            method: "PUT",
            body: JSON.stringify(recluta),
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
        const data = await fetch(`${url}?q=${text}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}
