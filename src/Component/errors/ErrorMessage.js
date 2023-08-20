export default function FormErrorMessage({ msg }) {
    return (
        <small style={{
            color: "var(--error-color)"
        }}>{msg}</small>
    )
}
