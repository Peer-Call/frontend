function CircleButton(props) {
  return (
    <div>
      <button
        type="submit"
        className={`w-12 h-12 border bg-${
          props.color
        } hover:scale-[1.1] flex justify-center items-center border-gray-600 rounded-full ${
          props.blur ? "backdrop-blur-md" : null
        }`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
}
export default CircleButton;
