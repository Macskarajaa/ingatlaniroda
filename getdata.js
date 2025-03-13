async function getData(url, render){
    const response = await fetch(url)
    const data = await response.json()
    render(data)
}