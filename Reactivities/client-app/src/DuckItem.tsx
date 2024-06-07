import { Duck } from "./demo"

/* Allows multiple types to be used as properties */
interface Props {
    duck: Duck
    /* testNum: number, */
}



/* Destructure Props -> {duck} for cleanliness */
export default function DuckItem({ duck }: Props) {

    return (
        <div key={duck.name}> {/* each div from the array has its own key to be able to tell them apart */}
            <span>{duck.name}</span>
            <button onClick={() => duck.makeSound(duck.name + ' quack')}>Make Sound</button>
        </div>
    )
}