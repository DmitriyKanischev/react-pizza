export const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : []
}