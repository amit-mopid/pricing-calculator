import "./ios-button.scss";

const IosSwitchButton = ({
    mode = '',
    isActive = false,
    handleToggleSwitch = () => { }
}) => {
    return (
        <div
            className={`switch-container ${isActive ? "active" : ""} ${mode === "PREVIEW" ? "inActive-cursor" : "active-cursor"}`}
            onClick={handleToggleSwitch}
        >
            <div className="switch-circle"></div>
        </div>
    );
};

export default IosSwitchButton;