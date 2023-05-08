

const url = "http://localhost:5000/categorias"

// obtener todos los registros
export const getAllCategories = async ()=>{
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
export const addOneCategory = async (category)=>{
    try {
        await fetch(url,{
            method: "POST",
            body: JSON.stringify(category),
            headers:{
                "Content-Type":"application/json"
            }
        });
    } catch (error) {
        console.log(error);
    }
}

// borrar un registro (por id)
export const deleteOneCategory = async (id)=>{
    try {
        await fetch(`${url}/${id}`,{
            method: "DELETE"
        })
    } catch (error) {  
        console.log(error);
    }
}

// actualizar un registro (por su id)
export const updateOneCategory = async (category)=>{
    try {
        await fetch(`${url}/${category.id}`,{
            method: "PUT",
            body: JSON.stringify(category),
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
        const data = await fetch(`${url}?name_like=${text}`);
        const result = await data.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}


