import { redirect } from 'next/navigation'

// Redirect root to the full ERP application
export default function Home() {
  redirect('/app.html')
}
