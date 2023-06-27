export default () => {
  const a = document.createTextNode("p");
  a.textContent = "Hello world!";
  document.body.appendChild(a);
};
