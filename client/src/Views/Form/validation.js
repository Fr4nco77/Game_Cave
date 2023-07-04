
const date = (released) => {
    const date = new Date();
    const year = date.getFullYear();
    const dateOfReleased = released.split("-");
    const yearReleased = parseInt(dateOfReleased[0]);

    if(released.trim() === "") return "Campo Obligatorio";
    if(yearReleased > year || yearReleased < 1958) return "La fecha no es correcta";
    return "";
}


const validation = (data) => {
    const { name, released, rating, platforms, genres, description} = data;
    let errors = {};

    errors.name = name.trim() === "" ? "Campo Obligatorio" : "";
    errors.released = date(released);
    errors.rating = rating > 5 || rating < 0 ? "El rating maximo es 5 y el minimo es 0" : "";
    errors.platforms = platforms.length === 0 ? "Debe seleccionar al meneos una plataforma" : "";
    errors.genres = genres.length === 0 ? "Debes seleccionar al menos un genero" : ""; 
    errors.description = description.trim() === "" ? "Campo Obligatorio" : "";

    return errors;
}

export default validation;