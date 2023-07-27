export const getFileExtension = (filename: string) => {
  const seg = filename.split('.');
  return `.${seg[seg.length - 1]}`;
};

export enum RegistrationState {
  UNINITIALIZED = -1,
  OPEN = 1,
  CLOSED = 0,
}
