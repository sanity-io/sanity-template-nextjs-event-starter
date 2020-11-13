import { createContext, useContext } from 'react';

export type PageState = 'registration' | 'ticket';

export type UserData = {
  id?: string;
  ticketNumber?: number;
  username?: string;
  name?: string;
};

type ConfDataContextType = {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setPageState: React.Dispatch<React.SetStateAction<PageState>>;
};

export const ConfDataContext = createContext<ConfDataContextType | null>(null);

export default function useConfData() {
  const result = useContext(ConfDataContext);
  if (!result) {
    throw new Error();
  }
  return result;
}
