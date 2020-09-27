import { useCallback } from 'react'
import Nav from '../components/nav'

export default function Home() {
  const alert = useCallback(() => {
    window.alert('With typescript and Jest')
  }, [])

  return (
    <div className="container mx-auto">
      <Nav />
      <div className="py-20">
        <h1 className="text-5xl text-center text-accent-1">
          Next.js + Tailwind CSS
        </h1>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-gray-100 px-4 py-2 rounded-md border-solid border-2 border-gray-400 hover:border-blue-300 hover:shadow-md"
          onClick={alert}
        >
          Test Button
        </button>
      </div>
    </div>
  )
}
