export interface FilterBoxConfig {
  buttons: {
    clearAll: 'none' | 'simple' | 'full';
  };
  flex?: {
    gap: string;
    offset: {
      left: string;
    };
  };
}
