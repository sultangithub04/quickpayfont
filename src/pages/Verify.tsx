import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { useGetEmailQuery, useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";


const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})
export default function Verify() {


    const location = useLocation()
    const navigate = useNavigate()
    const [phone] = useState(location.state)
    const [sendOtp] = useSendOtpMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const [timer, setTimer] = useState(5)

    const { data, isLoading } = useGetEmailQuery(phone, {
        skip: !phone, // only run if phone exists
    });
    if (isLoading) {

        <LoadingSpinner/>
    }
    const email = data?.data


    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {
        if (!phone) {
            navigate('/')
        }
    }, [phone])

    useEffect(() => {
        const timerId = setInterval(() => {
            if (email && confirmed) {
                setTimer(prev => prev>0? prev-1:0)
                console.log("trick");
            }
        }, 1000)
        return ()=>clearInterval(timerId)
    }, [email, confirmed])
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const handleSendOtp = async () => {
        const toasId = toast.loading("sending OTP")
        setConfirmed(true)
        setTimer(5)
        try {
            const res = await sendOtp({ email: email }).unwrap()
            if (res.success) {
                toast.success("OTP send", { id: toasId })
            }

        } catch (error) {
            console.log(error);
        }
    }
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const toasId = toast.loading("Verifying OTP")
        const userInfo = {
            email,
            otp: data.pin
        }

        try {
            const res = await verifyOtp(userInfo).unwrap()
            if (res.success) {
                toast.success("OTP verified", { id: toasId })
                setConfirmed(true)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="grid place-content-center h-screen">
            {
                confirmed ? (
                    <Card >
                        <CardHeader>
                            <CardTitle className="text-xl">Verify your email address</CardTitle>
                            <CardDescription>
                                Please enter 6 digit code
                            </CardDescription>

                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>One-Time Password</FormLabel>
                                                <FormControl>
                                                    <InputOTP maxLength={6} {...field}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={1} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={2} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={3} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={4} />
                                                        </InputOTPGroup>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={5} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                                <FormDescription>
                                                    <Button onClick={handleSendOtp}
                                                    className={cn("p-2",{"cursor-pointer": timer===0, "text-red-500": timer!=0})}
                                                     type="button" variant="link" disabled={timer!=0}>Resent OTP</Button>
                                                    {timer}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button form="otp-form" type="submit">
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>
                ) : (
                    <Card >
                        <CardHeader>
                            <CardTitle className="text-xl">Verify your email address</CardTitle>
                            <CardDescription>
                                we will send you and OTM at <br />{email}
                            </CardDescription>

                        </CardHeader>

                        <CardFooter className="flex justify-end">
                            <Button onClick={handleSendOtp} className="w-[300px]" >
                                Confirm
                            </Button>
                        </CardFooter>
                    </Card>
                )
            }


        </div>
    );
};