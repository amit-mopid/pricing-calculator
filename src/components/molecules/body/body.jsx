import './body.scss';

const Body = ({ children }) => {
    return (
        <div className={`body-wrapper`}>{children}</div>
    );
};

export default Body;