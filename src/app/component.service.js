export class ComponentService {
  constructor() {
    this.numberOneInput = document.getElementById("numberOne");
    this.numberTwoInput = document.getElementById("numberTwo");
    this.addValuesButton = document.getElementById("addValues");
    this.resultDiv = document.getElementById("result");
  }

  getInput() {
    return [this.numberOneInput.value, this.numberTwoInput.value];
  }
  setResult(str) {
    this.resultDiv.innerText = str;
  }
  onClick(cb) {
    this.addValuesButton.addEventListener("click", cb);
  }
}
