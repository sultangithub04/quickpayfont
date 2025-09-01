
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Password from "@/components/ui/password"
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router"
import Logo from "@/assets/icons/Logo"
const registerSchema = z.object({
    name: z.string().min(2, { error: "Name is to short" }).max(50),
    email: z.email(),
    phone: z.string().min(11).max(11),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.string(),
}).refine((data) => data.password === data.confirmPassword, { message: "Password Not Match", path: ["confirmPassword"] })


export default function Register() {

    const [register] = useRegisterMutation()
    const navigate = useNavigate()
    // 1. Define your form.
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            role: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: data.role

        }
        console.log(userInfo);
        try {
            const result = await register(userInfo).unwrap()
            console.log(result);
            toast.success("User has been created successfully.")
            navigate('/verify')

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="grid min-h-svh lg:grid-cols-2">

            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/src/assets/images/login.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
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
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field} />
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} />
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
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirmed Password</FormLabel>
                                            <FormControl>
                                                <Password {...field} />
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
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User Role</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectItem value="USER">USER</SelectItem>
                                                    <SelectItem value="AGENT">AGENT</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full bg-chart-1" type="submit">Submit</Button>

                            </form>
                        </Form>
                        <p className="text-center font-semibold">
                            Have an account?{' '}
                            <Link className="text-chart-1" to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
