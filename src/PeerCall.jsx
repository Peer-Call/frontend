import Button from "./component/Button.jsx";

function PeerCall() {
  return (
    

<section>
  <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
    <div className="flex w-full mx-auto text-left">
      <div className="relative inline-flex items-center mx-auto align-middle">
        <div className="text-center">
          <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
          Free and Open source <br/>Decentralised Video Calling app
          </h1>
          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">We made PeerCall video calling privacy friendly and  decentralised so that you can communicate freely.</p>
          <div className="flex justify-center w-full max-w-2xl mt-12 mx-auto mt-6">
            <div className="mt-3 rounded-lg mr-12 sm:mt-0">
              <Button text="Start Call" />
            </div>
            <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
              <Button text="Sign in" color="white" marg="4" textcolor="blue-600" hovertext="white"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</section>


  )
}

export default PeerCall;
