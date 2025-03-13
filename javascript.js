const url = "https://raw.githubusercontent.com/mkatay/json_ingatlanok/refs/heads/main/ingatlanok";
getData(url, render);

function getData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error fetching data:', error));
}

let type = [];
let valasz = null;

let categories = [];

let haz = [];
let lakas = [];
let nyaralo = [];

const getUniqueValues = (arr, atr) => {
    const newArr = arr.map(obj => obj[atr]);
    const set = new Set(newArr);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
};

function render(data) {
    type = getUniqueValues(data, "category");
    haz = data.filter(item => item.category === "ház");
    lakas = data.filter(item => item.category === "lakás");
    nyaralo = data.filter(item => item.category === "nyaraló");

    const container = document.querySelector('.gomb');
    container.innerHTML = '';
    type.forEach(item => {
        const button = document.createElement('input');
        button.type = 'button';
        button.value = item;
        button.name = 'list-button';
        button.className = 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700';
        button.addEventListener('click', handleClick);
        container.appendChild(button);
    });
}

function handleClick(event) {
    valasz = event.target.value;
    console.log(valasz);
    if (valasz === "ház") renderType(haz);
    if (valasz === "lakás") renderType(lakas);
    if (valasz === "nyaraló") renderType(nyaralo);
}

function renderType(arr) {
    const container = document.querySelector(".show");
    container.innerHTML = "";
    arr.forEach(e => {
        let imgUrl = "https://raw.githubusercontent.com/mkatay/JF_Kando_vizsga_forras/refs/heads/master/public/" + e.imageUrl;
        container.innerHTML += `
        <div class="flex flex-col items-center p-5 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="${imgUrl}" alt="">
            <div class="flex flex-col justify-between p-4 leading-normal relative">
                <div class="absolute top-0 right-0 rounded-full p-2 border-white border-2 dark:bg-gray-800 dark:hover:bg-gray-700 w-15 h-15">${e.category}</div>
                <h5 class="mb-2 text-l tracking-tight text-gray-900 dark:text-white">Eladó: <span class="text-3xl font-bold dark:text-white">${e.sellerName}</span></h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Területe: <span class="dark:text-white font-bold">${e.area}</span>, Szobák száma: <span class="dark:text-white font-bold">${e.rooms}</span></p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">A hirdetés feladási dátuma: <span class="dark:text-white font-bold">${e.createAt}</span></p>
            </div>
        </div>
        `;
    });
}