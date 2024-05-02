import PropTypes from "prop-types";
import styles from "./Message.module.css";

function Message({ message }) {
    return (
        <p className={styles.message}>
            <span role="img" aria-label="wave">
                👋
            </span>{" "}
            {message}
        </p>
    );
}

Message.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Message;
