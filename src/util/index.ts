export const sendResponse = (res: any, statusCode: any, data: any) => {
  res.status(statusCode).json(data);
};
