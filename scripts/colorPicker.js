// DON'T change anything here, its chatgpt slop I wont know how to fix it for you
function parseHex(text) {
    const t = text.trim();
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t) ? t : null;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    }
}

// Helper: flash button feedback
function flashButton(btn, label, cls) {
    const original = btn.textContent;
    btn.classList.remove('done', 'error');
    if (cls) btn.classList.add(cls);
    btn.textContent = label;
    setTimeout(() => {
        btn.classList.remove('done', 'error');
        btn.textContent = original;
    }, 900);
}

function syncPreview(row) {
    const hexEl = row.querySelector('.hex');
    const preview = row.querySelector('.color-preview-box');
    const hex = parseHex(hexEl.textContent);
    preview.style.background = hex || 'transparent';
    preview.title = hex || 'Invalid color';
}

const rows = document.querySelectorAll('[data-js-color-row]');
rows.forEach((row) => {
    syncPreview(row);

    // Watch for text changes inside .hex (e.g., edited by JS or contenteditable)
    const hexEl = row.querySelector('.hex');
    const mo = new MutationObserver(() => syncPreview(row));
    mo.observe(hexEl, { characterData: true, childList: true, subtree: true });
});

document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const row = btn.closest('[data-js-color-row]');
    const hexEl = row.querySelector('.hex');
    const hex = parseHex(hexEl.textContent);

    if (!hex) {
        flashButton(btn, 'Invalid hex', 'error');
        return;
    }

    await copyToClipboard(hex);
    flashButton(btn, 'done', 'copied');
});