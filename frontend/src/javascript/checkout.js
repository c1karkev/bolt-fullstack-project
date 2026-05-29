import { emptyCart, getCart } from "./cart.js";
import { showError } from "./index.js";
import { fetchProductById, postOrder } from "./util.js";

const checkoutForm = document.getElementById("checkoutForm");
const submitOrderButton = document.getElementById("submitOrder");

const shippingAreaCode = document.getElementById("areaCode");
const shippingCity = document.getElementById("city");
const shippingStreet = document.getElementById("street");
const shippingHouseNumber = document.getElementById("houseNumber");
const shippingExtra = document.getElementById("additionalAddress");

const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");

const addressMatchesReceipt = document.getElementById("addressMatchesReceipt");
const receiptAreaCode = document.getElementById("areaCodeReceipt");
const receiptCity = document.getElementById("cityReceipt");
const receiptStreet = document.getElementById("streetReceipt");
const receiptHouseNumber = document.getElementById("houseNumberReceipt");

const shippingAddressContainer = document.getElementById("shippingAddress");
const receiptAddressContainerInputs = document.querySelectorAll(
    "#receiptAddressContainer input:not([type='checkbox'])",
);

const checkoutFormInputs = document.querySelectorAll(
    "#checkoutForm input, #checkoutForm textarea",
);
checkoutFormInputs.forEach((element) => {
    element.onchange = validate;
});

const summaryContainer = document.getElementById("summaryContainer");
const summaryFinalPrice = document.getElementById("finalPrice");

validate();

submitOrderButton.addEventListener("click", async () => {
    checkoutForm.classList.add("was-validated");
    if (validate()) {
        try {
            let addressList = [
                shippingAreaCode.value,
                shippingCity.value,
                shippingStreet.value,
                shippingHouseNumber.value,
                shippingExtra.value,
            ];
            let taxAddressList = [
                receiptAreaCode.value,
                receiptCity.value,
                receiptStreet.value,
                receiptHouseNumber.value,
            ];
            await postOrder(
                addressList.join(";"),
                email.value,
                phoneNumber.value,
                taxAddressList.join(";"),
                getCart(),
            );
            emptyCart();
            window.location = "/thankyou.html";
        } catch (err) {
            console.log(err);
            showError(err.message);
        }
    }
});

function validate() {
    // hide shipping address if local pickup, validate for deliveryAddress
    /* if (deliveryMethodHome.checked) {
        shippingAddressContainer.classList.remove("d-none");
        addressMatchesReceipt.parentElement.classList.remove("d-none");
    } else {
        shippingAddressContainer.classList.add("d-none");
        addressMatchesReceipt.parentElement.classList.add("d-none");
        shippingAddressContainer.childNodes.forEach((e) =>
            e.childNodes.forEach((el) => {
                console.log(el);
                try {
                    el.validity.valid = true;
                } catch (err) {
                    console.log(err);
                }
            }),
        );
        addressMatchesReceipt.checked = false;
    }*/

    // disable and fill receipt address if it matches
    if (addressMatchesReceipt.checked) {
        receiptAddressContainerInputs.forEach((e) => (e.disabled = true));
        receiptAreaCode.value = shippingAreaCode.value;
        receiptCity.value = shippingCity.value;
        receiptStreet.value = shippingStreet.value;
        receiptHouseNumber.value = shippingHouseNumber.value;
    } else {
        receiptAddressContainerInputs.forEach((e) => (e.disabled = false));
    }

    // update summary for shipping costs
    updateSummary();

    return checkoutForm.checkValidity();
}

async function updateSummary() {
    let summaryContainerHTML = "";

    const cartData = getCart();
    let finalPrice = 0;
    for (const [key, value] of Object.entries(cartData)) {
        const item = await fetchProductById(key);
        summaryContainerHTML += getSummaryRow(item.name, value, item.price);
        finalPrice += item.price * value;
    }

    summaryContainerHTML += getSummaryRow("Szállítás", 1, 5000);
    finalPrice += 5000;

    summaryContainer.innerHTML = summaryContainerHTML;
    summaryFinalPrice.innerText = finalPrice.toLocaleString();
}
function getSummaryRow(name, amount, price) {
    return `<tr>
                <td>${name}</td>
                <td>${amount > 1 ? "x" + amount : ""}</td>
                <td>${(price * amount).toLocaleString()} Ft</td>
            </tr>`;
}
