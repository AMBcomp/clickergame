
let count = 0;
const countDisplay = document.getElementById('click-count');
const clickButton = document.getElementById('click-button');

clickButton.addEventListener('click', () => {
    count++;
    countDisplay.textContent = count;
    // Example: Send score to Telegram backend or save to TON
    console.log('Clicked! Count:', count);
});
