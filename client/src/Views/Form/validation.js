
const date = (released) => {
    const date = new Date();
    const year = date.getFullYear();
    const dateOfReleased = released.split("-");
    const yearReleased = parseInt(dateOfReleased[0]);

    if(released.trim() === "") return "Required";
    if(yearReleased > year || yearReleased < 1958) return "The date is not correct";
    return "";
}


const validation = (data) => {
    const { name, released, rating, platforms, genres, description} = data;
    let errors = {};

    errors.name = name.trim() === "" ? "Required" : "";
    errors.released = date(released);
    errors.rating = rating > 5 || rating < 0 ? "The maximum rating is 5 and the minimum is 0" : "";
    errors.platforms = platforms.length === 0 ? "You must select at least one platform" : "";
    errors.genres = genres.length === 0 ? "You must select at least one genre" : ""; 
    errors.description = description.trim() === "" ? "Required" : "";

    return errors;
}

export default validation;