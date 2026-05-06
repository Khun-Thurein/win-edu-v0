import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Lets phones on the same Wi‑Fi open http://<your-LAN-IP>:5173 (see terminal “Network” URL).
    host: true,
  },
})
