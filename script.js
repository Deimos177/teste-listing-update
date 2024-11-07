const url = "https://go-wash-api.onrender.com/api/auth/address";

document.addEventListener("DOMContentLoaded", async function () {

        let response = await fetch(url, {
            headers: {
                "cookie": "gowash_session=giOz1QVEUFkHvYYZS13R5NPnIq7GIijt5DmclDFH",
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZ28td2FzaC1hcGkub25yZW5kZXIuY29tL2FwaS9sb2dpbiIsImlhdCI6MTczMDkyNTkxNywibmJmIjoxNzMwOTI1OTE3LCJqdGkiOiJ3d3lLZGdIYmVxZmZCNjdFIiwic3ViIjoiMzExOCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.yGdrc9o17G3-QhUEdm8chEnqp0KNjFiStpcIxGqMc70"
            }
        })

        if (response.ok) {

            let { data } = await response.json()
            let addresses = document.getElementById("addresses")

            addresses.innerHTML = ''


            if (data.length > 0) {
                data.forEach(addressJson => {
                    let { id, title, cep, number, address, complement } = addressJson

                    let addressDiv = document.createElement("div")
                    addressDiv.id = `${id}`

                    let AddressDivContent = `
                    <h2 class="content" id="title">${title}</h2>
                    <p class="content" id="cep">${cep}</p>
                    <p class="content" id="streetName">${address}</p>
                    <p class="content" id="number">${number}</p>
                    <p class="content" id="complement">${complement}</p>
                    <button type="button" onclick="updateAddress(${id})">Atualizar endereço</button>
                    `
                    addressDiv.innerHTML = AddressDivContent

                    addresses.appendChild(addressDiv)
                });
            } else {

                let message = document.createElement("h2")
                message.textContent = "Não há endereços cadastrados"

                addresses.appendChild(message)
            }

            return
        }
    });

async function updateAddress(id) {

    const response = await fetch(`${url}/${id}`, {
        headers: {
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZ28td2FzaC1hcGkub25yZW5kZXIuY29tL2FwaS9sb2dpbiIsImlhdCI6MTczMDkyNTkxNywibmJmIjoxNzMwOTI1OTE3LCJqdGkiOiJ3d3lLZGdIYmVxZmZCNjdFIiwic3ViIjoiMzExOCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.yGdrc9o17G3-QhUEdm8chEnqp0KNjFiStpcIxGqMc70`
        }
    });

    if(response.ok){
        let { data } = await response.json()
        console.log(data)
        let { title, cep, address, number, complement } = data
        
        let addressInfos =  `
        <input type="text" id="title" value="${title}">
        <input type="text" id="title" value="${cep}">
        <input type="text" id="streetName" value="${address}">
        <input type="text" id="number" value="${number}">
        <input type="text" id="complement" value="${complement}">
        <button type="button" id="updateButton">Salvar</button>
        `

        localStorage.setItem("updateAddress", addressInfos)
        location.href = `updateAddress.html?id=${id}`
    }
}