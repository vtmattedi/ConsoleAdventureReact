import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <section className="not-found-page">
      <h1>Page Not Found</h1>
      <p>The terminal you are looking for is not in this route.</p>
      <button type="button" onClick={() => navigate('/')}>
        <span className="bi bi-house-fill" aria-hidden="true" />
        <span>Back Home</span>
      </button>
    </section>
  )
}
