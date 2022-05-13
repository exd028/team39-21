import { NavLink } from "react-router-dom"

const BottomBar = () => {

    return (
        <div className="bottomBar">
            <NavLink to = "/" exact = {true}>
            <div className="third">
                <p>Chat</p>
            </div>
            </NavLink>
            <NavLink to = "/todo">
            <div className="third leftBorder">
                <p>Todo</p>
            </div>
            </NavLink>
            <NavLink to = "/location">
            <div className="third leftBorder">
                <p>Location</p>
            </div>
            </NavLink>
        </div>
    )
}

export default BottomBar