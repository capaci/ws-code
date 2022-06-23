
const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

function main() {
  const howdyButton = document.getElementById("howdy");
  howdyButton.addEventListener("click", handleHowdyClick);
}

function handleHowdyClick() {
  vscode.postMessage({
    command: "hello",
    text: "Hey there partner! 🤠",
  });
}


const counter = document.getElementById('lines-of-code-counter');

let count = 0;
setInterval(() => {
    counter.textContent = count++;

    // Alert the extension when our cat introduces a bug
    if (Math.random() < 0.001 * count) {
        vscode.postMessage({
            command: 'alert',
            text: '🐛  on line ' + count
        });
    }
}, 100);
