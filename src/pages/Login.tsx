import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Password from "@/components/ui/password"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router"
import Logo from "@/assets/icons/Logo"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SerializedError } from "@reduxjs/toolkit"
import loginImage from "@/assets/images/login.svg";

const loginSchema = z.object({
    phone: z.string().min(11).max(11),
    password: z.string().min(6),
})


export default function Login() {
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    // 1. Define your form.
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        const userInfo = {
            phone: data.phone,
            password: data.password,


        }
        try {
            const res = await login(userInfo).unwrap()
            if (res.success) {
                toast.success("Login in successfully")
                navigate("/")
            }

            console.log(res);
        } catch (error) {
            const err = error as FetchBaseQueryError | SerializedError

            if ("data" in err && typeof err.data === "object") {
                const errData = err.data as { message?: string }

                if (errData.message === "Password does not match") {
                    toast.error("Invalid credential")
                }

                if (errData.message === "user does not verify") {
                    toast.error("Your account is not verified")
                    navigate("/verify", { state: userInfo.phone })
                }
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link to="/" className="flex items-center gap-2 font-medium">
                        <div >
                            <Logo />
                        </div>
                        Quick Pay
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="phone" {...field} />
                                            </FormControl>
                                            <FormDescription className="sr-only">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>password</FormLabel>
                                            <FormControl>
                                                <Password {...field} />
                                                {/* <Input placeholder="password" type="password" {...field} /> */}
                                            </FormControl>
                                            <FormDescription className="sr-only">
                                                This is your public display name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full bg-chart-1" type="submit">Submit</Button>

                            </form>
                        </Form>

                        <p className='text-center font-semibold mt-2'>Don't Have an account? <Link className='text-chart-1' to='/register'>register</Link> </p>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src={loginImage}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
