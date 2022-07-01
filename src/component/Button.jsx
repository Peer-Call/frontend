function Button(props) {
  return (

    <div>
      <button
        type="submit"
        className={`flex w-full transform items-center justify-center mr-${props.marg}  rounded-xl bg-${props.color} text-${props.textcolor} border-2 border-blue-600 px-10 py-4 text-center text-base font-medium text-white transition duration-500 ease-in-out hover:bg-blue-700 hover:text-${props.hovertext} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {props.text}
      </button>
    </div>
  )
}
Button.defaultProps={
  color: "blue-600",
};

export default Button
