export const sendSuccess = (
  message: string | null,
  status: number,
  data: any
) => {
  const dataSend = {
    success: true,
    message: message,
    status: status,
    data: data,
  };
  return dataSend;
};
