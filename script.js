/**
 * @description Capturando elementos do HTML, form, input e select.
 *
 * @param {string} currencyInput - valor do input.
 * @param {string} currencySelected - select com o tipo de moeda.
 * @param {string} form - formulário.
 */
const form = document.querySelector("form");

const currencyInput = document.querySelector("#amount");
const currencySelected = document.querySelector("#currency");

const footer = document.querySelector(".footer");

const description = document.querySelector("#description");
const result = document.querySelector("#result");

/**
 * @description Função que formata o input para aceitar apenas números.
 *
 * @param {*} inputValue - valor do input.
 * @returns {string} - retorna o valor do input formatado.
 */
function formattedInput(inputValue) {
  return inputValue.value.replace(/[^0-9.]/g, "").replace(/(\.*?)\..*/g, "$1");
}

/**
 * @description Evento que formata o input ao digitar.
 */
currencyInput.oninput = () => {
  currencyInput.value = formattedInput(currencyInput);
};

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(
      `https://economia.awesomeapi.com.br/last/${currencySelected.value}-BRL`
    );

    const responseFormatted = await response.json();

    const valorMoeda = responseFormatted[`${currencySelected.value}BRL`].ask;

    const conta = valorMoeda * currencyInput.value;

    description.textContent = `1 ${currencySelected.value} = R$ ${Number(
      valorMoeda
    ).toFixed(2)}`;

    result.textContent = `R$ ${Number(conta).toFixed(2)}`;

    footer.classList.toggle("showFooter");
  } catch (error) {
    console.log(error);
  }
};
