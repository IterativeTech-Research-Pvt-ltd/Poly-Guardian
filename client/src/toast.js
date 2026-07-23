// Tiny imperative toast — works from anywhere without a provider.
let el;
let timer;
export function toast(msg) {
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove("show"), 3600);
}