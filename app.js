const BASE_URL = "https://v6.exchangerate-api.com/v6/5601ddfe1827d99dd809248f/latest";
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

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

btn.addEventListener("click", async (evt) => {
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

  const URL = `${BASE_URL}/${fromCurr.value}`;

  try {
    let response = await fetch(URL);

    if (!response.ok) {
      console.error(`Error fetching data: ${response.status}`);
      return;
    }

    let data = await response.json();

    // Extract the conversion rate for the target currency
    const conversionRate = data.conversion_rates[toCurr.value];

    if (!conversionRate) {
      console.error(`Conversion rate for ${toCurr.value} not found.`);
      return;
    }

    // Calculate the converted amount
    const convertedAmount = (amtval * conversionRate).toFixed(2);
    console.log(`Converted Amount: ${convertedAmount}`);

    // Display the result in the UI
    const resultDiv = document.querySelector(".msg");
    resultDiv.innerText = `${amtval} ${fromCurr.value}=${convertedAmount} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching or processing the API:", error);
  }
});
