import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'

export default function Login() {
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('password')
  const dispatch = useDispatch()
  const { status, error } = useSelector(s => s.auth)

  const submit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-3">
        <h1 className="text-2xl font-semibold">Login</h1>
        <div>
          <div className="label">Email</div>
          <input className="input" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <div className="label">Password</div>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="btn btn-primary w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}