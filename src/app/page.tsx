import Image from "next/image";
import myPicture from "../../public/luis_platzer.jpg"

export default function Home() {
  return (
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-col-2 grid-flow-col gap-4">
              <div className="">
                  <h2 className="text-3xl mb-3">Hi. My name is Luis Platzer.</h2>
                  <p className={"max-w-xl"}>I'm a software developer, former professional barista, coffee roaster and general coffee nerd.
                      <br/>
                      I aim to connect the world of software development with the world of coffee by developing tools that will help you enjoy and improve every cup of coffee.
                  </p>
              </div>
              <div>
                  <Image
                      src={myPicture}
                      alt="image of Luis Platzer"
                  />
              </div>
              </div>
      </div>
);
}
