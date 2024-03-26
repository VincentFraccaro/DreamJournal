import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {AutosizeTextarea} from "@/app/components/autosize";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DatePicker} from "@/components/ui/datepicker";
import {DateTime} from "luxon";

const DreamDialog = ({onDreamAdded = () => {}}) => {
    const [open, setOpen] = useState(false);

    const dreamSchema = z.object({
        title: z.string().min(2, {
            message: "Dream title must be at least 2 characters"
        }),
        content: z.string(),
        is_lucid: z.boolean(),
        timestamp: z.coerce.date(),
    });

    const submitDreams = async (values:any) => {
        try {
            const response = await fetch('/api/dreams', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            console.log("The values are", JSON.stringify(values));
            onDreamAdded();

        } catch (error) {
            console.error("Failed to fetch dreams:", error);
        }
    };

    const DreamForm = () => {
        const form = useForm({
            resolver: zodResolver(dreamSchema),
            defaultValues: {
                title: "",
                content: "",
                is_lucid: false,
                timestamp: new Date(),
            },
        });

        const handleSubmit = (data:any) => {
            console.log(data);
            setOpen(false);
            data = {...data, timestamp: DateTime.fromJSDate(data.timestamp).toUTC()};
            console.log("Updated values are ", data)
            submitDreams(data).then(r => {});
        };

        return (
            <Form {...form}>
                <form method={"post"} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dream Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <AutosizeTextarea
                                        maxHeight={300}
                                        id={"content"}
                                        placeholder="Enter your dream in here"
                                        {...field}
                                        className={cn("min-h-[80] col-span-3 text-wrap")}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="is_lucid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lucid Dream</FormLabel>
                                <FormControl>
                                    <input className={"m-1"} type={"checkbox"} id={"is_lucid"} value={field.value ? "true" : "false"}
                                           onChange={field.onChange} onBlur={field.onBlur}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="timestamp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <DatePicker key={"timestamp"}></DatePicker>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button onSubmit={handleSubmit} type="submit">Submit</Button>
                </form>
            </Form>
        );
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className={"bg-secondary my-2"} variant={"outline"}>New Dream</Button>
                </DialogTrigger>
                <DialogContent className={"sm:max-w-lg"}>
                    <DialogHeader className={"pt-1"}>
                        <DialogTitle>Add a new dream</DialogTitle>
                        <DialogDescription>Add a new dream to your journal</DialogDescription>
                    </DialogHeader>
                    <div className={"grid gap-2 py-2"}>
                        <DreamForm></DreamForm>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DreamDialog