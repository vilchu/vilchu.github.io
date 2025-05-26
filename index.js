  function fadeOut(element, callback) {
    element.classList.add("fade-out");
    setTimeout(() => {
      element.classList.add("hidden");
      element.classList.remove("fade-out");
      callback();
    }, 500);
  }

  function goToSnippets() {
    const home = document.getElementById("home");
    const snippets = document.getElementById("snippets");
    const backButton = document.getElementById("backButton");

    fadeOut(home, () => {
      snippets.classList.remove("hidden");
      snippets.style.opacity = 0;
      setTimeout(() => {
        snippets.style.opacity = 1;
      }, 10);
      backButton.classList.remove("hidden");
    });
  }

  function goBackHome() {
    const home = document.getElementById("home");
    const snippets = document.getElementById("snippets");
    const backButton = document.getElementById("backButton");

    fadeOut(snippets, () => {
      home.classList.remove("hidden");
      home.style.opacity = 0;
      setTimeout(() => {
        home.style.opacity = 1;
      }, 10);
      backButton.classList.add("hidden");
    });
}