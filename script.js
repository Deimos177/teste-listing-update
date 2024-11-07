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

                    let addressSection = document.createElement("div")
                    addressSection.id = `${id}`

                    let addressTitle = document.createElement("h2")
                    addressTitle.textContent = title
                    addressTitle.id = 'title'
                    addressSection.appendChild(addressTitle)

                    let addressCep = document.createElement("p")
                    addressCep.className = 'content'
                    addressCep.id = 'cep'
                    addressCep.textContent = cep
                    addressSection.appendChild(addressCep)

                    let addressName = document.createElement("p")
                    addressName.className = 'content'
                    addressName.id = 'streetName'
                    addressName.textContent = address
                    addressSection.appendChild(addressName)

                    let addressNumber = document.createElement("p")
                    addressNumber.className = 'content'
                    addressNumber.id = 'number'
                    addressNumber.textContent = number
                    addressSection.appendChild(addressNumber)

                    let addressComplement = document.createElement("p")
                    addressComplement.className = 'content'
                    if (complement) {
                        addressComplement.textContent = complement
                    } else {
                        addressComplement.textContent = 'Sem complemento'
                    }
                    addressComplement.id = 'complement'
                    addressSection.appendChild(addressComplement)

                    let updateButton = document.createElement("button");
                    updateButton.type = "button";
                    updateButton.id = "updateButton";
                    updateButton.textContent = "Atualizar endereço";
                    updateButton.onclick = () => updateAddress(id)
                    addressSection.appendChild(updateButton);

                    addresses.appendChild(addressSection)
                });
            } else {

                let message = document.createElement("h2")
                message.textContent = "Não há endereços cadastrados"

                addresses.appendChild(message)
            }

            return
        }
    });

function updateAddress(id) {

    let updateAddress = document.getElementById(id)

    let addressSection = document.createElement("section")
    addressSection.id = "addresses"

    let titlevalue = updateAddress.querySelector("#title").textContent
    let titleInput = document.createElement('input')
    titleInput.type = "text"
    titleInput.id = "title"
    titleInput.setAttribute('value', titlevalue)
    addressSection.appendChild(titleInput)

    let cepValue = updateAddress.querySelector("#cep").textContent
    let cepInput = document.createElement('input')
    cepInput.type = 'text'
    cepInput.id = "cep"
    cepInput.setAttribute('value', cepValue)
    addressSection.appendChild(cepInput)

    let streetNameValue = updateAddress.querySelector("#streetName").textContent
    let streetNameInput = document.createElement('input')
    streetNameInput.type = 'text'
    streetNameInput.id = "streetName"
    streetNameInput.setAttribute('value', streetNameValue)
    addressSection.appendChild(streetNameInput)

    let numbervalue = updateAddress.querySelector("#number").textContent
    let numberInput = document.createElement('input')
    numberInput.type = 'text'
    numberInput.id = "number"
    numberInput.setAttribute('value', numbervalue)
    addressSection.appendChild(numberInput)

    let complementValue = updateAddress.querySelector("#complement").textContent
    let complementInput = document.createElement('input')
    complementInput.type = 'text'
    complementInput.id = "complement"
    complementInput.setAttribute('value', complementValue)
    addressSection.appendChild(complementInput)

    let updateButton = document.createElement("button");
    updateButton.type = "button";
    updateButton.id = "updateButton";
    updateButton.textContent = "Salvar";
    addressSection.appendChild(updateButton)

    localStorage.setItem("updateAddress", addressSection.outerHTML)

    window.location.href = `updateAddress.html?id=${id}`
}