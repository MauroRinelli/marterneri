// ===== Helpers globali =====
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM (dopo che il DOM è pronto)
  const chat       = $("#chatLog");
  const hamburger  = $("#hamburger");
  const overlay    = $("#overlay");

  // Stato lock/reset
  let isLocked = false;      // 🔒 blocco attivo finché non fai reset
  let lockNotified = false;  // evita multipli "Se non resetti..."
  let currentShippingType = "italia"; // Tipo di spedizione corrente

  // ===== Dati tariffe spedizioni =====
  // NOTA: Zone, paesi e tariffe sono definiti in listini.js
  // Le funzioni di calcolo utilizzano i listini professionali importati

  // ===== Mobile sidebar toggle =====
  function toggleSidebar(open) {
    const shouldOpen =
      open ?? !document.body.classList.contains("sidebar-open");
    document.body.classList.toggle("sidebar-open", shouldOpen);
    const hb = $("#hamburger");
    if (hb) hb.setAttribute("aria-expanded", String(shouldOpen));
  }
  if (hamburger) hamburger.addEventListener("click", () => toggleSidebar());
  if (overlay) overlay.addEventListener("click", () => toggleSidebar(false));

  // ===== Chat rendering =====
  function addMsg(role, html, { typing = false } = {}) {
    if (!chat) return null;
    const wrap = document.createElement("div");
    wrap.className = `msg ${role}${typing ? " typing" : ""}`;

    const roleEl = document.createElement("div");
    roleEl.className = "role";
    roleEl.textContent = role === "assistant" ? "SoleBot" : "Tu";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = typing
      ? `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`
      : html;

    if (role === "assistant") wrap.append(roleEl, bubble);
    else wrap.append(bubble);

    chat.appendChild(wrap);
    chat.scrollTop = chat.scrollHeight;
    return wrap;
  }

  function replaceTyping(node, html) {
    if (!node) return;
    node.classList.remove("typing");
    const b = node.querySelector(".bubble");
    if (b) b.innerHTML = html;
    if (chat) chat.scrollTop = chat.scrollHeight;
  }

  // ===== Banner/Lock management =====
  function renderLockBanner() {
    const banner = document.createElement("div");
    banner.className = "lock-banner";
    banner.innerHTML = `
      <span class="note">❌ Se non resetti, non posso andare avanti.</span>
      <button class="reset-btn">🔄 Reset preventivo</button>
    `;

    // Inserisci prima del composer, oppure in fondo alla chat se composer manca
    if (composer && composer.parentElement) {
      composer.parentElement.insertBefore(banner, composer);
    } else if (chat) {
      chat.appendChild(banner);
    }

    const btn = $(".reset-btn", banner);
    if (btn) btn.addEventListener("click", resetChat);
  }

  function setLocked(lock) {
    isLocked = lock;
    lockNotified = false;

    const old = $(".lock-banner");
    if (old) old.remove();
    if (lock) renderLockBanner();
  }

  function checkLock() {
    if (!isLocked) return false;
    if (!lockNotified) {
      addMsg("assistant", "❌ Se non resetti, non posso andare avanti.");
      lockNotified = true;
    }
    return true;
  }

  // ===== Reset =====
  function resetChat() {
    if (chat) chat.innerHTML = "";
    setLocked(false);
    addMsg("assistant", "✅ Chat azzerata. Puoi ripartire con un nuovo preventivo.");
  }

  // ===== Home Page =====
  function showHome() {
    if (chat) chat.innerHTML = "";
    setLocked(false);

    const homeMessage = `
      <div style="text-align: center; padding: 40px 20px;">
        <h1 style="color: var(--accent); font-size: 32px; margin-bottom: 20px;">
          👋 Benvenuto in MarterNeri
        </h1>
        <p style="font-size: 18px; line-height: 1.6; color: var(--text); max-width: 600px; margin: 0 auto;">
          Il tuo assistente per calcolare preventivi di spedizione in modo rapido e professionale.
        </p>
      </div>
    `;

    addMsg("assistant", homeMessage);
  }

  // ===== Funzioni helper e calcolo tariffe =====
  // NOTA: Tutte le funzioni di calcolo (getZonaItalia, calcolaPrezzoItalia, ecc.)
  // sono importate da listini.js

  // ===== Demo: form preventivo =====
  function renderQuoteForm(type = "italia") {
    if (checkLock()) return;
    currentShippingType = type;

    const intro = addMsg("assistant", "", { typing: true });

    let formHTML = "";
    let titleText = "";

    // Genera form diverso in base al tipo di spedizione
    switch(type) {
      case "italia":
        // Menu di selezione zona Italia
        titleText = "🇮🇹 Seleziona la zona Italia:";
        formHTML = `
          <div class="quote-form">
            <button class="zone-select-btn" data-zone="italia-toscana">
              <span class="zone-icon">🏛️</span>
              <span class="zone-info">
                <strong>Toscana</strong>
                <small>CAP 50-59 • Tariffe dedicate</small>
              </span>
            </button>
            <button class="zone-select-btn" data-zone="italia-a">
              <span class="zone-icon">🇮🇹</span>
              <span class="zone-info">
                <strong>Italia A</strong>
                <small>Italia continentale (escluse Toscana e isole)</small>
              </span>
            </button>
            <button class="zone-select-btn" data-zone="italia-b">
              <span class="zone-icon">🏝️</span>
              <span class="zone-info">
                <strong>Italia B</strong>
                <small>Calabria, Sicilia, Sardegna</small>
              </span>
            </button>
          </div>`;
        break;

      case "italia-toscana":
      case "italia-a":
      case "italia-b":
        const zoneName = type === "italia-toscana" ? "Toscana" : (type === "italia-a" ? "Italia A" : "Italia B");
        titleText = `📦 Calcolo spedizione ${zoneName} - Compila i dati:`;
        formHTML = `
          <div class="quote-form">
            <div class="row">
              <input id="nazione" value="Italia" readonly style="background: #f0f0f0;" />
              <input id="citta" placeholder="Città" inputmode="text" />
            </div>
            <div class="row">
              <input id="cap" placeholder="CAP" inputmode="text" />
              <input id="weight" placeholder="Peso (kg)" inputmode="decimal" />
            </div>
            <div class="row">
              <input id="len" placeholder="Lunghezza (cm)" inputmode="decimal" />
              <input id="wid" placeholder="Larghezza (cm)" inputmode="decimal" />
              <input id="hei" placeholder="Altezza (cm)" inputmode="decimal" />
            </div>
            <button id="calcBtn">Calcola preventivo ${zoneName}</button>
          </div>`;
        break;

      case "europa":
        titleText = "🚚 Calcolo spedizione Europa - Compila i dati:";
        formHTML = `
          <div class="quote-form">
            <div class="row">
              <input id="nazione" placeholder="Nazione" inputmode="text" list="paesiEuropaList" autocomplete="off" />
              <input id="citta" placeholder="Città" inputmode="text" />
            </div>
            <datalist id="paesiEuropaList">
              ${Object.values(paesiEuropa).flat().sort().map(p => `<option value="${p}">`).join('')}
            </datalist>
            <div class="row">
              <input id="cap" placeholder="CAP/Codice Postale" inputmode="text" />
              <input id="weight" placeholder="Peso (kg)" inputmode="decimal" />
            </div>
            <div class="row">
              <input id="len" placeholder="Lunghezza (cm)" inputmode="decimal" />
              <input id="wid" placeholder="Larghezza (cm)" inputmode="decimal" />
              <input id="hei" placeholder="Altezza (cm)" inputmode="decimal" />
            </div>
            <button id="calcBtn">Calcola preventivo Europa</button>
          </div>`;
        break;

      case "extraue":
        titleText = "✈️ Calcolo spedizione Extra-UE - Compila i dati:";
        formHTML = `
          <div class="quote-form">
            <div class="row">
              <input id="nazione" placeholder="Nazione" inputmode="text" list="paesiExtraUEList" autocomplete="off" />
              <input id="citta" placeholder="Città" inputmode="text" />
            </div>
            <datalist id="paesiExtraUEList">
              ${Object.values(zoneExtraUE).flat().sort().map(p => `<option value="${p}">`).join('')}
            </datalist>
            <div class="row">
              <input id="cap" placeholder="Codice Postale" inputmode="text" />
              <input id="weight" placeholder="Peso (kg)" inputmode="decimal" />
            </div>
            <div class="row">
              <input id="len" placeholder="Lunghezza (cm)" inputmode="decimal" />
              <input id="wid" placeholder="Larghezza (cm)" inputmode="decimal" />
              <input id="hei" placeholder="Altezza (cm)" inputmode="decimal" />
            </div>
            <button id="calcBtn">Calcola preventivo Extra-UE</button>
          </div>`;
        break;

      case "usa":
        titleText = "🇺🇸 Calcolo spedizione USA - Compila i dati:";
        formHTML = `
          <div class="quote-form">
            <div class="row">
              <input id="nazione" value="USA" readonly style="background: #f0f0f0;" />
              <input id="citta" placeholder="Città/Stato" inputmode="text" list="cittaUSAList" autocomplete="off" />
            </div>
            <datalist id="cittaUSAList">
              ${Object.values(zoneUSA).flat().sort().map(c => `<option value="${c}">`).join('')}
            </datalist>
            <div class="row">
              <input id="zip" placeholder="ZIP Code" inputmode="text" />
              <input id="weight" placeholder="Peso (kg)" inputmode="decimal" />
            </div>
            <div class="row">
              <input id="len" placeholder="Lunghezza (cm)" inputmode="decimal" />
              <input id="wid" placeholder="Larghezza (cm)" inputmode="decimal" />
              <input id="hei" placeholder="Altezza (cm)" inputmode="decimal" />
            </div>
            <button id="calcBtn">Calcola preventivo USA</button>
          </div>`;
        break;
    }

    setTimeout(() => {
      replaceTyping(intro, `${titleText}<br>${formHTML}`);

      // Se è il menu Italia, aggiungi listener ai pulsanti di selezione zona
      if (type === "italia") {
        const zoneButtons = $$(".zone-select-btn");
        zoneButtons.forEach(btn => {
          btn.addEventListener("click", () => {
            const selectedZone = btn.getAttribute("data-zone");
            // Reset della chat e mostra il form della zona selezionata
            if (chat) chat.innerHTML = "";
            setLocked(false);
            renderQuoteForm(selectedZone);
          });
        });
      } else {
        // Per tutti gli altri tipi, gestisci il calcolo
        const calcBtn = $("#calcBtn");
        if (calcBtn) {
          calcBtn.addEventListener("click", () => handleCalculation(type));
        }
      }
    }, 300);
  }

  // ===== Gestione calcolo in base al tipo =====
  function handleCalculation(type) {
    const w = parseFloat($("#weight")?.value?.replace(",", ".") || "0") || 0;
    const L = parseFloat($("#len")?.value?.replace(",", ".") || "0") || 0;
    const W = parseFloat($("#wid")?.value?.replace(",", ".") || "0") || 0;
    const H = parseFloat($("#hei")?.value?.replace(",", ".") || "0") || 0;

    if (w <= 0) {
      addMsg("assistant", "⚠️ Inserisci un peso valido!");
      return;
    }

    const vol = (L * W * H) / 5000; // peso volumetrico
    const kg = Math.max(w, vol);

    let risultato = "";

    switch(type) {
      case "italia-toscana":
      case "italia-a":
      case "italia-b": {
        const cap = $("#cap")?.value?.trim() || "";
        const citta = $("#citta")?.value?.trim() || "";

        if (!cap) {
          addMsg("assistant", "⚠️ Inserisci un CAP valido!");
          return;
        }

        const zona = getZonaItalia(cap);
        if (!zona) {
          addMsg("assistant", "⚠️ CAP non riconosciuto!");
          return;
        }

        const price = calcolaPrezzoItalia(kg, zona);
        const zoneName = type === "italia-toscana" ? "Toscana" : (type === "italia-a" ? "Italia A" : "Italia B");
        risultato = `
          <strong>📦 Preventivo ${zoneName}</strong><br>
          • Destinazione: ${citta} (${cap})<br>
          • Zona rilevata: <strong>${zona}</strong><br>
          • Peso reale: ${w.toFixed(2)} kg<br>
          • Peso volumetrico: ${vol.toFixed(2)} kg<br>
          • Peso tassabile: <strong>${kg.toFixed(2)} kg</strong><br>
          <br>
          ➡️ <strong>Totale: € ${price.toFixed(2)}</strong>
        `;
        break;
      }

      case "europa": {
        const nazione = $("#nazione")?.value?.trim() || "";
        const citta = $("#citta")?.value?.trim() || "";
        const cap = $("#cap")?.value?.trim() || "";

        if (!nazione) {
          addMsg("assistant", "⚠️ Inserisci una nazione valida!");
          return;
        }

        const zona = getZonaEuropa(nazione);
        if (!zona) {
          addMsg("assistant", `⚠️ Nazione "${nazione}" non trovata nell'elenco Europa!`);
          return;
        }

        const price = calcolaPrezzoEuropa(kg, zona);
        const zonaNum = zona.replace("zona", "");
        risultato = `
          <strong>🚚 Preventivo Europa</strong><br>
          • Destinazione: ${citta}${cap ? ` (${cap})` : ''}, ${nazione}<br>
          • Zona Europa: <strong>${zonaNum}</strong><br>
          • Peso reale: ${w.toFixed(2)} kg<br>
          • Peso volumetrico: ${vol.toFixed(2)} kg<br>
          • Peso tassabile: <strong>${kg.toFixed(2)} kg</strong><br>
          <br>
          ➡️ <strong>Totale: € ${price.toFixed(2)}</strong>
        `;
        break;
      }

      case "extraue": {
        const nazione = $("#nazione")?.value?.trim() || "";
        const citta = $("#citta")?.value?.trim() || "";
        const cap = $("#cap")?.value?.trim() || "";

        if (!nazione) {
          addMsg("assistant", "⚠️ Inserisci una nazione valida!");
          return;
        }

        const zona = getZonaExtraUE(nazione);
        if (!zona) {
          addMsg("assistant", `⚠️ Nazione "${nazione}" non trovata nell'elenco Extra-UE!`);
          return;
        }

        const price = calcolaPrezzoExtraUE(kg, zona);
        const zonaNum = zona.replace("zona", "");
        risultato = `
          <strong>✈️ Preventivo Extra-UE</strong><br>
          • Destinazione: ${citta}${cap ? ` (${cap})` : ''}, ${nazione}<br>
          • Zona Extra-UE: <strong>${zonaNum}</strong><br>
          • Peso reale: ${w.toFixed(2)} kg<br>
          • Peso volumetrico: ${vol.toFixed(2)} kg<br>
          • Peso tassabile: <strong>${kg.toFixed(2)} kg</strong><br>
          <br>
          ➡️ <strong>Totale: € ${price.toFixed(2)}</strong>
        `;
        break;
      }

      case "usa": {
        const citta = $("#citta")?.value?.trim() || "";
        const zip = $("#zip")?.value?.trim() || "";

        if (!citta) {
          addMsg("assistant", "⚠️ Inserisci una città valida!");
          return;
        }

        const zona = getZonaUSA(citta);
        const price = calcolaPrezzoUSA(kg, zona);
        const zonaNum = zona.replace("zona", "");
        risultato = `
          <strong>🇺🇸 Preventivo USA</strong><br>
          • Destinazione: ${citta}${zip ? ` (${zip})` : ''}<br>
          • Zona USA: <strong>${zonaNum}</strong><br>
          • Peso reale: ${w.toFixed(2)} kg<br>
          • Peso volumetrico: ${vol.toFixed(2)} kg<br>
          • Peso tassabile: <strong>${kg.toFixed(2)} kg</strong><br>
          <br>
          ➡️ <strong>Totale: € ${price.toFixed(2)}</strong>
        `;
        break;
      }
    }

    addMsg("assistant", risultato);
    setLocked(true);
  }

  // Mostra la home all'avvio oppure il form specifico in base alla pagina
  const currentPath = window.location.pathname.toLowerCase();

  // Usa includes() per gestire diversi formati URL (con/senza .html, con parametri, etc.)
  if (currentPath.includes('italia')) {
    renderQuoteForm('italia');
  } else if (currentPath.includes('europa')) {
    renderQuoteForm('europa');
  } else if (currentPath.includes('extraue')) {
    renderQuoteForm('extraue');
  } else if (currentPath.includes('usa')) {
    renderQuoteForm('usa');
  } else {
    // Home page (index.html o nessun file specifico)
    showHome();
  }

  // Link mobile per aprire la sidebar
  const mobileSidebarToggle = $("#mobileSidebarToggle");
  if (mobileSidebarToggle) {
    mobileSidebarToggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSidebar(true);
    });
  }

  // Chiudi sidebar quando si clicca su link di navigazione (solo su mobile)
  const sidebarLinks = $$(".sb-btn");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Chiudi la sidebar se è aperta (tipicamente su mobile/tablet)
      if (document.body.classList.contains("sidebar-open")) {
        toggleSidebar(false);
      }
    });
  });
});