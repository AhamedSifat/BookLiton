import React, { useContext, useState } from 'react';
import Toast from '../components/Toast';
import { useQuery } from '@tanstack/react-query';
import { verifyUser } from '../api-client';

import { loadStripe, type Stripe } from '@stripe/stripe-js';

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";
const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showToast, setShowToast] = useState<ToastMessage | undefined>(
    undefined
  );

  const { isError } = useQuery({
    queryKey: ['verifyUser'],
    queryFn: verifyUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setShowToast(toastMessage);
        },
        isLoggedIn: !isError, // If there's an error, user is not logged in
        stripePromise,
      }}
    >
      {showToast && (
        <Toast
          message={showToast.message}
          type={showToast.type}
          onClose={() => setShowToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
