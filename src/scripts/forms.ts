// Form handling for every <form data-form>: validation, file inputs, honest submission.
//
// Delivery: if PUBLIC_FORM_ENDPOINT is set at build time, the form is POSTed there as
// multipart/form-data. If it is not set, the form runs in demonstration mode: it validates,
// shows what would be sent, and states plainly that nothing was sent.

const ENDPOINT: string = (import.meta.env.PUBLIC_FORM_ENDPOINT || '').trim();
const PHONE = '(945) 243-7844';
const EMAIL = 'info@maklonestar.com';

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const fmtSize = (b: number) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

function fieldLabel(wrap: HTMLElement): string {
  const l = wrap.querySelector('label, .label');
  return (l?.textContent || 'This field').replace('*', '').replace(/\(required\)/i, '').trim();
}

function validateWrap(wrap: HTMLElement): string {
  const group = wrap.dataset.group; // checkbox/radio group
  if (group) {
    const boxes = wrap.querySelectorAll<HTMLInputElement>('input');
    if (wrap.dataset.required !== undefined && ![...boxes].some((b) => b.checked)) return `Choose at least one option for ${fieldLabel(wrap).toLowerCase()}.`;
    return '';
  }
  const el = wrap.querySelector<Field>('input, select, textarea');
  if (!el) return '';
  if (el instanceof HTMLInputElement && el.type === 'file') {
    const files = [...(el.files || [])];
    if (el.required && !files.length) return `Attach ${fieldLabel(wrap).toLowerCase()}.`;
    const max = Number(wrap.dataset.maxMb || 25) * 1048576;
    const maxFiles = Number(wrap.dataset.maxFiles || 10);
    const allowed = (el.accept || '').split(',').map((a) => a.trim().toLowerCase()).filter(Boolean);
    if (files.length > maxFiles) return `Attach up to ${maxFiles} files.`;
    for (const f of files) {
      const ext = '.' + (f.name.split('.').pop() || '').toLowerCase();
      if (allowed.length && !allowed.includes(ext)) return `${f.name} is not an accepted file type.`;
      if (f.size > max) return `${f.name} is larger than ${wrap.dataset.maxMb || 25} MB.`;
    }
    return '';
  }
  const v = el.value.trim();
  if (el.required && !v) return el instanceof HTMLSelectElement ? `Select ${fieldLabel(wrap).toLowerCase()}.` : `Enter ${fieldLabel(wrap).toLowerCase()}.`;
  if (!v) return '';
  if (el instanceof HTMLInputElement && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter a valid email address, like name@company.com.';
  if (el instanceof HTMLInputElement && el.type === 'tel' && v.replace(/\D/g, '').length < 10) return 'Enter a 10-digit phone number, including area code.';
  if (el.dataset.min && v.length < Number(el.dataset.min)) return `Add a little more detail (at least ${el.dataset.min} characters).`;
  return '';
}

function setError(wrap: HTMLElement, msg: string) {
  const err = wrap.querySelector<HTMLElement>('.error');
  const controls = wrap.querySelectorAll<Field>('input, select, textarea');
  wrap.classList.toggle('invalid', !!msg);
  if (err) err.textContent = msg;
  controls.forEach((c) => {
    if (msg) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid');
  });
}

function describe(form: HTMLFormElement): { label: string; value: string }[] {
  const out: { label: string; value: string }[] = [];
  form.querySelectorAll<HTMLElement>('.field').forEach((wrap) => {
    const label = fieldLabel(wrap);
    if (wrap.dataset.group) {
      const vals = [...wrap.querySelectorAll<HTMLInputElement>('input:checked')].map((i) => i.value);
      if (vals.length) out.push({ label, value: vals.join(', ') });
      return;
    }
    const el = wrap.querySelector<Field>('input, select, textarea');
    if (!el) return;
    if (el instanceof HTMLInputElement && el.type === 'file') {
      const files = [...(el.files || [])];
      if (files.length) out.push({ label, value: files.map((f) => `${f.name} (${fmtSize(f.size)})`).join(', ') });
      return;
    }
    const v = el instanceof HTMLSelectElement ? (el.selectedOptions[0]?.value ? el.selectedOptions[0].text : '') : el.value.trim();
    if (v) out.push({ label, value: v });
  });
  return out;
}

function initFiles(form: HTMLFormElement) {
  form.querySelectorAll<HTMLElement>('.drop').forEach((drop) => {
    const input = drop.querySelector<HTMLInputElement>('input[type=file]');
    const list = drop.parentElement?.querySelector<HTMLUListElement>('.file-list');
    if (!input || !list) return;
    const render = () => {
      const files = [...(input.files || [])];
      list.innerHTML = files.map((f) => `<li><span>${esc(f.name)}</span><span class="size">${fmtSize(f.size)}</span></li>`).join('');
      const wrap = input.closest<HTMLElement>('.field');
      if (wrap && (form.dataset.tried || files.length)) setError(wrap, validateWrap(wrap));
    };
    input.addEventListener('change', render);
    ['dragenter', 'dragover'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
    ['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, () => drop.classList.remove('is-over')));
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      const dt = (e as DragEvent).dataTransfer;
      if (dt?.files?.length) { input.files = dt.files; render(); }
    });
  });
}

function showStatus(form: HTMLFormElement, kind: 'ok' | 'demo' | 'err', html: string) {
  const box = form.parentElement?.querySelector<HTMLElement>('.form-status');
  if (!box) return;
  box.className = `form-status show ${kind}`;
  box.innerHTML = html;
  box.setAttribute('tabindex', '-1');
  box.focus();
  box.scrollIntoView({ block: 'center', behavior: 'smooth' });
  box.querySelector<HTMLButtonElement>('[data-reset]')?.addEventListener('click', () => {
    form.reset();
    form.querySelectorAll('.file-list').forEach((l) => (l.innerHTML = ''));
    form.hidden = false;
    box.className = 'form-status';
    box.innerHTML = '';
    delete form.dataset.tried;
    form.querySelector<HTMLElement>('input, select, textarea')?.focus();
  });
}

function init(form: HTMLFormElement) {
  form.noValidate = true;
  const wraps = [...form.querySelectorAll<HTMLElement>('.field')];
  const summary = form.querySelector<HTMLElement>('.error-summary');
  const submit = form.querySelector<HTMLButtonElement>('button[type=submit]');
  const name = form.dataset.form || 'form';

  wraps.forEach((wrap) => {
    wrap.querySelectorAll<Field>('input, select, textarea').forEach((el) => {
      const ev = el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio') ? 'change' : 'blur';
      el.addEventListener(ev, () => { if (form.dataset.tried || el.value) setError(wrap, validateWrap(wrap)); });
      el.addEventListener('input', () => { if (wrap.classList.contains('invalid')) setError(wrap, validateWrap(wrap)); });
    });
  });
  initFiles(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.dataset.tried = '1';
    const problems: { wrap: HTMLElement; msg: string }[] = [];
    wraps.forEach((wrap) => { const msg = validateWrap(wrap); setError(wrap, msg); if (msg) problems.push({ wrap, msg }); });

    if (problems.length) {
      if (summary) {
        summary.innerHTML = `<p>Please fix ${problems.length === 1 ? 'this item' : `these ${problems.length} items`}:</p><ul>${problems
          .map((p) => {
            const c = p.wrap.querySelector<HTMLElement>('input, select, textarea');
            return `<li><a href="#${c?.id || ''}" data-jump="${c?.id || ''}">${esc(p.msg)}</a></li>`;
          })
          .join('')}</ul>`;
        summary.classList.add('show');
        summary.setAttribute('tabindex', '-1');
        summary.focus();
        summary.querySelectorAll<HTMLAnchorElement>('[data-jump]').forEach((a) => a.addEventListener('click', (ev) => {
          ev.preventDefault();
          document.getElementById(a.dataset.jump || '')?.focus();
        }));
      }
      return;
    }
    summary?.classList.remove('show');

    // Honeypot: real visitors never fill this hidden field.
    const trap = form.querySelector<HTMLInputElement>('.honey input');
    const details = describe(form);
    const rows = details.map((d) => `<li><b>${esc(d.label)}:</b> ${esc(d.value)}</li>`).join('');

    if (!ENDPOINT || trap?.value) {
      form.hidden = true;
      showStatus(form, 'demo', `
        <h3>Your request is complete, but it has not been sent</h3>
        <p>This website preview is not yet connected to MAK Lonestar’s inbox, so nothing was delivered. To reach the team today, call <a href="tel:+19452437844">${PHONE}</a> or email <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
        <details><summary>Show what would be sent</summary><ul class="sent-list">${rows}</ul></details>
        <p><button class="btn btn--ghost" type="button" data-reset>Start a new form</button></p>`);
      return;
    }

    if (submit) { submit.disabled = true; submit.dataset.label = submit.textContent || ''; submit.textContent = 'Sending…'; }
    try {
      const data = new FormData(form);
      data.append('_form', name);
      data.append('_page', location.href);
      const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.hidden = true;
      showStatus(form, 'ok', `
        <h3>Thank you, your request was sent</h3>
        <p>MAK Lonestar received your submission and will follow up during business hours, Monday to Friday, 8:00 AM to 5:00 PM. If your request is urgent, call <a href="tel:+19452437844">${PHONE}</a>.</p>
        <p><button class="btn btn--ghost" type="button" data-reset>Send another</button></p>`);
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: 'form_submit', form: name });
    } catch {
      showStatus(form, 'err', `
        <h3>We couldn’t send your request</h3>
        <p>Something went wrong on our side and your form was not delivered. Your answers are still filled in below, so you can try again, or contact us directly at <a href="tel:+19452437844">${PHONE}</a> or <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`);
    } finally {
      if (submit) { submit.disabled = false; submit.textContent = submit.dataset.label || 'Submit'; }
    }
  });

  // Pre-select a service from ?service=slug (used by "Request a proposal" buttons on service pages).
  try {
    const svc = new URLSearchParams(location.search).get('service');
    if (svc) form.querySelectorAll<HTMLInputElement>(`input[data-service="${CSS.escape(svc)}"]`).forEach((i) => (i.checked = true));
  } catch { /* ignore */ }
}

document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach(init);
