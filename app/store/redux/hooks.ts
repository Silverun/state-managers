import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from ".";

// Typed `useDispatch` hook
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Typed `useSelector` hook
export const useAppSelector = useSelector.withTypes<RootState>();
