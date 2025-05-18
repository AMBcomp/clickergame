import { TonConnectUI } from '@tonconnect/ui';

export const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://ambcomp.github.io/clickergame/tonconnect-manifest.json',
    buttonRootId: 'ton-connect-button'
});

tonConnectUI.connectionRestored.then(() => {
    const statusElem = document.getElementById('wallet-status');
    if (tonConnectUI.connected && tonConnectUI.account) {
        statusElem.textContent = '✅ Wallet: ' + tonConnectUI.account.address;
    } else {
        statusElem.textContent = '🔌 Wallet: Not connected';
    }

    tonConnectUI.onStatusChange((wallet) => {
        if (wallet && wallet.account) {
            statusElem.textContent = '✅ Wallet: ' + wallet.account.address;
        } else {
            statusElem.textContent = '🔌 Wallet: Not connected';
        }
    });
});
