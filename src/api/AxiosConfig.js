import axios from "axios";

const swApi = axios.create({ baseURL: "https://swapi.dev/api/" });
const picApi = axios.create({ baseURL: "https://picsum.photos/" });

export { swApi, picApi };
