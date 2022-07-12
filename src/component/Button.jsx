function Button({ onClick, type, color, text, textcolor, marg, hovertext, className }) {
  return (
    <div>
      <button
        type={type}
        className={`${className || "bg-blue-600 text-white"} flex w-full transform items-center justify-center rounded-xl border-2 border-blue-600 px-10 py-4 text-center text-base font-medium transition duration-500 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
