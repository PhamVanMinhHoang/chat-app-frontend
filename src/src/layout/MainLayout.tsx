import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    )
}
