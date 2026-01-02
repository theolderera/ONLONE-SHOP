import { showProducts } from "./dom.js";

export let url="http://localhost:8000/products"

export async function getProducts() {
    try {
        const {data}=await axios.get(url)
        showProducts(data)
    } catch (error) {
        console.error(error);
    }
}