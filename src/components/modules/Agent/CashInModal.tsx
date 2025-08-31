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
import { useCashInMutation } from "@/redux/features/agent/agent.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
const sendSchema = z.object({
    phone: z.string().min(11).max(11),
    amount: z.number(),
})

export function CashInModal() {
    const [open, setOpen] = useState(false)
    const [cashIn] = useCashInMutation()
    const form = useForm<z.infer<typeof sendSchema>>({
        resolver: zodResolver(sendSchema),

    })


    const onSubmit = async (data: z.infer<typeof sendSchema>) => {
        const toastId = toast.loading("Adding Money")
        const Info = {
            phone: data.phone,
            amount: data.amount,
        }
        try {
            await cashIn(Info).unwrap();
            setOpen(false)
            toast.success("Add Money  successfully", { id: toastId });
        } catch (err) {
            console.error("Error:", err);
            toast.error("add money  failed");
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Money</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>ADD MONEY</DialogTitle>
                        <DialogDescription>
                            pleas give add money amount
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id="CashIn" className="space-y-4">
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
                        <Button form="CashIn" type="submit">Add Money </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
