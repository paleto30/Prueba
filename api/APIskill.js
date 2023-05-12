

const url = "http://localhost:4500/skills";




// obtener todos los registros
export const getAllSkill = async ()=>{
    try {
        const datos = await fetch(url);
        const result = await datos.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// obtener un registro por id
export const getOneSkillById = async (id)=>{
    try {
        const data = await fetch(`${url}/${id}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}


// agregar un nuevo registro
export const addOneSkill = async (skill)=>{
    try {
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(skill),
            headers:{
                "Content-Type":"application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// borrar un registro (por id)
export const deleteOneSkill = async (id)=>{
    try {
        await fetch(`${url}/${id}`,{
            method: "DELETE"
        })
    } catch (error) {  
        console.log(error);
    }
}

// actualizar un registro (por su id)
export const updateOneSkill = async (skill)=>{
    try {
        await fetch(`${url}/${skill.id}`,{
            method: "PUT",
            body: JSON.stringify(skill),
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
