/* =========================================================
   SJC CAMPUS NAVIGATOR — MODULE 3 SECURITY
   Academic password-security demonstration.
   Production authentication must be implemented server-side.
========================================================= */

(() => {
  'use strict';

  const STORAGE_KEY = 'sjc-security-credential-v1';
  const SESSION_KEY = 'sjc-security-session-v1';
  const ITERATIONS = 310000;
  const SALT_BYTES = 16;
  const KEY_BITS = 256;

  const $ = (id) => document.getElementById(id);

  function toBase64(bytes) {
    let binary = '';
    bytes.forEach((b) => { binary += String.fromCharCode(b); });
    return btoa(binary);
  }

  function fromBase64(value) {
    const binary = atob(value);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
  }

  function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  function hasRequiredComplexity(password) {
    return {
      length: password.length >= 12,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };
  }

  function strength(password) {
    const checks = hasRequiredComplexity(password);
    const score = Object.values(checks).filter(Boolean).length;
    if (!password) return { score: 0, label: 'Not entered' };
    if (score <= 2) return { score, label: 'Weak' };
    if (score === 3) return { score, label: 'Fair' };
    if (score === 4) return { score, label: 'Strong' };
    return { score, label: 'Excellent' };
  }

  function updateStrength(password) {
    const result = strength(password);
    const bar = $('strengthBar');
    const text = $('strengthText');
    if (!bar || !text) return;
    bar.style.width = `${Math.min(result.score / 5, 1) * 100}%`;
    text.textContent = result.label;
  }

  async function derivePasswordHash(password, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );

    return crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: ITERATIONS,
        hash: 'SHA-256'
      },
      keyMaterial,
      KEY_BITS
    );
  }

  function constantTimeEqual(a, b) {
    if (a.length !== b.length) return false;
    let difference = 0;
    for (let i = 0; i < a.length; i += 1) difference |= a[i] ^ b[i];
    return difference === 0;
  }

  function loadCredential() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function setStatus() {
    const status = $('credentialStatus');
    const credential = loadCredential();
    if (!status) return;
    status.textContent = credential ? 'CREDENTIAL SET' : 'NOT SET';
    status.classList.toggle('is-ready', Boolean(credential));
  }

  function message(target, text, type = '') {
    if (!target) return;
    target.textContent = text;
    target.className = `security-message ${type}`.trim();
  }

  async function createCredential(event) {
    event.preventDefault();
    const username = $('setupUsername').value.trim();
    const password = $('setupPassword').value;
    const confirmation = $('setupConfirm').value;
    const output = $('setupMessage');
    const checks = hasRequiredComplexity(password);

    if (!username || username.length < 3) {
      message(output, 'Username must contain at least 3 characters.', 'error');
      return;
    }
    if (!Object.values(checks).every(Boolean)) {
      message(output, 'Use at least 12 characters with uppercase, lowercase, number and special character.', 'error');
      return;
    }
    if (password !== confirmation) {
      message(output, 'Passwords do not match.', 'error');
      return;
    }
    if (!window.crypto?.subtle) {
      message(output, 'Web Crypto API is unavailable in this browser.', 'error');
      return;
    }

    const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
    const derived = await derivePasswordHash(password, salt);

    const credential = {
      version: 1,
      username,
      algorithm: 'PBKDF2-SHA-256',
      iterations: ITERATIONS,
      keyBits: KEY_BITS,
      salt: toBase64(salt),
      hash: bufferToHex(derived),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(credential));
    localStorage.removeItem(SESSION_KEY);
    $('setupForm').reset();
    updateStrength('');
    setStatus();
    message(output, 'Secure credential generated. Only the salt and derived hash were stored; the password was not stored.', 'success');
  }

  async function verifyCredential(event) {
    event.preventDefault();
    const username = $('loginUsername').value.trim();
    const password = $('loginPassword').value;
    const result = $('loginResult');
    const resultText = $('loginResultText');
    const credential = loadCredential();

    result.classList.remove('success', 'error');

    if (!credential) {
      result.classList.add('error');
      resultText.textContent = 'No credential exists yet. Create one in the setup panel first.';
      return;
    }

    const salt = fromBase64(credential.salt);
    const derived = await derivePasswordHash(password, salt);
    const validHash = constantTimeEqual(
      new Uint8Array(derived),
      Uint8Array.from(credential.hash.match(/.{1,2}/g).map((hex) => parseInt(hex, 16)))
    );
    const validUser = username === credential.username;

    if (validUser && validHash) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username, authenticatedAt: new Date().toISOString() }));
      result.classList.add('success');
      resultText.textContent = 'Verification successful. Demo admin session is active.';
    } else {
      sessionStorage.removeItem(SESSION_KEY);
      result.classList.add('error');
      resultText.textContent = 'Verification failed. Username or password is incorrect.';
    }
  }

  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
    const result = $('loginResult');
    result.classList.remove('success', 'error');
    $('loginResultText').textContent = 'Demo session cleared.';
  }

  function attachPasswordToggles() {
    document.querySelectorAll('[data-toggle-password]').forEach((button) => {
      button.addEventListener('click', () => {
        const input = $(button.dataset.togglePassword);
        if (!input) return;
        const visible = input.type === 'text';
        input.type = visible ? 'password' : 'text';
        button.textContent = visible ? 'Show' : 'Hide';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('setupPassword')?.addEventListener('input', (event) => updateStrength(event.target.value));
    $('setupForm')?.addEventListener('submit', createCredential);
    $('loginForm')?.addEventListener('submit', verifyCredential);
    $('logoutButton')?.addEventListener('click', clearSession);
    attachPasswordToggles();
    setStatus();
  });
})();
