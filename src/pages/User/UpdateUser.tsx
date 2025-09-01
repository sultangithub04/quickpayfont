
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Password from "@/components/ui/password"
import { useUsrInfoQuery } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"

import { useUpdateUserMutation } from "@/redux/features/user/user.api"
import { FaHandHoldingUsd } from "react-icons/fa"
const registerSchema = z.object({
  name: z.string().min(2, { error: "Name is to short" }).max(50),
  email: z.email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, { message: "Password Not Match", path: ["confirmPassword"] })

// loginuser?.data?.email
export default function UpdateUser() {
  const { data:loginuser } = useUsrInfoQuery(undefined)
  const [updateUser] = useUpdateUserMutation()
  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      
      name: loginuser?.data?.name || "",
      email: loginuser?.data?.email || "",
      password: "",
      confirmPassword: "",
    },
  })
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,

    }
    try {
      const result = await updateUser(userInfo).unwrap()
      console.log(result);
      toast.success("Information updated successfully.")


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div >


      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex-1 flex flex-col items-center justify-center bg-white text-center">
          <h1 className="text-4xl font-bold flex items-center gap-2 mb-4">
            <FaHandHoldingUsd className="text-red-500" /> Update Your Profile
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            Keep your QuickPay account details up-to-date for smooth transactions.
          </p>

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

                      <FormMessage />
                    </FormItem>
                  )}
                />


                <Button className="w-full bg-chart-1" type="submit">update</Button>

              </form>
            </Form>

          </div>
        </div>
      </div>
    </div>
  )
}




