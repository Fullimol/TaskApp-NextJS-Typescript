import { useDebugValue, useEffect, useState } from "react";

export function useLocalStorage(key:any, initialState:any) {
  const [state, setState] = useState(initialState);


  useEffect(() => {
    const item = localStorage.getItem(key);
    if (item) setState(parse(item));
  }, []);

  useEffect(() => {
    if (state.length > 0) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  return [state, setState];
}

function parse(obj:any) {
  try {
    return JSON.parse(obj);
  } catch {
    return obj;
  }
}


// Este codigo es necesario para guardar y leer las task del localStorage ( se ha agregado "any" )