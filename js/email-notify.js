/* ============================================================
   Qushaq — email notifications
   ------------------------------------------------------------
   Static sites can't send email themselves (no server / SMTP).
   This uses Web3Forms (https://web3forms.com) as a thin relay:
   the browser POSTs the submission to their API, and Web3Forms
   delivers it by email to whatever address owns the access key
   below — no backend code required on our side.

   SETUP (one-time, ~1 minute):
   1. Go to https://web3forms.com and enter qushaq.app@mail.ru
      to generate a free Access Key (no account/card needed).
   2. Paste that key into WEB3FORMS_ACCESS_KEY below.
   That's it — every new registration will then arrive as an
   email in the qushaq.app@mail.ru inbox.

   Until a real key is set, this silently no-ops (registration
   still works locally; it just won't email anyone).
   ============================================================ */

const WEB3FORMS_ACCESS_KEY = '5f1b7978-52d5-4def-97bc-7fa9f82241d2';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const NOTIFY_TARGET_EMAIL = 'qushaq.app@mail.ru';

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
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        message,
        from_name: 'Qushaq app',
        // Web3Forms uses this as the reply-to address on the email it sends;
        // it does NOT change the delivery inbox (that's tied to the access key
        // itself, set to qushaq.app@mail.ru when the key was generated).
        email: replyTo || NOTIFY_TARGET_EMAIL,
      })
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || data.success !== true) {
      console.error('[Qushaq] Web3Forms rejected the email notification:', res.status, data);
    } else {
      console.log('[Qushaq] Email notification sent.');
    }
  } catch (err) {
    console.warn('[Qushaq] Email notification failed to send (network error):', err);
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
