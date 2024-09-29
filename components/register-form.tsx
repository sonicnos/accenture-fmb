"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import CardWrapper from "@/components/card-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { register } from "@/actions/register";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";

const RegisterForm = () => {
  type RegisterFormValues = z.infer<typeof RegisterSchema>;

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  const { toast } = useToast();

  const registerToaster = () => {
    if (success) {
      toast({
        variant: "success",
        title: success,
      });
    }

    if (error) {
      toast({
        variant: "destructive",
        title: error,
      });
    }
  };

  return (
    <CardWrapper titleLabel="Register Page">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="h-24">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Deo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="h-24">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon.deo@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="h-24">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="h-24 mb-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose Role</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="user" defaultValue="USER" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">user</SelectItem>
                        <SelectItem value="HR">hr</SelectItem>
                        <SelectItem value="ADMIN">admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            onClick={() => {
              if (success) {
                toast({
                  variant: "success",
                  title: success,
                });
              }

              if (error) {
                toast({
                  variant: "destructive",
                  title: error,
                });
              }
            }}
          >
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
