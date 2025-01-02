import React, { createContext, useState, useContext } from 'react';



const MastersContext = createContext(undefined);

export const MastersProvider= ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('');
  const [addAction, setAddAction] = useState('');

  return (
    <MastersContext.Provider value={{ selectedTab, setSelectedTab, addAction, setAddAction }}>
      {children}
    </MastersContext.Provider>
  );
};


export const useMastersContext = () => {
  const context = useContext(MastersContext);
  if (context === undefined) {
    throw new Error('useMastersContext must be used within a MastersProvider');
  }
  return context;
};

