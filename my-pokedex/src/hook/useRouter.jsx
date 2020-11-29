import {useContext} from "react"
import {RouterContext} from "../browserRouter"

export default function useRouter() {
  return useContext(RouterContext)
}