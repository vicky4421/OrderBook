import { useState, type SubmitEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../../api/axios"
import axios from "axios"

interface FieldError {
    field: string,
    message: string
}

interface APIErrorResponse {
    message?: string,
    errors?: FieldError[]
}

function RegisterPage() {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrorMessage(null)
        setFieldErrors({})
        setLoading(true)

        try {

            await (api.post("/users/register", { username, name, password }))
            navigate("/login", { state: { message: "Account created successfully, please sign in!" } })

        } catch (error) {
            if (axios.isAxiosError<APIErrorResponse>(error)) {
                const data = error.response?.data
                if (Array.isArray(data?.errors) && data.errors.length > 0) {
                    const mapped: Record<string, string> = {}
                    data.errors.forEach(err => {
                        if (err.field) mapped[err.field] = err.message
                    })
                    setFieldErrors(mapped)
                }
                setErrorMessage(
                    data?.message || (error.response) ?
                        "Registration failed. Please try again."
                        : "Unable to connect to server."
                )
            } else {
                setErrorMessage("An unexpected error occured!")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto w-full max-w-md">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Create your account
                    </h1>
                    <p className="mt-1.5 text-sm text-slate-600">
                        Start placing and tracking supplier orders in one place
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {fieldErrors.name && (
                            <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-1 block text-sm font-medium text-slate-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="bond007"
                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            3–20 characters: lowercase letters, numbers, and underscores only
                        </p>
                        {fieldErrors.username && (
                            <p className="mt-1 text-xs text-red-600">{fieldErrors.username}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-sm font-medium text-slate-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <p className="mt-1 text-xs text-slate-500">Minimum 8 characters</p>
                        {fieldErrors.password && (
                            <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div >
    )
}

export default RegisterPage
