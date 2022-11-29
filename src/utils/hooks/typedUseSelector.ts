import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootStateType } from '../../context/store';

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
