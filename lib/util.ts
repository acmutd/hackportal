export const getFileExtension = (filename: string) => {
  const seg = filename.split('.');
  return `.${seg[seg.length - 1]}`;
};
