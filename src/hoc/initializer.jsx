import React ,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import useRouter from '../hook/useRouter';
import { authCheckState } from "./../store/actions/auth_action";
import { addLanguages } from "./../store/actions/translation_action";
import { getTypes } from "./../store/actions/pokemon_action";
// import {getAllPokemons} from "./../store/actions/pokedex_action"

function Initializer({children}) {
    const dispatch = useDispatch();	
    const route = useRouter();
    const isAuthenticate = useSelector(state => state.auth.isAuthenticate);
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath);
    const languages  = useSelector(state => state.translation.languageCodes)  
    const types  = useSelector(state => state.pokemon.types)
    // const pokemons  = useSelector(state => state.pokemons.pokemons)  

    useEffect(() => {
        dispatch(authCheckState());        
    }, [dispatch]);
    
    useEffect(() => {
        if(isAuthenticate){
            route.history.push(`${authRedirectPath}`)
        }else{
            route.history.push(`/login`)
        }
    }, [isAuthenticate])

    useEffect(() => {
        if(!languages || languages.length === 0 )
            dispatch(addLanguages())  
    }, [dispatch, languages])

    useEffect(() => {
        if(!types || types.length === 0 )
            dispatch(getTypes())  
    }, [dispatch, types])

    // useEffect(() => {
    //     if(!products || products.length === 0 )
    //         dispatch(getAllPokemons())   
    // }, [dispatch, products])

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

export default Initializer
