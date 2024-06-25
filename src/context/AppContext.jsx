import React, { useState, useMemo, createContext, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };


  const value = useMemo(
    () => ({
      isModalOpen,
      toggleModal,
      closeModal,
      currentPage,
      setCurrentPage,
      handleChangePage,
      isLoading,
      setIsLoading,
      modalOpen,
      setModalOpen,
      isUpdate,
      setIsUpdate,
    }),
    [isModalOpen, currentPage, isLoading, modalOpen,]
  );

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};
