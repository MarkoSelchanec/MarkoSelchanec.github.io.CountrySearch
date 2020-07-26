const title = document.getElementsByClassName("title")[0];
const link = "https://restcountries.eu/rest/v2/all";

const countryName = document.getElementById("country-name");
const countryFlag = document.getElementById("country-flag");
const countryInfo = document.getElementsByClassName("country-info")[0].getElementsByTagName("p");
const countryCurrency = document.getElementsByClassName("currency")[0];
const countryBorders = document.getElementsByClassName("borders-div")[0];

let data = [];

let getData = async (link) => {
    const res = await fetch(link);

    const final = await res.json();

    final.forEach(e => {
        data.push(e)
    });
}


getData(link)
setTimeout(() => {
    console.log(data)
}, 2000);

// Title 

let titleLetters = document.getElementsByTagName("span");
const colors = ["red", "green", "royalblue", "purple", "orange"];

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}

for (let i = 0; i < titleLetters.length; i++) {
    titleLetters[i].style.color = colors[getRandom(0, colors.length)]
}

// // Content page
setTimeout(() => {
    // let img = document.getElementsByClassName('test')[0];
    // let par = document.getElementsByTagName("p")
    // img.setAttribute("src", data[0].flag)
    // par[0].innerText = data[0].capital
    // par[1].innerText = data[0].currencies[0].name;
    // data[0].languages.forEach(e => par[2].innerText += e.name + "\n")
    // par[3].innerText = data[0].population.toLocaleString();

    countryName.innerHTML = data[0].name
    countryFlag.setAttribute("src", data[0].flag)

    countryInfo[0].innerHTML = "Native Name: " + data[0].nativeName
    countryInfo[1].innerHTML = "Population: " + data[0].population.toLocaleString();
    countryInfo[2].innerText += `Region: ${data[0].region}`
    countryInfo[2].innerText += `\nSub-Region: ${data[0].subregion}`

    data[0].currencies.forEach(e => {
        const div = document.createElement("div");
        const par = document.createElement("p");
        par.innerText = `${e.name} {${e.symbol}}`;
        div.appendChild(par)
        countryCurrency.appendChild(div);
    })

    data[0].borders.forEach(e => {
        data.forEach(x => {
            if(e === x.alpha3Code) {
                const div = document.createElement("div");
                const par = document.createElement("p");
                const img = document.createElement("img");
                img.setAttribute("src", x.flag)
                img.style.height = "75px";
                div.appendChild(img)
                par.innerText = `${x.name}`;
                div.style.display = "flex";
                div.appendChild(par)
                countryBorders.appendChild(div);
            }
        });
        
    });
}, 2000);




// COVID SECTION