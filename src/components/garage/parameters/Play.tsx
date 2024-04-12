// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Button from "../../common/Button.tsx";

const Play = ({onRace, onReset}) => {

    return (
        <div className="flex space-x-2">
            <Button text={"RACE"} onClick={onRace} />
            <Button text={"RESET"} onClick={onReset}/>
        </div>
    )
}
export default Play