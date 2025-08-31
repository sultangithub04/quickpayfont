import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCashOutMutation } from "@/redux/features/agent/agent.api"
import { useCashwithDrawbyUserMutation, useSendMoneyMutation, useToUpMoneyMutation, useWithDrawMutation } from "@/redux/features/user/user.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z, { number } from "zod"
const sendSchema = z.object({
    phone: z.string().min(11).max(11),
    amount: z.number(),
})

export function WithdrawModal() {
    const [open, setOpen] = useState(false);
    const [cashwithDrawbyUser] = useCashwithDrawbyUserMutation()
    const form = useForm<z.infer<typeof sendSchema>>({
        resolver: zodResolver(sendSchema),
   
    })

    // 



   const onSubmit = async (data: z.infer<typeof sendSchema>) => {

                const Info = {
                phone: data.phone,
                amount: data.amount,
    
    
            }
        try {
            console.log("Form data:", Info);

            await cashwithDrawbyUser(Info).unwrap(); 
            toast.success("withMoney Money successfully");
            setOpen(false)
        
        } catch (err) {
            console.error("Error:", err);
            toast.error("withMoney Money failed");
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Withdraw Money</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>WITHDRAW MONEY</DialogTitle>
                        <DialogDescription>
                            pleas give Withdraw amount
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id="SendMoney" className="space-y-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="phone"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amount</FormLabel>
                                        <FormControl>
                                            <Input placeholder="amount" type="number" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button form="SendMoney" type="submit">Withdraw Money</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
