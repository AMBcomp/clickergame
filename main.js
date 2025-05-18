import { tonConnectUI } from './ton.js';

let count = 0;
const countDisplay = document.getElementById('click-count');
const clickButton = document.getElementById('click-button');

clickButton.addEventListener('click', async () => {
    count++;
    countDisplay.textContent = count;

    if (count === 10 && tonConnectUI.connected) {
        const tx = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: 'EQCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    amount: '1000000'
                }
            ]
        };
        try {
            await tonConnectUI.sendTransaction(tx);
            alert('Transaction sent!');
        } catch (e) {
            console.error('Transaction failed', e);
        }
    }
});
