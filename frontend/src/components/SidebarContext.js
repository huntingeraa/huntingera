import React, { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </SidebarContext.Provider>
  );
};
