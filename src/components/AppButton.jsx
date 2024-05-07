import PropTypes from "prop-types";
import styles from "./AppButton.module.css";

function AppButton({ children, onClick, type }) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    );
}

AppButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
};

export default AppButton;
