import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>,
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const [state, setState] = useState<T>(initialState);

    useEffect(() => {
        async function getOlderState() {
            const storageValue = await AsyncStorage.getItem(key);

            if (storageValue) {
                setState(JSON.parse(storageValue));
            } else {
                setState(initialState);
            }
        }

        getOlderState();
    }, [])

    useEffect(() => {
        async function setNewItem(){
            await AsyncStorage.setItem(key, JSON.stringify(state));
        }

        setNewItem();
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;
