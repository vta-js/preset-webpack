import IndexPage from "./pages";

export default function rende() {
  IndexPage(html => {
    document.getElementById("root").innerHTML = html;
  });
}
