type EditableInputProps = {
    value: string
    onChange: (txt: string) => void;
    isOnEdit: boolean
    style: string
    prefix?: string
}

function EditableInput({ value, onChange, isOnEdit, style, prefix }: EditableInputProps) {
    return (
        <>
            {isOnEdit ? (
                <input
                    disabled={!isOnEdit}
                    className={`w-full m-1 border p-2 rounded-md`}
                    type="text"
                    value={value}
                    onChange={evt => onChange(evt.target.value)}
                />
            ) : (
                <span className={style} >
                    {prefix}{value}
                </span>
            )}
        </>
    );
}

export default EditableInput;
