import { mnemonicGenerate } from '@polkadot/util-crypto';
import { keyring } from '@polkadot/ui-keyring';
import { WsProvider } from '@polkadot/rpc-provider';
import { Provider, Signer as EvmSigner } from '@reef-defi/evm-provider';
import { Keyring } from '@polkadot/api';

let evmProvider = new Provider({
    provider: new WsProvider('wss://rpc-testnet.reefscan.com/ws')
});
await evmProvider.api.isReady
await keyring.loadAll({ ss58Format: 42, type: 'sr25519' });

export async function genReefPayAddress() {
    const phrase = mnemonicGenerate(12);
    const { address } = keyring.createFromUri(phrase);
    const keyring_ = new Keyring({ type: 'sr25519' });
    const newPair = keyring_.addFromUri(phrase);

    return { address, newPair }
}

export async function getAddressBalance(address) {
    const balance = await evmProvider.api.derive.balances.all(address)
        .then((res) => res.freeBalance / 1e18)
        .then((res) => res === '0' ? '0' : res);
    console.log(`address: ${address} ,blalnce:${balance}`)
    return balance
}

export async function transferToMainAccount(sender, recipient, balance, alicePair) {
    console.log(`transferToMainAccount from:${sender} -> to:${recipient}, balance:${balance}`)
    await evmProvider.api.tx.balances
        .transfer(recipient, BigInt(1e18 * (balance - 1.5)))
        .signAndSend(alicePair)
}