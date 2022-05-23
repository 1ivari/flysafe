import PropTypes from 'prop-types'

function Header(props) {
    const headerStyles = {backgroundColor: props.bgColor, color: props.textColor}
    return (
        <div className = "flex bg-white w-full mb-5">
            <div className="underline">
                <h2>{props.text}</h2>
            </div>
        </div>
    )
}

Header.defaultProps = {
    text: 'Flight Planner',
    bgColor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95'
}

Header.propTypes = {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string
}

export default Header