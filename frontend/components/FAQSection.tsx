import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";



export default function FAQSection() {
    return (
        <section className="w-full min-h-[50vh] relative flex items-center justify-center font-uncut " >

            <Image
                src={"/landing-page/circle-scatter-haikei.svg"}
                height={1000}
                width={1000}
                alt=""
                className="absolute top-0 left-0 h-full w-full "
            />

            {/* blur  */}
            <span className="w-full h-full absolute top-0 left-0 backdrop-blur-md " />


            <div className="w-full max-w-[700px]  flex flex-col items-center justify-center gap-5 z-10 text-center " >
                <h5 className="text-lg md:text-2xl  " >Ready to plan smarter?</h5>

                <h3 className=" text-2xl md:text-4xl font-season-vf " >Get live weather conditions and a 5-day forecast for wherever your plans take you.</h3>

                <Link href={"/dashboard"} className="cursor-pointer " >
                    <Button className="font-modern_era_mono text-base md:text-xl mt-3 cursor-pointer bg-[#ffffff]! text-[#87cefa]! px-4! py-3 " >
                        Check the Weather
                    </Button>
                </Link>

            </div>



        </section>
    )
}