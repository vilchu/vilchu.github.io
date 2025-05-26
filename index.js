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

    // Group snippets by category
    const groupedSnippets = {};
    data.snippets.forEach(snippet => {
      const cat = snippet.category || "Others";
      if (!groupedSnippets[cat]) groupedSnippets[cat] = [];
      groupedSnippets[cat].push(snippet);
    });

    // Optional: sort categories manually
    const desiredOrder = ["Themes", "Scripts", "Tools", "Others"];
    const sortedCategories = Object.keys(groupedSnippets).sort((a, b) => {
      const indexA = desiredOrder.indexOf(a);
      const indexB = desiredOrder.indexOf(b);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    // Render each category
    const snippetsContainer = document.getElementById("snippetsContainer");
    sortedCategories.forEach(category => {
      const section = document.createElement("div");
      section.className = "snippet-section";

      const heading = document.createElement("h2");
      heading.textContent = category;
      section.appendChild(heading);

      const row = document.createElement("div");
      row.className = "columns";

      groupedSnippets[category].forEach(snippet => {
        const column = document.createElement("div");
        column.className = "column";
        column.innerHTML = `
          <p>${snippet.name}</p>
          <a href="${snippet.url}" target="_blank">View</a>
        `;
        row.appendChild(column);
      });

      section.appendChild(row);
      snippetsContainer.appendChild(section);
    });
  })
  .catch(error => {
    console.error("Failed to load JSON:", error);
    const errorBox = document.getElementById("error-message");
    if (errorBox) errorBox.classList.remove("hidden");
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
