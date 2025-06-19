// context/ResourceContext.tsx
import { createContext, useContext } from 'react';
import { ShowToastFunction } from '../types/toast';

export interface ResourceContextType<T> {
  resourceList: T[];
  onCheckboxClick?: (resource: T, type: string, keyNumber?: string) => void;
  onRowSelect?: (resource: T) => void;
  onProductCountChange?: (id: string, number: number) => void;
  onShowToast? :ShowToastFunction
  hasCheckButton?: boolean;
  hasCountInput?: boolean;
  isOrderDetailsList: boolean;
  isOrderList?: boolean;
  columnHeadings: string[];
}

const ResourceContext = createContext<ResourceContextType<any> | undefined>(
  undefined,
);

export const useResourceContext = <T,>(): ResourceContextType<T> => {
  const context = useContext(ResourceContext);
  if (!context)
    throw new Error(
      'useResourceContext must be used within a ResourceProvider',
    );
  return context;
};

export const ResourceProvider = <T,>({
  value,
  children,
}: {
  value: ResourceContextType<T>;
  children: React.ReactNode;
}) => (
  <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>
);
