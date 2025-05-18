
import { tonConnectUI } from './ton.js';

let count = 0;
const countDisplay = document.getElementById('click-count');
const clickButton = document.getElementById('click-button');

clickButton.addEventListener('click', async () => {
    count++;
    countDisplay.textContent = count;

    if (count === 10) {
        // وقتی ۱۰ بار کلیک شد، یک تراکنش تست انجام بده
        const tx = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: 'EQCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // آدرس مقصد
                    amount: '1000000' // 0.001 TON
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
