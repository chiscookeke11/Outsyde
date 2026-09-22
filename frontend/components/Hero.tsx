import Image from "next/image";



export default function Hero() {
    return (
        <section className="w-full min-h-screen flex items-center flex-col md:flex-row justify-center gap-5 py-16 px-[5%] relative overflow-hidden  "  >


            <div className=" w-full h-full  basis-[50%] flex items-start flex-col gap-4  justify-center  " >
                <h2 className=" text-7xl font-semibold font-season-vf tracking-wider  " >Weather, Your Way</h2>

                <p className="text-2xl font-normal font-uncut w-[75%] " >Plan your day. Plan your week. Make better decisions with the weather.</p>

                <a className="rounded bg-black px-5 py-3 font-uncut text-white transition hover:bg-black/80" href="#weather">Check the Weather</a>

            </div>


            <div className=" w-full h-full  basis-[50%]  relative z-10  " >

                <Image src={"/landing-page/Mockups.png"} alt="phone-left" width={1000} height={1000} className=" w-full h-full object-center " />


            </div>


            <Image
                src={"/landing-page/hero-wave.svg"}
                width={1000}
                height={1000}
                alt=""
                className=" absolute bottom-[-10%] left-0 w-full "
            />

        </section>
    )
}
