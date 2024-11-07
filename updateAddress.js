const url = 'https://go-wash-api.onrender.com/api/auth/address/'

const savedHtml = localStorage.getItem("updateAddress");

const address = document.createElement("section");
address.innerHTML = savedHtml;

document.body.appendChild(address)

document.getElementById("updateButton").addEventListener("click", async () => {
    let urlParams = new URLSearchParams(window.location.search)

    let id = urlParams.get("id")

    let title = document.getElementById("title").value;
    let cep = document.getElementById("cep").value;
    let streetName = document.getElementById("streetName").value;
    let number = document.getElementById("number").value;
    let complement = document.getElementById("complement").value;

    document.getElementById('updateButton').innerText = "Salvando..."

    let response = await fetch(url + id, {
        method: "POST",
        headers: {
            "cookie": "gowash_session=giOz1QVEUFkHvYYZS13R5NPnIq7GIijt5DmclDFH",
            "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZ28td2FzaC1hcGkub25yZW5kZXIuY29tL2FwaS9sb2dpbiIsImlhdCI6MTczMDkyNTkxNywibmJmIjoxNzMwOTI1OTE3LCJqdGkiOiJ3d3lLZGdIYmVxZmZCNjdFIiwic3ViIjoiMzExOCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.yGdrc9o17G3-QhUEdm8chEnqp0KNjFiStpcIxGqMc70",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            cep,
            "address": streetName,
            number,
            complement
        })
    })

    if(response.ok){
        alert("Endereço atualizado com sucesso")
        window.location.href = 'index.html'
    }
})