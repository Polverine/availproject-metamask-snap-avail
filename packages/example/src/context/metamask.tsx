import type { Dispatch, PropsWithChildren, Reducer } from 'react';
import React, { createContext, useReducer } from 'react';
import type { MetamaskPolkadotSnap } from '@avail/metamask-polkadot-adapter/build/snap';
import type {
  BlockInfo,
  SnapConfig,
  SnapRpcMethodRequest,
  Transaction,
  TxPayload,
  SnapNetworks
} from '@avail/metamask-polkadot-types';
import type { MetamaskSnapApi } from '@avail/metamask-polkadot-adapter/src/types';
import { hasMetaMask } from '../services/metamask';

interface IPolkadotSnap {
  isInstalled: boolean;
  message: string;
  snap?: MetamaskPolkadotSnap;
  balance: string;
  address: string;
  publicKey: string;
  latestBlock: BlockInfo;
  transactions: Transaction[];
  network: SnapNetworks;
  api: MetamaskSnapApi | null;
}

export interface MetamaskState {
  polkadotSnap: IPolkadotSnap;
  hasMetaMask: boolean;
}

const initialState: MetamaskState = {
  hasMetaMask: hasMetaMask(),
  polkadotSnap: {
    isInstalled: false,
    message: '',
    balance: '0',
    address: '',
    publicKey: '',
    latestBlock: {
      hash: '',
      number: ''
    },
    transactions: [],
    network: 'avail',
    api: null
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MetamaskDispatch = { type: MetamaskActions; payload: any };

export const MetaMaskContext = createContext<[MetamaskState, Dispatch<MetamaskDispatch>]>([
  initialState,
  () => null
]);

export enum MetamaskActions {
  SET_INSTALLED_STATUS
}

const reducer: Reducer<MetamaskState, MetamaskDispatch> = (state, action) => {
  switch (action.type) {
    case MetamaskActions.SET_INSTALLED_STATUS: {
      return {
        ...state,
        polkadotSnap: action.payload as IPolkadotSnap
      };
    }
    default: {
      return state;
    }
  }
};

export const MetaMaskContextProvider = (
  props: PropsWithChildren<Record<string, unknown>>
): React.JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MetaMaskContext.Provider value={[state, dispatch]}>{props.children}</MetaMaskContext.Provider>
  );
};
