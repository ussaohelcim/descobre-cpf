import { descobreCPFs, getEstado } from "./cpf.js";
const inputCPF = document.querySelector("#cpf");
const checkboxCompleto = document.querySelector("#checkbox");
const checkboxJSON = document.querySelector("#jsoncheckbox");
const btnDescobrir = document.querySelector("#btn");
const output = document.querySelector("#output");
const downloadJson = (name, list) => {
    let blob = new Blob([JSON.stringify(list)], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let time = new Date();
    let a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
btnDescobrir.addEventListener('click', (me) => {
    me.preventDefault();
    output.innerHTML = "";
    let lista = descobreCPFs(inputCPF.value, checkboxCompleto.checked);
    if (checkboxJSON.checked) {
        let filter = document.querySelector("#filter");
        if (filter.value) {
            lista = lista.filter((cpf) => {
                let t = cpf;
                let estado = getEstado(cpf) || getEstado(t.cpf);
                return estado === filter.value;
            });
        }
        downloadJson(inputCPF.value, lista);
    }
    else {
        let filter = document.querySelector("#filter");
        lista.forEach((cpf) => {
            let e = document.createElement('p');
            let t = cpf;
            if (filter.value) {
                let estado = getEstado(cpf) || getEstado(t.cpf);
                if (estado !== filter.value) {
                    return;
                }
            }
            if (t.estado) {
                e.textContent = `${t.cpf} : ${t.estado}`;
            }
            else {
                e.textContent = cpf;
            }
            output?.appendChild(e);
        });
    }
});
