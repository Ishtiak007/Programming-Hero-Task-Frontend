"use client";

import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Separator } from "../../../ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { verifyToken } from "../../../../lib/verifyToken";
import { loginUser } from "../../../../services/AuthApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../../redux/hooks";
import { setUser } from "../../../../redux/features/authSlice";
import { loginValidation } from "./LoginValidation";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
    setValue,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      const response = await loginUser(data);

      if (response?.success) {
        toast.success(response?.message);
        const user = verifyToken(response.data?.token);

        dispatch(setUser({ user: user, token: response.data?.token }));
        router.push("/");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wring!");
    }
  };

  const handleUserAutoFillButton = () => {
    setValue("identifier", "ishtiak.sparrow98@gmail.com");
    setValue("password", "123456Aa!");
  };

  const handleAdminAutoFillButton = () => {
    setValue("identifier", "ishtiakahmed01999@gmail.com");
    setValue("password", "123456Aa!");
  };
  return (
    <div className="min-h-screen h-screen w-full max-w-3xl flex items-center justify-center  p-4 mx-auto ">
      <div className="w-full md:p-6 max-w-screen-md rounded-xl overflow-hidden shadow-xl">
        <div className="">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl font-bold text-center">
              Login your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email or phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center justify-center font-medium rounded-md transition-all duration-300 ease-in-out hover:bg-indigo-500 hover:text-white my-4 mt-2 w-full"
                >
                  {isSubmitting ? "Logging..." : "Login"}
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 my-5">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
              <Separator />
              <p className="text-center text-gray-500 text-[15px] my-5">
                Click here to auto-fill your email and password
              </p>
              <div className="flex flex-col gap-4 md:flex-row">
                <button
                  onClick={handleUserAutoFillButton}
                  type="button"
                  className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out hover:bg-indigo-500 hover:text-white my-4 mt-2 w-full flex-1 bg-zinc-50"
                >
                  User
                </button>
                <button
                  onClick={handleAdminAutoFillButton}
                  type="button"
                  className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out hover:bg-indigo-500 hover:text-white my-4 mt-2 w-full flex-1 bg-zinc-50"
                >
                  Admin
                </button>
              </div>
            </FormProvider>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
