const adviceNumber = document.querySelector(".advice__number");
const adviceContent = document.querySelector(".advice__content");
const adviceButton = document.querySelector(".advice__button");

// Initial Conditions
adviceContent.innerHTML =
  '"Never set an alarm clock unless you know how to switch it off"';
adviceNumber.innerHTML = "Advice #01";

const fetchAdvice = async () => {
  const url = "https://api.adviceslip.com/advice";
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const renderAdvice = async () => {
  const { slip } = await fetchAdvice();

  const number = slip.id;
  const content = slip.advice;

  if (number < 10) {
    const newNumber = `0${number}`;

    adviceNumber.innerHTML = `Advice #${newNumber}`;
    adviceContent.innerHTML = `"${content}"`;
  } else {
    adviceNumber.innerHTML = `Advice #${number}`;
    adviceContent.innerHTML = `"${content}"`;
  }
};

const addLoading = () => {
  adviceButton.classList.add("loading");
  adviceButton.disabled = true;

  setTimeout(() => {
    adviceButton.classList.remove("loading");
    adviceButton.disabled = false;
  }, 1500);
};

adviceButton.addEventListener("click", () => {
  renderAdvice();
  addLoading();
});
