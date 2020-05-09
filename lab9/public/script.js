const staticForm = document.getElementById("static-form");

if (staticForm) {
    const inputElement = document.getElementById("inputText");
    const ol = document.getElementById("attempts");

    const errorContainer = document.getElementById("error-container");
    const errorTextElement = errorContainer.getElementsByClassName(
        "text-goes-here"
    )[0];

    staticForm.addEventListener("submit", event => {
        event.preventDefault();

        try {
            // errorContainer.classList.add("hidden");
            errorContainer.hidden = true;

            const inputElementValue = inputElement.value;

            const isPalindrome = palindrome(inputElementValue);
            let li = document.createElement("li");

            if (isPalindrome) {
                li.classList.add("is-palindrome");
            } else {
                li.classList.add("not-palindrome");
            }

            li.innerHTML = inputElementValue;
            ol.appendChild(li);

        } catch (e) {
            const message = typeof e === "string" ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.hidden = false;
        }
    });
}

function palindrome(inputElementValue) {
    if (!inputElementValue) {
        throw "No text provided!";
    }
    const lowerInput = inputElementValue.toLowerCase();
    let re = /[\W_]/g;
    const strippedInput = lowerInput.replace(re, '');
    const reversedInput = strippedInput.split('').reverse().join('');
    return strippedInput === reversedInput;
}