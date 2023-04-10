export const getUuid = () => {
  return `${randomID()}-${randomID()}-${randomID()}-${randomID()}`;
};
function randomID() {
  return Math.floor(1000 + Math.random() * 9000);
}
