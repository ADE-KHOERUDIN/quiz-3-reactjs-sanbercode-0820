import React, { useReducer } from 'react';

export const AturSesi = React.createContext();

const initialState = {
	session: null
};

const globalReducer = (state = initialState, aksi) => {
	switch (aksi.type) {
	case 'SET_SESSION':
		return { ...state, session: aksi.payload };
	default:
		return state;
	}
};

export function AturSesiProvider(props) {
	const [state, dispatch] = useReducer(globalReducer, initialState);
	const value = { state, dispatch };
	return <AturSesi.Provider value={value}>{props.children}</AturSesi.Provider>;
}