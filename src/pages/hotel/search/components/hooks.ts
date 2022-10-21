import { useRef, useState, RefObject } from 'react'

// to get the value of a ref from `useRef`
export function getRefValue<C>(ref: RefObject<C>) {
  return ref.current as C
}

// extension of `useState` to be able to access the state as a ref
export function useStateRef<S>(
  defaultValue: S,
): [S, (value: S) => void, RefObject<S>] {
  const ref = useRef<S>(defaultValue)
  const [state, _setState] = useState<S>(defaultValue)
  const setState = (value: S) => {
    _setState(value)
    ref.current = value
  }

  return [state, setState, ref]
}
