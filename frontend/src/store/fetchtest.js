fetch('/api/session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ identification: 'demoMan', password: 'password' })
});
