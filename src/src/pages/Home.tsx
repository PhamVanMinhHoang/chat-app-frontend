import React from 'react'
import Header from '../components/Header'

const Home: React.FC = () => (
    <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="p-4">
            <h2>Welcome to Chat App!</h2>
        </main>
    </div>
)

export default Home