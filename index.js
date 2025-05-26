// Load data from index.json and insert into page
fetch("index.json")
  .then(res => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then(data => {
    // Profile content
    document.getElementById("username").textContent = data.username;
    document.getElementById("bio").innerHTML = data.bio;
    document.getElementById("pfp").src = data.pfp;
    document.getElementById("about-link").href = data.aboutMeLink;

    // Snippets content
    const snippetsContainer = document.getElementById("snippetsContainer");
    data.snippets.forEach(snippet => {
      const column = document.createElement("div");
      column.className = "column";
      column.innerHTML = `
        <p>${snippet.name}</p>
        <a href="${snippet.url}" target="_blank">View</a>
      `;
      snippetsContainer.appendChild(column);
    });
  })
  .catch(error => {
    console.error("Failed to load JSON:", error);
    document.getElementById("error-message").classList.remove("hidden");
  });

// Page fade transition function
function fadeOut(element, callback) {
  element.classList.add("fade-out");
  setTimeout(() => {
    element.classList.add("hidden");
    element.classList.remove("fade-out");
    callback();
  }, 500);
}

// Switch to snippets page
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

// Switch back to home page
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
