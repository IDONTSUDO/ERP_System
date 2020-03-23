
import {GetDialogList} from "../Api/Http"


export default function SessionDialogList(){
    GetDialogList().then(Data => (console.log(Data)))
}