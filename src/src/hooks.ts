import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Sử dụng thay thế cho useDispatch và useSelector
// Dùng cho dispatch action có type chính xác
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Dùng để lấy state có type đúng
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;