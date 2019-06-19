import React from 'react';

const GameContext = React.createContext({});
export const GameContextConsumer = GameContext.Consumer;
export const GameContextProvider = GameContext.Provider;