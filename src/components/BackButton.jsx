function BackButton() {
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
