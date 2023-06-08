let title = document.getElementById('inpTitle');
let price = document.getElementById('inpPrice');
let taxes = document.getElementById('inpTaxes');
let ads = document.getElementById('inpAds');
let discount = document.getElementById('inpDiscount');
let total = document.getElementById('total');
let count = document.getElementById('inpCount');
let gategory = document.getElementById('inpGategory');
let btn = document.getElementById('create');
let tmp = '';
let dataAr = [];
let inpSearch = document.getElementById('inpSearch');
let button1 = document.getElementById('search by title');
let button2 = document.getElementById('search by Gategory');

function clacTotal(){
    if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background ='green';
    }
    else{
        total.innerHTML ='';
        total.style.background ='red';
    };
}

if (localStorage.p != null) {
    dataAr = JSON.parse(localStorage.p);
}else{
    dataAr = [];
}

btn.onclick = function (){
clacTotal();
    let values = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        gategory:gategory.value.toLowerCase(),
    }
    if (title.value != '') {
    if (btn.getAttribute('data-text') === 'create') {
        if (values.count > 0) {
            for (let i = 0 ; i < values.count; i++) {
            dataAr.push(values);
        }
        }else{
        dataAr.push(values);
         }
     
    }else{
        dataAr[tmp] = values;
        btn.setAttribute('data-text','create');
        btn.innerHTML = 'Create';
        count.style.display = 'block';
}
cleanData();
}
    localStorage.setItem('p', JSON.stringify(dataAr));
    showData();

};

function cleanData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    clacTotal();
    count.value = '';
    gategory.value = '';
};



function showData(){
    let table  = '';
    for (let i = 0; i < dataAr.length; i++) {
        table +=`
        <tr>
             <td>${i+1}</td>
             <td>${dataAr[i].title}</td>
             <td>${dataAr[i].price}</td>
             <td>${dataAr[i].taxes}</td>
             <td>${dataAr[i].ads}</td>
             <td>${dataAr[i].discount}</td>
             <td>${dataAr[i].total}</td>
             <td>${dataAr[i].gategory}</td>
             <td><button onclick="updata(${i})" id="updata">Updata</button></td>
             <td><button onclick="deleteData(${i})" id="dalete">Delete</button></td>
        </tr>
    `;
   }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById('daleteAll');

    if (dataAr.length > 0) {
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataAr.length})</button>
        `;
    }else{
        btnDeleteAll.innerHTML = '';
    }
}
showData();


function deleteData(i){
    dataAr.splice(i,1);
    localStorage.p = JSON.stringify(dataAr);
    showData();
}

function updata(i){

    title.value = dataAr[i].title;
    price.value = dataAr[i].price;
    taxes.value = dataAr[i].taxes;
    ads.value = dataAr[i].ads;
    discount.value = dataAr[i].discount;
    clacTotal();
    count.style.display = 'none';
    gategory.value = dataAr[i].gategory;
    btn.setAttribute('data-text','updata');
    btn.innerHTML = 'Updata';
    scroll({
        top:0,
        behavior:'smooth',
    });
    tmp = i;  

}

function deleteAll(){
    localStorage.clear();
    dataAr.splice(0);
    showData();
};

let searchMood ;
function changeDesignInput(id){
if (id == 'search by title') {
    searchMood = 'Title';
}else{
    searchMood = 'Gategory';
}
inpSearch.focus();
inpSearch.placeholder = 'Search By '+ searchMood;
inpSearch.value = '';
showData();
}

function searchLoop(value) {
    let table = '';
    for (let i = 0; i < dataAr.length; i++) {
        if (searchMood == 'Title') {
            if (dataAr[i].title.includes(value.toLowerCase())) {
                table +=`
                <tr>
                     <td>${i+1}</td>
                     <td>${dataAr[i].title}</td>
                     <td>${dataAr[i].price}</td>
                     <td>${dataAr[i].taxes}</td>
                     <td>${dataAr[i].ads}</td>
                     <td>${dataAr[i].discount}</td>
                     <td>${dataAr[i].total}</td>
                     <td>${dataAr[i].gategory}</td>
                     <td><button onclick="updata(${i})" id="updata">Updata</button></td>
                     <td><button onclick="deleteData(${i})" id="dalete">Delete</button></td>
                </tr>
            `;
            }
        }else{
            if (dataAr[i].gategory.includes(value.toLowerCase())) {
                table +=`
                <tr>
                     <td>${i+1}</td>
                     <td>${dataAr[i].title}</td>
                     <td>${dataAr[i].price}</td>
                     <td>${dataAr[i].taxes}</td>
                     <td>${dataAr[i].ads}</td>
                     <td>${dataAr[i].discount}</td>
                     <td>${dataAr[i].total}</td>
                     <td>${dataAr[i].gategory}</td>
                     <td><button onclick="updata(${i})" id="updata">Updata</button></td>
                     <td><button onclick="deleteData(${i})" id="dalete">Delete</button></td>
                </tr>
            `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}