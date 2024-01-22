const btnAbrirModal = 
document.querySelector(".btn-abrir-modal");
const btnRegModal =
document.querySelector(".btn-reg-modal");
const btnLogModal =
document.querySelector(".btn-log-modal");
const modal =
document.querySelector(".modal");

btnAbrirModal.addEventListener("click",()=> {
    modal.showModal();
})

btnRegModal.addEventListener("click",()=> {
    modal.close();
    window.location.href = "../pages/register.html";
})

btnLogModal.addEventListener("click",()=> {
    modal.close();
    window.location.href = "../pages/login.html";
})
