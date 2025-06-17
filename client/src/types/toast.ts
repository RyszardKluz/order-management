export type ShowToastFunction = (variant: string, body: string) => void;

export type GenerateMessageFuntction = (
  message: string,
  method: string,
  resource: string,
) => string;
