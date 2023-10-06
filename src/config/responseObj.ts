export const dataSuccess = (
  success: boolean,
  message: string | null,
  code: number,
  data: any | null
): {
  success: boolean;
  message: string | null;
  status: number;
  data: any | null;
} => ({
  success: success,
  message: message,
  status: code,
  data: data,
});

export const dataError = (
  success: boolean,
  message: string | null,
  erro: any | null,
  code: number,
  data: any | null
): {
  success: boolean;
  message: string | null;
  erro: any | null;
  status: number;
  data: any | null;
} => ({
  success: success,
  message: message,
  erro: erro,
  status: code,
  data: data,
});
