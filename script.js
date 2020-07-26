const homePage = document.getElementsByClassName("main-div")[0];
const title = document.getElementsByClassName("title")[0];
const searchBar = document.getElementsByClassName("search-bar")[0];
const searchContent = document.getElementsByClassName("search-content")[0];
const searchQuery = document.getElementsByClassName("search-query")[0];
const searchBtn = document.getElementById("country-search")
const link = "https://restcountries.eu/rest/v2/all";

const contentPage = document.getElementsByClassName("content-div")[0];
const countryName = document.getElementById("country-name");
const countryFlag = document.getElementById("country-flag");
const countryCapital = document.getElementsByClassName("capital")[0].getElementsByTagName("h2")[0];
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

// Home page

searchBar.addEventListener("keyup", function() {
    let tempData = [];
    let search = searchBar.value.toLowerCase();

    const tempQuery = document.createElement("p");

    search.length === 0 ? searchContent.classList.add("hide") : searchContent.classList.remove("hide")
    for (const country of data) {
        if(country.name.toLowerCase().includes(search)) {
            tempData.push(country)
        }
    }
    searchQuery.innerHTML = "";
    if(tempData.length >= 8) {
        for (let i = 0; i < 7; i++) {
            const tempQuery = document.createElement("a");
            tempQuery.setAttribute("href", "#")
            tempQuery.classList.add("search-query-block")
            tempQuery.addEventListener("click", () => {
                printContentPage(tempData[i])
            })
            tempQuery.innerText = tempData[i].name
            searchQuery.appendChild(tempQuery)
        }
    }
    if(tempData.length < 8) {
        for (let i = 0; i < tempData.length; i++) {
            const tempQuery = document.createElement("a");
            tempQuery.setAttribute("href", "#")
            tempQuery.classList.add("search-query-block")
            tempQuery.addEventListener("click", () => {
                printContentPage(tempData[i])
            })
            tempQuery.innerText = tempData[i].name
            searchQuery.appendChild(tempQuery)
        }
    }
})

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

// Content page

const printContentPage = (obj) => {

    homePage.classList.add("hide");
    contentPage.classList.remove("hide")

    countryName.innerHTML = obj.name
    countryFlag.setAttribute("src", obj.flag)

    countryCapital.innerText = `Capital: ${obj.capital}`

    countryInfo[0].innerHTML = "Native Name: " + obj.nativeName
    countryInfo[1].innerHTML = "Population: " + obj.population.toLocaleString();
    countryInfo[2].innerText += `Region: ${obj.region}`
    countryInfo[2].innerText += `\nSub-Region: ${obj.subregion}`

    obj.currencies.forEach(e => {
        const div = document.createElement("div");
        const par = document.createElement("p");
        par.innerText = `${e.name} {${e.symbol}}`;
        div.appendChild(par)
        countryCurrency.appendChild(div);
    })

    obj.borders.forEach(e => {
        data.forEach(x => {
            if(e === x.alpha3Code) {

                const mainDiv =  document.getElementsByClassName("borders-div")[0]
                const div = document.createElement("div");
                const img = document.createElement("img");
                const par = document.createElement("p");
                
                img.classList.add("card-image")
                img.setAttribute("src", x.flag);

                par.classList.add("card-text")
                par.innerText = x.name

                div.classList.add("card-content")
                div.addEventListener("click", () => {
                    alert("click")
                })

                div.appendChild(img);
                div.appendChild(par);

               mainDiv.appendChild(div);

            }
        });
        
    });
}

// setTimeout(() => {
//     printContentPage(data[0])
// }, 2000);

// setTimeout(() => {

//     countryName.innerHTML = data[0].name
//     countryFlag.setAttribute("src", data[0].flag)

//     countryCapital.innerText = `Capital: ${data[0].capital}`

//     countryInfo[0].innerHTML = "Native Name: " + data[0].nativeName
//     countryInfo[1].innerHTML = "Population: " + data[0].population.toLocaleString();
//     countryInfo[2].innerText += `Region: ${data[0].region}`
//     countryInfo[2].innerText += `\nSub-Region: ${data[0].subregion}`

//     data[0].currencies.forEach(e => {
//         const div = document.createElement("div");
//         const par = document.createElement("p");
//         par.innerText = `${e.name} {${e.symbol}}`;
//         div.appendChild(par)
//         countryCurrency.appendChild(div);
//     })

//     data[0].borders.forEach(e => {
//         data.forEach(x => {
//             if(e === x.alpha3Code) {

//                 const mainDiv =  document.getElementsByClassName("borders-div")[0]
//                 const div = document.createElement("div");
//                 const img = document.createElement("img");
//                 const par = document.createElement("p");
                
//                 img.classList.add("card-image")
//                 img.setAttribute("src", x.flag);

//                 par.classList.add("card-text")
//                 par.innerText = x.name

//                 div.classList.add("card-content")
//                 div.addEventListener("click", () => {
//                     alert("click")
//                 })

//                 div.appendChild(img);
//                 div.appendChild(par);

//                mainDiv.appendChild(div);

//             }
//         });
        
//     });
// }, 2000);




// COVID SECTION