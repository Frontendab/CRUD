let inpTitle = document.getElementById('inpTitle');
let inpPrice = document.getElementById('inpPrice');
let inpTaxes = document.getElementById('inpTaxes');
let inpAds = document.getElementById('inpAds');
let inpDiscount = document.getElementById('inpDiscount');
let total = document.getElementById('total');
let inpCount = document.getElementById('inpCount');
let inpGategory = document.getElementById('inpGategory');
let btn = document.getElementById('create');
let tmp;
let inpSearch = document.getElementById('inpSearch');
let searchByTitle = document.getElementById('search by title');
let searchByGategory = document.getElementById('search by Gategory');

    //*? clac total 

function clacTotal(){
    if( inpPrice.value !=''){
        let result = (+inpPrice.value + +inpTaxes.value + +inpAds.value) - +inpDiscount.value;
        total.innerHTML= result;
        total.style.background ='green';
    }
    else{
        total.innerHTML='';
        total.style.background ='red';
    };
};

    //*? save data in localStorage

let dataE;
if (localStorage.Elements != null) {
    dataE = JSON.parse(localStorage.Elements);
}else{
    dataE = [];
}
btn.onclick = function (){
    
    let values = {
        inpTitle:inpTitle.value, 
        inpPrice:inpPrice.value,        
        inpTaxes:inpTaxes.value,        
        inpAds:inpAds.value,        
        inpDiscount:inpDiscount.value,        
        total:total.innerHTML,        
        inpCount:inpCount.value,        
        inpGategory:inpGategory.value,       
    };
    if (inpTitle.value != '' && values.inpCount < 100) {
       if (btn.getAttribute('data-text') === 'create') {
        if (values.inpCount > 1) {
        for (let c = 0; c < values.inpCount; c++) {
            dataE.push(values);
        }
    }else{
        dataE.push(values);
    }
    }else{
        dataE[tmp] = values;
        btn.setAttribute(('data-text'),'create');
        btn.innerHTML = 'Create';
        inpCount.style.display = 'block';
    };
    clearData();
    }
    
    localStorage.setItem('Elements',JSON.stringify(dataE));

    showData();
};

//*? clean data 

function clearData() {
    inpTitle.value = '';
    inpPrice.value = '';
    inpTaxes.value = '';
    inpAds.value = '';
    inpDiscount.value = '';
    total.innerHTML = '';
    inpCount.value = '';
    inpGategory.value = '';
};

//*? get input values and make the table with show data

function showData() {
    clacTotal();
    let table ='';
    for (let i = 0; i < dataE.length; i++) { 
    table +=`
    <tr>
        <td>${i+1}</td>
        <td>${dataE[i].inpTitle}</td>
        <td>${dataE[i].inpPrice}</td>
        <td>${dataE[i].inpTaxes}</td>
        <td>${dataE[i].inpAds}</td>
        <td>${dataE[i].inpDiscount}</td>
        <td>${dataE[i].total}</td>
        <td>${dataE[i].inpGategory}</td>
        <td><button onclick="updata(${i})" id="updata">Updata</button></td>
        <td><button onclick="daleteData(${i})" id="dalete">Dalete</button></td>
    </tr>
    `;
}
document.getElementById('tbody').innerHTML = table;
//** Design button dalete All
let btnDaleteAll = document.getElementById('DivDaleteAll');
if (dataE.length > 0) {
    btnDaleteAll.innerHTML =`
    <button onclick="DaleteAll()">Dalete All (${dataE.length})</button>
    `;
}else{
    btnDaleteAll.innerHTML = '';
}
};

showData();

//*? fonction for dalete All 

function DaleteAll(){
    dataE.splice(0);
    localStorage.clear();
    showData();
};

//*? Dalete 

function daleteData(i){
    dataE.splice(i,1);
    localStorage.Elements = JSON.stringify(dataE);
    showData(); 
};

//*? Updata 

function updata(i){
    if (btn.getAttribute('data-text'),'create') {
    inpTitle.value = dataE[i].inpTitle;
    inpPrice.value = dataE[i].inpPrice;
    inpTaxes.value = dataE[i].inpTaxes;
    inpAds.value = dataE[i].inpAds;
    inpDiscount.value = dataE[i].inpDiscount;
    clacTotal();
    inpGategory.value = dataE[i].inpGategory;
    //** dalete input count
    inpCount.style.display = 'none';
    //** change data-text from create to updata
    btn.setAttribute(('data-text'),'updata');
    btn.innerHTML = 'Updata';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    });
   };     
};



//**  search function on data 

let searchMood = 'title';
function search(id){
    if (id === 'search by title') {
        searchMood = 'title';
    }else{
        inpSearch.setAttribute('placeholder','Search By Gategory');
        searchMood = 'Gategory';
    }
inpSearch.setAttribute('placeholder','Search By ' + searchMood);
inpSearch.focus();
inpSearch.value = '';
showData();
}

function searchData(value){
    let table ='';
    for (let i = 0; i < dataE.length; i++) {
    if(searchMood == 'title'){
            if(dataE[i].inpTitle.includes(value)){
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataE[i].inpTitle}</td>
                    <td>${dataE[i].inpPrice}</td>
                    <td>${dataE[i].inpTaxes}</td>
                    <td>${dataE[i].inpAds}</td>
                    <td>${dataE[i].inpDiscount}</td>
                    <td>${dataE[i].total}</td>
                    <td>${dataE[i].inpGategory}</td>
                    <td><button onclick="updata(${i})" id="updata">Updata</button></td>
                    <td><button onclick="daleteData(${i})" id="dalete">Dalete</button></td>
                </tr>
                `;
            };
    }else{
            if(dataE[i].inpGategory.includes(value)){
                table +=`
                <tr>
                    <td>${i}</td>
                    <td>${dataE[i].inpTitle}</td>
                    <td>${dataE[i].inpPrice}</td>
                    <td>${dataE[i].inpTaxes}</td>
                    <td>${dataE[i].inpAds}</td>
                    <td>${dataE[i].inpDiscount}</td>
                    <td>${dataE[i].total}</td>
                    <td>${dataE[i].inpGategory}</td>
                    <td><button onclick="updata(${i})" id="updata">Updata</button></td>
                    <td><button onclick="daleteData(${i})" id="dalete">Dalete</button></td>
                </tr>
                `;
            };
    };
    }
    document.getElementById('tbody').innerHTML = table;
}









/*
function onkeySearch(value){

}*/

















