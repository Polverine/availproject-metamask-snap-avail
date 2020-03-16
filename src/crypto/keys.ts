import {KeyPairState, Wallet} from "../interfaces";
import {fromHexString} from "../util/hex";
import nacl from "tweetnacl";

// Generates ed25519 public/private keypair from seed
function generateKeyPairFromSeed(seedString: string): KeyPairState {
  if (seedString.length < 32) { throw new Error("Invalid seed string."); }
  const seed = fromHexString(seedString.substr(0, 32));
  return nacl.sign.keyPair.fromSeed(seed);
}

// Generate keypair from metamask wallet interface using app key
export async function generateKeys(wallet: Wallet): Promise<KeyPairState> {
  const appKey = await wallet.getAppKey();
  const keypair = generateKeyPairFromSeed(appKey);
  wallet.updatePluginState({polkadot: {account: keypair}});
  return keypair;
}


