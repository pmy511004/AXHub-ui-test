let authed = false;

export const isAuthed = () => authed;
export const setAuthed = (value: boolean) => {
  authed = value;
};
