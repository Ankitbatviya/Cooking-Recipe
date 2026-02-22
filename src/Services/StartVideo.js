import axios from "axios";

const startVideo = (mealId) => {
    
    axios.get(`${import.meta.env.VITE_BASE_URL}lookup.php?i=${mealId}`)
    .then(response => {
        const youtubeUrl = response.data.meals[0].strYoutube;
        window.open(youtubeUrl, '_blank');
    })
}

export default startVideo;