function $(selector: string, f: (el: HTMLElement) => void) {
  document.querySelectorAll<HTMLElement>(selector).forEach(f);
}

const state = (function() {
  const start = Date.now();
  return {
    stopwatch: () => Math.round((Date.now() - start) / 1000)
  };
})();

const isTime = (el: HTMLElement): el is HTMLTimeElement =>
  el.tagName.toLowerCase() === "time";
const pad = (n: number) => (n > 9 ? String(n) : "0" + n);

function render() {
  const secondsPassed = state.stopwatch();
  const h = Math.floor(secondsPassed / 3600);
  const m = Math.floor((secondsPassed - h * 3600) / 60);
  const s = secondsPassed - m * 60 - h * 3600;
  const time = (h ? [h, m, s] : m ? [m, s] : [s]).map(pad).join(`\u200b:`);
  $("[data-stopwatch-clock]", el => {
    if (isTime(el)) {
      el.dateTime = `PT${h}H${m}M${s}S`;
    }
    el.innerText = time;
  });
  document.title = time;
}

render();
$(".layout", el => (el.style.opacity = "1"));
setInterval(render, 1000);
