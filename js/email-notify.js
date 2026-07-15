
const WEB3FORMS_ACCESS_KEY = '6be2b256-4477-4e01-b2cd-643545c6078e';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const NOTIFY_TARGET_EMAIL = 'qushaq.app@gmail.com';

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
    email: replyTo || NOTIFY_TARGET_EMAIL,
  };

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

function notifyNewRegistration(userEmail) {
  sendEmailNotification({
    subject: `Qushaq: new registration — ${userEmail}`,
    message: `A new user registered in the Qushaq app.\n\nEmail: ${userEmail}\nLanguage: ${CURRENT_LANG}\nTime: ${new Date().toISOString()}`,
    replyTo: userEmail
  });
}

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
