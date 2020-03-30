export default function AsyncLoader(rende) {
  rende(
    '<button id="async_loader_btn">load modules</button>&nbsp;&nbsp;&nbsp;<label id="async_loader_recorder"></label>',
  );

  document.getElementById("async_loader_btn").addEventListener("click", () => {
    import("./Recorder").then(({ default: Recorder }) => {
      Recorder((html) => {
        document.getElementById("async_loader_recorder").innerHTML = html;
      });
    });
  });
}
