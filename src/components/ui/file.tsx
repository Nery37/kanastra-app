import * as React from 'react';

enum FileActionType {}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList: File[];
};

type FileAction = ReducerAction<FileActionType, Partial<FileContextState>>;

type FileDispatch = ({ type, payload }: FileAction) => void;

type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

type FileProviderProps = { children: React.ReactNode };

const FileContextInitialValues: Partial<FileContextState> = {
  file: {} as File,
  isLoading: false,
};

const FileContext = React.createContext({} as FileContextType);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = React.useReducer(
    FileReducer,
    FileContextInitialValues as FileContextState,
  );

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => {
  const context = React.useContext(FileContext);

  if (context === undefined)
    throw new Error('useFileContext must be used within a FileProvider');

  return context;
};

export { FileProvider, useFileContext };
