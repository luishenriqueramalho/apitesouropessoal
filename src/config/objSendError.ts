export const sendError = (
  message: string | null,
  status: number,
  data: any
) => {
  const dataSend = {
    success: false,
    message: message,
    status: status,
    data: data,
  };
  return dataSend;
};
