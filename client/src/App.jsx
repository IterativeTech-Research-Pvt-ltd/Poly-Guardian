import { useState } from "react";
import Nav from "./components/Nav.jsx";
import Dashboard from "./components/Dashboard.jsx";
import LeafScan from "./components/LeafScan.jsx";
import TrapMonitor from "./components/TrapMonitor.jsx";
import Agronomist from "./components/Agronomist.jsx";
import LanguagePicker from "./components/LanguagePicker.jsx";
import { getSavedLang, saveLang } from "./lang.js";

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [lang, setLang] = useState(getSavedLang());          // null on first visit
  const [pickerOpen, setPickerOpen] = useState(!getSavedLang());
  const [openScan, setOpenScan] = useState(null);            // scan to re-open in Leaf Scan

  const goto = (name) => {
    setTab(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pickLang = (id) => {
    saveLang(id);
    setLang(id);
    setPickerOpen(false);
  };

  // Dashboard → open a past scan's prescription in the Leaf Scan tab.
  const openScanInLeaf = (scan) => {
    setOpenScan(scan);
    goto("leafscan");
  };

  return (
    <div className="wrap">
      <Nav active={tab} onTab={goto} lang={lang} onOpenLang={() => setPickerOpen(true)} />
      {tab === "dashboard" && <Dashboard onGoto={goto} onOpenScan={openScanInLeaf} />}
      {tab === "leafscan" && <LeafScan lang={lang} openScan={openScan} onOpened={() => setOpenScan(null)} />}
      {tab === "trap" && <TrapMonitor onGoto={goto} />}
      {tab === "agronomist" && <Agronomist lang={lang} />}

      {pickerOpen && (
        <LanguagePicker
          current={lang}
          onPick={pickLang}
          onClose={lang ? () => setPickerOpen(false) : undefined}
        />
      )}
    </div>
  );
}