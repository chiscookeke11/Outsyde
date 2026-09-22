import { plansData } from "@/data/plans";
import Image from "next/image";



export default function Plan() {
    return (
        <section className="w-full min-h-screen bg-white flex flex-col gap-24 md:gap-48 py-10 px-[4%]  " >


            <div className="w-full grid grid-cols-1 md:grid-cols-3 place-items-start justify-center gap-10 " >

                {
                    plansData.map((plan, i) => (
                        <div key={i} className="w-full  space-y-2  " >
                            <div className="font-season-vf font-semibold tracking-wider text-lg md:text-2xl " > {plan.icon} {plan.title}</div>
                            <p className=" font-uncut text-base md:text-lg " > {plan.content} </p>
                        </div>
                    ))
                }

            </div>




            <div className="w-full flex flex-col md:flex-row justify-center gap-10 py-1 items-stretch " >

                <div className="basis-[45%]  self-stretch flex items-center justify-center " >
                    <Image src={"/landing-page/plans_image.png"}
                        width={1000} height={1000}
                        alt="image"
                        className="w-[50%] h-auto object-cover object-center " />
                </div>


                <div className="basis-[55%] flex flex-col items-start justify-center space-y-4 " >
                    <h3 className="font-season-vf font-semibold text-4xl  " >Plan Your Day Around the Weather</h3>

                    <p className="font-uncut text-lg  " >Know what the forecast has in store and make smarter plans for your outdoor activities.</p>

                    <ul className=" font-uncut text-base list-disc space-y-1  "  >
                        <li>Check current conditions before heading out.</li>
                        <li>Plan ahead with a detailed 5-day forecast.</li>
                        <li>Discover weather-related videos and useful outdoor tips.</li>
                    </ul>
                </div>
            </div>


        </section>
    )
}