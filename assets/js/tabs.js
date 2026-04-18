/**
 * Keyboard-accessible tabs (WAI-ARIA Authoring Practices).
 */
(function () {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

  function activateTab(selected) {
    tabs.forEach((tab, i) => {
      const selectedHere = tab === selected;
      tab.setAttribute("aria-selected", selectedHere);
      tab.tabIndex = selectedHere ? 0 : -1;
      const panel = panels[i];
      if (panel) {
        if (selectedHere) {
          panel.hidden = false;
          panel.classList.add("is-active");
        } else {
          panel.hidden = true;
          panel.classList.remove("is-active");
        }
      }
    });
    selected.focus();
  }

  tablist.addEventListener("click", (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab || !tabs.includes(tab)) return;
    activateTab(tab);
  });

  tablist.addEventListener("keydown", (e) => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;

    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      next = (i + 1) % tabs.length;
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      next = (i - 1 + tabs.length) % tabs.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      next = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      next = tabs.length - 1;
      e.preventDefault();
    } else {
      return;
    }
    activateTab(tabs[next]);
  });
})();
