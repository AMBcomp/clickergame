
import { TonConnectUI } from '@tonconnect/ui';

export const tonConnectUI = new TonConnectUI({
    manifestUrl: 'https://yourdomain.com/tonconnect-manifest.json',
    buttonRootId: 'ton-connect-button',
});

tonConnectUI.ui().then(() => {
    console.log('TON Connect UI Initialized');
});
