; 'use client';
import React, { createContext, useContext, useState, FC, ReactNode } from 'react';

// Define the type for a single payment
export interface Payment {
  user: string;
  amount: number;
  email: string;
}


// Create the context
// Create the context with initial value
const PaymentsContext = createContext<{ payments: Payment[]; setPayments: React.Dispatch<React.SetStateAction<Payment[]>> } | undefined>(undefined);

// Custom hook to use the payments context
export const usePayments = () => {
  const context = useContext(PaymentsContext);
  if (!context) {
    throw new Error('usePayments must be used within a PaymentsProvider');
  }
  return context;
};

// Payments provider component
export const PaymentsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [payments, setPayments] = useState<Payment[]>([]);


  return (
    <PaymentsContext.Provider value={{ payments, setPayments }}>
      {children}
    </PaymentsContext.Provider>
  );
};
