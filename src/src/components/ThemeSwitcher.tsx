import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '@/features/ui/uiSlice';
import { Moon, Sun } from 'lucide-react';

export const ThemeSwitcher = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: any) => state.ui.theme);

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            title="Đổi giao diện sáng/tối"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};
