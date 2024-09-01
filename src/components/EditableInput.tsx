type EditableInputProps = {
    value: string
    onChange: (txt: string) => void;
    isOnEdit: boolean
    style: string
    prefix?: string
    label: string
}

function EditableInput({ value, onChange, isOnEdit, style, prefix, label }: EditableInputProps) {
    return (
        <>
            {isOnEdit ? (
                <>
                    <div className="border border-blue-200">
                        <p className="text-slate-600 font-normal">{label}</p>
                        <input
                            disabled={!isOnEdit}
                            className={`w-full m-1 border p-2 rounded-md`}
                            type="text"
                            value={value}
                            onChange={evt => onChange(evt.target.value)}
                        />
                    </div>
                </>
            ) : (
                <span className={style} >
                    {prefix}{value}
                </span>
            )}
        </>
    );
}

export default EditableInput;
