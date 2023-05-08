

const url = " http://localhost:4500/team"

// obtener todos los registros
export const getAllTeams = async ()=>{
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
export const addOneTeam = async (team)=>{
    try {
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(team),
            headers:{
                "Content-Type":"application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// borrar un registro (por id)
export const deleteOneTeam = async (id)=>{
    try {
        await fetch(`${url}/${id}`,{
            method: "DELETE"
        })
    } catch (error) {  
        console.log(error);
    }
}

// actualizar un registro (por su id)
export const updateOneTeam = async (team)=>{
    try {
        await fetch(`${url}/${team.id}`,{
            method: "PUT",
            body: JSON.stringify(team),
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
