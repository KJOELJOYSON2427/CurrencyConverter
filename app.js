const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select")

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
for (let select of dropdowns) {
    for (let currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
  
      // Setting default selected options
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = true;
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = true;
      }
  
      select.append(newOption);
    }
  
    // Adding event listener for the `change` event
    select.addEventListener("change", async (evt) => {
      await updateFlag(evt.target);
    });
  }
  
  const updateFlag = (element) => {
    const currCode = element.value;
    const countrycode = countryList[currCode];
  
    if (!countrycode) {
      console.error(`Country code not found for currency: ${currCode}`);
      return;
    }
  
    // Construct new image source URL
    const newSrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
  
    // Select the img element within the parent container
    const img = element.parentElement.querySelector("img");
  
    if (img) {
      img.src = newSrc; // Update the image source
    } else {
      console.error("No <img> element found to update the flag.");
    }
  };
  btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
  
    // Select the amount input field
    let amountInput = document.querySelector(".amount input");
    let amtval = amountInput.value;
  
    // Validate the amount
    if (amtval === "" || amtval < 1) {
      amtval = 1; // Default to 1 if the input is empty or less than 1
      amountInput.value = "1"; // Update the input field to show the default value
    }
  
    console.log(`Amount to convert: ${amtval}`);
console.log(fromCurr.value, toCurr.value);



console.log(`Amount to convert: ${amtval}`);
console.log(fromCurr.value, toCurr.value);

// Correcting toLowerCase() spelling
const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

 try {
  let response = await fetch(URL);

  if (!response.ok) {
    console.error(`Error fetching data: ${response.status}`);
    return;
  }

  let data = await response.json();
  console.log(data); // Log the response data for debugging or processing
} catch (error) {
  console.error("Error fetching or processing the API:", error);
}


  });
