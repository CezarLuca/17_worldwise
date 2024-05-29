import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";

function BackButton() {
    const navigate = useNavigate();
    return (
        <AppButton
            type="back"
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}
        >
            &larr; Back
        </AppButton>
    );
}

export default BackButton;
