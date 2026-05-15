import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from '../redux/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const useRedux = () => {
  const rootState = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  return { dispatch, rootState }
}

export default useRedux