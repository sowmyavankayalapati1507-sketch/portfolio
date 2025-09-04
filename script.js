const form = document.getElementById('contactForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn = form.querySelector('button');
  btn.disabled = true;
  btn.textContent = "⏳ Sending...";

  const body = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };

  try {
    const res = await fetch('/api/sendmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      status.textContent = "✅ Message sent successfully!";
      status.style.color = "#00f7ff";
      form.reset();
    } else {
      const j = await res.json().catch(()=>null);
      status.textContent = "❌ Failed: " + (j?.error || "Server error");
      status.style.color = "red";
    }
  } catch (err) {
    status.textContent = "❌ Network error, please try again.";
    status.style.color = "red";
  } finally {
    btn.disabled = false;
    btn.textContent = "Send";
  }
});
