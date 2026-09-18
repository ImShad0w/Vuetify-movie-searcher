import { ref } from "vue"
import axios from "axios"

export function useApi() {
  //Declare the API key and the API URL
  const API_KEY = "643ab5dc"
  const API_URL = "https://www.omdbapi.com/"
  const movies = ref([])
  const movieInfo = ref(null)

  async function getMovies(search: string) {
    if (!search) return []
    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          s: String(search),
        },
      })
      if (response.data.Response === "True") {
        movies.value = response.data.Search ?? []
      } else {
        console.warn("OMDb error:", response.data.Error)
        movies.value = []
      }
    } catch (error) {
      console.error(error)
      movies.value = []
    }
    return movies.value
  }

  async function getMovieInfo(movieId: string) {
    if (!movieId) return null
    try {
      const response = await axios.get(API_URL, {
        params: {
          apikey: API_KEY,
          i: String(movieId),
        },
      })
      if (response.data.Response === "True") {
        movieInfo.value = response.data
      } else {
        console.warn("OMDb error:", response.data.Error)
        movieInfo.value = null
      }
    } catch (error) {
      console.error(error)
      movieInfo.value = null
    }
    return movieInfo.value
  }

  return { movies, movieInfo, getMovies, getMovieInfo }
}
