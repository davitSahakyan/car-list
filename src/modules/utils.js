
export function createModal(modalElement, language) {
  const modalContainer = document.createElement("div");
  const modalContent = document.createElement("div");
  const textContainer = document.createElement("p");
  const deleteButton = document.createElement("button");
  const cancelButton = document.createElement("button");
  language.then(function (languageObject) {
    textContainer.textContent = `${languageObject.deleteQuestion}`;
    deleteButton.textContent = languageObject.delete;
    cancelButton.textContent = languageObject.cancel;
  });


  modalContainer.classList = "modal";
  modalContainer.id = "myModal";
  modalContent.classList = "modal-content";
  deleteButton.classList = "deleteButton";
  deleteButton.id = "deleteButton";
  cancelButton.classList = "cancelButton";
  cancelButton.id = "cancelButton";

  modalContent.appendChild(textContainer);
  modalContent.appendChild(deleteButton);
  modalContent.appendChild(cancelButton);

  modalContainer.appendChild(modalContent);

  modalElement.appendChild(modalContainer);
}

export function randomIdGenerator() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

export function addErrorClass(inputs) {
  let inputsAreValid = true;
  inputs.forEach((input) => {
    if (input.value.length === 0) {
      input.parentElement.classList = "form-group hasError";
      inputsAreValid = false;
    }
  });
  return inputsAreValid;
}