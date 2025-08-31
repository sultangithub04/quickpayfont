import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { FaMoneyBillWave, FaShoppingBag, FaHandHoldingUsd, FaWallet, FaBolt } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router";
import Autoplay from "embla-carousel-autoplay"
const services = [
    { icon: <GiTakeMyMoney className="text-pink-500 text-4xl" />, label: "Send Money" },
    { icon: <MdSendToMobile className="text-green-500 text-4xl" />, label: "Mobile Recharge" },
    { icon: <FaShoppingBag className="text-orange-500 text-4xl" />, label: "Payment" },
    { icon: <FaHandHoldingUsd className="text-teal-500 text-4xl" />, label: "Cash Out" },
    { icon: <FaMoneyBillWave className="text-green-600 text-4xl" />, label: "QuickPay Bundle" },
    { icon: <FaWallet className="text-purple-500 text-4xl" />, label: "Add Money" },
    { icon: <FaBolt className="text-gray-600 text-4xl" />, label: "Pay Bill" },
];

export default function HeroSection() {
    return (
        <div>
            <section className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      

 
  
                <Carousel
                    className="container"
                    plugins={[
                        Autoplay({
                            delay: 3000, // 3 seconds delay
                            stopOnInteraction: false, // keeps auto-play after user interaction
                        }),
                    ]}
                >
                    <CarouselContent>
                        {[
                            "/src/assets/images/image1.jpg",
                            "/src/assets/images/image2.jpg",
                            "/src/assets/images/image3.jpg",
                            "/src/assets/images/image4.jpg",
                            "/src/assets/images/image5.jpg",
                            "/src/assets/images/image6.png",
                        ].map((src, index) => (
                            <CarouselItem key={index}>
                                <div className="p-2">
                                    <Card className="bg-white dark:bg-gray-100 shadow-md dark:shadow-gray-100 transition-colors duration-300">
                                        <CardContent className="flex aspect-square items-center justify-center max-h-72">
                                            <img
                                                src={src}
                                                alt={`Slide ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="text-gray-800 dark:text-gray-200" />
                    <CarouselNext className="text-gray-800 dark:text-gray-200" />
                </Carousel>
               


            </section>

            <section>
                <section className="bg-white lg:grid lg:place-content-center">
                    <div className="mx-auto w-screen max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8">
                        <div className="mx-auto max-w-prose text-center">
                            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                                Understand your money flow and
                                <strong className="text-chart-1"> gain control </strong>
                                with QuickPay
                            </h1>

                            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                                QuickPay makes it simple to send, receive, and manage money securely.
                                From instant transfers to bill payments — everything you need is at your
                                fingertips, anytime and anywhere.
                            </p>

                            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                                <Link
                                    className="inline-block rounded border border-chart-1 bg-chart-1 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                                    to="/register"
                                >
                                    Create Account
                                </Link>

                                <Link
                                    className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                    to="/"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </section>
            <section className="bg-pink-50 py-10">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-lg font-semibold mb-8">Learn More about QuickPay Services</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="bg-white shadow-md rounded-full p-4 mb-3 hover:scale-105 transition-transform">
                                    {service.icon}
                                </div>
                                <p className="text-sm font-medium">{service.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
