import carLogo from '../images/carLogo.png';

const Pending = () => {
    return (
        <div className="rightContainer pending">
            <div className='selectChat'>
                <img src = {carLogo} />
                <p>please select a chat</p>
            </div>
        </div>
    )
}

export default Pending