/* ============================================================
   Qushaq — email notifications
   ------------------------------------------------------------
   Static sites can't send email themselves (no server / SMTP).
   This uses Web3Forms (https://web3forms.com) as a thin relay:
   the browser submits the submission to their API, and Web3Forms
   delivers it by email to whatever address owns the access key
   below — no backend code required on our side.

   SETUP (one-time, ~1 minute):
   1. Go to https://web3forms.com and enter qushaq.app@gmail.com
      to generate a free Access Key (no account/card needed).
   2. Paste that key into WEB3FORMS_ACCESS_KEY below.
   3. Web3Forms sends a confirmation email to that address the
      first time — you MUST click the link in it, or Web3Forms
      will silently accept submissions without ever delivering
      them. Check spam/junk too (mail.ru filters can be strict).

   Until a real key is set, this silently no-ops (registration
   still works locally; it just won't email anyone).

   IF EMAILS STILL DON'T ARRIVE:
   - Make sure you're testing on a real hosted URL (http/https),
     not by double-clicking index.html locally. Opening a page as
     file://... makes some browsers block fetch() outright before
     it even reaches Web3Forms (this file already falls back to a
     CORS-immune hidden-form submission in that case, but a proper
     host is still the most reliable way to test).
   - Open the browser console right after registering — this file
     logs the exact outcome ("Email notification sent" / an error
     with the Web3Forms response) so you can see what happened.
   - Log in to web3forms.com and check the "Submissions" log for
     the access key below — if a submission shows up there but no
     email arrived, it's a delivery/spam-filter issue on the mail.ru
     side, not a code issue.
   ============================================================ */

const WEB3FORMS_ACCESS_KEY = '5f1b7978-52d5-4def-97bc-7fa9f82241d2';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const NOTIFY_TARGET_EMAIL = 'qushaq.app@gmail.com';

/**
 * Classic hidden <form> POST to a hidden <iframe>, as a fallback for when
 * fetch() can't be used (e.g. CORS blocking a file:// origin, ad-blockers
 * blocking fetch to third-party APIs, etc). Regular form submissions are
 * not subject to CORS the way fetch/XHR are, so this works essentially
 * everywhere — the trade-off is we can't read the response to confirm
 * success, so it's used only as a fallback, not the primary path.
 */
function submitViaHiddenForm(fields) {
  let iframe = document.getElementById('w3f-relay-frame');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'w3f-relay-frame';
    iframe.name = 'w3f-relay-frame';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = WEB3FORMS_ENDPOINT;
  form.target = 'w3f-relay-frame';
  form.style.display = 'none';
  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value == null ? '' : String(value);
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
  console.log('[Qushaq] Email notification sent via fallback form submission (response cannot be read due to CORS, but the request was dispatched).');
  setTimeout(() => form.remove(), 1000);
}

/**
 * Fire-and-forget notification email. Never blocks or breaks the
 * calling flow (registration/login) even if the network request
 * fails or the access key hasn't been configured yet.
 */
async function sendEmailNotification({ subject, message, replyTo }) {
  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
    console.warn('[Qushaq] Email notifications are not configured yet — set WEB3FORMS_ACCESS_KEY in js/email-notify.js');
    return;
  }

  const fields = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject,
    message,
    from_name: 'Qushaq app',
    // Web3Forms uses this as the reply-to address on the email it sends;
    // it does NOT change the delivery inbox (that's tied to the access key
    // itself, set to qushaq.app@gmail.com when the key was generated).
    email: replyTo || NOTIFY_TARGET_EMAIL,
  };

  // file:// pages are treated as a "null" origin by CORS, and many browsers
  // block fetch() to a third-party API outright in that case — skip straight
  // to the CORS-immune fallback rather than waiting for it to fail.
  if (location.protocol === 'file:') {
    submitViaHiddenForm(fields);
    return;
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(fields)
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || data.success !== true) {
      console.error('[Qushaq] Web3Forms rejected the email notification:', res.status, data);
    } else {
      console.log('[Qushaq] Email notification sent.', data);
    }
  } catch (err) {
    console.warn('[Qushaq] fetch() failed (likely CORS/network) — falling back to a hidden-form submission:', err);
    submitViaHiddenForm(fields);
  }
}

/** Notify on a new account registration. */
function notifyNewRegistration(userEmail) {
  sendEmailNotification({
    subject: `Qushaq: new registration — ${userEmail}`,
    message: `A new user registered in the Qushaq app.\n\nEmail: ${userEmail}\nLanguage: ${CURRENT_LANG}\nTime: ${new Date().toISOString()}`,
    replyTo: userEmail
  });
}

/** Notify on a bracelet preorder submission (used by the landing page form). */
function notifyPreorder(data) {
  sendEmailNotification({
    subject: `Qushaq: new bracelet preorder — ${data.name || ''}`,
    message:
      `New bracelet preorder request.\n\n` +
      `Name: ${data.name || '-'}\n` +
      `Contact: ${data.contact || '-'}\n` +
      `Quantity: ${data.count || '-'}\n` +
      `City: ${data.city || '-'}\n` +
      `Note: ${data.note || '-'}\n` +
      `Language: ${CURRENT_LANG}\n` +
      `Time: ${new Date().toISOString()}`
  });
}
