const Loader =() => {
    return (
        <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-tertiary animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-tertiary animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-5 h-5 rounded-full bg-tertiary animate-bounce"></div>
        </div>
    )
}

export default Loader;
