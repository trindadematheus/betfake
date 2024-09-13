import { InputHTMLAttributes, forwardRef } from "react"

type TextInputProps = {
    label?: string
    error?: string
} & InputHTMLAttributes<HTMLInputElement>

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    return (
        <>
            <div className="form-control w-full">
                {!!props.label && (
                    <p className="text-xs mb-1 text-slate-700">
                        {props.label}
                    </p>
                )}

                <input
                    {...props}
                    className={`text-sm border h-10 p-3 rounded-md w-full ${props.className}`}
                    ref={ref}
                />

                {!!props.error && (
                    <label className="label">
                        <span className="label-text-alt text-red-400 ">{props.error}</span>
                    </label>
                )}
            </div>
        </>
    )
})

export default TextInput