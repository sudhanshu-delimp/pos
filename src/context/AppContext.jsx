import React, { useState, useMemo, createContext} from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [isBillingAddress , setBillingAddress] = useState(false)

  const value = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      isLoading,
      isUpdate,
      setIsUpdate,
      customerModal,
      setCustomerModal,
      addCustomer,
      setAddCustomer,
      setIsLoading,
      isBillingAddress,
      setBillingAddress,

    }),
    [ currentPage, isLoading , customerModal , addCustomer , isBillingAddress]
  );

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
