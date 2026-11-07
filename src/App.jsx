
import { useEffect, useState } from "react";
import "./App.css";

const tabs = [
  {
    id: 1,
    label: "TAB 1",
    title: "Content 1",
    description:"این محتوای تب اول است. با انتخاب هر تب، محتوای همین بخش بدون بارگذاری مجدد صفحه تغییر می‌کند.",
    },
  {
    id: 2,
    label: "TAB 2",
    title: "Content 2",
    description:
      "این محتوای تب دوم است. با انتخاب هر تب، محتوای همین بخش بدون بارگذاری مجدد صفحه تغییر می‌کند.",
  },
  {
    id: 3,
    label: "TAB 3",
    title: "Content 3",
    description:
      "این بخش محتوای تب سوم را نمایش می‌دهد. می‌توانید متن، تصویر یا هر کامپوننت دلخواه دیگری را در این قسمت قرار دهید.",
  },
  {
    id: 4,
    label: "TAB 4",
    title: "Content 4",
    description:
      "این هم محتوای تب چهارم است. آخرین تب انتخاب‌شده ذخیره می‌شود تا در مراجعه بعدی نیز همان تب نمایش داده شود.",
  },
];

const STORAGE_KEY = "react-tabs-active-tab";

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY));

    return tabs.some((tab) => tab.id === saved)
      ? saved
      : 1;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(activeTab));
  }, [activeTab]);

  const selectedTab = tabs.find(
    (tab) => tab.id === activeTab
  );

  function handleKeyDown(event, currentIndex) {
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    setActiveTab(tabs[nextIndex].id);

    document
      .getElementById(`tab-${tabs[nextIndex].id}`)
      ?.focus();
  }

  return (
    <main className="page">
      <section className="tabs-card">

        <header className="top-bar">
          <div>

            <h1>Tabs Component with React</h1>
            <p>
              یک کامپوننت ساده، سریع و قابل استفاده مجدد
            </p>
          </div>
          <div className="react-mark">⚛</div>
        </header>

        <nav
          className="tabs-nav"
          role="tablist"
          aria-label="محتوای صفحه"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`tab-button ${
                activeTab === tab.id ? "active" : ""
              }`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) =>
                handleKeyDown(event, index)
              }
            >
              {tab.label}
              <span className="tab-number">
                0{tab.id}
              </span>
            </button>
          ))}
        </nav>

        <section
          key={selectedTab.id}
          id={`panel-${selectedTab.id}`}
          className="content-panel"
          role="tabpanel"
          aria-labelledby={`tab-${selectedTab.id}`}
          tabIndex={0}
        >
          <div className="content-heading">
            <span className="content-dot"></span>

            <h2>{selectedTab.title}</h2>

            <span className="content-index">
              SECTION 0{selectedTab.id}
            </span>
          </div>

          <p>{selectedTab.description}</p>

          <div className="panel-footer">
            <span>React Tabs</span>

            <span>
              {selectedTab.id} / {tabs.length}
            </span>
          </div>
        </section>

      </section>
      <footer className="page-footer">
        <span className="footer-pulse"></span>
        ساخته‌شده با React و CSS خالص
      </footer>
    </main>
  );
}

export default App;
