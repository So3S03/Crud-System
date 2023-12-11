let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCat = document.getElementById("productCategory");
let productSale = document.getElementById("productSale");
let productDesc = document.getElementById("productDesc");
let showData = document.getElementById("showData");
let searchInput = document.querySelector("#searchInput");
let dataArr = [];
if (localStorage.getItem("proList") != null) {
    dataArr = JSON.parse(localStorage.getItem("proList"));
    displayData()
}
document.getElementById("addBtn").addEventListener("click", function () {
    let dataObj = {
        pName: productName.value,
        productPrice: Number(productPrice.value),
        pCategory: productCat.value,
        pSale: productSale.checked,
        pDesc: productDesc.value
    }
    dataArr.push(dataObj);
    localStorage.setItem("proList", JSON.stringify(dataArr))
    displayData()
    clr()
})
function displayData() {
    let temp = "";
    for (let i = 0; i < dataArr.length; i++) {
        temp += `<tr>
            <td>${i}</td>
            <td>${dataArr[i].pName}</td>
            <td>${dataArr[i].productPrice}</td>
            <td>${dataArr[i].pCategory}</td>
            <td>${dataArr[i].pSale}</td>
            <td>${dataArr[i].pDesc}</td>
            <td><button id="updateBtn" class="btn btn-outline-warning" onclick = "updateData(${i})">Update</button></td>
            <td><button id="delBtn" class="btn btn-outline-danger" onclick = "delData(${i})">Delete</button></td>
        </tr>`
    }
    showData.innerHTML = temp;
}
function clr() {
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productSale.checked = false;
    productDesc.value = "";
    productCat.value = "Tv";
}
function search() {
    let searching = searchInput.value.toLowerCase();
    let temp = "";
    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i].pName.toLowerCase().includes(searching) == true) {
            temp += `<tr>
            <td>${i}</td>
            <td>${dataArr[i].pName.toLowerCase().replace(searching, `<span class ="bg-info">${searching}</span>`)}</td>
            <td>${dataArr[i].productPrice}</td>
            <td>${dataArr[i].pCategory}</td>
            <td>${dataArr[i].pSale}</td>
            <td>${dataArr[i].pDesc}</td>
            <td><button id="updateBtn" class="btn btn-outline-warning" onclick = "updateData(${i})">Update</button></td>
            <td><button id="delBtn" class="btn btn-outline-danger" onclick = "delData(${i})">Delete</button></td>
        </tr>`
        }
    }
    showData.innerHTML = temp;
}
function delData(index) {
    dataArr.splice(index, 1);
    localStorage.setItem("proList", JSON.stringify(dataArr))
    displayData()
}
function updateData(index) {
    let dataUpdate = dataArr.slice(index, index + 1);
    productName.value = dataUpdate[0].pName;
    productPrice.value = dataUpdate[0].productPrice;
    productCat.value = dataUpdate[0].pCategory;
    productSale.checked = dataUpdate[0].pSale;
    productDesc.value = dataUpdate[0].pDesc;
    delData();
    displayData();
}